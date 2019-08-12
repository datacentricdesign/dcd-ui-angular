import { Component, Input, OnInit,SimpleChanges,IterableDiffers,IterableDiffer} from '@angular/core';
import {Thing, Property} from '../classes'
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';


@Component({
  selector: 'lib-data-collections',
  templateUrl: './data-collections.component.html',
  styleUrls: ['./data-collections.component.css']
})
export class DataCollectionsComponent implements OnInit {

  @Input() properties : Property[];
  @Input() precision_ms : number = 300000 //5min default
  entries : {value:any,entity:any} [] = []
  str_things : Thing[] = [];
  display_property: boolean = false;
  property_picked:Property = new Property({})

  private differ: IterableDiffer<Property>;

  constructor(
    private datepipe: DatePipe,
    private differs: IterableDiffers,
    private router: Router
    ) {
    this.differ = this.differs.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.differ) {
      const changes = this.differ.diff(this.properties)
      if(changes){
      if(changes['collection']){
      this.str_things = []
      this.entries = []
      changes['collection'].forEach((property,index_properties)=>{
        property.values.forEach((value,index_values)=>{
          
          let entrie = {
            value : value,
            entity : property
          }

          if(this.entries.length==0){
            this.entries.push(entrie)
          }else{
            this.entries.forEach((e,i)=>{
              if(entrie.value[0] < e.value[0]){
                  this.entries.splice(i,0,entrie)
              }else{
                if(i == this.entries.length-1){
                  this.entries.push(entrie)
                  if(index_properties == changes['collection'].length - 1 && index_values == property.values.length-1){
                    this.FillArrayStrThings() //1min
                    console.log(this.entries)
                  }
                }
              }
            })
          }
        })
      })
      }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.properties){
      this.str_things = []
      this.entries = []
      changes.properties.currentValue.forEach((property,index_properties)=>{
        property.values.forEach((value,index_values)=>{

          let entrie = {
            value : value,
            entity : property
          }

          if(this.entries.length==0){
            this.entries.push(entrie)
          }else{
            this.entries.forEach((e,i)=>{
              if(entrie.value[0] < e.value[0]){
                  this.entries.splice(i,0,entrie)
              }else{
                if(i == this.entries.length-1){
                  this.entries.push(entrie)
                  if(index_properties == changes.properties.currentValue.length - 1 && index_values == property.values.length-1){
                    this.FillArrayStrThings()
                  }
                }
              }
            })
          }
        })
      })
    }
  }

  FillArrayStrThings(){
    var current_ts=0
    this.entries.forEach((entrie,index_entries) =>{
      if(current_ts == 0){
        let _from = entrie.value[0]
        current_ts = _from
        let _from_date = new Date(_from)
        let _from_date_pipe =this.datepipe.transform(_from_date, 'yyyy-MM-dd HH:mm:ss');
        this.str_things.push(new Thing({
          name : 'from ' + _from_date_pipe + ' to ',
          description : _from + '-',
          properties : new Property({
            id : entrie.entity.id,
            name : entrie.entity.name,
            type : entrie.entity.type,
            description: entrie.entity.description,
            dimensions: entrie.entity.dimensions,
            entityId : entrie.entity.entity_id,
            values : [entrie.value]
          })
        }))
      }else{
        if(current_ts+this.precision_ms > entrie.value[0]){
            current_ts = entrie.value[0]
            if(this.str_things[this.str_things.length-1].contains(entrie.entity.id)){
              this.str_things[this.str_things.length-1].properties.forEach(property=>{
                if(property.id == entrie.entity.id){
                  property.values.push(entrie.value)
                }
              })
            }else{
              this.str_things[this.str_things.length-1].properties.push(new Property({
                id : entrie.entity.id,
                name : entrie.entity.name,
                type : entrie.entity.type,
                description: entrie.entity.description,
                dimensions: entrie.entity.dimensions,
                entityId : entrie.entity.entity_id,
                values : [entrie.value]
              }))
            }
        }else{
          //current_ts = entrie.value[0]
          const to = current_ts
          let to_date = new Date(to)
          let __from_date = this.getFromDate(this.str_things[this.str_things.length-1])
          let to_date_pipe = this.datepipe.transform(to_date, 'yyyy-MM-dd HH:mm:ss');
          if(__from_date.getFullYear() === to_date.getFullYear() ){
            let from_date_pipe_1 = this.datepipe.transform(__from_date, 'MM-dd HH:mm:ss');
            let to_date_pipe_1 = this.datepipe.transform(to_date, 'MM-dd HH:mm:ss');
            this.str_things[this.str_things.length-1].name = 'from ' + from_date_pipe_1 + ' to '+ to_date_pipe_1
            if(__from_date.getMonth() === to_date.getMonth() ){
              let from_date_pipe_2 = this.datepipe.transform(__from_date, 'dd HH:mm:ss');
              let to_date_pipe_2 = this.datepipe.transform(to_date, 'dd HH:mm:ss');
              this.str_things[this.str_things.length-1].name = 'from ' + from_date_pipe_2 + ' to '+ to_date_pipe_2
              if(__from_date.getDay() === to_date.getDay() ){
                let from_date_pipe_3 = this.datepipe.transform(__from_date, 'HH:mm:ss');
                let to_date_pipe_3 = this.datepipe.transform(to_date, 'HH:mm:ss');
                this.str_things[this.str_things.length-1].name = 'from ' + from_date_pipe_3 + ' to '+ to_date_pipe_3
              }
            }
          }else{
            this.str_things[this.str_things.length-1].name += to_date_pipe
          }
          this.str_things[this.str_things.length-1].description += to
          current_ts = entrie.value[0]
          let from = current_ts
          let from_date = new Date(from)
          let from_date_pipe =this.datepipe.transform(from_date, 'yyyy-MM-dd HH:mm:ss');
          this.str_things.push(new Thing({
          name : 'from ' + from_date_pipe + ' to ',
          description : from + '-',
          properties : new Property({
            id : entrie.entity.id,
            name : entrie.entity.name,
            type : entrie.entity.type,
            description: entrie.entity.description,
            dimensions: entrie.entity.dimensions,
            entityId : entrie.entity.entity_id,
            values : [entrie.value]
          })
        }))
        }
      }
      if(index_entries == this.entries.length-1){
          const _to = current_ts
          let _to_date = new Date(_to)
          let ___from_date = this.getFromDate(this.str_things[this.str_things.length-1])
          let _to_date_pipe =this.datepipe.transform(_to_date, 'yyyy-MM-dd HH:mm:ss');
          if(___from_date.getFullYear() === _to_date.getFullYear() ){
            let _from_date_pipe_1 = this.datepipe.transform(___from_date, 'MM-dd HH:mm:ss');
            let _to_date_pipe_1 = this.datepipe.transform(_to_date, 'MM-dd HH:mm:ss');
            this.str_things[this.str_things.length-1].name = 'from ' + _from_date_pipe_1 + ' to '+ _to_date_pipe_1
            if(___from_date.getMonth() === _to_date.getMonth() ){
              let _from_date_pipe_2 = this.datepipe.transform(___from_date, 'dd HH:mm:ss');
              let _to_date_pipe_2 = this.datepipe.transform(_to_date, 'dd HH:mm:ss');
              this.str_things[this.str_things.length-1].name = 'from ' + _from_date_pipe_2 + ' to '+ _to_date_pipe_2
              if(___from_date.getDay() === _to_date.getDay() ){
                let _from_date_pipe_3 = this.datepipe.transform(___from_date, 'HH:mm:ss');
                let _to_date_pipe_3 = this.datepipe.transform(_to_date, 'HH:mm:ss');
                this.str_things[this.str_things.length-1].name = 'from ' + _from_date_pipe_3 + ' to '+ _to_date_pipe_3
              }
            }
          }else{
            this.str_things[this.str_things.length-1].name += _to_date_pipe
          }
          this.str_things[this.str_things.length-1].description += _to
      }
    })
  }

  descriptionT(thing:Thing):string {
    if(thing.description){
      return thing.description
    }else{
      return 'No description available'
    }
  }
  
  descriptionP(property:Property):string {
    if(property.description){
      return property.description
    }else{
      return 'No description available' 
    }
  }

  HasProperty(thing:Thing):boolean{
    return thing.properties.length > 0
  }

  async setChild(property : Property){
    this.property_picked = property
  }

  showDialog_property(property : Property) {
      this.setChild(property).then(()=>this.display_property = true)
  }

  nav_thing(thing:Thing){
    this.router.navigate(['/page/thing'], {
      state:{data:thing.json()}});
  }

  getRangeTime(thing:Thing):number[]{
    return [parseInt(thing.description.split("-")[0],10),parseInt(thing.description.split("-")[1],10)]
  }

  getFromDate(thing:Thing):Date{
    return new Date(parseInt(thing.description.split("-")[0],10))
  }

  getToDate(thing:Thing):Date{
    return new Date(parseInt(thing.description.split("-")[1],10))
  }

}
