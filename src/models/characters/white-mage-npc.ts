import GameConfig from '../../game-config.json';
import { AttackAction } from '../actions/attack-action';
import { CureAction } from '../actions/cure-action.js';
import Character from '../character';
import CharacterAction from '../character-action.js';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status.js';
import NPC from '../npc';

export default class WhiteMageNpc extends Character implements NPC {
    public allies: Character[] = [];
    public targets: Character[] = [];

    constructor(
        id: number,
        level: number,
        name: string
    ) {
        super(id, name, CharacterClasses.WhiteMage, level);
    }

    public startAbt(): void {
        this.abtInterval = setInterval(() => {
            this.abt += this.speed;

            if (this.abt >= 100) {
                const random = Math.random();
                let potentialTargets: Character[];
                let target: Character;
                let action: CharacterAction;

                if (random > .5) {
                    potentialTargets = this.targets.filter(t => t.status !== CharacterStatuses.Dead);
                    target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                    action = new AttackAction(this, target);
                    action.execute();
                } else {
                    potentialTargets = this.allies.filter(t => t.status !== CharacterStatuses.Dead);
                    target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                    action = new CureAction(this, target);
                    action.execute();
                }
            }

        }, 1000 / GameConfig.battleSpeed);
    }

}
