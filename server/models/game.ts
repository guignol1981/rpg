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
            if (err) { throw err; }

            destinations.forEach(destination => {
                this.destinations.push(new Village(destination.id, destination.name, destination.isDefault));
            });
        });
    }

    private _handleConnections(): void {
        this.socket.on('connection', (clientSocket: SocketIOClient.Socket) => {
            const user = (clientSocket as any).request.user;
            const character: WhiteMage = new WhiteMage(user.character.id, user.character.level, user.character.name);

            CharacterModel.findOne({ _id: character.id }).exec((err, characterDoc) => {
                if (err) { throw err; }

                const destination = this.destinations.find(d => characterDoc.destination.equals(d.id));

                if (!destination.visitors.find(v => character.id === v.id)) {
                    destination.visitors.push(character);
                }

                this.socket.emit('destination', destination);

                clientSocket.on('disconnect', () => {
                    destination.visitors = destination.visitors.filter(v => v.id !== character.id);

                    this.socket.emit('destination', destination);
                });
            });
        });
    }
}
