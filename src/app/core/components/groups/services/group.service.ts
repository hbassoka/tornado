import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


import { Group } from '../models/group.model';


import { AppConstant } from '../../../../app.constant';
import { Page } from '../../../../shared/models/page.model';




@Injectable({
  providedIn: 'root'
})
export class GroupService {
 
  private apiUrl: string= AppConstant.API_URL+'/groups' ;

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getById(id: number): Observable<Group> {
     return this.http.get<Group>(`${this.apiUrl}/${id}`); 
  }

  getGroups(
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
  create(Group: Group): Observable<Group> { 
    return this.http.post<Group>(this.apiUrl, Group);
 }
  update(id: number, Group: Group): Observable<Group> { 

    return this.http.put<Group>(`${this.apiUrl}/${id}`, Group).pipe(catchError(this.handleError));
   }

  delete(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
   }

   // Gestion améliorée des erreurs
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur serveur (${error.status}) : ${error.error?.message || error.message}`;
    }
    console.error('Backend error:', error);
    return throwError(() => new Error(errorMessage));
  }
}