-- Insertar datos de ejemplo en customer
INSERT INTO customer (id, name, birth_date, email) VALUES (10001, 'houari', sysdate(), 'admin@houarizegai.net');
INSERT INTO customer (id, name, birth_date, email) VALUES (10002, 'omar', sysdate(), 'omar@houarizegai.net');
INSERT INTO customer (id, name, birth_date, email) VALUES (10003, 'ali', sysdate(), 'ali@houarizegai.net');

-- Crear rol ADMIN
INSERT INTO role (id, name) VALUES (1, 'ADMIN') ON CONFLICT DO NOTHING;

-- Crear usuario admin con contraseña hasheada (admin123)
-- Hash BCrypt de 'admin123'
INSERT INTO app_user (id, username, password, enabled) 
VALUES (1, 'admin', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', true) 
ON CONFLICT DO NOTHING;

-- Asignar rol ADMIN al usuario admin
INSERT INTO user_role (user_id, role_id) VALUES (1, 1) ON CONFLICT DO NOTHING;