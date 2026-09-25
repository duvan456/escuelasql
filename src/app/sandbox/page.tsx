'use client'

import { useState } from 'react'
import { Database } from 'lucide-react'
import { useSqlEngine } from '@/hooks/useSqlEngine'
import { schemaContabilidad } from '@/data/schemas/contabilidad'
import { schemaNomina } from '@/data/schemas/nomina'
import { seedContabilidad } from '@/data/seeds/contabilidad'
import { seedNomina } from '@/data/seeds/nomina'
import { SqlEditor } from '@/components/game/SqlEditor'
import { ResultTable } from '@/components/game/ResultTable'

const schemaMap = {
  contabilidad: { schema: schemaContabilidad, seed: seedContabilidad },
  nomina: { schema: schemaNomina, seed: seedNomina },
}

export default function SandboxPage() {
  const [schemaKey, setSchemaKey] = useState<'contabilidad' | 'nomina'>('contabilidad')
  const { schema, seed } = schemaMap[schemaKey]
  const { executeQuery, isReady, error: engineError } = useSqlEngine(schema, seed)

  const [queryResult, setQueryResult] = useState<{ columns: string[]; rows: any[][] } | null>(null)
  const [queryError, setQueryError] = useState<string | null>(null)

  const handleRun = (query: string) => {
    const result = executeQuery(query)
    if (result.error) {
      setQueryError(result.error)
      setQueryResult(null)
    } else {
      setQueryError(null)
      setQueryResult({ columns: result.columns, rows: result.rows })
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full">
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Database size={20} className="text-amber-400" />
            Sandbox SQL
          </h1>
          <p className="text-sm text-slate-400">Tu área de pruebas libre — experimenta sin límites</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300">Base de datos:</span>
          <select 
            className="bg-slate-700 text-white border-none rounded px-3 py-1.5 text-sm cursor-pointer"
            value={schemaKey}
            onChange={(e) => {
              setSchemaKey(e.target.value as 'contabilidad' | 'nomina')
              setQueryResult(null)
              setQueryError(null)
            }}
          >
            <option value="contabilidad">Contabilidad (clientes, facturas, productos)</option>
            <option value="nomina">Nómina (empleados, departamentos)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="h-1/2 min-h-[300px] border-b border-slate-200 p-4">
          <SqlEditor 
            defaultValue={schemaKey === 'contabilidad' ? 'SELECT * FROM clientes;' : 'SELECT * FROM empleados;'}
            onExecute={handleRun}
            disabled={!isReady}
            error={queryError}
          />
        </div>

        <div className="h-1/2 bg-slate-50 p-4 flex flex-col overflow-hidden">
          <h3 className="font-semibold text-slate-700 mb-2 shrink-0">Resultados</h3>

          <div className="flex-grow overflow-auto bg-white rounded border border-slate-200">
            {!isReady ? (
              <div className="p-8 text-center text-slate-500">Cargando motor SQL...</div>
            ) : engineError ? (
              <div className="p-4 text-rose-600 bg-rose-50 font-mono text-sm">{engineError}</div>
            ) : queryResult ? (
              <ResultTable columns={queryResult.columns} rows={queryResult.rows} />
            ) : (
              <div className="p-8 text-center text-slate-400">
                Ejecuta una consulta para ver los resultados aquí.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
