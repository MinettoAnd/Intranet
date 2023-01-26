import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { EmergenciesService } from '../../../_services/emergencies.service';
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
import {GridOptions} from "ag-grid-community";
import { AgGridAngular } from "ag-grid-angular";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
interface PageInfo {
  offset: number;
  pageSize: number;
  limit: number;
  count: number;
}

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
      this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Pacientes','chart-1', 'C.E Reservada', 'C.E Realizada', 'bar');
      this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'pie');
      // this.getBarChart(this.chartLabels, this.chartData3, this.chartData4, 'chart-2', 'MENSUAL-INGRESO CON IGV - TOTAL CUOTAS', 'MENSUAL-INGRESO CON IGV - TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels2, this.chartData5, this.chartData6, 'chart-3', 'MENSUAL-NÚMERO DE CONTRATOS PAGADOS-TOTAL CUOTAS', 'MENSUAL-NÚMERO DE CONTRATOS PAGADOS-TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels3, this.chartData7, this.chartData8, 'chart-4', 'ANUAL-INGRESO SIN IGV - TOTAL CUOTAS', 'ANUAL-INGRESO SIN IGV - TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels3, this.chartData9, this.chartData10, 'chart-5', 'ANUAL-INGRESO CON IGV - TOTAL CUOTAS', 'ANUAL-INGRESO CON IGV - TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.chartLabels4, this.chartData11, this.chartData12, 'chart-6', 'ANUAL-NÚMERO DE CONTRATOS PAGADOS - TOTAL CUOTAS', 'ANUAL-NÚMERO DE CONTRATOS PAGADOS - TOTAL RECAUDADO', 'bar');
    }
  }
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
  selectedOptionTipo3='cantidad';
  progressBarLabels;
  progressBar1;
  porcCompaMesAntRealizas;
  porcCompaMesAntAusentismo;
  porcCompaMesAntReservadas;
  totales;
  id_sede = '0001';
  CMP;
  Medico;
  itemSoles;
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  public breadcrumb: any;
  parameters;
  resumenMes:any = {
    admision: '',
    altas: '',
    emergencia: '',
    estancia: '',
    estanciaMax: '',
    estanciaMin: '',
    fallecidos: '',
    hospitalizados: '',
    success: '',
    total: '',
    vivos: ''
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
    Otros: '',
    tarjeta: '',
    montoTotal: '',
  };
  private rowClassRules;
  columns1: any;
  rows1: any;
  rows1filtered: any;
  rows3filtered: any;
  rows6filtered: any;
  columns2: any[];
  rows2: any[];
  especialidades: any;
  temp2: any[];
  temp4: any[];
  temp5: any[];
  temp6: any[];
  temp7: any[];
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

columnDefs = [
  {
    headerName: "Athlete",
    field: "athlete",
    width: 150
  },
  {
    headerName: "Age",
    field: "age",
    width: 90,
    cellClassRules: {
      "rag-green": "x < 20",
      "rag-amber": "x >= 20 && x < 25",
      "rag-red": "x >= 25"
    }
  },
  {
    headerName: "Country",
    field: "country",
    width: 120
  },
  {
    headerName: "Year",
    field: "year",
    cellClassRules: {
      "cell-red": function(params) {
        return params.value === 2008;
      },
      "rag-amber-outer": function(params) {
        return params.value === 2004;
      },
      "cell-red1": function(params) {
        return params.value === 2000;
      }
    },
    cellRenderer: function(params) {
      return '<span class="rag-element">' + params.value + "</span>";
    }
  },
  {
    headerName: "Date",
    field: "date",
    cellClass: "rag-amber"
  },
  {
    headerName: "Sport",
    field: "sport",
    cellClass: function(params) {
      return params.value === "Swimming" ? "rag-green" : "rag-amber";
    }
  },
  {
    headerName: "Gold",
    field: "gold",
    cellStyle: { backgroundColor: "#aaffaa" }
  },
  {
    headerName: "Silver",
    field: "silver",
  },
  {
    headerName: "Bronze",
    field: "bronze",
  },
  {
    headerName: "Total",
    field: "total"
  }
    // {
    //   headerName: 'Athlete Details',
    //   children: [
    //     {
    //       field: 'athlete',
    //       width: 180,
    //       filter: 'agTextColumnFilter',
    //     },
    //     {
    //       field: 'age',
    //       width: 90,
    //       filter: 'agNumberColumnFilter',
    //     },
    //     { headerName: 'Country', field: 'country', width: 140 },
    //   ],
    // },
    // {
    //   headerName: 'Sports Results',
    //   children: [
    //     { field: 'sport', width: 140 },
    //     {
    //       columnGroupShow: 'closed',
    //       field: 'total',
    //       width: 100,
    //       filter: 'agNumberColumnFilter',
    //     },
    //     {
    //       columnGroupShow: 'open',
    //       field: 'gold',
    //       width: 100,
    //       filter: 'agNumberColumnFilter',
    //     },
    //     {
    //       columnGroupShow: 'open',
    //       field: 'silver',
    //       width: 100,
    //       filter: 'agNumberColumnFilter',
    //     },
    //     {
    //       columnGroupShow: 'open',
    //       field: 'bronze',
    //       width: 100,
    //       filter: 'agNumberColumnFilter',
    //     },
    //   ],
    // },
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
totalElements: number;
pageNumber: number;
cache: any = {};
isLoad = 0;
  constructor(private tableApiservice: EmergenciesService, private exportService: ExportService,
    private _cp: CurrencyPipe, private modalService: NgbModal) { 
      this.pageNumber = 0;
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
    console.log(751, event);
    const input = event;
    // this.especialidad = input;
    // this.temp = this.rows1;rows2filtered
    
    
    if (tabla === 'pacientes'){
      // const lenght1 = this.rows1.length;
      this.rows1.map((item, index)=>{
        if(item.GRUPO1 === null ){
          // const itemSoles1 = item;
          // this.rows1.splice(index, 1);
          // console.log(777, this.rows1);
          // this.rows1.splice(lenght1 + 1, 1, itemSoles1);
        }
      });
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
    }else{
      // const lenght2 = this.rows6.length;
      this.rows6.map((item, index)=>{
        if(item.GRUPO1 === null ){
          // const itemSoles2 = item;
          // this.rows6.splice(index, 1);
          // console.log(777, this.rows1);
          // this.rows6.splice(lenght2 + 1, 1, itemSoles2);
        }
      });
      if (input === 'cantidad') {
        this.rows6filtered = this.rows6.filter(item => item.GRUPO3 === 'CANTIDAD');
       } else if (input === 'soles'){
        this.rows6filtered = this.rows6.filter(item =>item.GRUPO3 === 'SOLES');
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
      this.pageNumber = pageInfo.offset;
      const rowOffset = pageInfo.offset * pageInfo.pageSize;

      const page = new Page();
      page.size = 20;
      page.pageNumber = Math.floor(rowOffset / page.size);

      if (this.cache[page.pageNumber]) return;
      this.cache[page.pageNumber] = true;
      this.isLoad++;
      this.parameters = {
        // periodo_consulta:this.periodo_consulta,
        sede: this.id_sede,
        mes: this.mes,
        // meses: this.mes,
        anio: this.anio,
        chkena: 'on',
        typepie: 'IN',
        tipo: 'INGR',
        // page: 1,
        // start: 0,
        // limit: 50
        // pageNumber: this.page.pageNumber,
        // size: this.page.size
      };

      this.loading();
        this.selectedOptionTipo='cantidad';
        this.selectedOptionTipo2='cantidad';
        this.selectedOptionTipo3='cantidad';
            this.tableApiservice.getEmResumenGeneralProcesar(this.parameters).subscribe(
                (response) => {
                  console.log(response);
                  if(response.success){
                    this.resumenMes = response.data;
                    
                    //  this.porcMedico =  ( this.resumenMes.medico / this.resumenMes.ausentismo) * 100;
                    //   this.porcPaciente = (this.resumenMes.paciente / this.resumenMes.ausentismo) * 100;
                    //   this.porcAnuladas = (this.resumenMes.anuladas / this.resumenMes.ausentismo) * 100;
                    

                     
                  }
                },
                (error) => {
                    Swal.close();
                }
              );
            this.tableApiservice.getEmAtencionesResumenMensual(this.parameters).subscribe(
              (response) => { 
                if(response.success){
                  this.columns1 = response.data.cabeceras_tpacientes;
                  this.rows1 = response.data.tabla_tpacientes; 
                      const totalCantidad1 = {
                        GRUPO1:'',
                        GRUPO2:'',
                        GRUPO3:'',
                        MES1:0,
                        MES2:0,
                        MES3:0,
                        MES4:0,
                        MES5:0,
                        MES6:0,
                        MES7:0,
                        MES8:0,
                        MES9:0,
                        MES10:0,
                        MES11:0,
                        MES12:0,
                        TOTAL:0,
                      };
                      const totalSoles1 = {
                        GRUPO1:'',
                        GRUPO2:'',
                        GRUPO3:'',
                        MES1:0,
                        MES2:0,
                        MES3:0,
                        MES4:0,
                        MES5:0,
                        MES6:0,
                        MES7:0,
                        MES8:0,
                        MES9:0,
                        MES10:0,
                        MES11:0,
                        MES12:0,
                        TOTAL:0,
                      };
                  this.rows1.map((item, index)=>{                 
                    if(item.GRUPO3 === 'CANTIDAD'){
                      totalCantidad1.MES1 += Number(item.MES1);
                      totalCantidad1.MES2 += Number(item.MES2);
                      totalCantidad1.MES3 += Number(item.MES3);
                      totalCantidad1.MES4 += Number(item.MES4);
                      totalCantidad1.MES5 += Number(item.MES5);
                      totalCantidad1.MES6 += Number(item.MES6);
                      totalCantidad1.MES7 += Number(item.MES7); 
                      totalCantidad1.MES8 += Number(item.MES8);
                      totalCantidad1.MES9 += Number(item.MES9);
                      totalCantidad1.MES10 += Number(item.MES10);
                      totalCantidad1.MES11 += Number(item.MES19);
                      totalCantidad1.MES12 += Number(item.MES12);
                      totalCantidad1.TOTAL += Number(item.TOTAL);
                    }else if(item.GRUPO3 === 'SOLES'){
                      totalSoles1.MES1 += Number(item.MES1);
                      totalSoles1.MES2 += Number(item.MES2);
                      totalSoles1.MES3 += Number(item.MES3);
                      totalSoles1.MES4 += Number(item.MES4);
                      totalSoles1.MES5 += Number(item.MES5);
                      totalSoles1.MES6 += Number(item.MES6);
                      totalSoles1.MES7 += Number(item.MES7); 
                      totalSoles1.MES8 += Number(item.MES8);
                      totalSoles1.MES9 += Number(item.MES9);
                      totalSoles1.MES10 += Number(item.MES10);
                      totalSoles1.MES11 += Number(item.MES19);
                      totalSoles1.MES12 += Number(item.MES12);
                      totalSoles1.TOTAL += Number(item.TOTAL);
                    }
                    
                    if(this.rows1.length === index+2 ){

                      totalCantidad1.GRUPO1 ="";
                      totalCantidad1.GRUPO2 = 'Total';
                      totalCantidad1.GRUPO3 = 'CANTIDAD';
                      this.rows1.push(totalCantidad1);
                      totalSoles1.GRUPO1 ="";
                      totalSoles1.GRUPO2 = 'Total';
                      totalSoles1.GRUPO3 = 'SOLES';

                      this.rows1.push(totalSoles1);
                      console.log(909, totalSoles1);
                    }
                  })
                  
                
                  // this.formatPipe(this.rows1);
                  this.rows1filtered = this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD');
                  this.columns2 = response.data.cabeceras_rangoetareo;
                  this.rows2 = response.data.tabla_rangoetareo;
                  const totalRango = {
                    RANGO:'',
                    MES1:0,
                    MES2:0,
                    MES3:0,
                    MES4:0,
                    MES5:0,
                    MES6:0,
                    MES7:0,
                    MES8:0,
                    MES9:0,
                    MES10:0,
                    MES11:0,
                    MES12:0,
                    TOTAL:0,
                  };
                  this.rows2.map((item, index)=>{                 
                      totalRango.MES1 += Number(item.MES1);
                      totalRango.MES2 += Number(item.MES2);
                      totalRango.MES3 += Number(item.MES3);
                      totalRango.MES4 += Number(item.MES4);
                      totalRango.MES5 += Number(item.MES5);
                      totalRango.MES6 += Number(item.MES6);
                      totalRango.MES7 += Number(item.MES7); 
                      totalRango.MES8 += Number(item.MES8);
                      totalRango.MES9 += Number(item.MES9);
                      totalRango.MES10 += Number(item.MES10);
                      totalRango.MES11 += Number(item.MES19);
                      totalRango.MES12 += Number(item.MES12);
                      totalRango.TOTAL += Number(item.TOTAL);
                      if(this.rows2.length === index+1 ){
                        totalRango.RANGO = 'Total';
                        this.rows2.push(totalRango);
                      }
                    }
                  );

                  this.temp2 = this.rows2;
                  this.columns3 = response.data.cabeceras_empresas;
                  this.columns3.map((item, index) => {
                      if (item.prop === 'MES1') {
                        item.summaryFunc = cells => {
                          console.log(1069, cells);
                          // const filteredCells = cells.filter(cell => !!cell);
                          //   return filteredCells.reduce((sum, cell) => (sum += cell), 0);
                        }
                      }else if (item.prop === 'MES2') {
                        item.summaryFunc = cells => this.summaryMes2(cells)
                      }else if (item.prop === 'MES3') {
                        item.summaryFunc = cells => this.summaryMes3(cells)
                      }else if (item.prop === 'MES4') {
                        item.summaryFunc = cells => this.summaryMes4(cells)
                      }else if (item.prop === 'MES5') {
                        item.summaryFunc = cells => this.summaryMes5(cells)
                      }else if (item.prop === 'MES6') {
                        item.summaryFunc = cells => this.summaryMes6(cells)
                      }else if (item.prop === 'MES7') {
                        item.summaryFunc = cells => this.summaryMes7(cells)
                      }else if (item.prop === 'MES8') {
                        item.summaryFunc = cells => this.summaryMes8(cells)
                      }else if (item.prop === 'MES9') {
                        item.summaryFunc = cells => this.summaryMes9(cells)
                      }else if (item.prop === 'MES10') {
                        item.summaryFunc = cells => this.summaryMes10(cells)
                      }else if (item.prop === 'MES11') {
                        item.summaryFunc = cells => this.summaryMes11(cells)
                      }else if (item.prop === 'MES12') {
                        item.summaryFunc = cells => this.summaryMes12(cells)
                      }else if (item.prop === 'TOTAL') {
                        item.summaryFunc = cells => this.summaryTotal(cells)
                      }else{
                        item.summaryFunc = null
                      }
                  });
                  console.log(1097, this.columns3);
                  this.rows3 = response.data.tabla_empresas;


                  // this.totalElements = this.rows3.length;
                  // const start = pagedData.page.pageNumber * pagedData.page.size;
                  // const rows = [...this.rows3];
                  // rows.splice(start, pagedData.page.size, ...response.data.tabla_empresas);
                  // this.rows3 = rows;
                  // this.isLoad--;


                  this.formatPipe(this.rows3);
                  this.rows3filtered = this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD');
                  this.columns4 = response.data.cabeceras_diagnostico;
                  this.rows4 = response.data.tabla_diagnostico;
                  this.temp4 = this.rows4;
                  this.columns5 = response.data.cabeceras_especialidades;
                  this.rows5 = response.data.tabla_especialidades;
                  this.temp5 = this.rows5;


                }
                Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );
            this.tableApiservice.getEmAtencionesResumenAnual(this.parameters).subscribe(
              (response) => { 
                console.log(982, response);
                if(response.success){
                  this.columns6 = response.data.cabeceras_tpacientes_anual;
                  this.rows6 = response.data.tabla_tpacientes_anual; 
                  const totalCantidad6 = {
                    GRUPO1: '',
                    GRUPO2: '',
                    GRUPO3: '',
                    PER1: 0,
                    PER2: 0,
                    PER3: 0,
                    PER4: 0,
                    PER5: 0,
                  };
                  const totalSoles6 = {
                    GRUPO1: '',
                    GRUPO2: '',
                    GRUPO3: '',
                    PER1: 0,
                    PER2: 0,
                    PER3: 0,
                    PER4: 0,
                    PER5: 0,
                  };
                  this.rows6.map((item, index)=>{
                    if(item.GRUPO3 === 'CANTIDAD'){
                      totalCantidad6.PER1 += Number(item.PER1);
                      totalCantidad6.PER2 += Number(item.PER2);
                      totalCantidad6.PER3 += Number(item.PER3);
                      totalCantidad6.PER4 += Number(item.PER4);
                      totalCantidad6.PER5 += Number(item.PER5);
                    }else if(item.GRUPO3 === 'SOLES'){
                      totalSoles6.PER1 += Number(item.PER1);
                      totalSoles6.PER2 += Number(item.PER2);
                      totalSoles6.PER3 += Number(item.PER3);
                      totalSoles6.PER4 += Number(item.PER4);
                      totalSoles6.PER5 += Number(item.PER5);
                    }
                    if(this.rows6.length === index+2 ){
                      totalCantidad6.GRUPO1 ="";
                      totalCantidad6.GRUPO2 = 'Total';
                      totalCantidad6.GRUPO3 = 'CANTIDAD';
                      this.rows6.push(totalCantidad6);
                      totalSoles6.GRUPO1 ="";
                      totalSoles6.GRUPO2 = 'Total';
                      totalSoles6.GRUPO3 = 'SOLES';
                      this.rows6.push(totalSoles6);
                    }
                  });
                  // console.log(1087, this.rows6);
                  // this.formatPipe(this.rows6);
                  this.rows6filtered = this.rows6.filter(item => item.GRUPO3 === 'CANTIDAD');
                  this.columns7 = response.data.cabeceras_rangoetareo_anual;
                  this.rows7 = response.data.tabla_rangoetareo_anual;
                  console.log(1153, this.rows7);
                  const totalRango7 = {
                    RANGO: '',
                    PER1: 0,
                    PER2: 0,
                    PER3: 0,
                    PER4: 0,
                    PER5: 0,
                  };
                  this.rows7.map((item, index)=>{

                      totalRango7.PER1 += Number(item.PER1);
                      totalRango7.PER2 += Number(item.PER2);
                      totalRango7.PER3 += Number(item.PER3);
                      totalRango7.PER4 += Number(item.PER4);
                      totalRango7.PER5 += Number(item.PER5);
                    if(this.rows7.length === index+1 ){
                      totalRango7.RANGO = 'Total';
                      this.rows7.push(totalRango7);
                    }
                  });
                  this.temp7 = this.rows7;
                }
                Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );

            this.tableApiservice.getEmTiposPacientes(this.parameters).subscribe(
              (response) => { 
                console.log(1138,response);
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
                }
                Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );

            this.tableApiservice.getEmCalcularMontos(this.parameters).subscribe(
              (response) => { 
                
                this.resumenMontos = response.data.total;
                
                  this.resumenMontos.ciasegcon =  typeof this.resumenMontos.ciasegcon === 'number' ? this.separadorDeMiles(this.resumenMontos.ciasegcon) : this.separadorDeMiles(Number(this.resumenMontos.ciasegcon));
                  this.resumenMontos.instipriva = typeof this.resumenMontos.instipriva === 'number' ? this.separadorDeMiles(this.resumenMontos.instipriva) : this.separadorDeMiles(Number(this.resumenMontos.instipriva));
                  this.resumenMontos.Otros = typeof this.resumenMontos.Otros === 'number' ? this.separadorDeMiles(this.resumenMontos.Otros) : this.separadorDeMiles(Number(this.resumenMontos.Otros));
                  this.resumenMontos.tarjeta = typeof this.resumenMontos.tarjeta === 'number' ? this.separadorDeMiles(this.resumenMontos.tarjeta) : this.separadorDeMiles(Number(this.resumenMontos.tarjeta));
                  // this.resumenMontos.montoTotal = typeof this.resumenMontos.montoTotal === 'number' ? this.resumenMontos.montoTotal.toFixed(2) : this.separadorDeMiles(Number(this.resumenMontos.montoTotal));

                  Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );

// chart y pie
            this.tableApiservice.getEmChartIndex(this.parameters).subscribe(
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
                Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );
            this.tableApiservice.getEmPieIndex(this.parameters).subscribe(
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
        // this.tableApiservice.getCeMedicosRecord(parameters).subscribe(
        //   (response) =>{ console.log(1155, response);
        //     this.columnsMedicoRecord = response.data.cabeceras;
        //     this.rowsMedicoRecord = response.data.tabla_medico_record;
        //     this.rowsMedicoRecord.map(item=>{
        //       console.log(item);
        //     })
        // });
        
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
    summaryForAmount(cells: any): string {
      console.log(1681, cells);
      let count: number = 0;
      let re = /\,/gi;
          
          cells.filter((cell) => { 
              if (cell != null && cell != undefined) {
  
                  if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
            count = count + +cell.replace(re, '');
                  }
                  else if (cell.indexOf('-') > -1) {
                      count = count + 0;
                  }
                  else if (cell.indexOf('(') > -1) {
                      let number = cell.replace('(', '').replace(')', '');
            count = count - +number.replace(re, '');
                  }
              }
          });
  
          return count.toString().indexOf('-') > -1 ? count.toLocaleString('en').replace('-', '(').concat(')') : count.toLocaleString("en");
      }
  
    private summaryNull(cells: any): null {
          return null;
    }
    summaryMes1(column){
      console.log(1677, column);
      // const filteredCells = cells.filter(cell => !!cell);
      // return filteredCells.reduce((sum, cell) => (sum += cell), 0);
      // return (cells) => {
      //   return column.allowSum ? cells.reduce((sum, cell) => sum += cell, 0) : null;
      // }
    }
    summaryMes2(cells: number[]){
      
    }
    summaryMes3(cells: number[]){
      
    }
    summaryMes4(cells: number[]){
      
    }
    summaryMes5(cells: number[]){
      
    }
    summaryMes6(cells: number[]){
      
    }
    summaryMes7(cells: number[]){
      
    }
    summaryMes8(cells: number[]){
      
    }
    summaryMes9(cells: number[]){
      
    }
    summaryMes10(cells: number[]){
      
    }
    summaryMes11(cells: number[]){
      
    }
    summaryMes12(cells: number[]){
      
    }
    summaryTotal(cells: number[]){
      
    }

}
