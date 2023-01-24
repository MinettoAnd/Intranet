import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ExternalConsultationService {

  loadTableApiDataURL = null;

  constructor(private http: HttpClient) {


 }
 private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Error
    console.error('error:', error.error.message);
  } else {
    // Error
    console.error(
      `Api server returned ${error.status}, ` +
      `error body: ${error.error}`);
  }
  // throwError is observable
  return throwError('Error has happened');
}

private extractData(res: Response) {
  const body = res;
  return body || {};
}
  // Consultorios Externos
  getExternalAttentionConsultation(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}consultaExternaAtenciones`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // Ocupabilidad de consultorio
    // Operaciones con tablas
  eliminarTablasConsultorio(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}eliminarTablasConsultorio`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  creaTablaConsultorioAnual(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}creaTablaConsultorioAnual`;
    return this.http.post(this.loadTableApiDataURL, data);
  }

  getResumenCabeceraMes(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenCabeceraMes`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getUsoConsultorioMes(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getUsoConsultorioMes`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getGraficoProgressBars_0(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getGraficoProgressBars_0`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenGrafica1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenGrafica1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenConsultorios_1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenConsultorios_1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenCabecera(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenCabecera`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getUsoConsultorioAnual(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getUsoConsultorioAnual`;
    return this.http.post(this.loadTableApiDataURL, data);
  }

  // Ocupabilidad de Médico
  // Operaciones con tablas
  eliminarTablasMedico(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}eliminarTablasMedico`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  creaTablaMedicoAnual(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}creaTablaMedicoAnual`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenCabeceraEspecialidadMes(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenCabeceraEspecialidadMes`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getUsoResumenEspecialidadMes(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getUsoResumenEspecialidadMes`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getUsoResumenMedicoMes(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getUsoResumenMedicoMes`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenMedicoGrafica1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenMedicoGrafica1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenMedico_1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenMedico_1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getUsoMedicoAnual(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getUsoMedicoAnual`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // Estadisticas 
  getCeResumenGeneralProcesar(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeResumenGeneralProcesar`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeAtencionesResumenAnual(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeAtencionesResumenAnual`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeTiposPacientes(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeTiposPacientes`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeCalcularMontos(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeCalcularMontos`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeProcesarAnterior(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeProcesarAnterior`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeChartIndex(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeChartIndex`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCePieIndex(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCePieIndex`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeMedicosStatistics(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeMedicosStatistics`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCeMedicosRecord(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCeMedicosRecord`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
}
