import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-alta-hospitalaria',
  templateUrl: './pagos-app-movil.component.html',
  styleUrls: ['./pagos-app-movil.component.sass']
})
export class PagosAppMovilComponent implements OnInit {
  @Input() dato;
  constructor(public activeModal: NgbActiveModal,) { 
    
  }

  ngOnInit(){
    console.log(11, this.dato);
  }

}
