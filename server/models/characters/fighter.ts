import Character from '../character';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status';

export default class Fighter extends Character {
    constructor(
        id: number,
        level: number,
        name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }

    public get imgSrc(): string {
        if (this.status === CharacterStatuses.Dead) {
            return 'assets/Fighter-Dead.gif';
        } else if (this.status === CharacterStatuses.Victorious) {
            return 'assets/Fighter-Victory.gif';
        } else if (this.isWounded) {
            return 'assets/Fighter-Wounded.gif';
        } else if (this.status === CharacterStatuses.Defending) {
            return 'assets/Fighter.gif';
        } else {
            return 'assets/Fighter-Walk.gif';
        }
    }
}
