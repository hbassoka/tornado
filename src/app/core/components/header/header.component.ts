import { ViewportScroller } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  implements OnInit{

  private viewportScroller=inject(ViewportScroller);
  private authService=inject(AuthService);
  private router=inject(Router);

   @Input() username: string = 'Utilisateur'; // valeur par défaut
  isLoggedIn =false; // à gérer avec ton auth service
  
 
   constructor() {}

  ngOnInit(): void {
      
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

    this.authService.getUser()?.username;
  }

 
}
