import Character, { CharacterClasses } from './character';

export default class WhiteMage extends Character {
    public speed = 10;
    
    constructor(
        public id: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.WhiteMage, 80);
    }
}
