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
export class RecursosHumanosService {

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


  RRhhGetPlanillaEstadisticaResumen(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}RRhhGetPlanillaEstadisticaResumen`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  RRhhGetPlanillaEstadisticaKPI(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}RRhhGetPlanillaEstadisticaKPI`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  // RRhhGetResumenColaboradores(data): Observable<any> {
  //   this.loadTableApiDataURL = `${environment.api_url}RRhhGetResumenColaboradores`;
  //   return this.http.post(this.loadTableApiDataURL, data);
  // }
  RRhhGetPlanilla(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}RRhhGetPlanilla`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  getColaboradoresBy(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}getColaboradoresBy`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
  boletasEnviadas(data): Observable<any> {
    this.loadTableApiDataURL = `${environment.api_url}boletasEnviadas`;
    return this.http.post(this.loadTableApiDataURL, data);
  }
}

