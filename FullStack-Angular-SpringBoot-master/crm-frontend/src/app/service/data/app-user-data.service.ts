import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { AppUser } from '../../app-users/app-users.component';

@Injectable({
    providedIn: 'root'
})
export class AppUserDataService {

    constructor(private http: HttpClient) { }

    retrieveAllUsers(username: string): Observable<AppUser[]> {
        return this.http.get<AppUser[]>(`${API_URL}/users/${username}/app-users`);
    }

    retrieveUser(username: string, id: number): Observable<AppUser> {
        return this.http.get<AppUser>(`${API_URL}/users/${username}/app-users/${id}`);
    }

    addUser(username: string, user: AppUser): Observable<AppUser> {
        return this.http.post<AppUser>(`${API_URL}/users/${username}/app-users`, user);
    }

    updateUser(username: string, user: AppUser): Observable<AppUser> {
        return this.http.put<AppUser>(
            `${API_URL}/users/${username}/app-users/${user.id}`,
            user
        );
    }

    deleteUser(username: string, id: number): Observable<any> {
        return this.http.delete(`${API_URL}/users/${username}/app-users/${id}`);
    }
}
