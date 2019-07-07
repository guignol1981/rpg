import Character from '../character';
import { CharacterAbilities, CharacterAbility } from '../character-ability';

export class Cure extends CharacterAbility {
    constructor(
        source: Character
    ) {
        super(source, CharacterAbilities.Cure);
    }

    public execute(target?: Character): void {
        target.PV += 20 * this.source.level;
    }
}
