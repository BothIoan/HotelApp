import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankBookingComponent } from './rank-booking.component';

describe('RankBookingComponent', () => {
  let component: RankBookingComponent;
  let fixture: ComponentFixture<RankBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
