import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Personas } from '../interfaces/personas';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  http = inject(HttpClient);
  backend = 'http://localhost:3002/api/';
  listaPerson = signal<Personas[]>([]);
  
  estado = signal<boolean>(false);
  constructor() {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backend}person`).pipe(
      tap((data) => {
        
        this.listaPerson.set(data);
       console.log(data,"desde el backend")
      }),
      catchError(this.handleError<any[]>('getData', []))
    );
  }
  get getDataSignal() {
    return this.listaPerson;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  changeState() {
    this.estado.update((value) => !value);
  }
  updatePerson(id: any, user: Personas): Observable<any> {
    return this.http.put<any>(`${this.backend}person/${id}`, user).pipe(
      tap((data) => {
        console.warn(data,"esto es lo que mete")
         this.listaPerson.update((lista) =>
           lista.map((personas) => (personas.id === id ? user : personas))
         );
        console.log(data, 'data del servicio');
        console.log('Datos obtenidos del backend:', this.listaPerson());
      }),
      catchError(this.handleError<any[]>('updatePerson', []))
    );
  }

  addperson(user: Personas): Observable<any> {
    return this.http.post<any>(`${this.backend}person`, user).pipe(
      tap((data) => {
        this.listaPerson.update((val) => [...val, user]);
        console.log('Datos obtenidos del backend:', this.listaPerson());
      }),
      catchError(this.handleError<any[]>('addperson', []))
    );
  }
  deletePersona(id: any):Observable<any> {
    console.log(id)
    this.listaPerson.update((personas) =>
      personas.filter((persona) => persona.id !== id)
    );
   return this.http.delete<any>(`${this.backend}person/${id}`).pipe(
      tap((data) => {
       
        console.log('Datos obtenidos del backend:', this.listaPerson());
      }),
      catchError(this.handleError<any[]>('deletePersona', []))
    );
  }
 
}
