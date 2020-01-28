import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatSelectModule, MatTabsModule, MatSnackBarModule,
    MatCardModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatInputModule, MatDialogModule,
    MatChipsModule
} from '@angular/material';

import { ModalService } from'./modal.service'
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';

import { FirestoreService } from './firestore.service';
import { AuthGuard } from './auth.guard';
import { CharListComponent } from './charlist/charlist.component';
import { CharacterComponent } from './character/character.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { AbilityChooserComponent } from './abilities/chooser/chooser.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item.component';
import { MimComponent } from './mim/mim.component';
import {
    ValueDisplayComponent,
    XPValueDisplayComponent,
    SidebagValueDisplayComponent
} from './shared/value-display/value-display.component';
import { KeypadComponent } from './shared/keypad/keypad.component';

import { AttacksComponent } from './attacks/attacks.component';
import { AttackComponent } from './attacks/attack/attack.component';
import { SidebagComponent } from './sidebag/sidebag.component';
import { PreacherSermonsComponent } from './special/preacher-sermons/sermons.component';
import { PreacherSermonComponent } from './special/preacher-sermons/sermon/sermon.component';
import { SermonsChooserComponent } from './special/preacher-sermons/chooser/chooser.component';
import { ItemEditorComponent } from './items/editor/editor.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ShamanSpellComponent,
         ShamanSpellsComponent } from './special/shaman-spells/shaman-spells.component';
import { ShamanSpellsChooserComponent } from './special/shaman-spells/chooser/chooser.component';
import { GamblerTricksComponent } from './special/gambler-tricks/gambler-tricks.component';
import { GamblerTricksChooserComponent } from './special/gambler-tricks/chooser/chooser.component';
import { SamuraiTacticsComponent } from './special/samurai-tactics/samurai-tactics.component';
import { SamuraiTacticsChooserComponent } from './special/samurai-tactics/chooser/chooser.component';
import { OrphanMissionsComponent } from './special/orphan-missions/orphan-missions.component';
import { OrphanMissionsChooserComponent } from './special/orphan-missions/chooser/chooser.component';
import { ElementalMagikSpellComponent } from './special/sorcerer-magik/spell/spell.component';
import { ElementalMagikComponent } from './special/sorcerer-magik/magik.component';
import { ElementalMagikChooserComponent } from './special/sorcerer-magik/chooser/chooser.component'

import { NotesComponent } from './special/notes/notes.component';
import { ChooserComponent } from './shared/chooser/chooser.component';
import { TempComponent } from './shared/temp/temp.component';
import { FactionComponent } from './faction/faction.component';
import { FactionChooserComponent } from './faction/chooser/chooser.component';


@Pipe({
    name: 'modifier'
})
@Injectable()
export class ModifierPipe implements PipeTransform {
    transform(value: any) : string {
        if(value === null || value === undefined ||
            isNaN(value) || value === 0) return '';
        if(value*1 > 0) return '+' + value;
        return value;
    }
}


@Pipe({
    name: 'mimGroupFilter'
})
@Injectable()
export class MimGroupFilterPipe implements PipeTransform {
    transform(items: any[], group: string): any {
        return items.filter(item => item.group.toLowerCase() == group.toLowerCase());
    }
}

@Pipe({
    name: 'sum'
})
@Injectable()
export class SumFilterPipe implements PipeTransform {
    transform(values: number[], min?:number): any {
        let result = 0, minimum = 0;
        if(!isNaN(min)) minimum = min*1;
        values.forEach( v => {
            if( !isNaN(v) && (v*1) >= minimum)
                result+=(v*1)
        });
        return result;
    }
}

/**
 *
 */
@Pipe({name: 'join'})
export class JoinPipe implements PipeTransform {
    /**
     *
     * @param value
     * @returns {string}
     */
    transform(value: [any]): string {
        if(!value || !value.length) return '';
        return value.join(', ');
    }
}


/**
 *
 */
@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
    /**
     *
     * @param value
     * @returns {string}
     */
    transform(value: [any], property: string, dir: string = 'desc'): any[] {
        if(!value || !value.length) return [];
        return value.sort( (a,b) => {
            if('desc' === dir) return a[property] > b[property] ? -1 : 1;
            else return a[property] < b[property] ? -1 : 1;
        });
    }
}




//ROUTING CONFIG
const appRoutes: Routes = [

    { path: 'login',        component: LoginComponent },
    { path: 'chars',        component: CharListComponent,   canActivate: [AuthGuard] },
    { path: 'chars/:id',    component: CharacterComponent,  canActivate: [AuthGuard] },
    { path: 'import',       component: UploadComponent },
    { path: '',             redirectTo: '/chars', pathMatch: 'full' },
    { path: '**',           redirectTo: '/chars' }

];




@NgModule({
  declarations: [
    AppComponent,
    CharListComponent,
    CharacterComponent,
    LoginComponent,
    UploadComponent,
    AbilitiesComponent,
    AbilityChooserComponent,
    ItemsComponent,
    ItemComponent,
    MimComponent,
    ModifierPipe,
    MimGroupFilterPipe,
    SumFilterPipe,
    JoinPipe,
    OrderByPipe,
    ValueDisplayComponent,
    XPValueDisplayComponent,
    SidebagValueDisplayComponent,
    AttacksComponent,
    AttackComponent,
    KeypadComponent,
    SidebagComponent,
    PreacherSermonsComponent,
    PreacherSermonComponent,
    SermonsChooserComponent,
    ItemEditorComponent,
    AvatarComponent,
    ShamanSpellsComponent,
    ShamanSpellComponent,
    ShamanSpellsChooserComponent,
    GamblerTricksComponent,
    GamblerTricksChooserComponent,
    SamuraiTacticsComponent,
    SamuraiTacticsChooserComponent,
    OrphanMissionsComponent,
    OrphanMissionsChooserComponent,
    NotesComponent,
    ChooserComponent,
    OrphanMissionsComponent,
    ElementalMagikSpellComponent,
    ElementalMagikComponent,
    ElementalMagikChooserComponent,
    TempComponent,
    FactionComponent,
    FactionChooserComponent
  ],
  imports: [
      //                               for debugging purposes only
      RouterModule.forRoot( appRoutes, { enableTracing: false } ),
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      MatSelectModule, MatTabsModule, MatSnackBarModule, MatCardModule, MatToolbarModule,
      MatButtonModule, MatIconModule, MatInputModule, MatDialogModule, MatChipsModule
  ],
  providers: [
      ModalService,
      FirestoreService,
      AuthGuard
  ],
  entryComponents: [
      KeypadComponent,
      ItemEditorComponent,
      ChooserComponent,
      AbilityChooserComponent,
      SermonsChooserComponent,
      SamuraiTacticsChooserComponent,
      ShamanSpellsChooserComponent,
      GamblerTricksChooserComponent,
      OrphanMissionsChooserComponent,
      ElementalMagikChooserComponent,
      FactionChooserComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
