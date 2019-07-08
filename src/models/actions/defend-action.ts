import Character from '../character';
import CharacterAction, { CharacterActionTypes } from '../character-action';
import { CharacterStatuses } from '../character-status';

export class DefendAction extends CharacterAction {
    constructor(
        source: Character
    ) {
        super(CharacterActionTypes.Defend, false, source, null, 1);
    }

    public execute(): void {
        this.source.status = CharacterStatuses.Defending;
    }
}
