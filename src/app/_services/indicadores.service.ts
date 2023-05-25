import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  loadTableApiDataURL = null;
  constructor(private http: HttpClient) { }

  getTablaResumenMensual(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getTablaResumenMensual`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getTablaResumen1Pag1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getTablaResumen1Pag1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenEspecialidadMensual1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenEspecialidadMensual1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenMedicoMensual1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenMedicoMensual1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenRecetaGrafica1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenRecetaGrafica1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getResumenGraficaSedes1(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getResumenGraficaSedes1`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
}
