import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendQComponent } from './suspend-q.component';

describe('SuspendQComponent', () => {
  let component: SuspendQComponent;
  let fixture: ComponentFixture<SuspendQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
