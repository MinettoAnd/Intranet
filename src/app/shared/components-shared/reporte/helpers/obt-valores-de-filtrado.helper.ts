import { OpcionFiltradoInterface } from "../interfaces/opcion-filtrado.interface";
import { ValorFiltradoInterface } from "../interfaces/valor-filtrado.interface";

export function fnObtValoresDeFiltrado(opcionesFiltrado: Array<OpcionFiltradoInterface>): Array<ValorFiltradoInterface> {
    const valores: Array<ValorFiltradoInterface> = [];

    opcionesFiltrado.forEach(obj => {
        const filtro: string = obj.col;
        const valor: any = obj.valores[0];

        valores.push({ filtro, valor });
    });

    return valores;
}