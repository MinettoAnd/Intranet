import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallePagosAppMovilComponent } from './detalle-pagos-app-movil/detalle-pagos-app-movil.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer.component';
import { EstadisticasComponent } from './ingresos/estadisticas/estadisticas.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    DetallePagosAppMovilComponent,
    EstadisticasComponent
  ],
  imports: [
    AgGridModule.withComponents([ButtonRendererComponent]),
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'detallePagosAppMovil',
        component: DetallePagosAppMovilComponent
      },
      {
        path: 'ingresos/estadisticas',
        component: EstadisticasComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class TesoreriaModule { 

}
