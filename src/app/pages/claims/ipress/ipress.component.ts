import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ipress',
  templateUrl: './ipress.component.html',
  styleUrls: ['./ipress.component.sass']
})
export class IpressComponent implements OnInit {
  // model = {
  //   left: true,
  //   middle: true,
  //   right: false
  // };
  model = 1;
  public listclaims = true;
  public showformclaims = false;
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
