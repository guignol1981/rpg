import GameConfig from '../../game-config.json';
import Character from '../character';
import CharacterAction, { CharacterActionTypes } from '../character-action';
import { CharacterStatuses } from '../character-status';

export class CureAction extends CharacterAction {
    private castingTime = 3000;

    constructor(
        source: Character,
        target: Character
    ) {
        super(CharacterActionTypes.Cure, true, source, target, 1);
    }

    public execute(): void {
        this.source.status = CharacterStatuses.Casting;

        setTimeout(() => {
            if (this.source.status === CharacterStatuses.Victorious) {
                return;
            }

            if (this.target.isAlive) {
                this.target.PV += 20 * this.source.level;
                console.log(`${this.source.name} casting Cure on ${this.target.name}`);
            }

            this.source.resetAbt();
        }, this.castingTime / GameConfig.battleSpeed);
    }
}
