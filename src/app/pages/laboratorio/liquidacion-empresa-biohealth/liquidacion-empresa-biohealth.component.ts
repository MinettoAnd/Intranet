import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { LaboratorioService } from '../../../_services/laboratorio.service';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ResizeObserver from 'resize-observer-polyfill';
import {GridOptions} from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PorcentajePipe } from '../../../pipes/porcentaje.pipe';
import { CustomNumberPipe } from '../../../pipes/customNumber.pipe';
@Component({
  selector: 'app-liquidacion-empresa-biohealth',
  templateUrl: './liquidacion-empresa-biohealth.component.html',
  styleUrls: ['./liquidacion-empresa-biohealth.component.scss']
})
export class LiquidacionEmpresaBiohealthComponent implements OnInit {
  active = 1;
  closeResult = '';
  @ViewChild("agGrid") agGrid: AgGridAngular;
  enableSummary = true;
  summaryPosition = 'bottom';
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
  // loading = true;
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
  progressBarLabels1 = [];
  progressBar1 = [];
  progressBarLabels2 = [];
  progressBar2 = [];
  porcCompaMesAntRealizas;
  porcCompaMesAntAusentismo;
  porcCompaMesAntReservadas;
  totales;
  sede = '0000';
  f_inicio = moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD');
  f_fin = moment(new Date()).format('YYYY-MM-DD');
  area = 'Laboratorio';
  origen = '0';
  tipo_proceso;
  filtroForm: FormGroup;
  anio = moment(new Date()).format('YYYY');
  public breadcrumb: any;
  parameters;
  private rowClassRules;
  columns1: any;
  rows1: any;
  rows1filtered: any;
  rows3filtered: any;
  columns2: any[];
  rows2: any[];
  especialidades: any;
  temp2: any[];
  temp4: any[];
  temp5: any[];
  temp6: any[];
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
  action: boolean = false;
  constructor(private tableApiservice: LaboratorioService, private exportService: ExportService,
    private _cp: CurrencyPipe, private _dp: DecimalPipe, private _pp:PorcentajePipe, private _cnp:CustomNumberPipe, private modalService: NgbModal) { 
      this.page1.pageNumber = 0;
      this.page1.size = 10;
      this.page2.pageNumber = 0;
      this.page2.size = 10;
      this.page3.pageNumber = 0;
      this.page3.size = 10;
      this.page4.pageNumber = 0;
      this.page4.size = 10;

    this.filtroForm = new FormGroup({
      f_inicio: new FormControl(this.f_inicio),
      f_fin: new FormControl(this.f_fin),
      sede: new FormControl(this.sede),
      origen: new FormControl(this.origen),
    });
    var anioOp = Number(this.anio);
    while ( Number(anioOp) > 2017 ) {
      
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
  }

  ngOnInit(){

    // this.setPage({ offset: 0 });
  }
  filter() {
    this.action = true;
    const form = this.filtroForm.value;
      this.sede = form.sede;
      this.f_inicio = form.f_inicio;
      this.f_fin = form.f_fin;
      this.sede = form.sede;
      this.origen = form.origen;
      var diff = moment(this.f_fin).diff(moment(this.f_inicio));
      if(diff.toString().indexOf('-') > -1){
        Swal.fire({
          title: "Problema",
          text: "La Fecha Inicio no puede ser mayor a la Fecha Final!",
          icon: "error"
        })
        return;
      }else if((diff/(1000*60*60*24)) < 31){
        this.setPage({ offset: 0 });
      }else{
        Swal.fire({
          title: "Problema",
          text: "El sistema puede presentar datos de 31 DÍAS como máximo. Agradeceríamos modificar sus filtros de FECHA!",
          icon: "error"
        })
        return;
      }
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
      'totals': row.Grupo.includes('TOTAL')
    };
  }
  getRowClass1(row) {
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      'sub-totals': row.Campo === 'CIA. SEGUROS/CONVENIOS' || row.Campo === 'INSTITUCIONAL/PRIVADO' || row.Campo ==='MADRE NIÑO' || row.Campo ==='PROGRAMAS DE SALUD'
    };
  }
  getRowClass2(row) {
    //console.log(251, row)
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      'totals': row.Campo.includes('TOTAL'), 'sub-totals': row.Campo === 'CHORRILLOS' || row.Campo === 'LIMA' || row.Campo ==='SURCO'
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

 setPage(pageInfo) {
      console.log(pageInfo);
      // this.page.pageNumber = pageInfo.offset;
      this.parameters = {
        f_inicio: this.f_inicio,
        f_fin: this.f_fin,
        sede: this.sede,
        area: this.area,
        origen: this.origen,
        tipo_proceso: 'pagoEmpresa'
      };

      this.loading();
              this.tableApiservice.getPagoEntreEmpresa(this.parameters).subscribe(
                (response) => { 
                 
                  if(response.success){
                    this.columns1 = response.data.cabeceras_Sucursal;
                    this.columns1.map(item =>{
                      if(item.pipe === 'currency'){
                        item.pipe = this._cp;
                      }else if(item.pipe === 'porcentaje'){
                        item.pipe = this._pp;
                      }else if(item.pipe === 'cantidad'){
                        item.pipe = this._cnp;
                      }
                    }); 
                    
                    this.rows1 = response.data.tabla_Sucursal;
                    const cobraBIOHEALTH = [];
                    const porcCobraBIOHEALTH = [];
                    let totalCantidad = 0;
                    let totalcobraCSALUD = 0;
                    let totalcobraBIOHEALTH = 0;
                    let totalporcCobraBIOHEALTH = 0;
                    this.progressBar1 = [];
                    this.rows1.map(item=>{
                        totalCantidad += Number(item.Cantidad);
                        totalcobraCSALUD += Number(item.cobraCSALUD);
                        totalcobraBIOHEALTH += Number(item.cobraBIOHEALTH);
                        totalporcCobraBIOHEALTH += Number(item.porcBIOHEALTH);
                        this.progressBarLabels1.push(item.Grupo)
                        const datos = {
                          porcentaje : Number(item.porcBIOHEALTH).toFixed(2),
                          value: this._cp.transform(Number(item.cobraBIOHEALTH).toFixed(2),'PEN','S/.'),
                          }
                        this.progressBar1.push(datos);
                    });
                    const total = {
                      Grupo: "TOTAL",
                      Cantidad : totalCantidad,
                      cobraCSALUD : totalcobraCSALUD,
                      cobraBIOHEALTH : totalcobraBIOHEALTH,
                      porcBIOHEALTH : totalporcCobraBIOHEALTH
                    }
                    console.log(344, this.rows1)
                    this.rows1.push(total);
                  //   this.rows1filtered = this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD');
                    this.columns2 = response.data.cabeceras_SucTAtencion;
                    this.columns2.map(item =>{
                      if(item.pipe === 'currency'){
                        item.pipe = this._cp;
                      }else if(item.pipe === 'porcentaje'){
                        item.pipe = this._pp;
                      }else if(item.pipe === 'cantidad'){
                        item.pipe = this._cnp;
                      }
                    }); 
                    // console.log(425, this.columns2);
                    this.rows2 = response.data.tabla_SucTAtencion;
                    const taCobraBIOHEALTH = [];
                    const taPorcCobraBIOHEALTH = [];
                    let totalBIOHEALTH;
                    this.progressBar2 = [];
                    this.rows2.map(item=>{
                      if(item.Campo ==='TOTAL'){
                        totalBIOHEALTH = item.cobraBIOHEALTH;
                      }
                      // console.log(444, totalBIOHEALTH)
                      if(totalBIOHEALTH !== undefined && (item.Campo.trim() ==='Ambulatoria' || item.Campo.trim() ==='Emergencia' || item.Campo.trim() ==='Hospitalizacion')){
                        // taCobraBIOHEALTH.push(Number(item.cobraBIOHEALTH).toFixed(2));
                        // taPorcCobraBIOHEALTH.push((item.cobraBIOHEALTH/totalBIOHEALTH * 100).toFixed(2));
                        this.progressBarLabels2.push(item.Campo);
                        const datos = {
                          porcentaje : (item.cobraBIOHEALTH/totalBIOHEALTH * 100).toFixed(2),
                          value: this._cp.transform(Number(item.cobraBIOHEALTH).toFixed(2),'PEN','S/.'),
                          }
                          this.progressBar2.push(datos);
                      }
                      
                    });
                    // console.log(448,taCobraBIOHEALTH);
                    // console.log(449,taPorcCobraBIOHEALTH);
                  //   this.temp2 = this.rows2;
                    this.columns3 = response.data.cabeceras_GTPac;
                    this.columns3.map(item =>{
                      if(item.pipe === 'currency'){
                        item.pipe = this._cp;
                      }else if(item.pipe === 'porcentaje'){
                        item.pipe = this._pp;
                      }else if(item.pipe === 'cantidad'){
                        item.pipe = this._cnp;
                      }
                    }); 
                    this.rows3 = response.data.tabla_GTPac;
                  //   this.formatPipe(this.rows3);
                  //   this.rows3filtered = this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD');
                    this.columns4 = response.data.cabeceras_GExamen;
                    this.columns4.map(item =>{
                      if(item.pipe === 'currency'){
                        item.pipe = this._cp;
                      }else if(item.pipe === 'porcentaje'){
                        item.pipe = this._pp;
                      }else if(item.pipe === 'cantidad'){
                        item.pipe = this._cnp;
                      }
                    }); 
                    let totalCantidad1 = 0;
                    let totalcobraCSALUD1 = 0;
                    let totalcobraBIOHEALTH1 = 0;
                    let totalporcCobraBIOHEALTH1 = 0;
                    this.rows4 = response.data.tabla_GExamen;
                    this.rows4.map(item=>{
                      totalCantidad1 += Number(item.Cantidad);
                      totalcobraCSALUD1 += Number(item.cobraCSALUD);
                      totalcobraBIOHEALTH1 += Number(item.cobraBIOHEALTH);
                      totalporcCobraBIOHEALTH1 += Number(item.porcBIOHEALTH);
                      
                    });
                    const total1 = {
                      Grupo: "TOTAL",
                      Cantidad : totalCantidad1,
                      cobraCSALUD : totalcobraCSALUD1,
                      cobraBIOHEALTH : totalcobraBIOHEALTH1,
                      porcBIOHEALTH : totalporcCobraBIOHEALTH1
                    }
                    console.log(344, this.rows4)
                    this.rows4.push(total1);
                    // this.temp4 = this.rows4;
                    this.columns5 = response.data.cabeceras_pago_empresa;
                    this.columns5.map(item =>{
                      if(item.pipe === 'currency'){
                        item.pipe = this._cp;
                      }
                      if(item.pipe === 'cantidad'){
                        item.pipe = this._cnp;
                      }
                    });
                    // console.log(401, this.columns5);
                    this.rows5 = response.data.tabla_pago_empresa;
                    this.temp5 = this.rows5;
                    this.columns6 = response.data.cabeceras_resumenPago;
                    this.columns6.map(item =>{
                      if(item.pipe === 'currency'){
                        item.pipe = this._cp;
                      }
                    });
                    this.rows6 = response.data.tabla_resumenPago;


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
        this.rows5.map(item => {
          item.Cantidad = typeof item.Cantidad === 'number' ? item.Cantidad : Number(item.Cantidad);
          item.precioVenta = typeof item.precioVenta === 'number' ? item.precioVenta :Number(item.precioVenta);
          item.cobraCSALUD = typeof item.cobraCSALUD === 'number' ? item.cobraCSALUD : Number(item.cobraCSALUD);
          item.cobraBIOHEALTH = typeof item.cobraBIOHEALTH === 'number' ? item.cobraBIOHEALTH : Number(item.cobraBIOHEALTH);
          item.porcentajeFactor = typeof item.porcentajeFactor === 'number' ? item.porcentajeFactor : Number(item.porcentajeFactor);
          item.precioUnitarioLista = typeof item.precioUnitarioLista === 'number' ? item.precioUnitarioLista : Number(item.precioUnitarioLista);
        });
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
        this.exportService.exportTableElmToExcel(this.rows4, 'Laboratorio - Examenes Realizados');
      }else if (numberTabla === 5){
        // console.log(565, this.rows5);
        this.rows5.map(item => {
          item.Cantidad = typeof item.Cantidad === 'number' ? item.Cantidad : Number(item.Cantidad);
          item.precioVenta = typeof item.precioVenta === 'number' ? item.precioVenta :Number(item.precioVenta);
          item.cobraCSALUD = typeof item.cobraCSALUD === 'number' ? item.cobraCSALUD : Number(item.cobraCSALUD);
          item.cobraBIOHEALTH = typeof item.cobraBIOHEALTH === 'number' ? item.cobraBIOHEALTH : Number(item.cobraBIOHEALTH);
          item.porcentajeFactor = typeof item.porcentajeFactor === 'number' ? item.porcentajeFactor : Number(item.porcentajeFactor);
          item.precioUnitarioLista = typeof item.precioUnitarioLista === 'number' ? item.precioUnitarioLista : Number(item.precioUnitarioLista);
        });
        this.exportService.exportTableElmToExcel(this.rows5, 'Laboratorio - Examenes Realizados');
      }else if (numberTabla === 6){
        this.exportService.exportTableElmToExcel(this.rows6, 'Laboratorio - Examenes Realizados');
      }else if (numberTabla === 7){
        this.exportService.exportTableElmToExcel(this.rows7, 'Laboratorio - Examenes Realizados');
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
        // this.rowsMedicos = [...this.tempRowsMedicos]
       
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
        SedeF: this.sede,
        CheckF: 1
      }



    }
    onActivate(event) {
      // console.log('Activate Event', event);
    }
    open({ selected }, content?: any){
      
      if (selected !== undefined){
         console.log(1141, selected);
         const parameters = {
          Id: selected[0].Empleado,
          CMP: selected[0].CMP,
          Especialidad: selected[0].ESPECIALIDAD,
          Medico: selected[0].MEDICO,
          AnioF: this.anio,
          SedeF: this.sede,
        }
        
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
    summaryForAmount(cells: any){
    
      let count: number = 0;
      let re = /\,/gi;
      let re1 = /\S\/./gi;
          
          cells.filter((cell) => {
              cell = cell.toString();
              if (cell != null && cell != undefined) {
                // console.log(719, cell, count)
                if (cell.indexOf('S/.') > -1){  
                  count = count + +cell.replace(re1, '').replace(',', '');
                }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
                 
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
            // count = this._cp.transform(count, 'PEN', 'S/. ')
            console.log(737, count)
            return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count;
          }else{
            return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') :  count.toLocaleString();
          }
    }
    private summaryNull(cells: any): null {
      // console.log(739, cells)
          return null;
    }
}
