import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { ComercialService } from 'src/app/_services/comercial.service';
import {AttentionConsultation} from '../../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../../interfaces/excel-json.interface';
import { ExportService } from '../../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';


@Component({
  selector: 'app-listado-contratos-vigentes',
  templateUrl: './listado-contratos-vigentes.component.html',
  styleUrls: ['./listado-contratos-vigentes.component.sass']
})
export class ListadoContratosVigentesComponent implements OnInit {
  initialSize = 0;
  // columnSize  = [ 12,12,12,20,22,8,8,28,28,10,21,10,10,10,21,10,10];
  columnSize  = [12,10,10,10,10,10,10,15,14,10,10,10,10,10,10,10,10];
  filtroForm: FormGroup;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChild(DatatableComponent) private table: DatatableComponent;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  selected = [];
  id: number;
  loadingIndicator: true;
  rows: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  parameters:any;
  message;
  title;
  columns:any;
  optionsWithCaption = {};
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  fecha = moment(new Date()).format('YYYY-MM-DD');
  meses = '00';
  tipo_paciente = '0';

  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  constructor(private tableApiservice: ComercialService, private exportService: ExportService) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      fecha: new FormControl(this.fecha),
      meses: new FormControl("00"),
      tipo_paciente: new FormControl("0"),
  });
   }

  ngOnInit() {
    const item = document.getElementById('datatablele');
    this.initialSize = item.offsetWidth;
    console.log(90, this.initialSize);
    new ResizeObserver((event: any) => {
      this.escucharResizeDiv(event);
    }).observe(item);
    // this.setPage({ offset: 0 });
  }
  escucharResizeDiv(event) {
    const item = document.getElementById('datatablele');

    if (item.offsetWidth !== this.initialSize) {
      // HEADER
      const headerDatatable  = event[0].target.children[0].children[0];
      headerDatatable.style.width = '100%';
      headerDatatable.children[0].style.width = '100%';
      const rowHeader = headerDatatable.children[0].children[1];
      rowHeader.style.width = '100%';
      const headerColumns = Array.from( rowHeader.children );
      // BODY
      const bodyDatatable  = event[0].target.children[0].children[1].children[0].children[0];
      bodyDatatable.style.width = '100%';
      const rowsIterables = Array.from( bodyDatatable.children );
      // ============ CICLOS ==========================
      headerColumns.forEach( (column: any, index: number) => {
        column.style.width = `${this.columnSize[index]}%`;
      });

      // BODY - Recorremos las filas del datatable
      rowsIterables.forEach((row: any) => {
        row.children[0].style.width = '100%';
        const columns = Array.from( row.children[0].children[1].children );

        if ( columns.length ) {
          // const cantidadSize = diferenciaSize / columns.length;
          row.children[0].children[1].style.width = '100%';
          // Recorremos cada columna del datatable
          columns.forEach( (column: any, index: number) => {
            column.style.width = `${this.columnSize[index]}%`;
          });
        }

      });

      // Obtenemos el nuevo ancho del div
      this.initialSize = item.offsetWidth;
      console.log(134, this.initialSize);
    }

  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    // this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any): void {
    this.loading();
    if (limit === '0'){
      
      this.page.size = this.page.totalElements;
      console.log(this.page.totalElements);
      return
    }
    this.page.size = parseInt(limit, 10);
    
    setTimeout(() => {
      Swal.close();
    }, 1000)
  }
  setPage(pageInfo) {
    // console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset;
    // this.parameters = {
    //   fecha: this.fecha,
    //   meses: this.meses,
    //   tipo_paciente: this.tipo_paciente,
    //   pageNumber: this.page.pageNumber,
    //   size: this.page.size
    // };

    this.loading();
    this.tableApiservice.getVigentesDetalle().subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        this.rows = [];
        if(response.data.success){
          this.message = response.message;
          this.title = response.data.title;
          console.log(response.data);
          this.data = response.data ? response : [];
      console.log(168, this.data);   
          this.columns = this.data.data.cabeceras;
          this.rows = this.data.data.data;
          console.log(response.data.page);
          this.page = (response as any).data.page;
          this.temp = this.rows;
          
            Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
  }

  copyTableToClipboard(){
    this.exportService.exportToClipboard(this.rows, this.columns);
    
  }

  exportToExcel(): void {
    this.exportService.exportTableElmToExcel(this.rows, 'Atenciones-Realizadas-por-Emergencia');
  }



  filter() {
  
        const form = this.filtroForm.value;
          this.fecha = moment(form.fecha).format('YYYY-MM-DD'),
          this.meses = form.meses,
          this.tipo_paciente = form.tipo_paciente,

        this.setPage({ offset: 0 });
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
    console.log(input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
        );
        // console.log(filtered);
      this.rows = [...filtered]
      
    } else {
      console.log(this.filtered);
      this.rows = [...this.temp]
    }

    // update the rows
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

}

