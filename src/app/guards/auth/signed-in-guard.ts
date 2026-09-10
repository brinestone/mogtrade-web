import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@mogtrade/app/store/auth/store';
import { isJwtValid } from '@mogtrade/app/utils';
import { AuthService } from '@mogtrade/sdk/auth';
import { catchError, map, of, tap } from 'rxjs';

export const signedInGuard: (redirect: string) => CanActivateFn = (redirect: string) => (state) => {
  const accessToken = localStorage.getItem('act');
  const refreshToken = localStorage.getItem('rt');
  const router = inject(Router);
  const store = inject(AuthStore);
  const tree = router.createUrlTree([redirect], {
    queryParams: {
      continue: state.url,
    },
    queryParamsHandling: 'merge',
  });
  if (!accessToken || !refreshToken) {
    return tree;
  } else if (!isJwtValid(accessToken)) {
    const authService = inject(AuthService);
    return authService
      .rotateAccessToken({
        headers: {
          'x-refresh-token': refreshToken,
        },
        withCredentials: true,
      })
      .pipe(
        tap(({ accessToken, refreshToken }) => {
          store.storeAccessToken(accessToken);
          store.updatePrincipal(accessToken);
          store.storeRefreshToken(refreshToken);
        }),
        map(() => true),
        catchError((err) => {
          console.error(err);
          return of(tree);
        }),
      );
  }
  return true;
};
