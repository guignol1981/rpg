import GameConfig from '../../game-config.json';
import { AttackAction } from '../actions/attack-action';
import { CureAction } from '../actions/cure-action.js';
import { DefendAction } from '../actions/defend-action.js';
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
        this.abtInterval = setInterval(async () => {
            this.abt += this.speed;

            if (this.abt >= 100) {
                // const random = Math.random();
                const random = 0.4;
                let potentialTargets: Character[];
                let target: Character;
                let action: CharacterAction;

                if (random > .6) {
                    potentialTargets = this.targets.filter(t => t.status !== CharacterStatuses.Dead);
                    target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                    action = new AttackAction(this, target);
                } else if (random > 0.3) {
                    potentialTargets = this.allies.filter(t => t.status !== CharacterStatuses.Dead);
                    target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                    action = new CureAction(this, target);
                } else {
                    action = new DefendAction(this);
                }

                await action.execute();
            }
        }, 1000 / GameConfig.battleSpeed);
    }

}
