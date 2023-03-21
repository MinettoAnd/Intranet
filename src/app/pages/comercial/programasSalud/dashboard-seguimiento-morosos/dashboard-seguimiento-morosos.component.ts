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
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { ContactoComponent } from 'src/app/modals/seguimientoMorosos/contacto/contacto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  selectedOptionGraph1 = 'contratos_gestionados';

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
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      
      // initially setter gets called with undefined
      this.baseChart = content;
      if (this.baseChart.nativeElement.id === 'chart-1'){
        this.getBarChart(this.chartLabels1, this.chartData1, this.chartData2,'Día del mes seleccionado', 'N° Contratos','chart-1', 'C.E Reservada', 'C.E Realizada', 'bar');
        
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
  rows: any;
  rows1 = [];
  rows2: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  parameters:any;
  message;
  title;
  columns:any;
  columns1:any;
  columns2:any;
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
    private _cp: CurrencyPipe, private _phone: PhonePipe, private modalService: NgbModal) {
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
      'totals': row.Programa.includes('TOTAL')
    };
  }
  getRowClass1(row) {

    return {
      'totals': row.periodo.includes('TOTAL')
    };
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

  tipoChangeGraph(event, graph){
    console.log(827, this.selectedOptionGraph1);
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
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading("Realizando Busqueda....");
    this.tableApiservice.getMorososSeguimiento(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        this.rows = [];
        if(response.data.success){
          this.message = response.message;
          this.title = response.data.title;
          //console.log(response.data);
          this.data = response.data ? response : [];
          console.log(168, this.data);   
          this.columns = this.data.data.cabeceras;
          // console.log(168, this.columns);  
          this.columns.map(item=>{
            if (item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          });
          this.columns1 = [
            {prop: 'Programa', name: 'Programa'},
            {prop: 'TotalContratos', name: 'Contratos', pipe: this._cnp},
            {prop: 'TotalMiembros', name: 'Afiliados', pipe: this._cnp},
            {prop: 'CuotasVencidas', name: 'Periodos', pipe: this._cnp},
            {prop: 'ImpCuotasVencidas', name: 'Deuda', pipe: this._cp},
          ]
          this.columns2 = [
            {prop: 'periodo', name: 'Periodos'},
            {prop: 'nuContratos', name: 'Contratos', pipe: this._cnp},
            {prop: 'nuAfiliados', name: 'Afiliados', pipe: this._cnp},
            {prop: 'nuCuotasVencidas', name: 'Periodos', pipe: this._cnp},
            {prop: 'totalImpCuotasVencidas', name: 'Deuda', pipe: this._cp},
          ]
          this.rows = this.data.data.data;
          this.rows1 = [];
          this.totalMorosos = this._cnp.transform(this.rows.length);
          this.totalAfiliados = 0;
          this.totalPeriodos = 0;
          this.totalDeuda = 0;
          
          let result = [];
          let totalContratos = 0;
          let totalAfiliados = 0;
          let totalPeriodos = 0;
          let totalDeuda = 0;
          this.rows.forEach(function (a) {
            //console.log(177,a);
              if ( !this[a.grupoPrograma]) {
                  this[a.grupoPrograma] =  { Programa: a.grupoPrograma, TotalContratos: 0, TotalMiembros: 0, CuotasVencidas: 0, ImpCuotasVencidas: 0 };

                  result.push(this[a.grupoPrograma]);
              }
              this[a.grupoPrograma].TotalContratos += 1;
              this[a.grupoPrograma].TotalMiembros += Number(a.TotalMiembros);
              this[a.grupoPrograma].CuotasVencidas += Number(a.CuotasVencidas);
              this[a.grupoPrograma].ImpCuotasVencidas += Number(a.ImpCuotasVencidas);
             
             
          }, Object.create(null));
          this.rows1 = result;
          this.rows1.map(item =>{
            totalContratos += item.TotalContratos;
            totalAfiliados += item.TotalMiembros;
            totalPeriodos += item.CuotasVencidas;
            totalDeuda += item.ImpCuotasVencidas;
          });
          const total = {
            Programa: 'TOTAL', 
            TotalContratos: totalContratos, 
            TotalMiembros: totalAfiliados, 
            CuotasVencidas: totalPeriodos, 
            ImpCuotasVencidas: totalDeuda
          };
          
          this.rows1.push(total);
          this.rows.map(item=>{
            //console.log(222,item.ImpCuotasVencidas);
            item.ImpCuotasVencidas =  item.ImpCuotasVencidas;
            item.Telefono = this._phone.transform( item.Telefono);
          });
          this.totalAfiliados = this._cnp.transform(totalAfiliados);
          this.totalPeriodos = this._cnp.transform(totalPeriodos);
          this.totalDeuda = totalDeuda;
          //console.log(198, this.rows1);

          this.rows2 = [];
          let nuContratosP1= 0;
          let nuAfiliadosP1 = 0;
          let nuCuotasVencidasP1 = 0;
          let totalImpP1 = 0;

          let nuContratosP2 = 0;
          let nuAfiliadosP2 = 0;
          let nuCuotasVencidasP2 = 0;
          let totalImpP2 = 0;

          let nuContratosP3 = 0;
          let nuAfiliadosP3 = 0;
          let nuCuotasVencidasP3 = 0;
          let totalImpP3 = 0;

          let nuContratosP4 = 0;
          let nuAfiliadosP4 = 0;
          let nuCuotasVencidasP4 = 0;
          let totalImpP4 = 0;
          
          let nuContratosP5 = 0;
          let nuAfiliadosP5 = 0;
          let nuCuotasVencidasP5 = 0;
          let totalImpP5 = 0;

          let nuContratosP6 = 0;
          let nuAfiliadosP6 = 0;
          let nuCuotasVencidasP6 = 0;
          let totalImpP6 = 0;
          //console.log(300,this.rows);
          this.rows.map(item =>{
           // console.log(300,this._cp.transform(item.ImpCuotasVencidas));
           //console.log(223,Number(item.ImpCuotasVencidas))
            item.Telefono = this._phone.transform( item.Telefono);
            item.Celular = this._phone.transform( item.Celular);
            if(item.CuotasVencidas === '1'){
              nuContratosP1 += 1;
              nuAfiliadosP1 += Number(item.TotalMiembros);
              nuCuotasVencidasP1 += Number(item.CuotasVencidas);
              totalImpP1 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '2'){
              nuContratosP2 += 1;
              nuAfiliadosP2 += Number(item.TotalMiembros);
              nuCuotasVencidasP2 += Number(item.CuotasVencidas);
              totalImpP2 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '3'){
              nuContratosP3 += 1;
              nuAfiliadosP3 += Number(item.TotalMiembros);
              nuCuotasVencidasP3 += Number(item.CuotasVencidas);
              totalImpP3 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '4'){
              nuContratosP4 += 1;
              nuAfiliadosP4 += Number(item.TotalMiembros);
              nuCuotasVencidasP4 += Number(item.CuotasVencidas);
              totalImpP4 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '5'){
              nuContratosP5 += 1;
              nuAfiliadosP5 += Number(item.TotalMiembros);
              nuCuotasVencidasP5 += Number(item.CuotasVencidas);
              totalImpP5 += Number(item.ImpCuotasVencidas);
            }else if(Number(item.CuotasVencidas) > 5){
              nuContratosP6 += 1;
              nuAfiliadosP6 += Number(item.TotalMiembros);
              nuCuotasVencidasP6 += Number(item.CuotasVencidas);
              totalImpP6 += Number(item.ImpCuotasVencidas);
            }
          });
          const datosPeriodo1 =  {
              periodo: '1 PERIODO',
              nuContratos: nuContratosP1,
              nuAfiliados: nuAfiliadosP1,
              nuCuotasVencidas: nuCuotasVencidasP1,
              totalImpCuotasVencidas: totalImpP1
            };
          const datosPeriodo2 =  {
            periodo: '2 PERIODOS',
            nuContratos: nuContratosP2,
            nuAfiliados: nuAfiliadosP1,
            nuCuotasVencidas: nuCuotasVencidasP2,
            totalImpCuotasVencidas: totalImpP2
            };
          const datosPeriodo3 = {
            periodo: '3 PERIODOS',
            nuContratos: nuContratosP3,
            nuAfiliados: nuAfiliadosP3,
            nuCuotasVencidas: nuCuotasVencidasP3,
            totalImpCuotasVencidas: totalImpP3
            };
          const datosPeriodo4 = {
              periodo: '4 PERIODOS',
              nuContratos: nuContratosP4,
              nuAfiliados: nuAfiliadosP4,
              nuCuotasVencidas: nuCuotasVencidasP4,
              totalImpCuotasVencidas: totalImpP4
            };
          const datosPeriodo5 = {
              periodo: '5 PERIODOS',
              nuContratos: nuContratosP5,
              nuAfiliados: nuAfiliadosP5,
              nuCuotasVencidas: nuCuotasVencidasP5,
              totalImpCuotasVencidas: totalImpP5
            };
          const datosPeriodo6 = {
              periodo: 'MÁS DE 5 PERIODOS',
              nuContratos: nuContratosP6,
              nuAfiliados: nuAfiliadosP6,
              nuCuotasVencidas: nuCuotasVencidasP6,
              totalImpCuotasVencidas: totalImpP6
            };
          const datosPeriodo7 = {
              periodo: 'TOTAL',
              nuContratos: nuContratosP1 + nuContratosP2 + nuContratosP3 + nuContratosP4 + nuContratosP5 + nuContratosP6,
              nuAfiliados: nuAfiliadosP1 + nuAfiliadosP2 +nuAfiliadosP3 + nuAfiliadosP4 + nuAfiliadosP5 + nuAfiliadosP6,
              nuCuotasVencidas: nuCuotasVencidasP1 + nuCuotasVencidasP2 + nuCuotasVencidasP3 + nuCuotasVencidasP4 + nuCuotasVencidasP5+ nuCuotasVencidasP6,
              totalImpCuotasVencidas: totalImpP1 + totalImpP2 + totalImpP3 + totalImpP4 + totalImpP5 + totalImpP6,
          };
          this.rows2.push(datosPeriodo1);
          this.rows2.push(datosPeriodo2);
          this.rows2.push(datosPeriodo3);
          this.rows2.push(datosPeriodo4);
          this.rows2.push(datosPeriodo5);
          this.rows2.push(datosPeriodo6);
          this.rows2.push(datosPeriodo7);
          //console.log(200,this.rows2);
          this.rows2.map(item=>{
            item.ImpCuotasVencidas = this._cp.transform( item.ImpCuotasVencidas);
          });
          //console.log(response.data.page);
          this.page = (response as any).data.page;
          this.temp = this.rows;
          
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
      // this.rows.map(item=>{
      //   item.ImpCuotasVencidas = this._cp.transform( item.ImpCuotasVencidas);
      // });
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 1){

      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }else if (numberTabla === 2){
    
      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 0){
      // this.rows.map(item=>{
      //   item.ImpCuotasVencidas = this._cp.transform( item.ImpCuotasVencidas);
      // });
      this.exportService.exportTableElmToExcel(this.rows, 'Examenes Laboratorio');
    }else if (numberTabla === 1){
      
      this.exportService.exportTableElmToExcel(this.rows1, 'Examenes Laboratorio');
    }else if (numberTabla === 2){
      
      this.exportService.exportTableElmToExcel(this.rows2, 'Examenes Laboratorio');
    }
  }

  filter() {
  
        const form = this.filtroForm.value;
        this.mes = form.mes,
        this.anio = form.anio,
        this.setPage({ offset: 0 });
    }

  updateFilter(event) {
    const input = event.target.value.toLowerCase();
    console.log(input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
        );
        // console.log(filtered);
      this.rows = [...filtered]
      
    } else {
      console.log(this.filtered);
      this.rows = [...this.temp]
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

