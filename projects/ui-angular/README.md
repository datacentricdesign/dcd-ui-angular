# UiAngular

## Installation

- `npm install @datacentricdesign/ui-angular`

### Import import UiAngularModule in your app.module 
 ```ts
//...
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//...
import {UiAngularModule} from '@datacentricdesign/ui-angular'

@NgModule({

    imports: [
    BrowserModule
    BrowserAnimationsModule
    //...
    UiAngularModule
    ]
})
 ```

### Add style and script 

1. `ng add @angular/material``

2. In your angular.json file add the following code in project

```json
"styles": [
    "src/styles.css",
    "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeng/resources/themes/nova-light/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/font-awesome/css/font-awesome.css",
    "node_modules/@fortawesome/fontawesome-free/css/all.css",
    "node_modules/perfect-scrollbar/css/perfect-scrollbar.css",
    "node_modules/@datacentricdesign/ui-angular/_theme.scss"
            ],
"scripts": [
    "node_modules/@fortawesome/fontawesome-free/js/all.js",
    "node_modules/hammerjs/hammer.min.js"
            ]
```

### (Angular Universal) Settings
 
#### Add web components to polyfills

- `npm install @webcomponents/webcomponentsjs`
- At the bottom of polyfills.ts file, add the following code :
```ts
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
```

#### Add post install script on your package.json : babel ngx-chart

 - `npm install @babel/cli --save-dev`
 - `npm install @babel/core --save-dev`
 - `npm install @babel/preset-env --save-dev`

 ```json
 {
 "compile_@swimlane_ngx-charts": "babel node_modules/@swimlane/ngx-charts -d node_modules/@swimlane/ngx-charts --presets @babel/preset-env",
    "postinstall": "npm run compile_@swimlane_ngx-charts"
 }
```

#### Call defineCustomElements(window) from main.ts

```ts  
  import { defineCustomElements as defineCustomElementsGoogleMaps } from 'web-google-maps/dist/loader';
  
  defineCustomElementsGoogleMaps(window);
```

## Components

### Radar Chart

(Property 3+ dimensions) Diplay a radar chart with the property values, dimensions and type.

```html
<lib-radar-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions" 
    [property_type] = "property.type">
</lib-radar-chart>
```

### Line Chart

(Property 1 dimensions) Diplay a line chart with the property values, dimensions.

```html        
<lib-line-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions">
</lib-line-chart>
```

### Double dimensions Chart

(Property 2 dimensions) Diplay a double axis line chart with the property values, dimensions.

```html
<lib-double-dimensions-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions" >
</lib-double-dimensions-chart>
```

### Google Maps (Only for Angular Universal)

1. Call `defineCustomElements(window)` from `main.ts`

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

### Property


