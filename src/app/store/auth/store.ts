import { inject } from '@angular/core';
import { MogTradeAuthenticationService } from '@mogtrade/sdk/auth/mogTradeAuthentication';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { produce } from 'immer';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Principal } from '../../../models/principal';
import { isOnBrowser } from '../../utils';
import { authEvents } from './events';

export interface AuthStoreState {
  principal: Principal | null;
  accessToken: string | null;
  signedIn: boolean;
  signingIn: boolean;
}

const defaultState: AuthStoreState = {
  principal: null,
  signedIn: false,
  accessToken: null,
  signingIn: false,
};

export const AuthStore = signalStore(
  withState(defaultState),
  withProps((store) => ({
    _authService: inject(MogTradeAuthenticationService),
  })),
  withReducer(
    on(authEvents.credentialSignIn, () => ({ signingIn: true })),
    on(authEvents.signInComplete, () => ({ signingIn: false })),
  ),
  withMethods((store) => ({
    storeAccessToken: (token: string) => {
      localStorage.setItem('act', token);
    },
    setAccessToken: (token: string) => {
      const principal = parsePrincipal(token);
      patchState(store, (state) =>
        produce(state, (draft) => {
          draft.signedIn = isTokenValid(token);
          draft.principal = principal;
          draft.accessToken = token;
        }),
      );
    },
  })),
  withHooks({
    onInit(store) {
      if (!isOnBrowser()) return;
      const storedToken = localStorage.getItem('act');
      if (storedToken) {
        store.setAccessToken(storedToken);
      }
    },
  }),
);

function isTokenValid(token: string) {
  const payload = jwtDecode(token);
  if (!payload.exp) {
    return false;
  }
  const now = Date.now() / 1000;
  return payload.exp > now;
}

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
