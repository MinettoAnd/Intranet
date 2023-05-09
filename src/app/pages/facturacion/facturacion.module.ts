import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReporteExpedientesComponent } from './reporte-expedientes/reporte-expedientes.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    TarifarioComponent,
    ReporteExpedientesComponent
  ],
  imports: [
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([
      {
        path: 'tarifario',
        component: TarifarioComponent
      },
      {
        path: 'reporteExpedientes',
        component: ReporteExpedientesComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class FacturacionModule { }
