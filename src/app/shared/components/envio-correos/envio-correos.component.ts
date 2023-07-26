import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-envio-correos',
  templateUrl: './envio-correos.component.html',
  styleUrls: ['./envio-correos.component.scss']
})
export class EnvioCorreosComponent implements OnInit {
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
