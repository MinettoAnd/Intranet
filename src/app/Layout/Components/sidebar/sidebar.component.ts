import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  public menuItems: any = [];
  public activate: string = "";
  public isCollapsed: boolean = false;
  public Nombre: string = "";
  public Apellido: string = "";
  public Cargo: string = "";
  public selected: boolean = false;
  adminmenu = false;
  usersmenu = false;
  message: string;
  menu = [
    {
        "title": "ADMIN",
        "menu": "adminMenu",
        "name_model": "Autenticación",
        "icon": "vsm-icon pe-7s-id",
        "rides": [
                {
                    "name": "Usuarios",
                    "icon": "fa fa-user",
                    "header": "",
                    "url": "admin/users",
                    "isChecked": true
                },
                {
                    "name": "Roles",
                    "icon": "fa fa-users",
                    "header": "",
                    "url": "admin/roles",
                    "isChecked": true
                }
            ]
    },
    {
        "title": "RECURSOS HUMANOS\r\n",
        "menu": "recursosMenu",
        "name_model": "RRHH",
        "icon": "vsm-icon pe-7s-users",
        "rides": [
                {
                    "name": "Colaboradores",
                    "icon": "fa fa-users",
                    "header": "RRHH - COLABORADORES",
                    "url": "rrhh/collaborators",
                    "isChecked": true
                }
            ]
    },
    {
        "title": "GESTIÓN DE RECLAMOS\r\n",
        "menu": "claimsMenu",
        "name_model": "Reclamos",
        "icon": "vsm-icon pe-7s-portfolio",
        "rides": [
            {
                "name": "Csalud-Iafas",
                "icon": "fa fa-book",
                "header": "Reclamos - CSALUD IAFAS",
                "url": "claims/iafas",
                "isChecked": true
            },
            {
                "name": "Cms-Ipress",
                "icon": "fa fa-book",
                "header": "Reclamos - CMS IPRESS",
                "url": "claims/ipress",
                "isChecked": true
            },
            {
                "name": "Portal-Web",
                "icon": "fa fa-book",
                "header": "Reclamos Portal Web",
                "url": "claims/portal",
                "isChecked": true
            }
        ]
    },
    {
        "title": "REPORTES",
        "menu": "reportMenu",
        "name_model": "Reportes",
        "icon": "vsm-icon pe-7s-wallet",
        "rides": [
            {
                "name": "Directores",
                "icon": "fa fa-book",
                "header": "Envio de Mensajes",
                "url": "report/send",
                "isChecked": true
            }
        ]
    },
    {
        "title": "CSALUD",
        "menu": "reportCsalud",
        "name_model": "Reporte",
        "icon": "vsm-icon pe-7s-wallet",
        "rides": [
            {
                "name": "Csalud",
                "icon": "fa fa-book",
                "header": "Csalud - Reportes",
                "url": "reportcsalud",
                "isChecked": true
            }
        ]
    },
    {
        "title": "ENCUESTA",
        "menu": "encuestaMenu",
        "name_model": "Encuesta",
        "icon": "vsm-icon pe-7s-wallet",
        "rides": [
                {
                    "name": "Registro",
                    "icon": "fa fa-book",
                    "header": "ENCUESTA",
                    "url": "encuesta/encuesta",
                    "isChecked": true
                },
                {
                    "name": "Reporte",
                    "icon": "fa fa-book",
                    "header": "Reporte - ENCUESTA",
                    "url": "encuesta/reportencuesta",
                    "isChecked": true,
                    "Team": [{
                    
                                "TeamId": "GP3 Parent 4 Child 1"
                                },
                            {
                                "TeamId": "GP3 Parent 4 Child 2"
                            }
                        ]
                }
        ]
    }
]
  subscription: Subscription;
  constructor(public globals: ThemeOptions, private activatedRoute: ActivatedRoute, private apiService: SharedService, private router: Router) {

  }

  @select('config') public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;
    this.subscription = this.apiService.currentMessage.subscribe(message => this.message = message);
    if (localStorage.getItem('access') === '1') {
      this.getModelsAdmin();
    } else if (localStorage.getItem('access') === '0') {
      this.getModelsUsers();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getModelsAdmin() {
    this.apiService.getMenuSidebarAdminService().then((response: any) => {
      this.menuItems = response.data.length > 0 ? response.data : [];
    });

  }
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getModelsUsers() {
    this.apiService.getMenuSidebarPermissionRoleService(localStorage.getItem('idrol')).then((response: any) => {
      this.menuItems = response.data.length > 0 ? response.data : [];
      console.log(this.menuItems);
    });

  }
  goRutePagesHeaderTitle(title) {
    console.log(title)
    localStorage.setItem('title', title)
    this.apiService.changeMessage(title)
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
        this.router.navigate(['/signin']);
      }
    });
  }

}
