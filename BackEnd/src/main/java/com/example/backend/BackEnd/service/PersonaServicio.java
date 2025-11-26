package com.example.backend.BackEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.BackEnd.model.Persona;
import com.example.backend.BackEnd.repository.PersonaRepository;

@Service

public class PersonaServicio {
    @Autowired
    private PersonaRepository personaRepository;
    
    public List <Persona> getAllPersonas() {
        return personaRepository.findAll();
    }

    public Persona savePersona(Persona per) {

    if (personaRepository.existsByUsername(per.getUsername())) {
        throw new RuntimeException("El nombre de usuario ya existe.");
    }

    return personaRepository.save(per);
}


    public Optional<Persona> getPersonaById(Long id){
        return personaRepository.findById(id);
    }

    public void deletePersona(Long id){
        personaRepository.deleteById(id);
    }
    
}
