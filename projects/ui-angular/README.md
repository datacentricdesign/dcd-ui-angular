# UiAngular

## Installation

- `npm install @datacentricdesign/ui-angular`
- Install peer @angular/material, hammer.js & browser animations with `ng add @angular/material`

### Import UiAngularModule in your app.module 
 ```ts
//...
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
//...
import {UiAngularModule} from '@datacentricdesign/ui-angular'

@NgModule({

    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    //...
    UiAngularModule
    ]
})
 ```

### Add style and script 

```json
"styles": [
    "src/styles.css",
    "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",

    //ADD -->
    "./node_modules/primeicons/primeicons.css",
    "./node_modules/primeng/resources/themes/nova-light/theme.css",
    "./node_modules/primeng/resources/primeng.min.css",
    "./node_modules/@fortawesome/fontawesome-free/css/all.css",
    "./node_modules/angular-vertical-timeline/dist/vertical-timeline.css",
    "./node_modules/@datacentricdesign/ui-angular/_theme.scss"
            ],
"scripts": [
    "./node_modules/@fortawesome/fontawesome-free/js/all.js",
            ]
    //<--
```


### (Angular Universal) Settings

#### Add post install script on your package.json : babel ngx-chart & angular-vertical-timeline

 - `npm install @babel/cli --save-dev`
 - `npm install @babel/core --save-dev`
 - `npm install @babel/preset-env --save-dev`

 ```json
 {
 "compile_@swimlane_ngx-charts": "babel node_modules/@swimlane/ngx-charts -d node_modules/@swimlane/ngx-charts --presets @babel/preset-env",
 "compile_angular-vertical-timeline": "babel node_modules/angular-vertical-timeline -d node_modules/angular-vertical-timeline --presets @babel/preset-env",
 "postinstall": "npm run compile_@swimlane_ngx-charts && npm run compile_angular-vertical-timeline"
 }
```

#### Add web components to polyfills

- `npm install --save-dev @webcomponents/webcomponentsjs`
- At the bottom of polyfills.ts file, add the following code :
```ts
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
```

## Components

### Charts Components

#### Radar Chart

(Property 3+ dimensions) Diplay a radar chart with the property values, dimensions and type.

```html
<lib-radar-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions" 
    [property_type] = "property.type">
</lib-radar-chart>
```



#### Line Chart

(Property 1 dimensions) Diplay a line chart with the property values, dimensions.

```html        
<lib-line-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions">
</lib-line-chart>
```

#### Double dimensions Chart

(Property 2 dimensions) Diplay a double axis line chart with the property values, dimensions.

```html
<lib-double-dimensions-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions" >
</lib-double-dimensions-chart>
```

#### Google Maps

Call defineCustomElements(window) from main.ts

```ts  
  import { defineCustomElements as defineCustomElementsGoogleMaps } from 'web-google-maps/dist/loader';
  
  defineCustomElementsGoogleMaps(window);
```

(Property LOCATION) Diplay a google maps of the entity with the property values, dimensions. 
We need also a google map API key `apiKey` and a boolean `checked` if you want to refresh the map each changes (for example for real time value) else there is a button refresh.

```html
<lib-google-maps 
    [property_values] = "property.values"
    [property_dimensions] ="property.dimensions" 
    [property_entity_id] ="property.entity_id"  
    [apiKey]="XXXXXXXXXXXXXXXX" 
    [checked]="false">
</lib-google-maps>
```


### Universal components

These components works correctly only with an angular universal project with a server-side rendering.
Use the [Javascript SDK](https://www.npmjs.com/package/@datacentricdesign/sdk-js) to setup your server with the DCD Oauth2 strategy and the routerAPI.
Exemple [here](https://github.com/datacentricdesign/dcd-data-subject) 

#### Property

Display the property with right charts and the values

- Setup a get `'/mapsKey'`route for google maps.

```html
<lib-property 
    [property]="property" 
    [rangeTime] = "rangeTime">
</lib-property>
```

```ts
import { Property } from '@datacentricdesign/ui-angular'
rangeTime = [new Date().getTime()-60000,new Date().getTime()]
property = new Property({
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
  })
```

#### Thing

Display the thing with a line chart for all the dimensions values and all the properties

```html
<lib-thing [thing]="thing" [rangeTime] = "rangeTime" ></lib-thing>
```

```ts 
import { Thing, Property } from '@datacentricdesign/ui-angular'
thing = new Thing({
    id : 'id_thing',
    name : 'name_thing',
    description : 'description of the thing',
    type : 'type_thing',
    properties : [
      this.property,
      new Property({
          ....
        }),
          ....
    ]
  })
```

#### Things

Display all your personnal things of the hub.

```html
<lib-things></lib-thing>
```

#### Data Types

Display all the properties sorted by types

```html
<lib-data-types [properties]="properties"></lib-data-types>
```

```ts
import {Property } from '@datacentricdesign/ui-angular'

properties = [
      this.property,
      new Property({
          ....
        }),
          ....
    ]
```

#### Data Collection

Display all the properties sorted by data collections

```html
<lib-data-collections [properties]="properties"></lib-data-collections>
```






