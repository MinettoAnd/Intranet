import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-estado-renderer',
  template: ` <span> <img width="10" [src]="imageSource" /></span> `,
})
export class EstadoCellRenderer implements INoRowsOverlayAngularComp {
  imageSource: string;
  value: any;

  agInit(params): void {
    const image = params.value === 'CE' ? 'remove.png' : 'checked.png';
    //this.imageSource = `./assets/img/${image}`;
    this.imageSource = `./assets/images/${image}`;
    this.value = params.value;
  }
}
