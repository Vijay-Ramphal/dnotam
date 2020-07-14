import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorQComponent } from './error-q.component';

describe('ErrorQComponent', () => {
  let component: ErrorQComponent;
  let fixture: ComponentFixture<ErrorQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
