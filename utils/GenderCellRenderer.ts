import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-gender-renderer',
  template: ` <span> <img width="15" [src]="imageSource" /></span> `,
})
export class GenderCellRenderer implements INoRowsOverlayAngularComp {
  imageSource: string;
  value: any;

  agInit(params): void {
    const image =
      params.value === 'MA' ? 'user_masculino.png' : 'user_femenino.png';
    //this.imageSource = `./assets/img/${image}`;
    this.imageSource = `./assets/images/${image}`;
    this.value = params.value;
  }
}
