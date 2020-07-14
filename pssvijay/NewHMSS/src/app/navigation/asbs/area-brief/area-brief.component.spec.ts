import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaBriefComponent } from './area-brief.component';

describe('AreaBriefComponent', () => {
  let component: AreaBriefComponent;
  let fixture: ComponentFixture<AreaBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
