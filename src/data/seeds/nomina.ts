export const seedNomina = `
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
`;
