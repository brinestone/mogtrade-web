import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeFingerprint } from './adapters/fingerprint';
import { DeviceStore } from './store/device/store';
import { apiDeviceIdInterceptor } from './interceptors/api-device-id-interceptor';
import { apiBearerTokenInterceptor } from './interceptors/api-bearer-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: false,
        includeHeaders: ['ETag', 'Last-Modified', 'Cache-Control', 'Content-Type'],
      }),
    ),
    provideHttpClient(withInterceptors([apiDeviceIdInterceptor, apiBearerTokenInterceptor])),
    initializeFingerprint(),
    DeviceStore
  ],
};
