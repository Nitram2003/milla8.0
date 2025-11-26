package com.example.backend.BackEnd.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.example.backend.BackEnd.service.PersonaServicio;

@RestController
@RequestMapping("api/personas")
public class PersonaController {
    @Autowired
    private PersonaServicio personaServicio;

    @GetMapping("/all")
    public List<Persona> getAllPersonas() {
        return personaServicio.getAllPersonas();
    }

    @PostMapping("/save")
public ResponseEntity<?> savePersona(@RequestBody Persona per){
    try {
        Persona personaGuardada = personaServicio.savePersona(per);
        return ResponseEntity.ok(personaGuardada);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}


    
    @DeleteMapping("/delete/{id}")
    public void deletePersona(@PathVariable Long id){
    personaServicio.deletePersona(id);
    }

    @Autowired
    private PersonaRepository personaRepository;
    @PutMapping("/update/{id}")
    public Optional <Object>
                putPersona(@PathVariable Long id, @RequestBody Persona entity){

            return personaRepository.findById(id)
                .map(existePersona -> {
                    existePersona.setUsername(entity.getUsername());
                    existePersona.setEmail(entity.getEmail());
                    existePersona.setPassword(entity.getPassword());
                    Persona personaUpdate = personaRepository.save(existePersona);
                    return personaUpdate;
                })    ;
            }


}
