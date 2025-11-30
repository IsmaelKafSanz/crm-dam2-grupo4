package com.houarizegai.crm.restfulwebservices;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Generar hash para admin123
        String password = "admin123";
        String hash = encoder.encode(password);
        
        System.out.println("=======================================");
        System.out.println("Password: " + password);
        System.out.println("Generated Hash:");
        System.out.println(hash);
        System.out.println("=======================================");
        
        // Verificar que funciona
        boolean matches = encoder.matches(password, hash);
        System.out.println("Verification test: " + (matches ? "✅ SUCCESS" : "❌ FAILED"));
        
        // Probar con el hash que habíamos usado
        String oldHash = "$2a$10$N.zmdr9k7uOCQQVL8fZC.esKXKRobh98Nn8T5eawGqGVjZ/mJYDSu";
        boolean oldMatches = encoder.matches(password, oldHash);
        System.out.println("Old hash matches: " + (oldMatches ? "✅ YES" : "❌ NO"));
    }
}
