import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import fpjs from '@fingerprintjs/fingerprintjs';
import { DeviceStore } from '../store/device/store';

export function initializeFingerprint() {
  return provideAppInitializer(async () => {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformServer(platformId)) {
      return;
    }
    const fp = await fpjs.load();
    const result = await fp.get();
    const store = inject(DeviceStore);
    store.setFingerprint(result.visitorId);
  });
}
