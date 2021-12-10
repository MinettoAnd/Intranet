import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-sucursal-renderer',
  template: ` <span>{{ value }}</span> `,
})
export class SucursalCellRenderer implements INoRowsOverlayAngularComp {
  value: any;

  agInit(params): void {
    if (params.value === '0001') {
      this.value = 'LIMA';
    } else if (params.value === '0002') {
      this.value = 'CHORRILLOS';
    } else if (params.value === '0004') {
      this.value = 'SURCO';
    } else {
      this.value = params.value;
    }
  }
}
