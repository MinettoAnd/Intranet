import { DecimalPipe, CurrencyPipe } from "@angular/common";
import { CondicionFormatoDatosEnum } from "../enums/regla-formato-datos.enum";
import { TipoControlEnum } from "../enums/tipo-control.enum";
import { TipoFormatoValorEnum } from "../enums/tipo-formato-valor.enum";
import { FormatoDatosInterface, ReglaFormatoDatosInterface } from "../interfaces/formato-datos.interface";
import { ValorFiltradoInterface } from '../interfaces/valor-filtrado.interface';
import { ValorOpcionGrupoColInterface } from "../interfaces/valor-opcion-grupo-col.interface";

const decimalPipe = new DecimalPipe('es-PE');
const currencyPipe = new CurrencyPipe('es-PE');

function aplicarFormato(
  formato: TipoFormatoValorEnum,
  valor: string,
): string {
  if (formato == TipoFormatoValorEnum.Cantidad) {
    return decimalPipe.transform(valor, '1.0-0');
  }

  if (formato == TipoFormatoValorEnum.Moneda) {
    return currencyPipe.transform(valor, 'PEN', 'S/', '1.2-2');
  }

  if (formato == TipoFormatoValorEnum.Porcentaje) {
    return decimalPipe.transform(valor, '1.2-2') + ' %';
  }

  return valor;
}

function aplicarFormatoADatos(
  formato: TipoFormatoValorEnum,
  excluir: Array<string>,
  datos: Array<any>,
): Array<any> {
  const datosConFormato: Array<any> = [...datos];

  for (let obj of datosConFormato) {
    const keys: Array<string> = Object.keys(obj);

    for (let key of keys) {
      if (excluir.find(val => val == key)) {
        continue;
      }

      obj[key] = aplicarFormato(formato, obj[key]);
    }
  }

  return datosConFormato;
}

function aplicarCondicion(
  { condicion, valor }: ReglaFormatoDatosInterface,
  valorFiltro: string,
): boolean {
  const txt: string = valorFiltro.trim().toLowerCase();

  if (condicion == CondicionFormatoDatosEnum.Contiene) {
    return txt.includes(valor.toLowerCase());
  } else if (condicion == CondicionFormatoDatosEnum.IniciaCon) {
    return txt.startsWith(valor.toLowerCase());
  } else if (condicion == CondicionFormatoDatosEnum.RegExp) {
    // TODO por implementar
    return false;
  }

  return false;
}

function getFormatoFiltroPorCol(
  { reglas, control }: FormatoDatosInterface,
  valoresFiltrado: Array<ValorFiltradoInterface>,
): TipoFormatoValorEnum {
  let formato: TipoFormatoValorEnum = undefined;

  for (let regla of reglas) {
    const valorFiltrado: ValorFiltradoInterface = valoresFiltrado.find(
      obj => obj.filtro == control
    );

    if (!regla.hasOwnProperty('condicion')) {
      formato = regla.formato;
      break;
    }

    if (aplicarCondicion(regla, valorFiltrado.valor)) {
      formato = regla.formato;
      break;
    }
  }

  return formato;
}

function getFormatoOpcionPorCol(
  { reglas }: FormatoDatosInterface,
  { valor }: ValorOpcionGrupoColInterface,
): TipoFormatoValorEnum {
  let formato: TipoFormatoValorEnum = undefined;

  for (let regla of reglas) {
    if (regla.valor == valor) {
      formato = regla.formato;
      break;
    }
  }

  return formato;
}

export function fnFormatearDatos(
  formatoDatos: FormatoDatosInterface,
  valorPorColumna: ValorOpcionGrupoColInterface,
  valoresFiltrado: Array<ValorFiltradoInterface>,
  datos: Array<any>,
): Array<any> {
  return [];
  let formato: TipoFormatoValorEnum = undefined;
  let excluir: Array<string> = 'excluir' in formatoDatos
      ? formatoDatos.excluir
      : [];

  if (!formatoDatos.hasOwnProperty('para')) {
    formato = formatoDatos.reglas[0].formato;
    return aplicarFormatoADatos(formato, excluir, datos);
  }

  if (formatoDatos.para == TipoControlEnum.OpcionPorCol) {
    formato = getFormatoOpcionPorCol(formatoDatos, valorPorColumna);
  } else if (formatoDatos.para == TipoControlEnum.FiltroPorCol) {
    formato = getFormatoFiltroPorCol(formatoDatos, valoresFiltrado);
  }

  return aplicarFormatoADatos(formato, excluir, datos);
}
