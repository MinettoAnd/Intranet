import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallePagosAppMovilComponent } from './detalle-pagos-app-movil/detalle-pagos-app-movil.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer.component';

@NgModule({
  declarations: [
    DetallePagosAppMovilComponent
  ],
  imports: [
    AgGridModule.withComponents([ButtonRendererComponent]),
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'detallePagosAppMovil',
        component: DetallePagosAppMovilComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class TesoreriaModule { 

}
