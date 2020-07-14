import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsbsComponent } from './asbs.component';

describe('AsbsComponent', () => {
  let component: AsbsComponent;
  let fixture: ComponentFixture<AsbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
