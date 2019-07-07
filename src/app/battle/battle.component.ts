import { Component, OnInit } from '@angular/core';
import Battle, { BattleTeams } from 'src/models/battle';
import Character from 'src/models/character';
import { CharacterActionTypes } from 'src/models/character-action';
import Eye from 'src/models/eye';
import Fighter from 'src/models/fighter';
import WhiteMage from 'src/models/white-mage';

@Component({
    selector: 'app-battle',
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
    public battleTeams = BattleTeams;

    public battle: Battle = new Battle(
        [
            [
                new WhiteMage(1, 4, 'Hero 1'),
                new Fighter(1, 2, 'Hero 2')
            ],
            [
                new Eye(2, 1, 'Npc 1'),
                new Eye(2, 2, 'Npc 2')
            ]
        ]
    );
    public characterActionTypes = CharacterActionTypes;

    constructor() {
    }

    ngOnInit() {

    }

    setNextAction(type: CharacterActionTypes, source: Character, target: Character): void {
        source.nextAction = {
            source,
            target,
            type
        };
    }
}
