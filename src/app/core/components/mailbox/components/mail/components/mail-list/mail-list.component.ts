import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MailItem, MailboxService } from '../../../../services/mailbox.service';


@Component({
  selector: 'app-mail-list',
  imports: [CommonModule],
  templateUrl: './mail-list.component.html',
  styleUrl: './mail-list.component.css'
})
export class MailListComponent {

  mails: MailItem[] = [];
  @Output() mailSelected = new EventEmitter<MailItem>();

  constructor(private mailboxService: MailboxService) {
    this.mails = this.mailboxService.getMockAll();
  }

  
  previewMail(mail: MailItem){

    alert('Mail selected');
   // this.mailSelected.emit(mail);
  }

  replyMail(mail: MailItem) {
    //this.mailSelected.emit(mail);
    
  }

  deleteMail(mail: MailItem) {
    // delete
   // this.mailSelected.emit(mail);
    
  }

  followMail(mail: MailItem) {
    // delete
    //this.mailSelected.emit(mail);    
  }
  archiveMail(mail: MailItem) {
    // delete
    //this.mailSelected.emit(mail);    
  }
  spamMail(mail: MailItem) {
    // delete
    //this.mailSelected.emit(mail);    
  }
}
