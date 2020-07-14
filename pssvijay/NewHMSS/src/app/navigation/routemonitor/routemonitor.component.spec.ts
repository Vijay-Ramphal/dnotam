import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutemonitorComponent } from './routemonitor.component';

describe('RoutemonitorComponent', () => {
  let component: RoutemonitorComponent;
  let fixture: ComponentFixture<RoutemonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutemonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutemonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
