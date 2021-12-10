import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.sass']
})
export class RepresentanteComponent implements OnInit {

  @Input() datarepresentante;
  rForm: FormGroup;
  public listparentesco: any = [];
  public textLoadion: string = "";

  constructor(public activeModal: NgbActiveModal,
    private apiService: ClaimsService,
    private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.rForm = this.formBuilder.group({
      nombre: [''],
      paterno: [''],
      materno: [''],
      telefono: [''],
      parentesco: [''],
      correo: [''],
    });
  }

  ngOnInit() {
    this.getParentesco();
  }
  //---PARENTESCO
  getParentesco() {
    this.apiService.getParentescoService().then((response: any) => {
      this.listparentesco = response.data.length > 0 ? response.data : [];
      //this.getSedes();
    })
  }

  updateInfoRepresentante() {
    var formValue = this.rForm.value;
    const data = {
      nombre: formValue.nombre,
      paterno: formValue.paterno,
      materno: formValue.materno,
      telefono: formValue.telefono,
      parentesco: formValue.parentesco,
      correo: formValue.correo,
      tipo_empresa: this.datarepresentante.tipo_empresa,
      idreclamo: this.datarepresentante.idreclamo,
    }
    this.textLoadion = "Actualizando Informacion...";
    this.showLoading();
    this.apiService.updateReclamoRepresentanteService(data).then((response: any) => {
      const data = {
        success: 1
      }
      this.activeModal.close(data)
      Swal.close();
      this.success();
    }, (error) => {
      Swal.close();
      Swal.fire('Error!', 'Intentar nuevamente', 'error');
    })

  }

  showLoading() {
    Swal.fire({
      text: this.textLoadion,
      width: '20rem',
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
