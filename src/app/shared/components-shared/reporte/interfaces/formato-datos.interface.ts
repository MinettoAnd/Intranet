import { CondicionFormatoDatosEnum } from "../enums/regla-formato-datos.enum";
import { TipoControlEnum } from "../enums/tipo-control.enum";
import { TipoFormatoValorEnum } from "../enums/tipo-formato-valor.enum";

export interface ReglaFormatoDatosInterface {
  condicion?: CondicionFormatoDatosEnum,
  valor?: string,
  formato: TipoFormatoValorEnum,
}

export interface FormatoDatosInterface {
  para?: TipoControlEnum,
  control?: string,
  excluir?: Array<string>,
  reglas: Array<ReglaFormatoDatosInterface>,
}
