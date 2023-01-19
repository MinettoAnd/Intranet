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
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ResizeObserver from 'resize-observer-polyfill';

import { AgGridAngular } from "ag-grid-angular";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  active = 1;
  closeResult = '';
  @ViewChild("agGrid") agGrid: AgGridAngular;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      // initially setter gets called with undefined
      this.baseChart = content;
      // this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Pacientes','chart-1', 'C.E Reservada', 'C.E Realizada', 'bar');
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
  optionsAnio = [
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
  ];
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
  columns1: any;
  rows1: any;
  rows1filtered: any;
  rows3filtered: any;
  columns2: any[];
  rows2: any[];
  especialidades: any;
  temp: any[];
  rowsFilter: any[];
  columns3: any[];
  rows3: any[];
  ColumnMode = ColumnMode;
  columns4: any;
  rows4: any;
  temp2: any;
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
  columnDefs = [
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 180,
          filter: 'agTextColumnFilter',
        },
        {
          field: 'age',
          width: 90,
          filter: 'agNumberColumnFilter',
        },
        { headerName: 'Country', field: 'country', width: 140 },
      ],
    },
    {
      headerName: 'Sports Results',
      children: [
        { field: 'sport', width: 140 },
        {
          columnGroupShow: 'closed',
          field: 'total',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'gold',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'silver',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'bronze',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
      ],
    },
];
rowData = [
  {
  "athlete": "Michael Phelps",
  "age": 23,
  "country": "United States",
  "year": 2008,
  "date": "24/08/2008",
  "sport": "Swimming",
  "gold": 8,
  "silver": 0,
  "bronze": 0,
  "total": 8
  },
  {
  "athlete": "Michael Phelps",
  "age": 19,
  "country": "United States",
  "year": 2004,
  "date": "29/08/2004",
  "sport": "Swimming",
  "gold": 6,
  "silver": 0,
  "bronze": 2,
  "total": 8
  },
  {
  "athlete": "Michael Phelps",
  "age": 27,
  "country": "United States",
  "year": 2012,
  "date": "12/08/2012",
  "sport": "Swimming",
  "gold": 4,
  "silver": 2,
  "bronze": 0,
  "total": 6
  },
]
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
  }

  ngOnInit(){

    this.setPage({ offset: 0 });
  }
  filter() {
  
    const form = this.filtroForm.value;
      this.id_sede = form.id_sede,
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
  tipoChange(event, tabla){
    
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
        // console.log(item);
        // if (item.GRUPO3 === 'CANTIDAD' || item.GRUPOEM === 'CANTIDAD' ) {
        //   // console.log(item.per1);
        //   item.MES1 = typeof item.MES1 === 'number' ? this.separadorDeMiles(Math.round(item.MES1)) : this.separadorDeMiles(Math.round(Number(item.MES1)));
        //   item.MES2 = typeof item.MES2 === 'number' ? this.separadorDeMiles(Math.round(item.MES2)) : this.separadorDeMiles(Math.round(Number(item.MES2)));
        //   item.MES3 = typeof item.MES3 === 'number' ? this.separadorDeMiles(Math.round(item.MES3)) : this.separadorDeMiles(Math.round(Number(item.MES3)));
        //   item.MES4 = typeof item.MES4 === 'number' ? this.separadorDeMiles(Math.round(item.MES4)) : this.separadorDeMiles(Math.round(Number(item.MES4)));
        //   item.MES5 = typeof item.MES5 === 'number' ? this.separadorDeMiles(Math.round(item.MES5)) : this.separadorDeMiles(Math.round(Number(item.MES5)));
        //   item.MES6 = typeof item.MES6 === 'number' ? this.separadorDeMiles(Math.round(item.MES6)) : this.separadorDeMiles(Math.round(Number(item.MES6)));
        //   item.MES7 = typeof item.MES7 === 'number' ? this.separadorDeMiles(Math.round(item.MES7)) : this.separadorDeMiles(Math.round(Number(item.MES7)));
        //   item.MES8 = typeof item.MES8 === 'number' ? this.separadorDeMiles(Math.round(item.MES8)) : this.separadorDeMiles(Math.round(Number(item.MES8)));
        //   item.MES9 = typeof item.MES9 === 'number' ? this.separadorDeMiles(Math.round(item.MES9)) : this.separadorDeMiles(Math.round(Number(item.MES9)));
        //   item.MES10 = typeof item.MES10 === 'number' ? this.separadorDeMiles(Math.round(item.MES10)) : this.separadorDeMiles(Math.round(Number(item.MES10)));
        //   item.MES11 = typeof item.MES11 === 'number' ? this.separadorDeMiles(Math.round(item.MES11)) : this.separadorDeMiles(Math.round(Number(item.MES11)));
        //   item.MES12 = typeof item.MES12 === 'number' ? this.separadorDeMiles(Math.round(item.MES12)) : this.separadorDeMiles(Math.round(Number(item.MES12)));
        //   item.TOTAL = typeof item.TOTAL === 'number' ?  this.separadorDeMiles(Math.round(item.TOTAL)) : this.separadorDeMiles(Math.round(Number(item.TOTAL)));

         
        // } else 
        if (item.GRUPO3 === 'SOLES' || item.GRUPOEM === 'SOLES' ){
          item.MES2 = typeof item.MES2 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES2.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES2).toFixed(2));
          item.MES1 = typeof item.MES1 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES1.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES1).toFixed(2));
          item.MES3 = typeof item.MES3 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES3.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES3).toFixed(2));
          item.MES4 = typeof item.MES4 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES4.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES4).toFixed(2));
          item.MES5 = typeof item.MES5 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES5.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES5).toFixed(2));
          item.MES6 = typeof item.MES6 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES6.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES6).toFixed(2));
          item.MES7 = typeof item.MES7 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES7.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES7).toFixed(2));
          item.MES8 = typeof item.MES8 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES8.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES8).toFixed(2));
          item.MES9 = typeof item.MES9 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES9.tofixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES9).toFixed(2));
          item.MES10 = typeof item.MES10 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES10.tofixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.MES10).toFixed(2));
          item.MES11 = typeof item.MES11 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES11.tofixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.MES11).toFixed(2));
          item.MES12 = typeof item.MES12 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES12.tofixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.MES12).toFixed(2));
          item.TOTAL = typeof item.TOTAL === 'number' ? 'S/. ' + this.separadorDeMiles(item.TOTAL.tofixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.TOTAL).toFixed(2));
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

      // this.loading();
              this.tableApiservice.getResumenGeneralProcesar(this.parameters).subscribe(
                (response) => {
                  
                  if(response.success){
                    this.resumenMes = response.data;
                  }
                },
                (error) => {
                    Swal.close();
                }
              );
              this.tableApiservice.getAtencionesResumenAnual(this.parameters).subscribe(
                (response) => { 
                  if(response.success){
                    this.columns1 = response.data.cabeceras_tpacientes;
                    this.rows1 = response.data.tabla_tpacientes;
                    this.formatPipe(this.rows1);
                    this.rows1filtered = this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD');
                    this.columns2 = response.data.cabeceras_rangoetareo;
                    this.rows2 = response.data.tabla_rangoetareo;
                    this.columns3 = response.data.cabeceras_empresas;
                    this.rows3 = response.data.tabla_empresas;
                    this.formatPipe(this.rows3);
                    this.rows3filtered = this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD');
                    this.columns4 = response.data.cabeceras_diagnostico;
                    this.rows4 = response.data.tabla_diagnostico;
                    this.columns5 = response.data.cabeceras_especialidades;
                    this.rows5 = response.data.tabla_especialidades;
                    this.columns6 = response.data.cabeceras_inasistencia;
                    this.rows6 = response.data.tabla_inasistencia;
                    this.columns7 = response.data.cabeceras_resumen;
                    this.rows7 = response.data.tabla_resumen;
                    this.formatPipe(this.rows7);
                    this.columns8 = response.data.cabeceras_utilidad;
                    this.rows8 = response.data.tabla_utilidad;
                    this.formatPipe2(this.rows8);
                    this.columns9 = response.data.cabeceras_utilidad_TPac;
                    this.rows9 = response.data.tabla_utilidad_TPac;
                    this.formatPipe2(this.rows9);
                    this.columns10 = response.data.cabeceras_utilidad_Emp;
                    this.rows10 = response.data.tabla_utilidad_Emp;
                    this.formatPipe2(this.rows10);
                  }
                },
                (error) => {
                    Swal.close();
                }
              );

              this.tableApiservice.tiposPacientes(this.parameters).subscribe(
                (response) => { 
                  this.progressBarLabels = [];
                  this.progressBar1 = [];
                  let total = response.data.total_prog;
                  
                  if(response.success){
                    for (let value of Object.values(response.data.tipo_prog)) {
                      let porcentaje:any = Object.values(value);
                      
                      // this.progressBar1.push(datos);
                      
                      let label = Object.keys(value)[0];
                      if ( label == 'seguros_conv'){
                        this.progressBarLabels.push('CIA. Seguros / Convenios')
                        response.data.tipo_prog_d.seguros_conv.map(item=>{
                          if (item.cantidad){
                           let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                           item.porcentaje = subPorcentaje;
                          }
                          return item.porcentaje;
                        });
                        const datos = {
                          porcentaje : ((porcentaje/total)*100).toFixed(2),
                          value: porcentaje[0],
                          table:response.data.tipo_prog_d.seguros_conv
                        }
                        this.progressBar1.push(datos);
                      }else if (label === 'insti_priva'){
                        this.progressBarLabels.push('Institucional / Privados')
                        response.data.tipo_prog_d.insti_priva.map(item=>{
                          if (item.cantidad){
                           let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                           item.porcentaje = subPorcentaje;
                          }
                          return item.porcentaje;
                        });
                        const datos = {
                          porcentaje : ((porcentaje/total)*100).toFixed(2),
                          value: porcentaje[0],
                          table:response.data.tipo_prog_d.insti_priva
                        }
                        this.progressBar1.push(datos);
                      }else if (label === 'madre_nino'){
                        this.progressBarLabels.push('Madre Niño')
                        response.data.tipo_prog_d.madre_nino.map(item=>{
                          if (item.cantidad){
                           let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                           item.porcentaje = subPorcentaje;
                          }
                          return item.porcentaje;
                        });
                        const datos = {
                          porcentaje : ((porcentaje/total)*100).toFixed(2),
                          value: porcentaje[0],
                          table:response.data.tipo_prog_d.madre_nino
                        }
                        this.progressBar1.push(datos);
                      }else if (label === 'tarjeta_salud'){
                        this.progressBarLabels.push('Programas de Salud')
                        response.data.tipo_prog_d.tarjeta_salud.map(item=>{
                          if (item.cantidad){
                           let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                           item.porcentaje = subPorcentaje;
                          }
                          return item.porcentaje;
                        });
                        const datos = {
                          porcentaje : ((porcentaje/total)*100).toFixed(2),
                          value: porcentaje[0],
                          table:response.data.tipo_prog_d.tarjeta_salud
                        }
                        this.progressBar1.push(datos);
                      }else{
                        this.progressBarLabels.push('Otros')
                        response.data.tipo_prog_d.Otros.map(item=>{
                          if (item.cantidad){
                           let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                           item.porcentaje = subPorcentaje;
                          }
                          return item.porcentaje;
                        });
                        const datos = {
                          porcentaje : ((porcentaje/total)*100).toFixed(2),
                          value: porcentaje[0],
                          table:response.data.tipo_prog_d.Otros
                        }
                        this.progressBar1.push(datos);
                      }
                    }
                    // this.progressBarTabla1 = response.data.tipo_prog_d.tarjeta_salud;
                    // this.progressBarTabla2 = response.data.tipo_prog_d.insti_priva;
                    // this.progressBarTabla3 = response.data.tipo_prog_d.madre_nino;
                    // this.progressBarTabla4 = response.data.tipo_prog_d.seguros_conv;
                    // this.progressBarTabla5 = response.data.tipo_prog_d.Otros;
                    // console.log(596,this.progressBarTabla1);
                    // for (let value of Object.values(response.data.tipo_prog_d.tarjeta_salud)) {
                    //   // console.log(616, value)
                    //   // let porcentaje:any = Object.values(value);
                    //   // const datosTabla = {
                    //   //   porcentaje : ((porcentaje/total)*100).toFixed(2),
                    //   //   value: porcentaje[0]
                    //   // }
                    //   // this.progressBarTabla1.push(datosTabla);
                    //   // let label = Object.keys(value)[0];
                    //   // if ( label == 'seguros_conv'){
                    //   //   this.progressBarLabels.push('CIA. Seguros / Convenios')
                    //   // }else if (label === 'insti_priva'){
                    //   //   this.progressBarLabels.push('Institucional / Privados')
                    //   // }else if (label === 'madre_nino'){
                    //   //   this.progressBarLabels.push('Madre Niño')
                    //   // }else if (label === 'tarjeta_salud'){
                    //   //   this.progressBarLabels.push('Programas de Salud')
                    //   // }
                      
                    // }
                  }
                
                },
                (error) => {
                    Swal.close();
                }
              );

              this.tableApiservice.calcularMontos(this.parameters).subscribe(
                (response) => { 
                  this.resumenMontos = response.data.total;
                  
                    this.resumenMontos.ciasegcon =  typeof this.resumenMontos.ciasegcon === 'number' ? this.separadorDeMiles(this.resumenMontos.ciasegcon) : this.separadorDeMiles(Number(this.resumenMontos.ciasegcon));
                    this.resumenMontos.instipriva = typeof this.resumenMontos.instipriva === 'number' ? this.separadorDeMiles(this.resumenMontos.instipriva) : this.separadorDeMiles(Number(this.resumenMontos.instipriva));
                    this.resumenMontos.otros = typeof this.resumenMontos.otros === 'number' ? this.separadorDeMiles(this.resumenMontos.otros) : this.separadorDeMiles(Number(this.resumenMontos.otros));
                    this.resumenMontos.tarjeta = typeof this.resumenMontos.tarjeta === 'number' ? this.separadorDeMiles(this.resumenMontos.tarjeta) : this.separadorDeMiles(Number(this.resumenMontos.tarjeta));
                    // this.resumenMontos.montoTotal = typeof this.resumenMontos.montoTotal === 'number' ? this.resumenMontos.montoTotal.toFixed(2) : this.separadorDeMiles(Number(this.resumenMontos.montoTotal));

                  // console.log(442, this.resumenMontos);
                },
                (error) => {
                    Swal.close();
                }
              );

              this.tableApiservice.procesarAnterior(this.parameters).subscribe(
                (response) => {
                  if(response.success){ 
                      this.resumenMesAnterior = response.data;
                      this.porcCompaMesAntRealizas =  (((this.resumenMes.total - this.resumenMesAnterior.total) / this.resumenMesAnterior.total) * 100).toFixed(2)
                      this.porcCompaMesAntAusentismo = (((this.resumenMes.ausentismo - this.resumenMesAnterior.ausentismo) / this.resumenMesAnterior.ausentismo) * 100).toFixed(2)
                      this.porcCompaMesAntReservadas = (((this.resumenMes.reservadas - this.resumenMesAnterior.reservadas) / this.resumenMesAnterior.reservadas) * 100).toFixed(2)
                  }
                  
                },
                (error) => {
                    Swal.close();
                }
              );
// chart y pie
              this.tableApiservice.chartIndex(this.parameters).subscribe(
                (response) => {  
                   this.chartLabels1 = [];
                   this.chartData1 = [];   
                   this.chartData2 = [];
                   this.chartData3 = [];    
                  if(response.success){
                    
                    response.data.data.map(item =>{
                      this.chartLabels1.push(item.dia);
                      this.chartData1.push(item.cantidad);
                      this.chartData2.push(item.procedencia);
                    });
                    // this.resumenMontos = response.data;
                    
                  }
                  this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Pacientes','chart-1', 'C.E Reservada', 'C.E Realizada', 'bar');
                  // console.log(577, this.chartData1);
                },
                (error) => {
                    Swal.close();
                }
              );
              this.tableApiservice.pieIndex(this.parameters).subscribe(
                (response) => {        
                  if(response.success){
                   this.chartLabels2 = [];
                   this.chartData3 = [];    
                  if(response.success){
                    
                    response.data.data.map(item =>{
                      this.chartLabels2.push(item.grupo);
                      this.chartData3.push(item.cantidad);
                    });
                    // this.resumenMontos = response.data;
                    
                  }
                  this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'pie');
                  // console.log(577, this.chartData1);
                    
                  }
                  // console.log(577, this.detalleAnual);
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

    updateFilter(event) {
      const input = event.target.value.toLowerCase();
      // console.log(838, input);
      // filter our data
      if (input.length > 0) {
        const filtered = this.rowsFilter
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rowsFilter = [...filtered]
        
      } else {
        // console.log(this.filtered);
        this.rowsFilter = [...this.temp.filter(medico => medico.especialidadNombre === this.especialidad)]
      }
  
      // update the rows1
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
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

      this.tableApiservice.getMedicosStatistics(parameters).subscribe(
        (response) =>{
          this.columnsMedicos = response.data.cabeceras;
          this.rowsMedicos = response.data.tabla_medicos_anual;
      });
      

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
         this.tableApiservice.getMedicosRecord(parameters).subscribe(
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
