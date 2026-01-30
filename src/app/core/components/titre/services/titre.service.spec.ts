import { TestBed } from '@angular/core/testing';

import { TitreService } from './titre.service';

describe('CiviliteService', () => {
  let service: TitreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
