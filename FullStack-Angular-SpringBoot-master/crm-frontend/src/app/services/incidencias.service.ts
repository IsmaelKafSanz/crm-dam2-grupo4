import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private apiUrl = 'http://localhost:8080/incidencias';

  constructor(private http: HttpClient) {}

  getIncidencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createIncidencia(incidencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, incidencia);
  }

  updateIncidencia(id: number, incidencia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, incidencia);
  }

  deleteIncidencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

