import { Routes } from '@angular/router';
import { anonymousGuard } from './guards/auth/anonymous-guard';

const requireAnonymous = anonymousGuard('/console');
export const authRoutes: Routes = [
  {
    path: 'login',
    canActivate: [requireAnonymous],
    title: 'Sign in to your Account',
    loadComponent: () => import('./pages/auth/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    canActivate: [requireAnonymous],
    title: 'Create your Account today',
    loadComponent: () => import('./pages/auth/signup/signup.page').then((m) => m.SignupPage),
  },
];
