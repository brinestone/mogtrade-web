import { inject, Provider } from '@angular/core';
import { AuthService } from '@mogtrade/sdk/auth';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { produce } from 'immer';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Principal } from '../../../models/principal';
import { isJwtValid, isOnBrowser } from '../../utils';
import { Events, withEventHandlers } from '@ngrx/signals/events';
import { authEvents } from './events';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthStoreState {
  principal: Principal | null;
  accessToken: string | null;
  refreshToken: string | null;
  signedIn: boolean;
  signingIn: boolean;
}

const defaultState: AuthStoreState = {
  principal: null,
  signedIn: false,
  accessToken: null,
  refreshToken: null,
  signingIn: false,
};

export const AuthStore = signalStore(
  withState(defaultState),
  withMethods((store) => ({
    reset() {
      patchState(store, defaultState);
      localStorage.removeItem('rt');
      localStorage.removeItem('act');
    },
    updatePrincipal: (token: string) => {
      const principal = parsePrincipal(token);
      patchState(store, (state) =>
        produce(state, (draft) => {
          draft.signedIn = isJwtValid(token);
          draft.principal = principal;
          draft.accessToken = token;
        }),
      );
    },
    storeRefreshToken: (token: string) => {
      localStorage.setItem('rt', token);
      patchState(store, (u) =>
        produce(u, (draft) => {
          draft.refreshToken = token;
        }),
      );
    },
    storeAccessToken: (token: string) => {
      localStorage.setItem('act', token);
      patchState(store, (u) =>
        produce(u, (draft) => {
          draft.accessToken = token;
        }),
      );
    },
  })),
  withEventHandlers((store, events = inject(Events), router = inject(Router)) => ({
    signOut: events.on(authEvents.signOut).pipe(
      tap(() => {
        store.reset();
        router.navigate(['/auth'], { onSameUrlNavigation: 'reload' });
      }),
    ),
  })),
  withHooks({
    onInit(store) {
      if (!isOnBrowser()) return;
      const storedToken = localStorage.getItem('act');
      if (storedToken) {
        store.updatePrincipal(storedToken);
        patchState(store, () => ({ accessToken: storedToken }));
      }
    },
  }),
);

function parsePrincipal(token: string) {
  const payload = jwtDecode<
    {
      custom_fields: Record<string, boolean | null | string | number>;
    } & JwtPayload
  >(token);
  const principal = Principal.parse({
    displayName: payload.custom_fields['display_name'],
    email: payload.custom_fields['email'],
    emailVerified: payload.custom_fields['email_verified'],
    photo: payload.custom_fields['photo'],
    id: payload.sub,
  });
  return principal;
}

export function provideAuthStore() {
  return [{ provide: AuthService }, { provide: AuthStore, multi: false }] as Provider[];
}
