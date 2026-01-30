import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreViewComponent } from './parametre-view.component';

describe('ParametreViewComponent', () => {
  let component: ParametreViewComponent;
  let fixture: ComponentFixture<ParametreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametreViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
