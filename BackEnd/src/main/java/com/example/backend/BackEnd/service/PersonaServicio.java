package com.example.backend.BackEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.BackEnd.model.Persona;
import com.example.backend.BackEnd.repository.PersonaRepository;

@Service

public class PersonaServicio {

    

    @Autowired
    private BCryptPasswordEncoder encoder;
    
    @Autowired
    private PersonaRepository personaRepository;
    
    public List <Persona> getAllPersonas() {
        return personaRepository.findAll();
    }

    public Persona savePersona(Persona persona) {
    // Verificar si el nombre de usuario ya existe
    if (personaRepository.existsByUsername(persona.getUsername())) {
        throw new RuntimeException("El nombre de usuario ya existe.");
    }

    // Asignar rol por defecto
    persona.setRol("user");

    // 🔒 Encriptar contraseña
    persona.setPassword(encoder.encode(persona.getPassword()));

    return personaRepository.save(persona);
}



    public Optional<Persona> getPersonaById(Long id){
        return personaRepository.findById(id != null ? id : 0L);
    }

    public void deletePersona(Long id){
        if (id != null) {
            personaRepository.deleteById(id);
        }
    }
    
    public Optional<Persona> login(String username, String password) {

    Optional<Persona> user = personaRepository.findByUsername(username);

    if (user.isPresent()) {

        // Comparar contraseña ingresada vs contraseña encriptada
        if (encoder.matches(password, user.get().getPassword())) {
            return user;
        }
    }

    return Optional.empty();
}



}
