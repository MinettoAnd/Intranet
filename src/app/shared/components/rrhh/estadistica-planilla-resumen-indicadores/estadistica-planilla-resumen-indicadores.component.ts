import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import {AttentionConsultation} from '../../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, SelectionType, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../../interfaces/excel-json.interface';
import { ExportService } from '../../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { RecursosHumanosService } from 'src/app/_services/recursos-humanos.service';
import { NumberDecimalPipe } from 'src/app/pipes/numberDecimal.pipe';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estadistica-planilla-resumen-indicadores',
  templateUrl: './estadistica-planilla-resumen-indicadores.component.html',
  styleUrls: ['./estadistica-planilla-resumen-indicadores.component.scss']
})
export class EstadisticaPlanillaResumenIndicadoresComponent implements OnInit {
  initialSize = 0;
  active = 1;
  enableSummary = true;
  summaryPosition = 'bottom';
  filtroForm: FormGroup;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChild(DatatableComponent) private table: DatatableComponent;
  grafico1: Chart;
  grafico2: Chart;
  private baseChart: ElementRef;
  periodoSeleccionado: any;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      // initially setter gets called with undefined
      this.baseChart = content;
      this.grafico1 = this.getBarChart(this.barChartLabels1, this.barChartData1, this.barChartData2,'', '','chart-1', this.anioAnterior, this.anio, 'line');
      this.grafico2 = this.getBarChart(this.barChartLabels2, this.barChartData3, this.barChartData4,'', '','chart-2', this.anioAnterior, this.anio, 'line');

  } }
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  selected = [];
  SelectionType = SelectionType;
  id: number;
  loadingIndicator: true;
  rows: any;
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
  rows11: any;
  rows12: any;
  rows13: any;
  rows14: any;
  rows15: any;
  rowsModal: any;
  rows9filtered: any;
  rows3filtered: any;
  rows4filtered: any;
  rows5filtered: any;
  rows6filtered: any;
  barData: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  parameters:any;
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
  columns11:any;
  columns12:any;
  columns13:any;
  columns14:any;
  columns15:any;
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
  barChartData1 = [];
  barChartData2 = [];
  barChartData3 = [];
  barChartData4 = [];
  totalPlanilla: number;
  totalEmpleados: number;
  closeResult = '';
  color = ['secondary','success','primary', 'warning', 'info', 'secondary','secondary', 'secondary', 'secondary', 'secondary', 'secondary'];
  action: boolean = false;
  selectedOptionTipo='EMPLEADOS'; 
  selectedOptionPeriodo = this.periodo;
  constructor(private tableApiservice: RecursosHumanosService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      anio: new FormControl(this.anio),
      mes: new FormControl(this.mes),

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
      'sub-totals': row.concepto === 'Nro.de Colaboradores' || row.concepto === 'Nro.de Colaboradores Nuevos' || row.concepto === 'Nro.de Colaboradores Cesados' || row.concepto === 'Planilla Mensual - Ingresos' || row.concepto === 'Planilla Mensual - Descuentos' || row.concepto === 'Planilla Mensual - Total a Pagar' || row.concepto === 'Pago de PROVIS en Soles' || row.concepto === 'Por Maternidad' || row.concepto === 'Por Descanso Medico Prolongado' || row.concepto === 'Total Subsidiado' || row.concepto === 'Nro. de dias Por Maternidad' || row.concepto === 'Nro. de dias Por Descanso Medico Prolongado' || row.concepto === 'Nro. Total de dias subsidiados' || row.concepto === 'Dscto. por Permisos en Soles' || row.concepto === 'Dscto. por Tardanzas' || row.concepto === 'Tiempo total de tardanzas descontadas' || row.concepto === 'Administrativo' || row.concepto === 'Clínica' || row.concepto === 'Farmacia' || row.concepto === 'Hospitalización' || row.concepto === 'Total Dscto.Por Prestación' || row.concepto === 'Total Dscto.Por Prestación' || row.concepto === 'Pago por Reintegros' || row.concepto === 'Pago por Dias Feriados' || row.concepto === 'Pago por Guardia Nocturna' || row.concepto === 'Tiempo total de Feriados Pagados' || row.concepto === 'Tiempo total de Guardia Nocturna Pagadas'};
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
  getBarChart(chartLabels1, chartData1, chartData2,scaleLabel1,scaleLabel2, chartNum, title, title2,typeChart) {
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
        // {
        //   label: title3,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 1,
        //   data: chartData3,
        //   backgroundColor: '#ffa40859'
        //   // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        //   // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        // },
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
async  open({ selected }, TipoPago?, EstadoDeposito?, TipoPlanilla?, content?: any){

  let periodo = this.periodo;
    if(TipoPago === 'Planilla'){
      this.tipoPago = 'NO0'
      this.tipoDePago = 'Planilla Mensual'
    }if(TipoPago === 'Gratificacion'){
      this.tipoPago = 'GR0'
      this.tipoDePago = 'Gratificación'
    }if(TipoPago === 'Liquidacion'){
      this.tipoPago = 'LI0'
      this.tipoDePago = 'Liquidación'
    }if(TipoPago === 'CTS'){
      this.tipoPago = 'CTS'
      this.tipoDePago = 'CTS'
    }if(TipoPago === ''){
      console.log(488, TipoPago)
      this.tipoPago = 'NO0'
      
    }

      if(EstadoDeposito !== undefined){
        this.EstadoDeposito = EstadoDeposito;
      }
      if(TipoPlanilla !== undefined){
        this.TipoPlanilla = TipoPlanilla;
      }
      
      if (selected !== undefined){ 

        if(selected[0].Periodo !== undefined){
          this.periodoSeleccionado = selected[0].Periodo;
        }
        if(selected[0].Descripcion){
          this.TipoPlanilla = selected[0].Descripcion;
          periodo= '';
          this.tipoDePago = this.TipoPlanilla
        }
        console.log(754,  selected[0])
        const  parameters = {
          Periodo: this.periodoSeleccionado.trim(),
          PeriodoDeposito: selected[0].Descripcion ? periodo : this.periodo,
          TipoPago: this.tipoPago.trim(),
          EstadoDeposito: this.EstadoDeposito.toUpperCase(),
          TipoPlanilla: this.TipoPlanilla.trim()
       }
      if(parameters.EstadoDeposito !== null && parameters.EstadoDeposito !== undefined){
       
       this.loading();
       this.tableApiservice.RRhhGetPlanilla(parameters).subscribe(
         (response) =>{ 
          console.log(1155, response);
           if(response.data.success){
             this.columnsModal = response.data.cabeceras;
             this.rowsModal = response.data.tabla_planilla;
             this.temp = this.rowsModal;
             // this.rowsMedicoRecord.map(item=>{
             //   console.log(item);
             // })
           }
           console.log(this.rowsModal);
           Swal.close();
       }),
       (error) => {
         console.log(error)
               Swal.close();
       }
     }
     
     // Swal.close();
   }else{
     this.modalService.open(content, {size: <any>"xl", ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  setPage(pageInfo) {
    console.log(pageInfo);
    this.selectedOptionPeriodo = this.periodo;
    this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      anio: this.anio,
      mes: this.mes,
      periodo:this.periodo,
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };
    this.rows1 = [];
    this.rows2 = [];
    this.rows3 = [];
    this.rows4 = [];
    this.rows5 = [];
    this.rows6 = [];
    this.rows7 = [];
    this.rows8 = [];
    this.rows9 = [];
    this.rows10 = [];
    this.rows11 = [];
    this.rows12 = [];
    this.rows13 = [];
    this.rows14 = [];
    this.rows15 = [];
    this.rowsModal = [];
    this.rows9filtered = [];
    this.rows3filtered = [];
    this.rows4filtered = [];
    this.rows5filtered = [];
    this.rows6filtered = [];

    this.loading();
    console.log('error con el servidor')
    this.tableApiservice.RRhhGetPlanillaEstadisticaResumen(this.parameters).subscribe(
      (response) => {
        this.rows = [];
        console.log(449, response);
        if(response.data.success){
          this.data = response.data ? response.data : [];
          this.message = this.data.titulo;
          this.title = response.data.title;
          this.periodo_emp = response.data.periodo_emp
          this.banco_bcp_f = response.data.banco_bcp_f
          this.banco_bcp_m = response.data.banco_bcp_m
          this.banco_con_f = response.data.banco_con_f
          this.banco_con_m = response.data.banco_con_m

          // this.temp = this.rows;
          this.columns1 = this.data.cabeceras_planilla_pago_soles;
          this.rows1 = this.data.tabla_planilla_pago_soles;
          this.columns2 = this.data.cabeceras_planilla_pago_cantidad;
          this.rows2 = this.data.tabla_planilla_pago_cantidad;

          this.columns3 = this.data.cabeceras_planilla_pendientes_soles;
          this.rows3 = this.data.tabla_planilla_pendientes_soles;
          
          this.rows3filtered = this.rows3.filter(item => item.Periodo.trim() === this.selectedOptionPeriodo);
          this.barData = [];
          this.totalPlanilla = 0;
          this.rows3filtered.map(item => {
            this.totalPlanilla += Number(item.Pagado);
            const data = {
              tipo: item.Descripcion,
              value: this._cp.transform(item.Pendiente),
              percented: this._ndp.transform(item.PorcPend)
            }
            this.barData.push(data)
          });
          console.log(495, this.totalPlanilla )
          let hash = {};
          const array = this.rows3.filter(o => hash[o.Periodo.trim()] ? false : hash[o.Periodo.trim()] = true);
          this.periodos = []
          array.map(item => {
            const periodo = { value: item.Periodo.trim() };
            this.periodos.push(periodo);
          });
          console.log(489, this.periodos);

          this.columns4 = this.data.cabeceras_planilla_pendientes_cantidad;
          this.rows4 = this.data.tabla_planilla_pendientes_cantidad;
          this.rows4filtered = this.rows4.filter(item => item.Periodo.trim() === this.selectedOptionPeriodo);
          this.totalEmpleados = 0;
          this.rows4filtered.map(item => {
            // console.log(524, Number(item.Pagado))
            this.totalEmpleados += Number(item.Pagado);
          });
          
          this.columns5 = this.data.cabeceras_planilla_pendientes_activos_soles;
          this.rows5 = this.data.tabla_planilla_pendientes_activos_soles;
          this.rows5filtered = this.rows5.filter(item => item.Periodo.trim() === this.selectedOptionPeriodo);
          this.columns6 = this.data.cabeceras_planilla_pendientes_activos_cantidad;
          this.rows6 = this.data.tabla_planilla_pendientes_activos_cantidad;
          this.rows6filtered = this.rows6.filter(item => item.Periodo.trim() === this.selectedOptionPeriodo);

          this.columns7 = this.data.cabeceras_planilla_pendiente_soles;
          this.rows7 = this.data.tabla_planilla_pendiente_soles;
          this.columns8 = this.data.cabeceras_planilla_pendiente_cantidad;
          this.rows8 = this.data.tabla_planilla_pendiente_cantidad;

          this.columns9 = this.data.cabeceras_planilla_pagado_fechas;
          this.rows9 = this.data.tabla_planilla_pagado_fechas;
          this.rows9filtered = this.rows9.filter(item => item.Descripcion.trim() === 'EMPLEADOS');
          console.log(477, this.rows9);
          this.barChartLabels1 = [];
          this.barChartLabels2 = [];
          this.barChartData1 = [];
          this.barChartData2 = [];
          this.barChartData3 = [];
          this.barChartData4 = [];
          this.data.hist_total.map(item => {
            if(item.name === 'JAN'){
              item.name = 'ENE';
            }else if(item.name === 'APR'){
              item.name = 'ABR';
            }else if(item.name === 'AUG'){
              item.name = 'AGO';
            }else if(item.name === 'DEC'){
              item.name = 'DIC';
            }
            this.barChartLabels1.push(item.name);
            this.barChartData1.push(item.item_1);
            this.barChartData2.push(item.item_2);
            // this.barChartData3.push(item.item_3)
            // this.barChartData4.push(item.item_4)
          });
          this.data.hist_canti.map(item => {
            if(item.name === 'JAN'){
              item.name = 'ENE';
            }else if(item.name === 'APR'){
              item.name = 'ABR';
            }else if(item.name === 'AUG'){
              item.name = 'AGO';
            }else if(item.name === 'DEC'){
              item.name = 'DIC';
            }
            this.barChartLabels2.push(item.name);
            this.barChartData3.push(item.item_1);
            this.barChartData4.push(item.item_2);
            // this.barChartData3.push(item.item_3)
            // this.barChartData4.push(item.item_4)
          })
          // var data = [];
          // data.push(this.barChartData1, this.barChartData2);
          // this.addData(this.grafico1, this.barChartLabels, data)

            // Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
        console.log('error con el servidor')
          Swal.close();
          Swal.fire("Error!", "Se produjo un error con el servidor", "error");
      }
    );
    this.tableApiservice.RRhhGetPlanillaEstadisticaKPI(this.parameters).subscribe(
      (response) => {
        // this.rows = [];
        
        if(response.data.success){
          this.data = response.data ? response.data : [];
          this.message = this.data.titulo;
          this.title = response.data.title;
  
          // this.temp = this.rows;
          this.columns10 = this.data.cabeceras_kpi_colaboradores;
          this.rows10 = this.data.tabla_kpi_colaboradores;

          console.log(446, this.rows1);

          this.columns11 = this.data.cabeceras_kpi_planillas;
          this.rows11 = this.data.tabla_kpi_planillas;
          
          this.columns12 = this.data.cabeceras_kpi_planillas_subsidio;
          this.rows12 = this.data.tabla_kpi_planillas_subsidio;

          this.columns13 = this.data.cabeceras_kpi_planillas_dscto;

          this.rows13 = this.data.tabla_kpi_planillas_dscto;

          this.columns14 = this.data.cabeceras_kpi_planillas_prestacion;
          this.rows14 = this.data.tabla_kpi_planillas_prestacion;

          this.columns15 = this.data.cabeceras_kpi_planillas_ingresos;
          this.rows15 = this.data.tabla_kpi_planillas_ingresos;


          // this.rows4filtered = this.rows4.filter(item => item.sucursal === 'TODAS');
          // this.barChartLabels = [];
          // this.barChartData1 = [];
          // this.barChartData2 = [];
          // this.barChartData3 = [];
          // this.barChartData4 = [];
          // this.data.hist_mensual.map(item => {
          //   this.barChartLabels.push(item.name);
          //   this.barChartData1.push(item.item_1);
          //   this.barChartData2.push(item.item_2);
          //   this.barChartData3.push(item.item_3)
          //   this.barChartData4.push(item.item_4)
          // })
          // var data = [];
          // data.push(this.barChartData1, this.barChartData2);
          // this.addData(this.grafico1, this.barChartLabels, data)

            Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
          Swal.fire("Error!", "Se produjo un error con el servidor", "error");
      }
    );
  }

  copyTableToClipboard(numberTabla){
    if(numberTabla === 0){
      this.rows.map(item=>{
         item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
         item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
         item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
         item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
      });
      this.exportService.exportToClipboard(this.rows, this.columns1);
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
      this.rows.map(item=>{
        item.montoLima = typeof item.montoLima === 'number' ? item.montoLima : Number(item.montoLima);
        item.montoChorrillos = typeof item.montoChorrillos === 'number' ? item.montoChorrillos : Number(item.montoChorrillos);
        item.montoSurco = typeof item.montoSurco === 'number' ? item.montoSurco : Number(item.montoSurco);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
     });
      this.exportService.exportTableElmToExcel(this.rows, '');
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
  tipoChange(event){
    console.log(751, event);
    const input = event;
    // this.especialidad = input;
    // this.temp = this.rows1;rows2filtered
      if (input === 'EMPLEADOS') {
        this.rows9filtered = this.rows9.filter(item => item.Descripcion.trim() === 'EMPLEADOS');
       } else if (input === 'FUNCIONARIOS'){
        this.rows9filtered = this.rows9.filter(item =>item.Descripcion.trim() === 'FUNCIONARIOS');
       } else if (input === 'OBREROS'){
        this.rows9filtered = this.rows9.filter(item =>item.Descripcion.trim() === 'OBREROS');
       } else if (input === 'PRACTICANTE'){
        this.rows9filtered = this.rows9.filter(item =>item.Descripcion.trim() === 'PRACTICANTE');
       }

    
  }
  tipoChangePer(event){
    console.log(751, event);
    const input = event;
    // this.especialidad = input;
    // this.temp = this.rows1;rows2filtered
    this.rows3filtered = this.rows3.filter(item => item.Periodo.trim() === input);
    this.barData = []
    this.rows3filtered.map(item => {
      const data = {
        tipo: item.Descripcion,
        value: this._cp.transform(item.Pendiente),
        percented: this._ndp.transform(item.PorcPend)
      }
      this.barData.push(data)
    });
    this.rows4filtered = this.rows4.filter(item => item.Periodo.trim() === input);
    this.rows5filtered = this.rows5.filter(item => item.Periodo.trim() === input);
    this.rows6filtered = this.rows6.filter(item => item.Periodo.trim() === input);
      // if (input === 'EMPLEADOS') {
      //   this.rows9filtered = this.rows9.filter(item => item.Descripcion.trim() === 'EMPLEADOS');
      //  } else if (input === 'FUNCIONARIOS'){
      //   this.rows9filtered = this.rows9.filter(item =>item.Descripcion.trim() === 'FUNCIONARIOS');
      //  } else if (input === 'OBREROS'){
      //   this.rows9filtered = this.rows9.filter(item =>item.Descripcion.trim() === 'OBREROS');
      //  } else if (input === 'PRACTICANTE'){
      //   this.rows9filtered = this.rows9.filter(item =>item.Descripcion.trim() === 'PRACTICANTE');
      //  }

    
  }
  updateFilter(event) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rowsModal
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
      this.rowsModal = [...filtered]
      
    } else {

      this.rowsModal = [...this.temp]
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

