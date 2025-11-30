import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { Incidencia } from '../../incidencias/incidencias.component';

@Injectable({
    providedIn: 'root'
})
export class IncidenciaDataService {

    constructor(private http: HttpClient) { }

    retrieveAllIncidencias(username: string): Observable<Incidencia[]> {
        return this.http.get<Incidencia[]>(`${API_URL}/users/${username}/incidencias`);
    }

    retrieveIncidencia(username: string, id: number): Observable<Incidencia> {
        return this.http.get<Incidencia>(`${API_URL}/users/${username}/incidencias/${id}`);
    }

    addIncidencia(username: string, incidencia: Incidencia): Observable<Incidencia> {
        return this.http.post<Incidencia>(`${API_URL}/users/${username}/incidencias`, incidencia);
    }

    updateIncidencia(username: string, incidencia: Incidencia): Observable<Incidencia> {
        return this.http.put<Incidencia>(
            `${API_URL}/users/${username}/incidencias/${incidencia.id}`,
            incidencia
        );
    }

    deleteIncidencia(username: string, id: number): Observable<any> {
        return this.http.delete(`${API_URL}/users/${username}/incidencias/${id}`);
    }
}
