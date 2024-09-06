import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log('Estoy en el interceptor');
  const authToken = localStorage.getItem('authToken');
  let newReq = req;

  if (authToken) {
    newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  } else {
    console.error('Token no encontrado en localStorage');
  }

  return next(newReq).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred:', error);
      return throwError(() => new Error('Error en la solicitud HTTP'));
    })
  );
}
