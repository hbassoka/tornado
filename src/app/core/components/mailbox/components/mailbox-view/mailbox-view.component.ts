import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-mailbox-view',
  imports: [CommonModule],
  templateUrl: './mailbox-view.component.html',
  styleUrl: './mailbox-view.component.css',
})
export class MailboxViewComponent implements OnInit {

  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {

  }

}

