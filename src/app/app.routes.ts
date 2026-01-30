import { Routes } from '@angular/router';
import { coreRoutes } from './core/core.routes';
import { featuresRoutes } from './features/features.routes';
import { AccueilComponent } from './features/components/accueil/accueil.component';
import { homeRedirectGuard } from './core/guards/home-redirect-guard';
import { AccessDenyComponent } from './core/components/access-deny/access-deny.component';

export const routes: Routes = [
   {
      path:'', 
      canActivate:[homeRedirectGuard],
      component:AccueilComponent
   },
   ...featuresRoutes,
   ...coreRoutes,  
   { path: 'forbidden', component: AccessDenyComponent },
   { path: '**', redirectTo: '' }
];
