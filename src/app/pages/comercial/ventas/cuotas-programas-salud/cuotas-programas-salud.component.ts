import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2';
import { TableApiService } from '../../../../_services/table-api.service';
import {AttentionConsultation} from '../../../../interfaces/attentionConsultation';
import {ApiResponse} from '../../../../interfaces/response';
import * as moment from 'moment';
import { Page } from '../../../../models/forms-data/page';
import { ColumnMode, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../../../../interfaces/excel-json.interface';
import { ExportService } from '../../../../_services/export.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cuotas-programas-salud',
  templateUrl: './cuotas-programas-salud.component.html',
  styleUrls: ['./cuotas-programas-salud.component.sass']
})
export class CuotasProgramasSaludComponent implements OnInit {
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public isCollapsed5 = false;
  public isCollapsed6 = false;
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
  rows2: any;
  rows3: any;
  rows4: any;
  rows5: any;
  rows6: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any;
  data2:any;
  data3:any;
  data4:any;
  parameters:any;
  message;
  title;
  columns:any;
  columns2:any;
  optionsWithCaption = {};
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  mes = moment(new Date()).format('MM');
  anio = moment(new Date()).format('YYYY');
  periodo_consulta = this.anio + this.mes;
  // id_sede = '0001';
  // id_tipo_paciente = '0';
  // like_empresa = '';
  // like_especialidad = '';
  // like_medico = '';
  // like_paciente = '';
  page = new Page()
  ColumnMode = ColumnMode;
  filtered;
  active = 1;
  // public pageLimitOptions = [
  //   {value: 10},
  //   {value: 25},
  //   {value: 50},
  //   {value: 100},
  // ];
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
  optionsAnio = [
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
  ];
  pipe_$: { transform: boolean; };
  constructor(private tableApiservice: TableApiService, private exportService: ExportService,
    private _cp: CurrencyPipe
     ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    console.log(this.mes);
console.log(this.anio);
    this.filtroForm = new FormGroup({
      mes: new FormControl(this.mes),
      anio: new FormControl(this.anio),
  });
  // this.pipe_$ = {transform: (_cp.transform, '_', 'USD', true)};
   }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }
  public onAnioChange(anio: any): void {
    this.anio = anio;
    this.periodo_consulta = this.anio + this.mes;
    this.setPage({ offset: 0 });
  }
  public onMesChange(mes: any): void {
    this.mes = mes;
    this.periodo_consulta = this.anio + this.mes;
    this.setPage({ offset: 0 });
  }
  // private changePageLimit(limit: any): void {
  //   console.log(11, limit);
  //   if (limit === '0'){
      
  //     this.page.size = this.page.totalElements;
  //     console.log(this.page.totalElements);
  //     return
  //   }
  //   this.page.size = parseInt(limit, 10);
  // }
  // germanBooleanPipe(): PipeTransform {
  //   return {
  //     transform: (value: boolean) => value ? "Ja" : "Nein";
  // }
  
  _cup(): PipeTransform {
    return {transform: (value) => this._cp.transform(value,'USD','symbol','1.2-2')};
    }
  setPage(pageInfo) {
    console.log(pageInfo);
    // this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      mes: this.mes,
      anio: this.anio,
      periodo_consulta:this.periodo_consulta
      // id_sede: this.id_sede,
      // id_tipo_paciente: this.id_tipo_paciente,
      // like_empresa: this.like_empresa,
      // like_especialidad: this.like_especialidad,
      // like_medico: this.like_medico,
      // like_paciente: this.like_paciente,
      // pageNumber: this.page.pageNumber,
      // size: this.page.size
    };
console.log(this.parameters);
    // this.loading();
    this.tableApiservice.getPagoCuotasMesProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message = response.message;
          // this.title = response.data.title;
          this.data = response.data ? response.data : [];
          this.columns = this.data.cabeceras;
          this.columns.map(item => {
            // const pipe_$ = {transform: .partial(this._cp.transform, _, 'USD', true)};
            if (item.prop !== 'item') {
              // item.pipe = this._cup()
              // item.pipe = this.pipe_$;
              item.pipe = this._cp;
              // item.pipe = {transform: this._cp};
              return item.pipe;
            } else {
              return item;
            }
          });
          this.rows = this.data.query_sin_igv;
          this.rows2 = this.data.query_con_igv;
          // console.log(this.columns);

          const editColumns = ((columns, oldName, name) =>{
            columns.map(item => {
              if (item.pipe === oldName) {
                item.pipe = name.replace("rr", "");
                return item.pipe;
              } else {
                return item;
              }
            });
            // console.log(columns);
          });
          
          editColumns(this.columns, 'this.currencyPipe', "this.currency");
          // this.columns.push({
          //   prop: 'per1',
          //   // index: this.columns.length,
          //   // width: 100,
          //   // resizeable: false,
          //   // sortable: false,
          //   pipe: this._cp, // pass an instance of the pipe you want to use as a property of the column
          // });

          console.log(this.columns);
          const editRowslName = ((rows, oldName) =>{
            rows.map(item => {
              if (item.item.includes(oldName)) {
                item.item = item.item.replaceAll("_", "");
                return item.item;
              } else {
                return item;
              }
            });
          });
            const editRowslPipe = ((rows) =>{
              rows.map(item => {
                // console.log(item);
                // if (item.per1) {
                  console.log(item.per1);
                  item.per1 = this._cp.transform(item.per1,'S/.     ','symbol','1.2-2');
                  item.per2 = this._cp.transform(item.per2,'S/.     ','symbol','1.2-2');
                  item.per3 = this._cp.transform(item.per3,'S/.     ','symbol','1.2-2');
                  item.per4 = this._cp.transform(item.per4,'S/.     ','symbol','1.2-2');
                  return item.per1, item.per2, item.per3, item.per4;
                // } else {
                //   return item;
                // }
              });
            // console.log(rows);
          });
          editRowslName(this.rows, '_');
          editRowslName(this.rows2, '_');
          editRowslPipe(this.rows);
          editRowslPipe(this.rows2);
          // this.rows.map(item => {
          //   if (item.item.includes('_')) {
          //     item.item = item.item.replace("_", " ");
          //     return item.item.replace("_", " ");
          //   } else {
          //     return item;
          //   }
          // });
          // console.log(this.rows);
          // console.log(this.rows);
          // console.log(this.rows.replace(/_/g, '+'));
          // this.page = (response as any).data.page;
          // this.temp = this.rows;
          
            // Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    // this.loading();
    this.tableApiservice.getPagoCuotasContratosMesProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message3 = response.message;
          // this.title3 = response.data.title;
          this.data2 = response.data ? response.data : [];
          // this.columns = this.data.cabeceras;
          this.rows3 = this.data2.data;
// console.log(this.rows3);

          const editColumns = ((columns, oldName, name) =>{
            columns.map(item => {
              if (item.pipe === oldName) {
                item.pipe = name.replace("rr", "");
                return item.pipe;
              } else {
                return item;
              }
            });
            // console.log(columns);
          });
          
          editColumns(this.columns, 'this.currencyPipe', "this.currency");
          // console.log(this.columns);
          const editRowslName = ((rows, oldName) =>{
            rows.map(item => {
              if (item.item.includes(oldName)) {
                item.item = item.item.replaceAll("_", "");
                return item.item;
              } else {
                return item;
              }
            });
            // console.log(rows);
          });
          editRowslName(this.rows3, '_');
          // this.rows.map(item => {
          //   if (item.item.includes('_')) {
          //     item.item = item.item.replace("_", " ");
          //     return item.item.replace("_", " ");
          //   } else {
          //     return item;
          //   }
          // });
          // console.log(this.rows3);
          
            // Swal.close();
        }else{
          Swal.close();
        }
      },
      (error) => {
          Swal.close();
      }
    );
    // this.loading();
    this.tableApiservice.getPagoCuotasProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message = response.message;
          // this.title = response.data.title;
          this.data3 = response.data ? response.data : [];
          this.columns2 = this.data3.cabeceras;
          this.rows4 = this.data3.query_con_igv;
          this.rows5 = this.data3.query_sin_igv;
          console.log(this.rows4);

          const editColumns = ((columns, oldName, name) =>{
            columns.map(item => {
              if (item.pipe === oldName) {
                item.pipe = name.replace("rr", "");
                return item.pipe;
              } else {
                return item;
              }
            });
            console.log(columns);
          });
          
          // editColumns(this.columns, 'this.currencyPipe', "this.currency");
          // console.log(this.columns);
          const editRowslName = ((rows, oldName) =>{
            rows.map(item => {
              if (item.item.includes(oldName)) {
                item.item = item.item.replaceAll("_", "");
                return item.item;
              } else {
                return item;
              }
            });
            console.log(rows);
          });
          editRowslName(this.rows4, '_');
          editRowslName(this.rows5, '_');
          // this.rows.map(item => {
          //   if (item.item.includes('_')) {
          //     item.item = item.item.replace("_", " ");
          //     return item.item.replace("_", " ");
          //   } else {
          //     return item;
          //   }
          // });
          // console.log(this.rows);
          // console.log(this.rows);
          // console.log(this.rows.replace(/_/g, '+'));
          // this.page = (response as any).data.page;
          // this.temp = this.rows;
          
            // Swal.close();
        }else{
          Swal.close();
        }
        
      },
      (error) => {
          Swal.close();
      }
    );
    this.loading();
    this.tableApiservice.getPagoCuotasContratosProgramasSalud(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        
        if(response.data.success){
          // this.message3 = response.message;
          // this.title3 = response.data.title;
          this.data4 = response.data ? response.data : [];
          // this.columns2 = this.data.cabeceras;
          this.rows6 = this.data4.data;
console.log(this.rows6);

          const editColumns = ((columns, oldName, name) =>{
            columns.map(item => {
              if (item.pipe === oldName) {
                item.pipe = name.replace("rr", "");
                return item.pipe;
              } else {
                return item;
              }
            });
            console.log(columns);
          });
          
          // editColumns(this.columns2, 'this.currencyPipe', "this.currency");
          // console.log(this.columns);
          const editRowslName = ((rows, oldName) =>{
            rows.map(item => {
              if (item.item.includes(oldName)) {
                item.item = item.item.replaceAll("_", "");
                return item.item;
              } else {
                return item;
              }
            });
            console.log(rows);
          });
          editRowslName(this.rows6, '_');
          // this.rows.map(item => {
          //   if (item.item.includes('_')) {
          //     item.item = item.item.replace("_", " ");
          //     return item.item.replace("_", " ");
          //   } else {
          //     return item;
          //   }
          // });
          console.log(this.rows3);
          
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
    if(numberTabla === 1){
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 2){
      this.exportService.exportToClipboard(this.rows2, this.columns);
    }else if (numberTabla === 3){
      this.exportService.exportToClipboard(this.rows3, this.columns);
    }
  }

  exportToExcel(numberTabla): void {
    if(numberTabla === 1){
      this.exportService.exportTableElmToExcel(this.rows, 'INGRESOS POR CUOTAS-INGRESO SIN IGV');
    }else if (numberTabla === 2){
      this.exportService.exportTableElmToExcel(this.rows2, 'INGRESOS POR CUOTAS-INGRESO SIN IGV');
    }else if (numberTabla === 3){
      this.exportService.exportTableElmToExcel(this.rows3, 'INGRESOS POR CUOTAS-NÚMERO DE CONTRATOS PAGADOS');
    }
  }


  // exportToCsv(): void {
  //   this.exportService.exportToCsv(this.rows, 'Atenciones-Realizadas-por-Emergencia', this.columns);
  // }
  filter() {
  
        const form = this.filtroForm.value;
          this.mes = moment(form.mes).format('YYYY-MM-DD'),
          this.anio = moment(form.anio).format('YYYY-MM-DD'),
          this.periodo_consulta = form.anio + form.mes,

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
}


