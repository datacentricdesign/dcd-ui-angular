import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleDimensionsChartComponent } from './double-dimensions-chart.component';

describe('DoubleDimensionsChartComponent', () => {
  let component: DoubleDimensionsChartComponent;
  let fixture: ComponentFixture<DoubleDimensionsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleDimensionsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleDimensionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
