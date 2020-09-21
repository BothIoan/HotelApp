import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaiterComponent } from './edit-waiter.component';

describe('EditWaiterComponent', () => {
  let component: EditWaiterComponent;
  let fixture: ComponentFixture<EditWaiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWaiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
