import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ClaimsService } from "src/app/pages/claims/claims.service";
import { GlobalConstants } from "utils/global-constants";
import Swal from "sweetalert2";

@Component({
    selector: "app-caracteristicas",
    templateUrl: "./caracteristicas.component.html",
    styleUrls: ["./caracteristicas.component.sass"],
})
export class CaracteristicasComponent implements OnInit {
    @Input() dataCaracteristicas;
    public tipoReclamo: string;
    public listsedes: any = [];
    public listrecepcions: any = [];
    public listgarantias: any = [];
    public name_garantia: string = "";

    public listcuasasespeciales: any = [];
    public listcuasasespeciales2: any = [];
    public listcuasasespeciales3: any = [];
    public name_causa_especifica: string = "";
    public listnevereclamo: any = [];
    public textLoadion: string = "";
    public texEnvioSusalud: string = "";
    detailForm: FormGroup;

    submittedinvolucrado = false;

    showcodigoweb = false;
    htmlContent = "";

    maxChars = 1500;
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: "15rem",
        minHeight: "5rem",
        placeholder: "Enter text here...",
        translate: "no",
        defaultParagraphSeparator: "p",
        defaultFontName: "Arial",
        toolbarHiddenButtons: [["bold"]],
        customClasses: [
            {
                name: "quote",
                class: "quote",
            },
            {
                name: "redText",
                class: "redText",
            },
            {
                name: "titleText",
                class: "titleText",
                tag: "h1",
            },
        ],
    };
    constructor(
        public activeModal: NgbActiveModal,
        private apiService: ClaimsService,
        private formBuilder: FormBuilder
    ) {
        this.detailForm = this.formBuilder.group({
            codigo: ["", Validators.required],
            clasificacion: ["", Validators.required],
            sede: ["", Validators.required],
            modorecpcion: [""],
            garantia: ["", Validators.required],
            causa: ["", Validators.required],
            niverelreclamo: ["", Validators.required],
            codigoweb: [""],
            codigolibrorelcamo: ["", Validators.required],
            productoservicio: ["", Validators.required],
            detalle: ["", Validators.required],
            detalle_envio: [""],
        });
    }

    ngOnInit(): void {
        this.getSedes();
        this.getRecepcion();
        this.getDerechoSalud();
        this.getNivelReclamo();
        this.name_garantia = this.dataCaracteristicas.name_garantia;
        this.name_causa_especifica =
            this.dataCaracteristicas.name_causa_especifica;
        if (
            this.dataCaracteristicas.envio_csalud === null ||
            this.dataCaracteristicas.envio_csalud === ""
        ) {
            this.texEnvioSusalud = " ";
        } else {
            this.texEnvioSusalud = this.dataCaracteristicas.envio_csalud;
        }

        this.tipoReclamo = this.dataCaracteristicas.tipo_empresa;

        console.log(this.dataCaracteristicas.envio_csalud);
    }
    getSedes() {
        this.apiService.getSedesService().then((response: any) => {
            this.listsedes = response.data.length > 0 ? response.data : [];
        });
    }
    getRecepcion() {
        this.apiService.getRecepcionService().then((response: any) => {
            this.listrecepcions = response.data.length > 0 ? response.data : [];
        });
    }

    onChangeModoRecepcion(event) {
        console.log(event.target.value);
        if (event.target.value === "1") {
            this.showcodigoweb = true;
        } else {
            this.showcodigoweb = false;
        }
    }
    getDerechoSalud() {
        this.apiService.getDerechoSalud().then((response: any) => {
            this.listgarantias = response.data.length > 0 ? response.data : [];
            const data = {
                idcausa: this.dataCaracteristicas.garantia,
                empresa: this.dataCaracteristicas.tipo_empresa,
            };
            this.getCausasEspecificas(1, data);
        });
    }
    onChangeCausas(event) {
        this.name_garantia =
            event.target.options[event.target.options.selectedIndex].text;
        if (event.target.value != 0) {
            const data = {
                idcausa: event.target.value,
                empresa: this.dataCaracteristicas.tipo_empresa,
            };
            console.log(data);
            this.getCausasEspecificas(1, data);
        } else {
            const data = {
                idcausa: event.target.value,
                empresa: this.dataCaracteristicas.tipo_empresa,
            };
            this.getCausasEspecificas(1, data);
        }
    }
    getCausasEspecificas(id: number, data) {
        switch (id) {
            case 1:
                this.apiService
                    .getCausaEspecifica(data)
                    .then((response: any) => {
                        this.listcuasasespeciales =
                            response.data.length > 0 ? response.data : [];
                    });
                break;
            case 2:
                this.apiService
                    .getCausaEspecifica(data)
                    .then((response: any) => {
                        this.listcuasasespeciales2 =
                            response.data.length > 0 ? response.data : [];
                    });
                break;
            case 3:
                this.apiService
                    .getCausaEspecifica(data)
                    .then((response: any) => {
                        this.listcuasasespeciales3 =
                            response.data.length > 0 ? response.data : [];
                    });
                break;
            default:
                console.log("No such day exists!");
                break;
        }
    }
    onChangeCausasDetail(id: number, event) {
        this.name_causa_especifica =
            event.target.options[event.target.options.selectedIndex].text;
        // this.getDetailCausaEspecifica(id, event.target.value)
    }

    getNivelReclamo() {
        this.apiService.getNivelReclamoService().then((response: any) => {
            this.listnevereclamo =
                response.data.length > 0 ? response.data : [];
        });
    }

    updateCaracteriscas() {
        const formValue = this.detailForm.value;
        const codigoweb = ("000000" + formValue.codigoweb).slice(-6);
        const data = {
            // codigo: formValue.codigo,
            clasificacion: formValue.clasificacion,
            sede: formValue.sede,
            modorecpcion: formValue.modorecpcion,
            garantia: formValue.garantia,
            name_garantia: this.name_garantia,
            causa: formValue.causa,
            name_causa_especifica: this.name_causa_especifica,
            niverelreclamo: formValue.niverelreclamo,
            // codigoweb: formValue.codigoweb,
            codigoweb: codigoweb,
            // codigolibrorelcamo: formValue.codigolibrorelcamo,
            productoservicio: formValue.productoservicio,
            detalle: formValue.detalle,
            detalle_envio: formValue.detalle_envio,
            idreclamo: this.dataCaracteristicas.idreclamo,
            tipo_empresa: this.dataCaracteristicas.tipo_empresa,
        };

        this.textLoadion = "Actualizando Informacion...";
        this.showLoading();
        this.apiService.updateReclamoCaracteristicasService(data).then(
            (response: any) => {
                const parametros = {
                    codigoweb: this.getCodigoWeb(
                        formValue.sede,
                        data.codigoweb
                    ),
                    esCorrFisico: data.modorecpcion == "2" ? "S" : "N",
                    tipo_empresa: data.tipo_empresa,
                    idreclamo: data.idreclamo,
                };

                this.apiService
                    .updateReclamoCaracteristicasTblCorrService(parametros)
                    .then((response: any) => {
                        this.activeModal.close({
                            success: 1,
                        });
                        Swal.close();
                        this.success();
                    });
            },
            (error) => {
                Swal.close();
                Swal.fire("Error!", "Intentar nuevamente", "error");
            }
        );
    }

    getCodigoWeb(idSede, codigoweb) {
        const esReclamoIpress = this.tipoReclamo.includes(
            GlobalConstants.TIPO_RECLAMO_IPRESS
        );

        if (!esReclamoIpress) {
            return codigoweb;
        }

        const sede = this.listsedes.find((sede) => {
            return sede.id_sede == idSede;
        });

        return `HP${sede.v_inicial}` + codigoweb;
    }

    showLoading() {
        Swal.fire({
            text: this.textLoadion,
            width: "15rem",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
                Swal.showLoading();
            },
        });
    }
    success() {
        Swal.fire({
            title: "Exitoso!",
            width: "20rem",
            icon: "success",
        });
    }
}
