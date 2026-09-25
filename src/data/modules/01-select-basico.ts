import { Module } from '../../types/game';

export const selectBasico: Module = {
  id: '01-select-basico',
  title: 'SELECT Básico',
  description: 'Aprende los fundamentos para extraer datos. Como todo buen contador, tu primer paso es saber dónde está la información.',
  icon: '🔍',
  difficulty: 'principiante',
  schemaKey: 'contabilidad',
  levels: [
    {
      id: 'lvl-1-1',
      title: 'Tu Primer Día',
      story: '¡Bienvenido a tu primer día en la firma contable! Tu jefe directo necesita que revises el listado completo de los clientes registrados en nuestro sistema.',
      instruction: 'Obtén todos los registros de la tabla `clientes`.',
      hints: [
        'Usa la instrucción SELECT para obtener datos.',
        'El símbolo * (asterisco) significa "todas las columnas".',
        'La consulta básica es SELECT * FROM nombre_tabla;'
      ],
      tables: ['clientes'],
      expectedQuery: 'SELECT * FROM clientes;',
      validationMode: 'unordered',
      xpReward: 50,
      concepts: ['SELECT', 'FROM']
    },
    {
      id: 'lvl-1-2',
      title: 'Solo lo Necesario',
      story: 'Traer toda la información gasta mucho papel virtual. El equipo de cobranzas solo necesita los nombres y teléfonos de los clientes para hacer llamadas.',
      instruction: 'Selecciona únicamente las columnas `nombre` y `telefono` de la tabla `clientes`.',
      hints: [
        'En lugar de *, escribe los nombres de las columnas que necesitas.',
        'Separa los nombres de las columnas con una coma.',
        'Ejemplo: SELECT columna1, columna2 FROM tabla;'
      ],
      tables: ['clientes'],
      expectedQuery: 'SELECT nombre, telefono FROM clientes;',
      validationMode: 'unordered',
      xpReward: 60,
      concepts: ['SELECT', 'Columnas Específicas']
    },
    {
      id: 'lvl-1-3',
      title: 'El Inventario',
      story: 'El contador senior está revisando el inventario y necesita una lista rápida de lo que tenemos y cuánto cuesta.',
      instruction: 'Consulta el `nombre`, `categoria` y `precio` de la tabla `productos`.',
      hints: [
        'Es igual al nivel anterior, pero con tres columnas.',
        'Asegúrate de escribir bien los nombres de las columnas: nombre, categoria, precio.',
        'La tabla a consultar ahora es productos.'
      ],
      tables: ['productos'],
      expectedQuery: 'SELECT nombre, categoria, precio FROM productos;',
      validationMode: 'unordered',
      xpReward: 70,
      concepts: ['SELECT', 'Múltiples Columnas']
    },
    {
      id: 'lvl-1-4',
      title: 'Renombrando para Jefes',
      story: 'Al gerente no le gustan los nombres de las columnas en la base de datos. Pide que el listado de empleados se vea más profesional.',
      instruction: 'Selecciona la tabla `empleados` (cambia al esquema nómina). Muestra el `nombre` como "Nombre Completo" y el `salario` como "Asignación Salarial".',
      hints: [
        'Usa la palabra clave AS para crear un alias.',
        'Si el alias tiene espacios, debes usar comillas dobles o simples.',
        'Ejemplo: SELECT columna AS "Nuevo Nombre" FROM tabla;'
      ],
      tables: ['empleados'],
      expectedQuery: 'SELECT nombre AS "Nombre Completo", salario AS "Asignación Salarial" FROM empleados;',
      validationMode: 'unordered',
      xpReward: 80,
      concepts: ['Alias', 'AS']
    },
    {
      id: 'lvl-1-5',
      title: 'Contactos Empresariales',
      story: 'La DIAN pide un reporte de facturación. Necesitamos los datos fiscales de nuestros clientes.',
      instruction: 'Obtén el `nombre`, `nit` y `email` de todos los clientes.',
      hints: [
        'Solo combina los conceptos que ya conoces.',
        'SELECT seguido de las tres columnas, separadas por comas, FROM clientes.'
      ],
      tables: ['clientes'],
      expectedQuery: 'SELECT nombre, nit, email FROM clientes;',
      validationMode: 'unordered',
      xpReward: 75,
      concepts: ['Repaso SELECT']
    }
  ]
};
