/**
 * Opciones para la configuración inicial de la base de datos
 */
export interface DatabaseConfig {
  schema?: string;
  seedData?: string;
}

/**
 * Resultado de ejecutar una consulta SQL
 */
export interface QueryResult {
  columns: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[][];
  error?: string;
}

/**
 * Resultado de comparar la consulta del usuario con la esperada
 */
export interface ComparisonResult {
  isCorrect: boolean;
  matchPercentage: number;
  feedback?: string;
  userResult?: QueryResult;
  expectedResult?: QueryResult;
}
