// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-renderer',
  template: `
    <a  *ngIf="label > 0" href="javascript:;" (click)="onClick($event)" style="color: #4B9FDE;">
    {{params.value}}</a>
    <span *ngIf="label == 0">
    {{params.value}}</span>
    `
})

export class LinkRendererComponent implements ICellRendererAngularComp {

  params;
  label: number;
  sucursal: string;
  id_sede: string;
  agInit(params): void {
    let re2 = /\S\//gi;
    this.params = params;
    this.label = this.params.value.replace(re2, '').replace(',', '');
    this.sucursal = this.params.sucursal;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {

    if (this.params.sucursal.toUpperCase() === 'LIMA'){
        this.id_sede = '0001';
      }else if (this.params.sucursal.toUpperCase() === 'CHORRILLOS'){
        this.id_sede = '0002';
      }else if (this.params.sucursal.toUpperCase() === 'SURCO'){
        this.id_sede = '0004';
      }else if (this.params.sucursal.toUpperCase() === 'TOTAL'){
        this.id_sede = '0000';
      }

    if (this.params.onClick instanceof Function) {
      
      console.log(33, this.params.sucursal);
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        sede: this.id_sede
        // ...something
      }
      this.params.onClick(params);

    }
  }
}