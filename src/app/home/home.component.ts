import { Component, OnInit} from '@angular/core';
import { Property,Thing } from '@datacentricdesign/ui-angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }
  
  ts_0 = new Date().getTime() - 400000
  ts_1 =  new Date().getTime()
  
  rangeTime = [this.ts_0,this.ts_1]

  apiKey = "YOUR_GOOGLE_API_KEY"


  //Radar chart component variable
  radar_property = {
    id : 'id_radar',
    name : 'name_radar',
    type:"ACCELEROMETER",
    values : [
      [this.ts_0,0,1,1],
      [this.ts_0+2000,0,3,9],
      [this.ts_0+4000,0,8,5],
      [this.ts_1,1,2,3],
      [this.ts_1+2000,3,4,5],
      [this.ts_1+4000,5,3,1]
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
      [this.ts_0,1],
      [this.ts_0+2000,4],
      [this.ts_0+4000,5],
      [this.ts_1,3],
      [this.ts_1+2000,2],
      [this.ts_1+4000,0]
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
      [this.ts_0,1,-1],
      [this.ts_0+2000,3,6],
      [this.ts_0+4000,2,7],
      [this.ts_1,5,9],
      [this.ts_1+2000,9,8],
      [this.ts_1+4000,1,9]
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
      [this.ts_0,52.0186,4.3782],
      [this.ts_0,52.0183,4.3793],
      [this.ts_0,52.0180,4.3790],
      [this.ts_1,52.0185,4.3795],
      [this.ts_1,52.0187,4.3797],
      [this.ts_1,52.0189,4.3799],
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
      new Property(this.radar_property),
    ]
  })

  //Things component variable
  things = [this.thing,
    new Thing({
        id : 'id_thing_2',
        name : 'name_thing_2',
        description : 'description of the thing 1',
        type : 'type_thing_2',
        properties : [
          new Property(this.line_property),
          new Property(this.location_property),
        ]
      })
    ]

  //Property Types component variable
  properties = [
    new Property(this.line_property),
    new Property(this.location_property),
    new Property(this.radar_property),
    new Property(this.radar_property)
  ]
  

    addProperty(){
      this.properties = []
      let prop = new Property(this.line_property)
      prop.id = 'line-id2'
      prop.name = 'line-name2'
      this.properties.push(prop)
      this.properties.push(this.property)
    }
}
