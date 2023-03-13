import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IMedidas } from "src/app/pages/models/claims/IMedidas";
import Swal from "sweetalert2";
import { DocsComponent } from "../../claims/docs/docs.component";
import { FilesComponent } from "../../claims/list/detalle/modal/files/files.component";
import { MedidasAdoptadasComponent } from "./../../claims/list/respuesta-reclamo/medidas-adoptadas/medidas-adoptadas.component";
import { Options } from '@angular-slider/ngx-slider';
import * as moment from "moment";
import { ComercialService } from "src/app/_services/comercial.service";
import { ColumnMode, SelectionType, NgxDatatableModule, DatatableComponent  } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  @Input() dato;
  value: number = 0;
  
  options: Options = {
    floor: 0,
    ceil: 0
  };

  SelectionType = SelectionType;
  selected = [];
  ColumnMode = ColumnMode;
  active = 1;
  accionForm: FormGroup;
  fecha = moment(new Date()).format('YYYY-MM-DD');
  hora = moment().locale('America/Lima').format('HH:mm:ss');
  exito_comunicacion: number = 0;

  motivo: string = "";

  submitter_accion = false;

  page = 1;
  pageSize = 50;
  textLoadion: string;
  periodos_deuda;
    columns: any;
    rows: any;

  constructor(
      private modalService: NgbModal,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private apiService: ComercialService,
      private datePipe: DatePipe,
      private _cp: CurrencyPipe
  ) {

  }

  ngOnInit() {

  this.options.ceil = this.dato.CuotasVencidas
  this.periodos_deuda = this.dato.periodos_deuda
  this.accionForm = this.formBuilder.group({
        fecha: [this.fecha, Validators.required],
        hora: [this.hora, Validators.required],

        medio_comunicacion: ["", Validators.required],
        exito_comunicacion: 0,
        motivo: [""],
        contacto: [""],
        compromiso: [""],
        cuotas: [this.dato.periodos_deuda],
        observaciones: [""],
      });
      
    this.getResultadoComunication(this.dato.idAfiliado);
  }
  get s() {
      return this.accionForm.controls;
  }

  getResultadoComunication(idMoroso) {
    
      this.apiService
          .getListComunicacionMorosos(idMoroso)
          .subscribe( (response: any) => {
            console.log(79, response);
            
            this.columns =  response.data.cabeceras;
            this.rows =  response.data.data;
            this.rows.map(item =>{
                if(item.motivo ){
                    if(item.motivo === '01'){
                        item.motivo = 'No respondieron'
                    }else if(item.motivo === '02'){
                        item.motivo = 'Contacto equivocado'
                    }else if(item.motivo === '03'){
                        item.motivo = 'Contacto no se encontraba disponible'
                    }
                } 
                if(item.exito_comunicacion){
                    if(item.exito_comunicacion === '1'){
                        item.exito_comunicacion = 'Sí'
                    }else if(item.exito_comunicacion === '2'){
                        item.exito_comunicacion = 'No'
                    }
                }
                if(item.medio_comunicacion){
                    if(item.medio_comunicacion === '1'){
                        item.medio_comunicacion = 'Teléfono'
                    }else if(item.medio_comunicacion === '2'){
                        item.medio_comunicacion = 'Correo'
                    }
                }
                if(item.contacto){
                    if(item.contacto === '1'){
                        item.contacto = 'Titular'
                    }else if(item.contacto === '2'){
                        item.contacto = 'Esposo(a)'
                    }else if(item.contacto === '3'){
                        item.contacto = 'Hijo(a)'
                    }else if(item.contacto === '4'){
                        item.contacto = 'Padre'
                    }else if(item.contacto === '5'){
                        item.contacto = 'Madre'
                    }else if(item.contacto === '6'){
                        item.contacto = 'Otro Familiar'
                    }
                }
            });
            console.log(70, this.columns);
            console.log(70, this.rows);
            //   this.listresultadoreclamo = response.data.length > 0 ? response.data : [];
          });
        
  }

  saveComunication() {
      this.submitter_accion = true;

      if (this.accionForm.invalid) {
          this.showAlertForm();
          return;
      }
      var formValue = this.accionForm.value;

      const data = {
        idPaciente: this.dato.idAfiliado,
        idPrograma: this.dato.IdAfiliacion,
        comunicacion_fecha: this.datePipe.transform(formValue.fecha, "yyyy-MM-dd") + " " + formValue.hora,
        creacion_usuario: localStorage.getItem('CodigoUsuario'),
        // creacion_fecha: '',
        medio_comunicacion: formValue.medio_comunicacion,
        exito_comunicacion: formValue.exito_comunicacion,
        motivo: formValue.motivo,
        contacto: formValue.contacto,
        compromiso: formValue.compromiso,
        cuotas: formValue.cuotas,
        observaciones: formValue.observaciones,
      };
      console.log(data);
      this.textLoadion = "Actualizando Informacion...";
      this.showLoading();
      this.apiService.saveMorososComunicacion(data).subscribe(
          (response: any) => {
              Swal.close();

              this.success();
              this.getResultadoComunication(this.dato.idAfiliado);
          },
          (error) => {
              Swal.close();
              Swal.fire("Error!", "Intentar nuevamente", "error");
          }
      );
  }
  showAlertForm() {
      Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Verificar que todo los campos obligatorios esten completados !",
      });
  }


  showLoading() {
      Swal.fire({
          text: this.textLoadion,
          width: "20rem",
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: () => {
              Swal.showLoading();
          },
      });
  }
  success() {
      Swal.fire({
          title: "Exitoso!",
          width: "20rem",
          icon: "success",
      });
  }

}
