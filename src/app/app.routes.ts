import { Routes } from '@angular/router';
import { signedInGuard } from './guards/auth/signed-in-guard';

const requireSignedIn = signedInGuard('/auth/login');
export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth/auth.layout').then((m) => m.AuthLayout),
    loadChildren: () => import('./auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'console',
    canActivate: [requireSignedIn],
    loadComponent: () => import('./layouts/main/main.layout').then((m) => m.MainLayout),
    loadChildren: () => import('./main.routes').then((m) => m.mainRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'console',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/basic/not-found-page/not-found-page').then((m) => m.NotFoundPage),
    title: 'Resource not found',
  },
];
