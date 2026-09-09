import { isPlatformBrowser } from '@angular/common';
import { assertInInjectionContext, inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export function isOnBrowser() {
  assertInInjectionContext(isOnBrowser);
  const platformId = inject(PLATFORM_ID);
  return isPlatformBrowser(platformId);
}

export function isJwtValid(token: string) {
  const payload = jwtDecode(token);
  if (!payload.exp) return false;
  const now = Date.now() / 1000;
  return payload.exp > now;
}

export function parseJwt<T extends object>(token: string): JwtPayload & T {
  const payload = jwtDecode<T & JwtPayload>(token);
  return payload;
}
