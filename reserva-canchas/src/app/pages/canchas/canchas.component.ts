import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Cancha, CanchaRequest, CanchaUpdate, TipoDeporte, EstadoCancha } from '../../models/cancha.model';
import { CanchaService } from 'src/app/services/cancha/cancha.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cancha',
  standalone: true,
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class CanchaComponent implements OnInit {

  canchas: Cancha[] = [];
  form!: FormGroup;
  modoEdicion = false;
  canchaSeleccionadaId: number | null = null;

  tiposDeporte: TipoDeporte[] = ['FUTBOL', 'BASQUET', 'TENIS', 'VOLEY', 'PADEL'];
  estadosCancha: EstadoCancha[] = ['DISPONIBLE', 'MANTENIMIENTO', 'INACTIVA'];

  constructor(
    private canchaService: CanchaService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCanchas();
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      tipoDeporte: ['FUTBOL', Validators.required],
      tipoSuperficie: [''],
      techada: [false],
      capacidadJugadores: [null],
      estado: ['DISPONIBLE'] // solo en edición
    });
  }

  cargarCanchas() {
    const propietarioId = this.authService.getUserId();

    if (!propietarioId) {
      console.error("⚠ No hay usuario autenticado.");
      return;
    }

    this.canchaService.obtenerCanchasPorPropietario(propietarioId).subscribe({
      next: (data) => this.canchas = data,
      error: (err) => console.error("❌ Error al cargar canchas:", err)
    });
  }

  nuevoRegistro() {
    this.modoEdicion = false;
    this.canchaSeleccionadaId = null;

    this.form.reset({
      nombre: '',
      descripcion: '',
      tipoDeporte: 'FUTBOL',
      tipoSuperficie: '',
      techada: false,
      capacidadJugadores: null,
      estado: 'DISPONIBLE'
    });
  }

  editarCancha(c: Cancha) {
    this.modoEdicion = true;
    this.canchaSeleccionadaId = c.id!;

    this.form.patchValue({
      nombre: c.nombre,
      descripcion: c.descripcion,
      tipoDeporte: c.tipoDeporte,
      tipoSuperficie: c.tipoSuperficie,
      techada: c.techada,
      capacidadJugadores: c.capacidadJugadores,
      estado: c.estado
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const propietarioId = this.authService.getUserId();

    if (!propietarioId) {
      console.error("⚠ No existe propietarioId en el token");
      return;
    }

    if (this.modoEdicion && this.canchaSeleccionadaId != null) {
      const payload: CanchaUpdate = {
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
        tipoDeporte: this.form.value.tipoDeporte,
        tipoSuperficie: this.form.value.tipoSuperficie,
        techada: this.form.value.techada,
        capacidadJugadores: this.form.value.capacidadJugadores,
        estado: this.form.value.estado
      };

      this.canchaService.actualizarCancha(this.canchaSeleccionadaId, payload).subscribe({
        next: () => {
          this.cargarCanchas();
          this.nuevoRegistro();
        },
        error: (err) => console.error("❌ Error al actualizar cancha:", err)
      });

    } else {
      const payload: CanchaRequest = {
        propietarioId: propietarioId, // 🎯 automágico del token
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
        tipoDeporte: this.form.value.tipoDeporte,
        tipoSuperficie: this.form.value.tipoSuperficie,
        techada: this.form.value.techada,
        capacidadJugadores: this.form.value.capacidadJugadores
      };

      this.canchaService.crearCancha(payload).subscribe({
        next: () => {
          this.cargarCanchas();
          this.nuevoRegistro();
        },
        error: (err) => console.error("❌ Error al crear cancha:", err)
      });
    }
  }

  eliminarCancha(id: number) {
    if (!confirm('¿Eliminar cancha?')) return;

    this.canchaService.eliminarCancha(id).subscribe({
      next: () => this.cargarCanchas(),
      error: (err) => console.error("❌ Error al eliminar:", err)
    });
  }

}
