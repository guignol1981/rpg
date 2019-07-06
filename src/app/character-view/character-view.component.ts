import { Component, Input, OnInit } from '@angular/core';
import Character, { CharacterClasses, CharacterStatuses } from 'src/models/character';
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
