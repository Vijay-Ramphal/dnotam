import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AshtamComponent } from './ashtam.component';

describe('AshtamComponent', () => {
  let component: AshtamComponent;
  let fixture: ComponentFixture<AshtamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AshtamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AshtamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
