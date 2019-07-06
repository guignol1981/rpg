import Character, { CharacterClasses } from './character';

const WhiteMageStats: any = {
    speed: new Map<number, number>([[1, 50], [2, 55]]),
    maxPV: new Map<number, number>([[1, 50], [2, 60]]),
};

export default class WhiteMage extends Character {
    constructor(
        public id: number,
        public level: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.WhiteMage, level);
    }

    public initStats(): void {
        this.speed = WhiteMageStats.speed.get(this.level);
        this.maxPV = WhiteMageStats.maxPV.get(this.level);
    }
}
