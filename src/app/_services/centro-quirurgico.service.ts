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
export class CentroQuirurgicoService {

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


  getTablaProgramados(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getTablaProgramados`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCqConsultaAtenciones(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqConsultaAtenciones`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // Estadisticas
  getCqrGeneraArchivos(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqrGeneraArchivos`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCqrResumenCabecera(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqrResumenCabecera`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCqrResumenTipoPaciente(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqrResumenTipoPaciente`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCqrResumenEquipos(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqrResumenEquipos`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCqrResumenEstancia(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqrResumenEstancia`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getCqrResumenGrafica(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getCqrResumenGrafica`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
}

