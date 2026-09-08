import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: 'Sign in to your Account',
    loadComponent: () => import('./pages/auth/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    title: 'Create your Account today',
    loadComponent: () => import('./pages/auth/signup/signup.page').then((m) => m.SignupPage),
  },
];
