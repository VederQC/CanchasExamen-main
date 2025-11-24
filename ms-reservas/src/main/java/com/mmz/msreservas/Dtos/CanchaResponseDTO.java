package com.mmz.msreservas.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CanchaResponseDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private TipoDeporte tipoDeporte;
    private String tipoSuperficie;
    private Boolean techada;
    private Integer capacidadJugadores;
    private EstadoCancha estado;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum TipoDeporte {
        FUTBOL,
        BALONCESTO,
        VOLEY,
        TENIS
    }

    public enum EstadoCancha {
        DISPONIBLE,
        OCUPADA,
        MANTENIMIENTO,
        INACTIVA
    }
}
