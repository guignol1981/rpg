import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    constructor(private httpClient: HttpClient) { }

    public create(): Promise<boolean> {
        return this.httpClient.post('api/characters/create', {}).toPromise().then(() => true);
    }
}
