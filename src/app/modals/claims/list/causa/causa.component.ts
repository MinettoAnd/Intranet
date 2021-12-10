import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-causa',
  templateUrl: './causa.component.html',
  styleUrls: ['./causa.component.sass']
})
export class CausaComponent implements OnInit {

  @Input() dato;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}
