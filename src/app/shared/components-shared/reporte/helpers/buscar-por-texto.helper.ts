export function fnBuscarPorTexto(
  texto: string,
  datos: Array<any>,
): Array<any> {
  const txt = texto.trim().toLowerCase();

  if (txt.length == 0) {
    return datos;
  }

  return datos.filter(
    obj => Object.values(obj)
                  .find(
                    val => val?.toString()
                                .toLowerCase()
                                .indexOf(txt) !== -1
                  ) != undefined
  );
}