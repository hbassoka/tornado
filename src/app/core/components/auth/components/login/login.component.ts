import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { FeatureService } from '../../../../services/feature.service';
import { TitreService } from '../../../titre/services/titre.service';
import { LoginRequest } from '../../models/login-request.model';
import { AuthService } from '../../services/auth.service';



export interface LoginModel{login:string,passwd:string}


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  private  authService=inject(AuthService);
  private  titreService=inject(TitreService);
  private  http=inject(HttpClient);
  private  ngZone=inject(NgZone);
  private  router=inject(Router);
   private featureService = inject(FeatureService);

  loginModel=signal<LoginModel>({login: '', passwd: '' });

   
  errorMessage = '';
  showPassword: boolean = false;

  googleURL = '/oauth2/authorization/google';
  facebookURL = '/oauth2/authorization/facebook';
    
  constructor(  ) { }

  ngOnInit(): void {
    //  
     this.reset();
      
  }

  loginWithGoogle() {

    this.authService.loginGoogle();
  }

  loginWithFacebook() {

    this.authService.loginFacebook();
    
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  reset(){
    this.loginModel.set({login: '', passwd: '' });
  }
  submit(): void {

    const loginRequest:LoginRequest={

      username:this.loginModel().login,
      password:this.loginModel().passwd
    }

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/']); // Redirige vers l'accueil
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Identifiant ou mot de passe incorrectes !';
      }
    });
  }



}
