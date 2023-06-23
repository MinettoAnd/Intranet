import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/_services/data.service';
import Swal from 'sweetalert2';
import { ExportService } from '../../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';

import { NumberDecimalPipe } from 'src/app/pipes/numberDecimal.pipe';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IndicadoresService } from 'src/app/_services/indicadores.service';
@Component({
  selector: 'app-estadistica-resumen-colaboradores',
  templateUrl: './estadistica-resumen-colaboradores.component.html',
  styleUrls: ['./estadistica-resumen-colaboradores.component.sass']
})
export class EstadisticaResumenColaboradoresComponent implements OnInit {
  parameters;
  action = false;
  filtro_grupo = 'IMAG';
  tabla_cms = 'CMS_TOTEXA_ATENCION';
  campo_solicitado = 'totExaSolicitado';
  campo_comprado = 'totExaRealizado';
  optionsAnio = [];
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  anioAnterior = moment(new Date()).subtract(1, 'years').format('YYYY');
  periodo = this.anio + this.mes;
  selectedOptionPeriodo = this.periodo;
  message: any;
  data: any;
  title: any;
  listObservers$: Array<Subscription> = [];
  parameters1: any;
  constructor(private tableApiservice: IndicadoresService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private _ndp:NumberDecimalPipe, private modalService: NgbModal, public dataService: DataService) { }
  panelOptions;
  ngOnInit() {
    const observer1$: Subscription = this.dataService.callback.subscribe(
      (data) => {
        this.parameters = data;
        console.log(193, this.parameters)
        this.setPage({ offset: 0 });
      }
      );
      this.listObservers$ = [observer1$]
      // this.setPage({ offset: 0 });
    }
  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
  getParameters(parameters){
    this.parameters = parameters;
    if(parameters !== undefined){
      this.dataService.callback.emit(parameters);
      this.action = true;
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
  setPage(pageInfo) {
    console.log(pageInfo);
    this.selectedOptionPeriodo = this.periodo;
    // this.page.pageNumber = pageInfo.offset;
    this.parameters1 = {
      anio: this.anio,
      mes: this.mes,
      periodo_consulta:this.periodo,
      origen_atencion: '0',
      sede: '0001',
      filtro_grupo: 'RECE',
      tabla_cms:'CMS_TOTREC_ATENCION',
      campo_solicitado: 'totRecSolicitado',
      campo_comprado: 'totRecComprado',
      // pageNumber: this.page.pageNumber,
      // size: this.page.size
    };

    this.loading();
    console.log(this.parameters1)
    // this.tableApiservice.getTablaResumenMensual(this.parameters).subscribe(
    //   (response) => {
    //     // this.rows = [];
    //     if(response.data.success){
    //       this.data = response.data ? response.data : [];
    //       this.message = this.data.titulo;
    //       this.title = response.data.title;
    //       this.columns1 = this.data.cabecera_resumen_mes_1;
    //       this.rows1 = this.data.tabla_resumen_mes_1;
    //       this.columns2 = this.data.cabecera_resumen_mes_2;
    //       this.rows2 = this.data.tabla_resumen_mes_2;
    //       this.columns3 = this.data.cabecera_resumen_mes_3;
    //       this.rows3 = this.data.tabla_resumen_mes_3;
    //       console.log(449, this.columns3);
    //       console.log(449, this.rows3);
    //       this.columns4 = this.data.cabecera_resumen_mes_4;
    //       this.rows4 = this.data.tabla_resumen_mes_4;

    //     }else{
    //       Swal.close();
    //     }
        
    //   },
    //   (error) => {
    //       Swal.close();
    //   }
    // );
    this.tableApiservice.getTablaResumen1Pag1(this.parameters1).subscribe(
      (response) => {
        // this.rows = [];
        console.log(449, response);
        if(response.data.success){
          this.data = response.data ? response.data : [];
          this.message = this.data.titulo;
          this.title = response.data.title;
          const kpiAtenciones = this._ndp.transform((this.data.kpi_mes_atenciones_ma - this.data.kpi_mes_atenciones) / this.data.kpi_mes_atenciones_ma * 100);
          const iconArrow = kpiAtenciones.toString().indexOf('-') > -1 ? 'fa fa-arrow-up text-blue' : 'fa fa-arrow-down text-red';
          const kpiAtencionesFormat = kpiAtenciones.toString().indexOf('-') > -1 ? kpiAtenciones.toString().replace('-','') + ' %': kpiAtenciones + ' %';

          const kpiAtendidos =  this._ndp.transform((this.data.kpi_mes_atendidos_ma - this.data.kpi_mes_atendidos) / this.data.kpi_mes_atendidos_ma * 100);
          const iconArrow1 = kpiAtendidos.toString().indexOf('-') > -1 ? 'fa fa-arrow-up text-blue' : 'fa fa-arrow-down text-red';
          const kpiAtendidosFormat = kpiAtendidos.toString().indexOf('-') > -1 ? kpiAtendidos.toString().replace('-','') + ' %': kpiAtendidos + ' %';

          const kpiOrdEmitidas =  this._ndp.transform((this.data.kpi_mes_ord_solicitados_ma - this.data.kpi_mes_ord_solicitados) / this.data.kpi_mes_ord_solicitados_ma * 100);
          const iconArrow2 = kpiOrdEmitidas.toString().indexOf('-') > -1 ? 'fa fa-arrow-up text-blue' : 'fa fa-arrow-down text-red';
          const kpiOrdEmitidasFormat = kpiOrdEmitidas.toString().indexOf('-') > -1 ? kpiOrdEmitidas.toString().replace('-','') + ' %': kpiOrdEmitidas + ' %';

          const kpiOrdPagadas =  this._ndp.transform((this.data.kpi_mes_ord_comprados_ma - this.data.kpi_mes_ord_comprados) / this.data.kpi_mes_ord_comprados_ma * 100);
          const iconArrow3 = kpiOrdPagadas.toString().indexOf('-') > -1 ? 'fa fa-arrow-up text-blue' : 'fa fa-arrow-down text-red';
          const kpiOrdPagadasFormat = kpiOrdPagadas.toString().indexOf('-') > -1 ? kpiOrdPagadas.toString().replace('-','') + ' %': kpiOrdPagadas + ' %';

          this.panelOptions = [
            {
              infoBox: 'infoBoxAzul ',
              iconClass: 'fa fa-calendar-check-o',
              title: 'ATENCIONES',
              arrow: true,
              iconArrow: iconArrow,
              totalSubtitle: this._cnp.transform(this.data.kpi_mes_atenciones),
              subtitle: kpiAtencionesFormat,
              totalSubSubtitle: this._cnp.transform(this.data.kpi_mes_atenciones_ma),
              subSubtitle: 'Promedio Mensual',
            },
            {
              infoBox: 'infoBoxVerde ',
              iconClass: 'fa fa-users',
              title: 'ATENDIDOS',
              arrow: true,
              iconArrow: iconArrow1,
              totalSubtitle: this._cnp.transform(this.data.kpi_mes_atendidos),
              subtitle: kpiAtendidosFormat,
              totalSubSubtitle: this._cnp.transform(this.data.kpi_mes_atendidos_ma),
              subSubtitle: 'Promedio Mensual',
            },
            {
              infoBox: 'infoBoxRojo ',
              iconClass: 'fa fa-medkit',
              title: this.filtro_grupo === 'RECE' ? 'RECETAS SOLICITADAS' :  'ORDENES EMITIDAS',
              arrow: true,
              iconArrow: iconArrow2,
              totalSubtitle: this._cnp.transform(this.data.kpi_mes_ord_solicitados),
              subtitle: kpiOrdEmitidasFormat,
              totalSubSubtitle: this._cnp.transform(this.data.kpi_mes_ord_solicitados_ma),
              subSubtitle: 'Por atención realizada',
            },
            {
              infoBox: 'infoBoxAzulino',
              iconClass: 'fa fa-plus-circle',
              title: this.filtro_grupo === 'RECE' ? 'RECETAS COMPRADAS' :  'ORDENES PAGADAS',
              arrow: true,
              iconArrow: iconArrow3,
              totalSubtitle: this._cnp.transform(this.data.kpi_mes_ord_comprados),
              subtitle: kpiOrdPagadasFormat,
              totalSubSubtitle: this._cnp.transform(this.data.kpi_mes_ord_comprados_ma),
              subSubtitle: 'Por atención realizada',
            }
          ]

          // this.columns5 = this.data.cabecera_resumen_pag1_1;
          // this.rows5 = this.data.tabla_resumen_pag1_1;
          // this.columns6 = this.data.cabecera_resumen_pag2_1;
          // this.rows6 = this.data.tabla_resumen_pag2_1;
          // this.columns7 = this.data.cabecera_resumen_pag2_2;
          // this.rows7 = this.data.tabla_resumen_pag2_2;
          // console.log(449, this.columns3);
          // console.log(449, this.rows3);
          // this.columns8 = this.data.cabecera_resumen_pag2_3;
          // this.rows8 = this.data.tabla_resumen_pag2_3;

          // Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );

    // this.tableApiservice.getResumenEspecialidadMensual1(this.parameters).subscribe(
    //   (response) => {
    //     // this.rows = [];
    //     if(response.data.success){
    //       this.data = response.data ? response.data : [];
    //       this.message = this.data.titulo;
    //       this.title = response.data.title;
    //       this.columns9 = this.data.cabecera_resumen_especialidad_mensual_01;
    //       this.rows9 = this.data.tabla_resumen_especialidad_mensual_01;
    //       console.log(778, this.rows9)
    //       this.grupos = [];
    //       this.rows9.map( item => {
                    
    //         if (!this.grupos.includes(item.grupo)){
    //           this.grupos.push(item.grupo);
    //         }
    //       });
    //       console.log(707, this.grupos)
    //       this.temp1 = this.rows9;
    //       this.rows9filtered = this.rows9.filter(item => item.grupo === 'Porcentaje');

    //     }else{
    //       Swal.close();
    //     }
        
    //   },
    //   (error) => {
    //       Swal.close();
    //   }
    // );
    // this.tableApiservice.getResumenMedicoMensual1(this.parameters).subscribe(
    //   (response) => {
    //     // this.rows = [];
    //     if(response.data.success){
    //       this.data = response.data ? response.data : [];
    //       this.message = this.data.titulo;
    //       this.title = response.data.title;
    //       this.columns10 = this.data.cabecera_resumen_medico_mensual_01;
    //       this.rows10 = this.data.tabla_resumen_medico_mensual_01;
    //       this.especialidades = [];
    //       this.rows10.map( item => {
                    
    //         if (!this.especialidades.includes(item.especialidad)){
    //           this.especialidades.push(item.especialidad);
    //         }
    //       });
    //       console.log(707, this.especialidades)
    //       this.temp2 = this.rows10;
    //       this.rows10filtered = this.rows10.filter(item => item.especialidad === 'CARDIOLOGIA');
    //         Swal.close();
    //     }else{
    //       Swal.close();
    //     }
        
    //   },
    //   (error) => {
    //       Swal.close();
    //   }
    // );

    // this.tableApiservice.getResumenRecetaGrafica1(this.parameters).subscribe(
    //   (response) => {
    //     // this.rows = [];
    //     if(response.data.success){
    //       this.data = response.data ? response.data : [];
    //       this.message = this.data.titulo;
    //       this.title = response.data.title;
    //       this.barChartLabels1 = [];
    //       this.barChartData1 = [];
    //       this.barChartData2 = [];
    //       this.barChartData3 = [];
    //       this.data.grafica1.map( item => {
    //           this.barChartLabels1.push(item.name) 
    //           this.barChartData1.push(item.item_1)      
    //           this.barChartData2.push(item.item_2) 
    //           this.barChartData3.push(item.item_3) 

    //       });

    //         Swal.close();
    //     }else{
    //       Swal.close();
    //     }
        
    //   },
    //   (error) => {
    //       Swal.close();
    //   }
    // );

    // this.tableApiservice.getResumenGraficaSedes1(this.parameters).subscribe(
    //   (response) => {
    //     // this.rows = [];
    //     if(response.data.success){
    //       this.data = response.data ? response.data : [];
    //       this.message = this.data.titulo;
    //       this.title = response.data.title;
    //       this.barChartLabels2 = [];
    //       this.barChartData4 = [];
    //       this.barChartData5 = [];
    //       this.barChartData6 = [];
    //       this.data.grafica1.map( item => {
    //           this.barChartLabels2.push(item.name) 
    //           this.barChartData4.push(item.item_1)      
    //           this.barChartData5.push(item.item_2) 
    //           this.barChartData6.push(item.item_3) 

    //       });

    //       this.barChartLabels3 = [];
    //       this.barChartData7 = [];
    //       this.barChartData8 = [];
    //       this.barChartData9 = [];
    //       this.data.grafica2.map( item => {
    //           this.barChartLabels3.push(item.name) 
    //           this.barChartData7.push(item.item_1)      
    //           this.barChartData8.push(item.item_2) 
    //           this.barChartData9.push(item.item_3) 

    //       });

    //         Swal.close();
    //     }else{
    //       Swal.close();
    //     }
        
    //   },
    //   (error) => {
    //       Swal.close();
    //   }
    // );
  }

}
