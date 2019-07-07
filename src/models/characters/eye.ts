import Character from '../character';
import { CharacterActionTypes } from '../character-action';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status';
import GameConfig from '../game-config.json';
import NPC from '../npc';

export default class Eye extends Character implements NPC {
    public targets: Character[] = [];
    public allies: Character[] = [];
    public speed = 12;

    constructor(
        public id: number,
        public level: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }

    public initStats(): void {
        this.speed = 5;
        this.maxPV = 20;
    }

    public startAbt(): void {
        const abtInterval: any = setInterval(() => {
            if (this.status === CharacterStatuses.Dead) {
                clearInterval(abtInterval);
            }

            this.abt += this.speed;

            if (this.abt >= 100) {
                this.executeActionObservable.next({
                    type: CharacterActionTypes.Attack,
                    source: this,
                    target: this.targets[Math.floor(Math.random() * this.targets.length)]
                });
            }
        }, 1000 / GameConfig.battleSpeed);
    }
}
