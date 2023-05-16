import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RrhhService {
  response: Observable<any>;
  baseURL: string = environment.baseURL;
  loadTableApiDataURL = null;
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



  //COLABORADORES cargo_colaborador
  getColaboradoresFilterService(data) {
    return this.http.post(`${this.baseURL}/collaborators`, data).toPromise();
  }
  updateColaboradorEmailService(data) {
    console.log(34, data);
    return this.http.put(`${this.baseURL}/collaborators`, data).toPromise();
  }

  getCargoService() {
    return this.http.get(`${this.baseURL}/filtrosms/cargo_colaborador`).toPromise();
  }
}
