import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ClaimsService } from "src/app/pages/claims/claims.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-infoclient",
    templateUrl: "./infoclient.component.html",
    styleUrls: ["./infoclient.component.sass"],
})
export class InfoclientComponent implements OnInit {
    @Input() datainfoclient;
    infoForm: FormGroup;
    public listrecepcions: any = [];
    public listestadotramites: any = [];
    public listtypepatients: any = [];
    public showafiliado = false;
    public showsegurosconvenios = false;
    public showregiment = false;
    public showplansalud = false;
    public submitted = false;
    public rucconveios: string = "";
    public name_tipo_paciente: string = "";
    public listplansalud: any = [];
    public listconveniosseguro: any = [];
    public nameregimen: string = "";
    public listconvenios: any = [];
    public fechareclamo: string = "";
    public horareclamo: string = "";
    public fechareevento: string = "";
    public horaevento: string = "";

    public fecharegistro: string = "";
    public horaregistro: string = "";
    public listdepartamentos: any = [];
    public listprovincias: any = [];
    public listdistritos: any = [];
    public departamento_id: string = "";
    public provincia_id: string = "";
    public iddepartamento: string = "";
    public idprovincia: string = "";
    public iddistrito: string = "";

    public plansalud: string = "";
    public regiment: string = "";
    public convenios: string = "";
    public codigoafliado: string = "";
    public nameestado: string = "";
    public textLoadion: string = "";
    constructor(
        public activeModal: NgbActiveModal,
        private apiService: ClaimsService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe
    ) {
        this.infoForm = this.formBuilder.group({
            estado: ["", Validators.required],
            nombre: ["", Validators.required],
            paterno: ["", Validators.required],
            materno: [""],
            historiaclinica: ["", Validators.required],
            dni: ["", Validators.required],
            telefono: ["", Validators.required],
            fechareclamo: ["", Validators.required],
            horareclamo: ["", Validators.required],
            empresa: [""],
            tipo_paciente: ["", Validators.required],
            plan_salud: [""],
            regimen: [""],
            convenios: [""],
            codigo_afiliado: [""],
            fechaevento: ["", Validators.required],
            hotaevento: ["", Validators.required],

            fecharegistro: ["", Validators.required],
            horaregistro: ["", Validators.required],
            direccion: ["", Validators.required],
            departamento: ["", Validators.required],
            provincia: ["", Validators.required],
            distrito: ["", Validators.required],
        });
    }

    ngOnInit() {
        this.fechareclamo = this.datePipe.transform(
            this.datainfoclient.fechareclamo,
            "yyyy-MM-dd"
        );
        (this.horareclamo = this.datePipe.transform(
            this.datainfoclient.fechareclamo,
            "hh:mm"
        )),
            (this.fechareevento = this.datePipe.transform(
                this.datainfoclient.fechaevento,
                "yyyy-MM-dd"
            ));
        this.horaevento = this.datePipe.transform(
            this.datainfoclient.fechaevento,
            "hh:mm"
        );

        this.fecharegistro = this.datePipe.transform(
            this.datainfoclient.fecharegistro,
            "yyyy-MM-dd"
        );
        this.horaregistro = this.datePipe.transform(
            this.datainfoclient.fecharegistro,
            "hh:mm"
        );
        this.nameestado = this.datainfoclient.nameestado;
        this.name_tipo_paciente = this.datainfoclient.nametipopaciente;
        this.nameregimen = this.datainfoclient.nameregimen;
        this.rucconveios = this.datainfoclient.ruc_empresa;
        this.getEstadoTramite();
        this.getTypePatient();

        console.log(this.datainfoclient);
    }
    get f() {
        return this.infoForm.controls;
    }
    getRecepcion() {
        this.apiService.getRecepcionService().then((response: any) => {
            this.listrecepcions = response.data.length > 0 ? response.data : [];
        });
    }
    getEstadoTramite() {
        this.apiService.getEstadoTramiteService().then((response: any) => {
            this.listestadotramites =
                response.data.length > 0 ? response.data : [];
            this.getDepartamento();
            this.iddepartamento = this.datainfoclient.departamento.trim();
            this.idprovincia = this.datainfoclient.provincia.trim();
            this.iddistrito = this.datainfoclient.distrito.trim();
            this.plansalud = this.datainfoclient.plansalud;
            this.regiment = this.datainfoclient.regiment;
            this.convenios = this.datainfoclient.convenios;
            this.codigoafliado = this.datainfoclient.codigoafiliado;
        });
    }
    //tipo paciente /type of patient
    getTypePatient() {
        this.apiService.getTipoPacienteService().then((response: any) => {
            this.listtypepatients = response.length > 0 ? response : [];
            console.log(this.listtypepatients);
            this.validate();
        });
    }
    showEmpresas(event) {
        this.plansalud = "";
        this.regiment = "";
        this.convenios = "";
        this.codigoafliado = "";
        this.nameregimen = "";
        this.name_tipo_paciente =
            event.target.options[event.target.options.selectedIndex].text;
        if (event.target.value === "19") {
            this.showplansalud = true;
            this.showsegurosconvenios = false;
            this.showregiment = false;
            this.rucconveios = "";
            this.showafiliado = true;
            this.getPlanSalud();
        } else if (
            event.target.value === "5" ||
            event.target.value === "13" ||
            event.target.value === "14" ||
            event.target.value === "6" ||
            event.target.value === "4"
        ) {
            this.showplansalud = false;
            this.showsegurosconvenios = true;
            this.showregiment = false;
            this.showafiliado = false;
            this.getByIdConveniosSeguros(event.target.value);
        } else if (
            event.target.value === "22" ||
            event.target.value === "21" ||
            event.target.value === "3" ||
            event.target.value === "23"
        ) {
            this.showplansalud = false;
            this.showsegurosconvenios = false;
            this.showregiment = true;
            this.showafiliado = false;
            this.rucconveios = "";
            if (event.target.value === "21") {
                this.showafiliado = true;
            }
        } else {
            this.showplansalud = false;
            this.showsegurosconvenios = false;
            this.showregiment = false;
            this.showafiliado = false;
        }
    }

    validate() {
        if (this.datainfoclient.tipopaciente === 19) {
            this.showplansalud = true;
            this.showsegurosconvenios = false;
            this.showregiment = false;
            this.rucconveios = "";
            this.showafiliado = true;
            this.getPlanSalud();
        }
        if (
            this.datainfoclient.tipopaciente == 5 ||
            this.datainfoclient.tipopaciente == 13 ||
            this.datainfoclient.tipopaciente == 14 ||
            this.datainfoclient.tipopaciente == 6 ||
            this.datainfoclient.tipopaciente == 4
        ) {
            this.showplansalud = false;
            this.showsegurosconvenios = true;
            this.showregiment = false;
            this.showafiliado = false;
            this.getByIdConveniosSeguros(this.datainfoclient.tipopaciente);
        }

        if (
            this.datainfoclient.tipopaciente == 22 ||
            this.datainfoclient.tipopaciente == 21 ||
            this.datainfoclient.tipopaciente == 3 ||
            this.datainfoclient.tipopaciente == 22
        ) {
            this.showplansalud = false;
            this.showsegurosconvenios = false;
            this.showregiment = true;
            this.showafiliado = false;
            this.rucconveios = "";
            if (this.datainfoclient.tipopaciente == 21) {
                this.showafiliado = true;
            }
        }
    }
    //get plan salud
    getPlanSalud() {
        this.apiService
            .getPlanSaludTipoPacienteService()
            .then((response: any) => {
                this.listplansalud = response.length > 0 ? response : [];
            });
    }
    getByIdConveniosSeguros(id) {
        const data = {
            id: parseInt(id),
            empresa: "",
        };
        this.apiService
            .getConveniosSeguroByIdService(data)
            .then((response: any) => {
                this.listconveniosseguro = response.length > 0 ? response : [];
            });
    }
    onChangeEstado(event) {
        this.nameestado =
            event.target.options[event.target.options.selectedIndex].text;
    }
    onChangeRegmin(event) {
        //console.log(event.target.options[event.target.options.selectedIndex].text);
        this.nameregimen =
            event.target.options[event.target.options.selectedIndex].text;
        // console.log(this.name_estado);
    }
    changeConveniosSeguros(event) {
        //console.log(event);
        this.getConveniosSeguros(event);
    }
    getConveniosSeguros(id) {
        //console.log(id);
        this.apiService
            .getConveniosSeguroService(this.datainfoclient.tipopaciente, id)
            .then((response: any) => {
                this.listconvenios = response.length > 0 ? response : [];
                ///this.rucconveios = this.listconvenios[0]?.DOCUMENTO.trim();
            });
    }
    //get ubigeo
    getDepartamento() {
        this.apiService.getDepartamentoService().then((response: any) => {
            this.listdepartamentos = response.length > 0 ? response : [];
            this.getProvincia(this.datainfoclient.departamento.trim());
        });
    }
    changeDepartamento(event) {
        this.idprovincia = "";
        this.iddistrito = "";
        this.departamento_id = event.target.value;
        this.getProvincia(this.departamento_id);
    }
    getProvincia(departamento) {
        this.apiService
            .getProvinciaService(departamento)
            .then((response: any) => {
                this.listprovincias = response.length > 0 ? response : [];
                this.getDistrito(
                    this.datainfoclient.departamento.trim(),
                    this.datainfoclient.provincia.trim()
                );
            });
    }
    changeProvincia(event) {
        this.provincia_id = event.target.value;
        this.getDistrito(this.departamento_id, this.provincia_id);
    }
    getDistrito(departamento, provincia) {
        this.apiService
            .getDistritoService(departamento, provincia)
            .then((response: any) => {
                this.listdistritos = response.length > 0 ? response : [];
                //this.getTypePatient();
            });
    }

    updateInfoClient() {
        this.submitted = true;
        if (this.infoForm.invalid) {
            return;
        }
        var fomrValue = this.infoForm.value;
        const nombre_completo = `${fomrValue.nombre} ${fomrValue.paterno} ${fomrValue.materno}`;

        const data = {
            estado: fomrValue.estado,
            nameestado: this.nameestado,
            nombre: fomrValue.nombre,
            paterno: fomrValue.paterno,
            materno: fomrValue.materno,
            historiaclinica: fomrValue.historiaclinica,
            dni: fomrValue.dni,
            telefono: fomrValue.telefono,
            fechareclamo:
                this.datePipe.transform(fomrValue.fechareclamo, "yyyy-MM-dd") +
                " " +
                fomrValue.horareclamo,
            correo: fomrValue.empresa,
            tipo_paciente: fomrValue.tipo_paciente,
            name_tipo_paciente: this.name_tipo_paciente,
            plan_salud: fomrValue.plan_salud,
            regimen: fomrValue.regimen,
            nameregimen: this.nameregimen,
            convenios: fomrValue.convenios,
            ruc_empresa: this.rucconveios,
            codigo_afiliado: fomrValue.codigo_afiliado,
            fechaevento:
                this.datePipe.transform(fomrValue.fechaevento, "yyyy-MM-dd") +
                " " +
                fomrValue.hotaevento,
            // fechasolucion: this.datePipe.transform(fomrValue.fechasolucion, 'yyyy-MM-dd') + ' ' + fomrValue.horasolucion,
            fecharegistro:
                this.datePipe.transform(fomrValue.fecharegistro, "yyyy-MM-dd") +
                " " +
                fomrValue.horaregistro,
            direccion: fomrValue.direccion,
            departamento: fomrValue.departamento,
            provincia: fomrValue.provincia,
            distrito: fomrValue.distrito,
            tipo_empresa: this.datainfoclient.tipo_empresa,
            nombre_completo: nombre_completo,
            idreclamo: this.datainfoclient.idreclamo,
        };
        this.textLoadion = "Actualizando Informacion...";
        this.showLoading();

        this.apiService.updateReclamoInfoClientService(data).then(
            (response: any) => {
                const data = {
                    success: 1,
                };
                this.activeModal.close(data);
                Swal.close();
                this.success();
            },
            (error) => {
                Swal.close();
                Swal.fire("Error!", "Intentar nuevamente", "error");
            }
        );
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
