import { DefaultCreatureStorageService } from './storage/default-creature-storage.service';
import { DefaultWorldStorageService } from './storage/default-world-storage.service';
import { WorldViewportComponent } from './view/world-viewport/world-viewport.component';
import { StoredWorldsComponent } from './ui/stored-worlds/stored-worlds.component';
import { DialogsService } from './ui/dialogs.service';
import { StoredCreaturesComponent } from './ui/stored-creatures/stored-creatures.component';

import { CreatureHistoryComponent } from './ui/creature-history/creature-history.component';
import { CreaturePreviewComponent } from './view/creature-preview/creature-preview.component';
import { CreatureStorageService } from './storage/creature-storage.service';
import { InputWidgetComponent } from './ui/input-widget/input-widget.component';
import { CreaturesCanvasComponent } from './view/creatures-canvas/creatures-canvas.component';
import { TileMapCanvasComponent } from './view/tileMap-canvas/tileMap-canvas.component';
import { WorldInfoComponent } from './view/world-info/world-info.component';
import { CreatureInfoComponent } from './view/creatureInfo/creature-info.component';
import { NeuralNetworkComponent } from './view/neuralNetwork/neuralNetwork.component';
import { TickService } from './tick.service';
import { MainService } from './main.service';
import { WorldStorageService } from './storage/world-storage.service';
import { FormatterService } from './utils/Formatter.service';
import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDividerModule, 
    MatButtonToggleModule, 
    MatListModule,
    MatSliderModule,
    MatSelectModule,
    MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TileMapCanvasComponent,
    NeuralNetworkComponent,
    CreatureInfoComponent,
    WorldInfoComponent,
    CreaturesCanvasComponent,
    InputWidgetComponent,
    CreaturePreviewComponent,
    CreatureHistoryComponent,
    StoredCreaturesComponent,
    StoredWorldsComponent,
    WorldViewportComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSliderModule ,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
      MainService,
      FormatterService,
      WorldStorageService,
      CreatureStorageService,
      DefaultWorldStorageService,
      DefaultCreatureStorageService,
      TickService,
      DialogsService 
  ],
  bootstrap: [
      AppComponent
  ],
  entryComponents:[
      StoredCreaturesComponent,
      StoredWorldsComponent
  ]
})
export class AppModule { }
