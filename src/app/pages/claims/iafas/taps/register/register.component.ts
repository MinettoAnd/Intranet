import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConocimientoComponent } from "src/app/modals/claims/popup/conocimiento/conocimiento.component";
import { ConveniosComponent } from "src/app/modals/claims/popup/convenios/convenios.component";
import { InvolucradoComponent } from "src/app/modals/claims/popup/involucrado/involucrado.component";
import { SearchComponent } from "src/app/modals/claims/popup/search/search.component";
// import { FormDataRegistroReclamo } from "src/app/models/forms-data/form-data-registro-reclamo.model";
import Swal from "sweetalert2";
import { ClaimsService } from "../../../claims.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    // datosFormRegistroReclamos: FormDataRegistroReclamo;

    model: NgbDateStruct;
    public listSearchPerson: any = [];
    seachForm: FormGroup;
    seachInvolucradoForm: FormGroup;
    seachParaConocimientoForm: FormGroup;
    seachParaConocimientoForm2: FormGroup;
    seachParaConocimientoForm3: FormGroup;

    pacienteForm: FormGroup;
    parentescoForm: FormGroup;

    detailForm: FormGroup;
    causaForm: FormGroup;
    involucradoForm: FormGroup;
    accionesForm: FormGroup;

    submitted = false;
    submittedpatient = false;
    submittedinvolucrado = false;
    submittedinvolucradoservicio = false;
    submitteddetail = false;
    submittedsearchpersonal1 = false;
    submittedsearchpersonal2 = false;
    submittedsearchpersonal3 = false;

    public detailpaciente: any = [];
    public listtypedocument: any = [];
    public listdepartamentos: any = [];
    public listprovincias: any = [];
    public listdistritos: any = [];
    public departamento_id: string;
    public provincia_id: string;

    // Datos del paciente
    public detPacteNombres;
    public detPacteApellidoPaterno;
    public detPacteApellidoMaterno;
    public detPactehclinica;
    public detPacteTelefono;
    public detPacteCorreoElectronico;
    public detPacteDocumento;
    public detPacteFechaNacimiento;
    public detPacteSexo;
    public detPacteDireccion;

    public listtypepatients: any = [];

    //
    public showafiliado = false;
    public showsegurosconvenios = false;
    public showregiment = false;
    public showplansalud = false;

    public rucconveios: string = "";
    public namerucvoncenios: string = "";
    public codruc: string = "";

    public listplansalud: any = [];
    public listconveniosseguro: any = [];
    public listconvenios: any = [];

    public listtypeseguro: any = [];
    public listviculos: any = [];

    public listparentesco: any = [];

    myFiles: string[] = [];
    archivos: any = [];

    public listsedes: any = [];
    public listsucursalasignado: any = [];
    public idsurcursal: number = 0;

    public listrecepcions: any = [];
    public listestadotramites: any = [];
    public tramite: number = 2;
    public nameestado: string = "";
    public nameregimen: string = "";
    public descrpreclamo: string = " ";
    maxChars = 1500;
    txtcolor;

    public listgarantias: any = [];
    public listcuasasespeciales: any = [];
    public listcuasasespeciales2: any = [];
    public listcuasasespeciales3: any = [];

    public listdetailcausa: any = [];
    public listdetailcausa2: any = [];
    public listdetailcausa3: any = [];
    public fechalimite: string = "";
    public fechalimite2: string = "";
    public fechalimite3: string = "";
    public showcausa = false;
    public showcausa2 = false;
    public showcausa3 = false;
    public showcodigoweb = false;
    public showrazonsocialpaciente = false;
    public showrazonsocialrepresentante = false;

    public listareas: any = [];
    public namearea: string = "";

    public listinvolucrados: any = [];
    public detailinvolucrados: any[];

    public listpersonal: any = [];
    public listjefe: any = [];

    public showparaconocimiento = false;

    public listpersobals1: any = [];
    public listpersobals2: any = [];
    public listpersobals3: any = [];

    public listdetalpersonal01: any = [];
    public listdetalpersonal02: any = [];
    public listdetalpersonal03: any = [];

    m_sede: string = "";
    cod_ugipress: string = "";
    cod_admi_d: string = "";
    cod_admi_p: string = "";
    tipo_admin_t: number = 0;
    public codigotipopaciente = "";

    public correojefe: string = "";

    public listprofiles: any = [];
    public inicialnombre: string = "";
    public inicialapellido: string = "";

    public mailconocimiento: string = "";
    public mailconocimiento2: string = "";
    public nombrecomplepaciente: string = "";

    public codigo_institucion: string = "00020027";

    public listareausers: any = [];
    public area_usuario: string = "";
    public TIPO_RECLAMO: string = "IAFAS";

    public listcorretalivos: any = [];
    public numcorrelativo: string = "";
    public correlativo: string = "";

    public maxid_reclamo: string = "";

    public listrespreclamo: any = [];
    public byidsedes: any = [];
    byidsede;
    public maxids: any = [];
    max_id_libro;
    vcorrelativo;
    public name_garantia: string = "";
    public name_causa_especifica: string = "";
    public name_tipo_paciente: string = "";
    public listservicios: any = [];

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private apiService: ClaimsService,
        private datePipe: DatePipe
    ) {
        this.seachForm = this.formBuilder.group({
            searchtipo: ["", Validators.required],
            txtsearch: ["", Validators.required],
        });

        this.pacienteForm = this.formBuilder.group({
            nombre: ["", Validators.required],
            paterno: ["", Validators.required],
            materno: ["", Validators.required],
            historia: ["", Validators.required],
            telefono: ["", [Validators.maxLength(9), Validators.required]],
            correo: [""],
            tipodoc: ["", Validators.required],
            numreodoc: ["", Validators.required],
            razonsocial: [""],
            fecha_nacimiento: [""],
            sexo: [""],
            domicilio: [""],
            departamento: [""],
            privincia: [""],
            distrito: [""],
            tipo_paciente: ["", Validators.required],
            plan_salud: [""],
            regimen: [""],
            convenios: [""],
            conveniosname: [""],
            codigo_afiliado: [""],
            ruc: [""],
            tipo_aseg: [""],
            vinculo: [""],
        });
        this.parentescoForm = this.formBuilder.group({
            repretipodoc: [""],
            reprenumreodoc: [""],
            razonsocialrepre: [""],
            parentesco: [""],
            reprenombre: [""],
            reprepaterno: [""],
            reprematerno: [""],
            repretelefono: [""],
            repremail: [""],
        });
        this.detailForm = this.formBuilder.group({
            fechaevento: [""],
            horarenvento: [""],
            administrativo: [""],
            fechareclamo: [""],
            horareclamo: [""],
            productoservicio: ["2"],
            file: [""],
            sede: [""],
            modorecepcion: [""],
            estado: [""],
            codigoweb: [""],
            usuario_autoriza: ["", Validators.required],
            descripcion_reclamo: [""],
        });
        this.causaForm = this.formBuilder.group({
            derechosalud: [""],
            causaespecifica: [""],
            derechosalud1: [""],
            causaespecifica1: [""],
            derechosalud2: [""],
            causaespecifica2: [""],
            monto: [""],
        });
        this.involucradoForm = this.formBuilder.group({
            servicio_efectuado: ["", Validators.required],
            area: [""],
            involucrado: [""],
            codinvolucrado: [""],
            shnombre: [""],
            shpaterno: [""],
            shmaterno: [""],
            codjefe: [""],
            jefenombre: [""],
            jefepaterno: [""],
            jefematerno: [""],
            jefecorreo: [""],
        });
        this.seachInvolucradoForm = this.formBuilder.group({
            txtinvolucrado: ["", Validators.required],
        });

        this.accionesForm = this.formBuilder.group({
            descripcionscciones: [""],
            p1code: [""],
            p1nombre: [""],
            p1paterno: [""],
            p1materno: [""],
            p1correo: [""],
            p2code: [""],
            p2nombre: [""],
            p2paterno: [""],
            p2materno: [""],
            p2correo: [""],
            p3code: [""],
            p3nombre: [""],
            p3paterno: [""],
            p3materno: [""],
            p3correo: [""],
        });
        this.seachParaConocimientoForm = this.formBuilder.group({
            personal1: ["", Validators.required],
        });
        this.seachParaConocimientoForm2 = this.formBuilder.group({
            personal2: ["", Validators.required],
        });
        this.seachParaConocimientoForm3 = this.formBuilder.group({
            personal3: ["", Validators.required],
        });
    }

    ngOnInit() {
        this.getTypeDocument();
        this.getDepartamento();
        this.getTipoSeguro();
        this.getViculo();
        this.getParentesco();
        this.getSedes();
        this.getRecepcion();
        this.getEstadoTramite();
        this.getDerechoSalud();
        this.getServiciosEfectuado();
    }
    get f() {
        return this.seachForm.controls;
    }
    get g() {
        return this.pacienteForm.controls;
    }
    get h() {
        return this.detailForm.controls;
    }
    get s() {
        return this.involucradoForm.controls;
    }
    get i() {
        return this.seachInvolucradoForm.controls;
    }
    get j() {
        return this.seachParaConocimientoForm.controls;
    }
    get k() {
        return this.seachParaConocimientoForm2.controls;
    }
    get p() {
        return this.seachParaConocimientoForm3.controls;
    }

    onKeypressEvent(event: any) {
        if (event.target.value.length === 9) {
            return false;
        }
    }
    //modal search
    open() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.seachForm.invalid) {
            return;
        }
        if (this.f.txtsearch.value.trim() === "") {
            this.showInfoForm();
            return;
        }
        const data = {
            searchtipo: this.f.searchtipo.value,
            txtsearch: this.f.txtsearch.value.trim(),
        };
        this.loading("Realizando Busqueda ...");
        this.apiService.searchPerson(data).then(
            (response: any) => {
                this.listSearchPerson = response.length > 0 ? response : [];
                Swal.close();
                if (this.listSearchPerson.length >= 1) {
                    const modalRef = this.modalService.open(SearchComponent, {
                        size: "lg",
                    });
                    modalRef.componentInstance.datasearsh =
                        this.listSearchPerson;
                    modalRef.result
                        .then((result) => {
                            // this.detailpaciente = result;
                            this.setDatosPaciente(result[0]);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    Swal.close();
                    Swal.fire("Info", "Busqueda sin resultado ... ", "info");
                }
            },
            (error) => {
                Swal.close();
            }
        );
    }
    //get list type document
    getTypeDocument() {
        this.apiService.getTipoDocumentService().then((response: any) => {
            this.listtypedocument =
                response.data.length > 0 ? response.data : [];
        });
    }

    //get ubigeo
    getDepartamento() {
        this.apiService.getDepartamentoService().then((response: any) => {
            this.listdepartamentos = response.length > 0 ? response : [];
            //this.getProvincia(this.listdepartamentos[14]?.Departamento)
        });
    }
    changeDepartamento(event) {
        this.departamento_id = event.target.value;
        this.getProvincia(this.departamento_id);
    }
    shownameRazonSocial(event, id) {
        if (id === 1) {
            if (event.target.value === "11") {
                this.showrazonsocialpaciente = true;
            } else {
                this.showrazonsocialpaciente = false;
            }
        }
        if (id === 2) {
            if (event.target.value === "11") {
                this.showrazonsocialrepresentante = true;
            } else {
                this.showrazonsocialrepresentante = false;
            }
        }
        this.departamento_id = event.target.value;
        this.getProvincia(this.departamento_id);
    }
    getProvincia(departamento) {
        this.apiService
            .getProvinciaService(departamento)
            .then((response: any) => {
                this.listprovincias = response.length > 0 ? response : [];
                // this.getDistrito(this.listdepartamentos[14]?.Departamento, this.listprovincias[0]?.Provincia);
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
                this.getTypePatient();
            });
    }

    //tipo paciente /type of patient
    getTypePatient() {
        this.apiService.getTipoPacienteService().then((response: any) => {
            this.listtypepatients = response.length > 0 ? response : [];
        });
    }
    showEmpresas(event) {
        this.name_tipo_paciente =
            event.target.options[event.target.options.selectedIndex].text;
        if (event.target.value === "19") {
            this.showplansalud = true;
            this.showsegurosconvenios = false;
            this.showregiment = false;
            this.rucconveios = "";
            this.showafiliado = true;
            this.getPlanSalud();
            this.rucconveios = "";
            this.codruc = "";
            this.namerucvoncenios = "";
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
            //this.getByIdConveniosSeguros(event.target.value);
            this.codigotipopaciente = event.target.value;
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
            this.rucconveios = "";
            this.codruc = "";
            this.namerucvoncenios = "";
            if (event.target.value === "21") {
                this.showafiliado = true;
            }
            if (event.target.value === "23") {
                this.showsegurosconvenios = true;
                this.codigotipopaciente = event.target.value;
            }
        } else {
            this.showplansalud = false;
            this.showsegurosconvenios = false;
            this.showregiment = false;
            this.showafiliado = false;
            this.rucconveios = "";
            this.codruc = "";
            this.namerucvoncenios = "";
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

    /* changeConveniosSeguros(event) {
     //console.log(event);
     this.getConveniosSeguros(event);
   }
   getConveniosSeguros(id) {
     console.log(id);
     this.apiService.getConveniosSeguroService(id).then((response: any) => {
       this.listconvenios = response.length > 0 ? response : [];
       this.rucconveios = this.listconvenios[0]?.DOCUMENTO.trim();
     });
   }*/
    getTipoSeguro() {
        this.apiService.getTipoSeguroService().then((response: any) => {
            this.listtypeseguro = response.data.length > 0 ? response.data : [];
        });
    }
    getViculo() {
        this.apiService.getVinculoService().then((response: any) => {
            this.listviculos = response.data.length > 0 ? response.data : [];
            //this.getTipoSeguro();
        });
    }

    //---PARENTESCO
    getParentesco() {
        this.apiService.getParentescoService().then((response: any) => {
            this.listparentesco = response.data.length > 0 ? response.data : [];
            //this.getSedes();
        });
    }

    //detalle
    onFileChange(event) {
        for (var i = 0; i < event.target.files.length; i++) {
            this.myFiles.push(event.target.files[i]);
        }
        this.archivos = this.myFiles;
    }
    removeSelectedFile(index) {
        // Delete the item from fileNames list
        this.archivos.splice(index, 1);
        // delete file from FileList
    }
    getSedes() {
        this.apiService.getSedesService().then((response: any) => {
            this.listsedes = response.data.length > 0 ? response.data : [];

            this.getSucursalAsignado();
        });
    }
    getSucursalAsignado() {
        this.apiService
            .getSurcursalAsignado(localStorage.getItem("username"))
            .then((response: any) => {
                this.listsucursalasignado = response.length > 0 ? response : [];
                this.idsurcursal = this.listsucursalasignado[0]?.idsurcursal;
                this.getArea();
            });
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
            // this.getGarantiaSalud();
        });
    }
    onChangeEstado(event) {
        //console.log(event.target.options[event.target.options.selectedIndex].text);
        this.nameestado =
            event.target.options[event.target.options.selectedIndex].text;
        // console.log(this.name_estado);
    }
    onChangeRegmin(event) {
        //console.log(event.target.options[event.target.options.selectedIndex].text);
        this.nameregimen =
            event.target.options[event.target.options.selectedIndex].text;
        // console.log(this.name_estado);
    }
    onChangeModoRecepcion(event) {
        console.log(event.target.value);
        if (event.target.value === "1") {
            this.showcodigoweb = true;
        } else {
            this.showcodigoweb = false;
        }
    }
    //CAUSAS
    getDerechoSalud() {
        this.apiService.getDerechoSalud().then((response: any) => {
            this.listgarantias = response.data.length > 0 ? response.data : [];
            // this.getArea();
        });
    }
    onChangeCausas(event) {
        this.name_garantia =
            event.target.options[event.target.options.selectedIndex].text;
        if (event.target.value != 0) {
            const data = {
                idcausa: event.target.value,
                empresa: this.TIPO_RECLAMO,
            };
            console.log(data);
            this.getCausasEspecificas(1, data);
        } else {
            const data = {
                idcausa: event.target.value,
                empresa: this.TIPO_RECLAMO,
            };
            this.getCausasEspecificas(1, data);
        }
    }
    onChangeCausas2(event) {
        //this.getArea();
        if (event.target.value != 0) {
            const data = {
                idcausa: event.target.value,
                empresa: this.TIPO_RECLAMO,
            };
            console.log(data);
            this.getCausasEspecificas(2, data);
        } else {
            const data = {
                idcausa: event.target.value,
                empresa: this.TIPO_RECLAMO,
            };
            this.getCausasEspecificas(2, data);
        }
    }
    onChangeCausas3(event) {
        //this.getArea();
        if (event.target.value != 0) {
            const data = {
                idcausa: event.target.value,
                empresa: this.TIPO_RECLAMO,
            };
            console.log(data);
            this.getCausasEspecificas(3, data);
        } else {
            const data = {
                idcausa: event.target.value,
                empresa: this.TIPO_RECLAMO,
            };
            this.getCausasEspecificas(3, data);
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
        this.getDetailCausaEspecifica(id, event.target.value);
    }
    getDetailCausaEspecifica(id, event) {
        switch (id) {
            case 1:
                this.apiService
                    .getDetailCausaEspecifica(event)
                    .then((response: any) => {
                        this.listdetailcausa =
                            response.data.length > 0 ? response.data : [];
                        this.fechalimite = this.sumarDias(
                            new Date(),
                            this.listdetailcausa[0]?.n_tiempo_max
                        );
                    });
                break;
            case 2:
                this.apiService
                    .getDetailCausaEspecifica(event)
                    .then((response: any) => {
                        this.listdetailcausa2 =
                            response.data.length > 0 ? response.data : [];
                        this.fechalimite2 = this.sumarDias(
                            new Date(),
                            this.listdetailcausa2[0]?.n_tiempo_max
                        );
                    });
                break;
            case 3:
                this.apiService
                    .getDetailCausaEspecifica(event)
                    .then((response: any) => {
                        this.listdetailcausa3 =
                            response.data.length > 0 ? response.data : [];
                        this.fechalimite3 = this.sumarDias(
                            new Date(),
                            this.listdetailcausa3[0]?.n_tiempo_max
                        );
                    });
                break;
            default:
                console.log("No such day exists!");
                break;
        }
    }

    //onchange personal involucrado
    onChangeShowCausas(id, event) {
        if (id === 1) {
            if (event.currentTarget.checked) {
                this.showcausa = true;
            } else {
                this.showcausa = false;
            }
        } else if (id === 2) {
            if (event.currentTarget.checked) {
                this.showcausa2 = true;
            } else {
                this.showcausa2 = false;
            }
        } else if (id === 3) {
            if (event.currentTarget.checked) {
                this.showcausa3 = true;
            } else {
                this.showcausa3 = false;
            }
        }
    }

    //INVOLUCRADOS
    getArea() {
        this.apiService.getAreaServiceV2().then((response: any) => {
            this.listareas = response.length > 0 ? response : [];
            this.getProfileUser();
        });
    }
    onChangeAreaName(event) {
        console.log(
            event.target.options[event.target.options.selectedIndex].text
        );
        this.namearea =
            event.target.options[event.target.options.selectedIndex].text;
        // console.log(this.name_estado);
    }

    getProfileUser() {
        const data = {
            username: localStorage.getItem("username"),
        };
        this.apiService.getProfileUserService(data).then((response: any) => {
            this.listprofiles = response.length > 0 ? response : [];
            this.inicialnombre = this.listprofiles[0].Nombres;
            this.inicialapellido = this.listprofiles[0].Apellidos;
            this.getAreaUsuario(localStorage.getItem("cod_user"));
        });
    }
    getAreaUsuario(id) {
        this.apiService.getAreaUserService(id).then((response: any) => {
            if (response.length > 0) {
                this.listareausers = response.length > 0 ? response : [];
                this.area_usuario = this.listareausers[0].area_user;
            }
        });
    }
    getServiciosEfectuado() {
        this.apiService.getListServiciosService().then((response: any) => {
            this.listservicios = response.data.length > 0 ? response.data : [];
        });
    }
    searchPersonalInvolucrado() {
        this.submittedinvolucrado = true;
        if (this.seachInvolucradoForm.invalid) {
            return;
        }
        const data = {
            names: this.i.txtinvolucrado.value,
        };
        this.loading("Realizando Busqueda ...");
        this.apiService.searchInvolucradosService(data).then(
            (response: any) => {
                this.listinvolucrados = response.length > 0 ? response : [];
                Swal.close();
                const modalRef = this.modalService.open(InvolucradoComponent, {
                    size: "lg",
                });
                modalRef.componentInstance.datapersonal = this.listinvolucrados;
                modalRef.result
                    .then((result) => {
                        this.listpersonal = result.personal;
                        this.listjefe = result.jefe;
                        console.log(this.listjefe);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            (error) => {
                Swal.close();
            }
        );
    }

    //onchange For Knowledge
    onChangeParaConocimiento(event) {
        if (event.currentTarget.checked) {
            this.showparaconocimiento = true;
        } else {
            this.showparaconocimiento = false;
        }
    }
    searchPeraConocimiento(id) {
        if (id == 1) {
            this.submittedsearchpersonal1 = true;
            if (this.seachParaConocimientoForm.invalid) {
                return;
            }
            const data = {
                names: this.j.personal1.value,
            };
            this.loading("Realizando Busqueda ...");
            this.apiService.searchInvolucradosService(data).then(
                (response: any) => {
                    this.listpersobals1 = response.length > 0 ? response : [];
                    Swal.close();
                    const modalRef = this.modalService.open(
                        ConocimientoComponent,
                        { size: "lg" }
                    );
                    modalRef.componentInstance.datapersonal01 =
                        this.listpersobals1;
                    modalRef.result
                        .then((result) => {
                            if (result.cod === 1) {
                                this.listdetalpersonal01 = result.persona01;
                                console.log(this.listdetalpersonal01);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                },
                (error) => {
                    Swal.close();
                }
            );
        }
        if (id == 2) {
            this.submittedsearchpersonal2 = true;
            if (this.seachParaConocimientoForm2.invalid) {
                return;
            }
            const data = {
                names: this.k.personal2.value,
            };
            this.loading("Realizando Busqueda ...");
            this.apiService.searchInvolucradosService(data).then(
                (response: any) => {
                    this.listpersobals2 = response.length > 0 ? response : [];
                    Swal.close();
                    const modalRef = this.modalService.open(
                        ConocimientoComponent,
                        { size: "lg" }
                    );
                    modalRef.componentInstance.datapersonal02 =
                        this.listpersobals2;
                    modalRef.result
                        .then((result) => {
                            if (result.cod === 2) {
                                this.listdetalpersonal02 = result.persona02;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                },
                (error) => {
                    Swal.close();
                }
            );
        }
        if (id == 3) {
            this.submittedsearchpersonal3 = true;
            if (this.seachParaConocimientoForm3.invalid) {
                return;
            }
            const data = {
                names: this.p.personal3.value,
            };
            this.loading("Realizando Busqueda ...");
            this.apiService.searchInvolucradosService(data).then(
                (response: any) => {
                    this.listpersobals3 = response.length > 0 ? response : [];
                    Swal.close();
                    const modalRef = this.modalService.open(
                        ConocimientoComponent,
                        { size: "lg" }
                    );
                    modalRef.componentInstance.datapersonal03 =
                        this.listpersobals3;
                    modalRef.result
                        .then((result) => {
                            if (result.cod === 3) {
                                this.listdetalpersonal03 = result.persona03;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                },
                (error) => {
                    Swal.close();
                }
            );
        }
    }

    showConveniosModal(data) {
        const modalRef = this.modalService.open(ConveniosComponent, {
            size: <any>"xl",
        });
        modalRef.componentInstance.dato = data;
        modalRef.result
            .then((result) => {
                //resultado
                // console.log(result);
                this.rucconveios = "";
                this.codruc = result.idEmpresa;
                this.namerucvoncenios = result.Descripcion.trim();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //register reclamo
    registroReclamo() {
        this.submittedpatient = true;
        this.submitteddetail = true;
        this.submittedinvolucradoservicio = true;

        if (this.pacienteForm.invalid) {
            this.showAlertForm();
            return;
        }
        if (this.detailForm.invalid) {
            this.showAlertForm();
            return;
        }
        if (this.involucradoForm.invalid) {
            this.showAlertForm();
            return;
        }

        const paciente = this.pacienteForm.value;
        const parentesco = this.parentescoForm.value;
        const detalle = this.detailForm.value;
        const causa = this.causaForm.value;
        const involucrado = this.involucradoForm.value;
        const acciones = this.accionesForm.value;

        var genero_paciente;
        if (paciente.sexo === "M") {
            genero_paciente = 1;
        } else {
            genero_paciente = 2;
        }

        this.m_sede = detalle.sede;

        switch (parseInt(detalle.sede)) {
            case 1:
                this.cod_ugipress = "00020027";
                this.cod_admi_d = "00020027";
                this.cod_admi_p = "00020027";
                break;
            case 2:
                this.cod_ugipress = "00020027";
                this.cod_admi_d = "00020027";
                this.cod_admi_p = "00020027";
                break;
            case 4:
                this.cod_ugipress = "00020027";
                this.cod_admi_d = "00020027";
                this.cod_admi_p = "00020027";
                break;

            default:
                break;
        }
        if (parseInt(detalle.estado) === 3) {
            this.tipo_admin_t = 3;
        }
        if (parseInt(detalle.estado) === 2) {
            this.nameestado = "En Traminte";
        }
        if (this.showregiment && parseInt(paciente.regimen) === 4) {
            this.nameregimen = "No asegurado";
        }

        var show_paraconocimiento = 1;
        var codigoMedico = 0;
        var nombreMedico = "";
        var paternoMedico = "";
        var maternoMedico = "";
        var codigoAdministrativo = 0;
        var nombreAdministrativo = "";
        var paternoAdministrativo = "";
        var maternoAdministrativo = "";
        if (involucrado.involucrado === "2") {
            codigoMedico = involucrado.codinvolucrado;
            nombreMedico = involucrado.shnombre;
            paternoMedico = involucrado.shpaterno;
            maternoMedico = involucrado.shmaterno;
        } else {
            codigoAdministrativo = involucrado.codinvolucrado;
            nombreAdministrativo = involucrado.shnombre;
            paternoAdministrativo = involucrado.shpaterno;
            maternoAdministrativo = involucrado.shmaterno;
        }
        this.correojefe = involucrado.jefecorreo;
        this.mailconocimiento = acciones.p1correo;
        this.mailconocimiento2 = acciones.p2correo;
        this.nombrecomplepaciente =
            paciente.nombre + " " + paciente.paterno + " " + paciente.materno;

        if (acciones.p1code == "") {
            show_paraconocimiento = 1;
        } else if (acciones.p1code == null) {
            show_paraconocimiento = 1;
        } else {
            show_paraconocimiento = 2;
        }
        var prioridad;
        if (this.area_usuario === "020701") {
            prioridad = 2;
        } else {
            prioridad = 0;
        }
        var descripcion_envio = "";
        if (detalle.descripcion_reclamo.length > 1500) {
            descripcion_envio = "";
        } else {
            descripcion_envio = detalle.descripcion_reclamo;
        }
        // console.log(this.name_tipo_paciente);
        this.loading("Generando reclamo...");
        //console.log(this.accionesForm.value);
        this.apiService
            .getCorrelativoService(this.TIPO_RECLAMO)
            .then((response: any) => {
                if (response.success === 1) {
                    this.listcorretalivos =
                        response.data.length > 0 ? response.data : [];
                    this.numcorrelativo = (
                        "000000" + this.listcorretalivos[0]?.CORRELATIVO
                    ).slice(-6);
                    this.correlativo = this.numcorrelativo;

                    const data = {
                        periodo: this.datePipe.transform(new Date(), "yyyyMM"),
                        idgarantia: causa.derechosalud,
                        name_garantia: this.name_garantia,
                        idgarantia2: causa.derechosalud1,
                        idgarantia3: causa.derechosalud2,
                        idcausa_especifica: causa.causaespecifica,
                        name_causa_especifica: this.name_causa_especifica,
                        idcausa_especifica2: causa.causaespecifica1,
                        idcausa_especifica3: causa.causaespecifica2,
                        correlativo_reclamo: this.numcorrelativo,
                        correlativo_acomp: this.numcorrelativo,
                        correlativo_causa: 1,
                        codigo_institucion: this.codigo_institucion,
                        tipo_administrativo: 3, //iafas
                        tipo_doc_reclama: paciente.tipodoc,
                        id_tipo_seguro: paciente.tipo_aseg,
                        id_regimen: paciente.regimen,
                        fecha_nacimiento: this.datePipe.transform(
                            paciente.fecha_nacimiento,
                            "yyyy-MM-dd"
                        ),
                        genero: genero_paciente,
                        departamento: paciente.departamento,
                        provincia: paciente.privincia,
                        distrito: paciente.distrito,
                        id_vinculo: paciente.vinculo,
                        ruc_empresa: paciente.ruc,
                        fecha_traslado:
                            this.datePipe.transform(
                                detalle.fechaevento,
                                "yyyy-MM-dd"
                            ) +
                            " " +
                            detalle.horarenvento,
                        causa_reclamo: causa.causaespecifica,
                        monto_reclamo: causa.monto,
                        id_resultado_reclamo: 0,
                        id_sede: detalle.sede,
                        cod_ugipress: this.cod_ugipress,
                        cod_administrativo_d: this.cod_admi_d,
                        cod_administrativo_p: this.cod_admi_p,
                        tipo_admistrativo_t: this.tipo_admin_t,
                        usuario: localStorage.getItem("cod_user"), //id de usuario logeado,
                        id_gestion: 2, //datos por defecto --gestion incluida,
                        id_calificacion: 0,
                        id_clasificacion: detalle.administrativo,
                        id_area_ingresa: this.area_usuario,
                        modo_recepcion: detalle.modorecepcion,
                        id_tipo_reclamo: 0,
                        id_prod_servicio: detalle.productoservicio,
                        gmail_autoriza: detalle.usuario_autoriza,
                        id_estado_tramite: detalle.estado,
                        name_estado: this.nameestado,
                        id_naturaleza: 0,
                        id_zona: this.area_usuario, //zona del usuario
                        prioridad: prioridad,
                        cod_web: detalle.codigoweb, //agregar el codio web
                        descripcion_reclamo: detalle.descripcion_reclamo,
                        descripcion_reclamo_envio: descripcion_envio,
                        acciones_tomadas_usuario:
                            this.datePipe.transform(new Date(), "yyyy-MM-dd") +
                            " " +
                            this.datePipe.transform(new Date(), "h:mm:ss") +
                            ": Usuario (" +
                            this.inicialnombre +
                            " " +
                            this.inicialapellido +
                            ")" +
                            " " +
                            acciones.descripcionscciones,
                        v_acciones_tomas: acciones.descripcionscciones,
                        afiliado1: paciente.codigo_afiliado,
                        paterno1: paciente.paterno,
                        materno1: paciente.materno,
                        nombre1: paciente.nombre,
                        nombre_completo:
                            paciente.nombre +
                            " " +
                            paciente.paterno +
                            " " +
                            paciente.materno,
                        correopaciente: paciente.correo,
                        historia_clinica: paciente.historia,
                        telefono: paciente.telefono,
                        domicilio: paciente.domicilio,
                        v_dni: paciente.numreodoc,
                        tipo_paciente: paciente.tipo_paciente,
                        name_tipo_paciente: this.name_tipo_paciente,
                        id_programa: 0,
                        id_empresa: paciente.convenios,
                        plan_salud: paciente.plan_salud,
                        name_regimen: this.nameregimen,
                        razon_socialp: paciente.razonsocial,
                        razon_socialr: parentesco.razonsocialrepre,
                        tipodocrepre: parentesco.repretipodoc,
                        numerodocrepre: parentesco.reprenumreodoc,
                        nombres2: parentesco.reprenombre,
                        paterno2: parentesco.reprepaterno,
                        materno2: parentesco.reprematerno,
                        parentesco: parentesco.parentesco,
                        celular: parentesco.repretelefono,
                        email2: parentesco.repremail,
                        estadov: "R",
                        servicio_efectuado: involucrado.servicio_efectuado,
                        area: involucrado.area,
                        area_name: this.namearea,
                        d_registro_reclamo:
                            this.datePipe.transform(
                                detalle.fechareclamo,
                                "yyyy-MM-dd"
                            ) +
                            " " +
                            detalle.horareclamo,
                        d_fecha_reclamo:
                            this.datePipe.transform(
                                detalle.fechaevento,
                                "yyyy-MM-dd"
                            ) +
                            " " +
                            detalle.horarenvento,
                        d_registro:
                            this.datePipe.transform(new Date(), "yyyy-MM-dd") +
                            " " +
                            this.datePipe.transform(new Date(), "h:mm:ss"),
                        afiliado3: codigoAdministrativo, //Codigo de la persona involucrada
                        nombres3: nombreAdministrativo,
                        papellidos3: paternoAdministrativo,
                        mapellidos3: maternoAdministrativo,
                        n_tipo_reclamo: "1",
                        cod_otra_persona_involucrado:
                            involucrado.codinvolucrado, //CODIGO DEL PERSONAL INVOLUCRADO
                        usuario_para_conocimiento: acciones.p1code,
                        usuario_para_conocimiento2: acciones.p2code,
                        usuario_para_conocimiento3: acciones.p3code,
                        jefe_involucrado: involucrado.codjefe,
                        cod_medico: codigoMedico,
                        nombre_medico: nombreMedico,
                        apellido_medico_materno: maternoMedico,
                        apellido_medico_paterno: paternoMedico,
                        id_especialidad: 0,
                        id_hospitalizacion: 0,
                        nombre_jefe: involucrado.jefenombre,
                        p_apellido_jefe: involucrado.jefepaterno,
                        m_apellido_jefe: involucrado.jefematerno,
                        show_state: show_paraconocimiento,
                        nombre_para_conocimiento: acciones.p1nombre,
                        apellido_para_conocimiento:
                            acciones.p1paterno + " " + acciones.p1materno,
                        nombre_para_conocimiento2: acciones.p2nombre,
                        apellido_para_conocimiento2:
                            acciones.p2paterno + " " + acciones.p2materno,
                        nombre_para_conocimiento3: acciones.p3nombre,
                        apellido_para_conocimiento3:
                            acciones.p3paterno + " " + acciones.p3materno,
                        cod_afiliado: paciente.codigo_afiliado,
                        d_respuesta_limite: "",
                        empresa: this.TIPO_RECLAMO,
                    };
                    console.log(data);
                    this.apiService.postReclamoService(data).then(
                        (response: any) => {
                            if (response.success === 1) {
                                console.log("RECLAMO REGISTRADO  exitoso");
                                this.listrespreclamo =
                                    response.data.length > 0
                                        ? response.data
                                        : [];
                                this.maxid_reclamo =
                                    this.listrespreclamo[0]?.id_reclamo;
                                this.getSedesById(this.m_sede);
                                // this.getMaxIdLibro(this.m_sede, this.maxid_reclamo);
                                this.registerCorrelativo();
                            }
                        },
                        (error) => {
                            Swal.close();
                            this.showErro(
                                "Problemas al generar el reclamo",
                                "error presentado:" + error
                            );
                        }
                    );
                }
            });
    }

    getSedesById(sede) {
        this.apiService.getSedeByIDService(sede).then(
            (response: any) => {
                console.log("getSedeByIDService exitoso");
                this.byidsedes = response.data.length > 0 ? response.data : [];
                this.byidsede = this.byidsedes[0]?.v_inicial;
                this.newAudita();
            },
            (error) => {
                Swal.close();
                this.showErro(
                    "Problamas al optener el id de la sede",
                    "error presentado:" + error
                );
            }
        );
    }

    /*getMaxIdLibro(sede, idmax_reclamo) {
    const data = {
      idsede: sede,
      tipo_empresa: this.TIPO_RECLAMO,
    }
    this.apiService.getMaxIdLibroService(data).then((response: any) => {
      console.log('getMaxIdLibroService exitoso');
      this.maxids = response.data.length > 0 ? response.data : [];
      this.max_id_libro = '000000' + this.maxids[0]?.maximo;
      this.vcorrelativo = "HF" + this.byidsede + (this.max_id_libro).slice(-6);
     // this.registerCorrelativoLibro(this.max_id_libro, this.vcorrelativo, idmax_reclamo, sede)

    }, (error) => {
      Swal.close();
      this.showErro('Problamas al optener el id  del libro de reclamos', 'error presentado:' + error);
    });
  }*/

    /*registerCorrelativoLibro(maxidlibro, correlatvo, idmax_reclamo, sede) {
    const data = {
      lasidLibro: maxidlibro,
      vcorrelativo: correlatvo,
      idreclamo: idmax_reclamo,
      idsede: sede,
      tipo_empresa: this.TIPO_RECLAMO,
    }
    this.apiService.postCorrelativoLibroReclamoService(data).then((response: any) => {
      console.log('Correlativo libro reclamo  registrado exitoso');
      this.registerCorrelativo();
    }, (error) => {
      Swal.close();
      this.showErro('Problamas con el registro del correlativo', 'error presentado:' + error);
    });

  }*/
    registerCorrelativo() {
        const data = {
            correlativo_reclamo: this.correlativo,
            tipo_empresa: this.TIPO_RECLAMO,
        };
        this.apiService.postCorrelativoService(data).then(
            (response: any) => {
                console.log("Correlativo registrado exitoso");
                Swal.close();
                this.saveFiles();
                this.succes();
                this.submitted = false;
                this.submittedpatient = false;
                this.submitteddetail = false;
                this.submittedinvolucrado = false;
                this.submittedsearchpersonal1 = false;
                this.submittedsearchpersonal2 = false;
                this.showparaconocimiento = false;
                this.descrpreclamo = "";
                this.pacienteForm.reset();
                this.parentescoForm.reset();
                this.detailForm.reset();
                this.causaForm.reset();
                this.involucradoForm.reset();
                this.accionesForm.reset();
                //this.sendMail();
                //this.sendMailIafas();
            },
            (error) => {
                Swal.close();
                this.showErro(
                    "Problamas  con el registro del correlativo",
                    "error presentado:" + error
                );
            }
        );
    }

    saveFiles() {
        const formData = new FormData();
        ///this.archivos = this.myFiles;
        if (this.archivos.length <= 0) {
            return console.log("upload fail");
        }
        for (var i = 0; i < this.archivos.length; i++) {
            formData.append("archivos", this.archivos[i]);
        }

        console.log(formData);
        this.apiService.uploadFilesService(formData).then((response: any) => {
            if (response.ok) {
                const data = {
                    empresa: this.TIPO_RECLAMO,
                    archivos: response.namefiles,
                    id_reclamo: this.maxid_reclamo,
                };
                this.apiService
                    .updateReclamoFilesService(data)
                    .then((result) => {
                        console.log("update archivos exitoso");
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
            }
        });
    }

    newAudita() {
        const data = {
            empresa: this.TIPO_RECLAMO,
            fecha: this.datePipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss"),
            id_user: localStorage.getItem("cod_user"),
            idreclamo: this.maxid_reclamo,
        };
        /*  this.apiService.postAuditaService(data).then((result) => {
        console.log('AUDITA REGISTRADO  exitoso');
      }).catch((err) => {
        console.log(err)
      });*/
    }

    sumarDias(fecha, dias) {
        var fechalim = fecha.setDate(fecha.getDate() + dias);
        var fechas = this.datePipe.transform(fechalim, "yyyy-MM-dd");

        return fechas;
    }
    //ruc web
    openRuc() {
        window.open(
            "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaMovil.jsp",
            "targetWindow",
            "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,"
        );
        return false;
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

    showErro(message, error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `${message}+ ', ' ${error}`,
        });
    }
    showAlertForm() {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Verificar que todo los campos obligatorios esten completados en todas las secciones secciones!",
        });
    }
    showInfoForm() {
        Swal.fire({
            icon: "info",
            text: "No se admiten campos vacíos en la búsqueda de paciente",
        });
    }
    async succes() {
        Swal.fire({
            title: "Exitoso",
            icon: "success",
            text: "Reclamo Generado con exito.",
            width: "400px",
            timer: 2000,
            showConfirmButton: false,
        });
    }

    setDatosPaciente(datos) {
        this.detPacteNombres = datos.Nombres;
        this.detPacteApellidoPaterno = datos.ApellidoPaterno;
        this.detPacteApellidoMaterno = datos.ApellidoMaterno;
        this.detPactehclinica = datos.hclinica;
        this.detPacteTelefono = datos.Telefono;
        this.detPacteCorreoElectronico = datos.CorreoElectronico;
        this.detPacteDocumento = datos.Documento;
        this.detPacteFechaNacimiento = datos.FechaNacimiento;
        this.detPacteSexo = datos.Sexo;
        this.detPacteDireccion = datos.Direccion;
        console.log(this.detPacteApellidoMaterno);
    }
}
