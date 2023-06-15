import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicadorRecetasComponent } from './indicador-recetas/indicador-recetas.component';
import { ReferenciaPreciosComponent } from './referencia-precios/referencia-precios.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [IndicadorRecetasComponent, ReferenciaPreciosComponent],
  imports: [
    CommonModule,NgxDatatableModule,NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    SharedModule,
    RouterModule.forChild([
      {
        path: 'indicador-recetas',
        component: IndicadorRecetasComponent
      },
      {
        path: 'referencia-precios',
        component: ReferenciaPreciosComponent
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class FarmaciaModule { }
