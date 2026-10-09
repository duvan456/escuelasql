'use client'

import {
  Search,
  ArrowDown,
  Calculator,
  Flame,
  Funnel,
  GitMerge,
  Layers,
  PieChart,
} from 'lucide-react'
import { useProgressStore } from '@/stores/useProgressStore'
import { Card } from '@/components/ui/Card'
import { XpBar } from '@/components/game/XpBar'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { allModules } from '@/data/modules'
import { ACHIEVEMENTS } from '@/lib/game/achievements'
import { PLAYER_RANKS } from '@/lib/utils/constants'

const moduleIcons = {
  search: Search,
  funnel: Funnel,
  'arrow-down': ArrowDown,
  calculator: Calculator,
  'pie-chart': PieChart,
  filter: Funnel,
  'git-merge': GitMerge,
  layers: Layers,
} as const

export default function ProgresoPage() {
  const { totalXp, currentStreak, achievements, getPlayerRank, getModuleProgress } = useProgressStore()

  const rank = getPlayerRank()
  const nextRank = PLAYER_RANKS.find(r => r.minXp > totalXp) || PLAYER_RANKS[PLAYER_RANKS.length - 1]

  return (
    <div className="max-w-5xl mx-auto p-6 w-full space-y-8">
      <h1 className="text-3xl font-bold text-slate-200">Mi Progreso</h1>

      {/* Player Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl">
              {rank.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{rank.name}</h2>
              <p className="text-slate-500">Rango Actual</p>
            </div>
          </div>
          <XpBar
            currentXp={totalXp}
            nextRankXp={nextRank.minXp}
            currentRank={rank.name}
          />
        </Card>

        <Card noPadding>
          <div className="w-full p-6 flex flex-col justify-center items-center text-center space-y-2">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
              <Flame size={24} />
            </div>
            <div className="text-3xl font-bold text-slate-800">{currentStreak} {currentStreak === 1 ? 'día' : 'días'}</div>
            <p className="text-slate-500">Racha de aprendizaje</p>
          </div>
        </Card>
      </div>

      {/* Module Progress */}
      <div>
        <h2 className="text-xl font-bold text-slate-200 mb-4">Progreso por Módulo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {allModules.map(mod => {
            const levelIds = mod.levels.map(l => l.id)
            const { completed, total } = getModuleProgress(levelIds)
            const pct = total > 0 ? (completed / total) * 100 : 0

            return (
              <Card key={mod.id} noPadding>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 text-xl">
                    {(() => {
                      const Icon = moduleIcons[mod.icon as keyof typeof moduleIcons]
                      return Icon ? <Icon size={20} /> : mod.icon
                    })()}
                  </div>
                  <div className="flex-grow min-w-0 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="font-medium text-slate-700">{mod.title}</div>
                      <div className="text-slate-500">{completed}/{total}</div>
                    </div>
                    <ProgressBar value={pct} color="bg-emerald-500" className="w-full" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold text-slate-200 mb-4">Logros ({achievements.length}/{ACHIEVEMENTS.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = achievements.includes(ach.id)

            return (
              <Card 
                key={ach.id} 
                className={`p-4 text-center space-y-2 ${
                  unlocked 
                    ? 'border-emerald-100 bg-emerald-100' 
                    : 'border-slate-50 bg-slate-50'
                }`}
              >
                <div className="text-3xl">{ach.icon}</div>
                <div className="font-semibold text-sm text-slate-800">{ach.title}</div>
                <div className="text-xs text-slate-800">{ach.description}</div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
