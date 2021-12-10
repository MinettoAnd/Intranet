import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() dato;
  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe,) { }

  ngOnInit(): void {
  }
  rgetFormatFeha(fecha) {
    var fechas = "";
    if (fecha != '0000-00-00 00:00:00') {
      fechas = this.datePipe.transform(fecha, 'yyyy-MM-dd');
      console.log(fecha)
    }

    return fechas;
  }
}
