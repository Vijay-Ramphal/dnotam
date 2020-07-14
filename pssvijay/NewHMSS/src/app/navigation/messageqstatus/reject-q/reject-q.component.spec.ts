import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectQComponent } from './reject-q.component';

describe('RejectQComponent', () => {
  let component: RejectQComponent;
  let fixture: ComponentFixture<RejectQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
