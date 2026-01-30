import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MailItem } from '../../../../services/mailbox.service';

@Component({
  selector: 'app-mail-view',
  imports: [CommonModule],
  templateUrl: './mail-view.component.html',
  styleUrl: './mail-view.component.css'
})
export class MailViewComponent {

   @Input() mail!: MailItem | null;


   constructor(){}
}
