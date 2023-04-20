import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { IngresosEstadisticasComponent } from './components/ingresos-estadisticas/ingresos-estadisticas.component';
import { JPRICComponent } from './components/jpric/jpric.component';

@NgModule({
  declarations: [
    PiecharComponent, 
    BarcharComponent,
    ComercialEstadisticasComponent,
    EmergenciesEstadisticsComponent,
    ExternalConsultationEstadisticsComponent,
    HospitalizationEstadisticsComponent,
    IngresosEstadisticasComponent,
    JPRICComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    FormsModule, ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ComercialEstadisticasComponent,
    EmergenciesEstadisticsComponent,
    ExternalConsultationEstadisticsComponent,
    HospitalizationEstadisticsComponent,
    IngresosEstadisticasComponent,
    JPRICComponent
  ],
})
export class SharedModule { }
