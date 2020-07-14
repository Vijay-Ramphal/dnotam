import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitQComponent } from './transmit-q.component';

describe('TransmitQComponent', () => {
  let component: TransmitQComponent;
  let fixture: ComponentFixture<TransmitQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmitQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmitQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
