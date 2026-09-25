'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';

interface ModuleCardProps {
  module: {
    title: string;
    description: string;
    icon: React.ReactNode;
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
  };
  progress: {
    completed: number;
    total: number;
  };
  isLocked: boolean;
  onClick: () => void;
  className?: string;
}

export function ModuleCard({
  module,
  progress,
  isLocked,
  onClick,
  className
}: ModuleCardProps) {
  const percentComplete = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
  
  const difficultyColor = {
    'Fácil': 'success',
    'Medio': 'warning',
    'Difícil': 'danger'
  } as const;

  return (
    <Card 
      variant={isLocked ? 'default' : 'interactive'}
      onClick={() => !isLocked && onClick()}
      className={cn(
        "relative transition-all duration-300 h-full",
        isLocked ? "bg-slate-50 opacity-80" : "hover:-translate-y-1 hover:border-emerald-400",
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "p-3 rounded-2xl shadow-sm",
          isLocked ? "bg-slate-200 text-slate-500" : "bg-emerald-100 text-emerald-600"
        )}>
          {module.icon}
        </div>
        <Badge variant={isLocked ? 'neutral' : difficultyColor[module.difficulty] as any}>
          {module.difficulty}
        </Badge>
      </div>

      <h3 className={cn("text-xl font-bold mb-3", isLocked ? "text-slate-500" : "text-slate-900")}>
        {module.title}
      </h3>
      
      <p className="text-slate-600 text-sm mb-6 min-h-[40px]">
        {module.description}
      </p>

      {isLocked ? (
        <div className="flex items-center justify-center p-4 bg-slate-100 rounded-lg text-slate-500 text-sm font-medium">
          <Lock size={16} className="mr-2" />
          Completa módulos anteriores
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Progreso</span>
            <span>{progress.completed} / {progress.total} niveles</span>
          </div>
          <ProgressBar value={percentComplete} size="sm" />
        </div>
      )}
    </Card>
  );
}
