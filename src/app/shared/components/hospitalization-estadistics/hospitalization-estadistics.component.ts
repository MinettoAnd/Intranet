import { delay, map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { EmergenciesService } from '../../../_services/emergencies.service';
import { HospitalizationService } from '../../../_services/hospitalization.service';
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
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PagedData } from '../../../models/forms-data/paged-data';
interface PageInfo {
  offset: number;
  pageSize: number;
  limit: number;
  count: number;
}
@Component({
  selector: 'app-hospitalization-estadistics',
  templateUrl: './hospitalization-estadistics.component.html',
  styleUrls: ['./hospitalization-estadistics.component.scss']
})
export class HospitalizationEstadisticsComponent implements OnInit {
  active = 1;
  closeResult = '';
  @ViewChild("agGrid") agGrid: AgGridAngular;
  grafico1: Chart;
  grafico2: Chart;
  grafico3: Chart;
  grafico4: Chart;
  grafico5: Chart;
  totalProgs: any;
  // @ViewChild('chart1') chart1Canvas: ElementRef;
  // @ViewChild('chart2') chart2Canvas: ElementRef;
  // @ViewChild('chart3') chart3Canvas: ElementRef;
  // @ViewChild('chart4') chart4Canvas: ElementRef;
  // @ViewChild('chart5') chart5Canvas: ElementRef;
  @ViewChild("chart1", { static: false }) set content1(
    content: ElementRef
  ) {
    if (content) {
      // this.chart1Canvas = content;
      this.grafico1 = this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día', 'N° Pacientes','chart-1', 'Internados', 'Internados Ingresados x Emer.', 'bar');
      console.log(55, content)
      // console.log(56, this.chart5Canvas)
    }
  }
  @ViewChild("chart2", { static: false }) set content2(
    content: ElementRef
  ) {
    if (content) {
      this.grafico2 = this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'doughnut');
    }
  }
  @ViewChild("chart3", { static: false }) set content3(
    content: ElementRef
  ) {
    if (content) {
      // this.chart1Canvas = content;
      this.grafico3 = this.getBarChart(this.chartLabels3, this.chartData4, this.chartData5,'Día', 'N° Pacientes','chart-3', 'Ingresos x Hosp.', 'Ingresos x Emergencia.', 'bar');
    }
  }
  @ViewChild("chart4", { static: false }) set content4(
    content: ElementRef
  ) {
    if (content) {
      // this.chart1Canvas = content;
      this.grafico4 = this.getPieChart(this.chartLabels4, this.chartData6,'chart-4', 'doughnut');
    }
  }
  @ViewChild("chart5", { static: false }) set content5(
    content: ElementRef
  ) {
    if (content) {
      // this.chart1Canvas = content;
      this.grafico5 = this.getBarChart(this.chartLabels5, this.chartData7, this.chartData8,'Día', 'N° Pacientes','chart-5', 'Altas x Hosp.', 'Ingresos x Hosp.', 'bar');
    }
  }
  // @ViewChild("baseChart", { static: false }) set content(
  //   content: ElementRef
  // ) {
  //   if (content) {
      
  //     // initially setter gets called with undefined
  //     this.baseChart = content;
  //     console.log(55, this.baseChart)
  //     if (this.baseChart.nativeElement.id === 'chart-1'){
  //       this.grafico1 = this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día', 'N° Pacientes','chart-1', 'Internados', 'Internados Ingresados x Emer.', 'bar');
  //       this.grafico2 = this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'doughnut');
  //     }else if (this.baseChart.nativeElement.id === 'chart-3'){
  //       this.grafico3 = this.getBarChart(this.chartLabels3, this.chartData4, this.chartData5,'Día', 'N° Pacientes','chart-3', 'Ingresos x Hosp.', 'Ingresos x Emergencia.', 'bar');
  //       this.grafico4 = this.getPieChart(this.chartLabels4, this.chartData6,'chart-4', 'doughnut');
  //     }else if (this.baseChart.nativeElement.id === 'chart-5'){
  //       this.grafico5 = this.getBarChart(this.chartLabels5, this.chartData7, this.chartData8,'Día', 'N° Pacientes','chart-5', 'Altas x Hosp.', 'Ingresos x Hosp.', 'bar');
  //     }
  //   }
  // }
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
  public chartLabels3 = [];
  public chartLabels4 = [];
  public chartLabels5 = [];
  public chartData1 = [];
  public chartData2 = [];
  public chartData3 = [];
  public chartData4 = [];
  public chartData5 = [];
  public chartData6 = [];
  public chartData7 = [];
  public chartData8 = [];
  selectedOptionTipo='cantidad';
  selectedOptionTipo2='cantidad';
  selectedOptionTipo3='cantidad';
  progressBarLabels;
  progressBar1;
  porcCompaMesAntIngr;
  porcCompaMesAntAltas;
  porcCompaMesAntIngrEmerg;
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
    altas: '',
    fallecidos: '',
    admision: '',
    emergencia: '',
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
  rowsT1: any[];
  rowsT2: any[];
  rowsT3: any[];
  columns1: any;
  rows1: any;
  rows1filtered: any;
  rows3filtered1: any;
  rows3filtered2: any;
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



totalElements1: number;
pageNumber1: number;
totalElements2: number;
pageNumber2: number;
totalElements3: number;
pageNumber3: number;
cache: any = {};
isLoad = 0;
isLoading = 0;
selectedOptionGraph1 = 'pacientes_hospitalizados';
selectedOptionGraph2 = 'ingresos_hospitalizacion';
action: boolean = false;
  constructor(private tableApiservice: HospitalizationService, private exportService: ExportService,
    private _cp: CurrencyPipe, private modalService: NgbModal) { 
      this.pageNumber1 = 0;
      this.pageNumber2 = 0;
      this.pageNumber3 = 0;

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
  }

  ngOnInit(){

    // this.setPage({ offset: 0 });
  }

  removeGrah(grafico){
    grafico.destroy();
    
    console.log('grafico destruido', grafico)
    // delay(50000)
  }
  addData(chart, label,  data) {
    if(chart){
      this.removeData(chart) 
      chart.data.labels = label;
      chart.data.datasets.forEach((dataset, index) => {
          dataset.data = data[index];
          if (index === 0){
            // dataset.data = data1;
          }else if (index === 1){
            // dataset.data = data2;
          }
          // dataset.data = data;
      });
      chart.update();
    }
  }
  removeData(chart) {
      chart.data.labels = [];
      chart.data.datasets.forEach((dataset) => {
          dataset.data = [];
          console.log(663, dataset.data);
      });
      chart.update();
      
  }
  filter() {
    this.action = true;
    if(this.grafico1){
      console.log('grafico 1 existe')
      this.removeData(this.grafico1);
      this.removeGrah(this.grafico1);
      this.grafico1 = null;
    }
    if(this.grafico2){
      console.log('grafico 2 existe')
      this.removeData(this.grafico2);
      this.removeGrah(this.grafico2);
      this.grafico2 = null;
    }
    if(this.grafico3){
      console.log('grafico 3 existe')
      this.removeData(this.grafico3);
      this.removeGrah(this.grafico3);
      this.grafico3 = null;
    }
    if(this.grafico4){
      console.log('grafico 4 existe')
      this.removeData(this.grafico4);
      this.removeGrah(this.grafico4);
      this.grafico4 = null;
    }
    if(this.grafico5){
      console.log('grafico 5 existe')
      this.removeData(this.grafico5);
      this.removeGrah(this.grafico5);
      this.grafico5 = null;
    }
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
          },
          ticks: {
            beginAtZero: true,
            max: this.id_sede === '0000' ? 150 : 60,
            min: 0
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
          // formatter: function(value, context) {
          //   let sum = 0;
            
          //   let dataArr = context.chart.data.datasets[context.datasetIndex].data;
              
          //   dataArr.map((data) => {
          //     return sum += parseFloat(data);
          //   });
          //   // console.log(292,value , sum );
          //   if (sum > 0 ){
          //     return ((value * 100) / sum).toFixed(2) + '%';
          //   }else{
          //     return (0 + '%');
          //   }
            
          // },
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
  getRowClass1(row) {
    // console.log(751, row);
   
    return {
      'totals': row.GRUPO2.includes('Total')
    };
  }
  getRowClass2(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      'totals': row.RANGO.includes('Total')
    };
  }
  getRowClass3(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    if (row.EmpresaAseguradoraNombre !== undefined){
      return {
        'totals': row.EmpresaAseguradoraNombre.includes('Total')
      };
    }else if (row.grupo !== undefined ){
      return {
        'totals': row.grupo.includes('TOTAL')
      };
    } 
  }
  getRowClass8(row) {
    
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
      // console.log(836, input);
      // this.setPage1({
      //   offset: 0,
      //   pageSize: 0,
      //   limit: 0,
      //   count: 0
      // }, input);

      if (input === 'cantidad') {
        this.rows3filtered1 = this.rows3.filter(item =>item.GRUPOEM === 'CANTIDAD');
        this.setPage1({
          offset: 0,
          pageSize: 0,
          limit: 10,
          count: 0
        }, this.selectedOptionTipo2);
       } else if (input === 'soles'){
        this.rows3filtered2 = this.rows3.filter(item =>item.GRUPOEM === 'SOLES');
        this.setPage1({
          offset: 0,
          pageSize: 0,
          limit: 10,
          count: 0
        }, this.selectedOptionTipo2);
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
  tipoChangeGraph(event, graph){

    this.loading();
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
    const input = event;
    if (graph === 'bar'){
      // const lenght1 = this.rows1.length;
      if (input === 'pacientes_hospitalizados') {
        if(this.grafico1){
          console.log('grafico 1 existe')
          this.removeData(this.grafico1);
          this.removeGrah(this.grafico1);
          this.grafico1 = null;
        }
        this.parameters.tipo= 'INTE';
          this.tableApiservice.getHsChartIndex(this.parameters).subscribe(
            (response) => {  
                // this.chartData4 = [];   
                // this.chartData5 = [];   
                // this.chartData7 = [];   
                // this.chartData8 = [];   

                this.chartLabels1 = [];
                this.chartData1 = [];   
                this.chartData2 = [];

                
              if(response.data.success){
                
                response.data.data.map(item =>{
                  this.chartLabels1.push(item.dia);
                  this.chartData1.push(item.cantidad);
                  this.chartData2.push(item.procedencia);
                });
                // this.resumenMontos = response.data;
                
              }
              if(!this.grafico1){
                this.grafico1 = this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día', 'N° Pacientes','chart-1', 'Internados', 'Internados Ingresados x Emer.', 'bar');

              }else{
                var data = [];
                data.push(this.chartData1, this.chartData2);
                this.addData(this.grafico1, this.chartLabels1, data)
              }
              Swal.close();
            },
            (error) => {
                Swal.close();
            }
          );
       } else if (input === 'ingresos_hospitalizacion'){
          if(this.grafico3){
            console.log('grafico 3 existe')
            this.removeData(this.grafico3);
            this.removeGrah(this.grafico3);
            this.grafico3 = null;
          }
          this.parameters.tipo= 'INGR';
          this.tableApiservice.getHsChartIndex(this.parameters).subscribe(
            (response) => {  
                // this.chartData1 = [];   
                // this.chartData2 = [];   
                // this.chartData7 = [];   
                // this.chartData8 = [];   

                this.chartLabels3 = [];   
                this.chartData4 = [];
                this.chartData5 = [];    
              if(response.data.success){
                
                response.data.data.map(item =>{
                  this.chartLabels3.push(item.dia);
                  this.chartData4.push(item.cantidad);
                  this.chartData5.push(item.procedencia);
                });
                // this.resumenMontos = response.data;
                
              }
              if(!this.grafico3){
                this.grafico3 = this.getBarChart(this.chartLabels3, this.chartData4, this.chartData5,'Día', 'N° Pacientes','chart-3', 'Ingresos x Hosp.', 'Ingresos x Emergencia.', 'bar');

              }else{
                var data = [];
                data.push(this.chartData4, this.chartData5);
                this.addData(this.grafico3, this.chartLabels3, data)
              }
              
              Swal.close();
            },
            (error) => {
                Swal.close();
            }
          );
      } else if (input === 'altas_hospitalizacion'){
        if(this.grafico5){
          console.log('grafico 5 existe')
          this.removeData(this.grafico5);
          this.removeGrah(this.grafico5);
          this.grafico5 = null;
        }
        this.parameters.tipo= 'ALTA';
        this.tableApiservice.getHsChartIndex(this.parameters).subscribe(
          (response) => {  
              // this.chartData1 = [];   
              // this.chartData2 = [];   
              // this.chartData4 = [];   
              // this.chartData5 = [];

              this.chartLabels5 = [];   
              this.chartData7 = [];
              this.chartData8 = [];    
            if(response.data.success){
              
              response.data.data.map(item =>{
                this.chartLabels5.push(item.dia);
                this.chartData7.push(item.cantidad);
                this.chartData8.push(item.procedencia);
              });
              // this.resumenMontos = response.data;
              
            }
            if(!this.grafico5){
              this.grafico5 = this.getBarChart(this.chartLabels5, this.chartData7, this.chartData8,'Día', 'N° Pacientes','chart-5', 'Altas x Hosp.', 'Ingresos x Hosp.', 'bar');

            }else{
              var data = [];
              data.push(this.chartData7, this.chartData8);
              this.addData(this.grafico5, this.chartLabels5, data)
            }
            
            Swal.close();
          },
          (error) => {
              Swal.close();
          }
        );
      }
    } else if (graph === 'pie'){
      if (input === 'ingresos_hospitalizacion') {
        this.selectedOptionGraph2 = 'ingresos_hospitalizacion';
        this.parameters.tipo= 'INGR';
        this.tableApiservice.getHsTiposPacientes(this.parameters).subscribe(
          (response) => { 
            // console.log(1138,response);
            this.progressBarLabels = [];
            this.progressBar1 = [];
            let total = response.data.total_prog;
            if(response.data.success){
              this.totalProgs =  response.data.total_prog;
              for (let value of Object.values(response.data.tipo_prog)) {
                let porcentaje:any = Object.values(value);
                
                // this.progressBar1.push(datos);
                
                let label = Object.keys(value)[0];
                console.log('1533 => ', label);
                if ( label === 'seguros_conv'){
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
        this.tableApiservice.getHsPieIndex(this.parameters).subscribe(
          (response) => { 
            if(response.data.success){
              this.chartLabels2 = [];
              this.chartData3 = [];    
            // if(response.data.success){
              response.data.data.map(item =>{
                if(item.grupo ===''){
                  item.grupo = 'Otros'
                }
                this.chartLabels2.push(item.grupo);
                this.chartData3.push(item.cantidad);
              });
            // }
            if(!this.grafico2){
              this.grafico2 = this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'doughnut');

             }else{
              var data = [];
              data.push(this.chartData3);
              this.addData(this.grafico2, this.chartLabels2, data)
              // console.log(577, this.chartData1);
             } 
              
            }
            Swal.close();
          },
          (error) => {
              Swal.close();
          }
        );
      } else if (input === 'altas_hospitalizacion'){
        console.log(1097, this.selectedOptionGraph2)
        this.parameters.tipo= 'ALTA';
        this.parameters.typepie= 'AL';
        this.tableApiservice.getHsTiposPacientes(this.parameters).subscribe(
          (response) => { 
            console.log(1138,response);
            this.progressBarLabels = [];
            this.progressBar1 = [];
            let total = response.data.total_prog;
            if(response.data.success){
              this.totalProgs =  response.data.total_prog;
              for (let value of Object.values(response.data.tipo_prog)) {
                let porcentaje:any = Object.values(value);
                
                // this.progressBar1.push(datos);
                
                let label = Object.keys(value)[0];
                

                if ( label === 'seguros_conv'){
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
                  console.log(153333, datos);
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
        this.tableApiservice.getHsPieIndex(this.parameters).subscribe(
          (response) => { 
            // if(this.grafico2){
            //   console.log('grafico 2 existe')
            //   this.removeData(this.grafico2);
            //   this.removeGrah(this.grafico2);
            //   this.grafico2 = null;
            // }
            // if(this.grafico4){
            //   console.log('grafico 4 existe')
            //   this.removeData(this.grafico4);
            //   this.removeGrah(this.grafico4);
            //   this.grafico4 = null;
            // }
            if(response.data.success){
              this.chartLabels4 = [];
              this.chartData6 = [];    
              // if(response.data.success){
                
                response.data.data.map(item =>{
                  if(item.grupo ===''){
                    item.grupo = 'Otros'
                  }
                  this.chartLabels4.push(item.grupo);
                  this.chartData6.push(item.cantidad);
                });
              // }
              if(!this.grafico4){
                this.grafico4 = this.getPieChart(this.chartLabels4, this.chartData6,'chart-4', 'doughnut');
                
              }else{
               console.log('hola =>' , response)
              var data = [];
              data.push(this.chartData6);
              this.addData(this.grafico4, this.chartLabels4, data)
              console.log(577, response.data.data);
             }
              
            }
            Swal.close();
          },
          (error) => {
              Swal.close();
          }
        );
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
          item.MES1 = typeof item.MES1 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES1.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES1).toFixed(2));
          item.MES2 = typeof item.MES2 === 'number' ? 'S/. ' + this.separadorDeMiles(item.MES2.toFixed(2) ):  'S/. ' + this.separadorDeMiles(Number(item.MES2).toFixed(2));
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
formatPipe3(rows1) {
  // console.log(rows1);
  // const editRowslPipe = ((rows1) =>{
rows1.map(item => {
      
      if (item.GRUPO3 === 'SOLES' || item.GRUPOEM === 'SOLES' ){
        item.PER1 = typeof item.PER1 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER1.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER1).toFixed(2));
        item.PER2 = typeof item.PER2 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER2.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER2).toFixed(2));
        item.PER3 = typeof item.PER3 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER3.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER3).toFixed(2));
        item.PER4 = typeof item.PER4 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER4.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER4).toFixed(2));
        item.PER5 = typeof item.PER5 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER5.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER5).toFixed(2));
        item.PER6 = typeof item.PER6 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER6.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.MES6).toFixed(2));
        item.PER7 = typeof item.PER7 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER7.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER7).toFixed(2));
        item.PER8 = typeof item.PER8 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER8.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER8).toFixed(2));
        item.PER9 = typeof item.PER9 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER9.toFixed(2) ) :  'S/. ' + this.separadorDeMiles(Number(item.PER9).toFixed(2));
        item.PER10 = typeof item.PER10 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER10.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.PER10).toFixed(2));
        item.PER11 = typeof item.PER11 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER11.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.PER11).toFixed(2));
        item.PER12 = typeof item.PER12 === 'number' ? 'S/. ' + this.separadorDeMiles(item.PER12.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.PER12).toFixed(2));
        item.TOTAL = typeof item.TOTAL === 'number' ? 'S/. ' + (item.TOTAL.toFixed(2))  :'S/. ' + this.separadorDeMiles(Number(item.TOTAL).toFixed(2));
      }else{
        item.PER1 = typeof item.PER1 === 'number' ? this.separadorDeMiles(Math.round(item.PER1)) : this.separadorDeMiles(Math.round(Number(item.PER1)));
        item.PER2 = typeof item.PER2 === 'number' ? this.separadorDeMiles(Math.round(item.PER2)) : this.separadorDeMiles(Math.round(Number(item.PER2)));
        item.PER3 = typeof item.PER3 === 'number' ? this.separadorDeMiles(Math.round(item.PER3)) : this.separadorDeMiles(Math.round(Number(item.PER3)));
        item.PER4 = typeof item.PER4 === 'number' ? this.separadorDeMiles(Math.round(item.PER4)) : this.separadorDeMiles(Math.round(Number(item.PER4)));
        item.PER5 = typeof item.PER5 === 'number' ? this.separadorDeMiles(Math.round(item.PER5)) : this.separadorDeMiles(Math.round(Number(item.PER5)));
        item.PER6 = typeof item.PER6 === 'number' ? this.separadorDeMiles(Math.round(item.PER6)) : this.separadorDeMiles(Math.round(Number(item.PER6)));
        item.PER7 = typeof item.PER7 === 'number' ? this.separadorDeMiles(Math.round(item.PER7)) : this.separadorDeMiles(Math.round(Number(item.PER7)));
        item.PER8 = typeof item.PER8 === 'number' ? this.separadorDeMiles(Math.round(item.PER8)) : this.separadorDeMiles(Math.round(Number(item.PER8)));
        item.PER9 = typeof item.PER9 === 'number' ? this.separadorDeMiles(Math.round(item.PER9)) : this.separadorDeMiles(Math.round(Number(item.PER9)));
        item.PER10 = typeof item.PER10 === 'number' ? this.separadorDeMiles(Math.round(item.PER10)) : this.separadorDeMiles(Math.round(Number(item.PER10)));
        item.PER11 = typeof item.PER11 === 'number' ? this.separadorDeMiles(Math.round(item.PER11)) : this.separadorDeMiles(Math.round(Number(item.PER11)));
        item.PER12 = typeof item.PER12 === 'number' ? this.separadorDeMiles(Math.round(item.PER12)) : this.separadorDeMiles(Math.round(Number(item.PER12)));
        item.TOTAL = typeof item.TOTAL === 'number' ?  this.separadorDeMiles(Math.round(item.TOTAL)) : this.separadorDeMiles(Math.round(Number(item.TOTAL)));
      }
      return item.PER1,item.PER2,item.PER3,item.PER4,item.PER5,item.PER6,item.PER7,item.PER8,item.PER9,item.PER10,item.PER11,item.PER12, item.TOTAL;
    });
  // console.log(rows1);
// });
}
setPage1(pageInfo: PageInfo, dataN='cantidad') {

  console.log(1122, pageInfo);
  
this.pageNumber1 = pageInfo.offset;
const rowOffset = pageInfo.offset * pageInfo.pageSize;
this.page1.pageNumber = Math.floor(rowOffset / this.page1.size);
      if (this.selectedOptionTipo2 === 'cantidad'){
        this.isLoading++;

        this.getResults(this.page1, this.rows3filtered1).subscribe(pagedData => {
              this.totalElements1 = pagedData.page.totalElements;
              if (pagedData.data.length < pagedData.page.size){
                this.rowsT1 = pagedData.data
                for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
                  this.rowsT1[(index)] = { TipoPacienteNombre: '', idEmpresa: '', EmpresaAseguradoraNombre: '' , GRUPOEM: '' };
                }
              }else{
                this.rowsT1 = pagedData.data;
              }
              this.isLoading--;
            });
      }else if(this.selectedOptionTipo2 === 'soles'){
        const rowOffset = pageInfo.offset * pageInfo.pageSize;
        this.page1.pageNumber = Math.floor(rowOffset / this.page1.size);
        this.getResults(this.page1, this.rows3filtered2).subscribe(pagedData => {
          this.totalElements1 = pagedData.page.totalElements;
          if (pagedData.data.length < pagedData.page.size){
            this.rowsT1 = pagedData.data
            for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
              this.rowsT1[(index)] = { TipoPacienteNombre: '', idEmpresa: '', EmpresaAseguradoraNombre: '' , GRUPOEM: '' };
            }
           
          }else{
            this.rowsT1 = pagedData.data;
            
          }
          this.isLoading--;
        });
      }
}

setPage2(pageInfo: PageInfo) {
  this.pageNumber2 = pageInfo.offset;
  const rowOffset = pageInfo.offset * pageInfo.pageSize;
  this.page2.pageNumber = Math.floor(rowOffset / this.page2.size);
  this.isLoading++;
  this.getResults(this.page2, this.rows4).subscribe(pagedData => {
    console.log(1167, pagedData);
    this.totalElements2 = pagedData.page.totalElements;
    if (pagedData.data.length < pagedData.page.size){
      this.rowsT2 = pagedData.data
      for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
        this.rowsT2[(index)] = { CIE10: '', Diagnostico: '' };
      }
    }else{
      this.rowsT2 = pagedData.data;
    }
    this.isLoading--;
  });
}
setPage3(pageInfo: PageInfo) {
  this.pageNumber3 = pageInfo.offset;
  const rowOffset = pageInfo.offset * pageInfo.pageSize;

  this.page3.pageNumber = Math.floor(rowOffset / this.page3.size);
  this.isLoading++;
  this.getResults(this.page3, this.rows5).subscribe(pagedData => {
    console.log(1187, pagedData);
    this.totalElements3 = pagedData.page.totalElements;
    if (pagedData.data.length < pagedData.page.size){
      this.rowsT3 = pagedData.data
      for (let index = pagedData.data.length; index < pagedData.page.size; index++) {
        this.rowsT3[(index)] = { id_esp: '', especialidad: ''};
      }
    }else{
      this.rowsT3 = pagedData.data;
    }
    this.isLoading--;
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
 setPage(pageInfo) {
      console.log(1312, this.mes);

      this.parameters = {
        // periodo_consulta:this.periodo_consulta,
        sede: this.id_sede,
        mes: this.mes,
        // meses: this.mes,
        anio: this.anio,
        chkena: 'on',
        typepie: 'IN',
        tipo: 'INTE',
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
        this.selectedOptionGraph1 = 'pacientes_hospitalizados';
        this.selectedOptionGraph2 = 'ingresos_hospitalizacion';
            this.tableApiservice.getHsResumenGeneralProcesar(this.parameters).subscribe(
                (response) => {
                  // console.log(response);
                  if(response.data.success){
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
            this.tableApiservice.getHsAtencionesResumenAnual(this.parameters).subscribe(
              (response) => { 
                if(response.data.success){
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
                      // console.log(909, totalSoles1);
                    }
                  })
                  this.formatPipe(this.rows1);
                  this.rows1filtered = this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD');
                  console.log(1452, this.rows1filtered)
                  this.columns2 = response.data.cabeceras_rangoetareo;
                  this.rows2 = response.data.tabla_rangoetareo;
                  console.log(1455, this.rows2)
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
                  this.formatPipe(this.rows2);
                  this.temp2 = this.rows2;
                  this.columns3 = response.data.cabeceras_empresas;
    this.rows3 = response.data.tabla_empresas;




    this.formatPipe(this.rows3);
    
    // this.rowsT1 = this.rows3;
    this.rows3filtered1 = this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD');
    this.setPage1({
      offset: 0,
      pageSize: 0,
      limit: 10,
      count: 0
    }, this.selectedOptionTipo2);
    this.rows3filtered2 = this.rows3.filter(item => item.GRUPOEM === 'SOLES');
    // console.log(this.rows3filtered1);
                  this.columns4 = response.data.cabeceras_diagnostico;
                  this.rows4 = response.data.tabla_diagnostico;
                  this.setPage2({
                    offset: 0,
                    pageSize: 0,
                    limit: 0,
                    count: 0
                  });
                  this.rowsT2 = this.rows4;
                  this.temp4 = this.rows4;
                  this.columns5 = response.data.cabeceras_especialidades;
                  this.rows5 = response.data.tabla_especialidades;
                  this.setPage3({
                    offset: 0,
                    pageSize: 0,
                    limit: 10,
                    count: 0
                  });
                  this.rowsT3 = this.rows5;
                  this.temp5 = this.rows5;


                }
                Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );
            // this.tableApiservice.getHsAtencionesResumenAnual(this.parameters).subscribe(
            //   (response) => { 
            //     // console.log(982, response);
            //     if(response.data.success){
            //       this.columns6 = response.data.cabeceras_tpacientes_anual;
            //       this.rows6 = response.data.tabla_tpacientes_anual; 
            //       const totalCantidad6 = {
            //         GRUPO1: '',
            //         GRUPO2: '',
            //         GRUPO3: '',
            //         PER1: 0,
            //         PER2: 0,
            //         PER3: 0,
            //         PER4: 0,
            //         PER5: 0,
            //       };
            //       const totalSoles6 = {
            //         GRUPO1: '',
            //         GRUPO2: '',
            //         GRUPO3: '',
            //         PER1: 0,
            //         PER2: 0,
            //         PER3: 0,
            //         PER4: 0,
            //         PER5: 0,
            //       };
            //       this.rows6.map((item, index)=>{
            //         if(item.GRUPO3 === 'CANTIDAD'){
            //           totalCantidad6.PER1 += Number(item.PER1);
            //           totalCantidad6.PER2 += Number(item.PER2);
            //           totalCantidad6.PER3 += Number(item.PER3);
            //           totalCantidad6.PER4 += Number(item.PER4);
            //           totalCantidad6.PER5 += Number(item.PER5);
            //         }else if(item.GRUPO3 === 'SOLES'){
            //           totalSoles6.PER1 += Number(item.PER1);
            //           totalSoles6.PER2 += Number(item.PER2);
            //           totalSoles6.PER3 += Number(item.PER3);
            //           totalSoles6.PER4 += Number(item.PER4);
            //           totalSoles6.PER5 += Number(item.PER5);
            //         }
            //         if(this.rows6.length === index+2 ){
            //           totalCantidad6.GRUPO1 ="";
            //           totalCantidad6.GRUPO2 = 'Total';
            //           totalCantidad6.GRUPO3 = 'CANTIDAD';
            //           this.rows6.push(totalCantidad6);
            //           totalSoles6.GRUPO1 ="";
            //           totalSoles6.GRUPO2 = 'Total';
            //           totalSoles6.GRUPO3 = 'SOLES';
            //           this.rows6.push(totalSoles6);
            //         }
            //       });

            //       this.formatPipe3(this.rows6);
            //       this.rows6filtered = this.rows6.filter(item => item.GRUPO3 === 'CANTIDAD');
            //       this.columns7 = response.data.cabeceras_rangoetareo_anual;
            //       this.rows7 = response.data.tabla_rangoetareo_anual;
            //       // console.log(1153, this.rows7);
            //       const totalRango7 = {
            //         RANGO: '',
            //         PER1: 0,
            //         PER2: 0,
            //         PER3: 0,
            //         PER4: 0,
            //         PER5: 0,
            //       };
            //       this.rows7.map((item, index)=>{

            //           totalRango7.PER1 += Number(item.PER1);
            //           totalRango7.PER2 += Number(item.PER2);
            //           totalRango7.PER3 += Number(item.PER3);
            //           totalRango7.PER4 += Number(item.PER4);
            //           totalRango7.PER5 += Number(item.PER5);
            //         if(this.rows7.length === index+1 ){
            //           totalRango7.RANGO = 'Total';
            //           this.rows7.push(totalRango7);
            //         }
            //       });
            //       this.formatPipe3(this.rows7);
            //       this.temp7 = this.rows7;
            //     }
            //     Swal.close();
            //   },
            //   (error) => {
            //       Swal.close();
            //   }
            // );

            this.tableApiservice.getHsTiposPacientes(this.parameters).subscribe(
              (response) => { 
                // console.log(1138,response);
                this.progressBarLabels = [];
                this.progressBar1 = [];
                let total = response.data.total_prog;
                console.log(1533, response);
                if(response.data.success){
                  this.totalProgs =  response.data.total_prog;
                  for (let value of Object.values(response.data.tipo_prog)) {
                    let porcentaje:any = Object.values(value);
                    // this.progressBar1.push(datos);
                    
                    let label = Object.keys(value)[0];
                    console.log(1752, label)
                    if ( label === 'seguros_conv'){
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

            this.tableApiservice.getHsCalcularMontos(this.parameters).subscribe(
              (response) => { 
                console.log(1718, response)
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
            this.tableApiservice.getHsProcesarAnterior(this.parameters).subscribe(
              (response) => {
                console.log(1874, response);
                if(response.data.success){ 
                    this.resumenMesAnterior = response.data;
                    this.porcCompaMesAntIngr =  (((this.resumenMes.total - this.resumenMesAnterior.total) / this.resumenMesAnterior.total) * 100).toFixed(2)
                    this.porcCompaMesAntAltas = (((this.resumenMes.altas - this.resumenMesAnterior.altas) / this.resumenMesAnterior.altas) * 100).toFixed(2)
                    this.porcCompaMesAntIngrEmerg = (((this.resumenMes.emergencia - this.resumenMesAnterior.emergencia) / this.resumenMesAnterior.emergencia) * 100).toFixed(2)
                
                this.resumenMes.total = this.separadorDeMiles(this.resumenMes.total);
                  // this.resumenMes.ausentismo = this.separadorDeMiles(this.resumenMes.ausentismo);
                  // this.resumenMes.medico = this.separadorDeMiles(this.resumenMes.medico);
                  // this.resumenMes.paciente = this.separadorDeMiles(this.resumenMes.paciente);
                  // this.resumenMes.anuladas = this.separadorDeMiles(this.resumenMes.anuladas);
                  // this.resumenMes.reservadas = this.separadorDeMiles(this.resumenMes.reservadas);
                  }
                Swal.close(); 
              },
              (error) => {
                  Swal.close();
              }
            );
// chart y pie
            this.tableApiservice.getHsChartIndex(this.parameters).subscribe(
              (response) => {  

                  this.chartLabels1 = [];
                  this.chartData1 = [];   
                  this.chartData2 = [];  
                if(response.data.success){
                  
                  response.data.data.map(item =>{
                    this.chartLabels1.push(item.dia);
                    this.chartData1.push(item.cantidad);
                    this.chartData2.push(item.procedencia);
                  });
                  // this.resumenMontos = response.data;
                  
                }
                if(!this.grafico1){
                  this.grafico1 = this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día', 'N° Pacientes','chart-1', 'Internados', 'Internados Ingresados x Emer.', 'bar');
  
                }else{
                  var data = [];
                  data.push(this.chartData1, this.chartData2);
                  this.addData(this.grafico1, this.chartLabels1, data)
                }
                
                Swal.close();
              },
              (error) => {
                  Swal.close();
              }
            );
            this.parameters.tipo = 'INGR';
            this.tableApiservice.getHsPieIndex(this.parameters).subscribe(
              (response) => { 
    
                if(response.data.success){
                  this.chartLabels2 = [];
                  this.chartData3 = [];    
                if(response.data.success){
                  
                  response.data.data.map(item =>{
                    this.chartLabels2.push(item.grupo);
                    this.chartData3.push(item.cantidad);
                  });
                  // this.resumenMontos = response.data;
                  
                }
                if(!this.grafico2){
                  this.grafico2 = this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'doughnut');

                 }else{
                  var data = [];
                  data.push(this.chartData3);
                  this.addData(this.grafico2, this.chartLabels2, data)
                  // console.log(577, this.chartData1);
                 } 
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
    if(numberT === '1'){
      console.log(1598, numberT);
      this.setPage1({
        offset: 0,
        pageSize: 0,
        limit: 0,
        count: 0
      }, this.selectedOptionTipo2);
      // if (this.selectedOptionTipo2 === 'cantidad'){
      //   this.setPage1({
      //     offset: 0,
      //     pageSize: 0,
      //     limit: 0,
      //     count: 0
      //   }, this.selectedOptionTipo2);
      // }else if (this.selectedOptionTipo2 === 'soles'){
      //   this.setPage1({
      //     offset: 0,
      //     pageSize: 0,
      //     limit: 0,
      //     count: 0
      //   }, this.selectedOptionTipo2);
      // }
      
    }if(numberT === '2'){
      console.log(1598, numberT);
      this.setPage2({
        offset: 0,
        pageSize: 0,
        limit: 0,
        count: 0
      });
    }if(numberT === '3'){
      console.log(1598, numberT);
      this.setPage3({
        offset: 0,
        pageSize: 0,
        limit: 0,
        count: 0
      });
    }else{
      this.setPage({ offset: 0 });
    }
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
    updateFilter3(event) {
      const input = event.target.value.toLowerCase();

      // filter our data
      if (input.length > 0) {
        if(this.selectedOptionTipo2 === 'cantidad'){ 
          const filtered = this.rows3filtered1
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
          this.rowsT1 = [...filtered]
          this.totalElements1 = this.rowsT1.length;
        }else if (this.selectedOptionTipo2 === 'soles'){
          const filtered = this.rows3filtered2
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
          this.rowsT1 = [...filtered]
          this.totalElements1 = this.rowsT1.length;
        }
        
        
      } else {
        this.setPage1({
          offset: this.page1.pageNumber,
          pageSize: this.page1.size,
          limit: this.page1.size,
          count: this.page1.totalElements
        }, this.selectedOptionTipo2);
       
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
        this.rowsT2 = [...filtered]
        this.totalElements2 = this.rowsT2.length;

      } else {
        this.setPage2({
          offset: this.page2.pageNumber,
          pageSize: this.page2.size,
          limit: this.page2.size,
          count: this.page2.totalElements
        });
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
        this.rowsT3 = [...filtered]
        this.totalElements3 = this.rowsT3.length;
      } else {
        this.setPage3({
          offset: this.page3.pageNumber,
          pageSize: this.page3.size,
          limit: this.page3.size,
          count: this.page3.totalElements
        });
       
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
        const filtered = this.rows6filtered
          .filter(el =>
            Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
          );
          // console.log(filtered);
        this.rows6filtered = [...filtered]
        
      } else {
        if(this.selectedOptionTipo3 === 'cantidad'){
          this.rows6filtered = [...this.rows6.filter(item => item.GRUPO3 === 'CANTIDAD')]
        }else if (this.selectedOptionTipo3 === 'soles'){
          this.rows6filtered = [...this.rows6.filter(item => item.GRUPO3 === 'SOLES')]
        }
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
      this.tableApiservice.getHsMedicosStatistics(parameters).subscribe(
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
     
      let count: number = 0;
      let re = /\,/gi;
      let re1 = /\S\/./gi;
          
          cells.filter((cell) => { 
              if (cell != null && cell != undefined) {
  
                if (cell.indexOf('S/.') > -1){
                  count = count + +cell.replace(re1, '').replace(',', '');
                }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
                      count = count + +cell.replace(re, '');
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
            return count.toString().indexOf('-') > -1 ? 'S/. ' + count.toLocaleString().replace('-', '(').concat(')') : 'S/. ' + count.toLocaleString();
          }else{
            return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') :  count.toLocaleString();
          }
    }
    private summaryNull(cells: any): null {
          return null;
    }

}
