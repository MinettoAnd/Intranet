
import { Component,ElementRef, ViewChild, TemplateRef, AfterViewInit, Input, OnInit, SimpleChanges } from '@angular/core';
import { ColumnMode, NgxDatatableModule, SelectionType, DatatableComponent  } from '@swimlane/ngx-datatable';
import { ExportService } from '../../../../../_services/export.service';
import * as Chart from 'chart.js';
import {  ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartService } from '../../../barchar/chart.service';

@Component({
  selector: 'app-content-estadisticas',
  templateUrl: './content-estadisticas.component.html',
  styleUrls: ['./content-estadisticas.component.scss']
})
export class ContentEstadisticasComponent implements OnInit {
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
  isGrafico8 = false;
  isLoading0 = false;
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;
  activeTabId: number;

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
  @Input() temp1;
  @Input() temp2;
  @Input() especialidades1;
  @Input() especialidades2;
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
  dataChart26: number[] = [];
  dataChart27: number[] = [];
  dataChart28: number[] = [];
  dataChart29: number[] = [];
  dataChart30: number[] = [];
  dataChart31: number[] = [];
  dataChart32: number[] = [];
  ColumnMode = ColumnMode;
  tabs = [
    {
      id: 1,
      label: 'RESUMEN',
      template: null,
    },
    {
      id: 2,
      label: 'PROCEDIMIENTOS',
      template: null,
    },
    {
      id: 3,
      label: 'MÉDICOS',
      template: null,
    },
  ];
  data: Chart.ChartData;

  especialidad;
  grupo;

  options;

  // options;
  selectedOptionTipo='';
  selectedOptionTipo1 ='';
  rows3filtered: any[];
  rows4filtered: any[];
  rows5filtered: any[];
  rows6filtered: any[];
  // Templates definidos como @ViewChild
  @ViewChild('resumenTemplate', { static: false }) resumenTemplate: TemplateRef<any>;
  @ViewChild('procedimientosTemplate', { static: false }) procedimientosTemplate: TemplateRef<any>;
  @ViewChild('medicosTemplate', { static: false }) medicosTemplate: TemplateRef<any>;
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
      // this.rows3filtered = this.rows3?.filter(item => item.GRUPO3 === 'SOLES');
      // this.rows4filtered = this.rows4?.filter(item => item.GRUPO3 === 'SOLES');
      this.rows5filtered = this.rows5;
      this.rows6filtered = this.rows6;
    }
  }
  ngAfterViewInit() {
   
   
    setTimeout(() => {
      this.tabs[0].template = this.resumenTemplate;
      this.tabs[1].template = this.procedimientosTemplate;
      this.tabs[2].template = this.medicosTemplate;
      // if (this.rows3) {
      //   this.filtrarRows3();
      // }
    });
    // this.rows3filtered = this.rows3.filter(item => item.GRUPO3 === 'SOLES');
  }


  isActiveTab(tabId: number): boolean {
    return this.activeTabId === tabId;
  }
  getRowClass(row) {
    // console.log('getCllass =>', row)
    return {
      'totals': row.Campo === 'TOTAL' || row.grupo === 'TOTAL', 'sub-totals': row.Campo === 'LIMA' || row.Campo === 'CHORRILLOS' || row.Campo === 'SURCO'

    };
  }

  especialityChange1(event){
    console.log(198, event);
    const input = event;
    this.especialidad = input;
    if (input.length > 0 && input !== 'null') {
      const filtered = this.rows5filtered = this.rows5.filter(item => item.TipoOA_Nombre === input);
        // console.log(filtered);
      this.rows5filtered = [...filtered]
      
     } else {

      this.rows5filtered = [...this.rows5]
    }
  }
  especialityChange2(event){
    // console.log(834, event);
    const input = event;
    this.especialidad = input;
    if (input.length > 0 && input !== 'null') {
      const filtered = this.rows6filtered = this.rows6.filter(item => item.TipoOA_Nombre === input);
        // console.log(filtered);
      this.rows6filtered = [...filtered]
      
     } else {

      this.rows6filtered = [...this.rows6]
    }
  }

  updateFilter1(event, selectedOption) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows5filtered
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
      this.rows5filtered = [...filtered]
      
    } else {
      if(selectedOption === ''){
        this.rows5filtered = this.rows5;
      }else{
        this.rows5filtered = [...this.rows5.filter(item => item.TipoOA_Nombre === selectedOption)]
      }
    }
  }
  updateFilter2(event, selectedOption) {
    const input = event.target.value.toLowerCase();
    // console.log(838, input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows6filtered
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().includes(input) ) != undefined
        );
        // console.log(filtered);
      this.rows6filtered = [...filtered]
      
    } else {
      console.log(255, selectedOption)
      if(selectedOption === ''){
        this.rows6filtered = this.rows6;
      }else{
        this.rows6filtered = [...this.rows6.filter(item => item.TipoOA_Nombre === selectedOption)]
      }
      
    }
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
        return count.toString().indexOf('-') > -1 ? count.toLocaleString().replace('-', '(').concat(')') : count.toLocaleString();
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
  // if (cells[0] !== 0){
  //   return '';
  // }
  return '';    
}

}
