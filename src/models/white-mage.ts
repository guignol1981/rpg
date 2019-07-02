import Character, { CharacterClasses } from './character';

export default class WhiteMage extends Character {
    constructor(
        public id: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.WhiteMage);
    }
}
