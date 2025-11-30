-- Tabla INCIDENCIAS para el sistema CRM
-- Ejecutar este script en pgAdmin4 para crear/verificar la tabla de incidencias

-- Crear la tabla incidencias (si no existe)
CREATE TABLE IF NOT EXISTS incidencias (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50) DEFAULT 'Abierta',
    prioridad VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMP,
    customer_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE SET NULL
);

-- Crear índices para mejorar búsquedas
CREATE INDEX IF NOT EXISTS idx_incidencias_estado ON incidencias(estado);
CREATE INDEX IF NOT EXISTS idx_incidencias_prioridad ON incidencias(prioridad);
CREATE INDEX IF NOT EXISTS idx_incidencias_customer ON incidencias(customer_id);

-- Insertar datos de ejemplo
INSERT INTO incidencias (titulo, descripcion, estado, prioridad, customer_id, fecha_creacion) VALUES
    ('Error en sistema de login', 'Los usuarios reportan que no pueden iniciar sesión', 'Abierta', 'Alta', 1, CURRENT_TIMESTAMP),
    ('Solicitud de nueva funcionalidad', 'Cliente solicita reportes mensuales automáticos', 'En Progreso', 'Media', 2, CURRENT_TIMESTAMP),
    ('Bug en cálculo de facturas', 'Las facturas muestran importes incorrectos', 'Abierta', 'Alta', 1, CURRENT_TIMESTAMP),
    ('Consulta técnica', 'Cliente necesita ayuda con configuración', 'Cerrada', 'Baja', 3, CURRENT_TIMESTAMP - INTERVAL '5 days'),
    ('Problema de rendimiento', 'El sistema se vuelve lento con muchos usuarios', 'En Progreso', 'Alta', 2, CURRENT_TIMESTAMP - INTERVAL '2 days')
ON CONFLICT DO NOTHING;

-- Verificar los datos insertados
SELECT * FROM incidencias ORDER BY id;
