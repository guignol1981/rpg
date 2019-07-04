import { CharacterStatuses } from 'src/models/character';
import Character from './character';
import { CharacterActionTypes } from './charcter-action';
import NPC from './npc';
import { ImpletementNPC } from 'src/utils/interface-helper';

export default class Battle {
    public time = 0;
    public battleLog: string[] = [];

    constructor(
        public teamA: Character[],
        public teamB: Character[]
        ) {
        this.initTeam(teamA);
        this.initTeam(teamB);

        this.startTimer();
    }

    initTeam(team: Character[]): void {
        team.forEach(c => {
            c.executeActionObservable.subscribe(action => {
                if (action.type === CharacterActionTypes.None) {
                    action.source.resetAbt();
                    return;
                }

                if (action.type === CharacterActionTypes.Attack) {
                    this.doAttack(action.source, action.target);
                }

                action.source.resetAbt();
            });

            if (ImpletementNPC(c)) {
                (c as unknown as NPC).targets = this.teamA;
                (c as unknown as NPC).allies = this.teamB;
            }

            c.startAbt();
        });
    }

    startTimer(): void {
        setInterval(() => this.time++, 1000);
    }

    doAttack(source: Character, target: Character): void {
        if (target.status === CharacterStatuses.Defending) {
            target.pv -= 1;
        } else {
            target.pv -= 2;
        }

        if (target.pv <= 0) {
            target.status = CharacterStatuses.Dead;
        }
        
        this.battleLog.push(`${source.name} attacked ${target.name} for 1 dmg`);

        source.attack(target);
    }

    doDefend(source: Character): void {
        source.defend();
    }
}
