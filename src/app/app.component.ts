import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'dcd-ui-angular';

  ts_1 = new Date().getTime() - 60000
  ts_2 = new Date().getTime() - 30000
  ts_3 =  new Date().getTime() 



  radar_property = {
    values : [
      [this.ts_1,1,2,3],
      [this.ts_2,3,4,5],
      [this.ts_3,5,3,1]
    ],
    dimensions: [
      {
        name: "x",
        description:
          "Acceleration force that is applied to a device on physical axe x, including the force of gravity.",
        unit: "m/s2"
      },
      {
        name: "y",
        description:
          "Acceleration force that is applied to a device on physical axe y, including the force of gravity.",
        unit: "m/s2"
      },
      {
        name: "z",
        description:
          "Acceleration force that is applied to a device on physical axe z, including the force of gravity.",
        unit: "m/s2"
      }
    ],
    type:"ACCELEROMETER"
  }

  line_property = {
    values : [
      [this.ts_1,1],
      [this.ts_2,3],
      [this.ts_3,5]
    ],
    dimensions: [
      {
        name: "Speed",
        description: "",
        unit: ""
      }
    ]
  }

  double_property = {
    values : [
      [this.ts_1,1,-1],
      [this.ts_2,3,6],
      [this.ts_3,5,9]
    ],
    dimensions: [{
      name: "Heart Rate",
      description: "Heart rate in beats per minutes",
      unit: "BPM"
    },
    {
      name: "RR-Interval",
      description: "RR-Interval in seconds",
      unit: "s"
    }
  ]
  }

  location_property ={
    values : [
      [this.ts_1,52.0186,4.3782],
      [this.ts_2,52.0183,4.3793],
      [this.ts_2,52.0189,4.3799]
    ],
    dimensions: [
      {
        name: "Longitude",
        description: "",
        unit: "°"
      },
      {
        name: "Latitude",
        description: "",
        unit: "°"
      }
    ],
    entity_id : "test-id"
  }

  apiKey = "AIzaSyD6TYz32l0J6kFrPTapRm2z5RwGxBBKbFA"
}
