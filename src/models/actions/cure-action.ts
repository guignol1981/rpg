import Character from '../character';
import CharacterAction, { CharacterActionTypes } from '../character-action';

export class CureAction extends CharacterAction {
    constructor(
        source: Character,
        target: Character
    ) {
        super(CharacterActionTypes.Cure, true, source, target, 1);
    }

    public execute(): void {
        this.target.PV += 20 * this.source.level;
    }
}
