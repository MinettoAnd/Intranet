import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
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
  rows: [];
  page = new Page()
  ColumnMode = ColumnMode;
  constructor(public activeModal: NgbActiveModal,) { 

  }

  ngOnInit(){
    console.log(11, this.dato);
    this.columns = this.dato.cabeceras;
    this.rows = this.dato.tabla_expediente_detalle
    console.log(this.rows)
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
}
