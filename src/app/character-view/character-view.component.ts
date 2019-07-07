import { Component, Input, OnInit } from '@angular/core';
import Character from 'src/models/character';
import { CharacterClasses } from 'src/models/character-classe';
import { CharacterStatuses } from 'src/models/character-status';
import { ImpletementNPC } from 'src/utils/interface-helper';

@Component({
    selector: 'app-character-view',
    templateUrl: './character-view.component.html',
    styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
    @Input()
    public character: Character;

    ngOnInit() {

    }

    getCharacterPvProgress(source: Character): number {
        return (source.PV / source.maxPV) * 100;
    }

    get characterImgSrc(): string {
        switch (this.character.classe) {
            case CharacterClasses.Fighter:
                if (ImpletementNPC(this.character)) {
                    return 'assets/Eye.gif';
                } else if (this.character.status === CharacterStatuses.Dead) {
                    return 'assets/Fighter-Dead.gif';
                } else {
                    return 'assets/Fighter.gif';
                }
            case CharacterClasses.WhiteMage:
                if (this.character.status === CharacterStatuses.Dead) {
                    return 'assets/WhiteMage-Dead.gif';
                } else {
                    return 'assets/WhiteMage.gif';
                }
        }
    }
}
