import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleLobbyComponent } from './battle-lobby/battle-lobby.component';
import { BattleComponent } from './battle/battle.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
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
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
