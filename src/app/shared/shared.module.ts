import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiecharComponent } from './components/piechar/piechar.component';
import { BarcharComponent } from './components/barchar/barchar.component';
import { ComercialEstadisticasComponent } from './components/comercial-estadisticas/comercial-estadisticas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmergenciesEstadisticsComponent } from './components/emergencies-estadistics/emergencies-estadistics.component';
import { ExternalConsultationEstadisticsComponent } from './components/external-consultation-estadistics/external-consultation-estadistics.component';
import { HospitalizationEstadisticsComponent } from './components/hospitalization-estadistics/hospitalization-estadistics.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    PiecharComponent, 
    BarcharComponent,
    ComercialEstadisticasComponent,
    EmergenciesEstadisticsComponent,
    ExternalConsultationEstadisticsComponent,
    HospitalizationEstadisticsComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,
    NgbModule,
  ],
  exports: [
    ComercialEstadisticasComponent,
    EmergenciesEstadisticsComponent,
    ExternalConsultationEstadisticsComponent,
    HospitalizationEstadisticsComponent
  ],
})
export class SharedModule { }
