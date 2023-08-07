/**
 *
 * @param data Arreglo de objetos que contienen las columnas a sumar
 * @param excluir Arreglo con nombres de columnas a excluir en la suma
 * @returns Objeto con los totales de cada columna, el resultado total es
 *          asignado con el mismo índice de la columna sumada.
 */
export function sumFilasTbl(
    data: Array<any>,
    excluir: Array<string>
): any {
    const total: any = {};

    for (let obj of data) {
        for (let idx in obj) {
            const existeIdx: any = excluir.find(v => v === idx);

            if (!existeIdx) {
                const montoObj: number = parseFloat(obj[idx]);
                const montoTotal: number = parseFloat(total[idx]);

                total[idx] = idx in total
                    ? montoTotal + montoObj
                    : montoObj;
            }
        }
    }

    return total;
}
