import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevopsBeneficesComponent } from './devops-benefices.component';

describe('DevopsBeneficesComponent', () => {
  let component: DevopsBeneficesComponent;
  let fixture: ComponentFixture<DevopsBeneficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevopsBeneficesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevopsBeneficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
