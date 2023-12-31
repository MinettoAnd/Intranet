import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { HospitalizationService } from '../../../_services/hospitalization.service';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';
import ResizeObserver from 'resize-observer-polyfill';
@Component({
  selector: 'app-hospital-discharge-consultation',
  templateUrl: './hospital-discharge-consultation.component.html',
  styleUrls: ['./hospital-discharge-consultation.component.sass']
})
export class HospitalDischargeConsultationComponent implements OnInit {
  initialSize = 0;
  columnSize  = [ 12, 12, 12, 12, 12, 8 , 8, 8, 10, 10, 21, 10, 10, 10, 21];
  filtroForm: FormGroup;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
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
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  parameters:any;
  message;
  columns:any;
  optionsWithCaption = {};
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  f_inicio = moment(new Date()).format('YYYY-MM-DD');
  f_fin = moment(new Date()).format('YYYY-MM-DD');
  id_sede = '0001';
  id_tipo_paciente = '0';
  like_empresa = '';
  like_especialidad = '';
  like_medico = '';
  like_paciente = '';
  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
  title: any;
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  optionSize=10;
  action: boolean = false;
  constructor(private tableApiservice: HospitalizationService, private exportService: ExportService) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      f_inicio: new FormControl(this.f_inicio),
      f_fin: new FormControl(this.f_fin),
      id_sede: new FormControl("0000"),
      id_tipo_paciente: new FormControl("0"),
      like_empresa: new FormControl(""),
      like_especialidad: new FormControl(""),
      like_medico: new FormControl(""),
      like_paciente: new FormControl(""),
  });
   }

  ngOnInit() {
    const item = document.getElementById('datatablele');
    this.initialSize = item.offsetWidth;
    console.log(90, this.initialSize);
    new ResizeObserver((event: any) => {
      this.escucharResizeDiv(event);
    }).observe(item);
    // this.setPage({ offset: 0 });
  }
  escucharResizeDiv(event) {
    const item = document.getElementById('datatablele');

    if (item.offsetWidth !== this.initialSize) {
      // HEADER
      const headerDatatable  = event[0].target.children[0].children[0];
      headerDatatable.style.width = '100%';
      headerDatatable.children[0].style.width = '100%';
      const rowHeader = headerDatatable.children[0].children[1];
      rowHeader.style.width = '100%';
      const headerColumns = Array.from( rowHeader.children );
      // BODY
      const bodyDatatable  = event[0].target.children[0].children[1].children[0].children[0];
      bodyDatatable.style.width = '100%';
      const rowsIterables = Array.from( bodyDatatable.children );
      // ============ CICLOS ==========================
      headerColumns.forEach( (column: any, index: number) => {
        column.style.width = `${this.columnSize[index]}%`;
      });

      // BODY - Recorremos las filas del datatable
      rowsIterables.forEach((row: any) => {
        row.children[0].style.width = '100%';
        const columns = Array.from( row.children[0].children[1].children );

        if ( columns.length ) {
          // const cantidadSize = diferenciaSize / columns.length;
          row.children[0].children[1].style.width = '100%';
          // Recorremos cada columna del datatable
          columns.forEach( (column: any, index: number) => {
            column.style.width = `${this.columnSize[index]}%`;
          });
        }

      });

      // Obtenemos el nuevo ancho del div
      this.initialSize = item.offsetWidth;
      console.log(134, this.initialSize);
    }

  }
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any): void {
    this.page.size = parseInt(limit, 10);
  }
  setPage(pageInfo) {
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      f_inicio: this.f_inicio,
      f_fin: this.f_fin,
      id_sede: this.id_sede,
      id_tipo_paciente: this.id_tipo_paciente,
      like_empresa: this.like_empresa,
      like_especialidad: this.like_especialidad,
      like_medico: this.like_medico,
      like_paciente: this.like_paciente,
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading();
    this.tableApiservice.getHospitalDischargeConsultation(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          this.message = response.message;
          this.title = response.data.title;
          console.log(response.data);
          this.data = response.data ? response : [];
         
          this.columns = this.data.data.cabeceras;
          this.rows = this.data.data.data;
          console.log(response.data.page);
          this.page = (response as any).data.page;
          let cControl = (this.page.pageNumber + 1) * this.page.size;
          this.temp = this.rows;
            Swal.close();
            if (cControl > 800){
              Swal.fire({
                title: "Problema",
                text: this.message,
                icon: "error"
              })
              return;
            }
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
  }

  copyTableToClipboard(){
    this.exportService.exportToClipboard(this.rows, this.columns);
    
  }

  exportToExcel(): void {
    this.exportService.exportTableElmToExcel(this.rows, 'Atenciones-Realizadas-por-Emergencia');
  }



  filter() {
    this.action = true;
        const form = this.filtroForm.value;
          this.f_inicio = moment(form.f_inicio).format('YYYY-MM-DD');
          this.f_fin = moment(form.f_fin).format('YYYY-MM-DD');
          this.id_sede = form.id_sede;
          this.id_tipo_paciente = form.id_tipo_paciente;
          this.like_empresa = form.like_empresa;
          this.like_especialidad = form.like_especialidad;
          this.like_medico = form.like_medico;
          this.like_paciente = form.like_paciente;
          var diff = moment(this.f_fin).diff(moment(this.f_inicio));
          if( this.page.size > 800 ){
            this.page.size = 25;
            this.optionSize = this.page.size;
          }
          if( this.page.size > 800 ){
            this.page.size = 25;
            this.optionSize = this.page.size;
          }
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
              text: "El sistema puede presentar datos de 31 DÍAS como máximo. Agradeceríamos modificar sus filtros de FECHA!",
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
  // eslint-disable-next-line @typescript-eslint/member-ordering

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


}
