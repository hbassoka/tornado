import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../components/auth/services/auth.service';



export const appUserResolver: ResolveFn<any> = () => {
 const authService = inject(AuthService);
  return authService.getUser();
};
