import { fnDestArrObj } from "src/app/shared/utils/dest-arr-obj.util";
import { ValorOpcionGrupoColInterface } from "../interfaces/valor-opcion-grupo-col.interface";

export function fnObtGrupoDatos(
  { idxCol, valor }: ValorOpcionGrupoColInterface,
  datos: Array<any>,
): Array<any> {
  const col: string = Object.keys(datos[0])[idxCol];
  return fnDestArrObj(datos).filter(obj => obj[col] == valor);
}
