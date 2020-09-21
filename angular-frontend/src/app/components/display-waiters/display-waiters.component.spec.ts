import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWaitersComponent } from './display-waiters.component';

describe('DisplayWaitersComponent', () => {
  let component: DisplayWaitersComponent;
  let fixture: ComponentFixture<DisplayWaitersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWaitersComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
