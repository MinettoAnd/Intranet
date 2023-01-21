import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ExternalAttentionConsultationComponent } from './attention-consultation/external-attention-consultation.component';
import { OcupabilidadMedicoComponent } from './ocupabilidad-medico/ocupabilidad-medico.component';
import { OcupabilidadConsultorioComponent } from './ocupabilidad-consultorio/ocupabilidad-consultorio.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
@NgModule({
  declarations: [
    ExternalAttentionConsultationComponent,
    OcupabilidadMedicoComponent,
    OcupabilidadConsultorioComponent,
    EstadisticasComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'estadisticas',
        component: EstadisticasComponent
      },
      {
        path: 'consulta-de-atenciones',
        component: ExternalAttentionConsultationComponent
      },
      {
        path: 'ocupabilidad-del-consultorio',
        component: OcupabilidadConsultorioComponent
      },
      {
        path: 'ocupabilidad-del-medico',
        component: OcupabilidadMedicoComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class ExternalConsultationModule { }
