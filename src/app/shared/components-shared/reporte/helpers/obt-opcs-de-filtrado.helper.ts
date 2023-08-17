import { ObjUtil } from "src/app/shared/utils/ObjUtil.util";
import { OpcionFiltradoInterface } from '../interfaces/opcion-filtrado.interface';

export function fnObtOpcsDeFiltrado(
  filtros: Array<any>,
  datos: Array<any>
): Array<OpcionFiltradoInterface> {
  const opcionesFiltrado: Array<OpcionFiltradoInterface> = [];

  filtros.forEach(obj => {
    const titulo: string =Object.keys(obj)[0];
    const col: any = obj[titulo];
    const valores: Array<any> = ObjUtil.valUnico(datos, col);

    opcionesFiltrado.push({
      titulo,
      col,
      valores,
    });
  });

  return opcionesFiltrado;
}
