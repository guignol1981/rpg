import Character from '../character';
import CharacterAction, { CharacterActionTypes } from '../character-action';
import { Item } from '../item';

export class ItemAction extends CharacterAction {
    constructor(
        source: Character,
        target: Character,
        item: Item
    ) {
        super(CharacterActionTypes.Attack, true, source, target, 1, item);
    }

    public execute(): void {
        (this.value as Item).use(this.target[0]);

        this.source.resetAbt();
    }
}
