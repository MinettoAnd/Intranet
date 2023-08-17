import { AnchoColInterface } from "../interfaces/ancho-col.interface";

export function fnCalcAnchoCols(
  anchoFijo: Array<any>,
  nroCols: number
): Array<AnchoColInterface> {
  const anchos: Array<AnchoColInterface> = [];

  for (let idx = 0; idx < nroCols; ++idx) {
    let ancho: AnchoColInterface = {
      flexGrow: 1,
      width: undefined,
    };

    for (let obj of anchoFijo) {
      const col: any = Object.keys(obj)[0];

      if (col == idx) {
        ancho.width = obj[col];
        ancho.flexGrow = 0;
        break;
      }
    }

    anchos.push(ancho);
  }

  return anchos;
}