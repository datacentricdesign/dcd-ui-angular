import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

//prime-ng
import {SliderModule} from 'primeng/slider';

//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';

//@swimlane/ngx-charts 
import { NgxChartsModule } from '@swimlane/ngx-charts';

//ngx-clipboard 
import { ClipboardModule } from 'ngx-clipboard';

// Google Maps
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

//Components
import { UiAngularComponent } from './ui-angular.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoubleAxisChartComponent } from './double-axis-chart/double-axis-chart.component';
import { DoubleDimensionsChartComponent } from './double-dimensions-chart/double-dimensions-chart.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

@NgModule({
  declarations: [
    UiAngularComponent, 
    RadarChartComponent, 
    LineChartComponent, 
    DoubleAxisChartComponent, 
    DoubleDimensionsChartComponent, 
    GoogleMapsComponent
  ],
  imports: [
    CommonModule,
    SliderModule,
    ChartsModule,
    NgxChartsModule,
    ClipboardModule
  ],
  exports: [
    UiAngularComponent,
    RadarChartComponent,
    LineChartComponent,
    DoubleDimensionsChartComponent,
    GoogleMapsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiAngularModule { }
