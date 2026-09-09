import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { DeviceStore } from '../store/device/store';

export const apiDeviceIdInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api') ) {
    const store = inject(DeviceStore);
    return next(
      req.clone({
        setHeaders: {
          'x-d-id': store.fingerprint(),
        },
      }),
    );
  }
  return next(req);
};
