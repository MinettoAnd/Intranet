import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttentionConsultationComponent } from './attention-consultation/attention-consultation.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AttentionConsultationComponent, EstadisticasComponent],
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
        path: 'estadisticas',
        component: EstadisticasComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class EmergenciesModule { }
