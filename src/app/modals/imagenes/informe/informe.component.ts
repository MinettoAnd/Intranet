import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent implements OnInit {
  @Input() dato;
Edad;
  conclusiones: boolean;

  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe) { }

  ngOnInit() {
    // if (this.dato.showtemplate === 1) {
    //   this.showtemplate_new = false;
    //   this.showtemplate_old = true;
    // } else if (this.dato.showtemplate === 2) {
    //   this.showtemplate_new = true;
    //   this.showtemplate_old = false;
    // }
    this.conclusiones = this.dato.conclusiones.length < 21 ? true : false;
    console.log(55, this.conclusiones );
    // this.getDataPrint();
    
  }

  print() {
    // let printData =document.write(document.getElementById('dataToPrint').innerHTML);
    var mywindow = window.open('mm', 'PRINT', 'height=600,width=1000');
    mywindow.document.write('<html>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById('dataToPrint').innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();

    return true;
  }
}
