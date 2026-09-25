/**
 * Expresión regular para identificar sentencias prohibidas
 * Ignora las palabras clave si están dentro de comillas simples o dobles
 */
const FORBIDDEN_COMMANDS = [
  'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE',
  'TRUNCATE', 'REPLACE', 'GRANT', 'REVOKE', 'EXEC', 'EXECUTE',
  'ATTACH', 'DETACH', 'PRAGMA', 'VACUUM', 'REINDEX'
];

/**
 * Valida que una consulta SQL sea segura (solo SELECT o WITH)
 * @param query La consulta SQL a validar
 * @returns Un mensaje de error si la consulta es inválida, null si es válida
 */
export function validateQuery(query: string): string | null {
  if (!query || query.trim() === '') {
    return 'La consulta no puede estar vacía.';
  }

  // Eliminar comentarios para facilitar la validación
  const noComments = query.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

  // Limpiar strings literales para evitar falsos positivos
  // Reemplaza el contenido de '...' y "..." con un placeholder
  const cleanedQuery = noComments
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .toUpperCase();

  // Verificar si empieza con SELECT o WITH
  const trimmedUpper = cleanedQuery.trimStart();
  if (!trimmedUpper.startsWith('SELECT') && !trimmedUpper.startsWith('WITH')) {
    return 'Solo se permiten consultas SELECT (o usando WITH para CTEs).';
  }

  // Verificar comandos prohibidos
  for (const cmd of FORBIDDEN_COMMANDS) {
    // Buscar la palabra exacta (con límites de palabra)
    const regex = new RegExp(`\\b${cmd}\\b`);
    if (regex.test(cleanedQuery)) {
      return `Operación no permitida: no puedes usar comandos que modifiquen la base de datos (${cmd}).`;
    }
  }

  return null;
}
