import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UbicacionService {

  private API = 'http://localhost:9000/ubicaciones';

  constructor(private http: HttpClient) {}

  // --------------------------------------------------
  // 👉 Crear ubicación
  // --------------------------------------------------
  crearUbicacion(data: any): Observable<any> {
    return this.http.post(`${this.API}`, data);
  }

  // --------------------------------------------------
  // 👉 Obtener ubicación por ID
  // --------------------------------------------------
  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  // --------------------------------------------------
  // 👉 Obtener ubicación por id de cancha
  // --------------------------------------------------
  obtenerPorCancha(canchaId: number): Observable<any> {
    return this.http.get(`${this.API}/cancha/${canchaId}`);
  }

  // --------------------------------------------------
  // 👉 Listar TODAS las ubicaciones
  // --------------------------------------------------
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}`);
  }

  // --------------------------------------------------
  // 👉 Filtro por distrito
  // --------------------------------------------------
  obtenerPorDistrito(distrito: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/distrito/${distrito}`);
  }

  // --------------------------------------------------
  // 👉 Filtro por ciudad
  // --------------------------------------------------
  obtenerPorCiudad(ciudad: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/ciudad/${ciudad}`);
  }

  // --------------------------------------------------
  // 👉 Filtro por departamento
  // --------------------------------------------------
  obtenerPorDepartamento(dep: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/departamento/${dep}`);
  }

  // --------------------------------------------------
  // 👉 Buscar por ciudad + distrito
  // --------------------------------------------------
  buscarCiudadDistrito(ciudad: string, distrito: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/buscar`, {
      params: { ciudad, distrito }
    });
  }

  // --------------------------------------------------
  // 👉 Buscar canchas cercanas (lat/lon)
  // --------------------------------------------------
  buscarCercanas(lat: number, lon: number, radiusKm: number = 5): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/cercanas`, {
      params: {
        latitud: lat.toString(),
        longitud: lon.toString(),
        radiusKm: radiusKm.toString()
      }
    });
  }

  // --------------------------------------------------
  // 👉 Actualizar ubicación
  // --------------------------------------------------
  actualizar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  // --------------------------------------------------
  // 👉 Eliminar por ID
  // --------------------------------------------------
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  // --------------------------------------------------
  // 👉 Eliminar por cancha (cuando se borra una cancha)
  // --------------------------------------------------
  eliminarPorCancha(canchaId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/cancha/${canchaId}`);
  }
}
