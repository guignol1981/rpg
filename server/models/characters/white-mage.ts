import Character from '../character';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status';

export default class WhiteMage extends Character {
    constructor(
        id: number,
        level: number,
        name: string,
    ) {
        super(id, name, CharacterClasses.WhiteMage, level);
    }

    public get imgSrc(): string {
        if (this.status === CharacterStatuses.Dead) {
            return 'assets/WhiteMage-Dead.gif';
        } else if (this.status === CharacterStatuses.Victorious) {
            return 'assets/WhiteMage-Victory.gif';
        } else if (this.isWounded) {
            return 'assets/WhiteMage-Wounded.gif';
        } else if (this.status === CharacterStatuses.Defending) {
            return 'assets/WhiteMage.gif';
        } else if (this.status === CharacterStatuses.Casting) {
            return 'assets/WhiteMage-CURE.gif';
        } else {
            return 'assets/WhiteMage-Walk.gif';
        }
    }

    public static Deserialize(data: any): WhiteMage {
        return new this(
            data['id'],
            data['level'],
            data['name']
        );
    }
}
