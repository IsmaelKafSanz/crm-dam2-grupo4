-- Tabla TAREAS para el sistema CRM - Estilo Kanban Board
-- Ejecutar este script en pgAdmin4

-- Crear la tabla tarea
CREATE TABLE IF NOT EXISTS tarea (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
    prioridad VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_limite TIMESTAMP,
    asignado_a VARCHAR(100)
);

-- Crear índice para búsquedas por estado
CREATE INDEX IF NOT EXISTS idx_tarea_estado ON tarea(estado);

-- Insertar tareas de ejemplo en cada columna
INSERT INTO tarea (titulo, descripcion, estado, prioridad, asignado_a, fecha_creacion) VALUES
    -- PENDIENTES
    ('Revisar requisitos del cliente', 'Analizar los nuevos requisitos enviados por el cliente TechCorp', 'PENDIENTE', 'Alta', 'Juan Pérez', CURRENT_TIMESTAMP),
    ('Preparar presentación Q4', 'Crear slides para la presentación de resultados del cuarto trimestre', 'PENDIENTE', 'Media', 'María García', CURRENT_TIMESTAMP),
    
    -- EN CURSO
    ('Implementar nueva API', 'Desarrollar endpoint REST para gestión de tareas', 'EN_CURSO', 'Alta', 'Carlos López', CURRENT_TIMESTAMP - INTERVAL '2 days'),
    ('Actualizar documentación', 'Revisar y actualizar la documentación técnica del proyecto', 'EN_CURSO', 'Media', 'Ana Martínez', CURRENT_TIMESTAMP - INTERVAL '1 day'),
    
    -- COMPLETADAS
    ('Configurar servidor de producción', 'Instalar y configurar nuevo servidor para despliegue', 'COMPLETADA', 'Alta', 'Luis Rodríguez', CURRENT_TIMESTAMP - INTERVAL '5 days'),
    ('Reunión con equipo de ventas', 'Coordinar estrategia para el próximo trimestre', 'COMPLETADA', 'Baja', 'Juan Pérez', CURRENT_TIMESTAMP - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- Verificar los datos insertados
SELECT * FROM tarea ORDER BY estado, id;
