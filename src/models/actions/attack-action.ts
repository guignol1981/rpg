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
        const dmg: number = Math.random() * Math.floor(this.source.str);

        if (this.target.status === CharacterStatuses.Defending) {
            this.target.PV -= dmg / 2;
            this.target.status = CharacterStatuses.Idle;
        } else {
            this.target.PV -= dmg;
        }

        this.source.resetAbt();

        console.log(`${this.source.name} attacking ${this.target.name}`);
    }
}
