import { Component, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ExportService } from 'src/app/_services/export.service';

@Component({
  selector: 'app-tbl-medicos-dist-anual-x-esp',
  templateUrl: './tbl-medicos-dist-anual-x-esp.component.html',
  styleUrls: ['./tbl-medicos-dist-anual-x-esp.component.scss']
})
export class TblMedicosDistAnualXEspComponent {
  @Input() public cabecera: Array<any> = [];
  @Input() public data: Array<any> = [];
  @Input() public especialidad: string = '';
  @Input() public summaryPosition: string = 'bottom';
  @Input() public enableSummary: boolean = true;

  public columnMode = ColumnMode;
  public isCollapsed: boolean = false;

  constructor(private exportService: ExportService) { }

  public copyTableToClipboard() {
    this.exportService.exportToClipboard(this.data, this.cabecera);
  }

  public exportToExcel() {
    this.exportService.exportTableElmToExcel(this.data, '');
  }
}
