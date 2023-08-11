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
import { TblDistXGrupoExamenComponent } from './components/banco-terapia-estadisticas/tbl-dist-x-grupo-examen/tbl-dist-x-grupo-examen.component';
import { TblDetExamenesRealizadosComponent } from './components/banco-terapia-estadisticas/tbl-det-examenes-realizados/tbl-det-examenes-realizados.component';
import { TblDetExamenesEspecialidadComponent } from './components/banco-terapia-estadisticas/tbl-det-examenes-especialidad/tbl-det-examenes-especialidad.component';
import { TblMedicosDistAnualXEspComponent } from './components/banco-terapia-estadisticas/tbl-medicos-dist-anual-x-esp/tbl-medicos-dist-anual-x-esp.component';


import { EstadisticaResumenColaboradoresComponent } from './components/rrhh/estadistica-resumen-colaboradores/estadistica-resumen-colaboradores.component';
import { PeriodoComponent } from './components/filtros/periodo/periodo.component';
import { ResumenColaboradoresComponent } from './components/dashboards/resumen-colaboradores/resumen-colaboradores.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionComponent } from './components/dashboards/accordion/accordion.component';
import { CardComponent } from './components/dashboards/card/card.component';
import { ContentWrapperComponent } from './components/dashboards/content-wrapper/content-wrapper.component';
import { ContentSectionComponent } from './components/dashboards/resumen-colaboradores/content-section/content-section.component';
import { TabContentDirective } from './components/dashboards/resumen-colaboradores/content-section/tab-content.directive';
import { PlanillaColaboradoresComponent } from './components/dashboards/planilla-colaboradores/planilla-colaboradores.component';
import { ContentSectionPlanillaComponent } from './components/dashboards/planilla-colaboradores/content-section-planilla/content-section-planilla.component';
import { SedeComponent } from './components/filtros/sede/sede.component';
import { InventarioComponent } from './components/listas/farmacia/inventario/inventario.component';
import { FarmaciaComponent } from './components/listas/farmacia/farmacia.component';
import { ContentInventarioComponent } from './components/listas/farmacia/inventario/content-inventario/content-inventario.component';
import { EstadisticasComponent } from './components/procedimientos/estadisticas/estadisticas.component';
import { ContentEstadisticasComponent } from './components/procedimientos/estadisticas/content-estadisticas/content-estadisticas.component';
import { ProcedimientosComponent } from './components/procedimientos/procedimientos.component';
import { FilterProcedimientosComponent } from './components/filtros/procedimientos/filterProcedimientos.component';
import { EmergenciaComponent } from './components/listas/emergencia/emergencia.component';
import { ListadoInterconsultaComponent } from './components/listas/emergencia/listado-interconsulta/listado-interconsulta.component';
import { ContentListadoComponent } from './components/listas/emergencia/listado-interconsulta/content-listado/content-listado.component';
import { FilterEnvioCorreosComponent } from './components/filtros/envio-correos/envio-correos.component';
import { EnvioBoletasComponent } from './components/envio-correos/envio-boletas/envio-boletas.component';
import { EnvioCorreosComponent } from './components/envio-correos/envio-correos.component';


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
    TblDistXGrupoExamenComponent,
    TblDetExamenesRealizadosComponent,
    TblDetExamenesEspecialidadComponent,
    TblMedicosDistAnualXEspComponent,
    EstadisticaResumenColaboradoresComponent,
    PeriodoComponent,
    ResumenColaboradoresComponent,
    AccordionComponent,
    CardComponent,
    ContentWrapperComponent,
    ContentSectionComponent,
    TabContentDirective,
    PlanillaColaboradoresComponent,
    ContentSectionPlanillaComponent,
    SedeComponent,
    InventarioComponent,
    FarmaciaComponent,
    ContentInventarioComponent,
    EstadisticasComponent,
    ContentEstadisticasComponent,
    ProcedimientosComponent,
    FilterProcedimientosComponent,
    EmergenciaComponent,
    ListadoInterconsultaComponent,
    ContentListadoComponent,
    FilterEnvioCorreosComponent,
    EnvioBoletasComponent,
    EnvioCorreosComponent
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
    TblDistXGrupoExamenComponent,
    TblDetExamenesRealizadosComponent,
    TblDetExamenesEspecialidadComponent,
    TblMedicosDistAnualXEspComponent,
    EstadisticaResumenColaboradoresComponent,
    PeriodoComponent,
    ResumenColaboradoresComponent,
    AccordionComponent,
    CardComponent,
    ContentWrapperComponent,
    ContentSectionComponent,
    SedeComponent,
    InventarioComponent,
    FarmaciaComponent,
    EstadisticasComponent,
    ContentEstadisticasComponent,
    ProcedimientosComponent,
    FilterProcedimientosComponent,
    EmergenciaComponent,
    ListadoInterconsultaComponent,
    ContentListadoComponent,
    FilterEnvioCorreosComponent,
    EnvioCorreosComponent,
  ],
  providers: [NgbNav],
  // bootstrap: [ResumenColaboradoresComponent],
})
export class SharedModule { }
