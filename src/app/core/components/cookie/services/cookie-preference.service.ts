import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiePreference } from '../models/cookie-preference.model';

@Injectable({
  providedIn: 'root'
})
export class CookiePreferenceService {

  private readonly COOKIE_NAME = 'cookiePreferences';

  constructor(private cookieService: CookieService) { }

  getPreferences(): CookiePreference | null {
    if (!this.cookieService.check(this.COOKIE_NAME)) return null;
    return JSON.parse(this.cookieService.get(this.COOKIE_NAME));
  }

  savePreferences(prefs: CookiePreference): void {
    this.cookieService.set(this.COOKIE_NAME, JSON.stringify(prefs), 365);
  }

}
