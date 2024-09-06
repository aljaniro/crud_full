import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient) 
  backend = "http://localhost:3002/api/"
  constructor() { }

  loginOn(user:Login):Observable<any>{
    console.log(user)
    return this.http.post<any>(`${this.backend}login`,user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El backend devolvió un código de respuesta no exitoso
      console.error(`Backend retornó el código ${error.status}, ` +
                    `el cuerpo del error es: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error amigable para el usuario
    return throwError('Algo malo ocurrió; por favor intenta nuevamente más tarde.');
  }
}
