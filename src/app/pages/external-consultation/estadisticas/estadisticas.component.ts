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
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  active = 1;

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
  private baseChart: ElementRef;
  // private baseChart2: ElementRef;
  
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
  public barChartLabels1 = [];
  public barChartLabels2 = [];
  public barChartLabels3 = [];
  public barChartLabels4 = [];
  public barChartData1 = [];
  public barChartData2 = [];
  public barChartData3 = [];
  public barChartData4 = [];
  public barChartData5 = [];
  public barChartData6 = [];
  public barChartData7 = [];
  public barChartData8 = [];
  public barChartData9 = [];
  public barChartData10 = [];
  public barChartData11 = [];
  public barChartData12 = [];
  totales;
  id_sede = '0001';
  filtroForm: FormGroup;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  public breadcrumb: any;
  parameters;
  resumenMes = {
    success: '',
    total: '',
    ausentismo: '',
    medico: '',
    paciente: '',
    anuladas: '',
    reservadas: ''
  };
  resumenMesAnterior = {
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
  filtered: any;
  detalleAnual: any;
  especialidad: any;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  page = new Page();
  selected = [];
  SelectionType = SelectionType;
  constructor(private tableApiservice: ExternalConsultationService, private exportService: ExportService,
    private _cp: CurrencyPipe) { 
      this.page.pageNumber = 0;
      this.page.size = 10;
    this.filtroForm = new FormGroup({
      id_sede: new FormControl("0001"),
      mes: new FormControl(this.mes),
      anio: new FormControl(this.anio),
    });
  }

  ngOnInit(){
    console.log('hola')
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
  getBarChart(barChartLabels1, barChartData1, barChartData2, barChartData3, chartNum, title, title2, title3, typeChart) {

    const data = {
      labels: barChartLabels1,
      datasets: [
        {
          barPercentage: 1,
          categoryPercentage: 1,
          label: title,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: barChartData1,
          backgroundColor: 'rgb(166, 17, 32, 0.5)'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title2,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: barChartData2,
          backgroundColor: 'rgb(255, 164, 8, 0.5)'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title3,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: barChartData3,
          backgroundColor: 'rgb(34, 102, 211, 0.5)'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
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
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              // console.log(444,Number.isInteger(value), value,index,values);
              if (chartNum = 'chart-3'){
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }else{
                if (parseInt(value) >= 1000) {
                                return 'S/.' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else { return 'S/.' + value; }
              }
              
            }
          }
        }]
      },
      // legend: {
      //   display: false
      // },
      // scales: {
      //   xAxes: [{
      //     display: false,
      //     ticks: {
      //       max: 100,
      //       min: 0
      //     }
      //   }],
      //   yAxes: [{
      //     display: false
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
  getChart(context, chartType, data, options?) {
    const graph = new Chart(context, {
      data,
      options,
      type: chartType,
      plugins: [ChartDataLabels]
    });
    return graph;
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
  formatPipe(rows1) {
    // console.log(rows1);
    // const editRowslPipe = ((rows1) =>{
  rows1.map(item => {
        // console.log(item);
        // if (item.per1) {
          // console.log(item.per1);
      
      item.cupos = typeof item.cupos === 'number' ? Math.round(item.cupos) : Math.round(Number(item.cupos));
      item.minutosAtencionProg = typeof item.minutosAtencionProg === 'number' ? item.minutosAtencionProg.toFixed(2) : Number(item.minutosAtencionProg).toFixed(2);
      item.promTurnosxDia = typeof item.promTurnosxDia === 'number' ? item.promTurnosxDia.toFixed(2) : Number(item.promTurnosxDia).toFixed(2)
      item.porcUsoCita = typeof item.porcUsoCita === 'number' ? item.porcUsoCita.toFixed(2) : Number(item.porcUsoCita).toFixed(2) + ' %';

    return item.cupos, item.minutosAtencionProg, item.promTurnosxDia, item.porcUsoCita;
        // } else {
        //   return item;
        // }
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
                    this.columns1 = response.data.cabeceras;
                    this.rows1 = response.data.tabla_mes_especialidad;
                    this.formatPipe(this.rows1);
                  }
                },
                (error) => {
                    Swal.close();
                }
              );

              this.tableApiservice.tiposPacientes(this.parameters).subscribe(
                (response) => { 
                  this.columns2 = [];
                  this.rows2 = [];
                  if(response.success){
                    // this.columns1 = response.data.cabeceras;
                    // this.rows2 = response.data.tabla_mes_medico;
                    // this.formatPipe(this.rows2);
                    // this.rows2.map( item => {
                      
                    //   if (!this.especialidades.includes(item.especialidadNombre)){
                    //     this.especialidades.push(item.especialidadNombre);
                    //   }
                    // });
                    // this.temp = this.rows2;
                    // this.rowsFilter = this.rows2.filter(medico => medico.especialidadNombre === 'CARDIOLOGIA');
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
                    this.resumenMontos.montoTotal = typeof this.resumenMontos.montoTotal === 'number' ? this.separadorDeMiles(this.resumenMontos.montoTotal) : this.separadorDeMiles(Number(this.resumenMontos.montoTotal));

                  console.log(442, this.resumenMontos);
                },
                (error) => {
                    Swal.close();
                }
              );

              this.tableApiservice.procesarAnterior(this.parameters).subscribe(
                (response) => {
                  this.columns3 = [];
                  this.rows3 = [];
                  if(response.success){ 
                      this.resumenMesAnterior = response.data;
                  }
                  console.log(472, this.resumenMesAnterior)
                },
                (error) => {
                    Swal.close();
                }
              );
// chart y pie
              this.tableApiservice.chartIndex(this.parameters).subscribe(
                (response) => {                 
                  if(response.success){
                    // this.resumenMontos = response.data;
                    
                  }
                  // console.log(577, this.detalleAnual);
                },
                (error) => {
                    Swal.close();
                }
              );
              this.tableApiservice.pieIndex(this.parameters).subscribe(
                (response) => {                 
                  if(response.success){
                    // this.resumenMontos = response.data;
                    
                  }
                  // console.log(577, this.detalleAnual);
                },
                (error) => {
                    Swal.close();
                }
              );
  
  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any): void {
    
    if (limit === '0'){
      
      this.page.size = this.page.totalElements;
      console.log(this.page.totalElements);
      return
    }
    this.page.size = parseInt(limit, 10);
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
        this.exportService.exportToClipboard(this.rows7, this.columns6);
      }else if (numberTabla === 8){
        this.exportService.exportToClipboard(this.rows8, this.columns6);
      }else if (numberTabla === 9){
        this.exportService.exportToClipboard(this.rows9, this.columns6);
      }else if (numberTabla === 10){
        this.exportService.exportToClipboard(this.rows10, this.columns6);
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
        console.log(this.filtered);
        this.rowsFilter = [...this.temp.filter(medico => medico.especialidadNombre === this.especialidad)]
      }
  
      // update the rows1
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }

    onSelect({ selected }) {
      console.log('Select Event', selected, this.selected);
    }
  
    onActivate(event) {
      console.log('Activate Event', event);
    }
}
