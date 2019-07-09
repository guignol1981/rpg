export enum CharacterStatuses {
    Idle = 0 << 0,
    Casting = 1 << 1,
    Defending = 2 << 2,
    Dead = 4 << 4,
    Victorious = 5 << 6,
    CantPerformAction = Casting | Defending | Dead
}
