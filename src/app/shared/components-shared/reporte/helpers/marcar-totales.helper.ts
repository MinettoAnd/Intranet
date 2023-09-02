import { MarcadorEnum } from "../enums/marcador.enum";

export function fnMarcarTotales(datos: Array<any>) {
  for (let obj of datos) {
    if (obj['grupo'].trim().toLowerCase() == 'total') {
      obj[MarcadorEnum.IsTotal] = true;
    }
  }
}
