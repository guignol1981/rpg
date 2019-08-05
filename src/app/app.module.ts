import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleLobbyComponent } from './battle-lobby/battle-lobby.component';
import { BattleComponent } from './battle/battle.component';
import { CharacterControllerComponent } from './character-controller/character-controller.component';
import { CharacterViewComponent } from './character-view/character-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        CharacterViewComponent,
        BattleComponent,
        CharacterControllerComponent,
        BattleLobbyComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
