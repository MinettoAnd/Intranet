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
import { CurrencyPipe } from '@angular/common';
import { CustomNumberPipe } from 'src/app/pipes/customNumber.pipe';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
import { ContactoComponent } from 'src/app/modals/seguimientoMorosos/contacto/contacto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-morosos',
  templateUrl: './listado-psf-morosos-seguimiento.component.html',
  styleUrls: ['./listado-psf-morosos-seguimiento.component.scss'],
})
export class ListadoPSFMorososSeguimientoComponent implements OnInit {
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
  datePipe: any;
        // f_inicio: '2022-11-01',
      // f_fin: '2022-11-30',
  fecha = moment(new Date()).format('YYYY-MM-DD');
  hoy_menos_seis = moment(new Date()).subtract(6, "days").format("DD-MM-YYYY");
  meses = '00';
  contacto = 'TE';
  tipo_paciente = '0';
  planDeSalud = 0;
  accion = 0;
  titular;
  page = new Page();
  SelectionType = SelectionType;
  selected = [];
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
  constructor(private tableApiservice: ComercialService, private exportService: ExportService, private _cnp:CustomNumberPipe,
    private _cp: CurrencyPipe, private _phone: PhonePipe, private modalService: NgbModal) {
    this.page.pageNumber = 0;
    this.page.size = 10;

    this.filtroForm = new FormGroup({
      fecha: new FormControl(this.fecha),
      meses: new FormControl("00"),
      contacto: new FormControl("TE"),
      tipo_paciente: new FormControl("0"),
      planDeSalud: new FormControl(this.planDeSalud),
      accion: new FormControl(this.accion),
      titular: new FormControl(this.titular),
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
    // this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any): void {
    this.loading("Filtrando....");
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
    this.page.pageNumber = pageInfo.offset;
    this.parameters = {
      fecha: this.fecha,
      meses: this.meses,
      contacto: this.contacto,
      tipo_paciente: this.tipo_paciente,
      planDeSalud: this.planDeSalud,
      accion: this.accion,
      titular: this.titular,
      pageNumber: this.page.pageNumber,
      size: this.page.size
    };

    this.loading("Realizando Busqueda....");
    this.tableApiservice.getMorososSeguimiento(this.parameters).subscribe(
      (response: ApiResponse<AttentionConsultation>) => {
        this.rows = [];
        if(response.data.success){
          this.message = response.message;
          this.title = response.data.title;
          //console.log(response.data);
          this.data = response.data ? response : [];
          console.log(168, this.data);   
          this.columns = this.data.data.cabeceras;
          // console.log(168, this.columns);  
          this.columns.map(item=>{
            if (item.pipe === 'currency'){
              item.pipe = this._cp;
            }
          });
          this.columns1 = [
            {prop: 'Programa', name: 'Programa', headerClass: 'text-center'},
            {prop: 'TotalContratos', name: 'Contratos', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cnp},
            {prop: 'TotalMiembros', name: 'Afiliados', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cnp},
            {prop: 'CuotasVencidas', name: 'Periodos', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cnp},
            {prop: 'ImpCuotasVencidas', name: 'Deuda', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cp},
          ]
          this.columns2 = [
            {prop: 'periodo', name: 'Periodos', headerClass: 'text-center'},
            {prop: 'nuContratos', name: 'Contratos', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cnp},
            {prop: 'nuAfiliados', name: 'Afiliados', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cnp},
            {prop: 'nuCuotasVencidas', name: 'Periodos', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cnp},
            {prop: 'totalImpCuotasVencidas', name: 'Deuda', headerClass: 'text-center', cellClass: 'text-rigth', pipe: this._cp},
          ]
          this.rows = this.data.data.data;
          this.rows1 = [];
          this.totalMorosos = this._cnp.transform(this.rows.length);
          this.totalAfiliados = 0;
          this.totalPeriodos = 0;
          this.totalDeuda = 0;
          
          let result = [];
          let totalContratos = 0;
          let totalAfiliados = 0;
          let totalPeriodos = 0;
          let totalDeuda = 0;
          this.rows.forEach(function (a) {
            //console.log(177,a);
              if ( !this[a.grupoPrograma]) {
                  this[a.grupoPrograma] =  { Programa: a.grupoPrograma, TotalContratos: 0, TotalMiembros: 0, CuotasVencidas: 0, ImpCuotasVencidas: 0 };

                  result.push(this[a.grupoPrograma]);
              }
              this[a.grupoPrograma].TotalContratos += 1;
              this[a.grupoPrograma].TotalMiembros += Number(a.TotalMiembros);
              this[a.grupoPrograma].CuotasVencidas += Number(a.CuotasVencidas);
              this[a.grupoPrograma].ImpCuotasVencidas += Number(a.ImpCuotasVencidas);
             
             
          }, Object.create(null));
          this.rows1 = result;
          this.rows1.map(item =>{
            totalContratos += item.TotalContratos;
            totalAfiliados += item.TotalMiembros;
            totalPeriodos += item.CuotasVencidas;
            totalDeuda += item.ImpCuotasVencidas;
          });
          const total = {
            Programa: 'TOTAL', 
            TotalContratos: totalContratos, 
            TotalMiembros: totalAfiliados, 
            CuotasVencidas: totalPeriodos, 
            ImpCuotasVencidas: totalDeuda
          };
          
          this.rows1.push(total);
          this.rows.map(item=>{
            //console.log(222,item.ImpCuotasVencidas);
            item.ImpCuotasVencidas =  item.ImpCuotasVencidas;
            item.Telefono = this._phone.transform( item.Telefono);
          });
          this.totalAfiliados = this._cnp.transform(totalAfiliados);
          this.totalPeriodos = this._cnp.transform(totalPeriodos);
          this.totalDeuda = totalDeuda;
          //console.log(198, this.rows1);

          this.rows2 = [];
          let nuContratosP1= 0;
          let nuAfiliadosP1 = 0;
          let nuCuotasVencidasP1 = 0;
          let totalImpP1 = 0;

          let nuContratosP2 = 0;
          let nuAfiliadosP2 = 0;
          let nuCuotasVencidasP2 = 0;
          let totalImpP2 = 0;

          let nuContratosP3 = 0;
          let nuAfiliadosP3 = 0;
          let nuCuotasVencidasP3 = 0;
          let totalImpP3 = 0;

          let nuContratosP4 = 0;
          let nuAfiliadosP4 = 0;
          let nuCuotasVencidasP4 = 0;
          let totalImpP4 = 0;
          
          let nuContratosP5 = 0;
          let nuAfiliadosP5 = 0;
          let nuCuotasVencidasP5 = 0;
          let totalImpP5 = 0;

          let nuContratosP6 = 0;
          let nuAfiliadosP6 = 0;
          let nuCuotasVencidasP6 = 0;
          let totalImpP6 = 0;
          //console.log(300,this.rows);
          this.rows.map(item =>{
           // console.log(300,this._cp.transform(item.ImpCuotasVencidas));
           //console.log(223,Number(item.ImpCuotasVencidas))
            item.Telefono = this._phone.transform( item.Telefono);
            item.Celular = this._phone.transform( item.Celular);
            if(item.CuotasVencidas === '1'){
              nuContratosP1 += 1;
              nuAfiliadosP1 += Number(item.TotalMiembros);
              nuCuotasVencidasP1 += Number(item.CuotasVencidas);
              totalImpP1 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '2'){
              nuContratosP2 += 1;
              nuAfiliadosP2 += Number(item.TotalMiembros);
              nuCuotasVencidasP2 += Number(item.CuotasVencidas);
              totalImpP2 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '3'){
              nuContratosP3 += 1;
              nuAfiliadosP3 += Number(item.TotalMiembros);
              nuCuotasVencidasP3 += Number(item.CuotasVencidas);
              totalImpP3 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '4'){
              nuContratosP4 += 1;
              nuAfiliadosP4 += Number(item.TotalMiembros);
              nuCuotasVencidasP4 += Number(item.CuotasVencidas);
              totalImpP4 += Number(item.ImpCuotasVencidas);
            }else if(item.CuotasVencidas === '5'){
              nuContratosP5 += 1;
              nuAfiliadosP5 += Number(item.TotalMiembros);
              nuCuotasVencidasP5 += Number(item.CuotasVencidas);
              totalImpP5 += Number(item.ImpCuotasVencidas);
            }else if(Number(item.CuotasVencidas) > 5){
              nuContratosP6 += 1;
              nuAfiliadosP6 += Number(item.TotalMiembros);
              nuCuotasVencidasP6 += Number(item.CuotasVencidas);
              totalImpP6 += Number(item.ImpCuotasVencidas);
            }
          });
          const datosPeriodo1 =  {
              periodo: '1 PERIODO',
              nuContratos: nuContratosP1,
              nuAfiliados: nuAfiliadosP1,
              nuCuotasVencidas: nuCuotasVencidasP1,
              totalImpCuotasVencidas: totalImpP1
            };
          const datosPeriodo2 =  {
            periodo: '2 PERIODOS',
            nuContratos: nuContratosP2,
            nuAfiliados: nuAfiliadosP1,
            nuCuotasVencidas: nuCuotasVencidasP2,
            totalImpCuotasVencidas: totalImpP2
            };
          const datosPeriodo3 = {
            periodo: '3 PERIODOS',
            nuContratos: nuContratosP3,
            nuAfiliados: nuAfiliadosP3,
            nuCuotasVencidas: nuCuotasVencidasP3,
            totalImpCuotasVencidas: totalImpP3
            };
          const datosPeriodo4 = {
              periodo: '4 PERIODOS',
              nuContratos: nuContratosP4,
              nuAfiliados: nuAfiliadosP4,
              nuCuotasVencidas: nuCuotasVencidasP4,
              totalImpCuotasVencidas: totalImpP4
            };
          const datosPeriodo5 = {
              periodo: '5 PERIODOS',
              nuContratos: nuContratosP5,
              nuAfiliados: nuAfiliadosP5,
              nuCuotasVencidas: nuCuotasVencidasP5,
              totalImpCuotasVencidas: totalImpP5
            };
          const datosPeriodo6 = {
              periodo: 'MÁS DE 5 PERIODOS',
              nuContratos: nuContratosP6,
              nuAfiliados: nuAfiliadosP6,
              nuCuotasVencidas: nuCuotasVencidasP6,
              totalImpCuotasVencidas: totalImpP6
            };
          const datosPeriodo7 = {
              periodo: 'TOTAL',
              nuContratos: nuContratosP1 + nuContratosP2 + nuContratosP3 + nuContratosP4 + nuContratosP5 + nuContratosP6,
              nuAfiliados: nuAfiliadosP1 + nuAfiliadosP2 +nuAfiliadosP3 + nuAfiliadosP4 + nuAfiliadosP5 + nuAfiliadosP6,
              nuCuotasVencidas: nuCuotasVencidasP1 + nuCuotasVencidasP2 + nuCuotasVencidasP3 + nuCuotasVencidasP4 + nuCuotasVencidasP5+ nuCuotasVencidasP6,
              totalImpCuotasVencidas: totalImpP1 + totalImpP2 + totalImpP3 + totalImpP4 + totalImpP5 + totalImpP6,
          };
          this.rows2.push(datosPeriodo1);
          this.rows2.push(datosPeriodo2);
          this.rows2.push(datosPeriodo3);
          this.rows2.push(datosPeriodo4);
          this.rows2.push(datosPeriodo5);
          this.rows2.push(datosPeriodo6);
          this.rows2.push(datosPeriodo7);
          //console.log(200,this.rows2);
          this.rows2.map(item=>{
            item.ImpCuotasVencidas = this._cp.transform( item.ImpCuotasVencidas);
          });
          //console.log(response.data.page);
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

  copyTableToClipboard(numberTabla){
    
    this.rows.map(item => {
      item.TotalAcciones = typeof item.TotalAcciones === 'number' ? item.TotalAcciones : Number(item.TotalAcciones);
      item.ImpCuotasVencidas = typeof item.ImpCuotasVencidas === 'number' ? item.ImpCuotasVencidas : Number(item.ImpCuotasVencidas);
      item.TotalMiembros = typeof item.TotalMiembros === 'number' ? item.TotalMiembros : Number(item.TotalMiembros);
      item.CuotasVencidas = typeof item.CuotasVencidas === 'number' ? item.CuotasVencidas : Number(item.CuotasVencidas);
    });
    this.rows1.map(item => {
      item.TotalContratos = typeof item.TotalContratos === 'number' ? item.TotalContratos : Number(item.TotalContratos);
      item.TotalMiembros = typeof item.TotalMiembros === 'number' ? item.TotalMiembros : Number(item.TotalMiembros);
      item.CuotasVencidas = typeof item.CuotasVencidas === 'number' ? item.CuotasVencidas : Number(item.CuotasVencidas);
      item.ImpCuotasVencidas = typeof item.ImpCuotasVencidas === 'number' ? item.ImpCuotasVencidas : Number(item.ImpCuotasVencidas);
    });
    this.rows2.map(item => {
      item.nuContratos = typeof item.nuContratos === 'number' ? item.nuContratos : Number(item.nuContratos);
      item.nuAfiliados = typeof item.nuAfiliados === 'number' ? item.nuAfiliados : Number(item.nuAfiliados);
      item.nuCuotasVencidas = typeof item.nuCuotasVencidas === 'number' ? item.nuCuotasVencidas : Number(item.nuCuotasVencidas);
      item.totalImpCuotasVencidas = typeof item.totalImpCuotasVencidas === 'number' ? item.totalImpCuotasVencidas : Number(item.totalImpCuotasVencidas);
      item.ImpCuotasVencidas = typeof item.ImpCuotasVencidas === 'number' ? item.ImpCuotasVencidas : Number(item.ImpCuotasVencidas);
    });
    console.log(383, this.rows1);
    console.log(383, this.rows2);
    if(numberTabla === 0){
      // this.rows.map(item=>{
      //   item.ImpCuotasVencidas = this._cp.transform( item.ImpCuotasVencidas);
      // });
      this.exportService.exportToClipboard(this.rows, this.columns);
    }else if (numberTabla === 1){

      this.exportService.exportToClipboard(this.rows1, this.columns2);
    }else if (numberTabla === 2){
    
      this.exportService.exportToClipboard(this.rows2, this.columns2);
    }
  }

  exportToExcel(numberTabla): void {
    this.rows.map(item => {
      item.TotalAcciones = typeof item.TotalAcciones === 'number' ? item.TotalAcciones : Number(item.TotalAcciones);
      item.ImpCuotasVencidas = typeof item.ImpCuotasVencidas === 'number' ? item.ImpCuotasVencidas : Number(item.ImpCuotasVencidas);
      item.TotalMiembros = typeof item.TotalMiembros === 'number' ? item.TotalMiembros : Number(item.TotalMiembros);
      item.CuotasVencidas = typeof item.CuotasVencidas === 'number' ? item.CuotasVencidas : Number(item.CuotasVencidas);
    });
    this.rows1.map(item => {
      item.TotalContratos = typeof item.TotalContratos === 'number' ? item.TotalContratos : Number(item.TotalContratos);
      item.TotalMiembros = typeof item.TotalMiembros === 'number' ? item.TotalMiembros : Number(item.TotalMiembros);
      item.CuotasVencidas = typeof item.CuotasVencidas === 'number' ? item.CuotasVencidas : Number(item.CuotasVencidas);
      item.ImpCuotasVencidas = typeof item.ImpCuotasVencidas === 'number' ? item.ImpCuotasVencidas : Number(item.ImpCuotasVencidas);
    });
    this.rows2.map(item => {
      item.nuContratos = typeof item.nuContratos === 'number' ? item.nuContratos : Number(item.nuContratos);
      item.nuAfiliados = typeof item.nuAfiliados === 'number' ? item.nuAfiliados : Number(item.nuAfiliados);
      item.nuCuotasVencidas = typeof item.nuCuotasVencidas === 'number' ? item.nuCuotasVencidas : Number(item.nuCuotasVencidas);
      item.totalImpCuotasVencidas = typeof item.totalImpCuotasVencidas === 'number' ? item.totalImpCuotasVencidas : Number(item.totalImpCuotasVencidas);
      item.ImpCuotasVencidas = typeof item.ImpCuotasVencidas === 'number' ? item.ImpCuotasVencidas : Number(item.ImpCuotasVencidas);
    });
    if(numberTabla === 0){
      // this.rows.map(item=>{
      //   item.ImpCuotasVencidas = this._cp.transform( item.ImpCuotasVencidas);
      // });
      this.exportService.exportTableElmToExcel(this.rows, 'Examenes Laboratorio');
    }else if (numberTabla === 1){
      
      this.exportService.exportTableElmToExcel(this.rows1, 'Examenes Laboratorio');
    }else if (numberTabla === 2){
      
      this.exportService.exportTableElmToExcel(this.rows2, 'Examenes Laboratorio');
    }
  }

  filter() {
  
        const form = this.filtroForm.value;
          this.fecha = moment(form.fecha).format('YYYY-MM-DD'),
          this.meses = form.meses,
          this.tipo_paciente = form.tipo_paciente,
          this.planDeSalud = form.planDeSalud,
          this.accion = form.accion,
          this.titular = form.titular
        this.setPage({ offset: 0 });
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

              const  modalRef =  this.modalService.open(ContactoComponent, {
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

