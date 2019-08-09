import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';

@Component({
    selector: 'app-character-creation',
    templateUrl: './character-creation.component.html',
    styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent implements OnInit {

    constructor(private characterService: CharacterService) { }

    ngOnInit() {
        this.characterService.create();
    }

}
