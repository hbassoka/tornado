import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxViewComponent } from './mailbox-view.component';

describe('MailboxViewComponent', () => {
  let component: MailboxViewComponent;
  let fixture: ComponentFixture<MailboxViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailboxViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailboxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
