import Character from './character';

export enum CharacterActionTypes {
    None = 'none',
    Attack = 'attack',
    Defend = 'defend',
    Item = 'item',
    Ability = 'ability'
}

export default interface CharacterAction {
    type: CharacterActionTypes;
    source?: Character;
    target?: Character;
    value?: any;
}
