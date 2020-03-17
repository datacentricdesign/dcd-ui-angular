import { Component, OnInit } from "@angular/core";
import { Property, Thing } from "@datacentricdesign/ui-angular";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ts_0 = new Date().getTime() - 400000;
  ts_1 = new Date().getTime();

  rangeTime = [this.ts_0, this.ts_1];

  apiKey = environment.googleMapsKey;

  // Demo 1D property component variable
  data_1d_property = {
    id: "my-speed-property",
    name: "My Speed",
    description: "An example of 1 dimension property.",
    type: "SPEED",
    values: [
      [this.ts_0, 1],
      [this.ts_0 + 2000, 4],
      [this.ts_0 + 4000, 5],
      [this.ts_1, 3],
      [this.ts_1 + 2000, 2],
      [this.ts_1 + 4000, 0]
    ],
    dimensions: [
      {
        name: "Speed",
        description: "",
        unit: ""
      }
    ]
  };

  // Demo 2D property component variable
  data_2d_property = {
    id: "id_double",
    name: "My Heart rate property",
    description: "An example of 2D property.",
    type: "HEART_RATE",
    values: [
      [this.ts_0, 1, -1],
      [this.ts_0 + 2000, 3, 6],
      [this.ts_0 + 4000, 2, 7],
      [this.ts_1, 5, 9],
      [this.ts_1 + 2000, 9, 8],
      [this.ts_1 + 4000, 1, 9]
    ],
    dimensions: [
      {
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
  };

  // Demo property 3d component variable
  data_3d_property = {
    id: "my-acc-property",
    name: "My accelerometer property",
    description: "An example of X dimension property.",
    type: "ACCELEROMETER",
    values: [
      [this.ts_0, 0, 1, 1],
      [this.ts_0 + 2000, 0, 3, 9],
      [this.ts_0 + 4000, 0, 8, 5],
      [this.ts_1, 1, 2, 3],
      [this.ts_1 + 2000, 3, 4, 5],
      [this.ts_1 + 4000, 5, 3, 1]
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
    entity_id: "my-thing"
  };

  // Location property component variables
  data_location_property = {
    id: "my-location-property",
    name: "My location",
    type: "LOCATION",
    values: [
      [this.ts_0, 52.0186, 4.3782],
      [this.ts_0, 52.0183, 4.3793],
      [this.ts_0, 52.018, 4.379],
      [this.ts_1, 52.0185, 4.3795],
      [this.ts_1, 52.0187, 4.3797],
      [this.ts_1, 52.0189, 4.3799]
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
    entity_id: "my-thing"
  };

  // Text Property component variables
  data_text_property = {
    id: "my-text-property",
    name: "Some text logs",
    type: "TEXT",
    values: [
      [this.ts_0, "{code: 0, message: 'Connected!'}"],
      [this.ts_0 + 2000, "{code: 1, message: 'Connection error'}"],
      [this.ts_0 + 4000, "{code: 2, message: 'Connection dropped'}"],
      [this.ts_1, "{code: 0, message: 'Connected!'}"],
      [this.ts_1 + 2000, "{code: 0, message: 'Received message'}"],
      [this.ts_1 + 4000, "{code: 0, message: 'Disconnected'}"]
    ],
    dimensions: [
      {
        name: "Text",
        description: "",
        unit: ""
      }
    ],
    entity_id: "my-thing"
  };

  // Images Property component variables
  // tslint:disable-next-line: member-ordering
  data_images_property = {
    id: "my-images-property",
    name: "images",
    type: "IMAGES",
    values: [
      [this.ts_0, "https://placeimg.com/640/480/animals", "animal"],
      [this.ts_0 + 2000, "https://placeimg.com/640/480/arch", "architecture"],
      [this.ts_0 + 4000, "https://placeimg.com/640/480/nature", "nature"],
      [this.ts_0 + 6000, "https://placeimg.com/640/480/people", "people"],
      [this.ts_1, "https://placeimg.com/640/480/tech", "technology"],
      [this.ts_1 + 2000, "https://placeimg.com/640/480/animals", "animal_2"],
      [
        this.ts_1 + 4000,
        "https://placeimg.com/640/480/arch",
        ["architecture_2"]
      ],
      [this.ts_1 + 6000, "https://placeimg.com/640/480/nature", ["nature_2"]],
      [this.ts_1 + 8000, "https://placeimg.com/640/480/people", ["people_2"]]
    ],
    dimensions: [
      {
        name: "label",
        description: "",
        // tslint:disable-next-line: quotemark
        unit: ""
      }
    ],
    entity_id: "my-thing"
  };

  // Property component variable
  property = new Property(this.data_2d_property);

  // Thing component variable
  thing = new Thing({
    id: "id_thing_1",
    name: "name_thing_1",
    description: "description of the thing 1",
    type: "type_thing_1",
    properties: [this.property, new Property(this.data_3d_property)]
  });

  // Things component variable
  things = [
    this.thing,
    new Thing({
      id: "id_thing_2",
      name: "name_thing_2",
      description: "description of the thing 1",
      type: "type_thing_2",
      properties: [
        new Property(this.data_1d_property),
        new Property(this.data_location_property)
      ]
    })
  ];

  //Property Types component variable
  properties = [
    new Property(this.data_1d_property),
    new Property(this.data_location_property),
    new Property(this.data_3d_property)
  ];

  ngOnInit() {}

  addProperty() {
    //this.properties = []
    let prop = new Property(this.data_1d_property);
    prop.id = "line-id2";
    prop.name = "line-name2";
    this.properties.push(prop);
    //this.properties.push(this.property)
  }
}
