import { Component,ElementRef, ViewChild, TemplateRef, AfterViewInit, Input, OnInit } from '@angular/core';
import { ColumnMode, NgxDatatableModule, SelectionType, DatatableComponent  } from '@swimlane/ngx-datatable';
import { ExportService } from '../../../../../../_services/export.service';
import * as Chart from 'chart.js';
import {  ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartService } from '../../../../barchar/chart.service';
import { Page } from '../../../../../../models/forms-data/page';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content-listado',
  templateUrl: './content-listado.component.html',
  styleUrls: ['./content-listado.component.sass']
})
export class ContentListadoComponent implements OnInit {
  isTable0 = true;
  isTable1 = true;
  isTable2 = true;
  isTable3 = true;
  isTable4 = true;
  isGrafico0 = false;
  isGrafico1 = false;
  isGrafico2 = false;
  isGrafico3 = false;
  isGrafico4 = false;
  isLoading0 = false;
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;
  activeTabId: number;
  @Input() temp;
  @Input() columns0;
  @Input() rows1;
  @Input() columns1;
  @Input() rows2;
  @Input() columns2;
  @Input() rows3;
  @Input() columns3;
  @Input() rows4;
  @Input() columns4;
  @Input() rows5;
  @Input() columns5;
  @Input() option;
  labels: string[] = [];
  dataChart1: number[] = [];
  dataChart2: number[] = [];
  dataChart3: number[] = [];

  dataChart4: number[] = [];
  dataChart5: number[] = [];
  dataChart6: number[] = [];

  dataChart7: number[] = [];
  dataChart8: number[] = [];
  dataChart9: number[] = [];
  dataChart10: number[] = [];

  dataChart11: number[] = [];
  dataChart12: number[] = [];

  dataChart13: number[] = [];
  dataChart14: number[] = [];
  dataChart15: number[] = [];
  dataChart16: number[] = [];
  dataChart17: number[] = [];
  dataChart18: number[] = [];
  dataChart19: number[] = [];
  ColumnMode = ColumnMode;
  tabs = [
    {
      id: 1,
      label: 'RESUMEN',
      template: null,
    },
  ];
  data: Chart.ChartData;


  options;

  // options;
  context0;
  context1;
  context2;
  context3;
  context4;
  // Templates definidos como @ViewChild
  @ViewChild('cantidadesTemplate', { static: false }) cantidadesTemplate: TemplateRef<any>;
  @ViewChild('indicadoresTemplate', { static: false }) indicadoresTemplate: TemplateRef<any>;
  enableSummary = true;
  summaryPosition = 'bottom';
  // private baseChart: ElementRef;
  periodoSeleccionado: any;
  subRows1: any;
  grafico1: Chart;
  grafico2: Chart;
  grafico3: Chart;

  page = new Page()
  // temp = [];
  filtered = [];
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  // @ViewChild("baseChart", { static: false }) set content(
  //   content: ElementRef
  // ) {
  //   if (content) {
  //     // initially setter gets called with undefined
  //     this.baseChart = content;
  //     // this.grafico1 = this.getBarChart1(this.labels, this.dataChart1, this.dataChart2, this.dataChart3,'', '','chart-1', 'Atenciones', 'Emitidas', 'Compradas','line');
  //     // this.getBarChart1(this.labels, this.dataChart1, this.dataChart2, this.dataChart3,'', '','chart-1', 'Atenciones', 'Emitidas', 'Compradas','line');
  //     // this.grafico3 = this.getBarChart1(this.barChartLabels3, this.barChartData7, this.barChartData8, this.barChartData9, '', '','chart-3', 'Lima', 'Chorrillos', 'Surco','line');
  // } }
  constructor(private exportService: ExportService, private chartService: ChartService) {
    this.activeTabId = this.tabs[0].id; 
    this.page.pageNumber = 0;
    this.page.size = 10;
  }
  ngOnInit() {
     
  }
  ngAfterViewInit() {
   
   
    setTimeout(() => {
      this.tabs[0].template = this.cantidadesTemplate;
    });
    console.log(91, this.rows1)
    
     this.temp = this.rows1;
  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
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
  isActiveTab(tabId: number): boolean {
    return this.activeTabId === tabId;
  }
  getRowClass(row) {
    return {
      'sub-totals': row.concepto === 'Total' || row.concepto === 'Nuevos' || row.concepto === 'Cesados' || row.concepto === 'Ingresos' || row.concepto === 'Descuentos' || row.concepto === 'Total a Pagar' || row.concepto === 'Prestación Alimentaria' || row.concepto === 'Por Maternidad' || row.concepto === 'Por Descanso Medico Prolongado' || row.concepto === 'Total Subsidiado' || row.concepto === 'Nro. de dias Por Maternidad' || row.concepto === 'Nro. de dias Por Descanso Medico Prolongado' || row.concepto === 'Nro. Total de dias subsidiados' || row.concepto === 'Dscto. por Permisos' || row.concepto === 'Dscto. por Tardanzas' || row.concepto === 'Tiempo total de tardanzas descontadas' || row.concepto === 'Administrativo' || row.concepto === 'Clínica' || row.concepto === 'Farmacia' || row.concepto === 'Hospitalización' || row.concepto === 'Total Dscto.Por Prestación' || row.concepto === 'Total Dscto.Por Prestación' || row.concepto === 'Pago por Reintegros' || row.concepto === 'Pago por Dias Feriados' || row.concepto === 'Pago por Guardia Nocturna' || row.concepto === 'Tiempo total de Feriados Pagados' || row.concepto === 'Tiempo total de Guardia Nocturna Pagadas'};
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
  copyTableToClipboard(numberTabla){
  if(numberTabla === 1){
    if (this.option === 'interconsultas'){
      this.rows1.map(item=>{
        item.TIEMPO_ESPERA = typeof item.TIEMPO_ESPERA === 'number' ? item.TIEMPO_ESPERA : Number(item.TIEMPO_ESPERA);
      });
    }
    this.exportService.exportToClipboard(this.rows1, this.columns1);
  }
  
}


exportToExcel(numberTabla): void {
  if(numberTabla === 1){
    if (this.option === 'interconsultas'){
      this.rows1.map(item=>{
        item.TIEMPO_ESPERA = typeof item.TIEMPO_ESPERA === 'number' ? item.TIEMPO_ESPERA : Number(item.TIEMPO_ESPERA);
      });
    }
    
    this.exportService.exportTableElmToExcel(this.rows1, '');
  }
  

}

}
