import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/layout/shared.service';
import { ThemeOptions } from '../../../../../theme-options';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  public Nombre: string = "";
  public Apellido: string = "";
  public Area: string = "";
  message: string;
  subscription: Subscription;
  constructor(public globals: ThemeOptions, private router: Router, private apiService: SharedService) {
  }

  ngOnInit() {
    this.Nombre = localStorage.getItem('Nombres');
    this.Apellido = localStorage.getItem('Apellidos');
    this.Area = localStorage.getItem('name_area');
    this.subscription = this.apiService.currentMessage.subscribe(message => this.message = message)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  cerrarSesion() {
    Swal.fire({
      html: '<p>Esta seguro de Cerrar su Sesion?</p>',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.apiService.logout();
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
