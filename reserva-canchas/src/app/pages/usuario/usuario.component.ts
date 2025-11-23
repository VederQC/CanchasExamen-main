import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Usuario, UsuarioRequest, UsuarioUpdate } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'nombre', 'apellido', 'telefono', 'estado', 'acciones'];
  usuarios: Usuario[] = [];

  form!: FormGroup;
  modoEdicion = false;
  usuarioSeleccionadoId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarUsuarios();
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: [''],
      fotoPerfil: [''],
      estado: ['ACTIVO']  // ⭐ por defecto
    });
  }

  cargarUsuarios() {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error(err)
    });
  }

  nuevoUsuario() {
    this.modoEdicion = false;
    this.usuarioSeleccionadoId = null;
    this.form.reset({ estado: 'ACTIVO' });
  }

  editarUsuario(u: Usuario) {
    this.modoEdicion = true;
    this.usuarioSeleccionadoId = u.id!;

    this.form.patchValue({
      nombre: u.nombre,
      apellido: u.apellido,
      email: u.email,
      telefono: u.telefono,
      fotoPerfil: u.fotoPerfil,
      estado: u.estado  // ⭐ cargamos estado
    });
  }

  guardar() {
    if (this.form.invalid) return;

    if (this.modoEdicion) {
      const payload: UsuarioUpdate = this.form.value;

      this.usuarioService.actualizarUsuario(this.usuarioSeleccionadoId!, payload).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.form.reset({ estado: 'ACTIVO' });
          this.modoEdicion = false;
          this.usuarioSeleccionadoId = null;
        },
        error: (err) => console.error(err)
      });

    } else {
      const payload: UsuarioRequest = this.form.value;

      this.usuarioService.crearUsuario(payload).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.form.reset({ estado: 'ACTIVO' });
        },
        error: (err) => console.error(err)
      });
    }
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Eliminar usuario?')) return;

    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => console.error(err)
    });
  }

}
