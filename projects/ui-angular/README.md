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

## Components

### Radar Chart

Diplay a radar chart with the property values, dimensions and type.
```html
<lib-radar-chart 
        [property_values] = "property.values"
        [property_dimensions] = "property.dimensions" 
        [property_type] = "property.type">
</lib-radar-chart>
```

### Line Chart


