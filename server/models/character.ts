import { Subject } from 'rxjs';
import GameConfig from '../game-config.json';
import CharacterAction, { CharacterActionTypes } from './character-action';
import { CharacterClasses } from './character-classe';
import { CharacterStats } from './character-stats';
import { CharacterStatuses } from './character-status';

export default abstract class Character {
    public status: CharacterStatuses = CharacterStatuses.Idle;
    public abt = 0;
    public nextAction: CharacterAction;
    protected pPV: number;
    public speed: number;
    public maxPV: number;
    public str: number;
    public def: number;
    public actionsTypes: CharacterActionTypes[];
    public deathObservable: Subject<Character> = new Subject<Character>();
    protected abtInterval: any;

    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly classe: CharacterClasses,
        public pLevel: number
    ) {
        this._initStats();

        this.pPV = this.maxPV;
        this.abt = 0;

        this.resetAbt();
    }

    public get isAlive(): boolean {
        return this.status !== CharacterStatuses.Dead;
    }

    public get isWounded(): boolean {
        return (this.pPV / this.maxPV) < 0.3;
    }

    public get PV(): number {
        return this.pPV;
    }

    public set PV(value: number) {
        this.pPV = value;
        if (this.pPV <= 0) {
            this.pPV = 0;
            this.die();
        }
    }

    public abstract get imgSrc(): string;

    public get level(): number {
        return this.pLevel;
    }

    public startAbt(): void {
        this.abtInterval = setInterval(() => {
            this.abt += this.speed;

            if (this.abt >= 100) {
                this.abt = 100;

                if (this.nextAction) {
                    this.nextAction.execute();
                }
            }

        }, 1000 / GameConfig.battleSpeed);
    }

    public resetAbt(): void {
        this.abt = 0;
        this.status = CharacterStatuses.Idle;
    }

    public die(): void {
        clearInterval(this.abtInterval);

        this.status = CharacterStatuses.Dead;
        this.deathObservable.next(this);
    }

    public win(): void {
        clearInterval(this.abtInterval);

        this.status = CharacterStatuses.Victorious;
    }

    protected _initStats(): void {
        const stats = new CharacterStats(this);
        this.maxPV = stats.maxPV;
        this.speed = stats.speed;
        this.str = stats.str;
        this.def = stats.def;
        this.actionsTypes = stats.actionTypes;
    }
}
