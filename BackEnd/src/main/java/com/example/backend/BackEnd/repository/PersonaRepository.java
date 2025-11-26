package com.example.backend.BackEnd.repository;
import com.example.backend.BackEnd.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
    boolean existsByUsername(String username);
}

