import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenGerencialComponent } from './resumen-gerencial/resumen-gerencial.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComercialEstadisticasComponent } from '../../components/comercial-estadisticas/comercial-estadisticas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmergenciesEstadisticsComponent } from '../../components/emergencies-estadistics/emergencies-estadistics.component';
import { HospitalizationEstadisticsComponent } from '../../components/hospitalization-estadistics/hospitalization-estadistics.component';
import { ExternalConsultationEstadisticsComponent } from '../../components/external-consultation-estadistics/external-consultation-estadistics.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [
    ResumenGerencialComponent, 
    ComercialEstadisticasComponent,    
    EmergenciesEstadisticsComponent,
    HospitalizationEstadisticsComponent,
    ExternalConsultationEstadisticsComponent,
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
        path: 'resumen-gerencial',
        component: ResumenGerencialComponent
      },
    ])
  ]
})
export class DashboardGeneralModule { }
