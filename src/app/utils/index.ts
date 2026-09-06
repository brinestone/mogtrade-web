import { isPlatformBrowser } from '@angular/common';
import { assertInInjectionContext, inject, PLATFORM_ID } from '@angular/core';

export function isOnBrowser() {
  assertInInjectionContext(isOnBrowser);
  const platformId = inject(PLATFORM_ID);
  return isPlatformBrowser(platformId);
}
