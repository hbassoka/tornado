import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';


@Component({
  selector: 'app-contact',
  imports: [CommonModule,ContactFormComponent,ContactInfoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent  {

}
