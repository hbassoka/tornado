import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AppUser } from "../models/app-user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { RefreshTokenRequest } from "../models/refresh-token-request.model.";
import { jwtDecode } from 'jwt-decode';
import { AppConstant } from "../../../../app.constant";
import { RegisterRequest } from "../components/register/models/register-request.model";
import { AuthResponse } from "../models/auth-response.model";
import { LoginRequest } from "../models/login-request.model";



declare const google: any;

declare const FB: any;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authUrl: string = AppConstant.AUTH_API;
  private readonly accessTokenKey: string = AppConstant.ACCESS_TOKEN_KEY;
  private readonly refreshTokenKey: string = AppConstant.REFRESH_TOKEN_KEY;
  private readonly userKey: string = AppConstant.USER_KEY;

  private readonly googleClientId = AppConstant.GOOGLE_CLIENT_ID;
  private readonly facebookClientId = AppConstant.FACEBOOK_CLIENT_ID;

  //isLoggedIn = signal<boolean>(false);

  private loggedInSubject = new BehaviorSubject<boolean>(!!this.getAccessToken() && !this.isTokenExpired());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<AppUser | null>(this.getUser());
  currentUser$ = this.userSubject.asObservable();

  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() { }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {

   
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, loginRequest).pipe(
      tap((response) => this.handleAuthResponse(response))
    );
  }

  loginGoogle(): void {

    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: (response: any) => {
        const credential = response.credential;

      //  console.log("login With Google " + credential);
        // Envoyer le token au backend

        this.http.post<any>(`${this.authUrl}/google`, { accessToken: credential })
          .pipe(tap(res => console.log(res)));
      }
    });

    google.accounts.id.prompt(); // ouvre la popup Google

  }


  loginFacebook(): void {

    // Assurer que FB est chargé avant l'init

  //  window.fbAsyncInit = function() {
    FB.init({
      appId: this.facebookClientId, // ton App ID Facebook
      cookie: true,
      xfbml: false, // false si pas de plugins FB dans le DOM
      version: 'v24.0',
    });
    //  };
    FB.login((response: fb.StatusResponse) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;

        //console.log("login with Facebook " + accessToken);

        // Envoyer le token au backend
        this.http.post(`${this.authUrl}/facebook`, { accessToken: accessToken })
          .pipe(tap(res => console.log));

      }
    }, { scope: 'email' }); // Demander les permissions nécessaires

  }


  refreshToken(): Observable<any> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();


    if (!refreshToken) {

     // console.log('⚠️ No refresh token found!');

      return new Observable(); // or throwError(() => new Error("No refresh token"))

    }

    const refreshTokenRequest: RefreshTokenRequest = {
      accessToken: accessToken ?? '',
      refreshToken: refreshToken
    };

    return this.http.post<any>(`${this.authUrl}/refreshToken`, refreshTokenRequest)
      .pipe(tap(response => this.handleAuthResponse(response)));
  }


  register(registerRequest: RegisterRequest): Observable<AuthResponse> {

   // console.log("Registering new User" + JSON.stringify(registerRequest));

    return this.http.post<AuthResponse>(`${this.authUrl}/login`, registerRequest).pipe(
      tap((response) => this.handleAuthResponse(response))
    );
  }


  isLoggedIn(): boolean {
    return !!this.getAccessToken() && !this.isTokenExpired();
  }
  isTokenExpired(token?: string): boolean {
    const jwt = token || this.getAccessToken();
    if (!jwt) return true;

    try {
      const decoded: any = jwtDecode(jwt);
      if (!decoded.exp) return false;
      return Date.now() >= decoded.exp * 1000;
    } catch {
      return true;
    }
  }

  /* ================= USER ================= */

  getUser(): AppUser | null {
    const raw = localStorage.getItem(AppConstant.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  setUser(user: AppUser | null): void {
    if (user) {
      localStorage.setItem(AppConstant.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AppConstant.USER_KEY);
    }
    this.userSubject.next(user);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /* ================= ROLES ================= */

  hasRole(role: string): boolean {
    // Check if role is provided
    if (!role?.length) return false;

    const user = this.userSubject.value;

    // Check if user has roles
    if (!user?.roles?.length) return false;

    // Check if the user's roles array includes the requested role
    return user.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {

    if (!roles?.length) return false;

    const user = this.userSubject.value;
    if (!user?.roles?.length) return false;

    return roles.some(role => user.roles.includes(role));
  }

  hasAllRole(roles: string[]): boolean {
    if (!roles?.length) return false;

    const user = this.userSubject.value;
    if (!user?.roles?.length) return false;

    return roles.every(role => user.roles.includes(role));
  }


  /* ================= PERMISSIONS ================= */

  hasPermission(permission: string): boolean {
    const user = this.userSubject.value;
    return !!user?.permissions?.includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    if (!permissions?.length) return false;

    const user = this.userSubject.value;
    if (!user?.permissions?.length) return false;

    return permissions.some(p => user.permissions.includes(p));
  }


   hasAllPermission(permissions: string[]): boolean {
   if (!permissions?.length) return false;

    const user = this.userSubject.value;
    if (!user?.permissions?.length) return false;

    return permissions.every(p => user.permissions.includes(p));
  }


  /* ================= LOGOUT ================= */




 logout() {
    const user = this.userSubject.value;
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.clear();
    this.userSubject.next(null);
    this.loggedInSubject.next(false);    
    
  }

logoutBackend() {
 
  return this.http.post(`${this.authUrl}/logout`, {}, {
    withCredentials: true
  });
}

  protected handleAuthResponse(response: any): void {

   //  console.log("response : " + JSON.stringify(response));

    const token = response.accessToken || null;
    const refreshToken = response.refreshToken || null;
    const user = response.user;

   // console.log("Token : " + token);

    //console.log("user : " + JSON.stringify(user));
    if (token) {
      localStorage.setItem(this.accessTokenKey, token);
      if (refreshToken) {
        localStorage.setItem(this.refreshTokenKey, refreshToken);
      }
      // save user info
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.loggedInSubject.next(true);
    } else {
      console.error('⚠️ Aucun token trouvé dans la réponse !');
    }
  }
}


