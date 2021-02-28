import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { PlayerComponent } from './player/player.component';
import { VanComponent } from './van/van.component';
import { SlotComponent } from './slot/slot.component';
import { RollComponent } from './roll/roll.component';
import { HenchmenComponent } from './henchmen/henchmen.component';
import { BossComponent } from './boss/boss.component';
import { PartsComponent } from './parts/parts.component';
import { ContraptionComponent } from './contraption/contraption.component';

import { ClipboardService } from './clipboard.service';
import { RewardsService } from './reward.service';


@Pipe({name: 'numToLetter'})
export class NumberToLetterPipe implements PipeTransform {
    transform(value: number): string {
        switch(value) {
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            default: return 'six';
        }
    }
}





@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    PlayerComponent,
    VanComponent,
    SlotComponent,
    RollComponent,
    HenchmenComponent,
    BossComponent,
    PartsComponent,
    ContraptionComponent,
    NumberToLetterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
      ClipboardService,
      RewardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
