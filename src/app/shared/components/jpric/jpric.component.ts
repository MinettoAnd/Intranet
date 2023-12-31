import { delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { TesoreriaService } from 'src/app/_services/tesoreria.service';
import { NumberDecimalPipe } from 'src/app/pipes/numberDecimal.pipe';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LinkRendererComponent } from '../renderer/link-renderer.component';
import { RowDetalleComponent } from 'src/app/modals/jpric/row-detalle/row-detalle.component';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, GridReadyEvent} from 'ag-grid-community';
import { PagedData } from 'src/app/models/forms-data/paged-data';

interface PageInfo {
  offset: number;
  pageSize: number;
  limit: number;
  count: number;
}
@Component({
  selector: 'app-jpric',
  templateUrl: './jpric.component.html',
  styleUrls: ['./jpric.component.scss']
})
export class JPRICComponent implements OnInit {
  initialSize = 0;
  active = 1;
  enableSummary = true;
  summaryPosition = 'bottom';
  filtroForm: FormGroup;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;
  // @ViewChild("agGrid") agGrid: AgGridAngular;
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChild(DatatableComponent) private table: DatatableComponent;
  closeResult = '';
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp5 = [];
  temp8 = [];
  temp11 = [];
  tempPendientes = [];
  selected = [];
  id: number;
  loadingIndicator: true;
  columns:any;
  columns1:any;
  columns2:any;
  columns3:any;
  columns4:any;

  columns5:any;
  columns6:any;
  columns7:any;
  columns8:any;
  columns9:any;

  columns10:any;
  columns11:any;
  columns12:any;
  columns13:any;
  columns14:any;
  columns15:any;
  columns16:any;

  rows: any;
  rows1: any;
  rows2: any;
  rows3: any;
  rows4: any;
  rows4filtered = [];
  rows5: any;
  rows6: any;
  rows7: any;
  rows8: any;
  rows9: any;
  rows10: any;
  rows11: any;
  rows12: any;
  rows13: any;
  rows14: any;
  rows15: any;
  rows16: any;
  page1 = new Page();
  page2 = new Page();
  page3 = new Page();
  columnsPendientes: any;
  rowsPendientes: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  parameters:any;
  message;
  title;
  optionsWithCaption = {};
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  fecha = moment(new Date()).format('YYYY-MM-DD');
  sede = '';
  estado = 'T';
  tipo_lista = 'E';

  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  totalMorosos:any;
  totalAfiliados:any;
  totalPeriodos:any;
  totalDeuda:any;
  optionsMes = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];
  optionsAnio = [];
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo = this.anio + this.mes;
  convenio= '000000'

  frameworkComponents: any;
  SelectionType = SelectionType;
  id_sede: any;
  pageNumber1: number;
  pageNumber2: number;
  pageNumber3: number;
  isLoad = 0;
  private gridApi1!: GridApi;
  private gridApi2!: GridApi;
  private gridApi3!: GridApi;
  private gridColumnApi;
  public paginationPageSize = 10;
  totalElements1: number;

  totalElements2: number;
  totalElements3: number;
  rowsT1: any[];
  rowsT2: any[];
  rowsT3: any[];
  action: boolean = false;
  private rowClassRules;
  constructor(private tableApiservice: TesoreriaService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.page1.pageNumber = 0;
    this.page1.size = 10;
    this.page2.pageNumber = 0;
    this.page2.size = 10;
    this.page3.pageNumber = 0;
    this.page3.size = 10;
    this.pageNumber1 = 0
    this.filtroForm = new FormGroup({
      anio: new FormControl(this.anio),
      mes: new FormControl(this.mes),
      convenio: new FormControl(this.convenio),
  });
  this.frameworkComponents = {
    buttonRenderer: LinkRendererComponent,
  }
  var anioOp = Number(this.anio);
  while ( Number(anioOp) > 2017 ) {
    console.log(275, anioOp);
    
    const anioNew = {
       value: anioOp.toString(), label: anioOp.toString() 
    }
    this.optionsAnio.push(anioNew);
    anioOp--;
  }
  this.rowClassRules = {
    "totals": function(params) {
      console.log(213, params);
      var totales;
      if(params.data.aseguradora_nombre !== undefined){
        totales = params.data.aseguradora_nombre; 
      }else if(params.data.aseguradora_Nombre !== undefined){
        totales = params.data.aseguradora_Nombre;
      }else if(params.data.aseguradoraNombre !== undefined){
        totales = params.data.aseguradoraNombre;
      }
      return totales === 'TOTAL';
    },
    "separator": function(params) {
      
     var totales;
     if(params.data.Linea_Unica === ''){
      // console.log(226, params); 
       totales = params.data.Linea_Unica;
     }
     return totales === '';
   },
  };
   }

  ngOnInit() {
  
    // this.setPage({ offset: 0 });
  }
  getRowClass(row) {
    return {
      'totals': row.tipoPacienteNombre.includes('TOTAL'), 'sub-totals': row.tipoPacienteNombre === 'PROGRAMAS DE SALUD' || row.tipoPacienteNombre === 'CONVENIOS' || row.tipoPacienteNombre === 'SEGUROS' || row.tipoPacienteNombre === 'OTROS' };
  }
  getRowClass1(row) {

    // return {
    //   'totals': row.periodo.includes('TOTAL')
    // };
  }
  // getCellClass({ row, column, value }): any {
  //   console.log(178, column);
  //   return {
  //     'text-right': column.prop !== 'PeriodoTXT'
  //   };
  // }
  public onAnioChange(anio: any): void {
    this.anio = anio;
    this.periodo = this.anio + this.mes;
    // this.setPage({ offset: 0 });
  }
  public onMesChange(mes: any): void {
    this.mes = mes;
    this.periodo = this.anio + this.mes;
    // this.setPage({ offset: 0 });
  }
  public onLimitChange(limit: any, numberT): void {
    this.changePageLimit(limit, numberT);
    // this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any, numberT): void {
    
    if(numberT === '1'){
      if (limit === '0'){
        this.page1.size = this.page1.totalElements;
        
        return
      }
      this.page1.size = parseInt(limit, 10);
      this.setPage1({
        offset: this.gridApi1.paginationGetCurrentPage(),
        pageSize: this.gridApi1.paginationGetPageSize(),
        limit: 10,
        count: 0
      });
      this.gridApi1.paginationSetPageSize(Number(this.page1.size));
      console.log(this.page1.size);
    }else if(numberT === '2'){
      if (limit === '0'){
        this.page2.size = this.page2.totalElements;
        // console.log(this.page.totalElements);
        return
      }
      this.page2.size = parseInt(limit, 10);
      this.setPage2({
        offset: this.gridApi2.paginationGetCurrentPage(),
        pageSize: this.gridApi2.paginationGetPageSize(),
        limit: 10,
        count: 0
      });
      this.gridApi2.paginationSetPageSize(Number(this.page2.size));
    }if(numberT === '3'){
      if (limit === '0'){
        this.page3.size = this.page3.totalElements;
        // console.log(this.page.totalElements);
        return
      }
      this.page3.size = parseInt(limit, 10);
      this.setPage3({
        offset: this.gridApi3.paginationGetCurrentPage(),
        pageSize: this.gridApi3.paginationGetPageSize(),
        limit: 10,
        count: 0
      });
      this.gridApi3.paginationSetPageSize(Number(this.page3.size));
    }
    

  }

  async setPage1(pageInfo: PageInfo) {
    this.pageNumber1 = pageInfo.offset;
    const rowOffset = pageInfo.offset * pageInfo.pageSize;
  
    this.page1.pageNumber = Math.floor(rowOffset / this.page1.size);
    this.isLoad++;
    console.log(323, this.page1, rowOffset , this.page1.size);
    // if (this.page1.pageNumber === 'NaN'){

    // }
   await this.getResults(this.page1, this.rows5).subscribe(  pagedData => {
      console.log(1187, this.page1, this.rows5);
      // this.rowsT1 = [];
      this.totalElements1 = pagedData.page.totalElements;
      if (pagedData.data.length < pagedData.page.size){
        this.rowsT1 = pagedData.data
        if(pagedData.data.length > 0){
          this.totalRow1(this.gridApi1, this.rowsT1);
        }
        // for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
        //   this.rowsT1[(index)] = { id_esp: '', especialidad: ''};
        // }
      }else{
        this.rowsT1 = pagedData.data;
        if(this.gridApi1){
          this.totalRow1(this.gridApi1, this.rowsT1);
        }
      }
      this.isLoad--;
    });
  }
  onPaginationChanged(table) {
    console.log(' hola')
    if (table === 1){
      // console.log(336, this.pageNumber1 )
      if(this.gridApi1) {
         
        if (this.pageNumber1 === this.gridApi1.paginationGetCurrentPage()) {
          
          return;
        }else{
          
          this.setPage1({
            offset: this.gridApi1.paginationGetCurrentPage(),
            pageSize: this.gridApi1.paginationGetPageSize(),
            limit: 10,
            count: 0
          });
          
          
        }
        this.pageNumber1 = this.gridApi1.paginationGetCurrentPage()
      }else{
        return;
      }
    }else if (table === 2){
      if(this.gridApi2) {
        //  console.log(336, this.pageNumber1 , this.gridApi.paginationGetCurrentPage())
        if (this.pageNumber2 === this.gridApi2.paginationGetCurrentPage()) {
          
          return;
        }else{
          
          this.setPage2({
            offset: this.gridApi2.paginationGetCurrentPage(),
            pageSize: this.gridApi2.paginationGetPageSize(),
            limit: 10,
            count: 0
          });
          
          
        }
        this.pageNumber2 = this.gridApi2.paginationGetCurrentPage()
    }else{
        return;
      }
    }else if (table === 3){
      if(this.gridApi3) {
         console.log(385, this.pageNumber3 , this.gridApi3.paginationGetCurrentPage())
        if (this.pageNumber3 === this.gridApi3.paginationGetCurrentPage()) {
          
          return;
        }else{
          
          this.setPage3({
            offset: this.gridApi3.paginationGetCurrentPage(),
            pageSize: this.gridApi3.paginationGetPageSize(),
            limit: 10,
            count: 0
          });
          
          
        }
        this.pageNumber3 = this.gridApi3.paginationGetCurrentPage()
      }else{
        return;
      }
    }
    

  }
  async setPage2(pageInfo: PageInfo) {
    console.log('object')
    
    this.pageNumber2 = pageInfo.offset;
    const rowOffset = pageInfo.offset * pageInfo.pageSize;
    this.page2.pageNumber = Math.floor(rowOffset / this.page2.size);
    this.isLoad++;
    console.log(323, this.page2, rowOffset , this.page2.size);
    await this.getResults(this.page2, this.rows8).subscribe(pagedData => {
      console.log(1188, this.page2, this.rows8);
      // this.rowsT2 = [];
      this.totalElements2 = pagedData.page.totalElements;
      if (pagedData.data.length < pagedData.page.size){
        this.rowsT2 = pagedData.data
        console.log(413, this.rowsT2)
        if(pagedData.data.length > 0){
        this.totalRow2(this.gridApi2, this.rowsT2);
        }
        // for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
        //   this.rowsT2[(index)] = { CIE10: '', Diagnostico: '' };
        // }
      }else{
        this.rowsT2 = pagedData.data;
        console.log(415, this.rowsT2)
        if(this.gridApi2){
          this.totalRow2(this.gridApi2, this.rowsT2);
        }
        
      }
      this.isLoad--;
    });
  }
  async setPage3(pageInfo: PageInfo) {
    console.log('object')
    
    this.pageNumber3 = pageInfo.offset;
    const rowOffset = pageInfo.offset * pageInfo.pageSize;
    this.page3.pageNumber = Math.floor(rowOffset / this.page3.size);
    this.isLoad++;
    console.log(323, this.page3, rowOffset , this.page3.size);
    await this.getResults(this.page3, this.rows11).subscribe(pagedData => {
      console.log(1188, this.page3, this.rows11);
      // this.rowsT2 = [];
      this.totalElements3 = pagedData.page.totalElements;
      if (pagedData.data.length < pagedData.page.size){
        this.rowsT3 = pagedData.data
        console.log(413, this.rowsT3)
        if(pagedData.data.length > 0){
        this.totalRow3(this.gridApi3, this.rowsT3);
        }
        // for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
        //   this.rowsT2[(index)] = { CIE10: '', Diagnostico: '' };
        // }
      }else{
        this.rowsT3 = pagedData.data;
        console.log(415, this.rowsT3)
        if(this.gridApi3){
          this.totalRow3(this.gridApi3, this.rowsT3);
        }
        
      }
      this.isLoad--;
    });
  }
  public getResults(page: Page, data: any[]) {
    return of(data)
      .pipe(map(d => this.getPagedData(page, data)))
      .pipe(delay(1000 * Math.random()));
  }
  
  private getPagedData(page: Page, data: any[]) {
    // console.log(1151, page, data);
    const pagedData = new PagedData();
    page.totalElements = data.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    // console.log(1157, start, end);
    for (let i = start; i < end; i++) {
      const jsonObj = data[i];
      pagedData.data.push(jsonObj);
    }
    pagedData.page = page;
    console.log(1163, pagedData);
    return pagedData;
  }
  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;
    this.gridColumnApi = params.columnApi;
    this.totalRow1(this.gridApi1, this.rowsT1);
    console.log(445, this.rowsT1);
  }
  onGridReady2(params: GridReadyEvent) {
    this.gridApi2 = params.api;
    this.gridColumnApi = params.columnApi;
    this.totalRow2(this.gridApi2, this.rowsT2);
    console.log(451, this.rowsT2);
  }
  onGridReady3(params: GridReadyEvent) {
    this.gridApi3 = params.api;
    this.gridColumnApi = params.columnApi;
    this.totalRow3(this.gridApi3, this.rowsT3);
    console.log(451, this.rowsT3);
  }
totalRow1(gridApi: GridApi, rows) {
    let result = [{
      aseguradora_nombre: 'TOTAL',
      conteo_lima: 0,
      monto_lima:0 ,
      conteo_chorrillos: 0,
      monto_chorrillos: 0,
      conteo_surco: 0,
      monto_surco: 0,
      monto_total: 0,
      conteo_total: 0
    }];
 console.log(572, rows)
        rows.forEach(function (line) {
          result[0].conteo_lima += Number(line.conteo_lima);
          result[0].monto_lima += Number(line.monto_lima);
          result[0].conteo_chorrillos += Number(line.conteo_chorrillos);
          result[0].conteo_surco += Number(line.conteo_surco);
          result[0].monto_surco += Number(line.monto_surco);
          result[0].monto_total += Number(line.monto_total);
          result[0].conteo_total += Number(line.conteo_total);
        });
  //   });
  // console.log(572, result)
  // gridApi.setPinnedBottomRowData(this.rows16)
    gridApi.setPinnedBottomRowData(result as any);
  }
  totalRow2(gridApi: GridApi, rows) {
    let result = [{
      aseguradora_nombre: 'TOTAL',
      conteo_lima: 0,
      monto_lima:0 ,
      conteo_chorrillos: 0,
      monto_chorrillos: 0,
      conteo_surco: 0,
      monto_surco: 0,
      monto_total: 0,
      conteo_total: 0
    }];
 console.log(566, rows)
        rows.forEach(function (line) {
          result[0].conteo_lima += Number(line.conteo_lima);
          result[0].monto_lima += Number(line.monto_lima);
          result[0].conteo_chorrillos += Number(line.conteo_chorrillos);
          result[0].conteo_surco += Number(line.conteo_surco);
          result[0].monto_surco += Number(line.monto_surco);
          result[0].monto_total += Number(line.monto_total);
          result[0].conteo_total += Number(line.conteo_total);
        });
  //   });
  // console.log(572, result)
  // gridApi.setPinnedBottomRowData(this.rows16)
    gridApi.setPinnedBottomRowData(result as any);
  }
  totalRow3(gridApi: GridApi, rows) {
    let result = [{
      aseguradora_nombre: 'TOTAL',
      conteo_lima: 0,
      monto_lima:0 ,
      conteo_chorrillos: 0,
      monto_chorrillos: 0,
      conteo_surco: 0,
      monto_surco: 0,
      monto_total: 0,
      conteo_total: 0
    }];
 console.log(593, rows)
        rows.forEach(function (line) {
          result[0].conteo_lima += Number(line.conteo_lima);
          result[0].monto_lima += Number(line.monto_lima);
          result[0].conteo_chorrillos += Number(line.conteo_chorrillos);
          result[0].conteo_surco += Number(line.conteo_surco);
          result[0].monto_surco += Number(line.monto_surco);
          result[0].monto_total += Number(line.monto_total);
          result[0].conteo_total += Number(line.conteo_total);
        });
  //   });
  // console.log(572, result)
  // gridApi.setPinnedBottomRowData(this.rows16)
    gridApi.setPinnedBottomRowData(result as any);
  }
  setPage(pageInfo) {
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      anio: this.anio,
      mes: this.mes,
      periodo:this.periodo,
      convenio:this.convenio,
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading();
    this.tableApiservice.GpricGetResumen(this.parameters).subscribe(
      (response) => {
        this.rows = [];
        
        if(response.data.success){
          this.data = response.data ? response.data : [];
          this.message = this.data.titulo;
          this.title = response.data.title;
  
          // this.columns = this.data.cabeceras_ingresos_TPac;
          // this.rows = this.data.tabla_ingresos_TPac;
          // // this.temp = this.rows;
          this.columns1 = this.data.tabla_KPI_RESUMEN_soles.cabeceras;
          this.columns1.map(item => {
            console.log(301, this.columns1)
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field === 'monto_lima' || subitem.field === 'monto_chorrillos' || subitem.field === 'monto_surco' || subitem.field === 'monto_total'){
                  subitem.cellRenderer = this.CurrencyCellRendererPEN
                }
             })
            }
          })
          console.log(250, this.columns1)
          this.rows1 = this.data.tabla_KPI_RESUMEN_soles.tabla;
          this.columns2 = this.data.tabla_KPI_RESUMEN_SALUDPOL_soles.cabeceras;
          this.columns2.map(item => {
            console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field === 'monto_lima' || subitem.field === 'monto_chorrillos' || subitem.field === 'monto_surco' || subitem.field === 'monto_total'){
                  subitem.cellRenderer = this.CurrencyCellRendererPEN
                }
             })
            }
          })
          this.rows2 = this.data.tabla_KPI_RESUMEN_SALUDPOL_soles.tabla;
          this.columns3 = this.data.tabla_cobranzas_periodo_emision_soles.cabeceras;
          this.rows3 = this.data.tabla_cobranzas_periodo_emision_soles.tabla;

          this.columns4 = this.data.tabla_cobranzas_periodo_emision_cantidad.cabeceras;
          this.rows4 = this.data.tabla_cobranzas_periodo_emision_cantidad.tabla;

          // this.rows4filtered = this.rows4.filter(item => item.sucursal === 'TODAS');

          this.columns5 = this.data.tabla_cobranzas_empresa_mixto.cabeceras;
          this.columns5.map(item => {
           
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field === 'monto_lima' || subitem.field === 'monto_chorrillos' || subitem.field === 'monto_surco' || subitem.field === 'monto_total'){
                  subitem.cellRenderer = this.CurrencyCellRendererPEN
                  // subitem.setPinnedBottomRowData =  {function(params)  { 
                  //   console.log(291,params)
                  //   return '<strong>' + params.data.monto_lima + '</strong>'
                  // }}
                  
                }
             });
             
            }
            
          }) 
          // console.log(301, this.columns5)
          this.rows5 = this.data.tabla_cobranzas_empresa_mixto.tabla;
          this.setPage1({
            offset: 0,
            pageSize: 0,
            limit: 10,
            count: 0
          });
          this.temp5 = this.rows5;

          this.columns6 = this.data.tabla_expedientes_facturados_periodo_soles.cabeceras;
          this.rows6 = this.data.tabla_expedientes_facturados_periodo_soles.tabla;

          this.columns7 = this.data.tabla_expedientes_facturados_periodo_cantidad.cabeceras;
          this.rows7 = this.data.tabla_expedientes_facturados_periodo_cantidad.tabla;

          this.columns8 = this.data.tabla_expedientes_facturados_empresa_mixto.cabeceras;
          this.columns8.map(item => {
            // console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field === 'monto_lima' || subitem.field === 'monto_chorrillos' || subitem.field === 'monto_surco' || subitem.field === 'monto_total'){
                  subitem.cellRenderer = this.CurrencyCellRendererPEN
                }
             })
            }
          })
          this.rows8 = this.data.tabla_expedientes_facturados_empresa_mixto.tabla;
          this.setPage2({
            offset: 0,
            pageSize: 0,
            limit: 10,
            count: 0
          });
          this.temp8 = this.rows8;
          this.columns9 = this.data.tabla_expedientes_pendientes_periodo_soles.cabeceras;
          this.rows9 = this.data.tabla_expedientes_pendientes_periodo_soles.tabla;
          this.columns10 = this.data.tabla_expedientes_pendientes_periodo_cantidad.cabeceras;
          this.rows10 = this.data.tabla_expedientes_pendientes_periodo_cantidad.tabla;

          this.columns11 = this.data.tabla_expedientes_pendientes_empresa_mixto.cabeceras;
          this.columns11.map(item => {
            // console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                subitem.cellRenderer= 'buttonRenderer',
                subitem.cellRendererParams=  {
                  onClick: this.openClicked.bind(this),
                  sucursal: item.headerName,
                  field: subitem.field
                }
             })
            }
          })
          console.log(303, this.columns11)
          this.rows11 = this.data.tabla_expedientes_pendientes_empresa_mixto.tabla;
          this.setPage3({
            offset: 0,
            pageSize: 0,
            limit: 10,
            count: 0
          });
          this.temp11 = this.rows11;
          this.columns12 = this.data.tabla_expedientes_facturados_SP_periodo_soles.cabeceras;
          this.rows12 = this.data.tabla_expedientes_facturados_SP_periodo_soles.tabla;

          this.columns13 = this.data.tabla_expedientes_facturados_SP_periodo_cantidad.cabeceras;
          this.rows13 = this.data.tabla_expedientes_facturados_SP_periodo_cantidad.tabla;

          this.columns14 = this.data.tabla_expedientes_pendientes_SP_periodo_soles.cabeceras;
          this.rows14 = this.data.tabla_expedientes_pendientes_SP_periodo_soles.tabla;

          this.columns15 = this.data.tabla_expedientes_pendientes_SP_periodo_cantidad.cabeceras;
          this.rows15 = this.data.tabla_expedientes_pendientes_SP_periodo_cantidad.tabla;

          this.columns16 = this.data.cabeceras_ingresos_TPac;
          this.rows16 = this.data.tabla_ingresos_TPac;

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
  openClicked(e) {    
    if ( e.rowData !== undefined){
       const parameters = {
        campo:'SS_SG_Expediente.IdAseguradora',
        idCampo: e.rowData.id_aseguradora,
        estado: 'PENDIENTE',
        sede: e.idSede,
      }
      // console.log(361, e.rowData)
        this.loading();
        this.tableApiservice.GpricGetExpedientesPendiemtesDetalle(parameters).subscribe(
          (response) =>{ console.log(1155, response);
            const data = {
              data: response.data,
              nombre:  e.rowData.aseguradora_nombre,
              sucursal:  e.sede
            }
            // this.columnsPendientes = response.data.cabeceras;
            // this.rowsPendientes = response.data.tabla_expediente_detalle;
            // this.sede = this.rowsPendientes[0].sucursalNombre;
            // this.rowsPendientes.map(item=>{
            
            // })
            // data.push(e.rowData.id_aseguradora)
            // console.log(584, this.rowsPendientes);
            const  modalRef =  this.modalService.open(RowDetalleComponent, {
              size: <any>"xl",
            });
            // console.log( 139, e)
            modalRef.componentInstance.dato = data;
            Swal.close();
        });
        // this.modalService.open(this.rowsPendientes, {size: <any>"xl", ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        
        //   console.log(this.rowsPendientes);
        //   this.closeResult = `Closed with: ${result}`;
        // }, (reason) => {
        //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // });

    }
  }
  CurrencyCellRendererPEN(params: any) {
    var inrFormat = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
  copyTableToClipboard(numberTabla){
    if(numberTabla === 1){
      this.rows1.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
     });
      this.exportService.exportToClipboard(this.rows1, this.columns1);
    }else if (numberTabla === 2){
      this.rows2.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
     });
      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }else if (numberTabla === 3){
      console.log(526, this.rows3)
      this.rows3.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows3, this.columns3);
    }else if (numberTabla === 4){
      this.rows4.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows4, this.columns4);
    }else if (numberTabla === 5){

      this.rows5.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportToClipboard(this.rows5, this.columns5);
    }else if (numberTabla === 6){
      this.rows6.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows6, this.columns6);
    }else if (numberTabla === 7){
      this.rows7.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows7, this.columns7);
    }else if (numberTabla === 8){
      this.rows8.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportToClipboard(this.rows8, this.columns8);
    }else if (numberTabla === 9){
      this.rows9.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows9, this.columns9);
    }else if (numberTabla === 10){
      this.rows10.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows10, this.columns10);
    }else if (numberTabla === 11){
      this.rows11.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportToClipboard(this.rows11, this.columns11);
    }else if (numberTabla === 12){
      this.rows12.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows12, this.columns12);
    }else if (numberTabla === 13){
      this.rows13.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportToClipboard(this.rows13, this.columns13);
    }else if (numberTabla === 14){
      this.rows14.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows14, this.columns14);
    }else if (numberTabla === 15){
      this.rows15.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportToClipboard(this.rows15, this.columns15);
    }else if (numberTabla === 16){
      this.rows16.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
       });
      this.exportService.exportToClipboard(this.rows16, this.columns16);
    }else if (numberTabla === 17){
      this.rowsPendientes.map(item=>{
        item.MontoTotal = typeof item.MontoTotal === 'number' ? item.MontoTotal : Number(item.MontoTotal);
       });
      this.exportService.exportTableElmToExcel(this.rowsPendientes, this.columnsPendientes);
    }
  }
  exportToExcel(numberTabla): void {
    if(numberTabla === 1){
      this.rows1.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
     });
      this.exportService.exportTableElmToExcel(this.rows1, '');
    }else if (numberTabla === 2){
      this.rows2.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
     });
      this.exportService.exportTableElmToExcel(this.rows2, '');
    }else if (numberTabla === 3){
      console.log(526, this.rows3)
      this.rows3.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows3, '');
    }else if (numberTabla === 4){
      this.rows4.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows4, '');
    }else if (numberTabla === 5){

      this.rows5.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportTableElmToExcel(this.rows5, '');
    }else if (numberTabla === 6){
      this.rows6.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows6, '');
    }else if (numberTabla === 7){
      this.rows7.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows7, '');
    }else if (numberTabla === 8){
      this.rows8.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportTableElmToExcel(this.rows8, '');
    }else if (numberTabla === 9){
      this.rows9.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows9, '');
    }else if (numberTabla === 10){
      this.rows10.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows10, '');
    }else if (numberTabla === 11){
      this.rows11.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportTableElmToExcel(this.rows11, '');
    }else if (numberTabla === 12){
      this.rows12.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows12, '');
    }else if (numberTabla === 13){
      this.rows13.map(item=>{
        item.conteo_lima = typeof item.conteo_lima === 'number' ? item.conteo_lima : Number(item.conteo_lima);
        item.monto_lima = typeof item.monto_lima === 'number' ? item.monto_lima : Number(item.monto_lima);
        item.conteo_chorrillos = typeof item.conteo_chorrillos === 'number' ? item.conteo_chorrillos : Number(item.conteo_chorrillos);
        item.monto_chorrillos = typeof item.monto_chorrillos === 'number' ? item.monto_chorrillos : Number(item.monto_chorrillos);
        item.conteo_surco = typeof item.conteo_surco === 'number' ? item.conteo_surco : Number(item.conteo_surco);
        item.monto_surco = typeof item.monto_surco === 'number' ? item.monto_surco : Number(item.monto_surco);
        item.conteo_total = typeof item.conteo_total === 'number' ? item.conteo_total : Number(item.conteo_total);
        item.monto_total = typeof item.monto_total === 'number' ? item.monto_total : Number(item.monto_total);
       });
      this.exportService.exportTableElmToExcel(this.rows13, '');
    }else if (numberTabla === 14){
      this.rows14.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows14, '');
    }else if (numberTabla === 15){
      this.rows15.map(item=>{
        item.Lima = typeof item.Lima === 'number' ? item.Lima : Number(item.Lima);
        item.Chorrillos = typeof item.Chorrillos === 'number' ? item.Chorrillos : Number(item.Chorrillos);
        item.Surco = typeof item.Surco === 'number' ? item.Surco : Number(item.Surco);
        item.Total = typeof item.Total === 'number' ? item.Total : Number(item.Total);
       });
      this.exportService.exportTableElmToExcel(this.rows15, '');
    }else if (numberTabla === 16){
      this.rows16.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
       });
      this.exportService.exportTableElmToExcel(this.rows16, '');
    }else if (numberTabla === 17){
      this.rowsPendientes.map(item=>{
        item.MontoTotal = typeof item.MontoTotal === 'number' ? item.MontoTotal : Number(item.MontoTotal);
       });
      this.exportService.exportTableElmToExcel(this.rowsPendientes, '');
    }
  }

  filter() {
    this.action = true;
        const form = this.filtroForm.value;
          this.anio = form.anio;
          this.mes = form.mes;
          this.convenio = form.convenio
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
  tipoChange(event){
    console.log(751, event);
    const input = event;
    // this.especialidad = input;
    // this.temp = this.rows1;rows2filtered
      if (input === 'TODAS') {
        this.rows4filtered = this.rows4.filter(item => item.sucursal === 'TODAS');
       } else if (input === 'LIMA'){
        this.rows4filtered = this.rows4.filter(item =>item.sucursal === 'LIMA');
       } else if (input === 'CHORRILLOS'){
        this.rows4filtered = this.rows4.filter(item =>item.sucursal === 'CHORRILLOS');
       } else if (input === 'SURCO'){
        this.rows4filtered = this.rows4.filter(item =>item.sucursal === 'SURCO');
       }

    
  }
  updateFilter(event, tabla) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      if(tabla === 5){
        const filtered = this.rows5
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
          );
          // console.log(filtered);
        this.rows5 = [...filtered]
      }else if(tabla === 8){
        const filtered = this.rows8
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
        this.rows8 = [...filtered]
      }else if(tabla === 11){
        const filtered = this.rows11
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
        this.rows11 = [...filtered]
      }else if(tabla === 17){
        const filtered = this.rowsPendientes
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
        this.rowsPendientes = [...filtered]
      }
      
      
    } else {
      if(tabla === 5){
        this.rows5 = [...this.temp5]
      }else if(tabla === 8){
        this.rows8 = [...this.temp8]
      }else if(tabla === 11){
        this.rows11 = [...this.temp11]
      }else if (tabla === 17){
        this.rowsPendientes = [...this.tempPendientes]
      }
    }
  }
  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
 open({ selected }, sucursal, content?: any){
     console.log(selected, sucursal, content)
      if (sucursal === 'Lima'){
        this.id_sede = '0001';
      }else if (sucursal === 'Chorrillos'){
        this.id_sede = '0002';
      }else if (sucursal === 'Surco'){
        this.id_sede = '0004';
      }else if (sucursal === 'Total'){
        this.id_sede = '0000';
      }
    if (selected !== undefined){
      // this.sede = sucursal;
       console.log(1141, content);
       const parameters = {
        campo:'SS_SG_Expediente.Periodo',
        idCampo: this.periodo,
        estado: 'PENDIENTE',
        sede: this.id_sede,
      }
      if(parameters.sede !== null && parameters.sede !== undefined){
        this.loading();
        this.tableApiservice.GpricGetExpedientesPendiemtesDetalle(parameters).subscribe(
          (response) =>{ console.log(1155, response);
            if(response.data.success){
              this.columnsPendientes = response.data.cabeceras;
              this.rowsPendientes = response.data.tabla_expediente_detalle;
              this.tempPendientes = this.rowsPendientes
              this.sede = this.rowsPendientes[0].sucursalNombre;
            }
            
            // this.rowsPendientes.map(item=>{
            
            // })
            // console.log(584, this.rowsPendientes);
            Swal.close();
        });
      }

      
    }else{
      this.modalService.open(content, {size: <any>"xl", ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        
        console.log(content);
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  summaryForAmount(cells: any){
    // console.log(cells);
    let count: number = 0;
    let re = /\,/gi;
    let re1 = /\S\/./gi;
    let re2 = /\S\//gi;
        
        cells.filter((cell) => {
            cell = cell.toString();
            if (cell != null && cell != undefined) {
              
              if (cell.indexOf('S/') > -1){  
                count = count + +cell.replace(re2, '').replace(',', '');
              }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
              //  console.log(719, typeof cell, count)
                    count = count + +cell.replace(re, '');
                    // console.log(722,cell, count)
              }else if (cell.indexOf('-') > -1) {
                    // count = count + 0;
                    count = count - -cell.replace(re, '');
              }else if (cell.indexOf('(') > -1) {
                let number = cell.replace('(', '').replace(')', '');
                count = count - +number.replace(re, '');
              }
            }
        });
        
        if(!count){
          return count.toString().replace('NaN', 'Total');
        }else if (count.toString().indexOf('.') > -1){

          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : 'S/ ' + count.toLocaleString();
        }else{
          // console.log(515, cells);
          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : 'S/ ' + count.toLocaleString();
        }
  }
  summaryForAmount2(cells: any){
    // console.log(cells);
    let count: number = 0;
    let re = /\,/gi;
    let re1 = /\S\/./gi;
    let re2 = /\S\//gi;
        
        cells.filter((cell) => {
            cell = cell.toString();
            if (cell != null && cell != undefined) {
              
              if (cell.indexOf('S/') > -1){  
                count = count + +cell.replace(re2, '').replace(',', '');
              }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
              //  console.log(719, typeof cell, count)
                    count = count + +cell.replace(re, '');
                    // console.log(722,cell, count)
              }else if (cell.indexOf('-') > -1) {
                    // count = count + 0;
                    count = count - -cell.replace(re, '');
              }else if (cell.indexOf('(') > -1) {
                let number = cell.replace('(', '').replace(')', '');
                count = count - +number.replace(re, '');
              }
            }
        });
        
        if(!count){
          return count.toString().replace('NaN', 'Total');
        }else if (count.toString().indexOf('.') > -1){

          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : 'S/ ' + count.toLocaleString();
        }else{
          // console.log(515, cells);
          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count.toLocaleString();
        }
  }
  private summaryNull(cells: any): string {
    // if (cells[0] !== 'TODAS' && cells[0] !== 'LIMA' && cells[0] !== 'CHORRILLOS' && cells[0] !== 'SURCO'){
    //   console.log(739, cells.cell)
    //     return 'TOTAL';
    // }
    return 'TOTAL';
  }
}

