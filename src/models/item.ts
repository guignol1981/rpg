import Character from './character';

export enum ItemTypes {
    Consumable = 'consumable'
}

export abstract class Item {
    constructor(
        public readonly type: ItemTypes,
        public readonly name: string,
        public readonly source?: Character,
    ) { }

    abstract use(target?: Character): void;
}
