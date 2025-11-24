import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservaService {

  // ❌ YA NO SE USA URL COMPLETA
  // ✔ SOLO RUTA RELATIVA (el interceptor pondrá http://localhost:9000)
  private API = '/reservas';

  constructor(private http: HttpClient) {}

  // Crear reserva
  crearReserva(data: any): Observable<any> {
    return this.http.post(`${this.API}`, data);
  }

  // Listar por usuario
  listarPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/usuario/${idUsuario}`);
  }

  // Listar por cancha
  listarPorCancha(idCancha: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/cancha/${idCancha}`);
  }

  // Listar todas
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }
}
