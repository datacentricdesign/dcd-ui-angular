import { Component } from '@angular/core';
import { Property,Thing } from '@datacentricdesign/ui-angular'

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
  
  rangeTime = [this.ts_1,this.ts_3]

  apiKey = "AIzaSyD6TYz32l0J6kFrPTapRm2z5RwGxBBKbFA"


  //Radar chart component variable
  radar_property = {
    id : 'id_radar',
    name : 'name_radar',
    type:"ACCELEROMETER",
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
  }

  //Line chart component variable
  line_property = {
    id : 'id_line',
    name : 'name_line',
    type : 'SPEED',
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

  //Double dimensions chart component variable
  double_property = {
    id : 'id_double',
    name : 'name_double',
    type : 'HEART_RATE',
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

  //Google Maps component variables
  location_property ={
    id : 'id_location',
    name : 'name_loaction',
    type : 'LOCATION',
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
    entity_id : "test_entity_id_location"
  }

  //Property component variable
  property = new Property(this.double_property)

  //Thing component variable
  thing = new Thing({
    id : 'id_thing_1',
    name : 'name_thing_1',
    description : 'description of the thing 1',
    type : 'type_thing_1',
    properties : [
      this.property,
      this.radar_property,
    ]
  })

  //Thins component variables
  things = [this.thing,
    new Thing({
        id : 'id_thing_2',
        name : 'name_thing_2',
        description : 'description of the thing 1',
        type : 'type_thing_2',
        properties : [
          new Property(this.property),
          this.location_property,
        ]
      })
    ]

}
