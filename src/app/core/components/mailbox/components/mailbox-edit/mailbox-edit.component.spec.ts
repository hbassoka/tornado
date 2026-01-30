import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxEditComponent } from './mailbox-edit.component';

describe('MailboxEditComponent', () => {
  let component: MailboxEditComponent;
  let fixture: ComponentFixture<MailboxEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
