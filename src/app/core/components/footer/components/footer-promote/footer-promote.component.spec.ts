import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPromoteComponent } from './footer-promote.component';

describe('FooterPromoteComponent', () => {
  let component: FooterPromoteComponent;
  let fixture: ComponentFixture<FooterPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterPromoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
