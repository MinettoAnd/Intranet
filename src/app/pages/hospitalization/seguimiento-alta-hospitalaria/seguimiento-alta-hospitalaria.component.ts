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
  f_inicio = moment(this.restarDias(new Date, -28)).format('YYYY-MM-DD');;
  f_fin = moment(new Date()).format('YYYY-MM-DD');
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
  constructor(private tableApiservice: HospitalizationService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private datePipe: DatePipe,) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      f_inicio: new FormControl(this.f_inicio),
      f_fin: new FormControl(this.f_fin),
      sede: new FormControl(this.sede),

  });
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
                console.log(response);
                if(response.data.success){
                  // this.data = response.data ? response.data : [];
                  // this.message = this.data.titulo;
        
                  // this.columns = this.data.cabeceras_internados;
                  // this.rows = this.data.tabla_internados;
                  // this.temp = this.rows;
                  // this.columns1 = this.data.cabeceras_piso;
                  // this.rows1 = this.data.tabla_piso;
                  // this.columns2 = this.data.cabeceras_grupo_dx;
                  // this.rows2 = this.data.tabla_grupo_dx;
                  // this.columns3 = this.data.cabeceras_grupo_aseg;
                  // this.rows3 = this.data.tabla_grupo_aseg;
                  // this.columns4 = this.data.cabeceras_grupo_dx;
                  // this.rows4 = this.data.tabla_grupo_dx;
                  // console.log(169, this.rows1);
        
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

                    // Swal.close();
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
           this.tableApiservice.getResumenTipoPaciente(this.parameters).subscribe(
              (response) => {
                if(response.data.success){

                    // Swal.close();
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
            this.parameters.tipo = 'Enfermeria';
            this.tableApiservice.getResumenTipoPaciente(this.parameters).subscribe(
              (response) => {
                if(response.data.success){

                    // Swal.close();
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

                    // Swal.close();
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

                    // Swal.close();
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
          await  this.tableApiservice.eliminaTabla(this.parameters).subscribe(
              (response) => {
                if(response.data.success){
        
        
                }
                
              },
              (error) => {
                  Swal.close();
              }
            );
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
      this.exportService.exportTableElmToExcel(this.rows, 'Listado de Morosos');
    }else if (numberTabla === 1){
      
      this.exportService.exportTableElmToExcel(this.rows1, 'Listado de Morosos - Distribución por Programa');
    }else if (numberTabla === 2){
      
      this.exportService.exportTableElmToExcel(this.rows2, 'Listado de Morosos - Distribución por Período');
    }
  }

  filter() {
  
        const form = this.filtroForm.value;
          this.f_inicio = moment(form.f_inicio).format('YYYY-MM-DD');
          this.f_fin = moment(form.f_fin).format('YYYY-MM-DD');
          this.sede = form.sede;
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
                    count = count + 0;
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

