import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiquidacionEmpresaBiohealthComponent } from './liquidacion-empresa-biohealth/liquidacion-empresa-biohealth.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LiquidacionEmpresaBiohealthComponent
  ],
  imports: [
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'liquidacionEmpresaBiohealth',
        component: LiquidacionEmpresaBiohealthComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class LaboratorioModule { }
