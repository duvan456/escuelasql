'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface SqlEditorProps {
  onExecute: (query: string) => void;
  disabled?: boolean;
  error?: string | null;
  defaultValue?: string;
  className?: string;
}

export function SqlEditor({ 
  onExecute, 
  disabled = false, 
  error, 
  defaultValue = '',
  className 
}: SqlEditorProps) {
  const [query, setQuery] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && query.trim()) {
        onExecute(query);
      }
    }
  };

  const lineCount = query.split('\n').length;
  const lines = Array.from({ length: Math.max(5, lineCount) }, (_, i) => i + 1);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="relative flex border border-slate-300 rounded-xl overflow-hidden bg-[#1e1e1e] text-[#d4d4d4] focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
        {/* Line numbers */}
        <div className="py-4 px-3 bg-[#252526] border-r border-[#333333] text-slate-500 font-mono text-sm text-right select-none min-w-[3rem]">
          {lines.map(n => <div key={n}>{n}</div>)}
        </div>
        
        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Escribe tu consulta SQL aquí... (Ej: SELECT * FROM empleados)"
          className="w-full flex-1 p-4 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed placeholder:text-slate-500 text-emerald-300"
          rows={Math.max(5, lineCount)}
          spellCheck={false}
        />
      </div>

      <div className="mt-4 flex justify-between items-start gap-4">
        <div className="flex-1">
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
              <span className="font-semibold">Error: </span>{error}
            </div>
          )}
        </div>
        <Button 
          onClick={() => onExecute(query)}
          disabled={disabled || !query.trim()}
          variant="primary"
          className="shrink-0 group shadow-sm"
        >
          <Play size={18} className="mr-2 fill-current group-hover:scale-110 transition-transform" />
          Ejecutar
        </Button>
      </div>
      <div className="text-xs text-slate-400 mt-2 text-right">
        Tip: Presiona <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-sans text-slate-600">Ctrl</kbd> + <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-sans text-slate-600">Enter</kbd> para ejecutar
      </div>
    </div>
  );
}
