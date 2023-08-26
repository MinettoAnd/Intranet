export function fnDestArrObj(arr: Array<any>) {
  return arr.map(obj => ({...obj}));
}
