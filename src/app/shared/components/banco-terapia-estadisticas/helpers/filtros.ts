export function fnFiltrarCabMedicos(
    datos: Array<any>,
    excluir: Array<string> = ['CMP', 'SEDE']
): any {
    return datos.filter(obj => {
        let existe = false;

        excluir.forEach(val => {
            if (val == obj.name) {
                existe = true;
            }
        })

        return !existe;
    });
}