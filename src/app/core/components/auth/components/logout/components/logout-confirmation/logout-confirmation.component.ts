import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-confirmation',
  imports: [ CommonModule,RouterLink],
  templateUrl: './logout-confirmation.component.html',
  styleUrl: './logout-confirmation.component.css',
})
export class LogoutConfirmationComponent implements OnInit {


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoggedIn = false; // à gérer avec ton auth service

  constructor() { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

    // logout
    this.doLogout();

  }

  doLogout(): void {
    console.log('Déconnexion...');
    this.isLoggedIn = false;

    //Appel backend logout (fire & forget)
    this.authService.logoutBackend().subscribe({
      complete: () => { }
    });

    //Nettoyage local
    this.authService.logout();

   // this.router.navigate(['/'], {
   //   queryParams: { reason: 'expired' }
   // });

  }

}
