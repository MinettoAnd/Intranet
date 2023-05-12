import { delay, map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { FacturacionService } from '../../../_services/facturacion.service';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import { CurrencyPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';
import {FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, PaginationChangedEvent} from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RowDetalleComponent } from 'src/app/modals/jpric/row-detalle/row-detalle.component';
import { LinkRendererComponent } from 'src/app/shared/components/renderer/link-renderer.component';
import { PagedData } from '../../../models/forms-data/paged-data';

interface PageInfo {
  offset: number;
  pageSize: number;
  limit: number;
  count: number;
}
@Component({
  selector: 'app-reporte-expedientes',
  templateUrl: './reporte-expedientes.component.html',
  styleUrls: ['./reporte-expedientes.component.scss']
})

export class ReporteExpedientesComponent implements OnInit {
  active = 1;
  closeResult = '';
  @ViewChild("agGrid") agGrid: AgGridAngular;

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
  private isLoading: boolean = true;
  action: boolean = false;
  private baseChart: ElementRef;
  // private baseChart2: ElementRef;
  color = [ 'graph-primary', 'primary','graph-tertiary', 'graph-quaternary '];
  public isCollapsed1 = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public isCollapsed5 = false;
  public isCollapsed6 = false;
  public isCollapsed7 = false;
  public isCollapsed8 = false;
  public isCollapsed9 = false;
  public isCollapsed10 = false;
  public isCollapsed11 = false;

  public chartLabels1 = [];
  public chartLabels2 = [];

  public chartData1 = [];
  public chartData2 = [];
  public chartData3 = [];
  selectedOptionTipo='cantidad';
  selectedOptionTipo2='cantidad';
  progressBarLabels;
  progressBar1;
  total_monto;
  monto_prom_alta;
  monto_prom_alta_dia;
  totales;
  id_sede = '0000';
 sede;
 sucursal;
 CodigoEstado;
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  enableSummary = true;
  summaryPosition = 'bottom';
  public breadcrumb: any;
  parameters;
  resumenMes:any = {
    success: '',
    total: '',
    ausentismo: '',
    medico: '',
    paciente: '',
    anuladas: '',
    reservadas: ''
  };
  resumenMesAnterior:any = {
    success: '',
    total: '',
    ausentismo: '',
    medico: '',
    paciente: '',
    anuladas: '',
    reservadas: ''
  };
  resumenMontos = {
    ciasegcon: '',
    instipriva: '',
    mani: '',
    otros: '',
    tarjeta: '',
    montoTotal: '',
  };
  private rowClassRules;
  private aggfunc;
  columns1: any;
  rows1: any[];
  rows1filtered: any;
  rows3filtered: any;
  columns2: any[];
  rows2: any[];
  especialidades: any;
  temp1: any[];
  temp2: any[];
  temp3: any[];

  tempRowsMedicos: any[];
  rowsFilter: any[];
  columns3: any[];
  rows3: any[];
  ColumnMode = ColumnMode;
  columns4: any;
  rows4: any;
  // temp2: any;
  rowsFilter2: any;
  columns5: any;
  rows5: any[];
  columns6: any;
  rows6: any[];
  columns7: any;
  rows7: any[];
  columns8: any;
  rows8: any[];
  columns9: any;
  rows9: any[];
  columns10: any;
  rows10: any[];

  columns11: any;
  rows11: any[];
  columns12: any;
  rows12: any[];
  columns13: any;
  rows13: any[];
  columns14: any;
  rows14: any[];
  columns15: any;
  rows15: any[];
  columns16: any;
  rows16: any[];
  columns17: any;
  rows17: any[];

  medicos = false;
  rowsModal: any[];
  columnsModal: any[];
  rowsTemp: any[];
  filtered: any;
  detalleAnual: any;
  especialidad: any;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  page1 = new Page();
  page2 = new Page();
  page3 = new Page();
  page4 = new Page();
  selected = [];
  SelectionType = SelectionType;
  porcMedico;
  porcPaciente;
  porcAnuladas;
  frameworkComponents;
  tooltipShowDelay;
  defaultColDef;
  style = {
      width: "100%",
      height: "100%",
      flex: "1 1 auto",
  };
  changeTable: boolean;
  convenio:string = '000000';
  origen:string= '0';
  data:any;
  message;
  title;
  isLoad = 0;
  private gridApi1!: GridApi;
  private gridApi2!: GridApi;
  private gridColumnApi;
  public paginationPageSize = 10;
  totalElements1: number;
  pageNumber1: number;
  totalElements2: number;
  pageNumber2: number;
  rowsT1: any[];
  rowsT2: any[];
  
  constructor(private tableApiservice: FacturacionService, private exportService: ExportService,
    private _cp: CurrencyPipe, private modalService: NgbModal) { 
      this.page1.pageNumber = 0;
      this.page1.size = 10;
      this.page2.pageNumber = 0;
      this.page2.size = 10;
      this.page3.pageNumber = 0;
      this.page3.size = 10;
      this.page4.pageNumber = 0;
      this.page4.size = 10;
      this.pageNumber1 = 0
    this.filtroForm = new FormGroup({
      id_sede: new FormControl(this.id_sede),
      mes: new FormControl(this.mes),
      anio: new FormControl(this.anio),
      convenio: new FormControl(this.convenio),
      origen: new FormControl(this.origen),
    });
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
        //  console.log(301, params); 
        var totales;
        if(params.data.aseguradora_Nombre !== undefined){
          totales = params.data.aseguradora_Nombre;
        }else if(params.data.aseguradoraNombre !== undefined){
          totales = params.data.aseguradoraNombre;
        }
        return totales === 'TOTAL';
      },
    };
    // this.aggfunc = (params: any) => {
    //   console.log(248, params)
    //   var amtTotal = 0; 
    //   params.values.forEach((value: { totalAmt: number }) =>
    //   { 
    //     if (value && value.totalAmt) {
    //      amtTotal += value.totalAmt;
    //   }
    //   });
    //   var total = (amtTotal / 100000);
    //   return {
    //   totalAmt: amtTotal,
    //   toString: () => { return (amtTotal) ? (total).toFixed(2) : '' }
      
    //   } 
    // }
  //   const calcTotalCols = ['monto_total'];
  //   const totalRow = function(api) {
  //     let result = [{}];
  //     // initialize all total columns to zero
  //     calcTotalCols.forEach(function (params){
  //         result[0][params] = 0
  //     });
  //    // calculate all total columns
  //     calcTotalCols.forEach(function (params){
  //         this.rows16.forEach(function (line) {
  //             result[0][params] += line[params];
  //         });
  //     });
  //     api.setPinnedBottomRowData(result);
  // }
  // const gridOptions = {
  //   columnDefs: this.columns16,
  //   rowData: this.rows16
  // };
    this.frameworkComponents = {
      buttonRenderer: LinkRendererComponent,
    }
    this.changeTable = false;
  }
  ngOnInit(){

    // this.setPage({ offset: 0 });
  }
  CurrencyCellRendererPEN(params: any) {
    // console.log(251, params)
    var inrFormat = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
async setPage1(pageInfo: PageInfo) {
    this.pageNumber1 = pageInfo.offset;
    const rowOffset = pageInfo.offset * pageInfo.pageSize;
  
    this.page1.pageNumber = Math.floor(rowOffset / this.page1.size);
    this.isLoad++;
    console.log(323, this.page1, rowOffset , this.page1.size);
    // if (this.page1.pageNumber === 'NaN'){

    // }
   await this.getResults(this.page1, this.rows11).subscribe(  pagedData => {
      console.log(1187, this.page1, this.rows11);
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
    }
    

  }
  async setPage2(pageInfo: PageInfo) {
    console.log('object')
    
    this.pageNumber2 = pageInfo.offset;
    const rowOffset = pageInfo.offset * pageInfo.pageSize;
    this.page2.pageNumber = Math.floor(rowOffset / this.page2.size);
    this.isLoad++;
    console.log(323, this.page2, rowOffset , this.page2.size);
    await this.getResults(this.page2, this.rows16).subscribe(pagedData => {
      console.log(1188, this.page2, this.rows16);
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

totalRow1(gridApi: GridApi, rows) {
    let result = [{
      aseguradoraNombre: 'TOTAL',
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
      aseguradoraNombre: 'TOTAL',
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
  filter() {
    this.action = true
    const form = this.filtroForm.value;
      this.id_sede = form.id_sede,
      this.mes = form.mes,
      this.anio = form.anio,
      this.periodo_consulta = form.anio + form.mes,
      this.convenio = form.convenio,
      this.origen = form.origen,
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


  // window.onload = function() {
  //   var ctx = document.getElementById('myChart').getContext('2d');
  //   window.myChart = new Chart(ctx, config);
  // };
  getCellClass({ row, column, value }): any {
    // const myArray = value.split(" ");
    if( value !== undefined){
      value = value.replace(',','');
      value = value.replace('S/.','');
      value = value.replace('%','');

    }
    return {
      'cell-red': Number(value) < 0
    };
  }
  getRowClass(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      'totals': row.Grupo.includes('TOTAL'), 'sub-totals': row.Grupo === 'BOLETA DE VENTA' || row.Grupo === 'FACTURA' || row.Grupo ==='NOTA DE CREDITO'
      || row.Grupo ==='AMBULATORIA' || row.Grupo ==='EMERGENCIA' || row.Grupo ==='HOSPITALIZACION'
    };
  }
  getRowClass1(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      // 'sub-totals': row.condicion.includes('AUSENTISMO') || row.condicion.includes('REPROGRAMACIONES') || row.condicion === 'TURNOS POR INASISTENCIA MEDICA'
    };
  }
  getRowClass3(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }

    // if (row.sucursal !== undefined){
    //   return {
    //     'totals': row.sucursal.includes('TOTAL')
    //   };
    // }else if (row.grupo !== undefined ){
    //   return {
    //     'totals': row.grupo.includes('TOTAL')
    //   };
    // } 
  }
  public onAnioChange(anio: any): void {
    this.anio = anio;
    this.periodo_consulta = this.anio + this.mes;
    // this.setPage({ offset: 0 });
  }
  public onMesChange(mes: any): void {
    this.mes = mes;
    this.periodo_consulta = this.anio + this.mes;
    // this.setPage({ offset: 0 });
  }
  tipoChange(event, tabla){
    console.log(751, event);
    const input = event;
    // this.especialidad = input;
    // this.temp = this.rows1;rows2filtered
    if (tabla === 'pacientes'){
      if (input === 'cantidad') {
        this.rows1filtered = this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD');
       } else if (input === 'soles'){
        this.rows1filtered = this.rows1.filter(item =>item.GRUPO3 === 'SOLES');
       }
    } else if (tabla === 'empresas'){
      if (input === 'cantidad') {
        this.rows3filtered = this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD');
       } else if (input === 'soles'){
        this.rows3filtered = this.rows3.filter(item =>item.GRUPOEM === 'SOLES');
       }
    }
    
  }


 setPage(pageInfo) {
      console.log(pageInfo);
      // this.page.pageNumber = pageInfo.offset;
      this.parameters = {
        // meses: this.mes,
        anio: this.anio,
        mes: this.mes,
        periodo:this.periodo_consulta,
        convenio: this.convenio,
        origen: this.origen,
        sede: this.id_sede,

        // pageNumber: this.page.pageNumber,
        // size: this.page.size
      };

      this.loading();
      this.tableApiservice.getFacReporteExpedientes(this.parameters).subscribe(
          (response) => {
            if(response.data.success){
              // console.log(301, response.data.success)
              this.data = response.data ? response.data : [];
              this.title = this.data.titulo;
              this.total_monto = this.data.total_monto
              this.monto_prom_alta = this.data.monto_prom_alta
              this.monto_prom_alta_dia = this.data.monto_prom_alta_dia
              this.columns1 = this.data.cabeceras_expedientes_facturado_tdoc_soles
              this.rows1 = this.data.tabla_expedientes_facturado_tdoc_soles

              this.columns2 = this.data.cabeceras_expedientes_facturado_tdoc_cantidad
              this.rows2 = this.data.tabla_expedientes_facturado_tdoc_cantidad

              this.columns3 = this.data.cabeceras_expedientes_facturado_soles
              this.rows3 = this.data.tabla_expedientes_facturado_soles

              this.columns4 = this.data.cabeceras_expedientes_facturado_cantidad
              this.rows4 = this.data.tabla_expedientes_facturado_cantidad

              this.columns5 = this.data.cabeceras_expedientes_facturado_tpac_soles
              this.rows5 = this.data.tabla_expedientes_facturado_tpac_soles

              this.columns6 = this.data.cabeceras_expedientes_facturado_tpac_cantidad
              this.rows6 = this.data.tabla_expedientes_facturado_tpac_cantidad

              this.columns7 = this.data.cabeceras_expedientes_HTServ_soles
              this.rows7 = this.data.tabla_expFacturado_HTServ_soles

              this.columns8 = this.data.cabeceras_expedientes_HTServ_cantidad
              this.rows8 = this.data.tabla_expFacturado_HTServ_cantidad

              this.columns9 = this.data.cabeceras_expedientes_HTServPromDiaPac_soles
              this.rows9 = this.data.tabla_expFacturado_HTServPromDiaPac_soles

              this.columns10 = this.data.cabeceras_expedientes_HTServ_cantidadTotal
              this.rows10 = this.data.tabla_expFacturado_HTServ_cantidadTotal



              this.columns11 = this.data.cabeceras_expedientes_facturado_emp
              this.columns11.map(item => {
                
                if(item.children){
                  item.children.map(subitem =>{
                    if(subitem.field !== 'tipoPaciente_Nombre' && subitem.field !== 'aseguradora_Nombre' && subitem.field !== 'conteo_lima' && subitem.field !== 'conteo_chorrillos' && subitem.field !== 'conteo_surco' && subitem.field !== 'conteo_total' ){
                      subitem.cellRenderer = this.CurrencyCellRendererPEN
                    }
                  })
                }
              })
              this.rows11 = this.data.tabla_expedientes_facturado_emp
              this.setPage1({
                offset: 0,
                pageSize: 0,
                limit: 10,
                count: 0
              });
              this.temp1 = this.rows11;

              this.columns12 = this.data.cabeceras_expedientes_pendientes_soles
              this.rows12 = this.data.tabla_expedientes_pendientes_soles
              this.columns13 = this.data.cabeceras_expedientes_pendientes_cantidad
              this.rows13 = this.data.tabla_expedientes_pendientes_cantidad
              this.columns14 = this.data.cabeceras_expedientes_pendientes_estado_soles
              this.rows14 = this.data.tabla_expedientes_pendientes_estado_soles
              this.columns15 = this.data.cabeceras_expedientes_pendientes_estado_cantidad
              this.rows15 = this.data.tabla_expedientes_pendientes_estado_cantidad
              this.columns16 = this.data.cabeceras_expedientes_pendientes_aseguradora
              // this.columns16.map(item => {
              //   // console.log(301, item)
              //   if(item.children){
              //     item.children.map(subitem =>{
              //       if(subitem.field !== 'idEmpresaAseguradora' && subitem.field !== 'aseguradoraNombre' && subitem.field !== 'conteo_lima' && subitem.field !== 'conteo_chorrillos' && subitem.field !== 'conteo_surco' && subitem.field !== 'conteo_total' ){
              //         subitem.cellRenderer = this.CurrencyCellRendererPEN
              //       }
              //     })
              //   }
              // })
              this.rows16 = this.data.tabla_expedientes_pendientes_aseguradora
              this.setPage2({
                offset: 0,
                pageSize: 0,
                limit: 10,
                count: 0
              });
              this.columns16.map(item => {
                // console.log(301, item)
                if(item.children){
                  item.children.map(subitem =>{
                    subitem.cellRenderer= 'buttonRenderer',
                    subitem.cellRendererParams=  {
                      onClick: this.openClicked.bind(this),
                      sucursal: item.headerName,
                      field: subitem.field
                    }
                    // if(subitem.aggFunc === 'sum'){
                      // subitem.aggFunc = this.aggfunc
                      // subitem.aggFunc = (params: any) => {
                      //   console.log(476, params)
                      //   var amtTotal = 0; 
                      //   params.values.forEach((value: { totalAmt: number }) =>
                      //   { 
                      //     if (value && value.totalAmt) {
                      //      amtTotal += value.totalAmt;
                      //   }
                      //   });
                      //   var total = (amtTotal / 100000);
                      //   return {
                      //   totalAmt: amtTotal,
                      //   toString: () => { return (amtTotal) ? (total).toFixed(2) : '' }
                        
                      //   } 
                      // }
                    // }
                 })
                 
                }
              })
              
              this.temp2 = this.rows16;
              this.columns17 = this.data.cabeceras_expedientes_facturado_alta_lista
              this.rows17 = this.data.tabla_expedientes_facturado_alta_lista
              this.temp3 = this.rows17;
              // this.resumenMes = response.data;
              
              //  this.porcMedico =  ( this.resumenMes.medico / this.resumenMes.ausentismo) * 100;
              //   this.porcPaciente = (this.resumenMes.paciente / this.resumenMes.ausentismo) * 100;
              //   this.porcAnuladas = (this.resumenMes.anuladas / this.resumenMes.ausentismo) * 100;
              

                
            }
            console.log('object')
            Swal.close();
          },
          (error) => {
              Swal.close();
          }
        );

  }

  // onPageSizeChanged() {
  //   var value = (document.getElementById('page-size') as HTMLInputElement)
  //     .value;
  //     console.log(497, this.gridApi);
  //   this.gridApi.paginationSetPageSize(Number(value));

  // }
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
    }if(numberT === '4'){
      if (limit === '0'){
        this.page4.size = this.page4.totalElements;
        // console.log(this.page.totalElements);
        return
      }
      this.page4.size = parseInt(limit, 10);
    }
    

  }

  separadorDeMiles(numero) {
    let partesNumero = numero.toString().split('.');
  
    partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return partesNumero.join('.');
  }
  
    copyTableToClipboard(numberTabla){
      if(numberTabla === 1){
        this.exportService.exportToClipboard(this.rows1, this.columns1);
      }else if (numberTabla === 2){
        this.exportService.exportToClipboard(this.rows2, this.columns2);
      }else if (numberTabla === 3){
        this.exportService.exportToClipboard(this.rows3, this.columns3);
      }else if (numberTabla === 4){
        this.exportService.exportToClipboard(this.rows4, this.columns4);
      }else if (numberTabla === 5){
        this.exportService.exportToClipboard(this.rows5, this.columns5);
      }else if (numberTabla === 6){
        this.exportService.exportToClipboard(this.rows6, this.columns6);
      }else if (numberTabla === 7){
        this.exportService.exportToClipboard(this.rows7, this.columns7);
      }else if (numberTabla === 8){
        this.exportService.exportToClipboard(this.rows8, this.columns8);
      }else if (numberTabla === 9){
        this.exportService.exportToClipboard(this.rows9, this.columns9);
      }else if (numberTabla === 10){
        this.exportService.exportToClipboard(this.rows10, this.columns10);
      }else if (numberTabla === 11){
        this.exportService.exportToClipboard(this.rowsModal, this.columnsModal);
      }
      
    }
  
    exportToExcel(numberTabla): void {
      if(numberTabla === 1){
        this.exportService.exportTableElmToExcel(this.rows1, 'MENSUAL - INGRESOS POR CUOTAS-INGRESO SIN IGV');
      }else if (numberTabla === 2){
        this.exportService.exportTableElmToExcel(this.rows2, 'MENSUAL - INGRESOS POR CUOTAS-INGRESO SIN IGV');
      }else if (numberTabla === 3){
        this.exportService.exportTableElmToExcel(this.rows3, 'MENSUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 4){
        this.exportService.exportTableElmToExcel(this.rows4, 'ANUAL - INGRESOS POR CUOTAS-INGRESO SIN IGV');
      }else if (numberTabla === 5){
        this.exportService.exportTableElmToExcel(this.rows5, 'ANUAL - INGRESOS POR CUOTAS-INGRESO SIN IGV');
      }else if (numberTabla === 6){
        this.exportService.exportTableElmToExcel(this.rows6, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 7){
        this.exportService.exportTableElmToExcel(this.rows7, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 8){
        this.exportService.exportTableElmToExcel(this.rows8, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 9){
        this.exportService.exportTableElmToExcel(this.rows9, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 10){
        this.exportService.exportTableElmToExcel(this.rows10, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 11){
        this.exportService.exportTableElmToExcel(this.rowsModal, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }
      
    }

    updateFilter1(event, selectedOption) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows11
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows11 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows11 = [...this.temp1]
       
      }
    }
    updateFilter2(event, selectedOption) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows16
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows16 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows16 = [...this.temp2]
       
      }
    }
    updateFilter3(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows17
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows17 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows17 = [...this.temp3]
       
      }
    }

    // onSelect({ selected }) {
    //   this.medicos = true;
    //   const parameters = {
    //     idEspecialidad: selected[0].id_esp,
    //     AnioF: this.anio,
    //     MesF: this.mes,
    //     SedeF: this.id_sede,
    //     CheckF: 1
    //   }
    //   this.loading();
    //   this.tableApiservice.getFacExpedientesDetalle(parameters).subscribe(
    //     (response) =>{
    //       this.columnsModal = response.data.cabeceras;
    //       this.rowsModal = response.data.tabla_medicos_anual;
    //       this.tempRowsMedicos = this.rowsModal
    //       Swal.close();
    //     },
    //     (error) => {
    //         Swal.close();
    //     }
    //   );

    // }
    onActivate(event) {
      // console.log('Activate Event', event);
    }
    openClicked(e) {    
      if ( e.rowData !== undefined){
         const parameters = {
          campo:'SS_SG_Expediente.IdAseguradora',
          idCampo: e.rowData.idEmpresaAseguradora,
          estado: 'PENDIENTE',
          sede: e.idSede,
        }
        console.log(361, e.rowData)
          this.loading();
          this.tableApiservice.getFacExpedientesDetalle(parameters).subscribe(
            (response) =>{ console.log(1155, response);
              if(response.data.success){
                const data = {
                  data: response.data,
                  nombre:  e.rowData.aseguradoraNombre,
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
              }
              
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
  open({ selected }, sucursal, content?: any){
    
       if (sucursal === 'Lima'){
          this.sede = '0001';
          this.sucursal = sucursal;
        }else if (sucursal === 'Chorrillos'){
          this.sede = '0002';
          this.sucursal = sucursal;
        }else if (sucursal === 'Surco'){
          this.sede = '0004';
          this.sucursal = sucursal;
        }else if (sucursal === 'Total'){
          this.sede = '0000';
          this.sucursal = 'Todas las Sedes';
        }
      if (selected !== undefined){
        console.log(732, selected)
         this.CodigoEstado = selected[0].CodigoEstado ? selected[0].CodigoEstado : selected[0].Periodo;
         
         const parameters = {
          campo: selected[0].CodigoEstado ? 'GE_EstadoDocumento.CodigoEstado' : 'SS_SG_Expediente.Periodo',
          idCampo: selected[0].CodigoEstado ? selected[0].CodigoEstado : selected[0].Periodo,
          estado: 'PENDIENTE',
          sede:  this.sede,
        }
        if(parameters.sede !== null && parameters.sede !== undefined){
          console.log(754, parameters.sede)
          this.loading();
          this.tableApiservice.getFacExpedientesDetalle(parameters).subscribe(
            (response) =>{ console.log(1155, response);
              if(response.data.success){
                this.columnsModal = response.data.cabeceras;
                this.rowsModal = response.data.tabla_expediente_detalle;
                // this.rowsMedicoRecord.map(item=>{
                //   console.log(item);
                // })
              }
              Swal.close();
          }),
          (error) => {
            console.log(error)
                  Swal.close();
          }
        }
        
        // Swal.close();
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
    myCustomSumFunction(values) {
      // var sum = 0;
      console.log(813, values)
      // const cell = params.value;
      // let count: number = 0;
      // let re = /\,/gi;
      // let re1 = /\S\/./gi;
      // let re2 = /\S\//gi;
      // if (cell != null && cell != undefined) {
                  
      //   if (cell.indexOf('S/') > -1){  
      //     count = count + +cell.replace(re2, '').replace(',', '');
      //   }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
         
      //         count = count + +cell.replace(re, '');
      //         // console.log(722,cell, count)
      //   }else if (cell.indexOf('-') > -1) {
      //     console.log(719, typeof cell, cell)
      //         count = count - -cell.replace(re, '');
      //   }else if (cell.indexOf('(') > -1) {
      //     let number = cell.replace('(', '').replace(')', '');
      //     count = count - +number.replace(re, '');
      //   }
      // }
      // // values.forEach( function(value) {sum += Number(value);} );
      // return count;
    }
    summaryForAmount(cells: any){
      // console.log(1215, cells);
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
                 
                      count = count + +cell.replace(re, '');
                      // console.log(722,cell, count)
                }else if (cell.indexOf('-') > -1) {
                  // console.log(719, typeof cell, cell)
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
    // summaryForAmount2(cells: any){
    //   // console.log(cells);
    //   let count: number = 0;
    //   let re = /\,/gi;
    //   let re1 = /\S\/./gi;
    //   let re2 = /\S\//gi;
          
    //       cells.filter((cell) => {
    //           cell = cell.toString();
    //           if (cell != null && cell != undefined) {
                
    //             if (cell.indexOf('S/') > -1){  
    //               count = count + +cell.replace(re2, '').replace(',', '');
    //             }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
    //             //  console.log(719, typeof cell, count)
    //                   count = count + +cell.replace(re, '');
    //                   // console.log(722,cell, count)
    //             }else if (cell.indexOf('-') > -1) {
    //                   // count = count + 0;
    //                   count = count - -cell.replace(re, '');
    //             }else if (cell.indexOf('(') > -1) {
    //               let number = cell.replace('(', '').replace(')', '');
    //               count = count - +number.replace(re, '');
    //             }
    //           }
    //       });
          
    //       if(!count){
    //         return count.toString().replace('NaN', 'Total');
    //       }else if (count.toString().indexOf('.') > -1){
            
    //           return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : Math.round(count);
            
    //       }else{
    //         // console.log(515, cells);
    //         return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count;
    //       }
    // }
    private summaryNull(cells: any): string {
      // if (cells[0] !== 'TODAS' && cells[0] !== 'LIMA' && cells[0] !== 'CHORRILLOS' && cells[0] !== 'SURCO'){
      //   console.log(739, cells.cell)
      //     return 'TOTAL';
      // }
      return 'TOTAL';
    }
}


