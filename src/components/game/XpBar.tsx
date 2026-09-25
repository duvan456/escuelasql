'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils/cn';

interface XpBarProps {
  currentXp: number;
  nextRankXp: number;
  currentRank: string;
  hideRankText?: boolean;
  className?: string;
}

export function XpBar({ 
  currentXp, 
  nextRankXp, 
  currentRank,
  hideRankText = false,
  className 
}: XpBarProps) {
  // Simple calculation: progress in current rank bracket
  // Assuming brackets start at 0, 500, 1000 etc. For simplicity, just use percentage.
  const percentage = Math.min(100, Math.max(0, (currentXp / nextRankXp) * 100));

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {!hideRankText && (
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center text-amber-600 font-bold">
            <Trophy size={18} className="mr-1.5" />
            <span>{currentRank}</span>
          </div>
          <span className="text-sm font-medium text-slate-600">
            <span className="text-amber-600">{currentXp}</span> / {nextRankXp} XP
          </span>
        </div>
      )}
      
      {hideRankText && (
        <div className="flex justify-between text-xs font-medium mb-1">
          <span className="text-amber-600 flex items-center">
            <Trophy size={12} className="mr-1" />
            {currentXp} XP
          </span>
          <span className="text-slate-400">{nextRankXp} XP</span>
        </div>
      )}
      
      <div className="relative">
        <ProgressBar value={percentage} color="bg-amber-400" size="sm" />
      </div>
    </div>
  );
}
