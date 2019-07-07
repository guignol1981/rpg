import Character from '../character';
import { CharacterClasses } from '../character-classe';

export default class Fighter extends Character {
    constructor(
        public id: number,
        public level: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }
}
