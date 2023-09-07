import { fnDestArrObj } from "src/app/shared/utils/dest-arr-obj.util";
import { fnSumFilasTbl } from "./sum-filas-tbl.helper";
import { MarcadorEnum } from "../enums/marcador.enum";

export function fnObtTotales(
  datos: Array<any>,
  excluir: Array<string> = [],
): {
  totales: Array<any>,
  calculados: boolean,
} {
  let calculados: boolean = false;
  let totales = fnDestArrObj(
    datos.filter(obj => {
      if ('grupo' in obj) {
        obj['grupo'].trim().toLowerCase() == 'total'
      }

      return false;
    })
  );

  if (totales.length == 0) {
    excluir.push('grupo');
    totales = [fnSumFilasTbl(datos, excluir)];
    calculados = true;
  }

  for (let total of totales) {
    total[MarcadorEnum.IsTotal] = true;
  }

  return { totales, calculados };
}
