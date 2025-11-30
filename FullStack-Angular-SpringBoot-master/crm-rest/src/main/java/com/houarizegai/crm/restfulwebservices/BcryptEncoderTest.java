package com.houarizegai.crm.restfulwebservices;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptEncoderTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Generar nuevo hash para admin123
        String newHash = encoder.encode("admin123");
        System.out.println("Nuevo hash generado para 'admin123':");
        System.out.println(newHash);
        
        // Hash que tienes en la BD
        String dbHash = "$2a$10$N.zmdr9k7uOCQQVL8fZC.esKXKRobh98Nn8T5eawGqGVjZ/mJYDSu";
        
        // Probar si coincide
        boolean matches = encoder.matches("admin123", dbHash);
        System.out.println("\n¿El hash de la BD coincide con 'admin123'? " + matches);
        
        // Generar uno más para comparar
        String anotherHash = encoder.encode("admin123");
        System.out.println("\nOtro hash para 'admin123':");
        System.out.println(anotherHash);
        
        boolean matches2 = encoder.matches("admin123", anotherHash);
        System.out.println("¿Este nuevo hash coincide con 'admin123'? " + matches2);
    }
}
