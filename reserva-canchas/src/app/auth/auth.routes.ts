import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './authentication/side-login/side-login.component';
import { AppSideRegisterComponent } from './authentication/side-register/side-register.component';

export const authRoutes: Routes = [
  { path: 'login', component: AppSideLoginComponent },
  { path: 'register', component: AppSideRegisterComponent },
];
