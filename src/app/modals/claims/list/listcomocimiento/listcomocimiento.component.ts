import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from 'src/app/pages/claims/claims.service';
import Swal from 'sweetalert2';
import { ConocimientoComponent } from '../../popup/conocimiento/conocimiento.component';

@Component({
  selector: 'app-listcomocimiento',
  templateUrl: './listcomocimiento.component.html',
  styleUrls: ['./listcomocimiento.component.sass']
})
export class ListcomocimientoComponent implements OnInit {
  @Input() dato;
  public listDetalle: any = [];
  public listareas: any = [];
  public especialidades: any = [];
  public listjefes: any = [];
  public hospitalizaciones: any = [];
  public listpersonal: any = [];
  conocimietnoForm: FormGroup;
  searchpersonalForm: FormGroup;
  searchconocimientoForm: FormGroup;
  searchconocimiento2Form: FormGroup;
  searchconocimiento3Form: FormGroup;
  searchJefeForm: FormGroup;

  public submittedpersonal = false;
  public submittedconocimineto1 = false;
  public submittedconocimineto2 = false;
  public submittedconocimineto3 = false;
  public submittedjefe = false;

  public listpersonalsearch: any = [];
  public listconocimiento1: any = [];
  public listconocimiento2: any = [];
  public listconocimiento3: any = [];
  public listjefe: any = [];

  public listresulpersonal: any = [];
  public listresultconocimiento: any = [];
  public listresultconocimiento2: any = [];
  public listresultconocimiento3: any = [];
  public listresultJefe: any = [];

  public tcodigo: string = "";
  public tnombre: string = "";
  public tpaterno: string = "";
  public tmaterno: string = "";

  public ccodigo: string = "";
  public cnombre: string = "";
  public cpaterno: string = "";
  public cmaterno: string = "";

  public c2codigo: string = "";
  public c2nombre: string = "";
  public c2paterno: string = "";
  public c2materno: string = "";

  public c3codigo: string = "";
  public c3nombre: string = "";
  public c3paterno: string = "";
  public c3materno: string = "";

  public jfcodigo: string = "";
  public jfnombre: string = "";
  public jfpaterno: string = "";
  public jfmaterno: string = "";

  public namearea: string = "";
  public listdetailpersonal: any = [];
  public listdetailpersonal1: any = [];
  public listdetailpersonal2: any = [];
  public listdetailpersonal3: any = [];
  public codarea: string = "";
  public admistrativo: number;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private apiService: ClaimsService, private datePipe: DatePipe, private modalService: NgbModal) {

    this.conocimietnoForm = this.formBuilder.group({
      area: ['', Validators.required],
      consultorios_externos: ['', Validators.required],
      hopitalizacion: ['', Validators.required],
      jefe_area: [''],
      medico_admistrativo: [''],

      codpersonal: ['', Validators.required],
      pnombre: [''],
      ppaterno: [''],
      pmaterno: [''],
      medidico: ['', Validators.required],

      codcono: ['', Validators.required],
      cnombre: [''],
      cpaterno: [''],
      cmaterno: [''],

      codcono2: ['', Validators.required],
      c2nombre: [''],
      c2paterno: [''],
      c2materno: [''],

      codcono3: ['', Validators.required],
      c3nombre: [''],
      c3paterno: [''],
      c3materno: [''],

      jfcode: ['', Validators.required],
      jfnombre: [''],
      jfpaterno: [''],
      jfmaterno: [''],


    });
    this.searchpersonalForm = this.formBuilder.group({
      personasearch: ['', Validators.required],
    });
    this.searchconocimientoForm = this.formBuilder.group({
      conocimientotxt: ['', Validators.required],
    });
    this.searchconocimiento2Form = this.formBuilder.group({
      conocimientotxt2: ['', Validators.required],
    });
    this.searchconocimiento3Form = this.formBuilder.group({
      conocimientotxt3: ['', Validators.required],
    });
    this.searchJefeForm = this.formBuilder.group({
      jefesearch: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getArea();
    this.getHospitalizacion();
    this.getDetailReclamo();
  }
  get p() {
    return this.searchpersonalForm.controls;
  }
  get c() {
    return this.searchconocimientoForm.controls;
  }
  get c2() {
    return this.searchconocimiento2Form.controls;
  }
  get c3() {
    return this.searchconocimiento3Form.controls;
  }
  get j() {
    return this.searchJefeForm.controls;
  }
  getDetailReclamo() {
    this.apiService.getReclamoByIdService(this.dato.idreclamo, this.dato.empresa).then((response: any) => {
      this.listDetalle = response.data.length > 0 ? response.data : [];
      this.codarea = "0" + this.listDetalle[0]?.Id_area3_v2;
      this.namearea = this.listDetalle[0]?.area_name;
      this.jfcodigo = this.listDetalle[0]?.v_usuajefe_involucrado;
      this.jfnombre = this.listDetalle[0]?.v_nombrejefe_involucrado;
      this.jfpaterno = this.listDetalle[0]?.v_p_apellidojefe_involucrado;
      this.jfmaterno = this.listDetalle[0]?.v_m_apellidojefe_involucrado;
      if (this.listDetalle[0]?.v_cod_medico != 0) {
        this.admistrativo = 2;
      }
      if (this.listDetalle[0]?.c_afiliado3 != "") {
        this.admistrativo = 1;
      }


    });
  }

  getArea() {
    this.apiService.getAreaServiceV2().then((response: any) => {
      this.listareas = response.length > 0 ? response : [];
      this.getCopnsultorios()
    })
  }

  getCopnsultorios() {
    this.apiService.getEspecialidadService().then((response: any) => {
      this.especialidades = response.length > 0 ? response : [];
      this.getJefeArea();
    });
  }
  getJefeArea() {
    this.apiService.getJefeAreaService().then((response: any) => {
      this.listjefes = response.length > 0 ? response : [];
      this.getPersonal();
    });
  }
  getPersonal() {
    this.apiService.getListPersonalListService().then((response: any) => {
      this.listpersonal = response.length > 0 ? response : [];
      this.getPersonaParaConocimiento();
    });
  }

  getPersonaParaConocimiento() {
    if (this.listDetalle[0]?.v_cod_otrapersona_involucrado != "") {
      console.log(this.listDetalle[0]?.v_cod_otrapersona_involucrado);
      this.apiService.getListPersonalByIdService(this.listDetalle[0]?.v_cod_otrapersona_involucrado).then((response: any) => {
        this.listdetailpersonal = response.length > 0 ? response : [];
        this.tcodigo = this.listdetailpersonal[0]?.Persona;
        this.tnombre = this.listdetailpersonal[0]?.Nombres;
        this.tpaterno = this.listdetailpersonal[0]?.ApellidoPaterno;
        this.tmaterno = this.listdetailpersonal[0]?.ApellidoMaterno;
        this.getPersonaParaConocimiento01();
      });
    } else {
      this.getPersonaParaConocimiento01();
    }

  }
  getPersonaParaConocimiento01() {
    if (this.listDetalle[0]?.v_usu_paracono1 != "") {
      this.apiService.getListPersonalByIdService(this.listDetalle[0]?.v_usu_paracono1).then((response: any) => {
        this.listdetailpersonal1 = response.length > 0 ? response : [];
        this.ccodigo = this.listdetailpersonal1[0]?.Persona;
        this.cnombre = this.listdetailpersonal1[0]?.Nombres;
        this.cpaterno = this.listdetailpersonal1[0]?.ApellidoPaterno + ' ' + this.listdetailpersonal1[0]?.ApellidoMaterno;
        //this.cmaterno = this.listdetailpersonal[0]?.ApellidoMaterno;
        this.getPersonaParaConocimiento02();
      });
    } else {
      this.getPersonaParaConocimiento02();
    }
  }
  getPersonaParaConocimiento02() {
    if (this.listDetalle[0]?.v_usu_paracono2 != "") {
      this.apiService.getListPersonalByIdService(this.listDetalle[0]?.v_usu_paracono2).then((response: any) => {
        this.listdetailpersonal2 = response.length > 0 ? response : [];
        if (response.length > 0) {
          this.c2codigo = this.listdetailpersonal2[0]?.Persona;
          this.c2nombre = this.listdetailpersonal2[0]?.Nombres;
          this.c2paterno = this.listdetailpersonal2[0]?.ApellidoPaterno + ' ' + this.listdetailpersonal2[0]?.ApellidoMaterno;
        }

        //this.c2materno = this.listdetailpersonal[0]?.ApellidoMaterno;
        console.log(this.listdetailpersonal2)
        this.getPersonaParaConocimiento03();
      });
    } else {
      this.getPersonaParaConocimiento03();
    }

  }
  getPersonaParaConocimiento03() {

    if (this.listDetalle[0]?.v_usu_paracono3 != "") {
      this.apiService.getListPersonalByIdService(this.listDetalle[0]?.v_usu_paracono3).then((response: any) => {
        this.listdetailpersonal3 = response.length > 0 ? response : [];
        if (response.length > 0) {
          this.c3codigo = this.listdetailpersonal3[0]?.Persona;
          this.c3nombre = this.listdetailpersonal3[0]?.Nombres;
          this.c3paterno = this.listdetailpersonal3[0]?.ApellidoPaterno + ' ' + this.listdetailpersonal3[0]?.ApellidoMaterno;
        }

        //this.c2materno = this.listdetailpersonal[0]?.ApellidoMaterno;
      });
    }
  }


  getHospitalizacion() {
    this.apiService.getHospitalizacionService().then((response: any) => {
      this.hospitalizaciones = response.data.length > 0 ? response.data : [];

    });
  }
  onChangeAreaName(event) {
    //console.log(event.target.options[event.target.options.selectedIndex].text);
    this.namearea = event.target.options[event.target.options.selectedIndex].text;
    // console.log(this.name_estado);
  }

  searchPeraConocimiento(id) {
    if (id == 1) {
      this.submittedpersonal = true;
      if (this.searchpersonalForm.invalid) {
        return;
      }
      const data = {
        names: this.p.personasearch.value,
      }
      this.loading('Realizando Busqueda ...');
      this.apiService.searchInvolucradosService(data).then((response: any) => {
        this.listpersonalsearch = response.length > 0 ? response : [];
        Swal.close();
        const modalRef = this.modalService.open(ConocimientoComponent, { size: 'lg' });
        modalRef.componentInstance.datapersonal01 = this.listpersonalsearch;
        modalRef.result.then((result) => {
          if (result.cod === 1) {
            this.listresulpersonal = result.persona01;
            this.tcodigo = this.listresulpersonal[0]?.Persona
            this.tnombre = this.listresulpersonal[0]?.Nombres
            this.tpaterno = this.listresulpersonal[0]?.Paterno
            this.tmaterno = this.listresulpersonal[0]?.Materno
          }
        }).catch((error) => {
          console.log(error);
        });
      }, (error) => {
        Swal.close();
      });
    }
    if (id == 2) {
      this.submittedconocimineto1 = true;
      if (this.searchconocimientoForm.invalid) {
        return;
      }
      const data = {
        names: this.c.conocimientotxt.value,
      }
      this.loading('Realizando Busqueda ...');
      this.apiService.searchInvolucradosService(data).then((response: any) => {
        this.listconocimiento1 = response.length > 0 ? response : [];
        Swal.close();
        const modalRef = this.modalService.open(ConocimientoComponent, { size: 'lg' });
        modalRef.componentInstance.datapersonal02 = this.listconocimiento1;
        modalRef.result.then((result) => {
          if (result.cod === 2) {
            this.listresultconocimiento = result.persona02;
            this.ccodigo = this.listresultconocimiento[0]?.Persona
            this.cnombre = this.listresultconocimiento[0]?.Nombres
            this.cpaterno = this.listresultconocimiento[0]?.Paterno
            this.cmaterno = this.listresultconocimiento[0]?.Materno
          }
        }).catch((error) => {
          console.log(error);
        });
      }, (error) => {
        Swal.close();
      });
    }
    if (id == 3) {
      this.submittedconocimineto2 = true;
      if (this.searchconocimiento2Form.invalid) {
        return;
      }
      const data = {
        names: this.c2.conocimientotxt2.value,
      }
      this.loading('Realizando Busqueda ...');
      this.apiService.searchInvolucradosService(data).then((response: any) => {
        this.listconocimiento2 = response.length > 0 ? response : [];
        Swal.close();
        const modalRef = this.modalService.open(ConocimientoComponent, { size: 'lg' });
        modalRef.componentInstance.datapersonal03 = this.listconocimiento2;
        modalRef.result.then((result) => {
          if (result.cod === 3) {
            this.listresultconocimiento2 = result.persona03;
            this.c2codigo = this.listresultconocimiento2[0]?.Persona
            this.c2nombre = this.listresultconocimiento2[0]?.Nombres
            this.c2paterno = this.listresultconocimiento2[0]?.Paterno
            this.c2materno = this.listresultconocimiento2[0]?.Materno
            console.log(result)
          }
        }).catch((error) => {
          console.log(error);
        });
      }, (error) => {
        Swal.close();
      });
    }
    if (id == 4) {
      this.submittedconocimineto3 = true;
      if (this.searchconocimiento3Form.invalid) {
        return;
      }
      const data = {
        names: this.c3.conocimientotxt3.value,
      }
      this.loading('Realizando Busqueda ...');
      this.apiService.searchInvolucradosService(data).then((response: any) => {
        this.listconocimiento3 = response.length > 0 ? response : [];
        Swal.close();
        const modalRef = this.modalService.open(ConocimientoComponent, { size: 'lg' });
        modalRef.componentInstance.datapersonal04 = this.listconocimiento3;
        modalRef.result.then((result) => {
          if (result.cod === 4) {
            this.listresultconocimiento3 = result.persona04;
            this.c3codigo = this.listresultconocimiento3[0]?.Persona
            this.c3nombre = this.listresultconocimiento3[0]?.Nombres
            this.c3paterno = this.listresultconocimiento3[0]?.Paterno
            this.c3materno = this.listresultconocimiento3[0]?.Materno
          }
        }).catch((error) => {
          console.log(error);
        });
      }, (error) => {
        Swal.close();
      });
    }
    if (id == 5) {
      this.submittedjefe = true;
      if (this.searchJefeForm.invalid) {
        return;
      }
      const data = {
        names: this.j.jefesearch.value,
      }
      this.loading('Realizando Busqueda ...');
      this.apiService.searchJefeService(data).then((response: any) => {
        this.listjefe = response.length > 0 ? response : [];
        Swal.close();
        const modalRef = this.modalService.open(ConocimientoComponent, { size: 'lg' });
        modalRef.componentInstance.datapersonal05 = this.listjefe;
        modalRef.result.then((result) => {
          if (result.cod === 5) {
            this.listresultJefe = result.persona05;
            this.jfcodigo = this.listresultJefe.Persona
            this.jfnombre = this.listresultJefe.Nombres
            this.jfpaterno = this.listresultJefe.ApellidoPaterno
            this.jfmaterno = this.listresultJefe.ApellidoMaterno
          }
        }).catch((error) => {
          console.log(error);
        });
      }, (error) => {
        Swal.close();
      });
    }
  }

  updateParaConocimiento() {
    var formValue = this.conocimietnoForm.value;
    var codido = 0;
    var nombre = "";
    var paterno = "";
    var materno = "";
    var acodido = '';
    var anombre = "";
    var apaterno = "";
    var amaterno = "";
    if (parseInt(formValue.medico_admistrativo) === 1) {
      acodido = formValue.codpersonal.toString();
      anombre = formValue.pnombre;
      apaterno = formValue.ppaterno;
      amaterno = formValue.pmaterno;
    } else if (parseInt(formValue.medico_admistrativo) === 2) {
      codido = parseInt(formValue.codpersonal);
      nombre = formValue.pnombre;
      paterno = formValue.ppaterno;
      materno = formValue.pmaterno;
    }
    const data = {
      area: formValue.area,
      namearea: this.namearea,
      consultorios_externos: formValue.consultorios_externos,
      hopitalizacion: formValue.hopitalizacion,

      jfcode: formValue.jfcode,
      jfnombre: formValue.jfnombre,
      jfpaterno: formValue.jfpaterno,
      jfmaterno: formValue.jfmaterno,

      cod_involucrado: formValue.codpersonal,

      acodpersonal: acodido,
      apnombre: anombre,
      appaterno: apaterno,
      apmaterno: amaterno,

      codpersonal: codido,
      pnombre: nombre,
      ppaterno: paterno,
      pmaterno: materno,
      //medidico: formValue.medidico,
      codcono: formValue.codcono,
      cnombre: formValue.cnombre,
      cpaterno: formValue.cpaterno,
      //cmaterno: formValue.cmaterno,
      codcono2: formValue.codcono2,
      c2nombre: formValue.c2nombre,
      c2paterno: formValue.c2paterno,
      //c2materno: formValue.c2materno,
      codcono3: formValue.codcono3,
      c3nombre: formValue.c3nombre,
      c3paterno: formValue.c3paterno,
      // c3materno: formValue.c3materno,
      tipo_empresa: this.dato.empresa,
      idreclamo: this.dato.idreclamo,
    }
    this.loading('Actualizando Informacion...');
    this.apiService.updateReclamoParaConociminetoService(data).then((response: any) => {
      Swal.close();
      this.getDetailReclamo();
      this.success();
    }, (error) => {
      Swal.close();
      Swal.fire('Error!', 'Intentar nuevamente', 'error');
    });

  }

  //loading
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
