import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-empresa-renderer',
  template: ` <span>{{ value }}</span> `,
})
export class EmpresaCellRenderer implements INoRowsOverlayAngularComp {
  value: any;
  dato: string = "";
  agInit(params): void {
    this.dato = params.value.toString();
    this.value = ("0000000000" + this.dato).slice(-10);
    // console.log(this.value)
    /*  if (params.value === '01000000') {
        this.value = 'CSALUD';
      } else if (params.value === '02000000') {
        this.value = 'SFB';
      } else {
        this.value = params.value;
      }*/
  }
}
