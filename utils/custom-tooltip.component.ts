import { Component, ViewEncapsulation } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'tooltip-component',
  template: ` <div class="custom-tooltip" [style.background-color]="data.color">
    <p>
      <span>{{ name_state }}</span>
    </p>
  </div>

  `,
  styles: [
    `
      :host {
        position: absolute;
        overflow: visible;
        pointer-events: none;
        transition: opacity 1s;

      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip p {
        margin: 5px;
        white-space: nowrap;

      }

      .custom-tooltip p:first-of-type {
        font-weight: bold;
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  public params: any;
  public data: any;
  public name_state: string;
  agInit(params): void {
    this.params = params;

    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.data.color = this.params.color || 'white';
    if (this.params.identicador === 1) {
      if (this.data.TIP_ESTADO === 'CE') {
        this.name_state = "Cesado";
      } else {
        this.name_state = "Activo";
      }
    }
    if (this.params.identicador === 2) {
      if (this.data.TIP_SEXO === 'MA') {
        this.name_state = "Genero: Masculino";
      } else {
        this.name_state = "Genero: Femenido";
      }
    }


  }

}
