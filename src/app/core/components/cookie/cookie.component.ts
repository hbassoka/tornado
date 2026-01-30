import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookiePreferenceService } from './services/cookie-preference.service';
import { CookiePreference } from './models/cookie-preference.model';


export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}




@Component({
  selector: 'app-cookie',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './cookie.component.html',
  styleUrl: './cookie.component.css'
})
export class CookieComponent implements OnInit {
  
  preferences: CookiePreference | null = null;
  showSettings = false;
  prefs: CookiePreference = { essential: true, analytics: false, marketing: false };

  constructor(private cookiePreferenceService: CookiePreferenceService) {}

  ngOnInit(): void {
    this.preferences = this.cookiePreferenceService.getPreferences();
  }

  acceptAll(): void {
    this.prefs = { essential: true, analytics: true, marketing: true };
    this.cookiePreferenceService.savePreferences(this.prefs);
    this.preferences = this.prefs;
  }

  declineAll(): void {
    this.prefs = { essential: true, analytics: false, marketing: false };
    this.cookiePreferenceService.savePreferences(this.prefs);
    this.preferences = this.prefs;
  }

  openSettings(): void {
    this.showSettings = true;
  }

  closeSettings(): void {
    this.showSettings = false;
  }

  savePreferences(): void {
    this.cookiePreferenceService.savePreferences(this.prefs);
    this.preferences = this.prefs;
    this.showSettings = false;
  }

}
