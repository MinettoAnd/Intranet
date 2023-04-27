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
export class TesoreriaService {

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


  TsGeneraArchivos(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}TsGeneraArchivos`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  TsGetResumenCabecera(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}TsGetResumenCabecera`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  TsGetGraficaAnualMontos(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}TsGetGraficaAnualMontos`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  TsGetResumenTipoTarjeta(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}TsGetResumenTipoTarjeta`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  TsListaPagosDetalleCitas(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}TsListaPagosDetalleCitas`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  TsEliminaTabla(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}TsEliminaTabla`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // Ingresos Estadisticas
  IngGetIngresosResumen(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}IngGetIngresosResumen`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // JPRIC gpric/get_resumen
  GpricGetResumen(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}GpricGetResumen`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  GpricGetExpedientesPendiemtesDetalle(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}GpricGetExpedientesPendiemtesDetalle`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
}

