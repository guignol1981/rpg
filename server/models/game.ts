import SocketIO from 'socket.io';
import CharacterModel from '../schemas/character';
import DestinationModel from '../schemas/destination';
import Character from './character';
import WhiteMage from './characters/white-mage';

export interface IDestination {
    id: string;
    name: string;
    visitors: Character[];
    isDefault: boolean;
}

export class Village implements IDestination {
    public visitors: Character[] = [];

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isDefault: boolean = false
    ) { }
}

export default class Game {
    public destinations: IDestination[] = [];

    constructor(
        private socket: SocketIO.Socket
    ) {
        this._initDestinations();
        this._handleConnections();
    }

    private _initDestinations(): void {
        DestinationModel.find().exec((err, destinations) => {
            destinations.forEach(destination => {
                this.destinations.push(new Village(destination.id, destination.name, destination.isDefault));
            });
        });
    }

    private _handleConnections(): void {
        this.socket.on('connection', (clientSocket) => {
            const user = clientSocket.request.user;
            const character: WhiteMage = new WhiteMage(user.character.id, user.character.level, user.character.name);

            CharacterModel.findOne({ _id: character.id }).exec((err, characterDoc) => {
                const destination = this.destinations.find(d => d.id == characterDoc.destination);
                destination.visitors.push(character);

                this.socket.emit('destination', destination);
            });
        });
    }

    private _handleDisconnections(): void {
        this.socket.on('disconnect', (clientSocket) => {
            console.log('disconnected');
            const user = clientSocket.request.user;

            CharacterModel.findOne({ _id: user.character.id }).exec((err, characterDoc) => {
                const destination = this.destinations.find(d => d.id == characterDoc.destination);
                destination.visitors = destination.visitors.filter(v => v.id == characterDoc.id);
                this.socket.emit('destination', destination);
            });
        });
    }
}
