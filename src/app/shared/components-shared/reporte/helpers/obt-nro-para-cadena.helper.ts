export function fnObtNroParaCadena(val: string): string {
  if (val.startsWith('S')) {
    return val.substring(2).trim();
  }

  if (val.startsWith('%')) {
    return val.substring(1).trim();
  }

  return val;
}
