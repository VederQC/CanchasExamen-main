package com.mmz.msreservas.Feign;

import com.mmz.msreservas.Dtos.CanchaDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-cancha", path = "/canchas")
public interface CanchaFeign {

    @GetMapping("/{id}")
    @CircuitBreaker(name = "canchaPorIdCB", fallbackMethod = "fallbackCanchaPorId")
    CanchaDTO obtenerCanchaPorId(@PathVariable("id") Long id);

    // Fallback CORREGIDO
    default CanchaDTO fallbackCanchaPorId(Long id, Throwable e) {
        System.err.println("⚠️ CircuitBreaker: MS-CANCHA no disponible (ID: " + id + ")");

        // Devuelve un objeto neutral que NO rompa la validación
        return CanchaDTO.builder()
                .id(id)
                .nombre("No disponible")
                .descripcion("Servicio de canchas caído")
                .tipoDeporte(CanchaDTO.TipoDeporte.FUTBOL)
                .tipoSuperficie("N/A")
                .techada(false)
                .capacidadJugadores(0)
                .estado(CanchaDTO.EstadoCancha.DISPONIBLE)   // <-- CORREGIDO
                .createdAt(null)
                .updatedAt(null)
                .build();
    }
}
