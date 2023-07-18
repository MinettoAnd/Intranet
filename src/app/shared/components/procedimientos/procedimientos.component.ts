import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.scss']
})
export class ProcedimientosComponent implements OnInit {
  parameters;
  action = false;
  option = 'planilla';
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  getParameters(parameters){
    this.parameters = parameters;
    if(parameters !== undefined){
      this.dataService.callback.emit(parameters);
      this.action = true;
    }
  }
}
