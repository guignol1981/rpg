import DestinationModel from '../schemas/destination';
import Character from './character';

interface IDestination {
    id: string;
    name: string;
    visitors: Character[];
    isDefault: boolean;
}

class Village implements IDestination {
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
        DestinationModel.find().exec((err, destinations) => {
            destinations.forEach(destination => {
                this.destinations.push(new Village(destination.id, destination.name, destination.isDefault));
            });
            console.log(this.destinations);
        });

    }
}
