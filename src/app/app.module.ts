import { StorageService } from './storage/storage.service';
import { DialogsComponent } from './ui/dialogs/dialogs.component';
import { CommandBarComponent } from './ui/command-bar/command-bar.component';
import { DialogService } from './ui/dialog.service';
import { StorageListComponent } from './ui/storageList/storageList.component';
import { StoredItemComponent } from './ui/storedItem/storedItem.component';
import { FormatterService } from './utils/Formatter.service';
import { TileMapComponent } from './view/tileMap/tileMap.component';
import { CreatureComponent } from './view/creature/creature.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatureComponent,
    TileMapComponent,
    StoredItemComponent,
    StorageListComponent,
    CommandBarComponent,
    DialogsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      FormatterService,
      DialogService,
      StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
