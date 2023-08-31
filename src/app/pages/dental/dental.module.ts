import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosComponent } from './ingresos/ingresos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    IngresosComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([
      {
        path: 'ingresos',
        component: IngresosComponent
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class DentalModule { }
