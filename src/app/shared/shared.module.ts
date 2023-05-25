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
import { LinkRendererComponent } from './components/renderer/link-renderer.component';
import { EstadisticaPlanillaIndicadoresComponent } from './components/rrhh/estadistica-planilla-indicadores/estadistica-planilla-indicadores.component';
import { EstadisticaPlanillaResumenPagosComponent } from './components/rrhh/estadistica-planilla-resumen-pagos/estadistica-planilla-resumen-pagos.component';
import { EstadisticaPlanillaResumenIndicadoresComponent } from './components/rrhh/estadistica-planilla-resumen-indicadores/estadistica-planilla-resumen-indicadores.component';
import { FilterIndicadoresComponent } from './components/filtros/indicadores/filterIndicadores.component';
import { DashIndicadoresComponent } from './components/dashboards/dash-indicadores/dash-indicadores.component';

@NgModule({
  declarations: [
    PiecharComponent, 
    BarcharComponent,
    ComercialEstadisticasComponent,
    EmergenciesEstadisticsComponent,
    ExternalConsultationEstadisticsComponent,
    HospitalizationEstadisticsComponent,
    IngresosEstadisticasComponent,
    JPRICComponent,
    EstadisticaPlanillaIndicadoresComponent,
    EstadisticaPlanillaResumenPagosComponent,
    EstadisticaPlanillaResumenIndicadoresComponent,
    FilterIndicadoresComponent,
    DashIndicadoresComponent,
  ],
  imports: [
    AgGridModule.withComponents([LinkRendererComponent]),
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
    JPRICComponent,
    EstadisticaPlanillaIndicadoresComponent,
    EstadisticaPlanillaResumenPagosComponent,
    EstadisticaPlanillaResumenIndicadoresComponent,
    FilterIndicadoresComponent,
    DashIndicadoresComponent
  ],
})
export class SharedModule { }
