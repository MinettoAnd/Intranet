// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button type="button" (click)="onClick($event)"><i class="pe-7s-plus btn-icon-wrapper" style="color: var(--secondary);font-weight: 600;font-size: 1rem;"></i></button>
    <!-- <a href="javascript:;" (click)="onClick($event)" class="btn-shadow btn btn-outline-success" >
                                        <i class="pe-7s-note btn-icon-wrapper"></i></a> -->
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}