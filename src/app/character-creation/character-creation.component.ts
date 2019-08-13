import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterClasses } from 'server/models/character-classe';
import { CharacterService } from '../character.service';

@Component({
    selector: 'app-character-creation',
    templateUrl: './character-creation.component.html',
    styleUrls: ['./character-creation.component.scss']
})
export class CharacterCreationComponent implements OnInit {
    public formGroup: FormGroup;
    public characterClasses = CharacterClasses;

    constructor(
        private characterService: CharacterService,
        private router: Router
    ) { }

    ngOnInit() {
        this.characterService.characterCheck().then((asCharacter) => {
            if (asCharacter) {
                this.router.navigateByUrl('destination');
            } else {
                this.formGroup = new FormGroup({
                    name: new FormControl('', [Validators.required, Validators.minLength(3)])
                });
            }
        });

    }

    create(): void {
        if (!this.formGroup.valid) {
            return;
        }

        this.characterService.create(this.formGroup.value).then((success) => {
            if (success) {
                this.router.navigateByUrl('destination');
            } else {

            }
        });
    }
}
