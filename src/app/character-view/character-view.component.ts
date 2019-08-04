import { Component, Input, OnInit } from '@angular/core';
import Character from 'server/models/character';

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
        return this.character.imgSrc;
    }
}
