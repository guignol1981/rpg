import Character from './character';

export enum CharacterActionTypes {
    None = 'none',
    Attack = 'attack',
    Defend = 'defend',
    Item = 'item',
    Cure = 'cure'
}

export default abstract class CharacterAction {
    public constructor(
        public type: CharacterActionTypes,
        public needTarget: boolean,
        public source?: Character,
        public target?: Character,
        public range?: number,
        public value?: any,
    ) { }

    abstract execute(): void;
}
