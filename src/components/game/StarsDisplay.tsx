'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StarsDisplayProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StarsDisplay({ stars, maxStars = 3, size = 'md', className }: StarsDisplayProps) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const starSize = sizes[size];

  return (
    <div className={cn("flex space-x-1", className)}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const isFilled = i < stars;
        return (
          <Star
            key={i}
            size={starSize}
            className={cn(
              "transition-all duration-300",
              isFilled 
                ? "fill-amber-400 text-amber-400 drop-shadow-sm scale-110" 
                : "fill-slate-100 text-slate-300"
            )}
          />
        );
      })}
    </div>
  );
}
