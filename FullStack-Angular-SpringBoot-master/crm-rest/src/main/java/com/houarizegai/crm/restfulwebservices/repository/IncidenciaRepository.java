package com.houarizegai.crm.restfulwebservices.repository;

import com.houarizegai.crm.restfulwebservices.model.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
}
