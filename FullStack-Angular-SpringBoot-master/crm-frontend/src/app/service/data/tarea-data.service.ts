import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { Tarea } from '../../tareas/tareas.component';

@Injectable({
    providedIn: 'root'
})
export class TareaDataService {

    constructor(private http: HttpClient) { }

    retrieveAllTareas(username: string): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(`${API_URL}/users/${username}/tareas`);
    }

    retrieveTareasByEstado(username: string, estado: string): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(`${API_URL}/users/${username}/tareas/estado/${estado}`);
    }

    retrieveTarea(username: string, id: number): Observable<Tarea> {
        return this.http.get<Tarea>(`${API_URL}/users/${username}/tareas/${id}`);
    }

    addTarea(username: string, tarea: Tarea): Observable<Tarea> {
        return this.http.post<Tarea>(`${API_URL}/users/${username}/tareas`, tarea);
    }

    updateTarea(username: string, tarea: Tarea): Observable<Tarea> {
        return this.http.put<Tarea>(
            `${API_URL}/users/${username}/tareas/${tarea.id}`,
            tarea
        );
    }

    updateTareaEstado(username: string, id: number, nuevoEstado: string): Observable<Tarea> {
        return this.http.patch<Tarea>(
            `${API_URL}/users/${username}/tareas/${id}/estado`,
            nuevoEstado
        );
    }

    deleteTarea(username: string, id: number): Observable<any> {
        return this.http.delete(`${API_URL}/users/${username}/tareas/${id}`);
    }
}
