import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalConsultationTicketPromedioService {

  private url: string = environment.api_url;

  constructor(private http: HttpClient) {}

  getConsolidado(data): Observable<any> {
    const url = `${this.url}getConsolidado`;
    return this.http.post(url, data);
  }

  getConsulta(data): Observable<any> {
    const url = `${this.url}getConsulta`;
    return this.http.post(url, data);
  }

  getLaboratorio(data): Observable<any> {
    const url = `${this.url}getLaboratorio`;
    return this.http.post(url, data);
  }

  getImagenes(data): Observable<any> {
    const url = `${this.url}getImagenes`;
    return this.http.post(url, data);
  }

  getProcedimientos(data): Observable<any> {
    const url = `${this.url}getProcedimientos`;
    return this.http.post(url, data);
  }

  getMedicinas(data): Observable<any> {
    const url = `${this.url}getMedicinas`;
    return this.http.post(url, data);
  }

}
