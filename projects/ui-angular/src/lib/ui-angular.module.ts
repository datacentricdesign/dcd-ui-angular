import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { UiAngularComponent } from './ui-angular.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';

//prime-ng
import {SliderModule} from 'primeng/slider';

//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';

//@swimlane/ngx-charts 
import { NgxChartsModule } from '@swimlane/ngx-charts';

//ngx-clipboard 
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    UiAngularComponent, 
    RadarChartComponent, 
    LineChartComponent
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
    LineChartComponent
  ]
})
export class UiAngularModule { }
