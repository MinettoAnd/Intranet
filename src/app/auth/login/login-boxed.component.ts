import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Layout/shared.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginBoxedComponent implements OnInit {
  public profiles: any = [];
  public userslist: any = [];
  public listrol: any = [];
  public acceso = 0;
  loginForm: FormGroup;
  submitted = false;
  message: string;
  subscription: Subscription;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private apiService: AuthService,
    private sharedService: SharedService,
    private datePipe: DatePipe) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.subscription = this.sharedService.currentMessage.subscribe(message => this.message = message)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get f() {

    return this.loginForm.controls;
  }

  onSubmit() {
    localStorage.setItem('title', 'Aplicativo Web')
    this.sharedService.changeMessage("Aplicativo Web")
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const data = {
      username: this.f.username.value,
      password: this.f.password.value,
    };
    this.loading();
    this.apiService.postLoginService(data).then(
      (response: any) => {
        console.log(response);
        if (response.respuesta === 'True') {
          this.getProfileUser(this.f.username.value);
          localStorage.setItem('username', this.f.username.value);
          localStorage.setItem('valuelogin', '1');

        } else {
          Swal.close();
          this.errorLogin("Contraseña o usuario incorrecto!");
        }
      },
      (error) => {
        Swal.close();
        Swal.fire('Error!', 'Problemas con la conexión', 'error');
      }
    );
  }
  getProfileUser(username) {
    const data = {
      username: username,
    };
    this.apiService.getProfileUserService(data).then((response: any) => {
      this.profiles = response.length > 0 ? response : [];
      var splitted = this.profiles[0]?.Nombres.split(" ", 2);
      console.log(splitted)
      localStorage.setItem('Nombres', splitted[0]);
      localStorage.setItem('Apellidos', this.profiles[0]?.Apellidos);
      localStorage.setItem('name_area', this.profiles[0]?.DES_AREAS);
      localStorage.setItem('cargo', this.profiles[0]?.DES_CARGO);
      localStorage.setItem('cod_user', this.profiles[0]?.Persona)
      localStorage.setItem('id_area', this.profiles[0]?.id_area);
      localStorage.setItem('sede', this.profiles[0]?.Sucursal);
      if (this.profiles[0]?.id_area === '02060603') {
        localStorage.setItem('id_areav2', '20603');
      } else {
        localStorage.setItem('id_areav2', '0');
      }
      this.getUserdata()
      console.log('profile', this.profiles);
    });
  }
  getUserdata() {
    this.apiService.getUserBrIdService(this.profiles[0]?.Persona).then((response: any) => {
      this.userslist = response.data.length > 0 ? response.data : [];
      if (response.success == 1 && this.userslist.length > 0) {
        //console.log(this.userslist)
        Swal.close();
        this.getRoles(this.userslist[0]?.idrol, this.profiles[0]?.Persona);
        //this.router.navigate(['./dashboard/default']);
      }
      else {
        this.registerUserData();
        //this.InfoLogin();
        console.log("registro usuario")
      }
    });
  }

  registerUserData() {
    const data = {
      userSpring: this.profiles[0]?.Persona,
      firtname: this.profiles[0]?.Nombres,
      lastname: this.profiles[0]?.Apellidos,
      area: this.profiles[0]?.DES_AREAS,
      idrol: 0,
      fecha: this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
    }
    this.apiService.postUserService(data).then((response: any) => {
      var lista = response.data.length > 0 ? response.data : [];
      if (response.success == 1) {

        this.getRoles(lista[0].idrol, this.profiles[0]?.Persona);

      }
    }, (error) => {
      Swal.close();
      this.errorLogin("Error en la validacion de datos");
    });
  }


  getRoles(idrol, persona) {
    this.apiService.getRolesByService(idrol, persona).then((response: any) => {
      this.listrol = response.data.length > 0 ? response.data : [];
      localStorage.setItem('token', response.token);
      if (this.listrol[0]?.special_access == 0) {
        this.acceso = 0;
      } else {
        this.acceso = this.listrol[0]?.special_access
      }
      console.log('lista rol', response);
      Swal.close();
      if (response.data.length > 0) {

        localStorage.setItem('access', this.acceso.toString());
        localStorage.setItem('access_area', this.listrol[0]?.area_access);
        localStorage.setItem('idrol', this.listrol[0]?.idrol);
        this.router.navigate(['/default']);
      } else {
        this.InfoLogin();
      }
    })
  }

  async loading() {
    Swal.fire({
      text: 'Validando ...',
      width: '200px',
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });
  }

  async errorLogin(text) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    });
  }

  async InfoLogin() {
    Swal.fire({
      icon: 'info',
      title: 'Acceso Denegado...',
      text: 'Usted no tiene permisos asignados para la aplicación web!',
    });
  }
}
