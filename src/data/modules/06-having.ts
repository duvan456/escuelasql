import { Module } from '../../types/game';

export const having: Module = {
  id: '06-having',
  title: 'Filtrando Grupos (HAVING)',
  description: 'WHERE filtra filas, HAVING filtra grupos. Un nivel más allá en los reportes.',
  icon: 'filter',
  difficulty: 'avanzado',
  schemaKey: 'contabilidad',
  levels: [
    {
      id: 'lvl-6-1',
      title: 'Categorías Rentables',
      story: 'El inventario tiene muchas categorías, pero solo queremos enfocarnos en las que tienen muchos productos.',
      instruction: 'Selecciona la `categoria` y cuenta los productos en la tabla `productos`. Agrupa por `categoria`, y usa HAVING para mostrar solo las categorías que tienen más de 5 productos (COUNT > 5).',
      hints: [
        'HAVING se coloca después de GROUP BY.',
        'Ejemplo: GROUP BY categoria HAVING COUNT(*) > 5'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT categoria, COUNT(*) FROM productos GROUP BY categoria HAVING COUNT(*) > 5;',
      validationMode: 'unordered',
      xpReward: 130,
      concepts: ['HAVING', 'COUNT']
    },
    {
      id: 'lvl-6-2',
      title: 'VIPs de Facturación',
      story: 'Vamos a enviar un regalo navideño a los clientes que hayan facturado más de 5,000,000 en total histórico.',
      instruction: 'Muestra `cliente_id` y la suma de `total` en la tabla `facturas`. Agrupa por `cliente_id` y filtra con HAVING para la suma mayor a 5000000.',
      hints: [
        'HAVING SUM(total) > 5000000'
      ],
      tables: ['facturas'],
      expectedQuery: 'SELECT cliente_id, SUM(total) FROM facturas GROUP BY cliente_id HAVING SUM(total) > 5000000;',
      validationMode: 'unordered',
      xpReward: 140,
      concepts: ['HAVING', 'SUM']
    },
    {
      id: 'lvl-6-3',
      title: 'Precios Promedio Altos',
      story: 'Revisemos qué categorías de productos tienen un precio promedio por encima de 500,000 pesos.',
      instruction: 'En la tabla `productos`, agrupa por `categoria`. Muestra la categoría y su promedio de precio, pero solo de aquellas cuyo promedio sea mayor a 500000.',
      hints: [
        'HAVING AVG(precio) > 500000'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT categoria, AVG(precio) FROM productos GROUP BY categoria HAVING AVG(precio) > 500000;',
      validationMode: 'unordered',
      xpReward: 145,
      concepts: ['HAVING', 'AVG']
    },
    {
      id: 'lvl-6-4',
      title: 'Clientes Multicompras',
      story: 'Queremos premiar la fidelidad. ¿Qué clientes han hecho más de 2 compras (facturas)?',
      instruction: 'Agrupa la tabla `facturas` por `cliente_id`. Cuenta las facturas y filtra con HAVING para los que tengan un conteo mayor a 2.',
      hints: [
        'Usa COUNT(id) o COUNT(*) en el HAVING.'
      ],
      tables: ['facturas'],
      expectedQuery: 'SELECT cliente_id, COUNT(*) FROM facturas GROUP BY cliente_id HAVING COUNT(*) > 2;',
      validationMode: 'unordered',
      xpReward: 150,
      concepts: ['HAVING', 'Fidelidad']
    },
    {
      id: 'lvl-6-5',
      schemaKey: 'nomina',
      title: 'Departamentos Pesados (Nómina)',
      story: 'Volviendo a la nómina, la gerencia quiere saber qué departamentos tienen un costo salarial total mayor a 10,000,000.',
      instruction: 'En la tabla `empleados`, muestra el `departamento_id` y la suma de salarios. Agrupa por departamento y usa HAVING para mostrar solo los mayores a 10000000.',
      hints: [
        'SELECT departamento_id, SUM(salario)... HAVING SUM(salario) > 10000000'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT departamento_id, SUM(salario) FROM empleados GROUP BY departamento_id HAVING SUM(salario) > 10000000;',
      validationMode: 'unordered',
      xpReward: 160,
      concepts: ['HAVING']
    }
  ]
};
