import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenModels } from '@app/core/models/token-models';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(payload: any) {
    return this.http.post<TokenModels>('auth/login', payload);
  }

  register(payload: any) {
    return this.http.post('auth/create', payload);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ⭐⭐ NUEVO: obtener el ID del usuario desde el JWT ⭐⭐
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id || decoded.userId || decoded.sub || null;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  }
  getUserIdFromToken(): number {
    const token = this.getToken();
    if (!token) return 0;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id || decoded.userId || 0;   // Ajusta según tu token
    } catch (e) {
      console.error('Error decoding token', e);
      return 0;
    }
  }
}
