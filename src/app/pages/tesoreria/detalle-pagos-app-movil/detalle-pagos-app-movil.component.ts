import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';

import { ButtonRendererComponent } from '../../../shared/components/renderer/button-renderer.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagosAppMovilComponent } from 'src/app/modals/tesoreria/pagos-app-movil/pagos-app-movil.component';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TesoreriaService } from 'src/app/_services/tesoreria.service';
@Component({
  selector: 'app-detalle-pagos-app-movil',
  templateUrl: './detalle-pagos-app-movil.component.html',
  styleUrls: ['./detalle-pagos-app-movil.component.scss']
})
export class DetallePagosAppMovilComponent implements OnInit {
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
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      // initially setter gets called with undefined
      this.baseChart = content;
      this.grafico1 = this.getBarChart(this.barChartLabels, this.barChartData1, this.barChartData2,'', '','chart-1', 'Soles', 'Cantidad', 'bar');
}
  }
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  selected = [];
  id: number;
  loadingIndicator: true;
  rows: any;
  rows1 = [];
  rows2 = [];
  rows3 = [];
  rows4 = [];
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
  columns3:any;
  columns4:any;
  optionsWithCaption = {};
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  f_inicio = moment(this.restarDias(new Date, -28)).format('YYYY-MM-DD');
  progressBar1 = [];
  progressBarLabels1 = [];
  progressBarLabels2 = [];
  progressBar2 = [];
  progressBarLabels3 = [];
  progressBarLabels4 = [];
  progressBar3 = [];
  progressBarLabels5 = [];
  progressBarLabels6 = [];
  progressBar4 = [];
  progressBarLabels7 = [];
  progressBarLabels8 = [];
  f_fin = moment(new Date()).format('YYYY-MM-DD');
  paciente;
  estado_pago = 'S';
  origen = 'citas';
  color = [ 'graph-primary', 'primary','graph-tertiary', 'graph-quaternary '];
  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  transacciones:any;
  efectivas:any;
  rechazadas:any;
  monto_total: any;

  totalDeuda:any;
  frameworkComponents: any;
  closeResult = '';
  barChartLabels = [];
  barChartData1 = [];
  barChartData2 = [];
  rowHeight = 38;
  action: boolean = false;
  constructor(private tableApiservice: TesoreriaService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private datePipe: DatePipe,private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      f_inicio: new FormControl(this.f_inicio),
      f_fin: new FormControl(this.f_fin),
      paciente: new FormControl(this.paciente),
      estado_pago: new FormControl(this.estado_pago),
      origen: new FormControl(this.origen),
     });
     this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
   }

  ngOnInit() {
  
    // this.setPage({ offset: 0 });
  }
  restarDias(fecha, dias) {
    var fechalim = fecha.setDate(fecha.getDate() + dias);
    var fechas = this.datePipe.transform(fechalim, 'yyyy-MM-dd');
    return fechas;
  }
  getRowClass(row) {

    // return {
    //   'totals': row.Programa.includes('TOTAL')
    // };
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
            // max: 300,
            // min: 0
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
          formatter: function (dato, ctx) {
            console.log(302, dato, ctx)
            if(dato.indexOf('.') > -1){
              return 'S/ ' + dato;
            }
            // return ((dato * 100) / total).toFixed(2) + '%'; 
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
            // label: function(tooltipItem, data) {
            //     var label = data.datasets[tooltipItem.datasetIndex].label || '';
              
            //     if (label) {
            //         label += ': ';
            //     }
            //     label += Math.round(tooltipItem.yLabel * 100) / 100;
            //     tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
            //     tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
                
            //     return label;
            // },
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
  onBtnClick1(e) {

    if ( e.rowData !== undefined){
          const  modalRef =  this.modalService.open(PagosAppMovilComponent, {
            size: <any>"lg",
          });
          console.log( 139, e.rowData)
          modalRef.componentInstance.dato =  e.rowData;
    }
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
    const archivo_temporal = this.makeid(11);
    const archivo_anual = this.makeid(11);
    this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      f_inicio: this.f_inicio,
      f_fin: this.f_fin,
      paciente: this.paciente,
      estado_pago: this.estado_pago,
      origen: this.origen,
      archivo: archivo_temporal,
      archivo_temporal: archivo_temporal,
      archivo_anual: archivo_anual,
      // pageNumber: this.page.pageNumber,
      // size: this.page.size
    };

    this.loading();
 this.tableApiservice.TsGeneraArchivos(this.parameters).subscribe(
      async (response) => {
        if(response.data.success){
          this.tableApiservice.TsGetResumenTipoTarjeta(this.parameters).subscribe(
            (response) => {
              this.progressBar1 = [];
              this.progressBarLabels1 = [];
              this.progressBarLabels2 = [];
              if(response.data.success){
                // this.rows1      = response.data.grupo_porc
                this.progressBarLabels1 = response.data.grupo_detalle
                this.progressBarLabels2 = response.data.grupo
                let table: any;
                for (const [key, value] of Object.entries(response.data.grupo_porc)) {
                  console.log(key, '=>', value)
                  let porcentaje:any = value;

                  const datos = {
                      porcentaje : porcentaje.toFixed(2),
                      // value: porcentaje[0],

                  }
                  this.progressBar1.push(datos);
                }
                console.log(265, this.progressBar1)

              }
              
            },
            (error) => {
                Swal.close();
            }
          );
            this.tableApiservice.TsGetResumenCabecera(this.parameters).subscribe(
              (response) => {
                this.rows = [];
                this.columns = [];
                console.log(response);
                if(response.data.success){
                  this.transacciones = response.data.transacciones;
                  this.efectivas = response.data.efectivas;
                  this.rechazadas = response.data.rechazadas;
                  this.monto_total = response.data.monto_total;
                }
              },
              (error) => {
                  Swal.close();
              }
            );
            this.tableApiservice.TsGetGraficaAnualMontos(this.parameters).subscribe(
              (response) => {
                this.barChartLabels = [];
                this.barChartData1 = [];
                this.barChartData2 = [];
                if(response.data.success){
                  response.data.grafica_anual_montos.map(item => {
                      this.barChartLabels.push(item.name)
                      this.barChartData1.push(item.item_1)
                      this.barChartData2.push(item.item_2)
                  });
                  var data = [];
                  data.push(this.barChartData1, this.barChartData2);
                  this.addData(this.grafico1, this.barChartLabels, data)
                }
              },
              (error) => {
                  Swal.close();
              }
            );
            
            this.tableApiservice.TsListaPagosDetalleCitas(this.parameters).subscribe(
              (response) => {
                this.rows = [];
                this.columns = [];
                this.progressBarLabels4 = [];
                if(response.data.success){
                  this.rows      = response.data.tabla_lista
                  this.columns      = response.data.cabeceras
                  this.data = response.data ? response.data : [];
                  this.message = this.data.titulo;
        
                  this.columns.map(item =>{
                    if(item.headerName === 'VER MÁS'){
                      item.cellRenderer= 'buttonRenderer',
                      item.cellRendererParams= {
                        onClick: this.onBtnClick1.bind(this),
                        label: 'Click 1'
                      }
                    }
                  });
                  this.rows = this.data.tabla_lista;
                  this.temp = this.rows;

                }
                
              },
              (error) => {
                  Swal.close();
              }
            );

          await  this.tableApiservice.TsEliminaTabla(this.parameters).subscribe(
             async (response) => {
                if(response.data.success){
                  await Swal.close();
        
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
          
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
      this.rows.map(item => {
        item.montoAutorizado = typeof item.montoAutorizado === 'number' ? item.montoAutorizado : Number(item.montoAutorizado);
      });
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 1){

      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }else if (numberTabla === 2){
    
      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 0){
      this.rows.map(item => {
        item.montoAutorizado = typeof item.montoAutorizado === 'number' ? item.montoAutorizado : Number(item.montoAutorizado);
      });
      this.exportService.exportTableElmToExcel(this.rows, 'Listado de Morosos');
    }else if (numberTabla === 1){
      
      this.exportService.exportTableElmToExcel(this.rows1, 'Listado de Morosos - Distribución por Programa');
    }else if (numberTabla === 2){
      
      this.exportService.exportTableElmToExcel(this.rows2, 'Listado de Morosos - Distribución por Período');
    }
  }

  filter() {
    this.action = true;
    if(this.grafico1){
      this.removeData(this.grafico1);
    }
        const form = this.filtroForm.value;
          this.f_inicio = moment(form.f_inicio).format('YYYY-MM-DD');
          this.f_fin = moment(form.f_fin).format('YYYY-MM-DD');
          this.paciente = form.paciente;
          this.estado_pago = form.estado_pago;
          this.origen = form.origen;
          var diff = moment(this.f_fin).diff(moment(this.f_inicio));
          
          console.log(606, diff.toString().indexOf('-'))
          if(diff.toString().indexOf('-') > -1){
            Swal.fire({
              title: "Problema",
              text: "La Fecha Inicio no puede ser mayor a la Fecha Final!",
              icon: "error"
            })
            return;
          }else if((diff/(1000*60*60*24)) < 31){
            this.setPage({ offset: 0 });
          }else{
            Swal.fire({
              title: "Problema",
              text: "El sistema puede presentar datos de 31 DÍAS como máximo. Agradeceríamos modificar sus filtros de FECHA!",
              icon: "error"
            })
            return;
          }
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
  updateFilter(event) {
    const input = event.target.value.toLowerCase();

    // filter our data
    if (input.length > 0) {
      const filtered = this.rows.filter(el =>
        // console.log(240, el);
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        console.log(filtered);
      this.rows = [...filtered]
      
    } else {
      console.log(this.filtered);
      this.rows = [...this.temp]
    }
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  summaryForAmount(cells: any){
    console.log(cells);
    let count: number = 0;
    let re = /\,/gi;
    let re1 = /\S\/./gi;
        
        cells.filter((cell) => {
            cell = cell.toString();
            if (cell != null && cell != undefined) {
              // console.log(719, cell, count)
              if (cell.indexOf('S/.') > -1){  
                count = count + +cell.replace(re1, '').replace(',', '');
              }else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
               
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
          // count = this._cp.transform(count, 'PEN', 'S/. ')
          
          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count;
        }else{console.log(737, count)
          return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count.toLocaleString();
        }
  }
  private summaryNull(cells: any): string {
    // console.log(739, cells)
        return 'TOTAL';
  }
}

