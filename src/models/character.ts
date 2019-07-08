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
        this.status = CharacterStatuses.Dead;
        clearInterval(this.abtInterval);
    }

    protected _initStats(): void {
        const stats = new CharacterStats(this.classe, this.pLevel);
        this.maxPV = stats.maxPV;
        this.speed = stats.speed;
        this.str = stats.str;
        this.def = stats.def;
        this.actionsTypes = stats.actionTypes;
    }
}
