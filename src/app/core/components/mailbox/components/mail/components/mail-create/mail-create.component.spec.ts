import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailCreateComponent } from './mail-create.component';

describe('MailCreateComponent', () => {
  let component: MailCreateComponent;
  let fixture: ComponentFixture<MailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
