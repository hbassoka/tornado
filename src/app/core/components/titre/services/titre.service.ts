import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';
import { AppConstant } from '../../../../app.constant';
import { Titre } from '../models/titre.model';






@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private readonly apiUrl: string = AppConstant.API_URL;

  constructor(private http: HttpClient, private router: Router) {}

/** Récupère tous les titres */
  findAll(): Observable<Titre[]> {
    return this.http.get<Titre[]>(`${this.apiUrl}/titres`);
  }

  /** Trouve un titre par son code */
  findTitreByCode(code: string): Observable<Titre> {
    return this.http.get<Titre>(`${this.apiUrl}/titres/${code}`);
  }

  /** Trouve un titre par son code */
  findTitreById(id: number): Observable<Titre> {
    return this.http.get<Titre>(`${this.apiUrl}/titres/${id}`);
  }
}
