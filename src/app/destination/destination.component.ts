import { Component, OnInit } from '@angular/core';
import { IDestination } from 'server/models/game';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-destination',
    templateUrl: './destination.component.html',
    styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
    private socket: SocketIOClient.Socket = io.connect();
    public destination: IDestination;

    constructor() { }

    ngOnInit() {
        this.socket.on('destination', (destination: IDestination) => {
            this.destination = destination;
        });
    }
}
