import {AuthService} from 'src/app/services/auth/auth.service';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/authentication/login']);
      return false;
    }

    return true;
  }
}
