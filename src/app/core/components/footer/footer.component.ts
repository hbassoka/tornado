import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { FooterUnsercuredComponent } from './components/footer-unsercured/footer-unsercured.component';
import { FooterSercuredComponent } from './components/footer-sercured/footer-sercured.component';
import { FooterPromoteComponent } from './components/footer-promote/footer-promote.component';



@Component({
  selector: 'app-footer',
  imports: [CommonModule,FooterPromoteComponent,FooterUnsercuredComponent,FooterSercuredComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  isLoggedIn =false; // à gérer avec ton auth service
  currentUser: any=null;
  
  currentYear :number= new Date().getFullYear();
  authorName:string='M. Hermann BASSOKA';
  authorFunction:string='Full stack Tech & DevOps Lead Logiciels sûrs';
  authorLink:string='https://www.linkedin.com/in/hbassoka';

  constructor(private viewportScroller: ViewportScroller,private authService: AuthService,private router: Router) {

  
  }

  ngOnInit(): void {

         // S’abonner aux changements de l etat de la connexion
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

    
  }
}
