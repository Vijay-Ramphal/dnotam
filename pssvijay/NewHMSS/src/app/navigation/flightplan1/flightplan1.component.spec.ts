import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Flightplan1Component } from './flightplan1.component';

describe('Flightplan1Component', () => {
  let component: Flightplan1Component;
  let fixture: ComponentFixture<Flightplan1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Flightplan1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Flightplan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
