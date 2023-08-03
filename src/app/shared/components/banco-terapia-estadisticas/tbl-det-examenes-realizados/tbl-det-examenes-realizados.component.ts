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
  @Input() public summaryPosition = 'bottom';
  @Input() public enableSummary = true;

  public lstGrupoDeExamen: Array<any> = [];
  public columnMode = ColumnMode;
  public isCollapsed: boolean = false;

  public summaryNull = summaryNull;
  public summaryForAmount = summaryForAmount;

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
    this.filtrarDatos('todo');
  }

  public onChange(nombreExamen: string): void {
    this.filtrarDatos(nombreExamen);
  }

  public filtrarDatos(nombreExamen: string): void {
    console.log('filtrando', this.data)
    if (nombreExamen == 'todo') {
      console.log('TODO!!!')
      this.lstGrupoDeExamen = this.data;
      return;
    }
    
    this.lstGrupoDeExamen = this.data.filter(valor => nombreExamen == valor.id);
    console.log('fin filtrando', this.lstGrupoDeExamen)
  }

  public copyTableToClipboard() {
    this.exportService.exportToClipboard(this.data, this.cabecera);
  }

  public exportToExcel() {
    this.exportService.exportTableElmToExcel(this.data, '');
  }
}
