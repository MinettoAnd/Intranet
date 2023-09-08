import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { FarmaciaService } from 'src/app/_services/farmacia.service';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { GridApi, GridReadyEvent} from 'ag-grid-community';

@Component({
  selector: 'app-referencia-precios',
  templateUrl: './referencia-precios.component.html',
  styleUrls: ['./referencia-precios.component.scss']
})
export class ReferenciaPreciosComponent implements OnInit {
  initialSize = 0;
  // columnSize  = [ 12,12,12,20,22,8,8,28,28,10,21,10,10,10,21,10,10];
  columnSize  = [12,10,10,10,10,10,10,15,14,10,10,10,10,10,10,10,10];
  filtroForm: FormGroup;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;
  active = 1;
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
  action: boolean = false;
  private gridApi1!: GridApi;
  pageNumber1: number;
  constructor(private tableApiservice: FarmaciaService, private exportService: ExportService) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      fecha: new FormControl(this.fecha),
      meses: new FormControl("00"),
      tipo_paciente: new FormControl("0"),
  });
   }

  ngOnInit() {

    // this.setPage({ offset: 0 });
  }
  CellRendererDecimal(params: any) {
    var inrFormat = new Intl.NumberFormat('es-PE', 
    {
      // style: 'currency',
      // currency: 'PEN',
      maximumFractionDigits: 2,
    }
    );
    return inrFormat.format(params.value);
  }
  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;

  }
  onPaginationChanged(table) {
    console.log(' hola')
    if (table === 1){
      // console.log(336, this.pageNumber1 )
      if(this.gridApi1) {
         
        if (this.pageNumber1 === this.gridApi1.paginationGetCurrentPage()) {
          
          return;
        }
        this.pageNumber1 = this.gridApi1.paginationGetCurrentPage()
        
      }else{
        return;
      }
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
    this.gridApi1.paginationSetPageSize(Number(this.page.size));
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
    this.tableApiservice.getReferenciaPreciosLog().subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        this.rows = [];
        if(response.data.success){
          this.message = response.message;
          this.title = response.data.title;
          console.log(response.data);
          this.data = response.data ? response : [];
      console.log(168, this.data);   
          this.columns = this.data.data.cabeceras;
          this.columns.map(item => {
            console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field == 'tcl30' || subitem.field == 'tdo50' || subitem.field == 'tdi50' || subitem.field == 'tdi80'){
                  subitem.cellRenderer = this.CellRendererDecimal;
                }
             })
            }
          })
          this.rows = this.data.data.tabla_precio;
          console.log(response.data.page);
          // this.page = (response as any).data.page;
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
    this.rows.map(item => {
      item.kayros_monto_nuevo = typeof item.kayros_monto_nuevo === 'number' ? item.kayros_monto_nuevo : Number(item.kayros_monto_nuevo);
      item.tcl_monto_nuevo = typeof item.tcl_monto_nuevo === 'number' ? item.tcl_monto_nuevo : Number(item.tcl_monto_nuevo);
      item.tcl30 = typeof item.tcl30 === 'number' ? item.tcl30 : Number(item.tcl30);
      item.tdo_monto_nuevo = typeof item.tdo_monto_nuevo === 'number' ? item.tdo_monto_nuevo : Number(item.tdo_monto_nuevo);
      item.tdo50 = typeof item.tdo50 === 'number' ? item.tdo50 : Number(item.tdo50);
      item.tdi_monto_nuevo = typeof item.tdi_monto_nuevo === 'number' ? item.tdi_monto_nuevo : Number(item.tdi_monto_nuevo);
      item.tdi50 = typeof item.tdi50 === 'number' ? item.tdi50 : Number(item.tdi50);
      item.tdi80 = typeof item.tdi80 === 'number' ? item.tdi80 : Number(item.tdi80);
      item.ins_monto_nuevo = typeof item.ins_monto_nuevo === 'number' ? item.ins_monto_nuevo : Number(item.ins_monto_nuevo);
    });
    this.exportService.exportToClipboard(this.rows, this.columns);
    
  }

  exportToExcel(): void {
    this.rows.map(item => {
      item.kayros_monto_nuevo = typeof item.kayros_monto_nuevo === 'number' ? item.kayros_monto_nuevo : Number(item.kayros_monto_nuevo);
      item.tcl_monto_nuevo = typeof item.tcl_monto_nuevo === 'number' ? item.tcl_monto_nuevo : Number(item.tcl_monto_nuevo);
      item.tcl30 = typeof item.tcl30 === 'number' ? item.tcl30 : Number(item.tcl30);
      item.tdo_monto_nuevo = typeof item.tdo_monto_nuevo === 'number' ? item.tdo_monto_nuevo : Number(item.tdo_monto_nuevo);
      item.tdo50 = typeof item.tdo50 === 'number' ? item.tdo50 : Number(item.tdo50);
      item.tdi_monto_nuevo = typeof item.tdi_monto_nuevo === 'number' ? item.tdi_monto_nuevo : Number(item.tdi_monto_nuevo);
      item.tdi50 = typeof item.tdi50 === 'number' ? item.tdi50 : Number(item.tdi50);
      item.tdi80 = typeof item.tdi80 === 'number' ? item.tdi80 : Number(item.tdi80);
      item.ins_monto_nuevo = typeof item.ins_monto_nuevo === 'number' ? item.ins_monto_nuevo : Number(item.ins_monto_nuevo);
    });
    this.exportService.exportTableElmToExcel(this.rows, 'Atenciones-Realizadas-por-Emergencia');
  }



  filter() {
    this.action = true;
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

