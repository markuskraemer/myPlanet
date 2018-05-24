import { CreatureStorageService } from './storage/creature-storage.service';
import { CreaturesStorageListComponent } from './ui/creatures-storage-list/creatures-storage-list.component';
import { InputWidgetComponent } from './ui/input-widget/input-widget.component';
import { CreaturesCanvasComponent } from './view/creatures-canvas/creatures-canvas.component';
import { TileMapCanvasComponent } from './view/tileMap-canvas/tileMap-canvas.component';
import { WorldInfoComponent } from './view/world-info/world-info.component';
import { CreatureInfoComponent } from './view/creatureInfo/creature-info.component';
import { NeuralNetworkComponent } from './view/neuralNetwork/neuralNetwork.component';
import { TickService } from './tick.service';
import { MainService } from './main.service';
import { ModalComponent } from './ui/modal/modal.component';
import { WorldStorageService } from './storage/world-storage.service';
import { DialogsComponent } from './ui/dialogs/dialogs.component';
import { CommandBarComponent } from './ui/command-bar/command-bar.component';
import { DialogService } from './ui/dialog.service';
import { StorageListComponent } from './ui/storageList/storageList.component';
import { StoredItemComponent } from './ui/storedItem/storedItem.component';
import { FormatterService } from './utils/Formatter.service';
import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TileMapCanvasComponent,
    StoredItemComponent,
    StorageListComponent,
    CreaturesStorageListComponent,
    CommandBarComponent,
    DialogsComponent,
    ModalComponent,
    NeuralNetworkComponent,
    CreatureInfoComponent,
    WorldInfoComponent,
    CreaturesCanvasComponent,
    InputWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
      MainService,
      FormatterService,
      DialogService,
      WorldStorageService,
      CreatureStorageService,
      TickService
  ],
  bootstrap: [
      AppComponent
      ]
})
export class AppModule { }
