import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBriefComponent } from './route-brief.component';

describe('RouteBriefComponent', () => {
  let component: RouteBriefComponent;
  let fixture: ComponentFixture<RouteBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
