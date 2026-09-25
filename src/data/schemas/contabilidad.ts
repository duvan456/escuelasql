export const schemaContabilidad = `
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
`;
