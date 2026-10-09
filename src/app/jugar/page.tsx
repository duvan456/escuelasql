'use client'

import { useRouter } from 'next/navigation'
import {
  Search,
  ArrowDown,
  Calculator,
  Funnel,
  GitMerge,
  Layers,
  PieChart,
} from 'lucide-react'
import { allModules } from '@/data/modules'
import { ModuleCard } from '@/components/game/ModuleCard'
import { useProgressStore } from '@/stores/useProgressStore'

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

export default function ModuleSelectorPage() {
  const router = useRouter()
  const { completedLevels, getModuleProgress } = useProgressStore()

  const isModuleUnlocked = (index: number) => {
    if (index < 2) return true
    const prevModule = allModules[index - 1]
    const prevLevelIds = prevModule.levels.map(l => l.id)
    const { completed, total } = getModuleProgress(prevLevelIds)
    return completed >= Math.ceil(total / 2)
  }

  const difficultyLabel = (d: string) => {
    const map: Record<string, 'Fácil' | 'Medio' | 'Difícil'> = {
      principiante: 'Fácil',
      intermedio: 'Medio',
      avanzado: 'Difícil',
    }
    return map[d] || 'Fácil'
  }

  return (
    <div className="max-w-6xl mx-auto p-6 w-full space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-200">Módulos de Aprendizaje</h1>
        <p className="text-slate-200">Selecciona un módulo para comenzar o continuar tu aprendizaje.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allModules.map((mod, index) => {
          const unlocked = isModuleUnlocked(index)
          const levelIds = mod.levels.map(l => l.id)
          const { completed, total } = getModuleProgress(levelIds)

          return (
            <ModuleCard 
              key={mod.id}
              module={{
                title: mod.title,
                description: mod.description,
                icon: (() => {
                  const Icon = moduleIcons[mod.icon as keyof typeof moduleIcons]
                  return Icon ? <Icon size={24} /> : <span className="text-2xl">{mod.icon}</span>
                })(),
                difficulty: difficultyLabel(mod.difficulty),
              }}
              progress={{ completed, total }}
              isLocked={!unlocked}
              onClick={() => {
                const firstIncomplete = mod.levels.find(l => !completedLevels[l.id])
                const targetLevel = firstIncomplete || mod.levels[0]
                router.push(`/jugar/${mod.id}/${targetLevel.id}`)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
