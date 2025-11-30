package com.houarizegai.crm.restfulwebservices.repository;

import com.houarizegai.crm.restfulwebservices.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByEstado(String estado);
}
