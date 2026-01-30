import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConstant } from '../../../../app.constant';
import { Profil } from '../models/profil.model';
import { Page } from '../../../../shared/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  
  private apiUrl: string = AppConstant.API_URL + '/profiles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Profil[]> {

    console.info('Chargement des profile : ' + JSON.stringify(this.apiUrl));

    return this.http.get<Profil[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  
  me(): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/me`)
      .pipe(catchError(this.handleError));
  }
  

  getProfiles(
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

  create(profil: Profil): Observable<Profil> {
    return this.http.post<Profil>(this.apiUrl, profil)
      .pipe(catchError(this.handleError));
  }

  update(id: number, profil: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.apiUrl}/${id}`, profil)
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
