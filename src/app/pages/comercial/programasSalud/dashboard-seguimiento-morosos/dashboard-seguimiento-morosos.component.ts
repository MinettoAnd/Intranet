import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { ComercialService } from 'src/app/_services/comercial.service';
import {AttentionConsultation} from '../../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../../models/forms-data/page';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../../interfaces/excel-json.interface';
import { ExportService } from '../../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { ContactoComponent } from 'src/app/modals/seguimientoMorosos/contacto/contacto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PorcentajePipe } from 'src/app/pipes/porcentaje.pipe';

@Component({
  selector: 'app-dashboard-seguimiento-morosos',
  templateUrl: './dashboard-seguimiento-morosos.component.html',
  styleUrls: ['./dashboard-seguimiento-morosos.component.scss']
})
export class DashboardSeguimientoMorososComponent implements OnInit {
  initialSize = 0;
  active = 1;
  private baseChart: ElementRef;
  filtroForm: FormGroup;
  // selectedOptionGraph1 = 'contratos_gestionados';

  public chartLabels1 = [];
  public chartLabels2 = [];
  public chartData1 = [];
  public chartData2 = [];
  public chartData3 = [];
  public chartData4 = [];
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChild(DatatableComponent) private table: DatatableComponent;
  grafico: Chart;
  columns4: any;
  contratosGestionados: any;
  gestionesRealizadas: any;
  gestionesConRespuesta: any;
  gestionesSinRespuesta: any;
  contratosConRespuesta: any;
  contratosConCompromisoPago: any;
  contratosSinRespuesta: any;
  contratosContactoEquivocado: any;
  contratosDeseanAnular: any;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      
      // initially setter gets called with undefined
      this.baseChart = content;
      if (this.baseChart.nativeElement.id === 'chart-1'){
        this.grafico = this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Contratos','chart-1','Contratos Gestionados', 'Contratos con Compromiso de Pago', 'bar');
        
      }else if (this.baseChart.nativeElement.id === 'chart-2'){
        this.getBarChart(this.chartLabels2, this.chartData3, this.chartData4,'Día del mes seleccionado', 'N° Contratos','chart-3', 'C.E Reservada', 'C.E Realizada', 'bar');
        
      }
    }
  }
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  id: number;
  loadingIndicator: true;
  rows1: any;
  rows2 = [];
  rows3: any;
  rows4: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  parameters:any;
  message;
  title;
 
  columns1:any;
  columns2:any;
  columns3:any;
  optionsWithCaption = {};
  datePipe: any;
  optionsAnio = [];
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
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  fecha = moment(new Date()).format('YYYY-MM-DD');
  hoy_menos_seis = moment(new Date()).subtract(6, "days").format("DD-MM-YYYY");
  meses = '00';
  contacto = 'TE';
  tipo_paciente = '0';
  planDeSalud = 0;
  accion = 0;
  page = new Page();
  SelectionType = SelectionType;
  selected = [];
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
  constructor(private tableApiservice: ComercialService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _pp:PorcentajePipe, private _dp: DecimalPipe,  private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;

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
   }

  ngOnInit() {
  
    // this.setPage({ offset: 0 });
  }
  getRowClass(row) {
    return {
      // 'row-paddin': row.item.includes('Con Respuesta')
      'row-paddin-1': row.item === 'Con Respuesta' || row.item === 'Sin Respuesta'  || row.item === 'Contratos Con Respuesta'  || row.item === 'Contratos Sin Respuesta', 'row-paddin-2': row.item === 'Desean Anular Contrato' || row.item === 'Con Compromiso de Pago' || row.item === 'Sin Compromiso de Pago' || row.item === 'Contacto Equivocado' || row.item === 'Otros' 
    };
  }
  // getRowClass1(row) {

  //   return {
  //     'row-paddin': row.item === 'Con Respuesta' || row.item === 'Sin Respuesta', 'row-paddin-doble': row.item === 'Desean Anular Contrato' || row.item === 'Con Compromiso de Pago' || row.item === 'Sin Compromiso de Pago'
  //   };
  // }
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
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    // this.setPage({ offset: 0 });

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
  tipoChangeGraph(event, graph){
    // console.log(827, this.selectedOptionGraph1);
    this.loading('Filtrando');
        this.parameters = {
          // periodo_consulta:this.periodo_consulta,
          // sede: this.id_sede,
          // mes: this.mes,
          // meses: this.mes,
          // anio: this.anio,
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
        if (graph === 'bar' && input === 'contratos_gestionados'){
          // const lenght1 = this.rows1.length;
              // this.tableApiservice.getEmChartIndex(this.parameters).subscribe(
              //   (response) => {  
          
              //       this.chartLabels1 = [];
              //       this.chartData1 = [];   
              //       this.chartData2 = [];
    
              //       // this.chartData4 = [];   
              //       // this.chartData5 = [];   
              //     if(response.success){
                    
              //       response.data.data.map(item =>{
              //         this.chartLabels1.push(item.dia);
              //         this.chartData1.push(item.cantidad);
              //         this.chartData2.push(item.procedencia);
              //       });
              //       // this.resumenMontos = response.data;
                    
              //     }
              //     this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Pacientes','chart-1', 'C.E Reservada', 'C.E Realizada', 'bar');
              //     Swal.close();
              //   },
              //   (error) => {
              //       Swal.close();
              //   }
              // );
        } else if (graph === 'line' && input === 'contratos_con_compromiso_pago'){

            this.parameters.tipo= 'ALTA';
            // this.tableApiservice.getEmPieIndex(this.parameters).subscribe(
            //   (response) => { 
            //     if(response.success){
            //       this.chartLabels2 = [];
            //       this.chartData3 = [];  
            //       this.chartData4 = [];    
            //     if(response.success){
                  
            //       response.data.data.map(item =>{
            //         this.chartLabels2.push(item.grupo);
            //         this.chartData3.push(item.cantidad);
            //       });
            //     }
            //     this.getBarChart(this.chartLabels2, this.chartData3, this.chartData4,'Día del mes seleccionado', 'N° Pacientes','chart-1', 'C.E Reservada', 'C.E Realizada', 'line');
            //   }
            //     Swal.close();
            //   },
            //   (error) => {
            //       Swal.close();
            //   }
            // );
      }
  }
  private changePageLimit(limit: any): void {
    this.loading("Filtrando....");
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
      mes: this.mes,
      anio: this.anio,
      periodo_consulta: this.periodo_consulta,
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading("Realizando Busqueda....");
    this.tableApiservice.getChartContratosGestionadosMes(this.parameters).subscribe(
      (response) => {
        if(response.data.success){
          this.chartLabels1 = [];
          this.chartData1 = [];   
          this.chartData2 = [];
         //  this.chartData3 = [];    
         if(response.success){
           
           response.data.query.map(item =>{
             this.chartLabels1.push(item.dia);
             this.chartData1.push(item.gestionados);
             this.chartData2.push(item.compromisos);
           });
           var data = [];
                  data.push(this.chartData1, this.chartData2);
                  this.addData(this.grafico, this.chartLabels1, data)
         }
            Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    this.tableApiservice.getContratosGestionadosMes(this.parameters).subscribe(
      (response) => {
        this.rows1 = [];
        this.rows2 = [];
        this.columns1 = [];
        if(response.data.success){
          console.log(499, response.data);
          this.columns1 = response.data.cabeceras1;
          this.columns1.map(item =>{
            if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'decimal'){
              item.pipe = this._dp;
            }
          }); 
          this.columns2 = response.data.cabeceras2;
          this.columns2.map(item =>{
            if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'decimal'){
              item.pipe = this._dp;
            }
          }); 
          this.rows1 = response.data.produccion;
          this.rows1.map(row => {
            if(row.item == 'Contratos Morosos a Inicio del Período'){
              return row.id =  0;
            }else if(row.item == 'Contratos Gestionados'){
              this.contratosGestionados = row.per1;
              return row.id =  1;
            }else if(row.item == 'Gestiones Realizadas'){
              this.gestionesRealizadas = row.per1;
              return row.id =  2;
            }else if(row.item == 'Con Respuesta'){
              this.gestionesConRespuesta = row.per1;
              return row.id =  3;
            }else if(row.item == 'Desean Anular Contrato'){
              return row.id =  4;
            }else if(row.item == 'Con Compromiso de Pago'){
              return row.id =  5;
            }else if(row.item == 'Sin Compromiso de Pago'){
              return row.id =  6;
            }else if(row.item == 'Sin Respuesta'){
              this.gestionesSinRespuesta = row.per1;
              return row.id =  7;
            }else if(row.item == 'Contacto Equivocado'){
              return row.id =  8;
            }else if(row.item == 'Otros'){
              return row.id =  9;
            }
          });
          const alphaOrder = (a, b) => {
            // console.log(553, a.id, b.id);
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          }
          this.rows1.sort(alphaOrder);

          this.rows2 = response.data.indicadores;
          this.rows2.map(row => {
            if(row.item == 'Contratos Gestionados'){
              return row.id =  0;
            }else if(row.item == 'Contratos Con Respuesta'){
              this.contratosConRespuesta = row.per1;
              return row.id =  1;
            }else if(row.item == 'Desean Anular Contrato'){
              this.contratosDeseanAnular = row.per1;
              return row.id =  2;
            }else if(row.item == 'Con Compromiso de Pago'){
              this.contratosConCompromisoPago = row.per1;
              return row.id =  3;
            }else if(row.item == 'Sin Compromiso de Pago'){
              return row.id =  4;
            }else if(row.item == 'Contratos Sin Respuesta'){
              this.contratosSinRespuesta = row.per1;
              return row.id =  5;
            }else if(row.item == 'Contacto Equivocado'){
              this.contratosContactoEquivocado = row.per1;
              return row.id =  6;
            }else if(row.item == 'Otros'){
              return row.id =  7;
            }else if(row.item == 'Desean Retirar Integrante del Contrato'){
              return row.id =  8;
            }else if(row.item == 'Titular Fallecido'){
              return row.id =  9;
            }
          });

          this.rows2.sort(alphaOrder);
          console.log(591, this.rows2);
            Swal.close();
        }else{
          Swal.close();
        }
        console.log(508, this.columns1);
       
      },
      (error) => {
          Swal.close();
      }
    );
    this.tableApiservice.getContratosGestionadosAnual(this.parameters).subscribe(
      (response) => {
        this.rows3 = [];
        this.rows4 = [];
        this.columns3 = [];
        if(response.data.success){
          console.log(516, response.data);
          this.columns3 = response.data.cabeceras1;
          this.columns3.map(item =>{
            if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'decimal'){
              item.pipe = this._dp;
            }
          }); 
          this.columns4 = response.data.cabeceras2;
          this.columns4.map(item =>{
            if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }else if(item.pipe === 'porcentaje'){
              item.pipe = this._pp;
            }else if(item.pipe === 'cantidad'){
              item.pipe = this._cnp;
            }else if(item.pipe === 'decimal'){
              item.pipe = this._dp;
            }
          }); 
          this.rows3 = response.data.produccion;
          this.rows3.map(row => {
            if(row.item == 'Contratos Morosos a Inicio del Período'){
              return row.id =  0;
            }else if(row.item == 'Contratos Gestionados'){
              return row.id =  1;
            }else if(row.item == 'Gestiones Realizadas'){
              return row.id =  2;
            }else if(row.item == 'Con Respuesta'){
              return row.id =  3;
            }else if(row.item == 'Desean Anular Contrato'){
              return row.id =  4;
            }else if(row.item == 'Con Compromiso de Pago'){
              return row.id =  5;
            }else if(row.item == 'Sin Compromiso de Pago'){
              return row.id =  6;
            }else if(row.item == 'Sin Respuesta'){
              return row.id =  7;
            }else if(row.item == 'Contacto Equivocado'){
              return row.id =  8;
            }else if(row.item == 'Otros'){
              return row.id =  9;
            }
          });
          const alphaOrder = (a, b) => {
            // console.log(553, a.id, b.id);
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          }
          this.rows3.sort(alphaOrder);
          this.rows4 = response.data.indicadores;
          this.rows4.map(row => {
            if(row.item == 'Contratos Gestionados'){
              return row.id =  0;
            }else if(row.item == 'Contratos Con Respuesta'){
              return row.id =  1;
            }else if(row.item == 'Desean Anular Contrato'){
              return row.id =  2;
            }else if(row.item == 'Con Compromiso de Pago'){
              return row.id =  3;
            }else if(row.item == 'Sin Compromiso de Pago'){
              return row.id =  4;
            }else if(row.item == 'Contratos Sin Respuesta'){
              return row.id =  5;
            }else if(row.item == 'Contacto Equivocado'){
              return row.id =  6;
            }else if(row.item == 'Otros'){
              return row.id =  7;
            }else if(row.item == 'Desean Retirar Integrante del Contrato'){
              return row.id =  8;
            }else if(row.item == 'Titular Fallecido'){
              return row.id =  9;
            }
          });

          this.rows4.sort(alphaOrder);
          console.log(509, this.rows4);
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
    if(numberTabla === 1){
      this.exportService.exportToClipboard(this.rows1, this.columns1);
    }else if (numberTabla === 2){

      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }else if (numberTabla === 3){
    
      this.exportService.exportToClipboard(this.rows3, this.columns3);
    }else if (numberTabla === 4){
    
      this.exportService.exportToClipboard(this.rows4, this.columns4);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 1){
      this.exportService.exportTableElmToExcel(this.rows1, 'Resumen de Morosos - Producción - Mensual');
    }else if (numberTabla === 2){
      
      this.exportService.exportTableElmToExcel(this.rows2, 'Resumen de Morosos - Indicadores Sobre Atenciones - Mensual');
    }else if (numberTabla === 3){
      
      this.exportService.exportTableElmToExcel(this.rows3, 'Resumen de Morosos - Producción - Anual');
    }else if (numberTabla === 4){
      
      this.exportService.exportTableElmToExcel(this.rows4, 'Resumen de Morosos - Indicadores Sobre Atenciones - Anual');
    }
  }

  filter() {
    this.removeData(this.grafico);
        const form = this.filtroForm.value;
        this.mes = form.mes,
        this.anio = form.anio,
        this.periodo_consulta = this.anio + this.mes;
        this.setPage({ offset: 0 });
    }

  updateFilter(event) {
    const input = event.target.value.toLowerCase();
    console.log(input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows1
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
        );
        // console.log(filtered);
      this.rows1 = [...filtered]
      
    } else {
      console.log(this.filtered);
      this.rows1 = [...this.temp]
    }

    // update the rows
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  onSelect(row) {

    if (row !== undefined){

              const  modalRef =  this.modalService.open(ContactoComponent, {
                size: <any>"xl",
              });
              modalRef.componentInstance.dato =  row;
        
     }
  }
  //loading
  async loading(searchtxt) {
    Swal.fire({
        html: `<h3 style="font-size:12px;text-align: center;">${searchtxt}</h3>`,
        width: "250px",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
            Swal.showLoading();
        },
    });
}
}

