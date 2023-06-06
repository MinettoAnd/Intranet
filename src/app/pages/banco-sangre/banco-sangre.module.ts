import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { LiquidacionEmpresaYmunolabComponent } from './liquidacion-empresa-ymunolab/liquidacion-empresa-ymunolab.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EstadisticaComponent,
    LiquidacionEmpresaYmunolabComponent
  ],
  imports: [
    SharedModule,
    AgGridModule.withComponents([]),
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'liquidacionEmpresaYmunolab',
        component: LiquidacionEmpresaYmunolabComponent
      },
      {
        path: 'estadistica',
        component: EstadisticaComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class BancoSangreModule { }
