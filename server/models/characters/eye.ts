import GameConfig from '../../game-config.json';
import { AttackAction } from '../actions/attack-action.js';
import Character from '../character';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status';
import NPC from '../npc';

export default class Eye extends Character implements NPC {
    public targets: Character[] = [];
    public allies: Character[] = [];

    constructor(
        id: number,
        level: number,
        name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }

    protected _initStats(): void {
        this.maxPV = [10, 20, 30, 40, 50][this.level - 1];
        this.speed = [4, 5, 3, 4, 5][this.level - 1];
        this.str = [1, 2, 3, 4, 5][this.level - 1];
        this.def = [1, 2, 3, 4, 5][this.level - 1];
    }

    public startAbt(): void {
        this.abtInterval = setInterval(() => {
            this.abt += this.speed;

            if (this.abt >= 100 && !(this.status & CharacterStatuses.CantPerformAction)) {
                const potentialTargets = this.targets.filter(t => t.isAlive);
                const target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];

                if (!target) {
                    return;
                }

                const action = new AttackAction(this, target);

                action.execute();
            }
        }, 1000 / GameConfig.battleSpeed);
    }

    public get imgSrc(): string {
        return 'assets/Eye.gif';
    }
}
