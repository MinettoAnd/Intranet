import { map } from 'rxjs/operators';

import { Component, ElementRef, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { ExternalConsultationService } from 'src/app/_services/external-consultation.service';
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
import { ExternalConsultationTicketPromedioService } from 'src/app/_services/external-consultation-ticket-promedio.service';


@Component({
  selector: 'app-ticket-promedio',
  templateUrl: './ticket-promedio.component.html',
  styleUrls: ['./ticket-promedio.component.scss']
})
export class TicketPromedioComponent implements OnInit {
  public isCollapsed = false;
  public isCollapsed4 = false;
  public isCollapsed5 = false;

  totales;
  id_sede = '0001';
  filtroForm: FormGroup;


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
  temp2 = [];
  color = ['secondary','success','primary', 'warning', 'info', 'secondary','secondary', 'secondary', 'secondary', 'secondary', 'secondary'];
  selectedOption='CARDIOLOGIA';
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
  parameters:any;
  tablas:any;
  tablasParms:any;
  message;
  title;
  columns:any;
  columns2:any;
  columns3:any;
  columns4:any;
  optionsWithCaption = {};
  datePipe: any;
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  resumenMes = {
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
  detalleAnual = {
    nro_consultorios: '',
    nro_atendidos: '',
    pacientes_unicos_atendidos: '',
    prom_atencion_paciente: '',
    tiempoxTurno: '',
    nro_atendidos_x60m: '',
    usoEfectivoTurno: '',
    diasPeriodo: '',
    turnos: '',
    atenc_promMesUso: '',
    atenc_promMeses: '',
    prog_promMesUso: '',
    prog_promMeses: '',
    prom_TurnoDiasEfectivos: '',
    prom_TurnoDiasTotales: ''
  };
  especialidades = [];
  especialidad;

  progressBarLabels;
  progressBar1;
  progressBar2;
  progressBar3;
  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
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
  optionsAnio = [];
  action: boolean = false;

  // Datos de las tablas
  public datosConsolidado: any = {
    tabla_consolidado: [],
    cabeceras_consolidado: [],
  };
  public datosConsulta: any = {
    tabla_consulta: [],
    cabeceras_consulta: [],
  };
  public datosLaboratorio: any = {
    tabla_laboratorio: [],
    cabeceras_laboratorio: [],
  };
  public datosTbl2: any = {};
  public datosTbl3: any = {};


  constructor(
    private tableApiservice: ExternalConsultationTicketPromedioService,
    // private tableApiservice: ExternalConsultationService,
    private exportService: ExportService,
    // private _cp: CurrencyPipe
  ) {
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

  // getRowClass(row) {
  //   return {
  //     'totals': row.item.includes('TOTAL'), 'sub-totals': row.item === 'CUOTAS COLECTIVA' || row.item === 'CUOTAS FAMILIAR EXTERNO' || row.item ==='CUOTAS FAMILIAR INTERNO'
  //   };
  // }

  // getCellClass({ row, column, value }): any {
  //   return {
  //     'is-female': value === 'female'
  //   };
  // }

  filter() {
    this.action = true;
    const form = this.filtroForm.value;
    this.id_sede = form.id_sede,
    this.mes = moment(form.mes).format('MM'),
    this.anio = moment(form.anio).format('YYYY'),
    this.periodo_consulta = form.anio + form.mes,

    this.setPage({ offset: 0 });
  }

  async setPage(pageInfo) {
    console.log(pageInfo);
    // this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      archivo_temporal: 'aaaTmpEsp',
      archivo_matriz: 'aaaTmpMatriz',
      periodo_consulta:this.periodo_consulta,
      mes: this.mes,
      tipo: 'mes', //mes, meses
	    sede: this.id_sede,
      meses: this.mes,
      // anio: this.anio,
      // pageNumber: this.page.pageNumber,
      // size: this.page.size
    };

    this.loading();

    this.tableApiservice.getConsolidado(this.parameters).subscribe(response => {
      this.datosConsolidado.tabla_consolidado = response.data.tabla_consolidado;
      this.datosConsolidado.cabeceras_consolidado = response.data.cabeceras_consolidado;
    });

    this.tableApiservice.getConsulta(this.parameters).subscribe(response => {
      this.datosConsulta.tabla_consulta = response.data.tabla_consulta;
      this.datosConsulta.cabeceras_consulta = response.data.cabeceras_consulta;
    });

    this.tableApiservice.getLaboratorio(this.parameters).subscribe(response => {
      this.datosLaboratorio.tabla_laboratorio = response.data.tabla_laboratorio;
      this.datosLaboratorio.cabeceras_laboratorio = response.data.cabeceras_laboratorio;
      Swal.close();
    });

  }

  copyTableToClipboard(numberTabla){
    if(numberTabla === 1){
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 2){
      this.exportService.exportToClipboard(this.rows2, this.columns);
    }else if (numberTabla === 3){
      this.exportService.exportToClipboard(this.rows3, this.columns);
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
      this.exportService.exportTableElmToExcel(this.rows, 'MENSUAL - INGRESOS POR CUOTAS-INGRESO SIN IGV');
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

  // exportToCsv(): void {
  //   this.exportService.exportToCsv(this.rows, 'Atenciones-Realizadas-por-Emergencia', this.columns);
  // }

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

}


