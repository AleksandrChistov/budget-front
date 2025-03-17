import { HttpInterceptorFn } from '@angular/common/http';

export const addHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('auth') || '';
  const clonedRequest = req.clone({
    headers: req.headers.append('Authorization', 'Bearer ' + token)
  });
  return next(clonedRequest);
};
