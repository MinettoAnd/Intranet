import { fnDestArrObj } from "src/app/shared/utils/dest-arr-obj.util";

export function fnBuscarPorTexto(
  texto: string,
  datos: Array<any>,
): Array<any> {
  let tmpDatos: Array<any> = fnDestArrObj(datos);
  const txt = texto.trim().toLowerCase();

  if (txt.length == 0) {
    return tmpDatos;
  }

  return tmpDatos.filter(
    obj => Object.values(obj)
      .find(
        val => val?.toString().toLowerCase().indexOf(txt) !== -1
      ) != undefined
  );
}
