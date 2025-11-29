package com.example.backend.BackEnd.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.BackEnd.model.Venta;
import com.example.backend.BackEnd.model.VentaDetalle;
import com.example.backend.BackEnd.repository.VentaRepository;
import java.util.List;

@Service
public class VentaServicio {

    @Autowired
    private VentaRepository ventaRepository;

    public Venta save(Venta venta) {

        venta.setFecha(LocalDateTime.now());

        // Relacionar cada detalle con la venta
        for (VentaDetalle d : venta.getDetalles()) {
            d.setVenta(venta);
        }

        return ventaRepository.save(venta);
    }
    public List<Venta> getAll() {
    return ventaRepository.findAll();
}

}
