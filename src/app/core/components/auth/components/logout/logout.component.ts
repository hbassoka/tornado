import { CommonModule,Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private location = inject(Location);

  isLoggedIn = false; // à gérer avec ton auth service

  constructor() { }

  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

  }

  doCancel() {
    
      this.location.back();
  }
  doConfirm() {

   this.router.navigateByUrl('/auth/logout/confirm');

  }
}
