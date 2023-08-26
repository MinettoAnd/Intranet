import { fnDestArrObj } from "src/app/shared/utils/dest-arr-obj.util";
import { ValorFiltradoInterface } from "../interfaces/valor-filtrado.interface";

export function fnFiltrarDatos(
  valoresFiltrado: Array<ValorFiltradoInterface>,
  datos: Array<any>,
): Array<any> {
  let tmpDatos = [];

  valoresFiltrado.forEach(objFiltro => {
    tmpDatos = fnDestArrObj(datos).filter(
      objDato => objDato[objFiltro.filtro] == objFiltro.valor
    );
  });

  return tmpDatos;
}
