import { Module } from '../../types/game';

export const funcionesAgregadas: Module = {
  id: '04-agregadas',
  title: 'Funciones de Agregación',
  description: 'Contar, sumar, promediar... ¡el pan de cada día de un contador! Usa COUNT, SUM, AVG, MIN y MAX.',
  icon: 'calculator',
  difficulty: 'intermedio',
  schemaKey: 'contabilidad',
  levels: [
    {
      id: 'lvl-4-1',
      title: 'El Conteo de Clientes',
      story: 'El gerente de mercadeo pregunta: "¿A cuántos clientes estamos atendiendo actualmente?"',
      instruction: 'Usa la función COUNT para contar cuántos registros hay en la tabla `clientes`. Devuelve el resultado con el alias "total_clientes".',
      hints: [
        'COUNT(*) cuenta todas las filas.',
        'Puedes usar AS para darle el nombre "total_clientes" al resultado.',
        'SELECT COUNT(*) AS total_clientes FROM clientes;'
      ],
      tables: ['clientes'],
      expectedQuery: 'SELECT COUNT(*) AS total_clientes FROM clientes;',
      validationMode: 'unordered',
      xpReward: 80,
      concepts: ['COUNT']
    },
    {
      id: 'lvl-4-2',
      title: 'La Gran Suma',
      story: 'Es cierre de mes y necesitamos saber el total de dinero facturado.',
      instruction: 'Suma todos los valores de la columna `total` en la tabla `facturas`. Llama al resultado "ventas_totales".',
      hints: [
        'Usa la función SUM(columna).',
        'SELECT SUM(total) AS ventas_totales...'
      ],
      tables: ['facturas'],
      expectedQuery: 'SELECT SUM(total) AS ventas_totales FROM facturas;',
      validationMode: 'unordered',
      xpReward: 85,
      concepts: ['SUM']
    },
    {
      id: 'lvl-4-3',
      title: 'Precio Promedio',
      story: '¿Qué tan caros son nuestros productos en promedio? La competencia está bajando precios.',
      instruction: 'Calcula el promedio (AVG) de la columna `precio` en la tabla `productos`. Usa el alias "precio_promedio".',
      hints: [
        'Usa AVG() para obtener el promedio.',
        'SELECT AVG(precio) AS precio_promedio FROM productos;'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT AVG(precio) AS precio_promedio FROM productos;',
      validationMode: 'unordered',
      xpReward: 90,
      concepts: ['AVG']
    },
    {
      id: 'lvl-4-4',
      title: 'Extremos del Inventario',
      story: 'Auditoría quiere conocer el producto más barato y el más caro que vendemos para revisar políticas de precios.',
      instruction: 'Selecciona el precio mínimo (MIN) y el precio máximo (MAX) de la tabla `productos`.',
      hints: [
        'Puedes usar múltiples funciones de agregación en una sola consulta.',
        'SELECT MIN(precio), MAX(precio) FROM productos;'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT MIN(precio), MAX(precio) FROM productos;',
      validationMode: 'unordered',
      xpReward: 95,
      concepts: ['MIN', 'MAX']
    },
    {
      id: 'lvl-4-5',
      title: 'Cartera Pendiente',
      story: 'Necesitamos saber exactamente cuánta plata está en la calle, es decir, el total de las facturas que no nos han pagado.',
      instruction: 'Suma el `total` de las `facturas` que tengan el `estado` "Pendiente". Llama a la columna "cartera_pendiente".',
      hints: [
        'Combina SUM con WHERE.',
        'Primero sumas, luego indicas la tabla, y al final pones la condición (WHERE estado = \'Pendiente\').'
      ],
      tables: ['facturas'],
      expectedQuery: "SELECT SUM(total) AS cartera_pendiente FROM facturas WHERE estado = 'Pendiente';",
      validationMode: 'unordered',
      xpReward: 100,
      concepts: ['SUM', 'WHERE']
    }
  ]
};
