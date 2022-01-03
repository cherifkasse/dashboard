import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartSignComponent } from './bar-chart-sign.component';

describe('BarChartSignComponent', () => {
  let component: BarChartSignComponent;
  let fixture: ComponentFixture<BarChartSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
