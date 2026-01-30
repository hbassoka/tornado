import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['access_token'];

      if (token) {
        // Sauvegarde du JWT reçu depuis Spring Boot
        localStorage.setItem('access_token', token);

        // Redirection vers ton tableau de bord
        this.router.navigate(['/']);
      } else {
        // Aucun token → erreur ou accès direct
        this.router.navigate(['/login'], {
          queryParams: { error: 'no_token' }
        });
      }
    });
  }
}