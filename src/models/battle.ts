import { CharacterStatuses } from 'src/models/character';
import { ImpletementNPC } from 'src/utils/interface-helper';
import Character from './character';
import { CharacterAbility } from './character-ability';
import CharacterAction, { CharacterActionTypes } from './character-action';
import { Item } from './item';
import NPC from './npc';

export enum BattleTeams {
    TeamA = 0,
    TeamB = 1
}

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
            this.subscribeToCharacterAction(c);

            if (ImpletementNPC(c)) {
                this.setNPCTeamsAndAllies(c as unknown as NPC);
            }

            c.startAbt();
        });
    }

    startTimer(): void {
        setInterval(() => this.time++, 1000 / Battle.speed);
    }

    setNPCTeamsAndAllies(npc: NPC): void {
        npc.targets = this.teams[BattleTeams.TeamA];
        npc.allies = this.teams[BattleTeams.TeamB];
    }

    subscribeToCharacterAction(character: Character): void {
        character.executeActionObservable.subscribe(action => {
            this.doAction(action);
            action.source.resetAbt();
        });
    }

    doAction(action: CharacterAction): void {
        switch (action.type) {
            case CharacterActionTypes.Attack:
                this.doAttack(action);
                break;
            case CharacterActionTypes.Item:
                this.doUseItem(action);
                break;
            case CharacterActionTypes.Ability:
                this.doAbility(action);
                break;
            case CharacterActionTypes.None:
                action.source.resetAbt();
                break;
        }
    }

    doAttack(action: CharacterAction): void {
        const source = action.source;
        const target = action.target || this.getRandomTeamCharacter(BattleTeams.TeamB);

        if (target.status === CharacterStatuses.Defending) {
            target.PV -= source.str / 2;
        } else {
            target.PV -= source.str;
        }

        console.log(`${source.name} attacked ${target.name} for 1 dmg`);

        source.attack(target);
    }

    doDefend(action: CharacterAction): void {
        action.source.defend();
    }

    doUseItem(action: CharacterAction): void {
        const item: Item = (action.value as Item);

        if (!action.target) {
            if (this.getCharacterBattleTeam(action.source) === BattleTeams.TeamA) {
                item.use(action.source);
            } else {
                item.use(action.target);
            }
        }

        console.log(`${action.source.name} used ${item.name}`);
    }

    doAbility(action: CharacterAction): void {
        const ability: CharacterAbility = (action.value as CharacterAbility);

        if (!action.target) {
            ability.execute(this.getRandomTeamCharacter(BattleTeams.TeamA));
        } else {
            ability.execute(action.target);
        }

        console.log(`${action.source.name} used ${ability.name}`);
    }

    getCharacterBattleTeam(character: Character): BattleTeams {
        return this.teams[BattleTeams.TeamA].find(c => c.id === character.id) ? BattleTeams.TeamA : BattleTeams.TeamB;
    }

    getRandomTeamCharacter(team: BattleTeams): Character {
        return this.teams[team][Math.floor(Math.random() * this.teams[team].length)];
    }
}
