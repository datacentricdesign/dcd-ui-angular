import { Component, OnInit,Input,SimpleChanges } from '@angular/core';
import {Dimension} from '../classes'

@Component({
  selector: 'lib-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() property_values : any[]
  @Input() property_dimensions:any[]
  dimensions: Dimension[] = []
  sliderSize:number = 0
  showData : boolean = false
  index_slider : number
  date:Date

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = '';
  timeline = true;
  view:any
  multi : any = [{name: '',series: [{name: '',value: 0}]}]

  constructor() {
    this.view = [innerWidth / 1.3, 400];
}

  ngOnInit() {
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}

colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ngOnChanges(changes: SimpleChanges) {

    if(!(changes.property_values === undefined)){
      const values = changes.property_values.currentValue
      if(values.length>0){
              this.multi =  []
              this.showData = true
              this.sliderSize = values.length-1
              this.index_slider = values.length-1
              this.date = new Date(values[this.index_slider][0])
              this.dimensions =  []
              for(var i = 0; i <= this.property_dimensions.length; i++){
                if(i == this.property_dimensions.length ){
                  for(let value of this.dimensions){
                    if(value.unit != undefined && value.unit != ''){
                      this.yAxisLabel = value.dimension +' ('+value.unit+' )'
                    }else{
                      this.yAxisLabel = value.dimension +' (no unit)'
                    }
                  this.multi.push({
                  name : value.dimension,
                  series:value.data
                  })
                  }
                }else{
                const dim_name =  this.property_dimensions[i].name
                const dim_unit = this.property_dimensions[i].unit
                const index = i
                this.dimensions.push(new Dimension(
                  '',
                  '',
                  dim_name,
                  dim_unit,
                  Dimension.getData(index,values)
                  ))

                }
              }
      }else{
        this.showData = false
        this.multi = [{name: '',series: [{name: '',value: 0}]}]
      }
     }
    }

    handleChange(e) {
      //e.value is the new value (is index)
      this.index_slider = e.value
      this.date = new Date(this.property_values[this.index_slider][0])
  }


}
