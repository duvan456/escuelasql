'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive';
  header?: React.ReactNode;
  noPadding?: boolean;
}

export function Card({
  className,
  variant = 'default',
  header,
  noPadding = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white overflow-hidden',
        variant === 'interactive' && 'transition-shadow hover:shadow-md cursor-pointer',
        className
      )}
      {...props}
    >
      {header && (
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          {header}
        </div>
      )}
      <div className={cn(!noPadding && 'p-6')}>
        {children}
      </div>
    </div>
  );
}
