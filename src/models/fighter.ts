import Character, { CharacterClasses } from './character';

const FighterStats: any = {
    speed: new Map<number, number>([[1, 10], [2, 13]]),
    maxPV: new Map<number, number>([[1, 70], [2, 90]]),
};

export default class Fighter extends Character {
    constructor(
        public id: number,
        public level: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }

    public initStats(): void {
        this.speed = FighterStats.speed.get(this.level);
        this.maxPV = FighterStats.maxPV.get(this.level);
    }
}
