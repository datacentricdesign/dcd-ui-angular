import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

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

// Google Maps
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

//Http
import {HttpClientModule} from '@angular/common/http';

//Components
import { UiAngularComponent } from './ui-angular.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoubleAxisChartComponent } from './double-axis-chart/double-axis-chart.component';
import { DoubleDimensionsChartComponent } from './double-dimensions-chart/double-dimensions-chart.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { PropertyComponent } from './property/property.component';
import { ThingComponent } from './thing/thing.component';
import {ThingsComponent, DialogAddThing, DialogAddProperty, DialogJWT} from './things/things.component'
import { ConstantThingsComponent } from './constant-things/constant-things.component';

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
    ConstantThingsComponent,
    DialogAddThing,
    DialogAddProperty,
    DialogJWT
  ],
  imports: [
    CommonModule,
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
    ConstantThingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    DialogAddThing,
    DialogAddProperty,
    DialogJWT
  ]
})
export class UiAngularModule { }
