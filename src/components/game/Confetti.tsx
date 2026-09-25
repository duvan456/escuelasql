'use client';

import React, { useEffect, useState } from 'react';

export function Confetti({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; animationDuration: string; backgroundColor: string; delay: string }>>([]);

  useEffect(() => {
    if (isActive) {
      const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 0.5}s`,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-[-10px] w-3 h-3 rounded-full opacity-0 animate-confetti"
          style={{
            left: p.left,
            backgroundColor: p.backgroundColor,
            animation: `confettiFall ${p.animationDuration} ease-in ${p.delay} forwards`,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}} />
    </div>
  );
}
