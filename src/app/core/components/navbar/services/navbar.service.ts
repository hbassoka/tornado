import { Injectable } from '@angular/core';
import { NavbarItem } from '../models/navbar-item';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  // Menus principaux
  protected unsecuredMenuItems: NavbarItem []= [
    { path: '/', label: 'Accueil', icon: 'bi-house-fill fs-6' },
    { path: '/expertises', label: 'Expertises', icon: 'bi-magic' },
    { path: '/competences', label: 'Compétences', icon: 'bi-key-fill fs-6' },
    { path: '/missions', label: 'Missions', icon: 'bi-star-fill fs-' },
    { path: '/projets', label: 'Projets', icon: 'bi-briefcase-fill fs-6' },
    { path: '/devops', label: 'DevOps', icon: 'bi-cpu-fill fs-6' },
    { path: '/contact', label: 'Contact', icon: 'bi-envelope-fill fs-6' },
    { path: '/auth', label: 'Se connecter', icon: 'bi-door-open-fill fs-6' }  
 
  ];

  protected securedMenuItems: NavbarItem [] = [
    { path: '/dashboard', label: 'Accueil', icon: 'bi-house-fill fs-6' },   
    { path: '/mailbox/mail', label: 'Messagerie', icon: 'bi-inboxes-fill fs-6' },   
    { path: '/notifications/view', label: 'Notifications', icon: 'bi-bell fs-6' },
    { path: '/admin', label: 'Admin', icon: 'bi-gear fs-6' },
    { path: '/moncompte', label: 'Mon compte', icon: 'bi-person-circle fs-6' },
    { path: '/auth/logout', label: 'Se déconnecter', icon: 'bi-door-closed fs-6' },
  ];

  // Menus spécifiques (connecté)
  protected userMenuItems: NavbarItem [] = [
  
  { path: '/moncompte/profils/view', label: 'Profil', icon: 'bi-person-bounding-box' },   
  { path: '/moncompte/preferences/view', label: 'Préférences', icon: 'bi-sliders' },
  { path: '/moncompte/confidentialites/view', label: 'Confidentialités', icon: 'bi-incognito' },
  { path: '/moncompte/notfications/view', label: 'Confidentialités', icon: 'bi-bell' }
       
  ];
  // Menus spécifiques (connecté)
  protected adminMenuItems : NavbarItem []= [
    
    { path: '/admin/users', label: 'Utilisateurs', icon: 'bi-people' },
    { path: '/admin/groups', label: 'Groupes', icon: 'bi-envelope-at' },
    { path: '/admin/roles', label: 'Rôles', icon: 'bi-calendar' },
    { path: '/admin/permissions', label: 'Permissions', icon: 'bi-calendar' },
    { path: '/admin/profils', label: 'Profils', icon: 'bi-person' },
    { path: '/admin/preferences', label: 'Préférences', icon: 'bi-mailbox2' },
    { path: '/admin/confidentialites', label: 'Confidentialités', icon: 'bi-globe2' }, 
    { path: '/admin/mailbox', label: 'Paramètres', icon: 'bi-inboxes-fill' },
    
    { path: '/admin/parametres', label: 'Paramètres', icon: 'bi-person' },
    { path: '/admin/notifications', label: 'Notifications', icon: 'bi-bell' },
    { path: '/admin/titres', label: 'Titres', icon: 'bi-wallet2' },   
    { path: '/admin/sujets', label: 'Motifs', icon: 'bi-gear' },     

    { path: '/admin/domaines',    label: 'Domaines', icon: 'bi-braces-asterisk' },
    { path: '/admin/competences', label: 'Domaines', icon: 'bi-braces-asterisk' },
    { path: '/admin/expertises', label: 'Domaines', icon: 'bi-braces-asterisk' },
    { path: '/admin/formations', label: 'Domaines', icon: 'bi-braces-asterisk' },
  ];


  getUnsecuredMenuItems():NavbarItem[] {

    return this.unsecuredMenuItems;
  }
  getSecuredMenuItems():NavbarItem[] {
    return this.securedMenuItems;
  }

 
  getUserMenuItems():NavbarItem[] {
    return this.userMenuItems;
  }
  
  getAdminMenuItems() :NavbarItem[]{
    return this.adminMenuItems;
  }
}
