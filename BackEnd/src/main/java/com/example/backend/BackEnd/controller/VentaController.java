package com.example.backend.BackEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.BackEnd.model.Venta;
import com.example.backend.BackEnd.service.VentaServicio;
import java.util.List;



@RestController
@RequestMapping("/api/ventas")
@CrossOrigin("*")
public class VentaController {

    @Autowired
    private VentaServicio ventaServicio;

    @PostMapping("/save")
    public Venta saveVenta(@RequestBody Venta venta) {
        return ventaServicio.save(venta);
    }
    @GetMapping("/all")
public List<Venta> getAllVentas() {
    return ventaServicio.getAll();
}

}
