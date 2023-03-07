import { Component, OnInit } from '@angular/core';


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

  public categories  = [
    {
      id: 1,
      isDropDownMenu: false,
      description: "Afiliados",
      dropDownTarget: "/comercial/programasSalud/estadisticas",
      subMenuList: []
    },
    {
      id: 2,
      isDropDownMenu: true,
      description: "Producción",
      dropDownTarget: "",
      subMenuList: [
        {
          description : "Hospitalización", 
          dropDownTarget: "/hospitalizacion/estadisticas"
        },
       {
          description : "Emergencia", 
          dropDownTarget: "/emergencies/estadisticas"
       },
       {
          description : "Consultas Externas", 
          dropDownTarget: "/consultoriosExternos/estadisticas"
       }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
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
}
