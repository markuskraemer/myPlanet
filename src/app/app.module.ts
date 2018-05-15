import { CreatureInfoComponent } from './view/creatureInfo/creature-info.component';
import { TestComponent } from './view/test/test.component';
import { NeuralNetworkComponent } from './view/neuralNetwork/neuralNetwork.component';
import { TickService } from './tick.service';
import { MainService } from './main.service';
import { ModalComponent } from './ui/modal/modal.component';
import { StorageService } from './storage/storage.service';
import { DialogsComponent } from './ui/dialogs/dialogs.component';
import { CommandBarComponent } from './ui/command-bar/command-bar.component';
import { DialogService } from './ui/dialog.service';
import { StorageListComponent } from './ui/storageList/storageList.component';
import { StoredItemComponent } from './ui/storedItem/storedItem.component';
import { FormatterService } from './utils/Formatter.service';
import { TileMapComponent } from './view/tileMap/tileMap.component';
import { CreatureComponent } from './view/creature/creature.component';
import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreatureComponent,
    TileMapComponent,
    StoredItemComponent,
    StorageListComponent,
    CommandBarComponent,
    DialogsComponent,
    ModalComponent,
    NeuralNetworkComponent,
    TestComponent,
    CreatureInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
      MainService,
      FormatterService,
      DialogService,
      StorageService,
      TickService
  ],
  bootstrap: [
      AppComponent
      ]
})
export class AppModule { }
