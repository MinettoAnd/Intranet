// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-renderer',
  template: `
    <a  *ngIf="label > 0 && (field === 'monto_lima' || field === 'monto_chorrillos' || field === 'monto_surco' || field === 'monto_total')" href="javascript:;" (click)="onClick($event)" style="color: #4B9FDE;">
    {{params.value | currency }}</a>
    <a  *ngIf="label > 0 && !(field === 'monto_lima' || field === 'monto_chorrillos' || field === 'monto_surco' || field === 'monto_total')" href="javascript:;" (click)="onClick($event)" style="color: #4B9FDE;">
    {{params.value}}</a>
    <span *ngIf="label == 0 && (field === 'monto_lima' || field === 'monto_chorrillos' || field === 'monto_surco' || field === 'monto_total')">
    {{params.value | currency }}</span>
    <span *ngIf="label == 0 && !(field === 'monto_lima' || field === 'monto_chorrillos' || field === 'monto_surco' || field === 'monto_total')">
    {{params.value}}</span>
    `
})

export class LinkRendererComponent implements ICellRendererAngularComp {

  params;
  label: number;
  sucursal: string;
  field: string;
  id_sede: string;
  agInit(params): void {
    let re2 = /\S\//gi;
    this.params = params;
    
    if(this.params.value !== undefined){
      // console.log(31, this.params)
      if(typeof(this.params.value)  === 'string'){
        this.label = this.params.value.replace(re2, '').replace(',', '');
      }else{
        this.label = 0
      }
    }
    this.sucursal = this.params.sucursal;
    this.field = this.params.field;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
console.log(41, this.field)
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
        sede: this.params.sucursal,
        idSede: this.id_sede
        // ...something
      }
      console.log(57, params)
      this.params.onClick(params);

    }
  }
}