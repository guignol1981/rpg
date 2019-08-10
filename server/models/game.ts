import Character from './character';

interface IVisitable {
    name: string;
    visitors: Character[];
}

class Village implements IVisitable {
    public visitors: Character[] = [];

    constructor(
        public readonly name: string
    ) { }
}

export default class Game {
    public world: IVisitable[];

    constructor() {
        this.world = [
            new Village('Selbina'),
            new Village('Bastok')
        ];
    }
}
