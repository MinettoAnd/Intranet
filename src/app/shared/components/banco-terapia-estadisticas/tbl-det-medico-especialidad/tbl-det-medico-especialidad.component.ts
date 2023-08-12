import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { ExportService } from 'src/app/_services/export.service';
import { summaryNull, summaryForAmount } from '../helpers/summary';

@Component({
  selector: 'app-tbl-det-medico-especialidad',
  templateUrl: './tbl-det-medico-especialidad.component.html',
  styleUrls: ['./tbl-det-medico-especialidad.component.scss']
})
export class TblDetMedicoEspecialidadComponent implements OnInit {
  @Input() public cabecera: Array<any> = [];
  @Input() public data: Array<any> = [];
  @Input() public lstDeEspecialidad: Array<any> = [];
  @Input() public summaryPosition: string = 'bottom';
  @Input() public enableSummary: boolean = true;

  public dataFiltered: Array<any> = [];

  public chkbxs: Array<any> = [
    {
      id: 'idDEEMont',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: 'idDEECant',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];

  public lstGrupoDeEspecialidad: Array<any> = [];
  public columnMode = ColumnMode;
  public isCollapsed: boolean = false;
  public chbxIdSel: string = 'idDEEMont';
  public valFiltroGrupoEspecialidad: any = '';

  public summaryNull = summaryNull;
  public summaryForAmount = summaryForAmount;

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
    this.valFiltroGrupoEspecialidad = this.lstDeEspecialidad[0];
    this.filtrarDatos();
  }

  getRowClass(row) {
    console.log('getclass', row)
    return {
     // 'totals': row.Campo.includes('TOTAL'), 
      'sub-totals': row.Campo === 'CARDIOLOGIA' || row.Campo === 'RAYOS X' || row.Campo === 'ADMINISTRATIVO' || row.Campo === 'DENSITOMETRIA' || row.Campo === 'MAMOGRAFIAS'  || row.Campo === 'TOMOGRAFIAS'  || row.Campo === 'CONSULTA EXTERNA MEDICA' 
    };
  }

  public onChange(): void {
    this.filtrarDatos();
  }

  public chbxSel(id: any): void {
    this.chbxIdSel = id;
    this.filtrarDatos();
  }

  public filtrarDatos(): void {
    const id = this.chbxIdSel;

    this.chkbxs.forEach(x => {
      if (x.id === id) {
        x.value = true;

        if (id === 'idDEEMont') {
          this.lstGrupoDeEspecialidad = this.data.filter(item => item.solesCantidad === 'soles')
                                            .filter(valor => this.valFiltroGrupoEspecialidad == valor.id);
        } else if (id === 'idDEECant') {
          this.lstGrupoDeEspecialidad = this.data.filter(item => item.solesCantidad === 'cantidad')
                                            .filter(valor => this.valFiltroGrupoEspecialidad == valor.id);
        }
      } else {
        x.value = false;
      }
    });
  }

  public copyTableToClipboard() {
    this.exportService.exportToClipboard(this.data, this.cabecera);
  }

  public exportToExcel() {
    this.exportService.exportTableElmToExcel(this.data, '');
  }
}
