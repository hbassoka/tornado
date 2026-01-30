import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppConstant } from '../../../../app.constant';
import { Page } from '../../../../shared/models/page.model';
import { Mailbox } from '../models/mailbox.model';

export interface MailItem {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  body: string;
  read?: boolean;
}

@Injectable({ providedIn: 'root' })
export class MailboxService {


  private apiUrl: string= AppConstant.API_URL+'/mailboxes' ;
    private readonly http=inject(HttpClient);
    
  constructor() {
  }
 mails: MailItem[] = [
  {
    id: 1,
    from: 'John Doe',
    subject: 'Meeting Update',
    preview: 'Please see the new meeting time...',
    date: '2025-01-12',
    body: 'The meeting has been rescheduled to 3 PM. Please confirm your availability.',
    read: false
  },
  {
    id: 2,
    from: 'Support',
    subject: 'Your ticket has been updated',
    preview: 'The support team replied...',
    date: '2025-01-11',
    body: 'Your issue has been analyzed and a fix is currently in progress.',
    read: true
  },
  {
    id: 3,
    from: 'HR Department',
    subject: 'Annual Performance Review',
    preview: 'Your annual review is scheduled...',
    date: '2025-01-10',
    body: 'Your performance review will take place next week. Please prepare your self-assessment.',
    read: false
  },
  {
    id: 4,
    from: 'GitLab',
    subject: 'Pipeline failed',
    preview: 'The latest CI pipeline has failed...',
    date: '2025-01-09',
    body: 'The pipeline failed during the test stage. Please review the logs.',
    read: true
  },
  {
    id: 5,
    from: 'Product Team',
    subject: 'New feature proposal',
    preview: 'We would like your feedback...',
    date: '2025-01-08',
    body: 'A new feature is proposed for the next release. Your technical input is requested.',
    read: false
  },
  {
    id: 6,
    from: 'Security',
    subject: 'Password Expiration Notice',
    preview: 'Your password will expire soon...',
    date: '2025-01-07',
    body: 'Please update your password within the next 5 days to avoid access issues.',
    read: true
  },
  {
    id: 7,
    from: 'Client – EDF',
    subject: 'Production incident report',
    preview: 'Following yesterday’s incident...',
    date: '2025-01-06',
    body: 'Please find attached the incident report and corrective action plan.',
    read: false
  },
  {
    id: 8,
    from: 'Recruitment',
    subject: 'Interview feedback',
    preview: 'Thank you for your interview...',
    date: '2025-01-05',
    body: 'The interview panel appreciated your profile. Next steps will follow shortly.',
    read: true
  },
  {
    id: 9,
    from: 'DevOps Team',
    subject: 'Maintenance window',
    preview: 'Scheduled maintenance this weekend...',
    date: '2025-01-04',
    body: 'A maintenance window is planned on Saturday from 22:00 to 02:00.',
    read: false
  },
  {
    id: 10,
    from: 'Finance',
    subject: 'Invoice available',
    preview: 'Your latest invoice is now available...',
    date: '2025-01-03',
    body: 'You can download your invoice from the finance portal.',
    read: true
  }
];


  getMockAll() {
    return this.mails;
  }

  getMockById(id: number) {
    return this.mails.find(m => m.id === id);
  }

  add(data: {
    from: string;
    to: string;
    subject: string;
    body: string;
  }): MailItem {
    const newMail: MailItem = {
      id: this.mails.length + 1,
      from: data.from,
      subject: data.subject,
      preview: data.body.slice(0, 40),
      date: new Date().toISOString(),
      body: data.body
    };

    this.mails.unshift(newMail); // Add to top of inbox
    return newMail;
  }

  getAll(): Observable<Mailbox[]> {
    return this.http.get<Mailbox[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Mailbox> {
     return this.http.get<Mailbox>(`${this.apiUrl}/${id}`); 
  }


  getMailbox(
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

  create(Mailbox: Mailbox): Observable<Mailbox> { 
    return this.http.post<Mailbox>(this.apiUrl, Mailbox);
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
