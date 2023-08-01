import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  area = 'Imagenes';
  constructor() {

  }

 ngOnInit() {
 
   // this.setPage({ offset: 0 });
 }

}

