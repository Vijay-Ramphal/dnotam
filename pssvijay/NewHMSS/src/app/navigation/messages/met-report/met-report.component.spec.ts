import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetReportComponent } from './met-report.component';

describe('MetReportComponent', () => {
  let component: MetReportComponent;
  let fixture: ComponentFixture<MetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
