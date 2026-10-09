'use client'

import { use, useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Award, Heart, Lightbulb, AlertCircle, RotateCcw } from 'lucide-react'
import { allModules } from '@/data/modules'
import { schemaContabilidad } from '@/data/schemas/contabilidad'
import { schemaNomina } from '@/data/schemas/nomina'
import { seedContabilidad } from '@/data/seeds/contabilidad'
import { seedNomina } from '@/data/seeds/nomina'
import { useSqlEngine } from '@/hooks/useSqlEngine'
import { useGameStore } from '@/stores/useGameStore'
import { useProgressStore } from '@/stores/useProgressStore'
import { calculateXp, calculateStars } from '@/lib/game/scoring'
import { compareResults } from '@/lib/sql/comparator'
import { checkAchievements } from '@/lib/game/achievements'
import { SqlEditor } from '@/components/game/SqlEditor'
import { ResultTable } from '@/components/game/ResultTable'
import { HintPanel } from '@/components/game/HintPanel'
import { LevelComplete } from '@/components/game/LevelComplete'
import { Button } from '@/components/ui/Button'

const schemas: Record<string, string> = {
  contabilidad: schemaContabilidad,
  nomina: schemaNomina,
}
const seeds: Record<string, string> = {
  contabilidad: seedContabilidad,
  nomina: seedNomina,
}

export default function LevelPage({ params }: { params: Promise<{ moduloId: string; nivelId: string }> }) {
  const { moduloId, nivelId } = use(params)
  const router = useRouter()

  // Find module and level
  const currentModule = allModules.find(m => m.id === moduloId)
  const currentLevel = currentModule?.levels.find(l => l.id === nivelId)
  const currentLevelIndex = currentModule?.levels.findIndex(l => l.id === nivelId) ?? -1
  const nextLevel = currentModule?.levels[currentLevelIndex + 1]

  // Determine schema
  const schemaKey = currentLevel?.schemaKey || currentModule?.schemaKey || 'contabilidad'
  const schemaSQL = schemas[schemaKey] || schemaContabilidad
  const seedSQL = seeds[schemaKey] || seedContabilidad

  // SQL engine
  const { executeQuery, isReady } = useSqlEngine(schemaSQL, seedSQL)

  // Game state
  const { attempts, hintsUsed, lives, isLevelComplete, startLevel, submitAttempt, useHint, resetLives, loseLife } = useGameStore()
  const { completeLevel, addXp, updateStreak, currentStreak, unlockAchievement } = useProgressStore()

  // Local state
  const [queryResult, setQueryResult] = useState<{ columns: string[]; rows: any[][] } | null>(null)
  const [queryError, setQueryError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [earnedStars, setEarnedStars] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)
  const [showExpected, setShowExpected] = useState(false)

  // Expected result from running the expected query
  const [expectedResult, setExpectedResult] = useState<{ columns: string[]; rows: any[][] } | null>(null)
  const levelStartedAt = useRef(Date.now())

  // Initialize level
  useEffect(() => {
    if (currentModule && currentLevel) {
      startLevel(currentModule.id, currentLevel.id)
      levelStartedAt.current = Date.now()
      setQueryResult(null)
      setQueryError(null)
      setFeedback(null)
      setEarnedStars(0)
      setEarnedXp(0)
      setShowExpected(false)
    }
  }, [moduloId, nivelId, currentModule, currentLevel, startLevel])

  // Generate expected result from expectedQuery
  useEffect(() => {
    if (isReady && currentLevel?.expectedQuery) {
      const result = executeQuery(currentLevel.expectedQuery)
      if (!result.error) {
        setExpectedResult({ columns: result.columns, rows: result.rows })
      }
    }
  }, [isReady, currentLevel?.expectedQuery, executeQuery])

  const handleExecute = useCallback((query: string) => {
    if (!isReady || isLevelComplete) return

    submitAttempt()
    const result = executeQuery(query)

    if (result.error) {
      setQueryError(result.error)
      setQueryResult(null)
      setFeedback(null)
      loseLife()
      return
    }

    setQueryError(null)
    setQueryResult({ columns: result.columns, rows: result.rows })

    // Compare with expected using dedicated comparator
    if (expectedResult) {
      const comparison = compareResults(
        { columns: result.columns, rows: result.rows },
        expectedResult,
        currentLevel?.validationMode === 'exact'
      )

      if (comparison.isCorrect) {
        setFeedback(null)
        const stars = calculateStars(attempts + 1, hintsUsed)
        const xp = calculateXp(currentLevel!.xpReward, attempts + 1, hintsUsed, currentStreak)

        setEarnedStars(stars)
        setEarnedXp(Math.round(xp))

        useGameStore.setState({ isLevelComplete: true })
        completeLevel(currentLevel!.id, stars, attempts + 1, {
          moduleId: currentModule!.id,
          noHints: hintsUsed === 0,
          timeSeconds: (Date.now() - levelStartedAt.current) / 1000,
        })
        addXp(Math.round(xp))
        updateStreak()

        // Check for new achievements
        const currentProgress = useProgressStore.getState()
        const newAchievements = checkAchievements(currentProgress, allModules)
        newAchievements.forEach(achId => unlockAchievement(achId))
      } else {
        setFeedback(comparison.feedback ?? 'Los datos devueltos no coinciden con lo esperado.')
      }
    }
  }, [isReady, isLevelComplete, expectedResult, attempts, hintsUsed, currentStreak, currentLevel, executeQuery, submitAttempt, loseLife, completeLevel, addXp, updateStreak, unlockAchievement])

  if (!currentModule || !currentLevel) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Nivel no encontrado</h2>
        <Link href="/jugar" className="text-emerald-600 hover:underline">Volver a módulos</Link>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-4xl">🗄️</div>
          <p className="text-slate-600 font-medium">Cargando base de datos...</p>
          <p className="text-slate-400 text-sm">Preparando las tablas para tu consulta</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Top Bar */}
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/jugar" className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft size={16} /> Módulos
          </Link>
          <div className="h-6 w-px bg-slate-600" />
          <div>
            <div className="text-xs text-slate-400">{currentModule.title}</div>
            <div className="font-semibold text-sm">{currentLevel.title}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-amber-400">
            <Award size={18} />
            <span className="font-bold text-sm">{currentLevel.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-rose-400">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} size={16} fill={i < lives ? 'currentColor' : 'none'} />
              ))}
            </div>
            {lives <= 0 && (
              <Button size="sm" variant="secondary" onClick={resetLives} className="text-xs py-1 px-2 h-7 ml-2">
                <RotateCcw size={12} className="mr-1" /> Reintentar vidas
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Left Panel: Story & Instructions */}
        <div className="w-full md:w-1/3 bg-slate-50 p-6 overflow-y-auto border-r border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-3">{currentLevel.title}</h2>
          
          <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed italic">&ldquo;{currentLevel.story}&rdquo;</p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-6 shadow-sm">
            <h3 className="font-semibold text-emerald-800 mb-1 text-sm">📋 Tu tarea:</h3>
            <p className="text-emerald-700 text-sm">{currentLevel.instruction}</p>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Tablas disponibles:</h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel.tables.map(t => (
                <span key={t} className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs font-mono font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Conceptos clave:</h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel.concepts.map(c => (
                <span key={c} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-mono font-medium">{c}</span>
              ))}
            </div>
          </div>

          {currentLevel.hints && currentLevel.hints.length > 0 && (
            <HintPanel
              hints={currentLevel.hints}
              hintsRevealed={hintsUsed}
              onRevealHint={useHint}
            />
          )}
        </div>

        {/* Right Panel: Editor & Results */}
        <div className="w-full md:w-2/3 flex flex-col h-full overflow-hidden bg-white">
          <div className="h-1/2 min-h-[250px] border-b border-slate-200 p-4">
            <SqlEditor
              onExecute={handleExecute}
              disabled={isLevelComplete || lives <= 0}
              error={queryError}
              defaultValue=""
            />
          </div>

          <div className="h-1/2 flex flex-col bg-slate-50 p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-2 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-slate-700">
                  {showExpected ? 'Resultado esperado' : 'Tu resultado'}
                </h3>
                {feedback && !showExpected && (
                  <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle size={12} /> {feedback}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExpected(!showExpected)}
              >
                {showExpected ? 'Ver mi resultado' : 'Ver resultado esperado'}
              </Button>
            </div>

            <div className="flex-grow overflow-auto rounded-md border border-slate-200 bg-white">
              {showExpected && expectedResult ? (
                <ResultTable columns={expectedResult.columns} rows={expectedResult.rows} />
              ) : queryResult ? (
                <ResultTable columns={queryResult.columns} rows={queryResult.rows} />
              ) : queryError ? (
                <ResultTable columns={[]} rows={[]} error={queryError} />
              ) : (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center h-full">
                  <Lightbulb size={32} className="mb-2 opacity-50 text-amber-500" />
                  <p>Escribe tu consulta SQL arriba y presiona <strong>Ejecutar</strong> (o Ctrl+Enter) para ver los datos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Level Complete Modal */}
      <LevelComplete
        isOpen={isLevelComplete}
        stars={earnedStars}
        xpEarned={earnedXp}
        onNext={() => {
          if (nextLevel) {
            router.push(`/jugar/${moduloId}/${nextLevel.id}`)
          } else {
            router.push('/jugar')
          }
        }}
        onBack={() => router.push('/jugar')}
      />
    </div>
  )
}
