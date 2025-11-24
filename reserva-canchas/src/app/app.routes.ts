import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authRoutes } from './auth/auth.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CanchaComponent } from './pages/canchas/canchas.component';

// IMPORTS NUEVOS (AJUSTA NOMBRES SI ES NECESARIO)
import { AppReservasComponent } from './pages/reservas/reservas.component';
import { UbicacionesComponent } from './pages/ubicaciones/ubicaiciones.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  {
    path: 'auth',
    children: authRoutes
  },

  // LAYOUT PRINCIPAL
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'usuarios/lista', component: UsuarioComponent },
      { path: 'canchas/lista', component: CanchaComponent },

      // 🔹 NUEVO: UBICACIONES
      { path: 'ubicaciones/lista', component: UbicacionesComponent },

      // 🔹 NUEVO: RESERVAS DENTRO DEL DASHBOARD
      {
        path: 'reservas/lista',
        loadComponent: () =>
          import('./pages/reservas/reservas.component')
            .then(m => m.AppReservasComponent)
      }
    ]
  },

  // 🔹 OPCIONAL: RESERVAS COMO PANTALLA INDEPENDIENTE
  {
    path: 'reservas',
    loadComponent: () =>
      import('./pages/reservas/reservas.component')
        .then(m => m.AppReservasComponent)
  },
];
