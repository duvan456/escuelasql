import { Module } from '../../types/game';

export const groupBy: Module = {
  id: '05-group-by',
  title: 'Agrupando Datos (GROUP BY)',
  description: 'Aprende a resumir información por categorías. Indispensable para informes gerenciales.',
  icon: 'pie-chart',
  difficulty: 'intermedio',
  schemaKey: 'nomina',
  levels: [
    {
      id: 'lvl-5-1',
      title: 'Censo Empresarial',
      story: 'Recursos humanos quiere saber cuántos empleados hay en cada departamento (usando el ID del departamento por ahora).',
      instruction: 'Selecciona `departamento_id` y cuenta la cantidad de empleados (COUNT). Agrupa los resultados usando GROUP BY `departamento_id`.',
      hints: [
        'Usa SELECT departamento_id, COUNT(*)',
        'Después de FROM empleados, añade GROUP BY departamento_id.'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT departamento_id, COUNT(*) FROM empleados GROUP BY departamento_id;',
      validationMode: 'unordered',
      xpReward: 100,
      concepts: ['GROUP BY', 'COUNT']
    },
    {
      id: 'lvl-5-2',
      title: 'Costo por Departamento',
      story: 'Contabilidad quiere saber cuánto dinero se gasta en salarios en cada departamento.',
      instruction: 'Selecciona `departamento_id` y la suma de `salario` (como "costo_nomina"). Agrupa por `departamento_id`.',
      hints: [
        'SELECT departamento_id, SUM(salario) AS costo_nomina',
        'Agrupa por departamento_id'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT departamento_id, SUM(salario) AS costo_nomina FROM empleados GROUP BY departamento_id;',
      validationMode: 'unordered',
      xpReward: 110,
      concepts: ['GROUP BY', 'SUM']
    },
    {
      id: 'lvl-5-3',
      title: 'Promedio Salarial por Cargo',
      story: 'Vamos a revisar la equidad salarial. ¿Cuánto gana en promedio cada tipo de cargo?',
      instruction: 'Muestra el `cargo` y el salario promedio (como "salario_promedio"). Agrupa los datos por `cargo`.',
      hints: [
        'Tu columna de agrupación ahora es cargo.',
        'La función es AVG(salario).'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT cargo, AVG(salario) AS salario_promedio FROM empleados GROUP BY cargo;',
      validationMode: 'unordered',
      xpReward: 115,
      concepts: ['GROUP BY', 'AVG']
    },
    {
      id: 'lvl-5-4',
      title: 'Análisis de Ventas (Cambio de Esquema)',
      story: 'Volviendo a contabilidad, necesitamos saber cómo nos pagan nuestros clientes.',
      instruction: 'Ve al esquema de contabilidad (tabla facturas). Muestra el `metodo_pago` y cuenta cuántas facturas tienen ese método. Agrupa por `metodo_pago`.',
      hints: [
        'SELECT metodo_pago, COUNT(*) FROM facturas GROUP BY metodo_pago;'
      ],
      tables: ['facturas'],
      expectedQuery: 'SELECT metodo_pago, COUNT(*) FROM facturas GROUP BY metodo_pago;',
      validationMode: 'unordered',
      xpReward: 120,
      concepts: ['GROUP BY']
    },
    {
      id: 'lvl-5-5',
      title: 'Ventas por Cliente Ordenadas',
      story: 'Queremos identificar a nuestros mejores clientes basándonos en cuánto dinero han facturado con nosotros.',
      instruction: 'Selecciona `cliente_id` y la suma del `total` de facturas. Agrupa por `cliente_id` y ORDENA el resultado por la suma de mayor a menor (DESC).',
      hints: [
        'Puedes combinar GROUP BY y ORDER BY.',
        'ORDER BY va después de GROUP BY.',
        'ORDER BY SUM(total) DESC'
      ],
      tables: ['facturas'],
      expectedQuery: 'SELECT cliente_id, SUM(total) FROM facturas GROUP BY cliente_id ORDER BY SUM(total) DESC;',
      validationMode: 'exact',
      xpReward: 130,
      concepts: ['GROUP BY', 'ORDER BY']
    }
  ]
};
