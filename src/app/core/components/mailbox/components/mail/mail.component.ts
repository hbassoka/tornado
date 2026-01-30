import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { MailFolderComponent } from './components/mail-folder/mail-folder.component';
import { MailReplyComponent } from './components/mail-reply/mail-reply.component';
import { MailViewComponent } from './components/mail-view/mail-view.component';
import { MailCreateComponent } from "./components/mail-create/mail-create.component";
import { MailListComponent } from "./components/mail-list/mail-list.component";

@Component({
  selector: 'app-mail',
  imports: [CommonModule, FormsModule, MailViewComponent, MailFolderComponent, MailReplyComponent, MailCreateComponent, MailListComponent],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css',
})
export class MailComponent implements OnInit {

  private router = inject(Router);

  composeOpen = false;
  showMailList = true;
  showMailCompose = false;
  showMailReply = false;
  keywords = '';
  mail: string = 'Nouveu mail !';

  constructor() {

  }

  ngOnInit(): void {

  }

  openCompose() {
    this.showMailCompose = true;
  }


  closeCompose() {

    this.showMailCompose = false;
  }

  openReply() {

  }

  closeReply() {

  }



  openMailList() {

    this.showMailList = !this.showMailList;  // Toggle visibility
  }

  onSearchChange() {


  }
}
