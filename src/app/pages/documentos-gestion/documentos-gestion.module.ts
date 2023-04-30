import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciaSistemasComponent } from './gerencia-sistemas/gerencia-sistemas.component';
import { RouterModule } from '@angular/router';
import { DocumentoDetalleComponent } from './documento-detalle/documento-detalle.component';



@NgModule({
  declarations: [
    GerenciaSistemasComponent,
    DocumentoDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'gerenciaSistemas',
        component: GerenciaSistemasComponent,
      },
      {
        path: 'gerenciaSistemas/files/:idTipoDocumento',
        component: DocumentoDetalleComponent
      }
    ])
  ]
})
export class DocumentosGestionModule { }
