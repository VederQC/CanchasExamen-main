package com.mmz.msreservas.Feign;

import com.mmz.msreservas.Dtos.UsuarioDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;

@FeignClient(name = "ms-gateway-server", path = "/usuarios")
public interface UsuarioFeign {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "usuarioPorIdCB", fallbackMethod = "fallbackUsuarioPorId")
    UsuarioDTO obtenerUsuarioPorId(@PathVariable("id") Long id);

    default UsuarioDTO fallbackUsuarioPorId(Long id, Throwable e) {
        System.err.println("⚠️ CircuitBreaker: MS-USUARIO no disponible (ID: " + id + ")");
        return UsuarioDTO.builder()
                .id(0L)
                .email("desconocido@reserva.com")
                .nombre("Usuario")
                .apellido("Desconocido")
                .telefono("N/A")
                .fotoPerfil(null)
                .estado(UsuarioDTO.EstadoUsuario.INACTIVO)
                .createdAt(null)
                .updatedAt(null)
                .build();
    }
}
