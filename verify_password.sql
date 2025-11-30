-- Verificar el hash actual de la contraseña
SELECT username, password, enabled FROM app_user WHERE username = 'admin';

-- Actualizar con el hash correcto para 'admin123'
UPDATE app_user 
SET password = '$2a$10$N.zmdr9k7uOCQQVL8fZC.esKXKRobh98Nn8T5eawGqGVjZ/mJYDSu'
WHERE username = 'admin';

-- Verificar que se actualizó correctamente
SELECT username, password, enabled FROM app_user WHERE username = 'admin';
