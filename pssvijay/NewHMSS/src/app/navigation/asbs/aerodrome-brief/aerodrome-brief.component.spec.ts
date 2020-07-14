import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AerodromeBriefComponent } from './aerodrome-brief.component';

describe('AerodromeBriefComponent', () => {
  let component: AerodromeBriefComponent;
  let fixture: ComponentFixture<AerodromeBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AerodromeBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AerodromeBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
