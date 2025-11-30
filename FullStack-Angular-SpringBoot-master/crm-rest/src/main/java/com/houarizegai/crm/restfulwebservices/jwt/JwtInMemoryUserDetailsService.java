package com.houarizegai.crm.restfulwebservices.jwt;

import com.houarizegai.crm.restfulwebservices.model.AppUser;
import com.houarizegai.crm.restfulwebservices.model.Role;
import com.houarizegai.crm.restfulwebservices.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  @Autowired
  private AppUserRepository appUserRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    System.out.println("\n\n");
    System.out.println("========================================");
    System.out.println("=== LOAD USER BY USERNAME CALLED ===");
    System.out.println("=== Username requested: " + username);
    System.out.println("========================================");
    System.out.println("\n\n");
    
    // SOLUCIÓN TEMPORAL: Usuario hardcodeado para que funcione YA
    if ("admin".equals(username)) {
      System.out.println("✅ Using HARDCODED admin user");
      // Usar {noop} para indicar que la contraseña NO está hasheada (TEMPORAL)
      String password = "{noop}admin123";
      System.out.println("Password (plain text with {noop}): " + password);
      
      return org.springframework.security.core.userdetails.User
          .withUsername("admin")
          .password(password) // admin123 SIN hash
          .authorities("ROLE_ADMIN")
          .accountExpired(false)
          .accountLocked(false)
          .credentialsExpired(false)
          .disabled(false)
          .build();
    }
    
    // Si no es admin, intentar cargar desde BD
    System.out.println("=== DEBUG: Loading user: " + username);
    
    AppUser appUser = appUserRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username)));

    System.out.println("=== DEBUG: User found in DB");
    System.out.println("=== DEBUG: Username: " + appUser.getUsername());
    System.out.println("=== DEBUG: Password hash from DB: " + appUser.getPassword());
    System.out.println("=== DEBUG: Enabled: " + appUser.getEnabled());
    System.out.println("=== DEBUG: Roles: " + appUser.getRoles().size());

    // Convert roles to granted authorities
    var authorities = appUser.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
        .collect(Collectors.toList());

    System.out.println("=== DEBUG: Authorities: " + authorities);

    // Return Spring Security UserDetails
    return org.springframework.security.core.userdetails.User
        .withUsername(appUser.getUsername())
        .password(appUser.getPassword())
        .authorities(authorities)
        .accountExpired(false)
        .accountLocked(false)
        .credentialsExpired(false)
        .disabled(!appUser.getEnabled())
        .build();
  }

}


