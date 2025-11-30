package com.houarizegai.crm.restfulwebservices.controller;

import com.houarizegai.crm.restfulwebservices.model.Tarea;
import com.houarizegai.crm.restfulwebservices.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users/{username}/tareas")
public class TareaController {

    @Autowired
    private TareaRepository tareaRepository;

    // GET ALL - Obtener todas las tareas
    @GetMapping
    public List<Tarea> getAllTareas(@PathVariable String username) {
        return tareaRepository.findAll();
    }

    // GET BY ESTADO - Obtener tareas por estado
    @GetMapping("/estado/{estado}")
    public List<Tarea> getTareasByEstado(@PathVariable String username, @PathVariable String estado) {
        return tareaRepository.findByEstado(estado);
    }

    // GET ONE - Obtener una tarea por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarea> getTarea(@PathVariable String username, @PathVariable Long id) {
        Optional<Tarea> tarea = tareaRepository.findById(id);
        
        if (tarea.isPresent()) {
            return ResponseEntity.ok(tarea.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST - Crear nueva tarea
    @PostMapping
    public ResponseEntity<Tarea> createTarea(@PathVariable String username, @RequestBody Tarea tarea) {
        Tarea savedTarea = tareaRepository.save(tarea);
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedTarea.getId())
                .toUri();
        
        return ResponseEntity.created(location).body(savedTarea);
    }

    // PUT - Actualizar tarea existente (incluyendo cambio de estado)
    @PutMapping("/{id}")
    public ResponseEntity<Tarea> updateTarea(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestBody Tarea tarea) {
        
        Optional<Tarea> existingTarea = tareaRepository.findById(id);
        
        if (existingTarea.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        tarea.setId(id);
        Tarea updatedTarea = tareaRepository.save(tarea);
        return ResponseEntity.ok(updatedTarea);
    }

    // PATCH - Cambiar solo el estado de una tarea (para drag and drop)
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Tarea> updateTareaEstado(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestBody String nuevoEstado) {
        
        Optional<Tarea> existingTarea = tareaRepository.findById(id);
        
        if (existingTarea.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Tarea tarea = existingTarea.get();
        tarea.setEstado(nuevoEstado);
        Tarea updatedTarea = tareaRepository.save(tarea);
        return ResponseEntity.ok(updatedTarea);
    }

    // DELETE - Eliminar tarea
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable String username, @PathVariable Long id) {
        Optional<Tarea> tarea = tareaRepository.findById(id);
        
        if (tarea.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        tareaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
