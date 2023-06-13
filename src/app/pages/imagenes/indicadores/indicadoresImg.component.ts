import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-indicadores-img',
  templateUrl: './indicadoresImg.component.html',
  styleUrls: ['./indicadoresImg.component.scss']
})
export class IndicadoresImgComponent implements OnInit {
  parameters;
  action = false;
  filtro_grupo = 'IMAG';
  tabla_cms = 'CMS_TOTEXA_ATENCION';
  campo_solicitado = 'totExaSolicitado';
  campo_comprado = 'totExaRealizado';
  constructor(private dataService:DataService) { }

  ngOnInit(): void {

  }

  getParameters(parameters){
    this.parameters = parameters;
    if(parameters !== undefined){
      this.dataService.callback.emit(parameters);
      this.action = true;
    }
// console.log(10, parameters)
  }
}
