import { Component, OnInit, ViewChild } from '@angular/core';
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
import { HospitalizationService } from 'src/app/_services/hospitalization.service';
import { ButtonRendererComponent } from '../../../shared/components/renderer/button-renderer.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AltaHospitalariaComponent } from 'src/app/modals/hospitalization/alta-hospitalaria/alta-hospitalaria.component';
@Component({
  selector: 'app-seguimiento-alta-hospitalaria',
  templateUrl: './seguimiento-alta-hospitalaria.component.html',
  styleUrls: ['./seguimiento-alta-hospitalaria.component.scss']
})
export class SeguimientoAltaHospitalariaComponent implements OnInit {
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
  sede = '0000';
  estado = 'T';
  tipo_lista = 'E';
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
  RegObs:any;
  RegOk:any;
  RegTotal:any;
  totalDeuda:any;
  frameworkComponents: any;
  closeResult = '';
  farmMin: any;
  farmProm: any;
  farmMax: any;
  enfProm: any;
  enfMax: any;
  enfMin: any;
  facProm: any;
  facMax: any;
  facMin: any;
  audProm: any;
  audMax: any;
  audMin: any;
  rowHeight = 38;
  action: boolean = false;
  constructor(private tableApiservice: HospitalizationService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private datePipe: DatePipe,private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      f_inicio: new FormControl(this.f_inicio),
      f_fin: new FormControl(this.f_fin),
      sede: new FormControl(this.sede),
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
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    // this.setPage({ offset: 0 });

  }
  onBtnClick1(e) {

    if ( e.rowData !== undefined){
          const  modalRef =  this.modalService.open(AltaHospitalariaComponent, {
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
    const archivo_atenciones = this.makeid(11);
    this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      f_inicio: this.f_inicio,
      f_fin: this.f_fin,
      id_sede: this.sede,
      archivo_atenciones: archivo_atenciones,
      archivo_temporal: archivo_atenciones,
      tipo: 'Farmacia'
      // pageNumber: this.page.pageNumber,
      // size: this.page.size
    };

    this.loading();
 this.tableApiservice.generaArchivos(this.parameters).subscribe(
      async (response) => {
        if(response.data.success){
            
            this.tableApiservice.getDetalleSeguimiento(this.parameters).subscribe(
              (response) => {
                this.rows = [];
                this.columns = [];
                console.log(response);
                if(response.data.success){
                  this.data = response.data ? response.data : [];
                  this.message = this.data.titulo;
        
                  this.columns = this.data.cabeceras_atenciones;
                  this.columns.map(item =>{
                    if(item.headerName === 'VER MÁS'){
                      item.cellRenderer= 'buttonRenderer',
                      item.cellRendererParams= {
                        onClick: this.onBtnClick1.bind(this),
                        label: 'Click 1'
                      }
                    }
                  });
                  this.rows = this.data.tabla_atenciones;
                  this.temp = this.rows;
        
                    // Swal.close();
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
            this.tableApiservice.getResumenSeguimiento(this.parameters).subscribe(
              (response) => {
                if(response.data.success){
                  this.RegObs = response.data.RegObs;
                  this.RegOk = response.data.RegOk;
                  this.RegTotal = response.data.RegTotal;

                  this.farmProm = response.data.farmProm;
                  this.farmMin = response.data.farmMin;
                  this.farmMax = response.data.farmMax;

                  this.enfProm = response.data.enfProm;
                  this.enfMax = response.data.enfMax;
                  this.enfMin = response.data.enfMin;

                  this.facProm = response.data.facProm;
                  this.facMax = response.data.facMax;
                  this.facMin = response.data.facMin;

                  this.audProm = response.data.audProm;
                  this.audMax = response.data.audMax;
                  this.audMin = response.data.audMin;

                  this.rows1 = response.data.tabla_far;
                  this.columns1 = response.data.cabeceras_far;
                  this.rows2 = response.data.tabla_enf;
                  this.columns2 = response.data.cabeceras_enf;
                  this.rows3 = response.data.tabla_fac;
                  this.columns3 = response.data.cabeceras_fac;
                  this.rows4 = response.data.tabla_aud;
                  this.columns4 = response.data.cabeceras_aud;

                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
            this.tableApiservice.getResumenTipoPaciente(this.parameters).subscribe(
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
                    if (key === '0'){
                      table = response.data.tabla_grupo_Prg
                    }else if (key === '1'){
                      table = response.data.tabla_grupo_Ins
                    }else if (key === '2'){
                      table = response.data.tabla_grupo_Mad
                    }else if (key === '3'){
                      table = response.data.tabla_grupo_Cia
                    }else if (key === '4'){
                      table = response.data.tabla_grupo_Otr
                    }
                    const datos = {
                        porcentaje : porcentaje.toFixed(2),
                        // value: porcentaje[0],
                        table: table
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
            this.parameters.tipo = 'Enfermeria';
            this.tableApiservice.getResumenTipoPaciente(this.parameters).subscribe(
              (response) => {
                this.progressBar2 = [];
                this.progressBarLabels3 = [];
                this.progressBarLabels4 = [];
                if(response.data.success){
                  // this.rows1      = response.data.grupo_porc
                  this.progressBarLabels3 = response.data.grupo_detalle
                  this.progressBarLabels4 = response.data.grupo
                  let table: any;
                  for (const [key, value] of Object.entries(response.data.grupo_porc)) {
                    console.log(key, '=>', value)
                    let porcentaje:any = value;
                    if (key === '0'){
                      table = response.data.tabla_grupo_Prg
                    }else if (key === '1'){
                      table = response.data.tabla_grupo_Ins
                    }else if (key === '2'){
                      table = response.data.tabla_grupo_Mad
                    }else if (key === '3'){
                      table = response.data.tabla_grupo_Cia
                    }else if (key === '4'){
                      table = response.data.tabla_grupo_Otr
                    }
                    const datos = {
                        porcentaje : porcentaje.toFixed(2),
                        // value: porcentaje[0],
                        table: table
                    }
                    this.progressBar2.push(datos);
                  }
                  console.log(265, this.progressBar2)

                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
            this.parameters.tipo = 'AsignacionF';
            this.tableApiservice.getResumenTipoPaciente(this.parameters).subscribe(
              (response) => {
                if(response.data.success){
                  this.progressBar3 = [];
                  this.progressBarLabels4 = [];
                  this.progressBarLabels5 = [];
                  if(response.data.success){
                    // this.rows1      = response.data.grupo_porc
                    this.progressBarLabels4 = response.data.grupo_detalle
                    this.progressBarLabels5 = response.data.grupo
                    let table: any;
                    for (const [key, value] of Object.entries(response.data.grupo_porc)) {
                      console.log(key, '=>', value)
                      let porcentaje:any = value;
                      if (key === '0'){
                        table = response.data.tabla_grupo_Prg
                      }else if (key === '1'){
                        table = response.data.tabla_grupo_Ins
                      }else if (key === '2'){
                        table = response.data.tabla_grupo_Mad
                      }else if (key === '3'){
                        table = response.data.tabla_grupo_Cia
                      }else if (key === '4'){
                        table = response.data.tabla_grupo_Otr
                      }
                      const datos = {
                          porcentaje : porcentaje.toFixed(2),
                          // value: porcentaje[0],
                          table: table
                      }
                      this.progressBar3.push(datos);
                    }
                    console.log(265, this.progressBar3)
  
                  }
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
            this.parameters.tipo = 'Auditoria';
            this.tableApiservice.getResumenTipoPaciente(this.parameters).subscribe(
              (response) => {
                if(response.data.success){
                  this.progressBar4 = [];
                  this.progressBarLabels6 = [];
                  this.progressBarLabels7 = [];
                  if(response.data.success){
                    // this.rows1      = response.data.grupo_porc
                    this.progressBarLabels6 = response.data.grupo_detalle
                    this.progressBarLabels7 = response.data.grupo
                    let table: any;
                    for (const [key, value] of Object.entries(response.data.grupo_porc)) {
                      console.log(key, '=>', value)
                      let porcentaje:any = value;
                      if (key === '0'){
                        table = response.data.tabla_grupo_Prg
                      }else if (key === '1'){
                        table = response.data.tabla_grupo_Ins
                      }else if (key === '2'){
                        table = response.data.tabla_grupo_Mad
                      }else if (key === '3'){
                        table = response.data.tabla_grupo_Cia
                      }else if (key === '4'){
                        table = response.data.tabla_grupo_Otr
                      }
                      const datos = {
                          porcentaje : porcentaje.toFixed(2),
                          // value: porcentaje[0],
                          table: table
                      }
                      this.progressBar4.push(datos);
                    }
                    console.log(265, this.progressBar4)
  
                  }
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
          await  this.tableApiservice.eliminaTabla(this.parameters).subscribe(
              (response) => {
                if(response.data.success){
        Swal.close();
        
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
          // 
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
        item.estancia = typeof item.estancia === 'number' ? item.estancia : Number(item.estancia);
        item.demFarmacia = typeof item.demFarmacia === 'number' ? item.demFarmacia : Number(item.demFarmacia);
        item.demEnfermeria = typeof item.demEnfermeria === 'number' ? item.demEnfermeria : Number(item.demEnfermeria);
        item.demAuditoria = typeof item.demAuditoria === 'number' ? item.demAuditoria : Number(item.demAuditoria);
        item.demAltaAdmin = typeof item.demAltaAdmin === 'number' ? item.demAltaAdmin : Number(item.demAltaAdmin);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
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
        item.estancia = typeof item.estancia === 'number' ? item.estancia : Number(item.estancia);
        item.demFarmacia = typeof item.demFarmacia === 'number' ? item.demFarmacia : Number(item.demFarmacia);
        item.demEnfermeria = typeof item.demEnfermeria === 'number' ? item.demEnfermeria : Number(item.demEnfermeria);
        item.demAuditoria = typeof item.demAuditoria === 'number' ? item.demAuditoria : Number(item.demAuditoria);
        item.demAltaAdmin = typeof item.demAltaAdmin === 'number' ? item.demAltaAdmin : Number(item.demAltaAdmin);
        item.montoTotal = typeof item.montoTotal === 'number' ? item.montoTotal : Number(item.montoTotal);
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
        const form = this.filtroForm.value;
          this.f_inicio = moment(form.f_inicio).format('YYYY-MM-DD');
          this.f_fin = moment(form.f_fin).format('YYYY-MM-DD');
          this.sede = form.sede;
          var diff = moment(this.f_fin).diff(moment(this.f_inicio));
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

