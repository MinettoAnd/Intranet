import { ValorOpcionGrupoColInterface } from "../interfaces/valor-opcion-grupo-col.interface";

export function fnObtGrupoDatos(
  { idxCol, valor }: ValorOpcionGrupoColInterface,
  datos: Array<any>,
): Array<any> {
  let tmpDatos = [];
  const col: string = Object.keys(datos[0])[idxCol];

  tmpDatos = datos.filter(obj => obj[col] == valor);

  return tmpDatos;
}