import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListErrors } from './list-errors';

describe('ListErrors', () => {
  let component: ListErrors;
  let fixture: ComponentFixture<ListErrors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListErrors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListErrors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
