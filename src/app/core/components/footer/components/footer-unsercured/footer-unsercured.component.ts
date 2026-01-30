import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-unsercured',
  imports: [CommonModule,RouterLink],
  templateUrl: './footer-unsercured.component.html',
  styleUrl: './footer-unsercured.component.css',
})
export class FooterUnsercuredComponent {

   @Input() currentYear!:number;
   @Input() authorName!:string;
   @Input() authorFunction!:string;
   @Input() authorLink!:string;
  constructor(){}
}
