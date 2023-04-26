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
  temp = [];
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
  rows1 = [];
  rows2 = [];
  rows3 = [];
  rows4 = [];
  rows4filtered = [];
  rows5: any;
  rows6 = [];
  rows7 = [];
  rows8 = [];
  rows9 = [];
  rows10: any;
  rows11 = [];
  rows12 = [];
  rows13 = [];
  rows14 = [];
  rows15: any;
  rows16 = [];
  columnsPendientes: any[];
  rowsPendientes: any[];
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
  selectedOptionTipo='TODAS'; 
  frameworkComponents: any;
  SelectionType = SelectionType;
  id_sede: any;
  constructor(private tableApiservice: TesoreriaService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;
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
   }

  ngOnInit() {
  
    // this.setPage({ offset: 0 });
  }
  getRowClass(row) {
    // return {
    //   'totals': row.tipoPacienteNombre.includes('TOTAL'), 'sub-totals': row.tipoPacienteNombre === 'PROGRAMAS DE SALUD' || row.tipoPacienteNombre === 'CONVENIOS' || row.tipoPacienteNombre === 'SEGUROS' || row.tipoPacienteNombre === 'OTROS' };
  }
  getRowClass1(row) {

    // return {
    //   'totals': row.periodo.includes('TOTAL')
    // };
  }
  // getCellClass({ row, column, value }): any {
  //   console.log(178, column);
  //   return {
  //     'text-rigth': column.prop !== 'PeriodoTXT'
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
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.setPage({ offset: 0 });

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
          this.rows1 = this.data.tabla_KPI_RESUMEN_soles.tabla;
          this.rows1.map(item => {
            item.monto_lima = this._cp.transform(item.monto_lima);
            item.monto_chorrillos = this._cp.transform(item.monto_chorrillos)
            item.monto_surco = this._cp.transform(item.monto_surco)
            item.monto_total = this._cp.transform(item.monto_total)
          });
          this.columns2 = this.data.tabla_KPI_RESUMEN_SALUDPOL_soles.cabeceras;
          this.rows2 = this.data.tabla_KPI_RESUMEN_SALUDPOL_soles.tabla;
          this.rows2.map(item => {
            item.monto_lima = this._cp.transform(item.monto_lima);
            item.monto_chorrillos = this._cp.transform(item.monto_chorrillos)
            item.monto_surco = this._cp.transform(item.monto_surco)
            item.monto_total = this._cp.transform(item.monto_total)
          });
          this.columns3 = this.data.tabla_cobranzas_periodo_emision_soles.cabeceras;
          this.rows3 = this.data.tabla_cobranzas_periodo_emision_soles.tabla;

          this.columns4 = this.data.tabla_cobranzas_periodo_emision_cantidad.cabeceras;
          this.rows4 = this.data.tabla_cobranzas_periodo_emision_cantidad.tabla;

          // this.rows4filtered = this.rows4.filter(item => item.sucursal === 'TODAS');

          this.columns5 = this.data.tabla_cobranzas_empresa_mixto.cabeceras;
          this.rows5 = this.data.tabla_cobranzas_empresa_mixto.tabla;
          this.rows5.map(item => {
            item.monto_lima = this._cp.transform(item.monto_lima);
            item.monto_chorrillos = this._cp.transform(item.monto_chorrillos)
            item.monto_surco = this._cp.transform(item.monto_surco)
            item.monto_total = this._cp.transform(item.monto_total)
          });

          this.columns6 = this.data.tabla_expedientes_facturados_periodo_soles.cabeceras;
          this.rows6 = this.data.tabla_expedientes_facturados_periodo_soles.tabla;

          this.columns7 = this.data.tabla_expedientes_facturados_periodo_cantidad.cabeceras;
          this.rows7 = this.data.tabla_expedientes_facturados_periodo_cantidad.tabla;

          this.columns8 = this.data.tabla_expedientes_facturados_empresa_mixto.cabeceras;
          this.rows8 = this.data.tabla_expedientes_facturados_empresa_mixto.tabla;
          this.rows8.map(item => {
            item.monto_lima = this._cp.transform(item.monto_lima);
            item.monto_chorrillos = this._cp.transform(item.monto_chorrillos)
            item.monto_surco = this._cp.transform(item.monto_surco)
            item.monto_total = this._cp.transform(item.monto_total)
          });
          this.columns9 = this.data.tabla_expedientes_pendientes_periodo_soles.cabeceras;
          this.rows9 = this.data.tabla_expedientes_pendientes_periodo_soles.tabla;
          console.log(223, this.columns9);
          this.columns10 = this.data.tabla_expedientes_pendientes_periodo_cantidad.cabeceras;
          this.rows10 = this.data.tabla_expedientes_pendientes_periodo_cantidad.tabla;

          this.columns11 = this.data.tabla_expedientes_pendientes_empresa_mixto.cabeceras;
          this.columns11.map(item => {
            console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                
                subitem.cellRenderer= 'buttonRenderer',
                subitem.cellRendererParams=  {
                  
                  onClick: this.openClicked.bind(this),
                  sucursal: item.headerName
                }
             })
            }
            //   item.cellRenderer = (params) => {
            //     let keyData = params.data.key;
            //     let newLink = `<a href= https://ag-grid.com/${keyData}-getting-started target="_blank">${keyData}</a>`;
            //     return newLink;
            // }
          })
          console.log(303, this.columns11)
          this.rows11 = this.data.tabla_expedientes_pendientes_empresa_mixto.tabla;
          this.rows11.map(item => {
            item.monto_lima = this._cp.transform(item.monto_lima);
            item.monto_chorrillos = this._cp.transform(item.monto_chorrillos)
            item.monto_surco = this._cp.transform(item.monto_surco)
            item.monto_total = this._cp.transform(item.monto_total)
          });
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
        sede: e.sede,
      }
      console.log(361, parameters)
        this.loading();
        this.tableApiservice.GpricGetExpedientesPendiemtesDetalle(parameters).subscribe(
          (response) =>{ console.log(1155, response);
            this.data = response.data;
            // this.columnsPendientes = response.data.cabeceras;
            // this.rowsPendientes = response.data.tabla_expediente_detalle;
            // this.sede = this.rowsPendientes[0].sucursalNombre;
            // this.rowsPendientes.map(item=>{
            
            // })
            // console.log(584, this.rowsPendientes);
            const  modalRef =  this.modalService.open(RowDetalleComponent, {
              size: <any>"lg",
            });
            // console.log( 139, e)
            modalRef.componentInstance.dato = response.data;
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
  copyTableToClipboard(numberTabla){
    if(numberTabla === 0){
      this.rows.map(item=>{
         item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
         item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
         item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
         item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
      });
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 1){
      this.rows1.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
     });
      this.exportService.exportToClipboard(this.rows1, this.columns1);
    }else if (numberTabla === 2){
      this.rows2.map(item=>{
        item.total01 = typeof item.total01 === 'number' ? item.total01 : Number(item.total01);
        item.total02 = typeof item.total02 === 'number' ? item.total02 : Number(item.total02);
        item.total03 = typeof item.total03 === 'number' ? item.total03 : Number(item.total03);
        item.total04 = typeof item.total04 === 'number' ? item.total04 : Number(item.total04);

        item.total05 = typeof item.total05 === 'number' ? item.total05 : Number(item.total05);
        item.total06 = typeof item.total06 === 'number' ? item.total06 : Number(item.total06);
        item.total07 = typeof item.total07 === 'number' ? item.total07 : Number(item.total07);
        item.total08 = typeof item.total08 === 'number' ? item.total08 : Number(item.total08);

        item.total09 = typeof item.total09 === 'number' ? item.total09 : Number(item.total09);
        item.total10 = typeof item.total10 === 'number' ? item.total10 : Number(item.total10);
        item.total11 = typeof item.total11 === 'number' ? item.total11 : Number(item.total11);
        item.total12 = typeof item.total12 === 'number' ? item.total12 : Number(item.total12);

        item.total = typeof item.total === 'number' ? item.total : Number(item.total);
       });
      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }else if (numberTabla === 3){
      this.rows3.map(item=>{
        item.total01 = typeof item.total01 === 'number' ? item.total01 : Number(item.total01);
        item.total02 = typeof item.total02 === 'number' ? item.total02 : Number(item.total02);
        item.total03 = typeof item.total03 === 'number' ? item.total03 : Number(item.total03);
        item.total04 = typeof item.total04 === 'number' ? item.total04 : Number(item.total04);

        item.total05 = typeof item.total05 === 'number' ? item.total05 : Number(item.total05);
        item.total06 = typeof item.total06 === 'number' ? item.total06 : Number(item.total06);
        item.total07 = typeof item.total07 === 'number' ? item.total07 : Number(item.total07);
        item.total08 = typeof item.total08 === 'number' ? item.total08 : Number(item.total08);

        item.total09 = typeof item.total09 === 'number' ? item.total09 : Number(item.total09);
        item.total10 = typeof item.total10 === 'number' ? item.total10 : Number(item.total10);
        item.total11 = typeof item.total11 === 'number' ? item.total11 : Number(item.total11);
        item.total12 = typeof item.total12 === 'number' ? item.total12 : Number(item.total12);

        item.total = typeof item.total === 'number' ? item.total : Number(item.total);
       });
      this.exportService.exportToClipboard(this.rows3, this.columns3);
    }else if (numberTabla === 4){
      this.rows4.map(item=>{
        item.total01 = typeof item.total01 === 'number' ? item.total01 : Number(item.total01);
        item.total02 = typeof item.total02 === 'number' ? item.total02 : Number(item.total02);
        item.total03 = typeof item.total03 === 'number' ? item.total03 : Number(item.total03);
        item.total04 = typeof item.total04 === 'number' ? item.total04 : Number(item.total04);

        item.total05 = typeof item.total05 === 'number' ? item.total05 : Number(item.total05);
        item.total06 = typeof item.total06 === 'number' ? item.total06 : Number(item.total06);
        item.total07 = typeof item.total07 === 'number' ? item.total07 : Number(item.total07);
        item.total08 = typeof item.total08 === 'number' ? item.total08 : Number(item.total08);

        item.total09 = typeof item.total09 === 'number' ? item.total09 : Number(item.total09);
        item.total10 = typeof item.total10 === 'number' ? item.total10 : Number(item.total10);
        item.total11 = typeof item.total11 === 'number' ? item.total11 : Number(item.total11);
        item.total12 = typeof item.total12 === 'number' ? item.total12 : Number(item.total12);

        item.total = typeof item.total === 'number' ? item.total : Number(item.total);
       });
      this.exportService.exportToClipboard(this.rows4, this.columns4);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 0){
      this.rows.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
     });
      this.exportService.exportTableElmToExcel(this.rows, '');
    }else if (numberTabla === 1){
      this.rows1.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
     });
      this.exportService.exportTableElmToExcel(this.rows1, '');
    }else if (numberTabla === 2){
      this.rows2.map(item=>{
        item.total01 = typeof item.total01 === 'number' ? item.total01 : Number(item.total01);
        item.total02 = typeof item.total02 === 'number' ? item.total02 : Number(item.total02);
        item.total03 = typeof item.total03 === 'number' ? item.total03 : Number(item.total03);
        item.total04 = typeof item.total04 === 'number' ? item.total04 : Number(item.total04);

        item.total05 = typeof item.total05 === 'number' ? item.total05 : Number(item.total05);
        item.total06 = typeof item.total06 === 'number' ? item.total06 : Number(item.total06);
        item.total07 = typeof item.total07 === 'number' ? item.total07 : Number(item.total07);
        item.total08 = typeof item.total08 === 'number' ? item.total08 : Number(item.total08);

        item.total09 = typeof item.total09 === 'number' ? item.total09 : Number(item.total09);
        item.total10 = typeof item.total10 === 'number' ? item.total10 : Number(item.total10);
        item.total11 = typeof item.total11 === 'number' ? item.total11 : Number(item.total11);
        item.total12 = typeof item.total12 === 'number' ? item.total12 : Number(item.total12);

        item.total = typeof item.total === 'number' ? item.total : Number(item.total);
       });
      this.exportService.exportTableElmToExcel(this.rows2, '');
    }else if (numberTabla === 3){
      this.rows3.map(item=>{
        item.total01 = typeof item.total01 === 'number' ? item.total01 : Number(item.total01);
        item.total02 = typeof item.total02 === 'number' ? item.total02 : Number(item.total02);
        item.total03 = typeof item.total03 === 'number' ? item.total03 : Number(item.total03);
        item.total04 = typeof item.total04 === 'number' ? item.total04 : Number(item.total04);

        item.total05 = typeof item.total05 === 'number' ? item.total05 : Number(item.total05);
        item.total06 = typeof item.total06 === 'number' ? item.total06 : Number(item.total06);
        item.total07 = typeof item.total07 === 'number' ? item.total07 : Number(item.total07);
        item.total08 = typeof item.total08 === 'number' ? item.total08 : Number(item.total08);

        item.total09 = typeof item.total09 === 'number' ? item.total09 : Number(item.total09);
        item.total10 = typeof item.total10 === 'number' ? item.total10 : Number(item.total10);
        item.total11 = typeof item.total11 === 'number' ? item.total11 : Number(item.total11);
        item.total12 = typeof item.total12 === 'number' ? item.total12 : Number(item.total12);

        item.total = typeof item.total === 'number' ? item.total : Number(item.total);
       });
      this.exportService.exportTableElmToExcel(this.rows3, '');
    }else if (numberTabla === 4){
      this.rows4.map(item=>{
        item.total01 = typeof item.total01 === 'number' ? item.total01 : Number(item.total01);
        item.total02 = typeof item.total02 === 'number' ? item.total02 : Number(item.total02);
        item.total03 = typeof item.total03 === 'number' ? item.total03 : Number(item.total03);
        item.total04 = typeof item.total04 === 'number' ? item.total04 : Number(item.total04);

        item.total05 = typeof item.total05 === 'number' ? item.total05 : Number(item.total05);
        item.total06 = typeof item.total06 === 'number' ? item.total06 : Number(item.total06);
        item.total07 = typeof item.total07 === 'number' ? item.total07 : Number(item.total07);
        item.total08 = typeof item.total08 === 'number' ? item.total08 : Number(item.total08);

        item.total09 = typeof item.total09 === 'number' ? item.total09 : Number(item.total09);
        item.total10 = typeof item.total10 === 'number' ? item.total10 : Number(item.total10);
        item.total11 = typeof item.total11 === 'number' ? item.total11 : Number(item.total11);
        item.total12 = typeof item.total12 === 'number' ? item.total12 : Number(item.total12);

        item.total = typeof item.total === 'number' ? item.total : Number(item.total);
       });
      this.exportService.exportTableElmToExcel(this.rows4, '');
    }
  }

  filter() {

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
  updateFilter(event, selectedOption) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows4filtered
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
      this.rows4filtered = [...filtered]
      
    } else {

      if(selectedOption === 'TODAS'){
        this.rows4filtered = [...this.rows4.filter(item => item.sucursal === 'TODAS')]
      }else if (selectedOption === 'LIMA'){
        this.rows4filtered = [...this.rows4.filter(item => item.sucursal === 'LIMA')]
      }else if (selectedOption === 'CHORRILLOS'){
        this.rows4filtered = [...this.rows4.filter(item => item.sucursal === 'CHORRILLOS')]
      }else if (selectedOption === 'SURCO'){
        this.rows4filtered = [...this.rows4.filter(item => item.sucursal === 'SURCO')]
      }
    }
  }
  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
 open({ selected }, sucursal, content?: any){
     console.log(' hola object')
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
      this.loading();
       this.tableApiservice.GpricGetExpedientesPendiemtesDetalle(parameters).subscribe(
        (response) =>{ console.log(1155, response);
          this.columnsPendientes = response.data.cabeceras;
          this.rowsPendientes = response.data.tabla_expediente_detalle;
          this.sede = this.rowsPendientes[0].sucursalNombre;
          this.rowsPendientes.map(item=>{
           
          })
          console.log(584, this.rowsPendientes);
          Swal.close();
      });
      
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
                    count = count + 0;
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
                    count = count + 0;
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

