import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppConstant } from '../../../../app.constant';
import { ContactRequest } from '../models/contact-request.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  

  private readonly apiUrl: string = AppConstant.API_URL;
  private readonly http = inject(HttpClient);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly response = signal<{ message: string } | null>(null);

  constructor() { }

 
  send(contactRequest: ContactRequest) {
    this.loading.set(true);
    this.error.set(null);

    this.http.post<ContactRequest>(`${this.apiUrl}/contact`, contactRequest).subscribe({
      next: res => {
        this.response.set(res);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.error?.error ?? 'Erreur serveur');
        this.loading.set(false);
      }
    });
  }
  
}
