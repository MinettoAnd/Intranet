export function summaryNull(cells: any): string {
    return 'TOTAL';
}

export function summaryForAmount(cells: any){
    let count: number = 0;
    let re = /\,/gi;
    let re2 = /\S\//gi;

    cells.filter((cell) => {
        cell = cell.toString();

        if (cell != null && cell != undefined) {
        if (cell.indexOf('S/') > -1) {
            count = count + +cell.replace(re2, '').replace(',', '');
        } else if (!(cell.indexOf('-') > -1 || cell.indexOf('(') > -1)) {
            count = count + +cell.replace(re, '');
        } else if (cell.indexOf('-') > -1) {
            count = count - -cell.replace(re, '');
        } else if (cell.indexOf('(') > -1) {
            let number = cell.replace('(', '').replace(')', '');
            count = count - +number.replace(re, '');
        }
        }
    });

    if(!count) {
        return count.toString().replace('NaN', 'Total');
    } else if (count.toString().indexOf('.') > -1) {
        return count.toString().indexOf('-') > -1
        ? count.toLocaleString().replace('-', '(').concat(')')
        : 'S/ ' + count.toLocaleString();
    } else {
        return count.toString().indexOf('-') > -1
        ? count.toLocaleString().replace('-', '(').concat(')')
        : count.toLocaleString();
    }
}