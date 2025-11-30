package com.houarizegai.crm.restfulwebservices.controller;

import com.houarizegai.crm.restfulwebservices.model.Incidencia;
import com.houarizegai.crm.restfulwebservices.repository.IncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users/{username}/incidencias")
public class IncidenciaController {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    // GET ALL - Obtener todas las incidencias
    @GetMapping
    public List<Incidencia> getAllIncidencias(@PathVariable String username) {
        return incidenciaRepository.findAll();
    }

    // GET ONE - Obtener una incidencia por ID
    @GetMapping("/{id}")
    public ResponseEntity<Incidencia> getIncidencia(@PathVariable String username, @PathVariable Long id) {
        Optional<Incidencia> incidencia = incidenciaRepository.findById(id);
        
        if (incidencia.isPresent()) {
            return ResponseEntity.ok(incidencia.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST - Crear nueva incidencia
    @PostMapping
    public ResponseEntity<Incidencia> createIncidencia(@PathVariable String username, @RequestBody Incidencia incidencia) {
        Incidencia savedIncidencia = incidenciaRepository.save(incidencia);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedIncidencia.getId())
                .toUri();
        
        return ResponseEntity.created(location).body(savedIncidencia);
    }

    // PUT - Actualizar incidencia existente
    @PutMapping("/{id}")
    public ResponseEntity<Incidencia> updateIncidencia(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestBody Incidencia incidencia) {
        
        Optional<Incidencia> existingIncidencia = incidenciaRepository.findById(id);
        
        if (existingIncidencia.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        incidencia.setId(id);
        Incidencia updatedIncidencia = incidenciaRepository.save(incidencia);
        return ResponseEntity.ok(updatedIncidencia);
    }

    // DELETE - Eliminar incidencia
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncidencia(@PathVariable String username, @PathVariable Long id) {
        Optional<Incidencia> incidencia = incidenciaRepository.findById(id);
        
        if (incidencia.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        incidenciaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
