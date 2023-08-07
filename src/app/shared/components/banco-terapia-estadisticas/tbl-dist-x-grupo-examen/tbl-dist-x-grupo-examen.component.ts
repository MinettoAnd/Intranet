import { Component, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { ExportService } from 'src/app/_services/export.service';
import { summaryNull, summaryForAmount } from '../helpers/summary';

@Component({
  selector: 'app-tbl-dist-x-grupo-examen',
  templateUrl: './tbl-dist-x-grupo-examen.component.html',
  styleUrls: ['./tbl-dist-x-grupo-examen.component.scss']
})
export class TblDistXGrupoExamenComponent {
  @Input() public cabecera: Array<any> = [];
  @Input() public data: Array<any> = [];
  @Input() public summaryPosition = 'bottom';
  @Input() public enableSummary = true;

  public columnMode = ColumnMode;
  public isCollapsed: boolean = false;

  public summaryNull = summaryNull;
  public summaryForAmount = summaryForAmount;

  constructor(private exportService: ExportService) { }

  public copyTableToClipboard() {
    this.exportService.exportToClipboard(this.data, this.cabecera);
  }

  public exportToExcel() {
    this.exportService.exportTableElmToExcel(this.data, '');
  }
}
