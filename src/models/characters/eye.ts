import GameConfig from '../../game-config.json';
import { AttackAction } from '../actions/attack-action.js';
import Character from '../character';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status';
import NPC from '../npc';

export default class Eye extends Character implements NPC {
    public targets: Character[] = [];
    public allies: Character[] = [];
    public speed = 12;

    constructor(
        id: number,
        level: number,
        name: string
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
                const potentialTargets = this.targets.filter(t => t.status !== CharacterStatuses.Dead);
                const target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                const action = new AttackAction(this, target);

                action.execute();
            }

        }, 1000 / GameConfig.battleSpeed);
    }
}
