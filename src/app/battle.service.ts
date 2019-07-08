import { Injectable } from '@angular/core';
import Character from 'src/models/character';
import NPC from 'src/models/npc.js';
import { ImpletementNPC } from 'src/utils/interface-helper';
import GameConfig from '../game-config.json';

export enum BattleTeams {
    TeamA = 0,
    TeamB = 1
}

@Injectable({
    providedIn: 'root'
})
export class BattleService {
    public time = 0;
    public logs: string[] = [];
    public teams: Character[][];

    constructor() { }

    initTeam(teams: Character[][]): void {
        this.teams = teams;

        this.teams
            .forEach(t =>
                t.forEach(c => {
                    if (ImpletementNPC(c)) {
                        this.setNPCTeamsAndAllies(c as unknown as NPC);
                    }
                    c.startAbt();
                }));

        this.startTimer();
    }

    startTimer(): void {
        setInterval(() => this.time++, 1000 / GameConfig.battleSpeed);
    }

    setNPCTeamsAndAllies(npc: NPC): void {
        if (this.getCharacterBattleTeam(npc as unknown as Character) === BattleTeams.TeamA) {
            npc.allies = this.teams[BattleTeams.TeamA];
            npc.targets = this.teams[BattleTeams.TeamB];
        } else {
            npc.targets = this.teams[BattleTeams.TeamA];
            npc.allies = this.teams[BattleTeams.TeamB];
        }
    }

    getCharacterBattleTeam(character: Character): BattleTeams {
        return this.teams[BattleTeams.TeamA].find(c => c.id === character.id) ? BattleTeams.TeamA : BattleTeams.TeamB;
    }

    getRandomTeamCharacter(team: BattleTeams): Character {
        return this.teams[team][Math.floor(Math.random() * this.teams[team].length)];
    }
}
