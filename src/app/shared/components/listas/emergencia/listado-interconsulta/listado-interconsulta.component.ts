import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import {AttentionConsultation} from '../../../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, SelectionType, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../../../interfaces/excel-json.interface';
import { ExportService } from '../../../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';

import { NumberDecimalPipe } from 'src/app/pipes/numberDecimal.pipe';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/_services/data.service';
import { Subscription } from 'rxjs';
import { IndicadoresService } from 'src/app/_services/indicadores.service';
import { EmergenciesService } from 'src/app/_services/emergencies.service';


@Component({
  selector: 'app-listado-interconsulta',
  templateUrl: './listado-interconsulta.component.html',
  styleUrls: ['./listado-interconsulta.component.scss']
})
export class ListadoInterconsultaComponent implements OnInit {
  initialSize = 0;
  active = 1;
  enableSummary = true;
  summaryPosition = 'bottom';
  filtroForm: FormGroup;
  tabs = [
    {
      id: 1,
      label: 'RESUMEN POR EMPRESA',
      template: null,
    },
  ];

  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChild(DatatableComponent) private table: DatatableComponent;
  grafico1: Chart;
  grafico2: Chart;
  grafico3: Chart;
  private baseChart: ElementRef;
  periodoSeleccionado: any;
  subRows1: any;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      // initially setter gets called with undefined
      this.baseChart = content;
      this.grafico1 = this.getBarChart(this.barChartLabels1, this.barChartData1, this.barChartData2, this.barChartData3,'', '','chart-1', 'Atenciones', 'Emitidas', 'Compradas','line');
      this.grafico2 = this.getBarChart(this.barChartLabels2, this.barChartData4, this.barChartData5, this.barChartData6, '', '','chart-2', 'Lima', 'Chorrillos', 'Surco','line');
      this.grafico3 = this.getBarChart(this.barChartLabels3, this.barChartData7, this.barChartData8, this.barChartData9, '', '','chart-3', 'Lima', 'Chorrillos', 'Surco','line');
  } }
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  temp1 = [];
  temp2 = [];
  selected = [];
  SelectionType = SelectionType;
  id: number;
  loadingIndicator: true;
  rows1: any;
  rows2: any;
  rows3: any;
  rows4: any;
  rows5: any;
  rows6: any;
  rows7: any;
  rows8: any;
  rows9: any;
  rows10: any;
  rowsModal: any;
  rows9filtered: any;
  rows10filtered: any;
  rows4filtered: any;
  rows5filtered: any;
  rows6filtered: any;
  barData: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  // parameters:any;
  message;
  title;
  tipoPago;
  tipoDePago;
  EstadoDeposito;
  TipoPlanilla;
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
  especialidad;
  especialidades = [];
  grupo;
  grupos = [];
  columnsModal:any;
  periodos:any;
  periodo_emp:any;
  banco_bcp_f:any;
  banco_bcp_m:any;
  banco_con_f:any;
  banco_con_m:any;
  optionsWithCaption = {};
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  fecha = moment(new Date()).format('YYYY-MM-DD');
  sede = '0001';
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
  anioAnterior = moment(new Date()).subtract(1, 'years').format('YYYY');
  periodo = this.anio + this.mes;
  barChartLabels1 = [];
  barChartLabels2 = [];
  barChartLabels3 = [];
  barChartData1 = [];
  barChartData2 = [];
  barChartData3 = [];
  barChartData4 = [];
  barChartData5 = [];
  barChartData6 = [];
  barChartData7 = [];
  barChartData8 = [];
  barChartData9 = [];
  totalPlanilla: number;
  totalEmpleados: number;
  closeResult = '';
  color = ['secondary','success','primary', 'warning', 'info', 'secondary','secondary', 'secondary', 'secondary', 'secondary', 'secondary'];
  // action: boolean = false;
  selectedOptionTipo='Porcentaje';
  selectedOptionTipo1 ='CARDIOLOGIA';
  selectedOptionPeriodo = this.periodo;
  @Input() action: boolean = false;
  @Input() filtro_grupo: string;
  @Input() parameters;
  listObservers$: Array<Subscription> = [];
  panelOptions;
  panelOptions2;
  isLoading: Boolean = false;
  masDeDiez;
  nuevos;
  cesados;
  continuadores;
  constructor(private tableApiservice: EmergenciesService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private modalService: NgbModal, public dataService: DataService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    // console.log(171, this.dataService.parametersFilters)


    
  //   this.filtroForm = new FormGroup({
  //     anio: new FormControl(this.anio),
  //     mes: new FormControl(this.mes),

  // });
  // var anioOp = Number(this.anio);
  // while ( Number(anioOp) > 2017 ) {
  //   console.log(275, anioOp);
    
  //   const anioNew = {
  //      value: anioOp.toString(), label: anioOp.toString() 
  //   }
  //   this.optionsAnio.push(anioNew);
  //   anioOp--;
  // }
   }

  ngOnInit() {
    const observer1$: Subscription = this.dataService.callback.subscribe(
      (data) => {
        this.parameters = data;
        console.log(193, this.parameters)
        this.action = true;
        this.setPage({ offset: 0 });
      }
      );
      this.listObservers$ = [observer1$]
      // this.setPage({ offset: 0 });
    }
  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
  getRowClass(row) {
    return {
      'sub-totals': row.concepto === 'Total' || row.concepto === 'Nuevos' || row.concepto === 'Cesados' || row.concepto === 'Ingresos' || row.concepto === 'Descuentos' || row.concepto === 'Total a Pagar' || row.concepto === 'Prestación Alimentaria' || row.concepto === 'Por Maternidad' || row.concepto === 'Por Descanso Medico Prolongado' || row.concepto === 'Total Subsidiado' || row.concepto === 'Nro. de dias Por Maternidad' || row.concepto === 'Nro. de dias Por Descanso Medico Prolongado' || row.concepto === 'Nro. Total de dias subsidiados' || row.concepto === 'Dscto. por Permisos' || row.concepto === 'Dscto. por Tardanzas' || row.concepto === 'Tiempo total de tardanzas descontadas' || row.concepto === 'Administrativo' || row.concepto === 'Clínica' || row.concepto === 'Farmacia' || row.concepto === 'Hospitalización' || row.concepto === 'Total Dscto.Por Prestación' || row.concepto === 'Total Dscto.Por Prestación' || row.concepto === 'Pago por Reintegros' || row.concepto === 'Pago por Dias Feriados' || row.concepto === 'Pago por Guardia Nocturna' || row.concepto === 'Tiempo total de Feriados Pagados' || row.concepto === 'Tiempo total de Guardia Nocturna Pagadas'};
  }
  getRowClass1(row) {

    // return {
    //   'totals': row.periodo.includes('TOTAL')
    // };
  }

  guardarImagen(){
    var canvas = document.getElementById("chart-1") as HTMLCanvasElement;
    var downloadlink = document.getElementById("downloadlink") as HTMLAnchorElement;
    
    // var ctx = canvas.getContext("2d");
    // ctx.strokeStyle = "yellow";
    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.arc(100,75,50,0,Math.PI*2);
    // ctx.stroke();
    var imagedata = canvas.toDataURL("image/png");
    console.log(imagedata)
    downloadlink.href = imagedata;
  }
  guardarImagen1(){
    var canvas = document.getElementById("chart-2") as HTMLCanvasElement;
    var downloadlink = document.getElementById("downloadlink1") as HTMLAnchorElement;
    
    // var ctx = canvas.getContext("2d");
    // ctx.strokeStyle = "yellow";
    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.arc(100,75,50,0,Math.PI*2);
    // ctx.stroke();
    var imagedata = canvas.toDataURL("image/png");
    console.log(imagedata)
    downloadlink.href = imagedata;
  }
  getBarChart(chartLabels1, chartData1, chartData2, chartData3, scaleLabel1,scaleLabel2, chartNum, title, title2, title3,typeChart) {
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
          borderWidth: 1,
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
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
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
  getChart(context, chartType, data, options?) {
    const graph = new Chart(context, {
      data,
      options,
      type: chartType,
      plugins: [ChartDataLabels]
    });
    
    return graph;
  }
  addData(chart, label,  data) {
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
  removeData(chart) {
      chart.data.labels = [];
      chart.data.datasets.forEach((dataset) => {
          dataset.data = [];
          console.log(663, dataset.data);
      });
      chart.update();
      
  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    // this.setPage({ offset: 0 });

  }
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

 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }
  setPage(pageInfo) {
    console.log(pageInfo);
    this.selectedOptionPeriodo = this.parameters.periodo;
    // this.page.pageNumber = pageInfo.offset;
    // this.parameters = {
    //   anio: this.anio,
    //   mes: this.mes,
    //   periodo:this.periodo,
    //   pageNumber: this.page.pageNumber,
    //   size: this.page.size
    // };

    this.loading();
    console.log(this.parameters)
    this.tableApiservice.getInterConsultaEmergencia(this.parameters).subscribe(
      (response) => {
        // this.rows = [];
        
        if(response.data.success){
          this.data = response.data ? response.data : [];
          this.message = this.data.titulo;
          this.title = response.data.title;
  
          // this.temp = this.rows;
          this.columns1 = this.data.cabeceras;
          this.rows1 = this.data.tabla_atenciones;

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

  copyTableToClipboard(numberTabla){
    if(numberTabla === 0){
      this.rows10.map(item=>{
         item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
         item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
         item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
         item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
      });
      this.exportService.exportToClipboard(this.rows10, this.columns1);
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
      this.rows10.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
     });
      this.exportService.exportTableElmToExcel(this.rows10, '');
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
  // this.removeData(this.grafico1);
  this.action = true;
        const form = this.filtroForm.value;
          this.anio = form.anio;
          this.mes = form.mes;

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
  grupoChange(event){
    console.log(834, event);
    const input = event;
    this.grupo = input;
    if (input.length > 0) {
      const filtered = this.rows9filtered = this.rows9.filter(item => item.grupo === input);
        // console.log(filtered);
      this.rows9filtered = [...filtered]
      
     } //else {
    //   console.log(this.filtered);
    //   this.rowsFilter = [...this.temp]
    // }
  }
  especialityChange(event){
    console.log(834, event);
    const input = event;
    this.especialidad = input;
    if (input.length > 0 && input !== 'null') {
      const filtered = this.rows10filtered = this.rows10.filter(item => item.especialidad === input);
        // console.log(filtered);
      this.rows10filtered = [...filtered]
      
     } else {

      this.rows10filtered = [...this.rows10]
    }
  }

  updateFilter(event, selectedOption) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows9filtered
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
      this.rows9filtered = [...filtered]
      
    } else {
      this.rows9filtered = [...this.rows9.filter(item => item.grupo === selectedOption)]
    }
  }
  updateFilter2(event, selectedOption) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows10filtered
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
      this.rows10filtered = [...filtered]
      
    } else {
      this.rows10filtered = [...this.rows10.filter(item => item.especialidad === selectedOption)]
    }
  }
  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  summaryForAmount(cells: any, column){
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
          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count.toLocaleString();
        }
  }
  private summaryNull(cells: any): string {
    console.log(883, cells)
    if (cells[0] !== 'TODAS' && cells[0] !== 'LIMA' && cells[0] !== 'CHORRILLOS' && cells[0] !== 'SURCO'){
      console.log(739, cells.cell)
        return 'TOTAL';
    }
    
  }
  private summaryNull1(cells: any): string {
    if (cells[0] !== 0){
      return 'TOTAL';
    }
        
  }
}


