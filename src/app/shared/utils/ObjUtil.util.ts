export class ObjUtil {

  /**
   * Obtiene los valores únicos de un arreglos de objetos
   * para la propiedad indicada por si índice.
   *
   * @param data Arreglo de objetos
   * @param idx Índice del objeto
   * @returns Arreglo de valores
   */
  static valUnico(datos: Array<any>, idx: string): Array<any> {
    const tmpDatos: Set<any> = new Set();

    datos.forEach(obj => tmpDatos.add(obj[idx]));

    return Array.from(tmpDatos);
  }

}