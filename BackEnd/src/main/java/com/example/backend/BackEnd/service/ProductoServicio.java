package com.example.backend.BackEnd.service;

import com.example.backend.BackEnd.model.Producto;
import com.example.backend.BackEnd.repository.ProductoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServicio {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getAll() {
        return productoRepository.findAll();
    }

    public Producto save(Producto p) {
        return productoRepository.save(p);
    }

    public Optional<Producto> getById(Long id) {
        return productoRepository.findById(id);
    }

    public Producto update(Long id, Producto p) {
        Producto exist = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        exist.setNombre(p.getNombre());
        exist.setDescripcion(p.getDescripcion());
        exist.setPrecio(p.getPrecio());
        exist.setStock(p.getStock());
        exist.setImagen(p.getImagen());

        return productoRepository.save(exist);
    }

    public void delete(Long id) {
        productoRepository.deleteById(id);
    }
}
