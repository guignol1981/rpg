import Character from './character';
import { CharacterActionTypes } from './charcter-action';
import Enemy from './enemy';

export default class Battle {
    public time = 0;

    constructor(public characters: Character[]) {
        this.characters.forEach(c => {
            c.executeActionObservable.subscribe(action => {
                if (action.type === CharacterActionTypes.None) {
                    action.source.resetAbt();
                    return;
                }

                if (action.type === CharacterActionTypes.Attack) {
                    this.doAttack(action.source, action.target);
                }

                action.source.resetAbt();
            });

            if ('targets' in c) {
                (c as Enemy).targets = this.characters.filter(character => characters !== c);
            }

            c.startAbt();
        });

        this.startTimer();
    }

    doAttack(source: Character, target: Character): void {
        source.attack(target);
    }

    doDefend(source: Character): void {
        source.defend();
    }

    startTimer(): void {
        setInterval(() => this.time++, 1000);
    }
}
