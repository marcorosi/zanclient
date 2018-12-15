import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './model/User';
import { MatSnackBar } from '@angular/material';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  private url = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient
    , private snackBar: MatSnackBar) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(catchError(this.handleError([])));
  }


  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError<User>()));
  }


  add(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions)
      .pipe(catchError(this.handleError<User>()));
  }

  delete(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(`${this.url}/${id}`, httpOptions)
      .pipe(catchError(this.handleError<User>()));
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user, httpOptions)
      .pipe(catchError(this.handleError<User>()));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.snackBar.open('Si è verificato un errore durante la richiesta al server', '', { duration: 3000 })

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}