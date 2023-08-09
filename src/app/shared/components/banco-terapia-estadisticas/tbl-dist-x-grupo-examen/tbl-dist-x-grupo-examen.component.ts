import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { ExportService } from 'src/app/_services/export.service';
import { summaryNull, summaryForAmount } from '../helpers/summary';

@Component({
  selector: 'app-tbl-dist-x-grupo-examen',
  templateUrl: './tbl-dist-x-grupo-examen.component.html',
  styleUrls: ['./tbl-dist-x-grupo-examen.component.scss']
})
export class TblDistXGrupoExamenComponent implements OnInit {
  @Input() public cabecera: Array<any> = [];
  @Input() public data: Array<any> = [];
  @Input() public summaryPosition: string = 'bottom';
  @Input() public enableSummary: boolean = true;

  public dataFiltered: Array<any> = [];

  public chkbxs: Array<any> = [
    {
      id: 'idDXGEMont',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: 'idDXGECant',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];

  public columnMode = ColumnMode;
  public isCollapsed: boolean = false;

  public summaryNull = summaryNull;
  public summaryForAmount = summaryForAmount;

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
    this.dataFiltered = this.data.filter(item => item.solesCantidad === 'soles')
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

        if (id === 'idDXGEMont') {
          this.dataFiltered = this.data.filter(item => item.solesCantidad === 'soles');
          console.log('11')
        } else if (id === 'idDXGECant') {
          this.dataFiltered = this.data.filter(item => item.solesCantidad === 'cantidad');
          console.log('22')
        }
      } else {
        x.value = false;
      }
    });
  }
}
