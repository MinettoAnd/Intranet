import { Component, OnInit, ViewChild } from '@angular/core';
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
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MorososContactadosComponent } from 'src/app/modals/seguimientoMorosos/listado/morosos-contactados.component';

@Component({
  selector: 'app-psf-morosos-contactados',
  templateUrl: './psf-morosos-contactados.component.html',
  styleUrls: ['./psf-morosos-contactados.component.scss']
})
export class PsfMorososContactadosComponent implements OnInit {
  initialSize = 0;
  active = 1;

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
  // datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  fecha_inicio = moment(this.restarDias(new Date, -7)).format('YYYY-MM-DD');
  fecha_fin = moment(new Date()).format('YYYY-MM-DD');
  optionSize=10;
  planDeSalud = '0';
  accion = '0';
  // tipo_paciente = '0';

  page = new Page();
  SelectionType = SelectionType;
  selected = [];
  ColumnMode = ColumnMode;
  filtered;
  public pageLimitOptions = [
    {value: 50},
    {value: 100},
    {value: 200},
    // {value: 100},
  ];
  totalMorosos:any;
  totalAfiliados:any;
  totalPeriodos:any;
  totalDeuda:any;

  constructor(private tableApiservice: ComercialService, private exportService: ExportService, private _cnp:CustomNumberPipe, private datePipe: DatePipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      fecha_inicio: new FormControl(this.fecha_inicio),
      fecha_fin: new FormControl(this.fecha_fin),
      // tipo_paciente: new FormControl(this.tipo_paciente),
      planDeSalud: new FormControl(this.planDeSalud),
      accion: new FormControl(this.accion),
  });
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
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.setPage({ offset: 0 });

  }
  restarDias(fecha, dias) {
    var fechalim = fecha.setDate(fecha.getDate() + dias);
    var fechas = this.datePipe.transform(fechalim, 'yyyy-MM-dd');
    return fechas;
  }
  private changePageLimit(limit: any): void {
    this.loading("Filtrando....");
    // if (limit === '0'){
      
    //   this.page.size = this.page.totalElements;
    //   console.log(this.page.totalElements);
    //   return
    // }
    this.page.size = parseInt(limit, 10);
    setTimeout(() => {
      Swal.close();
    }, 1000)
  }
  setPage(pageInfo) {
    console.log(pageInfo);
    // this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      // tipo_paciente: this.tipo_paciente,
      planDeSalud: this.planDeSalud,
      accion: this.accion,

      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading("Realizando Busqueda....");
    console.log(this.parameters);
    this.tableApiservice.getListMorososSeguimiento(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        this.rows = [];
        this.columns = [];
        if(response.data.success){
          this.message = response.message;
          this.title = response.data.title;
          //console.log(response.data);
          this.data = response.data ? response : [];
          //console.log(168, this.data);   
          this.columns = this.data.data.cabeceras;
          this.columns.map(item =>{
            if(item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          });
          this.rows = this.data.data.data;

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
      this.exportService.exportToClipboard(this.rows, this.columns);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 0){

      this.exportService.exportTableElmToExcel(this.rows, 'Lista de Morosos contactadps');
    }
  }

  filter() {
  
        const form = this.filtroForm.value;
          this.fecha_inicio = moment(form.fecha_inicio).format('YYYY-MM-DD'),
          this.fecha_fin = moment(form.fecha_fin).format('YYYY-MM-DD');
          // this.tipo_paciente = form.tipo_paciente,
          this.planDeSalud = form.planDeSalud;
          this.accion = form.accion;
          var diff = moment(this.fecha_fin).diff(moment(this.fecha_inicio));
          if( this.page.size > 800 ){
            this.page.size = 25;
            this.optionSize = this.page.size;
          }
          if((diff/(1000*60*60*24)) < 31){
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

              const  modalRef =  this.modalService.open(MorososContactadosComponent, {
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

