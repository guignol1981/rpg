import { Subject } from 'rxjs';
import CharacterAction, { CharacterActionTypes } from './charcter-action';

export enum CharacterClasses {
    Fighter = 'fighter',
    WhiteMage = 'white-mage'
}

export enum CharacterStatuses {
    Waiting = 'waiting',
    Casting = 'casting',
    Defending = 'defending',
    Dead = 'dead'
}

export default abstract class Character {
    public pv: number;
    public status: CharacterStatuses = CharacterStatuses.Waiting;
    public abt: 0;
    public executeActionObservable: Subject<CharacterAction> = new Subject();
    public speed: number;
    public nextAction: CharacterAction;

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly classe: CharacterClasses,
        public maxPv: number
    ) {
        this.pv = this.maxPv;
        this.abt = 0;

        this.resetAbt();
    }

    public startAbt(): void {
        setInterval(() => {
            this.abt += this.speed;

            if (this.abt >= 100) {
                this.executeActionObservable.next(this.nextAction);
            }
        }, 1000);
    }

    public resetAbt(): void {
        this.abt = 0;
        this.nextAction = { type: CharacterActionTypes.None, source: this };
    }

    public attack(target: Character): void { }

    public defend(): void {
        this.status = CharacterStatuses.Defending;
    }

    public die(): void {
        this.status = CharacterStatuses.Dead;
    }
}
