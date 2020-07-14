import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointBriefComponent } from './point-brief.component';

describe('PointBriefComponent', () => {
  let component: PointBriefComponent;
  let fixture: ComponentFixture<PointBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
