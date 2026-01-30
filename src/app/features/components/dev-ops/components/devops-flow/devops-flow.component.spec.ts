import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevopsFlowComponent } from './devops-flow.component';

describe('DevopsFlowComponent', () => {
  let component: DevopsFlowComponent;
  let fixture: ComponentFixture<DevopsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevopsFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevopsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
