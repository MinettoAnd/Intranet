import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalDischargeConsultationComponent } from './hospital-discharge-consultation/hospital-discharge-consultation.component';

@NgModule({
  declarations: [HospitalDischargeConsultationComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HospitalDischargeConsultationComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class HospitalizationModule { }
