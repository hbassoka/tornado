import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialiteViewComponent } from './confidentialite-view.component';

describe('ConfidentialiteViewComponent', () => {
  let component: ConfidentialiteViewComponent;
  let fixture: ComponentFixture<ConfidentialiteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfidentialiteViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfidentialiteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
