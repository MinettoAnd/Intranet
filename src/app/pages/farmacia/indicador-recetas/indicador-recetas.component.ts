import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-indicador-recetas',
  templateUrl: './indicador-recetas.component.html',
  styleUrls: ['./indicador-recetas.component.sass']
})
export class IndicadorRecetasComponent implements OnInit {
  parameters;
  action = false;
  filtro_grupo = 'RECE';
  tabla_cms = 'CMS_TOTREC_ATENCION';
  campo_solicitado = 'totRecSolicitado';
  campo_comprado = 'totRecComprado';
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