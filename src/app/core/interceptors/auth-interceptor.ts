import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { AppConstant } from '../../app.constant';
import { AuthService } from '../components/auth/services/auth.service';


const AUTH_WHITELIST = [
  '/api/auth/login',
  '/api/auth/refreshToken'
];


let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const accessToken = localStorage.getItem(AppConstant.ACCESS_TOKEN_KEY);
  
  if (AUTH_WHITELIST.some(url => req.url.includes(url))) {
    return next(req);
  }



  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

/** Gestion du 401 avec refresh token */
function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((newToken: string) => {
        isRefreshing = false;
        localStorage.setItem(AppConstant.ACCESS_TOKEN_KEY, newToken);
        refreshTokenSubject.next(newToken);

        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` }
          })
        );
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout(); // redirige vers login
        return throwError(() => err);
      })
    );
  } else {
    // Attente que le refresh se termine
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) =>
        next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          })
        )
      )
    );
  }
}
