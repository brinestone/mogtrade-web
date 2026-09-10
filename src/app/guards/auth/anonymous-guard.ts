import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isJwtValid, isOnBrowser } from '@mogtrade/app/utils';

export const anonymousGuard: (redirect?: string) => CanActivateFn = (redirect?: string) => () => {
  if (!isOnBrowser()) return true;
  const token = localStorage.getItem('act');
  if (token && isJwtValid(token)) {
    const router = inject(Router);
    return router.createUrlTree([redirect]);
  }
  return true;
};
