import Character, { CharacterClasses } from './character';

export default class Fighter extends Character {
    public speed = 8;

    constructor(
        public id: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.Fighter, 90);
    }
}
