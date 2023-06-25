import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiecharComponent } from './components/piechar/piechar.component';
import { BarcharComponent } from './components/barchar/barchar.component';
import { ComercialEstadisticasComponent } from './components/comercial-estadisticas/comercial-estadisticas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNav, NgbNavItem, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
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
import { PanelCabeceraComponent } from './components/dashboards/panel-cabecera/panel-cabecera.component';
import { LiquidacionEmpresasComponent } from './components/liquidacion-empresas/liquidacion-empresas.component';
import { BancoTerapiaEstadisticasComponent } from './components/banco-terapia-estadisticas/banco-terapia-estadisticas.component';
import { EstadisticaResumenColaboradoresComponent } from './components/rrhh/estadistica-resumen-colaboradores/estadistica-resumen-colaboradores.component';
import { PeriodoComponent } from './components/filtros/periodo/periodo.component';
import { ResumenColaboradoresComponent } from './components/dashboards/resumen-colaboradores/resumen-colaboradores.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionComponent } from './components/dashboards/accordion/accordion.component';
import { CardComponent } from './components/dashboards/card/card.component';
import { ContentWrapperComponent } from './components/dashboards/content-wrapper/content-wrapper.component';
import { ContentSectionComponent } from './components/dashboards/resumen-colaboradores/content-section/content-section.component';
import { TabContentDirective } from './components/dashboards/resumen-colaboradores/content-section/tab-content.directive';


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
    PanelCabeceraComponent,
    LiquidacionEmpresasComponent,
    BancoTerapiaEstadisticasComponent,
    EstadisticaResumenColaboradoresComponent,
    PeriodoComponent,
    ResumenColaboradoresComponent,
    AccordionComponent,
    CardComponent,
    ContentWrapperComponent,
    ContentSectionComponent,
    TabContentDirective,

  ],
  imports: [
    AgGridModule.withComponents([LinkRendererComponent]),
    FormsModule, ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    NgbNavModule,
    // HttpClientModule,
    // NavigationMenuComponent,
    // TabComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
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
    PanelCabeceraComponent,
    LiquidacionEmpresasComponent,
    BancoTerapiaEstadisticasComponent,
    EstadisticaResumenColaboradoresComponent,
    PeriodoComponent,
    ResumenColaboradoresComponent,
    AccordionComponent,
    CardComponent,
    ContentWrapperComponent,
    ContentSectionComponent,

  ],
  providers: [NgbNav],
  // bootstrap: [ResumenColaboradoresComponent],
})
export class SharedModule { }
