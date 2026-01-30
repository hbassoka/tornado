import { TestBed } from '@angular/core/testing';
import { CookiePreferenceService } from './cookie-preference.service';



describe('CookiePreferenceService', () => {
  let service: CookiePreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiePreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
