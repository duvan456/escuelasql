import { Module } from '../../types/game';

export const whereBasico: Module = {
  id: '02-where',
  title: 'Filtrando Datos con WHERE',
  description: 'Un contador no revisa todos los recibos, solo los que importan. Aprende a filtrar la información.',
  icon: 'funnel',
  difficulty: 'principiante',
  schemaKey: 'contabilidad',
  levels: [
    {
      id: 'lvl-2-1',
      title: 'Clientes Paisas',
      story: 'Estamos abriendo una nueva sede en Medellín y queremos enviar invitaciones a nuestros clientes actuales en esa ciudad.',
      instruction: 'Selecciona todos los clientes (todas las columnas) cuya `ciudad` sea "Medellín".',
      hints: [
        'Usa la cláusula WHERE después de FROM.',
        'Para textos, usa comillas simples: WHERE columna = \'Valor\'.',
        'Asegúrate de escribir Medellín con tilde.'
      ],
      tables: ['clientes'],
      expectedQuery: "SELECT * FROM clientes WHERE ciudad = 'Medellín';",
      validationMode: 'unordered',
      xpReward: 60,
      concepts: ['WHERE', 'Igualdad']
    },
    {
      id: 'lvl-2-2',
      title: 'Productos Costosos',
      story: 'Tenemos que hacer un seguro para los productos más valiosos del inventario.',
      instruction: 'Encuentra los productos cuyo `precio` sea mayor a 1,000,000. Muestra `nombre` y `precio`.',
      hints: [
        'No uses comas en los números dentro de la consulta SQL (usa 1000000).',
        'El operador de "mayor que" es >.',
        'WHERE precio > 1000000'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT nombre, precio FROM productos WHERE precio > 1000000;',
      validationMode: 'unordered',
      xpReward: 70,
      concepts: ['WHERE', 'Operadores Matemáticos']
    },
    {
      id: 'lvl-2-3',
      title: 'Facturas Pendientes',
      story: '¡Alerta de flujo de caja! Hay dinero que no nos ha llegado. Busca las facturas que no han sido pagadas.',
      instruction: 'Selecciona todas las columnas de `facturas` con `estado` igual a "Pendiente".',
      hints: [
        'Recuerda usar comillas simples para los textos.',
        'La tabla es facturas, la columna es estado.'
      ],
      tables: ['facturas'],
      expectedQuery: "SELECT * FROM facturas WHERE estado = 'Pendiente';",
      validationMode: 'unordered',
      xpReward: 70,
      concepts: ['WHERE']
    },
    {
      id: 'lvl-2-4',
      title: 'En un Rango',
      story: 'El auditor quiere ver las facturas del primer trimestre (enero a marzo) de 2023.',
      instruction: 'Encuentra las facturas cuya `fecha` esté entre "2023-01-01" y "2023-03-31".',
      hints: [
        'Puedes usar >= y <= combinados con AND, o usar BETWEEN.',
        'Ejemplo: WHERE fecha BETWEEN \'2023-01-01\' AND \'2023-03-31\'.'
      ],
      tables: ['facturas'],
      expectedQuery: "SELECT * FROM facturas WHERE fecha BETWEEN '2023-01-01' AND '2023-03-31';",
      validationMode: 'unordered',
      xpReward: 80,
      concepts: ['BETWEEN', 'Fechas']
    },
    {
      id: 'lvl-2-5',
      title: 'Búsqueda por Patrones',
      story: 'Recordamos que había un cliente cuyo nombre era algo de "Tecnología...", pero olvidamos el nombre exacto.',
      instruction: 'Busca en la tabla `clientes` aquellos cuyo `nombre` empiece por la palabra "Tecnología".',
      hints: [
        'Usa el operador LIKE para búsquedas parciales.',
        'El símbolo % actúa como comodín (reemplaza cualquier texto).',
        'Ejemplo: WHERE nombre LIKE \'Tecnología%\''
      ],
      tables: ['clientes'],
      expectedQuery: "SELECT * FROM clientes WHERE nombre LIKE 'Tecnología%';",
      validationMode: 'unordered',
      xpReward: 90,
      concepts: ['LIKE', 'Comodines']
    }
  ]
};
