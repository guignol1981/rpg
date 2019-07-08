import { CharacterActionTypes } from './character-action';
import { CharacterClasses } from './character-classe';

export class CharacterStats {
    public readonly maxPV: number;
    public readonly speed: number;
    public readonly str: number;
    public readonly def: number;
    public readonly actionTypes: CharacterActionTypes[];

    constructor(characterClasse: CharacterClasses, level: number) {
        switch (characterClasse) {
            case CharacterClasses.Fighter:
                this.maxPV = [10, 20, 30, 40, 50][level];
                this.speed = [1, 2, 3, 4, 5][level];
                this.str = [1, 2, 3, 4, 5][level];
                this.def = [1, 2, 3, 4, 5][level];
                this.actionTypes = [
                    [
                        CharacterActionTypes.Attack,
                        CharacterActionTypes.Defend,
                        CharacterActionTypes.Item,
                    ]
                ][level];
                break;
            case CharacterClasses.WhiteMage:
                this.maxPV = [10, 20, 30, 40, 50][level];
                this.speed = [1, 2, 3, 4, 5][level];
                this.str = [1, 2, 3, 4, 5][level];
                this.def = [1, 2, 3, 4, 5][level];
                this.actionTypes = [
                    [
                        CharacterActionTypes.Attack,
                        CharacterActionTypes.Defend,
                        CharacterActionTypes.Item,
                        CharacterActionTypes.Cure
                    ]
                ][level];
                break;
        }
    }
}
