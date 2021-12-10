import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  response: Observable<any>;
  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) {
    //this.baseURL = '/api';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  //ROLES
  getFechasService() {
    return this.http.get(`${this.baseURL}/report/fecha`).toPromise();
  }
  getAtendidosEmergencia(data) {
    return this.http.post(`${this.baseURL}/report/emergencia`, data).toPromise();
  }
  getAtendidosHopitalizacionIngresos(data) {
    return this.http.post(`${this.baseURL}/report/hospitalizacion_ingresos`, data).toPromise();
  }
  getAtendidosHopitalizacionAltas(data) {
    return this.http.post(`${this.baseURL}/report/hospitalizacion_altas`, data).toPromise();
  }
  getAtendidosHopitalizacionTipoPaciente(data) {
    return this.http.post(`${this.baseURL}/report/hospitalizacion_tipo_paciente`, data).toPromise();
  }
  getConsultaExterna(data) {
    return this.http.post(`${this.baseURL}/report/consulta_externa`, data).toPromise();
  }
  getConsultaNeonatologia(data) {
    return this.http.post(`${this.baseURL}/report/neonatologia`, data).toPromise();
  }
  getConsultaQuirurgicoProgramdo(data) {
    return this.http.post(`${this.baseURL}/report/quirurgico_programado`, data).toPromise();
  }
  getConsultaQuirurgicoAtendidos(data) {
    return this.http.post(`${this.baseURL}/report/quirurgico_atendidos`, data).toPromise();
  }
  getConsultaCentroObstetrico(data) {
    return this.http.post(`${this.baseURL}/report/centro_obstetrico`, data).toPromise();
  }
  sendMailRerportService(data) {
    return this.http.post(`${this.baseURL}/mailreport`, data).toPromise();
  }
}
