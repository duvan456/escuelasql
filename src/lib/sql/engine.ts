import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { DatabaseConfig, QueryResult } from '@/types/sql';

let SQL: SqlJsStatic | null = null;

/**
 * Inicializa la instancia de SQL.js si no ha sido inicializada
 */
export async function getSql(): Promise<SqlJsStatic> {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: () => '/sql-wasm.wasm',
    });
  }
  return SQL;
}

/**
 * Crea una nueva instancia de la base de datos con un esquema y datos iniciales opcionales
 */
export async function createDatabase(config?: DatabaseConfig): Promise<Database> {
  const sqljs = await getSql();
  const db = new sqljs.Database();

  try {
    if (config?.schema) {
      db.run(config.schema);
    }
    if (config?.seedData) {
      db.run(config.seedData);
    }
  } catch (error: any) {
    db.close();
    throw new Error(`Error inicializando la base de datos: ${error.message}`);
  }

  return db;
}

/**
 * Ejecuta una consulta SQL y devuelve los resultados formateados
 */
export function executeQuery(db: Database, query: string): QueryResult {
  try {
    const results = db.exec(query);
    if (results.length === 0) {
      return { columns: [], rows: [] };
    }
    return {
      columns: results[0].columns,
      rows: results[0].values,
    };
  } catch (error: any) {
    return {
      columns: [],
      rows: [],
      error: error.message,
    };
  }
}
