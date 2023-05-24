import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpresionInformesRealizadosComponent } from './impresion-informes-realizados/impresion-informes-realizados.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AgGridModule } from 'ag-grid-angular';
import { IndicadoresImgComponent } from './indicadores/indicadoresImg.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ImpresionInformesRealizadosComponent,
    EstadisticasComponent,
    IndicadoresImgComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'impresion-informes-realizados',
        component: ImpresionInformesRealizadosComponent
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent
      },
      {
        path: 'indicadores',
        component: IndicadoresImgComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class ImagenesModule { }
