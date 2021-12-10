import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvolucradoComponent } from 'src/app/modals/claims/popup/involucrado/involucrado.component';
import { PersonalComponent } from 'src/app/modals/claims/popup/personal/personal.component';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-involucrado',
  templateUrl: './detalle-involucrado.component.html',
  styleUrls: ['./detalle-involucrado.component.sass']
})
export class DetalleInvolucradoComponent implements OnInit {

  @Input() datainInvolucrado;
  public namearea: string = "";
  public nameareatrasladado: string = "";
  public listareas: any = [];
  public listinvolucrados: any = [];
  public listinpersonal: any = [];

  public listpersonal: any = [];
  public listjefe: any = [];
  public listpersonaltranferido: any = [];
  public listtransferido: any = [];
  public detailpersona: any = [];
  inForm: FormGroup;
  searchInvolucradoForm: FormGroup;
  searchTrasladadoForm: FormGroup;
  submittedinvolucrado = false;
  submittedtransferido = false;

  public areaid: string = "";
  public areaid2: string = "";
  public admistrativo: number = 0;
  public codigo: string = "";
  public nombre: string = "";
  public paterno: string = "";
  public materno: string = "";
  public jcodigo: string = "";
  public jnombre: string = "";
  public jpaterno: string = "";
  public jmaterno: string = "";
  public tcodigo: string = "";
  public tnombre: string = "";
  public tpaterno: string = "";
  public tmaterno: string = "";


  constructor(public activeModal: NgbActiveModal, private apiService:
    ClaimsService, private formBuilder: FormBuilder, private datePipe: DatePipe, private modalService: NgbModal) {

    this.inForm = this.formBuilder.group({
      area: [''],
      medico_admistrativo: [''],
      code: [''],
      nombre: [''],
      paterno: [''],
      materno: [''],
      jcode: [''],
      jnombre: [''],
      jpaterno: [''],
      jmaterno: [''],
      area_trasladado: [''],
      pcode: [''],
      pnombre: [''],
      ppaterno: [''],
      pmaterno: [''],
    });

    this.searchInvolucradoForm = this.formBuilder.group({
      pinvolucrado: ['', Validators.required],
    });

    this.searchTrasladadoForm = this.formBuilder.group({
      ptransferido: ['', Validators.required],
    });


  }

  ngOnInit() {
    this.getArea();
    this.areaid = "0" + this.datainInvolucrado.area;
    this.admistrativo = this.datainInvolucrado.medadmin;
    this.codigo = this.datainInvolucrado.code;
    this.nombre = this.datainInvolucrado.nombre;
    this.paterno = this.datainInvolucrado.paterno;
    this.materno = this.datainInvolucrado.materno;
    this.jcodigo = this.datainInvolucrado.jcode;
    this.jnombre = this.datainInvolucrado.jnombre;
    this.jpaterno = this.datainInvolucrado.jpaterno;
    this.jmaterno = this.datainInvolucrado.jmaterno;
    this.tcodigo = this.datainInvolucrado.pcode;
    this.tnombre = this.datainInvolucrado.pnombre;
    this.tpaterno = this.datainInvolucrado.ppaterno;
    this.tmaterno = this.datainInvolucrado.pmaterno;
    this.namearea = this.datainInvolucrado.areaname;
    this.nameareatrasladado = this.datainInvolucrado.area4_name;
    this.areaid2 = this.datainInvolucrado.area_trasladado;

    console.log(this.datainInvolucrado);

  }
  get i() {
    return this.searchInvolucradoForm.controls;
  }
  get t() {
    return this.searchTrasladadoForm.controls;
  }

  onChangeAreaName(cod, event) {
    //console.log(event.target.options[event.target.options.selectedIndex].text);
    if (cod === 1) { this.namearea = event.target.options[event.target.options.selectedIndex].text; }
    if (cod === 2) { this.nameareatrasladado = event.target.options[event.target.options.selectedIndex].text; }

    // console.log(this.name_estado);
  }
  getArea() {
    this.apiService.getAreaServiceV2().then((response: any) => {
      this.listareas = response.length > 0 ? response : [];
      this.getPersonal();
    })
  }

  searchPersonalInvolucrado() {
    this.submittedinvolucrado = true;
    if (this.searchInvolucradoForm.invalid) {
      return;
    }
    const data = {
      names: this.i.pinvolucrado.value,
    }
    this.loading('Realizando Busqueda ...');
    this.apiService.searchInvolucradosService(data).then((response: any) => {
      this.listinvolucrados = response.length > 0 ? response : [];
      Swal.close();
      const modalRef = this.modalService.open(InvolucradoComponent, { size: 'lg' });
      modalRef.componentInstance.datapersonal = this.listinvolucrados;
      modalRef.result.then((result) => {
        this.listpersonal = result.personal;
        this.listjefe = result.jefe;
        this.codigo = this.listpersonal[0]?.Persona;
        this.nombre = this.listpersonal[0]?.Nombres;
        this.paterno = this.listpersonal[0]?.Paterno;
        this.materno = this.listpersonal[0]?.Materno;
        this.jcodigo = this.listjefe[0]?.idSuperior
        this.jnombre = this.listjefe[0]?.SuperiorNombre
        this.jpaterno = this.listjefe[0]?.SuperiorApellidoPaterno
        this.jmaterno = this.listjefe[0]?.SuperiorApellidoMaterno
        console.log(this.listjefe);
      }).catch((error) => {
        console.log(error);
      });
    }, (error) => {
      Swal.close();
    });
  }

  searchPersonalTransferido() {
    this.submittedtransferido = true;
    if (this.searchTrasladadoForm.invalid) {
      return;
    }
    const data = {
      names: this.t.ptransferido.value,
    }
    this.loading('Realizando Busqueda ...');
    this.apiService.getListPersonalService(data).then((response: any) => {
      this.listpersonaltranferido = response.length > 0 ? response : [];
      Swal.close();
      const modalRef = this.modalService.open(PersonalComponent, { size: 'lg' });
      modalRef.componentInstance.datapersonal = this.listpersonaltranferido;
      modalRef.result.then((result) => {
        this.listtransferido = result.personal;
        this.tcodigo = this.listtransferido[0].Persona;
        this.tnombre = this.listtransferido[0].Nombres;
        this.tpaterno = this.listtransferido[0].ApellidoPaterno;
        this.tmaterno = this.listtransferido[0].ApellidoMaterno;
        console.log(this.listtransferido);
      }).catch((error) => {
        console.log(error);
      });
    }, (error) => {
      Swal.close();
    });
  }
  //loading
  getPersonal() {
    var codigo = 0;
    if (this.datainInvolucrado.pcode != "") {
      codigo = this.datainInvolucrado.pcode
    }
    this.apiService.getListPersonalByIdService(codigo).then((response: any) => {
      this.detailpersona = response.length > 0 ? response : [];
      this.tcodigo = this.detailpersona[0]?.Persona;
      this.tnombre = this.detailpersona[0]?.Nombres;
      this.tpaterno = this.detailpersona[0]?.ApellidoPaterno;
      this.tmaterno = this.detailpersona[0]?.ApellidoMaterno;
    }, (error) => {

    });
  }

  updateInvolucradoTranferido() {
    var codido = 0;
    var nombre = "";
    var paterno = "";
    var materno = "";
    var acodido = '';
    var anombre = "";
    var apaterno = "";
    var amaterno = "";
    var formValue = this.inForm.value;
    if (parseInt(formValue.medico_admistrativo) === 1) {
      acodido = formValue.code.toString();
      anombre = formValue.nombre;
      apaterno = formValue.paterno;
      amaterno = formValue.materno;
    } else if (parseInt(formValue.medico_admistrativo) === 2) {
      codido = parseInt(formValue.code);
      nombre = formValue.nombre;
      paterno = formValue.paterno;
      materno = formValue.materno;
    }
    console.log(formValue.medico_admistrativo)
    const data = {
      area: formValue.area,
      areaname: this.namearea,
      cod_involucrado: formValue.code,
      code: codido,
      nombre: nombre,
      paterno: paterno,
      materno: materno,
      acodido: acodido,
      anombre: anombre,
      apaterno: apaterno,
      amaterno: amaterno,
      jcode: formValue.jcode,
      jnombre: formValue.jnombre,
      jpaterno: formValue.jpaterno,
      jmaterno: formValue.jmaterno,
      area_trasladado: formValue.area_trasladado,
      areaname_traslado: this.nameareatrasladado,
      pcode: formValue.pcode,
      pnombre: formValue.pnombre,
      ppaterno: formValue.ppaterno,
      pmaterno: formValue.pmaterno,
      tipo_empresa: this.datainInvolucrado.tipo_empresa,
      idreclamo: this.datainInvolucrado.idreclamo,
    }
    this.loading('Actualizando Informacion...');
    this.apiService.updateReclamoTransferidoService(data).then((response: any) => {
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

  async loading(searchtxt) {
    Swal.fire({
      html: `<h3 style="font-size:12px;text-align: center;">${searchtxt}</h3>`,
      width: '250px',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
  }
  success() {
    Swal.fire({
      title: 'Exitoso!',
      width: '20rem',
      icon: 'success'
    })
  }
}
