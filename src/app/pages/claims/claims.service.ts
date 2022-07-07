import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Formulario } from 'src/app/pages/models/claims/formulario';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: "root",
})
export class ClaimsService {
    response: Observable<any>;
    baseURL: string = environment.baseURL;
    API: string = environment.api_url;

    constructor(private http: HttpClient) {
        //this.baseURL = '/api';
    }

    get token(): string {
        return localStorage.getItem("token") || "";
    }

    get headers() {
        return {
            headers: {
                "x-token": this.token,
            },
        };
    }
    //list the menu for the navigate in the system
    searchPerson(data) {
        return this.http
            .post(`${this.baseURL}/paciente/search`, data)
            .toPromise();
    }
    getDetailPacienteService(id: string) {
        return this.http
            .get(`${this.baseURL}/paciente/detail/${id}`)
            .toPromise();
    }
    getTipoDocumentService() {
        return this.http
            .get(`${this.baseURL}/filtro/tipodocumento`)
            .toPromise();
    }

    //ubigeo
    getDepartamentoService() {
        return this.http.get(`${this.baseURL}/ubigeo/departamento`).toPromise();
    }
    getProvinciaService(departamento) {
        return this.http
            .get(`${this.baseURL}/ubigeo/provincia/${departamento}`)
            .toPromise();
    }

    getDistritoService(departamento, provincia) {
        return this.http
            .get(`${this.baseURL}/ubigeo/distrito/${departamento}/${provincia}`)
            .toPromise();
    }

    getTipoPacienteService() {
        return this.http
            .get(`${this.baseURL}/filtrosms/typepatient`)
            .toPromise();
    }
    getPlanSaludTipoPacienteService() {
        return this.http.get(`${this.baseURL}/filtrosms/plansalud`).toPromise();
    }
    getConveniosSeguroByIdService(data) {
        return this.http
            .post(`${this.baseURL}/filtrosms/conveniossegurosby/`, data)
            .toPromise();
    }
    getConveniosSeguroService(id, idempresa) {
        return this.http
            .get(
                `${this.baseURL}/filtrosms/conveniosseguros/${id}/${idempresa}`
            )
            .toPromise();
    }

    //
    getTipoSeguroService() {
        return this.http
            .get(`${this.baseURL}/filtro/tiposeguroiafas`)
            .toPromise();
    }
    getVinculoService() {
        return this.http.get(`${this.baseURL}/filtro/vinculo`).toPromise();
    }

    //parentesco
    getParentescoService() {
        return this.http.get(`${this.baseURL}/filtro/parentesco`).toPromise();
    }

    //detalle
    getSedesService() {
        return this.http.get(`${this.baseURL}/filtro/sedes`).toPromise();
    }

    //
    getSurcursalAsignado(username) {
        return this.http
            .get(`${this.baseURL}/filtrosms/surcusalasignado/${username}`)
            .toPromise();
    }
    getRecepcionService() {
        return this.http.get(`${this.baseURL}/filtro/recepcion`).toPromise();
    }
    getEstadoTramiteService() {
        return this.http
            .get(`${this.baseURL}/filtro/estadotramite`)
            .toPromise();
    }
    //causas
    getDerechoSalud() {
        return this.http.get(`${this.baseURL}/filtro/derechosalud`).toPromise();
    }
    getCausaEspecifica(data) {
        return this.http
            .post(`${this.baseURL}/filtro/causaespecifica`, data)
            .toPromise();
    }
    getDetailCausaEspecifica(id) {
        return this.http
            .get(`${this.baseURL}/filtro/detailcausa/${id}`)
            .toPromise();
    }

    //INVOLUCRADOS
    getAreaServiceV2() {
        return this.http.get(`${this.baseURL}/filtrosms/areav2`).toPromise();
    }
    searchInvolucradosService(data) {
        return this.http
            .post(`${this.baseURL}/paciente/involucrado`, data)
            .toPromise();
    }
    searchJefeService(data) {
        return this.http
            .post(`${this.baseURL}/filtrosms/jefesearch`, data)
            .toPromise();
    }
    getDetailInvolucradoService(id: string) {
        return this.http
            .get(`${this.baseURL}/paciente/involucrado/${id}`)
            .toPromise();
    }
    getDataJefeInvolucradoService(idjefe) {
        return this.http
            .get(`${this.baseURL}/filtrosms/jefeinvolucrado/${idjefe}`)
            .toPromise();
    }

    //users
    getProfileUserService(data) {
        return this.http
            .post(`${this.baseURL}/users/profile`, data)
            .toPromise();
    }
    getAreaUserService(id) {
        return this.http.get(`${this.baseURL}/users/area/${id}`).toPromise();
    }

    //correlativo
    getCorrelativoService(id: string) {
        return this.http
            .get(`${this.baseURL}/filtro/correlativo/${id}`)
            .toPromise();
    }
    //regestro de correlativo
    postCorrelativoLibroReclamoService(data) {
        return this.http
            .post(`${this.baseURL}/correlativo/libroreclamo`, data)
            .toPromise();
    }
    postCorrelativoService(data) {
        return this.http
            .post(`${this.baseURL}/correlativo/reclamo`, data)
            .toPromise();
    }
    getMaxIdLibroService(data) {
        return this.http
            .post(`${this.baseURL}/correlativo/maxidlibro`, data)
            .toPromise();
    }

    getReclamoDetailService(data) {
        return this.http
            .post(`${this.baseURL}/correlativo/reclamo_id`, data)
            .toPromise();
    }

    //upload file
    uploadFilesService(data) {
        return this.http
            .put(`${this.baseURL}/upload/archivos`, data)
            .toPromise();
    }
    //update reclamo
    postReclamoService(data) {
        return this.http.post(`${this.baseURL}/claims`, data).toPromise();
    }

    updateReclamoInfoClientService(data) {
        return this.http
            .put(`${this.baseURL}/claims/infoclient`, data)
            .toPromise();
    }
    updateReclamoRepresentanteService(data) {
        return this.http
            .put(`${this.baseURL}/claims/representante`, data)
            .toPromise();
    }
    updateReclamoTransferidoService(data) {
        return this.http
            .put(`${this.baseURL}/claims/transferido`, data)
            .toPromise();
    }
    updateReclamoCaracteristicasService(data) {
        return this.http
            .put(`${this.baseURL}/claims/caracteristicas`, data)
            .toPromise();
    }
    updateReclamoCaracteristicasTblCorrService(data) {
        return this.http
            .put(`${this.baseURL}/claims/caracteristicas_tbl_corr`, data)
            .toPromise();
    }
    updateReclamoSolutionsService(data) {
        return this.http
            .put(`${this.baseURL}/claims/solucion`, data)
            .toPromise();
    }
    updateReclamoParaConociminetoService(data) {
        return this.http
            .put(`${this.baseURL}/claims/para_conocimiento`, data)
            .toPromise();
    }
    updateReclamoRespuestaService(data) {
        return this.http
            .put(`${this.baseURL}/claims/respuesta_reclamo`, data)
            .toPromise();
    }
    updateReclamoFilesService(data) {
        return this.http.put(`${this.baseURL}/claims/files`, data).toPromise();
    }
    updateReclamoFilesServiceReclamo(data) {
        return this.http
            .put(`${this.baseURL}/claims/filesreclamo`, data)
            .toPromise();
    }
    postAuditaService(data) {
        return this.http
            .post(`${this.baseURL}/claims/audita`, data)
            .toPromise();
    }

    getSedeByIDService(id) {
        return this.http.get(`${this.baseURL}/filtro/sedes/${id}`).toPromise();
    }

    //COMPONENT LIST
    getReclamoListService(data) {
        return this.http
            .post(`${this.baseURL}/claims/getreclamo`, data)
            .toPromise();
    }
    getSearchMedidasAdoptadas(data) {
        return this.http
            .post(`${this.baseURL}/claims/getmedidas`, data)
            .toPromise();
    }
    getReclamoListServiceSusalud(data) {
        return this.http
            .post(`${this.baseURL}/claims/getreclamosusalud`, data)
            .toPromise();
    }
    getSearchMedidasAdoptadasSusalud(data) {
        return this.http
            .post(`${this.baseURL}/claims/getmedidassusalud`, data)
            .toPromise();
    }
    getReclamoByIdService(idreclamo, empresa) {
        return this.http
            .get(`${this.baseURL}/claims/${idreclamo}/${empresa}`)
            .toPromise();
    }

    //ubigeo by id
    getDepartamentoByIdService(departamento) {
        return this.http
            .get(`${this.baseURL}/ubigeo/departbyid/${departamento}`)
            .toPromise();
    }
    getProvinciaByIdService(departamento, provincia) {
        return this.http
            .get(
                `${this.baseURL}/ubigeo/provinciaby/${departamento}/${provincia}`
            )
            .toPromise();
    }
    getDistritoByIdService(departamento, provincia, distrito) {
        return this.http
            .get(
                `${this.baseURL}/ubigeo/distritobyid/${departamento}/${provincia}/${distrito}`
            )
            .toPromise();
    }

    //
    getParentescoByIdService(id) {
        return this.http
            .get(`${this.baseURL}/filtro/parentesco/${id}`)
            .toPromise();
    }
    getRecepcionByIdService(id) {
        return this.http
            .get(`${this.baseURL}/filtro/recepcion/${id}`)
            .toPromise();
    }

    //personal
    getListPersonalService(data) {
        return this.http
            .post(`${this.baseURL}/paciente/personal`, data)
            .toPromise();
    }
    getListPersonalByIdService(id) {
        return this.http
            .get(`${this.baseURL}/paciente/personal/${id}`)
            .toPromise();
    }

    getNivelReclamoService() {
        return this.http.get(`${this.baseURL}/filtro/nivelreclamo`).toPromise(); //calificacion_ejecutiva
    }
    //codigo LIBRO
    getCodigoLibroService(id, empresa) {
        return this.http
            .get(`${this.baseURL}/correlativo/codigolibro/${id}/${empresa}`)
            .toPromise();
    }

    getCalificacionEjecutiva() {
        return this.http
            .get(`${this.baseURL}/filtro/calificacion_ejecutiva`)
            .toPromise(); //calificacion_ejecutiva
    }
    //especialidad especialidad
    getEspecialidadService() {
        return this.http
            .get(`${this.baseURL}/filtrosms/especialidad`)
            .toPromise();
    }
    //jefe_area
    getJefeAreaService() {
        return this.http.get(`${this.baseURL}/filtrosms/jefe_area`).toPromise();
    }
    //hospitalizacion
    getHospitalizacionService() {
        return this.http
            .get(`${this.baseURL}/filtro/hospitalizacion`)
            .toPromise();
    }
    //personal
    getListPersonalListService() {
        return this.http
            .get(`${this.baseURL}/paciente/personallist`)
            .toPromise();
    }

    //
    postPrintService(data) {
        return this.http.post(`${this.baseURL}/claims/print`, data).toPromise();
    }
    getListServiciosService() {
        return this.http
            .get(`${this.baseURL}/filtro/servicioefectuado`)
            .toPromise();
    }
    getListResultadoReclamoService() {
        return this.http
            .get(`${this.baseURL}/filtro/resultado_reclamo`)
            .toPromise();
    }
    getListMotivoService() {
        return this.http.get(`${this.baseURL}/filtro/motivo`).toPromise();
    }

    //MEDIDAS AOPTADAS
    //
    postMedidasService(data) {
        return this.http.post(`${this.baseURL}/medidas`, data).toPromise();
    }
    getListMedidasService(id, empresa) {
        return this.http
            .get(`${this.baseURL}/medidas/${id}/${empresa}`)
            .toPromise();
    }
    updatetMedidasService(data) {
        return this.http.put(`${this.baseURL}/medidas`, data).toPromise();
    }
    updateCodigoMedidasService(data) {
        return this.http
            .put(`${this.baseURL}/medidas/codigomedida`, data)
            .toPromise();
    }

    getCountMedidasService(id, empresa) {
        return this.http
            .get(`${this.baseURL}/medidas/count/${id}/${empresa}`)
            .toPromise();
    }
    deleteMedidasService(id) {
        return this.http.delete(`${this.baseURL}/medidas/${id}`).toPromise();
    }

    getListClaimsPortalWebService(data) {
        return this.http.post(`${this.baseURL}/claimsportal`, data).toPromise();
    }

    //delete files resource
    deleteFiles(data) {
        return this.http.post(`${this.baseURL}/upload`, data).toPromise();
    }
    //update file name

    //DASHBOARD
    getRegisteredClaimsService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/registrados`, data)
            .toPromise();
    }
    getResolvedClaimsService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/resultos`, data)
            .toPromise();
    }
    getPendingClaimsService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/pendientes`, data)
            .toPromise();
    }
    getOthersClaimsService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/otros`, data)
            .toPromise();
    }
    getReceptionModeClaimsService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/mediorecepcion`, data)
            .toPromise();
    }
    getSateClaimsMesesService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/meses`, data)
            .toPromise();
    }

    getClaimsTimepoDestiempoService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/atiempo`, data)
            .toPromise();
    }
    getClaimsEstadoService(data) {
        return this.http
            .post(`${this.baseURL}/dashboard/estado`, data)
            .toPromise();
    }

    // Router Encuesta
    getFormulario(): Observable<HttpResponse<any>> {
        return this.http.get(`${this.API}/getSWEncuesta`, { observe: 'response' });
    }

    postFormulario(datoFormulario: Formulario): Observable<any> {
        return this.http.post(`${this.API}/postSWEncuesta`, datoFormulario);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    mensajeError(text: string): Promise<null> {
        return new Promise((resolve, reject) => {
            Swal.fire({
                text: text,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                confirmButtonColor: '#FF0000'
            });
        });
    }
}
