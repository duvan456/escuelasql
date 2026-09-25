import { Module } from '../../types/game';

export const orderBy: Module = {
  id: '03-order-by',
  title: 'Ordenando la Casa',
  description: 'Un reporte desordenado es un dolor de cabeza. Aprende a ordenar la información con ORDER BY.',
  icon: 'arrow-down',
  difficulty: 'principiante',
  schemaKey: 'nomina',
  levels: [
    {
      id: 'lvl-3-1',
      title: 'Nómina de Menor a Mayor',
      story: 'Para evaluar ajustes salariales, recursos humanos necesita ver a los empleados ordenados por su salario.',
      instruction: 'Selecciona el `nombre` y `salario` de todos los empleados, ordenados por salario de menor a mayor (ascendente).',
      hints: [
        'Usa la cláusula ORDER BY después de WHERE (o después de FROM si no hay WHERE).',
        'Por defecto, ORDER BY ordena de forma ascendente (ASC).',
        'Ejemplo: ORDER BY salario ASC'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre, salario FROM empleados ORDER BY salario ASC;',
      validationMode: 'exact',
      xpReward: 70,
      concepts: ['ORDER BY', 'ASC']
    },
    {
      id: 'lvl-3-2',
      title: 'Los Más Antiguos',
      story: 'Vamos a entregar los premios a la lealtad. Necesitamos saber quiénes llevan más tiempo con nosotros.',
      instruction: 'Selecciona `nombre` y `fecha_ingreso` de la tabla `empleados`, ordenados por fecha de ingreso desde el más antiguo hasta el más reciente.',
      hints: [
        'Ordenar fechas de manera ascendente (ASC) pone las más antiguas primero.',
        'Intenta ORDER BY fecha_ingreso.'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre, fecha_ingreso FROM empleados ORDER BY fecha_ingreso ASC;',
      validationMode: 'exact',
      xpReward: 75,
      concepts: ['ORDER BY', 'Fechas']
    },
    {
      id: 'lvl-3-3',
      title: 'Los Sueldos Altos',
      story: 'La gerencia quiere revisar el presupuesto. ¿Quiénes son los que más ganan?',
      instruction: 'Muestra `nombre`, `cargo` y `salario` de los empleados, ordenados por salario de MAYOR a menor (descendente).',
      hints: [
        'Para ordenar de mayor a menor, debes usar la palabra DESC al final de la columna.',
        'ORDER BY salario DESC'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre, cargo, salario FROM empleados ORDER BY salario DESC;',
      validationMode: 'exact',
      xpReward: 80,
      concepts: ['ORDER BY', 'DESC']
    },
    {
      id: 'lvl-3-4',
      title: 'Los 3 Jefazos',
      story: 'Solo queremos ver el Top 3 de los empleados mejor pagados, el resto no importa en esta reunión.',
      instruction: 'Selecciona los 3 empleados con mayor salario. Muestra `nombre` y `salario`.',
      hints: [
        'Usa LIMIT al final de tu consulta para limitar el número de resultados.',
        'Debes ordenar de mayor a menor (DESC) y luego poner LIMIT 3.'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre, salario FROM empleados ORDER BY salario DESC LIMIT 3;',
      validationMode: 'exact',
      xpReward: 90,
      concepts: ['LIMIT']
    },
    {
      id: 'lvl-3-5',
      title: 'Orden Múltiple',
      story: 'El departamento de nómina quiere el listado por departamento, y dentro de cada departamento, ordenado alfabéticamente.',
      instruction: 'Selecciona todas las columnas de empleados. Ordena primero por `departamento_id` (ascendente) y luego por `nombre` (ascendente).',
      hints: [
        'Puedes ordenar por múltiples columnas separándolas con una coma.',
        'ORDER BY columna1 ASC, columna2 ASC'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT * FROM empleados ORDER BY departamento_id ASC, nombre ASC;',
      validationMode: 'exact',
      xpReward: 100,
      concepts: ['ORDER BY Múltiple']
    }
  ]
};
