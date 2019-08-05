import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    register(data: any): Promise<any> {
        return this.httpClient.post('api/users/register', data).toPromise().then((response) => true);
    }
}
