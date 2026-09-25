'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number;
  color?: string; // e.g. 'bg-emerald-500'
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = 'bg-emerald-500',
  size = 'md',
  showLabel = false,
  className
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm font-medium mb-1 text-slate-600">
          <span>Progreso</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-200 rounded-full overflow-hidden", sizes[size])}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", color)}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
