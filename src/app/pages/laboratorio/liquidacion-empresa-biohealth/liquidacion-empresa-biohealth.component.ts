import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-liquidacion-empresa-biohealth',
  templateUrl: './liquidacion-empresa-biohealth.component.html',
  styleUrls: ['./liquidacion-empresa-biohealth.component.scss']
})
export class LiquidacionEmpresaBiohealthComponent implements OnInit {
  area = 'Laboratorio';
 
  constructor() { 
 
  }

  ngOnInit(){

    // this.setPage({ offset: 0 });
  }

}
