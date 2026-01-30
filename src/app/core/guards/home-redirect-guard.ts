import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/auth/services/auth.service';

export const homeRedirectGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
   return router.createUrlTree(['/dashboard']);
   
  }

  return true;
};
