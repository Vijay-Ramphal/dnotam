import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsmessageComponent } from './atsmessage.component';

describe('AtsmessageComponent', () => {
  let component: AtsmessageComponent;
  let fixture: ComponentFixture<AtsmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtsmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtsmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
