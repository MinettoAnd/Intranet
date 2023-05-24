import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicadores-img',
  templateUrl: './indicadoresImg.component.html',
  styleUrls: ['./indicadoresImg.component.scss']
})
export class IndicadoresImgComponent implements OnInit {
  @Input() parameters;
  filtro_grupo = 'IMAG';
  constructor() { }

  ngOnInit(): void {
    
  }
  getParameters(parameters){
console.log(10, parameters)
  }
}
