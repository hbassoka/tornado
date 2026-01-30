import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Mail } from '../../../../models/mail.model';
import { MailboxService } from '../../../../services/mailbox.service';


@Component({
  selector: 'app-mail-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mail-create.component.html',
  styleUrl: './mail-create.component.css'
})
export class MailCreateComponent {

  @Output() closeCompose = new EventEmitter<Mail>();

  form: any;
  mail:any;

  constructor(private fb: FormBuilder, private mailboxService: MailboxService) {

    this.form = this.fb.group({
      to: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['']
    });



  }

  callCloseCompose() {
    this.closeCompose.emit();
  }

  send() {
    if (this.form.invalid) return;

    const mail = this.mailboxService.add({
      from: 'me@domain.com',
      to: this.form.value.to!,
      subject: this.form.value.subject!,
      body: this.form.value.body!,
    });

    this.callCloseCompose();
    this.form.reset();
  }
}
