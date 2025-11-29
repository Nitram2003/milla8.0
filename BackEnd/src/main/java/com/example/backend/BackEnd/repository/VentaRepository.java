package com.example.backend.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.BackEnd.model.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {
}
