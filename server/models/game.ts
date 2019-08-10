import DestinationModel from '../schemas/destination';
import Character from './character';

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

    constructor() {
        this._initDestinations();
    }

    private _initDestinations(): void {
        DestinationModel.find().exec((err, destinations) => {
            destinations.forEach(destination => {
                this.destinations.push(new Village(destination.id, destination.name, destination.isDefault));
            });
        });
    }
}
