import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


import { TitreService } from '../titre/services/titre.service';
import { FeatureService } from '../../services/feature.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginRequest } from './models/login-request.model';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-auth',
  imports: [CommonModule, RegisterComponent, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(  ) { }

  ngOnInit(): void {
   
  }

}
