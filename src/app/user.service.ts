import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RpgHttpResponse } from 'server/models/rpg-http-response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    register(data: any): Promise<boolean> {
        return this.httpClient
            .post('api/users/register', data)
            .toPromise()
            .then((res: RpgHttpResponse) => res.data);
    }

    login(data: any): Promise<boolean> {
        return this.httpClient
            .post('api/users/login', data)
            .toPromise()
            .then((res: RpgHttpResponse) => res.data);
    }

    usernameAvaibility(username: string): Promise<boolean> {
        return this.httpClient
            .post('api/users/username-avaibility', { username })
            .toPromise()
            .then((response: RpgHttpResponse) => response.data);
    }

    emailAvaibility(email: string): Promise<boolean> {
        return this.httpClient
            .post('api/users/email-avaibility', { email })
            .toPromise()
            .then((response: RpgHttpResponse) => response.data);
    }
}
