import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import { ExportService } from 'src/app/_services/export.service';
import { Page } from 'src/app/models/forms-data/page';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-row-detalle',
  templateUrl: './row-detalle.component.html',
  styleUrls: ['./row-detalle.component.sass']
})

export class RowDetalleComponent implements OnInit {
  @Input() dato;
  columns: [];
  rows: any;
  temp: [];
  page = new Page()
  ColumnMode = ColumnMode;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  constructor(public activeModal: NgbActiveModal, private exportService: ExportService,) { 
    this.page.size = 10;
  }

  ngOnInit(){
    console.log(11, this.dato);
    this.columns = this.dato.data.cabeceras;
    this.rows = this.dato.data.tabla_expediente_detalle
    this.temp = this.rows;
    console.log(this.rows)
  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    // this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any): void {
    // this.loading();
    if (limit === '0'){
      
      this.page.size = this.page.totalElements;
      console.log(this.page.totalElements);
      return
    }
    this.page.size = parseInt(limit, 10);
    // setTimeout(() => {
    //   Swal.close();
    // }, 2000)
  }
  async loading() {
    Swal.fire({
        html: "<div>Filtrando ...</div>",
        width: "200px",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
            Swal.showLoading();
        },
    });
  }
  updateFilter(event) {
    const input = event.target.value.toLowerCase();

    // filter our data
    if (input.length > 0) {
      const filtered = this.rows.filter(el =>
        // console.log(240, el);
        Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          // Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        console.log(filtered);
      this.rows = [...filtered]
      
    } else {

      this.rows = [...this.temp]
    }
  }
  copyTableToClipboard(){

      this.rows.map(item=>{
        item.MontoTotal = typeof item.MontoTotal === 'number' ? item.MontoTotal : Number(item.MontoTotal);
     });
      this.exportService.exportToClipboard(this.rows, this.columns);

  }
  exportToExcel(): void {

      this.rows.map(item=>{
        item.MontoTotal = typeof item.MontoTotal === 'number' ? item.MontoTotal : Number(item.MontoTotal);

     });
      this.exportService.exportTableElmToExcel(this.rows, '');

  }
}
