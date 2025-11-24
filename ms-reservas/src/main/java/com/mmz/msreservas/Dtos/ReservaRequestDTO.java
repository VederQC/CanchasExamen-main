package com.mmz.msreservas.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservaRequestDTO {

    private Long usuarioId;
    private Long canchaId;

    // Vienen como STRING desde Angular (ej: "2025-12-25", "14:00:00")
    private String fechaReserva;
    private String horaInicio;
    private String horaFin;

    private BigDecimal precioTotal;  // opcional
    private String metodoPago;       // opcional
    private String notas;            // opcional
}
