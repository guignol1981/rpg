import { Component, OnInit } from '@angular/core';
import Battle from 'src/models/battle';
import Character, { CharacterClasses, CharacterStatuses } from 'src/models/character';
import { CharacterActionTypes } from 'src/models/charcter-action';
import Eye from 'src/models/eye';
import WhiteMage from 'src/models/white-mage';
import { ImpletementNPC } from 'src/utils/interface-helper';

@Component({
    selector: 'app-character-view',
    templateUrl: './character-view.component.html',
    styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
    public battle: Battle = new Battle(
        [
            new WhiteMage(1, 'Dummy 1'),
        ],
        [
            new Eye(2, 'Npc 1'),
            new Eye(2, 'Npc 2')
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

    getCharacterPvProgress(source: Character): number {
        return (source.pv / source.maxPv) * 100;
    }

    getCharacterImgSrc(source: Character): string {
        switch (source.classe) {
            case CharacterClasses.Fighter:
                if (ImpletementNPC(source)) {
                    return 'assets/Eye.gif';
                } else if (source.status === CharacterStatuses.Dead) {
                    return 'assets/Fighter-Dead.gif';
                } else {
                    return 'assets/Fighter.gif';
                }
            case CharacterClasses.WhiteMage:
                if (source.status === CharacterStatuses.Dead) {
                    return 'assets/WhiteMage-Dead.gif';
                } else {
                    return 'assets/WhiteMage.gif';
                }
        }
    }
}
