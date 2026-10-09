import { Module } from '../../types/game';

export const subconsultas: Module = {
  id: '08-subconsultas',
  title: 'Subconsultas (Inception)',
  description: 'Consultas dentro de consultas. Resuelve problemas complejos dividiéndolos en partes.',
  icon: 'layers',
  difficulty: 'avanzado',
  schemaKey: 'nomina',
  levels: [
    {
      id: 'lvl-8-1',
      title: 'Ganan más que el Promedio',
      story: 'La junta directiva quiere revisar los casos de aquellos empleados cuyo salario es mayor al salario promedio de toda la empresa.',
      instruction: 'Muestra el `nombre` y `salario` de los `empleados` cuyo `salario` sea mayor que (SELECT AVG(salario) FROM empleados).',
      hints: [
        'En tu WHERE, usa > y luego abre paréntesis para la subconsulta.',
        'WHERE salario > (SELECT AVG(salario) FROM empleados)'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre, salario FROM empleados WHERE salario > (SELECT AVG(salario) FROM empleados);',
      validationMode: 'unordered',
      xpReward: 160,
      concepts: ['Subqueries en WHERE']
    },
    {
      id: 'lvl-8-2',
      title: 'El Empleado Más Nuevo',
      story: 'Queremos darle un kit de bienvenida al empleado que ingresó más recientemente.',
      instruction: 'Muestra el `nombre` y `fecha_ingreso` del empleado cuya `fecha_ingreso` sea exactamente igual a la fecha máxima (MAX).',
      hints: [
        'WHERE fecha_ingreso = (SELECT MAX(fecha_ingreso) FROM empleados)'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre, fecha_ingreso FROM empleados WHERE fecha_ingreso = (SELECT MAX(fecha_ingreso) FROM empleados);',
      validationMode: 'unordered',
      xpReward: 170,
      concepts: ['Subqueries con MAX']
    },
    {
      id: 'lvl-8-3',
      schemaKey: 'contabilidad',
      title: 'Productos sin Vender',
      story: '(Esquema Contabilidad). Hay productos en inventario que nunca se han facturado. ¡Hagamos una promoción!',
      instruction: 'Encuentra los `productos` (nombre) cuyo `id` NO esté (NOT IN) en la columna `producto_id` de la tabla `detalle_factura`.',
      hints: [
        'Usa WHERE id NOT IN (...)',
        'Dentro del paréntesis: SELECT producto_id FROM detalle_factura'
      ],
      tables: ['productos', 'detalle_factura'],
      expectedQuery: 'SELECT nombre FROM productos WHERE id NOT IN (SELECT producto_id FROM detalle_factura);',
      validationMode: 'unordered',
      xpReward: 180,
      concepts: ['NOT IN', 'Subqueries']
    },
    {
      id: 'lvl-8-4',
      schemaKey: 'contabilidad',
      title: 'Clientes con Compras Grandes',
      story: 'Queremos encontrar los nombres de los clientes que tienen al menos una factura con un valor mayor a 5,000,000.',
      instruction: 'Muestra los nombres de los `clientes` cuyo `id` esté IN (SELECT cliente_id FROM facturas WHERE total > 5000000).',
      hints: [
        'WHERE id IN (...)',
        'Dentro del paréntesis pon la consulta de las facturas grandes.'
      ],
      tables: ['clientes', 'facturas'],
      expectedQuery: 'SELECT nombre FROM clientes WHERE id IN (SELECT cliente_id FROM facturas WHERE total > 5000000);',
      validationMode: 'unordered',
      xpReward: 190,
      concepts: ['IN', 'Subqueries combinadas']
    },
    {
      id: 'lvl-8-5',
      schemaKey: 'contabilidad',
      title: 'El Producto Estrella',
      story: '¿Cuál es el producto más caro que tenemos a la venta? (No vale limitarlo).',
      instruction: 'Encuentra el `nombre` y `precio` del producto en la tabla `productos` usando una subconsulta con MAX(precio).',
      hints: [
        'Igual que el de la fecha más reciente, pero con el precio.',
        'WHERE precio = (SELECT MAX(precio) FROM productos)'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT nombre, precio FROM productos WHERE precio = (SELECT MAX(precio) FROM productos);',
      validationMode: 'unordered',
      xpReward: 200,
      concepts: ['Subqueries avanzadas']
    }
  ]
};
