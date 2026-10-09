import { Module } from '../../types/game';

export const joins: Module = {
  id: '07-joins',
  title: 'Relacionando Tablas (JOINs)',
  description: 'Aquí te conviertes en un verdadero maestro. Aprende a unir datos de diferentes tablas.',
  icon: 'git-merge',
  difficulty: 'avanzado',
  schemaKey: 'nomina',
  levels: [
    {
      id: 'lvl-7-1',
      title: 'Nombres, no IDs',
      story: 'Hasta ahora veíamos "departamento_id = 2", pero el jefe no sabe qué es el departamento 2. ¡Unamos tablas para ver los nombres!',
      instruction: 'Usa INNER JOIN para unir `empleados` y `departamentos`. Muestra el nombre del empleado (empleados.nombre) y el nombre de su departamento (departamentos.nombre).',
      hints: [
        'SELECT empleados.nombre, departamentos.nombre FROM empleados',
        'INNER JOIN departamentos ON empleados.departamento_id = departamentos.id;'
      ],
      tables: ['empleados', 'departamentos'],
      expectedQuery: 'SELECT empleados.nombre, departamentos.nombre FROM empleados INNER JOIN departamentos ON empleados.departamento_id = departamentos.id;',
      validationMode: 'unordered',
      xpReward: 150,
      concepts: ['INNER JOIN']
    },
    {
      id: 'lvl-7-2',
      schemaKey: 'contabilidad',
      title: 'Facturas con Nombre y Apellido',
      story: '(Cambiando a Contabilidad). Ver facturas con cliente_id=5 no sirve de mucho al imprimir. Necesitamos el nombre del cliente.',
      instruction: 'Haz un JOIN entre `facturas` y `clientes`. Muestra el ID de la factura, la fecha, y el nombre del cliente.',
      hints: [
        'La tabla principal es facturas.',
        'Une con clientes ON facturas.cliente_id = clientes.id'
      ],
      tables: ['facturas', 'clientes'],
      expectedQuery: 'SELECT facturas.id, facturas.fecha, clientes.nombre FROM facturas INNER JOIN clientes ON facturas.cliente_id = clientes.id;',
      validationMode: 'unordered',
      xpReward: 160,
      concepts: ['INNER JOIN', 'Relaciones']
    },
    {
      id: 'lvl-7-3',
      schemaKey: 'contabilidad',
      title: 'El Detalle de la Compra',
      story: 'Un cliente pregunta por qué su factura 1 salió tan cara. Necesitamos ver los productos que se le cobraron en esa factura.',
      instruction: 'Une `detalle_factura` con `productos`. Muestra el `factura_id`, el `nombre` del producto y la `cantidad`. Filtra (WHERE) para mostrar solo la factura_id = 1.',
      hints: [
        'Une usando detalle_factura.producto_id = productos.id',
        'Agrega un WHERE detalle_factura.factura_id = 1 al final.'
      ],
      tables: ['detalle_factura', 'productos'],
      expectedQuery: 'SELECT detalle_factura.factura_id, productos.nombre, detalle_factura.cantidad FROM detalle_factura INNER JOIN productos ON detalle_factura.producto_id = productos.id WHERE detalle_factura.factura_id = 1;',
      validationMode: 'unordered',
      xpReward: 175,
      concepts: ['JOIN con WHERE']
    },
    {
      id: 'lvl-7-4',
      schemaKey: 'contabilidad',
      title: 'Clientes Fantasmas',
      story: '¿Hay clientes registrados que nunca nos han comprado nada? El equipo comercial quiere contactarlos.',
      instruction: 'Usa LEFT JOIN desde `clientes` hacia `facturas`. Muestra el `nombre` del cliente y el `id` de la factura. Filtra donde facturas.id IS NULL.',
      hints: [
        'LEFT JOIN trae todos los clientes, incluso si no tienen facturas asociadas.',
        'La condición es WHERE facturas.id IS NULL'
      ],
      tables: ['clientes', 'facturas'],
      expectedQuery: 'SELECT clientes.nombre, facturas.id FROM clientes LEFT JOIN facturas ON clientes.id = facturas.cliente_id WHERE facturas.id IS NULL;',
      validationMode: 'unordered',
      xpReward: 190,
      concepts: ['LEFT JOIN', 'IS NULL']
    },
    {
      id: 'lvl-7-5',
      schemaKey: 'contabilidad',
      title: 'El Triple JOIN',
      story: 'El auditor quiere el reporte definitivo: Nombre del cliente, fecha de la factura y nombre del producto comprado.',
      instruction: 'Haz JOIN de 3 tablas: facturas, clientes, y detalle_factura. Une facturas con clientes, y luego facturas con detalle_factura (O detalle con productos... espera, une detalle_factura con facturas y productos). Simplifiquemos: Une detalle_factura con facturas y luego con productos. Muestra facturas.fecha y productos.nombre.',
      hints: [
        'FROM detalle_factura',
        'INNER JOIN facturas ON detalle_factura.factura_id = facturas.id',
        'INNER JOIN productos ON detalle_factura.producto_id = productos.id'
      ],
      tables: ['detalle_factura', 'facturas', 'productos'],
      expectedQuery: 'SELECT facturas.fecha, productos.nombre FROM detalle_factura INNER JOIN facturas ON detalle_factura.factura_id = facturas.id INNER JOIN productos ON detalle_factura.producto_id = productos.id;',
      validationMode: 'unordered',
      xpReward: 200,
      concepts: ['Multiple JOINs']
    }
  ]
};
