import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';


import { AppConstant } from '../../../../app.constant';
import { Page } from '../../../../shared/models/page.model';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = AppConstant.API_URL + '/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {

    console.info('Chargement des user : ' + JSON.stringify(this.apiUrl));

    return this.http.get<User[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  
  getUsers(
    page: number,
    size: number,
    sortBy: string,
    direction: string,
    search: string
  ): Observable<Page<any>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction)
      .set('search', search);

    return this.http.get<Page<any>>(`${this.apiUrl}/pages`, { params });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Gestion centralisée des erreurs
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur (${error.status}) : ${error.error?.message || error.message}`;
    }
    console.error('Backend error:', error);
    return throwError(() => new Error(errorMessage));
  }

}
