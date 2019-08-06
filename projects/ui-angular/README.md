# UiAngular

## Install & import UI angular module

1. - `npm install @datacentricdesign/ui-angular`

2. Import import UiAngularModule in your app.module 
 ```ts
//...
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/'
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
 3. (Angular Universal) Settings
 
 **Add web components to polyfills**

- `npm install @webcomponents/webcomponentsjs`
- At the bottom of polyfills.ts file, add the following code :
```ts
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
```

 **Add post install script on your package.json : babel ngx-chart**

 - `npm install @babel/cli --save-dev`
 - `npm install @babel/core --save-dev`
 - `npm install @babel/preset-env --save-dev`

 ```json
 {
 "compile_@swimlane_ngx-charts": "babel node_modules/@swimlane/ngx-charts -d node_modules/@swimlane/ngx-charts --presets @babel/preset-env",
    "postinstall": "npm run compile_@swimlane_ngx-charts"
 }
```

**Call defineCustomElements(window) from main.ts**

```ts  
  import { defineCustomElements as defineCustomElementsGoogleMaps } from 'web-google-maps/dist/loader';
  
  defineCustomElementsGoogleMaps(window);
```

## Components

### Radar Chart

Diplay a radar chart with the property values, dimensions and type. 
=> For property 3+ dimensions

```html
<lib-radar-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions" 
    [property_type] = "property.type">
</lib-radar-chart>
```

### Line Chart

Diplay a line chart with the property values, dimensions.
=> For property 1 dimensions

```html        
<lib-line-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions">
</lib-line-chart>
```

### Double dimensions Chart

Diplay a double axis line chart with the property values, dimensions.
=> For property 2 dimensions

```html
<lib-double-dimensions-chart 
    [property_values] = "property.values"
    [property_dimensions] = "property.dimensions" >
</lib-double-dimensions-chart>
```

### Google Maps (Only for Angular Universal)

1. Call `defineCustomElements(window)` from `main.ts`

Diplay a google maps of the entity with the property values. 
We need also a google map API key `apiKey` and a boolean `checked` if you want to refresh the map each changes (for example for real time value) else there is a button refresh.

```html
<lib-google-maps 
    [property_values] = "values"
    [property_entity_id] ="ChildProperty.entity_id"  
    [apiKey]="XXXXXXXXXXXXXXXX" 
    [checked]="false">
</lib-google-maps>
```
