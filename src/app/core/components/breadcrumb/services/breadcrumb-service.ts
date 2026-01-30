import { computed, effect, Injectable, signal } from '@angular/core';
import { BreadcrumbItem } from '../models/breadcrumb-item';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

   
  breadcrumbMockItems: BreadcrumbItem[] = [
    { label: 'Accueil', icon: 'bi bi-house-fill', route: '/' },
    { label: 'Compétences techniques', icon: 'bi bi-key', route: '/competences' },
    { label: 'Domaines d\'expertise', icon: 'bi bi-magic', route: '/expertises' },
    { label: 'Missions & références', icon: 'bi bi-star-fill', route: '/missions' },
    { label: 'Projets & réalisations', icon: 'bi bi-briefcase-fill', route: '/projets' },
    { label: 'DevOps', icon: 'bi bi-cpu-fill', route: '/devops' },
    { label: 'Contact', icon: 'bi bi-envelope-fill', route: '/contact' },
    { label: 'Message de contact', icon: 'bi bi-envelope-at', route: '/messages' },

    { divider: true, label: '' },
    { label: "Authentification", icon: 'bi bi-shield-lock', route: '/auth' },

    { divider: true, label: '' },

    { label: 'Accueil', icon: 'bi bi-house-fill', route: '/dashboard' },
    {
      label: 'Messagerie',
      icon: 'bi bi-inboxes-fill',
      children: [
        { label: 'view', icon: 'bi bi-eye-fill', route: '/mailbox/mail' },
        { label: 'edit', icon: 'bi-pencil-fill', route: '/mailbox/view' },
      ]
    },
    {
      label: 'Notifications',
      icon: 'bi bi-bell',
      children: [
        { label: 'view', icon: 'bi bi-eye-fill', route: '/notifications/view' },
        { label: 'edit', icon: 'bi bi-bell', route: '/notifications/view' },
      ]
    },
    {
      label: 'Admin',
      icon: 'bi bi-gear',
      route: '/admin',
         children: [          
            {
              label: 'Utilisateurs',    
              icon: 'bi bi-people',       
              route: '/admin/users',
               children:[
                 {label: 'view',icon:'bi bi-eye-fill', route:'/admin/users/view'},
                 {label: 'edit',icon:'bi bi-pencil', route:'/admin/users/edit'},
               ]
            },
             {
              label: 'Groupes',    
              icon: 'bi bi-people',       
              route: '/admin/groups',
               children:[
                 {label: 'view',icon:'bi bi bi-eye-fill', route:'/admin/groups/view'},
                 {label: 'edit',icon:'bi bi-pencil', route:'/admin/groups/edit'},
               ]
            }, 
            { label: 'Rôles', icon: 'bi bi-shield-lock', route: '/admin/roles' },
            { label: 'Permissions', icon: 'bi bi-key', route: '/admin/permissions' },
            { label: 'Configuration', icon: 'bi bi-tools', route: '/admin/configuration' },
            { label: 'Profils', icon: 'bi bi-person', route: '/admin/profils' },
            { label: 'Préférences', icon: 'bi bi-sliders', route: '/admin/preferences' },
            { label: 'Confidentialités', icon: 'bi bi-shield-check', route: '/admin/confidentialites' },
            { label: 'Messagerie', icon: 'bi bi-sliders', route: '/admin/mailbox' },
            // configuration
            { label: 'Paramètres', icon: 'bi bi-gear', route: '/admin/parametres' },
            { label: 'Domaines', icon: 'bi bi-gear', route: '/admin/domaines' },
            { label: 'Titres', icon: 'bi bi-gear', route: '/admin/titres' },
            { label: 'Sujets', icon: 'bi bi-gear', route: '/admin/sujets' },
        ]
},
{
  label: 'Mon compte',
    icon: 'bi bi-person-circle',
      route: '/moncompte',
        children: [
          {
            label: 'Profil',
            icon: 'bi bi-person',
            children: [
              { label: 'view', icon: 'bi bi-eye-fill', route: '/moncompte/profils/view' },
              { label: 'edit', icon: 'bi bi-sliders', route: '/moncompte/profils/view' },
            ]
          },
          {
            label: 'Préférences',
            icon: 'bi bi-person',
            children: [
              { label: 'view', icon: 'bi bi bi-eye-fill', route: '/moncompte/preferences/view' },
              { label: 'edit', icon: 'bi bi-sliders', route: '/moncompte/preferences/view' },
            ]
          },
          {
            label: 'Confidentialités',
            icon: 'bi bi-person',
            children: [
              { label: 'view', icon: 'bi bi-eye-fill', route: '/moncompte/confidentialites/view' },
              { label: 'edit', icon: 'bi bi-sliders', route: '/moncompte/confidentialites/view' },
            ]
          }
        ]
},
{ divider: true, label: '' },
{ label: 'FAQ', icon: 'bi bi-question-circle', route: '/faqs' },
{ label: 'A propos', icon: 'bi bi-journal-text', route: '/about' },
{ label: 'Conditions générales d\'utilisations', icon: 'bi bi-file-earmark-text', route: '/cgu' },
{ label: 'Conditions générales de ventes', icon: 'bi bi-file-earmark-text', route: '/cgv' },
{ label: 'Mentions légales', icon: 'bi bi-file-text', route: '/mentions-legales' },
  ];


  private readonly breadcrumbItems = signal<BreadcrumbItem[]>([]);

  private readonly currentUrl = signal<string>('/');

  readonly breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const url = this.currentUrl();
    const items = this.breadcrumbItems();

    if (!items.length || !url) return [];

    const bestMatch: BreadcrumbItem[] = [];
    this.search(items, url, [], bestMatch);

    return bestMatch;
  });

  constructor(private router: Router) {

    this.breadcrumbItems.set(this.breadcrumbMockItems);
    // Mise à jour automatique du breadcrumb quand l'URL change
  effect(() => {
    const currentUrl = this.router.url;
    this.currentUrl.set(this.cleanUrl(currentUrl));
  });
  
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(this.cleanUrl(event.urlAfterRedirects));
      });
  }

  setMenu(items: BreadcrumbItem[]) {
    this.breadcrumbItems.set(items);
  }

  // =======================
  // 🔍 Recursive search
  // =======================
  private search(
    items: BreadcrumbItem[],
    url: string,
    currentPath: BreadcrumbItem[],
    bestMatch: BreadcrumbItem[]
  ): void {

    for (const item of items) {

      if (item.divider) continue;

      const newPath = [...currentPath, item];

      if (item.route && this.matchRoute(item.route, url)) {
        if (newPath.length > bestMatch.length) {
          bestMatch.length = 0;
          bestMatch.push(...newPath);
        }
      }

      if (item.children?.length) {
        this.search(item.children, url, newPath, bestMatch);
      }
    }
  }

  // =======================
  // 🧹 Utils
  // =======================
  private matchRoute(menuRoute: string, currentUrl: string): boolean {
    if (menuRoute.endsWith('/**')) {
      return currentUrl.startsWith(menuRoute.replace('/**', ''));
    }
    return menuRoute === currentUrl;
  }

  private cleanUrl(url: string): string {
    return url.split('?')[0].split('#')[0];
  }
}
