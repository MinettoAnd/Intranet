import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalDischargeConsultationComponent } from './hospital-discharge-consultation/hospital-discharge-consultation.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PacientesHospitalizadosComponent } from './pacientes-hospitalizados/pacientes-hospitalizados.component';

@NgModule({
  declarations: [HospitalDischargeConsultationComponent, EstadisticasComponent, PacientesHospitalizadosComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'consulta-altas-hospitalarias',
        component: HospitalDischargeConsultationComponent
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent
      },
      {
        path: 'pacientesHospitalizados',
        component: PacientesHospitalizadosComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class HospitalizationModule { }
