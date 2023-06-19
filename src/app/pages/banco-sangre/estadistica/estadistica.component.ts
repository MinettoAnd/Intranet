import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {
  area = 'BSangre';

  constructor() {

   }

  ngOnInit() {
  
    // this.setPage({ offset: 0 });
  }

}


