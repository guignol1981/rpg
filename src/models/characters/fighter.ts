import Character from '../character';
import { CharacterClasses } from '../character-classe';

export default class Fighter extends Character {
    constructor(
        id: number,
        level: number,
        name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }
}
