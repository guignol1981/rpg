import Character from '../character';
import CharacterAction, { CharacterActionTypes } from '../character-action';
import { CharacterStatuses } from '../character-status';

export class AttackAction extends CharacterAction {
    constructor(
        source: Character,
        target: Character
    ) {
        super(CharacterActionTypes.Attack, true, source, target, 1);
    }

    public execute(): void {
        if (this.target.status === CharacterStatuses.Defending) {
            this.target.PV -= (1 * this.source.str) / 2;
            this.target.status = CharacterStatuses.Idle;
        } else {
            this.target.PV -= 1 * this.source.str;
        }

        this.source.resetAbt();
    }
}
