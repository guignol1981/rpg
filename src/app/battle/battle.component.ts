import { Component, OnInit } from '@angular/core';
import { CharacterActionTypes } from 'src/models/character-action';
import Eye from 'src/models/characters/eye';
import FighterNpc from 'src/models/characters/fighter-npc';
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
                    new FighterNpc(2, 1, 'FHT NPC 1'),
                    new WhiteMageNpc(3, 1, 'WHM NPC 2'),
                    new WhiteMageNpc(3, 1, 'WHM NPC 2')
                ],
                [
                    new Eye(7, 2, 'Npc 1'),
                    new Eye(8, 2, 'Npc 2')
                ]
            ]
        );
    }

    ngOnInit() {

    }
}
