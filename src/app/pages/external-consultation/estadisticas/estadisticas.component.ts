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
import { ColumnMode, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
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
  resumenAnual = {
    promMesUso: '',
    minutosAtendidos_xDia: '',
    ocupabilidad: '',
    minutosProgramados_xDia: '',
    usoEfectivoTurno: '',
    nro_consultorios: '',
    nro_turnos: '',
    nro_consultorios_maestro: '',
    nro_atendidos: '',
    nro_cupos: '',
    nro_atendidos_xdia: '',
    nro_atendidos_xturno: '',
    nro_medicos: '',
    nro_especialidad: '',
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
  rows5: object[];
  rows6: object[];
  filtered: any;
  detalleAnual: any;
  especialidad: any;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  page = new Page()
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
        typepie: 'IN'
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
                (response) => {console.log(394, response)
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

              // this.tableApiservice.tiposPacientes(this.parameters).subscribe(
              //   (response) => { 
              //     this.columns2 = [];
              //     this.rows2 = [];
              //     if(response.success){
              //       this.columns1 = response.data.cabeceras;
              //       this.rows2 = response.data.tabla_mes_medico;
              //       this.formatPipe(this.rows2);
              //       this.rows2.map( item => {
                      
              //         if (!this.especialidades.includes(item.especialidadNombre)){
              //           this.especialidades.push(item.especialidadNombre);
              //         }
              //       });
              //       this.temp = this.rows2;
              //       this.rowsFilter = this.rows2.filter(medico => medico.especialidadNombre === 'CARDIOLOGIA');
              //     }
                  
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );

              // this.tableApiservice.calcularMontos(this.parameters).subscribe(
              //   (response) => {
              //     this.barChartLabels1 = [];
              //     this.barChartData1 = [];
              //     this.barChartData2 = [];
              //     this.barChartData3 = [];
              //     if(response.success){
              //       // this.barChartLabels1 = response;
              //       response.grafica1.map(item => {
              //             this.barChartLabels1.push(item.name);
              //             this.barChartData1.push(item.item_1);
              //             this.barChartData2.push(item.item_2);
              //             this.barChartData3.push(item.item_3);
              //         } 
              //       );
              //     }
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );

              // this.tableApiservice.procesarAnterior(this.parameters).subscribe(
              //   (response) => {
              //     this.columns3 = [];
              //     this.rows3 = [];
              //     if(response.success){
              //       this.columns3 = response.data.cabeceras;
              //       this.rows3 = response.data.tabla_resumen_medico_1;
              //       this.rows3.map(item =>{
                      
              //         if(item.item === 'Ocupabilidad del Medico' || item.item === 'Ocupabilidad de Atenciones' || item.item === 'Ocupabilidad del Turno' ){
              //           console.log(593, item)
              //           item.per1 = typeof item.per1 === 'number' ? item.per1.toFixed(2) + ' %' : Number(item.per1).toFixed(2) + ' %';
              //           item.per2 = typeof item.per2 === 'number' ? item.per2.toFixed(2) + ' %' : Number(item.per2).toFixed(2) + ' %';
              //           item.per3 = typeof item.per3 === 'number' ? item.per3.toFixed(2) + ' %' : Number(item.per3).toFixed(2) + ' %';
              //           item.per4 = typeof item.per4 === 'number' ? item.per4.toFixed(2) + ' %' : Number(item.per4).toFixed(2) + ' %';
  
              //           item.per5 = typeof item.per5 === 'number' ? item.per5.toFixed(2) + ' %' : Number(item.per5).toFixed(2) + ' %';
              //           item.per6 = typeof item.per6 === 'number' ? item.per6.toFixed(2) + ' %' : Number(item.per6).toFixed(2) + ' %';
              //           item.per7 = typeof item.per7 === 'number' ? item.per7.toFixed(2) + ' %' : Number(item.per7).toFixed(2) + ' %';
              //           item.per8 = typeof item.per8 === 'number' ? item.per8.toFixed(2) + ' %' : Number(item.per8).toFixed(2) + ' %';
              //           item.per9 = typeof item.per9 === 'number' ? item.per9.toFixed(2) + ' %' : Number(item.per9).toFixed(2) + ' %';
              //           item.per10 = typeof item.per10 === 'number' ? item.per10.toFixed(2) + ' %' : Number(item.per10).toFixed(2) + ' %';
              //           item.per11 = typeof item.per11 === 'number' ? item.per11.toFixed(2) + ' %' : Number(item.per11).toFixed(2) + ' %';
              //           item.per12 = typeof item.per12 === 'number' ? item.per12.toFixed(2) + ' %' : Number(item.per12).toFixed(2) + ' %';
              //           item.TOTAL = typeof item.TOTAL === 'number' ? item.TOTAL.toFixed(2) + ' %' : Number(item.TOTAL).toFixed(2) + ' %';
              //         }else{
              //           item.per1 = typeof item.per1 === 'number' ? this.separadorDeMiles(item.per1) : this.separadorDeMiles(Number(item.per1));
              //           item.per2 = typeof item.per2 === 'number' ? this.separadorDeMiles(item.per2) : this.separadorDeMiles(Number(item.per2));
              //           item.per3 = typeof item.per3 === 'number' ? this.separadorDeMiles(item.per3) : this.separadorDeMiles(Number(item.per3));
              //           item.per4 = typeof item.per4 === 'number' ? this.separadorDeMiles(item.per4) : this.separadorDeMiles(Number(item.per4));
  
              //           item.per5 = typeof item.per5 === 'number' ? this.separadorDeMiles(item.per5) : this.separadorDeMiles(Number(item.per5));
              //           item.per6 = typeof item.per6 === 'number' ? this.separadorDeMiles(item.per6) : this.separadorDeMiles(Number(item.per6));
              //           item.per7 = typeof item.per7 === 'number' ? this.separadorDeMiles(item.per7) : this.separadorDeMiles(Number(item.per7));
              //           item.per8 = typeof item.per8 === 'number' ? this.separadorDeMiles(item.per8) : this.separadorDeMiles(Number(item.per8));
              //           item.per9 = typeof item.per9 === 'number' ? this.separadorDeMiles(item.per9) : this.separadorDeMiles(Number(item.per9));
              //           item.per10 = typeof item.per10 === 'number' ? this.separadorDeMiles(item.per10): this.separadorDeMiles(Number(item.per10));
              //           item.per11 = typeof item.per11 === 'number' ? this.separadorDeMiles(item.per11): this.separadorDeMiles(Number(item.per11));
              //           item.per12 = typeof item.per12 === 'number' ? this.separadorDeMiles(item.per12): this.separadorDeMiles(Number(item.per12));
              //           item.TOTAL = typeof item.TOTAL === 'number' ? this.separadorDeMiles(item.TOTAL): this.separadorDeMiles(Number(item.TOTAL));
              //         }
              //         return item.per1, item.per2, item.per3, item.per4, item.per5, item.per6, item.per7, item.per8, item.per9, item.per10, item.per11,item.per12, item.TOTAL;
              //       });
              //     }
                  
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );
// chart y pie
              // this.tableApiservice.getResumenCabeceraEspecialidadMes(this.parameters).subscribe(
              //   (response) => {                 
              //     if(response.success){
              //       this.resumenAnual = response.data;
                    
              //     }
              //     console.log(577, this.detalleAnual);
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );
              // this.tableApiservice.getUsoMedicoAnual(this.parameters).subscribe(
              //   (response) => { console.log(686, response)
              //     if(response.success){
  
              //       this.columns4 = response.data.cabeceras;
              //       this.rows4 = response.data.tabla_medicoUsoCita;
              //       this.formatPipe(this.rows4);
              //       this.rows4.map( item => {
                      
              //         if (!this.especialidades.includes(item.especialidadNombre)){
              //           this.especialidades.push(item.especialidadNombre);
              //         }
              //       });
              //       this.rows4.map(item =>{
              //         item.Per1 = typeof item.Per1 === 'number' ? item.Per1.toFixed(2) + ' %' : Number(item.Per1).toFixed(2) + ' %';
              //         item.Per2 = typeof item.Per2 === 'number' ? item.Per2.toFixed(2) + ' %' : Number(item.Per2).toFixed(2) + ' %';
              //         item.Per3 = typeof item.Per3 === 'number' ? item.Per3.toFixed(2) + ' %' : Number(item.Per3).toFixed(2) + ' %';
              //         item.Per4 = typeof item.Per4 === 'number' ? item.Per4.toFixed(2) + ' %' : Number(item.Per4).toFixed(2) + ' %';
  
              //         item.Per5 = typeof item.Per5 === 'number' ? item.Per5.toFixed(2) + ' %' : Number(item.Per5).toFixed(2) + ' %';
              //         item.Per6 = typeof item.Per6 === 'number' ? item.Per6.toFixed(2) + ' %' : Number(item.Per6).toFixed(2) + ' %';
              //         item.Per7 = typeof item.Per7 === 'number' ? item.Per7.toFixed(2) + ' %' : Number(item.Per7).toFixed(2) + ' %';
              //         item.Per8 = typeof item.Per8 === 'number' ? item.Per8.toFixed(2) + ' %' : Number(item.Per8).toFixed(2) + ' %';
              //         item.Per9 = typeof item.Per9 === 'number' ? item.Per9.toFixed(2) + ' %' : Number(item.Per9).toFixed(2) + ' %';
              //         item.Per10 = typeof item.Per10 === 'number' ? item.Per10.toFixed(2) + ' %' : Number(item.Per10).toFixed(2) + ' %';
              //         item.Per11 = typeof item.Per11 === 'number' ? item.Per11.toFixed(2) + ' %' : Number(item.Per11).toFixed(2) + ' %';
              //         item.Per12 = typeof item.Per12 === 'number' ? item.Per12.toFixed(2) + ' %' : Number(item.Per12).toFixed(2) + ' %';
              //         item.promMesUso = typeof item.promMesUso === 'number' ? item.promMesUso.toFixed(2) : Number(item.promMesUso).toFixed(2) + ' %';
              //         item.promMeses = typeof item.promMeses === 'number' ? item.promMeses.toFixed(2) : Number(item.promMeses).toFixed(2) + ' %';
              //         return item.Per1, item.Per2, item.Per3, item.Per4, item.Per5, item.Per6, item.Per7, item.Per8, item.Per9, item.Per10, item.Per11,item.Per12,item.promMesUso,item.promMeses;
              //       });
              //       this.temp2 = this.rows4;
              //       this.rowsFilter2 = this.rows4.filter(medico => medico.especialidadNombre === 'CARDIOLOGIA');
  
              //         // this.columns4 = response.data.cabeceras
              //         // this.rows4 = response.data.tabla_medicoUsoCita
                      
                      
              //     }
              //     Swal.close();
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );

  
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
        this.exportService.exportToClipboard(this.rows2, this.columns1);
      }else if (numberTabla === 3){
        this.exportService.exportToClipboard(this.rows3, this.columns1);
      }else if (numberTabla === 4){
        this.exportService.exportToClipboard(this.rows4, this.columns2);
      }else if (numberTabla === 5){
        this.exportService.exportToClipboard(this.rows5, this.columns2);
      }else if (numberTabla === 6){
        this.exportService.exportToClipboard(this.rows6, this.columns2);
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
}
