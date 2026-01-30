import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailboxService } from './services/mailbox.service';
import { Mailbox } from './models/mailbox.model';


@Component({
  selector: 'app-mailbox',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css'
})
export class MailboxComponent implements OnInit {


  private router = inject(Router);
  private readonly mailboxService=inject(MailboxService);
   
  mailboxes=signal<Mailbox[] | null>(null);

  // Propriété pour le terme de recherche
  totalPages = 0;
  totalElements = 0;

  page = 0;
  size = 10;

  sortBy = 'id';
  direction = 'asc';

  search = '';

  constructor() {}

  ngOnInit(): void {

    this.loadMailboxes();

    console.log(this.mailboxes());
  }
  
  loadMailboxes() {
    this.mailboxService.getMailbox(this.page, this.size, this.sortBy, this.direction, this.search)
      .subscribe(res => {
        this.mailboxes.set(res.content);
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.page = res.number;
      });
  }
  changePage(p: number) {
    if (p >= 0 && p < this.totalPages) {
      this.page = p;
      this.loadMailboxes();
    }
  }
  
  sort(col: string) {
    if (this.sortBy === col) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = col;
      this.direction = 'asc';
    }
    this.loadMailboxes();
  }

  onSearchChange() {
    this.page = 0;
    this.loadMailboxes();
  }


}

