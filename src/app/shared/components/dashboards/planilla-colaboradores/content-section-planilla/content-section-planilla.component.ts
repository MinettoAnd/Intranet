
import { Component,ElementRef, ViewChild, TemplateRef, AfterViewInit, Input, OnInit, SimpleChanges } from '@angular/core';
import { ColumnMode, NgxDatatableModule, SelectionType, DatatableComponent  } from '@swimlane/ngx-datatable';
import { ExportService } from '../../../../../_services/export.service';
import * as Chart from 'chart.js';
import {  ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartService } from '../../../barchar/chart.service';

@Component({
  selector: 'app-content-section-planilla',
  templateUrl: './content-section-planilla.component.html',
  styleUrls: ['./content-section-planilla.component.scss']
})
export class ContentSectionPlanillaComponent implements OnInit {
  isTable0 = true;
  isTable1 = true;
  isTable2 = true;
  isTable3 = true;
  isTable4 = true;
  isTable5 = true;
  isTable6 = true;
  isTable7 = true;
  isTable8 = true;
  isGrafico0 = false;
  isGrafico1 = false;
  isGrafico2 = false;
  isGrafico3 = false;
  isGrafico4 = false;
  isGrafico5 = false;
  isGrafico6 = false;
  isGrafico7 = false;
  isLoading0 = false;
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;
  activeTabId: number;
  @Input() rows0;
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
  @Input() rows6;
  @Input() columns6;
  @Input() rows7;
  @Input() columns7
  @Input() rows8;
  @Input() columns8;
  @Input() rows9;
  @Input() columns9;
  @Input() rows10;
  @Input() columns10;
  @Input() rows11;
  @Input() columns11;
  @Input() rows12;
  @Input() columns12;
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
  dataChart20: number[] = [];
  dataChart21: number[] = [];
  dataChart22: number[] = [];
  dataChart23: number[] = [];
  dataChart24: number[] = [];
  dataChart25: number[] = [];
  ColumnMode = ColumnMode;
  tabs = [
    {
      id: 1,
      label: 'Planilla',
      template: null,
    },
    {
      id: 2,
      label: 'Planilla Neta',
      template: null,
    },
    {
      id: 3,
      label: 'Indicadores',
      template: null,
    },
  ];
  data: Chart.ChartData;

  checkBoxesOps1: any[] = [
    {
      id: '1a',
      label: 'En Montos',
      template: null,
      value: true
    },
    {
      id: '2a',
      label: 'En Cantidad de Días',
      template: null,
      value: false
    },
    {
      id: '3a',
      label: 'En Número de Personas',
      template: null,
      value: false
    },
  ];
  checkBoxesOps2: any[] = [
    {
      id: '1b',
      label: 'En Montos',
      template: null,
      value: true
    },
    {
      id: '2b',
      label: 'En Cantidad de Horas',
      template: null,
      value: false
    },
    {
      id: '3b',
      label: 'En Número de Personas',
      template: null,
      value: false
    },
  ];
  checkBoxesOps3: any[] = [
    {
      id: '1c',
      label: 'En Montos',
      template: null,
      value: true
    },
    {
      id: '2c',
      label: 'En Número de Personas',
      template: null,
      value: false
    },
    {
      id: '3c',
      label: 'En Promedio por Personas',
      template: null,
      value: false
    },
  ];
  checkBoxesOps4: any[] = [
    {
      id: '1d',
      label: 'En Montos',
      template: null,
      value: true
    },
    {
      id: '2d',
      label: 'En Cantidad de Horas',
      template: null,
      value: false
    },
    {
      id: '3d',
      label: 'En Número de Personas',
      template: null,
      value: false
    },
  ];

  options;

  // options;
  context0;
  context1;
  context2;
  context3;
  context4;
  context5;
  context6;
  context7;
  rows3filtered: any[];
  rows4filtered: any[];
  rows5filtered: any[];
  rows6filtered: any[];
  // Templates definidos como @ViewChild
  @ViewChild('planillaTemplate', { static: false }) planillaTemplate: TemplateRef<any>;
  @ViewChild('planillaNetaTemplate', { static: false }) planillaNetaTemplate: TemplateRef<any>;
  @ViewChild('indicadoresTemplate', { static: false }) indicadoresTemplate: TemplateRef<any>;
  enableSummary = true;
  summaryPosition = 'bottom';
  // private baseChart: ElementRef;
  periodoSeleccionado: any;
  subRows1: any;
  grafico1: Chart;
  grafico2: Chart;
  grafico3: Chart;
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
    this.activeTabId = this.tabs[0].id; this.rows3;
  }
  ngOnInit() {
    // setTimeout(() => {
    //   // Acceder a los datos y realizar las operaciones necesarias
    //   if (this.rows3) {
    //     this.rows3filtered = this.rows3.filter(item => item.GRUPO3 === 'SOLES');
    //   }
    // }, 1500); 
    // this.rows3filtered();
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows3) {
      console.log(91, this.rows4)
      this.rows3filtered = this.rows3?.filter(item => item.GRUPO3 === 'SOLES');
      this.rows4filtered = this.rows4?.filter(item => item.GRUPO3 === 'SOLES');
      this.rows5filtered = this.rows5?.filter(item => item.GRUPO3 === 'SOLES');
      this.rows6filtered = this.rows6?.filter(item => item.GRUPO3 === 'SOLES');
    }
  }
  ngAfterViewInit() {
   
   
    setTimeout(() => {
      this.tabs[0].template = this.planillaTemplate;
      this.tabs[1].template = this.planillaNetaTemplate;
      this.tabs[2].template = this.indicadoresTemplate;
      // if (this.rows3) {
      //   this.filtrarRows3();
      // }
    });
    // this.rows3filtered = this.rows3.filter(item => item.GRUPO3 === 'SOLES');
  }

  selection(option, id: string, tabla) {
    console.log('=>',this.rows6)
    if (tabla === 1){
      this.checkBoxesOps1.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1a'){
            this.rows3filtered = this.rows3.filter(item => item.GRUPO3 === 'SOLES');
          }else if(id === '2a'){
            console.log(255, id)
            this.rows3filtered = this.rows3.filter(item => item.GRUPO3 === 'DIAS');
          }else if(id === '3a'){
            this.rows3filtered = this.rows3.filter(item => item.GRUPO3 === 'PERSONAS');
          }
        }else{
          x.value = false;
        }
      });
    }else if (tabla === 2){
      
      this.checkBoxesOps2.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1b'){
            this.rows4filtered = this.rows4.filter(item => item.GRUPO3 === 'SOLES');
          }else if(id === '2b'){
            console.log(255, id)
            this.rows4filtered = this.rows4.filter(item => item.GRUPO3 === 'HORAS');
          }else if(id === '3b'){
            this.rows4filtered = this.rows4.filter(item => item.GRUPO3 === 'PERSONAS');
          }
        }else{
          x.value = false;
        }
      });
    }else if (tabla === 3){
      this.checkBoxesOps3.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1c'){
            this.rows5filtered = this.rows5.filter(item => item.GRUPO3 === 'SOLES');
          }else if(id === '2c'){
            console.log(255, id)
            this.rows5filtered = this.rows5.filter(item => item.GRUPO3 === 'PERSONAS');
          }else if(id === '3c'){
            this.rows5filtered = this.rows5.filter(item => item.GRUPO3 === 'PROMEDIO');
          }
        }else{
          x.value = false;
        }
      });
    }else if (tabla === 4){
      
      this.checkBoxesOps4.forEach(x => {
        if (x.id === id) {
          x.value = true;
          if(id === '1d'){
            this.rows6filtered = this.rows6.filter(item => item.GRUPO3 === 'SOLES');
          }else if(id === '2d'){
            console.log(255, id)
            this.rows6filtered = this.rows6.filter(item => item.GRUPO3 === 'HORAS');
          }else if(id === '3d'){
            this.rows6filtered = this.rows6.filter(item => item.GRUPO3 === 'PERSONAS');
          }
        }else{
          x.value = false;
        }
      });
    }
  }
  isActiveTab(tabId: number): boolean {
    return this.activeTabId === tabId;
  }
  getRowClass(row) {
    return {
      'sub-totals': 
      row.concepto === 'Planilla Neta' 
      || row.concepto === 'Por Maternidad' || row.concepto === 'Por Descanso Medico Prolongado' || row.concepto === 'Total Subsidiado' 
      || row.concepto === 'Nro. de dias Por Maternidad' || row.concepto === 'Nro. de dias Por Descanso Medico Prolongado' || row.concepto === 'Nro. Total de dias subsidiados' 
      || row.concepto === 'Personas Por Maternidad' || row.concepto === 'Personas Por Descanso Medico Prolongado' || row.concepto === 'Personas Total Subsidiado'

      || row.concepto === 'Dscto. por Club de la Salud' || row.concepto === 'Dscto. por Permisos' || row.concepto === 'Dscto. por Tardanzas' 
      || row.concepto === 'Tiempo total de tardanzas descontadas' || row.concepto === 'Tiempo total de permisos descontados' 
      || row.concepto === 'Personas Dscto. por Club de la Salud' || row.concepto === 'Personas Dscto. por Permisos' || row.concepto === 'Personas Dscto. por Tardanzas' 

      || row.concepto === 'Administrativo' || row.concepto === 'Clínica' || row.concepto === 'Farmacia' || row.concepto === 'Hospitalización' || row.concepto === 'Total Dscto.Por Prestación' 
      || row.concepto === 'Personas Administrativo' || row.concepto === 'Personas Clínica' || row.concepto === 'Personas Farmacia' || row.concepto === 'Personas Hospitalización' || row.concepto === 'Personas Total Dscto.Por Prestación'
      || row.concepto === 'Promedio Administrativo' || row.concepto === 'Promedio Clínica' || row.concepto === 'Promedio Farmacia' || row.concepto === 'Promedio Hospitalización' || row.concepto === 'Promedio Total Dscto.Por Prestación'

      || row.concepto === 'Pago por Reintegros' || row.concepto === 'Pago por Dias Feriados' || row.concepto === 'Pago por Guardia Nocturna' || row.concepto === 'Hospitalización'  
      || row.concepto === 'Tiempo total de Feriados Pagados' || row.concepto === 'Tiempo total de Guardia Nocturna Pagadas' 
      || row.concepto === 'Personas Pago por Reintegros' || row.concepto === 'Personas Pago por Dias Feriados' || row.concepto === 'Personas Pago por Guardia Nocturna' 
    };
  }
  copyTableToClipboard(numberTabla){
    if(numberTabla === 3){
      for (let i = 0; i < this.rows3filtered.length; i++) {
        for (let j = 1; j <= 13; j++) {
          const mes = 'Mes' + j;
          const valor = this.rows3filtered[i][mes];
          
          if (typeof valor !== 'number') {
            this.rows3filtered[i][mes] = Number(valor);
          }
        }
      }
      this.exportService.exportToClipboard(this.rows3filtered, this.columns3);
    }
    else if (numberTabla === 4){
      for (let i = 0; i < this.rows3filtered.length; i++) {
        for (let j = 1; j <= 13; j++) {
          const mes = 'Mes' + j;
          const valor = this.rows3filtered[i][mes];
          
          if (typeof valor !== 'number') {
            this.rows3filtered[i][mes] = Number(valor);
          }
        }
      }
      this.exportService.exportToClipboard(this.rows4filtered, this.columns4);
    }
    else if (numberTabla === 5){
      for (let i = 0; i < this.rows3filtered.length; i++) {
        for (let j = 1; j <= 13; j++) {
          const mes = 'Mes' + j;
          const valor = this.rows3filtered[i][mes];
          
          if (typeof valor !== 'number') {
            this.rows3filtered[i][mes] = Number(valor);
          }
        }
      }
      this.exportService.exportToClipboard(this.rows5filtered, this.columns5);
    }
    else if (numberTabla === 6){
      for (let i = 0; i < this.rows3filtered.length; i++) {
        for (let j = 1; j <= 13; j++) {
          const mes = 'Mes' + j;
          const valor = this.rows3filtered[i][mes];
          
          if (typeof valor !== 'number') {
            this.rows3filtered[i][mes] = Number(valor);
          }
        }
      }
      this.exportService.exportToClipboard(this.rows6filtered, this.columns6);
    }
}


exportToExcel(numberTabla): void {
  if(numberTabla === 3){
    for (let i = 0; i < this.rows3filtered.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const mes = 'Mes' + j;
        const valor = this.rows3filtered[i][mes];
        
        if (typeof valor !== 'number') {
          this.rows3filtered[i][mes] = Number(valor);
        }
      }
    }
    this.exportService.exportTableElmToExcel(this.rows3filtered, '');
  }
  else if (numberTabla === 4){
    for (let i = 0; i < this.rows3filtered.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const mes = 'Mes' + j;
        const valor = this.rows3filtered[i][mes];
        
        if (typeof valor !== 'number') {
          this.rows3filtered[i][mes] = Number(valor);
        }
      }
    }
    this.exportService.exportTableElmToExcel(this.rows4filtered, '');
  }
  else if (numberTabla === 5){
    for (let i = 0; i < this.rows3filtered.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const mes = 'Mes' + j;
        const valor = this.rows3filtered[i][mes];
        
        if (typeof valor !== 'number') {
          this.rows3filtered[i][mes] = Number(valor);
        }
      }
    }
    this.exportService.exportTableElmToExcel(this.rows5filtered, '');
  }
  else if (numberTabla === 6){
    for (let i = 0; i < this.rows3filtered.length; i++) {
      for (let j = 1; j <= 13; j++) {
        const mes = 'Mes' + j;
        const valor = this.rows3filtered[i][mes];
        
        if (typeof valor !== 'number') {
          this.rows3filtered[i][mes] = Number(valor);
        }
      }
    }
    this.exportService.exportTableElmToExcel(this.rows6filtered, '');
  }

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
        return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : 'S/ ' + count.toLocaleString();
      }
}
summaryNull(cells: any): string {
  console.log(883, cells)
  if (cells[0] !== 'TODAS' && cells[0] !== 'LIMA' && cells[0] !== 'CHORRILLOS' && cells[0] !== 'SURCO'){
    console.log(739, cells.cell)
      return 'TOTAL';
  }
  
}
summaryNull1(cells: any): string {
  if (cells[0] !== 0){
    return 'TOTAL';
  }
      
}
showTableDasboard(id: number, position: number) {
    
  if (id == 1) {
    if (position == 0) {
      this.isTable1 = true;
      this.isGrafico1 = false;
    } else {
      this.labels = [];
      this.dataChart1 = [];
      this.dataChart2 = [];
      this.dataChart3 = []; 
      if(this.columns1){
        this.columns1.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' ){
            this.labels.push(item.name);
          }
        });
      }
      console.log(this.rows1)
      if(this.rows1){
        this.rows1.map(item =>{
          if(item.concepto.trim() === 'Planilla Bruta'){
            this.dataChart1.push(item.Mes1);
            this.dataChart1.push(item.Mes2);
            this.dataChart1.push(item.Mes3);
            this.dataChart1.push(item.Mes4);
            this.dataChart1.push(item.Mes5);
            this.dataChart1.push(item.Mes6);
            this.dataChart1.push(item.Mes7);
            this.dataChart1.push(item.Mes8);
            this.dataChart1.push(item.Mes9);
            this.dataChart1.push(item.Mes10);
            this.dataChart1.push(item.Mes11);
            this.dataChart1.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Descuentos'){
            this.dataChart2.push(item.Mes1);
            this.dataChart2.push(item.Mes2);
            this.dataChart2.push(item.Mes3);
            this.dataChart2.push(item.Mes4);
            this.dataChart2.push(item.Mes5);
            this.dataChart2.push(item.Mes6);
            this.dataChart2.push(item.Mes7);
            this.dataChart2.push(item.Mes8);
            this.dataChart2.push(item.Mes9);
            this.dataChart2.push(item.Mes10);
            this.dataChart2.push(item.Mes11);
            this.dataChart2.push(item.Mes12);
          }
        })
      }   
    this.context1 = 'chart-1';                                    
    this.data = this.chartService.getChartData2(this.labels, this.dataChart1, this.dataChart2,'Planilla Bruta', 'Descuentos','line')
    this.options = this.chartService.getChartOptions('', '',)
    // this.getBarChart1(this.labels, this.dataChart1, this.dataChart2, this.dataChart3,'', '','chart-1', 'Lima', 'Chorrillos', 'Surco','line');

      this.isGrafico1 = true;
      this.isTable1 = false;
    }
  } else if (id == 2) {
    if (position == 0) {
      this.isTable2 = true;
      this.isGrafico2 = false;
    } else {
      this.labels = [];
      this.dataChart4 = [];
      this.dataChart5 = [];
      this.dataChart6 = []; 
      if(this.columns2){
        this.columns2.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' && item.prop !== 'mesActual'){
            this.labels.push(item.name);
          }
        });
      }
      console.log(this.rows1)
      if(this.rows2){
        this.rows2.map(item =>{
          if(item.concepto.trim() === 'LIMA'){
            this.dataChart4.push(item.Mes1);
            this.dataChart4.push(item.Mes2);
            this.dataChart4.push(item.Mes3);
            this.dataChart4.push(item.Mes4);
            this.dataChart4.push(item.Mes5);
            this.dataChart4.push(item.Mes6);
            this.dataChart4.push(item.Mes7);
            this.dataChart4.push(item.Mes8);
            this.dataChart4.push(item.Mes9);
            this.dataChart4.push(item.Mes10);
            this.dataChart4.push(item.Mes11);
            this.dataChart4.push(item.Mes12);
          }else  if(item.concepto.trim() === 'CHORRILLOS'){
            this.dataChart5.push(item.Mes1);
            this.dataChart5.push(item.Mes2);
            this.dataChart5.push(item.Mes3);
            this.dataChart5.push(item.Mes4);
            this.dataChart5.push(item.Mes5);
            this.dataChart5.push(item.Mes6);
            this.dataChart5.push(item.Mes7);
            this.dataChart5.push(item.Mes8);
            this.dataChart5.push(item.Mes9);
            this.dataChart5.push(item.Mes10);
            this.dataChart5.push(item.Mes11);
            this.dataChart5.push(item.Mes12);
          }else  if(item.concepto.trim() === 'SURCO'){
            this.dataChart6.push(item.Mes1);
            this.dataChart6.push(item.Mes2);
            this.dataChart6.push(item.Mes3);
            this.dataChart6.push(item.Mes4);
            this.dataChart6.push(item.Mes5);
            this.dataChart6.push(item.Mes6);
            this.dataChart6.push(item.Mes7);
            this.dataChart6.push(item.Mes8);
            this.dataChart6.push(item.Mes9);
            this.dataChart6.push(item.Mes10);
            this.dataChart6.push(item.Mes11);
            this.dataChart6.push(item.Mes12);
          }
        })
      }
      this.context2 = 'chart-2'; 
      this.data = this.chartService.getChartData3(this.labels, this.dataChart4, this.dataChart5, this.dataChart6,'LIMA', 'CHORRILLOS','SURCO','line')
      this.options = this.chartService.getChartOptions('', '',)
      // this.getBarChart1(this.labels, this.dataChart4, this.dataChart5, this.dataChart6,'', '','chart-1', 'CESADO', 'CONTINUADOR', 'NUEVO','line');

      this.isGrafico2 = true;
      this.isTable2 = false;
    }
  } else if (id == 3) {
    if (position == 0) {
      this.isTable3 = true;
      this.isGrafico3 = false;
    } else {
      this.labels = [];
      this.dataChart7 = [];
      this.dataChart8 = [];
      this.dataChart9 = []; 
      if(this.columns7){
        this.columns7.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' ){
            this.labels.push(item.name);
          }
        });
      }
      console.log(this.rows7)
      if(this.rows7){
        this.rows7.map(item =>{
          if(item.concepto.trim() === 'LIMA'){
            this.dataChart7.push(item.Mes1);
            this.dataChart7.push(item.Mes2);
            this.dataChart7.push(item.Mes3);
            this.dataChart7.push(item.Mes4);
            this.dataChart7.push(item.Mes5);
            this.dataChart7.push(item.Mes6);
            this.dataChart7.push(item.Mes7);
            this.dataChart7.push(item.Mes8);
            this.dataChart7.push(item.Mes9);
            this.dataChart7.push(item.Mes10);
            this.dataChart7.push(item.Mes11);
            this.dataChart7.push(item.Mes12);
          }else  if(item.concepto.trim() === 'CHORRILLOS'){
            this.dataChart8.push(item.Mes1);
            this.dataChart8.push(item.Mes2);
            this.dataChart8.push(item.Mes3);
            this.dataChart8.push(item.Mes4);
            this.dataChart8.push(item.Mes5);
            this.dataChart8.push(item.Mes6);
            this.dataChart8.push(item.Mes7);
            this.dataChart8.push(item.Mes8);
            this.dataChart8.push(item.Mes9);
            this.dataChart8.push(item.Mes10);
            this.dataChart8.push(item.Mes11);
            this.dataChart8.push(item.Mes12);
          }else  if(item.concepto.trim() === 'SURCO'){
            this.dataChart9.push(item.Mes1);
            this.dataChart9.push(item.Mes2);
            this.dataChart9.push(item.Mes3);
            this.dataChart9.push(item.Mes4);
            this.dataChart9.push(item.Mes5);
            this.dataChart9.push(item.Mes6);
            this.dataChart9.push(item.Mes7);
            this.dataChart9.push(item.Mes8);
            this.dataChart9.push(item.Mes9);
            this.dataChart9.push(item.Mes10);
            this.dataChart9.push(item.Mes11);
            this.dataChart9.push(item.Mes12);
          }
        })
      } 
      this.context3 = 'chart-3';                                    
      this.data = this.chartService.getChartData3(this.labels, this.dataChart7, this.dataChart8, this.dataChart9,'Lima', 'Chorrillos','Surco','line')
      this.options = this.chartService.getChartOptions('', '',)
      this.isGrafico3 = true;
      this.isTable3 = false;
      
    }
  } else if (id == 4) {
    if (position == 0) {
      this.isTable4 = true;
      this.isGrafico4 = false;
    } else {
      this.labels = [];
      this.dataChart10 = [];
      this.dataChart11 = [];
      this.dataChart12 = []; 
      if(this.columns8){
        this.columns8.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' && item.prop !== 'mesActual'){
            this.labels.push(item.name);
          }
        });
      }
      console.log(this.rows8)
      if(this.rows8){
        this.rows8.map(item =>{
          if(item.concepto.trim() === 'CESADO'){
            this.dataChart10.push(item.Mes1);
            this.dataChart10.push(item.Mes2);
            this.dataChart10.push(item.Mes3);
            this.dataChart10.push(item.Mes4);
            this.dataChart10.push(item.Mes5);
            this.dataChart10.push(item.Mes6);
            this.dataChart10.push(item.Mes7);
            this.dataChart10.push(item.Mes8);
            this.dataChart10.push(item.Mes9);
            this.dataChart10.push(item.Mes10);
            this.dataChart10.push(item.Mes11);
            this.dataChart10.push(item.Mes12);
          }else  if(item.concepto.trim() === 'CONTINUADOR'){
            this.dataChart11.push(item.Mes1);
            this.dataChart11.push(item.Mes2);
            this.dataChart11.push(item.Mes3);
            this.dataChart11.push(item.Mes4);
            this.dataChart11.push(item.Mes5);
            this.dataChart11.push(item.Mes6);
            this.dataChart11.push(item.Mes7);
            this.dataChart11.push(item.Mes8);
            this.dataChart11.push(item.Mes9);
            this.dataChart11.push(item.Mes10);
            this.dataChart11.push(item.Mes11);
            this.dataChart11.push(item.Mes12);
          }else  if(item.concepto.trim() === 'NUEVO'){
            this.dataChart12.push(item.Mes1);
            this.dataChart12.push(item.Mes2);
            this.dataChart12.push(item.Mes3);
            this.dataChart12.push(item.Mes4);
            this.dataChart12.push(item.Mes5);
            this.dataChart12.push(item.Mes6);
            this.dataChart12.push(item.Mes7);
            this.dataChart12.push(item.Mes8);
            this.dataChart12.push(item.Mes9);
            this.dataChart12.push(item.Mes10);
            this.dataChart12.push(item.Mes11);
            this.dataChart12.push(item.Mes12);
          }
        })
      }
      this.context4 = 'chart-4'; 
      this.data = this.chartService.getChartData3(this.labels, this.dataChart10, this.dataChart11, this.dataChart12,'CESADO', 'CONTINUADOR','NUEVO','line')
      this.options = this.chartService.getChartOptions('', '',)
      this.isGrafico4 = true;
      this.isTable4 = false;
    }
  } else if (id == 5) {
    if (position == 0) {
      this.isTable5 = true;
      this.isGrafico5 = false;
    } else {
      this.labels = [];
      this.dataChart13 = [];
      this.dataChart14 = [];
      this.dataChart15 = []; 
      this.dataChart16 = [];
      if(this.columns9){
        this.columns9.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' && item.prop !== 'mesActual'){
            this.labels.push(item.name);
          }
        });
      }
      if(this.rows9){
        this.rows9.map(item =>{
          if(item.concepto.trim() === 'EMPLEADOS'){
            this.dataChart13.push(item.Mes1);
            this.dataChart13.push(item.Mes2);
            this.dataChart13.push(item.Mes3);
            this.dataChart13.push(item.Mes4);
            this.dataChart13.push(item.Mes5);
            this.dataChart13.push(item.Mes6);
            this.dataChart13.push(item.Mes7);
            this.dataChart13.push(item.Mes8);
            this.dataChart13.push(item.Mes9);
            this.dataChart13.push(item.Mes10);
            this.dataChart13.push(item.Mes11);
            this.dataChart13.push(item.Mes12);
          }else  if(item.concepto.trim() === 'FUNCIONARIOS'){
            this.dataChart14.push(item.Mes1);
            this.dataChart14.push(item.Mes2);
            this.dataChart14.push(item.Mes3);
            this.dataChart14.push(item.Mes4);
            this.dataChart14.push(item.Mes5);
            this.dataChart14.push(item.Mes6);
            this.dataChart14.push(item.Mes7);
            this.dataChart14.push(item.Mes8);
            this.dataChart14.push(item.Mes9);
            this.dataChart14.push(item.Mes10);
            this.dataChart14.push(item.Mes11);
            this.dataChart14.push(item.Mes12);
          }else  if(item.concepto.trim() === 'OBREROS'){
            this.dataChart15.push(item.Mes1);
            this.dataChart15.push(item.Mes2);
            this.dataChart15.push(item.Mes3);
            this.dataChart15.push(item.Mes4);
            this.dataChart15.push(item.Mes5);
            this.dataChart15.push(item.Mes6);
            this.dataChart15.push(item.Mes7);
            this.dataChart15.push(item.Mes8);
            this.dataChart15.push(item.Mes9);
            this.dataChart15.push(item.Mes10);
            this.dataChart15.push(item.Mes11);
            this.dataChart15.push(item.Mes12);
          }else  if(item.concepto.trim() === 'PRACTICANTE'){
            this.dataChart16.push(item.Mes1);
            this.dataChart16.push(item.Mes2);
            this.dataChart16.push(item.Mes3);
            this.dataChart16.push(item.Mes4);
            this.dataChart16.push(item.Mes5);
            this.dataChart16.push(item.Mes6);
            this.dataChart16.push(item.Mes7);
            this.dataChart16.push(item.Mes8);
            this.dataChart16.push(item.Mes9);
            this.dataChart16.push(item.Mes10);
            this.dataChart16.push(item.Mes11);
            this.dataChart16.push(item.Mes12);
          }
        })
      }
      this.context5 = 'chart-5'; 
      this.data = this.chartService.getChartData4(this.labels, this.dataChart13, this.dataChart14, this.dataChart15, this.dataChart16,'EMPLEADOS', 'FUNCIONARIOS','OBREROS', 'PRACTICANTE','line')
      this.options = this.chartService.getChartOptions('', '',)

      this.isGrafico5 = true;
      this.isTable5 = false;
    }
  } else if (id == 6) {
    if (position == 0) {
      this.isTable6 = true;
      this.isGrafico6 = false;
    } else {
      this.labels = [];
      this.dataChart17 = [];
      this.dataChart18 = [];
      if(this.columns10){
        this.columns10.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' && item.prop !== 'mesActual'){
            this.labels.push(item.name);
          }
        });
      }
      if(this.rows10){
        this.rows10.map(item =>{
          if(item.concepto.trim() === 'F'){
            this.dataChart17.push(item.Mes1);
            this.dataChart17.push(item.Mes2);
            this.dataChart17.push(item.Mes3);
            this.dataChart17.push(item.Mes4);
            this.dataChart17.push(item.Mes5);
            this.dataChart17.push(item.Mes6);
            this.dataChart17.push(item.Mes7);
            this.dataChart17.push(item.Mes8);
            this.dataChart17.push(item.Mes9);
            this.dataChart17.push(item.Mes10);
            this.dataChart17.push(item.Mes11);
            this.dataChart17.push(item.Mes12);
          }else  if(item.concepto.trim() === 'M'){
            this.dataChart18.push(item.Mes1);
            this.dataChart18.push(item.Mes2);
            this.dataChart18.push(item.Mes3);
            this.dataChart18.push(item.Mes4);
            this.dataChart18.push(item.Mes5);
            this.dataChart18.push(item.Mes6);
            this.dataChart18.push(item.Mes7);
            this.dataChart18.push(item.Mes8);
            this.dataChart18.push(item.Mes9);
            this.dataChart18.push(item.Mes10);
            this.dataChart18.push(item.Mes11);
            this.dataChart18.push(item.Mes12);
          }
        })
      }
      this.context6 = 'chart-6'; 
      this.data = this.chartService.getChartData2(this.labels, this.dataChart17, this.dataChart18, 'Mujer', 'Hombre','line')
      this.options = this.chartService.getChartOptions('', '',)

      this.isGrafico6 = true;
      this.isTable6 = false;
    }
  } else if (id == 7) {
    if (position == 0) {
      this.isTable7 = true;
      this.isGrafico7 = false;
    } else {
      this.labels = [];
      this.dataChart19 = [];
      this.dataChart20 = [];
      this.dataChart21 = []; 
      this.dataChart22 = []; 
      this.dataChart23 = []; 
      this.dataChart24 = []; 
      this.dataChart25 = []; 
      if(this.columns11){
        this.columns11.map(item =>{
          if(item.prop !== 'concepto' && item.prop !== 'Mes13' && item.prop !== 'mesActual'){
            this.labels.push(item.name);
          }
        });
      }
      if(this.rows11){
        this.rows11.map(item =>{
          if(item.concepto.trim() === 'Menos de 6 meses'){
            this.dataChart19.push(item.Mes1);
            this.dataChart19.push(item.Mes2);
            this.dataChart19.push(item.Mes3);
            this.dataChart19.push(item.Mes4);
            this.dataChart19.push(item.Mes5);
            this.dataChart19.push(item.Mes6);
            this.dataChart19.push(item.Mes7);
            this.dataChart19.push(item.Mes8);
            this.dataChart19.push(item.Mes9);
            this.dataChart19.push(item.Mes10);
            this.dataChart19.push(item.Mes11);
            this.dataChart19.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Entre 1 y 5 años'){
            this.dataChart20.push(item.Mes1);
            this.dataChart20.push(item.Mes2);
            this.dataChart20.push(item.Mes3);
            this.dataChart20.push(item.Mes4);
            this.dataChart20.push(item.Mes5);
            this.dataChart20.push(item.Mes6);
            this.dataChart20.push(item.Mes7);
            this.dataChart20.push(item.Mes8);
            this.dataChart20.push(item.Mes9);
            this.dataChart20.push(item.Mes10);
            this.dataChart20.push(item.Mes11);
            this.dataChart20.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Entre 6 y 10 años'){
            this.dataChart21.push(item.Mes1);
            this.dataChart21.push(item.Mes2);
            this.dataChart21.push(item.Mes3);
            this.dataChart21.push(item.Mes4);
            this.dataChart21.push(item.Mes5);
            this.dataChart21.push(item.Mes6);
            this.dataChart21.push(item.Mes7);
            this.dataChart21.push(item.Mes8);
            this.dataChart21.push(item.Mes9);
            this.dataChart21.push(item.Mes10);
            this.dataChart21.push(item.Mes11);
            this.dataChart21.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Entre 11 y 20 años'){
            this.dataChart22.push(item.Mes1);
            this.dataChart22.push(item.Mes2);
            this.dataChart22.push(item.Mes3);
            this.dataChart22.push(item.Mes4);
            this.dataChart22.push(item.Mes5);
            this.dataChart22.push(item.Mes6);
            this.dataChart22.push(item.Mes7);
            this.dataChart22.push(item.Mes8);
            this.dataChart22.push(item.Mes9);
            this.dataChart22.push(item.Mes10);
            this.dataChart22.push(item.Mes11);
            this.dataChart22.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Entre 21 y 25 años'){
            this.dataChart23.push(item.Mes1);
            this.dataChart23.push(item.Mes2);
            this.dataChart23.push(item.Mes3);
            this.dataChart23.push(item.Mes4);
            this.dataChart23.push(item.Mes5);
            this.dataChart23.push(item.Mes6);
            this.dataChart23.push(item.Mes7);
            this.dataChart23.push(item.Mes8);
            this.dataChart23.push(item.Mes9);
            this.dataChart23.push(item.Mes10);
            this.dataChart23.push(item.Mes11);
            this.dataChart23.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Entre 26 y 30 años'){
            this.dataChart24.push(item.Mes1);
            this.dataChart24.push(item.Mes2);
            this.dataChart24.push(item.Mes3);
            this.dataChart24.push(item.Mes4);
            this.dataChart24.push(item.Mes5);
            this.dataChart24.push(item.Mes6);
            this.dataChart24.push(item.Mes7);
            this.dataChart24.push(item.Mes8);
            this.dataChart24.push(item.Mes9);
            this.dataChart24.push(item.Mes10);
            this.dataChart24.push(item.Mes11);
            this.dataChart24.push(item.Mes12);
          }else  if(item.concepto.trim() === 'Más de 30 años'){
            this.dataChart25.push(item.Mes1);
            this.dataChart25.push(item.Mes2);
            this.dataChart25.push(item.Mes3);
            this.dataChart25.push(item.Mes4);
            this.dataChart25.push(item.Mes5);
            this.dataChart25.push(item.Mes6);
            this.dataChart25.push(item.Mes7);
            this.dataChart25.push(item.Mes8);
            this.dataChart25.push(item.Mes9);
            this.dataChart25.push(item.Mes10);
            this.dataChart25.push(item.Mes11);
            this.dataChart25.push(item.Mes12);
          }
        })
      }
      this.context7 = 'chart-7'; 
      this.data = this.chartService.getChartData7(this.labels, this.dataChart19, this.dataChart20, this.dataChart21, this.dataChart22,this.dataChart23,this.dataChart24,this.dataChart25,'Menos de 6 meses', 'Entre 1 y 5 años','Entre 6 y 10 años', 'Entre 11 y 20 años','Entre 21 y 25 años','Entre 26 y 30 años','Más de 30 años','line')
      this.options = this.chartService.getChartOptions('', '',)

      this.isGrafico7 = true;
      this.isTable7 = false;
    }
  } 
}
}
