'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-sm text-slate-600 font-medium">
          Hecho con <span className="text-emerald-500" aria-label="amor">💚</span> para contadores curiosos
        </p>
      </div>
    </footer>
  );
}
