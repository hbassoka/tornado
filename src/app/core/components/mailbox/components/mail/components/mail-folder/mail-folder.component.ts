import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mail-folder',
  imports: [],
  templateUrl: './mail-folder.component.html',
  styleUrl: './mail-folder.component.css'
})
export class MailFolderComponent {

  @Output() openCompose=new EventEmitter<void>();


  callOpenCompose(){

    this.openCompose.emit();
  }
}
