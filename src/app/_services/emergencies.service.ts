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
export class EmergenciesService {
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
 getEmergenciesAttentionConsultation(data): Observable<any> {
  this.loadTableApiDataURL = `${environment.api_url}emergenciasConsultaAtenciones`;
  return this.http.post(this.loadTableApiDataURL, data);
  }
    // Estadisticas 
    getEmResumenGeneralProcesar(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmResumenGeneralProcesar`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getEmAtencionesResumenMensual(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmAtencionesResumenMensual`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getEmAtencionesResumenAnual(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmAtencionesResumenAnual`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getEmTiposPacientes(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmTiposPacientes`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getEmCalcularMontos(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmCalcularMontos`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getEmChartIndex(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmChartIndex`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getEmPieIndex(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmPieIndex`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
    getCeMedicosStatistics(data): Observable<any> {
      this.loadTableApiDataURL = `${environment.api_url}getEmMedicosStatistics`;
      return this.http.post(this.loadTableApiDataURL, data);
    }
}
