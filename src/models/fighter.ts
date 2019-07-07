import Character, { CharacterClasses } from './character';

export default class Fighter extends Character {
    constructor(
        public id: number,
        public level: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }
}
