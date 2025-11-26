package com.example.backend.BackEnd.repository;
import com.example.backend.BackEnd.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
    boolean existsByUsername(String username);
    Optional<Persona> findByUsername(String username);

}


