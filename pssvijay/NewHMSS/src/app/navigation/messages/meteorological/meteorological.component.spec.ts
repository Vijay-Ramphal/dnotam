import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteorologicalComponent } from './meteorological.component';

describe('MeteorologicalComponent', () => {
  let component: MeteorologicalComponent;
  let fixture: ComponentFixture<MeteorologicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteorologicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteorologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
