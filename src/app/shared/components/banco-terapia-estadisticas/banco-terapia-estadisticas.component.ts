import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { ImagenesService } from 'src/app/_services/imagenes.service';
import { NumberDecimalPipe } from 'src/app/pipes/numberDecimal.pipe';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LinkRendererComponent } from '../../../shared/components/renderer/link-renderer.component';
import { RowDetalleComponent } from 'src/app/modals/jpric/row-detalle/row-detalle.component';
import { AgGridAngular } from 'ag-grid-angular';
import { PorcentajePipe } from 'src/app/pipes/porcentaje.pipe';

@Component({
  selector: 'app-banco-terapia-estadisticas',
  templateUrl: './banco-terapia-estadisticas.component.html',
  styleUrls: ['./banco-terapia-estadisticas.component.scss']
})
export class BancoTerapiaEstadisticasComponent implements OnInit {
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
  grafico1: Chart;
  grafico2: Chart;
  grafico3: Chart;
  grafico4: Chart;
  barChartLabels1 = [];
  barChartLabels2 = [];
  barChartData1 = [];
  barChartData2 = [];
  barChartData3 = [];
  barChartData3Total = [];
  barChartData4 = [];

  barChartData5 = [];
  barChartData6 = [];
  barChartData7 = [];
  barChartData7Total = [];
  barChartData8 = [];

  barChartData9 = [];
  barChartData10 = [];
  barChartData11 = [];
  barChartData12 = [];
  barChartData13 = [];
  barChartData14 = [];
  barChartData15 = [];
  barChartData16 = [];
  private baseChart: ElementRef;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      // initially setter gets called with undefined
      this.baseChart = content;
      this.grafico1 = this.getBarChartA(this.barChartLabels1, this.barChartData1, this.barChartData2,this.barChartData3,this.barChartData3Total,'', '','chart-1', 'Lima', 'Chorrillos','Surco','Total', 'line');
      this.grafico2 = this.getBarChartB(this.barChartLabels1, this.barChartData4, this.barChartData5,this.barChartData6,this.barChartData7,this.barChartData7Total,'', '','chart-2', 'Cia. Seguros/Convenios', 'Madre Niño','Institucional/Privado','Programas de Salud','Total','line');
      this.grafico3 = this.getBarChart1(this.barChartLabels2, this.barChartData8, this.barChartData9,this.barChartData10,'', '','chart-3', 'Lima', 'Chorrillos','Surco','line');
      this.grafico4 = this.getBarChart(this.barChartLabels2,this.barChartData11, this.barChartData12, this.barChartData13,this.barChartData14,'', '','chart-4', 'Cia. Seguros/Convenios', 'Madre Niño','Institucional/Privado','Programas de Salud', 'line');
  } }
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
  columns22:any;
  columns13:any;
  columns14:any;
  columns15:any;
  columns16:any;
  columns_TipoEx_sede:any;

  rows: any;
  rows1: any;
  rows2: any;
  rows3: any;
  rows4: any;
  rows9filtered = [];
  rows10filtered = [];
  rows11filtered = [];
  rows12filtered = [];
  rows22filtered = [];
  rows_TipoEx_sede_filter = [];
  rows5: any;
  rows6: any;
  rows7: any;
  rows8: any;
  rows9: any;
  rows10: any;
  rows11: any;
  rows12: any;
  rows22: any;
  rows13: any;
  rows14: any;
  rows15: any;
  rows16: any;
  rows_TipoEx_sede: any;

  temp: any [];
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
  id_sede: any = '000';
  isTable9 = true;
  isTable10 = true;
  isTable13 = true;
  isTable14 = true;

  isGrafico1 = false;
  isGrafico2 = false;
  isGrafico3 = false;
  isGrafico4 = false;

  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;
  checkBoxesOps1: any[] = [
    {
      id: '1a',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: '2a',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];
  checkBoxesOps2: any[] = [
    {
      id: '1b',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: '2b',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];
  checkBoxesOps21: any[] = [
    {
      id: '1cc',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: '2cc',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];
  checkBoxesOps3: any[] = [
    {
      id: '1c',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: '2c',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];
  checkBoxesOps4: any[] = [
    {
      id: '1d',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: '2d',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];

  checkBoxesOps22: any[] = [
    {
      id: '1e',
      label: 'Montos',
      template: null,
      value: true
    },
    {
      id: '2e',
      label: 'Cantidad',
      template: null,
      value: false
    }
  ];

  private rowClassRules;
  action: boolean = false;
  @Input() area: string;

  public lstDeExamenes: Array<any> = [];

  constructor(private tableApiservice: ImagenesService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private _pp:PorcentajePipe, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.filtroForm = new FormGroup({
      anio: new FormControl(this.anio),
      mes: new FormControl(this.mes),
      id_sede: new FormControl(this.id_sede),
  });
  this.frameworkComponents = {
    buttonRenderer: LinkRendererComponent,
  }
  this.rowClassRules = {
    "totals": function(params) {
       console.log(301, params); 
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
  selection(option, id: string, tabla) {
    console.log('=>',this.rows6)
    if (tabla === 1){
      this.checkBoxesOps1.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1a'){
            this.rows9filtered = this.rows9.filter(item => item.solesCantidad === 'soles');
          }else if(id === '2a'){
            console.log(255, id)
            this.rows9filtered = this.rows9.filter(item => item.solesCantidad === 'cantidad');
          }
        }else{
          x.value = false;
        }
      });
    }else if (tabla === 2){
      
      this.checkBoxesOps2.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1b'){
            this.rows10filtered = this.rows10.filter(item => item.solesCantidad === 'soles');
          }else if(id === '2b'){
            console.log(255, id)
            this.rows10filtered = this.rows10.filter(item => item.solesCantidad === 'cantidad');
          }
        }else{
          x.value = false;
        }
      });
    } else if (tabla === 21){
      this.checkBoxesOps21.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if (id === '1cc') {
            this.rows_TipoEx_sede_filter = this.rows_TipoEx_sede.filter(item => item.solesCantidad === 'soles');
          } else if (id === '2cc') {
            console.log(255, id)
            this.rows_TipoEx_sede_filter = this.rows_TipoEx_sede.filter(item => item.solesCantidad === 'cantidad');
          }
        } else {
          x.value = false;
        }
      });
    }else if (tabla === 22){
      this.checkBoxesOps22.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1e'){
            this.rows22filtered = this.rows22.filter(item => item.solesCantidad === 'soles');
          }else if(id === '2e'){
            console.log(22, id)
            this.rows22filtered = this.rows22.filter(item => item.solesCantidad === 'cantidad');
          }
        }else{
          x.value = false;
        }
      });
    }else if (tabla === 3){
      this.checkBoxesOps3.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1c'){
            this.rows11filtered = this.rows11.filter(item => item.solesCantidad === 'soles');
          }else if(id === '2c'){
            console.log(255, id)
            this.rows11filtered = this.rows11.filter(item => item.solesCantidad === 'cantidad');
          }
        }else{
          x.value = false;
        }
      });
    }else if (tabla === 4){
      
      this.checkBoxesOps4.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1d'){
            this.rows12filtered = this.rows12.filter(item => item.solesCantidad === 'soles');
          }else if(id === '2d'){
            console.log(255, id)
            this.rows12filtered = this.rows12.filter(item => item.solesCantidad === 'cantidad');
          }
        }else{
          x.value = false;
        }
      });
    }
  }
  getRowClass(row) {
    console.log('getclass', row)
    return {
      'totals': row.Campo.includes('TOTAL'), 'sub-totals': row.Campo === 'CIA. SEGUROS/CONVENIOS' || row.Campo === 'INSTITUCIONAL/PRIVADO' || row.Campo === 'MADRE NIÑO' || row.Campo === 'PROGRAMAS DE SALUD' 
    };
  }
  getRowClass1(row) {
    return {
      'sub-totals': row.Campo === 'CIA. SEGUROS/CONVENIOS' || row.Campo === 'INSTITUCIONAL/PRIVADO' || row.Campo === 'MADRE NIÑO' || row.Campo === 'PROGRAMAS DE SALUD'};
  }
  getRowClass2(row) {
    return {
      'sub-totals': row.Campo === 'LIMA' || row.Campo === 'CHORRILLOS' || row.Campo === 'SURCO' || row.Campo === 'TOTAL'};
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
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.setPage({ offset: 0 });

  }
  getBarChart(chartLabels1, chartData1, chartData2,chartData3,chartData4,scaleLabel1,scaleLabel2, chartNum, title, title2, title3, title4,typeChart) {

      const data = {
        labels: chartLabels1,
        datasets: [
          {
            barPercentage: 0.8,
            categoryPercentage: 1,
            label: title,
            borderColor: '#28a74559',
            borderWidth: 4,
            fill: false,
            data: chartData1,
            backgroundColor: '#28a74559'
            // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
            // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          },
          {
            label: title2,
            borderColor: '#6610f259',
            borderWidth: 4,
            fill: false,
            data: chartData2,
            backgroundColor     : '#6610f259',
            // borderColor         : 'rgba(33,104,163,1)',
            // backgroundColor: 'rgb(255, 164, 8, 0.7)',
            // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
            // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
            type                : 'line',
          },
          {
            label: title3,
            borderColor: '#ffa40859',
            borderWidth: 4,
            fill: false,
            data: chartData3,
            backgroundColor: '#ffa40859'
            // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
            // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          },
          {
            label: title4,
            borderColor: '#eb445a59',
            borderWidth: 4,
            fill: false,
            data: chartData4,
            backgroundColor: '#eb445a59'
            // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
            // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          },
          // {
          //   label: title5,
          //   // borderColor: 'rgba(99, 255, 132, 1)',
          //   borderWidth: 1,
          //   data: chartData5,
          //   backgroundColor: '#eb445a59'
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
            // max: 300,
            // min: 0
          }
        }],
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
          formatter: function (dato, ctx) {
            return Math.round(dato * 100) / 100; 
          },
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
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';
            
              if (label) {
                  label += ': ';
              }
              label += Math.round(tooltipItem.yLabel * 100) / 100;
              // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
              // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
              
              return label;
          },
          title: function(tooltipItem, data) {
           var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
            return title;
        }
        }
      }
    };
    return this.getChart(chartNum, typeChart, data, options);
    
  }
  getBarChart1(chartLabels1, chartData1, chartData2,chartData3,scaleLabel1,scaleLabel2, chartNum, title, title2, title3,typeChart) {

    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          borderColor: '#28a74559',
          borderWidth: 4,
          fill: false,
          data: chartData1,
          backgroundColor: '#28a74559'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title2,
          borderColor: '#6610f259',
          borderWidth: 4,
          fill: false,
          data: chartData2,
          backgroundColor     : '#6610f259',
          // borderColor         : 'rgba(33,104,163,1)',
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : 'line',
        },
        {
          label: title3,
          borderColor: '#ffa40859',
          borderWidth: 4,
          fill: false,
          data: chartData3,
          backgroundColor: '#ffa40859'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        // {
        //   label: title4,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 1,
        //   data: chartData4,
        //   backgroundColor: '#eb445a59'
        //   // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        //   // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        // },
        // {
        //   label: title5,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 1,
        //   data: chartData5,
        //   backgroundColor: '#eb445a59'
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
          // max: 300,
          // min: 0
        }
      }],
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
        formatter: function (dato, ctx) {
          return Math.round(dato * 100) / 100; 
        },
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
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
          
            if (label) {
                label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
            // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
            
            return label;
        },
        title: function(tooltipItem, data) {
         var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
          return title;
      }
      }
    }
  };
  return this.getChart(chartNum, typeChart, data, options);
  
}
getBarChartA(chartLabels1, chartData1, chartData2,chartData3,chartData4,scaleLabel1,scaleLabel2, chartNum, title, title2, title3, title4,typeChart) {
console.log('grafico',chartData4)
  const data = {
    labels: chartLabels1,
    datasets: [
      {
        barPercentage: 0.8,
        categoryPercentage: 1,
        label: title,
        borderColor: '#28a74559',
        borderWidth: 4,
        fill: false,
        data: chartData1,
        backgroundColor: '#28a74559'
        // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
      },
      {
        label: title2,
        borderColor: '#6610f259',
        borderWidth: 4,
        fill: false,
        data: chartData2,
        backgroundColor     : '#6610f259',
        // borderColor         : 'rgba(33,104,163,1)',
        // backgroundColor: 'rgb(255, 164, 8, 0.7)',
        // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        type                : 'line',
      },
      {
        label: title3,
        borderColor: '#ffa40859',
        borderWidth: 4,
        fill: false,
        data: chartData3,
        backgroundColor: '#ffa40859'
        // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
      },
      {
        label: title4,
        // borderColor: 'rgba(99, 255, 132, 1)',
        borderWidth: 1,
        data: chartData4,
        backgroundColor: '#20c99735',
        // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        type                : 'bar',
      },
      // {
      //   label: title5,
      //   // borderColor: 'rgba(99, 255, 132, 1)',
      //   borderWidth: 1,
      //   data: chartData5,
      //   backgroundColor: '#eb445a59'
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
        // max: 300,
        // min: 0
      }
    }],
  },
  plugins: {
    datalabels: {
      
      /* anchor puede ser "start", "center" o "end" */
      anchor: 'end',
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
      formatter: function (dato, ctx) {
        return Math.round(dato * 100) / 100; 
      },
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
  },
  tooltips: {
    enabled: true,
    callbacks: {
      label: function(tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
        
          if (label) {
              label += ': ';
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
          // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
          
          return label;
      },
      title: function(tooltipItem, data) {
       var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
        return title;
    }
    }
  }
};
return this.getChart(chartNum, typeChart, data, options);

}
getBarChartB(chartLabels1, chartData1, chartData2,chartData3,chartData4,chartData5,scaleLabel1,scaleLabel2, chartNum, title, title2, title3, title4,title5,typeChart) {
  console.log('grafico',chartData4)
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          borderColor: '#28a74559',
          borderWidth: 4,
          fill: false,
          data: chartData1,
          backgroundColor: '#28a74559'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title2,
          borderColor: '#6610f259',
          borderWidth: 4,
          fill: false,
          data: chartData2,
          backgroundColor     : '#6610f259',
          // borderColor         : 'rgba(33,104,163,1)',
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : 'line',
        },
        {
          label: title3,
          borderColor: '#ffa40859',
          borderWidth: 4,
          fill: false,
          data: chartData3,
          backgroundColor: '#ffa40859'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title4,
          borderColor: '#eb445a59',
          borderWidth: 4,
          fill: false,
          data: chartData4,
          backgroundColor: '#20c99759',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          
        },
        {
          label: title5,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: chartData5,
          backgroundColor: '#eb445a35',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : 'bar',
        }
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
          // max: 300,
          // min: 0
        }
      }],
    },
    plugins: {
      datalabels: {
        
        /* anchor puede ser "start", "center" o "end" */
        anchor: 'end',
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
        formatter: function (dato, ctx) {
          return Math.round(dato * 100) / 100; 
        },
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
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
          
            if (label) {
                label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
            // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
            
            return label;
        },
        title: function(tooltipItem, data) {
         var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
          return title;
      }
      }
    }
  };
  return this.getChart(chartNum, typeChart, data, options);
  
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
      sede:this.id_sede,
      area: this.area,
      tipo: 0,
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading();
    this.tableApiservice.imgsEstadisticasGetResumen(this.parameters).subscribe(
      (response) => {
        this.rows = [];
        this.barChartLabels1 = [];
        this.barChartLabels2 = [];
        this.barChartData1 = [];
        this.barChartData2 = [];
        this.barChartData3 = [];
        this.barChartData4 = [];
      
        this.barChartData5 = [];
        this.barChartData6 = [];
        this.barChartData7 = [];
        this.barChartData8 = [];
      
        this.barChartData9 = [];
        this.barChartData10 = [];
        this.barChartData11 = [];
        this.barChartData12 = [];
        this.barChartData13 = [];
        this.barChartData14 = [];
        if(response.data.success){
          this.data = response.data ? response.data : [];
          this.title = this.data.titulo;

          this.asignarLstDeExamenes(this.data.tabla_examen_lista);

          // // this.columns = this.data.cabeceras_ingresos_TPac;
          // // this.rows = this.data.tabla_ingresos_TPac;
          // // // this.temp = this.rows;
          this.columns1 = this.data.cabecera_sucursal;
          this.columns1.map(item => {
            // console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field !== 'grupo' && subitem.field !== 'pUtilidad'  ){
                  subitem.cellRenderer = this.CurrencyCellRendererPEN
                }
                if(subitem.field === 'pUtilidad'  ){
                  subitem.cellRenderer = this.PorcentCellRendererPEN
                }
             })
            }
          })
          
          
          this.rows1 = this.data.tabla_sucursal;
          let ingreso = 0;
          let empresa = 0;
          let esperado = 0;
          let planilla = 0;
          let honorarios = 0;
          let suministros = 0;
          let costos = 0;
          let utilidad = 0;
          let pUtilidad = 0;
          this.rows1.map(item => {
            ingreso += Number(item.ingreso)
            empresa += Number(item.empresa)
            esperado += Number(item.esperado)
            planilla += Number(item.planilla)
            honorarios += Number(item.honorarios)
            suministros += Number(item.suministros)
            costos += Number(item.costos)
            utilidad += Number(item.utilidad)
          })
          const total = {
            grupo: 'TOTAL',
            ingreso: ingreso,
            empresa: empresa,
            esperado: esperado,
            planilla: planilla,
            honorarios: honorarios,
            suministros: suministros,
            costos: costos,
            utilidad: utilidad,
            pUtilidad: '000'
          }
          console.log(709, total)
          this.rows1.push(total);
          this.columns2 = this.data.cabecera_sucursal_origen;
          this.columns2.map(item =>{
            if(item.pipe === 'numberDecimal'){
              item.pipe = this._ndp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          }); 
          // this.columns2.map(item => {
          //   console.log(301, item)
          //   if(item.children){
          //     item.children.map(subitem =>{
          //       if(subitem.field === 'monto_lima' || subitem.field === 'monto_chorrillos' || subitem.field === 'monto_surco' || subitem.field === 'monto_total'){
          //         subitem.cellRenderer = this.CurrencyCellRendererPEN
          //       }
          //    })
          //   }
          // })
          this.rows2 = this.data.tabla_sucursal_origen;
          
          this.columns3 = this.data.cabecera_sucursal_gtpac;
          this.columns3.map(item =>{
            if(item.pipe === 'numberDecimal'){
              item.pipe = this._ndp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          }); 
          this.rows3 = this.data.tabla_sucursal_gtpac;

          this.columns4 = this.data.cabecera_tpac;
          this.columns4.map(item =>{
            if(item.pipe === 'numberDecimal'){
              item.pipe = this._ndp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          }); 
          this.rows4 = this.data.tabla_tpac;

          // // // this.rows4filtered = this.rows4.filter(item => item.sucursal === 'TODAS');

          this.columns5 = this.data.cabecera_gtpac_tpac;
          this.columns5.map(item =>{
            if(item.pipe === 'numberDecimal'){
              item.pipe = this._ndp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          }); 
          // this.columns5.map(item => {
           
          //   if(item.children){
          //     item.children.map(subitem =>{
          //       if(subitem.field === 'monto_lima' || subitem.field === 'monto_chorrillos' || subitem.field === 'monto_surco' || subitem.field === 'monto_total'){
          //         subitem.cellRenderer = this.CurrencyCellRendererPEN
          //         // subitem.setPinnedBottomRowData =  {function(params)  { 
          //         //   console.log(291,params)
          //         //   return '<strong>' + params.data.monto_lima + '</strong>'
          //         // }}
                  
          //       }
          //    });
             
          //   }
            
          // }) 
          // // console.log(301, this.columns5)
          this.rows5 = this.data.tabla_gtpac_tpac;
          // // this.temp5 = this.rows5;

          this.columns6 = this.data.cabecera_gtexamen;
          this.columns6.map(item =>{
            if(item.pipe === 'numberDecimal'){
              item.pipe = this._ndp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          }); 
          this.rows6 = this.data.tabla_gtexamen;
          
          this.columns7 = this.data.cabecera_examen_lista;
          this.columns7.map(item => {
            // console.log(301, item)
            if(item.children){
              item.children.map(subitem =>{
                if(subitem.field !== 'idServicio_Nombre' && subitem.field !== 'Componente_Nombre' && subitem.field !== 'Lima_Cantidad' && subitem.field !== 'Chorrillos_Cantidad' && subitem.field !== 'Chorrillos_Cantidad' && subitem.field !== 'Surco_Cantidad' && subitem.field !== 'Total_Cantidad'){
                  subitem.cellRenderer = this.CurrencyCellRendererPEN
                }
             })
            }
          })
          this.rows7 = this.data.tabla_examen_lista;
          this.rows7.map(item =>{
            item.Lima_Cantidad = this._cnp.transform(item.Lima_Cantidad);
            item.Chorrillos_Cantidad = this._cnp.transform(item.Chorrillos_Cantidad);
            item.Surco_Cantidad = this._cnp.transform(item.Surco_Cantidad);
            item.Total_Cantidad = this._cnp.transform(item.Total_Cantidad);
          }); 
          this.columns8 = this.data.cabecera_detalle_empresa;

          this.columns8.map(item =>{
            if(item.pipe === 'numberDecimal'){
              item.pipe = this._ndp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          }); 

          this.rows8 = this.data.tabla_detalle_empresa;
          this.temp = this.rows8;
          this.barChartLabels1 = [];
          // // this.temp8 = this.rows8;
          this.columns9 = this.data.cabecera_anual_sede;
          this.columns9.map(item =>{
            if(item.prop !== 'Campo' && item.prop !== 'total' ){
              this.barChartLabels1.push(item.name);
            }
          });
          this.rows9 = this.data.tabla_anual_sede;
          this.rows9filtered = this.rows9.filter(item => item.solesCantidad === 'soles');

          console.log(651, this.rows9)
          let aTotalMes1 = 0;
          let aTotalMes2 = 0;
          let aTotalMes3 = 0;
          let aTotalMes4 = 0;
          let aTotalMes5 = 0;
          let aTotalMes6 = 0;
          let aTotalMes7 = 0;
          let aTotalMes8 = 0;
          let aTotalMes9 = 0;
          let aTotalMes10 = 0;
          let aTotalMes11 = 0;
          let aTotalMes12 = 0;
          this.rows9.map(item =>{
            if(item.Campo === 'Lima' && item.solesCantidad === 'soles'){
              aTotalMes1 += Number(item.mes_01)
              aTotalMes2 += Number(item.mes_02)
              aTotalMes3 += Number(item.mes_03)
              aTotalMes4 += Number(item.mes_04)
              aTotalMes5 += Number(item.mes_05)
              aTotalMes6 += Number(item.mes_06)
              aTotalMes7 += Number(item.mes_07)
              aTotalMes8 += Number(item.mes_08)
              aTotalMes9 += Number(item.mes_09)
              aTotalMes10 += Number(item.mes_10)
              aTotalMes11 += Number(item.mes_11)
              aTotalMes12 += Number(item.mes_12)
              this.barChartData1.push(item.mes_01);
              this.barChartData1.push(item.mes_02);
              this.barChartData1.push(item.mes_03);
              this.barChartData1.push(item.mes_04);
              this.barChartData1.push(item.mes_05);
              this.barChartData1.push(item.mes_06);
              this.barChartData1.push(item.mes_07);
              this.barChartData1.push(item.mes_08);
              this.barChartData1.push(item.mes_09);
              this.barChartData1.push(item.mes_10);
              this.barChartData1.push(item.mes_11);
              this.barChartData1.push(item.mes_12);

            }else  if(item.Campo === 'Chorrillos' && item.solesCantidad === 'soles'){
              aTotalMes1 += Number(item.mes_01)
              aTotalMes2 += Number(item.mes_02)
              aTotalMes3 += Number(item.mes_03)
              aTotalMes4 += Number(item.mes_04)
              aTotalMes5 += Number(item.mes_05)
              aTotalMes6 += Number(item.mes_06)
              aTotalMes7 += Number(item.mes_07)
              aTotalMes8 += Number(item.mes_08)
              aTotalMes9 += Number(item.mes_09)
              aTotalMes10 += Number(item.mes_10)
              aTotalMes11 += Number(item.mes_11)
              aTotalMes12 += Number(item.mes_12)
              this.barChartData2.push(item.mes_01);
              this.barChartData2.push(item.mes_02);
              this.barChartData2.push(item.mes_03);
              this.barChartData2.push(item.mes_04);
              this.barChartData2.push(item.mes_05);
              this.barChartData2.push(item.mes_06);
              this.barChartData2.push(item.mes_07);
              this.barChartData2.push(item.mes_08);
              this.barChartData2.push(item.mes_09);
              this.barChartData2.push(item.mes_10);
              this.barChartData2.push(item.mes_11);
              this.barChartData2.push(item.mes_12);


            }else  if(item.Campo === 'Surco' && item.solesCantidad === 'soles'){
              aTotalMes1 += Number(item.mes_01)
              aTotalMes2 += Number(item.mes_02)
              aTotalMes3 += Number(item.mes_03)
              aTotalMes4 += Number(item.mes_04)
              aTotalMes5 += Number(item.mes_05)
              aTotalMes6 += Number(item.mes_06)
              aTotalMes7 += Number(item.mes_07)
              aTotalMes8 += Number(item.mes_08)
              aTotalMes9 += Number(item.mes_09)
              aTotalMes10 += Number(item.mes_10)
              aTotalMes11 += Number(item.mes_11)
              aTotalMes12 += Number(item.mes_12)
              this.barChartData3.push(item.mes_01);
              this.barChartData3.push(item.mes_02);
              this.barChartData3.push(item.mes_03);
              this.barChartData3.push(item.mes_04);
              this.barChartData3.push(item.mes_05);
              this.barChartData3.push(item.mes_06);
              this.barChartData3.push(item.mes_07);
              this.barChartData3.push(item.mes_08);
              this.barChartData3.push(item.mes_09);
              this.barChartData3.push(item.mes_10);
              this.barChartData3.push(item.mes_11);
              this.barChartData3.push(item.mes_12);

            }
            // console.log('1340 =>', totalMes1)

          })
          
          this.barChartData3Total.push(aTotalMes1);
          this.barChartData3Total.push(aTotalMes2);
          this.barChartData3Total.push(aTotalMes3);
          this.barChartData3Total.push(aTotalMes4);
          this.barChartData3Total.push(aTotalMes5);
          this.barChartData3Total.push(aTotalMes6);
          this.barChartData3Total.push(aTotalMes7);
          this.barChartData3Total.push(aTotalMes8);
          this.barChartData3Total.push(aTotalMes9);
          this.barChartData3Total.push(aTotalMes10);
          this.barChartData3Total.push(aTotalMes11);
          this.barChartData3Total.push(aTotalMes12);
          let bTotalMes1 = 0;
          let bTotalMes2 = 0;
          let bTotalMes3 = 0;
          let bTotalMes4 = 0;
          let bTotalMes5 = 0;
          let bTotalMes6 = 0;
          let bTotalMes7 = 0;
          let bTotalMes8 = 0;
          let bTotalMes9 = 0;
          let bTotalMes10 = 0;
          let bTotalMes11 = 0;
          let bTotalMes12 = 0;
          this.columns10 = this.data.cabecera_anual_TPacGrupo;
          this.rows10 = this.data.tabla_anual_TPacGrupo;
          this.rows10filtered = this.rows10.filter(item => item.solesCantidad === 'soles');
          this.rows10.map(item =>{
            if(item.Campo === 'Cia. Seguros/Convenios'){
              bTotalMes1 += Number(item.mes_01)
              bTotalMes2 += Number(item.mes_02)
              bTotalMes3 += Number(item.mes_03)
              bTotalMes4 += Number(item.mes_04)
              bTotalMes5 += Number(item.mes_05)
              bTotalMes6 += Number(item.mes_06)
              bTotalMes7 += Number(item.mes_07)
              bTotalMes8 += Number(item.mes_08)
              bTotalMes9 += Number(item.mes_09)
              bTotalMes10 += Number(item.mes_10)
              bTotalMes11 += Number(item.mes_11)
              bTotalMes12 += Number(item.mes_12)
              this.barChartData4.push(item.mes_01);
              this.barChartData4.push(item.mes_02);
              this.barChartData1.push(item.mes_03);
              this.barChartData4.push(item.mes_04);
              this.barChartData4.push(item.mes_05);
              this.barChartData4.push(item.mes_06);
              this.barChartData4.push(item.mes_07);
              this.barChartData4.push(item.mes_08);
              this.barChartData4.push(item.mes_09);
              this.barChartData4.push(item.mes_10);
              this.barChartData4.push(item.mes_11);
              this.barChartData4.push(item.mes_12);
            }else  if(item.Campo === 'Madre Niño'){
              bTotalMes1 += Number(item.mes_01)
              bTotalMes2 += Number(item.mes_02)
              bTotalMes3 += Number(item.mes_03)
              bTotalMes4 += Number(item.mes_04)
              bTotalMes5 += Number(item.mes_05)
              bTotalMes6 += Number(item.mes_06)
              bTotalMes7 += Number(item.mes_07)
              bTotalMes8 += Number(item.mes_08)
              bTotalMes9 += Number(item.mes_09)
              bTotalMes10 += Number(item.mes_10)
              bTotalMes11 += Number(item.mes_11)
              bTotalMes12 += Number(item.mes_12)
              this.barChartData5.push(item.mes_01);
              this.barChartData5.push(item.mes_02);
              this.barChartData5.push(item.mes_03);
              this.barChartData5.push(item.mes_04);
              this.barChartData5.push(item.mes_05);
              this.barChartData5.push(item.mes_06);
              this.barChartData5.push(item.mes_07);
              this.barChartData5.push(item.mes_08);
              this.barChartData5.push(item.mes_09);
              this.barChartData5.push(item.mes_10);
              this.barChartData5.push(item.mes_11);
              this.barChartData5.push(item.mes_12);
            }else  if(item.Campo === 'Institucional/Privado'){
              bTotalMes1 += Number(item.mes_01)
              bTotalMes2 += Number(item.mes_02)
              bTotalMes3 += Number(item.mes_03)
              bTotalMes4 += Number(item.mes_04)
              bTotalMes5 += Number(item.mes_05)
              bTotalMes6 += Number(item.mes_06)
              bTotalMes7 += Number(item.mes_07)
              bTotalMes8 += Number(item.mes_08)
              bTotalMes9 += Number(item.mes_09)
              bTotalMes10 += Number(item.mes_10)
              bTotalMes11 += Number(item.mes_11)
              bTotalMes12 += Number(item.mes_12)
              this.barChartData6.push(item.mes_01);
              this.barChartData6.push(item.mes_02);
              this.barChartData6.push(item.mes_03);
              this.barChartData6.push(item.mes_04);
              this.barChartData6.push(item.mes_05);
              this.barChartData6.push(item.mes_06);
              this.barChartData6.push(item.mes_07);
              this.barChartData6.push(item.mes_08);
              this.barChartData6.push(item.mes_09);
              this.barChartData6.push(item.mes_10);
              this.barChartData6.push(item.mes_11);
              this.barChartData6.push(item.mes_12);
            }else  if(item.Campo === 'Programas de Salud'){
              bTotalMes1 += Number(item.mes_01)
              bTotalMes2 += Number(item.mes_02)
              bTotalMes3 += Number(item.mes_03)
              bTotalMes4 += Number(item.mes_04)
              bTotalMes5 += Number(item.mes_05)
              bTotalMes6 += Number(item.mes_06)
              bTotalMes7 += Number(item.mes_07)
              bTotalMes8 += Number(item.mes_08)
              bTotalMes9 += Number(item.mes_09)
              bTotalMes10 += Number(item.mes_10)
              bTotalMes11 += Number(item.mes_11)
              bTotalMes12 += Number(item.mes_12)
              this.barChartData7.push(item.mes_01);
              this.barChartData7.push(item.mes_02);
              this.barChartData7.push(item.mes_03);
              this.barChartData7.push(item.mes_04);
              this.barChartData7.push(item.mes_05);
              this.barChartData7.push(item.mes_06);
              this.barChartData7.push(item.mes_07);
              this.barChartData7.push(item.mes_08);
              this.barChartData7.push(item.mes_09);
              this.barChartData7.push(item.mes_10);
              this.barChartData7.push(item.mes_11);
              this.barChartData7.push(item.mes_12);
            }
          })
          this.barChartData7Total.push(bTotalMes1);
          this.barChartData7Total.push(bTotalMes2);
          this.barChartData7Total.push(bTotalMes3);
          this.barChartData7Total.push(bTotalMes4);
          this.barChartData7Total.push(bTotalMes5);
          this.barChartData7Total.push(bTotalMes6);
          this.barChartData7Total.push(bTotalMes7);
          this.barChartData7Total.push(bTotalMes8);
          this.barChartData7Total.push(bTotalMes9);
          this.barChartData7Total.push(bTotalMes10);
          this.barChartData7Total.push(bTotalMes11);
          this.barChartData7Total.push(bTotalMes12);

          this.columns11 = this.data.cabecera_anual;
          // this.columns11.map(item => {
          //   // console.log(301, item)
          //   if(item.children){
          //     item.children.map(subitem =>{
          //       subitem.cellRenderer= 'buttonRenderer',
          //       subitem.cellRendererParams=  {
          //         onClick: this.openClicked.bind(this),
          //         sucursal: item.headerName,
          //         field: subitem.field
          //       }
          //    })
          //   }
          // })

          this.columns_TipoEx_sede = this.data.cabecera_anual_grupoExamen_sede;
          this.rows_TipoEx_sede = this.data.tabla_anual_grupoExamen_sede;
          this.rows_TipoEx_sede_filter = this.rows_TipoEx_sede.filter(item => item.solesCantidad === 'soles');

          this.rows11 = this.data.tabla_anual;
          console.log(303, this.data.tabla_anual)
          // this.rows11filtered = this.rows11;
          this.rows11filtered = this.rows11.filter(item => item.solesCantidad === 'soles');
          this.columns12 = this.data.cabecera_anual_empresa;
          this.rows12 = this.data.tabla_anual_empresa;
          this.rows12filtered = this.rows12.filter(item => item.solesCantidad === 'soles');
          this.barChartLabels2 = [];

          this.columns22 = this.data.cabecera_anual_especialidad;
          this.rows22 = this.data.tabla_anual_especialidad;
          this.rows22filtered = this.rows22.filter(item => item.solesCantidad === 'soles');

          this.columns13 = this.data.cabecera_diario_sede;
          this.columns13.map(item =>{
            if(item.prop !== 'Campo' && item.prop !== 'total' ){
              this.barChartLabels2.push(item.name);
            }
          });
          this.rows13 = this.data.tabla_diario_sede;
          this.rows13.map(item =>{
            if(item.Campo === 'Lima'){
              this.barChartData8.push(item.dia_1);
              this.barChartData8.push(item.dia_2);
              this.barChartData8.push(item.dia_3);
              this.barChartData8.push(item.dia_4);
              this.barChartData8.push(item.dia_5);
              this.barChartData8.push(item.dia_6);
              this.barChartData8.push(item.dia_7);
              this.barChartData8.push(item.dia_8);
              this.barChartData8.push(item.dia_9);
              this.barChartData8.push(item.dia_10);
              this.barChartData8.push(item.dia_11);
              this.barChartData8.push(item.dia_12);

              this.barChartData8.push(item.dia_13);
              this.barChartData8.push(item.dia_14);
              this.barChartData8.push(item.dia_15);
              this.barChartData8.push(item.dia_16);
              this.barChartData8.push(item.dia_17);
              this.barChartData8.push(item.dia_18);
              this.barChartData8.push(item.dia_19);
              this.barChartData8.push(item.dia_20);
              this.barChartData8.push(item.dia_21);
              this.barChartData8.push(item.dia_22);
              this.barChartData8.push(item.dia_23);
              this.barChartData8.push(item.dia_24);

              this.barChartData8.push(item.dia_25);
              this.barChartData8.push(item.dia_26);
              this.barChartData8.push(item.dia_27);
              this.barChartData8.push(item.dia_28);
              this.barChartData8.push(item.dia_29);
              this.barChartData8.push(item.dia_30);
              this.barChartData8.push(item.dia_31);


            }else  if(item.Campo === 'Chorrillos'){
              this.barChartData9.push(item.dia_1);
              this.barChartData9.push(item.dia_2);
              this.barChartData9.push(item.dia_3);
              this.barChartData9.push(item.dia_4);
              this.barChartData9.push(item.dia_5);
              this.barChartData9.push(item.dia_6);
              this.barChartData9.push(item.dia_7);
              this.barChartData9.push(item.dia_8);
              this.barChartData9.push(item.dia_9);
              this.barChartData9.push(item.dia_10);
              this.barChartData9.push(item.dia_11);
              this.barChartData9.push(item.dia_12);

              this.barChartData9.push(item.dia_13);
              this.barChartData9.push(item.dia_14);
              this.barChartData9.push(item.dia_15);
              this.barChartData9.push(item.dia_16);
              this.barChartData9.push(item.dia_17);
              this.barChartData9.push(item.dia_18);
              this.barChartData9.push(item.dia_19);
              this.barChartData9.push(item.dia_20);
              this.barChartData9.push(item.dia_21);
              this.barChartData9.push(item.dia_22);
              this.barChartData9.push(item.dia_23);
              this.barChartData9.push(item.dia_24);

              this.barChartData9.push(item.dia_25);
              this.barChartData9.push(item.dia_26);
              this.barChartData9.push(item.dia_27);
              this.barChartData9.push(item.dia_28);
              this.barChartData9.push(item.dia_29);
              this.barChartData9.push(item.dia_30);
              this.barChartData9.push(item.dia_31);
            }else  if(item.Campo === 'Surco'){
              this.barChartData10.push(item.dia_1);
              this.barChartData10.push(item.dia_2);
              this.barChartData10.push(item.dia_3);
              this.barChartData10.push(item.dia_4);
              this.barChartData10.push(item.dia_5);
              this.barChartData10.push(item.dia_6);
              this.barChartData10.push(item.dia_7);
              this.barChartData10.push(item.dia_8);
              this.barChartData10.push(item.dia_9);
              this.barChartData10.push(item.dia_10);
              this.barChartData10.push(item.dia_11);
              this.barChartData10.push(item.dia_12);

              this.barChartData10.push(item.dia_13);
              this.barChartData10.push(item.dia_14);
              this.barChartData10.push(item.dia_15);
              this.barChartData10.push(item.dia_16);
              this.barChartData10.push(item.dia_17);
              this.barChartData10.push(item.dia_18);
              this.barChartData10.push(item.dia_19);
              this.barChartData10.push(item.dia_20);
              this.barChartData10.push(item.dia_21);
              this.barChartData10.push(item.dia_22);
              this.barChartData10.push(item.dia_23);
              this.barChartData10.push(item.dia_24);

              this.barChartData10.push(item.dia_25);
              this.barChartData10.push(item.dia_26);
              this.barChartData10.push(item.dia_27);
              this.barChartData10.push(item.dia_28);
              this.barChartData10.push(item.dia_29);
              this.barChartData10.push(item.dia_30);
              this.barChartData10.push(item.dia_31);
            }
          })
          console.log(250, this.columns13)
          console.log(514, this.rows13)
          this.columns14 = this.data.cabecera_diario_TPacGrupo;
          this.rows14 = this.data.tabla_diario_TPacGrupo;
          this.rows14.map(item =>{
            if(item.Campo === 'Cia. Seguros/Convenios'){
              this.barChartData11.push(item.dia_1);
              this.barChartData11.push(item.dia_2);
              this.barChartData11.push(item.dia_3);
              this.barChartData11.push(item.dia_4);
              this.barChartData11.push(item.dia_5);
              this.barChartData11.push(item.dia_6);
              this.barChartData11.push(item.dia_7);
              this.barChartData1.push(item.dia_8);
              this.barChartData11.push(item.dia_9);
              this.barChartData11.push(item.dia_10);
              this.barChartData11.push(item.dia_11);
              this.barChartData11.push(item.dia_12);

              this.barChartData11.push(item.dia_13);
              this.barChartData11.push(item.dia_14);
              this.barChartData11.push(item.dia_15);
              this.barChartData11.push(item.dia_16);
              this.barChartData11.push(item.dia_17);
              this.barChartData11.push(item.dia_18);
              this.barChartData11.push(item.dia_19);
              this.barChartData11.push(item.dia_20);
              this.barChartData11.push(item.dia_21);
              this.barChartData11.push(item.dia_22);
              this.barChartData11.push(item.dia_23);
              this.barChartData11.push(item.dia_24);

              this.barChartData11.push(item.dia_25);
              this.barChartData11.push(item.dia_26);
              this.barChartData11.push(item.dia_27);
              this.barChartData11.push(item.dia_28);
              this.barChartData11.push(item.dia_29);
              this.barChartData11.push(item.dia_30);
              this.barChartData11.push(item.dia_31);

            }else  if(item.Campo === 'Madre Niño'){
              this.barChartData12.push(item.dia_1);
              this.barChartData12.push(item.dia_2);
              this.barChartData12.push(item.dia_3);
              this.barChartData12.push(item.dia_4);
              this.barChartData12.push(item.dia_5);
              this.barChartData12.push(item.dia_6);
              this.barChartData12.push(item.dia_7);
              this.barChartData12.push(item.dia_8);
              this.barChartData12.push(item.dia_9);
              this.barChartData12.push(item.dia_10);
              this.barChartData12.push(item.dia_11);
              this.barChartData12.push(item.dia_12);

              this.barChartData12.push(item.dia_13);
              this.barChartData12.push(item.dia_14);
              this.barChartData12.push(item.dia_15);
              this.barChartData12.push(item.dia_16);
              this.barChartData12.push(item.dia_17);
              this.barChartData12.push(item.dia_18);
              this.barChartData12.push(item.dia_19);
              this.barChartData12.push(item.dia_20);
              this.barChartData12.push(item.dia_21);
              this.barChartData12.push(item.dia_22);
              this.barChartData12.push(item.dia_23);
              this.barChartData12.push(item.dia_24);

              this.barChartData12.push(item.dia_25);
              this.barChartData12.push(item.dia_26);
              this.barChartData12.push(item.dia_27);
              this.barChartData12.push(item.dia_28);
              this.barChartData12.push(item.dia_29);
              this.barChartData12.push(item.dia_30);
              this.barChartData12.push(item.dia_31);

            }else  if(item.Campo === 'Institucional/Privado'){
              this.barChartData13.push(item.dia_1);
              this.barChartData13.push(item.dia_2);
              this.barChartData13.push(item.dia_3);
              this.barChartData13.push(item.dia_4);
              this.barChartData13.push(item.dia_5);
              this.barChartData13.push(item.dia_6);
              this.barChartData13.push(item.dia_7);
              this.barChartData13.push(item.dia_8);
              this.barChartData13.push(item.dia_9);
              this.barChartData13.push(item.dia_10);
              this.barChartData13.push(item.dia_11);
              this.barChartData13.push(item.dia_12);

              this.barChartData13.push(item.dia_13);
              this.barChartData13.push(item.dia_14);
              this.barChartData13.push(item.dia_15);
              this.barChartData13.push(item.dia_16);
              this.barChartData13.push(item.dia_17);
              this.barChartData13.push(item.dia_18);
              this.barChartData13.push(item.dia_19);
              this.barChartData13.push(item.dia_20);
              this.barChartData13.push(item.dia_21);
              this.barChartData13.push(item.dia_22);
              this.barChartData13.push(item.dia_23);
              this.barChartData13.push(item.dia_24);

              this.barChartData13.push(item.dia_25);
              this.barChartData13.push(item.dia_26);
              this.barChartData13.push(item.dia_27);
              this.barChartData13.push(item.dia_28);
              this.barChartData13.push(item.dia_29);
              this.barChartData13.push(item.dia_30);
              this.barChartData13.push(item.dia_31);

            }else  if(item.Campo === 'Programas de Salud'){
              this.barChartData14.push(item.dia_1);
              this.barChartData14.push(item.dia_2);
              this.barChartData14.push(item.dia_3);
              this.barChartData14.push(item.dia_4);
              this.barChartData14.push(item.dia_5);
              this.barChartData14.push(item.dia_6);
              this.barChartData14.push(item.dia_7);
              this.barChartData14.push(item.dia_8);
              this.barChartData14.push(item.dia_9);
              this.barChartData14.push(item.dia_10);
              this.barChartData14.push(item.dia_11);
              this.barChartData14.push(item.dia_12);

              this.barChartData14.push(item.dia_13);
              this.barChartData14.push(item.dia_14);
              this.barChartData14.push(item.dia_15);
              this.barChartData14.push(item.dia_16);
              this.barChartData14.push(item.dia_17);
              this.barChartData14.push(item.dia_18);
              this.barChartData14.push(item.dia_19);
              this.barChartData14.push(item.dia_20);
              this.barChartData14.push(item.dia_21);
              this.barChartData14.push(item.dia_22);
              this.barChartData14.push(item.dia_23);
              this.barChartData14.push(item.dia_24);

              this.barChartData14.push(item.dia_25);
              this.barChartData14.push(item.dia_26);
              this.barChartData14.push(item.dia_27);
              this.barChartData14.push(item.dia_28);
              this.barChartData14.push(item.dia_29);
              this.barChartData14.push(item.dia_30);
              this.barChartData14.push(item.dia_31);

            }
          })
          this.columns15 = this.data.cabecera_diario_empresa;
          this.rows15 = this.data.tabla_diario_empresa;

          // this.columns16 = this.data.cabeceras_ingresos_TPac;
          // this.rows16 = this.data.tabla_ingresos_TPac;

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
  // openClicked(e) {    
  //   if ( e.rowData !== undefined){
  //      const parameters = {
  //       campo:'SS_SG_Expediente.IdAseguradora',
  //       idCampo: e.rowData.id_aseguradora,
  //       estado: 'PENDIENTE',
  //       sede: e.idSede,
  //     }
  //     // console.log(361, e.rowData)
  //       this.loading();
  //       this.tableApiservice.GpricGetExpedientesPendiemtesDetalle(parameters).subscribe(
  //         (response) =>{ console.log(1155, response);
  //           const data = {
  //             data: response.data,
  //             nombre:  e.rowData.aseguradora_nombre,
  //             sucursal:  e.sede
  //           }
  //           // this.columnsPendientes = response.data.cabeceras;
  //           // this.rowsPendientes = response.data.tabla_expediente_detalle;
  //           // this.sede = this.rowsPendientes[0].sucursalNombre;
  //           // this.rowsPendientes.map(item=>{
            
  //           // })
  //           // data.push(e.rowData.id_aseguradora)
  //           // console.log(584, this.rowsPendientes);
  //           const  modalRef =  this.modalService.open(RowDetalleComponent, {
  //             size: <any>"xl",
  //           });
  //           // console.log( 139, e)
  //           modalRef.componentInstance.dato = data;
  //           Swal.close();
  //       });
  //       // this.modalService.open(this.rowsPendientes, {size: <any>"xl", ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        
  //       //   console.log(this.rowsPendientes);
  //       //   this.closeResult = `Closed with: ${result}`;
  //       // }, (reason) => {
  //       //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       // });

  //   }
  // }
  CurrencyCellRendererPEN(params: any) {
    var inrFormat = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
  PorcentCellRendererPEN(params: any) {
    var inrFormat = new Intl.NumberFormat('es-PE', 
    {
      // style: 'percentage',
      // currency: 'PEN',
      minimumFractionDigits: 2,
    }
    );
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
  showTableDasboard(id: number, position: number) {
    
    if (id == 1) {
      if (position == 1) {
        this.isTable9 = true;
        this.isGrafico1 = false;
      } else {
        this.isGrafico1 = true;
        this.isTable9 = false;
      }
    } else if (id == 2) {
      if (position == 1) {
        this.isTable10 = true;
        this.isGrafico2 = false;
      } else {
        this.isGrafico2 = true;
        this.isTable10 = false;
      }
    } else if (id == 3) {
      if (position == 1) {
        this.isTable13 = true;
        this.isGrafico3 = false;
      } else {
        this.isGrafico3 = true;
        this.isTable13 = false;
      }
    } else if (id == 4) {
      if (position == 1) {
        this.isTable14 = true;
        this.isGrafico4 = false;
      } else {
        this.isGrafico4 = true;
        this.isTable14 = false;
      }
    } 
  }
  filter() {
    this.action = true;
        const form = this.filtroForm.value;
          this.anio = form.anio;
          this.mes = form.mes;
          this.id_sede = form.id_sede
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
  // tipoChange(event){
  //   console.log(751, event);
  //   const input = event;
  //   // this.especialidad = input;
  //   // this.temp = this.rows1;rows2filtered
  //     if (input === 'TODAS') {
  //       this.rows4filtered = this.rows4.filter(item => item.sucursal === 'TODAS');
  //      } else if (input === 'LIMA'){
  //       this.rows4filtered = this.rows4.filter(item =>item.sucursal === 'LIMA');
  //      } else if (input === 'CHORRILLOS'){
  //       this.rows4filtered = this.rows4.filter(item =>item.sucursal === 'CHORRILLOS');
  //      } else if (input === 'SURCO'){
  //       this.rows4filtered = this.rows4.filter(item =>item.sucursal === 'SURCO');
  //      }

    
  // }
  updateFilter(event) {
    const input = event.target.value.toLowerCase();

    // filter our data
    if (input.length > 0) {
      const filtered = this.rows8.filter(el =>
        // console.log(240, el);
        Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
        );
        console.log(filtered);
      this.rows8 = [...filtered]
      
    } else {
      console.log(this.filtered);
      this.rows8 = [...this.temp]
    }
  }
  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
//  open({ selected }, sucursal, content?: any){
//      console.log(selected, sucursal, content)
//       if (sucursal === 'Lima'){
//         this.id_sede = '0001';
//       }else if (sucursal === 'Chorrillos'){
//         this.id_sede = '0002';
//       }else if (sucursal === 'Surco'){
//         this.id_sede = '0004';
//       }else if (sucursal === 'Total'){
//         this.id_sede = '0000';
//       }
//     if (selected !== undefined){
//       // this.sede = sucursal;
//        console.log(1141, content);
//        const parameters = {
//         campo:'SS_SG_Expediente.Periodo',
//         idCampo: this.periodo,
//         estado: 'PENDIENTE',
//         sede: this.id_sede,
//       }
//       this.loading();
//        this.tableApiservice.GpricGetExpedientesPendiemtesDetalle(parameters).subscribe(
//         (response) =>{ console.log(1155, response);
//           this.columnsPendientes = response.data.cabeceras;
//           this.rowsPendientes = response.data.tabla_expediente_detalle;
//           this.tempPendientes = this.rowsPendientes
//           this.sede = this.rowsPendientes[0].sucursalNombre;
//           // this.rowsPendientes.map(item=>{
           
//           // })
//           // console.log(584, this.rowsPendientes);
//           Swal.close();
//       });
      
//     }else{
//       this.modalService.open(content, {size: <any>"xl", ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        
//         console.log(content);
//         this.closeResult = `Closed with: ${result}`;
//       }, (reason) => {
//         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       });
//     }
//   }
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
          
            return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : Math.round(count);
          
        }else{
          // console.log(515, cells);
          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count;
        }
  }
  private summaryNull(cells: any): string {
    // if (cells[0] !== 'TODAS' && cells[0] !== 'LIMA' && cells[0] !== 'CHORRILLOS' && cells[0] !== 'SURCO'){
    //   console.log(739, cells.cell)
    //     return 'TOTAL';
    // }
    return 'TOTAL';
  }
  separadorDeMiles(numero) {
    console.log(1331, numero)
    let partesNumero = numero.toString().split('.');
  
    partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return partesNumero.join('.');
  }

  private asignarLstDeExamenes(data: Array<any>): void {
    const tmpData: Set<any> = new Set();

    data.forEach(valor => tmpData.add(valor.idServicio_Nombre));

    this.lstDeExamenes = Array.from(tmpData);
  }
}


