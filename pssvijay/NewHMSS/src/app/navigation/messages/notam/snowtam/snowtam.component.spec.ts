import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowtamComponent } from './snowtam.component';

describe('SnowtamComponent', () => {
  let component: SnowtamComponent;
  let fixture: ComponentFixture<SnowtamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowtamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowtamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
