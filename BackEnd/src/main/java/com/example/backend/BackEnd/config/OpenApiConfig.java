package com.example.backend.BackEnd.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI millaPelucheOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Milla Peluches")
                        .description("Documentación de la API REST de Milla Peluches (productos, personas, ventas, comentarios).")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Equipo Milla Peluches")
                                .email("soporte@milla-peluches.local")
                        )
                );
    }
}
