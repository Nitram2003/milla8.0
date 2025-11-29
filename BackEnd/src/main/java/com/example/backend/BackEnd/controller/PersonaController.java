package com.example.backend.BackEnd.controller;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.BackEnd.model.Persona;
import com.example.backend.BackEnd.repository.PersonaRepository;
import com.example.backend.BackEnd.security.JwtUtil;
import com.example.backend.BackEnd.service.PersonaServicio;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PersonaServicio personaServicio;

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping("/all")
    public List<Persona> getAllPersonas() {
        return personaServicio.getAllPersonas();
    }

    @PostMapping("/save")
    public ResponseEntity<?> savePersona(@RequestBody Persona per) {
        try {
            Persona personaGuardada = personaServicio.savePersona(per);
            return ResponseEntity.ok(personaGuardada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Persona per) {
        Optional<Persona> user = personaServicio.login(per.getUsername(), per.getPassword());

        if (user.isPresent()) {

            // Crear token
            String token = jwtUtil.generateToken(
                    user.get().getUsername(),
                    user.get().getRol()
            );

            // Devolver token + user data
            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "username", user.get().getUsername(),
                            "rol", user.get().getRol()
                    )
            );
        }

        return ResponseEntity.status(401)
                .body(Map.of("message", "Credenciales inválidas"));
    }

    // 🔥 NUEVO: obtener datos del usuario logueado
    @GetMapping("/me")
    public ResponseEntity<?> getPerfil(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "No autenticado"));
        }

        String username = auth.getName(); // viene del JWT (subject)

        Optional<Persona> personaOpt = personaRepository.findByUsername(username);

        if (personaOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "Usuario no encontrado"));
        }

        Persona p = personaOpt.get();

        // No devolvemos password
        return ResponseEntity.ok(
                Map.of(
                        "id", p.getId(),
                        "username", p.getUsername(),
                        "email", p.getEmail(),
                        "rol", p.getRol()
                )
        );
    }

    @DeleteMapping("/delete/{id}")
    public void deletePersona(@PathVariable Long id) {
        personaServicio.deletePersona(id);
    }

    @PutMapping("/update/{id}")
public ResponseEntity<?> updatePersona(@PathVariable Long id, @RequestBody Persona datos) {
    try {
        Persona updated = personaServicio.updatePersona(id, datos);
        return ResponseEntity.ok(updated);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}


}
