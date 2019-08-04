import { Component, OnInit } from '@angular/core';
import BattleLobby from 'server/models/battle-lobby';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-battle-lobby',
    templateUrl: './battle-lobby.component.html',
    styleUrls: ['./battle-lobby.component.scss']
})
export class BattleLobbyComponent implements OnInit {
    public socket: SocketIOClient.Socket = io.connect();
    public battleLobby: BattleLobby;

    constructor() { }

    ngOnInit() {
        this.socket.on('battle-lobby', (battleLobby: BattleLobby) => {
            this.battleLobby = battleLobby;
        });
    }
}
