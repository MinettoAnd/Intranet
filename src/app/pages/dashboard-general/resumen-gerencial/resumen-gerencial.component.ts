import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../Layout/shared.service';
@Component({
  selector: 'app-resumen-gerencial',
  templateUrl: './resumen-gerencial.component.html',
  styleUrls: ['./resumen-gerencial.component.scss']
})
export class ResumenGerencialComponent implements OnInit {
  collapsed = true;
  active = '1';
  public comercialEstadisticas = true;
  public hospitalizacionEstadisticas = false;
  public emergenciasEstadisticas = false;
  public consultaExternaEstadisticas = false;
  public menuItems: any = [];
  public subMenuItems: any = [];
  public categories: any = [];
  // public categories  = [
  //   {
  //     id: 1,
  //     isDropDownMenu: false,
  //     description: "Afiliados",
  //     subMenuList: []
  //   },
  //   {
  //     id: 2,
  //     isDropDownMenu: true,
  //     description: "Producción",
  //     dropDownTarget: "",
  //     subMenuList: [
  //       {
  //         description : "Hospitalización", 
  //       },
  //      {
  //         description : "Emergencia", 
  //      },
  //      {
  //         description : "Consultas Externas", 
  //      }
  //     ]
  //   }
  // ];
  constructor(private apiService:SharedService ) { }

  ngOnInit() {
    if (localStorage.getItem('access') === '1' || localStorage.getItem('access') === '2' ) {
      this.getModelsUsers();
    } else if (localStorage.getItem('access') === '0') {
      this.getModelsUsers();
    }
  }
  showComponent(id: number) {
    switch (id) {
      case 1:
        this.comercialEstadisticas = true;
        this.hospitalizacionEstadisticas = false;
        this.emergenciasEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 2:
        this.comercialEstadisticas = false;
        this.hospitalizacionEstadisticas = true;
        this.emergenciasEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 3:
        this.comercialEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.emergenciasEstadisticas = true;
        this.consultaExternaEstadisticas = false;
        break;
      case 4:
        this.comercialEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.emergenciasEstadisticas = false;
        this.consultaExternaEstadisticas = true;
        break;
    }
  }
  getModelsAdmin() {
    console.log(localStorage.getItem('idrol'))
    this.apiService.getMenuSidebarAdminService(localStorage.getItem('idrol')).then((response: any) => {
      console.log(496, response)
      let subMenu = [];
      this.subMenuItems = [];
       this.menuItems = response.data.length > 0 ? response.data : [];
       this.menuItems.map(item => {
          if(item.name_model === 'Comercial' || item.name_model === 'Emergencia' || item.name_model === 'Hospitalización' || item.name_model === 'Consultorios'){
            item.rides.map(submenu =>{
              if(submenu.name === 'CO-Estadisticas'){
                const menuItem1 = {
                  id: 1,
                  isDropDownMenu: false,
                  description: "Afiliados",
                  subMenuList: []
                }
                this.categories.push(menuItem1);
              }if( submenu.name === 'EM-Estadísticas'){
                const subMenuItem = {
                  description : "Emergencia", 
                }
                subMenu.push(subMenuItem)
              }if( submenu.name === 'HS-Estadísticas'){
                const subMenuItem = {
                  description : "Hospitalización", 
                }
                subMenu.push(subMenuItem)
              }if( submenu.name === 'CE-Estadísticas'){
                const subMenuItem = {
                  description : "Consultas Externas", 
                }
                subMenu.push(subMenuItem)
              }
              this.subMenuItems = subMenu
            });
            
          }
         
       }) 
       if(this.subMenuItems.length > 0 ){
            const menuItem2 = {
              id: 2,
              isDropDownMenu: true,
              description: "Producción",
              dropDownTarget: "",
              subMenuList: this.subMenuItems
            }
            this.categories.push(menuItem2);
          }
       console.log(514, this.categories);
    });
  }
  getModelsUsers() {
    this.apiService.getMenuSidebarPermissionRoleService(localStorage.getItem('idrol')).then((response: any) => {
      console.log(496, response)
      let subMenu = [];
      this.subMenuItems = [];
       this.menuItems = response.data.length > 0 ? response.data : [];
       this.menuItems.map(item => {
          if(item.name_model === 'Comercial' || item.name_model === 'Emergencia' || item.name_model === 'Hospitalización' || item.name_model === 'Consultorios'){
            item.rides.map(submenu =>{
              if(submenu.name === 'CO-Estadisticas'){
                const menuItem1 = {
                  id: 1,
                  isDropDownMenu: false,
                  description: "Afiliados",
                  subMenuList: []
                }
                this.categories.push(menuItem1);
              }if( submenu.name === 'EM-Estadísticas'){
                const subMenuItem = {
                  description : "Emergencia", 
                }
                subMenu.push(subMenuItem)
              }if( submenu.name === 'HS-Estadísticas'){
                const subMenuItem = {
                  description : "Hospitalización", 
                }
                subMenu.push(subMenuItem)
              }if( submenu.name === 'CE-Estadísticas'){
                const subMenuItem = {
                  description : "Consultas Externas", 
                }
                subMenu.push(subMenuItem)
              }
              this.subMenuItems = subMenu
            });
            
          }
         
       }) 
       if(this.subMenuItems.length > 0 ){
            const menuItem2 = {
              id: 2,
              isDropDownMenu: true,
              description: "Producción",
              dropDownTarget: "",
              subMenuList: this.subMenuItems
            }
            this.categories.push(menuItem2);
          }
       console.log(514, this.categories);
    });
  }
}
