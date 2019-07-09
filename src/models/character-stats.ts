import Character from './character';
import { CharacterActionTypes } from './character-action';
import { CharacterClasses } from './character-classe';

export class CharacterStats {
    public readonly maxPV: number;
    public readonly speed: number;
    public readonly str: number;
    public readonly def: number;
    public readonly actionTypes: CharacterActionTypes[];

    constructor(character: Character) {
        switch (character.classe) {
            case CharacterClasses.Fighter:
                this.maxPV = [10, 20, 30, 40, 50][character.level - 1];
                this.speed = [6, 11, 30, 4, 5][character.level - 1];
                this.str = [2, 3, 4, 5, 6][character.level - 1];
                this.def = [1, 2, 3, 4, 5][character.level - 1];
                this.actionTypes = [
                    [
                        CharacterActionTypes.Attack,
                        CharacterActionTypes.Defend,
                        CharacterActionTypes.Item,
                    ]
                ][character.level - 1];
                break;
            case CharacterClasses.WhiteMage:
                this.maxPV = [10, 20, 30, 40, 50][character.level - 1];
                this.speed = [5, 10, 3, 4, 5][character.level - 1];
                this.str = [1, 2, 3, 4, 5][character.level - 1];
                this.def = [1, 2, 3, 4, 5][character.level - 1];
                this.actionTypes = [
                    [
                        CharacterActionTypes.Attack,
                        CharacterActionTypes.Defend,
                        CharacterActionTypes.Item,
                        CharacterActionTypes.Cure
                    ]
                ][character.level - 1];
                break;
        }
    }
}
