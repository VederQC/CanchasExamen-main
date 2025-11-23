import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancha, CanchaRequest, CanchaUpdate, EstadoCancha, TipoDeporte } from 'src/app/models/cancha.model';


@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  private readonly BASE_URL = 'canchas';

  constructor(private http: HttpClient) {}

  crearCancha(payload: CanchaRequest): Observable<Cancha> {
    return this.http.post<Cancha>(`${this.BASE_URL}`, payload);
  }

  obtenerCanchaPorId(id: number): Observable<Cancha> {
    return this.http.get<Cancha>(`${this.BASE_URL}/${id}`);
  }

  obtenerTodasLasCanchas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.BASE_URL}`);
  }

  obtenerCanchasPorPropietario(propietarioId: string): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.BASE_URL}/propietario/${propietarioId}`);
  }

  obtenerCanchasPorTipoDeporte(tipoDeporte: TipoDeporte): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.BASE_URL}/tipo-deporte/${tipoDeporte}`);
  }

  obtenerCanchasPorEstado(estado: EstadoCancha): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.BASE_URL}/estado/${estado}`);
  }

  obtenerCanchasTechadas(techada: boolean): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.BASE_URL}/techadas/${techada}`);
  }

  buscarCanchas(tipoDeporte: TipoDeporte, estado: EstadoCancha): Observable<Cancha[]> {
    const params = new HttpParams()
      .set('tipoDeporte', tipoDeporte)
      .set('estado', estado);

    return this.http.get<Cancha[]>(`${this.BASE_URL}/buscar`, { params });
  }

  actualizarCancha(id: number, payload: CanchaUpdate): Observable<Cancha> {
    return this.http.put<Cancha>(`${this.BASE_URL}/${id}`, payload);
  }

  cambiarEstadoCancha(id: number, estado: EstadoCancha): Observable<Cancha> {
    const params = new HttpParams().set('estado', estado);
    return this.http.patch<Cancha>(`${this.BASE_URL}/${id}/estado`, null, { params });
  }

  eliminarCancha(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
