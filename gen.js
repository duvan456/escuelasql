const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/Duvan/Documents/work/escuelasql/src';

const dirs = [
  'types',
  'data/schemas',
  'data/seeds',
  'data/modules'
];

dirs.forEach(d => fs.mkdirSync(path.join(basePath, d), { recursive: true }));

const files = {
  'types/game.ts': `export type Difficulty = 'principiante' | 'intermedio' | 'avanzado';
export type ValidationMode = 'exact' | 'unordered' | 'contains';

export interface Level {
  id: string;
  title: string;
  story: string;
  instruction: string;
  hints: string[];
  tables: string[];
  expectedQuery: string;
  validationMode: ValidationMode;
  xpReward: number;
  concepts: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  schemaKey: 'contabilidad' | 'nomina';
  levels: Level[];
}

export interface UserProgress {
  userId: string;
  completedLevels: string[];
  xp: number;
  rank: PlayerRank;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  dateUnlocked: string;
}

export interface GameState {
  currentModuleId: string | null;
  currentLevelId: string | null;
  progress: UserProgress;
}

export type PlayerRank = 'Novato' | 'Asistente' | 'Contador' | 'Gerente Financiero' | 'Auditor Master';
`,

  'data/schemas/contabilidad.ts': `export const schemaContabilidad = \`
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nombre TEXT,
  nit TEXT,
  ciudad TEXT,
  tipo TEXT,
  email TEXT,
  telefono TEXT
);

CREATE TABLE productos (
  id INTEGER PRIMARY KEY,
  nombre TEXT,
  categoria TEXT,
  precio DECIMAL,
  stock INTEGER,
  activo BOOLEAN
);

CREATE TABLE facturas (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER,
  fecha DATE,
  total DECIMAL,
  estado TEXT,
  metodo_pago TEXT,
  FOREIGN KEY(cliente_id) REFERENCES clientes(id)
);

CREATE TABLE detalle_factura (
  id INTEGER PRIMARY KEY,
  factura_id INTEGER,
  producto_id INTEGER,
  cantidad INTEGER,
  precio_unitario DECIMAL,
  subtotal DECIMAL,
  FOREIGN KEY(factura_id) REFERENCES facturas(id),
  FOREIGN KEY(producto_id) REFERENCES productos(id)
);
\`;
`,

  'data/schemas/nomina.ts': `export const schemaNomina = \`
CREATE TABLE departamentos (
  id INTEGER PRIMARY KEY,
  nombre TEXT,
  presupuesto DECIMAL,
  ciudad TEXT
);

CREATE TABLE empleados (
  id INTEGER PRIMARY KEY,
  nombre TEXT,
  cargo TEXT,
  departamento_id INTEGER,
  salario DECIMAL,
  fecha_ingreso DATE,
  activo BOOLEAN,
  FOREIGN KEY(departamento_id) REFERENCES departamentos(id)
);
\`;
`,

  'data/seeds/contabilidad.ts': `export const seedContabilidad = \`
INSERT INTO clientes (id, nombre, nit, ciudad, tipo, email, telefono) VALUES
(1, 'Empresa Colombiana de Petróleos', '899999068-1', 'Bogotá', 'Jurídica', 'contacto@ecopetrol.com', '3101234567'),
(2, 'Supermercados Éxito', '890900608-9', 'Medellín', 'Jurídica', 'proveedores@exito.com', '3209876543'),
(3, 'Bancolombia S.A.', '890903938-8', 'Medellín', 'Jurídica', 'compras@bancolombia.com.co', '3001112233'),
(4, 'Carlos Pérez', '1010202030', 'Cali', 'Natural', 'carlos.perez@email.com', '3156667788'),
(5, 'María Rodríguez', '40506070', 'Bogotá', 'Natural', 'mrodriguez@email.com', '3112223344'),
(6, 'Distribuidora del Valle', '900123456-7', 'Cali', 'Jurídica', 'info@distrivalle.com', '3145556677'),
(7, 'Andrés Montoya', '71234567', 'Medellín', 'Natural', 'andres.mont@email.com', '3123456789'),
(8, 'Constructora Bolívar', '860000000-1', 'Bogotá', 'Jurídica', 'contacto@cbolivar.com', '3019998877'),
(9, 'Papelería La Escolar', '901234567-8', 'Barranquilla', 'Jurídica', 'ventas@laescolar.com', '3105554433'),
(10, 'Luz Marina Gómez', '51234567', 'Bogotá', 'Natural', 'luz.gomez@email.com', '3198887766'),
(11, 'Cementos Argos', '890900222-1', 'Medellín', 'Jurídica', 'proveedores@argos.com', '3187776655'),
(12, 'Juan David Sánchez', '1020304050', 'Cartagena', 'Natural', 'jsanchez@email.com', '3004445566'),
(13, 'Tecnología Avanzada S.A.S', '900888777-6', 'Bogotá', 'Jurídica', 'admin@tecavanzada.com', '3176665544'),
(14, 'Muebles Jamar', '890111222-3', 'Barranquilla', 'Jurídica', 'facturacion@jamar.com', '3213334455'),
(15, 'Ana Lucía Torres', '30405060', 'Bucaramanga', 'Natural', 'altorres@email.com', '3162223344');

INSERT INTO productos (id, nombre, categoria, precio, stock, activo) VALUES
(1, 'Computador Portátil HP', 'Tecnología', 2500000, 50, true),
(2, 'Impresora Epson', 'Tecnología', 850000, 30, true),
(3, 'Resma de Papel Carta', 'Papelería', 18000, 500, true),
(4, 'Silla Ergonómica', 'Mobiliario', 350000, 25, true),
(5, 'Escritorio Gerencial', 'Mobiliario', 800000, 15, true),
(6, 'Marcadores Borrables (Caja)', 'Papelería', 25000, 100, true),
(7, 'Teclado Inalámbrico', 'Tecnología', 95000, 40, true),
(8, 'Mouse Inalámbrico', 'Tecnología', 65000, 60, true),
(9, 'Archivador 4 Gavetas', 'Mobiliario', 450000, 10, true),
(10, 'Cuaderno Cuadriculado 100 Hojas', 'Papelería', 8500, 200, true),
(11, 'Monitor Samsung 24"', 'Tecnología', 650000, 20, true),
(12, 'Tóner HP 85A', 'Tecnología', 120000, 35, true),
(13, 'Caja de Esferos (50 und)', 'Papelería', 30000, 80, true),
(14, 'Mesa de Juntas', 'Mobiliario', 1200000, 5, true),
(15, 'Tablero de Corcho', 'Oficina', 45000, 20, true),
(16, 'Engrapadora Industrial', 'Oficina', 55000, 15, true),
(17, 'Perforadora 2 Huecos', 'Oficina', 35000, 25, true),
(18, 'Calculadora Financiera', 'Oficina', 180000, 10, true),
(19, 'Disco Duro Externo 1TB', 'Tecnología', 280000, 15, true),
(20, 'Silla Interlocutora', 'Mobiliario', 150000, 40, true);

INSERT INTO facturas (id, cliente_id, fecha, total, estado, metodo_pago) VALUES
(1, 1, '2023-01-15', 5350000, 'Pagada', 'Transferencia'),
(2, 2, '2023-01-18', 1200000, 'Pagada', 'Tarjeta de Crédito'),
(3, 4, '2023-02-05', 2500000, 'Pagada', 'Efectivo'),
(4, 5, '2023-02-10', 85000, 'Pagada', 'Efectivo'),
(5, 3, '2023-02-20', 3150000, 'Pendiente', 'Transferencia'),
(6, 6, '2023-03-02', 450000, 'Pagada', 'Transferencia'),
(7, 8, '2023-03-15', 850000, 'Pendiente', 'Tarjeta de Crédito'),
(8, 9, '2023-03-25', 180000, 'Pagada', 'Efectivo'),
(9, 1, '2023-04-05', 7500000, 'Pagada', 'Transferencia'),
(10, 7, '2023-04-12', 350000, 'Anulada', 'Efectivo'),
(11, 10, '2023-04-20', 65000, 'Pagada', 'Tarjeta Débito'),
(12, 11, '2023-05-02', 1550000, 'Pendiente', 'Transferencia'),
(13, 13, '2023-05-15', 45000, 'Pagada', 'Efectivo'),
(14, 2, '2023-05-28', 250000, 'Pagada', 'Tarjeta de Crédito'),
(15, 14, '2023-06-05', 3600000, 'Pendiente', 'Transferencia'),
(16, 15, '2023-06-12', 120000, 'Pagada', 'Efectivo'),
(17, 12, '2023-06-20', 95000, 'Pagada', 'Tarjeta Débito'),
(18, 4, '2023-07-01', 350000, 'Pagada', 'Transferencia'),
(19, 3, '2023-07-10', 1200000, 'Anulada', 'Transferencia'),
(20, 8, '2023-07-15', 55000, 'Pendiente', 'Efectivo');

INSERT INTO detalle_factura (id, factura_id, producto_id, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 2, 2500000, 5000000),
(2, 1, 4, 1, 350000, 350000),
(3, 2, 5, 1, 800000, 800000),
(4, 2, 9, 1, 450000, 450000),
(5, 3, 1, 1, 2500000, 2500000),
(6, 4, 10, 10, 8500, 85000),
(7, 5, 11, 3, 650000, 1950000),
(8, 5, 14, 1, 1200000, 1200000),
(9, 6, 9, 1, 450000, 450000),
(10, 7, 2, 1, 850000, 850000),
(11, 8, 3, 10, 18000, 180000),
(12, 9, 1, 3, 2500000, 7500000),
(13, 10, 4, 1, 350000, 350000),
(14, 11, 8, 1, 650000, 650000),
(15, 12, 11, 2, 650000, 1300000),
(16, 12, 6, 10, 25000, 250000),
(17, 13, 15, 1, 45000, 45000),
(18, 14, 6, 10, 25000, 250000),
(19, 15, 14, 3, 1200000, 3600000),
(20, 16, 12, 1, 120000, 120000),
(21, 17, 7, 1, 95000, 95000),
(22, 18, 4, 1, 350000, 350000),
(23, 19, 14, 1, 1200000, 1200000),
(24, 20, 16, 1, 55000, 55000);
\`;
`,

  'data/seeds/nomina.ts': `export const seedNomina = \`
INSERT INTO departamentos (id, nombre, presupuesto, ciudad) VALUES
(1, 'Gerencia', 150000000, 'Bogotá'),
(2, 'Contabilidad', 80000000, 'Bogotá'),
(3, 'Ventas', 120000000, 'Medellín'),
(4, 'Recursos Humanos', 60000000, 'Cali'),
(5, 'Sistemas', 90000000, 'Bogotá'),
(6, 'Producción', 200000000, 'Barranquilla');

INSERT INTO empleados (id, nombre, cargo, departamento_id, salario, fecha_ingreso, activo) VALUES
(1, 'Carlos Jaramillo', 'Gerente General', 1, 15000000, '2015-01-15', true),
(2, 'Ana María Londoño', 'Contadora Pública', 2, 5500000, '2018-03-01', true),
(3, 'Luis Fernando Restrepo', 'Auxiliar Contable', 2, 2200000, '2021-06-15', true),
(4, 'Marta Lucía Ramírez', 'Directora Comercial', 3, 8000000, '2017-02-10', true),
(5, 'Jorge Giraldo', 'Asesor de Ventas', 3, 2500000, '2022-01-20', true),
(6, 'Carolina Soto', 'Asesora de Ventas', 3, 2500000, '2022-03-05', true),
(7, 'Javier Osorio', 'Director de RRHH', 4, 6500000, '2016-11-01', true),
(8, 'Diana Montoya', 'Analista de Selección', 4, 3000000, '2020-08-15', true),
(9, 'Andrés Felipe Gómez', 'Líder de Sistemas', 5, 7500000, '2019-05-20', true),
(10, 'Valentina Rojas', 'Desarrolladora Senior', 5, 6000000, '2021-02-10', true),
(11, 'Mateo Cárdenas', 'Soporte Técnico', 5, 2800000, '2023-01-15', true),
(12, 'Roberto Henao', 'Jefe de Producción', 6, 8500000, '2015-08-01', true),
(13, 'Sandra Milena Ruiz', 'Operaria', 6, 1800000, '2020-10-10', true),
(14, 'Carlos Mario Vélez', 'Operario', 6, 1800000, '2021-04-05', true),
(15, 'Juliana Castro', 'Auditora', 2, 4500000, '2022-09-01', true),
(16, 'Esteban Duque', 'Asesor de Ventas', 3, 2500000, '2023-06-10', true),
(17, 'Paola Arias', 'Operaria', 6, 1800000, '2019-12-01', false),
(18, 'Juan Carlos Botero', 'Gerente Regional', 3, 9000000, '2016-04-15', true);
\`;
`,

  'data/modules/01-select-basico.ts': `import { Module } from '../../types/game';

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
      instruction: 'Obtén todos los registros de la tabla \`clientes\`.',
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
      instruction: 'Selecciona únicamente las columnas \`nombre\` y \`telefono\` de la tabla \`clientes\`.',
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
      instruction: 'Consulta el \`nombre\`, \`categoria\` y \`precio\` de la tabla \`productos\`.',
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
      instruction: 'Selecciona la tabla \`empleados\` (cambia al esquema nómina). Muestra el \`nombre\` como "Nombre Completo" y el \`salario\` como "Asignación Salarial".',
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
      instruction: 'Obtén el \`nombre\`, \`nit\` y \`email\` de todos los clientes.',
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
`,
  'data/modules/02-where.ts': `import { Module } from '../../types/game';

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
      instruction: 'Selecciona todos los clientes (todas las columnas) cuya \`ciudad\` sea "Medellín".',
      hints: [
        'Usa la cláusula WHERE después de FROM.',
        'Para textos, usa comillas simples: WHERE columna = \\'Valor\\'.',
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
      instruction: 'Encuentra los productos cuyo \`precio\` sea mayor a 1,000,000. Muestra \`nombre\` y \`precio\`.',
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
      instruction: 'Selecciona todas las columnas de \`facturas\` con \`estado\` igual a "Pendiente".',
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
      instruction: 'Encuentra las facturas cuya \`fecha\` esté entre "2023-01-01" y "2023-03-31".',
      hints: [
        'Puedes usar >= y <= combinados con AND, o usar BETWEEN.',
        'Ejemplo: WHERE fecha BETWEEN \\'2023-01-01\\' AND \\'2023-03-31\\'.'
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
      instruction: 'Busca en la tabla \`clientes\` aquellos cuyo \`nombre\` empiece por la palabra "Tecnología".',
      hints: [
        'Usa el operador LIKE para búsquedas parciales.',
        'El símbolo % actúa como comodín (reemplaza cualquier texto).',
        'Ejemplo: WHERE nombre LIKE \\'Tecnología%\\''
      ],
      tables: ['clientes'],
      expectedQuery: "SELECT * FROM clientes WHERE nombre LIKE 'Tecnología%';",
      validationMode: 'unordered',
      xpReward: 90,
      concepts: ['LIKE', 'Comodines']
    }
  ]
};
`,
  'data/modules/03-order-by.ts': `import { Module } from '../../types/game';

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
      instruction: 'Selecciona el \`nombre\` y \`salario\` de todos los empleados, ordenados por salario de menor a mayor (ascendente).',
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
      instruction: 'Selecciona \`nombre\` y \`fecha_ingreso\` de la tabla \`empleados\`, ordenados por fecha de ingreso desde el más antiguo hasta el más reciente.',
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
      instruction: 'Muestra \`nombre\`, \`cargo\` y \`salario\` de los empleados, ordenados por salario de MAYOR a menor (descendente).',
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
      instruction: 'Selecciona los 3 empleados con mayor salario. Muestra \`nombre\` y \`salario\`.',
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
      instruction: 'Selecciona todas las columnas de empleados. Ordena primero por \`departamento_id\` (ascendente) y luego por \`nombre\` (ascendente).',
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
`,
  'data/modules/04-agregacion.ts': `import { Module } from '../../types/game';

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
      instruction: 'Usa la función COUNT para contar cuántos registros hay en la tabla \`clientes\`. Devuelve el resultado con el alias "total_clientes".',
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
      instruction: 'Suma todos los valores de la columna \`total\` en la tabla \`facturas\`. Llama al resultado "ventas_totales".',
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
      instruction: 'Calcula el promedio (AVG) de la columna \`precio\` en la tabla \`productos\`. Usa el alias "precio_promedio".',
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
      instruction: 'Selecciona el precio mínimo (MIN) y el precio máximo (MAX) de la tabla \`productos\`.',
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
      instruction: 'Suma el \`total\` de las \`facturas\` que tengan el \`estado\` "Pendiente". Llama a la columna "cartera_pendiente".',
      hints: [
        'Combina SUM con WHERE.',
        'Primero sumas, luego indicas la tabla, y al final pones la condición (WHERE estado = \\'Pendiente\\').'
      ],
      tables: ['facturas'],
      expectedQuery: "SELECT SUM(total) AS cartera_pendiente FROM facturas WHERE estado = 'Pendiente';",
      validationMode: 'unordered',
      xpReward: 100,
      concepts: ['SUM', 'WHERE']
    }
  ]
};
`,
  'data/modules/05-group-by.ts': `import { Module } from '../../types/game';

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
      instruction: 'Selecciona \`departamento_id\` y cuenta la cantidad de empleados (COUNT). Agrupa los resultados usando GROUP BY \`departamento_id\`.',
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
      instruction: 'Selecciona \`departamento_id\` y la suma de \`salario\` (como "costo_nomina"). Agrupa por \`departamento_id\`.',
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
      instruction: 'Muestra el \`cargo\` y el salario promedio (como "salario_promedio"). Agrupa los datos por \`cargo\`.',
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
      instruction: 'Ve al esquema de contabilidad (tabla facturas). Muestra el \`metodo_pago\` y cuenta cuántas facturas tienen ese método. Agrupa por \`metodo_pago\`.',
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
      instruction: 'Selecciona \`cliente_id\` y la suma del \`total\` de facturas. Agrupa por \`cliente_id\` y ORDENA el resultado por la suma de mayor a menor (DESC).',
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
`,
  'data/modules/06-having.ts': `import { Module } from '../../types/game';

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
      instruction: 'Selecciona la \`categoria\` y cuenta los productos en la tabla \`productos\`. Agrupa por \`categoria\`, y usa HAVING para mostrar solo las categorías que tienen más de 5 productos (COUNT > 5).',
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
      instruction: 'Muestra \`cliente_id\` y la suma de \`total\` en la tabla \`facturas\`. Agrupa por \`cliente_id\` y filtra con HAVING para la suma mayor a 5000000.',
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
      instruction: 'En la tabla \`productos\`, agrupa por \`categoria\`. Muestra la categoría y su promedio de precio, pero solo de aquellas cuyo promedio sea mayor a 500000.',
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
      instruction: 'Agrupa la tabla \`facturas\` por \`cliente_id\`. Cuenta las facturas y filtra con HAVING para los que tengan un conteo mayor a 2.',
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
      title: 'Departamentos Pesados (Nómina)',
      story: 'Volviendo a la nómina, la gerencia quiere saber qué departamentos tienen un costo salarial total mayor a 10,000,000.',
      instruction: 'En la tabla \`empleados\`, muestra el \`departamento_id\` y la suma de salarios. Agrupa por departamento y usa HAVING para mostrar solo los mayores a 10000000.',
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
`,
  'data/modules/07-joins.ts': `import { Module } from '../../types/game';

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
      instruction: 'Usa INNER JOIN para unir \`empleados\` y \`departamentos\`. Muestra el nombre del empleado (empleados.nombre) y el nombre de su departamento (departamentos.nombre).',
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
      title: 'Facturas con Nombre y Apellido',
      story: '(Cambiando a Contabilidad). Ver facturas con cliente_id=5 no sirve de mucho al imprimir. Necesitamos el nombre del cliente.',
      instruction: 'Haz un JOIN entre \`facturas\` y \`clientes\`. Muestra el ID de la factura, la fecha, y el nombre del cliente.',
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
      title: 'El Detalle de la Compra',
      story: 'Un cliente pregunta por qué su factura 1 salió tan cara. Necesitamos ver los productos que se le cobraron en esa factura.',
      instruction: 'Une \`detalle_factura\` con \`productos\`. Muestra el \`factura_id\`, el \`nombre\` del producto y la \`cantidad\`. Filtra (WHERE) para mostrar solo la factura_id = 1.',
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
      title: 'Clientes Fantasmas',
      story: '¿Hay clientes registrados que nunca nos han comprado nada? El equipo comercial quiere contactarlos.',
      instruction: 'Usa LEFT JOIN desde \`clientes\` hacia \`facturas\`. Muestra el \`nombre\` del cliente y el \`id\` de la factura. Filtra donde facturas.id IS NULL.',
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
`,
  'data/modules/08-subconsultas.ts': `import { Module } from '../../types/game';

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
      instruction: 'Muestra el \`nombre\` y \`salario\` de los \`empleados\` cuyo \`salario\` sea mayor que (SELECT AVG(salario) FROM empleados).',
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
      instruction: 'Muestra el \`nombre\` y \`fecha_ingreso\` del empleado cuya \`fecha_ingreso\` sea exactamente igual a la fecha máxima (MAX).',
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
      title: 'Productos sin Vender',
      story: '(Esquema Contabilidad). Hay productos en inventario que nunca se han facturado. ¡Hagamos una promoción!',
      instruction: 'Encuentra los \`productos\` (nombre) cuyo \`id\` NO esté (NOT IN) en la columna \`producto_id\` de la tabla \`detalle_factura\`.',
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
      title: 'Clientes con Compras Grandes',
      story: 'Queremos encontrar los nombres de los clientes que tienen al menos una factura con un valor mayor a 5,000,000.',
      instruction: 'Muestra los nombres de los \`clientes\` cuyo \`id\` esté IN (SELECT cliente_id FROM facturas WHERE total > 5000000).',
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
      title: 'El Producto Estrella',
      story: '¿Cuál es el producto más caro que tenemos a la venta? (No vale limitarlo).',
      instruction: 'Encuentra el \`nombre\` y \`precio\` del producto en la tabla \`productos\` usando una subconsulta con MAX(precio).',
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
`,
  'data/modules/index.ts': `import { selectBasico } from './01-select-basico';
import { whereBasico } from './02-where';
import { orderBy } from './03-order-by';
import { funcionesAgregadas } from './04-agregacion';
import { groupBy } from './05-group-by';
import { having } from './06-having';
import { joins } from './07-joins';
import { subconsultas } from './08-subconsultas';

export const allModules = [
  selectBasico,
  whereBasico,
  orderBy,
  funcionesAgregadas,
  groupBy,
  having,
  joins,
  subconsultas
];

export * from './01-select-basico';
export * from './02-where';
export * from './03-order-by';
export * from './04-agregacion';
export * from './05-group-by';
export * from './06-having';
export * from './07-joins';
export * from './08-subconsultas';
`
};

for (const [relPath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(basePath, relPath), content, 'utf8');
  console.log('Created:', relPath);
}
