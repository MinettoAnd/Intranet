import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { CfgPieDePaginaInterface } from '../../interfaces/cfg-pie-de-pagina.interface';
import { AnchoColInterface } from '../../interfaces/ancho-col.interface';

import { MarcadorEnum } from '../../enums/marcador.enum';

import { fnObtNroParaCadena } from '../../helpers/obt-nro-para-cadena.helper';

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

  getClasses(row) {
    return {
      'totals': MarcadorEnum.IsTotal in row,
      // 'sub-totals':
    };
  }

  ordenarPor(valA, valB, rowA, rowB, sortDir) {
    if (MarcadorEnum.IsTotal in rowA) {
      return sortDir === 'asc' ? 1 : -1;
    }

    if (MarcadorEnum.IsTotal in rowB) {
      return sortDir === 'asc' ? -1 : 1;
    }

    if (!/\d/.test(valA) || !/\d/.test(valB)) {
      const comparacion = valA.localeCompare(valB);
      return sortDir === 'asc' ? comparacion : -comparacion * -1;
    }

    const vA = fnObtNroParaCadena(valA);
    const vB = fnObtNroParaCadena(valB);

    if (sortDir == 'asc') {
      return vA - vB;
    } else {
      return (vB - vA) * -1;
    }
  }

}
