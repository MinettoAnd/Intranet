import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-resumen-gerencial',
  templateUrl: './resumen-gerencial.component.html',
  styleUrls: ['./resumen-gerencial.component.scss']
})
export class ResumenGerencialComponent implements OnInit {
  collapsed = true;
  active = '1';
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

}
