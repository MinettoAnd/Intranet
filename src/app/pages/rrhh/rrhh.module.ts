import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanillaResumenPagosComponent } from './estadistica/planilla-resumen-pagos/planilla-resumen-pagos.component';
import { PlanillaIndicadoresComponent } from './estadistica/planilla-indicadores/planilla-indicadores.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PlanillaResumenPagosComponent,
    PlanillaIndicadoresComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'collaborators',
        component: CollaboratorsComponent
      },
      {
        path: 'estadisticaResumenPagos',
        component: PlanillaResumenPagosComponent
      },
      {
        path: 'estadisticaIndicadores',
        component: PlanillaIndicadoresComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class RrhhModule { }
