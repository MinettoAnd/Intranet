import { TipoValorEnum } from '../enums/tipo-valor.enum';

export interface TipoValorColumnaInterface {
    col: 2,
    formato: TipoValorEnum,
}

export interface TipoValorFilaInterface {
    fila: TipoValorEnum | Array<TipoValorColumnaInterface>
}