import { Component,OnInit,Input} from '@angular/core';
import { Thing,Property} from '../classes'
import { Router } from '@angular/router';

@Component({
  selector: 'lib-constant-things',
  templateUrl: './constant-things.component.html',
  styleUrls: ['./constant-things.component.css']
})
export class ConstantThingsComponent implements OnInit {

  @Input() things : Thing[] = []
  display_property: boolean = false;
  property_picked:Property = new Property({})

  constructor(private router: Router) {}

  ngOnInit() {
  }

  descriptionT(thing:Thing):string {
    if(thing.description == "" || thing.description === undefined){
      return 'No description available'
    }else{
      return thing.description
    }
  }
  descriptionP(property:Property):string {
    if(property.description == "" || property.description === undefined ){
      return 'No description available'
    }else{
      return property.description 
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

}
