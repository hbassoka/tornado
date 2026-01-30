import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';
import { AppConstant } from '../../../../app.constant';
import { Sujet } from '../models/sujet.model';






@Injectable({
  providedIn: 'root'
})
export class SujetService {

  private readonly apiUrl: string = AppConstant.API_URL;

  constructor(private http: HttpClient, private router: Router) {}

/** Récupère tous les titres */
  findAll(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}/sujets`);
  }

  /** Trouve un titre par son code */
  findTopicByCode(code: string): Observable<Sujet> {
    return this.http.get<Sujet>(`${this.apiUrl}/sujets/${code}`);
  }

  /** Trouve un titre par son code */
  findTopicById(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(`${this.apiUrl}/sujets/${id}`);
  }
}
