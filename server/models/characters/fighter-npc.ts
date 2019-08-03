import GameConfig from '../../game-config.json';
import { AttackAction } from '../actions/attack-action';
import Character from '../character';
import CharacterAction from '../character-action.js';
import { CharacterClasses } from '../character-classe';
import { CharacterStatuses } from '../character-status.js';
import NPC from '../npc';

export default class FighterNpc extends Character implements NPC {
    public allies: Character[] = [];
    public targets: Character[] = [];

    constructor(
        id: number,
        level: number,
        name: string
    ) {
        super(id, name, CharacterClasses.Fighter, level);
    }

    public startAbt(): void {
        this.abtInterval = setInterval(async () => {
            this.abt += this.speed;

            if (this.abt >= 100 && !(this.status & CharacterStatuses.CantPerformAction)) {
                let potentialTargets: Character[];
                let target: Character;
                let action: CharacterAction;

                potentialTargets = this.targets.filter(t => t.status !== CharacterStatuses.Dead);
                target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];

                if (!target) {
                    return;
                }

                action = new AttackAction(this, target);
                action.execute();
            }
        }, 1000 / GameConfig.battleSpeed);
    }

    public get imgSrc(): string {
        if (this.status === CharacterStatuses.Dead) {
            return 'assets/Fighter-Dead.gif';
        } else if (this.status === CharacterStatuses.Victorious) {
            return 'assets/Fighter-Victory.gif';
        } else if (this.isWounded) {
            return 'assets/Fighter-Wounded.gif';
        } else if (this.status === CharacterStatuses.Defending) {
            return 'assets/Fighter.gif';
        } else {
            return 'assets/Fighter-Walk.gif';
        }
    }
}
