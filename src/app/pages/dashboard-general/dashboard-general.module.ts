import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenGerencialComponent } from './resumen-gerencial/resumen-gerencial.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JpricComponent } from './jpric/jpric.component';
@NgModule({
  declarations: [
    ResumenGerencialComponent,
    JpricComponent,    
    // EmergenciesEstadisticsComponent,
    // HospitalizationEstadisticsComponent,
    // ExternalConsultationEstadisticsComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,SharedModule,
    RouterModule.forChild([
      {
        path: 'resumen-gerencial',
        component: ResumenGerencialComponent
      },
      {
        path: 'jpric',
        component: JpricComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardGeneralModule { }
