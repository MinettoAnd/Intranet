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
  public ingresosEstadisticas = false;
  public hospitalizacionEstadisticas = false;
  public emergenciasEstadisticas = false;
  public consultaExternaEstadisticas = false;
  public planillaEstadistica = false;
  public colaboradoresEstadisticas = false;
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
        this.colaboradoresEstadisticas = false;
        this.planillaEstadistica = false;
        this.ingresosEstadisticas = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 2:
        this.comercialEstadisticas = false;
        this.colaboradoresEstadisticas = true;
        this.planillaEstadistica = false;
        this.ingresosEstadisticas = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 3:
        this.comercialEstadisticas = false;
        this.colaboradoresEstadisticas = false;
        this.planillaEstadistica = true;
        this.ingresosEstadisticas = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 4:
        this.comercialEstadisticas = false;
        this.colaboradoresEstadisticas = false;
        this.planillaEstadistica = false;
        this.ingresosEstadisticas = true;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 5:
        this.comercialEstadisticas = false;
        this.colaboradoresEstadisticas = false;
        this.planillaEstadistica = false;
        this.ingresosEstadisticas = false;
        this.emergenciasEstadisticas = true;
        this.hospitalizacionEstadisticas = false;
        this.consultaExternaEstadisticas = false;
        break;
      case 6:
        this.comercialEstadisticas = false;
        this.colaboradoresEstadisticas = false;
        this.planillaEstadistica = false;
        this.ingresosEstadisticas = false;
        this.emergenciasEstadisticas = false;
        this.hospitalizacionEstadisticas = true;
        this.consultaExternaEstadisticas = false;
        break;
      case 7:
        this.comercialEstadisticas = false;
        this.colaboradoresEstadisticas = false;
        this.planillaEstadistica = false;
        this.ingresosEstadisticas = false;
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
          if(item.name_model === 'Comercial' || item.name_model === 'Tesoreria' || item.name_model === 'Emergencia' || item.name_model === 'Hospitalización' || item.name_model === 'Consultorios' || item.name_model === 'RRHH'){
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
              if(submenu.name === 'Resumen de Colaboradores'){
                const menuItem2 = {
                  id: 2,
                  isDropDownMenu: false,
                  description: "Colaboradores",
                  subMenuList: []
                }
                 this.categories.push(menuItem2);
              }
              if(submenu.name === 'Estad. Planilla - Resumen de pagos'){
                const menuItem3 = {
                  id: 3,
                  isDropDownMenu: false,
                  description: "Planilla",
                  subMenuList: []
                }
                 this.categories.push(menuItem3);
              }
              if(submenu.name === 'ING-Estadisticas'){
                const menuItem4 = {
                  id: 4,
                  isDropDownMenu: false,
                  description: "Ingresos",
                  subMenuList: []
                }
                this.categories.push(menuItem4);
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
       if(this.subMenuItems.length > 0 ){
            const menuItem5 = {
              id: 5,
              isDropDownMenu: true,
              description: "Producción",
              dropDownTarget: "",
              subMenuList: this.subMenuItems
            }
            this.categories.push(menuItem5);
          }
        this.categories.sort((a, b) => a.id - b.id);
       console.log(514, this.categories);
    });
  }
  getModelsUsers() {
    this.apiService.getMenuSidebarPermissionRoleService(localStorage.getItem('idrol')).then((response: any) => {
      // console.log('usuario', response)
      let subMenu = [];
      this.subMenuItems = [];
       this.menuItems = response.data.length > 0 ? response.data : [];
       this.menuItems.map(item => {
        if(item.name_model === 'Comercial' || item.name_model === 'Tesoreria' || item.name_model === 'Emergencia' || item.name_model === 'Hospitalización' || item.name_model === 'Consultorios' || item.name_model === 'RRHH'){
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
            if(submenu.name === 'Resumen de Colaboradores'){
              const menuItem2 = {
                id: 2,
                isDropDownMenu: false,
                description: "Colaboradores",
                subMenuList: []
              }
               this.categories.push(menuItem2);
            }
            if(submenu.name === 'Estad. Planilla - Resumen de pagos'){
              const menuItem3 = {
                id: 3,
                isDropDownMenu: false,
                description: "Planilla",
                subMenuList: []
              }
               this.categories.push(menuItem3);
            }
            if(submenu.name === 'ING-Estadisticas'){
              const menuItem4 = {
                id: 4,
                isDropDownMenu: false,
                description: "Ingresos",
                subMenuList: []
              }
              this.categories.push(menuItem4);
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
     if(this.subMenuItems.length > 0 ){
          const menuItem5 = {
            id: 5,
            isDropDownMenu: true,
            description: "Producción",
            dropDownTarget: "",
            subMenuList: this.subMenuItems
          }
          this.categories.push(menuItem5);
        }
      this.categories.sort((a, b) => a.id - b.id);
     console.log(268, this.categories);
    });
    // this.categories.sort((a, b) => a.id - b.id);
    
  }
}
