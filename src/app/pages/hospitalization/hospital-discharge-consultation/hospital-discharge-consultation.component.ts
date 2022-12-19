import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { TableApiService } from '../../../_services/table-api.service';
import {AttentionConsultation} from '../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../models/forms-data/page';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../interfaces/excel-json.interface';
import { ExportService } from '../../../_services/export.service';

@Component({
  selector: 'app-hospital-discharge-consultation',
  templateUrl: './hospital-discharge-consultation.component.html',
  styleUrls: ['./hospital-discharge-consultation.component.sass']
})
export class HospitalDischargeConsultationComponent implements OnInit {

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
  constructor(private tableApiservice: TableApiService, private exportService: ExportService) {
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
    this.setPage({ offset: 0 });
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

  copyTableToClipboard(){
    this.exportService.exportToClipboard(this.rows, this.columns);
    
  }

  exportToExcel(): void {
    this.exportService.exportTableElmToExcel(this.rows, 'Atenciones-Realizadas-por-Emergencia');
  }


  exportToCsv(): void {
    this.exportService.exportToCsv(this.rows, 'Atenciones-Realizadas-por-Emergencia', this.columns);
  }
  filter() {
  
        const form = this.filtroForm.value;
          this.f_inicio = moment(form.f_inicio).format('YYYY-MM-DD'),
          this.f_fin = moment(form.f_fin).format('YYYY-MM-DD'),
          this.id_sede = form.id_sede,
          this.id_tipo_paciente = form.id_tipo_paciente,
          this.like_empresa = form.like_empresa,
          this.like_especialidad = form.like_especialidad,
          this.like_medico = form.like_medico,
          this.like_paciente = form.like_paciente,

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
  updateFiltername(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilterposition(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.position.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilteroffice(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.office.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }

  updateFilterage(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.age.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFiltersalary(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.salary.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilterstartdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.startdate.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

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
  private newAttribute = { 'id': 15, name: 'Mark', position: 'Otto', office: '@mdo', age: '31', salary: '12000', startdate: '16/05/2017' };

  addFieldValue() {
    this.rows.push(this.newAttribute);
    this.rows = [...this.rows];
  }
  deleteFieldValue(index) {
    this.rows.splice(index, 1);
  }
  deleteRow(id) {
    let i = 0;
    for (const row of this.rows) {
      if (row.id === id) {
        break;
      }
      i++;
    }
    const temp = [...this.rows];
    temp.splice(i, 1);
    this.rows = temp;
  }
   updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;
    this.row[rowIndex][cell] = event.target.value;
    const temp = [...this.row];
    this.row = temp;
  }

  reloadAddRows() {
    this.blockUIAddRows.start('Loading..');

    setTimeout(() => {
      this.blockUIAddRows.stop();
    }, 2500);
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  reloadRowSelection() {
    this.blockUIRowSelection.start('Loading..');

    setTimeout(() => {
      this.blockUIRowSelection.stop();
    }, 2500);
  }
  deleteCheckedRow() {
    let index = 0;
    const removedIndex = [];
    const temp = [...this.rows];
    for (const row of temp) {
      for (const selectedRow of this.selected) {
        if (row.id === selectedRow.id) {
          removedIndex.push(index);
        }
      }
      index++;
    }

    for (let i = removedIndex.length - 1; i >= 0; i--) {
      temp.splice(removedIndex[i], 1);
    }
    this.rows = temp;
    this.selected = [];
  }

}
