import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { CfgPieDePaginaInterface } from '../../interfaces/cfg-pie-de-pagina.interface';
import { AnchoColInterface } from '../../interfaces/ancho-col.interface';

@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss']
})
export class TablaReporteComponent implements OnInit {

  // Muestra el mensaje de error en la alerta nativa del navegador
  @Input() public debugEnAlerta: boolean = false;

  @Input() public cabecera: Array<any> = [];
  @Input() public datos: Array<any> = [];

  @Input() public pieDePagina: boolean = false;
  @Input() public cfgPieDePagina: CfgPieDePaginaInterface | undefined = undefined;

  // Identificador de la tabla
  @Input() public id: string = '';

  // Columnas a las que aplicar un ancho
  // [{ nroColumna: valorAncho }]
  @Input() public anchoFijo: Array<any> = [];

  // Ordenar por cabecera
  @Input() public ordenar: boolean = false;

  // Anchos de las columnas
  @Input() public anchos: Array<AnchoColInterface> = [];

  public columnMode = ColumnMode;

  constructor() { }

  ngOnInit(): void {
  }

  // getRowClass(row) {
  //   return {
  //     'totals': row.GRUPO2.includes('TOTAL'), 'sub-totals': row.GRUPO2 === 'PROGRAMA DE SALUD' || row.GRUPO2 === 'CONVENIOS' || row.GRUPO2 ==='SEGUROS' || row.GRUPO2 ==='OTROS'
  //   };
  // }

}
