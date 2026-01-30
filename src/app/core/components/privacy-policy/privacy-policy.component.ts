import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [CommonModule,DatePipe],
standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {

  currentYear = new Date().getFullYear();
  currentDate:Date=new Date()
  mailto='contact@jdevhub.com';
   constructor() {

   
  }

}
