import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttentionConsultationComponent } from './attention-consultation.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AttentionConsultationComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: AttentionConsultationComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class AttentionConsultationModule { }
