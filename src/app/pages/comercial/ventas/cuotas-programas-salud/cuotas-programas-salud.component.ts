import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { TableApiService } from '../../../../_services/table-api.service';
import {AttentionConsultation} from '../../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../../interfaces/excel-json.interface';
import { ExportService } from '../../../../_services/export.service';
import { CurrencyPipe } from '@angular/common';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-cuotas-programas-salud',
  templateUrl: './cuotas-programas-salud.component.html',
  styleUrls: ['./cuotas-programas-salud.component.sass']
})
export class CuotasProgramasSaludComponent implements OnInit {
  private baseChart: ElementRef;
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public isCollapsed5 = false;
  public isCollapsed6 = false;
  public barChartLabels = [];
  public barChartData = [];
  public barChartData2 = [];
  totales;
  filtroForm: FormGroup;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;
  @ViewChild("baseChart", { static: false }) set content(
    content: ElementRef
  ) {
    if (content) {
      
      // initially setter gets called with undefined
      this.baseChart = content;
      this.getBarChart(this.barChartLabels, this.barChartData, this.barChartData2, 'chart-1', 'MENSUAL-INGRESO SIN IGV-TOTAL CUOTAS', 'MENSUAL-INGRESO SIN IGV-TOTAL RECAUDADO', 'bar');
      // this.getBarChart(this.pieChartLabels, this.pieChartData, 'chart-2', 'Origen de ingreso', this.listencuesta, 'pie');
      // this.getBarChart(this.pieChartLabels2, this.pieChartData2, 'chart-3', 'Tipo de paciente', this.listencuesta, 'bar');
      // this.getBarChart(this.pieChartLabels22, this.pieChartData22, 'chart-4', 'Plan de salud', this.sumtarjeta, 'pie');
      // this.getBarChart(this.pieChartLabels23, this.pieChartData23, 'chart-5', 'Convenio', this.sumconvenio, 'bar');
      // this.getBarChart(this.pieChartLabels24, this.pieChartData24, 'chart-6', 'Compañía Seguro', this.companyTotals, 'doughnut');
      // this.getBarChart(this.pieChartLabels3, this.pieChartData3, 'chart-8', 'Escala de Recomendación', this.recomendacionTotal, 'doughnut');
    }
  }
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChild(DatatableComponent) private table: DatatableComponent;
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
  rows2: any;
  rows3: any;
  rows4: any;
  rows5: any;
  rows6: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  data2:any;
  data3:any;
  data4:any;
  parameters:any;
  message;
  title;
  columns:any;
  columns2:any;
  optionsWithCaption = {};
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  // id_sede = '0001';
  // id_tipo_paciente = '0';
  // like_empresa = '';
  // like_especialidad = '';
  // like_medico = '';
  // like_paciente = '';
  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
  active = 1;
  // public pageLimitOptions = [
  //   {value: 10},
  //   {value: 25},
  //   {value: 50},
  //   {value: 100},
  // ];
  ingresoTotal;
  ingresoFamil;
  ingresoColec;
  ingresoInscr;
  ingresoTotalNumComtratos;
  ingresoFamilNumComtratos;
  ingresoColecNumComtratos;
  ingresoInscrNumComtratos;

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
  pipe_$: { transform: boolean; };
  isTable1 = true;
  isTable2 = true;
  isTable3 = true;
  isTable4 = true;
  isTable5 = true;
  isTable6 = true;
  isGrafico1 = false;
  isGrafico2 = false;
  isGrafico3 = false;
  isGrafico4 = false;
  isGrafico5 = false;
  isGrafico6 = false;
  isLoading = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;
  constructor(private tableApiservice: TableApiService, private exportService: ExportService,
    private _cp: CurrencyPipe
     ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    console.log(this.mes);
console.log(this.anio);
    this.filtroForm = new FormGroup({
      mes: new FormControl(this.mes),
      anio: new FormControl(this.anio),
  });
  // this.pipe_$ = {transform: (_cp.transform, '_', 'USD', true)};
   }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }
  public onAnioChange(anio: any): void {
    this.anio = anio;
    this.periodo_consulta = this.anio + this.mes;
    this.setPage({ offset: 0 });
  }
  public onMesChange(mes: any): void {
    this.mes = mes;
    this.periodo_consulta = this.anio + this.mes;
    this.setPage({ offset: 0 });
  }
  getBarChart(barChartLabels, barChartData, barChartData2, chartNum, title, title2, typeChart) {
    // var total = 0;
    // barChartData.forEach (function(numero){
    //   total += parseFloat(numero);
    // })

    // console.log(234, barChartData);
    const data = {
      labels: barChartLabels,
      datasets: [
        {
          label: title,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: barChartData,
          backgroundColor: '#2266d3'
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        },
        {
          label: title2,
          // borderColor: 'rgba(99, 255, 132, 1)',
          borderWidth: 1,
          data: barChartData2,
          backgroundColor: '#ffa408'
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
              if (parseInt(value) >= 1000) {
                return 'S/.' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else { return 'S/.' + value; }
            }
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
            // console.log(111,context.datasetIndex,sum );
            return ((value * 100) / sum).toFixed(2) + '%';
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
    return new Chart(context, {
      data,
      options,
      type: chartType,
      plugins: [ChartDataLabels]
    });
  }
  getRowClass(row) {
    
    // if (row.item.includes('COLECTIVA')){
    //   return {'totals': row.item.includes('TOTAL') || row.item.includes('COLECTIVA') }
    // }
    return {
      'totals': row.item.includes('TOTAL'), 'sub-totals': row.item === 'CUOTAS COLECTIVA' || row.item === 'CUOTAS FAMILIAR EXTERNO' || row.item ==='CUOTAS FAMILIAR INTERNO'
    };
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-female': value === 'female'
    };
  }
formatPipe(rows) {
    console.log(rows);
    // const editRowslPipe = ((rows) =>{
      rows.map(item => {
        // console.log(item);
        // if (item.per1) {
          // console.log(item.per1);
          item.per1 = this._cp.transform(item.per1,'S/.     ','symbol','1.2-2');
          item.per2 = this._cp.transform(item.per2,'S/.     ','symbol','1.2-2');
          item.per3 = this._cp.transform(item.per3,'S/.     ','symbol','1.2-2');
          item.per4 = this._cp.transform(item.per4,'S/.     ','symbol','1.2-2');
          return item.per1, item.per2, item.per3, item.per4;
        // } else {
        //   return item;
        // }
      });
    // console.log(rows);
  // });
}
formatPipe2(rows) {
  console.log(rows);
  // const editRowslPipe = ((rows) =>{
    rows.map(item => {
      // console.log(item);
      // if (item.per1) {
        // console.log(item.per1);
        item.PER1 = this._cp.transform(item.PER1,'S/.     ','symbol','1.2-2');
        item.PER2 = this._cp.transform(item.PER2,'S/.     ','symbol','1.2-2');
        item.PER3 = this._cp.transform(item.PER3,'S/.     ','symbol','1.2-2');
        item.PER4 = this._cp.transform(item.PER4,'S/.     ','symbol','1.2-2');

        item.PER5 = this._cp.transform(item.PER5,'S/.     ','symbol','1.2-2');
        item.PER6 = this._cp.transform(item.PER6,'S/.     ','symbol','1.2-2');
        item.PER7 = this._cp.transform(item.PER7,'S/.     ','symbol','1.2-2');
        item.PER8 = this._cp.transform(item.PER8,'S/.     ','symbol','1.2-2');

        item.PER9 = this._cp.transform(item.PER9,'S/.     ','symbol','1.2-2');
        item.PER10 = this._cp.transform(item.PER10,'S/.     ','symbol','1.2-2');
        item.PER11 = this._cp.transform(item.PER11,'S/.     ','symbol','1.2-2');
        item.PER12 = this._cp.transform(item.PER12,'S/.     ','symbol','1.2-2');
        item.PER13 = this._cp.transform(item.PER13,'S/.     ','symbol','1.2-2');

        return item.PER1, item.PER2, item.PER3, item.PER4, item.PER5, item.PER6, item.PER7, item.PER8, item.PER9, item.PER10, item.PER11, item.PER12, item.PER13;
      // } else {
      //   return item;
      // }
    });
  // console.log(rows);
// });
}
  setPage(pageInfo) {
    console.log(pageInfo);
    // this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      mes: this.mes,
      anio: this.anio,
      periodo_consulta:this.periodo_consulta
      // id_sede: this.id_sede,
      // id_tipo_paciente: this.id_tipo_paciente,
      // like_empresa: this.like_empresa,
      // like_especialidad: this.like_especialidad,
      // like_medico: this.like_medico,
      // like_paciente: this.like_paciente,
      // pageNumber: this.page.pageNumber,
      // size: this.page.size
    };
console.log(this.parameters);

    // this.loading();
    this.tableApiservice.getPagoCuotasMesProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        this.barChartLabels = [];
        this.barChartData = [];
        this.barChartData2 = [];
        if(response.data.success){
          // this.message = response.message;
          // this.title = response.data.title;
          this.data = response.data ? response.data : [];
          this.columns = this.data.cabeceras;
          this.columns.map(item => {
            if (item.prop !== 'item') {
              this.barChartLabels.push(item.name);
            } 
          });
          this.rows = this.data.query_sin_igv;
          this.rows.map(item => {
            if (item.item == 'TOTAL CUOTAS') {
              console.log(332, item);
              this.barChartData.push(item.per1.toFixed(2));
              this.barChartData.push(item.per2.toFixed(2));
              this.barChartData.push(item.per3.toFixed(2));
              this.barChartData.push(item.per4.toFixed(2));
              console.log(443,this.barChartData);
              // this.totales = item.per1 + item.per2 + item.per3 + item.per1
            }else if (item.item == 'TOTAL RECAUDADO') {
              console.log(333, item);
              this.barChartData2.push(item.per1.toFixed(2));
              this.barChartData2.push(item.per2.toFixed(2));
              this.barChartData2.push(item.per3.toFixed(2));
              this.barChartData2.push(item.per4.toFixed(2));
              console.log(444, this.barChartData2);

              // this.totales = item.per1 + item.per2 + item.per3 + item.per1
            } 
          });
          // this.rows2.map(item => {
          //   if (item.item == 'TOTAL RECAUDADO') {
          //     console.log(333, item);
          //     this.barChartData2.push(item.per1.toFixed(2));
          //     this.barChartData2.push(item.per2.toFixed(2));
          //     this.barChartData2.push(item.per3.toFixed(2));
          //     this.barChartData2.push(item.per4.toFixed(2));
          //     // this.totales = item.per1 + item.per2 + item.per3 + item.per1
          //   } 
          // });
          this.rows2 = this.data.query_con_igv;
          // this.rows2.map(item => {
          //   if (item.item == 'TOTAL RECAUDADO') {
          //     console.log(333, item);
          //     this.barChartData2.push(item.per1.toFixed(2));
          //     this.barChartData2.push(item.per2.toFixed(2));
          //     this.barChartData2.push(item.per3.toFixed(2));
          //     this.barChartData2.push(item.per4.toFixed(2));
          //     // this.totales = item.per1 + item.per2 + item.per3 + item.per1
          //   } 
          // });
          this.ingresoTotal=  this.data.ingreso_total;
          this.ingresoFamil=  this.data.ingreso_famil;
          this.ingresoColec=  this.data.ingreso_colec;
          this.ingresoInscr=  this.data.ingreso_inscr;
          this.formatPipe(this.rows);
          this.formatPipe(this.rows2);
          // this.barChartLabels = ['Lima', 'chorrillos', 'Surco']
          // this.barChartData = [65, 59, 80];
          // this.barChartLabels = this.columns;
          // this.barChartData = [ 80, 60, 76, 666];
            // Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    // this.loading();
    this.tableApiservice.getPagoCuotasContratosMesProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message3 = response.message;
          // this.title3 = response.data.title;
          this.data2 = response.data ? response.data : [];
          // this.columns = this.data.cabeceras;
          this.rows3 = this.data2.data;
          this.rows3.map(item => {
            if (item.item === 'TOTAL CUOTAS'){
              this.ingresoTotalNumComtratos = item.per1;
            }else if (item.item === 'CUOTAS FAMILIAR EXTERNO'){
              this.ingresoFamilNumComtratos = item.per1;
            }else if (item.item === 'CUOTAS FAMILIAR INTERNO' ){
              this.ingresoFamilNumComtratos = parseInt(this.ingresoFamilNumComtratos) + parseInt(item.per1);
            }else if (item.item === 'CUOTAS COLECTIVA'){
              
              this.ingresoColecNumComtratos = item.per1;
            }else if (item.item === 'INSCRIPCIONES'){
              this.ingresoInscrNumComtratos = item.per1;
            }
          });
          
          
          
          
            // Swal.close();
        }else{
          Swal.close();
        }
      },
      (error) => {
          Swal.close();
      }
    );
    // this.loading();
    this.tableApiservice.getPagoCuotasProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message = response.message;
          // this.title = response.data.title;
          this.data3 = response.data ? response.data : [];
          this.columns2 = this.data3.cabeceras;
          this.rows4 = this.data3.query_sin_igv;
          this.rows5 = this.data3.query_con_igv;
          this.formatPipe2(this.rows4);
          this.formatPipe2(this.rows5);
          
            // Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    this.loading();
    this.tableApiservice.getPagoCuotasContratosProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message3 = response.message;
          // this.title3 = response.data.title;
          this.data4 = response.data ? response.data : [];
          // this.columns2 = this.data.cabeceras;
          this.rows6 = this.data4.data;
          
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
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 2){
      this.exportService.exportToClipboard(this.rows2, this.columns);
    }else if (numberTabla === 3){
      this.exportService.exportToClipboard(this.rows3, this.columns);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 1){
      this.exportService.exportTableElmToExcel(this.rows, 'INGRESOS POR CUOTAS-INGRESO SIN IGV');
    }else if (numberTabla === 2){
      this.exportService.exportTableElmToExcel(this.rows2, 'INGRESOS POR CUOTAS-INGRESO SIN IGV');
    }else if (numberTabla === 3){
      this.exportService.exportTableElmToExcel(this.rows3, 'INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
    }
  }


  // exportToCsv(): void {
  //   this.exportService.exportToCsv(this.rows, 'Atenciones-Realizadas-por-Emergencia', this.columns);
  // }
  filter() {
  
        const form = this.filtroForm.value;
          this.mes = moment(form.mes).format('YYYY-MM-DD'),
          this.anio = moment(form.anio).format('YYYY-MM-DD'),
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
showTableDasboard(id: number, position: number) {
    
    if (id == 1) {
      if (position == 1) {
        this.isTable1 = true;
        this.isGrafico1 = false;
      } else {
        this.isGrafico1 = true;
        this.isTable1 = false;
      }
    } else if (id == 2) {
      if (position == 1) {
        this.isTable2 = true;
      } else {
        this.isTable2 = false;
      }
    } else if (id == 3) {
      if (position == 1) {
        this.isTable3 = true;
      } else {
        this.isTable3 = false;
      }
    } else if (id == 4) {
      if (position == 1) {
        this.isTable4 = true;
      } else {
        this.isTable4 = false;
      }
    } else if (id == 5) {
      if (position == 1) {
        this.isTable5 = true;
      } else {
        this.isTable5 = false;
      }
    } else if (id == 6) {
      if (position == 1) {
        this.isTable6 = true;
      } else {
        this.isTable6 = false;
      }
    }
  }
}


