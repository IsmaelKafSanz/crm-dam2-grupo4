package com.houarizegai.crm.restfulwebservices.controller;

import com.houarizegai.crm.restfulwebservices.model.AppUser;
import com.houarizegai.crm.restfulwebservices.model.Role;
import com.houarizegai.crm.restfulwebservices.repository.AppUserRepository;
import com.houarizegai.crm.restfulwebservices.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users/{username}/app-users")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // GET ALL - Obtener todos los usuarios
    @GetMapping
    public List<AppUser> getAllUsers(@PathVariable String username) {
        return appUserRepository.findAll();
    }

    // GET ONE - Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUser(@PathVariable String username, @PathVariable Long id) {
        Optional<AppUser> user = appUserRepository.findById(id);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST - Crear nuevo usuario
    @PostMapping
    public ResponseEntity<AppUser> createUser(@PathVariable String username, @RequestBody AppUser appUser) {
        // Encriptar la contraseña antes de guardar con prefijo {bcrypt}
        if (appUser.getPassword() != null && !appUser.getPassword().isEmpty()) {
            String encodedPassword = "{bcrypt}" + passwordEncoder.encode(appUser.getPassword());
            appUser.setPassword(encodedPassword);
        }
        
        // Asignar rol USER por defecto
        Role userRole = roleRepository.findByName("USER")
                .orElseGet(() -> {
                    // Si no existe el rol USER, crearlo
                    Role newRole = new Role("USER");
                    return roleRepository.save(newRole);
                });
        
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        appUser.setRoles(roles);
        
        AppUser savedUser = appUserRepository.save(appUser);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        
        return ResponseEntity.created(location).body(savedUser);
    }

    // PUT - Actualizar usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestBody AppUser appUser) {
        
        Optional<AppUser> existingUser = appUserRepository.findById(id);
        
        if (existingUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Si se proporciona una nueva contraseña, encriptarla con prefijo {bcrypt}
        if (appUser.getPassword() != null && !appUser.getPassword().isEmpty()) {
            String encodedPassword = "{bcrypt}" + passwordEncoder.encode(appUser.getPassword());
            appUser.setPassword(encodedPassword);
        } else {
            // Mantener la contraseña anterior si no se proporciona una nueva
            appUser.setPassword(existingUser.get().getPassword());
        }
        
        // Mantener los roles existentes si no se proporcionan nuevos
        if (appUser.getRoles() == null || appUser.getRoles().isEmpty()) {
            appUser.setRoles(existingUser.get().getRoles());
        }
        
        appUser.setId(id);
        AppUser updatedUser = appUserRepository.save(appUser);
        return ResponseEntity.ok(updatedUser);
    }

    // DELETE - Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username, @PathVariable Long id) {
        Optional<AppUser> user = appUserRepository.findById(id);
        
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        appUserRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
