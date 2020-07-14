import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageretrivalComponent } from './messageretrival.component';

describe('MessageretrivalComponent', () => {
  let component: MessageretrivalComponent;
  let fixture: ComponentFixture<MessageretrivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageretrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageretrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
