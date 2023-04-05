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
export class HospitalizationService {

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

  // getTableApiData(data): Observable<any> {
  //   this.loadTableApiDataURL = `${environment.api_url}getAtenciones`;
  //   return this.http.post(this.loadTableApiDataURL, data);
  // }
  // getEmergenciesAttentionConsultation(data): Observable<any> {
  //   this.loadTableApiDataURL = `${environment.api_url}emergenciasConsultaAtenciones`;
  //   return this.http.post(this.loadTableApiDataURL, data);
  // }
  getHospitalDischargeConsultation(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}hospitalizaConsultaAltas`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getInternadosDetalle(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getInternadosDetalle`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
      // Estadisticas 
      getHsResumenGeneralProcesar(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsResumenGeneralProcesar`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsAtencionesResumenAnual(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsAtencionesResumenAnual`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsTiposPacientes(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsTiposPacientes`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsCalcularMontos(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsCalcularMontos`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsProcesarAnterior(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsProcesarAnterior`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsChartIndex(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsChartIndex`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsPieIndex(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsPieIndex`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
      getHsMedicosStatistics(data): Observable<any> {
        this.loadTableApiDataURL = `${environment.api_url}getHsMedicosStatistics`;
        return this.http.post(this.loadTableApiDataURL, data);
      }
}

