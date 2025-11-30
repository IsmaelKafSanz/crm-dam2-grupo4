package com.houarizegai.crm.restfulwebservices.repository;

import com.houarizegai.crm.restfulwebservices.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    // Método personalizado para obtener contactos por cliente
    List<Contact> findByCustomerId(Long customerId);
    
    // Método para obtener solo contactos activos
    List<Contact> findByActiveTrue();
}
