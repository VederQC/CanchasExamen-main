import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UbicacionService } from 'src/app/services/ubicacion/bicacion.service';

@Component({
  selector: 'app-ubicaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {

  ubicaciones: any[] = [];

  form = new FormGroup({
    canchaId: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    distrito: new FormControl('', Validators.required),
    departamento: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
  });

  modoEdicion = false;
  editId: number | null = null;

  constructor(private ubicacionService: UbicacionService) {}

  ngOnInit(): void {
    this.cargarUbicaciones();
  }

  cargarUbicaciones() {
    this.ubicacionService.getAll().subscribe(data => {
      this.ubicaciones = data;
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    // MODO EDITAR
    if (this.modoEdicion && this.editId) {
      this.ubicacionService.actualizar(this.editId, payload).subscribe(() => {
        this.cancelarEdicion();
        this.cargarUbicaciones();
      });
      return;
    }

    // MODO CREAR
    this.ubicacionService.crearUbicacion(payload).subscribe(() => {
      this.form.reset();
      this.cargarUbicaciones();
    });
  }

  editar(item: any) {
    this.modoEdicion = true;
    this.editId = item.id;

    this.form.patchValue({
      canchaId: item.canchaId,
      ciudad: item.ciudad,
      distrito: item.distrito,
      departamento: item.departamento,
      latitud: item.latitud,
      longitud: item.longitud,
    });
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.editId = null;
    this.form.reset();
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar ubicación?')) return;

    this.ubicacionService.eliminar(id).subscribe(() => {
      this.cargarUbicaciones();
    });
  }
}
