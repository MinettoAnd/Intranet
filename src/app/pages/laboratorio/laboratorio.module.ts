import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidacionEmpresaBiohealthComponent } from './liquidacion-empresa-biohealth/liquidacion-empresa-biohealth.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndicadoresLabComponent } from './indicadores/indicadoresLab.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LiquidacionEmpresaBiohealthComponent,
    IndicadoresLabComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'liquidacionEmpresaBiohealth',
        component: LiquidacionEmpresaBiohealthComponent
      },
      {
        path: 'indicadores',
        component: IndicadoresLabComponent
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
export class LaboratorioModule { }
