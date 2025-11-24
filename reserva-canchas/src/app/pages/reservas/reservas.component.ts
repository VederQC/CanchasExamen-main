import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { CanchaService } from 'src/app/services/cancha/cancha.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class AppReservasComponent implements OnInit {

  canchas: any[] = [];
  reservas: any[] = [];

  form = {
    canchaId: '',
    fechaReserva: '',
    horaInicio: '',
    horaFin: ''
  };

  userId!: number;

  constructor(
    private reservaService: ReservaService,
    private canchaService: CanchaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    this.cargarCanchas();
    this.cargarReservas();
  }

  cargarCanchas() {
    this.canchaService.getAll().subscribe({
      next: data => this.canchas = data,
      error: err => console.error('Error cargando canchas', err)
    });
  }

  cargarReservas() {
    this.reservaService.listarPorUsuario(this.userId).subscribe({
      next: data => this.reservas = data,
      error: err => console.error('Error cargando reservas', err)
    });
  }

  reservar() {

    // VALIDACIONES
    if (!this.form.canchaId || !this.form.fechaReserva || !this.form.horaInicio || !this.form.horaFin) {
      alert("Completa todos los campos.");
      return;
    }

    // CONVERTIR HORAS A "HH:mm:ss"
    const horaInicioFixed = this.form.horaInicio.includes(':') ? this.form.horaInicio + ":00" : this.form.horaInicio;
    const horaFinFixed = this.form.horaFin.includes(':') ? this.form.horaFin + ":00" : this.form.horaFin;

    const payload = {
      usuarioId: this.userId,
      canchaId: Number(this.form.canchaId),
      fechaReserva: this.form.fechaReserva,
      horaInicio: horaInicioFixed,
      horaFin: horaFinFixed
    };

    this.reservaService.crearReserva(payload).subscribe({
      next: () => {
        alert('Reserva creada correctamente');
        this.cargarReservas();
      },
      error: err => {
        console.error(err);
        alert('Error al crear reserva');
      }
    });
  }
}
