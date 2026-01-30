import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceViewComponent } from './preference-view.component';

describe('PreferenceViewComponent', () => {
  let component: PreferenceViewComponent;
  let fixture: ComponentFixture<PreferenceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
