import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app//services/auth/auth.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {

  loading = false;
  errorMessage = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() { return this.form.controls; }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Cuenta creada. Ahora inicia sesión.');
        this.router.navigate(['/authentication/login']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Error creando cuenta.';
      }
    });
  }
}
