-- Crear tabla de Contactos
CREATE TABLE contact (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    position VARCHAR(100),
    customer_id BIGINT,
    notes TEXT,
    created_at TIMESTAMP,
    active BOOLEAN DEFAULT true,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE SET NULL
);

-- Insertar algunos contactos de ejemplo
INSERT INTO contact (first_name, last_name, email, phone, position, customer_id, notes, created_at, active) 
VALUES 
    ('Juan', 'García', 'juan.garcia@techcorp.com', '666-111-222', 'CTO', 1, 'Contacto principal técnico', CURRENT_TIMESTAMP, true),
    ('María', 'López', 'maria.lopez@techcorp.com', '666-333-444', 'CEO', 1, 'Toma decisiones finales', CURRENT_TIMESTAMP, true),
    ('Carlos', 'Martínez', 'carlos@innovate.es', '677-555-666', 'Director Comercial', 2, NULL, CURRENT_TIMESTAMP, true);

-- Verificar que se crearon correctamente
SELECT * FROM contact;
