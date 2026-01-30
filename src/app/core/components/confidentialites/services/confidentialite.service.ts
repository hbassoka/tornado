import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConstant } from '../../../../app.constant';

import { Confidentialite } from '../models/confidentialite.model';
import { Page } from '../../../../shared/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ConfidentialiteService {


  private apiUrl: string = AppConstant.API_URL + '/confidentialites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Confidentialite[]> {

    console.info('Chargement des profile : ' + JSON.stringify(this.apiUrl));

    return this.http.get<Confidentialite[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Confidentialite> {
    return this.http.get<Confidentialite>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  
  getConfidentialites(
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

  create(confidentialite: Confidentialite): Observable<Confidentialite> {
    return this.http.post<Confidentialite>(this.apiUrl, confidentialite)
      .pipe(catchError(this.handleError));
  }

  update(id: number, confidentialite: Confidentialite): Observable<Confidentialite> {
    return this.http.put<Confidentialite>(`${this.apiUrl}/${id}`, confidentialite)
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
