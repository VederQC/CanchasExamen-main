import {TokenModels} from '@app/core/models/token-models';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

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
}
