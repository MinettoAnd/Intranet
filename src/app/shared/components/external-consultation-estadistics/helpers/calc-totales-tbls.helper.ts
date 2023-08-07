import { sumFilasTbl } from "./sum-filas-tbl.helper";

export function calcTotalesTblRangoEtareo(data: any): any {
    const excluir = ['idRango', 'rango'];
    const totales: any = sumFilasTbl(data, excluir);

    totales['rango'] = 'TOTAL';
    totales['GRUPO2'] = 'TOTAL';

    return totales;
}
