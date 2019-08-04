import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleLobbyComponent } from './battle-lobby/battle-lobby.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
    {
        path: 'battle',
        component: BattleComponent
    },
    {
        path: 'battle-lobby',
        component: BattleLobbyComponent
    },
    {
        path: '',
        redirectTo: '/battle-lobby',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
