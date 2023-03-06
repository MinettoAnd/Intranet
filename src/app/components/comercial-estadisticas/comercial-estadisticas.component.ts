import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { ComercialService } from '../../_services/comercial.service';
import {AttentionConsultation} from '../../interfaces/attentionConsultation';
import {ApiResponse} from '../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../models/forms-data/page';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../interfaces/excel-json.interface';
import { ExportService } from '../../_services/export.service';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ResizeObserver from 'resize-observer-polyfill';
import {GridOptions} from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';

@Component({
  selector: 'app-comercial-estadisticas',
  templateUrl: './comercial-estadisticas.component.html',
  styleUrls: ['./comercial-estadisticas.component.scss']
})
export class ComercialEstadisticasComponent implements OnInit {
  active = 1;
  closeResult = '';
  @ViewChild("agGrid") agGrid: AgGridAngular;
  data;
  ingresoTotal: any;
  ingresoFamil: any;
  ingresoColec: any;
  ingresoInscr: any;
  ingresoFamilNumComtratos: any;
  ingresoColecNumComtratos: any;
  ingresoInscrNumComtratos: any;
  ingresoTotalNumComtratos: any;
  data2;
  data3;
  data4;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      // initially setter gets called with undefined
      this.baseChart = content;
      this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'', '','chart-1', this.anio, this.anioAnterior, 'line');
      this.getBarChart(this.chartLabels2, this.chartData3, this.chartData4,'', '','chart-2', this.anioAnterior, this.anio, 'line');
      // this.getBarChart(this.chartLabels, this.chartData3, this.chartData4, 'chart-2', 'MENSUAL-INGRESO CON IGV - TOTAL CUOTAS', 'MENSUAL-INGRESO CON IGV - TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels2, this.chartData5, this.chartData6, 'chart-3', 'MENSUAL-NÚMERO DE CONTRATOS PAGADOS-TOTAL CUOTAS', 'MENSUAL-NÚMERO DE CONTRATOS PAGADOS-TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels3, this.chartData7, this.chartData8, 'chart-4', 'ANUAL-INGRESO SIN IGV - TOTAL CUOTAS', 'ANUAL-INGRESO SIN IGV - TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels3, this.chartData9, this.chartData10, 'chart-5', 'ANUAL-INGRESO CON IGV - TOTAL CUOTAS', 'ANUAL-INGRESO CON IGV - TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels4, this.chartData11, this.chartData12, 'chart-6', 'ANUAL-NÚMERO DE CONTRATOS PAGADOS - TOTAL CUOTAS', 'ANUAL-NÚMERO DE CONTRATOS PAGADOS - TOTAL RECAUDADO', 'bar');
    }
  }
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
  public chartData4 = [];

  porcCompaMesAntRealizas;
  porcCompaMesAntAusentismo;
  porcCompaMesAntReservadas;
  totales;
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  anioAnterior = Number(this.anio) - 1;
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
  rows1: any;
  columns2: any[];
  rows2: any[];
  columns3: any[];
  rows3: any[];
  ColumnMode = ColumnMode;
  columns4: any;
  rows4: any;
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
  filtered: any;
  detalleAnual: any;
  especialidad: any;
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


  constructor(private tableApiservice: ComercialService, private exportService: ExportService,
    private _cp: CurrencyPipe, private  _cnp: CustomNumberPipe, private modalService: NgbModal) { 
      this.page1.pageNumber = 0;
      this.page1.size = 10;
      this.page2.pageNumber = 0;
      this.page2.size = 10;
      this.page3.pageNumber = 0;
      this.page3.size = 10;
      this.page4.pageNumber = 0;
      this.page4.size = 10;
    this.filtroForm = new FormGroup({
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
        let totales;
        console.log(211, params.data.Estado)
        if(params.data.Estado.trim()  === 'VIGENTES' || params.data.Estado.trim()  === 'DE BAJA'){
          
          totales = params.data.Estado;
        }
        return totales;
      },
      "sub-totals": function(params) {
        let totales;
        if(params.data.Estado.trim()  === 'Ingreso por cuotas' || params.data.Estado.trim()  === 'Siniestralidad (Coberturado / Ingreso Cuotas)' 
            || params.data.Estado.trim()  === 'Activos' || params.data.Estado.trim()  === 'Suspendidos'){
          totales = params.data.Estado;
        }
        return totales;
      },
      "row-paddin": function(params) {
       
        let totales;
        if(params.data.Estado.trim()  === 'Cuotas Adelantadas' || params.data.Estado.trim()  === 'Cuotas Atrasadas' || params.data.Estado.trim()  === 'Cuotas Puntuales' 
            || params.data.Estado.trim()  === 'Nuevos' || params.data.Estado.trim()  === 'Continuadores' || params.data.Estado.trim()  === 'Activaciones'){
           totales = params.data.Estado.trim();
        }
        return totales;
      }
    };
  }

  ngOnInit(){

    // this.setPage({ offset: 0 });
  }
  filter() {
  
    const form = this.filtroForm.value;
      this.mes = moment(form.mes).format('MM'),
      this.anio = moment(form.anio).format('YYYY'),
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
  getBarChart(chartLabels1, chartData1, chartData2,scaleLabel1,scaleLabel2, chartNum, title, title2, typeChart) {
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: chartData1,
          backgroundColor: '#28a74559'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title2,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 4,
          data: chartData2,
          backgroundColor     : '#a6bcdf',
          borderColor         : 'rgba(33,104,163,1)',
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : 'line',
        },
        // {
        //   label: title3,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 1,
        //   data: chartData3,
        //   backgroundColor: 'rgb(34, 102, 211, 0.5)'
        //   // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        //   // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        // }
      ]
    };
    const options = {
      // callbacks: {
      //   label: function (t, d) {
      //     var xLabel = d.datasets[t.datasetIndex].label;
      //     var yLabel = t.yLabel >= 1000 ? 'S/.' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
      //     return xLabel + ': ' + yLabel;
      //   }
      // },
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       beginAtZero: true,
      //       callback: function (value, index, values) {
      //         // console.log(444,Number.isInteger(value), value,index,values);
      //         if (chartNum = 'chart-3'){
      //           return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //         }else{
      //           if (parseInt(value) >= 1000) {
      //                           return 'S/.' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //           } else { return 'S/.' + value; }
      //         }
              
      //       }
      //     }
      //   }]
      // },
      // legend: {
      //   display: false
      // },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: scaleLabel1,
            fontSize: 18,
            fontColor: '#000',
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: scaleLabel2,
            fontSize: 18,
            fontColor: '#000',
          }
        }]
      },
      plugins: {
        datalabels: {
          
          /* anchor puede ser "start", "center" o "end" */
          anchor: 'center',
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          clip: true,
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: function(value, context) {
            let sum = 0;
            
            let dataArr = context.chart.data.datasets[context.datasetIndex].data;
              
            dataArr.map((data) => {
              return sum += parseFloat(data);
            });
            // console.log(292,value , sum );
            if (sum > 0 ){
              return ((value * 100) / sum).toFixed(2) + '%';
            }else{
              return (0 + '%');
            }
            
          },
          /* Podemos modificar el texto a mostrar */
          // formatter: function (dato, ctx) {
          //   return ((dato * 100) / total).toFixed(2) + '%'; 
          // },
          // formatter: (dato) => ((dato * 100) / total).toFixed(2) + '%',
          // formatter: function (value, ctx) {
          //   return ((value * 100) / this.total(ctx)).toFixed(2) + '%';
          // },
          // formatter: (dato) => Math.floor((dato / totales) * 100) + '%',
          /* Color del texto */
          // color: '#ffffff',
          // /* Formato de la fuente */
          // font: {
          //   // family: '"Times New Roman", Times, serif',
          //   size: '11',
          //   weight: 'bold',
          // },
          /* Formato de la caja contenedora */
          // padding: '4',
          // borderWidth: 2,
          // borderColor: 'darkblue',
          // borderRadius: 8,
          // backgroundColor: 'lightblue'
        }
      }
    };
    return this.getChart(chartNum, typeChart, data, options);
    
  }
  getPieChart(chartLabels1, chartData1, chartNum, typeChart) {
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.7,
          categoryPercentage: 1,
          // label: title,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: chartData1,
          // backgroundColor: '#ffa40840'
          backgroundColor: ['#2266d3', '#ffa408', '#fd7e14', '#17a2b8', '#eb445a', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        // {
        //   label: title2,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 3,
        //   data: chartData2,
        //   backgroundColor     : '#a6bcdf',
        //   borderColor         : 'rgba(33,104,163,1)',
        //   // backgroundColor: 'rgb(255, 164, 8, 0.7)',
        //   // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        //   // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        //   type                : 'line',
        // },
        // {
        //   label: title3,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 1,
        //   data: chartData3,
        //   backgroundColor: 'rgb(34, 102, 211, 0.5)'
        //   // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        //   // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        // }
      ]
    };
    const options = {
      // callbacks: {
      //   label: function (t, d) {
      //     var xLabel = d.datasets[t.datasetIndex].label;
      //     var yLabel = t.yLabel >= 1000 ? 'S/.' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
      //     return xLabel + ': ' + yLabel;
      //   }
      // },
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       beginAtZero: true,
      //       callback: function (value, index, values) {
      //         // console.log(444,Number.isInteger(value), value,index,values);
      //         if (chartNum = 'chart-3'){
      //           return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //         }else{
      //           if (parseInt(value) >= 1000) {
      //                           return 'S/.' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //           } else { return 'S/.' + value; }
      //         }
              
      //       }
      //     }
      //   }]
      // },
      // legend: {
      //   display: false
      // },
      // scales: {
      //   xAxes: [{
      //     scaleLabel: {
      //       display: true,
      //       // labelString: scaleLabel1,
      //       fontSize: 18,
      //       fontColor: '#000',
      //     }
      //   }],
      //   yAxes: [{
      //     scaleLabel: {
      //       display: true,
      //       // labelString: scaleLabel2,
      //       fontSize: 18,
      //       fontColor: '#000',
      //     }
      //   }]
      // },
      plugins: {
        datalabels: {
          
          /* anchor puede ser "start", "center" o "end" */
          anchor: 'center',
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          clip: true,
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: function(value, context) {
            let sum = 0;
            
            let dataArr = context.chart.data.datasets[context.datasetIndex].data;
              
            dataArr.map((data) => {
              return sum += parseFloat(data);
            });
            // console.log(292,value , sum );
            if (sum > 0 ){
              return ((value * 100) / sum).toFixed(2) + '%';
            }else{
              return (0 + '%');
            }
            
          },
          /* Podemos modificar el texto a mostrar */
          // formatter: function (dato, ctx) {
          //   return ((dato * 100) / total).toFixed(2) + '%'; 
          // },
          // formatter: (dato) => ((dato * 100) / total).toFixed(2) + '%',
          // formatter: function (value, ctx) {
          //   return ((value * 100) / this.total(ctx)).toFixed(2) + '%';
          // },
          // formatter: (dato) => Math.floor((dato / totales) * 100) + '%',
          /* Color del texto */
          // color: '#ffffff',
          // /* Formato de la fuente */
          // font: {
          //   // family: '"Times New Roman", Times, serif',
          //   size: '11',
          //   weight: 'bold',
          // },
          /* Formato de la caja contenedora */
          // padding: '4',
          // borderWidth: 2,
          // borderColor: 'darkblue',
          // borderRadius: 8,
          // backgroundColor: 'lightblue'
        }
      }
    };
    return this.getChart(chartNum, typeChart, data, options);
    
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
      'totals': row.item.includes('TOTAL'), 'sub-totals': row.item === 'CUOTAS COLECTIVA' || row.item === 'CUOTAS FAMILIAR EXTERNO' || row.item ==='CUOTAS FAMILIAR INTERNO'
    };
  }
  myRowClass(row) {
    if (row.Estado === 'Ingreso por cuotas'){
      return {'sub-totals': row.Estado.includes('Ingreso por cuotas')}
    }else{
      return {'sub-totals': row.Estado.includes('Siniestralidad (Coberturado / Ingreso Cuotas)')};
    }
  }


  getChart(context, chartType, data, options?) {
    const graph = new Chart(context, {
      data,
      options,
      type: chartType,
      plugins: [ChartDataLabels]
    });
    return graph;
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
        periodo_consulta:this.periodo_consulta,
        mes: this.mes,
        // meses: this.mes,
        anio: this.anio,
        // pageNumber: this.page.pageNumber,
        // size: this.page.size
      };

      this.loading();
    this.tableApiservice.getPsContratosEstadistica(this.parameters).subscribe(      
                (response) => {
                  // console.log(615, response)
                  if(response.success){
                    this.columns1 = response.data.cabeceras_resumen_afiliados_Tipo;
                    this.rows1 = response.data.tabla_resumen_afiliados_Tipo;
                    this.rows1.map((item, index) =>{
                      if (item.Estado !== 'Contratos Vigentes' && item.Estado !== 'Afiliados Vigentes'){
                        item.CTotal = this._cp.transform(item.CTotal, 'PEN', 'S/.');
                        item.FTotal = this._cp.transform(item.FTotal, 'PEN', 'S/.');
                        item.TOTAL = this._cp.transform(item.TOTAL, 'PEN', 'S/.');
                        if (index === 3){
                          item.Estado = 'Ingreso por cuotas'
                        }
                      }else{
                        item.CTotal = this._cnp.transform(item.CTotal);
                        item.FTotal = this._cnp.transform(item.FTotal);
                        item.TOTAL = this._cnp.transform(item.TOTAL);
                      }
                    });
                    console.log(629, this.rows1)
                    this.columns2 = response.data.cabeceras_resumen_afiliados_Total;
                    this.rows2 = response.data.tabla_resumen_afiliados_Total;
                    this.rows2.map((item, index) =>{
                      if (item.Estado !== 'Contratos Vigentes' && item.Estado !== 'Afiliados Vigentes'){
                        item.CTCL = this._cp.transform(item.CTCL, 'PEN', 'S/.');
                        item.CTDO = this._cp.transform(item.CTDO, 'PEN', 'S/.');
                        item.CTotal = this._cp.transform(item.CTotal, 'PEN', 'S/.');

                        item.FCLTotal = this._cp.transform(item.FCLTotal, 'PEN', 'S/.');
                        item.FDOTotal = this._cp.transform(item.FDOTotal, 'PEN', 'S/.');
                        item.FDITotal = this._cp.transform(item.FDITotal, 'PEN', 'S/.');
                        item.FTotal = this._cp.transform(item.FTotal, 'PEN', 'S/.');
                        item.TOTAL = this._cp.transform(item.TOTAL, 'PEN', 'S/.');
                        if (index === 3){
                          item.Estado = 'Ingreso por cuotas'
                        }
                      }else{
                         item.CTCL = this._cnp.transform(item.CTCL);
                        item.CTDO = this._cnp.transform(item.CTDO);
                        item.CTotal = this._cnp.transform(item.CTotal);

                        item.FCLTotal = this._cnp.transform(item.FCLTotal);
                        item.FDOTotal = this._cnp.transform(item.FDOTotal);
                        item.FDITotal = this._cnp.transform(item.FDITotal);
                        item.FTotal = this._cnp.transform(item.FTotal);
                        item.TOTAL = this._cnp.transform(item.TOTAL);
                      }
                    });
                    this.columns3 = response.data.cabeceras_contratos;
                    this.rows3 = response.data.tabla_contratos;
                    this.rows3.map(item =>{
                        item.CTCL = this._cnp.transform(item.CTCL);
                        item.CTDO = this._cnp.transform(item.CTDO);
                        item.FTCL = this._cnp.transform(item.FTCL);
                        item.FTDO = this._cnp.transform(item.FTDO);
                        item.FTDI = this._cnp.transform(item.FTDI);
                        item.TOTAL = this._cnp.transform(item.TOTAL);
                    });
                    this.columns4 = response.data.cabeceras_afiliados;
                    this.rows4 = response.data.tabla_afiliados;
                    this.rows4.map(item =>{
                      item.CTCL = this._cnp.transform(item.CTCL);
                      item.CTDO = this._cnp.transform(item.CTDO);
                      item.FTCL = this._cnp.transform(item.FTCL);
                      item.FTDO = this._cnp.transform(item.FTDO);
                      item.FTDI = this._cnp.transform(item.FTDI);
                      item.TOTAL = this._cnp.transform(item.TOTAL);
                    });
                    this.columns5 = response.data.cabeceras_contratos_soles;
                    this.rows5 = response.data.tabla_contratos_soles;
                    this.rows5.map(item =>{
                      item.CTCL = this._cp.transform(item.CTCL);
                      item.CTDO = this._cp.transform(item.CTDO);
                      item.FTCL = this._cp.transform(item.FTCL);
                      item.FTDO = this._cp.transform(item.FTDO);
                      item.FTDI = this._cp.transform(item.FTDI);
                      item.TOTAL = this._cp.transform(item.TOTAL);
                    });

                    response.data.hist_total.map(item => {
                      if(item.name === 'JAN'){
                        item.name = 'ENE';
                      }else if(item.name === 'APR'){
                        item.name = 'ABR';
                      }else if(item.name === 'AUG'){
                        item.name = 'AGO';
                      }else if(item.name === 'DEC'){
                        item.name = 'DIC';
                      }
                        this.chartLabels1.push(item.name);
                        this.chartData1.push(item.item_1);
                        this.chartData2.push(item.item_2);
                      
                    });
                    
                    this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'', '','chart-1', this.anio, this.anioAnterior, 'line');
                    
                    response.data.hist_siniestralidad.map(item => {
                      if(item.name === 'JAN'){
                        item.name = 'ENE';
                      }else if(item.name === 'APR'){
                        item.name = 'ABR';
                      }else if(item.name === 'AUG'){
                        item.name = 'AGO';
                      }else if(item.name === 'DEC'){
                        item.name = 'DIC';
                      }
                      this.chartLabels2.push(item.name);
                      this.chartData3.push(item.item_1);
                      this.chartData4.push(item.item_2);
                    });
                    this.getBarChart(this.chartLabels2, this.chartData3, this.chartData4,'', '','chart-2', this.anioAnterior, this.anio, 'line');
                     console.log(645, response.data.hist_total)
                     console.log('646', response.data.hist_siniestralidad)
                  }
                },
                (error) => {
                    Swal.close();
                }
              );
    // this.loading();
    this.tableApiservice.getPagoCuotasMesProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {

        
        if(response.data.success){
          // this.message = response.message;
          // this.title = response.data.title;
          this.data = response.data ? response.data : [];
          this.columns6 = this.data.cabeceras;
          this.columns7 = this.columns6
          // this.columns6.map(item => {
          //   if (item.prop !== 'item') {
          //     this.barChartLabels.push(item.name);
          //   } 
          // });
          this.rows6 = this.data.query_sin_igv;
          this.rows6.map(item => {
            // console.log(740, item);
            if(item.item.trim() === 'CUOTAS COLECTIVA - CONTINUADORES'){
              
              item.per1 = this.rows6[0].per1 - this.rows6[1].per1
              item.per2 = this.rows6[0].per2 - this.rows6[1].per2
              item.per3 = this.rows6[0].per3 - this.rows6[1].per3
              item.per4 = this.rows6[0].per4 - this.rows6[1].per4

            }else if(item.item.trim() === 'CUOTAS FAMILIAR EXTERNO - CONTINUADORES'){
              // console.log(451, item.item.trim());
              item.per1 = this.rows6[3].per1 - this.rows6[4].per1
              item.per2 = this.rows6[3].per2 - this.rows6[4].per2
              item.per3 = this.rows6[3].per3 - this.rows6[4].per3
              item.per4 = this.rows6[3].per4 - this.rows6[4].per4
              
            }else if(item.item.trim() === 'CUOTAS FAMILIAR INTERNO'){
              
              if(item.per1 === 0){
                for (let i = 0; i < this.rows6.length; i++) {
                  if(i === 7 || i === 8){
                    item.per1 += this.rows6[i].per1
                    item.per2 += this.rows6[i].per2
                    item.per3 += this.rows6[i].per3
                    item.per4 += this.rows6[i].per4
                  }

                }
              }
            }
            // item.per1 = this._cp.transform(item.per1);
            // item.per2 = this._cp.transform(item.per2);
            // item.per3 = this._cp.transform(item.per3);
            // item.per4 = this._cp.transform(item.per4);
          });
          this.rows6.map(item => {
            item.per1 = this._cp.transform(item.per1);
            item.per2 = this._cp.transform(item.per2);
            item.per3 = this._cp.transform(item.per3);
            item.per4 = this._cp.transform(item.per4);
          });
          this.rows7 = this.data.query_con_igv;
          this.rows7.map(item => {
            // console.log(740, item);
            item.per1 = this._cp.transform(item.per1);
            item.per2 = this._cp.transform(item.per2);
            item.per3 = this._cp.transform(item.per3);
            item.per4 = this._cp.transform(item.per4);
          });


          this.ingresoTotal=  this.data.ingreso_total;
          this.ingresoFamil=  this.data.ingreso_famil;
          this.ingresoColec=  this.data.ingreso_colec;
          this.ingresoInscr=  this.data.ingreso_inscr;

        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    // this.loading();
    this.tableApiservice.getPagoCuotasContratosMesProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        console.log(805, response)
        if(response.data.success){

          this.data2 = response.data ? response.data : [];
          this.columns8 = this.data2.cabeceras;

          this.rows8 = this.data2.data;
          this.rows8.map(item => {
            if (item.item.trim() === 'TOTAL CUOTAS'){
              this.ingresoTotalNumComtratos = item.per1;

            }else if (item.item.trim() === 'CUOTAS FAMILIAR EXTERNO'){
              this.ingresoFamilNumComtratos = item.per1;
            }else if (item.item.trim() === 'CUOTAS FAMILIAR INTERNO' ){
              this.ingresoFamilNumComtratos = parseInt(this.ingresoFamilNumComtratos) + parseInt(item.per1);
            }else if (item.item.trim() === 'CUOTAS COLECTIVA'){
              
              this.ingresoColecNumComtratos = item.per1;
            }else if (item.item.trim() === 'INSCRIPCIONES'){
              this.ingresoInscrNumComtratos = item.per1;

            }
            item.per1 = this._cnp.transform(item.per1);
            item.per2 = this._cnp.transform(item.per2);
            item.per3 = this._cnp.transform(item.per3);
            item.per4 = this._cnp.transform(item.per4);
          });
          
        }else{
          Swal.close();
        }
      },
      (error) => {
          Swal.close();
      }
    );
    // // this.loading();
    this.tableApiservice.getPagoCuotasProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {

        if(response.data.success){
console.log(846, response.data);
          this.data3 = response.data ? response.data : [];
          this.columns9 = this.data3.cabeceras;
          this.columns10 = this.columns9;

          this.rows9 = this.data3.query_sin_igv;
          
          
          this.rows9.map(item => {
            if(item.item.trim() === 'CUOTAS COLECTIVA - CONTINUADORES'){
              
              item.PER1 = this.rows9[0].PER1 - this.rows9[1].PER1
              item.PER2 = this.rows9[0].PER2 - this.rows9[1].PER2
              item.PER3 = this.rows9[0].PER3 - this.rows9[1].PER3
              item.PER4 = this.rows9[0].PER4 - this.rows9[1].PER4

              item.PER5 = this.rows9[0].PER5 - this.rows9[1].PER5
              item.PER6 = this.rows9[0].PER6 - this.rows9[1].PER6
              item.PER7 = this.rows9[0].PER7 - this.rows9[1].PER7
              item.PER8 = this.rows9[0].PER8 - this.rows9[1].PER8
              item.PER9 = this.rows9[0].PER9 - this.rows9[1].PER9
              item.PER10 = this.rows9[0].PER10 - this.rows9[1].PER10
              item.PER11 = this.rows9[0].PER11 - this.rows9[1].PER11
              item.PER12 = this.rows9[0].PER12 - this.rows9[1].PER12
              item.PER13 = this.rows9[0].PER13 - this.rows9[1].PER13

            }else if(item.item.trim() === 'CUOTAS FAMILIAR EXTERNO - CONTINUADORES'){
              console.log(451, item.item.trim());
              item.PER1 = this.rows9[3].PER1 - this.rows9[4].PER1
              item.PER2 = this.rows9[3].PER2 - this.rows9[4].PER2
              item.PER3 = this.rows9[3].PER3 - this.rows9[4].PER3
              item.PER4 = this.rows9[3].PER4 - this.rows9[4].PER4
              item.PER4 = this.rows9[3].PER4 - this.rows9[4].PER4
              item.PER5 = this.rows9[3].PER5 - this.rows9[4].PER5
              item.PER6 = this.rows9[3].PER6 - this.rows9[4].PER6
              item.PER7 = this.rows9[3].PER7 - this.rows9[4].PER7
              item.PER8 = this.rows9[3].PER8 - this.rows9[4].PER8
              item.PER9 = this.rows9[3].PER9 - this.rows9[4].PER9
              item.PER10 = this.rows9[3].PER10 - this.rows9[4].PER10
              item.PER11 = this.rows9[3].PER11 - this.rows9[4].PER11
              item.PER12 = this.rows9[3].PER12 - this.rows9[4].PER12
              item.PER13 = this.rows9[3].PER13 - this.rows9[4].PER13
            }else if(item.item.trim() === 'CUOTAS FAMILIAR INTERNO'){
              
              if(item.PER1 === 0){
                for (let i = 0; i < this.rows9.length; i++) {
                  if(i === 7 || i === 8){
                    item.PER1 += this.rows9[i].PER1
                    item.PER2 += this.rows9[i].PER2
                    item.PER3 += this.rows9[i].PER3
                    item.PER4 += this.rows9[i].PER4
                    item.PER5 += this.rows9[i].PER5
                    item.PER6 += this.rows9[i].PER6
                    item.PER7 += this.rows9[i].PER7
                    item.PER8 += this.rows9[i].PER8
                    item.PER9 += this.rows9[i].PER9
                    item.PER10 += this.rows9[i].PER10
                    item.PER11 += this.rows9[i].PER11
                    item.PER12 += this.rows9[i].PER12
                    item.PER13 += this.rows9[i].PER13
                  }

                }
              }
            }else if (item.item.trim() === 'TOTAL CUOTAS') {
              if(item.PER1 === 0){
                for (let i = 0; i < this.rows9.length; i++) {
                  if(i === 0 || i === 3 || i === 6 ){
                    item.PER1 += this.rows9[i].PER1
                    item.PER2 += this.rows9[i].PER2
                    item.PER3 += this.rows9[i].PER3
                    item.PER4 += this.rows9[i].PER4
                    item.PER5 += this.rows9[i].PER5
                    item.PER6 += this.rows9[i].PER6
                    item.PER7 += this.rows9[i].PER7
                    item.PER8 += this.rows9[i].PER8
                    item.PER9 += this.rows9[i].PER9
                    item.PER10 += this.rows9[i].PER10
                    item.PER11 += this.rows9[i].PER11
                    item.PER12 += this.rows9[i].PER12
                    item.PER13 += this.rows9[i].PER13
                  }

                }
              }

            }else if (item.item.trim() === 'TOTAL RECAUDADO') {
              if(item.PER1 === 0){
                  item.PER1 = this.rows9[9].PER1 + this.rows9[10].PER1;
                  item.PER2 = this.rows9[9].PER2 + this.rows9[10].PER2;
                  item.PER3 = this.rows9[9].PER3 + this.rows9[10].PER3;
                  item.PER4 = this.rows9[9].PER4 + this.rows9[10].PER4;
                  item.PER5 = this.rows9[9].PER5 + this.rows9[10].PER5;
                  item.PER6 = this.rows9[9].PER6 + this.rows9[10].PER6;
                  item.PER7 = this.rows9[9].PER7 + this.rows9[10].PER7;
                  item.PER8 = this.rows9[9].PER8 + this.rows9[10].PER8;
                  item.PER9 = this.rows9[9].PER9 + this.rows9[10].PER9;
                  item.PER10 = this.rows9[9].PER10 + this.rows9[10].PER10;
                  item.PER11 = this.rows9[9].PER11 + this.rows9[10].PER11;
                  item.PER12 = this.rows9[9].PER12 + this.rows9[10].PER12;
                  item.PER13 = this.rows9[9].PER13 + this.rows9[10].PER13;
              }

            } 

          });
          this.rows9.map(item =>{
            item.PER1 = this._cp.transform(item.PER1);
            item.PER2 = this._cp.transform(item.PER2);
            item.PER3 = this._cp.transform(item.PER3);
            item.PER4 = this._cp.transform(item.PER4);
            item.PER5 = this._cp.transform(item.PER5);
            item.PER6 = this._cp.transform(item.PER6);
            item.PER7 = this._cp.transform(item.PER7);
            item.PER8 = this._cp.transform(item.PER8);
            item.PER9 = this._cp.transform(item.PER9);
            item.PER10 = this._cp.transform(item.PER10);
            item.PER11 = this._cp.transform(item.PER11);
            item.PER12 = this._cp.transform(item.PER12);
            item.PER13 = this._cp.transform(item.PER13);
          });
          this.rows10 = this.data3.query_con_igv;
          this.rows10.map(item =>{
            item.PER1 = this._cp.transform(item.PER1);
            item.PER2 = this._cp.transform(item.PER2);
            item.PER3 = this._cp.transform(item.PER3);
            item.PER4 = this._cp.transform(item.PER4);
            item.PER5 = this._cp.transform(item.PER5);
            item.PER6 = this._cp.transform(item.PER6);
            item.PER7 = this._cp.transform(item.PER7);
            item.PER8 = this._cp.transform(item.PER8);
            item.PER9 = this._cp.transform(item.PER9);
            item.PER10 = this._cp.transform(item.PER10);
            item.PER11 = this._cp.transform(item.PER11);
            item.PER12 = this._cp.transform(item.PER12);
            item.PER13 = this._cp.transform(item.PER13);
          });

        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    // this.loading();
    this.tableApiservice.getPagoCuotasContratosProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {

        if(response.data.success){

          this.data4 = response.data ? response.data : [];
          this.columns11 = this.data4.cabeceras;

          this.rows11 = this.data4.data;
          console.log(814,this.rows11,this.columns4);
          this.rows11.map(item => {
            if(item.item.trim() === 'CUOTAS FAMILIAR INTERNO'){
              
              if(Number(item.PER1) === 0){
                for (let i = 0; i < this.rows11.length; i++) {
                  if(i === 7 || i === 8){
                    item.PER1 = Number(item.PER1) + Number(this.rows11[i].PER1)
                    item.PER2 = Number(item.PER1) + Number(this.rows11[i].PER2)
                    item.PER3 = Number(item.PER1) + Number(this.rows11[i].PER3)
                    item.PER4 = Number(item.PER1) + Number(this.rows11[i].PER4)
                    item.PER5 = Number(item.PER1) + Number(this.rows11[i].PER5)
                    item.PER6 = Number(item.PER1) + Number(this.rows11[i].PER6)
                    item.PER7 = Number(item.PER1) + Number(this.rows11[i].PER7)
                    item.PER8 = Number(item.PER1) + Number(this.rows11[i].PER8)
                    item.PER9 = Number(item.PER1) + Number(this.rows11[i].PER9)
                    item.PER10 = Number(item.PER1) + Number(this.rows11[i].PER10)
                    item.PER11 = Number(item.PER1) + Number(this.rows11[i].PER11)
                    item.PER12 = Number(item.PER1) + Number(this.rows11[i].PER12)
                    item.PER13 = Number(item.PER1) + Number(this.rows11[i].PER13)
                    console.log(743, item.PER1);
                  }

                }
              }
              console.log(this.rows11);
            }
            if (item.item.trim() === 'TOTAL CUOTAS') {
              if(Number(item.PER1) === 0){
                for (let i = 0; i < this.rows11.length; i++) {
                  if(i === 0 || i === 3 || i === 6 ){
                    item.PER1 = Number(item.PER1) + Number(this.rows11[i].PER1)
                    item.PER2 = Number(item.PER1) + Number(this.rows11[i].PER2)
                    item.PER3 = Number(item.PER1) + Number(this.rows11[i].PER3)
                    item.PER4 = Number(item.PER1) + Number(this.rows11[i].PER4)
                    item.PER5 = Number(item.PER1) + Number(this.rows11[i].PER5)
                    item.PER6 = Number(item.PER1) + Number(this.rows11[i].PER6)
                    item.PER7 = Number(item.PER1) + Number(this.rows11[i].PER7)
                    item.PER8 = Number(item.PER1) + Number(this.rows11[i].PER8)
                    item.PER9 = Number(item.PER1) + Number(this.rows11[i].PER9)
                    item.PER10 = Number(item.PER1) + Number(this.rows11[i].PER10)
                    item.PER11 = Number(item.PER1) + Number(this.rows11[i].PER11)
                    item.PER12 = Number(item.PER1) + Number(this.rows11[i].PER12)
                    item.PER13 = Number(item.PER1) + Number(this.rows11[i].PER13)
                  }

                }
              }
            }else if (item.item.trim() === 'TOTAL RECAUDADO') {
              if(Number(item.PER1) === 0){
                item.PER1 = Number(this.rows11[9].PER1) + Number(this.rows11[10].PER1);
                item.PER2 = Number(this.rows11[9].PER2) + Number(this.rows11[10].PER2);
                item.PER3 = Number(this.rows11[9].PER3) + Number(this.rows11[10].PER3);
                item.PER4 = Number(this.rows11[9].PER4) + Number(this.rows11[10].PER4);
                item.PER5 = Number(this.rows11[9].PER5) + Number(this.rows11[10].PER5);
                item.PER6 = Number(this.rows11[9].PER6) + Number(this.rows11[10].PER6);
                item.PER7 = Number(this.rows11[9].PER7) + Number(this.rows11[10].PER7);
                item.PER8 = Number(this.rows11[9].PER8) + Number(this.rows11[10].PER8);
                item.PER9 = Number(this.rows11[9].PER9) + Number(this.rows11[10].PER9);
                item.PER10 = Number(this.rows11[9].PER10) + Number(this.rows11[10].PER10);
                item.PER11 = Number(this.rows11[9].PER11) + Number(this.rows11[10].PER11);
                item.PER12 = Number(this.rows11[9].PER12) + Number(this.rows11[10].PER12);
                item.PER13 = Number(this.rows11[9].PER13) + Number(this.rows11[10].PER13);
              }
            }

          });
          this.rows11.map(item => {
            item.PER1 = this._cnp.transform(item.PER1);
            item.PER2 = this._cnp.transform(item.PER2);
            item.PER3 = this._cnp.transform(item.PER3);
            item.PER4 = this._cnp.transform(item.PER4);
            item.PER5 = this._cnp.transform(item.PER5);
            item.PER6 = this._cnp.transform(item.PER6);
            item.PER7 = this._cnp.transform(item.PER7);
            item.PER8 = this._cnp.transform(item.PER8);
            item.PER9 = this._cnp.transform(item.PER9);
            item.PER10 = this._cnp.transform(item.PER10);
            item.PER11 = this._cnp.transform(item.PER11);
            item.PER12 = this._cnp.transform(item.PER12);
            item.PER13 = this._cnp.transform(item.PER13);
          });
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
        this.exportService.exportToClipboard(this.rows11, this.columns11);
      }
      
    }
  
    exportToExcel(numberTabla): void {
      if(numberTabla === 1){
        this.exportService.exportTableElmToExcel(this.rows1, 'RESUMEN POR TIPO DE AFILIACION');
      }else if (numberTabla === 2){
        this.exportService.exportTableElmToExcel(this.rows2, 'RESUMEN POR TIPO DE PROGRAMA');
      }else if (numberTabla === 3){
        this.exportService.exportTableElmToExcel(this.rows3, 'RESUMEN DE Nro.DE CONTRATOS');
      }else if (numberTabla === 4){
        this.exportService.exportTableElmToExcel(this.rows4, 'RESUMEN DE MOVIMIENTO AFILIADOS');
      }else if (numberTabla === 5){
        this.exportService.exportTableElmToExcel(this.rows5, 'REPRESENTACION DE CONTRATOS EN SOLES (LO ESPERADO COBRAR AL MES)');
      }else if (numberTabla === 6){
        this.exportService.exportTableElmToExcel(this.rows6, 'INGRESOS POR CUOTAS DEL MES - INGRESO SIN IGV');
      }else if (numberTabla === 7){
        this.exportService.exportTableElmToExcel(this.rows7, 'INGRESOS POR CUOTAS DEL MES - INGRESO CON IGV');
      }else if (numberTabla === 8){
        this.exportService.exportTableElmToExcel(this.rows8, 'INGRESOS POR CUOTAS DEL MES - NÚMERO DE CONTRATOS PAGADOS');
      }else if (numberTabla === 9){
        this.exportService.exportTableElmToExcel(this.rows9, 'INGRESOS POR CUOTAS ANUAL - INGRESO SIN IGV');
      }else if (numberTabla === 10){
        this.exportService.exportTableElmToExcel(this.rows10, 'INGRESOS POR CUOTAS ANUAL - INGRESO CON IGV');
      }else if (numberTabla === 11){
        this.exportService.exportTableElmToExcel(this.rows11, 'INGRESOS POR CUOTAS ANUAL - NÚMERO DE CONTRATOS PAGADOS');
      }
      
    }

    onActivate(event) {
      // console.log('Activate Event', event);
    }

}
