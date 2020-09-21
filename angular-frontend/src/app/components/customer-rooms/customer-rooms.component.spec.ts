import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRoomsComponent } from './customer-rooms.component';

describe('CustomerRoomsComponent', () => {
  let component: CustomerRoomsComponent;
  let fixture: ComponentFixture<CustomerRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
