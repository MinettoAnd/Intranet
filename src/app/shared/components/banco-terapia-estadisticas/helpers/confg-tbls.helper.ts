export class CalcTblMedicosDistAnXEsp {
    public static width: number = 70;

    public static cFlexGrow(idx: number): number {
        return idx === 0 ? 1 : 0;
    }

    public static cWidth(idx: number): number {
        return idx > 0 ? CalcTblMedicosDistAnXEsp.width : undefined;
    }
}
