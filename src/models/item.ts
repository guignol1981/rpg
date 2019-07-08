import Character from './character';

export enum ItemTypes {
    Consumable = 'consumable'
}

export abstract class Item {
    constructor(
        public readonly type: ItemTypes,
        public readonly name: string,
    ) { }

    abstract use(target?: Character): void;
}
