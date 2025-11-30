-- Tabla CUSTOMER para el sistema CRM
-- Ejecutar este script en pgAdmin4 para crear la tabla de clientes

-- Eliminar la tabla si ya existe (opcional, comentar si quieres mantener datos existentes)
-- DROP TABLE IF EXISTS customer CASCADE;

-- Crear la tabla customer
CREATE TABLE IF NOT EXISTS customer (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    birth_date DATE,
    email VARCHAR(100)
);

-- Crear índice para búsquedas por email (mejora el rendimiento)
CREATE INDEX IF NOT EXISTS idx_customer_email ON customer(email);

-- Insertar algunos datos de prueba (opcional)
INSERT INTO customer (name, birth_date, email) VALUES
    ('Juan Pérez', '1990-05-15', 'juan.perez@example.com'),
    ('María García', '1985-08-22', 'maria.garcia@example.com'),
    ('Carlos López', '1992-12-10', 'carlos.lopez@example.com'),
    ('Ana Martínez', '1988-03-30', 'ana.martinez@example.com'),
    ('Luis Rodríguez', '1995-07-18', 'luis.rodriguez@example.com')
ON CONFLICT DO NOTHING;

-- Verificar los datos insertados
SELECT * FROM customer ORDER BY id;
