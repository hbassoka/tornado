import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-data-deletion',
  imports: [CommonModule,DatePipe ],
  templateUrl: './data-deletion.component.html',
  styleUrl: './data-deletion.component.css'
})
export class DataDeletionComponent {

  currentYear = new Date().getFullYear();
 
  currentDate:Date=new Date()
  mailto='contact@jdevhub.com';
   constructor() {
   }

  
}
