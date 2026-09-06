import { HttpInterceptorFn } from '@angular/common/http';

export const apiBearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
