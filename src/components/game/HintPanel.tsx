'use client';

import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

interface HintPanelProps {
  hints: string[];
  hintsRevealed: number;
  onRevealHint: () => void;
  className?: string;
}

export function HintPanel({ hints, hintsRevealed, onRevealHint, className }: HintPanelProps) {
  if (!hints || hints.length === 0) return null;

  const allRevealed = hintsRevealed >= hints.length;

  return (
    <Card noPadding className={cn("overflow-hidden border-amber-200", className)}>
      <div className="bg-amber-50 px-4 py-3 flex items-center justify-between border-b border-amber-200">
        <div className="flex items-center text-amber-800 font-medium">
          <Lightbulb className="w-5 h-5 mr-2 text-amber-500 fill-amber-200" />
          Pistas disponibles ({hintsRevealed}/{hints.length})
        </div>
        {!allRevealed && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={onRevealHint}
            className="text-amber-700 hover:bg-amber-100 bg-amber-200/50"
          >
            Ver pista
          </Button>
        )}
      </div>
      
      {hintsRevealed > 0 ? (
        <div className="p-4 bg-white space-y-3">
          {hints.slice(0, hintsRevealed).map((hint, idx) => (
            <div key={idx} className="flex items-start text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-bold text-amber-500 mr-2 shrink-0">#{idx + 1}</span>
              <span className="text-slate-700">{hint}</span>
            </div>
          ))}
          
          {!allRevealed && (
            <div className="text-xs flex items-center text-slate-500 mt-2 px-1">
              <AlertTriangle className="w-3 h-3 mr-1 text-amber-500" />
              Usar más pistas reducirá los puntos (XP) que ganas en este nivel.
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-white text-sm text-slate-500 text-center italic">
          Si te quedas atascado, pide una pista. 
          <br/>
          <span className="text-xs text-amber-600 font-medium">(Reduce ligeramente la XP obtenida)</span>
        </div>
      )}
    </Card>
  );
}
