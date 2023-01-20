import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AgGridAngular } from "ag-grid-angular";
import Swal from "sweetalert2";
import { CustomTooltip } from "utils/custom-tooltip.component";
import { EmpresaCellRenderer } from "utils/EmpresaCellRenderer";
import { EstadoCellRenderer } from "utils/EstadoCellRenderer";
import { GenderCellRenderer } from "utils/GenderCellRenderer";
import { SucursalCellRenderer } from "utils/SucursalCellRenderer";
import { RrhhService } from "../rrhh.service";

@Component({
    selector: "app-collaborators",
    templateUrl: "./collaborators.component.html",
    styleUrls: ["./collaborators.component.sass"],
})
export class CollaboratorsComponent implements OnInit {
    public displayAlert: string = "none";
    public intervaloOcultar: any;
    public textoCopiado: string = "";
    public collaborators: any = [];
    public cargos: any = [];
    filtroForm: FormGroup;
    options = {
        autoClose: false,
        keepAfterRouteChange: false,
    };
    @ViewChild("agGrid") agGrid: AgGridAngular;
    //title = 'datatables';
    //dtOptions: DataTables.Settings = {};
    columnDefs;
    frameworkComponents;
    tooltipShowDelay;
    defaultColDef;
    rowData: any;
    style = {
        width: "100%",
        height: "100%",
        flex: "1 1 auto",
    };
    constructor(private apiService: RrhhService, private datePipe: DatePipe) {
        this.columnDefs = [
            /*{
        headerName: 'EMPRESA',
        field: 'COD_EMPRESA',
        width: 85,
        cellRenderer: 'empresaCellRenderer',
        cellEditorParams: {
          values: ['MA', 'FE'],
          cellRenderer: 'empresaCellRenderer',
        },
        sortable: true,
        filter: true,
      },*/
            {
                headerName: "COD",
                field: "COD_PERSONAL",
                sortable: true,
                width: 98,
                cellRenderer: "empresaCellRenderer",
                cellEditorParams: {
                    values: ["MA", "FE"],
                    cellRenderer: "empresaCellRenderer",
                },
                filter: true,
                resizable: true,
            },
            {
                headerName: "",
                field: "TIP_ESTADO",
                width: 40,
                cellRenderer: "estadoCellRenderer",
                tooltipField: "TIP_ESTADO",
                tooltipComponentParams: { color: "#ececec", identicador: 1 },
                cellEditorParams: {
                    values: ["CE", "AC"],
                    cellRenderer: "estadoCellRenderer",
                },
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "",
                field: "TIP_SEXO",
                width: 40,
                cellRenderer: "genderCellRenderer",
                tooltipField: "TIP_SEXO",
                tooltipComponentParams: { color: "#ececec", identicador: 2 },
                cellEditorParams: {
                    values: ["MA", "FE"],
                    cellRenderer: "genderCellRenderer",
                },
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "COLABORADOR",
                field: "TRABAJADOR",
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "ONOMASTICO",
                field: "FEC_NACIMIENTO",
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "SEDE",
                field: "COD_SUCURSAL",
                width: 70,
                cellRenderer: "sucursalCellRenderer",
                cellEditorParams: {
                    values: ["MA", "FE"],
                    cellRenderer: "sucursalCellRenderer",
                },
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "AREA",
                field: "DES_AREAS",
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "CARGO",
                field: "DES_CARGO",
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "GERENCIA",
                field: "DES_GERENCIA",
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "F.INGRESO",
                field: "FEC_INGRESO1",
                width: 90,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "F.CESADO",
                field: "FEC_CESADO1",
                width: 100,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: "EMAIL",
                field: "DES_EMAIL",
                sortable: true,
                filter: true,
                editable: true,
                resizable: true,
            },
        ];

        if (localStorage.getItem("access") == "1") {
            this.columnDefs.push(
                {
                    headerName: "TIPO DOC.",
                    field: "TipoDocumentoNombre",
                    sortable: true,
                    filter: true,
                    resizable: true,
                },
                {
                    headerName: "NRO. DOC.",
                    field: "NUM_DOCUMENTO",
                    sortable: true,
                    filter: true,
                    resizable: true,
                }
            );
        }
        this.defaultColDef = {
            tooltipComponent: "customTooltip",
        };
        this.tooltipShowDelay = 0;
        this.frameworkComponents = {
            genderCellRenderer: GenderCellRenderer,
            empresaCellRenderer: EmpresaCellRenderer,
            sucursalCellRenderer: SucursalCellRenderer,
            estadoCellRenderer: EstadoCellRenderer,
            customTooltip: CustomTooltip,
        };

        this.filtroForm = new FormGroup({
            inicio: new FormControl(""),
            apellidos: new FormControl(""),
            sedes: new FormControl("NA"),
            estado: new FormControl("0"),
            area: new FormControl(""),
            final: new FormControl(""),
            cargo: new FormControl(""),
            correo: new FormControl("3"),
        });
    }

    ngOnInit() {
        this.getCollaborators();
    }
    getCollaborators() {
        const form = this.filtroForm.value;
        const data = {
            inicio: this.datePipe.transform(form.inicio, "dd-MM-yyyy"),
            apellidos: form.apellidos,
            sede: form.sedes,
            estado: form.estado,
            area: form.area,
            final: this.datePipe.transform(form.final, "dd-MM-yyyy"),
            cargo: form.cargo,
            correo: form.correo,
        };
        // console.log(data);
        this.apiService
            .getColaboradoresFilterService(data)
            .then((response: any) => {
                console.log(response);
                this.rowData = response.length > 0 ? response : [];
                this.getCargo();
            });
    }
    getCargo() {
        this.apiService.getCargoService().then((response: any) => {
            console.log(response);
            this.cargos = response.length > 0 ? response : [];
        });
    }
    filter() {
        const form = this.filtroForm.value;
        const data = {
            inicio: this.datePipe.transform(form.inicio, "dd-MM-yyyy"),
            apellidos: form.apellidos,
            sede: form.sedes,
            estado: form.estado,
            area: form.area,
            final: this.datePipe.transform(form.final, "dd-MM-yyyy"),
            cargo: form.cargo,
            correo: form.correo,
        };
        this.loading();
        this.apiService.getColaboradoresFilterService(data).then(
            (response: any) => {
                this.rowData = response.length > 0 ? response : [];
                Swal.close();
            },
            (error) => {
                Swal.close();
            }
        );
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const selectedDataStringPresentation = selectedData
            .map((node) => node.COD_EMPRESA + " " + node.COD_EMPRESA)
            .join(", ");
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
    onCellValueChanged(params) {
        console.log(278, params.data.DES_EMAIL, params.data.COD_PERSONAL);
        var colId = params.column.getId();
        if (colId === "DES_EMAIL") {
            const data = {
                email: params.data.DES_EMAIL,
                codpersona: params.data.COD_PERSONAL,
            };
            this.showAlert(params.data.DES_EMAIL, params.data.TRABAJADOR, data);
        }
    }

    async showAlert(correo, colaborador, data) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                html: `Esta asignando el correo <strong style="color:#00100;margin-right: 2px;margin-left:2px;">"${correo}"</strong> al usuario <strong style="color:#00100; font-size: 0.8em !important;">"${colaborador}"</strong> <br> Desea Asginarlo?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if(!data.email.includes('@')){
                        
                        if(data.email.match('clubdelasalud.pe') != null){
                            // console.log(312, data.email.match('clubdelasalud.pe'));
                            data.email = data.email.replace("clubdelasalud.pe", "@clubdelasalud.pe"); 
                        }else if (data.email.match('clubdelasalud') != null) {
                            data.email = data.email.replace("clubdelasalud", "@clubdelasalud.pe"); 
                        }else{
                            data.email = data.email + "@clubdelasalud.pe";
                        }
                        
                    }
                    // return
                    // console.log(322, data);
                    this.apiService.updateColaboradorEmailService(data).then(
                        (response: any) => {
                            console.log(response);
                            this.succes();
                            this.getCollaborators();
                        },
                        (error) => {
                            console.log(error);
                            this.getCollaborators();
                        }
                    );
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    this.getCollaborators();
                } else {
                    this.getCollaborators();
                }
            });
    }
    async succes() {
        Swal.fire({
            title: "Exitoso",
            icon: "success",
            text: "El correo fue actualizado.",
            width: "400px",
            timer: 2000,
            showConfirmButton: false,
        });
    }

    async loading() {
        Swal.fire({
            html: "<div>Filtrando ...</div>",
            width: "200px",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
                Swal.showLoading();
            },
        });
    }

    copyCellContent(event) {
        const valorCelda = event.event.target.textContent.trim();

        if (valorCelda.length == 0) {
            return false;
        }

        navigator.clipboard.writeText(valorCelda).then(
            () => {
                this.textoCopiado = valorCelda;
                this.displayAlert = "block";

                clearInterval(this.intervaloOcultar);
                this.intervaloOcultar = setInterval(() => {
                    this.displayAlert = "none";
                }, 3000);
            },
            () => {
                console.log("Error al copiar el texto al portapapeles");
            }
        );
    }
}
