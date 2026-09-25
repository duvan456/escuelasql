import { useState, useEffect, useCallback, useRef } from 'react';
import { createDatabase, executeQuery } from '@/lib/sql/engine';
import { validateQuery } from '@/lib/sql/validator';
import type { QueryResult } from '@/types/sql';
import type { Database } from 'sql.js';

/**
 * Hook para inicializar y usar el motor SQL (sql.js) en el navegador.
 * @param schema - Sentencias CREATE TABLE
 * @param seedData - Sentencias INSERT con datos de ejemplo
 */
export function useSqlEngine(schema?: string, seedData?: string) {
  const dbRef = useRef<Database | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // Cerrar DB anterior si existe
        if (dbRef.current) {
          dbRef.current.close();
          dbRef.current = null;
        }

        const db = await createDatabase({
          schema: schema || '',
          seedData: seedData || '',
        });

        if (!cancelled) {
          dbRef.current = db;
          setIsReady(true);
          setError(null);
        } else {
          db.close();
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Error al inicializar la base de datos');
          setIsReady(false);
        }
      }
    };

    init();

    return () => {
      cancelled = true;
      if (dbRef.current) {
        dbRef.current.close();
        dbRef.current = null;
      }
    };
  }, [schema, seedData]);

  const runQuery = useCallback((query: string): QueryResult => {
    if (!dbRef.current) {
      return { columns: [], rows: [], error: 'La base de datos no está lista' };
    }

    // Validar que solo sea SELECT
    const validationError = validateQuery(query);
    if (validationError) {
      return {
        columns: [],
        rows: [],
        error: `⚠️ ${validationError}`,
      };
    }

    return executeQuery(dbRef.current, query);
  }, []);

  return { executeQuery: runQuery, isReady, error };
}
