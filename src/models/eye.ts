import Character, { CharacterClasses } from './character';
import { CharacterActionTypes } from './charcter-action';
import NPC from './npc';

export default class Eye extends Character implements NPC {
    public targets: Character[] = [];
    public allies: Character[] = [];

    constructor(
        public id: number,
        public name: string
    ) {
        super(id, name, CharacterClasses.Fighter);
    }

    public startAbt(): void {
        setInterval(() => {
            this.abt += this.speed;

            if (this.abt >= 100) {
                this.executeActionObservable.next({
                    type: CharacterActionTypes.Attack,
                    source: this,
                    target: this.targets[0]
                });
            }
        }, 1000);
    }
}
