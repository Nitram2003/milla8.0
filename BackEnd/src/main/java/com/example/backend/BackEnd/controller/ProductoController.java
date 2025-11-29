package com.example.backend.BackEnd.controller;

import com.example.backend.BackEnd.model.Producto;
import com.example.backend.BackEnd.service.ProductoServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin("*")
public class ProductoController {

    @Autowired
    private ProductoServicio productoServicio;

    @GetMapping("/all")
    public List<Producto> getAllProductos() {
        return productoServicio.getAll();
    }

    @PostMapping("/save")
    public Producto saveProducto(@RequestBody Producto p) {
        return productoServicio.save(p);
    }

    @PutMapping("/update/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody Producto p) {
        return productoServicio.update(id, p);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProducto(@PathVariable Long id) {
        productoServicio.delete(id);
    }
}
