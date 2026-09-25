import { QueryResult, ComparisonResult } from '@/types/sql';

/**
 * Compara dos resultados de consultas SQL
 * @param userResult El resultado de la consulta del usuario
 * @param expectedResult El resultado de la consulta esperada
 * @param exactOrder Si el orden de las filas importa (false por defecto)
 * @returns Objeto con el resultado de la comparación
 */
export function compareResults(
  userResult: QueryResult,
  expectedResult: QueryResult,
  exactOrder: boolean = false
): ComparisonResult {
  if (userResult.error) {
    return {
      isCorrect: false,
      matchPercentage: 0,
      feedback: 'Tu consulta produjo un error.',
      userResult,
      expectedResult
    };
  }

  // Validar cantidad de columnas
  if (userResult.columns.length !== expectedResult.columns.length) {
    return {
      isCorrect: false,
      matchPercentage: 0,
      feedback: `El número de columnas es incorrecto. Esperado: ${expectedResult.columns.length}, Obtenido: ${userResult.columns.length}`,
      userResult,
      expectedResult
    };
  }

  // Validar cantidad de filas
  if (userResult.rows.length !== expectedResult.rows.length) {
    return {
      isCorrect: false,
      matchPercentage: 0,
      feedback: `El número de filas es incorrecto. Esperado: ${expectedResult.rows.length}, Obtenido: ${userResult.rows.length}`,
      userResult,
      expectedResult
    };
  }

  // Formatear filas para comparación
  const formatRow = (row: any[]) => JSON.stringify(row);

  const expectedFormatted = expectedResult.rows.map(formatRow);
  const userFormatted = userResult.rows.map(formatRow);

  let isCorrect = true;
  let matches = 0;
  const totalRows = expectedFormatted.length;

  if (totalRows === 0) {
    return {
      isCorrect: true,
      matchPercentage: 100,
      userResult,
      expectedResult
    };
  }

  if (exactOrder) {
    for (let i = 0; i < totalRows; i++) {
      if (expectedFormatted[i] === userFormatted[i]) {
        matches++;
      } else {
        isCorrect = false;
      }
    }
  } else {
    const expectedSorted = [...expectedFormatted].sort();
    const userSorted = [...userFormatted].sort();

    for (let i = 0; i < totalRows; i++) {
      if (expectedSorted[i] === userSorted[i]) {
        matches++;
      } else {
        isCorrect = false;
      }
    }
  }

  const matchPercentage = (matches / totalRows) * 100;

  return {
    isCorrect,
    matchPercentage,
    feedback: isCorrect ? '¡Consulta correcta!' : 'Los datos devueltos no coinciden con lo esperado.',
    userResult,
    expectedResult
  };
}
