import { CharacterAbilities } from './character-ability';
import { CharacterClasses } from './character-classe';

export class CharacterStats {
    public readonly maxPV: number;
    public readonly speed: number;
    public readonly str: number;
    public readonly def: number;
    public readonly abilities: CharacterAbilities[];

    constructor(characterClasse: CharacterClasses, level: number) {
        switch (characterClasse) {
            case CharacterClasses.Fighter:
                this.maxPV = [10, 20, 30, 40, 50][level];
                this.speed = [1, 2, 3, 4, 5][level];
                this.str = [1, 2, 3, 4, 5][level];
                this.def = [1, 2, 3, 4, 5][level];
                this.abilities = [];
                break;
            case CharacterClasses.WhiteMage:
                this.maxPV = [10, 20, 30, 40, 50][level];
                this.speed = [1, 2, 3, 4, 5][level];
                this.str = [1, 2, 3, 4, 5][level];
                this.def = [1, 2, 3, 4, 5][level];
                this.abilities = [[], [CharacterAbilities.Cure]][level];
                break;
        }
    }
}
