import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { appUserResolver } from './app-user-resolver';

describe('userResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => appUserResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
