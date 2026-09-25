'use client';

import React from 'react';
import { Database, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ResultTableProps {
  columns: string[];
  rows: any[][];
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function ResultTable({ columns, rows, isLoading, error, className }: ResultTableProps) {
  if (error) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-xl text-center", className)}>
        <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
        <h3 className="text-lg font-medium text-red-800 mb-1">Error en la consulta</h3>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-12 bg-slate-50 border border-slate-200 rounded-xl", className)}>
        <div className="animate-pulse flex flex-col items-center">
          <Database className="w-12 h-12 text-slate-300 mb-4 animate-bounce" />
          <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!columns.length) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-12 bg-slate-50 border border-slate-200 border-dashed rounded-xl", className)}>
        <Database className="w-12 h-12 text-slate-300 mb-3" />
        <p className="text-slate-500 font-medium">Ejecuta una consulta para ver resultados</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200 sticky top-0">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500 italic">
                  La consulta se ejecutó con éxito pero no devolvió filas (0 resultados).
                </td>
              </tr>
            ) : (
              rows.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  className={cn(
                    "border-b border-slate-100 hover:bg-emerald-50 transition-colors",
                    rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-3 whitespace-nowrap font-mono text-slate-700">
                      {cell === null ? (
                        <span className="text-slate-400 italic">NULL</span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex justify-between">
        <span>Filas: {rows.length}</span>
        <span>Columnas: {columns.length}</span>
      </div>
    </div>
  );
}
