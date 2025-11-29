package com.example.backend.BackEnd.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String tipo;
    private String mensaje;

    private String adminNombre;    // Nombre del admin que respondió
    private String respuesta;      // Respuesta desde admin
    private boolean respondido;    // Si está respondido

    private LocalDateTime fecha = LocalDateTime.now(); // Fecha del comentario
}
