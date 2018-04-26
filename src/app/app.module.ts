import { TileMapComponent } from './view/tileMap/tileMap.component';
import { CreatureComponent } from './view/creature/creature.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatureComponent,
    TileMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
