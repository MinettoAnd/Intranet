import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/pages/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mroles',
  templateUrl: './mroles.component.html',
  styleUrls: ['./mroles.component.sass']
})
export class MrolesComponent implements OnInit {
  public listassign: any = [];
  rolForm: FormGroup;
  submitted = false;

  moduledata: any = [];
  moduledataupdate: any = [];
  selectedItemsList = [];
  checkedIDs = [];

  public textLoadion: string = "";
  constructor(public activeModal: NgbActiveModal, private apiService: AdminService,
    private formBuilder: FormBuilder) {
    this.rolForm = this.formBuilder.group({
      rolname: ['', Validators.required],
      descripcion: [''],
      acceso_especial: [''],
      acceso_area: ['']
    });
  }

  ngOnInit() {
    this.getListModuleAssign();
  }
  get f() { return this.rolForm.controls; }

  getListModuleAssign() {
    this.apiService.getListModuleAssign().then((response: any) => {
      this.listassign = response.data.length > 0 ? response.data : [];
    });
  }
  changeSelection() {
    this.fetchSelectedItems()
    this.moduledata = this.selectedItemsList;
    console.log(this.moduledata);
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.listassign.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.listassign.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }
  createRol() {
    this.submitted = true;

    if (this.rolForm.invalid) {
      return;
    }
    const fromValue = this.rolForm.value;

    this.textLoadion = "Creando Rol...";
    this.showLoading();
    const data = {
      name: fromValue.rolname,
      description: fromValue.descripcion,
      acceso_especial: fromValue.acceso_especial,
      area_access: fromValue.acceso_area,
    }
    // console.log(data, this.moduledata)
    this.apiService.postRolesServices(data).then((response: any) => {
      if (response.success === 1) {
        console.log(response)
        this.registerRolDetail(response.data[0].idrol, this.moduledata);

      } else {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      }
    }, (error) => {
      Swal.close();
      Swal.fire('Error!', 'No se pudo realizar  el registro', 'error');
    });
  }

  registerRolDetail(rol, datos) {
    const data = {
      idrol: rol,
      arraydata: datos
    }
    console.log(data);
    this.apiService.postModulosRoutesServices(data).then((response: any) => {
      if (response.success === 1) {
        Swal.close();
        const data = {
          success: 1
        }
        this.activeModal.close(data)
        this.success();

      } else {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      }
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
