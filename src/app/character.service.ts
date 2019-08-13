import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RpgHttpResponse } from 'server/models/rpg-http-response';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    constructor(private httpClient: HttpClient) { }

    public create(data: any): Promise<boolean> {
        return this.httpClient
            .post('api/characters/create', data)
            .toPromise()
            .then((res: RpgHttpResponse) => res.data);
    }

    characterCheck(): Promise<boolean> {
        return this.httpClient
            .get('api/characters/character-check')
            .toPromise()
            .then((res: RpgHttpResponse) => res.data);
    }
}
