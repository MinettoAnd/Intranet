import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Angular2Txt } from "angular2-txt";
import { CausaComponent } from "src/app/modals/claims/list/causa/causa.component";
import { DetalleComponent } from "src/app/modals/claims/list/detalle/detalle.component";
import { ListcomocimientoComponent } from "src/app/modals/claims/list/listcomocimiento/listcomocimiento.component";
import { RespuestaReclamoComponent } from "src/app/modals/claims/list/respuesta-reclamo/respuesta-reclamo.component";
import { SolucionComponent } from "src/app/modals/claims/list/solucion/solucion.component";
import { IMedidas } from "src/app/pages/models/claims/IMedidas";
import { IReclamo } from "src/app/pages/models/claims/IReclamos";
import Swal from "sweetalert2";
import { TableUtil } from "utils/table_utils";
import { ImagenesService } from "../../../_services/imagenes.service";
import { DatePipe } from '@angular/common';
import { Page } from "src/app/models/forms-data/page";
import { ExportService } from '../../../_services/export.service';
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { InformeComponent } from "src/app/modals/imagenes/informe/informe.component";
@Component({
  selector: 'app-impresion-informes-realizados',
  templateUrl: './impresion-informes-realizados.component.html',
  styleUrls: ['./impresion-informes-realizados.component.scss']
})
export class ImpresionInformesRealizadosComponent implements OnInit {
  formSearch: FormGroup;
  public submitted = false;
  public CODIGO_EMPRESA: string = "IPRESS";
  public validateSede: number;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selected = [];
  collectionSize;
  page = new Page();
  public pageLimitOptions = [
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
  ];
  rows;
  columns;
  closeResult = '';
  options = {
      fieldSeparator: "|",
      quoteStrings: "",
      decimalseparator: ".",
      showTitle: false,
      useBom: true,
  };
  condFiltro: any;
    condExamen: any;
    condF_FIni: any;
    condF_FFin: string;
    condSede: string;
    condPrograma: any;
    condPlaca: any;
    message: string;
  data: any;
  // imagen_logo: any;
  // tipo_examen: any;
  // id_sedeRegistro: any;
  // datos: any;
  // medico: any;
  // examen_realizado1: any;
  // Iusuario: any;
  // Dresponsable: any;
  // conclusiones: any;
  // resultado: any;
  // tipo_sede: any;
  // programas: any;
  // Edad: any;
  // f_examen_Im: any;
  // Torigen: any;
  // hclinica: any;
  // placa: any;
  constructor(
      private datePipe: DatePipe,
      private formBuilder: FormBuilder,
      private apiService: ImagenesService,
      private modalService: NgbModal,
      private exportService: ExportService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
      this.formSearch = this.formBuilder.group({
        condF_FIni: [this.restarDias(new Date(), 7)],
        condF_FFin: [this.datePipe.transform(new Date(), "yyyy-MM-dd")],
        condFiltro: [""],
          condSede: [1],
        condExamen: [""],
      condPrograma: [""],
         condPlaca: [""],
      });
  }

  ngOnInit() {

  }

  restarDias(fecha, dias) {
      var fechalim = fecha.setDate(fecha.getDate() - dias);
      var fechas = this.datePipe.transform(fechalim, "yyyy-MM-dd");
      return fechas;
  }

  showError(error) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo cargar la información",
          footer: "" + error,
      });
  }
  showMessage() {
      Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Sin resultado",
          footer: "",
      });
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

  open(option, idreclamo, sede, correlativo) {
      if (option === 1) {
          const data = {
              idreclamo: idreclamo,
              empresa: this.CODIGO_EMPRESA,
          };
          const modalRef = this.modalService.open(DetalleComponent, {
              size: <any>"xl",
          });
          modalRef.componentInstance.dato = data;
      }
      if (option === 2) {
          const data = {
              idreclamo: idreclamo,
              empresa: this.CODIGO_EMPRESA,
          };
          const modalRef = this.modalService.open(SolucionComponent, {
              size: <any>"xl",
          });
          modalRef.componentInstance.dato = data;
      }
      if (option === 3) {
          const data = {
              idreclamo: idreclamo,
              empresa: this.CODIGO_EMPRESA,
          };
          const modalRef = this.modalService.open(ListcomocimientoComponent, {
              size: <any>"xl",
          });
          modalRef.componentInstance.dato = data;
      }
      if (option === 4) {
          const data = {
              idreclamo: idreclamo,
              empresa: this.CODIGO_EMPRESA,
              sede: sede,
              correlativo: correlativo,
          };
          console.log("verificar correlaivo", data);
          const modalRef = this.modalService.open(RespuestaReclamoComponent, {
              size: <any>"xl",
          });
          modalRef.componentInstance.dato = data;
      }
  }

  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.setPage({ offset: 0 });

  }

  private changePageLimit(limit: any): void {
    
    if (limit === '0'){
      
      this.page.size = this.page.totalElements;
      //console.log(this.page.totalElements);
      return
    }
    this.page.size = parseInt(limit, 10);
  }
  filter() {
    //console.log(217);
          const form = this.formSearch.value;
            this.condFiltro = form.condFiltro;
            this.condExamen = form.condExamen;
            this.condF_FIni = this.datePipe.transform(form.condF_FIni,"yyyy-MM-dd");
            this.condF_FFin = this.datePipe.transform(form.condF_FFin, "yyyy-MM-dd");
            this.condSede = form.condSede;
            this.condPrograma = form.condPrograma;
            this.condPlaca = form.condPlaca;
  
            var diff = moment(this.condF_FFin).diff(moment(this.condF_FIni));
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
  setPage(pageInfo) {
    //console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset;
    const form = this.formSearch.value;
    const data = {
        condFiltro: form.condFiltro,
        condExamen: form.condExamen,
        condF_FIni: this.datePipe.transform(form.condF_FIni,"yyyy-MM-dd"),
        condF_FFin: this.datePipe.transform(form.condF_FFin, "yyyy-MM-dd"),
        condSede: form.condSede,
        condPrograma: form.condPrograma,
        condPlaca: form.condPlaca,
        page: this.page.pageNumber,
        start:this.page.pageNumber * this.page.size,
        limit: this.page.size,
    };
    this.loading("Realizando Busqueda....");
    this.apiService.imgsGetRadiologiaAll(data).subscribe(
        (response: any) => {
          console.log(85, response)
            response.data.length > 0 ? response.data : [];
            this.rows = response.data.data;
            this.rows.map(item =>{
                if(item.placa){
                    item.placa = item.placa + '-' + item.guia
                }
            });
            this.columns = response.data.cabeceras;
            this.page = (response as any).data.page;
            let cControl = (this.page.pageNumber + 1) * this.page.size;
              Swal.close();
              if (cControl > 800){
                Swal.fire({
                  title: "Problema",
                  text: this.message,
                  icon: "error"
                })
                return;
              }
        },
        (error) => {
            Swal.close();
            console.log(error);
            this.showError(error);
        }
    );
  }

  copyTableToClipboard(){
    this.exportService.exportToClipboard(this.rows, this.columns);
    
  }

  exportToExcel(): void {
    this.exportService.exportTableElmToExcel(this.rows, 'Atenciones-Realizadas-por-Emergencia');
  }





  updateFilter(event) {
    const input = event.target.value.toLowerCase();
    //console.log(input);
    // filter our data
    if (input.length > 0) {
      const filtered = this.rows
        .filter(el =>
          Object.values(el).find( val => val?.toString().toLowerCase().indexOf(input) !== -1 ) != undefined
        );
        // console.log(filtered);
      this.rows = [...filtered]
      
    } else {
    //   console.log(this.filtered);
    //   this.rows = [...this.temp]
    }

    // update the rows
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
//  onSelect({ selected }, content?: any) {
  onSelect(row) {
  console.log(307, row)
    if (row !== undefined){

        const parameters = {
          id_resultado: row.id_resultado,
        }
        this.loading("Generando Informe....");
          this.apiService.imgsImprimir(parameters).subscribe(
            async (response) =>{ 
            this.data =  response.data;

            if(this.data){
              const  modalRef =  this.modalService.open(InformeComponent, {
                size: <any>"md",
              });
              modalRef.componentInstance.dato = await this.data;
            }
            
            // console.log(344, this.data)
            Swal.close();
        });
        
     }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
