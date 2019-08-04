import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    register(): Promise<any> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.post('api/users/register', {}, { headers: httpHeaders }).toPromise().then(() => true);
    }
}
