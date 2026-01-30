import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Permission } from '../models/permission.model';
import { AppConstant } from '../../../../app.constant';
import { Page } from '../../../../shared/models/page.model';



@Injectable({
  providedIn: 'root'
})
export class PermissionService {
 
  private apiUrl: string= AppConstant.API_URL+'/permissions' ;

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl);
  }

  getById(id: number): Observable<Permission> {
     return this.http.get<Permission>(`${this.apiUrl}/${id}`); 
  }

  getPermissions(
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
  create(Permission: Permission): Observable<Permission> { 
    return this.http.post<Permission>(this.apiUrl, Permission);
 }
  update(id: number, Permission: Permission): Observable<Permission> { 

    return this.http.put<Permission>(`${this.apiUrl}/${id}`, Permission);
   }

  delete(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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