import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medidas-adoptadas',
  templateUrl: './medidas-adoptadas.component.html',
  styleUrls: ['./medidas-adoptadas.component.css']
})
export class MedidasAdoptadasComponent implements OnInit {
  @Input() dato;
  medidasForm: FormGroup;
  public textLoadion: string = "";
  public fechaInicio: string = "";
  public fechafin: string = "";
  public tipo_reclamo: string = "";
  public codigoAsignado: string = "";
  public codigoAdoptado: string = "";
  public detalle: string = "";
  public resume: string = "";
  public naturaleza: string = "";
  public proceso: string = "";
  public codigo_iafas_ipress: string = "";
  public f_registra_reclamo: string = "";
  public count: any = [];
  public idmedida: number = 0;
  public listmedidas: any = [];
  public medidas_resumen: string = "";
  maxChars = 500;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private apiService: ClaimsService, private datePipe: DatePipe, private modalService: NgbModal) {
    this.medidasForm = this.formBuilder.group({
      tiporelcamo: [''],
      codigo_unico: [''],
      codigo_medida: [''],
      detalle_reclamo: [''],
      resumen: [''],
      naturaleza: [''],
      proceso: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      f_registra_reclamo: ['']


    });
  }

  ngOnInit() {
    this.f_registra_reclamo = this.datePipe.transform(this.dato.d_registra_reclamo, 'yyyy-MM-dd');
    console.log(this.f_registra_reclamo)
    this.sede(this.dato.sede);
    if (this.dato.valor != 0) {
      if (this.dato.fecha_inicio === '0000-00-00 00:00:00') { this.fechaInicio = '' } else { this.fechaInicio = this.datePipe.transform(this.dato.fecha_inicio, 'yyyy-MM-dd') };
      if (this.dato.fecha_culminacion === '0000-00-00 00:00:00') { this.fechafin = '' } else { this.fechafin = this.datePipe.transform(this.dato.fecha_culminacion, 'yyyy-MM-dd') };

      this.tipo_reclamo = this.dato.tipo_reclamo;

      this.codigoAdoptado = this.dato.codigo_adoptado;
      this.detalle = this.dato.detalle_reclamo;
      if (this.dato.resumen === null || this.dato.resumen === '') { this.resume = " "; } else {

        this.resume = this.dato.resumen;
      }

      this.naturaleza = this.dato.naturaleza;
      this.proceso = this.dato.processo_adoptada;


    }

  }

  sede(id) {
    switch (id) {
      case 1:

        if (this.dato.empresa === 'IAFAS') {
          console.log('exitoso')
          this.codigo_iafas_ipress = "20027";
          this.codigoAsignado = this.codigo_iafas_ipress + "-" + parseInt(this.dato.correlativo); //00020027
        } else {
          this.codigo_iafas_ipress = "8281";//00008281
          this.codigoAsignado = this.codigo_iafas_ipress + "-" + parseInt(this.dato.correlativo);
        }

        break;
      case 2:

        if (this.dato.empresa === 'IAFAS') {
          this.codigo_iafas_ipress = "20027";
          this.codigoAsignado = this.codigo_iafas_ipress + "-" + parseInt(this.dato.correlativo);

        } else {
          this.codigo_iafas_ipress = "10251";//00010251
          this.codigoAsignado = this.codigo_iafas_ipress + "-" + parseInt(this.dato.correlativo);

        }

        break;
      case 4:

        if (this.dato.empresa === 'IAFAS') {
          this.codigo_iafas_ipress = "20027";
          this.codigoAsignado = this.codigo_iafas_ipress + "-" + parseInt(this.dato.correlativo);

        } else {
          this.codigo_iafas_ipress = "15118";//00015118
          this.codigoAsignado = this.codigo_iafas_ipress + "-" + parseInt(this.dato.correlativo);

        }

        break;

      default:
        break;
    }
  }
  registerUpdateMedidas(id) {
    if (id === 0) {
      this.RegisterMedida();
    } else {
      this.updateMedida();
    }
  }

  RegisterMedida() {
    this.getCount();

  }

  updateMedida() {
    var formValue = this.medidasForm.value;
    const data = {
      resultado_reclamo: this.dato.resultado_reclamo,
      tiporelcamo: formValue.tiporelcamo,
      //codigo_unico: formValue.codigo_unico,
      //codigo_medida: formValue.codigo_medida,
      detalle_reclamo: formValue.detalle_reclamo,
      resumen: formValue.resumen,
      naturaleza: formValue.naturaleza,
      proceso: formValue.proceso,
      fecha_inicio: formValue.fecha_inicio,
      fecha_fin: formValue.fecha_fin,
      fecha_update: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      id: this.dato.id

    }
    this.textLoadion = "Actualizando Informacion...";
    this.showLoading();
    this.apiService.updatetMedidasService(data).then((response: any) => {
      const data = {
        success: 1
      }
      this.activeModal.close(data)
      Swal.close();
      this.success();
    }, (error) => {
      Swal.close();
      Swal.fire('Error!', 'Intentar nuevamente', 'error');
    });
  }
  getCount() {
    this.apiService.getCountMedidasService(this.dato.idreclamo, this.dato.empresa).then((response: any) => {
      this.count = response.data.length > 0 ? response.data : [];

      var formValue = this.medidasForm.value;
      const data = {
        idreclamo: this.dato.idreclamo,
        empresa: this.dato.empresa,
        id_sede: this.dato.sede,
        resultado_reclamo: this.dato.resultado_reclamo,
        d_registra_reclamo: formValue.f_registra_reclamo,
        tiporelcamo: formValue.tiporelcamo,
        codigo_unico: this.codigoAsignado,
        codigo_medida: '',
        detalle_reclamo: formValue.detalle_reclamo,
        resumen: formValue.resumen,
        naturaleza: formValue.naturaleza,
        proceso: formValue.proceso,
        fecha_inicio: formValue.fecha_inicio,
        fecha_fin: formValue.fecha_fin,
        fecha_registro: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss')

      }
      this.textLoadion = "Agregando Informacion...";
      this.showLoading();
      this.apiService.postMedidasService(data).then((response: any) => {
        this.listmedidas = response.data.length > 0 ? response.data : [];
        this.idmedida = this.listmedidas[0]?.id;
        this.updateCodigoMedida();

      }, (error) => {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      });
    });
  }

  updateCodigoMedida() {
    const data = {
      codigo_medida: this.count[0]?.cantidad + 1,
      id: this.idmedida
    }
    this.apiService.updateCodigoMedidasService(data).then((response: any) => {
      const data = {
        success: 1
      }
      this.activeModal.close(data)
      Swal.close();
      this.success();
    }, (error) => {
      console.log(error);
      Swal.close();
    });
  }

  showLoading() {
    Swal.fire({
      text: this.textLoadion,
      width: '15rem',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      }
    })
  }
  success() {
    Swal.fire({
      title: 'Exitoso!',
      width: '20rem',
      icon: 'success'
    })
  }
}
