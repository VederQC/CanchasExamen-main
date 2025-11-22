import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenModels } from 'src/app/core/models/token-models';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.css']
})
export class AppSideLoginComponent {

  form = new FormGroup({
    userName: new FormControl('', Validators.required),   // ← usa email o username según tu backend
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    if (this.form.invalid) return;

    const credentials = this.form.value;

    this.authService.login(credentials).subscribe({
      next: (data: TokenModels) => {
        this.authService.setToken(data.token ?? '');

        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },

      error: err => {
        console.error('Error en login:', err);
        alert('Credenciales incorrectas');
      }
    });
  }

}
