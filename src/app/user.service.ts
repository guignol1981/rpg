import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RpgHttpResponse } from 'server/models/rpg-http-response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    register(data: any): Promise<boolean> {
        return this.httpClient.post('api/users/register', data).toPromise().then(() => true);
    }

    login(data: any): Promise<RpgHttpResponse> {
        return this.httpClient.post('api/users/login', data).toPromise().then((response: RpgHttpResponse) => response);
    }

    usernameAvaibility(username: string): Promise<boolean> {
        return this.httpClient.post('api/users/username-avaibility', { username }).toPromise().then((response: any) => response.data);
    }

    emailAvaibility(email: string): Promise<boolean> {
        return this.httpClient.post('api/users/email-avaibility', { email }).toPromise().then((response: any) => response.data);
    }
}
