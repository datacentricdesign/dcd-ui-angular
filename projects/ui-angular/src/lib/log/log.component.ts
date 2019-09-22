import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() property_values : any[];

  constructor() { }

  ngOnInit() {
  }

}
