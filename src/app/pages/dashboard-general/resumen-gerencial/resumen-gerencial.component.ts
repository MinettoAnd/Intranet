import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../layout/shared.service';
@Component({
  selector: 'app-resumen-gerencial',
  templateUrl: './resumen-gerencial.component.html',
  styleUrls: ['./resumen-gerencial.component.scss']
})
export class ResumenGerencialComponent implements OnInit {
  collapsed = true;
  active = '1';
  public comercialEstadisticas = true;
  public ingresosEstadisticas = false;
  public hospitalizacionEstadisticas = false;
  public emergenciasEstadisticas = false;
  public consultaExternaEstadisticas = false;
  public jpric = false;
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
      this.getModelsAdmin();
    } else if (localStorage.getItem('access') === '0') {
      this.getModelsUsers();
    }
  }
  showComponent(id: number) {
    console.log(54, id)
    switch (id) {
      case 1:
        this.comercialEstadisticas = true;
        this.ingresosEstadisticas = false;
        this.jpric = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 2:
        this.comercialEstadisticas = false;
        this.ingresosEstadisticas = true;
        this.jpric = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 3:
        this.comercialEstadisticas = false;
        this.ingresosEstadisticas = false;
        this.jpric = true;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 4:
        this.comercialEstadisticas = false;
        this.ingresosEstadisticas = false;
        this.jpric = false;
        this.emergenciasEstadisticas = true;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 5:
        this.comercialEstadisticas = false;
        this.ingresosEstadisticas = false;
        this.jpric = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = true;
        this.consultaExternaEstadisticas = false;
        break;
      case 6:
        this.comercialEstadisticas = false;
        this.ingresosEstadisticas = false;
        this.jpric = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
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
          if(item.name_model === 'Comercial' || item.name_model === 'Tesoreria' || item.name_model === 'Emergencia' || item.name_model === 'Hospitalización' || item.name_model === 'Consultorios'){
            item.rides.map(submenu =>{
              if(submenu.name === 'CO-Estadisticas'){
                const menuItem1 = {
                  id: 1,
                  isDropDownMenu: false,
                  description: "Afiliados",
                  subMenuList: []
                }
                this.categories.push(menuItem1);
              }
              if(submenu.name === 'ING-Estadisticas'){
                const menuItem2 = {
                  id: 2,
                  isDropDownMenu: false,
                  description: "Ingresos",
                  subMenuList: []
                }
                this.categories.push(menuItem2);
                // this.categories.push(menuItem1);
              }
              if( submenu.name === 'EM-Estadísticas'){
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
      const menuItem3 = {
        id: 3,
        isDropDownMenu: false,
        description: "JPRIC",
        subMenuList: []
      }
       this.categories.push(menuItem3);
       if(this.subMenuItems.length > 0 ){
            const menuItem4 = {
              id: 4,
              isDropDownMenu: true,
              description: "Producción",
              dropDownTarget: "",
              subMenuList: this.subMenuItems
            }
            this.categories.push(menuItem4);
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
          if(item.name_model === 'Comercial' || item.name_model === 'Tesoreria' || item.name_model === 'Emergencia' || item.name_model === 'Hospitalización' || item.name_model === 'Consultorios'){
            item.rides.map(submenu =>{
              if(submenu.name === 'CO-Estadisticas'){
                const menuItem1 = {
                  id: 1,
                  isDropDownMenu: false,
                  description: "Ingresos",
                  subMenuList: []
                }
                this.categories.push(menuItem1);
                // this.categories.push(menuItem1);
              }
              if(submenu.name === 'ING-Estadisticas'){
                const menuItem2 = {
                  id: 2,
                  isDropDownMenu: false,
                  description: "Ingresos",
                  subMenuList: []
                }
                this.categories.push(menuItem2);
                // this.categories.push(menuItem1);
              }
              if( submenu.name === 'EM-Estadísticas'){
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
       const menuItem3 = {
        id: 3,
        isDropDownMenu: false,
        description: "JPRIC",
        subMenuList: []
      }
       this.categories.push(menuItem3);
       if(this.subMenuItems.length > 0 ){
            const menuItem4 = {
              id: 4,
              isDropDownMenu: true,
              description: "Producción",
              dropDownTarget: "",
              subMenuList: this.subMenuItems
            }
            this.categories.push(menuItem4);
          }
       console.log(514, this.categories);
    });
  }
}
