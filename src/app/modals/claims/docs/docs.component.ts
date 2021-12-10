import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.sass']
})
export class DocsComponent implements OnInit {
  @Input() dato;
  public url: string = environment.baseURL + "/upload/archivos/";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.url;
  }

}
