import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './battle/battle.component';
import { CharacterViewComponent } from './character-view/character-view.component';
import { CharacterControllerComponent } from './character-controller/character-controller.component';
import { BattleLobbyComponent } from './battle-lobby/battle-lobby.component';

@NgModule({
    declarations: [
        AppComponent,
        CharacterViewComponent,
        BattleComponent,
        CharacterControllerComponent,
        BattleLobbyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
