import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageqstatusComponent } from './messageqstatus.component';

describe('MessageqstatusComponent', () => {
  let component: MessageqstatusComponent;
  let fixture: ComponentFixture<MessageqstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageqstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageqstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
