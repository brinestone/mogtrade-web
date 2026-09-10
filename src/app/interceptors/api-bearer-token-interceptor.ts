import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiBearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api')) {
    return next(
      req.clone({
        url: [environment.apiUrlBase.replace(/\/$/, ''), req.url.substring(1)].join('/'),
      }),
    );
  }
  return next(req);
};
