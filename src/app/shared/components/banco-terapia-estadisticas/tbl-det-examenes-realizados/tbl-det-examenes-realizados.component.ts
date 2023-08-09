import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { ExportService } from 'src/app/_services/export.service';
import { summaryNull, summaryForAmount } from '../helpers/summary';

@Component({
  selector: 'app-tbl-det-examenes-realizados',
  templateUrl: './tbl-det-examenes-realizados.component.html',
  styleUrls: ['./tbl-det-examenes-realizados.component.scss']
})
export class TblDetExamenesRealizadosComponent implements OnInit {
  @Input() public cabecera: Array<any> = [];
  @Input() public data: Array<any> = [];
  @Input() public lstDeExamenes: Array<any> = [];
  @Input() public summaryPosition: string = 'bottom';
  @Input() public enableSummary: boolean = true;

  public dataFiltered: Array<any> = [];

  public chkbxs: Array<any> = [
    {
      id: 'idDERMont',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: 'idDERCant',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];

  public lstGrupoDeExamen: Array<any> = [];
  public columnMode = ColumnMode;
  public isCollapsed: boolean = false;
  public chbxIdSel: string = 'idDERMont';
  public valFiltroGrupoExamen: any = 'todo';

  public summaryNull = summaryNull;
  public summaryForAmount = summaryForAmount;

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
    this.filtrarDatos();
    // this.valFiltroGrupoExamen = this.lstDeExamenes[0];
    // this.data.filter(item => item.solesCantidad === 'soles')
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

        if (id === 'idDERMont') {
          this.lstGrupoDeExamen = this.data.filter(item => item.solesCantidad === 'soles')
                                            .filter(valor => this.valFiltroGrupoExamen == valor.id);
        } else if (id === 'idDERCant') {
          this.lstGrupoDeExamen = this.data.filter(item => item.solesCantidad === 'cantidad')
                                            .filter(valor => this.valFiltroGrupoExamen == valor.id);
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

  public filtrar(id: string) {
    this.chkbxs.forEach(x => {
      if (x.id === id) {
        x.value = true;

        if(id === 'idDERMont') {
          this.dataFiltered = this.data.filter(item => item.solesCantidad === 'soles');
        } else if (id === 'idDERCant') {
          this.dataFiltered = this.data.filter(item => item.solesCantidad === 'cantidad');
        }
      } else {
        x.value = false;
      }
    });
  }
}
