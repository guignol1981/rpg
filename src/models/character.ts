import { Subject } from 'rxjs';
import CharacterAction, { CharacterActionTypes } from './character-action';
import { CharacterClasses } from './character-classe';
import { CharacterStats } from './character-stats';
import { CharacterStatuses } from './character-status';
import GameConfig from './game-config.json';

export default abstract class Character {
    public DEV_ACTIONS: CharacterAction[] = [
        { type: CharacterActionTypes.Attack, source: this },
        // { type: CharacterActionTypes.Item, source: this, value: new Potion() },
        // { type: CharacterActionTypes.Ability, source: this, value: new Cure(this) },
    ];

    public status: CharacterStatuses = CharacterStatuses.Idle;

    public abt: 0;
    public executeActionObservable: Subject<CharacterAction> = new Subject();
    public nextAction: CharacterAction;

    public speed: number;
    public maxPV: number;
    public str: number;
    public def: number;
    protected _PV: number;

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly classe: CharacterClasses,
        public level: number
    ) {
        this._initStats();

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

    public startAbt(): void {
        const abtInterval: any = setInterval(() => {
            if (this.status === CharacterStatuses.Dead) {
                clearInterval(abtInterval);
            }

            this.abt += this.speed;

            if (this.abt >= 100) {
                this.executeActionObservable.next(this.nextAction);
            }
        }, 1000 / GameConfig.battleSpeed);
    }

    public resetAbt(): void {
        this.abt = 0;
        this.nextAction = this.DEV_ACTIONS[Math.floor(Math.random() * this.DEV_ACTIONS.length)];
    }

    public attack(target: Character): void { }

    public defend(): void {
        this.status = CharacterStatuses.Defending;
    }

    public die(): void {
        this.status = CharacterStatuses.Dead;
    }

    private _initStats(): void {
        const stats = new CharacterStats(this.classe, this.level);
        this.maxPV = stats.maxPV;
        this.speed = stats.speed;
        this.str = stats.str;
        this.def = stats.def;
    }
}
