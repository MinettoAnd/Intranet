import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirugiasProgramadasComponent } from './cirugias-programadas/cirugias-programadas.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaAtencionesComponent } from './consulta-atenciones/consulta-atenciones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    CirugiasProgramadasComponent,
    ConsultaAtencionesComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'cirugiasProgramadas',
        component: CirugiasProgramadasComponent
      },
      {
        path: 'consultaAtenciones',
        component: ConsultaAtencionesComponent
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class CentroQuirurgicoModule { }
