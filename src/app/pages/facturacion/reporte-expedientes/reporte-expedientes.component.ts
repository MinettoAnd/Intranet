import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { ExternalConsultationService } from '../../../_services/external-consultation.service';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import { CurrencyPipe } from '@angular/common';

import ResizeObserver from 'resize-observer-polyfill';
import {GridOptions} from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  porcCompaMesAntRealizas;
  porcCompaMesAntAusentismo;
  porcCompaMesAntReservadas;
  totales;
  id_sede = '0001';
  CMP;
  Medico;
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
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
  columns1: any;
  rows1: any[];
  rows1filtered: any;
  rows3filtered: any;
  columns2: any[];
  rows2: any[];
  especialidades: any;
  temp2: any[];
  temp4: any[];
  temp5: any[];
  temp6: any[];
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
  medicos = false;
  columnsMedicos: any[];
  rowsMedicos: any[];
  columnsMedicoRecord: any[];
  rowsMedicoRecord: any[];
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

  constructor(private tableApiservice: ExternalConsultationService, private exportService: ExportService,
    private _cp: CurrencyPipe, private modalService: NgbModal) { 
      this.page1.pageNumber = 0;
      this.page1.size = 10;
      this.page2.pageNumber = 0;
      this.page2.size = 10;
      this.page3.pageNumber = 0;
      this.page3.size = 10;
      this.page4.pageNumber = 0;
      this.page4.size = 10;
    this.filtroForm = new FormGroup({
      id_sede: new FormControl("0001"),
      mes: new FormControl(this.mes),
      anio: new FormControl(this.anio),
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
        if(params.data.sucursal !== undefined){
          totales = params.data.sucursal;
        }else if(params.data.grupo !== undefined){
          totales = params.data.grupo;
        }
        return totales === 'TOTAL';
      },
      "sick-days-breach": "data.sickDays > 8"
    };
    this.changeTable = false;
  }

  ngOnInit(){

    // this.setPage({ offset: 0 });
  }
  filter() {

    const form = this.filtroForm.value;
      this.id_sede = form.id_sede,
      this.mes = form.mes,
      this.anio = form.anio,
      this.periodo_consulta = form.anio + form.mes,

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
      'totals': row.GRUPO2.includes('TOTAL'), 'sub-totals': row.GRUPO2 === 'PROGRAMA DE SALUD' || row.GRUPO2 === 'CONVENIOS' || row.GRUPO2 ==='SEGUROS' || row.GRUPO2 ==='OTROS'
    };
  }
  getRowClass1(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      'sub-totals': row.condicion.includes('AUSENTISMO') || row.condicion.includes('REPROGRAMACIONES') || row.condicion === 'TURNOS POR INASISTENCIA MEDICA'
    };
  }
  getRowClass3(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }

    if (row.sucursal !== undefined){
      return {
        'totals': row.sucursal.includes('TOTAL')
      };
    }else if (row.grupo !== undefined ){
      return {
        'totals': row.grupo.includes('TOTAL')
      };
    } 
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




  
  guardarImagen(chart, idDownload){
    var canvas = document.getElementById(chart) as HTMLCanvasElement;
    var downloadlink = document.getElementById(idDownload) as HTMLAnchorElement;
    
    // var ctx = canvas.getContext("2d");
    // ctx.strokeStyle = "yellow";
    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.arc(100,75,50,0,Math.PI*2);
    // ctx.stroke();
    var imagedata = canvas.toDataURL("image/png");
    // console.log(imagedata)
    downloadlink.href = imagedata;
  }
  formatPipe2(rows1){
    rows1.map(item => {
      // console.log(item);
          item.mEsp = item.mEsp + ' %';
          item.mGas = item.mGas + ' %';
          item.mUti = item.mUti + ' %';
          item.porcUtilidad = typeof item.porcUtilidad === 'number' ? item.porcUtilidad.toFixed(2) + ' %' : Number(item.porcUtilidad).toFixed(2) + ' %';
          item.cantidad = typeof item.cantidad === 'number' ? 'S/. ' + this.separadorDeMiles(item.cantidad.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.cantidad).toFixed(2));
          item.montoPaciente = typeof item.montoPaciente === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoPaciente.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoPaciente).toFixed(2));
          item.montoSeguro = typeof item.montoSeguro === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoSeguro.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoSeguro).toFixed(2));
          item.montoEsperado = typeof item.montoEsperado === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoEsperado.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoEsperado).toFixed(2));
          item.montoPlanilla = typeof item.montoPlanilla === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoPlanilla.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoPlanilla).toFixed(2));
          item.montoSuministro = typeof item.montoSuministro === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoSuministro.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoSuministro).toFixed(2));
          item.montoHonorarios = typeof item.montoHonorarios === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoHonorarios.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoHonorarios).toFixed(2));
          item.montoGastos = typeof item.montoGastos === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoGastos.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoGastos).toFixed(2));
          item.montoUtilidad = typeof item.montoUtilidad === 'number' ? 'S/. ' + this.separadorDeMiles(item.montoUtilidad.toFixed(2)) : 'S/. ' + this.separadorDeMiles(Number(item.montoUtilidad).toFixed(2));
          return item.mEsp, item.mGas, item.mUti, item.porcUtilidad, item.cantidad, item.montoPaciente, item.montoSeguro, item.montoEsperado, item.montoPlanilla, item.montoSuministro, item.montoHonorarios, item.montoGastos, item.montoUtilidad
    });
  }
  formatPipe(rows1) {
    // console.log(rows1);
    // const editRowslPipe = ((rows1) =>{
  rows1.map(item => {

        if (item.GRUPO3 === 'SOLES' || item.GRUPOEM === 'SOLES' ){
          item.MES2 = typeof item.MES2 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES2.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES2).toFixed(2));
          item.MES1 = typeof item.MES1 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES1.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES1).toFixed(2));
          item.MES3 = typeof item.MES3 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES3.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES3).toFixed(2));
          item.MES4 = typeof item.MES4 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES4.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES4).toFixed(2));
          item.MES5 = typeof item.MES5 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES5.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES5).toFixed(2));
          item.MES6 = typeof item.MES6 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES6.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES6).toFixed(2));
          item.MES7 = typeof item.MES7 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES7.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES7).toFixed(2));
          item.MES8 = typeof item.MES8 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES8.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES8).toFixed(2));
          item.MES9 = typeof item.MES9 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES9.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES9).toFixed(2));
          item.MES10 = typeof item.MES10 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES10.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.MES10).toFixed(2));
          item.MES11 = typeof item.MES11 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES11.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.MES11).toFixed(2));
          item.MES12 = typeof item.MES12 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES12.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.MES12).toFixed(2));
          item.TOTAL = typeof item.TOTAL === 'number' ? 'S/. ' + this.separadorDeMiles(item.TOTAL.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.TOTAL).toFixed(2));
        }else{
          item.MES1 = typeof item.MES1 === 'number' ? this.separadorDeMiles(Math.round(item.MES1)) : this.separadorDeMiles(Math.round(Number(item.MES1)));
          item.MES2 = typeof item.MES2 === 'number' ? this.separadorDeMiles(Math.round(item.MES2)) : this.separadorDeMiles(Math.round(Number(item.MES2)));
          item.MES3 = typeof item.MES3 === 'number' ? this.separadorDeMiles(Math.round(item.MES3)) : this.separadorDeMiles(Math.round(Number(item.MES3)));
          item.MES4 = typeof item.MES4 === 'number' ? this.separadorDeMiles(Math.round(item.MES4)) : this.separadorDeMiles(Math.round(Number(item.MES4)));
          item.MES5 = typeof item.MES5 === 'number' ? this.separadorDeMiles(Math.round(item.MES5)) : this.separadorDeMiles(Math.round(Number(item.MES5)));
          item.MES6 = typeof item.MES6 === 'number' ? this.separadorDeMiles(Math.round(item.MES6)) : this.separadorDeMiles(Math.round(Number(item.MES6)));
          item.MES7 = typeof item.MES7 === 'number' ? this.separadorDeMiles(Math.round(item.MES7)) : this.separadorDeMiles(Math.round(Number(item.MES7)));
          item.MES8 = typeof item.MES8 === 'number' ? this.separadorDeMiles(Math.round(item.MES8)) : this.separadorDeMiles(Math.round(Number(item.MES8)));
          item.MES9 = typeof item.MES9 === 'number' ? this.separadorDeMiles(Math.round(item.MES9)) : this.separadorDeMiles(Math.round(Number(item.MES9)));
          item.MES10 = typeof item.MES10 === 'number' ? this.separadorDeMiles(Math.round(item.MES10)) : this.separadorDeMiles(Math.round(Number(item.MES10)));
          item.MES11 = typeof item.MES11 === 'number' ? this.separadorDeMiles(Math.round(item.MES11)) : this.separadorDeMiles(Math.round(Number(item.MES11)));
          item.MES12 = typeof item.MES12 === 'number' ? this.separadorDeMiles(Math.round(item.MES12)) : this.separadorDeMiles(Math.round(Number(item.MES12)));
          item.TOTAL = typeof item.TOTAL === 'number' ?  this.separadorDeMiles(Math.round(item.TOTAL)) : this.separadorDeMiles(Math.round(Number(item.TOTAL)));
        }
        return item.MES1,item.MES2,item.MES3,item.MES4,item.MES5,item.MES6,item.MES7,item.MES8,item.MES9,item.MES10,item.MES11,item.MES12, item.TOTAL;
      });
    // console.log(rows1);
  // });
}
 setPage(pageInfo) {
      console.log(pageInfo);
      // this.page.pageNumber = pageInfo.offset;
      this.parameters = {
        // periodo_consulta:this.periodo_consulta,
        sede: this.id_sede,
        mes: this.mes,
        // meses: this.mes,
        anio: this.anio,
        chkena: 'on',
        typepie: 'IN',
        tipo: 'RERE'
        // pageNumber: this.page.pageNumber,
        // size: this.page.size
      };

      this.loading();
            this.tableApiservice.getCeResumenGeneralProcesar(this.parameters).subscribe(
                (response) => {
                  
                  if(response.success){
                    this.resumenMes = response.data;
                    
                     this.porcMedico =  ( this.resumenMes.medico / this.resumenMes.ausentismo) * 100;
                      this.porcPaciente = (this.resumenMes.paciente / this.resumenMes.ausentismo) * 100;
                      this.porcAnuladas = (this.resumenMes.anuladas / this.resumenMes.ausentismo) * 100;
                    

                     
                  }
                  Swal.close();
                },
                (error) => {
                    Swal.close();
                }
              );

  }
  public onLimitChange(limit: any, numberT): void {
    this.changePageLimit(limit, numberT);
    this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any, numberT): void {
    
    if(numberT === '1'){console.log(numberT);
      if (limit === '0'){
        this.page1.size = this.page1.totalElements;
        // console.log(this.page.totalElements);
        return
      }
      this.page1.size = parseInt(limit, 10);
    }else if(numberT === '2'){
      if (limit === '0'){
        this.page2.size = this.page2.totalElements;
        // console.log(this.page.totalElements);
        return
      }
      this.page2.size = parseInt(limit, 10);
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
        this.exportService.exportToClipboard(this.rowsMedicos, this.columnsMedicos);
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
        this.exportService.exportTableElmToExcel(this.rowsMedicos, 'ANUAL - INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
      }
      
    }

    updateFilter(event, selectedOption) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows1filtered
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows1filtered = [...filtered]
        
      } else {
        if(selectedOption === 'cantidad'){
          this.rows1filtered = [...this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD')]
        }else if (selectedOption === 'soles'){
          this.rows1filtered = [...this.rows1.filter(item => item.GRUPO3 === 'SOLES')]
        }
        // console.log(this.filtered);
       
      }
    }
    updateFilter3(event, selectedOption) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows3filtered
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows3filtered = [...filtered]
        
      } else {
        if(selectedOption === 'cantidad'){
          this.rows3filtered = [...this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD')]
        }else if (selectedOption === 'soles'){
          this.rows3filtered = [...this.rows3.filter(item => item.GRUPOEM === 'SOLES')]
        }
        // console.log(this.filtered);
       
      }
    }
    updateFilter2(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows2
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows2 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows2 = [...this.temp2]
       
      }
    }
    updateFilter4(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows4
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows4 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows4 = [...this.temp4]
       
      }
    }
    updateFilter5(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows5
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows5 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows5 = [...this.temp5]
       
      }
    }
    updateFilter6(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rowsMedicos
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rowsMedicos = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rowsMedicos = [...this.tempRowsMedicos]
       
      }
    }
    updateFilter7(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rows6
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows6 = [...filtered]
        
      } else {
        console.log(this.filtered);
        this.rows6 = [...this.temp6]
       
      }
    }
    onSelect({ selected }) {
      this.medicos = true;
      const parameters = {
        idEspecialidad: selected[0].id_esp,
        AnioF: this.anio,
        MesF: this.mes,
        SedeF: this.id_sede,
        CheckF: 1
      }
      this.loading();
      this.tableApiservice.getCeMedicosStatistics(parameters).subscribe(
        (response) =>{
          this.columnsMedicos = response.data.cabeceras;
          this.rowsMedicos = response.data.tabla_medicos_anual;
          this.tempRowsMedicos = this.rowsMedicos
          Swal.close();
        },
        (error) => {
            Swal.close();
        }
      );

    }
    onActivate(event) {
      // console.log('Activate Event', event);
    }
    open({ selected }, content?: any){
      
      if (selected !== undefined){
        this.CMP = selected[0].CMP;
        this.Medico = selected[0].MEDICO;
         console.log(1141, selected);
         const parameters = {
          Id: selected[0].Empleado,
          CMP: selected[0].CMP,
          Especialidad: selected[0].ESPECIALIDAD,
          Medico: selected[0].MEDICO,
          AnioF: this.anio,
          MesF: this.mes,
          SedeF: this.id_sede,
        }
         this.tableApiservice.getCeMedicosRecord(parameters).subscribe(
          (response) =>{ console.log(1155, response);
            this.columnsMedicoRecord = response.data.cabeceras;
            this.rowsMedicoRecord = response.data.tabla_medico_record;
            this.rowsMedicoRecord.map(item=>{
              console.log(item);
            })
        });
        
      }else{
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
}

