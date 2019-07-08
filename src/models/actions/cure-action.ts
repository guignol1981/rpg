import Character from '../character';
import CharacterAction, { CharacterActionTypes } from '../character-action';
import { CharacterStatuses } from '../character-status';

export class CureAction extends CharacterAction {
    private castingTime: 3000;

    constructor(
        source: Character,
        target: Character
    ) {
        super(CharacterActionTypes.Cure, true, source, target, 1);
    }

    public async execute(): Promise<void> {
        this.source.status = CharacterStatuses.Casting;

        await setTimeout(() => { }, this.castingTime);

        this.target.PV += 20 * this.source.level;

        this.source.resetAbt();
    }
}
