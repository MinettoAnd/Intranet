enum OpcFiltroEnum {
    Cantidad = 'cantidad',
    Soles = 'soles',
}

export class CalcTblTipPaciente {
    public static minWidth: number = 70;
    public static maxWidth: number = 140;
    public static opcFiltro = OpcFiltroEnum;

    public static cFlexGrow(idx: number): number {
        return idx === 0 ? 1 : 0;
    }

    public static cWidth(idx: number, opcFiltro: OpcFiltroEnum): number {
        return idx > 0 ? CalcTblTipPaciente.getWidth(opcFiltro) : undefined;
    }

    private static getWidth(opcFiltro: OpcFiltroEnum): number {
        if (CalcTblTipPaciente.opcFiltro.Cantidad == opcFiltro) {
            return CalcTblTipPaciente.minWidth;
        }

        if (CalcTblTipPaciente.opcFiltro.Soles == opcFiltro) {
            return CalcTblTipPaciente.maxWidth;
        }

        return CalcTblTipPaciente.minWidth;
    }
}

export class CalcTblDiagAlta {
    public static width: number = 70;
    public static opcFiltro = OpcFiltroEnum;

    public static cFlexGrow(idx: number): number {
        return idx === 0 ? 1 : 0;
    }

    public static cWidth(idx: number): number {
        return idx > 0 ? CalcTblDiagAlta.width : undefined;
    }
}
