export const schemaNomina = `
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
`;
