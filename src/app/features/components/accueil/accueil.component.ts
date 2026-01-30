import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/components/auth/services/auth.service';





@Component({
  selector: 'app-accueil',
  imports: [CommonModule, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {

  isLoggedIn = false; // à gérer avec ton auth service

  constructor(private viewportScroller: ViewportScroller, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    // S’abonner aux changements de l etat de la connexion
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

  }

}
