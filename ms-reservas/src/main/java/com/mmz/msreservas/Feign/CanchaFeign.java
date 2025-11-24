package com.mmz.msreservas.Feign;

import com.mmz.msreservas.Dtos.CanchaResponseDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-gateway-server", path = "/canchas")
public interface CanchaFeign {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "canchaPorIdCB", fallbackMethod = "fallbackCanchaPorId")
    CanchaResponseDTO obtenerCanchaPorId(@PathVariable("id") Long id);

    default CanchaResponseDTO fallbackCanchaPorId(Long id, Throwable e) {
        System.err.println("⚠️ CircuitBreaker: MS-CANCHA no disponible (ID: " + id + ")");

        return CanchaResponseDTO.builder()
                .id(id)
                .nombre("No disponible")
                .descripcion("Servicio de canchas no disponible")
                .tipoDeporte(null)
                .tipoSuperficie("N/A")
                .techada(false)
                .capacidadJugadores(0)
                .estado(null)
                .createdAt(null)
                .updatedAt(null)
                .build();
    }
}
