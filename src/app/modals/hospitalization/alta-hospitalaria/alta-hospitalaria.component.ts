import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-alta-hospitalaria',
  templateUrl: './alta-hospitalaria.component.html',
  styleUrls: ['./alta-hospitalaria.component.sass']
})
export class AltaHospitalariaComponent implements OnInit {
  @Input() dato;
  constructor(public activeModal: NgbActiveModal,) { 
    
  }

  ngOnInit(){
    console.log(11, this.dato);
  }

}
