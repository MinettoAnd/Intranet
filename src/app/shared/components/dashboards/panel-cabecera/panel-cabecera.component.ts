import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-cabecera',
  templateUrl: './panel-cabecera.component.html',
  styleUrls: ['./panel-cabecera.component.scss']
})
export class PanelCabeceraComponent implements OnInit {
  panelCabecera1 = [
    {
      infoBoxBlass: 'infoBoxBlassAzul ',
      iconClass: 'fa fa-calendar-check-o',
      title: 'ATENCIONES',
      totalSubtitle: '13,716',
      subtitle: 'Total',
      totalSubSubtitle: '2743',
      subSubtitle: 'Promedio Mensual',
    },
    {
      infoBoxBlass: 'infoBoxBlassAzul ',
      iconClass: 'fa fa-calendar-check-o',
      title: 'ATENCIONES',
      totalSubtitle: '13,716',
      subtitle: 'Total',
      totalSubSubtitle: '2743',
      subSubtitle: 'Promedio Mensual',
    },
    {
      infoBoxBlass: 'infoBoxBlassAzul ',
      iconClass: 'fa fa-calendar-check-o',
      title: 'ATENCIONES',
      totalSubtitle: '13,716',
      subtitle: 'Total',
      totalSubSubtitle: '2743',
      subSubtitle: 'Promedio Mensual',
    },
    {
      infoBoxBlass: 'infoBoxBlassAzul ',
      iconClass: 'fa fa-calendar-check-o',
      title: 'ATENCIONES',
      totalSubtitle: '13,716',
      subtitle: 'Total',
      totalSubSubtitle: '2743',
      subSubtitle: 'Promedio Mensual',
    }
  ]
  @Input() panelCabecera: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
