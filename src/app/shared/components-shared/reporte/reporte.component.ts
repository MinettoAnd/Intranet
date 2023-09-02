import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { ExportService } from 'src/app/_services/export.service';

import { CfgPieDePaginaInterface } from './interfaces/cfg-pie-de-pagina.interface';
import { AnchoColInterface } from './interfaces/ancho-col.interface';
import { OpcionFiltradoInterface } from './interfaces/opcion-filtrado.interface';
import { ValorFiltradoInterface } from './interfaces/valor-filtrado.interface';
import { OpcionGrupoColInterface } from './interfaces/opcion-grupo-col.interface';
import { ValorOpcionGrupoColInterface } from './interfaces/valor-opcion-grupo-col.interface';
import { FormatoDatosInterface } from './interfaces/formato-datos.interface';

import { fnCalcAnchoCols } from './helpers/calc-ancho-cols.helper';
import { fnObtOpcsDeFiltrado } from './helpers/obt-opcs-de-filtrado.helper';
import { fnObtValoresDeFiltrado } from './helpers/obt-valores-de-filtrado.helper';
import { fnFiltrarDatos } from './helpers/filtrar-datos.helper';
import { fnObtOpcsDeColumna } from './helpers/obt-opcs-de-columna.helper';
import { fnObtGrupoDatos } from './helpers/obt-grupo-datos.helper';
import { fnBuscarPorTexto } from './helpers/buscar-por-texto.helper';
import { fnFormatearDatos } from './helpers/formatear-datos.helper';
import { fnObtTotales } from './helpers/obt-totales.helper';

import { fnGenerarIdUnico } from '../../utils/generar-id-unico.util';
import { fnDestArrObj } from '../../utils/dest-arr-obj.util';
import { fnMarcarTotales } from './helpers/marcar-totales.helper';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit, AfterViewInit {

  // Muestra el mensaje de error en la alerta nativa del navegador
  @Input() public debugEnAlerta: boolean = false;

  @Input() public tituloReporte: string = '';

  @Input() public cabecera: Array<any> = [];

  @Input() public set datos(datos: Array<any>) {
    this._datos = fnDestArrObj(datos);
  };

  @Input() public exportar: boolean = false;
  @Input() public copiar: boolean = false;

  @Input() public pieDePagina: boolean = false;
  @Input() public cfgPieDePagina: CfgPieDePaginaInterface | undefined = undefined;

  @Input() public formatoDatos: FormatoDatosInterface | undefined = undefined;

  // Identificador de la tabla
  @Input() public id: string = '';

  // Columnas a ocultar cuando se muestran los datos
  @Input() public columnasOcultas: Array<number> = [];

  // Columnas a las que aplicar un ancho
  // [{ nroColumna: valorAncho }]
  @Input() public anchoFijo: Array<any> = [];

  // Grupo de datos a mostrar por valor de columna
  // [ nroCol, { tituloFiltro: nroColumna }, { tituloFiltro: nroColumna }, ...]
  @Input() public opcionesPorColumna: Array<any> = [];

  // Columnas por las cuales se van filtrar los datos
  // [{ tituloFiltro: columna }]
  @Input() public filtrosPorColumna: Array<any> = [];

  // Toma el primer valor de filtroPorColumna
  @Input() public busqueda: boolean = false;

  // Ordenar por cabecera
  @Input() public ordenar: boolean = false;

  public isCollapsed: boolean = false;

  /*
   * Datos con los que trabaja el componente
   */
  private _datos: Array<any> = [];

  public anchosCols: Array<AnchoColInterface> = [];

  // Datos como resultado de obtener el grupo de datos
  // @see opcionesPorColumna
  public datosPorOpcionColumna: Array<any> = [];

  // Datos como resultado de aplicar los filtros
  // @see filtrosPorColumna
  public datosFiltrados: Array<any> = [];

  // Datos como resultado de aplicar los formatos
  // @see formatoDatos
  public datosFormateados: Array<any> = [];

  // Datos que se mostrarán en la tabla
  public datosTabla: Array<any> = [];

  // Valor que se usará en la selección del grupo de datos a visualizar
  // @see opcionesPorColumna
  public valorPorColumna: ValorOpcionGrupoColInterface = { idxCol: 0, valor: '' };

  // Opciones de grupo de los datos de la tabla, a renderizar
  // @see valorPorColumna
  public opcionesGrupoPorColumna: Array<OpcionGrupoColInterface> = [];

  // Valores que se usarán en el filtrado de datos
  // @see filtrosPorColumna
  public valoresFiltrado: Array<ValorFiltradoInterface> = [];

  // Opciones de filtrado de los datos de la tabla, a renderizar
  // @see valoresFiltrado
  public opcionesFiltrado: Array<OpcionFiltradoInterface> = [];

  // Totales obtenidos de los datos ya sea sumándo las columnas o
  // encontrando el/los campos con el índice TOTAL.
  // @see pieDePagina
  // public totales: Array<any> = [];

  // TODO agregar paginación

  public nombreGrupoChk: string = '';
  public txtBusquedaTabla: string = '';


  constructor(private exportService: ExportService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.nombreGrupoChk = 'chk' + fnGenerarIdUnico(5);

    // Datos para los checks
    this.opcionesGrupoPorColumna = fnObtOpcsDeColumna(this.opcionesPorColumna);
    if (this.opcionesGrupoPorColumna.length > 0) {
      this.opcionesGrupoPorColumna[0].isChecked = true;
      this.valorPorColumna = this.valOpcGrpXCol(this.opcionesGrupoPorColumna[0]);
    }

    // Datos para los select
    this.opcionesFiltrado = fnObtOpcsDeFiltrado(this.filtrosPorColumna, this._datos);
    this.valoresFiltrado = fnObtValoresDeFiltrado(this.opcionesFiltrado);

    this.anchosCols = fnCalcAnchoCols(
      this.anchoFijo,
      Object.keys(this._datos[0]).length
    );

    // Obteniendo los totales
    const resTotales = this.pieDePagina ? fnObtTotales(this._datos) : null;
    console.log('TOTALES', resTotales);

    if (resTotales) {
      if (resTotales.calculados) {
        this._datos.push(...fnDestArrObj(resTotales.totales));
      } else {
        fnMarcarTotales(this._datos);
      }
    }

    // TODO fnAgregarTotales(this._datos)

    // Tratamiento de los datos
    this.datosPorOpcionColumna = this.obtGrupoDatos(this._datos);
    this.datosFiltrados = this.filtrarDatos(this.datosPorOpcionColumna);
    this.datosFormateados = this.formatearDatos(this.datosFiltrados);
    this.datosTabla = fnDestArrObj(this.datosFormateados);
  }

  public cambioValorOpcGrupo(valorCol: ValorOpcionGrupoColInterface): void {
    this.valorPorColumna = valorCol;
    this.opcionesGrupoPorColumna.forEach(obj => obj.isChecked = obj.valor == valorCol.valor);
    this.datosPorOpcionColumna = fnObtGrupoDatos(valorCol, this._datos);
    this.datosFiltrados = this.filtrarDatos(this.datosPorOpcionColumna);
    this.datosFormateados = this.formatearDatos(this.datosFiltrados);
    this.datosTabla = fnBuscarPorTexto(this.txtBusquedaTabla, this.datosFormateados);
  }

  public cambioValorFiltro(): void {
    this.datosFiltrados = fnFiltrarDatos(this.valoresFiltrado, this.datosPorOpcionColumna);
    this.datosFormateados = this.formatearDatos(this.datosFiltrados);
    this.datosTabla = fnBuscarPorTexto(this.txtBusquedaTabla, this.datosFormateados);
  }

  public cambioValorTextoBusqueda() {
    this.datosFormateados = this.formatearDatos(this.datosFiltrados);
    this.datosTabla = fnBuscarPorTexto(this.txtBusquedaTabla, this.datosFormateados);
  }

  public copyTableToClipboard() {
    this.exportService.exportToClipboard(this._datos, this.cabecera);
  }

  public exportToExcel() {
    this.exportService.exportTableElmToExcel(this._datos, '');
  }

  private valOpcGrpXCol({ idxCol, valor }): ValorOpcionGrupoColInterface {
    return { idxCol, valor };
  }

  private obtGrupoDatos(datos: Array<any>): Array<any> {
    return this.opcionesPorColumna.length > 0
      ? fnObtGrupoDatos(this.valorPorColumna, datos)
      : fnDestArrObj(datos);
  }

  private filtrarDatos(datos: Array<any>): Array<any> {
    return this.filtrosPorColumna.length > 0
      ? fnFiltrarDatos(this.valoresFiltrado, datos)
      : fnDestArrObj(datos);
  }

  private formatearDatos(datos: Array<any>): Array<any> {
    return this.formatoDatos
      ? fnFormatearDatos(
          this.formatoDatos,
          this.valorPorColumna,
          this.valoresFiltrado,
          datos,
        )
      : fnDestArrObj(datos);
  }

}
