import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttentionConsultationComponent } from './attention-consultation/attention-consultation.component';
import { ListadoPacientesEmergenciaComponent } from './listado-pacientes-emergencia/listado-pacientes-emergencia.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListadoInterconsultasComponent } from './listado-interconsultas/listado-interconsultas.component';



@NgModule({
  declarations: [AttentionConsultationComponent, ListadoPacientesEmergenciaComponent, EstadisticasComponent, ListadoInterconsultasComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'attention-consultation',
        component: AttentionConsultationComponent
      },
      {
        path: 'listado-pacientes-emergencia',
        component: ListadoPacientesEmergenciaComponent
      },
      {
          path: 'estadisticas',
          component: EstadisticasComponent
      },
      {
          path: 'listado-interconsultas',
          component: ListadoInterconsultasComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class EmergenciesModule { }
