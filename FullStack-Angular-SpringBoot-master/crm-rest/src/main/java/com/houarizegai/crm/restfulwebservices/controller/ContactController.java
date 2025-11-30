package com.houarizegai.crm.restfulwebservices.controller;

import com.houarizegai.crm.restfulwebservices.model.Contact;
import com.houarizegai.crm.restfulwebservices.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // Obtener todos los contactos
    @GetMapping("/users/{username}/contacts")
    public List<Contact> getAllContacts(@PathVariable String username) {
        return contactRepository.findAll();
    }

    // Obtener un contacto por ID
    @GetMapping("/users/{username}/contacts/{id}")
    public Contact getContact(@PathVariable String username, @PathVariable long id) {
        return contactRepository.findById(id).get();
    }

    // Obtener contactos de un cliente específico
    @GetMapping("/users/{username}/customers/{customerId}/contacts")
    public List<Contact> getContactsByCustomer(@PathVariable String username, @PathVariable Long customerId) {
        return contactRepository.findByCustomerId(customerId);
    }

    // Crear un nuevo contacto
    @PostMapping("/users/{username}/contacts")
    public ResponseEntity<Void> createContact(@PathVariable String username, @RequestBody Contact contact) {
        Contact createdContact = contactRepository.save(contact);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(createdContact.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    // Actualizar un contacto existente
    @PutMapping("/users/{username}/contacts")
    public ResponseEntity<Contact> updateContact(@PathVariable String username, @RequestBody Contact contact) {
        Contact updatedContact = contactRepository.save(contact);
        return new ResponseEntity<>(updatedContact, HttpStatus.OK);
    }

    // Eliminar un contacto
    @DeleteMapping("/users/{username}/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String username, @PathVariable long id) {
        contactRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
