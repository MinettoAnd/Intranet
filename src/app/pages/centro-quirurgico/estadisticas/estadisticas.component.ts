import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { CentroQuirurgicoService } from 'src/app/_services/centro-quirurgico.service';
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


  public chartLabels1 = [];
  public chartLabels2 = [];

  public chartData1 = [];
  public chartData2 = [];
  public chartData3 = [];
  archivo_atenciones;
  archivo_componentes;
  selectedOptionTipo='cantidad';
  selectedOptionTipo2='cantidad';
  progressBarLabels;
  progressBar1;
  porcCompaMesAntRealizas;
  porcCompaMesAntAusentismo;
  porcCompaMesAntReservadas;
  totales;
  id_sede = '0000';
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


  constructor(private tableApiservice: CentroQuirurgicoService, private exportService: ExportService,
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
      id_sede: new FormControl(this.id_sede),
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
  makeid(length) {
		var today 			 = moment().format('HHmmss');
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return 'aaTmp_' + today + result;
	}
 setPage(pageInfo) {
      console.log(pageInfo);
      // this.page.pageNumber = pageInfo.offset;
      this.archivo_atenciones = this.makeid(7);
      this.archivo_componentes = this.makeid(7);
      this.parameters = {
        periodo:this.periodo_consulta,
        sede: this.id_sede,
        archivo_atenciones: this.archivo_atenciones,
        archivo_componentes: this.archivo_componentes,
        archivo_temporal: this.archivo_atenciones,
      };

      this.loading();
            this.tableApiservice.getCqrGeneraArchivos(this.parameters).subscribe(
                (response) => {
                  console.log(626, response);
                  if(response.success){
                      this.tableApiservice.getCqrResumenCabecera(this.parameters).subscribe(
                                      (response) => {
                                        // console.log(response);
                                        // if(response.success){
                                        //   this.columns1 = response.data.cabeceras_tpacientes;
                                        //   this.rows1 = response.data.tabla_tpacientes;

                                        //   this.rows1filtered = this.rows1.filter(item => item.GRUPO3 === 'CANTIDAD');
                                        //   this.columns2 = response.data.cabeceras_rangoetareo;
                                        //   this.rows2 = response.data.tabla_rangoetareo;
                                        //   this.temp2 = this.rows2;
                                        //   this.columns3 = response.data.cabeceras_empresas;
                                        //   this.rows3 = response.data.tabla_empresas;

                                        //   this.rows3filtered = this.rows3.filter(item => item.GRUPOEM === 'CANTIDAD');
                                        //   this.columns4 = response.data.cabeceras_diagnostico;
                                        //   this.rows4 = response.data.tabla_diagnostico;
                                        //   this.temp4 = this.rows4;
                                        //   this.columns5 = response.data.cabeceras_especialidades;
                                        //   this.rows5 = response.data.tabla_especialidades;
                                        //   this.temp5 = this.rows5;
                                        //   this.columns6 = response.data.cabeceras_inasistencia;
                                        //   this.rows6 = response.data.tabla_inasistencia;
                                        //   this.temp6 = this.rows6;
                                        //   this.columns7 = response.data.cabeceras_resumen;
                                        //   this.rows7 = response.data.tabla_resumen;

                                        //   this.columns8 = response.data.cabeceras_utilidad;
                                        //   this.columns8.map(item => {
                                        //     if (item.children){
                                        //       item.children.map(subitem =>{
                                        //         subitem.cellClassRules = {
                                        //           "cell-red": function(params) {
                                        //             return params.value.includes('-');
                                        //           }
                                        //         }
                                        //         return subitem.cellClassRules
                                        //      })
                                        //     }
                                        //   });
                                        //   this.rows8 = response.data.tabla_utilidad;
                                        //   this.columns9 = response.data.cabeceras_utilidad_TPac;
                                        //   this.columns9.map(item => {
                                        //     if (item.children){
                                        //         item.children.map(subitem =>{
                                        //           subitem.cellClassRules = {
                                        //             "cell-red": function(params) {
                                        //               return params.value.includes('-');
                                        //             }
                                        //           }
                                        //           return subitem.cellClassRules
                                        //       })
                                        //     }
                                        //   });
                                        //   this.rows9 = response.data.tabla_utilidad_TPac;

                                        //   this.columns10 = response.data.cabeceras_utilidad_Emp;
                                        //   this.columns10.map(item => {
                                        //     if (item.children){
                                        //       item.children.map(subitem =>{
                                        //         subitem.cellClassRules = {
                                        //           "cell-red": function(params) {
                                        //             return params.value.includes('-');
                                        //           }
                                        //         }
                                        //         return subitem.cellClassRules
                                        //       })
                                        //     }
                                        //   });
                                        //   this.rows10 = response.data.tabla_utilidad_Emp;


                                        // }
                                        Swal.close();
                                      },
                                      (error) => {
                                          Swal.close();
                                      }
                                    );

                                    this.tableApiservice.getCqrResumenTipoPaciente(this.parameters).subscribe(
                                      (response) => { 
                                        this.progressBarLabels = [];
                                        this.progressBar1 = [];
                                        let total = response.data.total_prog;
                                        
                                        if(response.success){
                                          // for (let value of Object.values(response.data.tipo_prog)) {
                                          //   let porcentaje:any = Object.values(value);
                                            
                                          //   // this.progressBar1.push(datos);
                                            
                                          //   let label = Object.keys(value)[0];
                                          //   if ( label == 'seguros_conv'){
                                          //     this.progressBarLabels.push('CIA. Seguros / Convenios')
                                          //     response.data.tipo_prog_d.seguros_conv.map(item=>{
                                          //       if (item.cantidad){
                                          //        let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                                          //        item.porcentaje = subPorcentaje;
                                          //       }
                                          //       return item.porcentaje;
                                          //     });
                                          //     const datos = {
                                          //       porcentaje : ((porcentaje/total)*100).toFixed(2),
                                          //       value: porcentaje[0],
                                          //       table:response.data.tipo_prog_d.seguros_conv
                                          //     }
                                          //     this.progressBar1.push(datos);
                                          //   }else if (label === 'insti_priva'){
                                          //     this.progressBarLabels.push('Institucional / Privados')
                                          //     response.data.tipo_prog_d.insti_priva.map(item=>{
                                          //       if (item.cantidad){
                                          //        let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                                          //        item.porcentaje = subPorcentaje;
                                          //       }
                                          //       return item.porcentaje;
                                          //     });
                                          //     const datos = {
                                          //       porcentaje : ((porcentaje/total)*100).toFixed(2),
                                          //       value: porcentaje[0],
                                          //       table:response.data.tipo_prog_d.insti_priva
                                          //     }
                                          //     this.progressBar1.push(datos);
                                          //   }else if (label === 'madre_nino'){
                                          //     this.progressBarLabels.push('Madre Niño')
                                          //     response.data.tipo_prog_d.madre_nino.map(item=>{
                                          //       if (item.cantidad){
                                          //        let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                                          //        item.porcentaje = subPorcentaje;
                                          //       }
                                          //       return item.porcentaje;
                                          //     });
                                          //     const datos = {
                                          //       porcentaje : ((porcentaje/total)*100).toFixed(2),
                                          //       value: porcentaje[0],
                                          //       table:response.data.tipo_prog_d.madre_nino
                                          //     }
                                          //     this.progressBar1.push(datos);
                                          //   }else if (label === 'tarjeta_salud'){
                                          //     this.progressBarLabels.push('Programas de Salud')
                                          //     response.data.tipo_prog_d.tarjeta_salud.map(item=>{
                                          //       if (item.cantidad){
                                          //        let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                                          //        item.porcentaje = subPorcentaje;
                                          //       }
                                          //       return item.porcentaje;
                                          //     });
                                          //     const datos = {
                                          //       porcentaje : ((porcentaje/total)*100).toFixed(2),
                                          //       value: porcentaje[0],
                                          //       table:response.data.tipo_prog_d.tarjeta_salud
                                          //     }
                                          //     this.progressBar1.push(datos);
                                          //   }else{
                                          //     this.progressBarLabels.push('Otros')
                                          //     response.data.tipo_prog_d.Otros.map(item=>{
                                          //       if (item.cantidad){
                                          //        let subPorcentaje = ((item.cantidad/porcentaje)*100).toFixed(2)
                                          //        item.porcentaje = subPorcentaje;
                                          //       }
                                          //       return item.porcentaje;
                                          //     });
                                          //     const datos = {
                                          //       porcentaje : ((porcentaje/total)*100).toFixed(2),
                                          //       value: porcentaje[0],
                                          //       table:response.data.tipo_prog_d.Otros
                                          //     }
                                          //     this.progressBar1.push(datos);
                                          //   }
                                          // }
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
                                        Swal.close();
                                      },
                                      (error) => {
                                          Swal.close();
                                      }
                                    );
                                    this.parameters.archivo_temporal = this.archivo_componentes;
                                    this.tableApiservice.getCqrResumenEquipos(this.parameters).subscribe(
                                      (response) => { 
                                        // this.resumenMontos = response.data.total;
                                        
                                        //   this.resumenMontos.ciasegcon =  typeof this.resumenMontos.ciasegcon === 'number' ? this.separadorDeMiles(this.resumenMontos.ciasegcon) : this.separadorDeMiles(Number(this.resumenMontos.ciasegcon));
                                        //   this.resumenMontos.instipriva = typeof this.resumenMontos.instipriva === 'number' ? this.separadorDeMiles(this.resumenMontos.instipriva) : this.separadorDeMiles(Number(this.resumenMontos.instipriva));
                                        //   this.resumenMontos.otros = typeof this.resumenMontos.otros === 'number' ? this.separadorDeMiles(this.resumenMontos.otros) : this.separadorDeMiles(Number(this.resumenMontos.otros));
                                        //   this.resumenMontos.tarjeta = typeof this.resumenMontos.tarjeta === 'number' ? this.separadorDeMiles(this.resumenMontos.tarjeta) : this.separadorDeMiles(Number(this.resumenMontos.tarjeta));
                                          // this.resumenMontos.montoTotal = typeof this.resumenMontos.montoTotal === 'number' ? this.resumenMontos.montoTotal.toFixed(2) : this.separadorDeMiles(Number(this.resumenMontos.montoTotal));

                                          Swal.close();
                                      },
                                      (error) => {
                                          Swal.close();
                                      }
                                    );
                                    this.parameters.archivo_temporal = this.archivo_atenciones;
                                    this.tableApiservice.getCqrResumenEstancia(this.parameters).subscribe(
                                      (response) => {
                                        if(response.success){ 
                                        //     this.resumenMesAnterior = response.data;
                                        //     this.porcCompaMesAntRealizas =  (((this.resumenMes.total - this.resumenMesAnterior.total) / this.resumenMesAnterior.total) * 100).toFixed(2)
                                        //     this.porcCompaMesAntAusentismo = (((this.resumenMes.ausentismo - this.resumenMesAnterior.ausentismo) / this.resumenMesAnterior.ausentismo) * 100).toFixed(2)
                                        //     this.porcCompaMesAntReservadas = (((this.resumenMes.reservadas - this.resumenMesAnterior.reservadas) / this.resumenMesAnterior.reservadas) * 100).toFixed(2)
                                        
                                        // this.resumenMes.total = this.separadorDeMiles(this.resumenMes.total);
                                        //   this.resumenMes.ausentismo = this.separadorDeMiles(this.resumenMes.ausentismo);
                                        //   this.resumenMes.medico = this.separadorDeMiles(this.resumenMes.medico);
                                        //   this.resumenMes.paciente = this.separadorDeMiles(this.resumenMes.paciente);
                                        //   this.resumenMes.anuladas = this.separadorDeMiles(this.resumenMes.anuladas);
                                        //   this.resumenMes.reservadas = this.separadorDeMiles(this.resumenMes.reservadas);
                                          }
                                        Swal.close(); 
                                      },
                                      (error) => {
                                          Swal.close();
                                      }
                                    );
                      // chart y pie
                                    this.tableApiservice.getCqrResumenGrafica(this.parameters).subscribe(
                                      (response) => {  
                                        //  this.chartLabels1 = [];
                                        //  this.chartData1 = [];   
                                        //  this.chartData2 = [];
                                        //  this.chartData3 = [];    
                                        // if(response.success){
                                          
                                        //   response.data.data.map(item =>{
                                        //     this.chartLabels1.push(item.dia);
                                        //     this.chartData1.push(item.cantidad);
                                        //     this.chartData2.push(item.procedencia);
                                        //   });
                                        //   // this.resumenMontos = response.data;
                                          
                                        // }
                                        this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Pacientes','chart-1', 'C.E Reservada', 'C.E Realizada', 'bar');
                                        Swal.close();
                                      },
                                      (error) => {
                                          Swal.close();
                                      }
                                    );
                  }
                },
                (error) => {
                    Swal.close();
                }
              );
              
              // this.tableApiservice.getCqrResumenGrafica(this.parameters).subscribe(
              //   (response) => {        
              //     if(response.success){
              //      this.chartLabels2 = [];
              //      this.chartData3 = [];    
              //     if(response.success){
                    
              //       response.data.data.map(item =>{
              //         this.chartLabels2.push(item.grupo);
              //         this.chartData3.push(item.cantidad);
              //       });
              //       // this.resumenMontos = response.data;
                    
              //     }
              //     this.getPieChart(this.chartLabels2, this.chartData3,'chart-2', 'pie');
              //     // console.log(577, this.chartData1);
                    
              //     }
              //     Swal.close();
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );
  }

  separadorDeMiles(numero) {
    let partesNumero = numero.toString().split('.');
  
    partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return partesNumero.join('.');
  }
  
  


}
