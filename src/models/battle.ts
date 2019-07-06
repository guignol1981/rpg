import { CharacterStatuses } from 'src/models/character';
import { ImpletementNPC } from 'src/utils/interface-helper';
import Character from './character';
import { CharacterActionTypes } from './character-action';
import NPC from './npc';

export default class Battle {
    public static speed = 3;
    public time = 0;
    public logs: string[] = [];

    constructor(
        public teams: Character[][]
    ) {
        this.teams.forEach(t => this.initTeam(t));

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
                    this.doAttack(action.source, action.target || this.teams[1][Math.floor(Math.random() * this.teams[1].length)]);
                }

                action.source.resetAbt();
            });

            if (ImpletementNPC(c)) {
                (c as unknown as NPC).targets = this.teams[0];
                (c as unknown as NPC).allies = this.teams[1];
            }

            c.startAbt();
        });
    }

    startTimer(): void {
        setInterval(() => this.time++, 1000 / Battle.speed);
    }

    doAttack(source: Character, target: Character): void {
        if (target.status === CharacterStatuses.Defending) {
            target.PV -= 1;
        } else {
            target.PV -= 2;
        }

        if (target.PV <= 0) {
            target.status = CharacterStatuses.Dead;
        }

        this.logs.push(`${source.name} attacked ${target.name} for 1 dmg`);

        source.attack(target);
    }

    doDefend(source: Character): void {
        source.defend();
    }
}
