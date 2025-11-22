import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authRoutes } from './auth/auth.routes';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  {
    path: 'auth',
    children: authRoutes
  },

  // PRIVATE
  { path: 'dashboard', component: DashboardComponent },
];
