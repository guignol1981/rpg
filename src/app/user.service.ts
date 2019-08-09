import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    register(data: any): Promise<boolean> {
        return this.httpClient.post('api/users/register', data).toPromise().then(() => true);
    }

    login(data: any): Promise<boolean> {
        return this.httpClient.post('api/users/login', data).toPromise().then((res: any) => res.data);
    }

    usernameAvaibility(username: string): Promise<boolean> {
        return this.httpClient.post('api/users/username-avaibility', { username }).toPromise().then((res: any) => res.data);
    }

    emailAvaibility(email: string): Promise<boolean> {
        return this.httpClient.post('api/users/email-avaibility', { email }).toPromise().then((res: any) => res.data);
    }
}
