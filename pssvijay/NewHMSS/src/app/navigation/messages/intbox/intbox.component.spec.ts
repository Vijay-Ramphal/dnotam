import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntboxComponent } from './intbox.component';

describe('IntboxComponent', () => {
  let component: IntboxComponent;
  let fixture: ComponentFixture<IntboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
