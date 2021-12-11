import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClaimsService } from "src/app/pages/claims/claims.service";
import { DocsComponent } from "../../docs/docs.component";
import { PreviewComponent } from "../../popup/preview/preview.component";
import { CaracteristicasComponent } from "./modal/caracteristicas/caracteristicas.component";
import { DetalleInvolucradoComponent } from "./modal/detalle-involucrado/detalle-involucrado.component";
import { FilesComponent } from "./modal/files/files.component";
import { InfoclientComponent } from "./modal/infoclient/infoclient.component";
import { RepresentanteComponent } from "./modal/representante/representante.component";

@Component({
    selector: "app-detalle",
    templateUrl: "./detalle.component.html",
    styleUrls: ["./detalle.component.sass"],
})
export class DetalleComponent implements OnInit {
    @Input() dato;
    public listDetalle: any = [];
    public listdepartamentos: any = [];
    public listprovincias: any = [];
    public listdistritos: any = [];
    public departamento: string = "";
    public parentesco: any = [];
    public clasificacion: string = "";
    public sedename: string = "";
    public recepcions: any = [];
    public codigo_de_reclamo: string = "";
    public TIPO_RECLAMO: string = "";
    public listdetailreclamo: any = [];
    public productoservicio: string = "";
    public resulinfoClient: any = [];
    public resultRepresentante: any = [];
    public listcodigolibro: any = [];
    public listsarchivos: any = [];
    public resultname: string = "";
    public resultpaterno: string = "";
    public resultmaterno: string = "";
    public namenivel: string = "";

    public regionname: string = "";
    public provincianame: string = "";
    public distritoname: string = "";

    constructor(
        public activeModal: NgbActiveModal,
        private apiService: ClaimsService,
        private datePipe: DatePipe,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.TIPO_RECLAMO = this.dato.empresa;
        this.getDetailReclamo();
    }
    getDetailReclamo() {
        this.apiService
            .getReclamoByIdService(this.dato.idreclamo, this.dato.empresa)
            .then((response: any) => {
                this.listDetalle =
                    response.data.length > 0 ? response.data : [];
                this.codigo_de_reclamo =
                    this.listDetalle[0]?.v_cod_inst +
                    this.datePipe.transform(
                        this.listDetalle[0]?.d_fecha_reclamo,
                        "dMyyy"
                    ) +
                    this.listDetalle[0]?.v_correlativo_reclamo +
                    "-" +
                    this.listDetalle[0]?.v_correlativo_causa;
                console.log(this.listDetalle);
                this.listsarchivos = JSON.parse(this.listDetalle[0]?.archivos);
                if (this.listDetalle[0]?.v_cod_medico != 0) {
                    this.resultname = this.listDetalle[0]?.v_nombre_medico;
                    this.resultpaterno =
                        this.listDetalle[0]?.v_apellido_p_medico;
                    this.resultmaterno =
                        this.listDetalle[0]?.v_apellido_m_medico;
                } else if (
                    this.listDetalle[0]?.c_afiliado3 != "" ||
                    this.listDetalle[0]?.c_afiliado3 != "0"
                ) {
                    this.resultname = this.listDetalle[0]?.v_nombres3;
                    this.resultpaterno = this.listDetalle[0]?.v_p_apellidos3;
                    this.resultmaterno = this.listDetalle[0]?.v_m_apellidos3;
                }

                this.getDepartament();
                this.getParentesco();
                this.getClasificacion(this.listDetalle[0]?.id_clasificacion);
                this.getSedeName(this.listDetalle[0]?.id_sede);
                this.getModoRecepcion();
                this.getProductoServicio(this.listDetalle[0]?.id_prod_serv);
                this.getCodigoLibroService();
                this.nameNiveReclamo();
            });
    }

    nameNiveReclamo() {
        if (this.listDetalle[0]?.id_nivel_reclamo === 1) {
            this.namenivel = "Nivel 1";
        } else if (this.listDetalle[0]?.id_nivel_reclamo === 2) {
            this.namenivel = "Nivel 2";
        } else if (this.listDetalle[0]?.id_nivel_reclamo === 3) {
            this.namenivel = "Nivel 3";
        } else if (this.listDetalle[0]?.id_nivel_reclamo === 4) {
            this.namenivel = "Nivel 4";
        } else {
            this.namenivel = "";
        }
    }
    getDepartament() {
        this.apiService
            .getDepartamentoByIdService(
                this.listDetalle[0]?.id_departamento.trim()
            )
            .then((response: any) => {
                this.listdepartamentos = response;
                if (
                    this.listdepartamentos === null ||
                    this.listdepartamentos === ""
                ) {
                    this.regionname === "";
                } else {
                    this.regionname = this.listdepartamentos.DescripcionCorta;
                }
                //console.log(this.listdepartamentos);
                this.getPrivincia();
            });
    }
    getPrivincia() {
        this.apiService
            .getProvinciaByIdService(
                this.listDetalle[0]?.id_departamento.trim(),
                this.listDetalle[0]?.id_provincia.trim()
            )
            .then((response: any) => {
                this.listprovincias = response;
                if (
                    this.listprovincias === null ||
                    this.listprovincias === ""
                ) {
                    this.provincianame === "";
                } else {
                    this.provincianame = this.listprovincias.DescripcionCorta;
                }
                console.log(this.listprovincias);
                this.getDistritto();
            });
    }
    getDistritto() {
        this.apiService
            .getDistritoByIdService(
                this.listDetalle[0]?.id_departamento.trim(),
                this.listDetalle[0]?.id_provincia.trim(),
                this.listDetalle[0]?.id_distrito.trim()
            )
            .then((response: any) => {
                this.listdistritos = response;
                if (this.listdistritos === null || this.listdistritos === "") {
                    this.distritoname === "";
                } else {
                    this.distritoname = this.listdistritos.DescripcionCorta;
                }
            });
    }
    getParentesco() {
        this.apiService
            .getParentescoByIdService(this.listDetalle[0]?.id_parentesco)
            .then((response: any) => {
                this.parentesco = response.data.length > 0 ? response.data : [];
            });
    }
    getModoRecepcion() {
        this.apiService
            .getRecepcionByIdService(this.listDetalle[0]?.id_modorecepcion_v2)
            .then((response: any) => {
                this.recepcions = response.data.length > 0 ? response.data : [];
                //this.getEstadoTramite();
            });
    }
    getReclamo() {
        const data = {
            id_sede: this.listDetalle[0]?.id_sede,
            tipo_empresa: this.TIPO_RECLAMO,
            id_reclamo: this.dato.idreclamo,
        };
        this.apiService.getReclamoDetailService(data).then((response: any) => {
            this.listdetailreclamo =
                response.data.length > 0 ? response.data : [];
        });
    }
    rgetFormatFeha(fecha) {
        var fechas = "";
        if (fecha != "0000-00-00 00:00:00") {
            fechas = this.datePipe.transform(fecha, "dd/MM/yyyy h:mm:ss");
        }

        return fechas;
    }

    getClasificacion(id) {
        if (id === 1) {
            this.clasificacion = "ADMINISTRATIVO";
        } else if (id === 2) {
            this.clasificacion = "ASISTENCIAL";
        } else {
            this.clasificacion = "";
        }
    }

    getProductoServicio(id) {
        if (id === 1) {
            this.productoservicio = "Producto";
        } else if (id === 2) {
            this.productoservicio = "Servicio";
        } else {
            this.productoservicio = "";
        }
    }

    getSedeName(id) {
        if (id === 1) {
            this.sedename = "Lima";
        } else if (id === 2) {
            this.sedename = "Chorrillos";
        } else if (id === 4) {
            this.sedename = "Surco";
        } else {
            this.sedename = "";
        }
    }
    getCodigoLibroService() {
        this.apiService
            .getCodigoLibroService(this.dato.idreclamo, this.dato.empresa)
            .then((response: any) => {
                this.listcodigolibro =
                    response.data.length > 0 ? response.data : [];
            });
    }

    //NODAL
    open(id) {
        if (id == 1) {
            const data = {
                idreclamo: this.listDetalle[0]?.id_reclamo,
                tipo_empresa: this.TIPO_RECLAMO,
                estado: this.listDetalle[0]?.id_estado_v2,
                nameestado: this.listDetalle[0]?.name_estado,
                nombre: this.listDetalle[0]?.V_nombre1,
                paterno: this.listDetalle[0]?.v_paterno1,
                materno: this.listDetalle[0]?.v_materno1,
                historiaclinica: this.listDetalle[0]?.v_hist_clinica1,
                dni: this.listDetalle[0]?.v_doc_titular,
                telefono: this.listDetalle[0]?.v_telefono1,
                fechareclamo: this.listDetalle[0]?.d_registra_reclamo,
                correo: this.listDetalle[0]?.v_correop,
                tipopaciente: this.listDetalle[0]?.id_tipo_pacientev2,
                nametipopaciente: this.listDetalle[0]?.name_tipo_paciente,
                convenios: this.listDetalle[0]?.id_empresa,
                ruc_empresa: this.listDetalle[0]?.n_ruc_empresaEmpleadora,
                regiment: this.listDetalle[0]?.id_regimen_usuario,
                nameregimen: this.listDetalle[0]?.name_regimen,
                plansalud: this.listDetalle[0]?.plan_salud,
                codigoafiliado: this.listDetalle[0]?.cod_afiliado,
                fechaevento: this.listDetalle[0]?.d_fecha_reclamo,
                fechasolucion: this.listDetalle[0]?.d_solucion,
                domicilio: this.listDetalle[0]?.v_domicilio,
                fecharegistro: this.listDetalle[0]?.d_registro,
                departamento: this.listDetalle[0]?.id_departamento,
                provincia: this.listDetalle[0]?.id_provincia,
                distrito: this.listDetalle[0]?.id_distrito,
            };
            const modalRef = this.modalService.open(InfoclientComponent, {
                size: "lg",
            });
            modalRef.componentInstance.datainfoclient = data;
            modalRef.result
                .then((result) => {
                    if (result.success) {
                        this.getDetailReclamo();
                        // this.resulinfoClient = result;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (id == 2) {
            const data = {
                idreclamo: this.listDetalle[0]?.id_reclamo,
                tipo_empresa: this.TIPO_RECLAMO,
                nombre: this.listDetalle[0]?.v_Nombres2,
                paterno: this.listDetalle[0]?.v_paterno2,
                materno: this.listDetalle[0]?.v_materno2,
                telefono: this.listDetalle[0]?.v_celular2,
                parentesco: this.listDetalle[0]?.id_parentesco,
                correo: this.listDetalle[0]?.v_email2,
            };
            const modalRef = this.modalService.open(RepresentanteComponent, {
                size: "lg",
            });
            modalRef.componentInstance.datarepresentante = data;
            modalRef.result
                .then((result) => {
                    if (result.success) {
                        this.getDetailReclamo();
                        // this.resulinfoClient = result;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (id == 3) {
            var codigo;
            var rnombre = "";
            var rpaterno = "";
            var rmaterno = "";
            var peradmin = 0;
            if (this.listDetalle[0]?.v_cod_medico != 0) {
                codigo = this.listDetalle[0]?.v_cod_medico;
                rnombre = this.listDetalle[0]?.v_nombre_medico;
                rpaterno = this.listDetalle[0]?.v_apellido_p_medico;
                rmaterno = this.listDetalle[0]?.v_apellido_m_medico;
                peradmin = 2;
            } else if (
                this.listDetalle[0]?.c_afiliado3 != "" ||
                this.listDetalle[0]?.c_afiliado3 != "0"
            ) {
                codigo = this.listDetalle[0]?.c_afiliado3;
                rnombre = this.listDetalle[0]?.v_nombres3;
                rpaterno = this.listDetalle[0]?.v_p_apellidos3;
                rmaterno = this.listDetalle[0]?.v_m_apellidos3;
                peradmin = 1;
            }
            const data = {
                idreclamo: this.listDetalle[0]?.id_reclamo,
                tipo_empresa: this.TIPO_RECLAMO,
                area: this.listDetalle[0]?.Id_area3_v2,
                areaname: this.listDetalle[0]?.area_name,
                medadmin: peradmin,
                code: codigo,
                nombre: rnombre,
                paterno: rpaterno,
                materno: rmaterno,
                jcode: this.listDetalle[0]?.v_usuajefe_involucrado,
                jnombre: this.listDetalle[0]?.v_nombrejefe_involucrado,
                jpaterno: this.listDetalle[0]?.v_p_apellidojefe_involucrado,
                jmaterno: this.listDetalle[0]?.v_m_apellidojefe_involucrado,
                area_trasladado: this.listDetalle[0]?.id_area4_v2,
                area4_name: this.listDetalle[0]?.area4_name,
                pcode: this.listDetalle[0]?.v_usuario_transferido,
                pnombre: this.listDetalle[0]?.v_usuario_transferifo_nom,
                ppaterno: this.listDetalle[0]?.v_usuario_transferifo_pat,
                pmaterno: this.listDetalle[0]?.v_usuario_transferifo_mat,
            };
            const modalRef = this.modalService.open(
                DetalleInvolucradoComponent,
                { size: "lg" }
            );
            modalRef.componentInstance.datainInvolucrado = data;
            modalRef.result
                .then((result) => {
                    if (result.success) {
                        this.getDetailReclamo();
                        // this.resulinfoClient = result;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (id == 4) {
            const data = {
                idreclamo: this.listDetalle[0]?.id_reclamo,
                tipo_empresa: this.TIPO_RECLAMO,
                codigo: this.codigo_de_reclamo,
                clasificacion: this.listDetalle[0]?.id_clasificacion,
                sede: this.listDetalle[0]?.id_sede,
                modorepcion: this.listDetalle[0]?.id_modorecepcion_v2,
                garantia: this.listDetalle[0]?.id_garantia,
                name_garantia: this.listDetalle[0]?.name_garantia,
                causa: this.listDetalle[0]?.id_causa_especifica,
                name_causa_especifica:
                    this.listDetalle[0]?.name_causa_especifica,
                nivelreclamo: this.listDetalle[0]?.id_nivel_reclamo,
                codigoweb: this.listDetalle[0]?.n_cod_web,
                codigolibro: this.listcodigolibro[0]?.v_correlativo,
                prodservice: this.listDetalle[0]?.id_prod_serv,
                detalle: this.listDetalle[0]?.v_descripcion_reclamo,
                envio_csalud: this.listDetalle[0]?.descripcion_reclamo_envio,
            };
            const modalRef = this.modalService.open(CaracteristicasComponent, {
                size: "lg",
            });
            modalRef.componentInstance.dataCaracteristicas = data;
            modalRef.result
                .then((result) => {
                    if (result.success) {
                        this.getDetailReclamo();
                        // this.resulinfoClient = result;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    previewPrint() {
        var fecha = this.datePipe.transform(
            this.listDetalle[0]?.d_registro,
            "yyyyMMdd"
        );
        var fecha_actual = this.datePipe.transform("2021-04-14", "yyyyMMdd");
        var estadoprint = 0;
        if (parseInt(fecha) < parseInt(fecha_actual)) {
            console.log("menor", fecha);
            estadoprint = 1;
        } else if (parseInt(fecha) >= parseInt(fecha_actual)) {
            estadoprint = 2;
            console.log("mayor", fecha);
        }
        const data = {
            idreclamo: this.dato.idreclamo,
            empresa: this.TIPO_RECLAMO,
            showtemplate: estadoprint,
        };
        const modalRef = this.modalService.open(PreviewComponent, {
            size: <any>"xl",
        });
        modalRef.componentInstance.dato = data;
    }
    deleteFile(filename: string) {
        // console.log(files);
        const datafile = {
            filename: filename,
        };
        //console.log('old array', this.listsarchivos)
        this.removeItemFromArr(this.listsarchivos, filename);
        //console.log('new arrar', this.listsarchivos)
        //TODO:Implementar funcion para eliminar archivo

        this.apiService.deleteFiles(datafile).then((response: any) => {
            console.log(response);
            if (response.success) {
                this.updateNameFiles(this.listsarchivos);
            } else {
                this.updateNameFiles(this.listsarchivos);
            }
        });
        //TODO:Implementar funcion para actulizar db
    }

    removeItemFromArr(arr, item) {
        var i = arr.indexOf(item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
    }

    updateNameFiles(fileNames) {
        console.log("update ok", fileNames.length);
        /*  var  = "";
     if (arraydata.length > 0) {
       fileNames = arraydata
     } */
        const data = {
            empresa: this.TIPO_RECLAMO,
            archivos: fileNames,
            id_reclamo: this.dato.idreclamo,
        };
        console.log("send data", data);
        this.apiService
            .updateReclamoFilesService(data)
            .then((result) => {
                console.log("update archivos exitoso");
            })
            .catch((err) => {
                console.log("error", err);
            });
    }

    openModalFile() {
        const data = {
            empresa: this.TIPO_RECLAMO,
            archivos: this.listsarchivos,
            id_reclamo: this.dato.idreclamo,
            estado: true,
        };
        const modalRef = this.modalService.open(FilesComponent, { size: "lg" });
        modalRef.componentInstance.datafiles = data;
        modalRef.result
            .then((result) => {
                if (result.success === 1) {
                    this.getDetailReclamo();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    openDocs(url) {
        const data = {
            url: url,
        };
        const modalRef = this.modalService.open(DocsComponent, {
            size: <any>"xl",
        });
        modalRef.componentInstance.dato = data;
        modalRef.result
            .then((result) => {
                if (result.success) {
                    // this.getListMedidas();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
