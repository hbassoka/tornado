import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { CookieComponent } from './core/components/cookie/cookie.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthService } from './core/components/auth/services/auth.service';
import { HeaderComponent } from "./core/components/header/header.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, CookieComponent, NavbarComponent, BreadcrumbComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private readonly authServie=inject(AuthService);
  currentUser: any;
  constructor() { }



}
