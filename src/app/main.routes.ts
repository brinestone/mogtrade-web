import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: 'markets',
    loadComponent: () => import('./layouts/markets/markets.layout').then((m) => m.MarketsLayout),
    loadChildren: () => import('./market.routes').then((m) => m.marketRoutes),
  },
  { path: '', pathMatch: 'full', redirectTo: 'markets' },
];
