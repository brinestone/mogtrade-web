import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@mogtrade/app/store/auth/store';

export const signedInGuard: (redirect: string) => CanActivateFn =
  (redirect: string) => (route, state) => {
    const store = inject(AuthStore);
    if (!store.signedIn()) {
      const router = inject(Router);
      return router.createUrlTree([redirect], {
        queryParams: {
          continue: state.url,
        },
        queryParamsHandling: 'merge',
      });
    }
    return true;
  };
