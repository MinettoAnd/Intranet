import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MusersComponent } from 'src/app/modals/admin/musers/musers.component';
import Swal from 'sweetalert2';
import { Users } from '../../models/admin/user';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  heading = 'Usuarios';
  subheading = 'Gestion de usuarios';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  component = 'users';

  public listusers: any = [];
  public listroles: any = [];
  public ediroles: any = [];
  public listsearchuser: any = [];
  submittedregister = false;
  public textLoadion: string = "";
  page = 1;
  pageSize = 20;
  collectionSize;
  submittedsearh = false;
  userslist: Users[];
  search;
  constructor(private modalService: NgbModal, private apiService: AdminService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getUserListService().then((response: any) => {
      this.listusers = response.data.length > 0 ? response.data : [];
      // console.log(this.listusers);
      this.collectionSize = this.listusers.length;
      this.refreshCountries();
    });
  }
  refreshCountries() {
    this.userslist = this.listusers
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
        this.deleteUser(id)
      }
    })
  }
  deleteUser(id) {
    this.textLoadion = "Eliminando User...";
    this.showLoading();
    this.apiService.deleteUserService(id).then((response: any) => {
      if (response.success === 1) {
        Swal.close();
        this.success();
        this.getUserList();
      } else {
        Swal.close();
        Swal.fire('Error!', 'Intentar nuevamente', 'error');
      }
    }).catch((err) => {

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
  open(user) {
    const data = {
      isRegister: 2,
      iduser: user.user_id,
      idrol: user.idrol,
      nombre: user.firtname,
      apellidos: user.lastname,
      area: user.area
    }
    const modalRef = this.modalService.open(MusersComponent);
    modalRef.componentInstance.dato = data;
    modalRef.result.then((result) => {
      console.log(result);
      if (result.success === 1) {
        this.getUserList();
      }

    }).catch((error) => {
      console.log(error);
    });
  }
}
