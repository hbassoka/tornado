import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NavbarService } from './services/navbar.service';
import { NavbarItem } from './models/navbar-item';



@Component({
  selector: 'app-navbar',
   imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  private  readonly viewportScroller=inject(ViewportScroller);
  private  readonly authService=inject(AuthService);
  private  readonly router=inject(Router);
  private  readonly navbarService=inject(NavbarService);
  username: string='';
  userAvatar=false;

  isLoggedIn =false; // à gérer avec ton auth service
  currentUser: any=null;

  dropdownOpen = false;

  securedMenuItems=signal<NavbarItem[]>([]);

  unsecuredMenuItems=signal<NavbarItem[]>([]);

  userMenuItems=signal<NavbarItem[]>([]);

  adminMenuItems=signal<NavbarItem[]>([]);
  
  constructor() {   
  
  }

  ngOnInit(): void {
   
    this.unsecuredMenuItems.set(this.navbarService.getUnsecuredMenuItems());
    this.securedMenuItems.set(this.navbarService.getSecuredMenuItems())
    this.adminMenuItems.set(this.navbarService.getAdminMenuItems());
    this.userMenuItems.set(this.navbarService.getUserMenuItems());

        // S’abonner aux changements de l etat de la connexion
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

  }
 
  get userInitials(): string {
  if (!this.username) return '';
  return this.username
    .split(' ')
    .map(n => n.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2); // Ex: Hermann Bassoka => HB
}

  logout(): void {
     console.log('Déconnexion...');
     this.isLoggedIn = false;

       //Appel backend logout (fire & forget)
       this.authService.logoutBackend().subscribe({
          complete: () => {}
        });

      //Nettoyage local
      this.authService.logout();
      
      this.router.navigate(['/'], {
          queryParams: { reason: 'expired' }
        });
    
  }

 

  openDropdown(event: Event) {
    this.dropdownOpen = true;
  }

  closeDropdown(event: Event) {
    this.dropdownOpen = false;
  }

  scrollTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}