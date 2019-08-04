import { Component, OnInit } from '@angular/core';
import Character from 'server/models/character';
import * as io from 'socket.io-client';


@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
    public socket: SocketIOClient.Socket = io.connect();

    constructor() {

    }

    ngOnInit() {
        this.socket.emit('event1', {
            msg: 'Client to server, can you hear me server?'
        });

        this.socket.on('character', (character: Character) => {
            console.log(character.name);
        });
    }
}
