import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {

  // Si ya es URL completa, no modificar
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const modifiedReq = req.clone({
    url: `${environment.apiUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`
  });

  return next(modifiedReq);
};
