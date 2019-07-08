import { Component, OnInit } from '@angular/core';
import { CharacterActionTypes } from 'src/models/character-action';
import Eye from 'src/models/characters/eye';
import WhiteMage from 'src/models/characters/white-mage';
import WhiteMageNpc from 'src/models/characters/white-mage-npc';
import { BattleService, BattleTeams } from '../battle.service';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
    public battleTeams = BattleTeams;
    public characterActionTypes = CharacterActionTypes;

    constructor(public battleService: BattleService) {
        battleService.initTeam(
            [
                [
                    new WhiteMage(1, 4, 'WHM 1'),
                    new WhiteMageNpc(2, 4, 'WHM NPC 1'),
                    new WhiteMageNpc(3, 4, 'WHM NPC 2'),
                ],
                [
                    new Eye(5, 4, 'Npc 1'),
                    new Eye(6, 4, 'Npc 2')
                ]
            ]
        );
    }

    ngOnInit() {

    }
}
