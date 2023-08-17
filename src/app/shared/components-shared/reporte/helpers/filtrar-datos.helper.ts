import { ValorFiltradoInterface } from "../interfaces/valor-filtrado.interface";

export function fnFiltrarDatos(
  valoresFiltrado: Array<ValorFiltradoInterface>,
  datos: Array<any>,
): Array<any> {
  let tmpDatos = datos;

  valoresFiltrado.forEach(objFiltro => {
    tmpDatos = tmpDatos.filter(
      objDato => objDato[objFiltro.filtro] == objFiltro.valor
    );
  });

  return tmpDatos;
}