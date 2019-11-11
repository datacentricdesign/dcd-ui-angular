import {Component, Inject, PLATFORM_ID, Input, OnInit} from '@angular/core';
import {isPlatformServer} from "@angular/common";
import {Thing, Dimension} from '../classes'
import {MatSlideToggleChange} from '@angular/material';
import {HttpClientService} from '../http-client.service'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import {DialogData} from "../things/things.component";

@Component({
  selector: 'dcd-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.css']
})
export class ThingComponent implements OnInit {

  @Input() thing: Thing;
  @Input() rangeTime: number[];
  rangeDates: Date[];
  dimensions: Dimension[] = [];
  selectedDimensions: Dimension[] = [];
  displayedColumns: string[] = ['name', 'type', 'settings'];
  showcalendar: boolean = true;
  checked: boolean = false;
  mode: string = "Manual selected values";
  refresh: any;
  first_from: Date;
  dateTime = new Date();

  constructor(
    private service: HttpClientService,
    @Inject(PLATFORM_ID)
    private platformId: Object,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      console.log('Init Thing component server');
    } else {
      if (!this.thing) {
        if (!history.state.data) {
          console.error('No thing in parameter or in state')
        } else {
          this.thing = new Thing({
            id: history.state.data.id,
            name: history.state.data.name,
            type: history.state.data.type,
            description: history.state.data.description,
            properties: history.state.data.properties
          });
          if (!history.state.range) {
            this.BrowserUniversalInit(0, (new Date).getTime())
          } else {
            this.BrowserUniversalInit(history.state.range[0], history.state.range[1]);
          }
        }
      } else {
        if (!this.rangeTime) {
          this.BrowserUniversalInit(0, (new Date).getTime())
        } else {
          this.BrowserUniversalInit(this.rangeTime[0], this.rangeTime[1])
        }
      }
    }
  }

  BrowserUniversalInit(from: number, to: number) {
    this.rangeTime = [from, to];
    this.rangeDates = [new Date(from), new Date(to)];
    var init = true;
    for (let property of this.thing.properties) {
      for (var i = 0; i < property.dimensions.length; i++) {
        const dim_name = property.dimensions[i].name;
        const dim_unit = property.dimensions[i].unit;
        const index = i;

        if (property.values) {
          if (property.values.length > 0) {
            this.dimensions.push(new Dimension(
              property.id,
              property.name,
              dim_name,
              dim_unit,
              this.getData(index, property.values)
            ));
            const first_date = new Date(property.values[0][0]);
            const last_date = new Date(property.values[property.values.length - 1][0]);
            this.rangeDates = [first_date, last_date];
            this.showcalendar = !this.showcalendar
          }
        }

        this.service.get('api/things/' + property.entity_id + '/properties/' + property.id + '?from=' + from + '&to=' + to).subscribe(
          data => {
            if (data['property'].values.length > 0) {
              this.dimensions.push(new Dimension(
                property.id,
                property.name,
                dim_name,
                dim_unit,
                this.getData(index, data['property'].values)
              ));
              const first_date = new Date(data['property'].values[0][0]);
              const last_date = new Date(data['property'].values[data['property'].values.length - 1][0]);
              if (init) {
                this.first_from = first_date;
                this.rangeDates = [first_date, last_date];
                init = false
              } else {
                if (first_date.getTime() < this.rangeDates[0].getTime()) {
                  this.first_from = first_date;
                  this.rangeDates[0] = first_date;
                  this.showcalendar = !this.showcalendar
                }
                if (last_date.getTime() > this.rangeDates[1].getTime()) {
                  this.rangeDates[1] = last_date;
                  this.showcalendar = !this.showcalendar
                }
              }
            }
          })
      }
    }
  }

  getData(index, values: any[]): { value: number, name: Date }[] {
    var array: { value: number, name: Date }[] = [];
    for (var i = 0; i <= values.length; i++) {
      if (i == values.length) {
        return array
      } else {
        array.push(
          {
            value: values[i][index + 1],
            name: new Date(values[i][0])
          }
        )
      }
    }
  }


  getValues(rangeDates: Date[]) {
    this.clearChart();
    if (rangeDates.length == 2) {
      if (rangeDates[0] && rangeDates[1]) {
        this.dimensions = [];
        const from: number = rangeDates[0].getTime();
        const to: number = rangeDates[1].getTime() + 24 * 60 * 60 * 1000;

        for (let property of this.thing.properties) {
          for (var i = 0; i < property.dimensions.length; i++) {
            const dim_name = property.dimensions[i].name;
            const dim_unit = property.dimensions[i].unit;
            const index = i;

            this.service.get('api/things/' + property.entity_id + '/properties/' + property.id + '?from=' + from + '&to=' + to).subscribe(
              data => {
                if (data['property'].values.length > 0) {
                  this.dimensions.push(new Dimension(
                    property.id,
                    property.name,
                    dim_name,
                    dim_unit,
                    this.getData(index, data['property'].values)
                  ))
                }
              })

          }
        }
      }
    }
  }

  updateValues(rangeDates: Date[]) {
    if (rangeDates.length == 2) {
      if (rangeDates[0] && rangeDates[1]) {
        const from: number = rangeDates[0].getTime();
        const to: number = rangeDates[1].getTime() + 24 * 60 * 60 * 1000;

        for (let property of this.thing.properties) {
          for (var i = 0; i < property.dimensions.length; i++) {
            const index = i;
            const dim_name = property.dimensions[i].name;

            this.service.get('api/things/' + property.entity_id + '/properties/' + property.id + '?from=' + from + '&to=' + to).subscribe(
              data => {
                this.updateDimension(property.id, dim_name, this.getData(index, data['property'].values))
              })

          }
        }
      }
    }
  }

  updateDimension(property_id: string, dim_name, data: { value: number, name: Date }[]) {
    this.selectedDimensions.forEach(dim => {
      if (dim.property_id == property_id && dim.dimension == dim_name) {
        dim.data = data
      }
    });
  }

  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'date';
  yAxisLabel = '';
  yAxisLabel2 = '';
  autoScale = true;
  timeLine = true;
  animations = false;
  tooltipDisabled = false;

  view = [1000, 500];

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

  colorScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#01579b', '#7aa3e5', '#a8385d', '#00bfa5', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'
    ]
  };

  firstunit: string;
  dim1: any[] = [];
  dim2: any[] = [];

  handleChange(e) {
// e = true or false => checkbox
    this.multi = [];
    this.dim1 = [];
    this.dim2 = [];
    for (let value of this.selectedDimensions) {
      if (this.multi.length == 0) {
        this.firstunit = value.unit;
        this.addDim(value, this.dim1);
        if (value.unit) {
          this.yAxisLabel = this.toString(this.dim1) + ' (' + value.unit + ')'
        } else {
          this.yAxisLabel = this.toString(this.dim1) + ' (no unit)'
        }
        this.multi.push({
          name: value.dimension + ' (' + value.property_name + ')',
          series: value.data
        })

      } else {
        if (this.firstunit != value.unit) {
          this.addDim(value, this.dim2);
          if (value.unit) {
            this.yAxisLabel2 = this.toString(this.dim2) + ' (' + value.unit + ')'
          } else {
            this.yAxisLabel2 = this.toString(this.dim2) + ' (no unit)'
          }
          this.multi.push({
            name: value.dimension + ' (' + value.property_name + ')',
            secondAxis: true,
            series: value.data
          })
        } else {
          this.addDim(value, this.dim1);
          if (value.unit) {
            this.yAxisLabel = this.toString(this.dim1) + ' (' + value.unit + ')'
          } else {
            this.yAxisLabel = this.toString(this.dim1) + ' (no unit)'
          }
          this.multi.push({
            name: value.dimension + ' (' + value.property_name + ')',
            series: value.data
          })
        }
      }
    }
  }

  addDim(value: Dimension, array: any[]) {
    if (array.length == 0) {
      array.push([[value.dimension], value.property_name])
    } else {
      array.forEach((e, index) => {
        if (value.property_name == e[1]) {
          e[0].push(value.dimension);
          return
        }
        if (index == array.length - 1) {
          array.push([[value.dimension], value.property_name])
        }
      })
    }
  }

  toString(array: any[]): string {
    var res = "";
    for (var i = 0; i <= array.length; i++) {
      if (i == array.length) {
        return res
      } else {
        res += "[ [" + array[i][0].toString() + "]," + array[i][1] + "] "
      }
    }
  }

  multi: any[] = [{name: '', series: [{name: '', value: 0}]}];

  toggle(event: MatSlideToggleChange) {
    this.checked = event.checked;
    if (event.checked) {
      this.clearChart();
      const now = new Date();
      this.rangeDates[0] = new Date(now.getTime() - 60000);
      this.rangeDates[1] = now;
      this.mode = "Real time values";
      this.refresh = setInterval(() => {
        this.updateValues(this.rangeDates);
        this.handleChange(true)
      }, 5000);
    } else {
      this.clearChart();
      this.rangeDates[0] = this.first_from;
      this.mode = "Manual selected values";
      clearInterval(this.refresh);
      this.getValues(this.rangeDates)
    }
  }

  ngOnDestroy() {
    clearInterval(this.refresh)
  }

  clearChart() {
    this.selectedDimensions = [];
    this.multi = [];
    this.dim1 = [];
    this.dim2 = [];
    this.yAxisLabel = "",
      this.yAxisLabel2 = ""
  }

  openDialogExportData() {
    const dialogRef = this.dialog.open(DialogExportData, {
      width: '250px',
      data: {name: '', type: '', description: '', pem: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.export_data()
      }
    });
  }


  private export_data() {

  }
}

@Component({
  selector: 'dialog-export-data',
  template: `
      <h1 mat-dialog-title>Export data</h1>
      <div mat-dialog-content>
          <div class="calendar-container">
              <p-calendar [maxDate]="dateTime" *ngIf="showcalendar && !checked"
                          [(ngModel)]="rangeDates" selectionMode="range"
                          [readonlyInput]="true"
                          (onSelect)="getValues(rangeDates)"></p-calendar>
              <p-calendar [maxDate]="dateTime" *ngIf="!showcalendar && !checked"
                          [(ngModel)]="rangeDates" selectionMode="range"
                          [readonlyInput]="true"
                          (onSelect)="getValues(rangeDates)"></p-calendar>
          </div>
      </div>
      <div mat-dialog-actions>
          <button mat-button (click)="onNoClick()">
              No Thanks
          </button>
          <button mat-button [mat-dialog-close]="data">
              Export
          </button>
      </div>
  `
})

export class DialogExportData {

  rangeDates: Date[];
  checked: boolean = false;
  showcalendar: boolean = true;
  dateTime = new Date();

  constructor(
    public dialogRef: MatDialogRef<DialogExportData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getValues(rangeDates: Date[]) {
    if (rangeDates.length == 2) {
      if (rangeDates[0] && rangeDates[1]) {
        const from_: number = rangeDates[0].getTime();
        const to_: number = rangeDates[1].getTime() + 24 * 60 * 60 * 1000;

      }
    }
  }

  export_data() {

  }

}
