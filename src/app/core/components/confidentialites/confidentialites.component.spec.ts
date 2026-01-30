import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialitesComponent } from './confidentialites.component';

describe('ConfidentialitesComponent', () => {
  let component: ConfidentialitesComponent;
  let fixture: ComponentFixture<ConfidentialitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfidentialitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfidentialitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
