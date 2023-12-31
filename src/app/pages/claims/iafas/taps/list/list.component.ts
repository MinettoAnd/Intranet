import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CausaComponent } from "src/app/modals/claims/list/causa/causa.component";
import { DetalleComponent } from "src/app/modals/claims/list/detalle/detalle.component";
import { ListcomocimientoComponent } from "src/app/modals/claims/list/listcomocimiento/listcomocimiento.component";
import { RespuestaReclamoComponent } from "src/app/modals/claims/list/respuesta-reclamo/respuesta-reclamo.component";
import { SolucionComponent } from "src/app/modals/claims/list/solucion/solucion.component";
import { IMedidas } from "src/app/pages/models/claims/IMedidas";
import { IReclamo } from "src/app/pages/models/claims/IReclamos";
import Swal from "sweetalert2";
import { GlobalConstants } from "utils/global-constants";
import { TableUtil } from "utils/table_utils";
import { ClaimsService } from "../../../claims.service";
import { Angular2Txt } from "angular2-txt";
@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
    formSearchReclamo: FormGroup;
    public submitted = false;
    page = 1;
    pageSize = 50;
    collectionSize;
    reclamos: IReclamo[];
    public listReclamo: any = [];
    public listMedidas: any = [];
    public listMedidasFiltro: any = [];
    public nameresultado_reclamo = "";
    options = {
        fieldSeparator: "|",
        quoteStrings: "",
        decimalseparator: ".",
        showTitle: false,
        useBom: true,
    };
    constructor(
        private datePipe: DatePipe,
        private formBuilder: FormBuilder,
        private apiService: ClaimsService,
        private modalService: NgbModal
    ) {
        this.formSearchReclamo = this.formBuilder.group({
            fechainicio: [this.restarDias(new Date(), 7)],
            fechafin: [this.datePipe.transform(new Date(), "yyyy-MM-dd")],
            afectado: [""],
            sede: [""],
            estado: [""],
        });
    }

    ngOnInit() {
        this.refreshCountries();
        //this.searhReclamo();
    }
    restarDias(fecha, dias) {
        var fechalim = fecha.setDate(fecha.getDate() - dias);
        var fechas = this.datePipe.transform(fechalim, "yyyy-MM-dd");
        return fechas;
    }

    searhReclamo() {
        const form = this.formSearchReclamo.value;
        const data = {
            empresa: GlobalConstants.TIPO_RECLAMO_IAFAS,
            fechainicio: this.datePipe.transform(
                form.fechainicio,
                "yyyy-MM-dd"
            ),
            fechafin: this.datePipe.transform(form.fechafin, "yyyy-MM-dd"),
            afectado: form.afectado,
            sede: form.sede,
            area_acceso: parseInt(localStorage.getItem("access_area")),
            id_area: localStorage.getItem("id_area"),
            id_areav2: parseInt(localStorage.getItem("id_areav2")),
        };
        this.loading("Realizando Busqueda....");
        this.apiService.getReclamoListService(data).then(
            (response: any) => {
                this.listReclamo =
                    response.data.length > 0 ? response.data : [];
                this.searhMedidasAdoptadas();
                Swal.close();
                this.collectionSize = this.listReclamo.length;
                this.refreshCountries();
                if (this.listReclamo.length === 0) {
                    this.showMessage();
                }
            },
            (error) => {
                Swal.close();
                console.log(error);
                this.showError(error);
            }
        );
    }
    searhMedidasAdoptadas() {
        const form = this.formSearchReclamo.value;
        const data = {
            empresa: GlobalConstants.TIPO_RECLAMO_IAFAS,
            fechainicio: this.datePipe.transform(
                form.fechainicio,
                "yyyy-MM-dd"
            ),
            fechafin: this.datePipe.transform(form.fechafin, "yyyy-MM-dd"),
            afectado: form.afectado,
            sede: form.sede,
        };
        this.apiService
            .getSearchMedidasAdoptadas(data)
            .then((response: any) => {
                this.listMedidas =
                    response.data.length > 0 ? response.data : [];
            });
    }
    diaEvento(dia) {
        if (dia === "0000-00-00 00:00:00") {
            return "--------";
        } else {
            return this.datePipe.transform(dia, "dd/MM/yyyy");
        }
    }
    refreshCountries() {
        this.reclamos = this.listReclamo
            .map((country, i) => ({ id: i + 1, ...country }))
            .slice(
                (this.page - 1) * this.pageSize,
                (this.page - 1) * this.pageSize + this.pageSize
            );
    }

    getsedeName(id) {
        if (id === 1) {
            return "Lima";
        } else if (id === 2) {
            return "Chorrillos";
        } else if (id === 4) {
            return "Surco";
        } else {
            return "--------";
        }
    }
    showError(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo cargar la información",
            footer: "" + error,
        });
    }
    showMessage() {
        Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Sin resultado",
            footer: "",
        });
    }
    diaSolucion(dia) {
        if (dia === "0000-00-00 00:00:00") {
            return "";
        } else {
            return this.datePipe.transform(dia, "yyyyMMdd");
        }
    }

    getRultadoReclamo(id) {
        if (id === 0) {
            return (this.nameresultado_reclamo = "Pendiente");
        } else if (id === 1) {
            return (this.nameresultado_reclamo = "Fundado");
        } else if (id === 2) {
            return (this.nameresultado_reclamo = "Fundado Parcial");
        } else if (id === 3) {
            return (this.nameresultado_reclamo = "Infundado");
        } else if (id === 4) {
            return (this.nameresultado_reclamo = "Improcedente");
        } else if (id === 5) {
            return (this.nameresultado_reclamo = "Concluido anticipadamente");
        }
    }

    newCorrelativoCorrecto(corretalivo) {
        return ("000000" + corretalivo).slice(-6);
    }

    exportExcel() {
        var onlyNameAndSymbolArr: Partial<IReclamo>[];
        onlyNameAndSymbolArr = this.listReclamo.map((x) => ({
            "N° Reclamo":
                parseInt(x.cod_administrativo_d) +
                "-" +
                this.newCorrelativoCorrecto(x.v_correlativo_reclamo.trim()),
            "Fecha Reclamo": this.diaEvento(x.d_registra_reclamo), //falta difinir
            "Fecha Evento": this.diaEvento(x.d_fecha_reclamo),
            Sede: this.getsedeName(x.id_sede),
            Estado: x.name_estado, //falta difinir
            Afectado:
                x.V_nombre1.trim() +
                " " +
                x.v_paterno1.trim() +
                " " +
                x.v_materno1.trim(),
            "Resultado Reclamo": this.getRultadoReclamo(x.id_resultado_reclamo),
            "Area Involucrado": x.area_name,
            Causa: x.name_garantia,
        }));
        TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "00000012312");
    }
    //Generar Trama
    exportExcelTrama1() {
        var onlyNameAndSymbolArr: Partial<IReclamo>[];
        onlyNameAndSymbolArr = this.listReclamo.map((x) => ({
            periodo: this.datePipe.transform(x.d_registra_reclamo, "yyyyMM"),
            tipo_administrador_declarante: x.tipo_administrativo,
            codigo_administrativo: parseInt(x.cod_administrativo_d), //falta difinir
            codigo_ugipress: parseInt(x.cod_ugipress),
            tipo_institucion: x.tipo_administrativo,
            codigo_administrativo_presento_reclamo: parseInt(
                x.cod_administrativo_p
            ), //falta difinir
            medio_presentacion_reclamo: x.id_modorecepcion_v2,
            codigo_unico_reclamo:
                parseInt(x.cod_administrativo_d) +
                "-" +
                parseInt(x.v_correlativo_reclamo),
            tipo_documento_usuario_afectado: x.n_tipo_doc_titular,
            numero_documento: x.v_doc_titular.trim(),
            razon_social: x.razon_social_p,
            nombres: x.V_nombre1.trim(),
            apellido_paterno: x.v_paterno1.trim(),
            apellido_materno: x.v_materno1.trim(),
            tipo_documento_presenta_reclamo: parseInt(
                this.getDoc(x.n_tipo_doc_titular, x.n_tipo_doc_reclama.trim())
            ),
            numere_documento_presenta_reclamo: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.v_doc_titular.trim(),
                x.v_doc_reclama.trim()
            ),
            razon_social2: x.razon_social_r,
            nombres2: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.V_nombre1.trim(),
                x.v_Nombres2.trim()
            ),
            apellido_paterno2: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.v_paterno1.trim(),
                x.v_paterno2.trim()
            ),
            apellido_materno2: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.v_materno1.trim(),
                x.v_materno2
            ),
            autorizacion_notificacion: x.autoriza_rpta_email.trim(),
            correo: x.v_email2.trim(),
            domicilio: x.v_domicilio.trim(),
            telefono_celular: x.v_celular2.trim(),
            medio_recepcion_reclamo: x.id_modorecepcion_v2,
            fecha_presentada_reclamo: this.diaSolucion(x.d_fecha_reclamo),
            detalle_reclamo: x.v_descripcion_reclamo.trim(),
            servicio_origen: x.id_servicio_efectuado, //verficar
            competencia_para_atencion: x.id_competencia_atencion, //verficar
            causa_del_reclamo_01: x.id_causa_especifica,
            causa_del_reclamo_02: x.id_causa_especifica_2,
            causa_del_reclamo_03: x.id_causa_especifica_3,
            estado_reclamo: x.id_estado_v2,
            codigo_reclamo_primigenio: x.codigo_reclamo,
            etapa_reclamo: x.estapa_reclamo,
            tipo_administrador: x.tipo_admin,
            codigo_administrador: x.codigo_admin,

            resultado_reclamo: x.id_resultado_reclamo,
            motivo_conclucion: this.motivoConlucionAnticipada(x.id_motivo),
            fecha_reclamo_resuelto: this.diaSolucion(x.d_solucion),
            comunicacion_resultado_reclamo: 2,
            fecha_notificacion: this.diaSolucion(x.d_fecha_reclamo),
        }));
        TableUtil.exportArrayToExcel(
            onlyNameAndSymbolArr,
            this.getNameFileTramite()
        );
    }
    exportExcelTrama2() {
        var onlyNameAndSymbolArr2: Partial<IMedidas>[];
        this.listMedidasFiltro = new Array();
        for (var i = 0; i < this.listMedidas.length; i++) {
            if (this.listMedidas[i].resultado_reclamo === 1) {
                this.listMedidasFiltro.push(this.listMedidas[i]);
            }
        }
        onlyNameAndSymbolArr2 = this.listMedidasFiltro.map((x) => ({
            tipo_codigo_reclamo: x.tipo_reclamo,
            codigo_unico_registro: x.codigo_unico,
            codigo_medida_adoptada: ("00" + x.codigo_adoptado).slice(-2),
            brebe_descripcion: x.resumen,
            Naturaleza_medida: x.naturaleza,
            proceseso: x.processo_adoptada,
            fecha_inicio_implementacion: this.diaSolucion(x.fecha_inicio),
            fecha_culminacion: this.diaSolucion(x.fecha_culminacion),
        }));
        TableUtil.exportArrayToExcel(
            onlyNameAndSymbolArr2,
            this.getNametxtTramite()
        );
    }

    exportTramaTXT_01() {
        var onlyNameAndSymbolArr: Partial<IReclamo>[];
        onlyNameAndSymbolArr = this.listReclamo.map((x) => ({
            periodo: this.datePipe.transform(x.d_registra_reclamo, "yyyyMM"),
            tipo_administrador_declarante: x.tipo_administrativo,
            codigo_administrativo: parseInt(x.cod_administrativo_d), //falta difinir
            codigo_ugipress: parseInt(x.cod_ugipress),
            tipo_institucion: x.tipo_administrativo,
            codigo_administrativo_presento_reclamo: parseInt(
                x.cod_administrativo_p
            ), //falta difinir
            medio_presentacion_reclamo: x.id_modorecepcion_v2,
            codigo_unico_reclamo:
                parseInt(x.cod_administrativo_d) +
                "-" +
                parseInt(x.v_correlativo_reclamo),
            tipo_documento_usuario_afectado: x.n_tipo_doc_titular,
            numero_documento: x.v_doc_titular.trim(),
            razon_social: x.razon_social_p,
            nombres: x.V_nombre1.trim(),
            apellido_paterno: x.v_paterno1.trim(),
            apellido_materno: x.v_materno1.trim(),
            tipo_documento_presenta_reclamo: parseInt(
                this.getDoc(x.n_tipo_doc_titular, x.n_tipo_doc_reclama.trim())
            ),
            numere_documento_presenta_reclamo: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.v_doc_titular.trim(),
                x.v_doc_reclama.trim()
            ),
            razon_social2: x.razon_social_r,
            nombres2: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.V_nombre1.trim(),
                x.v_Nombres2.trim()
            ),
            apellido_paterno2: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.v_paterno1.trim(),
                x.v_paterno2.trim()
            ),
            apellido_materno2: this.getName(
                x.n_tipo_doc_reclama.trim(),
                x.v_materno1.trim(),
                x.v_materno2
            ),
            autorizacion_notificacion: x.autoriza_rpta_email.trim(),
            correo: x.v_email2.trim(),
            domicilio: x.v_domicilio.trim(),
            telefono_celular: x.v_celular2.trim(),
            medio_recepcion_reclamo: x.id_modorecepcion_v2,
            fecha_presentada_reclamo: this.diaSolucion(x.d_fecha_reclamo),
            detalle_reclamo: x.v_descripcion_reclamo.trim(),
            servicio_origen: ("0" + x.id_servicio_efectuado).substring(
                ("0" + x.id_servicio_efectuado).length - 3,
                2
            ), //verficar
            competencia_para_atencion: x.id_competencia_atencion, //verficar
            causa_del_reclamo_01: x.id_maestro_causa_especifica,
            causa_del_reclamo_02:
                x.id_maestro_causa_especifica_2 == null
                    ? ""
                    : x.id_maestro_causa_especifica_2,
            causa_del_reclamo_03:
                x.id_maestro_causa_especifica_3 == null
                    ? ""
                    : x.id_maestro_causa_especifica_3,
            estado_reclamo: x.id_estado_v2,
            codigo_reclamo_primigenio: x.codigo_reclamo,
            etapa_reclamo: x.estapa_reclamo,
            tipo_administrador: x.tipo_admin,
            codigo_administrador: x.codigo_admin,

            resultado_reclamo: x.id_resultado_reclamo,
            motivo_conclucion: this.motivoConlucionAnticipada(x.id_motivo),
            fecha_reclamo_resuelto: this.diaSolucion(x.d_solucion),
            comunicacion_resultado_reclamo: 2,
            fecha_notificacion: this.diaSolucion(x.d_respuesta_afi),
        }));
        console.log(onlyNameAndSymbolArr);
        new Angular2Txt(
            onlyNameAndSymbolArr,
            this.getNameFileTramite(),
            this.options
        );
    }

    exportTramaTXT_02() {
        var onlyNameAndSymbolArr2: Partial<IMedidas>[];
        this.listMedidasFiltro = new Array();
        for (var i = 0; i < this.listMedidas.length; i++) {
            if (this.listMedidas[i].resultado_reclamo === 1) {
                this.listMedidasFiltro.push(this.listMedidas[i]);
            }
        }
        onlyNameAndSymbolArr2 = this.listMedidasFiltro.map((x) => ({
            tipo_codigo_reclamo: x.tipo_reclamo,
            codigo_unico_registro: x.codigo_unico,
            codigo_medida_adoptada: ("00" + x.codigo_adoptado).slice(-2),
            brebe_descripcion: x.resumen,
            Naturaleza_medida: x.naturaleza,
            proceseso: x.processo_adoptada,
            fecha_inicio_implementacion: this.diaSolucion(x.fecha_inicio),
            fecha_culminacion: this.diaSolucion(x.fecha_culminacion),
        }));

        new Angular2Txt(
            onlyNameAndSymbolArr2,
            this.getNametxtTramite(),
            this.options
        );
    }
    //loading
    async loading(searchtxt) {
        Swal.fire({
            html: `<h3 style="font-size:12px;text-align: center;">${searchtxt}</h3>`,
            width: "250px",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
                Swal.showLoading();
            },
        });
    }

    open(option, idreclamo, sede, correlativo) {
        if (option === 1) {
            const data = {
                idreclamo: idreclamo,
                empresa: GlobalConstants.TIPO_RECLAMO_IAFAS,
            };
            const modalRef = this.modalService.open(DetalleComponent, {
                size: <any>"xl",
            });
            modalRef.componentInstance.dato = data;
        }
        if (option === 2) {
            const data = {
                idreclamo: idreclamo,
                empresa: GlobalConstants.TIPO_RECLAMO_IAFAS,
            };
            const modalRef = this.modalService.open(SolucionComponent, {
                size: <any>"xl",
            });
            modalRef.componentInstance.dato = data;
        }
        if (option === 3) {
            const data = {
                idreclamo: idreclamo,
                empresa: GlobalConstants.TIPO_RECLAMO_IAFAS,
            };
            const modalRef = this.modalService.open(ListcomocimientoComponent, {
                size: "lg",
            });
            modalRef.componentInstance.dato = data;
        }
        if (option === 4) {
            const data = {
                idreclamo: idreclamo,
                empresa: GlobalConstants.TIPO_RECLAMO_IAFAS,
                sede: sede,
                correlativo: correlativo,
            };
            const modalRef = this.modalService.open(RespuestaReclamoComponent, {
                size: <any>"xl",
            });
            modalRef.componentInstance.dato = data;
        }
    }

    showCausa(causa) {
        const modalRef = this.modalService.open(CausaComponent, { size: "lg" });
        modalRef.componentInstance.dato = causa;
    }

    getNameFileTramite() {
        const form = this.formSearchReclamo.value;
        return (
            20027 +
            "_" +
            this.datePipe.transform(form.fechafin, "yyyy") +
            "_" +
            this.datePipe.transform(form.fechafin, "MM") +
            "_" +
            "RECLAMOS"
        );
    }

    getNametxtTramite() {
        const form = this.formSearchReclamo.value;
        return (
            20027 +
            "_" +
            this.datePipe.transform(form.fechafin, "yyyy") +
            "_" +
            this.datePipe.transform(form.fechafin, "MM") +
            "_" +
            "MEDIDAS"
        );
    }
    getName(tipodocumento, paciente, representante) {
        if (parseInt(tipodocumento) === 11) {
            return "";
        } else {
            if (representante === "" || representante === null) {
                return paciente;
            } else {
                return representante;
            }
        }
    }
    getDoc(doc, docrepre) {
        if (docrepre === "" || docrepre === null) {
            return doc;
        } else {
            return docrepre;
        }
    }
    motivoConlucionAnticipada(motivo) {
        if (motivo === 0) {
            return "";
        } else {
            return motivo;
        }
    }
}
