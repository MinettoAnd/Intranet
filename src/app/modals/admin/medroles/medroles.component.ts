import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/pages/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medroles',
  templateUrl: './medroles.component.html',
  styleUrls: ['./medroles.component.sass']
})
export class MedrolesComponent implements OnInit {
  @Input() dato;
  public permisosabilitados: any = [];
  submitted = false;
  public listassign: any = [];
  moduledata: any = [];
  moduledataupdate: any = [];
  selectedItemsList = [];
  checkedIDs = [];
  public textLoadion: string = "";
  editForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private apiService: AdminService) {
    this.editForm = this.formBuilder.group({
      rolname: ['', Validators.required],
      descripcion: [''],
      acceso_especial: [''],
      acceso_area: [''],
    });
  }

  ngOnInit(): void {
    this.getPermisosModulosA(this.dato.idrol);
    this.getListModuleAssign();
  }
  get f() { return this.editForm.controls; }
  getPermisosModulosA(id) {
    console.log(11, id)
    this.apiService.getPermisosModoleAbilitado(id).then((response: any) => {
      console.log(12, response)
      this.permisosabilitados = response.data.length > 0 ? response.data : [];
      console.log(this.permisosabilitados);
    });
  }

  getListModuleAssign() {
    this.apiService.getListModuleAssign().then((response: any) => {
      console.log(51, response);
      this.listassign = response.data.length > 0 ? response.data : [];
    });
  }

  changeSelection() {
    this.fetchSelectedItems()
    this.moduledata = this.selectedItemsList;
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.listassign.filter((value, index) => {
      return value.isChecked
    });
    console.log(74, this.selectedItemsList);
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.listassign.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
    
  }

  updateRol() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
    const fromValue = this.editForm.value;

    const data = {
      name: fromValue.rolname,
      description: fromValue.descripcion,
      acceso_especial: fromValue.acceso_especial,
      area_access: fromValue.acceso_area,
      idrol: this.dato.idrol,
    }
    this.textLoadion = "Actualizando Rol...";
    this.showLoading();
    this.apiService.updateRoles(data).then((response: any) => {
      console.log('acceso especial', fromValue.acceso_especial)
      if (response.success === 1) {
        if (this.moduledata.length > 0) {
          console.log('delete permiso admin 1')
          this.deletePermisos(1, this.dato.idrol)
        } else if (fromValue.acceso_especial) {
          console.log('delete permisos 01')
          this.deletePermisos(0, this.dato.idrol)
        } else {
          Swal.close();
          this.success();
        }
      } else {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      }
    });
  }
  deletePermisos(state, id) {
    this.apiService.deletePermisosService(id).then((response: any) => {
      if (response.success === 1) {
        Swal.close();
        this.success();
        if (state) {
          console.log('registrnado permisos')
          this.registerRolDetail(id, this.moduledata)
        }

      } else {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      }
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
