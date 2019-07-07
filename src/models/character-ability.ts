import Character from './character';

export enum CharacterAbilities {
    Cure = 'cure'
}

export abstract class CharacterAbility {
    constructor(
        public readonly source: Character,
        public readonly name: string
    ) { }

    abstract execute(target?: Character): void;
}
