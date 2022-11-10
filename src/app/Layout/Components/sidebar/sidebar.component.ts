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

tabSelected = [];
tabChild = [];
laptop;
menu;
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
    this.getLaptop();
    this.setDefaultTabSelected();
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
  getLaptop(){
    this.menu = [
      {
          "title": "ADMIN",
          "menu": "adminMenu",
          "name_model": "Facturación",
          "icon": "vsm-icon pe-7s-id",
          "rides": [
                  {
                      "name": "Dashboard",
                      "icon": "fa fa-user",
                      "header": "",
                      "url": "admin/users",
                      "isChecked": true
                  },
                  {
                      "name": "Producción",
                      "icon": "fa fa-users",
                      "header": "",
                      "url": "admin/roles",
                      "isChecked": true
                  },
                  {
                    "name": "Expedientes",
                    "icon": "fa fa-users",
                    "header": "",
                    "url": "admin/roles",
                    "isChecked": true
                  },
                  {
                    "name": "Consulta de Tarifario",
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
          "name_model": "Imágenes",
          "icon": "vsm-icon pe-7s-users",
          "rides": [
                  {
                      "name": "Producción",
                      "icon": "fa fa-users",
                      "header": "RRHH - COLABORADORES",
                      "url": "rrhh/collaborators",
                      "isChecked": true
                  },
                  {
                    "name": "Impresión de Informes",
                    "icon": "fa fa-users",
                    "header": "RRHH - COLABORADORES",
                    "url": "rrhh/collaborators",
                    "isChecked": true
                  },
                  {
                    "name": "Consulta de Atención",
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
          "name_model": "Terapia Física",
          "icon": "vsm-icon pe-7s-portfolio",
          "rides": [
              {
                  "name": "Csalud-Iafas",
                  "icon": "fa fa-book",
                  "header": "Producción",
                  "url": "claims/iafas",
                  "isChecked": true
              },
              
          ]
      },
      {
          "title": "REPORTES",
          "menu": "reportMenu",
          "name_model": "Recursos Humanos",
          "icon": "vsm-icon pe-7s-wallet",
          "rides": [
              {
                  "name": "Dashboard",
                  "icon": "fa fa-book",
                  "header": "Envio de Mensajes",
                  "url": "report/send",
                  "isChecked": true
              },
              {
                "name": "Consulta de Colaboradores",
                "icon": "fa fa-book",
                "header": "Consulta de Colaboradores",
                "url": "claims/ipress",
                "isChecked": true
              },
              {
                  "name": "Consulta de Colaboradores Nuevos",
                  "icon": "fa fa-book",
                  "header": "Consulta de Colaboradores Nuevos",
                  "url": "claims/portal",
                  "isChecked": true
              },
              {
                "name": "Consulta de Cumpleaños",
                "icon": "fa fa-book",
                "header": "Consulta de Cumpleaños",
                "url": "claims/portal",
                "isChecked": true
              },
              {
                "name": "Boletas de Pago",
                "icon": "fa fa-book",
                "header": "Boletas de Pago",
                "url": "claims/portal",
                "isChecked": true
              },
              {
                "name": "Acuerdos de Confidencialidad",
                "icon": "fa fa-book",
                "header": "Acuerdos de Confidencialidad",
                "url": "claims/portal",
                "isChecked": true
              },
              {
                "name": "Planilla",
                "icon": "fa fa-book",
                "header": "Planilla",
                "url": "claims/portal",
                "isChecked": true
              },
              {
                "name": "Indicadores",
                "icon": "fa fa-book",
                "header": "Indicadores",
                "url": "claims/portal",
                "isChecked": true
              }
          ]
      },
      {
          "title": "CSALUD",
          "menu": "tesoreria",
          "name_model": "Tesorería",
          "icon": "vsm-icon pe-7s-wallet",
          "rides": [
              {
                  "name": "Cobranza Diaria",
                  "icon": "fa fa-book",
                  "header": "Csalud - Reportes",
                  "url": "reportcsalud",
                  "isChecked": true
              },
              {
                "name": "Consulta de Pagos por APP Movil",
                "icon": "fa fa-book",
                "header": "Csalud - Reportes",
                "url": "reportcsalud",
                "isChecked": true
              }
          ]
      },
      {
        "title": "ENCUESTA",
        "menu": "susalud",
        "name_model": "SUSALUD",
        "url": "encuesta/encuesta",
        "icon": "vsm-icon pe-7s-wallet",
        "isChecked": true
      },
      {
          "title": "ENCUESTA",
          "menu": "laboratorio",
          "name_model": "Laboratorio",
          "icon": "vsm-icon pe-7s-wallet",
          "rides": [
                  {
                      "name": "Dashboard",
                      "icon": "fa fa-book",
                      "header": "ENCUESTA",
                      "url": "encuesta/encuesta",
                      "isChecked": true
                  },
                  {
                      "name": "Producción",
                      "icon": "fa fa-book",
                      "menu": "produccion",
                      "header": "Reporte - ENCUESTA",
                      // "isChecked": true,
                      "Team": [{
                      
                                  "name": "GP3 Parent 4 Child 1",
                                  "icon": "fa fa-book",
                                  "header": "Reporte - ENCUESTA",
                                  "url": "encuesta/reportencuesta",
                                  "isChecked": true,
                                  },
                              {
                                  "name": "GP3 Parent 4 Child 2",
                                  "icon": "fa fa-book",
                                  "header": "Reporte - ENCUESTA",
                                  "url": "encuesta/reportencuesta",
                                  "isChecked": true,
                              }
                          ]
                  },
                  {
                    "name": "Pago entre Empresas BioHealth",
                    "icon": "fa fa-book",
                    "menu": "pagoEntreEmpresasBioHealth",
                    "header": "Reporte - ENCUESTA",
                    // "isChecked": true,
                    "Team": [{
                    
                              "name": "GP3 Parent 4 Child 1",
                              "icon": "fa fa-book",
                              "header": "Reporte - ENCUESTA",
                              "url": "encuesta/reportencuesta",
                              "isChecked": true,
                              },
                          {
                              "name": "GP3 Parent 4 Child 2",
                              "icon": "fa fa-book",
                              "header": "Reporte - ENCUESTA",
                              "url": "encuesta/reportencuesta",
                              "isChecked": true,
                          }
                        ]
                  }
          ]
      },
      {
        "title": "ENCUESTA",
        "menu": "encuestaMenu",
        "name_model": "Legal",
        "url": "encuesta/encuesta",
        "icon": "vsm-icon pe-7s-wallet",
        "isChecked": true
      },
      {
        "title": "CSALUD",
        "menu": "reportCsalud",
        "name_model": "Procedimientos",
        "icon": "vsm-icon pe-7s-wallet",
        "rides": [
            {
                "name": "Dashboard",
                "icon": "fa fa-book",
                "header": "Csalud - Reportes",
                "url": "reportcsalud",
                "isChecked": true
            },
            {
              "name": "Producción",
              "icon": "fa fa-book",
              "header": "Csalud - Reportes",
              "url": "reportcsalud",
              "isChecked": true
            }
        ]
      },
  ];
    
  }
  
  setDefaultTabSelected() {

    this.tabSelected = [];
    
    for (let i in this.menu.children) {
      console.log(12, this.menu.children[i].name);
      if (this.menu.children[i].name != "Accessories") {
        this.tabSelected.push(this.menu.children[i].children[0].id);
        if (this.menu.children[i].name != "None") {
          // this.OptionSelected.push(this.information[0].children[i].children[0]);
        }
      }
    }

    for (let i in this.tabSelected) {
      console.log(this.tabSelected[i]);
    }

  }
  
  
  toggleItem(j) {
    console.log(j)
    console.log(this.menu.rides[j]);
    this.menu.rides[j].open = !this.menu.rides[j].open
  }


  setClickedRow(j, k) {

    console.log(this.tabSelected.indexOf(this.menu.children[j].children[k].id) > -1);
    //console.log("into function");
    this.tabSelected[0] = 1;
    
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
