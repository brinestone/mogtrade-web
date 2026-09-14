import { Routes } from '@angular/router';

export const marketRoutes: Routes = [
  {
    path: 'overview',
    title: 'Overview',
    loadComponent: () =>
      import('./pages/markets/overview/overview.page').then((m) => m.OverviewPage),
  },
  {
    path: 'trade',
    title: 'Trade',
    loadComponent: () => import('./pages/markets/trades/trades.page').then((m) => m.TradesPage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
];
