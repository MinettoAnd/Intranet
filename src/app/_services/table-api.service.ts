import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HospitalDischargeConsultationComponent } from '../pages/hospitalization/hospital-discharge-consultation/hospital-discharge-consultation.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TableApiService {

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

  getTableApiData(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getAtenciones`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getEmergenciesAttentionConsultation(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}emergenciasConsultaAtenciones`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getHospitalDischargeConsultation(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}hospitalizaConsultaAltas`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getExternalAttentionConsultation(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}consultaExternaAtenciones`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // Comercial - Ventas - Cuotas Programas de Salud
  getPagoCuotasMesProgramasSalud(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}pagoCuotasMesProgramasSalud`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getPagoCuotasContratosMesProgramasSalud(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}pagoCuotasContratosMesProgramasSalud`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getPagoCuotasProgramasSalud(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}pagoCuotasProgramasSalud`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getPagoCuotasContratosProgramasSalud(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}pagoCuotasContratosProgramasSalud`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // Comercial - Programas de Salud - Listados
  getMorososDetalle(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getMorososDetalle`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getVigentesDetalle(): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getVigentesDetalle`;
    return this.http.get(this.loadTableApiDataURL);
  }
  getAfiliadosVigentesDetalle(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getAfiliadosVigentesDetalle`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getMadreNinoDetalle(): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getMadreNinoDetalle`;
    return this.http.get(this.loadTableApiDataURL);
  }
  getMadreNinoMorososDetalle(): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getMadreNinoMorososDetalle`;
    return this.http.get(this.loadTableApiDataURL);
  }
}

