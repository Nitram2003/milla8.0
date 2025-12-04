package com.example.backend.BackEnd.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.backend.BackEnd.repository.CommentRepository;
import com.example.backend.BackEnd.model.Comment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository repo;

    public Comment save(Comment c) {
        return repo.save(c);
    }

    public List<Comment> getAll() {
        return repo.findAll();
    }

    public Comment respond(Long id, String respuesta, String adminNombre) {

        Comment c = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));

        c.setRespondido(true);
        c.setRespuesta(respuesta);
        c.setAdminNombre(adminNombre); // Guardar nombre del admin

        return repo.save(c);
    }
}
