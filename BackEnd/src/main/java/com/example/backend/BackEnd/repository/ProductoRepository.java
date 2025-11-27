package com.example.backend.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.BackEnd.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
