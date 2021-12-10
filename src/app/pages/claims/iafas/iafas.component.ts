import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iafas',
  templateUrl: './iafas.component.html',
  styleUrls: ['./iafas.component.sass']
})
export class IafasComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };
  public showformclaims = false;
  public listclaims = true;
  public dashboard = false;
  constructor() { }

  ngOnInit(): void {
  }

  showComponent(id: number) {
    switch (id) {
      case 1:
        this.showformclaims = true;
        this.listclaims = false;
        this.dashboard = false;
        break;
      case 2:
        this.showformclaims = false;
        this.listclaims = true;
        this.dashboard = false;
        break;
      case 3:
        this.showformclaims = false;
        this.listclaims = false;
        this.dashboard = true;
        break;
      default:
        this.showformclaims = true;
        this.listclaims = false;
        this.dashboard = false;
        break;
    }
  }

}
