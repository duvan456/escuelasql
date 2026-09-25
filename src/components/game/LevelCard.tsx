'use client';

import React from 'react';
import { Lock, Play, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StarsDisplay } from '@/components/game/StarsDisplay';
import { cn } from '@/lib/utils/cn';

interface LevelCardProps {
  level: {
    title: string;
    description: string;
    xpReward: number;
  };
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  stars: number;
  onClick: () => void;
  className?: string;
}

export function LevelCard({
  level,
  index,
  isCompleted,
  isLocked,
  stars,
  onClick,
  className
}: LevelCardProps) {
  return (
    <Card 
      variant={isLocked ? 'default' : 'interactive'}
      onClick={() => !isLocked && onClick()}
      className={cn(
        "relative transition-all duration-300 h-full flex flex-col",
        isLocked && "opacity-75 bg-slate-50",
        isCompleted && "border-emerald-200 bg-emerald-50/30",
        !isLocked && !isCompleted && "hover:-translate-y-1 hover:border-emerald-300",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg shadow-sm",
          isLocked ? "bg-slate-200 text-slate-500" :
          isCompleted ? "bg-emerald-100 text-emerald-700" :
          "bg-emerald-500 text-white"
        )}>
          {index}
        </div>
        
        {!isLocked && (
          <div className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center">
            +{level.xpReward} XP
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className={cn("text-lg font-bold mb-2", isLocked ? "text-slate-500" : "text-slate-800")}>
          {level.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {level.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        {isLocked ? (
          <div className="flex items-center text-slate-400 text-sm font-medium">
            <Lock size={16} className="mr-1.5" />
            Bloqueado
          </div>
        ) : isCompleted ? (
          <>
            <div className="flex items-center text-emerald-600 text-sm font-medium">
              <CheckCircle size={16} className="mr-1.5" />
              Completado
            </div>
            <StarsDisplay stars={stars} size="sm" />
          </>
        ) : (
          <div className="flex items-center text-emerald-600 text-sm font-bold w-full justify-between">
            <span>Empezar nivel</span>
            <Play size={16} className="fill-current" />
          </div>
        )}
      </div>
    </Card>
  );
}
