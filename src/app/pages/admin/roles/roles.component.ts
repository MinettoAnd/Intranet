import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedrolesComponent } from 'src/app/modals/admin/medroles/medroles.component';
import Swal from 'sweetalert2';
import { Roles } from '../../models/admin/rol';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements OnInit {
  heading = 'Roles';
  subheading = 'Gestion de roles';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  component = 'roles';

  page = 1;
  pageSize = 10;
  collectionSize;
  roleslist: Roles[];
  public roles: any = [];
  public textLoadion: string = "";
  constructor(private modalService: NgbModal, private apiService: AdminService) { }

  ngOnInit(): void {
    this.getRoles();
  }
  getRoles() {
    this.apiService.getRolesServices().then((response: any) => {
      this.roles = response.data.length > 0 ? response.data : [];
      this.collectionSize = this.roles.length;
      this.refreshCountries();
    });
  }
  refreshCountries() {
    this.roleslist = this.roles
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  editdModal(data) {
    const modalRef = this.modalService.open(MedrolesComponent, { size: 'lg' });
    modalRef.componentInstance.dato = data;
    modalRef.result.then((result) => {
      if (result.success === 1) {
        this.getRoles();
      }

    }).catch((error) => {
      console.log(error);
    });
  }

  showDelete(id) {
    Swal.fire({
      icon: 'warning',
      title: 'Esta seguro de realizar esta acción?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteModulosPermisosService(id)
      }
    })
  }


  deleteModulosPermisosService(id) {
    this.textLoadion = "Eliminanado Rol...";
    this.showLoading();
    this.apiService.deleteModulosPermisosService(id).then((response: any) => {
      if (response.success === 1) {
        Swal.close();
        this.success();
        this.getRoles();

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
