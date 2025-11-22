import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  // Si ya es URL completa, no modificar
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const apiUrl = environment.apiUrl;

  const modifiedReq = req.clone({
    url: `${apiUrl}/${req.url}`
  });

  return next(modifiedReq);
};
