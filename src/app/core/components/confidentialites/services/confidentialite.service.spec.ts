import { TestBed } from '@angular/core/testing';

import { ConfidentialiteService } from './confidentialite.service';

describe('ConfidentialiteService', () => {
  let service: ConfidentialiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfidentialiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
