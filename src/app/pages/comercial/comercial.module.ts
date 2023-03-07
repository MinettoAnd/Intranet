import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CuotasProgramasSaludComponent } from './ventas/cuotas-programas-salud/cuotas-programas-salud.component';
import { ListadoMorososComponent } from './programasSalud/listado-morosos/listado-morosos.component';
import { ListadoContratosVigentesComponent } from './programasSalud/listado-contratos-vigentes/listado-contratos-vigentes.component';
import { ListadoMadreNinoComponent } from './programasSalud/listado-madre-nino/listado-madre-nino.component';
import { ListadoMadreNinoMorososComponent } from './programasSalud/listado-madre-nino-morosos/listado-madre-nino-morosos.component';
import { ListadoAfiliadosComponent } from './programasSalud/listado-afiliados/listado-afiliados.component';
import { EstadisticasComponent } from './programasSalud/estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    CuotasProgramasSaludComponent, 
    ListadoMorososComponent, 
    ListadoContratosVigentesComponent, 
    ListadoMadreNinoComponent, 
    ListadoMadreNinoMorososComponent, 
    ListadoAfiliadosComponent, 
    EstadisticasComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule,
    NgxDatatableModule,
    NgbModule,SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'cuotasProgramasSalud',
        component: CuotasProgramasSaludComponent
      },
      {
        path: 'listadoMorosos',
        component: ListadoMorososComponent
      },
      {
        path: 'listadoContratosVigentes',
        component: ListadoContratosVigentesComponent
      },
      {
        path: 'listadoMadreNino',
        component: ListadoMadreNinoComponent
      },
      {
        path: 'listadoMadreNinoMorosos',
        component: ListadoMadreNinoMorososComponent
      },
      {
        path: 'listadoAfiliados',
        component: ListadoAfiliadosComponent
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent
      }
    ])
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class ComercialModule { }
