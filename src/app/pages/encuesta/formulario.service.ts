import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Formulario } from 'src/app/pages/models/encuesta/formulario';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: "root",
})

/* @Injectable({
  providedIn: 'root'
}) */
export class FormularioService {

  //API: string = 'http://localhost:8000/api/formulario02';
  //API2: string = 'http://localhost:8000/api/formulario01';
  //API2: string = 'http://localhost:8000/api/getSWEncuesta';
  //API: string = 'http://localhost:8000/api/postSWEncuesta';
  API: string = environment.api_url;
 // API2: string = environment.api_url2;

  constructor( private http:HttpClient) { }  
  
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'aplication/json'
    })
  };


  // Router Encuesta
getFormulario(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.API}getSWEncuesta`, { observe: 'response' });
}

postFormulario(datoFormulario: Formulario): Observable<any> {
    return this.http.post(`${this.API}postSWEncuesta`, datoFormulario, this.httpOption);
}




////////////////////////////////////////////////////////////////////////////////////

mensajeError(text: string): Promise<null> {
    return new Promise((resolve, reject) => {
        Swal.fire({
            text: text,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            confirmButtonColor: '#FF0000'
        });
    });
}
}



