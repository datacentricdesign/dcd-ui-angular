import { Component, Input, OnInit,SimpleChanges,IterableDiffers,IterableDiffer} from '@angular/core';
import {Thing, Property} from '../classes'

@Component({
  selector: 'lib-property-types',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.css']
})

export class PropertyTypesComponent implements OnInit {

  @Input() properties : Property[];
  str_things : Thing[] = []

  private differ: IterableDiffer<Property>;

  constructor(private differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }
  
 


  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.differ) {
      const changes = this.differ.diff(this.properties)
      if(changes){
      if(changes['collection']){
      this.str_things = []
      changes['collection'].forEach(property=>{
        console.log('hey')
        this.AddType(this.str_things,property)
      })
    }
    }
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
  if(!(changes.properties === undefined)){
    this.str_things = []
    changes.properties.currentValue.forEach(property=>{
      this.AddType(this.str_things,property)
    })

  }
}

  AddType(str_things : Thing[],property:Property){
    if(this.contains(str_things,property.type)){
      str_things.forEach(str_thing => {
        if (str_thing.name == property.type){
          str_thing.properties.push(property)
        }
    })
    }else{
      const new_thing = new Thing({
        name : property.type,
        type : property.type,
        description : property.type,
        properties : [property]
      })
      str_things.push(new_thing)
    }
  }

  contains(str_things : Thing[],thing_name_or_property_type:string):boolean{
    for (var i = 0; i <= str_things.length; i ++) {
      if(i < str_things.length){
          if(thing_name_or_property_type == str_things[i].name){
              return true
          }
      }else{
          return false
      }
    }
  }

}
