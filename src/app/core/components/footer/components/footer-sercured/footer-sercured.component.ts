import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-sercured',
  imports: [CommonModule,RouterLink],
  templateUrl: './footer-sercured.component.html',
  styleUrl: './footer-sercured.component.css',
})
export class FooterSercuredComponent {

   @Input() currentYear!:number;
   @Input() authorName!:string;
   @Input() authorFunction!:string;
   @Input() authorLink!:string;
}
