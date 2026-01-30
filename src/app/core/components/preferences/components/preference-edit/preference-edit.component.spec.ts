import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceEditComponent } from './preference-edit.component';

describe('PreferenceEditComponent', () => {
  let component: PreferenceEditComponent;
  let fixture: ComponentFixture<PreferenceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
