-- Script para hacer company_name opcional (nullable)
-- Ejecutar en pgAdmin4

ALTER TABLE customer 
ALTER COLUMN company_name DROP NOT NULL;

-- Verificar la estructura actualizada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'customer' 
ORDER BY ordinal_position;
