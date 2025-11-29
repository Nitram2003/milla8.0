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

    // Obtener todos los usuarios
    public List<Persona> getAllPersonas() {
        return personaRepository.findAll();
    }

    // Crear usuario
    public Persona savePersona(Persona persona) {

        // Validación de username duplicado
        if (personaRepository.existsByUsername(persona.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya existe.");
        }

        // 🔥 Si NO viene rol desde el Frontend → por defecto USER
        if (persona.getRol() == null || persona.getRol().trim().isEmpty()) {
            persona.setRol("user");
        }

        // Encriptar contraseña
        persona.setPassword(encoder.encode(persona.getPassword()));

        return personaRepository.save(persona);
    }

    // Obtener usuario por ID
    public Optional<Persona> getPersonaById(Long id) {
        return personaRepository.findById(id);
    }

    // Actualizar usuario
    public Persona updatePersona(Long id, Persona datos) {

        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar datos
        persona.setUsername(datos.getUsername());
        persona.setEmail(datos.getEmail());

        // Si se envía una nueva contraseña, encriptarla
        if (datos.getPassword() != null && !datos.getPassword().isBlank()) {
            persona.setPassword(encoder.encode(datos.getPassword()));
        }

        // SI viene rol → actualizarlo
        if (datos.getRol() != null && !datos.getRol().isBlank()) {
            persona.setRol(datos.getRol());
        }

        return personaRepository.save(persona);
    }

    // Eliminar usuario
    public void deletePersona(Long id) {
        if (id != null) {
            personaRepository.deleteById(id);
        }
    }

    // Login seguro con BCrypt
    public Optional<Persona> login(String username, String password) {

        Optional<Persona> user = personaRepository.findByUsername(username);

        if (user.isPresent()) {
            // Comparar contraseña ingresada vs encriptada
            if (encoder.matches(password, user.get().getPassword())) {
                return user;
            }
        }

        return Optional.empty();
    }
}
