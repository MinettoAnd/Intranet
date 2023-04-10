import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalDischargeConsultationComponent } from './hospital-discharge-consultation/hospital-discharge-consultation.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PacientesHospitalizadosComponent } from './pacientes-hospitalizados/pacientes-hospitalizados.component';
import { SeguimientoAltaHospitalariaComponent } from './seguimiento-alta-hospitalaria/seguimiento-alta-hospitalaria.component';

@NgModule({
  declarations: [HospitalDischargeConsultationComponent, EstadisticasComponent, PacientesHospitalizadosComponent, SeguimientoAltaHospitalariaComponent],
  imports: [
    AgGridModule.withComponents([]),
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
      },
      {
        path: 'seguimiento-alta-hospitalaria',
        component: SeguimientoAltaHospitalariaComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class HospitalizationModule { }
