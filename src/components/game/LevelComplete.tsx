'use client';

import React from 'react';
import { Trophy, ArrowRight, List } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { StarsDisplay } from '@/components/game/StarsDisplay';
import { Confetti } from '@/components/game/Confetti';

interface LevelCompleteProps {
  isOpen: boolean;
  stars: number;
  xpEarned: number;
  onNext: () => void;
  onBack: () => void;
}

export function LevelComplete({ isOpen, stars, xpEarned, onNext, onBack }: LevelCompleteProps) {
  return (
    <>
      <Confetti isActive={isOpen} />
      <Modal isOpen={isOpen} onClose={onBack} className="max-w-md text-center border-t-8 border-t-emerald-500">
        <div className="py-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Trophy className="w-10 h-10 text-emerald-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Nivel Completado!</h2>
          <p className="text-slate-600 mb-8">¡Excelente trabajo! Has resuelto la consulta correctamente.</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 w-full mb-8 border border-slate-100">
            <div className="flex flex-col items-center justify-center mb-6">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Tu Calificación</span>
              <StarsDisplay stars={stars} size="lg" />
            </div>
            
            <div className="border-t border-slate-200 pt-4">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">XP Ganada</span>
              <span className="text-3xl font-black text-amber-500 drop-shadow-sm">+{xpEarned} XP</span>
            </div>
          </div>
          
          <div className="flex flex-col w-full space-y-3">
            <Button onClick={onNext} size="lg" className="w-full text-lg shadow-md group">
              Siguiente Nivel
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button onClick={onBack} variant="secondary" size="lg" className="w-full">
              <List className="mr-2" size={20} />
              Volver a los módulos
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
