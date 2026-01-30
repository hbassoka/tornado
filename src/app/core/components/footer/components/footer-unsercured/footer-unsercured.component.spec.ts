import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUnsercuredComponent } from './footer-unsercured.component';

describe('FooterUnsercuredComponent', () => {
  let component: FooterUnsercuredComponent;
  let fixture: ComponentFixture<FooterUnsercuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterUnsercuredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterUnsercuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
