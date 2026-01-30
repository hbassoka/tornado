import { Component, inject, NgZone } from '@angular/core';
import { RegisterRequest } from './models/register-request.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeatureService } from '../../../../services/feature.service';
import { Titre } from '../../../titre/models/titre.model';
import { TitreService } from '../../../titre/services/titre.service';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-register',
   imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private titreService = inject(TitreService);
  private http = inject(HttpClient);
  private ngZone = inject(NgZone);
  private router = inject(Router);

  private featureService = inject(FeatureService);

  registerModel: RegisterRequest;

  titres: Titre[] = [];
  features : FeatureItem[]=[];
  errorMessage = '';
  showPassword: boolean = false;
  showPasswordConfirm:boolean=false;

  

  constructor() {
    this.registerModel = { titre: { id: 0, label: '', code: '' }, nom: '', prenom: '', email: '', emailConfirm: '', password: '', passwordConfirm:'' };
    this.loadTitres();
    
    this.features=this.featureService.getAll();
  }

  
  loadTitres() {
    this.titreService.findAll().subscribe({
     next: data => this.titres = data,
     error: err => {
      console.error('Erreur chargement titres', err);
      this.titres = [];
       }
    });
  }

  
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  
   toggleShowPasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
  
  
  submit(): void {

    this.authService.register(this.registerModel).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/login']); // Redirige la page de connexion
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur de creation de compte';
      }
    });
    
  }
    
}
