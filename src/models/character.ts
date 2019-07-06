import { Subject } from 'rxjs';
import Battle from './battle';
import CharacterAction, { CharacterActionTypes } from './character-action';

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
    public status: CharacterStatuses = CharacterStatuses.Waiting;

    public abt: 0;
    public executeActionObservable: Subject<CharacterAction> = new Subject();
    public nextAction: CharacterAction;

    public speed: number;
    public maxPV: number;
    protected _PV: number;

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly classe: CharacterClasses,
        public level: number
    ) {
        this.initStats();

        this._PV = this.maxPV;
        this.abt = 0;

        this.resetAbt();
    }

    public get PV(): number {
        return this._PV;
    }

    public set PV(value: number) {
        this._PV = value;
        if (this._PV <= 0) {
            this._PV = 0;
            this.die();
        }
    }

    abstract initStats(): void;

    public startAbt(): void {
        const abtInterval: NodeJS.Timer = setInterval(() => {
            if (this.status === CharacterStatuses.Dead) {
                clearInterval(abtInterval);
            }

            this.abt += this.speed;

            if (this.abt >= 100) {
                this.executeActionObservable.next(this.nextAction);
            }
        }, 1000 / Battle.speed);
    }

    public resetAbt(): void {
        this.abt = 0;
        this.nextAction = { type: CharacterActionTypes.Attack, source: this };
    }

    public attack(target: Character): void { }

    public defend(): void {
        this.status = CharacterStatuses.Defending;
    }

    public die(): void {
        this.status = CharacterStatuses.Dead;
    }
}
