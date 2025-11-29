package com.example.backend.BackEnd.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

import com.example.backend.BackEnd.model.Comment;
import com.example.backend.BackEnd.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    @PostMapping("/save")
    public Comment save(@RequestBody Comment c) {
        return service.save(c);
    }

    @GetMapping("/all")
    public List<Comment> getAll() {
        return service.getAll();
    }

    @PostMapping("/responder/{id}")
    public Comment responder(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth
    ) {
        String respuesta = body.get("respuesta");

        // 🔥 Tomar nombre del administrador autenticado desde el token JWT
        String adminNombre = auth != null ? auth.getName() : "Administrador";

        return service.respond(id, respuesta, adminNombre);
    }

}
