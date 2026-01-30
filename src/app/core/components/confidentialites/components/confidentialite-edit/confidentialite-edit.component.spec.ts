import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialiteEditComponent } from './confidentialite-edit.component';

describe('ConfidentialiteEditComponent', () => {
  let component: ConfidentialiteEditComponent;
  let fixture: ComponentFixture<ConfidentialiteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfidentialiteEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfidentialiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
