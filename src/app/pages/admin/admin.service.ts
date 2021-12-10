import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AdminService {
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
    getListModuleAssign() {
        return this.http.get(`${this.baseURL}/permisos/assign`).toPromise();
    }
    getUserListService() {
        return this.http.get(`${this.baseURL}/info`).toPromise();
    }

    getRolesServices() {
        return this.http.get(`${this.baseURL}/permisos/roles`).toPromise();
    }
    getProfileUserService(data) {
        return this.http.post(`${this.baseURL}/users/profile`, data).toPromise();
    }
    getProfileUserSearchService(data) {
        return this.http.post(`${this.baseURL}/users/search_users`, data).toPromise();
    }
    getUserBrIdService(persona) {
        return this.http.get(`${this.baseURL}/info/${persona}`).toPromise();
    }
    updateUserService(data) {
        return this.http.put(`${this.baseURL}/info`, data).toPromise();
    }
    postUserService(data) {
        return this.http.post(`${this.baseURL}/info`, data).toPromise();
    }
    deleteUserService(id) {
        return this.http.delete(`${this.baseURL}/info/${id}`).toPromise();
    }

    postRolesServices(data) {
        return this.http.post(`${this.baseURL}/permisos/rol`, data).toPromise();
    }

    postModulosRoutesServices(data) {
        return this.http.post(`${this.baseURL}/permisos/rol/module`, data).toPromise();
    }

    getPermisosModoleAbilitado(idrol) {
        return this.http.get(`${this.baseURL}/permisos/acces/${idrol}`).toPromise();
    }
    updateRoles(data) {
        return this.http.put(`${this.baseURL}/permisos/rol`, data).toPromise();
    }
    deletePermisosService(id) {
        return this.http.delete(`${this.baseURL}/permisos/acces/${id}`).toPromise();
    }
    deleteModulosPermisosService(id) {
        return this.http.delete(`${this.baseURL}/permisos/mosulospermisos/${id}`).toPromise();
    }

}
