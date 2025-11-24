import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservaService {

  // ✔ Ruta correcta hacia ms-reserva-cancha a través del gateway
  private API = 'http://localhost:9000/reservas';

  constructor(private http: HttpClient) {}

  // ✔ Crear una reserva
  crearReserva(data: any): Observable<any> {
    return this.http.post(`${this.API}`, data); // ← SIN /create
  }


  // ✔ Listar reservas por usuario
  listarPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/usuario/${idUsuario}`);
  }

  // ✔ Listar reservas por cancha
  listarPorCancha(idCancha: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/cancha/${idCancha}`);
  }

  // ✔ Listar TODAS las reservas
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}`);
  }
}
