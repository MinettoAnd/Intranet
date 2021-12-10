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
      console.log(this.menuItems);
    });

  }
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getModelsUsers() {
    this.apiService.getMenuSidebarPermissionRoleService(localStorage.getItem('idrol')).then((response: any) => {
      this.menuItems = response.data.length > 0 ? response.data : [];
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
