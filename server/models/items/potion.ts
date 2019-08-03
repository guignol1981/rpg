import Character from '../character';
import { Item, ItemTypes } from '../item';

export class Potion extends Item {
    constructor(
    ) {
        super(ItemTypes.Consumable, 'Potion');
    }

    public use(target: Character): void {
        target.PV += 50;
    }
}
