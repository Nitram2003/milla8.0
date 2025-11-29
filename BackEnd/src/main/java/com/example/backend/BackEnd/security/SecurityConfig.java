package com.example.backend.BackEnd.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    // 🔥 CORS GLOBAL
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("*"));                           // permitir cualquier IP
        config.setAllowedMethods(List.of("GET", "POST", "PUT",
                                         "DELETE", "OPTIONS"));           // permitir OPTIONS (importante)
        config.setAllowedHeaders(List.of("*"));                            // permitir todas las cabeceras
        config.setExposedHeaders(List.of("Authorization"));                // exponer token
        config.setAllowCredentials(false);                                 // permitir sin cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                // 🔥 RUTAS PÚBLICAS
                .requestMatchers(
                        "/api/personas/login",
                        "/api/personas/save",
                        "/api/comentarios/save",
                        "/api/comentarios/all",
                        "/api/productos/all",
                        "/api/ventas/save",
                        "/error",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()

                // 🔐 SOLO ADMIN
                .requestMatchers("/api/productos/**").hasRole("ADMIN")
                .requestMatchers("/api/ventas/**").hasRole("ADMIN")
                .requestMatchers("/api/personas/update/**").hasRole("ADMIN")
                .requestMatchers("/api/personas/delete/**").hasRole("ADMIN")
                .requestMatchers("/api/personas/all").hasRole("ADMIN")
                .requestMatchers("/api/comentarios/responder/**").hasRole("ADMIN")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // 🔒 RESTO REQUIERE TOKEN
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
