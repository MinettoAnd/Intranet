export function fnObtNroParaCadena(val: string): number {
  let strN: string = val.replace(/[^0-9.-]+/g, '');

  if (strN.slice(-1) === '%') {
    strN = strN.slice(0, -1);
  }

  return Number(strN);
}
