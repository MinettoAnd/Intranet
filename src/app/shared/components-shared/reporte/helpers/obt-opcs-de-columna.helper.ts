import { OpcionGrupoColInterface } from "../interfaces/opcion-grupo-col.interface";

export function fnObtOpcsDeColumna(
  opciones: Array<any>
): Array<OpcionGrupoColInterface> {
  const opcionesColumna: Array<OpcionGrupoColInterface> = [];
  const idxCol: number = opciones[0];

  opciones.forEach(val => {
    if (typeof val == 'object') {
      const titulo: string =Object.keys(val)[0];
      const valor: any = val[titulo];
      const isChecked: boolean = false;

      opcionesColumna.push({
        idxCol,
        titulo,
        valor,
        isChecked,
      });
    }
  });

  return opcionesColumna;
}
