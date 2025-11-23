import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioRequest, UsuarioUpdate } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly BASE_URL = 'usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(payload: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.BASE_URL}`, payload);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}/${id}`);
  }

  obtenerUsuarioPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}/email/${email}`);
  }

  obtenerTodosLosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.BASE_URL}`);
  }

  actualizarUsuario(id: number, payload: UsuarioUpdate): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}/${id}`, payload);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
