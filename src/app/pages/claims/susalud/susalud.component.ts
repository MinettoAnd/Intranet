import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Angular2Txt } from "angular2-txt";
import { CausaComponent } from "src/app/modals/claims/list/causa/causa.component";
import { DetalleComponent } from "src/app/modals/claims/list/detalle/detalle.component";
import { ListcomocimientoComponent } from "src/app/modals/claims/list/listcomocimiento/listcomocimiento.component";
import { RespuestaReclamoComponent } from "src/app/modals/claims/list/respuesta-reclamo/respuesta-reclamo.component";
import { SolucionComponent } from "src/app/modals/claims/list/solucion/solucion.component";
import { IMedidas } from "src/app/pages/models/claims/IMedidas";
import { IReclamo } from "src/app/pages/models/claims/IReclamos";
import Swal from "sweetalert2";
import { TableUtil } from "utils/table_utils";
import { ClaimsService } from "../claims.service";

@Component({
    selector: "app-susalud",
    templateUrl: "./susalud.component.html",
    styleUrls: ["./susalud.component.sass"],
})
export class SusaludComponent implements OnInit {
    formListarReclamos: FormGroup;
    public submitted = false;
    public grupoDeDatos = "detalle";
    public validateSede: number;
    page = 1;
    pageSize = 50;
    collectionSize;
    reclamos: IReclamo[] = [];
    medidas: any[] = [];
    public listReclamo: any = [];
    public listMedidas: any = [];
    public listMedidasFiltro: any = [];
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
        this.formListarReclamos = this.formBuilder.group({
            tipo: ["detalle"],
            empresa: ["IAFAS"],
            mes: [],
            sede: [0],
        });
    }

    ngOnInit() {
        this.refreshCountries();
    }

    filtrarReclamos() {}

    buscar() {
        const mes = this.mes();

        if (mes == null) {
            Swal.fire({
                icon: "error",
                text: "Se requiere el mes para realizar la búsqueda.",
            });
            return false;
        }

        const form = this.formListarReclamos.value;
        this.grupoDeDatos = form.tipo;

        if (form.tipo == "detalle") {
            const data = {
                empresa: form.empresa,
                mes,
                sede: this.sede(),
                area_acceso: parseInt(localStorage.getItem("access_area")),
                id_area: parseInt(localStorage.getItem("id_area")),
                id_areav2: parseInt(localStorage.getItem("id_areav2")),
            };
            this.buscarReclamo(data);
        } else {
            const data = {
                empresa: form.empresa,
                mes,
                sede: this.sede(),
            };
            this.searhMedidasAdoptadas(data);
        }
    }

    buscarReclamo(data) {
        this.loading("Realizando Búsqueda....");
        this.apiService.getReclamoListServiceSusalud(data).then(
            (response: any) => {
                this.listReclamo =
                    response.data.length > 0 ? response.data : [];
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

    searhMedidasAdoptadas(data) {
        this.loading("Realizando Búsqueda....");
        this.apiService.getSearchMedidasAdoptadasSusalud(data).then(
            (response: any) => {
                this.listMedidas =
                    response.data.length > 0 ? response.data : [];
                Swal.close();
                this.collectionSize = this.listMedidas.length;
                this.refreshCountries();
                if (this.listMedidas.length === 0) {
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

    refreshCountries() {
        if (this.grupoDeDatos == "detalle") {
            this.reclamos = this.listReclamo
                .map((country, i) => ({ id: i + 1, ...country }))
                .slice(
                    (this.page - 1) * this.pageSize,
                    (this.page - 1) * this.pageSize + this.pageSize
                );
        } else {
            this.medidas = this.listMedidas
                .map((country, i) => ({ id: i + 1, ...country }))
                .slice(
                    (this.page - 1) * this.pageSize,
                    (this.page - 1) * this.pageSize + this.pageSize
                );
        }
    }

    diaEvento(dia) {
        if (dia === "0000-00-00 00:00:00") {
            return "--------";
        } else {
            return this.datePipe.transform(dia, "dd/MM/yyyy");
        }
    }

    getRultadoReclamo(id) {
        if (id === 0) {
            return "Pendiente";
        } else if (id === 1) {
            return "Fundado";
        } else if (id === 2) {
            return "Fundado Parcial";
        } else if (id === 3) {
            return "Infundado";
        } else if (id === 4) {
            return "Improcedente";
        } else if (id === 5) {
            return "Concluido anticipadamente";
        }
    }

    exportTramaTXT() {
        if (this.grupoDeDatos == "detalle") {
            this.exportTramaTXT_01();
        } else {
            this.exportTramaTXT_02();
        }
    }

    exportTramaTXT_01() {
        const form = this.formListarReclamos.value;
        if (form.sede === 0) {
            return Swal.fire(
                "Info...",
                "Seleccione la sede del cual desear generar la trama para la descarga",
                "info"
            );
        }
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
                this.newCorrelativoCorrecto(x.idcorrelativo), // '-1',
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

        new Angular2Txt(onlyNameAndSymbolArr, this.getNameTxt(), this.options);
    }

    exportTramaTXT_02() {
        const form = this.formListarReclamos.value;
        if (form.sede === 0) {
            return Swal.fire(
                "Info...",
                "Seleccione la sede del cual desear generar la trama para la descarga",
                "info"
            );
        }

        this.asignarDatosAMedidasFiltro();

        new Angular2Txt(
            this.getOnlyNameAndSymbolArr(),
            this.getNameTxt(),
            this.options
        );
    }

    asignarDatosAMedidasFiltro() {
        this.listMedidasFiltro = new Array();
        for (var i = 0; i < this.listMedidas.length; i++) {
            if (this.listMedidas[i].resultado_reclamo === 1) {
                this.listMedidasFiltro.push(this.listMedidas[i]);
            }
        }
    }

    getOnlyNameAndSymbolArr() {
        let onlyNameAndSymbolArr: Partial<IMedidas>[];
        onlyNameAndSymbolArr = this.listMedidasFiltro.map((x) => ({
            tipo_codigo_reclamo: x.tipo_reclamo,
            codigo_unico_registro: x.codigo_unico,
            codigo_medida_adoptada: ("00" + x.codigo_adoptado).slice(-2),
            brebe_descripcion: x.resumen,
            Naturaleza_medida: x.naturaleza,
            proceseso: x.processo_adoptada,
            fecha_inicio_implementacion: this.diaSolucion(x.fecha_inicio),
            fecha_culminacion: this.diaSolucion(x.fecha_culminacion),
        }));

        return onlyNameAndSymbolArr;
    }

    newCorrelativoCorrecto(corretalivo) {
        return ("000000" + corretalivo).slice(-6);
    }

    getDoc(doc, docrepre) {
        if (docrepre === "" || docrepre === null) {
            return doc;
        } else {
            return docrepre;
        }
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

    diaSolucion(dia) {
        if (dia === "0000-00-00 00:00:00") {
            return "";
        } else {
            return this.datePipe.transform(dia, "yyyyMMdd");
        }
    }

    motivoConlucionAnticipada(motivo) {
        if (motivo === 0) {
            return "";
        } else {
            return motivo;
        }
    }

    getNameTxt() {
        const form = this.formListarReclamos.value;
        const txt = this.grupoDeDatos == "detalle" ? "RECLAMOS" : "MEDIDAS";
        let nro = 0;

        if (parseInt(form.sede) === 1) {
            nro = 8281;
        } else if (parseInt(form.sede) === 2) {
            nro = 10251;
        } else if (parseInt(form.sede) === 4) {
            nro = 15118;
        }

        return `${nro}-${form.mes}-${txt}`;
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

    esIPRESS() {
        return this.formListarReclamos.controls.empresa.value == "IPRESS";
    }

    sede() {
        const form = this.formListarReclamos.value;
        return form.empresa == "IPRESS" ? form.sede : 0;
    }

    mes() {
        const form = this.formListarReclamos.value;
        return this.datePipe.transform(form.mes, "yyyy-MM-dd");
    }

    datosMostradosDe(grupoDeDatos) {
        return this.grupoDeDatos === grupoDeDatos;
    }

    get obtenerDatos() {
        if (this.grupoDeDatos == "detalle") {
            return this.reclamos;
        } else {
            return this.medidas;
        }
    }

    get txtBtnExportar() {
        return this.grupoDeDatos == "detalle"
            ? "detalle del reclamo"
            : "acciones tomadas";
    }

    longitudFija(texto) {
        if (texto.trim().length == 0) {
            return "";
        }

        return texto.trim().substring(0, 25) + "...";
    }
}
