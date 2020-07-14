import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrowrouteBriefComponent } from './narrowroute-brief.component';

describe('NarrowrouteBriefComponent', () => {
  let component: NarrowrouteBriefComponent;
  let fixture: ComponentFixture<NarrowrouteBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrowrouteBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrowrouteBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
