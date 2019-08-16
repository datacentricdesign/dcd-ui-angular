import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common'

//@angular/material
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

//prime-ng
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';

//Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';

//@swimlane/ngx-charts
import { NgxChartsModule } from '@swimlane/ngx-charts';

//ngx-clipboard
import { ClipboardModule } from 'ngx-clipboard';

//Google Maps
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

//Http
import {HttpClientModule} from '@angular/common/http';

//Vertical timeline
import { VerticalTimelineModule } from 'angular-vertical-timeline';

//Components
import { UiAngularComponent } from './ui-angular.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoubleAxisChartComponent } from './double-axis-chart/double-axis-chart.component';
import { DoubleDimensionsChartComponent } from './double-dimensions-chart/double-dimensions-chart.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { PropertyComponent } from './property/property.component';
import { ThingComponent } from './thing/thing.component';
import {ThingsComponent, DialogAddThing, DialogAddProperty, DialogJWT} from './things/things.component'
import { PropertyTypesComponent } from './property-types/property-types.component';
import { DataCollectionsComponent } from './data-collections/data-collections.component';
import { StatsComponent } from './stats/stats.component';
import { PropertyVideoComponent } from './property-video/property-video.component';
import { PropertyClassComponent } from './property-class/property-class.component';

@NgModule({
  declarations: [
    UiAngularComponent,
    RadarChartComponent,
    LineChartComponent,
    DoubleAxisChartComponent,
    DoubleDimensionsChartComponent,
    GoogleMapsComponent,
    PropertyComponent,
    ThingComponent,
    ThingsComponent,
    DialogAddThing,
    DialogAddProperty,
    DialogJWT,
    PropertyTypesComponent,
    DataCollectionsComponent,
    StatsComponent,
    PropertyVideoComponent,
    PropertyClassComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path : 'page/thing', component: ThingComponent, pathMatch : "full"},
    ]),
    SliderModule,
    ChartsModule,
    NgxChartsModule,
    ClipboardModule,
    HttpClientModule,
    MatSlideToggleModule,
    DialogModule,
    CalendarModule,
    MatButtonModule,
    CheckboxModule,
    MatButtonModule,
    InputTextModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    NgbModule,
    FormsModule,
    VerticalTimelineModule
    // MatProgressBarModule
  ],
  exports: [
    UiAngularComponent,
    RadarChartComponent,
    LineChartComponent,
    DoubleDimensionsChartComponent,
    GoogleMapsComponent,
    PropertyComponent,
    ThingComponent,
    ThingsComponent,
    PropertyTypesComponent,
    DataCollectionsComponent,
    StatsComponent,
    PropertyVideoComponent,
    PropertyClassComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    DialogAddThing,
    DialogAddProperty,
    DialogJWT
  ],
  providers: [DatePipe]
})
export class UiAngularModule { }
