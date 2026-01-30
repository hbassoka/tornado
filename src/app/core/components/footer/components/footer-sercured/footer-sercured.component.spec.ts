import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSercuredComponent } from './footer-sercured.component';

describe('FooterSercuredComponent', () => {
  let component: FooterSercuredComponent;
  let fixture: ComponentFixture<FooterSercuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSercuredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSercuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
