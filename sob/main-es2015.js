(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/abilities/abilities.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/abilities/abilities.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Abilities</div>\n    <button mat-flat-button color=\"primary\" (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n\n<!-- <div *ngFor=\"let ability of character.abilities; let i = index\" class=\"ability\">\n\n    <div class=\"flex-1\">\n        <span class=\"a-heading\">{{ability.name}}</span> - {{ability.desc}}\n        <div *ngIf=\"ability.userInput\">\n            <hr>\n            <small><strong>{{ability.userInput.name}}:</strong></small>\n            <input type=\"text\" [(ngModel)]=\"ability.userInput.value\">\n        </div>\n        <div *ngIf=\"ability.modifiers\">\n            <hr>\n            <mat-chip-list class=\"u-sm\" [selectable]=\"false\">\n                <mat-chip *ngFor=\"let modifier of ability.modifiers\">\n                    {{modifier.affects}} {{modifier.value|modifier}}\n                </mat-chip>\n            </mat-chip-list>\n        </div>\n    </div>\n    <div>\n        <button class=\"u-sm\" mat-flat-button color=\"warn\"\n            (click)=\"confirmingDelete(i,true)\"\n            *ngIf=\"!confirmingDelete(i)\">\n            <mat-icon>delete_forever</mat-icon>\n        </button>\n        <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n            <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove(i)\"><mat-icon>check_circle</mat-icon></button>\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete(i,false)\"><mat-icon>not_interested</mat-icon></button>\n        </div>\n    </div>\n\n</div> -->\n<ability *ngFor=\"let ability of character.abilities; let i = index\"\n    [ability]=\"ability\"\n    [index]=\"i\"\n    (onEvent)=\"onEvent($event)\">\n</ability>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/abilities/ability/ability.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/abilities/ability/ability.component.html ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ability\" *ngIf=\"!editing\">\n\n    <div class=\"flex-1\">\n        <span class=\"a-heading\">{{ability.name}}</span> - {{ability.desc}}\n        <div *ngIf=\"ability.userInput\">\n            <hr>\n            <small><strong>{{ability.userInput.name}}:</strong></small>\n            <input type=\"text\" [(ngModel)]=\"ability.userInput.value\">\n        </div>\n        <div *ngIf=\"ability.modifiers\">\n            <hr>\n            <mat-chip-list class=\"u-sm\" [selectable]=\"false\">\n                <mat-chip *ngFor=\"let modifier of ability.modifiers\">\n                    {{modifier.affects}} {{modifier.value|modifier}}\n                </mat-chip>\n            </mat-chip-list>\n        </div>\n    </div>\n    <div>\n        <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"confirming=true\" *ngIf=\"!confirming\">\n            <mat-icon>delete_forever</mat-icon>\n        </button>\n        <div class=\"btn-group\" *ngIf=\"confirming===true\">\n            <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove()\"><mat-icon>check_circle</mat-icon></button>\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirming=false\"><mat-icon>not_interested</mat-icon></button>\n        </div>\n        <br>\n        <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"edit()\"><mat-icon>edit</mat-icon></button>\n\n    </div>\n\n</div>\n\n<div class=\"ability\" *ngIf=\"editing\">\n\n    <div class=\"flex-1\">\n\n        <div class=\"a-heading\">{{ability.name}}</div>\n\n        <div class=\"form-group\">\n            <label class=\"u-sm\">Description</label>\n            <textarea rows=\"3\" class=\"form-control input-sm\" [(ngModel)]=\"editable.desc\"></textarea>\n        </div>\n\n        <div class=\"form-group\">\n            <label class=\"u-sm\">Use</label>\n            <select class=\"form-control\" [(ngModel)]=\"editable.usage\">\n                <option value=\"\">N/A</option>\n                <option *ngFor=\"let use of ['Turn', 'Fight', 'Adventure', 'Travel']\" [ngValue]=\"use\">{{use}}</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\" *ngIf=\"ability.userInput\">\n            <label class=\"u-sm\">{{ability.userInput.name}}</label>\n            <input type=\"text\" class=\"form-control input-sm\" [(ngModel)]=\"editable.userInput.value\">\n        </div>\n\n        <div>\n            <label class=\"u-sm\">Modifiers</label>\n\n            <mat-chip-list class=\"u-sm u-pd--sm\" [selectable]=\"false\">\n                <mat-chip *ngFor=\"let modifier of editable.modifiers; let $index=index\">\n                    <strong>{{modifier.affects}}</strong> : {{modifier.value|modifier}}\n                    <mat-icon class=\"mat-chip-remove mat-chip-trailing-icon mat-icon\" (click)=\"removeModifier($index)\">\n                        cancel\n                    </mat-icon>\n                </mat-chip>\n            </mat-chip-list>\n\n            <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                <div class=\"flex-2\">\n                    <select class=\"form-control\" [(ngModel)]=\"newModifier.affects\">\n                        <option [ngValue]=\"null\">Select</option>\n                        <option *ngFor=\"let modtarget of modifierTargets\" [ngValue]=\"modtarget\">\n                            {{modtarget}}\n                        </option>\n                    </select>\n                </div>\n                <div class=\"flex-1\">\n                    <input type=\"number\" min=\"-10\" [(ngModel)]=\"newModifier.value\"\n                        class=\"form-control\" placeholder=\"0\">\n                </div>\n                <button mat-flat-button class=\"u-sm\"\n                    color=\"accent\"\n                    (click)=\"addModifier()\"\n                    [disabled]=\"!newModifier.affects\">\n                    Add\n                </button>\n            </div>\n        </div>\n\n\n        <div class=\"m-grid flex-justify-end flex-align-center\">\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"editing=false\">cancel</button>\n            &nbsp;&nbsp;\n            <button class=\"u-sm\" mat-flat-button color=\"primary\" (click)=\"save()\">save</button>\n        </div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/abilities/chooser/chooser.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/abilities/chooser/chooser.component.html ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Trick</h5>\n<div mat-dialog-content>\n\n    <div *ngIf=\"!data || !data.options || !data.options.rest || !data.options.rest.length\">\n        Loading available options...\n    </div>\n\n    <!-- starting path options -->\n    <div class=\"c-ability--heading\" (click)=\"groupToggles.paths=!groupToggles.paths\">\n        <span [ngClass]=\"{'icon-caret--down':groupToggles.paths,'icon-caret--up':!groupToggles.paths}\"></span>\n        Starting Paths\n    </div>\n    <div class=\"c-ability--group\" [ngClass]=\"{hidden:groupToggles.paths}\">\n        <div *ngIf=\"!data?.options?.paths.length\" class=\"c-option--available\">\n            <em>You've already selected a path</em>\n        </div>\n        <div *ngFor=\"let ability of data?.options?.paths\"\n            class=\"c-option--available\"\n            (click)=\"choose(ability)\"\n            [ngClass]=\"{'is-selected':isChosen(ability)}\">\n            <div class=\"a-heading\">\n                <mat-icon>{{isChosen(ability)?'check_box':'check_box_outline_blank'}}</mat-icon>\n                {{ability.name}}\n            </div>\n            <div class=\"u-sm\">{{ability.value||ability.desc}}</div>\n        </div>\n    </div>\n\n    <!-- rolled upgrades -->\n    <div class=\"c-ability--heading\" (click)=\"groupToggles.rolled=!groupToggles.rolled\">\n        <span [ngClass]=\"{'icon-caret--down':groupToggles.rolled,'icon-caret--up':!groupToggles.rolled}\"></span>\n        Rolled Upgrades\n    </div>\n    <div class=\"c-ability--group\" [ngClass]=\"{hidden:groupToggles.rolled}\">\n        <div *ngFor=\"let ability of data?.options?.rolled\"\n            class=\"c-option--available\"\n            (click)=\"choose(ability)\"\n            [ngClass]=\"{'is-selected':isChosen(ability)}\">\n            <div class=\"a-heading\">\n                <mat-icon>{{isChosen(ability)?'check_box':'check_box_outline_blank'}}</mat-icon>\n                <span *ngIf=\"ability.roll\">({{ability.roll}} / 2D6) </span>\n                {{ability.name}}\n            </div>\n            <div class=\"u-sm\">{{ability.value||ability.desc}}</div>\n        </div>\n    </div>\n\n\n    <!-- remaining level up options -->\n    <div class=\"c-ability--heading\" (click)=\"groupToggles.rest=!groupToggles.rest\">\n        <span [ngClass]=\"{'icon-caret--down':groupToggles.rest,'icon-caret--up':!groupToggles.rest}\"></span>\n        Class Abilities\n    </div>\n    <div class=\"c-ability--group\" [ngClass]=\"{hidden:groupToggles.rest}\">\n        <div *ngFor=\"let ability of data?.options?.rest\"\n            class=\"c-option--available\"\n            (click)=\"choose(ability)\"\n            [ngClass]=\"{'is-selected':isChosen(ability)}\">\n            <div class=\"a-heading\">\n                <mat-icon *ngIf=\"ability.disabled\">not_interested</mat-icon>\n                <mat-icon *ngIf=\"!ability.disabled\">{{isChosen(ability)?'check_box':'check_box_outline_blank'}}</mat-icon>\n                {{ability.name}}\n            </div>\n            <div class=\"u-sm\">{{ability.value||ability.desc}}</div>\n            <div class=\"u-sm\" *ngIf=\"ability.requires\"\n                [ngClass]=\"{'is-highlighted': ability.disabled}\">\n                <em>Requires: </em> <strong>{{ability.requires}}</strong>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/app.component.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <header>\n    <h5>\n        <a routerLink=\"/chars\" routerLinkActive=\"active\">{{title}}</a>\n    </h5>\n    <div *ngIf=\"user\">\n        <span class=\"d-none-xs\">{{ user.email }} </span>\n        <button type=\"button\" class=\"btn btn-sm\" (click)=\"logout()\">Logout</button>\n    </div>\n    <div *ngIf=\"!user\">\n        <a routerLink=\"/login\" routerLinkActive=\"active\">Login</a>\n    </div>\n</header> -->\n<mat-toolbar color=\"primary\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\" style=\"width:100%\">\n        <div><a mat-button routerLink=\"/chars\">&#11013;</a></div>\n        <div class=\"a-brand\">{{title}}</div>\n        <div *ngIf=\"user\">\n            <span mat-button class=\"d-none-xs\">{{ user.email }} </span>\n            <button mat-button (click)=\"logout()\">Logout</button>\n        </div>\n        <a *ngIf=\"!user\" mat-button routerLink=\"/login\" routerLinkActive=\"active\">Login</a>\n    </div>\n</mat-toolbar>\n<main>\n    <router-outlet></router-outlet>\n</main>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/attacks/attack/attack.component.html":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/attacks/attack/attack.component.html ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"attack\">\n\n    <div *ngIf=\"isEditing===false\">\n\n        <div class=\"m-grid flex-justify-between flex-align-end\">\n            <div class=\"a-heading\">{{attack.name}}</div>\n            <div class=\"m-grid flex-justify-end flex-align-end\">\n                <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"edit()\">edit</button>\n                &nbsp;&nbsp;&nbsp;\n                <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                    (click)=\"confirmingDelete=true\"\n                    *ngIf=\"!confirmingDelete\">\n                    <mat-icon>delete_forever</mat-icon>\n                </button>\n                <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                    <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove()\"><mat-icon>check_circle</mat-icon></button>\n                    <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete=false\"><mat-icon>not_interested</mat-icon></button>\n                </div>\n            </div>\n        </div>\n\n        <small class=\"m-grid flex-justify-between\">\n            <div class=\"flex-1\"><strong>Type: </strong> {{attack.type}}</div>\n            <div class=\"flex-1\" *ngIf=\"'ranged'===attack.type\">\n                <strong>Range: </strong> {{attack.range||0}}\n            </div>\n        </small>\n        <small class=\"m-grid flex-justify-between\">\n            <div class=\"flex-1\"><strong>Att: </strong> {{attack.attack||'not specified'}}</div>\n            <div class=\"flex-1\"><strong>Dmg: </strong> {{attack.damage||'not specified'}}</div>\n        </small>\n\n        <div class=\"desc\" *ngIf=\"attack.description\"><br>{{attack.description}}</div>\n\n        <hr>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"roll=null\">clear</button>\n\n            <button class=\"u-sm\" mat-flat-button color=\"primary\"\n                (ngDisabled)=\"!attack.type||!attack.attack||!attack.damage\"\n                (click)=\"execute()\">\n                Roll\n            </button>\n        </div>\n\n        <div *ngIf=\"roll\">\n            <br>\n            <div class=\"u-sm\">\n                <strong>Hits:</strong>\n                <span *ngFor=\"let hit of roll.hits; let i = index;\">\n                    &nbsp;\n                    <button type=\"button\" class=\"die u-sm\" (click)=\"rerollHit(i)\"\n                        [ngClass]=\"{'is-miss':hit < details.target}\">\n                        {{hit}}\n                    </button>\n                </span>\n            </div>\n            <br>\n            <div class=\"u-sm\">\n                <strong>Dmg:</strong>\n                <span *ngFor=\"let dmg of roll.dmg; let i = index\">\n                    &nbsp;\n                    <button type=\"button\" class=\"die u-sm\" (click)=\"rerollDmg(i)\"\n                        [disabled]=\"roll.hits[i]< details.target\">\n                        {{dmg}}\n                    </button>\n                </span>\n                &nbsp;\n                <small><strong>( {{roll.totalDmg}} )</strong></small>\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n\n    <div *ngIf=\"isEditing===true\">\n\n        <div>\n            <label>Name</label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.name\"\n                placeholder=\"Name this attack\">\n        </div>\n\n\n        <div class=\"m-grid gutter flex-justify-start flex-align-center\">\n            <div class=\"flex-1\">\n                <label>Type</label>\n                <select class=\"form-control\" [(ngModel)]=\"editable.type\">\n                    <option value=\"melee\">Melee</option>\n                    <option value=\"ranged\">Ranged</option>\n                </select>\n            </div>\n\n            <div *ngIf=\"'ranged' === editable.type\" class=\"flex-1\">\n                <label>Range</label>\n                <input type=\"text\" class=\"form-control\"\n                    [(ngModel)]=\"editable.range\"\n                    placeholder=\"Specify attack range\">\n            </div>\n        </div>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"flex-1\">\n                <label>Att: </label>\n                <input type=\"text\" class=\"form-control\" required\n                    [(ngModel)]=\"editable.attack\"\n                    placeholder=\"e.g., 2D6\">\n            </div>\n            <div class=\"flex-1\">\n                <label>Dmg: </label>\n                <input type=\"text\" class=\"form-control\" required\n                    [(ngModel)]=\"editable.damage\"\n                    placeholder=\"e.g., D6+2\">\n            </div>\n        </div>\n\n        <div>\n            <label>Misc: </label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.description\"\n                placeholder=\"bonuses, conditionals, etc\">\n        </div>\n\n        <hr>\n\n        <div class=\"m-grid gutter flex-justify-between\">\n            <button mat-flat-button color=\"accent\" (click)=\"cancelEditing()\">cancel</button>\n            <button mat-flat-button color=\"primary\" (click)=\"saveEdits()\">save</button>\n        </div>\n\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/attacks/attacks.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/attacks/attacks.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <h4 class=\" u-text--sc\">Attacks</h4>\n    <button mat-flat-button color=\"primary\" (click)=\"add()\">New</button>\n</div>\n<hr>\n\n<div *ngFor=\"let attack of attacks\" class=\"card\">\n    <attack [attack]=\"attack\" (onEvent)=\"onEvent($event)\"></attack>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/avatar/avatar.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/avatar/avatar.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"avatar\">\n    <div class=\"image-wrapper\" (click)=\"showForm=true\">\n      <img class=\"image\" src=\"{{imgData||'assets/avatar.png'}}\">\n    </div>\n    <div *ngIf=\"!showForm\" class=\"u-sm u-text--center\">\n        <em>Click avatar to edit</em>\n    </div>\n    <div *ngIf=\"showForm\">\n        <div>\n            <input type=\"file\" (change)=\"changeListener($event)\">\n        </div>\n        <button type=\"button\" (click)=\"cancel()\" class=\"u-sm\">cancel</button>\n        <button type=\"button\" *ngIf=\"isDirty()\" (click)=\"save()\" class=\"u-sm\">save</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/character/character-oldstyle.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/character/character-oldstyle.component.html ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"character\" class=\"l-char old-style\">\n\n\n    <div class=\"l-page\">\n        <main class=\"m-grid gutter\">\n            <div class=\"p-overview flex-1\">\n\n                <div class=\"o-container--bio\">\n                    <avatar (onSave)=\"saveChar('avatar', $event)\"></avatar>\n                    <div class=\"bio\">\n                        <div *ngIf=\"!isEditingBio\">\n                            <h4>{{character.name}}</h4>\n                            <div><small>{{character.class}}</small></div>\n                            <div><small><em>{{character.keywords}}</em></small></div>\n                            <button class=\"u-sm edit-button\" mat-raised-button color=\"accent\" (click)=\"editBio()\">\n                                <mat-icon>edit</mat-icon>\n                            </button>\n                        </div>\n                        <div *ngIf=\"isEditingBio\">\n                            <label>Name</label>\n                            <input type=\"test\" class=\"form-control\" [(ngModel)]=\"editableBio.name\">\n\n                            <label>Keywords</label>\n                            <input type=\"test\" class=\"form-control\" [(ngModel)]=\"editableBio.keywords\">\n\n                            <button mat-flat-button color=\"accent\" (click)=\"cancelBioEdit()\">Cancel</button>\n                            &nbsp;\n                            <button mat-flat-button color=\"primary\" (click)=\"saveBio()\">Save</button>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"m-grid u-sm t-combat\">\n                    <div class=\"flex-1\">\n                        <div class=\"m-grid gutter\">\n                            <value-display label=\"Combat\"\n                                value=\"{{character.combat}}\"\n                                [modifiers]=\"modifiers.combat\"\n                                (onSave)=\"saveChar('combat', $event)\">\n                            </value-display>\n                            <value-display-with-max label=\"Grit\"\n                                value=\"{{character.grit.current}}\"\n                                max=\"{{character.grit.max}}\"\n                                [modifiers]=\"modifiers.grit\"\n                                [options]=\"{max:character.grit.max+(modifiers.grit?modifiers.grit.value:0)}\"\n                                (onSave)=\"saveChar('grit.current', $event)\">\n                            </value-display-with-max>\n                        </div>\n                    </div>\n                    <div class=\"flex-2\">\n                        <div class=\"m-grid gutter\">\n                            <value-display label=\"Melee\"\n                                value=\"{{character.melee}}\"\n                                (onSave)=\"saveChar('melee', $event)\">\n                            </value-display>\n                            <value-display label=\"Ranged\"\n                                value=\"{{character.ranged}}\"\n                                (onSave)=\"saveChar('ranged', $event)\">\n                            </value-display>\n                        </div>\n                        <div class=\"m-grid gutter\">\n                            <value-display label=\"Cover\"\n                                value=\"{{character.cover}}\"\n                                [modifiers]=\"modifiers.cover\"\n                                (onSave)=\"saveChar('cover', $event)\">\n                            </value-display>\n                            <value-display label=\"Endurance\"\n                                value=\"{{character.endurance}}\"\n                                [modifiers]=\"modifiers.endurance\"\n                                (onSave)=\"saveChar('endurance', $event)\">\n                            </value-display>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n            <div class=\"p-main flex-2\">\n\n                <div class=\"o-container--attrs\">\n\n                    <div class=\"m-attributes\">\n                        <div  *ngFor=\"let st of ['Agility','Cunning','Lore','Luck','Spirit','Strength']\">\n                            <value-display\n                                label=\"{{st}}\"\n                                value=\"{{character.stats[st]}}\"\n                                [modifiers]=\"modifiers[st]\"\n                                (onSave)=\"saveChar('stats.'+st, $event)\">\n                            </value-display>\n                        </div>\n                    </div>\n                    <div class=\"flex-1\">&nbsp;</div>\n                    <div class=\"m-stats\">\n                        <div class=\"flex-1 o-container\">\n                            <value-display label=\"Init\"\n                                value=\"{{character.init}}\"\n                                [modifiers]=\"modifiers.init\"\n                                (onSave)=\"saveChar('init', $event)\">\n                            </value-display>\n\n                            <value-display label=\"Move\"\n                                value=\"{{character.movement}}\"\n                                [options]=\"{min:-10}\"\n                                [modifiers]=\"modifiers.movement\"\n                                (onSave)=\"saveChar('movement', $event)\">\n                            </value-display>\n                        </div>\n\n                        <div class=\"flex-1 o-container\">\n                            <value-display label=\"Level\"\n                                value=\"{{character.level}}\"\n                                [canAdjust]=\"false\"\n                                (onSave)=\"saveChar('level', $event)\">\n                            </value-display>\n                            <xp-value-display label=\"XP\"\n                                value=\"{{character.xp}}\"\n                                [options]=\"{valueSize:'sm'}\"\n                                needed=\"{{xpLevels[character.level]}}\"\n                                (onSave)=\"saveChar('xp', $event)\">\n                            </xp-value-display>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngIf=\"character?.sidebag\">\n                    <br>\n                    <div class=\"m-grid u-sm\">\n                        <div *ngFor=\"let token of character?.sidebag | keyvalue\"\n                            class=\"m-grid gutter\">\n                            <div *ngIf=\"'capacity'!== token.key && (token.value*1)>0\"\n                                class=\"m-sidebag-chip m-grid gutter\">\n                                <span class=\"sprite sprite-{{token.key}}\"></span>\n                                {{token.key}} : {{token.value}}\n                                <button mat-flat-button class=\"u-sm\" color=\"primary\"\n                                    (click)=\"useQuickSidebagToken(token.key)\">\n                                    use\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    <br>\n                </div>\n\n                <div class=\"o-corruption-container m-grid gutter u-sm\">\n\n                    <div class=\"m-group t-resources\">\n\n                        <div class=\"m-grid\">\n                            <value-display label=\"Wealth\"\n                                value=\"{{character.wealth}}\"\n                                [options]=\"{valueSize:'sm'}\"\n                                (onSave)=\"saveChar('wealth', $event)\">\n                            </value-display>\n                            <value-display label=\"Dark Stone\"\n                                value=\"{{character.darkstone}}\"\n                                [options]=\"{labelSize:'sm'}\"\n                                (onSave)=\"saveChar('darkstone', $event)\">\n                            </value-display>\n                            <value-display label=\"Tech\"\n                                value=\"{{character.techCurrency}}\"\n                                (onSave)=\"saveChar('techCurrency', $event)\">\n                            </value-display>\n                            <value-display label=\"Scrap\"\n                                value=\"{{character.scrapCurrency}}\"\n                                (onSave)=\"saveChar('scrapCurrency', $event)\">\n                            </value-display>\n                        </div>\n                    </div>\n\n                    <div class=\"m-group t-corruption\">\n                        <value-display-with-max label=\"Corruption\"\n                            value=\"{{character.corruption.current}}\"\n                            max=\"{{character.corruption.max}}\"\n                            [modifiers]=\"modifiers.corruption\"\n                            (onSave)=\"saveChar('corruption.current', $event)\">\n                        </value-display-with-max>\n                    </div>\n                    <div class=\"m-group\"\n                        *ngIf=\"hasFlag(CLASSES.PREACHER)||hasFlag(CLASSES.GAMBLER)||hasFlag(CLASSES.SHAMAN)||hasFlag(CLASSES.SORCERER)||hasFlag(CLASSES.SAMURAI)||hasFlag(CLASSES.MONK)\"\n                        [ngClass]=\"{'t-faith':hasFlag(CLASSES.PREACHER), 't-fortune':hasFlag(CLASSES.GAMBLER), 't-magik':hasFlag(CLASSES.SHAMAN), 't-mana':hasFlag(CLASSES.SORCERER), 't-fury':hasFlag(CLASSES.SAMURAI), 't-ki':hasFlag(CLASSES.MONK)}\">\n                        <div *ngIf=\"hasFlag(CLASSES.PREACHER)\">\n                            <value-display label=\"Faith\"\n                                value=\"{{character.faith}}\"\n                                [modifiers]=\"modifiers.faith\"\n                                (onSave)=\"saveChar('faith', $event)\">\n                            </value-display>\n                        </div>\n                        <div *ngIf=\"hasFlag(CLASSES.GAMBLER)\">\n                            <value-display-with-max label=\"Fortune\"\n                                value=\"{{character.fortune.current}}\"\n                                max=\"{{character.fortune.max}}\"\n                                [modifiers]=\"modifiers.fortune\"\n                                [options]=\"{max:character.fortune.max+(modifiers.fortune?modifiers.fortune.value:0)}\"\n                                (onSave)=\"saveChar('fortune.current', $event)\">\n                            </value-display-with-max>\n                        </div>\n                        <div *ngIf=\"hasFlag(CLASSES.SHAMAN)\">\n                            <value-display-with-max label=\"Magik\"\n                                value=\"{{character.magik.current}}\"\n                                max=\"{{character.magik.max}}\"\n                                [modifiers]=\"modifiers.magik\"\n                                [options]=\"{max:character.magik.max+(modifiers.magik?modifiers.magik.value:0)}\"\n                                (onSave)=\"saveChar('magik.current', $event)\">\n                            </value-display-with-max>\n                        </div>\n                        <div *ngIf=\"hasFlag(CLASSES.SAMURAI)\">\n                            <value-display-with-max label=\"Fury\"\n                                value=\"{{character.fury.current}}\"\n                                max=\"{{character.fury.max}}\"\n                                [modifiers]=\"modifiers.fury\"\n                                [options]=\"{max:character.fury.max+(modifiers.fury?modifiers.fury.value:0)}\"\n                                (onSave)=\"saveChar('fury.current', $event)\">\n                            </value-display-with-max>\n                        </div>\n                        <div *ngIf=\"hasFlag(CLASSES.MONK)\">\n                            <value-display-with-max label=\"Ki\"\n                                value=\"{{character.ki.current}}\"\n                                max=\"{{character.ki.max}}\"\n                                [modifiers]=\"modifiers.ki\"\n                                [options]=\"{max:character.ki.max+(modifiers.ki?modifiers.ki.value:0)}\"\n                                (onSave)=\"saveChar('ki.current', $event)\">\n                            </value-display-with-max>\n                        </div>\n                        <div *ngIf=\"hasFlag(CLASSES.SORCERER)\">\n                            <value-display label=\"Mana\"\n                                value=\"{{character.mana}}\"\n                                [modifiers]=\"modifiers.mana\"\n                                (onSave)=\"saveChar('mana', $event)\">\n                            </value-display>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"o-container--health-sanity m-grid\">\n\n                    <div class=\"m-group t-health\">\n                        <div class=\"m-grid gutter u-sm\">\n                            <div>\n                                <value-display-with-max label=\"Health\"\n                                    value=\"{{character.health.wounds}}\"\n                                    max=\"{{character.health.max}}\"\n                                    [modifiers]=\"modifiers.health\"\n                                    (onSave)=\"saveChar('health.wounds', $event)\">\n                                </value-display-with-max>\n                            </div>\n                            <div>\n                                <value-display label=\"Defense\"\n                                    value=\"{{character.defense}}\"\n                                    [modifiers]=\"modifiers.defense\"\n                                    (onSave)=\"saveChar('defense', $event)\">\n                                </value-display>\n                            </div>\n                            <div>\n                                <value-display label=\"Armor\"\n                                    value=\"{{character.armor}}\"\n                                    [modifiers]=\"modifiers.armor\"\n                                    (onSave)=\"saveChar('armor', $event)\">\n                                </value-display>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"m-group t-sanity\">\n                        <div class=\"m-grid gutter u-sm\">\n                            <div>\n                                <value-display-with-max label=\"Sanity\"\n                                    value=\"{{character.sanity.loss}}\"\n                                    max=\"{{character.sanity.max}}\"\n                                    [modifiers]=\"modifiers.sanity\"\n                                    (onSave)=\"saveChar('sanity.loss', $event)\">\n                                </value-display-with-max>\n                            </div>\n                            <div>\n                                <value-display label=\"Willpower\"\n                                    value=\"{{character.willpower}}\"\n                                    [modifiers]=\"modifiers.willpower\"\n                                    (onSave)=\"saveChar('willpower', $event)\">\n                                </value-display>\n                            </div>\n                            <div>\n                                <value-display  label=\"Spirit Armor\"\n                                    value=\"{{character.spiritArmor}}\"\n                                    [modifiers]=\"modifiers.spiritArmor\"\n                                    [options]=\"{labelSize:'sm'}\"\n                                    (onSave)=\"saveChar('spiritArmor', $event)\">\n                                </value-display>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </main>\n    </div>\n\n\n\n\n    <div class=\"l-page--wide\">\n        <main class=\"m-grid gutter\">\n            <div class=\"flex-1\">\n                <abilities\n                    [character]=\"character\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </abilities>\n            </div>\n            <div class=\"flex-1\">\n                <preacher-sermons *ngIf=\"hasFlag(CLASSES.PREACHER)\"\n                    [character]=\"character\"\n                    [modifiers]=\"modifiers.faith\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </preacher-sermons>\n\n                <shaman-spells *ngIf=\"hasFlag(CLASSES.SHAMAN)\"\n                    [character]=\"character\"\n                    [modifiers]=\"modifiers.magik\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </shaman-spells>\n\n                <samurai-tactics  *ngIf=\"hasFlag(CLASSES.SAMURAI)\"\n                     [character]=\"character\"\n                     [modifiers]=\"modifiers.fury\"\n                     (onSave)=\"saveChar(null, $event)\">\n                 </samurai-tactics>\n\n                <gambler-tricks *ngIf=\"hasFlag(CLASSES.GAMBLER)\"\n                    [character]=\"character\"\n                    [modifiers]=\"modifiers.fortune\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </gambler-tricks>\n\n                <orphan-missions *ngIf=\"hasFlag(CLASSES.ORPHAN)\"\n                    [character]=\"character\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </orphan-missions>\n\n                <sorcerer-elemental-magik *ngIf=\"hasFlag(CLASSES.SORCERER)\"\n                    [character]=\"character\"\n                    [modifiersMana]=\"modifiers.mana\"\n                    [modifiersArcanePowder]=\"modifiers.arcanePowder\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </sorcerer-elemental-magik>\n\n                <factions *ngIf=\"hasFlag(CLASSES.ASSASSIN) || hasFlag(CLASSES.TREDERRAN_VETERAN)\"\n                    [character]=\"character\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </factions>\n\n\n\n                <attacks\n                    [attacks]=\"character.attacks\"\n                    (onSave)=\"saveChar(null, $event)\">\n                </attacks>\n\n                <char-uses [character]=\"character\"\n                        (onSave)=\"saveChar(null, $event)\">\n                </char-uses>\n\n\n            </div>\n\n        </main>\n    </div>\n\n\n    <div class=\"l-page--wide\">\n        <main class=\"m-grid gutter\">\n            <div class=\"o-container--items\">\n                <items [items]=\"character.items\"\n                       [weightLimit]=\"getWeightLimit()\"\n                        (onSave)=\"saveChar(null, $event)\">\n                </items>\n            </div>\n            <div class=\"o-container--sidebag\">\n                <sidebag\n                   [sidebag]=\"character.sidebag\"\n                   [modifiers]=\"modifiers.sidebag\"\n                   [hasDynamiteSatchel]=\"hasDynamiteSatchel()\"\n                   (onSave)=\"saveChar(null, $event)\">\n                </sidebag>\n            </div>\n        </main>\n    </div>\n\n\n    <div class=\"l-page--wide\">\n        <main class=\"m-grid gutter\">\n            <div class=\"flex-1\">\n                <mim [current]=\"character.mutations\" (onSave)=\"saveChar(null, $event)\"></mim>\n            </div>\n\n            <div class=\"flex-1\">\n\n                <temporary-modifiers [mods]=\"character.temporaryMods\"\n                   (onSave)=\"saveChar('temporaryMods', $event)\">\n                </temporary-modifiers>\n\n                <char-notes [notes]=\"character.notes\"\n                   (onSave)=\"saveChar('notes', $event)\">\n                </char-notes>\n            </div>\n        </main>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/charlist/charlist.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/charlist/charlist.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"error\" class=\"c-error\">\n    <h5>Error</h5>\n    <p>{{error.message}}</p>\n    <a *ngIf=\"'auth'===error.type\" routerLink=\"/login\" routerLinkActive=\"active\">\n        Sign in\n    </a>\n</div>\n\n<div class=\"c-list\">\n\n    <header><h5>My Characters</h5></header><br>\n\n    <div class=\"c-list__item\">\n        <select class=\"form-control\" name=\"newCharClass\" [(ngModel)]=\"newCharClass\">\n            <option [ngValue]=\"null\" selected>Create a new character...</option>\n            <option *ngFor=\"let cls of classes\" [ngValue]=\"cls\">\n                {{cls.name}}\n            </option>\n        </select>\n        &nbsp;\n        <div>\n            <button mat-flat-button color=\"success\" (click)=\"create()\">Create</button>\n        </div>\n        <!-- <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</div>\n        <button mat-flat-button color=\"accent\" routerLink=\"/import\" routerLinkActive=\"active\">Import</button> -->\n    </div>\n\n    <div class=\"d-grid\">\n\n        <div *ngFor=\"let char of chars | async | orderBy:'level'\" class=\"card\">\n\n            <a class=\"thumbnail\" routerLink=\"/chars/{{char.id}}\" routerLinkActive=\"active\">\n                <img class=\"image\" [ngStyle]=\"getAvatar(char)\">\n            </a>\n            <h4 class=\"u-text--center\">{{char.name}}</h4>\n            <div class=\"u-text--center u-sm\">{{char.class}} {{char.level}}</div>\n\n\n            <div class=\"card-action\">\n                <button mat-mini-fab color=\"warn\" class=\"u-sm\"\n                    *ngIf=\"!isDeleting(char.id)\"\n                    (click)=\"markAsDeleting(char.id,true)\">\n                    <mat-icon>delete_forever</mat-icon>\n                </button>\n                <div class=\"btn-group\" *ngIf=\"isDeleting(char.id)\">\n                    <button mat-mini-fab color=\"primary\" class=\"u-sm\" (click)=\"remove(char.id)\">\n                        <mat-icon>check_circle_outline</mat-icon>\n                    </button>\n                    <button mat-mini-fab color=\"accent\" class=\"u-sm\" (click)=\"markAsDeleting(char.id, false)\">\n                        <mat-icon>not_interested</mat-icon>\n                    </button>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n    <!-- <div *ngFor=\"let char of chars | async\" class=\"c-list__item\">\n        <div>\n            <a  routerLink=\"/chars/{{char.id}}\" routerLinkActive=\"active\">\n                {{char.name}}\n            </a>&nbsp;\n             (level {{char.level}} <strong class=\"u-sm\">{{char.class}}</strong>)\n         </div>\n        &nbsp;\n        <div class=\"btn-group\" *ngIf=\"isDeleting(char.id)\">\n            <button type=\"button\" class=\"btn--del u-sm\" (click)=\"remove(char.id)\">\n                yes\n            </button>\n            <button type=\"button\" class=\"u-sm\" (click)=\"markAsDeleting(char.id, false)\">\n                no\n            </button>\n        </div>\n        <button *ngIf=\"!isDeleting(char.id)\" type=\"button\"\n            class=\"u-sm btn--del\" (click)=\"markAsDeleting(char.id,true)\">\n            X\n        </button>\n    </div> -->\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/faction/chooser/chooser.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/faction/chooser/chooser.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Trick</h5>\n<div mat-dialog-content>\n    <div *ngIf=\"!data || !data.options || !data.options.length\">\n        Loading available options...\n    </div>\n    <div *ngFor=\"let option of data?.options\"\n        class=\"c-option--available\"\n        (click)=\"choose(option)\"\n        [ngClass]=\"{'is-selected':isChosen(option)}\">\n        <div class=\"a-heading\">\n            <mat-icon>{{isChosen(option)?'check_box':'check_box_outline_blank'}}</mat-icon>\n            {{option.name}}\n        </div>\n        <p class=\"u-sm\">{{option.desc||option.description||option.value}}</p>\n    </div>\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/faction/faction.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/faction/faction.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">{{label}}</div>\n    <button mat-flat-button color=\"primary\" *ngIf=\"!character.faction\" (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n<div class=\"card\" *ngIf=\"!character?.faction\">\n    No {{label}} selected\n</div>\n<div class=\"card\" *ngIf=\"character?.faction\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-end\">\n        <div class=\"a-heading\">{{character.faction.name}}</div>\n        <button mat-flat-button color=\"warn\" class=\"u-sm\" (click)=\"character.faction=null;\">\n            <mat-icon>delete_forever</mat-icon>\n        </button>\n    </div>\n    <div class=\"desc\">{{character.faction.desc||character.faction.description}}</div>\n    <br>\n    <mat-chip-list *ngIf=\"character.faction.modifiers\" class=\"u-sm\" [selectable]=\"false\">\n        <mat-chip *ngFor=\"let modifier of character.faction.modifiers\">\n            {{modifier.affects}} {{modifier.value|modifier}}\n        </mat-chip>\n    </mat-chip-list>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/items/editor/editor.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/items/editor/editor.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- no title to reduce height -->\n<div mat-dialog-content>\n\n    <mat-tab-group>\n        <mat-tab label=\"Overview\">\n            <div class=\"form-group\">\n                <label class=\"u-sm\">Name</label>\n                <input type=\"text\" class=\"form-control input-sm\"\n                    [(ngModel)]=\"data.item.name\" placeholder=\"Name the item\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"u-sm\">Description</label>\n                <textarea rows=\"3\" class=\"form-control input-sm\"\n                    [(ngModel)]=\"data.item.description\"\n                    placeholder=\"Provide a description\">\n                </textarea>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"u-sm\">Keywords</label>\n                <input type=\"text\" class=\"form-control input-sm\"\n                    [(ngModel)]=\"data.item.keywords\"\n                    placeholder=\"Specify item keywords\">\n            </div>\n        </mat-tab>\n        <mat-tab label=\"About\">\n            <div class=\"form-group\">\n                <label class=\"u-sm\">Source</label>\n                <input type=\"text\" class=\"form-control input-sm\" [(ngModel)]=\"data.item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"u-sm\">Use</label>\n                <select class=\"form-control\" [(ngModel)]=\"data.item.usage\">\n                    <option [ngValue]=\"null\">N/A</option>\n                    <option *ngFor=\"let use of uses\" [ngValue]=\"use\">{{use}}</option>\n                </select>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"u-sm\">Clothing Slot</label>\n                <select type=\"text\" class=\"form-control\" [(ngModel)]=\"data.item.slot\">\n                    <option [ngValue]=\"null\">Select Slot (optional)</option>\n                    <option *ngFor=\"let slot of slots\" [ngValue]=\"slot\">{{slot}}</option>\n                </select>\n            </div>\n        </mat-tab>\n        <mat-tab label=\"Stats\">\n            <br>\n            <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                <div>Cost</div>\n                <input type=\"text\" class=\"form-control flex-1 u-sm\" [(ngModel)]=\"data.item.cost\"\n                    placeholder=\"Optionally, specify the cost\">\n            </div>\n            <br>\n            <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                <div class=\"col\" style=\"margin-right: 2em;\">\n\n                    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                        <img src=\"assets/item_weight.png\" height=\"16\">\n                        <select type=\"text\" class=\"form-control\" [(ngModel)]=\"data.item.weight\">\n                            <option>None</option>\n                            <option value=\"0\">0</option>\n                            <option value=\"1\">1</option>\n                            <option value=\"2\">2</option>\n                            <option value=\"3\">3</option>\n                            <option value=\"4\">4</option>\n                            <option value=\"5\">5</option>\n                        </select>\n                    </div>\n\n                    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                        <img src=\"assets/item_hands.png\" height=\"16\">\n                        <select type=\"text\" class=\"form-control\" [(ngModel)]=\"data.item.hands\">\n                            <option>None</option>\n                            <option value=\"0\">0</option>\n                            <option value=\"1\">1</option>\n                            <option value=\"2\">2</option>\n                            <option value=\"3\">3</option>\n                        </select>\n                    </div>\n                </div>\n\n                <div class=\"col\">\n\n                    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                        <img src=\"assets/item_darkstone.png\" height=\"16\">\n                        <select type=\"text\" class=\"form-control\" [(ngModel)]=\"data.item.darkstone\">\n                            <option>None</option>\n                            <option value=\"0\">0</option>\n                            <option value=\"1\">1</option>\n                            <option value=\"2\">2</option>\n                            <option value=\"3\">3</option>\n                            <option value=\"4\">4</option>\n                            <option value=\"5\">5</option>\n                        </select>\n                    </div>\n\n                    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                        <img src=\"assets/item_slots.png\" height=\"16\">\n                        <select type=\"text\" class=\"form-control\" [(ngModel)]=\"data.item.slots\">\n                            <option>None</option>\n                            <option value=\"0\">0</option>\n                            <option value=\"1\">1</option>\n                            <option value=\"2\">2</option>\n                            <option value=\"3\">3</option>\n                            <option value=\"4\">4</option>\n                            <option value=\"5\">5</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n            <br>\n        </mat-tab>\n        <mat-tab label=\"Modifiers\">\n            <br>\n            <button mat-flat-button color=\"success\" (click)=\"addModifier()\">\n                <mat-icon>add</mat-icon> Add\n            </button>\n\n            <div class=\"m-grid gutter flex-align-center flex-justify-between\"\n                *ngFor=\"let modifier of data.item.modifiers\">\n\n                <div class=\"col-2\" id=\"modifier-{{id}}\">\n                    <select class=\"form-control u-sm\" [(ngModel)]=\"modifier.affects\">\n                        <option [ngValue]=\"null\">Select</option>\n                        <option *ngFor=\"let modtarget of modifierTargets\" [ngValue]=\"modtarget\">\n                            {{modtarget}}\n                        </option>\n                    </select>\n                </div>\n                <div class=\"col\">\n                    <input type=\"number\" min=\"-10\" [(ngModel)]=\"modifier.value\"\n                        class=\"form-control u-sm\" placeholder=\"0\">\n                </div>\n                <div class=\"col\">\n                    <button mat-flat-button color=\"warn\" (click)=\"removeModifier($index)\">\n                        <mat-icon>delete_forever</mat-icon>\n                    </button>\n                </div>\n            </div>\n        </mat-tab>\n    </mat-tab-group>\n\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"light\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.item\" aria-label=\"Save\">Save</a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/items/item.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/items/item.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"m-grid flex-justify-between flex-align-start no-wrap\">\n\n    <div class=\"a-heading\" (click)=\"isCollapsed=!isCollapsed\">{{item.name}}</div>\n\n    <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"equipItem()\">\n        <mat-icon>{{item.equipped?'check_box':'check_box_outline_blank'}}</mat-icon>\n        Equip<span *ngIf=\"item.slot\"> ({{item.slot}})</span>\n    </button>\n\n</div>\n\n<div class=\"item__metadata m-grid flex-justify-between flex-align-start u-sm\">\n    <span>{{item.source||\"\"}}</span>\n    <em>{{item.keywords||\"\"}}</em>\n    <span *ngIf=\"item.cost\">${{item.cost||0}}</span>\n</div>\n\n<div class=\"item__desc u-sm\" *ngIf=\"item.description\">{{item.description}}</div>\n\n<div class=\"item__stats\">\n    <div [ngClass]=\"{faded:!item.weight}\">\n        <span class=\"sprite sprite-item_weight\"></span> {{item.weight||0}}\n    </div>\n    <div [ngClass]=\"{faded:!item.darkstone}\">\n        <span class=\"sprite sprite-item_darkstone\"></span> {{item.darkstone||0}}\n    </div>\n    <div [ngClass]=\"{faded:!item.hands}\">\n        <span class=\"sprite sprite-item_hands\"></span> {{item.hands||0}}\n    </div>\n    <div [ngClass]=\"{faded:!item.slots}\">\n        <span class=\"sprite sprite-item_slots\" ></span> {{item.slots||0}}\n    </div>\n</div>\n\n\n<div class=\"item__modifiers\">\n    <mat-chip-list *ngIf=\"item.modifiers\" class=\"u-sm\" [selectable]=\"false\">\n        <mat-chip *ngFor=\"let modifier of item.modifiers\">\n            {{modifier.affects}} {{modifier.value|modifier}}\n        </mat-chip>\n    </mat-chip-list>\n</div>\n\n<div class=\"item__actions m-grid flex-justify-between flex-align-end\">\n\n    <button *ngIf=\"!!item.usage\" class=\"u-sm\" mat-flat-button color=\"success\" (click)=\"item.used=!item.used\">\n        <mat-icon>{{item.used?'check_box':'check_box_outline_blank'}}</mat-icon>\n        Use ({{\"Adventure\"===item.usage?\"Adv\" : item.usage}})\n    </button>\n\n    <div class=\"flex-1\">&nbsp;</div>\n\n    <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"editItem()\">\n        <mat-icon>edit</mat-icon>\n    </button>\n    &nbsp;&nbsp;&nbsp;\n    <button class=\"u-sm\" mat-flat-button color=\"warn\"\n        (click)=\"confirmingDelete(true)\"\n        *ngIf=\"!confirmingDelete()\">\n        <mat-icon>delete_forever</mat-icon>\n    </button>\n    <div class=\"btn-group\" *ngIf=\"confirmingDelete()\">\n        <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"removeItem()\">\n            <mat-icon>check_circle</mat-icon>\n        </button>\n        <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete(false)\">\n            <mat-icon>not_interested</mat-icon>\n        </button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/items/items.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/items/items.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"m-grid flex-justify-between flex-align-center\">\n    <div class=\" u-text--sc\">Items</div>\n    <div class=\"m-grid gutter flex-align-center flex-justify-end u-sm\">\n        <span class=\"sprite sprite-item_weight\"></span> {{totalWeight}}\n        / {{weightLimit}}\n        &nbsp;\n        <span class=\"sprite sprite-item_darkstone\"></span> {{totalDarkstone}}\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"addItem()\">New</button>\n    </div>\n</h4>\n<hr>\n\n<div class=\"m-grid gutter flex-align-stretch\">\n    <item *ngFor=\"let item of items; let i = index\" class=\"card\"\n        [item]=\"item\"\n        (onEvent)=\"onItemEvent($event, i)\">\n    </item>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/login/login.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/login/login.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"c-login\">\n\n    <div class=\"card\">\n\n        <mat-form-field>\n            <mat-label>Email Address</mat-label>\n            <input matInput [(ngModel)]=\"email\" type=\"email\" required name=\"userEmail\">\n        </mat-form-field>\n\n        <mat-form-field>\n            <mat-label>Password</mat-label>\n            <input matInput [(ngModel)]=\"password\" type=\"password\" required name=\"userPassword\">\n        </mat-form-field>\n\n        <div *ngIf=\"message\" class=\"t-fg--danger\">\n            <br>\n            {{message}}\n            <br>\n        </div>\n\n        <br>\n        <br>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <button type=\"button\" (click)=\"resetPassword()\"\n                [disabled]=\"!email||!email.length\">\n                Reset Password\n            </button>\n            <button type=\"button\" class=\"btn--use\" (click)=\"login()\"\n                [disabled]=\"!email||!password\">\n                Login\n            </button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/mim/mim.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/mim/mim.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"p-mim\">\n\n    <div class=\"o-mutation-container\">\n        <h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col u-text--sc\">Mutations</div>\n            <button mat-flat-button color=\"primary\"\n                (click)=\"showAvailable.mutations=!showAvailable.mutations\">New</button>\n        </h4>\n        <hr>\n        <div *ngIf=\"showAvailable.mutations\" class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <br>\n                <select class=\"form-control\" name=\"newMutation\"\n                    [(ngModel)]=\"newMutation\"\n                    (change)=\"add('mutations', newMutation)\">\n                    <option [ngValue]=\"null\" selected>Select Mutation</option>\n                    <option *ngFor=\"let mutation of available.mutations\" [ngValue]=\"mutation\">\n                        {{mutation.name}}\n                    </option>\n                </select>\n                <br>\n                <br>\n            </div>\n            <button type=\"button\" (click)=\"showAvailable.mutations=false\">&times;</button>\n        </div>\n        <div *ngIf=\"!mutations || !mutations.length\">\n            Add a new mutation using the 'New' button.\n        </div>\n\n        <div *ngFor=\"let mutation of mutations; let i = index\" class=\"card\">\n            <div class=\"flex-1\">\n                <span class=\"a-heading\">{{mutation.name}}</span> - {{mutation.desc}}\n                <div *ngIf=\"mutation.modifiers\">\n                    <hr>\n                    <mat-chip-list class=\"u-sm\" [selectable]=\"false\">\n                        <mat-chip *ngFor=\"let modifier of mutation.modifiers\">\n                            {{modifier.affects}} {{modifier.value|modifier}}\n                        </mat-chip>\n                    </mat-chip-list>\n                </div>\n            </div>\n            <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                (click)=\"remove('mutations', i)\">\n                <mat-icon>delete_forever</mat-icon>\n            </button>\n        </div>\n    </div>\n\n\n\n\n    <div class=\"o-injury-container\">\n        <h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col u-text--sc\">Injuries</div>\n            <button mat-flat-button color=\"primary\"\n                (click)=\"showAvailable.injuries=!showAvailable.injuries\">New</button>\n        </h4>\n        <hr>\n        <div *ngIf=\"showAvailable.injuries\" class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <br>\n                <select class=\"form-control\" name=\"newInjury\"\n                    [(ngModel)]=\"newInjury\"\n                    (change)=\"add('injuries', newInjury)\">\n                    <option [ngValue]=\"null\" selected>Select Injury</option>\n                    <option *ngFor=\"let injury of available.injuries\" [ngValue]=\"injury\">\n                        {{injury.name}}\n                    </option>\n                </select>\n                <br>\n                <br>\n            </div>\n            <button type=\"button\" (click)=\"showAvailable.injuries=false\">&times;</button>\n        </div>\n        <div *ngIf=\"!injuries || !injuries.length\">\n            Add a new injury using the 'New' button.\n        </div>\n        <div *ngFor=\"let injury of injuries; let i = index\" class=\"card\">\n            <div class=\"flex-1\">\n                <span class=\"a-heading\">{{injury.name}}</span> - {{injury.desc}}\n                <div *ngIf=\"injury.modifiers\">\n                    <hr>\n                    <mat-chip-list class=\"u-sm\" [selectable]=\"false\">\n                        <mat-chip *ngFor=\"let modifier of injury.modifiers\">\n                            {{modifier.affects}} {{modifier.value|modifier}}\n                        </mat-chip>\n                    </mat-chip-list>\n                </div>\n            </div>\n            <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                (click)=\"remove('injuries', i)\">\n                <mat-icon>delete_forever</mat-icon>\n            </button>\n        </div>\n    </div>\n\n\n\n\n\n    <div class=\"o-madness-container\">\n        <h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col u-text--sc\">Madness</div>\n            <button mat-flat-button color=\"primary\"\n                (click)=\"showAvailable.madness=!showAvailable.madness\">New</button>\n        </h4>\n        <hr>\n        <div *ngIf=\"showAvailable.madness\" class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <br>\n                <select class=\"form-control\" name=\"newMadness\"\n                    [(ngModel)]=\"newMadness\"\n                    (change)=\"add('madness', newMadness)\">\n                    <option [ngValue]=\"null\" selected>Select Madness</option>\n                    <option *ngFor=\"let mad of available.madness\" [ngValue]=\"mad\">\n                        {{mad.name}}\n                    </option>\n                </select>\n                <br>\n                <br>\n            </div>\n            <button type=\"button\" (click)=\"showAvailable.madness=false\">&times;</button>\n        </div>\n        <div *ngIf=\"!madness || !madness.length\">\n            Add a new madness using the 'New' button.\n        </div>\n        <div *ngFor=\"let mad of madness; let i = index\" class=\"card\">\n            <div class=\"flex-1\">\n                <span class=\"a-heading\">{{mad.name}}</span> - {{mad.desc}}\n                <div *ngIf=\"mad.modifiers\">\n                    <hr>\n                    <mat-chip-list class=\"u-sm\" [selectable]=\"false\">\n                        <mat-chip *ngFor=\"let modifier of mad.modifiers\">\n                            {{modifier.affects}} {{modifier.value|modifier}}\n                        </mat-chip>\n                    </mat-chip-list>\n                </div>\n                <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove('madness', i)\">\n                    <mat-icon>delete_forever</mat-icon>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/chooser/chooser.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/shared/chooser/chooser.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  chooser works!\n</p>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/keypad/keypad.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/shared/keypad/keypad.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>\n    Current: {{data.value}}\n</h5>\n<div mat-dialog-content>\n    <!-- <small>( min: {{minimum}}, max: {{maximum}} )</small> -->\n    <small *ngIf=\"data.modifiers\">\n        Modifiers:\n        {{data.modifiers.value|modifier}}\n        ({{data.modifiers.sources|join:', '}})\n    </small>\n\n    <div class=\"o-keypad\">\n        <button mat-mini-fab color=\"success\" (click)=\"change(100)\">+100</button>\n        <button mat-mini-fab color=\"success\" (click)=\"change(50)\">+50</button>\n        <button mat-mini-fab color=\"success\" (click)=\"change(20)\">+20</button>\n        <button mat-mini-fab color=\"success\" (click)=\"change(10)\">+10</button>\n        <button mat-mini-fab color=\"success\" (click)=\"change(5)\">+5</button>\n        <button mat-mini-fab color=\"success\" (click)=\"change(1)\">+1</button>\n        <button mat-mini-fab color=\"warn\" (click)=\"change(-1)\" (ngDisable)=\"value==minimum\">-1</button>\n        <button mat-mini-fab color=\"warn\" (click)=\"change(-5)\" (ngDisable)=\"value==minimum\">-5</button>\n        <button mat-mini-fab color=\"warn\" (click)=\"change(-10)\" (ngDisable)=\"value==minimum\">-10</button>\n        <button mat-mini-fab color=\"warn\" (click)=\"change(-20)\" (ngDisable)=\"value==minimum\">-20</button>\n        <button mat-mini-fab color=\"warn\" (click)=\"change(-50)\" (ngDisable)=\"value==minimum\">-50</button>\n        <button mat-mini-fab color=\"warn\" (click)=\"change(-100)\" (ngDisable)=\"value==minimum\">-100</button>\n    </div>\n    <div class=\"manual-entry\">\n        <br>\n        <div class=\"m-grid flex-justify-around flex-align-stretch\">\n            <button mat-flat-button class=\"u-sm\" color=\"warn\"\n                (click)=\"changeManual(-1)\" (ngClass)=\"{disabled:!hasManual()}\">\n                <mat-icon>remove</mat-icon>\n            </button>\n            <div style=\"width:70%\"><!-- because on phone it wraps -->\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"manualAdj\" placeholder=\"Adjust by ...\">\n            </div>\n            <button mat-flat-button class=\"u-sm\" color=\"success\"\n                (click)=\"changeManual(1)\" (ngClass)=\"{disabled:!hasManual()}\">\n                <mat-icon>add</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"u-sm\">\n        <strong>Changes:</strong>\n        <span *ngFor=\"let change of changes\">{{change}}, </span>\n    </div>\n    <div class=\"u-sm\"><strong>Final Value:</strong> {{result}}</div>\n\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"result\" aria-label=\"Apply\">Apply</a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/temp/temp.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/shared/temp/temp.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"u-text--sc\">Temporary Modifiers</h4>\n<hr>\n\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col-2 u-pd--md\">\n        <select class=\"form-control\" [(ngModel)]=\"newModifier.affects\">\n            <option [ngValue]=\"null\">Select</option>\n            <option *ngFor=\"let modtarget of modifierTargets\" [ngValue]=\"modtarget\">\n                {{modtarget}}\n            </option>\n        </select>\n    </div>\n    <div class=\"col u-pd--md\">\n        <input type=\"number\" min=\"-10\" [(ngModel)]=\"newModifier.value\"\n            class=\"form-control\" placeholder=\"0\">\n    </div>\n    <button mat-flat-button color=\"accent\"\n        (click)=\"addModifier()\"\n        [disabled]=\"!newModifier.affects\">\n        Add\n    </button>\n</div>\n\n<br>\n\n<mat-chip-list class=\"u-sm\" [selectable]=\"false\">\n    <mat-chip *ngFor=\"let modifier of mods; let $index=index;\">\n        <strong>{{modifier.affects}}</strong> : {{modifier.value|modifier}}\n        <mat-icon class=\"mat-chip-remove mat-chip-trailing-icon mat-icon\" (click)=\"removeModifier($index)\">\n            cancel\n        </mat-icon>\n    </mat-chip>\n</mat-chip-list>\n\n<br>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/uses/uses.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/shared/uses/uses.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"m-grid flex-justify-between flex-align-center\">\n    <h4 class=\"u-text--sc flex-1\">Uses</h4>\n    <div class=\"m-grid flex-align-center gutter\">\n        <span>Reset: </span>\n        <button class=\"u-sm\" mat-raised-button color=\"accent\" (click)=\"reset('Turn')\">Turn</button>\n        <button class=\"u-sm\" mat-raised-button color=\"accent\" (click)=\"reset('Fight')\">Fight</button>\n        <button class=\"u-sm\" mat-raised-button color=\"accent\" (click)=\"reset('Adventure')\">Adventure</button>\n        <button class=\"u-sm\" mat-raised-button color=\"accent\" (click)=\"reset('Travel')\">Travel</button>\n    </div>\n</div>\n<hr>\n\n<!-- Abilities -->\n<div *ngFor=\"let ability of character?.abilities | hasUsage\" class=\"card\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n        [{{ability.usage}}]\n        <strong (click)=\"showDesc[ability.name]=!showDesc[ability.name]\">{{ability.name}}</strong>\n        <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"use(ability)\"\n            [disabled]=\"ability.used\">\n            use\n        </button>\n    </div>\n    <div *ngIf=\"showDesc[ability.name]\" class=\"u-sm\">{{ability.desc}}<br></div>\n</div>\n\n<!-- Items -->\n<div *ngFor=\"let item of character?.items | hasUsage\" class=\"card\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n        [{{item.usage}}]\n        <strong (click)=\"showDesc[item.name]=!showDesc[item.name]\">{{item.name}}</strong>\n        <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"use(item)\"\n            [disabled]=\"item.used\">\n            use\n        </button>\n    </div>\n    <div *ngIf=\"showDesc[item.name]\" class=\"u-sm\">{{item.description}}<br></div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/value-display/value-display.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/shared/value-display/value-display.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"vd\" [ngClass]=\"{'is-special':special}\">\n    <div class=\"vd__value\"\n        [ngClass]=\"{modified:isModified(),'u-sm':'sm'===options.valueSize}\"\n        (click)=\"openKeypad()\">\n        <span>{{computed}}</span>\n    </div>\n    <button type=\"button\" class=\"vd__incr\"\n        (click)=\"increment()\"\n        (ngDisabled)=\"!canAdjust || !canIncrement()\">\n        <mat-icon>add</mat-icon>\n    </button>\n    <button type=\"button\" class=\"vd__decr\"\n        (click)=\"decrement()\"\n        (ngDisabled)=\"!canAdjust || !canDecrement()\">\n        <mat-icon>remove</mat-icon>\n    </button>\n    <div class=\"vd__label\" [ngClass]=\"{'u-sm':'sm'===options.labelSize}\">\n        {{label}}\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/value-display/xp-value-display.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/shared/value-display/xp-value-display.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"vd\" [ngClass]=\"{'has-leveled':hasLeveled()}\">\n    <div class=\"vd__value\"\n        [ngClass]=\"{modified:isModified(), 'u-sm':'sm'===options.valueSize}\"\n        (click)=\"openKeypad()\">\n        <div>\n            <div class=\"m-grid flex-col flex-align-center no-pad\">\n                {{value}}\n                <div class=\"needed u-xs\">{{needed}}</div>\n            </div>\n        </div>\n    </div>\n    <button type=\"button\" class=\"vd__incr\" (click)=\"increment()\"\n        (ngDisabled)=\"!canAdjust || !canIncrement()\">\n        <mat-icon>add</mat-icon>\n    </button>\n    <button type=\"button\" class=\"vd__decr\" (click)=\"decrement()\"\n        (ngDisabled)=\"!canAdjust || !canDecrement()\">\n        <mat-icon>remove</mat-icon>\n    </button>\n    <div class=\"vd__label\" [ngClass]=\"{'u-sm':'sm'===options.labelSize}\">\n        {{label}}\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/sidebag/sidebag.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/sidebag/sidebag.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebag\">\n\n    <div class=\"m-grid gutter flex-align-start\">\n        <h4 class=\"col u-text--sc\">Sidebag</h4>\n        <!-- <div class=\"sidebag__carrying\">{{carrying}} / </div> -->\n        <div>\n            <sidebag-value-display\n                label=\"Capacity\"\n                [value]=\"sidebag.capacity\"\n                [weight]=\"carrying\"\n                [modifiers]=\"modifiers\"\n                [options]=\"{valueSize:'sm'}\"\n                (onSave)=\"updateCapacity($event)\">\n            </sidebag-value-display>\n        </div>\n    </div>\n    <br>\n\n    <div class=\"m-grid gutter\">\n        <div *ngFor=\"let option of options\" class=\"sidebag__option\">\n            <div class=\"sidebag__option__icon\">\n                <span class=\"sprite sprite-{{option.label}}\"></span>\n            </div>\n            <div class=\"flex-1\">\n                <label (click)=\"showDesc[option.label]=!showDesc[option.label]\">{{option.label}}</label>\n            </div>\n            <div class=\"sidebag__control\">\n                <button mat-flat-button color=\"warn\" (click)=\"decrease(option.label)\"\n                    (ngDisabled)=\"!sidebag[option.label]\">\n                    <mat-icon>remove</mat-icon>\n                </button>\n                <span>{{sidebag[option.label]||0}}</span>\n                <button mat-flat-button color=\"success\"\n                    (click)=\"increase(option.label)\"\n                    (ngDisabled)=\"!max\">\n                    <mat-icon>add</mat-icon>\n                </button>\n            </div>\n\n            <small class=\"help-block\" *ngIf=\"showDesc[option.label]\">\n                {{option.description}}\n            </small>\n\n        </div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/gambler-tricks/chooser/chooser.component.html":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/gambler-tricks/chooser/chooser.component.html ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Trick</h5>\n<div mat-dialog-content>\n    <div *ngFor=\"let trick of data?.options\"\n        class=\"c-option--available\"\n        (click)=\"choose(trick)\"\n        [ngClass]=\"{'is-selected':isChosen(trick)}\">\n        <div class=\"a-heading\">\n            <mat-icon>{{isChosen(trick)?'check_box':'check_box_outline_blank'}}</mat-icon>\n            {{trick.name}}\n        </div>\n        <div class=\"u-sm\">\n            <div>{{trick.desc}}</div>\n            <div class=\"col\" *ngIf=\"trick.requires\">\n                <strong>Requires</strong> <em>{{trick.requires}}</em>\n            </div>\n        </div>\n    </div>\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/gambler-tricks/gambler-tricks.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/gambler-tricks/gambler-tricks.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Gambler Tricks</div>\n    <button mat-flat-button color=\"primary\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n\n<hr>\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    Current Fortune: {{character.fortune.current}} / {{maxFortune}}\n    <button mat-flat-button color=\"accent\" (click)=\"resetFortune()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let trick of character.tricks; let i = index;\" class=\"card\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-end\">\n        <div class=\"a-heading\">\n            {{trick.name}}\n        </div>\n        <div class=\"a-special__cost--fortune\">{{trick.cost||0}}</div>\n    </div>\n    <!-- <br>\n    <div *ngIf=\"trick.cost\">\n        <strong>Cost: </strong> {{trick.cost}}\n    </div> -->\n    <div class=\"desc\">{{trick.desc}}</div>\n    <div *ngIf=\"trick.modifiers\">\n        <div *ngFor=\"let modifier of trick.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <hr>\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n        <div class=\"flex-1\">\n            <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                [disabled]=\"!hasFortune()\" (click)=\"spendFortune()\">\n                Use\n            </button>&nbsp;\n            <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                *ngIf=\"trick.xp\" (click)=\"gainXP(trick.xp)\">\n                +{{trick.xp}} XP\n            </button>\n        </div>\n        <div class=\"m-grid gutter flex-justify-end flex-align-end\">\n            <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                (click)=\"confirmingDelete(i,true)\"\n                *ngIf=\"!confirmingDelete(i)\">\n                <mat-icon>delete_forever</mat-icon>\n            </button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove(i)\"><mat-icon>check_circle</mat-icon></button>\n                <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete(i,false)\"><mat-icon>not_interested</mat-icon></button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/notes/notes.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/notes/notes.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\" u-text--sc\">Notes</h4>\n<textarea rows=\"20\" class=\"form-control\"\n    [(ngModel)]=\"notes\"\n    (ngModelChange)=\"onValueChange($event)\"\n    placeholder=\"Enter custom notes here\">\n</textarea>\n<button type=\"button\" class=\"btn--use\"\n    *ngIf=\"needsSaving\"\n    (click)=\"saveChanges()\">Save</button>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/orphan-missions/chooser/chooser.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/orphan-missions/chooser/chooser.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Trick</h5>\n<div mat-dialog-content>\n    <div *ngIf=\"!data ||!data.options.length\" class=\"c-option--available\">\n        <h5>None available</h5>\n    </div>\n    <div *ngFor=\"let mission of data?.options\"\n        class=\"c-option--available\"\n        (click)=\"choose(mission)\"\n        [ngClass]=\"{'is-selected':isChosen(mission)}\">\n        <div class=\"a-heading\">\n            <mat-icon>{{isChosen(mission)?'check_box':'check_box_outline_blank'}}</mat-icon>\n            {{mission.name}}\n        </div>\n        <div class=\"u-sm\">\n            <div>{{mission.desc}}</div>\n            <div class=\"col\" *ngIf=\"mission.requires\">\n                <strong>Requires</strong> <em>{{mission.requires}}</em>\n            </div>\n        </div>\n    </div>\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/orphan-missions/orphan-missions.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/orphan-missions/orphan-missions.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Orphan Missions</div>\n    <button mat-flat-button color=\"primary\" (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n\n<div *ngFor=\"let mission of character.missions;let i=index;\" class=\"card\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-end\">\n        <div class=\"a-heading\">{{mission.name}}</div>\n        <div class=\"m-grid gutter flex-justify-end flex-align-end\">\n            <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                (click)=\"confirmingDelete(i,true)\"\n                *ngIf=\"confirmingDelete(i)\">\n                <mat-icon>delete_forever</mat-icon>\n            </button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove(i)\"><mat-icon>check_circle</mat-icon></button>\n                <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete(i,false)\"><mat-icon>not_interested</mat-icon></button>\n            </div>\n        </div>\n    </div>\n    <div class=\"desc\">{{mission.desc}}</div>\n    <div *ngIf=\"mission.modifiers\">\n        <hr>\n        <div *ngFor=\"let modifier of mission.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <!--\n    <hr>\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn--use\" (click)=\"spendFury(mission.cost)\">Cast</button>\n    </div>\n    -->\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/preacher-sermons/chooser/chooser.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/preacher-sermons/chooser/chooser.component.html ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Sermon</h5>\n<div mat-dialog-content>\n    <div *ngFor=\"let sermon of options\"\n        class=\"c-option--available\"\n        [ngClass]=\"{'is-selected':isChosen(sermon)}\"\n        (click)=\"choose(sermon)\">\n\n        <div class=\"a-heading\">\n            <mat-icon>{{isChosen(sermon)?'check_box':'check_box_outline_blank'}}</mat-icon>\n            {{sermon.name}}\n            <span *ngIf=\"sermon.deadly\" class=\"icon-deadly\">!</span>\n        </div>\n        <div class=\"u-sm\">\n            <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                <div><strong>Check: </strong> [{{sermon.check}}+]</div>\n                <div><strong>Cost: </strong> {{sermon.cost}}</div>\n                <div><strong>XP: </strong> {{sermon.xp}}</div>\n            </div>\n            <div>{{sermon.desc}}</div>\n            <div class=\"col\" *ngIf=\"sermon.requires\">\n                <strong>Requires</strong> <em>{{sermon.requires}}</em>\n            </div>\n        </div>\n    </div>\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/preacher-sermons/sermon/sermon.component.html":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/preacher-sermons/sermon/sermon.component.html ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sermon\">\n\n    <div *ngIf=\"!isEditing\">\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"a-special__check\">{{sermon.check}}+</div>\n            <div class=\"flex-1 a-heading\">\n                <mat-icon *ngIf=\"sermon.deadly\" color=\"warn\">error</mat-icon>\n                {{sermon.name}}\n                <small>({{sermon.type}})</small>\n            </div>\n            <div class=\"a-special__cost--faith\">{{sermon.cost||\"0\"}}</div>\n        </div>\n\n        <div class=\"u-sm\"><strong>Range: </strong> {{sermon.range||\"Not specified\"}}</div>\n\n        <div class=\"u-sm\">\n            <div class=\"desc\">{{sermon.desc}}</div>\n        </div>\n\n        <hr>\n\n        <!-- if empty or not cast and insufficient -->\n        <div *ngIf=\"isInsufficient()\"> <em>Not enough faith to cast</em> </div>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n\n            <div class=\"flex-1\">\n\n                <!-- if not cast already and not empty or insufficient -->\n                <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                    *ngIf=\"canCast()\" (click)=\"use()\">\n                    cast\n                </button>\n\n                <!-- if cast but not empty -->\n                <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                    *ngIf=\"canSpendExtraFaith()\" (click)=\"spendExtraFaith()\">\n                    +faith\n                </button>\n\n                <!-- if cast but no applied xp -->\n                <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                    *ngIf=\"canApplyXP()\" (click)=\"applyXP()\">\n                    +{{sermon.xp}} XP\n                </button>\n\n            </div>\n\n            <div class=\"m-grid gutter flex-justify-end flex-align-end\">\n                <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"edit()\">\n                    <mat-icon>edit</mat-icon>\n                </button>\n                &nbsp;\n                <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                    (click)=\"confirmingDelete=true\"\n                    *ngIf=\"!confirmingDelete\">\n                    <mat-icon>delete_forever</mat-icon>\n                </button>\n                <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                    <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove()\"><mat-icon>check_circle</mat-icon></button>\n                    <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete=false\"><mat-icon>not_interested</mat-icon></button>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div *ngIf=\"isEditing\">\n        <div>\n            <label>Name</label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.name\"\n                placeholder=\"Name this sermon\">\n        </div>\n\n        <div>\n            <label>Cost</label>\n            <textarea rows=\"3\" class=\"form-control\" [(ngModel)]=\"editable.desc\">\n            </textarea>\n        </div>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <label>Deadly?\n                    <input type=\"checkbox\" [(ngModel)]=\"editable.deadly\">\n                </label>\n            </div>\n            <div class=\"col-2\">\n                <label>Type</label>\n                <select class=\"form-control\" [(ngModel)]=\"editable.type\">\n                    <option value=\"Blessing\">Blessing</option>\n                    <option value=\"Judgement\">Judgement</option>\n                </select>\n            </div>\n        </div>\n\n        <div>\n            <label>Range</label>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"editable.range\">\n        </div>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <label>Check</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.check\">\n            </div>\n\n            <div class=\"col\">\n                <label>Cost</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.cost\">\n            </div>\n\n            <div class=\"col\">\n                <label>XP</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.xp\">\n            </div>\n        </div>\n\n        <hr>\n\n        <div class=\"m-grid gutter flex-justify-between\">\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"cancelEditing()\">cancel</button>\n            <button class=\"u-sm\" mat-flat-button color=\"primary\" (click)=\"save()\">save</button>\n        </div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/preacher-sermons/sermons.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/preacher-sermons/sermons.component.html ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col\">Sermons</div>\n    <button mat-flat-button color=\"primary\" (click)=\"openChooser()\">New</button>\n</h4>\n\n<hr>\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    Faith: {{getAvailableFaith()}} / {{maxFaith+getFaithModifier()}}\n    <button mat-flat-button color=\"accent\" (click)=\"resetSermons()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let sermon of character.sermons\" class=\"card\">\n    <sermon [sermon]=\"sermon\"\n        [eventSubject]=\"eventSubject\"\n        (onEvent)=\"onEvent($event)\"\n        [availableFaith]=\"getAvailableFaith()\">\n    </sermon>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/samurai-tactics/chooser/chooser.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/samurai-tactics/chooser/chooser.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Trick</h5>\n<div mat-dialog-content>\n    <div *ngFor=\"let tactic of data?.options\"\n        class=\"c-option--available\"\n        (click)=\"choose(tactic)\"\n        [ngClass]=\"{'is-selected':isChosen(tactic)}\">\n        <div class=\"a-heading\">\n            <mat-icon>{{isChosen(tactic)?'check_box':'check_box_outline_blank'}}</mat-icon>\n            {{tactic.name}} ({{tactic.cost}} Fury)\n        </div>\n        <div class=\"u-sm\">\n            <div>{{tactic.desc}}</div>\n            <div class=\"col\" *ngIf=\"tactic.requires\">\n                <strong>Requires</strong> <em>{{tactic.requires}}</em>\n            </div>\n        </div>\n    </div>\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/samurai-tactics/samurai-tactics.component.html":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/samurai-tactics/samurai-tactics.component.html ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Samurai Battle Tactics</div>\n    <button mat-flat-button color=\"primary\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    Fury: {{character.fury.current}} / {{maxFury}}\n</div>\n<hr>\n\n<div *ngFor=\"let tactic of character.tactics;let i=index;\" class=\"card\">\n    <div class=\"m-grid gutter flex-justify-between flex-align-end\">\n        <div class=\"a-heading\">{{tactic.name}}  ({{tactic.type||'un-typed'}})</div>\n        <div class=\"m-grid gutter flex-justify-end flex-align-end\">\n            <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                (click)=\"confirmingDelete(i,true)\"\n                *ngIf=\"confirmingDelete(i)\">\n                <mat-icon>delete_forever</mat-icon>\n            </button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove(i)\"><mat-icon>check_circle</mat-icon></button>\n                <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete(i,false)\"><mat-icon>not_interested</mat-icon></button>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"tactic.cost\">\n        <strong>Cost: </strong> {{tactic.cost}}\n    </div>\n    <div class=\"desc\">{{tactic.desc}}</div>\n    <div *ngIf=\"tactic.modifiers\">\n        <div *ngFor=\"let modifier of tactic.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <hr>\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n        <button class=\"u-sm\" mat-flat-button color=\"accent\"\n            (click)=\"spendFury(tactic.cost)\">Cast</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/shaman-spells/chooser/chooser.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/shaman-spells/chooser/chooser.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h5 mat-dialog-title>Choose Trick</h5>\n<div mat-dialog-content>\n    <div *ngFor=\"let spell of data?.options\"\n        class=\"c-option--available\"\n        (click)=\"choose(spell)\"\n        [ngClass]=\"{'is-selected':isChosen(spell)}\">\n        <div class=\"a-heading\">\n            <mat-icon>{{isChosen(spell)?'check_box':'check_box_outline_blank'}}</mat-icon>\n            {{spell.name}}\n        </div>\n        <div class=\"u-sm\">\n            <div>{{spell.desc}}</div>\n            <div class=\"col\" *ngIf=\"spell.requires\">\n                <strong>Requires</strong> <em>{{spell.requires}}</em>\n            </div>\n        </div>\n    </div>\n</div>\n<div mat-dialog-actions class=\"m-grid gutter flex-justify-end flex-align-center\">\n    <a mat-flat-button color=\"accent\" (click)=\"close()\" aria-label=\"Close\">Cancel</a>\n    &nbsp;&nbsp;&nbsp;\n    <a mat-flat-button color=\"primary\" [mat-dialog-close]=\"selection\"\n        aria-label=\"Apply\"\n        [disabled]=\"!selection\">\n        Apply\n    </a>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/shaman-spells/shaman-spells.component.html":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/shaman-spells/shaman-spells.component.html ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Shaman Spells</div>\n    <button mat-flat-button color=\"primary\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    Current Magik: {{character.magik.current}} / {{maxMagik}}\n    <button mat-flat-button color=\"accent\" (click)=\"resetMagik()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let spell of character.spells;let index=$index\" class=\"card\">\n    <shaman-spell [spell]=\"spell\"\n        [magik]=\"character.magik.current\"\n        (onEvent)=\"onSpellEvent($event)\">\n    </shaman-spell>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/shaman-spells/spell.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/shaman-spells/spell.component.html ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"m-grid gutter flex-justify-between flex-align-end\">\n        <div class=\"a-special__check\">{{spell.power||'*'}}+</div>\n        <div class=\"a-heading flex-1\">{{spell.name}}</div>\n    </div>\n\n    <!-- <br>\n    <div class=\"u-sm\">\n        <strong>Power Roll: </strong> {{spell.power||'*'}}+\n    </div> -->\n    <div *ngIf=\"status\">{{status}} (Rolled {{roll}})</div>\n\n    <br>\n    <div class=\"desc u-sm\">{{spell.desc}}</div>\n    <div *ngIf=\"spell.modifiers\">\n        <div *ngFor=\"let modifier of spell.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <hr>\n\n    <div class=\"col m-grid gutter flex-justify-start flex-align-center u-sm\">\n        <select class=\"form-control\" [(ngModel)]=\"magikSpent\">\n            <option value=\"0\">Spend Add'l Magik</option>\n            <option value=\"1\" [disabled]=\"!hasMagik()\">1</option>\n            <option value=\"2\" [disabled]=\"!hasMagik(2)\">2</option>\n            <option value=\"3\" [disabled]=\"!hasMagik(3)\">3</option>\n            <option value=\"4\" [disabled]=\"!hasMagik(4)\">4</option>\n            <option value=\"5\" [disabled]=\"!hasMagik(5)\">5</option>\n        </select>\n        <button class=\"u-sm\" mat-flat-button color=\"accent\" [disabled]=\"!hasMagik()\" (click)=\"spendMagik()\">\n            <mat-icon>check_circle</mat-icon>\n        </button>\n    </div>\n    <hr>\n    <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n        <div class=\"flex-1\">\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"castSpell()\">Cast</button>&nbsp;\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" *ngIf=\"spell.xp\" (click)=\"gainXP()\">{{spell.xp}} XP</button>\n        </div>\n        <div class=\"m-grid gutter flex-justify-end flex-align-end\">\n            <button mat-flat-button color=\"warn\" class=\"u-sm\" (click)=\"confirmingDelete=true\">\n                <mat-icon>delete_forever</mat-icon>\n            </button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                <button mat-flat-button color=\"warn\" class=\"u-sm\" (click)=\"remove()\"><mat-icon>check_circle</mat-icon></button>\n                <button mat-flat-button color=\"accent\" class=\"u-sm\" (click)=\"confirmingDelete=false\"><mat-icon>not_interested</mat-icon></button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/sorcerer-magik/chooser/chooser.component.html":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/sorcerer-magik/chooser/chooser.component.html ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngFor=\"let spell of options\"\n            class=\"c-option--available\"\n            [ngClass]=\"{'is-selected':isChosen(spell)}\">\n\n            <h5 class=\"m-grid gutter flex-justify-between flex-align-center\">\n                <div>\n                    {{spell.name}}\n                    <span *ngIf=\"spell.deadly\"  class=\"icon-deadly\">!</span>\n                </div>\n                ({{spell.type}})\n            </h5>\n            <div class=\"u-sm\">\n                <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n                    <div><strong>Check: </strong> [{{spell.check}}+]</div>\n                    <div><strong>Cost: </strong> {{spell.cost}}</div>\n                    <div><strong>XP: </strong> {{spell.xp}}</div>\n                </div>\n                <div>{{spell.desc}}</div>\n                <div class=\"col\" *ngIf=\"spell.requires\">\n                    <strong>Requires</strong> <em>{{spell.requires}}</em>\n                </div>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!spell.disabled\"\n                (click)=\"choose(spell)\">\n                <span>{{isChosen(spell)?'Unselect':'Choose'}}</span>\n            </button>\n\n        </div>\n    </div>\n    <div class=\"m-grid gutter flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/sorcerer-magik/magik.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/sorcerer-magik/magik.component.html ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\" u-text--sc\">Elemental Magik</div>\n    <button mat-flat-button color=\"primary\" (click)=\"openChooser()\">New</button>\n</h4>\n\n<hr>\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"flex-1\">\n        <strong>Mana:</strong>\n        {{getAvailableMana()}} / {{maxMana+getManaModifier()}}  [+{{modifiersMana?.value||0}}]\n    </div>\n    <button class=\"u-sm\" mat-raised-button color=\"accent\" (click)=\"reset()\">Reset</button>\n</div>\n<hr>\n<div class=\"m-grid gutter flex-justify-between flex-align-center\">\n    <div class=\"flex-1\">\n        <strong>Arcane Powder:</strong>\n        {{arcanePowder}} / {{arcanePowderMax}} [+{{modifiersArcanePowder?.value||0}}]\n    </div>\n    <button class=\"u-sm\" mat-raised-button color=\"accent\"\n        (click)=\"useArcanePowder()\" *ngIf=\"arcanePowder>0\">Use</button>\n    <button class=\"u-sm\" mat-raised-button color=\"accent\"\n        (click)=\"resetArcanePowder()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let magik of character.elementalMagik\" class=\"card\">\n    <magik [spell]=\"magik\" [focus]=\"focusType\"\n        [eventSubject]=\"eventSubject\"\n        [availableMana]=\"getAvailableMana()\"\n        [arcanePowder]=\"arcanePowder\"\n        (onEvent)=\"onEvent($event)\">\n    </magik>\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/sorcerer-magik/spell/spell.component.html":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/special/sorcerer-magik/spell/spell.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"spell\">\n\n    <div *ngIf=\"!isEditing\">\n\n        <div class=\"no-pad m-grid flex-justify-between flex-align-start\">\n            <div class=\"a-special__check\">{{getCastCheck()}}</div>\n            <div class=\"flex-1 a-heading\">\n                <mat-icon *ngIf=\"spell.deadly\" color=\"warn\">error</mat-icon>\n                <span (click)=\"isCollapsed=!isCollapsed\">{{spell.name}}</span>\n                <small>&nbsp;({{spell.type}})</small>\n            </div>\n            <div class=\"a-special__range\">\n                <mat-icon>double_arrow</mat-icon>\n                {{spell.range||\"-\"}}\n            </div>\n            <div class=\"a-special__cost--mana\">{{spell.cost||\"0\"}}</div>\n        </div>\n\n        <div class=\"desc u-sm\" [ngClass]=\"{'is-hidden':isCollapsed}\">{{spell.desc}}</div>\n\n        <hr>\n\n        <div class=\"no-pad m-grid flex-justify-between flex-align-end\">\n\n            <div class=\"flex-1\">\n                <!-- if not cast already and not empty or insufficient -->\n                <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                    *ngIf=\"canCast()\" (click)=\"use()\">Cast</button>\n\n                <!-- if cast but not empty -->\n                <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                    *ngIf=\"canSpendPowder()\"\n                    (click)=\"spendArcanePowder()\">+powder</button>\n\n                <!-- if cast but no applied xp -->\n                <button class=\"u-sm\" mat-flat-button color=\"accent\"\n                    *ngIf=\"canApplyXP()\" (click)=\"applyXP()\">\n                    + {{spell.xp}} XP\n                </button>\n\n                <!-- if empty or not cast and insufficient -->\n                <span *ngIf=\"isInsufficient()\">\n                    <em>not enough mana</em>\n                </span>\n            </div>\n\n            <div class=\"no-pad flex-1 m-grid flex-justify-end flex-align-end\">\n\n                <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"edit()\">\n                    <mat-icon>edit</mat-icon>\n                </button>\n                &nbsp;&nbsp;&nbsp;\n                <button class=\"u-sm\" mat-flat-button color=\"warn\"\n                    (click)=\"confirmingDelete=true\"\n                    *ngIf=\"!confirmingDelete\">\n                    <mat-icon>delete_forever</mat-icon>\n                </button>\n                <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                    <button class=\"u-sm\" mat-flat-button color=\"warn\" (click)=\"remove()\"><mat-icon>check_circle</mat-icon></button>\n                    <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"confirmingDelete=false\"><mat-icon>not_interested</mat-icon></button>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div *ngIf=\"isEditing\">\n        <div>\n            <label>Name</label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.name\"\n                placeholder=\"Name this spell\">\n        </div>\n\n        <div>\n            <label>Cost</label>\n            <textarea rows=\"3\" class=\"form-control\" [(ngModel)]=\"editable.desc\">\n            </textarea>\n        </div>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <label>Deadly?\n                    <input type=\"checkbox\" [(ngModel)]=\"editable.deadly\">\n                </label>\n            </div>\n            <div class=\"col-2\">\n                <label>Type</label>\n                <select class=\"form-control\" [(ngModel)]=\"editable.type\">\n                    <option value=\"Earth\">Earth</option>\n                    <option value=\"Fire\">Fire</option>\n                    <option value=\"Water\">Water</option>\n                    <option value=\"Wind\">Wind</option>\n                </select>\n            </div>\n        </div>\n\n        <div>\n            <label>Range</label>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"editable.range\">\n        </div>\n\n        <div class=\"m-grid gutter flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <label>Check</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.check\">\n            </div>\n\n            <div class=\"col\">\n                <label>Cost</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.cost\">\n            </div>\n\n            <div class=\"col\">\n                <label>XP</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.xp\">\n            </div>\n        </div>\n\n        <hr>\n\n        <div class=\"m-grid gutter flex-justify-between\">\n            <button class=\"u-sm\" mat-flat-button color=\"accent\" (click)=\"cancelEditing()\">cancel</button>\n            <button class=\"u-sm\" mat-flat-button color=\"primary\" (click)=\"save()\">save</button>\n        </div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/upload/upload.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/node_modules/raw-loader!./src/app/upload/upload.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <br><br>\n\n    <div *ngIf=\"status\">\n        <h5 *ngIf=\"'error'===status.type\">An Error Occurred</h5>\n        <h5 *ngIf=\"'success'===status.type\">Success</h5>\n        {{status.message}}\n    </div>\n\n    <!-- <textarea class=\"form-control\" rows=\"10\"\n        placeholder=\"paste character JSON here\"\n        [(ngModel)]=\"charJSON\">\n    </textarea>\n    <button type=\"button\" (click)=\"uploadChar()\">Upload</button> -->\n\n    <div class=\"c-list\">\n        <header>\n            <h5>My Old Characters</h5>\n            <p>The following characters can be imported into the new database</p>\n        </header>\n        <div *ngFor=\"let char of chars | async\" class=\"c-list__item\">\n            <div>{{char.name}}</div>\n            <button type=\"button\" class=\"btn u-sm\" (click)=\"importChar(char.json, char.name)\">Import</button>\n        </div>\n    </div>\n\n\n    <hr>\n    <!-- <button type=\"button\" (click)=\"initClasses()\">Init</button> -->\n    <!-- <button type=\"button\" (click)=\"exportDB()\">Export</button> -->\n    <!-- <button type=\"button\" (click)=\"exportClasses()\">Export Data</button> -->\n\n\n</div>\n"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/abilities/abilities.component.less":
/*!****************************************************!*\
  !*** ./src/app/abilities/abilities.component.less ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 0em 0em 1em;\n}\n@media (min-width: 1024px) {\n  padding: 0.5em 1em;\n}\n.c-ability--available {\n  padding: 1em 0.5em;\n  border-bottom: 1px solid #ddd;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n.ability {\n  display: -webkit-box;\n  display: flex;\n  background: rgba(255, 255, 255, 0.75);\n  margin: 0.5em 0;\n  padding: 0.5em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  border-radius: 4px;\n  font-size: 0.875em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYWJpbGl0aWVzL2FiaWxpdGllcy5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvYWJpbGl0aWVzL2FiaWxpdGllcy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QUNBSjtBREdBO0VBQ0ksa0JBQUE7QUNESjtBRElBO0VBQ0ksa0JBQUE7RUFDQSw2QkFBQTtBQ0ZKO0FETUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0pKO0FEUUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0Esd0NBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQ05KIiwiZmlsZSI6InNyYy9hcHAvYWJpbGl0aWVzL2FiaWxpdGllcy5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDBlbSAwZW0gMWVtO1xufVxuXG5AbWVkaWEobWluLXdpZHRoOjEwMjRweCkge1xuICAgIHBhZGRpbmc6IDAuNWVtIDFlbTtcbn1cblxuLmMtYWJpbGl0eS0tYXZhaWxhYmxlIHtcbiAgICBwYWRkaW5nOiAxZW0gMC41ZW07XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG59XG5cblxuLmNhcmQgLmRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICBjb2xvcjogIzU1NTtcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuXG5cbi5hYmlsaXR5IHtcbiAgICBkaXNwbGF5ICAgICA6IGZsZXg7XG4gICAgYmFja2dyb3VuZCAgOiByZ2JhKDI1NSwyNTUsMjU1LDAuNzUpO1xuICAgIG1hcmdpbiAgICAgIDogMC41ZW0gMDtcbiAgICBwYWRkaW5nICAgICA6IDAuNWVtO1xuICAgIGJveC1zaGFkb3cgIDogMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4yKTtcbiAgICB3aWR0aCAgICAgICA6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGZvbnQtc2l6ZSAgIDogMC44NzVlbTtcbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHBhZGRpbmc6IDBlbSAwZW0gMWVtO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDEwMjRweCkge1xuICBwYWRkaW5nOiAwLjVlbSAxZW07XG59XG4uYy1hYmlsaXR5LS1hdmFpbGFibGUge1xuICBwYWRkaW5nOiAxZW0gMC41ZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xufVxuLmNhcmQgLmRlc2Mge1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGNvbG9yOiAjNTU1O1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuLmFiaWxpdHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xuICBtYXJnaW46IDAuNWVtIDA7XG4gIHBhZGRpbmc6IDAuNWVtO1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODc1ZW07XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/abilities/abilities.component.ts":
/*!**************************************************!*\
  !*** ./src/app/abilities/abilities.component.ts ***!
  \**************************************************/
/*! exports provided: AbilitiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbilitiesComponent", function() { return AbilitiesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/abilities/chooser/chooser.component.ts");





let AbilitiesComponent = class AbilitiesComponent {
    constructor(afs, dialog) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.confirming = {};
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.character = null;
        this.afs = null;
    }
    add(ability) {
        this.character.abilities.push(ability);
        this.onSave.emit({});
    }
    remove(index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.abilities.splice(index, 1);
            this.onSave.emit({});
        }
    }
    getChooserOptions() {
        let takenNames = this.character.abilities.map(a => a.name);
        return this.afs.getAbilities(this.character.classId)
            .then((abilities) => {
            let paths = [];
            let rolled = [];
            let rest = [];
            let hasChosenPath = false;
            abilities.forEach(a => {
                if ('starting' === a.type) {
                    //starting path abilities...
                    paths.push(a);
                    //note if the user has already selected a
                    // starting path ability... and see below why
                    if (takenNames.indexOf(a.name) >= 0) {
                        hasChosenPath = true;
                    }
                }
                else if (a.roll !== undefined || a.multi === true) {
                    //rolled abilities when leveling up
                    rolled.push(a);
                }
                else if (!a.multi && takenNames.indexOf(a.name) < 0) {
                    //mark those requiring unselected abilities as disabled
                    if (a.requires && takenNames.indexOf(a.requires) < 0)
                        a.disabled = true;
                    rest.push(a);
                }
            });
            //if a starting path has been chosen already,
            // then we won't bother sending any path ability options
            if (hasChosenPath)
                paths = [];
            return {
                paths: paths,
                rolled: rolled,
                rest: rest
            };
        });
    }
    getAvailable() {
        let takenNames = this.character.abilities.map(a => a.name);
        return this.afs.getAbilities(this.character.classId).then((abilities) => {
            return abilities.
                filter(a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return a.multi === true || takenNames.indexOf(a.name) < 0;
            }).
                map(a => {
                //mark those requiring unselected abilities as disabled
                if (a.requires && takenNames.indexOf(a.requires) < 0)
                    a.disabled = true;
                return a;
            });
        });
    }
    openChooser() {
        this.getChooserOptions().then(options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["AbilityChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
        // const ref = this.modalService.createComponentRef(AbilityChooserComponent);
        // ref.instance.abilities = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as Ability);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        //
        // // this.getAvailable().then( options => {
        // //     ref.instance.abilities = options;
        // // });
        // this.getChooserOptions().then( options => {
        //     ref.instance.options = options;
        // })
    }
    confirmingDelete(index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    }
    onEvent($event) {
        let type = $event.type;
        let position = $event.index;
        switch (type) {
            case 'ability.remove':
                this.remove(position);
                break;
            case 'ability.update':
                let ability = $event.value;
                this.character.abilities[position] = ability;
                this.onSave.emit({});
                break;
        }
    }
};
AbilitiesComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], AbilitiesComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], AbilitiesComponent.prototype, "onSave", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], AbilitiesComponent.prototype, "onError", void 0);
AbilitiesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'abilities',
        template: __webpack_require__(/*! raw-loader!./abilities.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/abilities/abilities.component.html"),
        styles: [__webpack_require__(/*! ./abilities.component.less */ "./src/app/abilities/abilities.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], AbilitiesComponent);



/***/ }),

/***/ "./src/app/abilities/ability/ability.component.less":
/*!**********************************************************!*\
  !*** ./src/app/abilities/ability/ability.component.less ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n.ability {\n  display: -webkit-box;\n  display: flex;\n  background: rgba(255, 255, 255, 0.75);\n  margin: 0.5em 0;\n  padding: 0.5em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  border-radius: 4px;\n  font-size: 0.875em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYWJpbGl0aWVzL2FiaWxpdHkvYWJpbGl0eS5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvYWJpbGl0aWVzL2FiaWxpdHkvYWJpbGl0eS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDQUo7QURJQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHFDQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSx3Q0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FDRkoiLCJmaWxlIjoic3JjL2FwcC9hYmlsaXRpZXMvYWJpbGl0eS9hYmlsaXR5LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG5cblxuLmFiaWxpdHkge1xuICAgIGRpc3BsYXkgICAgIDogZmxleDtcbiAgICBiYWNrZ3JvdW5kICA6IHJnYmEoMjU1LDI1NSwyNTUsMC43NSk7XG4gICAgbWFyZ2luICAgICAgOiAwLjVlbSAwO1xuICAgIHBhZGRpbmcgICAgIDogMC41ZW07XG4gICAgYm94LXNoYWRvdyAgOiAwIDFweCAzcHggcmdiYSgwLDAsMCwwLjIpO1xuICAgIHdpZHRoICAgICAgIDogMTAwJTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgZm9udC1zaXplICAgOiAwLjg3NWVtO1xufVxuIiwiLmNhcmQgLmRlc2Mge1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGNvbG9yOiAjNTU1O1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuLmFiaWxpdHkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xuICBtYXJnaW46IDAuNWVtIDA7XG4gIHBhZGRpbmc6IDAuNWVtO1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODc1ZW07XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/abilities/ability/ability.component.ts":
/*!********************************************************!*\
  !*** ./src/app/abilities/ability/ability.component.ts ***!
  \********************************************************/
/*! exports provided: AbilityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbilityComponent", function() { return AbilityComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _models_character_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/character.model */ "./src/app/models/character.model.ts");



let AbilityComponent = class AbilityComponent {
    constructor() {
        this.index = -1;
        this.onEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.editable = null;
        this.confirming = false;
        this.editing = false;
        this.newModifier = { affects: null, value: 0 };
        this.modifierTargets = _models_character_model__WEBPACK_IMPORTED_MODULE_2__["ModifierTargets"];
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.confirming = false;
        this.editing = false;
    }
    remove() {
        this.confirming = false;
        this.onEvent.emit({ type: 'ability.remove', index: this.index, value: this.ability });
    }
    edit() {
        this.editable = JSON.parse(JSON.stringify(this.ability));
        this.editable.modifiers = this.editable.modifiers || [];
        this.editing = true;
    }
    save() {
        this.editing = false;
        this.onEvent.emit({ type: 'ability.update', index: this.index, value: this.editable });
    }
    addModifier() {
        this.editable.modifiers.push(Object.assign({}, this.newModifier));
        //reset new modifier value
        this.newModifier.affects = null;
        this.newModifier.value = 0;
    }
    removeModifier(index) {
        this.editable.modifiers.splice(index, 1);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], AbilityComponent.prototype, "ability", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], AbilityComponent.prototype, "index", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], AbilityComponent.prototype, "onEvent", void 0);
AbilityComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'ability',
        template: __webpack_require__(/*! raw-loader!./ability.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/abilities/ability/ability.component.html"),
        styles: [__webpack_require__(/*! ./ability.component.less */ "./src/app/abilities/ability/ability.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], AbilityComponent);



/***/ }),

/***/ "./src/app/abilities/chooser/chooser.component.less":
/*!**********************************************************!*\
  !*** ./src/app/abilities/chooser/chooser.component.less ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n.c-ability--group {\n  min-width: 400px;\n}\n.c-ability--heading {\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 0.5em 0.5em;\n  margin-bottom: -1px;\n  border: 1px solid #bbb;\n  background: #ddd;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.c-ability--available {\n  padding: 1em 0.5em;\n  border-bottom: 1px solid #ddd;\n}\n.c-ability--available.is-selected {\n  background-color: #3267dd;\n  color: #fff;\n}\n.c-ability--available p {\n  font-size: 0.875em;\n  margin-bottom: 0.5em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYWJpbGl0aWVzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvYWJpbGl0aWVzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtBQ0FKO0FER0E7RUFDSSxnQkFBQTtBQ0RKO0FES0E7RUFDSSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ0hKO0FES0E7RUFDSSxrQkFBQTtFQUNBLDZCQUFBO0FDSEo7QURLSTtFQUNJLHlCQUFBO0VBQ0EsV0FBQTtBQ0hSO0FESEE7RUFVUSxrQkFBQTtFQUNBLG9CQUFBO0FDSlIiLCJmaWxlIjoic3JjL2FwcC9hYmlsaXRpZXMvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiXG46aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWF4LXdpZHRoOiA0MDBweDtcbn1cblxuLmMtYWJpbGl0eS0tZ3JvdXAge1xuICAgIG1pbi13aWR0aDogNDAwcHg7XG59XG5cblxuLmMtYWJpbGl0eS0taGVhZGluZyB7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIHBhZGRpbmc6IDAuNWVtIDAuNWVtO1xuICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcbiAgICBiYWNrZ3JvdW5kOiAjZGRkO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYy1hYmlsaXR5LS1hdmFpbGFibGUge1xuICAgIHBhZGRpbmc6IDFlbSAwLjVlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcblxuICAgICYuaXMtc2VsZWN0ZWQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI2N2RkO1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG5cbiAgICBwIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgICB9XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuLmMtYWJpbGl0eS0tZ3JvdXAge1xuICBtaW4td2lkdGg6IDQwMHB4O1xufVxuLmMtYWJpbGl0eS0taGVhZGluZyB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIHBhZGRpbmc6IDAuNWVtIDAuNWVtO1xuICBtYXJnaW4tYm90dG9tOiAtMXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xuICBiYWNrZ3JvdW5kOiAjZGRkO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYy1hYmlsaXR5LS1hdmFpbGFibGUge1xuICBwYWRkaW5nOiAxZW0gMC41ZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xufVxuLmMtYWJpbGl0eS0tYXZhaWxhYmxlLmlzLXNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMyNjdkZDtcbiAgY29sb3I6ICNmZmY7XG59XG4uYy1hYmlsaXR5LS1hdmFpbGFibGUgcCB7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC41ZW07XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/abilities/chooser/chooser.component.ts":
/*!********************************************************!*\
  !*** ./src/app/abilities/chooser/chooser.component.ts ***!
  \********************************************************/
/*! exports provided: AbilityChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbilityChooserComponent", function() { return AbilityChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let AbilityChooserComponent = class AbilityChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        // @Input() options : {
        //     paths: Ability[];
        //     rolled: Ability[];
        //     rest: Ability[];
        // };
        // @Input() abilities : Ability[];
        // @Input() closable = true;
        // @Input() visible: boolean = true;
        // @Output() onClose: Function;
        this.selection = null;
        this.groupToggles = {
            paths: false,
            rolled: false,
            rest: false
        };
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        // this.abilities = null;
        this.selection = null;
        // this.closable = false;
        // this.visible = false;
        // this.onClose = null;
    }
    // close() {
    //     this.visible = false;
    //     this.onClose({apply:false,value:null});
    // }
    //
    // apply() {
    //     this.visible = false;
    //
    //     //move ".value" to ".desc" for chosen abilities
    //     let value : Ability = JSON.parse(JSON.stringify(this.selection));
    //     value.desc = this.selection.value;
    //     delete value.value;
    //
    //     this.onClose({ apply:true, value:value });
    // }
    choose(ability) {
        if (!ability || ability.disabled)
            return;
        if (this.isChosen(ability))
            this.selection = null;
        else {
            if (ability.desc)
                this.selection = ability;
            else {
                let value = JSON.parse(JSON.stringify(ability));
                value.desc = ability.value;
                delete value.value;
                this.selection = value;
            }
        }
    }
    isChosen(ability) {
        return this.selection && this.selection.name === ability.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
AbilityChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
AbilityChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'ability-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/abilities/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/abilities/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], AbilityChooserComponent);



/***/ }),

/***/ "./src/app/app.component.less":
/*!************************************!*\
  !*** ./src/app/app.component.less ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: stretch;\n          align-items: stretch;\n}\n.a-brand {\n  -webkit-box-flex: 1;\n          flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mat-toolbar-row,\n.mat-toolbar-single-row {\n  padding-left: 0;\n}\nheader {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  border-bottom: 1px solid #000;\n  background: #fff;\n  padding: 0.25em 1em;\n  z-index: 9999;\n}\nheader > h5 {\n  margin: 0;\n}\nmain {\n  overflow-y: auto;\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n@media (min-width: 300px) {\n  header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 36px;\n    -webkit-transition: height 0.3s linear;\n    transition: height 0.3s linear;\n  }\n  header > h5 {\n    padding: 0.25em;\n  }\n  header:hover {\n    height: 60px;\n  }\n  main {\n    height: 100%;\n    overflow-y: hidden;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsMEJBQUE7VUFBQSxvQkFBQTtBQ0FKO0FER0E7RUFDSSxtQkFBQTtVQUFBLE9BQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FDREo7QURJQTs7RUFDSSxlQUFBO0FDREo7QURLQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQ0hKO0FES0k7RUFDSSxTQUFBO0FDSFI7QURRQTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7VUFBQSxPQUFBO0FDTko7QURTQTtFQUNJO0lBQ0ksa0JBQUE7SUFDQSxNQUFBO0lBQ0EsT0FBQTtJQUNBLFFBQUE7SUFDQSxZQUFBO0lBQ0Esc0NBQUE7SUFBQSw4QkFBQTtFQ1BOO0VEU007SUFBUyxlQUFBO0VDTmY7RURRTTtJQUNJLFlBQUE7RUNOVjtFRFVFO0lBQ0ksWUFBQTtJQUNBLGtCQUFBO0VDUk47QUFDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG59XG5cbi5hLWJyYW5kIHtcbiAgICBmbGV4OiAxO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5tYXQtdG9vbGJhci1yb3csIC5tYXQtdG9vbGJhci1zaW5nbGUtcm93IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG59XG5cblxuaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAwO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgcGFkZGluZzogMC4yNWVtIDFlbTtcbiAgICB6LWluZGV4OiA5OTk5O1xuXG4gICAgJiA+IGg1IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbn1cblxuXG5tYWluIHtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGZsZXg6IDE7XG59XG5cbkBtZWRpYShtaW4td2lkdGg6MzAwcHgpIHtcbiAgICBoZWFkZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGhlaWdodDogMzZweDtcbiAgICAgICAgdHJhbnNpdGlvbjogaGVpZ2h0IDAuM3MgbGluZWFyO1xuXG4gICAgICAgICYgPiBoNSB7IHBhZGRpbmc6IDAuMjVlbTsgfVxuXG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFpbiB7XG4gICAgICAgIGhlaWdodDoxMDAlO1xuICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gICAgfVxufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xufVxuLmEtYnJhbmQge1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cbi5tYXQtdG9vbGJhci1yb3csXG4ubWF0LXRvb2xiYXItc2luZ2xlLXJvdyB7XG4gIHBhZGRpbmctbGVmdDogMDtcbn1cbmhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDA7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHBhZGRpbmc6IDAuMjVlbSAxZW07XG4gIHotaW5kZXg6IDk5OTk7XG59XG5oZWFkZXIgPiBoNSB7XG4gIG1hcmdpbjogMDtcbn1cbm1haW4ge1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBmbGV4OiAxO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDMwMHB4KSB7XG4gIGhlYWRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogMzZweDtcbiAgICB0cmFuc2l0aW9uOiBoZWlnaHQgMC4zcyBsaW5lYXI7XG4gIH1cbiAgaGVhZGVyID4gaDUge1xuICAgIHBhZGRpbmc6IDAuMjVlbTtcbiAgfVxuICBoZWFkZXI6aG92ZXIge1xuICAgIGhlaWdodDogNjBweDtcbiAgfVxuICBtYWluIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./firestore.service */ "./src/app/firestore.service.ts");



let AppComponent = class AppComponent {
    constructor(service) {
        this.service = service;
        this.title = 'Brimstone Chars v2';
        this.userSubscription = service.user.subscribe(user => {
            this.user = user;
        });
    }
    logout() {
        this.service.logout();
    }
};
AppComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.less */ "./src/app/app.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: UsagePipe, ModifierPipe, MimGroupFilterPipe, SumFilterPipe, JoinPipe, OrderByPipe, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsagePipe", function() { return UsagePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierPipe", function() { return ModifierPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MimGroupFilterPipe", function() { return MimGroupFilterPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SumFilterPipe", function() { return SumFilterPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoinPipe", function() { return JoinPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderByPipe", function() { return OrderByPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modal.service */ "./src/app/modal.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire */ "./node_modules/@angular/fire/es2015/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/es2015/index.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/database/es2015/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _charlist_charlist_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./charlist/charlist.component */ "./src/app/charlist/charlist.component.ts");
/* harmony import */ var _character_character_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./character/character.component */ "./src/app/character/character.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/upload/upload.component.ts");
/* harmony import */ var _abilities_abilities_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./abilities/abilities.component */ "./src/app/abilities/abilities.component.ts");
/* harmony import */ var _abilities_ability_ability_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./abilities/ability/ability.component */ "./src/app/abilities/ability/ability.component.ts");
/* harmony import */ var _abilities_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./abilities/chooser/chooser.component */ "./src/app/abilities/chooser/chooser.component.ts");
/* harmony import */ var _items_items_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./items/items.component */ "./src/app/items/items.component.ts");
/* harmony import */ var _items_item_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./items/item.component */ "./src/app/items/item.component.ts");
/* harmony import */ var _mim_mim_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./mim/mim.component */ "./src/app/mim/mim.component.ts");
/* harmony import */ var _shared_value_display_value_display_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./shared/value-display/value-display.component */ "./src/app/shared/value-display/value-display.component.ts");
/* harmony import */ var _shared_keypad_keypad_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./shared/keypad/keypad.component */ "./src/app/shared/keypad/keypad.component.ts");
/* harmony import */ var _attacks_attacks_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./attacks/attacks.component */ "./src/app/attacks/attacks.component.ts");
/* harmony import */ var _attacks_attack_attack_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./attacks/attack/attack.component */ "./src/app/attacks/attack/attack.component.ts");
/* harmony import */ var _sidebag_sidebag_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./sidebag/sidebag.component */ "./src/app/sidebag/sidebag.component.ts");
/* harmony import */ var _special_preacher_sermons_sermons_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./special/preacher-sermons/sermons.component */ "./src/app/special/preacher-sermons/sermons.component.ts");
/* harmony import */ var _special_preacher_sermons_sermon_sermon_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./special/preacher-sermons/sermon/sermon.component */ "./src/app/special/preacher-sermons/sermon/sermon.component.ts");
/* harmony import */ var _special_preacher_sermons_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./special/preacher-sermons/chooser/chooser.component */ "./src/app/special/preacher-sermons/chooser/chooser.component.ts");
/* harmony import */ var _items_editor_editor_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./items/editor/editor.component */ "./src/app/items/editor/editor.component.ts");
/* harmony import */ var _avatar_avatar_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./avatar/avatar.component */ "./src/app/avatar/avatar.component.ts");
/* harmony import */ var _faction_faction_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./faction/faction.component */ "./src/app/faction/faction.component.ts");
/* harmony import */ var _faction_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./faction/chooser/chooser.component */ "./src/app/faction/chooser/chooser.component.ts");
/* harmony import */ var _special_shaman_spells_shaman_spells_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./special/shaman-spells/shaman-spells.component */ "./src/app/special/shaman-spells/shaman-spells.component.ts");
/* harmony import */ var _special_shaman_spells_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./special/shaman-spells/chooser/chooser.component */ "./src/app/special/shaman-spells/chooser/chooser.component.ts");
/* harmony import */ var _special_gambler_tricks_gambler_tricks_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./special/gambler-tricks/gambler-tricks.component */ "./src/app/special/gambler-tricks/gambler-tricks.component.ts");
/* harmony import */ var _special_gambler_tricks_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./special/gambler-tricks/chooser/chooser.component */ "./src/app/special/gambler-tricks/chooser/chooser.component.ts");
/* harmony import */ var _special_samurai_tactics_samurai_tactics_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./special/samurai-tactics/samurai-tactics.component */ "./src/app/special/samurai-tactics/samurai-tactics.component.ts");
/* harmony import */ var _special_samurai_tactics_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./special/samurai-tactics/chooser/chooser.component */ "./src/app/special/samurai-tactics/chooser/chooser.component.ts");
/* harmony import */ var _special_orphan_missions_orphan_missions_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./special/orphan-missions/orphan-missions.component */ "./src/app/special/orphan-missions/orphan-missions.component.ts");
/* harmony import */ var _special_orphan_missions_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./special/orphan-missions/chooser/chooser.component */ "./src/app/special/orphan-missions/chooser/chooser.component.ts");
/* harmony import */ var _special_sorcerer_magik_spell_spell_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./special/sorcerer-magik/spell/spell.component */ "./src/app/special/sorcerer-magik/spell/spell.component.ts");
/* harmony import */ var _special_sorcerer_magik_magik_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./special/sorcerer-magik/magik.component */ "./src/app/special/sorcerer-magik/magik.component.ts");
/* harmony import */ var _special_sorcerer_magik_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./special/sorcerer-magik/chooser/chooser.component */ "./src/app/special/sorcerer-magik/chooser/chooser.component.ts");
/* harmony import */ var _special_notes_notes_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./special/notes/notes.component */ "./src/app/special/notes/notes.component.ts");
/* harmony import */ var _shared_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./shared/chooser/chooser.component */ "./src/app/shared/chooser/chooser.component.ts");
/* harmony import */ var _shared_temp_temp_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./shared/temp/temp.component */ "./src/app/shared/temp/temp.component.ts");
/* harmony import */ var _shared_uses_uses_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./shared/uses/uses.component */ "./src/app/shared/uses/uses.component.ts");






















































let UsagePipe = class UsagePipe {
    transform(value) {
        if (!value || !value.length)
            return [];
        let list = value.filter(v => !!v.usage);
        list.sort((a, b) => a.usage > b.usage ? 1 : -1);
        return list;
    }
};
UsagePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({
        name: 'hasUsage'
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], UsagePipe);

let ModifierPipe = class ModifierPipe {
    transform(value) {
        if (value === null || value === undefined ||
            isNaN(value) || value === 0)
            return '';
        if (value * 1 > 0)
            return '+' + value;
        return value;
    }
};
ModifierPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({
        name: 'modifier'
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], ModifierPipe);

let MimGroupFilterPipe = class MimGroupFilterPipe {
    transform(items, group) {
        return items.filter(item => item.group.toLowerCase() == group.toLowerCase());
    }
};
MimGroupFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({
        name: 'mimGroupFilter'
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], MimGroupFilterPipe);

let SumFilterPipe = class SumFilterPipe {
    transform(values, min) {
        let result = 0, minimum = 0;
        if (!isNaN(min))
            minimum = min * 1;
        values.forEach(v => {
            if (!isNaN(v) && (v * 1) >= minimum)
                result += (v * 1);
        });
        return result;
    }
};
SumFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({
        name: 'sum'
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], SumFilterPipe);

/**
 *
 */
let JoinPipe = class JoinPipe {
    /**
     *
     * @param value
     * @returns {string}
     */
    transform(value) {
        if (!value || !value.length)
            return '';
        return value.join(', ');
    }
};
JoinPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({ name: 'join' })
], JoinPipe);

/**
 *
 */
let OrderByPipe = class OrderByPipe {
    /**
     *
     * @param value
     * @returns {string}
     */
    transform(value, property, dir = 'desc') {
        if (!value || !value.length)
            return [];
        return value.sort((a, b) => {
            if ('desc' === dir)
                return a[property] > b[property] ? -1 : 1;
            else
                return a[property] < b[property] ? -1 : 1;
        });
    }
};
OrderByPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"])({ name: 'orderBy' })
], OrderByPipe);

//ROUTING CONFIG
const appRoutes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_19__["LoginComponent"] },
    { path: 'chars', component: _charlist_charlist_component__WEBPACK_IMPORTED_MODULE_17__["CharListComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_16__["AuthGuard"]] },
    { path: 'chars/:id', component: _character_character_component__WEBPACK_IMPORTED_MODULE_18__["CharacterComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_16__["AuthGuard"]] },
    { path: 'import', component: _upload_upload_component__WEBPACK_IMPORTED_MODULE_20__["UploadComponent"] },
    { path: '', redirectTo: '/chars', pathMatch: 'full' },
    { path: '**', redirectTo: '/chars' }
];
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
            _charlist_charlist_component__WEBPACK_IMPORTED_MODULE_17__["CharListComponent"],
            _character_character_component__WEBPACK_IMPORTED_MODULE_18__["CharacterComponent"],
            _login_login_component__WEBPACK_IMPORTED_MODULE_19__["LoginComponent"],
            _upload_upload_component__WEBPACK_IMPORTED_MODULE_20__["UploadComponent"],
            _abilities_abilities_component__WEBPACK_IMPORTED_MODULE_21__["AbilitiesComponent"],
            _abilities_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_23__["AbilityChooserComponent"],
            _abilities_ability_ability_component__WEBPACK_IMPORTED_MODULE_22__["AbilityComponent"],
            _items_items_component__WEBPACK_IMPORTED_MODULE_24__["ItemsComponent"],
            _items_item_component__WEBPACK_IMPORTED_MODULE_25__["ItemComponent"],
            _mim_mim_component__WEBPACK_IMPORTED_MODULE_26__["MimComponent"],
            ModifierPipe,
            MimGroupFilterPipe,
            SumFilterPipe,
            JoinPipe,
            OrderByPipe,
            UsagePipe,
            _shared_value_display_value_display_component__WEBPACK_IMPORTED_MODULE_27__["ValueDisplayComponent"],
            _shared_value_display_value_display_component__WEBPACK_IMPORTED_MODULE_27__["XPValueDisplayComponent"],
            _shared_value_display_value_display_component__WEBPACK_IMPORTED_MODULE_27__["SidebagValueDisplayComponent"],
            _shared_value_display_value_display_component__WEBPACK_IMPORTED_MODULE_27__["ValueDisplayWithMaxComponent"],
            _attacks_attacks_component__WEBPACK_IMPORTED_MODULE_29__["AttacksComponent"],
            _attacks_attack_attack_component__WEBPACK_IMPORTED_MODULE_30__["AttackComponent"],
            _shared_keypad_keypad_component__WEBPACK_IMPORTED_MODULE_28__["KeypadComponent"],
            _sidebag_sidebag_component__WEBPACK_IMPORTED_MODULE_31__["SidebagComponent"],
            _special_preacher_sermons_sermons_component__WEBPACK_IMPORTED_MODULE_32__["PreacherSermonsComponent"],
            _special_preacher_sermons_sermon_sermon_component__WEBPACK_IMPORTED_MODULE_33__["PreacherSermonComponent"],
            _special_preacher_sermons_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_34__["SermonsChooserComponent"],
            _items_editor_editor_component__WEBPACK_IMPORTED_MODULE_35__["ItemEditorComponent"],
            _avatar_avatar_component__WEBPACK_IMPORTED_MODULE_36__["AvatarComponent"],
            _special_shaman_spells_shaman_spells_component__WEBPACK_IMPORTED_MODULE_39__["ShamanSpellsComponent"],
            _special_shaman_spells_shaman_spells_component__WEBPACK_IMPORTED_MODULE_39__["ShamanSpellComponent"],
            _special_shaman_spells_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_40__["ShamanSpellsChooserComponent"],
            _special_gambler_tricks_gambler_tricks_component__WEBPACK_IMPORTED_MODULE_41__["GamblerTricksComponent"],
            _special_gambler_tricks_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_42__["GamblerTricksChooserComponent"],
            _special_samurai_tactics_samurai_tactics_component__WEBPACK_IMPORTED_MODULE_43__["SamuraiTacticsComponent"],
            _special_samurai_tactics_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_44__["SamuraiTacticsChooserComponent"],
            _special_orphan_missions_orphan_missions_component__WEBPACK_IMPORTED_MODULE_45__["OrphanMissionsComponent"],
            _special_orphan_missions_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_46__["OrphanMissionsChooserComponent"],
            _special_notes_notes_component__WEBPACK_IMPORTED_MODULE_50__["NotesComponent"],
            _shared_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_51__["ChooserComponent"],
            _special_orphan_missions_orphan_missions_component__WEBPACK_IMPORTED_MODULE_45__["OrphanMissionsComponent"],
            _special_sorcerer_magik_spell_spell_component__WEBPACK_IMPORTED_MODULE_47__["ElementalMagikSpellComponent"],
            _special_sorcerer_magik_magik_component__WEBPACK_IMPORTED_MODULE_48__["ElementalMagikComponent"],
            _special_sorcerer_magik_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_49__["ElementalMagikChooserComponent"],
            _shared_temp_temp_component__WEBPACK_IMPORTED_MODULE_52__["TempComponent"],
            _faction_faction_component__WEBPACK_IMPORTED_MODULE_37__["FactionComponent"],
            _faction_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_38__["FactionChooserComponent"],
            _shared_uses_uses_component__WEBPACK_IMPORTED_MODULE_53__["UsesComponent"]
        ],
        imports: [
            //                               for debugging purposes only
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(appRoutes, { enableTracing: false }),
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_fire__WEBPACK_IMPORTED_MODULE_10__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].firebase),
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_11__["AngularFirestoreModule"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__["AngularFireAuthModule"],
            _angular_fire_database__WEBPACK_IMPORTED_MODULE_13__["AngularFireDatabaseModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatChipsModule"]
        ],
        providers: [
            _modal_service__WEBPACK_IMPORTED_MODULE_8__["ModalService"],
            _firestore_service__WEBPACK_IMPORTED_MODULE_15__["FirestoreService"],
            _auth_guard__WEBPACK_IMPORTED_MODULE_16__["AuthGuard"]
        ],
        entryComponents: [
            _shared_keypad_keypad_component__WEBPACK_IMPORTED_MODULE_28__["KeypadComponent"],
            _items_editor_editor_component__WEBPACK_IMPORTED_MODULE_35__["ItemEditorComponent"],
            _shared_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_51__["ChooserComponent"],
            _abilities_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_23__["AbilityChooserComponent"],
            _special_preacher_sermons_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_34__["SermonsChooserComponent"],
            _special_samurai_tactics_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_44__["SamuraiTacticsChooserComponent"],
            _special_shaman_spells_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_40__["ShamanSpellsChooserComponent"],
            _special_gambler_tricks_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_42__["GamblerTricksChooserComponent"],
            _special_orphan_missions_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_46__["OrphanMissionsChooserComponent"],
            _special_sorcerer_magik_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_49__["ElementalMagikChooserComponent"],
            _faction_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_38__["FactionChooserComponent"]
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/attacks/attack/attack.component.less":
/*!******************************************************!*\
  !*** ./src/app/attacks/attack/attack.component.less ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\nh3,\nh4,\nh5 {\n  margin-top: 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYXR0YWNrcy9hdHRhY2svYXR0YWNrLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9hdHRhY2tzL2F0dGFjay9hdHRhY2suY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRyxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0FIO0FER0E7OztFQUFhLGFBQUE7QUNFYiIsImZpbGUiOiJzcmMvYXBwL2F0dGFja3MvYXR0YWNrL2F0dGFjay5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmRlc2Mge1xuICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgY29sb3I6ICM1NTU7XG4gICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuXG5oMywgaDQsIGg1IHsgbWFyZ2luLXRvcDogMDsgfVxuIiwiLmRlc2Mge1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGNvbG9yOiAjNTU1O1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuaDMsXG5oNCxcbmg1IHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/attacks/attack/attack.component.ts":
/*!****************************************************!*\
  !*** ./src/app/attacks/attack/attack.component.ts ***!
  \****************************************************/
/*! exports provided: AttackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttackComponent", function() { return AttackComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");



let AttackComponent = class AttackComponent {
    constructor(service) {
        this.service = service;
        this.onEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.confirmingDelete = false;
        this.isEditing = false;
        this.editable = null;
    }
    ngOnInit() {
        this.charSub = this.service.getCharacter(character => {
            this.character = character;
        });
    }
    ngOnDestroy() {
        this.charSub.unsubscribe();
        this.charSub = null;
        this.character = null;
        this.service = null;
        this.details = null;
        this.roll = null;
        this.attack = null;
        this.onEvent = null;
        this.editable = null;
    }
    edit() {
        //make a copy so we don't overwrite changes before saving
        this.editable = {
            attack: "",
            damage: "",
            description: "",
            name: "",
            toHit: "",
            type: 'melee',
            range: ""
        };
        Object.assign(this.editable, this.attack);
        this.isEditing = true;
    }
    cancelEditing() {
        this.isEditing = false;
        this.editable = null;
    }
    saveEdits() {
        //overwrite with changes
        Object.assign(this.attack, this.editable);
        this.isEditing = false;
        this.onEvent.emit({ name: 'update', value: this.attack });
    }
    remove() {
        this.onEvent.emit({ name: 'remove', value: this.attack });
    }
    /**
     * @param {string} id - id of the attack to roll
     */
    execute() {
        let result = { attack: null, hits: [], dmg: [], totalDmg: 0, bounces: [] };
        if (!this.details) {
            this.details = this.parseAttackStats(this.attack, result);
        }
        // if('dynamite' === id) {
        //     result.attack = this.parseAttackStats(id);
        //     result.bounces = this.rollBounces();
        // } else if('hatchet' === id) {
        //     result.attack = this.parseAttackStats(id);
        // } else {
        //     var combat = this.attack;
        //     if(combat.attack && combat.type && combat.damage) {
        //         result.attack = this.parseAttackStats(combat);
        //     }
        // }
        for (let i = 0, hits = 0; i < this.details.numAttDie; ++i) {
            //roll to-hit
            let roll = Math.ceil(Math.random() * this.details.attDie);
            if (this.details.attMod)
                roll += this.details.attMod;
            result.hits[i] = roll;
            //roll damage
            var dmg = Math.ceil(Math.random() * this.details.dmgDie);
            if (this.details.dmgMod)
                dmg += (this.details.dmgMod * 1);
            result.dmg[i] = dmg;
            if (roll >= this.details.target)
                result.totalDmg += dmg;
            if (roll >= this.details.target) { //if hit target, remove bounces
                result.bounces = [];
            }
            //  else if('dynamite' !== id) {      //if miss non-dyn, blank damage
            //     result.dmg[i] = '-';
            // }
        }
        this.roll = result;
    }
    /**
     * reroll a to-hit value
     * @param {integer} index - position of the to-hit value in the attack's array
     */
    rerollHit(index) {
        var result = this.roll;
        var roll = Math.ceil(Math.random() * this.details.attDie);
        if (this.details.attMod)
            roll += this.details.attMod;
        result.hits[index] = roll;
        var dmg = Math.ceil(Math.random() * this.details.dmgDie);
        if (this.details.dmgMod)
            dmg += this.details.dmgMod;
        result.dmg[index] = dmg;
        //re-sum total damage
        result.totalDmg = 0;
        result.dmg.forEach((d, i) => {
            if (result.hits[i] >= this.details.target) {
                result.totalDmg += d;
            }
        });
        result.bounces = this.rollBounces();
        if (roll >= this.details.target) { //if hit target, remove bounces
            result.bounces = [];
        }
        //  else if('dynamite' !== id) {      //if miss non-dyn, blank damage
        //     result.dmg[i] = '-';
        // }
    }
    /**
     * reroll a damage value
     * @param {integer} index - position of the damage value in the attack's array
     */
    rerollDmg(index) {
        var result = this.roll;
        var dmg = Math.ceil(Math.random() * this.details.dmgDie);
        if (this.details.dmgMod)
            dmg += this.details.dmgMod;
        result.dmg[index] = dmg;
        //re-sum total damage
        result.totalDmg = 0;
        result.dmg.forEach((d, i) => {
            if (result.hits[i] >= this.details.target) {
                result.totalDmg += d;
            }
        });
    }
    /**
     * parse variables out of attack for calculation
     */
    parseAttackStats(att, roll) {
        var result = {
            numAttDie: 1, attDie: 6, attMod: 0,
            dmgDie: 6, dmgMod: 0, target: 4, range: 0
        };
        let character = this.character;
        if (typeof (att) === 'string' && 'dynamite' === att) {
            result.target = character.ranged;
            result.range = (character.stats.Strength + 3);
            roll.bounces = this.rollBounces();
        }
        else if (typeof (att) === 'string' && 'hatchet' === att) {
            result.target = character.melee;
            result.range = (character.stats.Strength + 3);
            result.dmgMod = 2;
        }
        else {
            result.target = character[att.type];
            var match = /(\d)?[d](\d){1}([\+\-]\d+)?/i.exec(att.attack);
            if (match && match.length > 1) {
                let g1 = parseInt(match[1]);
                let g2 = parseInt(match[2]);
                let g3 = parseInt(match[3]) || 0;
                result.numAttDie = g1;
                result.attDie = g2;
                result.attMod = g3;
                result.dmgDie = 6;
                var m2 = /d(\d){1}([\+\-]\d+)?/i.exec(att.damage);
                if (m2 && m2.length > 1) {
                    let mg1 = parseInt(m2[1]);
                    let mg2 = parseInt(m2[2]) || 0;
                    result.dmgDie = mg1;
                    result.dmgMod = mg2;
                }
            }
            // console.log(match);
            // console.log(result);
        }
        return result;
    }
    /**
     * determine how many bounces and which directions for dynamite
     */
    rollBounces() {
        //generate bounces beforehand
        //roll d3 to determine # bounces
        var num = Math.ceil(Math.random() * 3);
        var dir = [
            'down-left', 'left', 'up-left', 'up', 'up-right', 'right', 'down-right', 'down'
        ];
        //for each bounce, roll d8 for direction
        var bounces = [];
        while (num > 0) {
            var bounce = Math.floor(Math.random() * 8);
            bounces.push(dir[bounce]);
            num--;
        }
        return bounces;
    }
};
AttackComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], AttackComponent.prototype, "attack", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], AttackComponent.prototype, "onEvent", void 0);
AttackComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'attack',
        template: __webpack_require__(/*! raw-loader!./attack.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/attacks/attack/attack.component.html"),
        styles: [__webpack_require__(/*! ./attack.component.less */ "./src/app/attacks/attack/attack.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"]])
], AttackComponent);



/***/ }),

/***/ "./src/app/attacks/attacks.component.less":
/*!************************************************!*\
  !*** ./src/app/attacks/attacks.component.less ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0 1em 1em;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYXR0YWNrcy9hdHRhY2tzLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9hdHRhY2tzL2F0dGFja3MuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUVBLGdCQUFBO0VBQ0Esa0JBQUE7QUNBSjtBRElBOzs7RUFDSSxTQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9hdHRhY2tzL2F0dGFja3MuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMCAxZW0gMWVtO1xufVxuXG5cbmgzLCBoNCwgaDUge1xuICAgIG1hcmdpbjogMDtcbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAwIDFlbSAxZW07XG59XG5oMyxcbmg0LFxuaDUge1xuICBtYXJnaW46IDA7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/attacks/attacks.component.ts":
/*!**********************************************!*\
  !*** ./src/app/attacks/attacks.component.ts ***!
  \**********************************************/
/*! exports provided: AttacksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttacksComponent", function() { return AttacksComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AttacksComponent = class AttacksComponent {
    // public bearFormAttack: Attack = {
    //     attack  : '0';
    //     damage  : '0';
    //     description : '+2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6',
    //     name : "Bear Form Attack",
    //     toHit : 0,
    //     type : 'melee' as AttackType
    //
    // }
    constructor() {
        this.attacks = [];
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.confirmingDelete = {};
        this.rollResults = [];
    }
    ngOnInit() {
        this.confirmingDelete = {};
    }
    ngOnDestroy() {
        this.attacks = null;
        this.confirmingDelete = null;
        this.rollResults = null;
    }
    add() {
        let att = {
            name: "New Attack",
            description: "Describe this attack",
            toHit: "3",
            attack: "1D6",
            damage: "1D6",
            type: "melee"
        };
        this.attacks.push(att);
        this.onSave.emit({ type: "attack", value: att });
    }
    remove(index) {
        if (index >= 0) {
            let rem = this.attacks.splice(index, 1);
            this.onSave.emit({ type: "attack", value: rem });
        }
    }
    onEvent(event) {
        switch (event.name) {
            case 'remove':
                let index = this.attacks.indexOf(event.value);
                this.remove(index);
                break;
            case 'update':
                this.onSave.emit({ type: "attack", value: event.value });
                break;
            default:
                console.log("Unsupported event: " + event.name);
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], AttacksComponent.prototype, "attacks", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], AttacksComponent.prototype, "onSave", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], AttacksComponent.prototype, "onError", void 0);
AttacksComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'attacks',
        template: __webpack_require__(/*! raw-loader!./attacks.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/attacks/attacks.component.html"),
        styles: [__webpack_require__(/*! ./attacks.component.less */ "./src/app/attacks/attacks.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], AttacksComponent);



/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/es2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let AuthGuard = class AuthGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate(next, state) {
        return this.auth.authState.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(auth => {
            if (auth === null || auth === undefined) {
                this.router.navigate(['/login']);
                return false;
            }
            else {
                return true;
            }
        }));
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], AuthGuard);



/***/ }),

/***/ "./src/app/avatar/avatar.component.less":
/*!**********************************************!*\
  !*** ./src/app/avatar/avatar.component.less ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".avatar {\n  padding: 1em 0;\n  margin: 0 auto;\n}\n.avatar .image-wrapper {\n  width: 175px;\n  height: 175px;\n  border-radius: 100%;\n  border: 1px solid #777;\n  overflow: hidden;\n  margin: 0 auto;\n}\n.avatar .image {\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvYXZhdGFyL2F2YXRhci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvYXZhdGFyL2F2YXRhci5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxjQUFBO0FDQ0o7QURIQTtFQU1RLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQ0FSO0FER0E7RUFDSSxXQUFBO0FDREoiLCJmaWxlIjoic3JjL2FwcC9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmF2YXRhcntcbiAgICBwYWRkaW5nOiAxZW0gMDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICAvLyBtYXgtd2lkdGg6IDUwJTtcblxuICAgIC5pbWFnZS13cmFwcGVyIHtcbiAgICAgICAgd2lkdGg6IDE3NXB4O1xuICAgICAgICBoZWlnaHQ6IDE3NXB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNzc3O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG59XG4uYXZhdGFyIC5pbWFnZSB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4iLCIuYXZhdGFyIHtcbiAgcGFkZGluZzogMWVtIDA7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLmF2YXRhciAuaW1hZ2Utd3JhcHBlciB7XG4gIHdpZHRoOiAxNzVweDtcbiAgaGVpZ2h0OiAxNzVweDtcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzc3NztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4uYXZhdGFyIC5pbWFnZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/avatar/avatar.component.ts":
/*!********************************************!*\
  !*** ./src/app/avatar/avatar.component.ts ***!
  \********************************************/
/*! exports provided: AvatarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvatarComponent", function() { return AvatarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");



let AvatarComponent = class AvatarComponent {
    constructor(element, service) {
        this.element = element;
        this.service = service;
        this.showForm = false;
        this.dirty = false;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        this.charSubscription = this.service.getCharacter((character) => {
            this.character = character;
            this.imgData = character.avatar;
        });
    }
    ngOnDestroy() {
        this.charSubscription.unsubscribe();
        this.charSubscription = null;
        this.showForm = false;
        this.dirty = false;
        this.imgData = null;
        this.character = null;
        this.element = null;
        this.service = null;
    }
    changeListener(event) {
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        reader.onload = (e) => {
            var src = e.target.result;
            image.src = this.imgData = src;
            this.dirty = true;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    isDirty() {
        return this.dirty;
    }
    closeEdit() {
        this.showForm = false;
        this.dirty = false;
    }
    cancel() {
        this.imgData = this.character.avatar;
        this.closeEdit();
    }
    save() {
        // this.character.avatar = this.imgData;
        this.onSave.emit({ name: 'avatar', value: this.imgData });
        this.closeEdit();
    }
};
AvatarComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], AvatarComponent.prototype, "onSave", void 0);
AvatarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'avatar',
        template: __webpack_require__(/*! raw-loader!./avatar.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/avatar/avatar.component.html"),
        styles: [__webpack_require__(/*! ./avatar.component.less */ "./src/app/avatar/avatar.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"]])
], AvatarComponent);



/***/ }),

/***/ "./src/app/character/character-oldstyle.component.less":
/*!*************************************************************!*\
  !*** ./src/app/character/character-oldstyle.component.less ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".l-char {\n  flex-wrap: nowrap;\n  -webkit-box-align: stretch;\n          align-items: stretch;\n  overflow-y: hidden;\n  overflow-x: auto;\n  height: 100%;\n  -webkit-overflow-scrolling: touch;\n}\n.l-page {\n  -webkit-box-flex: 1;\n          flex: 1 0 100%;\n  overflow-y: auto;\n  white-space: normal;\n}\n/* IPAD\n@media(min-width:375px) {\n    .l-page { flex: 1 0 375px; }\n}*/\n@media (min-width: 1024px) {\n  .l-page {\n    -webkit-box-flex: 1;\n            flex: 1 0 1024px;\n    overflow-y: auto;\n    white-space: normal;\n    padding: 0.5em 0.5em 1em;\n  }\n}\n.mat-tab-group {\n  width: 100%;\n}\nsection {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 0.25em 0;\n  background-image: url('texture.png');\n}\nsection > section {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\nsection.misc {\n  padding: 0;\n  -webkit-box-pack: stretch;\n          justify-content: stretch;\n}\n.swipe--left {\n  position: absolute;\n  left: 0;\n  bottom: 2em;\n  z-index: 100;\n}\n.swipe--right {\n  position: absolute;\n  right: 0;\n  bottom: 2em;\n  z-index: 100;\n}\n\\ .o-container {\n  background: #cd9c3b;\n  border: 1px solid #777;\n  margin-right: 0.5em;\n}\n.o-container--attrs {\n  background: #cd9c3b;\n  border: 1px solid #777;\n  margin-right: 0.5em;\n  font-size: 0.875em;\n  background-color: #cd9c3b;\n  background-image: url('texture.png');\n}\n.o-container--bio {\n  border-bottom: 1px solid #bbb;\n  margin-bottom: 1em;\n}\n.o-container--items {\n  -webkit-box-flex: 55%;\n          flex: 55%;\n}\n.o-container--sidebag {\n  -webkit-box-flex: 40%;\n          flex: 40%;\n}\n@media (min-width: 768px) {\n  .o-container--attrs {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n    -webkit-box-align: stretch;\n            align-items: stretch;\n  }\n}\n@media (min-width: 992px) {\n  .o-container--bio {\n    -webkit-box-flex: 1;\n            flex: 1;\n    border-bottom: none;\n  }\n  .o-attributes-container {\n    -webkit-box-flex: 3;\n            flex: 3;\n  }\n  .o-container--items {\n    -webkit-box-flex: 66%;\n            flex: 66%;\n  }\n  .o-container--sidebag {\n    -webkit-box-flex: 30%;\n            flex: 30%;\n  }\n}\n.m-attributes {\n  -webkit-box-flex: 6;\n          flex: 6;\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.m-attributes > * {\n  -webkit-box-flex: 1;\n          flex: 1 0 33%;\n  text-align: center;\n}\n.m-attributes .value-display .label {\n  background-color: #000;\n  color: #fff;\n}\n.m-stats {\n  -webkit-box-flex: 4;\n          flex: 4;\n  background-color: #e7c581;\n  background-image: url('texture.png');\n}\n.m-stats .o-container {\n  display: -webkit-box;\n  display: flex;\n  justify-content: space-around;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.bio {\n  position: relative;\n  padding: 0.25em 0.25em 0;\n  border: 1px solid #bbb;\n  background: #f7f7f787;\n  text-align: center;\n}\n.bio .edit-button {\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.m-sidebag-chip {\n  border: 1px solid #777;\n  border-radius: 24px;\n  background: #efefef;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.t-combat,\n.t-health,\n.t-sanity,\n.t-grit,\n.t-corruption,\n.t-faith,\n.t-mana,\n.t-magik,\n.t-fury,\n.t-ki,\n.t-resources {\n  -webkit-box-flex: 1;\n          flex: auto;\n  justify-content: space-around;\n}\n.t-combat > .m-grid,\n.t-health > .m-grid,\n.t-sanity > .m-grid,\n.t-grit > .m-grid,\n.t-corruption > .m-grid,\n.t-faith > .m-grid,\n.t-mana > .m-grid,\n.t-magik > .m-grid,\n.t-fury > .m-grid,\n.t-ki > .m-grid,\n.t-resources > .m-grid {\n  justify-content: space-around;\n}\n.t-health > .m-grid,\n.t-sanity > .m-grid {\n  justify-content: space-around;\n}\n.t-health > .m-grid > *,\n.t-sanity > .m-grid > * {\n  -webkit-box-flex: 1;\n          flex: 1;\n  text-align: center;\n}\n.t-health > .m-grid .m-grid,\n.t-sanity > .m-grid .m-grid {\n  justify-content: space-around;\n}\n@media (min-width: 768px) {\n  .t-health > .m-grid > *,\n  .t-sanity > .m-grid > * {\n    -webkit-box-flex: 1;\n            flex: auto;\n  }\n  .t-corruption,\n  .t-faith,\n  .t-mana,\n  .t-magik,\n  .t-fury,\n  .t-ki,\n  .t-resources {\n    -webkit-box-flex: 1;\n            flex: 1 0 auto;\n    padding: 0.5em;\n  }\n}\n@media (min-width: 992px) {\n  .t-combat {\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .t-health,\n  .t-sanity {\n    -webkit-box-flex: 1;\n            flex: 1;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .t-health > .m-grid,\n  .t-sanity > .m-grid {\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .t-health > .m-grid > *,\n  .t-sanity > .m-grid > * {\n    -webkit-box-flex: 1;\n            flex: auto;\n  }\n  .t-grit,\n  .t-corruption,\n  .t-faith,\n  .t-mana,\n  .t-magik,\n  .t-fury,\n  .t-ki,\n  .t-resources {\n    -webkit-box-flex: 0;\n            flex: 0 1 auto;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .t-combat > .m-grid,\n  .t-health > .m-grid,\n  .t-sanity > .m-grid,\n  .t-grit > .m-grid,\n  .t-corruption > .m-grid,\n  .t-faith > .m-grid,\n  .t-mana > .m-grid,\n  .t-magik > .m-grid,\n  .t-fury > .m-grid,\n  .t-ki > .m-grid,\n  .t-resources > .m-grid {\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .t-combat > .m-grid .m-grid,\n  .t-health > .m-grid .m-grid,\n  .t-sanity > .m-grid .m-grid,\n  .t-grit > .m-grid .m-grid,\n  .t-corruption > .m-grid .m-grid,\n  .t-faith > .m-grid .m-grid,\n  .t-mana > .m-grid .m-grid,\n  .t-magik > .m-grid .m-grid,\n  .t-fury > .m-grid .m-grid,\n  .t-ki > .m-grid .m-grid,\n  .t-resources > .m-grid .m-grid {\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvY2hhcmFjdGVyL2NoYXJhY3Rlci1vbGRzdHlsZS5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvY2hhcmFjdGVyL2NoYXJhY3Rlci1vbGRzdHlsZS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGlCQUFBO0VBQ0EsMEJBQUE7VUFBQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBR0EsaUNBQUE7QUNGSjtBRElBO0VBQ0ksbUJBQUE7VUFBQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0ZKO0FBQ0E7OztFQUdFO0FES0Y7RUFDSTtJQUNJLG1CQUFBO1lBQUEsZ0JBQUE7SUFDQSxnQkFBQTtJQUNBLG1CQUFBO0lBQ0Esd0JBQUE7RUNITjtBQUNGO0FEZUE7RUFDSSxXQUFBO0FDYko7QURnQkE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLG9DQUFBO0FDZEo7QURnQkk7RUFDSSxtQkFBQTtVQUFBLE9BQUE7QUNkUjtBRGdCSTtFQUNJLFVBQUE7RUFDQSx5QkFBQTtVQUFBLHdCQUFBO0FDZFI7QUR5QkE7RUFDSSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ3ZCSjtBRHlCQTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDdkJKO0FENkJBO0VBVUksbUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FDcENKO0FEdUNBO0VBTEksbUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBS0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLG9DQUFBO0FDbkNKO0FEdUNBO0VBQ0ksNkJBQUE7RUFDQSxrQkFBQTtBQ3JDSjtBRHdDQTtFQUNJLHFCQUFBO1VBQUEsU0FBQTtBQ3RDSjtBRHdDQTtFQUNJLHFCQUFBO1VBQUEsU0FBQTtBQ3RDSjtBRDBDQTtFQUNJO0lBQ0ksb0JBQUE7SUFBQSxhQUFBO0lBQ0EsdUJBQUE7WUFBQSwyQkFBQTtJQUNBLDBCQUFBO1lBQUEsb0JBQUE7RUN4Q047QUFDRjtBRDJDQTtFQUVJO0lBQ0ksbUJBQUE7WUFBQSxPQUFBO0lBQ0EsbUJBQUE7RUMxQ047RUQ0Q0U7SUFDSSxtQkFBQTtZQUFBLE9BQUE7RUMxQ047RUQ0Q0U7SUFDSSxxQkFBQTtZQUFBLFNBQUE7RUMxQ047RUQ0Q0U7SUFDSSxxQkFBQTtZQUFBLFNBQUE7RUMxQ047QUFDRjtBRDhDQTtFQUNJLG1CQUFBO1VBQUEsT0FBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtBQzVDSjtBRDhDSTtFQUNJLG1CQUFBO1VBQUEsYUFBQTtFQUNBLGtCQUFBO0FDNUNSO0FEbUNBO0VBYVEsc0JBQUE7RUFDQSxXQUFBO0FDN0NSO0FEZ0RBO0VBQ0ksbUJBQUE7VUFBQSxPQUFBO0VBQ0EseUJBQUE7RUFDQSxvQ0FBQTtBQzlDSjtBRDJDQTtFQU1RLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDZCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQzlDUjtBRG1EQTtFQUNJLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUNqREo7QUQ0Q0E7RUFRUSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxNQUFBO0FDakRSO0FEc0RBO0VBQ0ksc0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUNwREo7QUR5REE7Ozs7Ozs7Ozs7O0VBR0ksbUJBQUE7VUFBQSxVQUFBO0VBRUEsNkJBQUE7QUNoREo7QURpREk7Ozs7Ozs7Ozs7O0VBQ0ksNkJBQUE7QUNyQ1I7QUQwQ0k7O0VBQ0ksNkJBQUE7QUN2Q1I7QUR5Q1E7O0VBQ0ksbUJBQUE7VUFBQSxPQUFBO0VBQ0Esa0JBQUE7QUN0Q1o7QURpQ0k7O0VBUWMsNkJBQUE7QUNyQ2xCO0FEeUNBO0VBRVE7O0lBQWtCLG1CQUFBO1lBQUEsVUFBQTtFQ3RDeEI7RUR3Q0U7Ozs7Ozs7SUFHSSxtQkFBQTtZQUFBLGNBQUE7SUFDQSxjQUFBO0VDbENOO0FBQ0Y7QURvQ0E7RUFDSTtJQUNJLHVCQUFBO1lBQUEsMkJBQUE7RUNsQ047RURvQ0U7O0lBQ0ksbUJBQUE7WUFBQSxPQUFBO0lBQ0EsdUJBQUE7WUFBQSwyQkFBQTtFQ2pDTjtFRG1DTTs7SUFDSSx1QkFBQTtZQUFBLDJCQUFBO0VDaENWO0VEa0NVOztJQUNJLG1CQUFBO1lBQUEsVUFBQTtFQy9CZDtFRG1DRTs7Ozs7Ozs7SUFFSSxtQkFBQTtZQUFBLGNBQUE7SUFDQSx1QkFBQTtZQUFBLDJCQUFBO0VDM0JOO0VEaUNNOzs7Ozs7Ozs7OztJQUNJLHVCQUFBO1lBQUEsMkJBQUE7RUNyQlY7RURvQk07Ozs7Ozs7Ozs7O0lBRWMsdUJBQUE7WUFBQSwyQkFBQTtFQ1RwQjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvY2hhcmFjdGVyL2NoYXJhY3Rlci1vbGRzdHlsZS5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmwtY2hhciB7XG4gICAgZmxleC13cmFwOiAgIG5vd3JhcDtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICBvdmVyZmxvdy15OiAgaGlkZGVuO1xuICAgIG92ZXJmbG93LXg6ICBhdXRvO1xuICAgIGhlaWdodDogICAgICAxMDAlO1xuICAgIC8vIHBhZGRpbmctdG9wOiAzNnB4O1xuICAgIC8vIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuLmwtcGFnZSB7XG4gICAgZmxleDogMSAwIDEwMCU7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuXG4vKiBJUEFEXG5AbWVkaWEobWluLXdpZHRoOjM3NXB4KSB7XG4gICAgLmwtcGFnZSB7IGZsZXg6IDEgMCAzNzVweDsgfVxufSovXG5AbWVkaWEobWluLXdpZHRoOjEwMjRweCkge1xuICAgIC5sLXBhZ2Uge1xuICAgICAgICBmbGV4OiAxIDAgMTAyNHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICAgICAgICBwYWRkaW5nOiAwLjVlbSAwLjVlbSAxZW07XG4gICAgfVxufVxuXG5cblxuXG5cblxuXG5cblxuXG4ubWF0LXRhYi1ncm91cCB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbnNlY3Rpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAwLjI1ZW0gMDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL3RleHR1cmUucG5nKTtcblxuICAgICYgPiBzZWN0aW9uIHtcbiAgICAgICAgZmxleDogMTtcbiAgICB9XG4gICAgJi5taXNjIHtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xuICAgIH1cbn1cblxuXG5cblxuXG5cblxuXG4uc3dpcGUtLWxlZnQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogMmVtO1xuICAgIHotaW5kZXg6IDEwMDtcbn1cbi5zd2lwZS0tcmlnaHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDJlbTtcbiAgICB6LWluZGV4OiAxMDA7XG59XG5cblxuXG5cblxcXG5cblxuXG5cblxuXG5cblxuLm8tY29udGFpbmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjY2Q5YzNiO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3Nzc7XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVlbTtcbn1cblxuLm8tY29udGFpbmVyLS1hdHRycyB7XG4gICAgLm8tY29udGFpbmVyO1xuICAgIGZvbnQtc2l6ZTowLjg3NWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjZDljM2I7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy90ZXh0dXJlLnBuZyk7XG59XG5cblxuLm8tY29udGFpbmVyLS1iaW8ge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYmJiO1xuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbn1cblxuLm8tY29udGFpbmVyLS1pdGVtcyB7XG4gICAgZmxleDogNTUlO1xufVxuLm8tY29udGFpbmVyLS1zaWRlYmFnIHtcbiAgICBmbGV4OiA0MCU7XG59XG5cblxuQG1lZGlhKG1pbi13aWR0aDo3NjhweCkge1xuICAgIC5vLWNvbnRhaW5lci0tYXR0cnMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgIH1cbn1cblxuQG1lZGlhKG1pbi13aWR0aDo5OTJweCkge1xuXG4gICAgLm8tY29udGFpbmVyLS1iaW8ge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIH1cbiAgICAuby1hdHRyaWJ1dGVzLWNvbnRhaW5lciB7XG4gICAgICAgIGZsZXg6IDM7XG4gICAgfVxuICAgIC5vLWNvbnRhaW5lci0taXRlbXMge1xuICAgICAgICBmbGV4OiA2NiU7XG4gICAgfVxuICAgIC5vLWNvbnRhaW5lci0tc2lkZWJhZyB7XG4gICAgICAgIGZsZXg6IDMwJTtcbiAgICB9XG59XG5cblxuLm0tYXR0cmlidXRlcyB7XG4gICAgZmxleCAgICAgICAgICAgIDogNjtcbiAgICBkaXNwbGF5ICAgICAgICAgOiBmbGV4O1xuICAgIGZsZXgtd3JhcCAgICAgICA6IHdyYXA7XG4gICAgYWxpZ24taXRlbXMgICAgIDogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudCA6IGNlbnRlcjtcblxuICAgICYgPiAqIHtcbiAgICAgICAgZmxleCAgICAgICAgOiAxIDAgMzMlO1xuICAgICAgICB0ZXh0LWFsaWduICA6IGNlbnRlcjtcbiAgICB9XG5cbiAgICAudmFsdWUtZGlzcGxheSAubGFiZWwge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG59XG4ubS1zdGF0cyB7XG4gICAgZmxleDogNDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTdjNTgxO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChhc3NldHMvdGV4dHVyZS5wbmcpO1xuXG4gICAgLm8tY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxufVxuXG5cbi5iaW8ge1xuICAgIHBvc2l0aW9uICA6IHJlbGF0aXZlO1xuICAgIHBhZGRpbmcgICA6IDAuMjVlbSAwLjI1ZW0gMDtcbiAgICBib3JkZXIgICAgOiAxcHggc29saWQgI2JiYjtcbiAgICBiYWNrZ3JvdW5kOiAjZjdmN2Y3ODc7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgLmVkaXQtYnV0dG9uIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgIH1cbn1cblxuXG4ubS1zaWRlYmFnLWNoaXAge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3Nzc7XG4gICAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICAgIGRpc3BsYXk6ZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6Y2VudGVyXG59XG5cblxuXG4udC1jb21iYXQsIC50LWhlYWx0aCwgLnQtc2FuaXR5LCAudC1ncml0LCAudC1jb3JydXB0aW9uLFxuLnQtZmFpdGgsIC50LW1hbmEsIC50LW1hZ2lrLCAudC1mdXJ5LCAudC1raSxcbi50LXJlc291cmNlcyB7XG4gICAgZmxleDogYXV0bztcblxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgICYgPiAubS1ncmlkIHtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgfVxufVxuXG4udC1oZWFsdGgsIC50LXNhbml0eSB7XG4gICAgJiA+IC5tLWdyaWQge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcblxuICAgICAgICAmID4gKiB7XG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAubS1ncmlkIHsganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7IH1cbiAgICB9XG59XG5cbkBtZWRpYShtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLnQtaGVhbHRoLCAudC1zYW5pdHkge1xuICAgICAgICAmID4gLm0tZ3JpZCA+ICogeyBmbGV4OiBhdXRvOyB9XG4gICAgfVxuICAgIC50LWNvcnJ1cHRpb24sXG4gICAgLnQtZmFpdGgsIC50LW1hbmEsIC50LW1hZ2lrLCAudC1mdXJ5LCAudC1raSxcbiAgICAudC1yZXNvdXJjZXMge1xuICAgICAgICBmbGV4OiAxIDAgYXV0bztcbiAgICAgICAgcGFkZGluZzogMC41ZW07XG4gICAgfVxufVxuQG1lZGlhKG1pbi13aWR0aDogOTkycHgpIHtcbiAgICAudC1jb21iYXQge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgfVxuICAgIC50LWhlYWx0aCwgLnQtc2FuaXR5IHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuXG4gICAgICAgICYgPiAubS1ncmlkIHtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcblxuICAgICAgICAgICAgJiA+ICoge1xuICAgICAgICAgICAgICAgIGZsZXg6IGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLnQtZ3JpdCwgLnQtY29ycnVwdGlvbiwgLnQtZmFpdGgsIC50LW1hbmEsIC50LW1hZ2lrLCAudC1mdXJ5LCAudC1raSxcbiAgICAudC1yZXNvdXJjZXMge1xuICAgICAgICBmbGV4OiAwIDEgYXV0bztcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIH1cblxuICAgIC50LWNvbWJhdCwgLnQtaGVhbHRoLCAudC1zYW5pdHksIC50LWdyaXQsIC50LWNvcnJ1cHRpb24sXG4gICAgLnQtZmFpdGgsIC50LW1hbmEsIC50LW1hZ2lrLCAudC1mdXJ5LCAudC1raSxcbiAgICAudC1yZXNvdXJjZXMge1xuICAgICAgICAmID4gLm0tZ3JpZCB7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICAubS1ncmlkIHsganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIubC1jaGFyIHtcbiAgZmxleC13cmFwOiBub3dyYXA7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuLmwtcGFnZSB7XG4gIGZsZXg6IDEgMCAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuLyogSVBBRFxuQG1lZGlhKG1pbi13aWR0aDozNzVweCkge1xuICAgIC5sLXBhZ2UgeyBmbGV4OiAxIDAgMzc1cHg7IH1cbn0qL1xuQG1lZGlhIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAubC1wYWdlIHtcbiAgICBmbGV4OiAxIDAgMTAyNHB4O1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgICBwYWRkaW5nOiAwLjVlbSAwLjVlbSAxZW07XG4gIH1cbn1cbi5tYXQtdGFiLWdyb3VwIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5zZWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuMjVlbSAwO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL3RleHR1cmUucG5nKTtcbn1cbnNlY3Rpb24gPiBzZWN0aW9uIHtcbiAgZmxleDogMTtcbn1cbnNlY3Rpb24ubWlzYyB7XG4gIHBhZGRpbmc6IDA7XG4gIGp1c3RpZnktY29udGVudDogc3RyZXRjaDtcbn1cbi5zd2lwZS0tbGVmdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAyZW07XG4gIHotaW5kZXg6IDEwMDtcbn1cbi5zd2lwZS0tcmlnaHQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDJlbTtcbiAgei1pbmRleDogMTAwO1xufVxuXFwgLm8tY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogI2NkOWMzYjtcbiAgYm9yZGVyOiAxcHggc29saWQgIzc3NztcbiAgbWFyZ2luLXJpZ2h0OiAwLjVlbTtcbn1cbi5vLWNvbnRhaW5lci0tYXR0cnMge1xuICBiYWNrZ3JvdW5kOiAjY2Q5YzNiO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNzc3O1xuICBtYXJnaW4tcmlnaHQ6IDAuNWVtO1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNjZDljM2I7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChhc3NldHMvdGV4dHVyZS5wbmcpO1xufVxuLm8tY29udGFpbmVyLS1iaW8ge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2JiYjtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuLm8tY29udGFpbmVyLS1pdGVtcyB7XG4gIGZsZXg6IDU1JTtcbn1cbi5vLWNvbnRhaW5lci0tc2lkZWJhZyB7XG4gIGZsZXg6IDQwJTtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuby1jb250YWluZXItLWF0dHJzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5vLWNvbnRhaW5lci0tYmlvIHtcbiAgICBmbGV4OiAxO1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cbiAgLm8tYXR0cmlidXRlcy1jb250YWluZXIge1xuICAgIGZsZXg6IDM7XG4gIH1cbiAgLm8tY29udGFpbmVyLS1pdGVtcyB7XG4gICAgZmxleDogNjYlO1xuICB9XG4gIC5vLWNvbnRhaW5lci0tc2lkZWJhZyB7XG4gICAgZmxleDogMzAlO1xuICB9XG59XG4ubS1hdHRyaWJ1dGVzIHtcbiAgZmxleDogNjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5tLWF0dHJpYnV0ZXMgPiAqIHtcbiAgZmxleDogMSAwIDMzJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLm0tYXR0cmlidXRlcyAudmFsdWUtZGlzcGxheSAubGFiZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tLXN0YXRzIHtcbiAgZmxleDogNDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U3YzU4MTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy90ZXh0dXJlLnBuZyk7XG59XG4ubS1zdGF0cyAuby1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5iaW8ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmc6IDAuMjVlbSAwLjI1ZW0gMDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcbiAgYmFja2dyb3VuZDogI2Y3ZjdmNzg3O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYmlvIC5lZGl0LWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbn1cbi5tLXNpZGViYWctY2hpcCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM3Nzc7XG4gIGJvcmRlci1yYWRpdXM6IDI0cHg7XG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi50LWNvbWJhdCxcbi50LWhlYWx0aCxcbi50LXNhbml0eSxcbi50LWdyaXQsXG4udC1jb3JydXB0aW9uLFxuLnQtZmFpdGgsXG4udC1tYW5hLFxuLnQtbWFnaWssXG4udC1mdXJ5LFxuLnQta2ksXG4udC1yZXNvdXJjZXMge1xuICBmbGV4OiBhdXRvO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbi50LWNvbWJhdCA+IC5tLWdyaWQsXG4udC1oZWFsdGggPiAubS1ncmlkLFxuLnQtc2FuaXR5ID4gLm0tZ3JpZCxcbi50LWdyaXQgPiAubS1ncmlkLFxuLnQtY29ycnVwdGlvbiA+IC5tLWdyaWQsXG4udC1mYWl0aCA+IC5tLWdyaWQsXG4udC1tYW5hID4gLm0tZ3JpZCxcbi50LW1hZ2lrID4gLm0tZ3JpZCxcbi50LWZ1cnkgPiAubS1ncmlkLFxuLnQta2kgPiAubS1ncmlkLFxuLnQtcmVzb3VyY2VzID4gLm0tZ3JpZCB7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuLnQtaGVhbHRoID4gLm0tZ3JpZCxcbi50LXNhbml0eSA+IC5tLWdyaWQge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbi50LWhlYWx0aCA+IC5tLWdyaWQgPiAqLFxuLnQtc2FuaXR5ID4gLm0tZ3JpZCA+ICoge1xuICBmbGV4OiAxO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4udC1oZWFsdGggPiAubS1ncmlkIC5tLWdyaWQsXG4udC1zYW5pdHkgPiAubS1ncmlkIC5tLWdyaWQge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAudC1oZWFsdGggPiAubS1ncmlkID4gKixcbiAgLnQtc2FuaXR5ID4gLm0tZ3JpZCA+ICoge1xuICAgIGZsZXg6IGF1dG87XG4gIH1cbiAgLnQtY29ycnVwdGlvbixcbiAgLnQtZmFpdGgsXG4gIC50LW1hbmEsXG4gIC50LW1hZ2lrLFxuICAudC1mdXJ5LFxuICAudC1raSxcbiAgLnQtcmVzb3VyY2VzIHtcbiAgICBmbGV4OiAxIDAgYXV0bztcbiAgICBwYWRkaW5nOiAwLjVlbTtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC50LWNvbWJhdCB7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICB9XG4gIC50LWhlYWx0aCxcbiAgLnQtc2FuaXR5IHtcbiAgICBmbGV4OiAxO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgfVxuICAudC1oZWFsdGggPiAubS1ncmlkLFxuICAudC1zYW5pdHkgPiAubS1ncmlkIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cbiAgLnQtaGVhbHRoID4gLm0tZ3JpZCA+ICosXG4gIC50LXNhbml0eSA+IC5tLWdyaWQgPiAqIHtcbiAgICBmbGV4OiBhdXRvO1xuICB9XG4gIC50LWdyaXQsXG4gIC50LWNvcnJ1cHRpb24sXG4gIC50LWZhaXRoLFxuICAudC1tYW5hLFxuICAudC1tYWdpayxcbiAgLnQtZnVyeSxcbiAgLnQta2ksXG4gIC50LXJlc291cmNlcyB7XG4gICAgZmxleDogMCAxIGF1dG87XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICB9XG4gIC50LWNvbWJhdCA+IC5tLWdyaWQsXG4gIC50LWhlYWx0aCA+IC5tLWdyaWQsXG4gIC50LXNhbml0eSA+IC5tLWdyaWQsXG4gIC50LWdyaXQgPiAubS1ncmlkLFxuICAudC1jb3JydXB0aW9uID4gLm0tZ3JpZCxcbiAgLnQtZmFpdGggPiAubS1ncmlkLFxuICAudC1tYW5hID4gLm0tZ3JpZCxcbiAgLnQtbWFnaWsgPiAubS1ncmlkLFxuICAudC1mdXJ5ID4gLm0tZ3JpZCxcbiAgLnQta2kgPiAubS1ncmlkLFxuICAudC1yZXNvdXJjZXMgPiAubS1ncmlkIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cbiAgLnQtY29tYmF0ID4gLm0tZ3JpZCAubS1ncmlkLFxuICAudC1oZWFsdGggPiAubS1ncmlkIC5tLWdyaWQsXG4gIC50LXNhbml0eSA+IC5tLWdyaWQgLm0tZ3JpZCxcbiAgLnQtZ3JpdCA+IC5tLWdyaWQgLm0tZ3JpZCxcbiAgLnQtY29ycnVwdGlvbiA+IC5tLWdyaWQgLm0tZ3JpZCxcbiAgLnQtZmFpdGggPiAubS1ncmlkIC5tLWdyaWQsXG4gIC50LW1hbmEgPiAubS1ncmlkIC5tLWdyaWQsXG4gIC50LW1hZ2lrID4gLm0tZ3JpZCAubS1ncmlkLFxuICAudC1mdXJ5ID4gLm0tZ3JpZCAubS1ncmlkLFxuICAudC1raSA+IC5tLWdyaWQgLm0tZ3JpZCxcbiAgLnQtcmVzb3VyY2VzID4gLm0tZ3JpZCAubS1ncmlkIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/character/character.component.ts":
/*!**************************************************!*\
  !*** ./src/app/character/character.component.ts ***!
  \**************************************************/
/*! exports provided: CharacterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterComponent", function() { return CharacterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _models_character_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/character.model */ "./src/app/models/character.model.ts");







let CharacterComponent = class CharacterComponent {
    constructor(snackBar, service, route, router) {
        this.snackBar = snackBar;
        this.service = service;
        this.route = route;
        this.router = router;
        this.CLASSES = _models_character_model__WEBPACK_IMPORTED_MODULE_6__["SPECIAL_CLASSES"];
        this.xpLevels = [0, 500, 1000, 2000, 3000, 4500, 6000];
        this.isEditingBio = false;
        this.editableBio = null;
        this.modifiers = {};
        this.error = null; //new SOBError("test", "This is a test");
        this.messages = [];
        this.selectedTabIndex = 0;
    }
    ngOnInit() {
        let loadMsg = null;
        if (this.route.paramMap) {
            this.route.paramMap.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((params) => {
                this.showSnackBar("Loading character, one moment...");
                let id = params.get('id');
                this.charId = id;
                return this.service.loadCharacter(id);
            })).subscribe((character) => {
                //clear loading message
                setTimeout(() => { this.dismissSnackBar(); }, 1000);
                //charSubscription above will handle getting characters from the service
                // but this subscribe is necessary to get the actual event from the
                // Observable from the service
                // console.log("char event");
                this.character = character;
                this.init();
            });
        }
    }
    ngOnDestroy() {
        this.charId = null;
        this.character = null;
        this.charFlags = null;
        this.xpLevels = null;
        this.isEditingBio = false;
        this.editableBio = null;
        this.modifiers = null;
    }
    init() {
        this.charFlags = new _models_character_model__WEBPACK_IMPORTED_MODULE_6__["ClassFlag"](this.character);
        // Object.keys(FLAGS).forEach( key => {
        //     let flag = FLAGS[key];
        //     if(flag.fn(this.character)) {
        //         this.charFlags = _applyFlag(this.charFlags, flag.value);
        //     }
        // })
        this.ensureProperties();
        this.refreshModifiers();
    }
    refreshModifiers() {
        this.modifiers = this.service.getCharacterModifiers(this.character);
        // console.log("Character Component: Modifiers being applied:");
        // console.log(this.modifiers);
        // console.log("-------------------------");
    }
    ensureProperties() {
        if (!this.character.attacks)
            this.character.attacks = [];
        if (!this.character.mutations)
            this.character.mutations = [];
        if (!this.character.items)
            this.character.items = [];
        if (!this.character.abilities)
            this.character.abilities = [];
        if (!this.character.sidebag)
            this.character.sidebag = {};
        if (isNaN(this.character.sidebag.capacity))
            this.character.sidebag.capacity = 5;
        this.character.notes = this.character.notes || "";
        if (!this.character.temporaryMods)
            this.character.temporaryMods = [];
        // //class-specific properties
        // Object.keys(FLAGS).forEach( key => {
        //     let flag = FLAGS[key];
        //     if(this.hasFlag(flag.value)) {
        //         flag.init(this.character);
        //     }
        // });
    }
    editBio() {
        this.editableBio = {
            name: this.character.name,
            keywords: this.character.keywords || ""
        };
        this.isEditingBio = true;
    }
    cancelBioEdit() {
        this.editableBio = null;
        this.isEditingBio = false;
    }
    /**
     *
     */
    saveBio() {
        this.character.name = this.editableBio.name;
        this.character.keywords = this.editableBio.keywords;
        this.editableBio = null;
        this.isEditingBio = false;
        this.scheduleSave();
    }
    /**
     *
     */
    saveChar(key, arg) {
        this.refreshModifiers();
        // console.log("Character change event:" + (key?key + " => ":"") + JSON.stringify(arg));
        //
        //check to see if character leveled up
        if (key && 'xp' === key) {
            let neededXP = this.xpLevels[this.character.level];
            if (arg.value >= neededXP) {
                // this.messages.push(
                //     this.createMessage(
                //         "Level Up!",
                //         "Choose a class ability and roll for a new level-up ability"
                //     )
                // );
                this.showSnackBar("Level Up!", "Dismiss");
                this.character.level++;
                arg.value -= neededXP; //reset
            }
        }
        //Could use arg.type as key, but need to not process things like
        // add/remove spells, etc like we would process changing literal values
        if (key) {
            //if can't apply the change, don't bother saving the character
            try {
                if (!this.applyChange(key, arg.value))
                    return;
            }
            catch (e) {
                this.showSnackBar("Unable to save changes because " + e.message, "Dismiss");
                return;
            }
            if ('temporaryMods' === key) {
                this.refreshModifiers();
            }
        }
        this.scheduleSave();
    }
    /**
     *
     */
    applyChange(key, value) {
        let steps = key.split(".");
        if (steps.length === 1) {
            // if(typeof(this.character[key]) === 'undefined') {
            //     console.log("Nothing at path: " + key);
            //     return false;
            // }
            this.character[key] = value;
            return true;
        }
        //pathed variant (ie: 'prop.next.leaf')
        let i = 0, obj = this.character;
        while (i < steps.length - 1) {
            obj = obj[steps[i]];
            if (!obj) {
                console.log("Invalid path being updated: " + key);
                return false;
            }
            i++;
        }
        if (obj === null || obj === undefined) {
            // console.log("Nothing at path: " + key);
            return false;
        }
        else if (typeof (obj) !== 'object') {
            // console.log("Path points to primitive value: " + key);
            return false;
        }
        obj[steps[steps.length - 1]] = value;
        return true;
    }
    scheduleSave() {
        //do the actual save in a timeout so we don't block the UI waiting for
        // the service to complete
        if (this.savingTimer) {
            clearTimeout(this.savingTimer);
            this.savingTimer = null;
        }
        this.savingTimer = setTimeout(() => {
            this.savingTimer = null;
            this.doSave();
        }, 500);
    }
    doSave() {
        this.showSnackBar("Saving changes, one moment...");
        //set timer for saves that take too long...
        let timeoutMsg = null;
        let timer = setTimeout(() => {
            this.showSnackBar("Save is taking longer than expected...");
        }, 5000);
        // console.log(`Saving character ${this.charId}...`);
        // console.log(this.character);
        this.service.updateCharacter(this.charId, this.character)
            .then(() => {
            if (timer)
                clearTimeout(timer);
            this.showSnackBar("Changes saved!");
            setTimeout(() => { this.dismissSnackBar(); }, 3000);
        })
            .catch(e => {
            if (timer)
                clearTimeout(timer);
            this.showSnackBar("Unable to save character because " + e.message, "Dismiss");
        });
    }
    getWeightLimit() {
        let value = this.character.stats.Strength + 5;
        if (this.modifiers && this.modifiers.Strength) {
            value += (this.modifiers.Strength.value * 1);
        }
        return value;
    }
    hasDynamiteSatchel() {
        let satchel = this.character.items.find(it => it.name === "Dynamite Satchel");
        return satchel && satchel.equipped;
    }
    useQuickSidebagToken(tokenKey) {
        this.character.sidebag[tokenKey] -= 1;
        // this.scheduleSave();
    }
    createMessage(title, message, canDismiss) {
        let msg = {
            title: title,
            value: message,
            id: Math.round(Math.random() * 9999),
            canDismiss: typeof (canDismiss) !== 'undefined' ? canDismiss : true
        };
        return msg;
    }
    removeMessage(arg) {
        let idx = -1;
        if (arg && arg.id) {
            this.messages.forEach((msg, i) => {
                if (arg.id === msg.id)
                    idx = i;
            });
        }
        else if (arg && typeof (arg) === 'number') {
            this.messages.forEach((msg, i) => {
                if (arg === msg.id)
                    idx = i;
            });
        }
        if (idx >= 0) {
            this.messages.splice(idx, 1);
        }
    }
    hasFlag(classKey) {
        return this.charFlags && this.charFlags.hasSpecialClass(classKey);
    }
    swipe(amount) {
        let newIndex = this.selectedTabIndex + amount;
        let max = this.mdTabList.length;
        if (newIndex >= 0 && newIndex < max) {
            this.selectedTabIndex = newIndex;
        }
    }
    showSnackBar(message, dismissLabel) {
        this.dismissSnackBar();
        this.snackBarRef = this.snackBar.open(message, dismissLabel || null);
    }
    dismissSnackBar() {
        try {
            if (this.snackBarRef) {
                this.snackBarRef.dismiss();
                this.snackBarRef = null;
            }
        }
        catch (e) {
            this.snackBarRef = null;
        }
    }
};
CharacterComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_5__["FirestoreService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], CharacterComponent.prototype, "charId", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTab"]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["QueryList"])
], CharacterComponent.prototype, "mdTabList", void 0);
CharacterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-character',
        template: __webpack_require__(/*! raw-loader!./character-oldstyle.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/character/character-oldstyle.component.html"),
        styles: [__webpack_require__(/*! ./character-oldstyle.component.less */ "./src/app/character/character-oldstyle.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"],
        _firestore_service__WEBPACK_IMPORTED_MODULE_5__["FirestoreService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], CharacterComponent);



/***/ }),

/***/ "./src/app/charlist/charlist.component.less":
/*!**************************************************!*\
  !*** ./src/app/charlist/charlist.component.less ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.c-list {\n  padding: 1em 1em 5em;\n  overflow: auto;\n  height: 100%;\n}\n.c-list header {\n  display: block;\n  padding: 1em;\n  background: #efefef;\n  border: 1px solid #ddd;\n  border-radius: 4px 4px 0 0;\n}\n@media (min-width: 768px) {\n  .c-list {\n    padding-left: 10%;\n    padding-right: 10%;\n  }\n}\n.c-list__item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 1em;\n  background: #fff;\n  border: 1px solid #ddd;\n}\n.c-list__item:last-child {\n  border-radius: 0 0 4px 4px;\n}\n.c-list__item a,\n.c-list__item a:visited {\n  text-decoration: none;\n}\n.c-list .d-grid {\n  grid: auto-flow / 1fr;\n  grid-gap: 1em 1em;\n  padding: 1em 0;\n}\n@media (min-width: 768px) {\n  .c-list .d-grid {\n    grid: auto-flow / 1fr 1fr;\n  }\n}\n@media (min-width: 992px) {\n  .c-list .d-grid {\n    grid: auto-flow / 1fr 1fr 1fr;\n  }\n}\n@media (min-width: 1200px) {\n  .c-list .d-grid {\n    grid: auto-flow / 1fr 1fr 1fr 1fr;\n  }\n}\n.card {\n  height: 100%;\n  position: relative;\n}\n.card .thumbnail {\n  width: 100%;\n  display: block;\n  text-align: center;\n}\n.card img {\n  margin: 0 auto;\n  width: 150px;\n  height: 150px;\n  display: block;\n  border-radius: 100%;\n  border: 1px solid #bbb;\n}\n.card .card-action {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  position: absolute;\n  top: 0.25em;\n  right: 0.5em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvY2hhcmxpc3QvY2hhcmxpc3QuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2NoYXJsaXN0L2NoYXJsaXN0LmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFBYSxTQUFBO0FDSWI7QURGQTtFQUNJLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUNJSjtBRFBBO0VBTVEsY0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsMEJBQUE7QUNJUjtBRERBO0VBQ0k7SUFDSSxpQkFBQTtJQUNBLGtCQUFBO0VDR047QUFDRjtBRENBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFFQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQ0FKO0FERUk7RUFDSSwwQkFBQTtBQ0FSO0FEVkE7O0VBY1EscUJBQUE7QUNBUjtBRE1BO0VBQ0kscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUNKSjtBRE9BO0VBQ0k7SUFDSSx5QkFBQTtFQ0xOO0FBQ0Y7QURPQTtFQUNJO0lBQ0ksNkJBQUE7RUNMTjtBQUNGO0FET0E7RUFDSTtJQUNJLGlDQUFBO0VDTE47QUFDRjtBRFVBO0VBQ0ksWUFBQTtFQUNBLGtCQUFBO0FDUko7QURNQTtFQUtRLFdBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUNSUjtBRENBO0VBV1EsY0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUNUUjtBRFBBO0VBcUJRLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHFCQUFBO1VBQUEseUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ1hSIiwiZmlsZSI6InNyYy9hcHAvY2hhcmxpc3QvY2hhcmxpc3QuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyJoMywgaDQsIGg1IHsgbWFyZ2luOiAwOyB9XG5cbi5jLWxpc3Qge1xuICAgIHBhZGRpbmc6IDFlbSAxZW0gNWVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGhlYWRlciB7XG4gICAgICAgIGRpc3BsYXk6YmxvY2s7XG4gICAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICAgICAgYmFja2dyb3VuZDogI2VmZWZlZjtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7XG4gICAgfVxufVxuQG1lZGlhKG1pbi13aWR0aDo3NjhweCkge1xuICAgIC5jLWxpc3Qge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwJTtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMTAlO1xuICAgIH1cbn1cblxuXG4uYy1saXN0X19pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgcGFkZGluZzogMWVtO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCA0cHggNHB4O1xuICAgIH1cblxuICAgIGEsIGE6dmlzaXRlZCB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB9XG59XG5cblxuXG4uYy1saXN0IC5kLWdyaWQge1xuICAgIGdyaWQ6IGF1dG8tZmxvdyAvIDFmcjtcbiAgICBncmlkLWdhcDogMWVtIDFlbTtcbiAgICBwYWRkaW5nOiAxZW0gMDtcbn1cblxuQG1lZGlhKG1pbi13aWR0aDo3NjhweCkge1xuICAgIC5jLWxpc3QgLmQtZ3JpZCB7XG4gICAgICAgIGdyaWQ6IGF1dG8tZmxvdyAvIDFmciAxZnI7XG4gICAgfVxufVxuQG1lZGlhKG1pbi13aWR0aDo5OTJweCkge1xuICAgIC5jLWxpc3QgLmQtZ3JpZCB7XG4gICAgICAgIGdyaWQ6IGF1dG8tZmxvdyAvIDFmciAxZnIgMWZyO1xuICAgIH1cbn1cbkBtZWRpYShtaW4td2lkdGg6MTIwMHB4KSB7XG4gICAgLmMtbGlzdCAuZC1ncmlkIHtcbiAgICAgICAgZ3JpZDogYXV0by1mbG93IC8gMWZyIDFmciAxZnIgMWZyO1xuICAgIH1cbn1cblxuXG5cbi5jYXJkIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgLnRodW1ibmFpbCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIGltZyB7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICB3aWR0aDogIDE1MHB4O1xuICAgICAgICBoZWlnaHQ6IDE1MHB4O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcbiAgICB9XG5cblxuICAgIC5jYXJkLWFjdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMC4yNWVtO1xuICAgICAgICByaWdodDogMC41ZW07XG4gICAgfVxufVxuIiwiaDMsXG5oNCxcbmg1IHtcbiAgbWFyZ2luOiAwO1xufVxuLmMtbGlzdCB7XG4gIHBhZGRpbmc6IDFlbSAxZW0gNWVtO1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLmMtbGlzdCBoZWFkZXIge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMWVtO1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuYy1saXN0IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwJTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMCU7XG4gIH1cbn1cbi5jLWxpc3RfX2l0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFlbTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbn1cbi5jLWxpc3RfX2l0ZW06bGFzdC1jaGlsZCB7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCA0cHggNHB4O1xufVxuLmMtbGlzdF9faXRlbSBhLFxuLmMtbGlzdF9faXRlbSBhOnZpc2l0ZWQge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG4uYy1saXN0IC5kLWdyaWQge1xuICBncmlkOiBhdXRvLWZsb3cgLyAxZnI7XG4gIGdyaWQtZ2FwOiAxZW0gMWVtO1xuICBwYWRkaW5nOiAxZW0gMDtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuYy1saXN0IC5kLWdyaWQge1xuICAgIGdyaWQ6IGF1dG8tZmxvdyAvIDFmciAxZnI7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xuICAuYy1saXN0IC5kLWdyaWQge1xuICAgIGdyaWQ6IGF1dG8tZmxvdyAvIDFmciAxZnIgMWZyO1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XG4gIC5jLWxpc3QgLmQtZ3JpZCB7XG4gICAgZ3JpZDogYXV0by1mbG93IC8gMWZyIDFmciAxZnIgMWZyO1xuICB9XG59XG4uY2FyZCB7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmNhcmQgLnRodW1ibmFpbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmNhcmQgaW1nIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiYmI7XG59XG4uY2FyZCAuY2FyZC1hY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDAuMjVlbTtcbiAgcmlnaHQ6IDAuNWVtO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/charlist/charlist.component.ts":
/*!************************************************!*\
  !*** ./src/app/charlist/charlist.component.ts ***!
  \************************************************/
/*! exports provided: CharListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharListComponent", function() { return CharListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/es2015/index.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _models_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/error */ "./src/app/models/error.ts");





let CharListComponent = class CharListComponent {
    constructor(service, auth) {
        this.service = service;
        this.auth = auth;
        this.newCharClass = null;
        this._deleting = {};
        this.error = null;
    }
    ngOnInit() {
        // this.userSubscription = this.service.getUser().subscribe( user => {
        this.userSubscription = this.auth.authState.subscribe(user => {
            this.user = user;
            if (user) {
                this.chars = this.service.getUserChars(user.uid);
            }
            else {
                this.chars = null;
                this.error = new _models_error__WEBPACK_IMPORTED_MODULE_4__["SOBError"]('auth', "You must sign in to see your characters");
            }
        });
        this.service.getClasses().then(classes => {
            this.classes = classes.sort((a, b) => a.name > b.name ? 1 : -1);
        });
    }
    create() {
        let char = JSON.parse(JSON.stringify(this.newCharClass));
        char.class = char.name;
        char.name = "My New " + char.class;
        char.uid = this.user.uid;
        char.mutations = [];
        char.attacks = [];
        delete char.upgrades;
        // console.log(char);
        this.service.createCharacter(char)
            .then(() => {
            //list should update
        })
            .catch(e => {
            this.error = new _models_error__WEBPACK_IMPORTED_MODULE_4__["SOBError"]('create', "Unable to create a new character, because " + e.message);
        });
    }
    markAsDeleting(id, bool) {
        if (bool)
            this._deleting[id] = true;
        else
            delete this._deleting[id];
    }
    isDeleting(id) {
        return !!this._deleting[id];
    }
    remove(id) {
        delete this._deleting[id];
        //TODO remove character;
        this.service.removeCharacter(id)
            .then(() => {
        })
            .catch(e => {
            this.error = new _models_error__WEBPACK_IMPORTED_MODULE_4__["SOBError"]("delete", "Unable to delete character, because " + e.message);
        });
    }
    getAvatar(char) {
        let src = 'assets/avatar.png';
        if (char.avatar) {
            src = char.avatar;
        }
        return {
            'background-image': 'url(' + src + ')',
            'background-size': 'auto 100%',
            'background-repeat': 'no-repeat',
            'background-position': '50% 0'
        };
    }
};
CharListComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"] }
];
CharListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'char-list',
        template: __webpack_require__(/*! raw-loader!./charlist.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/charlist/charlist.component.html"),
        styles: [__webpack_require__(/*! ./charlist.component.less */ "./src/app/charlist/charlist.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"]])
], CharListComponent);



/***/ }),

/***/ "./src/app/data_new.ts":
/*!*****************************!*\
  !*** ./src/app/data_new.ts ***!
  \*****************************/
/*! exports provided: Data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
const Data = {
    CLASSES: [
        {
            "abilities": [
                {
                    "desc": "Uses the Six Shooter template. Starts each game fully loaded with 6 Dead Eye Shot bullets",
                    "name": "Quick and the Dead"
                }
            ],
            "classId": "1455a125-99a3-4aeb-bd6c-0d66bce4b87c",
            "combat": 1,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 5,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 6,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Showman",
            "level": 1,
            "melee": 5,
            "movement": 0,
            "name": "Gunslinger",
            "ranged": 3,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 3,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "name": "Best Shot in the West",
                    "requires": "Master of Killin'",
                    "value": "Ranged To Hit 2+"
                },
                {
                    "name": "Call Your Shot",
                    "requires": "Showmanship",
                    "value": "Before rolling To Hit, choose a number. Any die that rolls the chosen number does an extra 1 Damage ignoring Defense even if the shot would normally miss."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        },
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "name": "Card Shark",
                    "requires": "Hushed Whispers",
                    "value": "+1 Cunning and +1 Luck. Any time you win at Gambling in Town, you gain an extra D6 x $10."
                },
                {
                    "name": "Catch Phrase",
                    "value": "Once per Adventure, you may say your Catch Phrase to immediately Heal 2D6 Wounds or to add D6 Damage to one of your Hits."
                },
                {
                    "name": "Cerberus Shots",
                    "requires": "Ricochet Shots",
                    "value": "Start with up to 2 Cerberus Shots in your Six-Shooter. (Blue markers)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Charmed Life",
                    "requires": "Call Your Shot",
                    "value": "You start every Adventure with a Revive Token, usable only by you. Gain 25 XP any time you use it. +1 Lore."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Cool Hand",
                    "value": "At the start of any Fight Turn, you may reduce your Initiative by 3 to gain +1 Shot with a 1-Handed Gun. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "multi": true,
                    "name": "Health",
                    "value": "+D6 Health."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+2 Health and +2 Sanity."
                },
                {
                    "name": "Hellfire Shots",
                    "requires": "Cerberus Shots",
                    "value": "Start with up to 2 Hellfire Shots in your Six-Shooter. (Red markers)"
                },
                {
                    "name": "Hushed Whispers",
                    "value": "You now start every Adventure and Town Stay with an extra 1 Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Killer",
                    "requires": "Card Shark",
                    "value": "You may now use up to 2 Shots from your Six-Shooter on each Hit. +1 Max Grit."
                },
                {
                    "name": "Legend of the West",
                    "requires": "Killer",
                    "value": "Once per Fight, use 2 Grit to add extra Damage to one of your Hits, equal to your current Hero Level."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Master of Killin'",
                    "requires": "Through Shot",
                    "value": "You may now use your Six-Shooter Shots with any Gun, not just Pistols. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "Pistol Fanning",
                    "type": "starting",
                    "value": "Use 1 Grit to double the number of Shots you get with a 1-Handed Gun for one Attack (limit once per turn). To use this ability, you must have 1 Hand slot open."
                },
                {
                    "name": "Quick and the Dead",
                    "value": "Uses the Six Shooter template. Starts each game fully loaded with 6 Dead Eye Shot bullets"
                },
                {
                    "name": "Quickdraw",
                    "type": "starting",
                    "value": "Anytime a new group of Enemies is placed on the board, you may immediately make a free Attack outside of the normal turn sequence.  To use the ability, you must have 1 Hand slot open."
                },
                {
                    "name": "Reload",
                    "type": "starting",
                    "value": "Use 2 Grit to re-fill D6 Shots back into your Six Shooter Template"
                },
                {
                    "name": "Ricochet Shots",
                    "value": "Start with up to 2 Ricochet Shots in your Six Shooter. (Green markers)"
                },
                {
                    "name": "Showmanship",
                    "requires": "Catch Phrase",
                    "value": "Draw an additional Personal Item."
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "The Right Tool",
                    "requires": "Hellfire Shots",
                    "value": "You may start each Adventure with any mix of Shot Types in your Six-Shooter Template. +1 Max Grit."
                },
                {
                    "name": "Through Shot",
                    "requires": "Cool Hand",
                    "value": "Any time you kill and Enemy with a 1-Handed Gun, you may immediately do a free Hit with that Gun to another Enemy in one of the three spaces behind it."
                },
                {
                    "multi": true,
                    "name": "Vendetta",
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "At the start of each Turn (or Day in Town), if you have no Grit, Recover 1 Grit on the D6 roll of 4+.",
                    "name": "Rough Rider"
                },
                {
                    "desc": "Once per Travel, may spend 1 Grit to cancel a Travel Hazard on the D6 roll of 3+ (before any tests are made for that Travel Hazard).",
                    "name": "Happy Trails"
                }
            ],
            "classId": "2e2e4022-35c0-498c-ad78-8b87f5664026",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 14,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "...",
                    "name": "Bandana",
                    "source": "Starting Gear"
                },
                {
                    "description": "...",
                    "name": "Lasso",
                    "source": "Starting Gear"
                },
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Showman, Frontier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Cowboy",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 3,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 1,
                "Strength": 4
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        },
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Bar Fight Vet",
                    "requires": "Take a Swing",
                    "value": "+1 Combat and +1 Strength and +1 Move."
                },
                {
                    "name": "Brash Heroics",
                    "requires": "Living on the Edge",
                    "value": "Once per Fight, use 1 Grit to do D6 Wounds, ignoring Defense to both yourself and one adjacent Enemy. +3 Health."
                },
                {
                    "name": "Close Companion",
                    "requires": "Frontier Rivals",
                    "value": "While you have a Trasnport Animal (it must be named), you are: Willpower 3+."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 2
                        }
                    ],
                    "name": "Daredevil",
                    "type": "starting",
                    "value": "You are +2 Move.  All of your Attacks on adjacent Large size or bigger Enemies are +1 Damage"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Fancy Roping",
                    "value": "Any time you Rope an Enemy with the Lasso, gain 10 XP, and Recover a Grit on the D6 roll of 4+. +1 Initiative."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Fast Return",
                    "requires": "Fancy Roping",
                    "value": "You may now use the Lasso up to twice per Fight, but only one Enemy may be Roped at a time. +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Frontier Rivals",
                    "requires": "Living Off the Land",
                    "value": "You are now +1 Damage on all Attacks vs Tribal, Outlaw, or Beast Enemies, and gain +25 XP for each you kill. +1 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Frontier Vendetta",
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                },
                {
                    "name": "Giddy-Up!",
                    "requires": "Shake It Off",
                    "value": "Once per Fight, use 1 Grit to Mount an adjacent, Large or bigger Enemy (sharing its full base). While Mounted, you may not be targeted by that Enemy and the Enemy is -1 Defense. At the end of each turn, pass a Strength 6+ test (gaining 25 XP) or dismount to an adjacent empty space."
                },
                {
                    "name": "Happy Trails",
                    "value": "Once per Travel, may spend 1 Grit to cancel a Travel Hazard on the D6 roll of 3+ (before any tests are made for that Travel Hazard)."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Living Off the Land",
                    "value": "You gain double XP from Scavenge cards and may roll one extra die when Scavenging. Alos, for each Scavenge card drawn, Heal 1 Wound or Sanity."
                },
                {
                    "name": "Living on the Edge",
                    "value": "While you are at half or less of either your Health or Sanity, your Rough Rider ability triggers on a 3+ instead (or 2+ if both)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "name": "Pale Rider",
                    "requires": "Sucker Punch",
                    "value": "You may now use your Rought Rider ability to Recover Grit as long as you only have 0 or 1 Grit at the start of the turn, and it may be used even while KO'd."
                },
                {
                    "name": "Rough Rider",
                    "value": "At the start of each Turn (or Day in Town), if you have no Grit, Recover 1 Grit on the D6 roll of 4+."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Shake It Off",
                    "requires": "Fast Return",
                    "value": "At the end of any turn while KO'd, use 2 Grit to Recover without rolling for Injury/Madness. Heal 2D6 (any mix) as normal. +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Sucker Punch",
                    "requires": "Bar Fight Vet",
                    "value": "Once per turn, use 1 Grit to use your Strength value (instead of rolling) as Damage for a Combat Hit. +1 Max Grit."
                },
                {
                    "name": "Take a Swing",
                    "value": "Once per turn, use 1 Grit to make a Melee Attack using your Basic Combat (no Items), in addition to your normal Ranged Attack."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "name": "The Deadlier the Better",
                    "requires": "Brash Heroics",
                    "value": "+1 Max Grit and +1 Strength."
                },
                {
                    "name": "Trick Shooting",
                    "type": "starting",
                    "value": "Use 1 Grit when you cause a Hit with a Gun to immediately cause an additional D3 other Enemies in a continuous chain, starting adjacent to the target, to also take a single Hit from that Gun"
                },
                {
                    "name": "Watchman",
                    "type": "starting",
                    "value": "You always Activate before Enemies at your Initiative level.  Also all Heroes in your Posse gain +2 Initiative during the first turn of an Ambush Attack. Extra Starting Gear: Rider's Rifle (replaces Pistol)"
                },
                {
                    "name": "Who Wants to Live Forever?",
                    "requires": "The Deadlier the Better",
                    "value": "You gain +2 Shots with a 1-Handed Gun or +2 Combat (you choose), during you rActivation for every Horror Hit you took form Fear, Terror, or Unspeakable Terror this turn (max +3)."
                },
                {
                    "name": "Wilderness Mastered",
                    "requires": "Close Companion",
                    "value": "While you have 4 or more Clothing Items Equipped (including a Hat), you are: Defense 3+"
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Immortal - At the start of every Adventure, roll 2D6 for each Injury, Curse, Parasite, or Mutation the Hero has. On the roll of 7 or higher, it is healed.  Any time the Hero would be killed, they are considered dead for the rest of the Adventure/Town Stay. At the start of the next Adventure, the Hero is automatically returned to life, but must roll once on the Madness Chart and starts with no Grit.",
                    "name": "Drifter's Secret"
                },
                {
                    "desc": "All Enemies gain 1 Elite ability for free. When traveling to town, always add an extra D3 Traveling Hazards",
                    "name": "Danger Magnet"
                },
                {
                    "desc": "Not restricted to targeting adjacent Enemies first with Ranged Attacks. Starts with 2 Personal Items. At start of each Fight, every other non-Drifter Hero may Recover 1 Grit.",
                    "name": "Long Years Experience"
                },
                {
                    "desc": "-1 Initiative for every Hero adjacent at the start of the turn (min 1)",
                    "name": "Distrustful"
                }
            ],
            "classId": "30d35552-bd40-444d-9558-df917fbc4398",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "darkstone": 0,
                    "description": "Shots equal to agility. Range 6.",
                    "hands": 1,
                    "name": "Trusty Pistol",
                    "slots": 2,
                    "weight": 1
                }
            ],
            "keywords": "Traveler, Frontier, Strange",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Drifter",
            "ranged": 3,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 3,
                "Lore": 4,
                "Luck": 1,
                "Spirit": 3,
                "Strength": 2
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Bad Ass",
                    "requires": "Squint",
                    "value": "Once per turn, use 2 Grit to make an extra Attack. +1 Initiative"
                },
                {
                    "name": "Bitter Enemies",
                    "value": "Choose one (Undead, Demon, Mutant, or Beast). Your Hits are now +2 Damage vs those Enemies and when gaining XP from them, gain an extra 10 XP."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health."
                },
                {
                    "name": "Danger Magnet",
                    "value": "All Enemies gain 1 Elite ability for free. When traveling to town, always add an extra D3 Traveling Hazards"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "name": "Distrustful",
                    "value": "-1 Initiative for every Hero adjacent at the start of the turn (min 1)"
                },
                {
                    "name": "Drifter's Secret",
                    "type": "starting",
                    "value": "Immortal - At the start of every Adventure, roll 2D6 for each Injury, Curse, Parasite, or Mutation the Hero has. On the roll of 7 or higher, it is healed.  Any time the Hero would be killed, they are considered dead for the rest of the Adventure/Town Stay. At the start of the next Adventure, the Hero is automatically returned to life, but must roll once on the Madness Chart and starts with no Grit."
                },
                {
                    "name": "Feared by Evil",
                    "requires": "Skilled Fighter",
                    "value": "At the start of each turn during a Fight, choose an Enemy on your Map Tile. It immediately takes D3 Wounds."
                },
                {
                    "multi": true,
                    "name": "Grizzled by Time",
                    "value": "At the end of every successful Mission, roll a D6. On the roll of 5+, you gain +1 Health."
                },
                {
                    "name": "Gunfighter",
                    "type": "starting",
                    "value": "For ever 6+ you roll To Hit with a Pistol Ranged Attack, you gain +1 Shot with that Gun (max +3 Shots per turn)"
                },
                {
                    "multi": true,
                    "name": "Health",
                    "value": "+3 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Infamous",
                    "requires": "Jaded",
                    "value": "All XP you gain while Traveling, in Town, or from Mission Rewards, is doubled. +1 Initiative."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Jaded",
                    "value": "You gain the Keyword Outlaw and may roll an extra die for movement each turn, and choose which to use. +2 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "name": "Long Stare",
                    "requires": "Unimpressed",
                    "value": "Range To Hit 2+"
                },
                {
                    "name": "Long Years Experience",
                    "value": "Not restricted to targeting adjacent Enemies first with Ranged Attacks. Starts with 2 Personal Items. At start of each Fight, every other non-Drifter Hero may Recover 1 Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Loose Cannon",
                    "requires": "Infamous",
                    "value": "Once per turn, use 1 Grit to add Damage to one of your Hits equal to your current Sanity Damage (max +5). +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "No Name",
                    "type": "starting",
                    "value": "The Hero has no name. Instead, the rest of the posse may decide on a nickname for the Hero. +1 Agility. Start every Adventure with Max Grit."
                },
                {
                    "name": "Resourceful",
                    "type": "starting",
                    "value": "Any time you draw one or more Loot, Scavenge, Darkness, or Encounter cards, you may draw one extra card, then choose one of those to discard. If used for an Encounter draw, the Hero must be on the Map Tile that the Encounter is drawn for."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Restraint",
                    "requires": "Sage Advice",
                    "value": "At the start of every Fight, you may Heal 3 Wounds / Sanity (any mix) from each other Hero. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Sage Advice",
                    "value": "Each other Hero that Activates before you during the turn may Re-roll one of their dice just rolled, of your choice. +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +2 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        },
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "name": "Skilled Fighter",
                    "requires": "Sneer",
                    "value": "+1 Combat and +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Sneer",
                    "requires": "Bitter Enemies",
                    "value": "You are Immune to Horror Hits caused by Enemies. +1 Max Grit."
                },
                {
                    "name": "Spinning Guns",
                    "requires": "Loose Cannon",
                    "value": "Use 2 Grit to immediately do D6 Wounds to every adjacent Enemy, ignoring Defense."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Health"
                },
                {
                    "name": "Squint",
                    "value": "While there are no other Heroes adjacent to you, you are Defense 3+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        },
                        {
                            "affects": "sanity",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain +2 Sanity."
                },
                {
                    "name": "True Hero",
                    "requires": "Weapon of Choice",
                    "value": "Once per Fight, use 3 Grit to immediately Recover a KO'd Hero on your Map Tile. +2 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Unimpressed",
                    "requires": "Bad Ass",
                    "value": "Any time a Growing Dread card is drawn, roll a D6. On the roll of 4+, cancel it. +1 Max Grit."
                },
                {
                    "name": "Weapon of Choice",
                    "requires": "Restraint",
                    "value": "Choose one (Hand Weapon, Pistol, Shotgun, or Rifle). You now add +1 Combat/ +1 Shot to any Weapon you are using with that Keyword."
                }
            ],
            "wealth": 0,
            "willpower": 3,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "2-Handed. Anytime you kill an Enemy with a 2-Handed Gun, you immediately gain +1 Shot with that Gun.",
                    "name": "Rapid Shot"
                },
                {
                    "desc": "You may roll 2 dice for Escape tests and pick the highest roll.",
                    "name": "Evasion"
                }
            ],
            "classId": "3ec81ec0-56da-4e53-b9b6-cb71af815dbf",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 14,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "...",
                    "name": "Hunting Rifle",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Frontier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Rancher",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 2,
                "Lore": 4,
                "Luck": 1,
                "Spirit": 3,
                "Strength": 3
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Combat",
                    "value": "+1 Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "name": "Dark Stone Trap",
                    "requires": "Refinement",
                    "value": "Use 2 Grit to drop a Dark Stone in an adjacent space during your Move. As an Attack, detonate it doing 2D6 Damage to all models in the same and adjacent spaces."
                },
                {
                    "name": "Deadly Shot",
                    "requires": "Sharpshooter",
                    "value": "Your Critical Hits with a Gun are +3 Damage"
                },
                {
                    "name": "Dressed for Adventure",
                    "value": "You gain +2 Health for each Clothing Item you wear. Clothing Items do not count weight against your Carrying limit."
                },
                {
                    "name": "Evasion",
                    "value": "You may roll 2 dice for Escape tests and pick the highest roll."
                },
                {
                    "name": "Farmstead Defender",
                    "type": "starting",
                    "value": "If there are no Enemies adjacent to you, you may Re-roll one missed To Hit roll per turn."
                },
                {
                    "name": "Fisticuffs",
                    "requires": "Is That All You've Got?",
                    "value": "Once per Fight, you may add +1 Damage to all your Combat Hits."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Forge Works",
                    "requires": "Void Enhancement",
                    "value": "While at the Blacksmith in Town, you may pay $500 less for any Upgrades purchased at the Dark Stone Forge. +1 Strength."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity."
                },
                {
                    "name": "Home Remedies",
                    "type": "starting",
                    "value": "Use 1 Grit to Heal D6 Wounds from yourself or another adjacent Hero (gain 5 XP for every Wound healed from another Hero this way)."
                },
                {
                    "name": "I've Seen Worse!",
                    "requires": "Life Goes On",
                    "value": "Use 2 Grit whie KO'd to Heal D6+2 Wounds/Sanity (any mix) and place your model back on the board."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Iron Concentration",
                    "value": "Once per turn, you may Re-roll a single damage roll for one of your Gun Hits."
                },
                {
                    "modifiers": [
                        {
                            "affects": "willpower",
                            "value": -1
                        }
                    ],
                    "name": "Is That All You've Got?",
                    "requires": "Ready for Action",
                    "value": "Willpower 3+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Life Goes On",
                    "requires": "Dressed for Adventure",
                    "value": "You are now +1 Initiative for each Mutation you have (max +3). +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "Rapid Reload",
                    "requires": "Iron Concentration",
                    "value": "You get +1 Shot with any 2-Handed Gun."
                },
                {
                    "name": "Rapid Shot",
                    "value": "2-Handed. Anytime you kill an Enemy with a 2-Handed Gun, you immediately gain +1 Shot with that Gun."
                },
                {
                    "name": "Ready for Action",
                    "value": "You may now carry twice as many Tokens in your Side Bag"
                },
                {
                    "name": "Refinement",
                    "requires": "Forge Works",
                    "value": "You may use 12 Dark Stone to fill an Upgrade Slot on a Gun or Hand Weapon. That Item is now +1 Damage and has 1 Dark Stone."
                },
                {
                    "name": "Sharpshooter",
                    "requires": "Rapid Reload",
                    "value": "Any time you kill an Enemy with a Gun, you may immediately do D6 Damage to anoter Enemy in one of the three spaces behind it."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        },
                        {
                            "affects": "defense",
                            "value": -1
                        }
                    ],
                    "name": "Shrug It Off",
                    "requires": "Fisticuffs",
                    "value": "Defense 3+. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "name": "Swinging Rifle",
                    "type": "starting",
                    "value": "Use 1 Grit during your Activation to do 1 automatic Combat Hit to every adjacent Enemy. This does not count as your Attack. Use only while equipped with a 2-Handed Gun."
                },
                {
                    "modifiers": [
                        {
                            "affects": "melee",
                            "value": -1
                        }
                    ],
                    "name": "Up Close and Personal",
                    "requires": "I've Seen Worse!",
                    "value": "Melee To Hit 3+"
                },
                {
                    "multi": true,
                    "name": "Vendetta",
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Void Enhancement",
                    "value": "Once per turn, you may use a Dark Stone to add +D6 Damage to one of your Hits. +1 Max Grit."
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "(Shotgun) Once per turn, when you kill an Enemy with a Shotgun, you gain +1 Shot with that Shotgun",
                    "name": "Double Shot"
                }
            ],
            "classId": "45b3ac67-15f6-4654-bba1-3c73493aa821",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "darkstone": 0,
                    "description": "Range 5; Shots: 1; D8 To Hit and Damage (Crit on 6/7/8)",
                    "hands": 2,
                    "name": "Shotgun",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "description": "1x per adventure, give all heroes choice of +2 combat or +2 shot during next activation",
                    "name": "US Marshal Badge",
                    "source": "Starting Gear",
                    "usage": "Adventure"
                }
            ],
            "keywords": "Law, Traveler",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "US Marshal",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 4,
                "Lore": 1,
                "Luck": 3,
                "Spirit": 2,
                "Strength": 2
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "A Story to Tell",
                    "value": "You gain extra Movement each turn equal to your Lore. +1 Lore."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Above the Law",
                    "requires": "Look Out!",
                    "value": "Use 2 Grit to ready your Marshal Badge. Limit once per Adventure. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "name": "Back Up Plan",
                    "requires": "A Story to Tell",
                    "value": "You may now Recover a Grit on a Move roll of 6 as well as the normal 1."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Been Around",
                    "requires": "Saddle Bags",
                    "value": "Any time you would take 1 or more Sanity Damage, take 1 fewer. +1 Lore."
                },
                {
                    "name": "Cleaning up the West",
                    "value": "Any time you kill an Enemy, you may Heal 1 Wound and 1 Sanity and gain 10 XP."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Combat",
                    "value": "+1 Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Dead or Alive",
                    "requires": "Hunter",
                    "value": "Use 2 Grit to cancel a Darkness or Growing Dread card. +1 Max Grit."
                },
                {
                    "name": "Double Shot",
                    "value": "(Shotgun) Once per turn, when you kill an Enemy with a Shotgun, you gain +1 Shot with that Shotgun"
                },
                {
                    "name": "End of the Line",
                    "requires": "Dead or Alive",
                    "value": "Once per turn, use 3 Grit to do one automatic Hit to every Enemy on y our Map Tile. These Hits use the D8 for Damage."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Focus",
                    "value": "You no longer need to target adjacent Enemies first with Ranged Attacks. +1 Max Grit."
                },
                {
                    "name": "Hardened Resolve",
                    "value": "Use 1 Grit to Heal 3 Wounds or 3 Sanity from yourself or another Hero on you Map Tile (gain 5 XP for ever Wound/Sanity healed from another Hero this way). You are +2 Sanity."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity"
                },
                {
                    "name": "Hunter",
                    "requires": "Focus",
                    "value": "At the start of each Adventure, choose a specific Enemy Type. You are +1 Damage against that Enemy and gain $10 for each you kill."
                },
                {
                    "name": "I Don't Think So!",
                    "requires": "No Nonsense",
                    "value": "Once per turn, you may take 1 Corruption Hit to force an Enemy on your Map Tile to Re-roll a single die just rolled"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Look Out!",
                    "value": "Use 1 Grit to transfer all Hits just taken by an adjacent Hero to yourself (before Defense rolls). Gain 10 XP for each Hit transferred."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "No Nonsense",
                    "requires": "No Shame In It",
                    "value": "Add +1 Shot to any Shotgun you are using. Rolling the same Mutation twice on the chart has no effect on you."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "No Shame In It",
                    "value": "Once per turn, you may take 1 Corruption Hit to use a Dark Stone in place of a Grit. +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "One Man Army",
                    "requires": "Whirling Strike",
                    "value": "While you are the only Hero on your Map Tile, you gain +1 Combat or +1 Shot with a Gun. +1 Max Grit."
                },
                {
                    "name": "Rolling Thunder",
                    "value": "Anytime you kill an Enemy, you may Recover a Grit on the D6 roll of 4, 5, or 6."
                },
                {
                    "name": "Saddle Bags",
                    "requires": "Back Up Plan",
                    "value": "You may now carry an extra 3 Tokens in your Side Bag."
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "That Does It!",
                    "requires": "I Don't Think So!",
                    "value": "Your Hits are +1 Damage for each Mutation you have (max +3). +1 Strength."
                },
                {
                    "multi": true,
                    "name": "Vendetta",
                    "value": "Choose a specific Enemy Type. From now on, any time you collect XP from that Enemy Type, collect an addition +10 XP."
                },
                {
                    "name": "Whirling Strike",
                    "requires": "Above the Law",
                    "value": "Use 2 Grit as an Attack to roll your full Combat against every adjacent Enemy."
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Starts with one Gambling Trick (draw 2, choose 1). Each trick may only be used 1x turn. Any time you Catch your Breath, you may also Recover D3 Fortune tokens.",
                    "name": "Lady Luck"
                },
                {
                    "desc": "Whenever you collect Gold from any Gambling in Town, you may collect an extra D6 x $50",
                    "name": "Poker Face"
                }
            ],
            "classId": "47aE4QTcdX3bs6J4YoZr",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "fortune": {
                "current": 3,
                "max": 3
            },
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "name": "Gambling Trick"
                },
                {
                    "name": "Fortune's Favor"
                }
            ],
            "keywords": "Performer, Showman",
            "level": 1,
            "melee": 5,
            "movement": 0,
            "name": "Gambler",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 4,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 1,
                "Strength": 2
            },
            "tricks": [
                {
                    "desc": "This is a description",
                    "name": "Trick Name"
                }
            ],
            "upgrades": [
                {
                    "name": "Fancy Footwork",
                    "type": "starting",
                    "value": "You may roll and extra die for Move each turn and choose which to use. If doubles are rolled on your Move dice, also recover 1 Fortune token"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "name": "Side Bet",
                    "type": "starting",
                    "value": "+1 Luck. When making any Skill test, if you roll 3 of a kind, recover 1 Fortune token. However if you roll three 1s, lose D3 Fortune tokens instead"
                },
                {
                    "name": "High Roller",
                    "type": "starting",
                    "value": "Your To-Hit rolls of 6+ do +1 Damage. Whenever you recover a Grit, you may also recover 1 Fortune token."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "name": "Nimble Fingers",
                    "value": "New Gambling Trick. +1 Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "movement",
                            "value": 1
                        }
                    ],
                    "name": "On a Roll",
                    "value": "Whenever you kill an Enemy, you may recover 1 Fortune token. +1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "name": "Well, I Say!",
                    "value": "1x per Adventure, you may recover Fortune tokens up to your max. +1 Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "fortune",
                            "value": 1
                        }
                    ],
                    "name": "Play to Win",
                    "value": "Your Poker Face ability now gives a bonus D6+2 x $50 instead, but also gives you and extra Unwanted Attention marker. +1 Fortune"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Fortune",
                            "value": 1
                        }
                    ],
                    "name": "Tell",
                    "requires": "Nimble Fingers",
                    "value": "For each To Hit roll of 1 an Enemy rolls when attacking you, you may cancel one of its other successful To Hit rolls on you. +1 Fortune"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "name": "Box Cars",
                    "requires": "On a Roll",
                    "value": "Any time you roll a 6 for Willpower, Defense, or any skill test, you may change any other single die of that test into a 6 as well. +1 Initiative"
                },
                {
                    "name": "Affectation",
                    "requires": "Well, I Say!",
                    "value": "At the start of each Adventure, you may draw a random Personal Item to use until the end of that Adventure"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "name": "Cutthroat",
                    "requires": "Play to Win",
                    "value": "You add +1 Shot and +1 Damage to any Light Gun you use. +1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "name": "Old Hand",
                    "requires": "Tell",
                    "value": "New Gambling Trick. +1 Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "fortune",
                            "value": 1
                        }
                    ],
                    "name": "Blow for Luck",
                    "requires": "Box Cars",
                    "value": "1x turn, you may spend 1 Grit to recover 1 Fortune or vice versa. +1 Fortune"
                },
                {
                    "name": "Fancy Pants",
                    "requires": "Affectation",
                    "value": "You are +1 Sanity and +1 Health for each of the following Clothing items you have equipped: Hat, Belt, Coat, Pants, Torso, Gloves, Boots. You may not stay at the Camp Site in Town."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        },
                        {
                            "affects": "defense",
                            "value": -1
                        }
                    ],
                    "name": "Full House",
                    "requires": "Cutthroat",
                    "value": "+1 Cunning and Defense 3+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "name": "Make Your Own Luck",
                    "requires": "Old Hand",
                    "value": "You start every Adventure with a Revive token, usable only by you. Gain 25 XP any time you use it. +1 Luck"
                },
                {
                    "name": "Let It Ride",
                    "requires": "Blow for Luck",
                    "value": "Any time you roll 4 or more dice together, you may choose any number of those dice to re-roll once. These dice do not count as having been re-rolled."
                },
                {
                    "modifiers": [
                        {
                            "affects": "fortune",
                            "value": 1
                        }
                    ],
                    "name": "Entourage",
                    "requires": "Fancy Pants",
                    "value": "You only need to pay 50% of the base 'Cost to Hire' for any Allies. All Items and tokens in Town cost you 20% less (rounding up to nearest $5). +1 Fortune"
                },
                {
                    "name": "Aces High",
                    "requires": "Full House",
                    "value": "If your Cunning is higher than an Enemy's Initiative, you are +1 on To-Hit rolls assigned to that Enemy (6+ is a Critical Hit)"
                },
                {
                    "multi": true,
                    "name": "Of Many Talents",
                    "roll": 2,
                    "value": "At the start of each Adventure, choose one of the following keywords to have until the end of that Adventure: Traveler, Frontier, Outlaw, Soldier, Strange"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Cunning",
                    "roll": 3,
                    "value": "+1 Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Initiative",
                    "roll": 4,
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Strength",
                    "roll": 5,
                    "value": "+1 Strength, +D6 Health/Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "movement",
                            "value": 0
                        },
                        {
                            "affects": "Spirit",
                            "value": 0
                        }
                    ],
                    "multi": true,
                    "name": "+1 Move or +1 Spirit",
                    "roll": 6,
                    "value": "+1 Move or +1 Spirit, +D6 Health"
                },
                {
                    "modifiers": [],
                    "multi": true,
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value": "+D6 Health and +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "movement",
                            "value": 0
                        },
                        {
                            "affects": "Lore",
                            "value": 0
                        }
                    ],
                    "multi": true,
                    "name": "+1 Move or +1 Lore",
                    "roll": 8,
                    "value": "+1 Move or +1 Lore, +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value": "+1 Side Bag Capacity and +D6 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value": "+1 Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Luck",
                    "roll": 11,
                    "value": "+1 Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value": "You can now hold 2 more Corruption Points before mutating"
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Starts with a Swamps of Jargono Personal Item instead of a normal Personal Item. Also, +3 Lore while in Swamps of Jargono.",
                    "name": "Other World Native (Jargono)"
                },
                {
                    "desc": "You are +1 Damage on all of your Attacks against Beast Enemies. Also, gain +2 Initiative in the first turn of an Ambush Attack",
                    "name": "Hunter's Reflexes"
                },
                {
                    "desc": "You may not use Guns, Books, or Tech items",
                    "name": "Primitive"
                }
            ],
            "classId": "48bdac8c-01a4-4284-ba73-775a79dda210",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 11,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "darkstone": 1,
                    "description": "Crit on combat rolls of 5 or 6",
                    "hands": 1,
                    "source": "Jargono",
                    "weight": 1
                },
                {
                    "description": "...",
                    "name": "Tribal Shield",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Other World (Jargono), Tribal",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Jargono Native",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 11
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 2,
                "Lore": 1,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 3
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Ancestor's Favor",
                    "requires": "Tribal Warrior",
                    "value": "Whenever you kill a Large or bigger Enemy, you may move the Darkness back one space on the Depth Track (does not trigger special spaces moved back through). +1 Spirit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Battle Stance",
                    "value": "Whenever one or more Enemy groups are placed in Ambush, Recover 1 Grit. +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Deep Cuts",
                    "requires": "Quick Shot",
                    "value": "You may double the Endurance value of any Enemy while Attacking it. +1 Strength."
                },
                {
                    "name": "Enemy Tracks",
                    "value": "Once per Adventure, use 1 Grit to switch Attack (or Ambush) on an Exploration Token into 2x Encounters instead. The rest of the Token remains the same."
                },
                {
                    "multi": true,
                    "name": "Fighting Style",
                    "value": "Choose a specific Enemy Type. From now on you take 1 less Damage from any Attack made by an Enemy of that Type (minimum 1)."
                },
                {
                    "name": "Fungus Grower",
                    "requires": "Stealth Strike",
                    "value": "You gain 1 Swamp Fungus Side Bag Token at the start of each Adventure."
                },
                {
                    "name": "Fury of Jargono",
                    "requires": "Mighty Swing",
                    "value": "Once per Fight, use 2 Grit to make an extra Attack this Activation. +2 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "melee",
                            "value": -1
                        }
                    ],
                    "name": "Honored Champion",
                    "requires": "Shield Charge",
                    "value": "Melee To Hit 3+"
                },
                {
                    "name": "Hunter's Reflexes",
                    "value": "You are +1 Damage on all of your Attacks against Beast Enemies. Also, gain +2 Initiative in the first turn of an Ambush Attack"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Jumping Attack",
                    "value": "Once per Fight, you may spend un-used movement points from your Move to add Damge to one of your Combat Hits. Ever 2 Move = +1 Damage."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Lore (Health or Sanity)",
                    "value": "+1 Lore. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Lore (Health)",
                    "value": "+1 Lore. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Health."
                },
                {
                    "name": "Master of the Hunt",
                    "requires": "Deep Cuts",
                    "value": "You gain +2 Combat and +2 Shots with any Bow you are using, while there are one or more Extra Large (or bigger) Enemies on the board."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "name": "Mighty Swing",
                    "requires": "Spinning Slash",
                    "value": "+1 Combat and +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "Other World Native (Jargono)",
                    "value": "Starts with a Swamps of Jargono Personal Item instead of a normal Personal Item. Also, +3 Lore while in Swamps of Jargono."
                },
                {
                    "name": "Pit Fighter",
                    "type": "starting",
                    "value": "If you start your Activation adjacent to one or more Enemies, Recover a Grit on the D6 roll of 5+. Also, once per turn, while you have a Shield equipped, you may force one Enemy Hit just rolled against you to be Re-rolled."
                },
                {
                    "name": "Primitive",
                    "value": "You may not use Guns, Books, or Tech items"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Quick Shot",
                    "requires": "Enemy Tracks",
                    "value": "You may add +1 Shot to any Bow you are using. +1 Initiative and +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Serpent Slayer",
                    "type": "starting",
                    "value": "You are +1 Move and may move through other models. You are also immune to Poison markers. Extra Starting Gear: Dark Stone Daggers (replaces Tribal Shield and Dark Stone Blade)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Shield Bash",
                    "requires": "Battle Stance",
                    "value": "While you have a Shield equipped, you are +1 Combat. +1 Max Grit."
                },
                {
                    "name": "Shield Charge",
                    "requires": "Shield Bash",
                    "value": "Use 1 Grit, while you have  Shield equipped, to move through other models this turn. Each model moved through takes 2 Wounds, ignoring Defense (limit once per model)."
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Spinning Slash",
                    "requires": "Jumping Attack",
                    "value": "While you have a 2-Handed Item Hand Weapon equipped, you are +1 Damage with Combat Hits. +1 Initiative."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Stealth Strike",
                    "value": "Your Critical Hits are +1 Damage and you are +1 to all Escape rolls. +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "name": "Treetop Hunter",
                    "type": "starting",
                    "value": "Ranged To Hit: 4+.  Double-shot (Bow) - Once per turn, when you kill an enemy with a Bow, you gain +1 Shot with that Bow. Extra Starting Gear: Jargono Bow (replaces Tribal Shield)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Tribal Warrior",
                    "requires": "Fungus Grower",
                    "value": "You are +2 Health for each Tribal Item you have (max +10). +1 Strength."
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "+1 Move",
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Fast"
                },
                {
                    "desc": "Once per Adventure, you may discard and Re-draw an Exploration Token or Encounter card just revealed.",
                    "name": "Tracker"
                }
            ],
            "classId": "651350a6-d930-4372-9bce-1d200149362a",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "description": "...",
                    "name": "Carbine",
                    "source": "Starting Gear"
                },
                {
                    "description": "+1 Damage. Upgrade: Mark of the Void.",
                    "name": "Indian Hatchet",
                    "slots": 2,
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Scout, Tribal",
            "level": 1,
            "melee": 4,
            "movement": 1,
            "name": "Indian Scout",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 2
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        },
                        {
                            "affects": "health",
                            "value": "2"
                        },
                        {
                            "affects": "sanity",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain 2 Health and +2 Sanity."
                },
                {
                    "name": "Battle Scout",
                    "value": "Once per Adventure, give all other Heroes +2 Initiative unti the end of the turn. You may Recover 1 Grit."
                },
                {
                    "name": "Cavalry Scout",
                    "type": "starting",
                    "value": "You may roll 2 dice for Move each turn and choose which to use."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Cleansing Ritual",
                    "requires": "Guardian Spirit",
                    "value": "Use 2 Grit to remove a Corruption Point from yourself or an adjacent Hero. +1 Max Grit."
                },
                {
                    "name": "Counting Trophies",
                    "requires": "Warrior's Heart",
                    "value": "Once per Adventure, you may Heal Sanity Damage equal to the number of Enemies you have killed during this Mission. This may be Healed from any mix of Heroes."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        },
                        {
                            "affects": "health",
                            "value": "2"
                        },
                        {
                            "affects": "sanity",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +2 Health and +2 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Duck and Roll",
                    "requires": "Moves in the Shadows",
                    "value": "Use 2 Grit to ignore all damage just done to you by a single source. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Eye for Detail",
                    "requires": "Know Your Prey",
                    "value": "When you successfully Scavenge, you may draw one extra card, then choose one to discard. +1 Cunning."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "name": "Fast",
                    "value": "+1 Move"
                },
                {
                    "name": "Guardian Spirit",
                    "requires": "Voices of the Ancestors",
                    "value": "Once per Adventure, you may cancel a Growing Dread or Darkness card on the D6 roll of 3+."
                },
                {
                    "modifiers": [
                        {
                            "affects": "health",
                            "value": 3
                        },
                        {
                            "affects": "sanity",
                            "value": 3
                        }
                    ],
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+3 Health and +3 Sanity."
                },
                {
                    "name": "Heightened Senses",
                    "type": "starting",
                    "value": "Once per turn you may Re-roll a single To Hit roll or Defense roll."
                },
                {
                    "name": "I Smell Death Here!",
                    "requires": "Eye for Detail",
                    "value": "Once per turn, use 1 Grit to discard and re-draw a Threat card just drawn. Gain 25 XP."
                },
                {
                    "name": "Know Your Prey",
                    "requires": "This Way",
                    "value": "Once per turn, you may Re-roll a Damage roll for one of your Hits."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +2 Health and +2 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +2 Health and +2 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "Moves in the Shadows",
                    "requires": "Pass Through",
                    "value": "You are now Defense 3+ during the first turn of the Fight."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Pass Through",
                    "value": "You may now roll 2 dice for Escape tests and choose which roll to use. +1 Agility."
                },
                {
                    "name": "Savage Attack",
                    "type": "starting",
                    "value": "Use 1 Grit to gain +2 Combat until the end of your turn (Limit once per turn)."
                },
                {
                    "name": "Shadow Strike",
                    "requires": "Duck and Roll",
                    "value": "Once per Adventure, transfer 2D6 Wounds from yourself to an adjacent Enemy, ignoring Defense."
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +2 Health and +2 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain 2 Health and +2 Sanity."
                },
                {
                    "name": "This Way",
                    "value": "Once per turn, use 1 Grit to discard and re-draw a Map card just drawn."
                },
                {
                    "name": "Tracker",
                    "value": "Once per Adventure, you may discard and Re-draw an Exploration Token or Encounter card just revealed."
                },
                {
                    "multi": true,
                    "name": "Vendetta",
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                },
                {
                    "name": "Vengeful Spirits",
                    "requires": "Cleansing Ritual",
                    "value": "Once per Fight, use 2 Grit to do one automatic Hit to ever Enemy on your Map Tile. Heal 1 Sanity Damage for each Hit done."
                },
                {
                    "name": "Voices of the Ancestors",
                    "value": "You may take 4 Sanity Damage, ignoring Willpower to Recover a Grit"
                },
                {
                    "name": "Warrior's Heart",
                    "requires": "Warrior's Spirit",
                    "value": "Spirit Armor 5+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Warrior's Spirit",
                    "requires": "Battle Scout",
                    "value": "You may now Activate before Enemies at your Initiative level. +1 Spirit."
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "When using Bandages Tokens to Heal yourself or another Hero, add +3 to the roll (or +5 at Hero Level 5 or higher)",
                    "name": "Medical Training"
                },
                {
                    "desc": "Once per Adventure or Town Stay, use 1 Grit to choose an Injury or Mutation on another Hero and roll a D6. On 5+, that Injury/Mutation is Healed (gain 50 XP). On 1, the Hero loses 1 Health Permanently instead. May not be used during a Fight.",
                    "name": "Field Surgery"
                }
            ],
            "classId": "6bc4fc3a-4af5-4cf9-b6ad-8615501aca26",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "description": "...",
                    "name": "Doc's Bag",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Frontier, Medical",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Frontier Doc",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 4,
                "Lore": 3,
                "Luck": 1,
                "Spirit": 2,
                "Strength": 2
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Anatomy",
                    "requires": "Careful Study",
                    "value": "You get Critical Hits on To Hit rolls of 5+ against Enemy Types you have encountered before. +1 Lore."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Antidote",
                    "value": "Use 1 Grit to let every Hero on your Map Tile choose: Discard all Poison Markers or Discard 1 Corruption Point on D6 roll of 4+. +1 Lore."
                },
                {
                    "name": "Battlefield Experience",
                    "type": "starting",
                    "value": "You may move through other models during your movement and you automatically pass all Escape tests. At the start of every Fight, Recover 1 Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Careful Study",
                    "requires": "Dissection",
                    "value": "You are +1 on Defense rolls against HIts from your Enemy Types you have encountered before. +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Chemistry",
                    "requires": "Ingenuity",
                    "value": "Use 1 Grit and discard any 2 different Side Bag Tokens to create a dynamite token. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        },
                        {
                            "affects": "defense",
                            "value": "4"
                        }
                    ],
                    "name": "Conclusions",
                    "requires": "Anatomy",
                    "value": "+1 Cunning and +1 Initiative and Defense 4+."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "name": "Dispassionate",
                    "requires": "Treatment",
                    "value": "You are immune to the Enemy abilities Fear and Terror. +1 Combat."
                },
                {
                    "name": "Dissection",
                    "value": "Once per turn, when you kill an Enemy with a Combat Hit, Recover a Grit on the D6 roll of 4+. +3 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "name": "Do No Harm",
                    "requires": "Hold Them Down",
                    "value": "There is no longer a penalty for a 1 result when using Field Surgery. +1 Luck."
                },
                {
                    "multi": true,
                    "name": "Doc's Speciality",
                    "value": "Choose another Hero class. From now on, any time you Heal Wounds from a Hero of that Class, Heal an extra +1 Wound and +1 Sanity Damage from them."
                },
                {
                    "name": "Expert Surgeon",
                    "type": "starting",
                    "value": "When using your Field Surgery ability, the Injury/Mutation is Healed on the D6 roll of 4+ now. Extra Starting Gear: Surgeon's Saw."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Explorer",
                    "requires": "Do No Harm",
                    "value": "While in an Other World, you roll 1 extr die on all Skill tests and, at the start of your Acctivation each turn, you Recover a Grit on the D6 roll of 4+. +1 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Explorer's Notes",
                    "value": "Choose an Other World. From now on, any time you collect XP in that world, collect an extra +5 XP."
                },
                {
                    "name": "Field Research",
                    "type": "starting",
                    "value": "The first time you encounter a new specific Enemy Type, gain 50 XP (variations count as a new type). Your Attacks are +1 Damage against all Enemy Types you have ever encountered in previous Fights. Extra Starting Gear: Collection Jar."
                },
                {
                    "name": "Field Surgery",
                    "value": "Once per Adventure or Town Stay, use 1 Grit to choose an Injury or Mutation on another Hero and roll a D6. On 5+, that Injury/Mutation is Healed (gain 50 XP). On 1, the Hero loses 1 Health Permanently instead. May not be used during a Fight."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Gadgeteer",
                    "requires": "Tinkerer",
                    "value": "Once per Fight, you may add a number of Damage to one of your Hits equal to the number of Tech Items you currently carry (max +10). +1 Cunning."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Heal Thy Self",
                    "requires": "Dispassionate",
                    "value": "You automatically Heal 2 Wounds at the start of every turn. You may also use Field Surgery on yourself now. +1 Strength."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+2D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        },
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Hold Them Down",
                    "requires": "Antidote",
                    "value": "+1 Combat and +1 Strength."
                },
                {
                    "name": "Ingenuity",
                    "value": "Once per turn, when you use the effect of a Side Bag Token, you may use 1 Grit to roll a D6. On the roll of 4+, do not discard the Side Bag Token."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "name": "Medical Training",
                    "value": "When using Bandages Tokens to Heal yourself or another Hero, add +3 to the roll (or +5 at Hero Level 5 or higher)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move. Also gain +D8 Sanity."
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+1 Side Bag Token Capacity. Also gain +D8 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength."
                },
                {
                    "name": "Tinkerer",
                    "requires": "Chemistry",
                    "value": "Use 2 Grit to add the following UPgrade to an Item you are carrying: Gadget (1 Upgrade Slot). The Item gains the Keyword Tech and grants +1 Health (or +1 Damage if a Hand Weapon or Gun)."
                },
                {
                    "name": "Treatment",
                    "requires": "Triage",
                    "value": "You now gain 10 XP for each Wound Healed from another Hero. Also once per turn, you may remove 1 status effect marker from yourself or an adjacent Hero."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Triage",
                    "value": "Whenever you Heal Wounds from another Hero, Reocver a Grit on the D6 roll of 4+. +1 Max Grit."
                }
            ],
            "wealth": 0,
            "willpower": 3,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "The Hero's To Hit rolls of 8+ double the Damage rolled for that Hit. Only usable with weapons that use D8 for To Hit rolls",
                    "name": "Death Blow"
                },
                {
                    "desc": "Whenever the Hero collects Gold or Dark Stone from Loot, Scavenge, or Encounter cards, double the amount collected.",
                    "name": "Expert Miner"
                },
                {
                    "desc": "May not use Guns or Tech items",
                    "name": "Crotchety"
                }
            ],
            "classId": "6d198a74-1b2a-4f60-bf51-2c1e2d0ec2e1",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 16,
                "wounds": 0
            },
            "init": 2,
            "items": [
                {
                    "cost": 650,
                    "description": "Melee Attacks D8 and Crit on 6,7,8  +1 Damage",
                    "hands": 2,
                    "name": "Heavy Pick Axe",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "cost": 350,
                    "description": "Once per Adventure Heal 2d8 Wounds or 2d6 Sanity",
                    "name": "Miner's Canteen",
                    "source": "Starting Gear",
                    "usage": "Adventure",
                    "weight": 1
                }
            ],
            "keywords": "Frontier, Law",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Prospector",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 14
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 1,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 3,
                "Spirit": 2,
                "Strength": 4
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility.  Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "name": "All Mine!",
                    "requires": "It's Mine!",
                    "value": "While carrying 4 or more weight worth of Items, you are Defense 3+."
                },
                {
                    "name": "Blast Miner",
                    "type": "starting",
                    "value": "Start every Adventure with 1 free Dynamite Token in your sidebag. You also gain: Free Attack (once per Fight) - Throw Dynamite"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Crazed",
                    "requires": "Impressive Facial Hair",
                    "value": "While at half or less Sanity, your Attacks are +1 Damage. +1 Max Grit."
                },
                {
                    "name": "Crotchety",
                    "value": "May not use Guns or Tech items"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Dark Stone Life",
                    "requires": "Gold Fever",
                    "value": "Your Attacks are +1 Damage for every Mutation you have (max +3). +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "name": "Death Blow",
                    "value": "The Hero's To Hit rolls of 8+ double the Damage rolled for that Hit. Only usable with weapons that use D8 for To Hit rolls"
                },
                {
                    "name": "Eagle Eye",
                    "type": "starting",
                    "value": "You may Scavenge a Map Tile even if it already has a Scavenged marker on it (Limit one extra Scavenge per Map Tile). Roll one extra die when Scavenging."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "name": "Every Rock",
                    "value": "You may now Scavenge End Caps as though they were full Map Tiles (not including Gates). +1 Move."
                },
                {
                    "name": "Expert Miner",
                    "value": "Whenever the Hero collects Gold or Dark Stone from Loot, Scavenge, or Encounter cards, double the amount collected."
                },
                {
                    "name": "Gold Fever",
                    "requires": "Crazed",
                    "value": "During an Adventure, once per turn, when collecting Gold, you may Recover 1 Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Good Find!",
                    "value": "After any Hero in the Posse collects Gold from a Loot or Scavenge card, they may collect an extra $25. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Greedy",
                    "requires": "Wheeler Dealer",
                    "value": "When drawing Loot cards, you may spend 1 Grit to discard and Re-draw any number of them. +1 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        },
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Hearty Swing",
                    "requires": "Staking Claims",
                    "value": "+1 Combat and +1 Agility"
                },
                {
                    "name": "Impressive Facial Hair",
                    "value": "Once per adventure, you may tug at your facial hair to Recover Grit up to your Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "It's Mine!",
                    "requires": "Greedy",
                    "value": "You gain the Keyword Outlaw and may now use Shotgun Ranged Weapons. +1 Initiative."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "name": "Lucky Bugger",
                    "requires": "Every Rock",
                    "value": "When using your Expert Miner ability, you may make a Luck 6+ test. If passed, Triple the amount collected. +1 Luck"
                },
                {
                    "name": "Master Scavenger",
                    "requires": "Squint Eye",
                    "value": "After Scavenging, you may spend 1 Grit to set aside a Scavenge card drawn. That card is removed from the deck until the end of the Adventure (Limit 4 cards)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "multi": true,
                    "name": "Miner's Vendetta",
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                },
                {
                    "name": "Mining Guide",
                    "requires": "Hearty Swing",
                    "value": "Once per turn, while holding the Lantern, you may spend 1 Grit to Re-roll one of the dice for the Hold Back the Darkness roll."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health"
                },
                {
                    "name": "Speed of Greed",
                    "type": "starting",
                    "value": "Once per turn, use 1 Grit to double your Initiative and Move, as well as allowing you to automatically pass all Escape tests. Also your Combat Hits are +1 Damage until the end of that turn."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Squint Eye",
                    "requires": "Lucky Bugger",
                    "value": "Once per turn after drawing a Gear or Artifact card, you may discard it and Re-draw. +1 Max Grit."
                },
                {
                    "name": "Staking Claims",
                    "requires": "Good Find!",
                    "value": "Once per Adventure, you may cancel and Re-draw an Exploration Token. When selling Gear or Artifact cards in Town, gain an extra D6 x $50"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        },
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Luck",
                    "value": "+1 Strength and +1 Luck. Also gain D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Wheeler Dealer",
                    "value": "You may buy Side Bag Tokens in town for half price (round up to nearest $5). +1 Initiative."
                }
            ],
            "wealth": 0,
            "willpower": 5,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Once per Attack, you may Re-roll one To Hit roll.",
                    "name": "Laying Down the Law"
                }
            ],
            "classId": "7309fd50-b111-4d16-8a89-c500807b3472",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "cost": "250",
                    "description": "Range 6; Shots 3",
                    "hands": 1,
                    "name": "Peacekeeper Pistol",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "description": "Once per Adventure, give all Heroes +2 Shots with a Gun or +2 Combat (they choose) during their next Activation",
                    "name": "Sheriff Badge",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Frontier, Law",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Law Man",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 4,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 1,
                "Strength": 3
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "name": "Battle Plan",
                    "requires": "Teamwork",
                    "value": "Any time you roll a 1 for Move, all Heroes on your Map Tile may Recover 1 Grit. Gain 15 XP for each Grit Recovered."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Cold Stare",
                    "value": "You may now Activate before Enemies at your Initiative Level. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Combat",
                    "value": "+1 Combat"
                },
                {
                    "name": "Cool Head",
                    "requires": "Relentless",
                    "value": "When using Laying Down the Law, you may re-roll any number of To Hit rolls."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Fair Warning",
                    "value": "You do +2 Damage on any Hits to an Enemy with a higher Initiative. +1 Max Grit."
                },
                {
                    "name": "Frontier Justice",
                    "type": "starting",
                    "value": "Use 1 Grit to add +3 Damage to one of your Hits (limit once per Hit)."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Iron Will",
                    "type": "starting",
                    "value": "Use 1 Grit to cancel a Darkness card on the D6 roll of 4, 5, or 6 (limit once per turn)."
                },
                {
                    "name": "Judge, Jury, and Executioner",
                    "requires": "Learning to Live With It",
                    "value": "Use 1 Grit to make all of your Attacks get Critical Hits on rolls of 5 or 6 until the end of your turn."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Justice Never Sleeps",
                    "requires": "Cool Head",
                    "value": "+1 Initiative and +1 Max Grit"
                },
                {
                    "name": "Laying Down the Law",
                    "value": "Once per Attack, you may Re-roll one To Hit roll."
                },
                {
                    "name": "Learning to Live With It",
                    "requires": "Long Arm of the Law",
                    "value": "Any time you kill an Enemy, Heal 2 Sanity Damage."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        },
                        {
                            "affects": "Strength",
                            "value": "1"
                        },
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "name": "Long Arm of the Law",
                    "requires": "Fair Warning",
                    "value": "+1 Combat and +1 Strength and +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "name": "Man of Action",
                    "value": "You may roll 2 dice for Move each turn and choose which to use."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "name": "Motivate",
                    "value": "Use 1 Grit to give all other Heroes +1 Initiative and +1 Move until the end of the turn. Gain 30 XP."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "Never Gives Up",
                    "requires": "Temper",
                    "value": "While KO'd, at the start of each turn, roll a D6. On the roll of 5 or 6, Heal D6 Wounds/Sanity (any mix) and place your model back on the board."
                },
                {
                    "name": "Reassure",
                    "requires": "Motivate",
                    "value": "Once per turn, use 1 Grit to prevent D6 Wounds or Sanity Damage that another Hero would take. Gain 10 XP"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "name": "Relentless",
                    "requires": "Cold Stare",
                    "value": "+1 Cunning and +1 Initiative"
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
                },
                {
                    "name": "Standing Your Ground",
                    "requires": "Man of Action",
                    "value": "At the start of a turn, you may reduce your Initiative to 1. If you do, you are Defense 3+ this turn."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "name": "Strong Leadership",
                    "type": "starting",
                    "value": "Use 1 Grit to Heal 1 Health and 1 Sanity from yourself and every other Hero on your Map Tile - Gain 5 XP for every Wound/Sanity healed from another Hero this way."
                },
                {
                    "name": "Teamwork",
                    "requires": "Reassure",
                    "value": "Use 2 Grit to add your Skill value to another Hero's Skill for a single test. If the test is successful, gain 25 XP."
                },
                {
                    "name": "Temper",
                    "requires": "Standing Your Ground",
                    "value": "Once per turn, use 2 Grit to add +1P Damage to one of your Hits or +2P Damage if you are at less than half Health."
                },
                {
                    "multi": true,
                    "name": "Vendetta",
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Starts with an Orphan Mission",
                    "name": "On a Mission"
                },
                {
                    "desc": "Always Activates before Enemies at Initiative level and automatically passes all Escape tests",
                    "name": "Quick"
                },
                {
                    "desc": "May not Dual Wield Guns. Unless KO'd, may Heal 1 Wound or 1 Sanity Damage at the start of each turn",
                    "name": "Young"
                }
            ],
            "classId": "7c791b38-c539-4964-890c-db925782933a",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 8,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Showman, Frontier",
            "level": 1,
            "melee": 4,
            "missions": [
                {
                    "desc": "This is a blank mission",
                    "name": "Blank Mission"
                }
            ],
            "movement": 0,
            "name": "Orphan",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 2,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Sanity."
                },
                {
                    "name": "All In",
                    "requires": "Something to Prove",
                    "value": "Choose one of the Starting Upgrades of your Secondary Hero Class to acquire. This includes any Gear that goes with it."
                },
                {
                    "name": "Bloodlust",
                    "requires": "Lash Out",
                    "value": "Once per turn, when you kill an Enemy, you may Heal D6 Wounds. +5 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "name": "Dodge",
                    "requires": "Hide",
                    "value": "Once per turn, use 1 Grit to ignore a single Enemy Hit against you (before you roll for Defense)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Grown Up Fast",
                    "value": "When rolling for Discovery on your Orphan Mission, you may roll 1 extra die, then choose one die to discard. +1 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Hardened by the World",
                    "value": "You are now +1 Damage on your To Hit rolls of 6+."
                },
                {
                    "multi": true,
                    "name": "Health",
                    "value": "+D6 Health."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+2 Health and +2 Sanity."
                },
                {
                    "name": "Hide",
                    "requires": "Small Target",
                    "value": "Once per Fight, if there are no Enemies adjacent to you, you may Recover 1 Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        },
                        {
                            "affects": "Strength",
                            "value": "1"
                        },
                        {
                            "affects": "health",
                            "value": "2"
                        }
                    ],
                    "name": "Hot Temper",
                    "value": "+1 Combat and +1 Strength and +2 Health."
                },
                {
                    "name": "I Can Handle It Myself!",
                    "requires": "Over Your Head",
                    "value": "Once per turn, use 1 Grit to force any single die to be Re-rolled, even if it has already been Re-rolled."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "I'm Not a Kid",
                    "requires": "Grown Up Fast",
                    "value": "Once per turn, you may take D3 Corruption Hits to Recover a Grit. May also be used once per Town Stay. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Lash Out",
                    "requires": "Toe-to-Toe",
                    "value": "Use 2 Grit to add 1P Damage to one of your Hits. +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "name": "Need for Vengeance",
                    "type": "starting",
                    "value": "Start each Adventure with a Revive Token only usable by your Hero"
                },
                {
                    "name": "On a Mission",
                    "value": "Starts with an Orphan Mission"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Over Your Head",
                    "requires": "Sprint",
                    "value": "While there ar eno other Heroes on your Map Tile, you are Defense 3+. +1 Max Grit."
                },
                {
                    "name": "Quick",
                    "value": "Always Activates before Enemies at Initiative level and automatically passes all Escape tests"
                },
                {
                    "name": "Rage",
                    "type": "starting",
                    "value": "Once per Fight, use 1 Grit to gain: A) +1 Combat and all of your Combat Hits are +1 Damage for one Attack or B) +1 Shot with a Gun for one Attack."
                },
                {
                    "name": "Running Ahead",
                    "value": "Gain 5 XP x your Hero Level any time you Look Through a Doorway. +2 Move."
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity (any mix)."
                },
                {
                    "name": "Small Target",
                    "value": "Once per turn, you may Re-roll a single Defense roll."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Sneak Attack",
                    "requires": "Dodge",
                    "value": "While there is only one Enemy adjacent to you, your attacks are +2 Damage against that Enemy. +1 Cunning."
                },
                {
                    "name": "Something to Prove",
                    "requires": "I'm Not a Kid",
                    "value": "Any time you kill and Enemy, gain +10 XP (or +50 XP if Large or bigger). +3 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Sanity"
                },
                {
                    "name": "Sprint",
                    "requires": "Running Ahead",
                    "value": "You may now roll the D8 for Move each turn and Recover a Grit on the roll of 1 or 8."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Toe-to-Toe",
                    "requires": "Hot Temper",
                    "value": "While adjacent to a Large or bigger Enemy, your attacks are +1 Damage to that Enemy (or +2 on a Critical Hit). +1 Max Grit."
                },
                {
                    "name": "Wiley",
                    "type": "starting",
                    "value": "Armor 6+. You may move through other models during your movement."
                },
                {
                    "name": "Young",
                    "value": "May not Dual Wield Guns. Unless KO'd, may Heal 1 Wound or 1 Sanity Damage at the start of each turn"
                }
            ],
            "wealth": 0,
            "willpower": 3,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "At the end of Hero Turn, you may Heal 1 Wound or 1 Sanity from every other adjacent Hero (gain 5 XP for each Healed this way)",
                    "name": "Comforting Presence"
                },
                {
                    "desc": "+1 Move",
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Fast"
                },
                {
                    "desc": "May only use Guns that have the keyword Light",
                    "name": "Lightweight"
                }
            ],
            "classId": "7fa50e95-f33d-43a8-b93b-501a7b3f3a3a",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 8,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "description": "Free Attack 1x Fight; Range 3, Shots, Crit 5/6",
                    "name": "Hold-out Pistol",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Performer",
            "level": 1,
            "melee": 4,
            "movement": 1,
            "name": "Saloon Girl",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 14
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 3,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "upgrades": [
                {
                    "name": "Acrobatic Dodge",
                    "type": "starting",
                    "value": "You may move through other models during your movement. Once per turn you may Re-roll one failed Defense roll."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Combat",
                    "value": "+1 Combat"
                },
                {
                    "name": "Comforting Presence",
                    "value": "At the end of Hero Turn, you may Heal 1 Wound or 1 Sanity from every other adjacent Hero (gain 5 XP for each Healed this way)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
                },
                {
                    "name": "Dirty Fightin'",
                    "type": "starting",
                    "value": "All of your Attacks are +1 Damage"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "name": "Fast",
                    "value": "+1 Move"
                },
                {
                    "name": "Fast as Lightning",
                    "requires": "Slip By",
                    "value": "Free Attack: Once per Fight, use during your Move. Do 1 Hit each to up to 3 Enemies adjacent to you."
                },
                {
                    "name": "Gentle Manner",
                    "value": "You now gain an extra +5 XP per Wound/Sanity that you Heal from another Hero. +3 Sanity."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+3 Health and +3 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Hidden Pouch",
                    "requires": "Witty Retort",
                    "value": "You may carry up to 3 extra Side Bag Tokens. +1 Cunning."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Hit 'Em Where It Hurts",
                    "requires": "Never a Dull Moment",
                    "value": "Use 1 Grit to ignore an Enemy's Defense for one of your Hits. No effect on Tough Enemies. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "I Can Take Care of Myself!",
                    "requires": "Parry",
                    "value": "Once per Adventure, prevent all Damage you would take from a single source. +1 Lore."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "name": "Knockout Punch",
                    "type": "starting",
                    "value": "Use 1 Grit to double the amount just rolled on one of your Damage rolls (Limit once per Hit)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        },
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "name": "Light on Your Feet",
                    "requires": "Sleight of Hand",
                    "value": "+1 Initiative and +1 Agility and +1 Move."
                },
                {
                    "name": "Lightweight",
                    "value": "May only use Guns that have the keyword Light"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore (Health)",
                    "value": "+1 Lore. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore (Sanity)",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck (Sanity)",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Never a Dull Moment",
                    "requires": "Rough and Tumble",
                    "value": "Any time you roll a No Event result on a Town Location Chart, gain 25 XP and D6 x $10. +1 Lore."
                },
                {
                    "name": "Parry",
                    "requires": "Spinning Kick",
                    "value": "Any time an adjacent Enemy rolls a 1 To Hit you, do 1 Wound to it, ignoring Defense."
                },
                {
                    "name": "Rapid Strike",
                    "requires": "I Can Take Care of Myself!",
                    "value": "Any time you kill an Enemy with a Combat Hit, you gain +1 Combat for that Attack."
                },
                {
                    "name": "Rough and Tumble",
                    "requires": "Spunky",
                    "value": "You may now use any 1-Handed Gun. +3 Health."
                },
                {
                    "name": "Sleight of Hand",
                    "value": "Use 1 Grit to Ready a Once Per Fight Item you are carrying. You may also roll an extra die for Scavenging."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Slip By",
                    "requires": "Light on Your Feet",
                    "value": "You automatically succeed at all Escape tests. +1 Agility."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Spinning Kick",
                    "value": "Use 1 Grit to do 2 Wounds to an adjacent Enemy, ignoring Defense. You may move them up to 2 spaces (unless Large). +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Spunky",
                    "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "name": "What You Least Expect",
                    "requires": "Hidden Pouch",
                    "value": "Melee To Hit 3+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Witty Retort",
                    "requires": "Gentle Manner",
                    "value": "Once per turn when you kill an Enemy you may Heal 2 Wounds. +1 Max Grit."
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Starts with 2 Random Wanderer Samurai Battle Tactics (draw 3, choose 2). Battle Tactics may each only be used 1x turn",
                    "name": "Samurai Battle Tactics"
                },
                {
                    "desc": "Any time you do 1 or more Wounds to an Enemy with a Combat Hit, gain 1 Fury token",
                    "name": "Battle Fury"
                },
                {
                    "desc": "May not use Guns or Explosives and may not voluntarily Flee from an Adventure (though the rest of the Posse may Flee without you)",
                    "name": "Code of Honor"
                }
            ],
            "classId": "M1qfgZTa78yjAmoEspsh",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "faith": 0,
            "fury": {
                "current": 0,
                "max": 5
            },
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "name": "Wanderer's Katana",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Traveler, Showman, Samurai",
            "level": 1,
            "melee": 3,
            "movement": 0,
            "name": "Wandering Samurai",
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 3,
                "Lore": 2,
                "Luck": 2,
                "Spirit": 2,
                "Strength": 3
            },
            "tactics": [
                {
                    "desc": "This is a description",
                    "name": "Tactic Name"
                }
            ],
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "fury",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "name": "Ronin",
                    "type": "starting",
                    "value": "+1 Max Fury and +1 Strength. When drawing Loot cards, you may draw one extra and choose one to discard. May not use Samurai Battle Tactics that have the keyword Healing. Extra Starting Gear: Samurai Armor, Ronin's Helmet"
                },
                {
                    "name": "Quiet Traveler",
                    "type": "starting",
                    "value": "Gain D3+1 Fury at the start of every Fight. Your 2-H Hand Weapons only take up 1-H for you to use"
                },
                {
                    "name": "Sword Master",
                    "type": "starting",
                    "value": "Rapid Strike (Blade) - Any time you kill an Enemy with a Combat Hit using a Blad Hand Weapon, you immediately gain +1 Combat for that Attack (limit +3)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "name": "Battle Ready",
                    "value": "New Wanderer Samurai Tactic; +1 Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "fury",
                            "value": 1
                        }
                    ],
                    "name": "Battle Yell",
                    "value": "Any time you kill an Enemy with a Combat Hit, gain +1 Fury"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "name": "Control Discipline",
                    "value": "While using a 2-H blade, you may use the D8 for your Combat Damage. +1 Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        },
                        {
                            "affects": "Move",
                            "value": 1
                        }
                    ],
                    "name": "On the Road",
                    "value": "You may start every Adventure with a free Fire Sake token. +1 Lore and +1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "name": "Fighter's Training",
                    "requires": "Battle Ready",
                    "value": "New Wanderer Samurai Battle Tactic. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "fury",
                            "value": 1
                        }
                    ],
                    "name": "Extra Effort",
                    "requires": "Battle Yell",
                    "value": "1x turn you may spend 2 Fury each to add extra dice to any Skill test you are making. +1 Max Fury"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "name": "Power Discipline",
                    "requires": "Control Discipline",
                    "value": "1x turn while using a Blade, you may spend 5 Fury to add D6 Damage to one of your Combat Hits. +1 Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "name": "Calm Exterior",
                    "requires": "On the Road",
                    "value": "1x turn, you may spend 2 Grit to gain Peril Die Fury. +1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "name": "Warrior's Resolve",
                    "requires": "Fighter's Training",
                    "value": "New Wanderer Samurai Battle Tactic. +1 Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        },
                        {
                            "affects": "fury",
                            "value": 1
                        }
                    ],
                    "name": "Unleashed",
                    "requires": "Extra Effort",
                    "value": "1x Adventure, gain Fury up to your Max Fury for free. +1 Max Grit and +1 Max Fury"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "name": "Mental Discipline",
                    "requires": "Power Discipline",
                    "value": "1x Fight, at the start of a turn, you may reduce your Init by any amount (min 1). Gain Fury equal to this amount. +1 Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "name": "Don't Make Him Angry",
                    "requires": "Calm Exterior",
                    "value": "1x Travel, you may spend 1 Grit to cancel a Travel Hazard (before any dice are rolled for it). +1 Combat"
                },
                {
                    "name": "Master of War",
                    "requires": "Warrior's Resolve",
                    "value": "At the start of each Adventure, draw a temporary Wanderer Samurai Battle Tactic. This is one use, only for this Adventure that may be played without spending Fury."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "name": "Master of Fury",
                    "requires": "Unleashed",
                    "value": "Any time you spend Fury, add 1 extra Fury to the total spent for free. +1 Initiative"
                },
                {
                    "name": "Flashing Steel",
                    "requires": "Mental Discipline",
                    "value": "While you have a Blade equipped, you are +1 Damage on your Combat Hits, and 1x turn you may re-roll all of your failed Defense rolls just rolled"
                },
                {
                    "modifiers": [
                        {
                            "affects": "fury",
                            "value": 2
                        },
                        {
                            "affects": "willpower",
                            "value": -1
                        }
                    ],
                    "name": "Death Before Dishonor",
                    "requires": "Don't Make Him Angry",
                    "value": "+2 Max Fury and Willpower 3+"
                },
                {
                    "multi": true,
                    "name": "Honorable Vendetta",
                    "roll": 2,
                    "value": "Choose an Enemy keyword. Any time you collect XP from those Enemies, collect an extra +10 XP"
                },
                {
                    "modifiers": [
                        {
                            "affects": "fury",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Max Fury",
                    "roll": 3,
                    "value": "+1 Max Fury"
                },
                {
                    "modifiers": [
                        {
                            "affects": "movement",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Move",
                    "roll": 4,
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        },
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Str and +1 Lore",
                    "roll": 5,
                    "value": "+1 Strength and +1 Lore, +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 0
                        },
                        {
                            "affects": "Spirit",
                            "value": 0
                        }
                    ],
                    "multi": true,
                    "name": "+1 Cunning or +1 Spirit",
                    "roll": 6,
                    "value": "+1 Cunning or +1 Spirit, +D6 Health/Sanity"
                },
                {
                    "modifiers": [],
                    "multi": true,
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value": "+D6 Health and +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 0
                        },
                        {
                            "affects": "Luck",
                            "value": 0
                        }
                    ],
                    "multi": true,
                    "name": "+1 Agility or +1 Luck",
                    "roll": 8,
                    "value": "+1 Agility or +1 Luck, +D6 Health/Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value": "+1 Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value": "+1 Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Initiative",
                    "roll": 11,
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value": "You can now hold 2 more Corruption Points before mutating"
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "Starts with 1 Random Spirit Magik spell drawn from the Battle, Protection, or Shapeshifting spell decks (draw 2, choose 1). May not use Guns, Explosives, or Tech items.",
                    "name": "Tribal Shaman"
                },
                {
                    "desc": "You may discard Dark Stone when casting a spell (up to the spell's Power Level) to add 2 extra casting dice each, even after the roll to cast has been made.",
                    "name": "Dark Stone Enhancement"
                }
            ],
            "classId": "Rsyya36YjBhmfv4U1ICQ",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "cost": 450,
                    "description": "+1 Magik. 1x turn you may attempt to cancel a Darkness card. Roll D6, on 5 or 6 success; otherwise take Peril die Sanity damage ignoring Willpower",
                    "hands": 1,
                    "keywords": "Gear, Icon, Magik, Hand Weapon",
                    "modifiers": [
                        {
                            "affects": "magik",
                            "value": 1
                        }
                    ],
                    "name": "Shaman Staff",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "cost": 850,
                    "description": "Holds up to 5 Dark Stone. Any Dark Stone inside is Hidden and does not cause Corruption Hits. Gain D3 Dark Stone here at the start of each Adventure",
                    "hands": 1,
                    "keywords": "Gear, Container, Tribal",
                    "name": "Dark Stone Satchel",
                    "slots": 0,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "cost": 550,
                    "description": "Your Combat Hits are +1 Damage while the Darkness is in the bottom stage of the Depth Track, +2 in middle, or +3 in top stage",
                    "hands": 1,
                    "keywords": "Gear, Dark Stone, Tribal, Hand Weapon",
                    "name": "Dark Stone Hatchet",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Tribal, Magik",
            "level": 1,
            "magik": {
                "current": 3,
                "max": 3
            },
            "melee": 4,
            "movement": 0,
            "name": "Dark Stone Shaman",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "spells": [],
            "stats": {
                "Agility": 2,
                "Cunning": 1,
                "Lore": 4,
                "Luck": 1,
                "Spirit": 4,
                "Strength": 2
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "name": "Spirit Hunter",
                    "type": "starting",
                    "value": "+1 Initiative. When casting Battle spells, you may re-roll one of the casting dice. Extra Starting Gear: Dark Stone Hatchet, Warrior's Speed"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "name": "Spirit Guardian",
                    "type": "starting",
                    "value": "+1 Strength. When casting Spirit Magik Protection spells, you may re-roll one of the casting dice. Extra Starting Gear: Ancestral Shield"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "name": "Spirit Shaper",
                    "type": "starting",
                    "value": "+1 Max Grit. When casting Spirit Magik Shapeshifting spells, you may re-roll one of the casting dice. Extra Starting Gear: Bear Form"
                },
                {
                    "name": "War Shaman",
                    "value": "New Spirit Magik Battle or Protection spell"
                },
                {
                    "name": "Call of the Wild",
                    "value": "New Spirit Magik Shapeshifting spell"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "name": "Harmony",
                    "value": "You no longer need to roll for Corruption from Darkstone at the end of each Adventure. +1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        },
                        {
                            "affects": "magik",
                            "value": 1
                        }
                    ],
                    "name": "Storytelling",
                    "value": "+1 Magik and +1 Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "name": "Spirit Sacrifice",
                    "requires": "War Shaman",
                    "value": "1x turn when you kill an Enemy, you may use 2 Magik to recover a Grit. +1 Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "name": "Tribal Dance",
                    "requires": "Call of the Wild",
                    "value": "While in Animal Form, you may re-roll 1 Defense or 1 To Hit roll per turn. +1 Initiative"
                },
                {
                    "name": "Attuned",
                    "requires": "Harmony",
                    "value": "Dark Stone used to enhance your spells now add 3 extra casting dice each instead"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "name": "Wisdom of Ages",
                    "requires": "Storytelling",
                    "value": "New Spirit Magik Battle or Protection or Shapeshifting spell. +1 Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "magik",
                            "value": 1
                        }
                    ],
                    "name": "Battle Chant",
                    "requires": "Spirit Sacrifice",
                    "value": "New Spirit Magik Battle or Protection spell. +1 Magik"
                },
                {
                    "modifiers": [
                        {
                            "affects": "magik",
                            "value": 1
                        }
                    ],
                    "name": "Animal Nature",
                    "requires": "Tribal Dance",
                    "value": "New Spirit Magik Shapeshifting spell. +1 Magik"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "name": "Void Strength",
                    "requires": "Attuned",
                    "value": "You are +1 Health for each unique Item you carry that has a Dark Stone icon on it. +1 Strength"
                },
                {
                    "name": "Ancestral Guide",
                    "requires": "Wisdom of Ages",
                    "value": "1x turn, you may use 2 Dark Stone to prevent the Darkness from moving on the Depth Track on a D6 roll of 3+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        },
                        {
                            "affects": "defense",
                            "value": -1
                        }
                    ],
                    "name": "Spirit Champion",
                    "requires": "Battle Chant",
                    "value": "+1 Max Grit and Defense 3+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "name": "One With The Spirits",
                    "requires": "Animal Nature",
                    "value": "You may now cast other Spirit Magik, even while in Animal Form. +1 Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Light As A Feather",
                    "requires": "Void Strength",
                    "value": "Items you carry that have a Dark Stone icon count as having 1 less weight. +1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "magik",
                            "value": 1
                        }
                    ],
                    "name": "Tribal Elder",
                    "requires": "Ancestral Guide",
                    "value": "1x turn, you may add an extra Power Level to a single spell you are casting"
                },
                {
                    "multi": true,
                    "name": "Ancient Rivals",
                    "roll": 2,
                    "value": "You are +1 Damage on all Attacks against Void Enemies, and any time you collect XP from a Void Enemy, collect an extra +5 XP"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Strength",
                    "roll": 3,
                    "value": "+1 Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "movement",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Move",
                    "roll": 4,
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Agility",
                    "roll": 5,
                    "value": "+1 Agility, +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 0
                        },
                        {
                            "affects": "Spirit",
                            "value": 0
                        }
                    ],
                    "multi": true,
                    "name": "+1 Lore or +1 Spirit",
                    "roll": 6,
                    "value": "+1 Lore or +1 Spirit, +D6 Health/Sanity"
                },
                {
                    "modifiers": [],
                    "multi": true,
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value": "+D6 Health and +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 0
                        },
                        {
                            "affects": "Luck",
                            "value": 0
                        }
                    ],
                    "multi": true,
                    "name": "+1 Cunning or +1 Luck",
                    "roll": 8,
                    "value": "+1 Cunning or +1 Luck, +D6 Health/Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value": "+1 Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value": "+1 Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "+1 Initiative",
                    "roll": 11,
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value": "You can now hold 2 more Corruption Points before mutating"
                }
            ],
            "wealth": 0,
            "willpower": 4,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "You may Recover a Grit on a Move roll of 1 or 2",
                    "name": "Wild Card"
                }
            ],
            "classId": "c2c8ed0b-4104-44a2-9bfc-b403a7b70615",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 16,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "cost": 400,
                    "description": "Holds 5 Dynamite Tokens. Outlaw only.",
                    "keywords": "Gear",
                    "name": "Dynamite Satchel",
                    "slots": 0,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Outlaw",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Bandido",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 8
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 1,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 4
            },
            "upgrades": [
                {
                    "name": "Accuracy",
                    "requires": "Infamy",
                    "value": "Ranged To Hit 4+"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health."
                },
                {
                    "name": "Barrage",
                    "value": "Once per turn, use 1 Grit to gain +1 Shot with each 1-Handed Gun you fire this turn."
                },
                {
                    "name": "Charge",
                    "requires": "Swingin' Fists",
                    "value": "At the start of your Activation, you may choose an Enemy that is not adjacent. You are +2 Damage on all Combat Hits to that Enemy this turn."
                },
                {
                    "name": "Chew on This!",
                    "requires": "Dark Stone Dynamite",
                    "value": "Once per Fight, when you get a Critical Hit on a Melee Attack, you may discard a Dynamite Token to add 2D6 Damage to the Hit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Combat",
                    "value": "+1 Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health."
                },
                {
                    "multi": true,
                    "name": "Cunning Plan",
                    "value": "When holding up the Outpost Bank in Town, you now steal +$50 for every 5+ rolled."
                },
                {
                    "name": "Dark Stone Dynamite",
                    "requires": "Destruction Artist",
                    "value": "Once per turn, Use 1 Dark Stone when Throwing a Dynamite Token to add +2 Damage to each model Hit."
                },
                {
                    "name": "Deadly",
                    "requires": "Rage",
                    "value": "Your Melee Attacks get Critical Hits on rolls of 5 or 6 now."
                },
                {
                    "name": "Destruction Artist",
                    "requires": "Strong Arm",
                    "value": "Any Explosives you Throw Bounce 1 fewer times than whatever is rolled"
                },
                {
                    "name": "Explosives Expert",
                    "type": "starting",
                    "value": "Use 2 Grit to gain a Dynamite Token. Extra Starting Gear: Dynamite Satchel and 2 Dynamite Tokens"
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +3 Sanity."
                },
                {
                    "name": "Infamy",
                    "requires": "Steel Nerves",
                    "value": "Once per Town Stay, you may intimidate a local shopkeeper to pay D6 x $25 less for a single Item/Service"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Lovable Scoundrel",
                    "requires": "Twitch",
                    "value": "You gain double the XP listed on all Loot and Scavenge cards. +1 Spirit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Rage",
                    "requires": "Charge",
                    "value": "Once per turn, use 3 Grit to gain +4 Combat for one Attack. +1 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Sinister Laugh",
                    "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Steel Nerves",
                    "requires": "Barrage",
                    "value": "Once per turn, you may Re-roll a single failed Willpower save. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Strong Arm",
                    "value": "You may double your Range for Throwing Explosives. +1 Strength."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "name": "Swindler",
                    "type": "starting",
                    "value": "Anytime you draw a Loot card, you may discard it and draw a new one. You must keep the second card drawn. You are also +1 Combat."
                },
                {
                    "name": "Swingin' Fists",
                    "value": "Instead of a normal Melee Attack, use 1 Grit to do a 3 Combat Melee Attack to every adjacent Model."
                },
                {
                    "name": "Twin Guns",
                    "type": "starting",
                    "value": "You may fire two 1-Handed Guns per turn with no penalty for the off-hand Gun. Extra Starting Gear: Pistol"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Twitch",
                    "requires": "Sinister Laugh",
                    "value": "Once per Adventure, gain +4 Initiative until the end of the turn. +1 Max Grit."
                },
                {
                    "multi": true,
                    "name": "Vendetta",
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
                },
                {
                    "name": "Wild Card",
                    "value": "You may Recover a Grit on a Move roll of 1 or 2"
                },
                {
                    "name": "Won't Stay Dead",
                    "requires": "Lovable Scoundrel",
                    "value": "At the start of each turn, Heal 1 Wound on the D6 roll of 4+. If KO'd, instead you may Recover on the D6 roll of 4+ (you must still roll for Injury/Madness)"
                }
            ],
            "wealth": 0,
            "willpower": 5,
            "xp": 0
        },
        {
            "abilities": [
                {
                    "desc": "You may not use Guns. Starts with 1 Blessing and 1 Judgement.",
                    "name": "Holy Man"
                },
                {
                    "desc": "You are +1 Damage on all Attacks against Undead Enemies",
                    "name": "Scourge of the Dead"
                }
            ],
            "classId": "fa565014-f32b-46b4-9621-f2936d079b35",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 5,
            "faith": 2,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 2,
            "items": [
                {
                    "description": "+1 combat, spend faith to add to combat",
                    "hands": 1,
                    "name": "Holy Book",
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Holy",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "name": "Preacher",
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sermons": [
                {
                    "check": 5,
                    "cost": 1,
                    "desc": "For each Faith spent on the cost of the sermon, you may Heal 1 Wound from yourself or an adjacent Hero. At Level 5 - Heal 2 Wounds for each Faith spent.",
                    "name": "Faith Healing",
                    "type": "Blessing",
                    "xp": 10
                }
            ],
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 1,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 4,
                "Strength": 3
            },
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Ancient Writing",
                    "value": "+1 Faith while in an Other World. +1 Max Grit."
                },
                {
                    "name": "Belief",
                    "value": "New Sermon Blessing"
                },
                {
                    "name": "Chosen",
                    "requires": "Belief",
                    "value": "Once per turn, you may Re-roll a single Defense roll"
                },
                {
                    "name": "Conviction",
                    "requires": "Chosen",
                    "value": "New Sermon Blessing. +1 Faith"
                },
                {
                    "name": "Crush the Forsaken (Demon)",
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP."
                },
                {
                    "name": "Crush the Forsaken (Undead)",
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP."
                },
                {
                    "name": "Crush the Forsaken (Void)",
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP."
                },
                {
                    "name": "Divine Protection",
                    "requires": "Conviction",
                    "value": "Defense +4"
                },
                {
                    "name": "Firebrand",
                    "type": "starting",
                    "value": "Once per turn, when Performing a Judgement Sermon, you may Re-roll one of the Casting Dice."
                },
                {
                    "name": "Forbidden Knowledge",
                    "requires": "Stories of the Void",
                    "value": "New Sermon.  You may now hold 5 more Corruption Points before getting a Mutation."
                },
                {
                    "name": "Frothing Rage",
                    "requires": "Vengeance",
                    "value": "Whenever you kill an adjacent Enemy, before assigning any more Hits, you may Move up to 2 spaces in any direction ignoring Escape tests."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "+D6 Health and +D6 Sanity."
                },
                {
                    "name": "Holy Man",
                    "value": "You may not use Guns. Starts with 1 Blessing and 1 Judgement."
                },
                {
                    "name": "Holy Revolution",
                    "requires": "Salvation",
                    "value": "Anytime you kill a Demon, every Hero on your Map Tile may Heal 1 Wound or Sanity Damage"
                },
                {
                    "name": "Holy Strike",
                    "requires": "Revelation",
                    "value": "Once per turn, you may Re-roll one of your To Hit rolls."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "multi": true,
                    "name": "Keep the Faith",
                    "value": "You may choose one Injury/Mutation/Madness to Heal.  If you have none, gain +1 Faith."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Martyr",
                    "requires": "Zealot",
                    "value": "Once per turn, you may take 1 Corruption Point, ignoring Willpower, to Heal D6 Health/Sanity (any mix) from yourself or another Hero on your Map Tile. +1 Max Grit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "name": "Missionary",
                    "type": "starting",
                    "value": "Once per turn, when Performing a Blessing Sermon, you may Re-roll one of the Casting Dice."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "name": "Redemptionist",
                    "type": "starting",
                    "value": "You may now use 2-Handed Guns. Extra Starting Gear: Shotgun (replaces Holy Book)"
                },
                {
                    "name": "Revelation",
                    "value": "New Sermon Judgement"
                },
                {
                    "name": "Salvation",
                    "requires": "Martyr",
                    "value": "Use 2 Grit to remove a Corruption Point from yourself."
                },
                {
                    "name": "Scourge of the Dead",
                    "value": "You are +1 Damage on all Attacks against Undead Enemies"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit.  Also gain +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Stories of the Void",
                    "requires": "Tools of the Damned",
                    "value": "All of your Attacks are +1 Damage against Void Enemies. +1 Lore."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Tools of the Damned",
                    "requires": "Ancient Writing",
                    "value": "All of your Attacks are +1 Damage against Demon Enemies. +1 Lore."
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "name": "Vengeance",
                    "requires": "Holy Strike",
                    "value": "New Sermon Judgement. +1 Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "name": "Zealot",
                    "value": "Once per turn, you may take 3 Wounds, ignoring Defense, to add +D6 Damage to one your Hits. +1 Max Grit."
                }
            ],
            "wealth": 0,
            "willpower": 3,
            "xp": 0
        },
        {
            "name": "Sorcerer",
            "abilities": [
                {
                    "desc": "Starts with 2 Elemental Magik spells. For each spell, select any Element, draw 2 spells of that type choosing 1 to keep, and discard the other. Each spell may only be cast once per Turn.",
                    "name": "Elemental Magik"
                },
                {
                    "desc": "As a Starting Hero, choose 1 Element to be your focus. From now on, you are +1 to your casting total when casting a spell of that element.",
                    "name": "Magik Focus"
                },
                {
                    "desc": "May not use Guns",
                    "name": "Ancient Arts"
                }
            ],
            "classId": "4455653a-4f1d-453a-994d-c6ec9ede860b",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 5,
            "mana": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "At the start of each Adventure, remove any Tokens on this Item, then place D6 Arcane Powder tokens here. You may discard Arcane Powder tokens from here to add +1 each to the Casting Total of a Spell you are Casting. Magik Only",
                    "hands": 0,
                    "name": "Roku Demon Bag",
                    "weight": 0,
                    "slots": 0,
                    "cost": 500,
                    "keywords": "Gear, Magik, Container",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Magik, Strange",
            "level": 1,
            "melee": 5,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 14
            },
            "elementalMagik": [
                {
                    "check": 0,
                    "cost": 2,
                    "deadly": false,
                    "type": "any",
                    "name": "Elemental Blast",
                    "desc": "Free Starting Upgrade. Use 2 Mana to fire an Elemental Blast as your Ranged Attack. This counts as a Spell, with the same Keyword as your Magik Focus Element but no Casting Roll is needed. Range 8, Shots 1. Each Hit rolled counts as D3 Hits on the Target (a Critical counts as D3 Critical Hits)."
                }
            ],
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 2,
                "Lore": 4,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "upgrades": [
                {
                    "name": "Arcane Protection",
                    "type": "starting",
                    "value": "Once per turn, you may re-roll a single failed Defense or Willpower roll. Also you may ignore the effects of any Enemy Spell affecting you, on the D6 roll of 4+."
                },
                {
                    "name": "Demon Fire Claw",
                    "type": "starting",
                    "value": "Use 1 Grit to gain +2 Combat until the end of the turn. On any turn in which this is used, your Combat Hits are +1 Damage each (or +2 against Demon Enemies)."
                },
                {
                    "name": "Blood of the Dragon",
                    "type": "starting",
                    "value": "At the start of your Activation, Heal D3 Wounds. You are immune to Poison."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "3 Health and 1 Sanity.",
                    "modifiers": [
                        {
                            "affects": "health",
                            "value": "3"
                        },
                        {
                            "affects": "sanity",
                            "value": "1"
                        }
                    ]
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative and Health",
                    "value": "+1 Initiative. Also, gain +D6 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Health",
                    "value": "+1 Strength. Also, gain +D6 Health"
                },
                {
                    "multi": true,
                    "name": "Touched by the Void",
                    "value": "Each time the Darkness marker on the Depth track crosses into a new stage, heal D6 Wounds and take 1 Corruption Hit."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "multi": true,
                    "name": "Arcane Powder",
                    "value": "Start each Adventure with +1 Arcane Powder token in your Roku Demon Bag.",
                    "modifiers": [{ "affects": "arcanePowder", "value": 1 }]
                },
                {
                    "multi": true,
                    "name": "Dragon Spirit",
                    "value": "Once per Adventure, add +2 Damage to one of your Hits"
                },
                {
                    "name": "Conjuring",
                    "value": "New Elemental Magik Spell"
                },
                {
                    "modifiers": [
                        {
                            "affects": "mana",
                            "value": "1"
                        }
                    ],
                    "name": "Incantations",
                    "requires": "Conjuring",
                    "value": "New Elemental Magik Spell. +1 Mana."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Elemental Wrath",
                    "requires": "Incantations",
                    "value": "Your Elemental Blast now only costs 1 Mana and it's +1 Shot (or +2 if Hero Level 6 or higher). +1 Spirit."
                },
                {
                    "name": "Master of Magik",
                    "requires": "Elemental Wrath",
                    "value": "Once per Adventure, Cast one of your spells without paying Mana or making a Casting Roll. This may be used to cast the same Spell a second time in the same turn."
                },
                {
                    "name": "Arcane Wonder",
                    "value": "Start each Adventure with +2 Arcane Powder tokens in your Roku Demon Bag. +1 Lore.",
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Keeper of the Vault",
                    "value": "You gain +1 Health for each Artifact you carry (max +6). +1 Cunning",
                    "requires": "Arcane Wonder",
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Bound Demon",
                    "requires": "Keeper of the Vault",
                    "value": "Choose an Artifact to bind a Demon into. That Artifact may never be lost, sold, or discarded. At the start of each Adventure, draw a Random Spell from a chosen Element for that Artifact. Discard this Spell during the Adventure to cast it for free, without a Casting Roll."
                },
                {
                    "name": "Vault of Rage",
                    "requires": "Bound Demon",
                    "value": "At the start of each Adventure, draw an Artifact from a Random World to use for this Adventure. You may not trade or sell this Item and it has no weight. Discard the Artifact at the end of the Adventure."
                },
                {
                    "name": "Iron Skin",
                    "value": "Armor 6+. Also, you are immune to Bleeding and Burning markers. +1 Strength.",
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Smell of Blood",
                    "requires": "Iron Skin",
                    "value": "Melee to Hit 4+"
                },
                {
                    "name": "Dragon Rage",
                    "requires": "Smell of Blood",
                    "value": "Once per turn, you may re-roll one of your Damage rolls for a Combat Hit. +1 Initiative.",
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Savage Ferocity",
                    "requires": "Dragon Rage",
                    "value": "You are +2 Combat for each open hand you currently have. +1 Strength",
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Counter Spell",
                    "value": "Once per turn, spend 2 Mana to fully cancel the effects of an Enemy Spell on the D6 roll of 4+. +1 Mana.",
                    "modifiers": [
                        {
                            "affects": "mana",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Ancient Rivalry",
                    "requires": "Counter Spell",
                    "value": "Your Attacks are +1 Damage against Void enemies. Once per turn, you may force an enemy to re-roll one of their To Hit rolls against you."
                },
                {
                    "name": "War Caster",
                    "requires": "Ancient Rivalry",
                    "value": "New Elemental Magik Spell. +1 Mana.",
                    "modifiers": [
                        {
                            "affects": "mana",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Fifth Element",
                    "requires": "War Caster",
                    "value": "You are +2 Health for each different Mutation you have. When rolling on the Mutation Chart, you may choose one of the dice to re-roll."
                }
            ],
            "wealth": 0,
            "willpower": 3,
            "xp": 0
        },
        {
            "name": "Traveling Monk",
            "abilities": [
                {
                    "desc": "At the start of each turn, gain 1 Ki Token",
                    "name": "Discipline"
                },
                {
                    "desc": "Once per turn, yu may channel your Ki into one of your Combat Hits or any source of Healing you are using. For each Ki Token spent, increase Healing by 1 to a single target. For every 2 spent, increase Damage by 1 for that Hit.",
                    "name": "Sacred Order"
                },
                {
                    "desc": "+1 Damage on all attacks against Myth Enemies",
                    "name": "Tamabushi"
                }
            ],
            "classId": "4bc1cc80-ce5a-49d1-b863-e62ab84a085d",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "ki": {
                "max": 6,
                "current": 0
            },
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "description": "At the end of each turn, you may Heal 1 Wound from every other adjacent Hero. If equipped as 2-handed, your Combat Hits may use the D8 for damage. Holy Only",
                    "hands": 1,
                    "name": "Monk Staff",
                    "weight": 1,
                    "slots": 3,
                    "cost": 400,
                    "keywords": "Gear, Hand Weapon, Holy",
                    "source": "Starting Gear"
                },
                {
                    "description": "Once per Adventure, you and all Heroes on your Map Tile count as having Cover 3+ save against ALL attacks / Damage sources until the end of the turn. Holy Only",
                    "hands": 0,
                    "name": "Sacred Bell",
                    "weight": 0,
                    "slots": 0,
                    "cost": 500,
                    "keywords": "Gear, Holy, Icon",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Traveler, Holy",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 1,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 4,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Acrobatic Flip",
                    "type": "starting",
                    "value": "Once per turn, you may re-roll one failed Defense roll. You may spend Ki Tokens for Movement, gaining 2 extra Move for each Ki Token spent. If you do, you may move through other models during your movement this turn."
                },
                {
                    "name": "Fists of Fury",
                    "type": "starting",
                    "value": "Once per turn, when making a Melee attack, use 1 Grit to roll one extra Combat against each Enemy currently adjacent to you OR to roll 2 extra Combat against a single Large or bigger Enemy adjacent to you."
                },
                {
                    "name": "Defender of the Light",
                    "type": "starting",
                    "value": "+2 Max Ki. Gain D3 Kit Tokens any time the Hold Back the Darkness roll is failed (not including Depth Events).",
                    "modifiers": [{ "affects": "ki", "value": 2 }]
                },
                {
                    "multi": true,
                    "name": "Sacred Vow",
                    "value": "Choose an Enemy keyword. Any time you kill that Enemy type, collect extra 10 XP and Heal 1 Wound (or 20 XP, D3 Wounds if Large size or larger)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative."
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Health",
                    "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning and Health",
                    "value": "+1 Cunning. Also gain D6 Health.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "name": "Lore and Health",
                    "value": "+1 Lore. Also gain D6 Health.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D6 Health and D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore and Sanity",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck and Sanity",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "ki",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Ki",
                    "value": "+1 Max Ki"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "multi": true,
                    "name": "Sacred Duty",
                    "value": "Once per Adventure, Recover 1 Grit."
                },
                {
                    "name": "Trained from Birth",
                    "value": "Once per turn, use 1 Grit to add +2 Damage to one of your Combat Hits (or +3 against Demon Enemy)"
                },
                {
                    "name": "Ki Block",
                    "requires": "Trained from Birth",
                    "value": "Once per turn, spend Ki equal to the Damage you or another adjacent Hero just took from a single Hit to prevent that Damage. +1 Max Ki.",
                    "modifiers": [{ "affects": "ki", "value": 1 }]
                },
                {
                    "name": "Warrior Monk",
                    "requires": "Ki Block",
                    "value": "Defense 3+. +1 Max Grit",
                    "modifiers": [{ "affects": "defense", "value": 3 }, { "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Ki Blast",
                    "requires": "Warrior Monk",
                    "value": "Once per Fight, spend any number of Ki to create a Ki Blast with a Range equal to half the number of Ki spent (rounding down). Every Enemy within Range takes D6 Wounds ignorning Defense."
                },
                {
                    "name": "Guardian Shield",
                    "value": "Once per Adventure, you may ready your Sacred Bell. +1 Max Grit",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "One with the Light",
                    "value": "Any time you gain 1 or more Ki Tokens, you may remove 1 Wound or Sanity Damage from yourself (may not spend Ki to increase this)."
                },
                {
                    "name": "Protector",
                    "requires": "One with the Light",
                    "value": "Once per turn, you may spend 6 Ki to re-roll one of the dice on a Hold Back the Darkness roll. +1 Max Ki.",
                    "modifiers": [{ "affects": "ki", "value": 1 }]
                },
                {
                    "name": "Defier of Darkness",
                    "requires": "Protector",
                    "value": "Whenever a Growing Dread or Darkness card is drawn, you may cancel it on a D6 of 5+. If canceled, gain 10 XP."
                },
                {
                    "name": "Quickness",
                    "value": "At the start of any turn, you may spend Ki to increase your Initiative this turn by +1 for every 2 Ki spent. +1 Move",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "name": "Speed Lines",
                    "requires": "Quickness",
                    "value": "You are +1 Damage against all Enemies with a lower Initiative than you. +1 Agility",
                    "modifiers": [{ "affects": "Agility", "value": 1 }]
                },
                {
                    "name": "Patience",
                    "requires": "Speed Lines",
                    "value": "Once per turn, spend 5 Ki to Recover a Grit. You may use Grit to re-roll your To-Hit rolls, even if they have already been re-rolled."
                },
                {
                    "name": "The Last Straw",
                    "requires": "Patience",
                    "value": "Once per Adventure, un-equip any number of Clothing Items to gain +1 Combat each (max +6) until the end of the turn. You may not equip Clothing Items for the rest of the current Fight."
                },
                {
                    "name": "Do Not Fear",
                    "value": "Myth and Demon Enemies do 1 less Damage to you on all Hits (min 1). You are immune to Enemy Ability Fear."
                },
                {
                    "name": "Between Worlds",
                    "requires": "Do Not Fear",
                    "value": "While in an OtherWorld, you roll 1 extra die on all Skill tests. +1 Lore.",
                    "modifiers": [{ "affects": "Lore", "value": 1 }]
                },
                {
                    "name": "Knows No Terror",
                    "requires": "Between Worlds",
                    "value": "All of your Attacks are +1 Damage against Undead and Demon Enemies. You are immune to Terror and Unspeakable Terror abilities"
                },
                {
                    "name": "Hero of the Dragon War",
                    "requires": "Knows No Terror",
                    "value": "While in a Fight with an XL Enemy or larger, every Hero on your Map Tile Recovers Grit on D6 of 4+ each at the start of every turn. +1 Combat",
                    "modifiers": [{ "affects": "combat", "value": 1 }]
                }
            ]
        },
        {
            "name": "Samurai Warrior",
            "abilities": [
                {
                    "desc": "Starts with 2 Random Warrior Samurai Battle Tactics (draw 3, choose 2). Battle Tactics may each onlly be used once per turn.",
                    "name": "Samurai Battle Tactics"
                },
                {
                    "desc": "Any time yu do one or more Wounds to an Enemy with a Combat Hit, gain 1 Fury Token",
                    "name": "Battle Fury"
                }
            ],
            "classId": "31254331-ec58-4b71-ae35-8239f06ac7ab",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "fury": {
                "max": 6,
                "current": 0
            },
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "+1 Combat. Once per Turn, spend 2 Fury to add +1 Damage to one of your Combat Hits.",
                    "hands": 0,
                    "name": "Warrior's Katana",
                    "weight": 1,
                    "slots": 2,
                    "cost": 250,
                    "keywords": "Gear, Trederra, Gun, Pistol",
                    "source": "Starting Gear",
                    "modifiers": [{ "affects": "combat", "value": 1 }]
                },
                {
                    "description": "Armor 5+. +2 Health. -1 Initiative. Samurai Only",
                    "hands": 0,
                    "name": "Samurai Armor",
                    "weight": 1,
                    "slots": 2,
                    "cost": 500,
                    "keywords": "Gear, Clothing, Torso",
                    "source": "Starting Gear",
                    "modifiers": [
                        { "affects": "health", "value": 2 },
                        { "affects": "armor", "value": 5 },
                        { "affects": "init", "value": -1 }
                    ]
                },
                {
                    "description": "Once per turn, when you kill an Enemy, gain 1 Fury. Samurai Only",
                    "hands": 0,
                    "name": "Samurai Helmet",
                    "weight": 1,
                    "slots": 1,
                    "cost": 300,
                    "keywords": "Gear, Clothing, Hat",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Samurai, Showman, Soldier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "samuraiTactics": [],
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 3,
                "Lore": 2,
                "Luck": 1,
                "Spirit": 2,
                "Strength": 4
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Rising Sun",
                    "type": "starting",
                    "value": "Once per turn, use 1 Grit to add +2 Damage to one of your Combat Hits. Whenever the Hold Back the Darkness is failed (not including Depth Events), Recover Grit on D6 of 4+."
                },
                {
                    "name": "Determination",
                    "type": "starting",
                    "value": "+2 Max Fury. When you take 1 or more Wounds from Enemy Attacks, gain 1 Fury",
                    "modifiers": [{ "affects": "fury", "value": 2 }]
                },
                {
                    "name": "Wall of Steel",
                    "type": "starting",
                    "value": "Once per Turn, you may re-roll all of your failed Armor rolls just rolled"
                },
                {
                    "multi": true,
                    "name": "Honorable Vendetta",
                    "value": "Choose an Enemy keyword. any time you collect XP from those Enemies, collect extra 10 XP."
                },
                {
                    "modifiers": [{ "affects": "fury", "value": 1 }],
                    "name": "Max Fury",
                    "value": "+1 Max Fury.",
                    "multi": true
                },
                {
                    "modifiers": [{ "affects": "move", "value": "1" }],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [{ "affects": "Agility", "value": "1" }],
                    "name": "Agility and Health/Sanity",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "modifiers": [{ "affects": "Strength", "value": "1" }],
                    "name": "Strength and Health/Sanity",
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "modifiers": [{ "affects": "Cunning", "value": "1" }],
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "modifiers": [{ "affects": "Spirit", "value": "1" }],
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D6 Health and D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "name": "Battle Tested",
                    "value": "New Warrior Samurai Battle Tactic. +1 Luck",
                    "modifiers": [{ "affects": "Luck", "value": 1 }]
                },
                {
                    "name": "Warrior's Training",
                    "requires": "Battle Tested",
                    "value": "New Warrior Samurai Battle Tactic. +1 Max Grit",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Unrelenting Resolve",
                    "requires": "Warrior's Training",
                    "value": "New Warrior Samurai Battle Tactic. +1 Initiative",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Lord of War",
                    "requires": "Unrelenting Resolve",
                    "value": "Melee To Hit 3+",
                    "modifiers": [{ "affects": "melee", "value": 3 }]
                },
                {
                    "name": "Growing Rage",
                    "value": "Once per Adventure gain 1 Fury for every 2 Wounds you currently have. While at half Health or less, you are +1 Combat."
                },
                {
                    "name": "Shout at the Darkness",
                    "value": "Once per turn, spend 3 Fury to cancel a Darkness card on D6 of 3+. +1 Max Fury",
                    "requires": "Growing Rage",
                    "modifiers": [{ "affects": "fury", "value": "1" }]
                },
                {
                    "name": "Furious Speed",
                    "requires": "Shout at the Darkness",
                    "value": "Once per turn, at the start of the turn, spend any number of Fury to gain +1 Initiative each. +1 Max Grit and +1 Max Fury.",
                    "modifiers": [{ "affects": "grit", "value": 1 }, { "affects": "fury", "value": 1 }]
                },
                {
                    "name": "Fury Unleashed",
                    "requires": "Furious Speed",
                    "value": "Once per Fight, you may spend any number of Fury to add +1 Damage each to one of your Combat Hits. +1 Max Fury.",
                    "modifiers": [{ "affects": "fury", "value": 1 }]
                },
                {
                    "name": "Defense Discipline",
                    "value": "Once per Fight, you may add +1 to all of your Armor rolls just rolled. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Attack Discipline",
                    "requires": "Defense Discipline",
                    "value": "All Keyword Strike Battle Tactics cost you 1 less Fury to activate (min 1). +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Movement Discipline",
                    "requires": "Attack Discipline",
                    "value": "Whenever you roll a 1 for Move, you may also gain D3 Fury. +1 Move",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "name": "Precise Strikes",
                    "requires": "Movement Discipline",
                    "value": "Your Melee To Hit rolls of 1 may be assigned to targets as though they were Hits, doing D3 Wounds each, ignoring Defense. +1 Strength",
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Leadership",
                    "value": "At the start of each turn, choose any one Hero or Ally to Heal 1 Wound or 1 Sanity Damage. +1 Lore",
                    "modifiers": [{ "affects": "Lore", "value": 1 }]
                },
                {
                    "name": "Toe to Toe",
                    "requires": "Leadership",
                    "value": "Once per Adventure, use 1 Grit to gain +2 Combat for each Large or bigger Enemy adjacent to you (limit +6). +1 Strength.",
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Stalwart",
                    "requires": "Toe to Toe",
                    "value": "For each Clothing Item you have equipped, you are +1 Health and +1 Sanity (max +5 each). +1 Corruption Resistance.",
                    "modifiers": [{ "affects": "corruption", "value": 1 }]
                },
                {
                    "name": "Battle Formation",
                    "requires": "Stalwart",
                    "value": "You are +1 Combat for each other Hero or Ally adjacent to you (max +2). +1 Cunning",
                    "modifiers": [{ "affects": "Cunning", "value": 1 }]
                }
            ]
        },
        {
            "name": "Assassin",
            "abilities": [
                {
                    "desc": "Starts with a Ninja Clan card of your choice.",
                    "name": "Ninja Clan"
                },
                {
                    "desc": "+1 Move. You may move through other models and you automatically pass all Escape tests.",
                    "name": "Nimble",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "desc": "Your Combat Hits ignore any Armor an Enemy has, and are also +1 Damage while your target is the only Enemy adjacent to you",
                    "name": "Deadly"
                },
                {
                    "desc": "May not use Guns. Once per turn, you may re-roll any number of your Defense rolls just made",
                    "name": "Silent Fighter"
                }
            ],
            "classId": "992db5e3-a9c0-41b0-8a77-7e2e77352c46",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 6,
            "items": [
                {
                    "description": "Your Combat Hits are Critical Hits on rolls of 5+. Stealth Only",
                    "hands": 1,
                    "name": "Ninjato",
                    "weight": 1,
                    "slots": 1,
                    "cost": 250,
                    "keywords": "Gear, Blade, Hand Weapon",
                    "source": "Starting Gear"
                },
                {
                    "description": "Free Attack (once per Fight) - Range 5, Shots 2. May be used at any time during your Move, but not while adjacent to Enemies. Stealth Only",
                    "hands": 0,
                    "name": "Shuriken",
                    "weight": 0,
                    "slots": 0,
                    "cost": 300,
                    "keywords": "Gear, Shuriken",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Outlaw, Stealth",
            "level": 1,
            "melee": 3,
            "movement": 1,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 3,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 1,
                "Strength": 2
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Smoke Bomb",
                    "type": "starting",
                    "value": "Once per Turn, use 1 Grit at any time (except during Enemy Activation) to immediately move up to D6 spaces, ignoring anything in those spaces during the move. If you end this move at least 3 spaces away from where you started, gain +2 Combat until the end of the turn."
                },
                {
                    "name": "Ruthless",
                    "type": "starting",
                    "value": "Any time you kill an Enemy, you may heal 1 Sanity Damage. Extra Starting Gear: Pair of Sai (replaces Ninjato)"
                },
                {
                    "name": "Running Assault",
                    "type": "starting",
                    "value": "+1 Move. Once per Fight, you may ready and exhausted Shuriken Item.",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "multi": true,
                    "name": "Assassination Target",
                    "value": "Once per Adventure, choose an Enemy model at the start of a Fight. If you kill that model, gain double XP for killing it. Must choose different models for each target."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Health",
                    "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "2 Health and 2 Sanity.",
                    "modifiers": [
                        {
                            "affects": "health",
                            "value": 2
                        },
                        {
                            "affects": "sanity",
                            "value": 2
                        }
                    ]
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "multi": true,
                    "name": "Health",
                    "value": "+ Peril Die Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "name": "From the Shadows",
                    "value": "When assigning any Hit to a Target on the other side of a Barrier from you, that Hit is +1 Damage. +1 Cunning",
                    "modifiers": [{ "affects": "Cunning", "value": 1 }]
                },
                {
                    "modifiers": [{ "affects": "health", "value": 2 }],
                    "name": "Find the Weak Spot",
                    "requires": "From the Shadows",
                    "value": "Once per turn, you may ignore Tough or Endurance abilities of an Enemy for a single Hit. +2 Health."
                },
                {
                    "name": "Shadow Dodge",
                    "requires": "Find the Weak Spot",
                    "value": "Once per turn, you may bounce yourself once in place of a Defense roll (even after rolled or if Defense would be ignored). If moved to a different space, that Defense is successful. If not moved, take Damage as normal."
                },
                {
                    "name": "Living Shadow",
                    "requires": "Shadow Dodge",
                    "value": "Models with a lower Initiative than you are -1 To Hit you. +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Acrobatic Strike",
                    "value": "Once per turn, when you move through an Enemy's space, that Enemy takes 1 Wound, ignoring Defense, on D6 of 4, 5, or 6. +1 Move",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "name": "Wall Run",
                    "value": "You may roll 2 dice for Move each turn and choose which to use. +1 Move.",
                    "requires": "Acrobatic Strike",
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Dance of Death",
                    "requires": "Wall Run",
                    "value": "For every 4 spaces you moved (may not count same space twice), gain +1 Combat on a Melee Attack this turn. When used, your Combat Hits must be assigned to targets not adjacent to you at the start of your Activation."
                },
                {
                    "name": "Move Like the Wind",
                    "requires": "Dance of Death",
                    "value": "You always count as having Cover 5+"
                },
                {
                    "name": "Deadly Accuracy",
                    "value": "Once per Fight, when you roll a Critical Hit on a To Hit, you may turn one of your normal Hits into a Critical as well."
                },
                {
                    "name": "Clan Veteran",
                    "requires": "Deadly Accuracy",
                    "value": "You may now use your Ninja Clan's ability a second time during each Adventure. +1 Spirit",
                    "modifiers": [{ "affects": "Spirit", "value": 1 }]
                },
                {
                    "name": "Light on Your Feet",
                    "requires": "Clan Veteran",
                    "value": "+1 Initiative, +1 Agility, and +1 Move",
                    "modifiers": [
                        { "affects": "init", "value": 1 },
                        { "affects": "Agility", "value": 1 },
                        { "affects": "move", "value": 1 }
                    ]
                },
                {
                    "name": "Deep Slice",
                    "requires": "Light on Your Feet",
                    "value": "Once per turn, you may add a Bleeding Marker to a Target you assigned a Melee Critical Hit to. +1 Strength",
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Distraction",
                    "value": "Gain 2 Flash Powder side bag tokens. +2 Side Bag Capacity",
                    "modifiers": [{ "affects": "sidebag", "value": 1 }]
                },
                {
                    "name": "Mini-bombs",
                    "requires": "Distraction",
                    "value": "Gain 1 Bomb side bag token at the start of each Adventure. Once per Fight, you may throw an Explosive as a free attack."
                },
                {
                    "name": "Chop Chop",
                    "requires": "Mini-bombs",
                    "value": "While you have 2 1-Handed or 1 2-Handed Hand Weapons equipped, you gain +1 Combat"
                },
                {
                    "name": "Only a Ninja Can Kill a Ninja",
                    "requires": "War Caster",
                    "value": "You start every Adventure with a Revive Token usable only by you. Gain 25 XP any time you use it. +1 Spirit",
                    "modifiers": [{ "affects": "Spirit", "value": 1 }]
                }
            ]
        },
        {
            "name": "Trederran Veteran",
            "abilities": [
                {
                    "desc": "Starts with a Trederran Veteran Faction card of your choice",
                    "name": "Trederran Faction"
                },
                {
                    "desc": "You are Defense 3+ instead against Enemy Ranged attacks and you do not need to target adjacent Enemies first when making a Ranged Attack.",
                    "name": "Battle-Hardened"
                },
                {
                    "desc": "Starts with a Terderra Personal Item instead of a normal one. Also, +3 Lore while in Trederra OtherWorld.",
                    "name": "OtherWorld Native (Trederra)"
                }
            ],
            "classId": "e4f27631-8bc8-4ed1-b9d7-3186d37ad926",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 11,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "description": "Range 5, Shots 2, Damage +1",
                    "hands": 1,
                    "name": "Trusty Trench Pistol",
                    "weight": 1,
                    "slots": 2,
                    "cost": 250,
                    "keywords": "Gear, Trederra, Gun, Pistol",
                    "source": "Starting Gear"
                },
                {
                    "description": "+2 Health. While equipped, your Corruption Resistance is increased by 2",
                    "hands": 0,
                    "name": "Worn Trench Coat",
                    "weight": 1,
                    "slots": 2,
                    "cost": 400,
                    "keywords": "Gear, Trederra, Clothing, Coat",
                    "source": "Starting Gear",
                    "modifiers": [{ "affects": "health", "value": 2 }, { "affects": "corruption", "value": 2 }]
                },
                {
                    "description": "Any time you would take a Corruption Point or gain a Poison marker, roll a D6. Ignore it on a roll of 5+",
                    "hands": 0,
                    "name": "Veteran's Breath Mask",
                    "weight": 0,
                    "slots": 0,
                    "cost": 500,
                    "keywords": "Gear, Trederra, Clothing, Face",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "OtherWorld, Trederra, Alien, Soldier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 3,
            "sanity": {
                "loss": 0,
                "max": 11
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 3,
                "Lore": 1,
                "Luck": 4,
                "Spirit": 2,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Field Officer",
                    "type": "starting",
                    "value": "At the start of every Fight, all Heroes may Recover a Grit on the D6 roll of 5+ each (or 4+ each if you are Level 4 or higher). Extra starting gear: Officer's Sabre"
                },
                {
                    "name": "From the Front Lines",
                    "type": "starting",
                    "value": "Start every Adventure with D3 free Shatter Grenade tokens in your Side Bag. You also gain: Free Attack (once per Fight) - Throw Shatter Grenade. Extra starting gear: Old Dark Stone Carbine (replaces Trusty Trench Pistol)"
                },
                {
                    "name": "Tainted by War",
                    "type": "starting",
                    "value": "+1 Max Grit. Start with a Mutation. When rolling for a Mutation, always roll twice and choose which to keep.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "multi": true,
                    "name": "Dark Stone Hunter",
                    "value": "Any time you gain 1 or more Dark Stone, you may gain 1 extra."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Strength and Sanity",
                    "value": "+1 Strength. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning and Sanity",
                    "value": "+1 Cunning. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore and Sanity",
                    "value": "+1 Lore. Also, gain +D6 Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit and Sanity",
                    "value": "+1 Spirit. Also gain +D6 Sanity."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "3 Health and 3 Sanity.",
                    "modifiers": [
                        {
                            "affects": "health",
                            "value": "3"
                        },
                        {
                            "affects": "sanity",
                            "value": "3"
                        }
                    ]
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility and Health",
                    "value": "+1 Agility. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit and Health",
                    "value": "+1 Spirit. Also gain +D6 Health."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity"
                },
                {
                    "multi": true,
                    "name": "Personalized Gear",
                    "value": "Choose any Item you have to gain an extra upgrade slot. Limit once per Item."
                },
                {
                    "name": "Trench Scout",
                    "value": "You may now roll 2 dice for Escape tests and choose which to use. +2 Move",
                    "modifiers": [{ "affects": "move", "value": 2 }]
                },
                {
                    "name": "Adrenaline Rush",
                    "requires": "Trench Scout",
                    "value": "At the start of any Fight, you may Heal D6 Wounds/Sanity (any mix)."
                },
                {
                    "name": "Keen Eyes",
                    "requires": "Adrenaline Rush",
                    "value": "Whenever you draw one or more Loot or Scavenge cards, you may draw one extra (this may increase beyond the limit of 3 Loot per Fight)."
                },
                {
                    "name": "Winds of Change",
                    "requires": "Keen Eyes",
                    "value": "Once per turn, you may make a Luck 6+ test to cancel and re-draw a Darkness, Growing Dread, Encounter, or Threat card just drawn. Gain 20 XP. +2 Corruption Resistance.",
                    "modifiers": [{ "affects": "corruption", "value": 1 }]
                },
                {
                    "name": "Soldier's Satchel",
                    "value": "At the start of every Adventure, gain 1 of the following Side Bag Tokens for free: Bandages, Whiskey (Sake), Shatter Grenade. +2 Side Bag Capacity",
                    "modifiers": [{ "affects": "sidebag", "value": 2 }]
                },
                {
                    "name": "Battle Gear",
                    "value": "You are +1 Health for each Clothing Item you have equipped. +1 Strength",
                    "requires": "Soldier's Satchel",
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Unflinching",
                    "requires": "Battle Gear",
                    "value": "Willpower 3+",
                    "modifiers": [{ "affects": "willpower", "value": 3 }]
                },
                {
                    "name": "Trederran Sunset",
                    "requires": "Unflinching",
                    "value": "Any time you are KO'd, you may do 2D6 Wounds to every adjacent model, ignoring Defense. You now have unlimited Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 99 }]
                },
                {
                    "name": "Dark Stone Shots",
                    "value": "Once per turn, discard a Dark Stone to add extra Damage to one of your Gun Hits, equal to the number of upgrade slots the Gun has."
                },
                {
                    "name": "Weapons Training",
                    "requires": "Dark Stone Shots",
                    "value": "When using any 1-Handed Gun, add +2 Range. When using any 2-Handed Gun, add +1 Shot."
                },
                {
                    "name": "Firefight",
                    "requires": "Weapons Training",
                    "value": "Once per turn, when you kill an Enemy with a Ranged Attack, make a Cunning 6+ test to Recover 1 Grit for each 6+ rolled."
                },
                {
                    "name": "Death Machine",
                    "requires": "Firefight",
                    "value": "Once per turn, use 2 Grit to make an extra Ranged Attack. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Ruthless",
                    "value": "Once per Fight, you may take 1 Corruption Hit to add +D3 Damage to one of your Hits"
                },
                {
                    "name": "Dark Stone Greed",
                    "requires": "Ruthless",
                    "value": "You are +1 Sanity for each Dark Stone icon on Items you are carrying. This includes Dark Stone that is hidden. (max +10)"
                },
                {
                    "name": "Watch the World Burn",
                    "requires": "Dark Stone Greed",
                    "value": "Any time the Darkness moves 1 or more spaces forward on the Depth Track, you may Recover a Grit. +1 Lore",
                    "modifiers": [{ "affects": "Lore", "value": 1 }]
                },
                {
                    "name": "Frenzy",
                    "requires": "Watch the World Burn",
                    "value": "You are +1 Combat for each Mutation you have (Limit +3). Free Attack once per Fight: Use 1 Grit to make an extra Melee Attack"
                }
            ]
        },
        {
            "name": "Soldier",
            "abilities": [
                {
                    "desc": "If you do not move during your Activation, add +1 Shot to any 2-handed Bun you attack with.",
                    "name": "Soldier's Reload"
                },
                {
                    "desc": "You do not need to target adjacent Enemies first with your Ranged Attacks.",
                    "name": "Fire Discipline"
                }
            ],
            "classId": "7b56f8f2-54b7-4458-9194-ae22c945182f",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "Range 10, Shots 1. Use Peril Die + 1 for Damage. Hits from this Gun may not be assigned to Enemies adjacent to you.",
                    "hands": 2,
                    "name": "Flintlock Rifle",
                    "weight": 1,
                    "slots": 3,
                    "cost": 450,
                    "keywords": "Gear, Gun, Rifle",
                    "source": "Starting Gear"
                },
                {
                    "description": "Armor 6+, +2 Health",
                    "hands": 0,
                    "name": "Soldier's Armor",
                    "weight": 1,
                    "slots": 1,
                    "cost": 400,
                    "keywords": "Gear, Clothing, Torso",
                    "source": "Starting Gear",
                    "modifiers": [{ "affects": "armor", "value": 6 }, { "affects": "health", "value": 2 }]
                }
            ],
            "keywords": "Soldier, Scout",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 3,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 3,
                "Lore": 1,
                "Luck": 4,
                "Spirit": 2,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Sharp Shooter",
                    "type": "starting",
                    "value": "Any time you kill an Enemy with a Ranged Critical Hit, Recover a Grit on D6 of 4+. Once per Fight, use 1 Grit to add +D6 Damage to one of your Gun Hits."
                },
                {
                    "name": "Fall Back",
                    "type": "starting",
                    "value": "At the start of your Activation each turn, during the Fight, you may make a free move up to 2 spaces, ignoring Escape tests. This free move does not prevent the use of the Soldier's Reload Ability."
                },
                {
                    "name": "Military Scout",
                    "type": "starting",
                    "value": "+1 Move. Once per Turn, use 1 Grit to cancel and re-draw an Encounter, Threat card, Darkness, or Exploration Token. When you do, gain 15 XP.",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix).",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D6 Health and D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Health",
                    "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck and Health",
                    "value": "+1 Luck. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "multi": true,
                    "name": "Battlefield Rivalry",
                    "value": "Choose an Enemy keyword. From now on, any time you kill one of those Enemies, Heal 1 Wound or Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [{ "affects": "grit", "value": "1" }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "name": "Rifle Butt",
                    "value": "While you have 2-Handed Gun equipped, you are +2 Combat. +1 Initiative",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Double Shot (Rifle)",
                    "requires": "Rifle Butt",
                    "value": "Once per turn, when you kill an Enemy with a Rifle, you gain +1 Shot with that Rifle"
                },
                {
                    "name": "Banzai!",
                    "requires": "Double Shot (Rifle)",
                    "value": "Once per fight, use 1 Grit to gain +D6 Move, ignore Escape tests, and all of your Combat Hits are +2 Damage until end of the turn. +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Expert Gunner",
                    "requires": "Banzai!",
                    "value": "You may use the D8 when rolling to hit for all your Ranged To Hit rolls. +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Team Defense",
                    "value": "Every other Hero adjacent to you may Re-roll one of their Defense rolls per turn. If this re-rolled Defense is successful, gain 5 XP."
                },
                {
                    "name": "Armed to the Teeth",
                    "value": "For each Gun and Hand Weapon you are carrying, gain +2 Health (max +10). +1 Strength.",
                    "requires": "Team Defense",
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Sacrifice",
                    "requires": "Armed to the Teeth",
                    "value": "Once per turn, take D6 Wounds, ignoring Defense, to prevent all Damage that another Hero within 2 spaces would take from a single source. Gain 20 XP."
                },
                {
                    "name": "Never Say Die",
                    "requires": "Sacrifice",
                    "value": "Once per Adventure, at the start of a turn, you may automatically Recover from being KO'd, as long as there are no Enemies adjacent to you. Roll to Heal as normal, but do not roll for Injury or Madness."
                },
                {
                    "name": "Stand Firm",
                    "value": "Once per Adventure, cancel a Darkness card. Gain 10 XP"
                },
                {
                    "name": "See It Through",
                    "requires": "Stand Firm",
                    "value": "Whenever a Growing Dread card is drawn, Recover a Grit. +1 Spirit.",
                    "modifiers": [{ "affects": "Spirit", "value": 1 }]
                },
                {
                    "name": "Revenge",
                    "requires": "See It Through",
                    "value": "Whenever another Hero or Ally is KO'd, Recover a Grit and you are +1 Combat/Shot (choose) during your next Activation. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Nobody Left Behind",
                    "requires": "Revenge",
                    "value": "Use 2 Grit to Recover another KO'd Hero adjacent to you, even if there are multiple Enemies on the same Map Tile. Gain 25 XP and that Hero may roll 3 dice for Injury/Madness, discarding the lowest die."
                },
                {
                    "name": "Survivor",
                    "value": "Once per turn, add +1 to all of your Armor rolls just made."
                },
                {
                    "name": "Deflect",
                    "requires": "Survivor",
                    "value": "Once per turn, you may force an adjacent Enemy to re-roll one of its To Hit rolls against you."
                },
                {
                    "name": "Tough as Nails",
                    "requires": "Deflect",
                    "value": "Increase the Armor value by 1 of any Armor you have equipped."
                },
                {
                    "name": "Last Man Standing",
                    "requires": "Tough as Nails",
                    "value": "Defense 3+",
                    "modifiers": [{ "affects": "defense", "value": 3 }]
                }
            ]
        },
        {
            "name": "Enforcer",
            "abilities": [
                {
                    "desc": "You have Endurance 4. You may not take more than 4 Wounds from any single Hit.",
                    "name": "High Pain Threshold"
                },
                {
                    "desc": "Always rolls 1 extra die when Scavenging",
                    "name": "Mercenary"
                }
            ],
            "classId": "1b2246b8-ccc1-4408-96e4-069780cdfc97",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "endurance": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 2,
            "items": [
                {
                    "description": "Your Combat Hits are +1 Damage against Medium or smaller Enemies. Gain $10 any time you kill an Enemy. Outlaw Only",
                    "hands": 1,
                    "name": "Outlaw Club",
                    "weight": 1,
                    "slots": 2,
                    "cost": 250,
                    "keywords": "Gear, Hand Weapon",
                    "source": "Starting Gear"
                },
                {
                    "description": "+2 Health. Once per Adventure, fully Heal your Health. This Item may not be discarded, traded, or lost in any way. Outlaw Only",
                    "hands": 0,
                    "name": "Shoulder Tattoo",
                    "weight": 0,
                    "slots": 0,
                    "cost": 0,
                    "keywords": "Gear, Tattoo",
                    "source": "Starting Gear",
                    "modifiers": [{ "affects": "health", "value": 2 }]
                }
            ],
            "keywords": "Outlaw, Showman",
            "level": 1,
            "melee": 3,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 1,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 3,
                "Spirit": 2,
                "Strength": 4
            },
            "wealth": 0,
            "willpower": 5,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Finding a Weakness",
                    "type": "starting",
                    "value": "Once per Turn, use 1 Grit to double one of your Damage rolls (before any modifiers). This Damage also ignores Armor."
                },
                {
                    "name": "Failure is No Option",
                    "type": "starting",
                    "value": "+1 Max Grit. You Recover a Grit at the start of your Activation each turn. Make note whenever you Fail a Mission (you must cut off a finger for each). After 5 failed missions, you gain -1 Combat and +1 Max Grit. After 10 Failed Missions, you lose the use of 1 Hand.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "A Hard Life",
                    "type": "starting",
                    "value": "+2 Sanity. Once per Turn/Day in Town, you may Re-roll a single Willpower roll. You are immune to all Status Effect markers.",
                    "modifiers": [{ "affects": "sanity", "value": 2 }]
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D3 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain D3 Sanity.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D6 Health and 2 Sanity.",
                    "modifiers": [{ "affects": "sanity", "value": 2 }]
                },
                {
                    "modifiers": [{ "affects": "init", "value": "1" }],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning and Health",
                    "value": "+1 Cunning. Also, gain +D6 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore and Health",
                    "value": "+1 Lore. Also, gain +D6 Health"
                },
                {
                    "multi": true,
                    "name": "Proud Scars",
                    "value": "Every time you successfully remove an Injury, Mutation, or Parasite, roll a D6. On 5+, gain 1 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore and Sanity",
                    "value": "+1 Lore. Also gain +D3 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck and Sanity",
                    "value": "+1 Luck. Also gain +D3 Sanity."
                },
                {
                    "multi": true,
                    "name": "Tribute",
                    "value": "At the start of every Town Stay, gain D6 x $10"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity"
                },
                {
                    "modifiers": [{ "affects": "weight", "value": 1 }],
                    "multi": true,
                    "name": "You may carry 1 extra weight",
                    "value": "You may carry 1 extra weight"
                },
                {
                    "name": "Stern Glare",
                    "value": "Spirit Armor 5+",
                    "modifiers": [{ "affects": "spiritArmor", "value": 5 }]
                },
                {
                    "name": "Infamy",
                    "requires": "Stern Glare",
                    "value": "Once per Town Stay, you may intimidate a local shopkeeper to pay D6x$25 less for a single Item or Service."
                },
                {
                    "name": "Cripple",
                    "requires": "Infamy",
                    "value": "Use 1 Grit when you do 2 or more Wounds to an Enemy. That model is Crippled (-1 Defense, -1 Move, limit once per model). May not be used on models immune to Critical Hits."
                },
                {
                    "name": "Gruesom Punishment",
                    "requires": "Cripple",
                    "value": "Your Melee To Hit rolls of 6+ also add a Bleeding marker on D6 roll of 4, 5, or 6 each. +1 Strength",
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Make an Example",
                    "value": "Choose one Enemy at the start of your Activation each turn during a Fight. Until the end of the turn, your To Hit rolls of 5+ count as Critical Hits against that model."
                },
                {
                    "name": "Just Try It",
                    "value": "Anytime the Darkness would escape on the Depth Track, roll a D6. On the roll of 5+, instead place the marker on the last space before escaping. Gain 20 XP."
                },
                {
                    "name": "Merciless",
                    "requires": "Just Try It",
                    "value": "While you have 2 1-Handed Weapons equipped, you are +1 Combat. +1 Agility.",
                    "modifiers": [{ "affects": "Agility", "value": 1 }]
                },
                {
                    "name": "Laughs at Death",
                    "requires": "Merciless",
                    "value": "Heal 1 Wound at the start of each turn. When Recovering from being KOd, you may Heal double the amount rolled (any mix)"
                },
                {
                    "name": "For the Challenge",
                    "value": "Your Attacks are +1 Damage against Enemies with the Fear, Terror, or Unspeakable Terror ability."
                },
                {
                    "name": "The High Life",
                    "requires": "For the Challenge",
                    "value": "Anytime you would draw a Loot or Scavenge card, you may Heal 1 Wound or 1 Sanity. +1 Luck",
                    "modifiers": [{ "affects": "Luck", "value": 1 }]
                },
                {
                    "name": "Fools Rush In",
                    "requires": "The High Life",
                    "value": "During the first turn of a Fight, while on a Map Tile where Enemies were placed, gain +1 Combat for every two spaces you start your Activation from the entrance spaces of that Map Tile."
                },
                {
                    "name": "You Don't Scare Me!",
                    "requires": "Fools Rush In",
                    "value": "Willpower 4+. +1 Combat.",
                    "modifiers": [{ "affects": "combat", "value": 1 }, { "affects": "willpower", "value": 4 }]
                },
                {
                    "name": "Iron Nerves",
                    "value": "Your High Pain Threshold is now Endurance 3. +2 Sanity.",
                    "modifiers": [{ "affects": "sanity", "value": 2 }, { "affects": "endurance", "value": 3 }]
                },
                {
                    "name": "No Compromise",
                    "requires": "Iron Nerves",
                    "value": "Once per Adventure, use 2 Grit to fully Heal your Sanity. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Confidence",
                    "requires": "No Compromise",
                    "value": "You are +1 Sanity for each tattoo you have. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Feels No Pain",
                    "requires": "Confidence",
                    "value": "Your High Pain Threshold is now Endurance 2. +2 Sanity.",
                    "modifiers": [{ "affects": "sanity", "value": 2 }, { "affects": "endurance", "value": 2 }]
                }
            ]
        },
        {
            "name": "Daimyo",
            "abilities": [
                {
                    "desc": "Starts with 2 random Samurai Battle Tactics drawn from any Battle Tactics decks (draw 2, choose 1 for each). Each may only be used once per Turn.",
                    "name": "Samurai Battle Tactis"
                },
                {
                    "desc": "Any time you or an Ally does one or more Wounds to an Enemy with a Combat or Ranged Hit, gain 1 Fury Token.",
                    "name": "Command Fury"
                },
                {
                    "desc": "Starts each Adventure with 1 Armored Ashigaru Ally",
                    "name": "Honor Guard"
                }
            ],
            "classId": "31bc6866-d846-417e-8ce3-9b7e4fc18c61",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "fury": { "max": 5, "current": 0 },
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "Range 4, Shots 2. +1 Damage. Spend 2 Fury to gain +1 Shot. These extra Shots do not generate Fury Tokens.",
                    "hands": 1,
                    "name": "Daimyo Pisol",
                    "weight": 1,
                    "slots": 1,
                    "cost": 400,
                    "keywords": "Gear, Gun, Pistol",
                    "source": "Starting Gear"
                },
                {
                    "description": "Armor 5+. +1 Max Grit. Samurai Only",
                    "hands": 0,
                    "name": "General's Armor",
                    "weight": 1,
                    "slots": 1,
                    "cost": 650,
                    "keywords": "Gear, Clothing, Torso, Shoulders",
                    "source": "Starting Gear",
                    "modifiers": [{ "affects": "armor", "value": 5 }, { "affects": "grit", "value": 1 }]
                },
                {
                    "description": "Once per turn, you may ignore an Enemy's Defense and Armor for a single Combat Hit",
                    "hands": 1,
                    "name": "Warlord's Katana",
                    "weight": 1,
                    "slots": 2,
                    "cost": 275,
                    "keywords": "Gear, Blade, Hand Weapon",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Samurai, Showman, Soldier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "samuraiTactics": [],
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 4,
                "Lore": 2,
                "Luck": 2,
                "Spirit": 1,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Battlefield General",
                    "type": "starting",
                    "value": "Start each Adventure with D3 Armored Ashigaru Allies instead of 1. At the start of any turn, spend 4 Fury and 2 Grit to place a new Armored Ashigaru Ally in any space adjacent to you (limit 3 on the board at a time)."
                },
                {
                    "name": "Strategist",
                    "type": "starting",
                    "value": "At the start of each turn, you may choose one other Hero or Ally to gain +2 Initiative until the end of the turn or Heal 1 Sanity. Extra Starting Gear: Daimyo War Fan."
                },
                {
                    "name": "Warlord",
                    "type": "starting",
                    "value": "During a Fight, roll a D6 at the start of each turn. On rolls of 3+, gain 1 Fury. Extra starting gear: Impressive Helmet."
                },
                {
                    "multi": true,
                    "name": "Honorable Vendetta",
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra 10 XP"
                },
                {
                    "modifiers": [{ "affects": "fury", "value": "1" }],
                    "name": "Max Fury",
                    "value": "+1 Max Fury",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Strength and Sanity",
                    "value": "+1 Strength. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning and Sanity",
                    "value": "+1 Cunning. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Spirit and Health/Sanity",
                    "value": "+1 Spirit. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Agility and Health/Sanity",
                    "value": "+1 Agility. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D6 Health and D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore and Health/Sanity",
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck and Health/Sanity",
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative",
                    "value": "+1 Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "name": "First Blood",
                    "value": "Whenever you do Damage to a previously unwounded Enemy, gain +5 XP. +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Know Thy Enemy",
                    "requires": "First Blood",
                    "value": "At the start of each turn during a Fight, roll a D6. You may choose all Enemies with Initiative above the roll OR all below the roll to be -1 Defense until the end of the turn."
                },
                {
                    "name": "Battle Charge",
                    "requires": "Know Thy Enemy",
                    "value": "Once per Fight, use 4 Fury to give all Heroes and Allies on your Map Tile +1 Combat during their next Activation. You may not gain any more Fury until the end of the turn."
                },
                {
                    "name": "Unmatched",
                    "requires": "Battle Charge",
                    "value": "Choose 2: Defense 3+, Willpower 3+, Ranged 3+, or Melee 3+"
                },
                {
                    "name": "Survey the Field",
                    "value": "At the start of every Fight, Recover 1 Grit"
                },
                {
                    "name": "Standing Army",
                    "value": "All Allies cost you half price to Hire (round up to nearest $5). Once per Travel, you may force one Travel Hazard to be re-rolled.",
                    "requires": "Survey the Field"
                },
                {
                    "name": "Ruthless Volley",
                    "requires": "Standing Army",
                    "value": "You and all Allies in the Hero Party may add +1 Shot to any Gun or Bow used"
                },
                {
                    "name": "Supply Chain",
                    "requires": "Ruthless Volley",
                    "value": "At the start of every Fight, gain 1 of the following Side Bag Tokens for free: Bandages, Sake, Fire Sake, or Bomb"
                },
                {
                    "name": "Inspiring Figure",
                    "value": "All Allies in the Hero Party are +1 Health and +1 Sanity. +1 Lore",
                    "modifiers": [{ "affects": "Lore", "value": "1" }]
                },
                {
                    "name": "Training Drills",
                    "requires": "Inspiring Figure",
                    "value": "Once per turn, you may re-roll an Ally's roll on the Exploration Chart when using their Check It Out ability."
                },
                {
                    "name": "Direction",
                    "requires": "Training Drills",
                    "value": "You may use your Grit on dice rolled by any Ally in the Hero Party"
                },
                {
                    "name": "Legendary Leader",
                    "requires": "Direction",
                    "value": "Armored Ashigaru in the Hero Party are now Defense 3+ and Willpower 3+. +1 Combat",
                    "modifiers": [{ "affects": "combat", "value": "1" }]
                },
                {
                    "name": "Battle Plan",
                    "value": "New Samurai Battle Tactic. +1 Luck",
                    "modifiers": [{ "affects": "Luck", "value": "1" }]
                },
                {
                    "name": "Tribute",
                    "requires": "Battle Plan",
                    "value": "At the start of each Town Stay, you gain $50 x your Hero Level. +1 Max Fury",
                    "modifiers": [{ "affects": "fury", "value": "1" }]
                },
                {
                    "name": "Veteran",
                    "requires": "Tribute",
                    "value": "New Samurai Battle Tactic. +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": "1" }]
                },
                {
                    "name": "Battlemaster",
                    "requires": "Veteran",
                    "value": "At the start of each Adventure, draw 2 new Samurai Battle Tactics, for use only during this Adventure. Discard these at the end of the Adventure. +1 Max Fury",
                    "modifiers": [{ "affects": "fury", "value": "1" }]
                }
            ]
        },
        {
            "name": "Geisha / Kabuki",
            "abilities": [
                {
                    "desc": "At the end of the Turn, may Heal D3 Sanity Damage from one other adjacent Hero (gain 5 XP) for each Sanity Damage healed.",
                    "name": "Reassuring Touch"
                },
                {
                    "desc": "May not use 2-handed items",
                    "name": "Dainty"
                },
                {
                    "desc": "+1 Move",
                    "name": "Fast"
                }
            ],
            "classId": "a5d012db-f221-4ad3-89de-cc6bf78b6e21",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 8,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "description": "Once per Turn, you may re-roll a single failed Defense or Escape roll. Ignore Weather effects. Performer Only",
                    "hands": 1,
                    "name": "Parasol",
                    "weight": 0,
                    "slots": 2,
                    "cost": 250,
                    "keywords": "Gear, Hand Weapon, Parasol",
                    "source": "Starting Gear"
                },
                {
                    "description": "Use any time during your Move: Free Attack (once per turn) - Do 1 automatic Wound, ignoring Defense, to an adjacent model. Stealth Only",
                    "hands": 0,
                    "name": "Hidden Dagger",
                    "weight": 0,
                    "slots": 0,
                    "cost": 300,
                    "keywords": "Gear, Blade",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Stealth, Showman, Performer",
            "level": 1,
            "melee": 4,
            "movement": 1,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 4,
                "Lore": 2,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 1
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Distract",
                    "type": "starting",
                    "value": "+1 Initiative. At the end of your Move, choose an Enemy model adjacent to you. Until the end of the turn, that Enemy is -1 Defense.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Outwit",
                    "type": "starting",
                    "value": "All of your Combat Hits are +1 Damage against Enemies that have Initiative equal to or lower than your Cunning. Once per Adventure, add Damage equal to your Cunning to one of your Combat Hits"
                },
                {
                    "name": "Comforting Laugh",
                    "type": "starting",
                    "value": "Any time you draw a Loot card, you may Recover Grit on D6 roll of 5 or 6. Once per Turn, use 1 Grit to Heal D6 Wounds from any mix of other Heroes on your Map Tile (gain XP for this Healing as normal)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "name": "Spirit",
                    "value": "+1 Spirit. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "3 Health and 3 Sanity.",
                    "modifiers": [
                        {
                            "affects": "health",
                            "value": "3"
                        },
                        {
                            "affects": "sanity",
                            "value": "3"
                        }
                    ]
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative and Health",
                    "value": "+1 Initiative. Also, gain +D6 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Health/Sanity",
                    "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning and Health/Sanity",
                    "value": "+1 Cunning. Also, gain +D6 Health/Sanity (any mix)"
                },
                {
                    "multi": true,
                    "name": "Hired Kill",
                    "value": "Once per Adventure, choose an Enemy model at the start of a Fight. If you kill that model, gain D6 x $50."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck",
                    "value": "+1 Luck. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "multi": true,
                    "name": "Fame",
                    "value": "Once per Town stay, re-roll any single die."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "multi": true,
                    "name": "Health",
                    "value": "Gain Peril Die Health"
                },
                {
                    "name": "Twirl",
                    "value": "While you have a Parasol equipped, you may re-roll one of your Melee To Hit rolls each turn. +1 Agility.",
                    "modifiers": [{ "affects": "Agility", "value": 1 }]
                },
                {
                    "name": "Awareness",
                    "requires": "Twirl",
                    "value": "Once per turn, use 1 Grit to cancel the effects of a single Scavenge card just drawn. Gain 10 XP. You may also roll an extra die for scavenging."
                },
                {
                    "name": "Dance",
                    "requires": "Awareness",
                    "value": "You automatically pass all Escape tests and may move through other models. +1 Agility.",
                    "modifiers": [{ "affects": "Agility", "value": 1 }]
                },
                {
                    "name": "Flashing Steel",
                    "requires": "Dance",
                    "value": "Gain +1 Combat for each 1-Handed Item you have equipped (+2 for a Parasol)"
                },
                {
                    "name": "Smile",
                    "value": "When using Reassuring Touch, may now Heal all adjacent Heroes. +2 Health",
                    "modifiers": [{ "affects": "health", "value": 2 }]
                },
                {
                    "name": "Unassuming",
                    "value": "When rolling on a Town Location Event Chart, you may roll 3 D6 and discard the lowest single die. +1 Cunning",
                    "modifiers": [{ "affects": "Cunning", "value": 1 }]
                },
                {
                    "name": "Humble Bow",
                    "requires": "Unassuming",
                    "value": "At the start of a turn, during a Fight, Recover a Grit on the D6 of 4+. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Stunning Beauty",
                    "requires": "Humble Bow",
                    "value": "All Enemies adjacent to  you are -1 Defense. +1 Strength.",
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Misdirect",
                    "value": "Once per turn, use 1 Grit to re-roll any number of Enemy To-Hit rolls just rolled against a single Hero on your Map Tile. +1 Cunning.",
                    "modifiers": [{ "affects": "Cunning", "value": 1 }]
                },
                {
                    "name": "Pyrotechnics",
                    "requires": "Misdirect",
                    "value": "Once per Fight, use 1 Grit to immediately gain and throw a Bomb Token as a Free Attack."
                },
                {
                    "name": "Fast Hands",
                    "requires": "Pyrotechnics",
                    "value": "You may now make up to 2 Free Attacks per turn. These are still limited by their 'Once per...' restrictions. +1 Initiative.",
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "Elegant Performance",
                    "requires": "Fast Hands",
                    "value": "Any Enemy targeting you is -1 Combat/Shot (min 1). +1 Combat.",
                    "modifiers": [{ "affects": "combat", "value": 1 }]
                },
                {
                    "name": "Crush",
                    "value": "Adjacent Enemies may not Heal Wounds. At the end of your Activation, you may remove 1 adjacent Corpse token. Gain 10 XP."
                },
                {
                    "name": "Deep Slice",
                    "requires": "Crush",
                    "value": "When using your Hidden Dagger, does D3 Wounds instead of only 1."
                },
                {
                    "name": "Sabotage",
                    "requires": "Deep Slice",
                    "value": "Once per Fight, at the start of a turn, use 1 Grit to choose a single Enemy that is Large or smaller. Select one ability on that Enemy's sheet to disable for the turn."
                },
                {
                    "name": "Eviscerate",
                    "requires": "Sabotage",
                    "value": "Free Attack once per turn: Use 2 Grit to do D6 Wounds, ignoring Defense, to each Enemy adjacent to you. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                }
            ]
        },
        {
            "name": "Kitsune",
            "abilities": [
                {
                    "desc": "Enemies are -1 on their To Hit rolls targeting this Hero (6+ still hits and triggers special abilities)",
                    "name": "Hiding in Plain Sight"
                },
                {
                    "desc": "Always Activates before Enemies at Initiative level and automatically passes Escape tests.",
                    "name": "Quick"
                }
            ],
            "classId": "b4227b26-3e3f-416e-8f4c-6dfe5bebe3cd",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 11,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "description": "Your Combat Hits treat Enemy Defense higher than 2 as only 2. If equipped as 2-handed, you are +1 Initiative. Stealth Only",
                    "hands": 1,
                    "name": "Kama Knives",
                    "weight": 1,
                    "slots": 2,
                    "cost": 600,
                    "keywords": "Gear, Hand Weapon",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Stealth, Traveler, OtherWorld Myth",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 13
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 1,
                "Spirit": 4,
                "Strength": 2
            },
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Trickster",
                    "type": "starting",
                    "value": "You Recover Grit on Move rolls of 1 or 6. Once per Turn, use 1 Grit to choose any single D6 just rolled and place it on this card.  If there was already a die here, it is swapped for the new one using its value to replace the die just taken. If there was not already a die, roll a new one to replace the one taken. Any die here is discarded when KO'd or at the end of the Adventure"
                },
                {
                    "name": "Pounce",
                    "type": "starting",
                    "value": "You are +1 Move and may move through other models. Your Combat Hits are +1 Damage against Enemies that have not Activated this turn.",
                    "modifiers": [{ "affects": "move", "value": 1 }]
                },
                {
                    "name": "Elemental Spirit",
                    "type": "starting",
                    "value": "Choose one Magik Element (Fire, Wind, Earth, Water) to become a Fox guardian of that type. Mana 3. You are Keyword Magik and get 1 Spell from that element deck (draw 2, choose 1). You may cast Spells you have using Mana like a Sorcerer/Sorceress. Each time you gain Hero levels 2, 4, 6, or 8, you may either gain +1 Mana OR gain a new Spell of your Element",
                    "modifiers": [{ "affects": "mana", "value": 3 }]
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility",
                    "value": "+1 Agility. Also gain D3+1 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning",
                    "value": "+1 Cunning. Also gain D3+1 Sanity.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D8 Health/Sanity (any mix)."
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Initiative and Health",
                    "value": "+1 Initiative. Also, gain D3+1 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Strength and Health",
                    "value": "+1 Strength. Also, gain D3+1 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Cunning and Sanity",
                    "value": "+1 Cunning. Also, gain D3+1 Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore",
                    "value": "+1 Lore. Also gain D3+1 Health."
                },
                {
                    "multi": true,
                    "name": "Guardian Traveler",
                    "value": "Choose an OtherWorld. While in that World, you are +1 Move and +1 Lore."
                },
                {
                    "multi": true,
                    "name": "Fox Trick",
                    "value": "Choose an Enemy Keyword. From now on, you take -1 Damage from Attacks made by those Enemies (min 1). Limit once per Keyword."
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Move",
                    "value": "+1 Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity and Sanity",
                    "value": "+2 Side Bag Token Capacity. Also gain D3+1 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "name": "Foretell",
                    "value": "Whenever one or more Threat cards are drawn, every Hero on your Map Tile may Recover a Grit on D6 of 5+ each."
                },
                {
                    "name": "In Time of Need",
                    "requires": "Foretell",
                    "value": "Whenever a Darkness card is drawn, every Hero on your Map Tile may Heal D3 Wounds/Sanity (any mix)."
                },
                {
                    "modifiers": [{ "affects": "grit", "value": "1" }],
                    "name": "Force of Good",
                    "requires": "In Time of Need",
                    "value": "Whenever the Hero Party marker moves onto a Growing Dread or Blood Splatter space, Recover a Grit. +1 Max Grit."
                },
                {
                    "name": "Intefere",
                    "requires": "Force of Good",
                    "value": "Use 2 Grit to cancel a Growing Dread card. Gain 20 XP. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": "1" }]
                },
                {
                    "name": "Nature's Touch",
                    "value": "Once per turn, use 1 Grit to Heal D3 Wounds from each Hero on your Map Tile."
                },
                {
                    "name": "Resistance",
                    "value": "Spirit Armor 5+. +2 Corruption Resistance.",
                    "requires": "Nature's Touch",
                    "modifiers": [{ "affects": "spiritArmor", "value": 5 }, { "affects": "corruption", "value": 2 }]
                },
                {
                    "name": "Furry Protector",
                    "requires": "Resistance",
                    "value": "You may use your Grit to re-roll any number of dice for another Hero's Defense roll just made. When using Grit to re-roll Defense rolls, add +1 to the dice."
                },
                {
                    "name": "Defining Moment",
                    "requires": "Furry Protector",
                    "value": "Once per Adventure, ready all of your other 'Once per' items and abilities currently exhausted (does not ready 'Defining Moment')."
                },
                {
                    "name": "Animal Reflexes",
                    "value": "You are +2 Initiative during the first turn of any Ambush Attack. +1 Initiative.",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Battle Spirit",
                    "requires": "Animal Reflexes",
                    "value": "+1 Combat and +1 Strength.",
                    "modifiers": [{ "affects": "combat", "value": 1 }, { "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Flurry of Blows",
                    "requires": "Battle Spirit",
                    "value": "When using Grit to re-roll your To Hit rolls, add +1 to the rolls."
                },
                {
                    "name": "Mythic Warrior",
                    "requires": "Flurry of Blows",
                    "value": "Melee To Hit 3+",
                    "modifiers": [{ "affects": "melee", "value": 3 }]
                },
                {
                    "name": "Shift",
                    "value": "Once per turn, when an Enemy rolls a natural 1 To Hit against you, you may cause that roll to instead Hit another Enemy adjacent to you, ignoring Defense."
                },
                {
                    "name": "Manipulate",
                    "requires": "Shift",
                    "value": "Once per Adventure / Travel / Town Stay, use 1 Grit to force any chart roll to be re-rolled. +1 Cunning.",
                    "modifiers": [{ "affects": "Cunning", "value": 1 }]
                },
                {
                    "name": "Obscure",
                    "requires": "Manipulate",
                    "value": "Once per turn, when a card is drawn, use 1 Grit to place that card on the bottom of the deck and draw again. Gain 10 XP."
                },
                {
                    "name": "Blur",
                    "requires": "Obscure",
                    "value": "Once per Fight, use 2 Grit at the end of your Activation to immediately Activate again. +1 Max Grit.",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                }
            ]
        },
        {
            "name": "Sumo",
            "abilities": [
                {
                    "desc": "This Hero is Large. Automatically passes Escape tests for Medium or smaller Enemies and may move into spaces with Medium or smaller models, shifting that model into the space just left. This does not allow the Hero to move through Barriers.",
                    "name": "Large"
                },
                {
                    "desc": "When moving into a space with a model, you may roll a D6. On 4+, you may Push that model back into one of the 3 adjacent spaces behind it. No single model may be Pushed more than once per Turn.",
                    "name": "Push"
                },
                {
                    "desc": "Gain +1 Combat for each open Hand.",
                    "name": "Meaty Hands"
                }
            ],
            "classId": "5619d13a-9eff-4c2f-8c52-2a9c5872952d",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 20,
                "wounds": 0
            },
            "init": 2,
            "items": [
                {
                    "description": "Whenever you kill an Enemy, Recover Grit on a D6 roll of 5 or 6. Large Size Only",
                    "hands": 0,
                    "name": "Sumo Mawashi",
                    "weight": 1,
                    "slots": 2,
                    "cost": 250,
                    "keywords": "Gear, Clothing, Pants",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Samurai, Showman, Performer",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 2,
                "Lore": 2,
                "Luck": 1,
                "Spirit": 3,
                "Strength": 4
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "name": "Multi-Hand Slap",
                    "type": "starting",
                    "value": "Once per Turn, if you did not Move during your Activation, use 1 Grit to automatically do D3+1 basic Hits to an adjacent Enemy model (or D6+1 if you instead spend 2 Grit)."
                },
                {
                    "name": "Belly Smash",
                    "type": "starting",
                    "value": "+1 Agility. You gain the following: Free Attack (once per Fight) - Immediately move up to 2 spaces in any direction (moving through other models), then Bounce D3-1 times from that space, like a Bomb (shifting any model Bounced into). Every model adjacent to your final position takes D3 Wounds, ignoring Defense.",
                    "modifiers": [{ "affects": "Agility", "value": 1 }]
                },
                {
                    "name": "Wrestling Champion",
                    "type": "starting",
                    "value": "You now automatically pass all Escape tests and may move into spaces with Large size or smaller models (including with the Push ability), shifting them as normal. Your Push ability now works on D6 rolls of 3+ instead. Your Combat Hits are +1 Damage on models you moved with Push this turn."
                },
                {
                    "name": "Honorable Vendetta",
                    "value": "Choose an Enemy Keyword. Any time you collect XP from those Enemies, gain extra 10 XP",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity and Sanity",
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "name": "Strength and Sanity",
                    "value": "+1 Strength. Also gain D6 Sanity.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "name": "Cunning and Health",
                    "value": "+1 Cunning. Also gain Peril Die Health.",
                    "multi": true
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "name": "Agility and Health",
                    "value": "+1 Agility. Also gain Peril Die Health.",
                    "multi": true
                },
                {
                    "multi": true,
                    "name": "Health and Sanity",
                    "value": "D6 Health and D6 Sanity."
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Lore and Health",
                    "value": "+1 Lore. Also, gain Peril Die Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "name": "Luck and Health",
                    "value": "+1 Luck. Also, gain Peril Die Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Side Bag Capacity",
                    "value": "+2 Side Bag Token Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "name": "Max Grit",
                    "value": "+1 Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "name": "Corruption Resistance",
                    "value": "+2 Corruption Resistance"
                },
                {
                    "multi": true,
                    "name": "You may carry extra weight",
                    "value": "You may carry 1 extra weight",
                    "modifiers": [{ "affects": "weight", "value": 1 }]
                },
                {
                    "name": "Smash",
                    "value": "Your Melee To Hit rolls of 6+ now do +1 Damage. +1 Strength",
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "Throw",
                    "requires": "Smash",
                    "value": "Free Attack once per turn: Use 1 Grit to choose an adjacent model that is Large or smaller and move it up to D6 spaces ignoring other models, Escape tests, and barriers."
                },
                {
                    "name": "Solid Mass",
                    "requires": "Throw",
                    "value": "You may always use your Defense, even against Hits that would normally ignore Defense. +5 Health",
                    "modifiers": [{ "affects": "health", "value": 5 }]
                },
                {
                    "name": "Squeeze",
                    "requires": "Solid Mass",
                    "value": "When you assign 2 or more non-Critical Hits to a target, you may add all of the Damage together as a single Hit"
                },
                {
                    "name": "Concentration",
                    "value": "Once per turn, you may re-roll one of your To Hit rolls. You may not be moved by Enemy Attacks or Abilities"
                },
                {
                    "name": "Meditation",
                    "value": "You may give up your normal Move during your Activation to Heal D3 Wounds/Sanity (any mix). +1 Spirit",
                    "modifiers": [{ "affects": "Spirit", "value": 1 }]
                },
                {
                    "name": "Competitive Focus",
                    "requires": "Meditation",
                    "value": "You may Activate before Enemies at your Initiative level. +1 Initiative",
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Determination",
                    "requires": "Competitive Focus",
                    "value": "Melee To Hit 3+",
                    "modifiers": [{ "affects": "melee", "value": 3 }]
                },
                {
                    "name": "Eruption",
                    "value": "At the end of your Move, use 1 Grit to do 1 Wound to every adjacent model, ignoring Defense and Armor. +1 Max Grit",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Roaring Challenge",
                    "requires": "Eruption",
                    "value": "Use 1 Grit at the start of an Enemy Group's Activation to force all of those Enemies to change targets to you this turn. They are -1 To Hit until the end of the turn."
                },
                {
                    "name": "Body Block",
                    "requires": "Roaring Challenge",
                    "value": "Use 1 Grit to give yourself, and every adjacent Hero, Cover 5+ until the end of the turn. +1 Max Grit",
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "Giant",
                    "requires": "Body Block",
                    "value": "Defense 3+",
                    "modifiers": [{ "affects": "defense", "value": 3 }]
                },
                {
                    "name": "Body Slam",
                    "value": "When Pushing an Enemy, you may move it back D3 spaces instead of only 1, and do D3 Wounds to it, ignoring Defense"
                },
                {
                    "name": "Sumo's Fury",
                    "requires": "Body Slam",
                    "value": "You now use the rules for Fury and have Max Fury 2. Use 2 Fury to add +1 Damage to one of your Combat Hits. +1 Max Grit",
                    "modifiers": [{ "affects": "grit", "value": 1 }, { "affects": "fury", "value": 2 }]
                },
                {
                    "name": "Pin",
                    "requires": "Sumo's Fury",
                    "value": "Use 3 Fury to prevent an adjacent Enemy model, that is Large or smaller, from Activating this turn. You may not gain Fury until the start of your next Activation. +1 Max Fury",
                    "modifiers": [{ "affects": "fury", "value": 1 }]
                },
                {
                    "name": "Destroy",
                    "requires": "Pin",
                    "value": "Use 4 Fury to double your Combat including Meaty Hands until the end of the turn. You may not gain Fury until the start of your next Activation. +1 Max Fury",
                    "modifiers": [{ "affects": "fury", "value": 1 }]
                }
            ]
        }
    ],
    GAMBLER_TRICKS: [
        {
            "desc": "If there is no die here, use 1 Fortune token when you roll a 6 on any single die to place that die here. Roll a new die to replace the 6 just rolled. While there is a die here, use 1 Fortune token to make a Luck 5+ test. If passed, replace any single die just rolled with the 6 that was here (removing the die)",
            "name": "Ace in the Hole",
            "xp": 10
        },
        {
            "desc": "Use 1 Fortune token when you are about to be Attacked by an Enemy to make a Luck 6+ test. If passed, that Attack is canceled. If failed, all Hits from that Attack are +1 Damage against you",
            "name": "Bluff",
            "xp": 20
        },
        {
            "desc": "Use 2 Fortune tokens and take 1 Corruption Hit to select any number of dice just rolled and make a Cunning 6+ test. If passed, for each 6+ rolled, choose one of the selected dice and rotate it to be on any facing you like. Only usable on rolls that allow Grit.",
            "name": "Cheat",
            "xp": 25
        },
        {
            "desc": "Use 1 Fortune token just after a card has been drawn from any deck and make a Cunning 6+ test. If passed, place that card here facedown and draw a new card to play instead. Any card already here is placed back in its proper deck, D3 cards down from the top",
            "name": "Counting Cards",
            "xp": 15
        },
        {
            "desc": "1x Fight, use 1 Fortune token when you are about to make a Damage roll for one of your Hits. Double the amount rolled for Damage (before modifiers). If the target would not be killed by this Hit, the Hit does no Damage instead.",
            "name": "Double Down",
            "xp": 0
        },
        {
            "desc": "Use 1 Fortune token to re-roll any single die just rolled, even if it has already been re-rolled. Only usable on rolls that allow Grit.",
            "name": "Fortune's Favor"
        },
        {
            "desc": "Use 1 Fortune token to choose any card deck then make a Cunning 6+ test. If passed, look at the top 3 cards. Choose one to discard and put the other two back in any order. May only be used on decks with discard piles.",
            "name": "Stack the Deck",
            "xp": 10
        },
        {
            "desc": "Use 1 Fortune token to choose any single die just rolled and make a Luck 5+ test. For each 5+ rolled, you may add or subtract 1 from the chosen die roll. Cannot be adjusted higher than natural roll maximum and cannot target die that Grit cannot be used on.",
            "name": "Tip the Scales",
            "xp": 10
        },
        {
            "desc": "description",
            "name": "Trick Name"
        }
    ],
    ORPHAN_MISSIONS: [
        {
            "desc": "+1 Cunning. +1 Luck. Requires 5 Discoveries. Reward: To Hit 3+",
            "modifiers": [
                {
                    "affects": "Cunning",
                    "value": 1
                },
                {
                    "affects": "Luck",
                    "value": 1
                }
            ],
            "name": "Become the Best"
        },
        {
            "desc": "+2 Health. Requires 2 Discoveries. Reward: +5 Sanity",
            "modifiers": [
                {
                    "affects": "health",
                    "value": 2
                }
            ],
            "name": "Find Yer Kin"
        },
        {
            "desc": "+1 Max Grit. Requires 4 Discoveries. Reward: Start each Adventure with 1 extra Grit.",
            "modifiers": {
                "affects": "grit",
                "value": 1
            },
            "name": "Find the Killer"
        },
        {
            "desc": "+1 Combat. Requires 4 Discoveries. Reward: +1 Damage to all of your Attacks",
            "modifiers": [
                {
                    "affects": "combat",
                    "value": 1
                }
            ],
            "name": "Hunt Them All"
        },
        {
            "desc": "+1 Initiative. Requires 3 Discoveries. Reward: +2 Strength.",
            "modifiers": [
                {
                    "affects": "init",
                    "value": 1
                }
            ],
            "name": "Take Em Down"
        }
    ],
    WANDERING_SAMURAI_TACTICS: [
        {
            "cost": 6,
            "desc": "During next activation, all Heroes gain +1 Shot or +1 Combat. 1x Fight. L5: +1 Damage to all Heroes' Attacks during next Activation",
            "name": "Battle Cry"
        },
        {
            "cost": 5,
            "desc": "Immediately move to an empty space adjacent to another Hero on same Map Tile. Replaces your normal Move for the Turn. L2: Any model, not just Hero; L4: same or adjacent Map Tile; L6: May swap places with other model.",
            "name": "Blowing Reeds"
        },
        {
            "cost": 1,
            "desc": "Spend Fury up to your Level to use. Target Enemy model up to 2 spaces away and move to share their space, placing a Fury token on that space. Then make an Agility 5+ test. If passed, repeat this process, not targeting the same Enemy more than once. When no targets or Fury remain or if failed, move adjacent to final target. Each Enemy takes Wounds equal to Fury tokens placed, ignoring Defense, and remove Fury tokens.",
            "name": "Dancing Dragon"
        },
        {
            "cost": 5,
            "desc": "Until end of turn, place 1 Burning Marker on an Enemy you do one or more Combat Hits to. L3: +1 Combat this turn, L6: 2 Burning Markers",
            "name": "Dragon Fire"
        },
        {
            "cost": 3,
            "desc": "Move up to 2 spaces, auto pass escape test and passing through Enemy spaces. Usable at any time, including during an Attack. L3: Usable multiple times per turn. L5: 3 spaces",
            "name": "Flowing Water"
        },
        {
            "cost": 6,
            "desc": "Choose an adjacent space. Every model in that space or 2 spaces in a line direclty behind it take D3+1 Wounds ignoring Defense. L3: 5 spaces; L5: Peril die Damage; L7: Ignores Armor and Endurance",
            "name": "Lightning Slice"
        },
        {
            "cost": 1,
            "desc": "Spend Fury up to Hero Level to use. Use only at start of a turn. Init reduced to 1 for Turn. For each Fury spent, Heal 2 Health/Sanity (any mix). L2: Init 2; L4: If 3+ Fury spent, recover 1 Grit; L6: Init -2",
            "name": "Meditation"
        },
        {
            "cost": 2,
            "desc": "Spend 2 Fury to remove a status effect or 4 Fury to remove 1 Corruption Point. Usable any time, multiple times per turn",
            "name": "Rejuvenate"
        },
        {
            "cost": 2,
            "desc": "Roll D3 + Hero Level and prevent that much Damage to you or adjacent model from single Hit. Only usable while Blade is equipped. L3: D6 + Hero Level, L5: Enemy takes 1 Combat Hit from you",
            "name": "Sword Block"
        },
        {
            "cost": 4,
            "desc": "Every Enemy model within D3 spaces of you immediately takes 1 Wound ignoring Defense. L3: D6 spaces; L6: 2 Wounds",
            "name": "Thunder Smash"
        },
        {
            "cost": 3,
            "desc": "Add +D6 Damage to one Critical Hit while using Blade. L3: Usable on To-Hit 6+ even if immune to Criticals; L6: +Peril die Damage",
            "name": "Weeping Blade"
        },
        {
            "cost": 5,
            "desc": "Every adjacent Enemy model immediately takes 1 Hit that does Peril die + Your Hero Level in damage",
            "name": "Whirlwind Strike"
        }
    ],
    SERMONS: [
        {
            "check": 10,
            "cost": 2,
            "deadly": true,
            "desc": "You may place a number of Hellfire markers up to your Hero Level +1 in any spaces within Range (limit 1 per space). All markers must form a continuous chain. Markers do 1 Hit with 2D6 Damage to anything in their space. May only be used if you did not Move this turn.",
            "name": "Cleansing Fire",
            "range": "8",
            "type": "Judgement",
            "xp": 30
        },
        {
            "check": 9,
            "cost": 1,
            "desc": "Choose one Hero within Range. That Hero may remove any Poison affecting them and may Heal 2 Sanity. Level 3: 3 Sanity. Level 5: 4 Sanity. Level 9: 5 Sanity.",
            "name": "Cure",
            "range": "6",
            "type": "Blessing",
            "xp": 20
        },
        {
            "check": 5,
            "cost": 1,
            "desc": "For each Faith spent on the cost of the sermon, you may Heal 1 Wound from yourself or an adjacent Hero. At Level 5 - Heal 2 Wounds for each Faith spent.",
            "name": "Faith Healing",
            "type": "Blessing",
            "xp": 10
        },
        {
            "check": 7,
            "cost": 2,
            "desc": "Choose one Hero within Range. That Hero gains +3 Initiative until the end of the turn. At level 4, +4 Initiative. At level 8, +5 Initiative.",
            "name": "Holy Speed",
            "range": "8",
            "type": "Blessing",
            "xp": 15
        },
        {
            "check": 10,
            "cost": 2,
            "deadly": true,
            "desc": "Cancel a Darkness card. You may spend 1 extra Faith to cancel a Growing Dread card instead.",
            "name": "Intervention",
            "type": "Blessing",
            "xp": 50
        },
        {
            "check": 6,
            "cost": 2,
            "deadly": true,
            "desc": "You may Heal a number of Wounds equal to the amount the preaching roll beat the casting number by from any mix of Heroes within Range (including yourself)",
            "name": "Revitalize",
            "range": "8",
            "type": "Blessing",
            "xp": 10
        },
        {
            "check": 8,
            "cost": 1,
            "desc": "Choose any Hero (including yourself). Until the end of the turn, all of that Hero's Hits do +1 Damage each. At Level 4: +2 Damage. At Level 9: +3 Damage.",
            "name": "Righteous Fury",
            "type": "Judgement",
            "xp": 25
        },
        {
            "check": 9,
            "cost": 1,
            "desc": "Choose any Hero. Until the end of turn, that Hero gains: Armor 5+ / Spirit Armor 5+ (limit 1 Shield per Hero). At level 5, Armor 4+ / Spirit Armor 4+",
            "name": "Shield of Light",
            "type": "Blessing",
            "xp": 20
        },
        {
            "check": 9,
            "cost": 2,
            "deadly": true,
            "desc": "Every Enemy within 2 spaces of you automatically takes 1 Hit. May only be used if you did not Move this turn. At Level 2: 2 Hits. At Level 4: Affects all Enemies on your Map Tile. At Level 6: Hits are +1 Damage. At Level 8: Hits are +2 Damage.",
            "name": "Shockwave",
            "type": "Judgement",
            "xp": 25
        },
        {
            "check": 9,
            "cost": 2,
            "deadly": true,
            "desc": "Choose one model within Range to immediately take D6 Wounds with no Defense. At Level 3: D8 Wounds. At Level 5: D8+1 Wounds. At Level 9: D8+2 Wounds",
            "name": "Smite",
            "range": "12",
            "type": "Judgement",
            "xp": 10
        },
        {
            "check": 7,
            "cost": 1,
            "desc": "Choose an Enemy within Range. That Enemy is -2 Defense until the end of the turn. Enemies that are Immune to Critical Hits are only reduced by -1 Defense. At Level 3: Choose 2 Enemies. At Level 6: -3 Defense. At Level 9: Choose 3 Enemies.",
            "name": "Weaken",
            "range": "6",
            "type": "Judgement",
            "xp": 20
        }
    ],
    SHAMAN_SPELLS: [
        {
            "desc": "Select hero on same or adjacent map tile. Target absorbs Wounds equal to 2 + caster's level after which it is destroyed. At start of each turn, spend 1 Magik or shield ends. Limit 1 cast at a time",
            "name": "Ancestral Shield",
            "power": 5,
            "xp": 5
        },
        {
            "desc": "Replaces caster's next Activation. Choose one: Darkness deck, any Threat deck, any Encounter deck, or Growing Dread stack. Look at top 2 cards. May choose 1 and make Spirit 6+ test to discard that card.  Put cards back in any order.",
            "name": "Astral Projection",
            "power": 13,
            "xp": 25
        },
        {
            "desc": "Cast to transform into Bear Form. +2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
            "name": "Bear Form",
            "power": 11,
            "xp": 30
        },
        {
            "desc": "Use at start of Activation, replaces caster's Move. For each casting 5+, move 2 spaces ignoring Escape tests. Any model moved through takes 1 Hit for D6 + Hero Level Damage.",
            "name": "Buffalo Charge",
            "power": 0,
            "xp": 10
        },
        {
            "desc": "Use only during a Fight. At start of each turn, roll D8. Every Enemy with Init less than the roll has Move reduced to half and on the D6 roll of 5+ is struck by lightning, taking a Hit that does D6+2 Damage. At start of each turn, Storm ends unless caster spends 2 Magik or 1 Dark Stone. Cancels any other Weather or Storm in play",
            "name": "Call Down the Storm",
            "power": 13,
            "xp": 20
        },
        {
            "desc": "For each casting roll of 5+ assigned to this Spell, add +1 Damage to one of your Combat Hits this turn",
            "name": "Charged Hatchet",
            "power": 0,
            "xp": 0
        },
        {
            "desc": "Use only during your Activation. Do Hero Level basic Hits (no modifiers) to one adjacent model.",
            "name": "Cougar Strike",
            "power": 6,
            "xp": 10
        },
        {
            "desc": "Use only during your Activation, replaces caster's Move. Move 2D6 spaces ignoring Escape tests, models, and obstacles.",
            "name": "Eagle Flight",
            "power": 10,
            "xp": 5
        },
        {
            "desc": "Choose any Hero on same or adjacent Map Tile (including you). For each casting roll of 4+, Heal 1 Sanity Damage (+5XP for other Heros healed). If at least 1 6+ is assigned, you may remove 1 Corruption Point from the target",
            "name": "Inner Fire",
            "power": 0,
            "xp": 10
        },
        {
            "desc": "Use only during Fight. Roll a D6 for every adjacent Enemy. On 5+, it takes 1 Wound ignoring Defense",
            "name": "Lightning Field",
            "power": 7,
            "xp": 0
        },
        {
            "desc": "Cast to transform into Mouse Form. +3 Init, +2 Agility, Defense 3+, -1 Combat, Auto pass all Escape tests, may move through other models, can only be hit on To-Hit of 6+, Use 1 Grit when transforming back in same space as Enemy to make Growth attack (moved and D6 Wounds ignoring Defense).  You may automatically transform back at start of your Activation on any future turn or if KO'd",
            "name": "Mouse Form",
            "power": 6,
            "xp": 20
        },
        {
            "desc": "Place runic circle within 8 spaces of you. Any Hero in space may re-roll 1 Defense roll per turn and Heals 2 Wounds at end of turn. At start of each turn, requires 2 Magik or 1 Dark Stone be spent to maintain. Limit 1 cast at a time",
            "name": "Runic Circle",
            "power": 11,
            "xp": 25
        },
        {
            "desc": "Cast this spell when a Growing Dread would be added to stack. If successful, cancel that card",
            "name": "Shadow Vision",
            "power": 15,
            "xp": 20
        },
        {
            "desc": "description",
            "name": "Spell Name",
            "power": 1,
            "type": "Battle"
        },
        {
            "desc": "Choose any Demon, Void, or Ghost enemy on same or adjacent map tile. -1 Defense until end of turn and if it tries to move, make a Strength 5+ test to prevent (6+ if Large+)",
            "name": "Spirit Binding",
            "power": 8,
            "xp": 10
        },
        {
            "desc": "Select Enemy within 3 spaces. For each casting roll of 5+ assigned to this spell, place Sanity marker on that Enemy (keyword Ancient or Magik require 6+). For each 1 or 2, you take 1 Sanity Damage ignoring Willpower. Enemies are -1 Defense for each Sanity marker (or 2 markers if Large+)",
            "name": "Spirit War",
            "power": 0,
            "xp": 5
        },
        {
            "desc": "Use only during Fight. You and every adjacent Hero are +1 Damage on all Attacks until end of Turn",
            "name": "Tribal Wrath",
            "power": 9,
            "xp": 5
        },
        {
            "desc": "Select a Hero on same or adjacent Map Tile (including yourself). Until end of turn, that Hero has +1 Initiative, +3 Move, and +1 to Escape tests",
            "name": "Warrior's Speed",
            "power": 5,
            "xp": 0
        },
        {
            "desc": "Cast to transform into Wolf Form. +2 Cunning, +2 Init, +2 Move, 1x Turn use 1 Grit to cause adjacent Enemies -1 Defense for turn, +1 Combat for each adjacent Hero or +1 Damage if none.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
            "name": "Wolf Form",
            "power": 9,
            "xp": 20
        }
    ],
    ELEMENTAL_MAGIK: [
        {
            "check": 6,
            "cost": 3,
            "deadly": false,
            "desc": "Use this Spell as a Ranged Attack. Place the Flame Template. Every model touched by the Template takes 1 Hit that does D8 Damage, ignoring Armor and Cover. Any Corpse Tokens touched are destroyed on the D6 roll of 3+ each.  Level 3: D8+1 Damage. Level 5: 2 Hits",
            "name": "Dragon Fire",
            "range": "*",
            "type": "Fire",
            "xp": 0
        },
        {
            "check": 9,
            "cost": 2,
            "deadly": false,
            "desc": "Use this Spell as a Ranged Attack. Choose a space within Range and Line of Sight and roll once To Hit. If missed, bounces D3 times like a bomb. Any model in the final space take D6 Wounds, ignoring Defense, while every model in adjacent spaces takes D3 Wounds, ignoring Defense. Any Corpse Tokens in either space are destroyed.",
            "name": "Fire Ball",
            "range": "8",
            "type": "Fire",
            "xp": 0
        },
        {
            "check": 11,
            "cost": 3,
            "deadly": true,
            "desc": "Use this Spell as a Ranged Attack. Choose a space within Range and Line of Sight to erupt in flames. Every model in an adjacent space takes a number of Hits equal to Hero Level. These Hits are +1 Damage. Heroes hit take 2 Wounds per Hit while Enemies take D6+1 Wounds per Hit. May only be cast successfully once per Adventure.",
            "name": "Burning Storm",
            "range": "8",
            "type": "Fire",
            "xp": 25
        },
        {
            "check": 11,
            "cost": 1,
            "deadly": true,
            "desc": "Choose a model within Range. The target takes a number of Wounds equal to target's Defense, ignoring Defense and Armor. If the target has Armor, it takes 3 extra Wounds. Do not gain XP for models wounded/killed by this spell.",
            "name": "Melt",
            "range": "5",
            "type": "Fire",
            "xp": 25
        },
        {
            "check": 8,
            "cost": 2,
            "deadly": true,
            "desc": "This Spell may either target all Heroes on your Map Tile (including yourself) OR a chosen Enemy Group on the board. Until the end of the next Activation, targets are +2 Combat, but -1 on To Hit rolls. If targeting Enemies, they are also -1 Defense.",
            "name": "Frenzy",
            "range": "*",
            "type": "Fire",
            "xp": 20
        },
        {
            "check": 10,
            "cost": 1,
            "deadly": false,
            "desc": "Choose an Enemy model within Range to mark with magical fire. When that model is killed, it explodes just as though a Bomb had gone off in its space. If the model is XL or bigger, every model adjacent is affected.  XP is only awarded the first time this is cast per Fight.",
            "name": "Detonate",
            "range": "10",
            "type": "Fire",
            "xp": 15
        },
        {
            "check": 9,
            "cost": 1,
            "deadly": false,
            "desc": "Choose one of your Equipped Hand Weapons to burst into flames! Until the end of the turn, that Item gains: Your Combat Hits are +1 Damage (+2 against Undead) and are Keyword Fire.",
            "name": "Ignite",
            "range": "*",
            "type": "Fire",
            "xp": 5
        },
        {
            "check": 10,
            "cost": 2,
            "deadly": true,
            "desc": "Choose a model within Range and Line of Sight to take Peril Die Damage, ignoring Defense. This may target a Corpse Token using a Casting Value of 7+ instead to destroy it.",
            "name": "Disintegrate",
            "range": "5",
            "type": "Fire",
            "xp": 0
        },
        {
            "check": 10,
            "cost": 2,
            "deadly": true,
            "desc": "Choose any Hero (including yourself) to immediately Heal D3+2 Wounds OR choose an Injury or Mutation and remove it on D6 of 5 or 6. Only 1 Mutation or Injury may be successfully removed like this (from the Party as a whole) during an Adventure.  XP only awarded first time cast per Adventure",
            "name": "Regrowth",
            "range": "*",
            "type": "Earth",
            "xp": 15
        },
        {
            "check": 9,
            "cost": 3,
            "deadly": false,
            "name": "Tangling Vines",
            "desc": "Select a model within 8 spaces to be seized by tangling vines! That model may not move during its next Activation and immediately takes 2 Hits. At the start of each of its further Activations, it must roll a D6. On the roll of 5+, it breaks free, otherwise it takes 2 Hits and may not move. Large models break free on 4+, XL on 3+, and larger break free automatically. Limit 1 in play at a time. XP awarded first time cast per Adventure.",
            "range": "8",
            "type": "Earth",
            "xp": 25
        },
        {
            "check": 10,
            "cost": 2,
            "deadly": false,
            "name": "Earthquake",
            "desc": "Choose the same or an adjacent Map Tile to you. Every model on that tile takes 2 Hits as the ground shakes violently. Level 3 - These Hits are Damage +1. Level 5 - 3 Hits. XP awarded first time cast per Adventure.",
            "range": "*",
            "type": "Earth",
            "xp": 20
        },
        {
            "check": 7,
            "cost": 2,
            "deadly": false,
            "name": "Stone Shield",
            "desc": "Choose any Hero (including yourself) to be protected by a shield of stone erupting from the ground. Hero has Cover 5+ against all Attacks until end of Turn. This spell effect is canceled if that Hero moves. Limit 1 shield at a time. Level 3 - Cover 4+. Level 5 - All Enemies adjacent to target take 1 Hit. XP awarded first time cast per Adventure.",
            "range": "*",
            "type": "Earth",
            "xp": 20
        },
        {
            "check": 11,
            "cost": 1,
            "deadly": true,
            "name": "Resist",
            "desc": "Every Hero on your Map tile may remove one status marker from themselves. For each marker removed, gain 5 XP. Level 3 - Casting Value is 10+. Level 6, Casting value is 9+.",
            "range": "*",
            "type": "Earth",
            "xp": 0
        },
        {
            "check": 8,
            "cost": 2,
            "deadly": true,
            "name": "Wooden Blade",
            "desc": "When cast, creates the following Item for you to use until the next turn: Wooden Blade (Hand Weapon, Blade, Magik). +1 Combat. 1-Handed. Melee To Hit is 4+.  At the start of each following turn, you may spend 2 Mana to keep this Spell going.",
            "range": "self",
            "type": "Earth",
            "xp": 0
        },
        {
            "check": 8,
            "cost": 1,
            "deadly": true,
            "name": "Lotus Blossom",
            "desc": "Choose any Hero (including yourself) to immediate Heal D3 Wounds or D3 Sanity Damage.",
            "range": "*",
            "type": "Earth",
            "xp": 0
        },
        {
            "check": 9,
            "cost": 2,
            "deadly": false,
            "name": "Fists of Stone",
            "desc": "Cast at any time, except during an Attack, to choose a Hero within 5 spaces (including yourself). Until the end of the turn, that Hero gains +1 Combat for each open Hand they have. However, any time that Hero rolls a 1 To Hit this turn, they also take a Corruption Hit from a transforming magik. XP awarded first time cast per Adventure.",
            "range": "5",
            "type": "Earth",
            "xp": 10
        },
        {
            "check": 7,
            "cost": 2,
            "deadly": true,
            "name": "Roaring Wind",
            "desc": "Weather. Choose a Map Tile within 8 spaces. Every model on that tile immediately takes a Bleeding marker on D6 of 4+ each. XP awarded first time per Adventure.",
            "range": "8",
            "type": "Wind",
            "xp": 10
        },
        {
            "check": 10,
            "cost": 1,
            "deadly": true,
            "name": "Divine Focus",
            "desc": "Until the end of the turn, you are +1 on all your To Hit rolls.",
            "range": "*",
            "type": "Wind",
            "xp": 0
        },
        {
            "check": 10,
            "cost": 2,
            "deadly": false,
            "name": "Lightning Strike",
            "desc": "Weather. As a Ranged Attack, choose a model within Range and Line of Sight to be the target. That model takes 3 Hits that do D8 Damage each. Every model adjacent also takes 1 Hit that does D8 Damage. These Hits ignore any Armor the model may have. Level 5 - D8+3 Damage each.",
            "range": "10",
            "type": "Wind",
            "xp": 0
        },
        {
            "check": 10,
            "cost": 3,
            "deadly": true,
            "name": "Thunder",
            "desc": "Cancels a Darkness card just played. Level 3 - Darkness or Growing Dread (in stack). Level 5 - Mana cost 2.",
            "range": "*",
            "type": "Wind",
            "xp": 20
        },
        {
            "check": 11,
            "cost": 3,
            "deadly": true,
            "name": "Typhoon",
            "desc": "Weather. Until the end of the turn, all non-Myth enemies on your Map Tile are -2 Move and -1 on all To Hit rolls. At start of each following turn, spend 2 Mana to keep this spell going. XP awarded first time per Adventure.",
            "range": "*",
            "type": "Wind",
            "xp": 30
        },
        {
            "check": 7,
            "cost": 3,
            "deadly": true,
            "name": "Shifting Form",
            "desc": "Until the end of the turn, every Hit you take does 1 less Wound. Level 3 - 1 less Sanity as well. Level 5 - Mana cost 2. Level 7 - spend double Mana cost when casting to grant +1 on all Defense rolls until end of the turn.",
            "range": "*",
            "type": "Wind",
            "xp": 5
        },
        {
            "check": 9,
            "cost": 2,
            "deadly": false,
            "name": "Winds of Wisdom",
            "desc": "Choose any Hero (including yourself) to gain 2 extra dice on a Skill test just rolled.",
            "range": "*",
            "type": "Wind",
            "xp": 10
        },
        {
            "check": 9,
            "cost": 2,
            "deadly": false,
            "name": "Heavenly Flight",
            "desc": "Cast this spell to take flight until the end of the turn. While flying, you are +1 Move and may move through other models. In addition Enemies that cannot move through models are -1 on their To Hit rolls against you and you automatically pass Escape tests against them. At start of each following turn, you may spend 2 Mana to keep this spell going.",
            "range": "*",
            "type": "Wind",
            "xp": 0
        },
        {
            "check": 11,
            "cost": 2,
            "deadly": true,
            "name": "Water Spirits",
            "desc": "Choose a Medium or smaller Enemy (with starting Health 12 or less). Water spirits materialize to drag them screaming back into the deep!  That Enemy is removed and no XP is gained for killing them. Double any Corruption Hits taken from casting this spell.",
            "range": "6",
            "type": "Water",
            "xp": 25
        },
        {
            "check": 10,
            "cost": 1,
            "deadly": false,
            "name": "Reflection",
            "desc": "Cast this Spell to choose one Hit you just took. That Hit is canceled, and if it was caused by an Enemy, roll a D6. On 5+, that Enemy takes 1 Hit using the Damage of the original Hit, ignoring Defense. Level 2 - Casting value 9+. Level 3 - Enemy Hit on 4+. Level 5 - Casting value 8+. Level 6 - Enemy automatically Hit. Level 8 - Casting value 7+.",
            "range": "*",
            "type": "Water",
            "xp": 10
        },
        {
            "check": 8,
            "cost": 2,
            "deadly": false,
            "name": "Water Shield",
            "desc": "Choose any Hero (including yourself) to be protected by a shield of swirling water! Hero has Cover 4+ against all Attacks until end of turn. Effect is canceled if target moves. Limit 1 Shield at a time. Level 3 - removes Burning markers from target. Level 5 - target automatically passes Escape tests. XP awarded first time cast per Adventure.",
            "range": "*",
            "type": "Water",
            "xp": 15
        },
        {
            "check": 8,
            "cost": 2,
            "deadly": false,
            "name": "Water Burst",
            "desc": "Use when you take 1 or more Hits (before Defense rolls). You gain Cover 2+ against each of those Hits as you burst into a shower of water!Immediately move your Hero to any other empty space on the Map Tile, as you re-form yourself. Until end of the turn, you are -1 an all your To Hit rolls.",
            "range": "*",
            "type": "Water",
            "xp": 10
        },
        {
            "check": 10,
            "cost": 3,
            "deadly": true,
            "name": "Tsunami",
            "desc": "Use this Spell as a Ranged Attack. Choose a direction to send out a tidal wave! Creates an area of effect that is 3 spaces wide and Peril Die spaces out from the caster. Every model in the area takes 2 Hits, and unless Large or bigger, is moved 2 spaces away from caster (if possible). Level 5 - 3 Hits and moves 3 spaces.",
            "range": "*",
            "type": "Water",
            "xp": 15
        },
        {
            "check": 7,
            "cost": 2,
            "deadly": false,
            "name": "Flowing River",
            "desc": "Use this Spell in place of your normal Move. You may immediately move up to D6+3 spaces in one general direction. Choose a direction to flow in and each space moved must be forward into one of the three spaces in that direction. This move ignores Escape tests.",
            "range": "self",
            "type": "Water",
            "xp": 0
        },
        {
            "check": 6,
            "cost": 1,
            "deadly": false,
            "name": "Cleanse",
            "desc": "Every Hero on your Map Tile may roll a D6 for each status effect they have. On 5+, remove that marker. Once per Adventure, may be cast with 10+ instead, to roll for each Corruption Point in place of Status Effect markers.  XP awarded for each marker or Corruption removed.",
            "range": "*",
            "type": "Water",
            "xp": 5
        },
        {
            "check": 11,
            "cost": 2,
            "deadly": false,
            "name": "Drown",
            "desc": "Choose a model within Range and Line of Sight to begin choking as water wells up inside them!. That model loses its next Activation (unless Larger or bigger) and takes D6 Damage, ignoring Defense, Armor, and Cover. My only be successfully cast once per Fight.",
            "range": "4",
            "type": "Water",
            "xp": 0
        }
    ],
    NINJA_CLANS: [
        {
            "name": "Sobara Masters",
            "description": "+1 Lore. Once per Adventure, add +1 Damage to all of your Hits until the end of this turn (+2 if using 2-Handed Weapon)",
            "modifiers": [{ "affects": "Lore", "value": 1 }]
        },
        {
            "name": "The Hidden Dragon",
            "description": "+1 Luck. Once per Adventure, Recover Grit up to your Max Grit.",
            "modifiers": [{ "affects": "Luck", "value": 1 }]
        },
        {
            "name": "Lotus Clan",
            "description": "+1 Spirit. Once per Adventure, Heal 2 Wounds/Sanity (any mix) from each Hero on your Map Tile (including yourself).",
            "modifiers": [{ "affects": "Spirit", "value": 1 }]
        },
        {
            "name": "Okasa Brotherhood",
            "description": "+1 Strength. Once per Adventure, Free Attack: Every Enemy on your Map Tile immediately takes 1 Hit that does D6 Damage.",
            "modifiers": [{ "affects": "Strength", "value": 1 }]
        }
    ],
    SAMURAI_WARRIOR_BATTLE_TACTICS: [
        {
            "cost": 3,
            "desc": "Use at end of your Move. Immediately roll an extra 1 Combat Attack against each Enemy adjacent to you. These Attacks may gain bonuses of any Hand Weapons you have equipped, but may not be increased beyond Combat 1. You may not gain Fury Tokens from these extra Attacks.",
            "name": "Warlord Smash",
            "type": "Strike"
        },
        {
            "cost": 5,
            "desc": "Choose an adjacent Enemy and roll a single die for Melee or Ranged To Hit (your choice). If successful, that Enemy immediately takes D6 Wounds, ignoring Defense and Armor. If not killed, that Enemy gains +2 Combat/Shots during its next Activation. Level 3 - Peril Die Damage. Level 6 - 2 Peril Die Damage.",
            "name": "Execution",
            "type": "Strike"
        },
        {
            "cost": 3,
            "desc": "Select an Ally within 8 spaces that just completed its Activation. That Ally may immediately Activate again. (Works on Allies, not Heroes)",
            "name": "Order to Charge",
            "type": "Command"
        },
        {
            "cost": 2,
            "desc": "Every Ally model on your Map Tile that has Combat 1 or higher and did not move this turn gains +2 Combat until the end of the turn. (Works on Allies, not Heroes).",
            "name": "Order to Stand Firm",
            "type": "Command"
        },
        {
            "cost": 2,
            "desc": "Every Ally model on your Map Tile immediately Heals 2 Wounds and 2 Sanity. (Works on Allies, not Heroes)",
            "name": "Commanding Presence",
            "type": "Command"
        },
        {
            "cost": 5,
            "desc": "Use once per Adventure at the start of a turn. Place up to D3 new Armored Ashigaru Allies in empty spaces adjacent to you (limit 3 on board at once). These models may Activate normally this turn.",
            "name": "Reinforcements",
            "type": "Command"
        },
        {
            "cost": 1,
            "desc": "Immediate Heal 1 Wound or 1 Sanity from every Hero and Ally on your Map Tile. Gain XP for this as normal.",
            "name": "Rally to Me!",
            "type": "Healing"
        },
        {
            "cost": 4,
            "desc": "Add +2 Damage to one of your Hits for each other Hero and Ally model adjacent to the target. Level 3 - Hit ignores Defense if at least +4 Damage. Level 5 - Adds +3 Damage for each.",
            "name": "Overwhelm",
            "type": "Formation"
        },
        {
            "cost": 4,
            "desc": "Gain +2 Combat for one Attack. You may not gain Fury Tokens from these extra Combat dice.",
            "name": "Furious Slash",
            "type": "Strike"
        },
        {
            "cost": 3,
            "desc": "Immediately move up to 2 spaces, ignoring Escape tests; then do a single free Combat Hit to an adjacent Enemy that was not adjacent before this move. You may not gain Fury Tokens from this free hit.",
            "name": "Lunging Thrust",
            "type": "Strike"
        },
        {
            "cost": 2,
            "desc": "Use when you kill an adjacent Enemy to immediately move into that model's space, ignoring Escape tests, and gain +1 Combat for your current Attack. You may continue to assign remaining Hits from this new position. This may be used multiple times per turn.",
            "name": "Stalwart Advance",
            "type": "Strike"
        },
        {
            "cost": 4,
            "desc": "Choose a direction. Each model in the 3 spaces adjacent to you in that direction takes 1 Combat Hit that is +1 Damage. These Combat Hits do not generate Fury. Level 3 - 2 Combat Hits each. Level 5 - +2 Damage.  Level 7 - 3 Combat Hits each.",
            "name": "Sweeping Slice",
            "type": "Strike"
        },
        {
            "cost": 5,
            "desc": "You may immediately Heal 1 Wound/Sanity (any mix) for each Enemy adjacent to you (2 each for Enemies Large or bigger). Level 3 - If you Heal 4 or more, gain +1 Combat during next Activation. Level 7 - Heal 2 for each Enemy (3 for Large or bigger).",
            "name": "Stand Your Ground",
            "type": "Healing"
        },
        {
            "cost": 3,
            "desc": "Use only while you are more spaces from the Entry Door of the Map Tile than every other Hero on the same Tile. Add extra Damage to one of your Combat Hits equal to the number of other Heroes on the tile (max +5).",
            "name": "Spearhead",
            "type": "Formation"
        },
        {
            "cost": 4,
            "desc": "You and each adjacent Hero gain +1 to your Defense rolls until the end of the turn. Defense rolls that roll a natural 1 do not gain the +1.",
            "name": "Shoulder to Shoulder",
            "type": "Formation"
        },
        {
            "cost": 2,
            "desc": "Use when you kill an Enemy to collect their head (keep track how many you collect). At the end of the Adventure, gain +10 XP and $25 for each head collected.",
            "name": "Collection Heads",
            "type": "Honor"
        },
        {
            "cost": 2,
            "desc": "Limit once per Fight. Use at start of the turn to select the Enemy with the highest remaining Health to Challenge (choose if tied). Until end of the Fight, that Enemy will always prioritize you as its target and both you and that Enemy are +2 Damage on all Attacks against each other. If you kill that Enemy, gain extra 20 XP (or 40 XP if Larger or bigger) and recover 1 Grit.",
            "name": "Challenge",
            "type": "Honor"
        },
        {
            "cost": 1,
            "desc": "May be used multiple times per turn, but only once during each Enemy group's Activation. Use when one or more adjacent Enemies roll a 1 on their To Hit rolls against you. For each 1 rolled you may cancel one other successful Hit. If there are no Hits left to cancel, for each remaining 1, do the Damage from that Enemy's Hit +2 to an Enemy adjacent to you (including itself).",
            "name": "Parry",
            "type": "Defense"
        }
    ],
    TREDERRAN_FACTIONS: [
        {
            "name": "The Union",
            "desc": "Any time you use a Side Bag Token, roll a D6. On the roll of 5 or 6, do not discard it."
        },
        {
            "name": "The Royal Foundry",
            "desc": "You are -3 Corruption Resistance but gain +2 Health for each Mutation you have. Once per Adventure, gain +2 Shots on a Ranged Attack with a Gun.",
            "modifiers": [{ "affects": "corruption", "value": -3 }]
        },
        {
            "name": "Kharkarus Konfederacy",
            "desc": "You start every Adventure with a free Revive token that only you may use. Going up in Hero Level costs you extra XP equal to new level x 100, in addition to the normal cost."
        },
        {
            "name": "Shintaro Core",
            "desc": "Armor 5+. -1 Initiative.  -1 on all Escape tests.",
            "modifiers": [{ "affects": "armor", "value": 5 }, { "affects": "init", "value": -1 }]
        },
        {
            "name": "Republic of Tar-Kon",
            "desc": "All your Attacks are +1 Damage. You gain no XP from Loot, Scavenge, or Healing other Heroes."
        },
        {
            "name": "Liberation Army",
            "desc": "1x Fight, you may take D3+1 Wounds ignoring Defense and Armor, to add D6 Damage to one of your Hits. Gain Keyword Fanatic. At end of every Succesful Adventure, gain 1 Health. At end of every Failed Adventure, lose 2 Health permanently."
        }
    ],
    INJURIES: [
        {
            "desc": "Not particularly debilitating, but it sure hurts! You are -1 Max Grit.",
            "group": "injuries",
            "modifiers": [
                {
                    "affects": "grit",
                    "value": -1
                }
            ],
            "name": "Broken Collar Bone"
        },
        {
            "desc": "Deep slashes run across your chest, making it hurt to turn or twist your body. You are -1 Initiative.",
            "group": "injuries",
            "modifiers": [
                {
                    "affects": "init",
                    "value": -1
                }
            ],
            "name": "Chest Wound"
        },
        {
            "desc": "Your ears are ringing a little and you have a headache that won't quit! Until the start of the next Adventure, you are -1 Initiative and roll one less dice on all Skill Test.",
            "group": "injuries",
            "name": "Concussion"
        },
        {
            "desc": "Your arm has been bent and crushed a bit. You are -1 Combat.",
            "group": "injuries",
            "modifiers": [
                {
                    "affects": "combat",
                    "value": -1
                }
            ],
            "name": "Crushed Arm"
        },
        {
            "desc": "Ouch! Your vision is blurred and cloudy as one of your eyes has been scratched.  You cannot get Critical Hits with your Ranged Attacks.",
            "group": "injuries",
            "name": "Gouged Eye"
        },
        {
            "desc": "Your condition is serious! Any further Injury Chart rolls are only made on a single D6. This Injury is -1 to roll to Heal during Surgery at the Doc's Office in Town.",
            "group": "injuries",
            "name": "Internal Bleeding"
        },
        {
            "desc": "One of your hands is twisted and broken. You have one less Hand for equipping Items each turn. 2-Handed Weapons may still be used but they cannot get Critical Hits.",
            "group": "injuries",
            "name": "Mangled Hand"
        },
        {
            "desc": "You're a bit of a mess, but it's all superficial. In a lot of ways, you look tougher! You are +1 Max Grit.",
            "group": "injuries",
            "modifiers": [
                {
                    "affects": "grit",
                    "value": 1
                }
            ],
            "name": "New Scars"
        },
        {
            "desc": "You are torn to pieces or crushed beyond recovery. Your Hero is Dead.",
            "group": "injuries",
            "name": "Ripped Apart"
        },
        {
            "desc": "A dep and painful cut runs across your leg. You are -1 Move (min 1).",
            "group": "injuries",
            "modifiers": [
                {
                    "affects": "move",
                    "value": -1
                }
            ],
            "name": "Slashed Leg"
        },
        {
            "desc": "You pick yourself up and shake yourself off. There is no long lasting effect.",
            "group": "injuries",
            "name": "Wind Knocked Out"
        }
    ],
    MADNESS: [
        {
            "desc": "Your fractured state of mind is in shambles, and you are ready to slip over the edge at any moment. Any further Madness Chart rolls are only made on a single D6. This Madness is -1 to the roll to Heal during an Exorcism at the Church in Town.",
            "group": "madness",
            "name": "Delusions"
        },
        {
            "desc": "You shake it off! You're fine...right? There is no long lasting effect.",
            "group": "madness",
            "name": "Get a Grip"
        },
        {
            "desc": "You can no longer trust what you see as shadows and tendrils of darkness writhe in every corner of your eye. Any time you would draw a Loot card, roll a D6. On 1, you instead take 1 Sanity Damage, ignoring Willpower as you recoil from the hideous visions!",
            "group": " madness",
            "name": "Hallucinations"
        },
        {
            "desc": "They're telling you to kill...again! Any time you end your Move adjacent to another Hero, roll a D6. On 1 or 2, that Hero takes 3 Hits as you lash out at them!",
            "group": "madness",
            "name": "Hearing Voices"
        },
        {
            "desc": "You've come back from the brink of madness...and are stronger for it! You are +1 Max Grit.",
            "group": "madness",
            "modifiers": [
                {
                    "affects": "grit",
                    "value": 1
                }
            ],
            "name": "I've Seen Things"
        },
        {
            "desc": "How does it know your name? You can hear it calling you in the dark! Whenever the Hold Back the Darkness roll is failed (including doubles that would fail), you take D3 Sanity Damage, ignoring Willpower saves",
            "group": "madness",
            "name": "It's Coming for You"
        },
        {
            "desc": "You have descended into the dark depths of purest Madness! Your Hero is, for all intents and purposes, considered to be Dead.",
            "group": "madness",
            "name": "Lost to the Darkness"
        },
        {
            "desc": "You feel the ebb and flow of the Void energy all around you. You no longer get a Willpower save to prevent Corruption Hits.",
            "group": "madness",
            "name": "Open to the Void"
        },
        {
            "desc": "They're out to get you...all of them! Anytime you want to Scavenge or Explore a Doorway, you must first roll a D6. On 1, 2, or 3, you cannot as you are distracted keeping an eye on the other Heroes with you.",
            "group": "madness",
            "name": "Paranoia"
        },
        {
            "desc": "It's...sooo...coooolldd! When Scavenging, ignore the first 6 you roll on the Scavenge test.",
            "group": "madness",
            "name": "The Chills"
        },
        {
            "desc": "Your skin burns and itches as you scratch at it feverishly. At the start of each turn, you take 1 Hit, as you claw at your skin.",
            "group": "madness",
            "name": "The Itching"
        }
    ],
    MUTATIONS: [
        {
            "desc": "A hole has opened up in your chest leading to another dimension! And occasionally... stuff comes through! Anytime an 11 or 12 is rolled to Hold Back the Darkness, you must roll a D6. On 1, 2, or 3, There is an Ambush Attack as a Low Threat card erupts from the portal. On 4 or 5, nothing happens. On 6, Draw an Artifact card from the Mines.",
            "name": "Chest Portal"
        },
        {
            "desc": "Gross! No game effect",
            "name": "Tentacle Tongue"
        },
        {
            "desc": "Your skin has fused with chunks of rock, makng you lumbering and slow. You are -2 Move each turn (min 1), however you gain Armor 4+",
            "modifiers": [
                {
                    "affects": "move",
                    "value": -2
                }
            ],
            "name": "Fused with Rock"
        },
        {
            "desc": "Your skin and muscle have grown out and extended around one of your items, making it part of you. Choose one Item you are carrying that is 1-Handed or 2-Handed. From now on, that Item must be assigned every turn.",
            "name": "Fused with Item"
        },
        {
            "desc": "Your arm has grown deformed and giant. You can no longer use Clothing - Coat Items.",
            "name": "Arm Growth"
        },
        {
            "desc": "Your hand has grown deformed and giant. You can no longer use Clothing - Gloves Items.",
            "name": "Hand Growth"
        },
        {
            "desc": "Your leg has grown deformed and giant. You can no longer use Clothing - Boots Items.",
            "name": "Leg Growth"
        },
        {
            "desc": "Any Dark Stone shards you currently carry become fused to you. These cannot be sold, used, or lost until removed at Doc's Office and will continue to roll for Corruption at the end of every Adventure.",
            "name": "Fused with Dark Stone"
        },
        {
            "desc": "You are -1 Move each turn (min 1)",
            "modifiers": [
                {
                    "affects": "move",
                    "value": -1
                }
            ],
            "name": "Tentacle Leg"
        },
        {
            "desc": "You have grown large, sharp fangs that protrude from your motuh. You gain a Bite Free Attack - Once per turn. 1 Combat, uses the D8 for Damage. If this Bite attack wounds a Void Enemy, you also take 1 Corruption Point.",
            "name": "Fangs"
        },
        {
            "desc": "You can no longer speak. All Item prices in Town cost you +$10.",
            "name": "Mouth Grown Over"
        },
        {
            "desc": "You sprout horns from the top of your head. You can no longer use Clothing - Hat Items.",
            "name": "Horns"
        },
        {
            "desc": "They say two heads are better than one... I'm not so sure. You may now use 2 Clothing - Hat Items and you are +1 Initiative. However, any time you roll a 6 for movement, you lose your Activation, as your two heads are arguing over where to go next.",
            "modifiers": [
                {
                    "affects": "init",
                    "value": "1"
                }
            ],
            "name": "Second Head"
        },
        {
            "desc": "You have grown a third eye that can see into the Void. Once per turn, you may spend 2 Grit to force a Threat card just drawn to be discarded and Re-drawn",
            "name": "Third Eye"
        },
        {
            "desc": "One of your eyes has grown over with gnarled flesh. All of your Critical Hits do 1 less Damage than normal.",
            "name": "Eye Grown Over"
        },
        {
            "desc": "Shopkeepers are intimidated by your writhing facial hair. All Item prices in Town cost you $10 less than normal (min $10)",
            "name": "Tentacle Mustache"
        },
        {
            "desc": "You can now understand what Void creatures are saying as they hiss and growl. At the start of each of your Activations, if there are any Void Enemies on your Map Tile, you are +1 Initiative, but also take 1 Sanity Damage, ignoring Willpower.",
            "name": "Void Speech"
        },
        {
            "desc": "All of your Critical Hits are +1 Damage. You can now hold 1 fewer Corruption Points before gaining a Mutation.",
            "name": "Eye Stalks"
        },
        {
            "desc": "At the start of each of your Activations, take 1 Hit for every Dark Stone shard and Item with a Dark Stone Icon you are carrying.",
            "name": "Dark Stone Allergy"
        },
        {
            "desc": "You have grown the upper torso of a small humanoid like creature out of your abdomen. You are +1 Lore and while in an Other World +1 Initiative. You can now hold 1 fewer Corruption Points before gaining a Mutation.",
            "modifiers": [
                {
                    "affects": "Lore",
                    "value": 1
                },
                {
                    "affects": "corruption",
                    "value": -1
                }
            ],
            "name": "Child of the Void"
        },
        {
            "desc": "Your fingers have fused together making it impossible to do any fine manipulations. You may not use Gun Items (unless it is an Artifact).",
            "name": "Fused Fingers"
        },
        {
            "desc": "You are in bad shape. All of your Town Location Event Chart rolls are -1 to the roll (min 2).",
            "name": "Nose Fallen Off"
        },
        {
            "desc": "You lose the use of one Hand each turn, but you are +1 Combat. 2-Handed Guns may still be used, but cannot get Critical Hits.",
            "modifiers": [
                {
                    "affects": "combat",
                    "value": "1"
                }
            ],
            "name": "Tentacle Arm"
        },
        {
            "desc": "+1 Move. You can now hold 1 fewer Corruption Points before gaining a Mutation.",
            "modifiers": [
                {
                    "affects": "move",
                    "value": 1
                },
                {
                    "affects": "corruption",
                    "value": -1
                }
            ],
            "name": "Tentacle Tail"
        },
        {
            "desc": "Your tail nips and bites at you and any others that stray too close. Any time you or another model adjacent to you rolls a 1 on a To Hit roll, that model takes 1 Wound, ignoring Defense. No XP is gained.",
            "name": "Tail with a Mouth"
        },
        {
            "desc": "+1 Combat. You can now hold 1 fewer Corruption Point before you get a Mutation.",
            "modifiers": [
                {
                    "affects": "combat",
                    "value": 1
                },
                {
                    "affects": "corruption",
                    "value": -1
                }
            ],
            "name": "Barbed Tail"
        },
        {
            "desc": "Any Hero adjacent to you at the end of a turn automatically takes D3 Wounds, ignoring Defense.",
            "name": "Void Plague"
        },
        {
            "desc": "Your tail talks to you in hushed demonic whispers, curling around to speak into your ear. Any time you take one or more Sanity Damage from a source, you take 1 extra Sanity Damage.",
            "name": "Tail with a Face"
        },
        {
            "desc": "You now have 1 extra Hands to use per turn. You can now hold 1 fewer Corruption Points before you get a Mutation.",
            "modifiers": [
                {
                    "affects": "corruption",
                    "value": -1
                }
            ],
            "name": "Prehensile Tail"
        },
        {
            "desc": "Gross! No game effect.",
            "name": "Tentacle Fingers"
        },
        {
            "desc": "You are -2 Health, but +1 Max Grit.",
            "modifiers": [
                {
                    "affects": "health",
                    "value": -2
                },
                {
                    "affects": "grit",
                    "value": 1
                }
            ],
            "name": "Void Boils"
        },
        {
            "desc": "Your skin has become gooey and comes off easily now. Any time you take one or more Wounds from a source, you take 1 extra Wound.",
            "name": "Melting Skin"
        },
        {
            "desc": "Your skin begins to give off an eerie green glow that lights up the corridors around you. You are now Immune to Voices in the Dark but Enemies also Hit you on To Hit rolls of 1.",
            "name": "Glowing Skin"
        },
        {
            "desc": "Any time you pass through a Gate, you take 1 Corruption Point, ignoring Willpower.",
            "name": "Void Infection"
        },
        {
            "desc": "Your skin is now oily and greasy, allowing you to slide past Enemies and slip through tight spaces. You may now roll an extra die for Escape tests and choose which roll to use.",
            "name": "Slippery Skin"
        },
        {
            "desc": "Your skin becomes hard and crusty, like it's made of rock. You are +3 Health, but -1 Move each turn (min 1).",
            "modifiers": [
                {
                    "affects": "health",
                    "value": 3
                },
                {
                    "affects": "move",
                    "value": -1
                }
            ],
            "name": "Rock Skin"
        }
    ]
};


/***/ }),

/***/ "./src/app/faction/chooser/chooser.component.less":
/*!********************************************************!*\
  !*** ./src/app/faction/chooser/chooser.component.less ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvZmFjdGlvbi9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2ZhY3Rpb24vY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9mYWN0aW9uL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/faction/chooser/chooser.component.ts":
/*!******************************************************!*\
  !*** ./src/app/faction/chooser/chooser.component.ts ***!
  \******************************************************/
/*! exports provided: FactionChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactionChooserComponent", function() { return FactionChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let FactionChooserComponent = class FactionChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.selection = null;
        this.groupToggles = {
            paths: false,
            rolled: false,
            rest: false
        };
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        // this.factions = null;
        // this.options = null;
        this.selection = null;
        // this.closable = false;
        // this.visible = false;
        // this.onClose = null;
    }
    //
    // close() {
    //     this.visible = false;
    //     this.onClose({apply:false,value:null});
    // }
    //
    // apply() {
    //     this.visible = false;
    //
    //     //move ".value" to ".desc" for chosen factions
    //     let value : Option = JSON.parse(JSON.stringify(this.selection));
    //     value.desc = this.selection.value;
    //     delete value.value;
    //
    //     this.onClose({ apply:true, value:value });
    // }
    choose(faction) {
        if (this.isChosen(faction))
            this.selection = null;
        else {
            if (faction.desc)
                this.selection = faction;
            else {
                let value = JSON.parse(JSON.stringify(faction));
                value.desc = faction.value;
                delete value.value;
                this.selection = value;
            }
        }
    }
    isChosen(faction) {
        return this.selection && this.selection.name === faction.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
FactionChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
FactionChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'faction-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/faction/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/faction/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], FactionChooserComponent);



/***/ }),

/***/ "./src/app/faction/faction.component.less":
/*!************************************************!*\
  !*** ./src/app/faction/faction.component.less ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 0.5em 0.5em;\n}\n.c-option--available {\n  padding: 1em 0.5em;\n  border-bottom: 1px solid #ddd;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvZmFjdGlvbi9mYWN0aW9uLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9mYWN0aW9uL2ZhY3Rpb24uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FDQ0o7QURFQTtFQUNJLGtCQUFBO0VBQ0EsNkJBQUE7QUNBSjtBRElBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUNGSiIsImZpbGUiOiJzcmMvYXBwL2ZhY3Rpb24vZmFjdGlvbi5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBwYWRkaW5nOiAwLjVlbSAwLjVlbTtcbn1cblxuLmMtb3B0aW9uLS1hdmFpbGFibGUge1xuICAgIHBhZGRpbmc6IDFlbSAwLjVlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbn1cblxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAwLjVlbSAwLjVlbTtcbn1cbi5jLW9wdGlvbi0tYXZhaWxhYmxlIHtcbiAgcGFkZGluZzogMWVtIDAuNWVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbn1cbi5jYXJkIC5kZXNjIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/faction/faction.component.ts":
/*!**********************************************!*\
  !*** ./src/app/faction/faction.component.ts ***!
  \**********************************************/
/*! exports provided: FactionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactionComponent", function() { return FactionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/faction/chooser/chooser.component.ts");





let FactionComponent = class FactionComponent {
    constructor(afs, dialog) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.label = "Faction";
        this.confirming = {};
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        if ('Assassin' === this.character.class) {
            this.label = "Clan";
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.character = null;
        this.afs = null;
    }
    add(faction) {
        //prevent FS error when setting undefined values
        if (typeof (faction.desc) === 'undefined')
            delete faction.desc;
        if (typeof (faction.description) === 'undefined')
            delete faction.description;
        this.character.faction = faction;
        this.onSave.emit({});
    }
    remove(index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.faction = null;
            this.onSave.emit({});
        }
    }
    getChooserOptions() {
        let method = null, className = this.character.class;
        if ('Assassin' === className)
            method = 'getNinjaClans';
        else if ('Trederran Veteran' === className)
            method = 'getTrederranFactions';
        if (!method)
            return Promise.resolve([]);
        return this.afs[method]();
    }
    openChooser() {
        this.getChooserOptions().then(options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["FactionChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
        // const ref = this.modalService.createComponentRef(FactionChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as Option);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        // this.getChooserOptions().then( options => {
        //     ref.instance.options = options;
        // })
    }
    confirmingDelete(index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    }
};
FactionComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], FactionComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], FactionComponent.prototype, "onSave", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], FactionComponent.prototype, "onError", void 0);
FactionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'factions',
        template: __webpack_require__(/*! raw-loader!./faction.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/faction/faction.component.html"),
        styles: [__webpack_require__(/*! ./faction.component.less */ "./src/app/faction/faction.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], FactionComponent);



/***/ }),

/***/ "./src/app/firestore.service.ts":
/*!**************************************!*\
  !*** ./src/app/firestore.service.ts ***!
  \**************************************/
/*! exports provided: FirestoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirestoreService", function() { return FirestoreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/es2015/index.js");
/* harmony import */ var _data_new__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data_new */ "./src/app/data_new.ts");




// import 'rxjs/add/operator/switchMap'

// import * as firebase from 'firebase/app';



const CLASSES_PATH = '/games/sob/classes';
const INJURIES_PATH = '/games/sob/injuries';
const MUTATIONS_PATH = '/games/sob/mutations';
const SERMONS_PATH = '/games/sob/sermons';
const SHAMAN_SPELLS_PATH = '/games/sob/shamanSpells';
const GAMBLER_TRICKS_PATH = '/games/sob/gamblingTricks';
const WANDERING_SAMURAI_TACTICS_PATH = '/games/sob/wanderingSamuraiTactics';
const SAMURAI_WARRIOR_BATTLE_TACTICS_PATH = '/games/sob/samuraiWarriorBattleTactics';
const ORPHAN_MISSIONS_PATH = '/games/sob/orphanMissions';
const ELEMENTAL_MAGIK_PATH = '/games/sob/elementalMagik';
const NINJA_CLANS_PATH = '/games/sob/ninjaClans';
const TREDERRAN_FACTIONS_PATH = '/games/sob/trederranFactions';
const MADNESS_PATH = '/games/sob/madness';
const CHAR_PATH = '/games/sob/chars';
const OLD_CHAR_PATH = '/games/sob/oldChars';
let FirestoreService = class FirestoreService {
    constructor(afAuth, afs, router) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.user = this.afAuth.authState;
        this.charSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.charObs = this.charSubject.asObservable();
    }
    isAuthenticated() {
        return this.user !== null;
    }
    getUser() {
        return this.user;
    }
    initDB() {
        this.initClasses();
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].MUTATIONS, MUTATIONS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].INJURIES, INJURIES_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].MADNESS, MADNESS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].SERMONS, SERMONS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].WANDERING_SAMURAI_TACTICS, WANDERING_SAMURAI_TACTICS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].SHAMAN_SPELLS, SHAMAN_SPELLS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].GAMBLER_TRICKS, GAMBLER_TRICKS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].ORPHAN_MISSIONS, ORPHAN_MISSIONS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].ELEMENTAL_MAGIK, ELEMENTAL_MAGIK_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].NINJA_CLANS, NINJA_CLANS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].SAMURAI_WARRIOR_BATTLE_TACTICS, SAMURAI_WARRIOR_BATTLE_TACTICS_PATH);
        this.populateItems(_data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].TREDERRAN_FACTIONS, TREDERRAN_FACTIONS_PATH);
    }
    initClasses() {
        let classes = _data_new__WEBPACK_IMPORTED_MODULE_7__["Data"].CLASSES;
        for (let i = 0; i < classes.length; ++i) {
            let cls = classes[i];
            let docRef = this.afs.collection(CLASSES_PATH).doc(cls.classId);
            docRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise().then(doc => {
                return doc.payload.exists ? docRef.update(cls) : docRef.set(cls);
            })
                .catch(err => {
                console.log("Error initializing " + cls.name);
            });
        }
    }
    populateItems(items, path) {
        items.forEach(item => {
            let docRef = this.afs.collection(path).doc(item.name);
            docRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise().then(doc => {
                return doc.payload.exists ? docRef.update(item) : docRef.set(item);
            })
                .catch(err => {
                console.log("Error initializing " + path + " : " + item.name);
                console.log("   `-> " + err.message);
            });
        });
    }
    //SOBCharacter methods
    getCurrentCharacter() {
        return this.character;
    }
    getCharacterModifiers(character) {
        let result = [];
        let char = character || this.getCurrentCharacter();
        if (char) {
            this.getModifiersFrom(result, char.items || [], true);
            this.getModifiersFrom(result, char.abilities || [], false);
            //covers madness/injuries too
            this.getModifiersFrom(result, char.mutations || [], false);
            this.getModifiersFrom(result, [{ modifiers: char.temporaryMods || [] }], false);
            if (char.faction) {
                this.getModifiersFrom(result, [char.faction], false);
            }
        }
        return result;
    }
    getModifiersFrom(results, sources, mustBeEquipped = true) {
        sources.forEach(src => {
            //only bother if the src is marked as equipped
            // and has modifiers associated with it
            if (src.modifiers && (!mustBeEquipped || src.equipped)) {
                src.modifiers.forEach(modifier => {
                    let modVal = isNaN(modifier.value) ? 0 : modifier.value * 1;
                    let affected = modifier.affects;
                    if ('move' === affected)
                        affected = 'movement';
                    if (typeof (results[affected]) === 'undefined' || results[affected] === null) {
                        results[affected] = { value: 0, sources: [] };
                    }
                    if ('armor' === affected || 'spiritArmor' === affected ||
                        'cover' === affected || 'endurance' === affected) {
                        //these doesn't stack, so only use highest modifier value
                        results[affected].value = Math.max(results[affected].value, modVal * 1);
                    }
                    else {
                        results[affected].value += modVal;
                    }
                    results[affected].sources.push(src.name || src.label);
                });
            }
        });
    }
    // FireStore access methods
    getCharacter(callback) {
        let subscription = this.charSubject.subscribe((result) => {
            // console.log(result);
            callback(result);
        });
        if (this.character) {
            this.charSubject.next(this.character);
        }
        return subscription;
    }
    getUserDocument(uid) {
        return this.afs.doc('/games/sob/users/' + uid).valueChanges();
    }
    getUnmigratedChars(uid) {
        let doc = this.afs.doc('/games/sob/users/' + uid);
        return doc.collection('oldChars') //.valueChanges();
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(docs => {
            return docs.map(a => {
                return { json: a.payload.doc.data().json, name: a.payload.doc.id };
            });
        }));
        // return this.afs.collection<any>(OLD_CHAR_PATH,
        //     ref => ref.where('uid', '==', uid)).valueChanges();
    }
    getUserChars(uid) {
        // console.log("Fetching user doc for " + uid);
        // let doc = this.afs.doc<SOBUser>('/games/sob/users/' + uid);
        // console.log("Fetching chars for " + uid);
        // return doc.collection<SOBCharacter>('chars').valueChanges();
        return this.afs.collection(CHAR_PATH, ref => ref.where('uid', '==', uid)).valueChanges();
    }
    loadCharacter(charId) {
        // console.log("Fetching character from " + CHAR_PATH + '/' + charId);
        let observable = this.afs.doc(CHAR_PATH + '/' + charId).valueChanges();
        //cache character so it can be referenced by components directly
        observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise().then(char => {
            this.character = char;
            this.charSubject.next(char);
            return char;
        });
        return observable;
    }
    updateCharacter(charId, updates) {
        let docRef = this.afs.collection(CHAR_PATH).doc(charId);
        return docRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise().then(doc => {
            return doc.payload.exists ? docRef.update(updates) : docRef.set(updates);
        })
            .catch(err => {
            return Promise.reject(err);
        });
    }
    removeCharacter(charId) {
        let docRef = this.afs.collection(CHAR_PATH).doc(charId);
        return docRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise().then(doc => {
            return docRef.delete();
        })
            .catch(err => {
            return Promise.reject(err);
        });
    }
    createCharacter(json) {
        let id = this.afs.createId();
        json.id = id;
        return this.updateCharacter(id, json);
    }
    getClasses() {
        return this.afs.collection(CLASSES_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    getClass(classId) {
        let docRef = this.afs.collection(CLASSES_PATH).doc(classId);
        return docRef.valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<Sermon[]>} resolving list of sermons
     */
    getSermons() {
        return this.afs.collection(SERMONS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<OrphanMission[]>} resolving list of tactics
     */
    getOrphanMissions() {
        return this.afs.collection(ORPHAN_MISSIONS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<SamuraiTactic[]>} resolving list of tactics for Wandering Samurai
     */
    getWanderingSamuraiTactics() {
        return this.afs.collection(WANDERING_SAMURAI_TACTICS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<SamuraiTactic[]>} resolving list of tactics for Daimyo
     */
    getSamuraiBattleTactics() {
        return this.afs.collection(SAMURAI_WARRIOR_BATTLE_TACTICS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<GamblerTrick[]>} resolving list of tricks
     */
    getGamblerTricks() {
        return this.afs.collection(GAMBLER_TRICKS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<ShamanSpell[]>} resolving list of tactics
     */
    getShamanSpells() {
        return this.afs.collection(SHAMAN_SPELLS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<ShamanSpell[]>} resolving list of spells
     */
    getElementalMagik() {
        return this.afs.collection(ELEMENTAL_MAGIK_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<any[]>} resolving list of clans
     */
    getNinjaClans() {
        return this.afs.collection(NINJA_CLANS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<any[]>} resolving list of factions
     */
    getTrederranFactions() {
        return this.afs.collection(TREDERRAN_FACTIONS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<any[]>} resolving list of mutations
     */
    getMutations() {
        return this.afs.collection(MUTATIONS_PATH).
            valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise();
    }
    /**
     * @return {Promise<any[]>} resolving list of injuries
     */
    getInjuries() {
        return this.afs.collection(INJURIES_PATH)
            .valueChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .toPromise();
    }
    /**
     * @return {Promise<any[]>} resolving list of madness
     */
    getMadness() {
        return this.afs.collection(MADNESS_PATH)
            .valueChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .toPromise();
    }
    /**
     * @param {string} classId - identifier of class to retrieve ability options
     * @return {Promise<Ability[]>} resolving list of abilities for associated class
     */
    getAbilities(classId) {
        let docRef = this.afs.collection(CLASSES_PATH).doc(classId);
        return docRef.valueChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .toPromise().then(cls => {
            let c = cls;
            return c.upgrades;
        });
    }
    getAuth() {
        return this.user;
    }
    login(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((authState) => {
            this.user = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(authState.user);
            return authState;
        })
            .catch((error) => {
            console.log("Error authenticating");
            console.log(error);
            return Promise.reject(error);
        });
    }
    logout() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }
    resetPassword(email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }
    toArray(srcObj, destArr) {
        for (var prop in srcObj) {
            if (srcObj.hasOwnProperty(prop)) {
                let value = srcObj[prop];
                if (typeof (value) === 'object') {
                    value = this.copyObj(value, {});
                }
                destArr[destArr.length] = value;
            }
        }
        return destArr;
    }
    copyObj(src, dest) {
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                let value = src[prop];
                if ('modifiers' === prop) {
                    dest.modifiers = [];
                    this.toArray(value, dest.modifiers);
                }
                else {
                    if (typeof (value) === 'object') {
                        dest[prop] = {};
                        this.copyObj(value, dest[prop]);
                    }
                    else if (typeof (value) === 'string' ||
                        typeof (value) === 'number') {
                        dest[prop] = value;
                    }
                }
            }
        }
        return dest;
    }
    exportDB() {
        let result = {
            chars: {}, users: {}, orphanMissions: []
        };
        let SOB = this.afs.doc('/games/sob');
        SOB.collection('chars')
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(docs => {
            return docs.map(a => {
                return { uid: a.payload.doc.id, data: a.payload.doc.data() };
            });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise()
            .then(chars => {
            chars.forEach(char => {
                result.chars[char.uid] = char.data;
            });
            return SOB.collection('users')
                .snapshotChanges()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(docs => {
                return docs.map(a => {
                    return { uid: a.payload.doc.id, data: a.payload.doc.data() };
                });
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
                .toPromise();
        })
            .then(users => {
            users.forEach(user => { result.users[user.uid] = user.data; });
            return true;
        })
            .then(() => {
            console.log(JSON.stringify(result));
        });
    }
    exportClasses() {
        let result = {
            classes: [],
            gamblingTricks: [],
            orphanMissions: [],
            samuraiTactics: [],
            sermons: [],
            shamanSpells: [],
            //sorcererSpells: [],
            injuries: [],
            madness: []
        };
        let SOB = this.afs.doc('/games/sob');
        let promises = Object.keys(result).map(key => {
            return SOB.collection(key)
                .snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(docs => docs.map(a => a.payload.doc.data())), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise().then(values => {
                result[key] = values;
                return true;
            });
        });
        Promise.all(promises).then(() => {
            console.log(JSON.stringify(result));
        });
    }
};
FirestoreService.ctorParameters = () => [
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_6__["AngularFireAuth"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
FirestoreService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_6__["AngularFireAuth"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], FirestoreService);



/***/ }),

/***/ "./src/app/items/editor/editor.component.less":
/*!****************************************************!*\
  !*** ./src/app/items/editor/editor.component.less ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .mat-dialog-content {\n  padding: 0 1em;\n  margin: 0 -1em;\n}\n:host .mat-dialog-content .mat-tab-body-wrapper {\n  min-height: 250px;\n}\np {\n  margin: 0.5em 0;\n  font-style: italic;\n}\nlabel {\n  font-weight: 700;\n}\ninput.form-control,\nselect.form-control,\ntextarea.form-control {\n  width: 100%;\n  font-size: 1em;\n  padding: 0.5em 0.75em;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ninput.form-control.u-sm,\nselect.form-control.u-sm,\ntextarea.form-control.u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"] {\n  font-size: 1em;\n  padding: 0.5em 0.75em;\n  background-color: #ddd;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\nbutton[type=\"button\"].u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"].keypad__button {\n  width: 4em;\n  height: 3em;\n}\n.m-grid > .form-control {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n.tabbed {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n.tabbed .tabs {\n  flex-basis: 2.5em;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: stretch;\n          align-items: stretch;\n  border-bottom: 1px solid #ddd;\n}\n.tabbed .tabs .tab {\n  background: #f5f5f5;\n  border-width: 1px;\n  border-style: solid;\n  border-color: transparent;\n  border-radius: 4px 4px 0 0;\n  padding: 0.25em 1em;\n  margin: 0 0.125em;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.tabbed .tabs .tab.active {\n  background: #417ebc;\n  color: #fff;\n}\n.tabbed .panes .pane {\n  display: none;\n  width: 100%;\n  height: 100%;\n  padding: 1em 0.5em;\n}\n.tabbed .panes .pane.active {\n  display: block;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvaXRlbXMvZWRpdG9yL2VkaXRvci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvaXRlbXMvZWRpdG9yL2VkaXRvci5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUVRLGNBQUE7RUFDQSxjQUFBO0FDRFI7QURGQTtFQU1ZLGlCQUFBO0FDRFo7QURpREE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7QUMvQ0o7QURrREE7RUFBUSxnQkFBQTtBQy9DUjtBRGlEQTs7O0VBR0ksV0FBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUMvQ0o7QURpREk7OztFQUNJLGtCQUFBO0FDN0NSO0FEaURBO0VBQ0ksY0FBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDL0NKO0FEaURJO0VBQ0ksa0JBQUE7QUMvQ1I7QURrREk7RUFDSSxVQUFBO0VBQ0EsV0FBQTtBQ2hEUjtBRHFEQTtFQUEwQixtQkFBQTtVQUFBLE9BQUE7QUNsRDFCO0FEK0VBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FDN0VKO0FEMkVBO0VBS1EsaUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx1QkFBQTtVQUFBLDJCQUFBO0VBQ0EsMEJBQUE7VUFBQSxvQkFBQTtFQUNBLDZCQUFBO0FDN0VSO0FEb0VBO0VBWVksbUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQzdFWjtBRCtFWTtFQUNJLG1CQUFBO0VBQ0EsV0FBQTtBQzdFaEI7QURvREE7RUFrQ1ksYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNuRlo7QURxRlk7RUFBVyxjQUFBO0FDbEZ2QiIsImZpbGUiOiJzcmMvYXBwL2l0ZW1zL2VkaXRvci9lZGl0b3IuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbjpob3N0IHtcbiAgICAubWF0LWRpYWxvZy1jb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogMCAxZW07XG4gICAgICAgIG1hcmdpbjogMCAtMWVtO1xuXG4gICAgICAgIC5tYXQtdGFiLWJvZHktd3JhcHBlciB7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiAyNTBweDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyAub3ZlcmxheSB7XG4vLyAgIHBvc2l0aW9uOiBmaXhlZDtcbi8vICAgdG9wOiAwO1xuLy8gICBib3R0b206IDA7XG4vLyAgIGxlZnQ6IDA7XG4vLyAgIHJpZ2h0OiAwO1xuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4vLyAgIHotaW5kZXg6IDk5OTtcbi8vIH1cbi8vXG4vLyAuZGlhbG9nIHtcbi8vICAgei1pbmRleDogMTAwMDtcbi8vICAgcG9zaXRpb246IGZpeGVkO1xuLy8gICByaWdodDogMDtcbi8vICAgbGVmdDogMDtcbi8vICAgdG9wOiA2MHB4O1xuLy8gICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4vLyAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuLy8gICBtaW4taGVpZ2h0OiAyMDBweDtcbi8vICAgd2lkdGg6IDkwJTtcbi8vICAgbWF4LXdpZHRoOiA1MjBweDtcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbi8vICAgcGFkZGluZzogMTJweDtcbi8vICAgYm94LXNoYWRvdzogMCA3cHggOHB4IC00cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDEzcHggMTlweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCA1cHggMjRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbi8vIH1cbi8vXG4vLyBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbi8vICAgLmRpYWxvZyB7XG4vLyAgICAgdG9wOiA2MHB4O1xuLy8gICB9XG4vLyB9XG4vL1xuLy9cbi8vIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYgeyBtYXJnaW4tdG9wOiAwOyBtYXJnaW4tYm90dG9tOiAwLjI1ZW07IH1cbi8vXG4vLyBoNiB7IGZvbnQtc2l6ZTogMC44NXJlbTsgfVxuLy8gaDUgeyBmb250LXNpemU6IDFyZW07IH1cbi8vIGg0IHsgZm9udC1zaXplOiAxLjI1cmVtOyB9XG4vLyBoMyB7IGZvbnQtc2l6ZTogMS41cmVtOyB9XG4vLyBoMiB7IGZvbnQtc2l6ZTogMS43NXJlbTsgfVxuLy8gaDEgeyBmb250LXNpemU6IDJyZW07IH1cblxucCB7XG4gICAgbWFyZ2luOiAwLjVlbSAwO1xuICAgIGZvbnQtc3R5bGU6aXRhbGljO1xufVxuXG5sYWJlbCB7IGZvbnQtd2VpZ2h0OiA3MDA7IH1cblxuaW5wdXQuZm9ybS1jb250cm9sLFxuc2VsZWN0LmZvcm0tY29udHJvbCxcbnRleHRhcmVhLmZvcm0tY29udHJvbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC1zaXplOiAxZW07XG4gICAgcGFkZGluZzogMC41ZW0gLjc1ZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG5cbiAgICAmLnUtc20ge1xuICAgICAgICBmb250LXNpemU6IDAuODc1ZW07XG4gICAgfVxufVxuXG5idXR0b25bdHlwZT1cImJ1dHRvblwiXSB7XG4gICAgZm9udC1zaXplOiAxZW07XG4gICAgcGFkZGluZzogMC41ZW0gMC43NWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG5cbiAgICAmLnUtc20ge1xuICAgICAgICBmb250LXNpemU6IDAuODc1ZW07XG4gICAgfVxuXG4gICAgJi5rZXlwYWRfX2J1dHRvbiB7XG4gICAgICAgIHdpZHRoOiA0ZW07XG4gICAgICAgIGhlaWdodDogM2VtO1xuICAgIH1cbn1cblxuXG4ubS1ncmlkID4gLmZvcm0tY29udHJvbCB7IGZsZXg6IDE7IH1cblxuXG5cbi8vIC5kLWZsZXggeyBkaXNwbGF5OiBmbGV4OyB9XG4vLyAuZmxleC1yb3cgeyBmbGV4LWRpcmVjdGlvbjogcm93OyB9XG4vLyAuZmxleC1jb2wgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XG4vLyAuZmxleC13cmFwIHsgZmxleC13cmFwOiB3cmFwOyB9XG4vLyAuZmxleC1qdXN0aWZ5LXN0YXJ0IHsganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9XG4vLyAuZmxleC1qdXN0aWZ5LWVuZCB7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cbi8vIC5mbGV4LWp1c3RpZnktYmV0d2VlbiB7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuLy8gLmZsZXgtanVzdGlmeS1hcm91bmQgeyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsgfVxuLy8gLmZsZXgtanVzdGlmeS1jZW50ZXIgeyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuLy8gLmZsZXgtanVzdGlmeS1zdHJldGNoIHsganVzdGlmeS1jb250ZW50OiBzdHJldGNoOyB9XG4vLyAuZmxleC1hbGlnbi1zdGFydCB7IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XG4vLyAuZmxleC1hbGlnbi1lbmQgeyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IH1cbi8vIC5mbGV4LWFsaWduLWNlbnRlciB7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbi8vIC5mbGV4LWFsaWduLXN0cmV0Y2ggeyBhbGlnbi1pdGVtczogc3RyZXRjaDsgfVxuLy8gLmNvbCwgLmNvbC0xIHsgZmxleDogMTsgfVxuLy8gLmNvbC0yIHsgZmxleDogMjsgfVxuLy8gLmNvbC0zIHsgZmxleDogMzsgfVxuLy8gLmNvbC00IHsgZmxleDogNDsgfVxuLy8gLmNvbC01IHsgZmxleDogNTsgfVxuLy8gLmNvbC02IHsgZmxleDogNjsgfVxuLy8gLmNvbC1hdXRvIHsgZmxleDogMCAxIGF1dG87IH1cblxuXG5cblxuLnRhYmJlZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgLnRhYnMge1xuICAgICAgICBmbGV4LWJhc2lzOiAyLjVlbTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG5cbiAgICAgICAgLnRhYiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgICAgICAgICAgcGFkZGluZzogMC4yNWVtIDFlbTtcbiAgICAgICAgICAgIG1hcmdpbjogMCAwLjEyNWVtO1xuICAgICAgICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgICAgICAmLmFjdGl2ZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzQxN2ViYztcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLnBhbmVzIHtcblxuICAgICAgICAucGFuZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBwYWRkaW5nOiAxZW0gMC41ZW07XG5cbiAgICAgICAgICAgICYuYWN0aXZlIHsgZGlzcGxheTogYmxvY2s7IH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIjpob3N0IC5tYXQtZGlhbG9nLWNvbnRlbnQge1xuICBwYWRkaW5nOiAwIDFlbTtcbiAgbWFyZ2luOiAwIC0xZW07XG59XG46aG9zdCAubWF0LWRpYWxvZy1jb250ZW50IC5tYXQtdGFiLWJvZHktd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDI1MHB4O1xufVxucCB7XG4gIG1hcmdpbjogMC41ZW0gMDtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxubGFiZWwge1xuICBmb250LXdlaWdodDogNzAwO1xufVxuaW5wdXQuZm9ybS1jb250cm9sLFxuc2VsZWN0LmZvcm0tY29udHJvbCxcbnRleHRhcmVhLmZvcm0tY29udHJvbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXNpemU6IDFlbTtcbiAgcGFkZGluZzogMC41ZW0gMC43NWVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5pbnB1dC5mb3JtLWNvbnRyb2wudS1zbSxcbnNlbGVjdC5mb3JtLWNvbnRyb2wudS1zbSxcbnRleHRhcmVhLmZvcm0tY29udHJvbC51LXNtIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xufVxuYnV0dG9uW3R5cGU9XCJidXR0b25cIl0ge1xuICBmb250LXNpemU6IDFlbTtcbiAgcGFkZGluZzogMC41ZW0gMC43NWVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5idXR0b25bdHlwZT1cImJ1dHRvblwiXS51LXNtIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xufVxuYnV0dG9uW3R5cGU9XCJidXR0b25cIl0ua2V5cGFkX19idXR0b24ge1xuICB3aWR0aDogNGVtO1xuICBoZWlnaHQ6IDNlbTtcbn1cbi5tLWdyaWQgPiAuZm9ybS1jb250cm9sIHtcbiAgZmxleDogMTtcbn1cbi50YWJiZWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnRhYmJlZCAudGFicyB7XG4gIGZsZXgtYmFzaXM6IDIuNWVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbn1cbi50YWJiZWQgLnRhYnMgLnRhYiB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbiAgcGFkZGluZzogMC4yNWVtIDFlbTtcbiAgbWFyZ2luOiAwIDAuMTI1ZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnRhYmJlZCAudGFicyAudGFiLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICM0MTdlYmM7XG4gIGNvbG9yOiAjZmZmO1xufVxuLnRhYmJlZCAucGFuZXMgLnBhbmUge1xuICBkaXNwbGF5OiBub25lO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiAxZW0gMC41ZW07XG59XG4udGFiYmVkIC5wYW5lcyAucGFuZS5hY3RpdmUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/items/editor/editor.component.ts":
/*!**************************************************!*\
  !*** ./src/app/items/editor/editor.component.ts ***!
  \**************************************************/
/*! exports provided: ItemEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemEditorComponent", function() { return ItemEditorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let ItemEditorComponent = class ItemEditorComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.activeTab = null;
        this.tabs = [
            { label: 'Basic', id: 'first' },
            { label: 'Adv', id: 'second' },
            { label: 'Stats', id: 'third' },
            { label: 'Mods', id: 'fourth' }
        ];
    }
    ngOnInit() {
        super.ngOnInit();
        this.uses = ['Turn', "Fight", "Adventure", "Travel"];
        this.slots = ['hat', 'face', 'shoulders', 'coat',
            'torso', 'belt', 'pants', 'gloves', 'boots'];
        this.modifierTargets = [
            'Agility', 'Cunning', 'Spirit', 'Strength', 'Lore', 'Luck',
            'init', 'move', 'combat', 'health', 'sanity', 'corruption',
            'grit', 'faith', 'fury', 'magik', 'mana', 'arcanePowder',
            'armor', 'spiritArmor', 'defense'
        ];
        this.activeTab = this.tabs[0];
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.uses = null;
        this.slots = null;
        this.modifierTargets = null;
        this.activeTab = null;
        this.tabs = null;
    }
    canApply() {
        return !!this.data.item && !!this.data.item.name;
    }
    addModifier() {
        let mod = {
            affects: null,
            value: 0
        };
        if (!this.data.item.modifiers)
            this.data.item.modifiers = [];
        this.data.item.modifiers.push(mod);
    }
    removeModifier(index) {
        if (!this.data.item.modifiers || index > this.data.item.modifiers.length)
            return;
        this.data.item.modifiers.splice(index, 1);
    }
};
ItemEditorComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
ItemEditorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'item-editor',
        template: __webpack_require__(/*! raw-loader!./editor.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/items/editor/editor.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./editor.component.less */ "./src/app/items/editor/editor.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], ItemEditorComponent);



/***/ }),

/***/ "./src/app/items/item.component.ts":
/*!*****************************************!*\
  !*** ./src/app/items/item.component.ts ***!
  \*****************************************/
/*! exports provided: ItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemComponent", function() { return ItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _models_character_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/character.model */ "./src/app/models/character.model.ts");



let ItemComponent = class ItemComponent {
    constructor() {
        this.onEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isCollapsed = true;
        this.confirming = false;
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
    }
    ngOnDestroy() {
        this.item = null;
        this.confirming = null;
    }
    /**
     *
     */
    editItem() { this.onEvent.emit({ type: _models_character_model__WEBPACK_IMPORTED_MODULE_2__["Events"].ITEM_EDIT, item: this.item }); }
    /**
     *
     */
    removeItem() { this.onEvent.emit({ type: _models_character_model__WEBPACK_IMPORTED_MODULE_2__["Events"].ITEM_REMOVE, item: this.item }); }
    /**
     *
     */
    equipItem() { this.onEvent.emit({ type: _models_character_model__WEBPACK_IMPORTED_MODULE_2__["Events"].ITEM_EQUIP, item: this.item }); }
    /**
     *
     */
    confirmingDelete(value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming = value;
            return value;
        }
        return this.confirming;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ItemComponent.prototype, "item", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ItemComponent.prototype, "onEvent", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.is-collapsed'),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
], ItemComponent.prototype, "isCollapsed", void 0);
ItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'item',
        template: __webpack_require__(/*! raw-loader!./item.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/items/item.component.html"),
        styles: [__webpack_require__(/*! ./items.component.less */ "./src/app/items/items.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ItemComponent);



/***/ }),

/***/ "./src/app/items/items.component.less":
/*!********************************************!*\
  !*** ./src/app/items/items.component.less ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 0;\n}\n:host.is-collapsed .item__metadata,\n:host.is-collapsed .item__desc,\n:host.is-collapsed .item__actions {\n  display: none;\n}\n@media (max-width: 1023px) {\n  :host {\n    padding: 0.5em 1.5em;\n  }\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n.item__stats {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  border: 1px solid #bbb;\n  border-radius: 4px;\n  padding: 0.25em 1em;\n  margin: 0.5em 0;\n}\nh5 > small {\n  float: right;\n  font-weight: 400;\n}\nh5:after {\n  clear: right;\n}\n.card {\n  padding: 0.5em;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n.item__metadata {\n  margin-bottom: 1em;\n}\n.item__desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n  margin-bottom: 1em;\n}\n.item__modifiers {\n  padding: 0 0 0.5em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvaXRlbXMvaXRlbXMuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2l0ZW1zL2l0ZW1zLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0FDQUo7QURFSTs7O0VBQ21ELGFBQUE7QUNFdkQ7QURRQTtFQUNJO0lBQ0ksb0JBQUE7RUNOTjtBQUNGO0FEVUE7OztFQUNJLFNBQUE7QUNOSjtBRFNBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUVBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUNSSjtBRFdBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0FDVEo7QURXQTtFQUFXLFlBQUE7QUNSWDtBRFlBO0VBQ0ksY0FBQTtBQ1ZKO0FEWUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ1ZKO0FEcUJBO0VBQ0ksa0JBQUE7QUNuQko7QURxQkE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDbkJKO0FEcUJBO0VBQ0ksa0JBQUE7QUNuQkoiLCJmaWxlIjoic3JjL2FwcC9pdGVtcy9pdGVtcy5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDA7XG5cbiAgICAmLmlzLWNvbGxhcHNlZCB7XG4gICAgICAgIC5pdGVtX19tZXRhZGF0YSwgLml0ZW1fX2Rlc2MgLC5pdGVtX19hY3Rpb25zIHsgZGlzcGxheTogbm9uZTsgfVxuXG4gICAgICAgIC5pdGVtX19tb2RpZmllcnMge1xuXG4gICAgICAgIH1cbiAgICAgICAgLml0ZW1fX3N0YXRzIHtcblxuICAgICAgICB9XG4gICAgfVxufVxuQG1lZGlhKG1heC13aWR0aDoxMDIzcHgpIHtcbiAgICA6aG9zdCB7XG4gICAgICAgIHBhZGRpbmc6IDAuNWVtIDEuNWVtO1xuICAgIH1cbn1cblxuXG5oMywgaDQsIGg1IHtcbiAgICBtYXJnaW46IDA7XG59XG5cbi5pdGVtX19zdGF0cyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBwYWRkaW5nOiAwLjI1ZW0gMWVtO1xuICAgIG1hcmdpbjogMC41ZW0gMDtcbn1cblxuaDUgPiBzbWFsbCB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5oNTphZnRlciB7IGNsZWFyOiByaWdodDsgfVxuXG5cblxuLmNhcmQge1xuICAgIHBhZGRpbmc6IDAuNWVtO1xufVxuLmNhcmQgLmRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICBjb2xvcjogIzU1NTtcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuXG5cblxuXG5cblxuXG5cblxuLml0ZW1fX21ldGFkYXRhIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XG59XG4uaXRlbV9fZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuLml0ZW1fX21vZGlmaWVycyB7XG4gICAgcGFkZGluZzogMCAwIDAuNWVtO1xufVxuLml0ZW1fX3N0YXRzIHtcblxufVxuLml0ZW1fX2FjdGlvbnMge1xuXG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAwO1xufVxuOmhvc3QuaXMtY29sbGFwc2VkIC5pdGVtX19tZXRhZGF0YSxcbjpob3N0LmlzLWNvbGxhcHNlZCAuaXRlbV9fZGVzYyxcbjpob3N0LmlzLWNvbGxhcHNlZCAuaXRlbV9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5AbWVkaWEgKG1heC13aWR0aDogMTAyM3B4KSB7XG4gIDpob3N0IHtcbiAgICBwYWRkaW5nOiAwLjVlbSAxLjVlbTtcbiAgfVxufVxuaDMsXG5oNCxcbmg1IHtcbiAgbWFyZ2luOiAwO1xufVxuLml0ZW1fX3N0YXRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDAuMjVlbSAxZW07XG4gIG1hcmdpbjogMC41ZW0gMDtcbn1cbmg1ID4gc21hbGwge1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5oNTphZnRlciB7XG4gIGNsZWFyOiByaWdodDtcbn1cbi5jYXJkIHtcbiAgcGFkZGluZzogMC41ZW07XG59XG4uY2FyZCAuZGVzYyB7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgY29sb3I6ICM1NTU7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4uaXRlbV9fbWV0YWRhdGEge1xuICBtYXJnaW4tYm90dG9tOiAxZW07XG59XG4uaXRlbV9fZGVzYyB7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgY29sb3I6ICM1NTU7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbn1cbi5pdGVtX19tb2RpZmllcnMge1xuICBwYWRkaW5nOiAwIDAgMC41ZW07XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/items/items.component.ts":
/*!******************************************!*\
  !*** ./src/app/items/items.component.ts ***!
  \******************************************/
/*! exports provided: ItemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsComponent", function() { return ItemsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _models_character_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/character.model */ "./src/app/models/character.model.ts");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor/editor.component */ "./src/app/items/editor/editor.component.ts");





let ItemsComponent = class ItemsComponent {
    constructor(dialog) {
        this.weightLimit = 0;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        this.updateTotals();
    }
    ngOnChanges(changes) {
        if (changes.items) {
            this.updateTotals();
        }
    }
    ngOnDestroy() {
        this.items = null;
        this.totalWeight = null;
        this.totalDarkstone = null;
    }
    /**
     *
     */
    onItemEvent(event, index) {
        let type = event.type;
        let item = event.item;
        switch (type) {
            case _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_EDIT:
                this.editItem(index);
                break;
            case _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_REMOVE:
                this.removeItem(index);
                break;
            case _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_EQUIP:
                this.equipItem(item);
                break;
            default: console.log("unrecognized item event " + type);
        }
    }
    /**
     *
     */
    updateTotals() {
        let weight = 0;
        let stone = 0;
        this.items.forEach(item => {
            weight += isNaN(item.weight) ? 0 : (item.weight * 1);
            stone += isNaN(item.darkstone) ? 0 : (item.darkstone * 1);
        });
        this.totalWeight = weight;
        this.totalDarkstone = stone;
    }
    /**
     *
     */
    addItem() {
        let item = this.createBlankItem();
        this.openEditor(item, -1);
    }
    /**
     *
     */
    editItem(index) {
        let item = this.items[index];
        let editable = JSON.parse(JSON.stringify(item));
        this.openEditor(editable, index);
    }
    /**
     *
     */
    openEditor(item, position) {
        let opts = { data: { item: item } };
        const dialogRef = this.dialog.open(_editor_editor_component__WEBPACK_IMPORTED_MODULE_4__["ItemEditorComponent"], opts);
        this.subscription = dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                let type = '';
                if (!isNaN(position) && position !== null && position >= 0) {
                    type = _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_UPDATE; //"item.updated";
                    this.items[position] = result;
                }
                else {
                    this.items.push(result);
                    type = _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_ADD; //"item.added";
                }
                this.updateTotals();
                this.onSave.emit({ type: type, value: result });
            }
            this.subscription.unsubscribe();
            this.subscription = null;
        });
    }
    /**
     *
     */
    removeItem(index) {
        let rem = this.items.splice(index, 1);
        this.updateTotals();
        this.onSave.emit({
            type: _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_REMOVE,
            value: rem
        });
    }
    /**
     *
     */
    equipItem(item) {
        //if equipping the item, unequip anything already in that slot
        if (!item.equipped)
            this.unEquipItemAtSlot(item.slot);
        item.equipped = !item.equipped;
        this.onSave.emit({
            type: _models_character_model__WEBPACK_IMPORTED_MODULE_3__["Events"].ITEM_EQUIP,
            value: item
        });
    }
    /**
     *
     */
    unEquipItemAtSlot(slot) {
        if (!slot)
            return;
        let item = this.items.find(it => it.slot === slot);
        if (item && item.equipped)
            item.equipped = false;
    }
    /**
     *
     */
    createBlankItem() {
        return {
            name: "",
            source: "General Store",
            slot: null,
            description: "",
            keywords: "",
            usage: null,
            modifiers: [],
            cost: 0,
            weight: 0,
            darkstone: 0,
            hands: 0,
            slots: 0,
            equipped: false
        };
    }
};
ItemsComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], ItemsComponent.prototype, "items", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ItemsComponent.prototype, "weightLimit", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ItemsComponent.prototype, "onSave", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ItemsComponent.prototype, "onError", void 0);
ItemsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'items',
        template: __webpack_require__(/*! raw-loader!./items.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/items/items.component.html"),
        styles: [__webpack_require__(/*! ./items.component.less */ "./src/app/items/items.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], ItemsComponent);



/***/ }),

/***/ "./src/app/login/login.component.less":
/*!********************************************!*\
  !*** ./src/app/login/login.component.less ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".c-login {\n  padding: 3em 1em 5em;\n  overflow: auto;\n  height: 100%;\n}\n.c-login .card {\n  padding: 1em;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.c-login header {\n  display: block;\n  padding: 1em;\n  background: #efefef;\n  border: 1px solid #ddd;\n  border-radius: 4px 4px 0 0;\n}\n@media (min-width: 768px) {\n  .c-login {\n    padding-left: 25%;\n    padding-right: 25%;\n  }\n}\n@media (min-width: 1200px) {\n  .c-login {\n    padding-left: 33%;\n    padding-right: 33%;\n  }\n}\n.mat-form-field {\n  width: 100%;\n  display: block;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksb0JBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQ0NKO0FESkE7RUFNUSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3Q0FBQTtBQ0NSO0FEVEE7RUFZUSxjQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSwwQkFBQTtBQ0FSO0FER0E7RUFDSTtJQUNJLGlCQUFBO0lBQ0Esa0JBQUE7RUNETjtBQUNGO0FER0E7RUFDSTtJQUNJLGlCQUFBO0lBQ0Esa0JBQUE7RUNETjtBQUNGO0FETUE7RUFBa0IsV0FBQTtFQUFhLGNBQUE7QUNGL0IiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jLWxvZ2luIHtcbiAgICBwYWRkaW5nOiAzZW0gMWVtIDVlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAuY2FyZCB7XG4gICAgICAgIHBhZGRpbmc6IDFlbTtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4yKTtcbiAgICB9XG5cbiAgICBoZWFkZXIge1xuICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICAgIGJhY2tncm91bmQ6ICNlZmVmZWY7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgIH1cbn1cbkBtZWRpYShtaW4td2lkdGg6NzY4cHgpIHtcbiAgICAuYy1sb2dpbiB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMjUlO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAyNSU7XG4gICAgfVxufVxuQG1lZGlhKG1pbi13aWR0aDoxMjAwcHgpIHtcbiAgICAuYy1sb2dpbiB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMzMlO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAzMyU7XG4gICAgfVxufVxuXG5cblxuLm1hdC1mb3JtLWZpZWxkIHsgd2lkdGg6IDEwMCU7IGRpc3BsYXk6IGJsb2NrOyB9XG4iLCIuYy1sb2dpbiB7XG4gIHBhZGRpbmc6IDNlbSAxZW0gNWVtO1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLmMtbG9naW4gLmNhcmQge1xuICBwYWRkaW5nOiAxZW07XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG4uYy1sb2dpbiBoZWFkZXIge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMWVtO1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuYy1sb2dpbiB7XG4gICAgcGFkZGluZy1sZWZ0OiAyNSU7XG4gICAgcGFkZGluZy1yaWdodDogMjUlO1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XG4gIC5jLWxvZ2luIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDMzJTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMyU7XG4gIH1cbn1cbi5tYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");




let LoginComponent = class LoginComponent {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    ngOnInit() {
        this.service.getAuth().subscribe(user => {
            if (user !== null) {
                this.message = `Welcome ${user.email}!`;
                setTimeout(() => {
                    this.router.navigate(['/chars']);
                }, 1000);
            }
        });
    }
    /**
     *
     */
    login() {
        if (!this.email || !this.password) {
            this.message = "Specify your email address and password";
            return;
        }
        this.service.login(this.email, this.password)
            .then(user => { this.router.navigate(['/chars']); })
            .catch((e) => {
            this.message = "Unable to log because of an error - " + e.message;
        });
    }
    /**
     *
     */
    resetPassword() {
        if (!this.email) {
            this.message = "Specify your email address to reset your password";
            return;
        }
        this.service.resetPassword(this.email)
            .then(() => {
            this.message = "Password reset email sent";
        })
            .catch(e => {
            this.message = "There was an error resetting your password: " + e.message;
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'login',
        template: __webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/login/login.component.html"),
        styles: [__webpack_require__(/*! ./login.component.less */ "./src/app/login/login.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/mim/mim.component.less":
/*!****************************************!*\
  !*** ./src/app/mim/mim.component.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n.card {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  background: rgba(255, 255, 255, 0.75);\n  margin: 0.5em 0;\n  padding: 0.5em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  border-radius: 4px;\n  font-size: 0.875em;\n}\n.o-mutation-container,\n.o-injury-container,\n.o-madness-container {\n  margin-bottom: 3em;\n}\n@media (min-width: 992px) {\n  .o-mutation-container,\n  .o-injury-container,\n  .o-madness-container {\n    -webkit-box-flex: 1;\n            flex: 1;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvbWltL21pbS5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvbWltL21pbS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FDQ0o7QURFQTs7O0VBQ0ksU0FBQTtBQ0VKO0FERUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0FKO0FER0E7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EscUNBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLHdDQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUNESjtBRE1BOzs7RUFHSSxrQkFBQTtBQ0pKO0FET0E7RUFPSTs7O0lBR0ksbUJBQUE7WUFBQSxPQUFBO0VDWE47QUFDRiIsImZpbGUiOiJzcmMvYXBwL21pbS9taW0uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbmgzLCBoNCwgaDUge1xuICAgIG1hcmdpbjogMDtcbn1cblxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG5cbi5jYXJkIHtcbiAgICBkaXNwbGF5ICAgICA6IGZsZXg7XG4gICAgYWxpZ24taXRlbXMgOiBmbGV4LXN0YXJ0O1xuICAgIGJhY2tncm91bmQgIDogcmdiYSgyNTUsMjU1LDI1NSwwLjc1KTtcbiAgICBtYXJnaW4gICAgICA6IDAuNWVtIDA7XG4gICAgcGFkZGluZyAgICAgOiAwLjVlbTtcbiAgICBib3gtc2hhZG93ICA6IDAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMik7XG4gICAgd2lkdGggICAgICAgOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBmb250LXNpemUgICA6IDAuODc1ZW07XG59XG5cblxuXG4uby1tdXRhdGlvbi1jb250YWluZXIsXG4uby1pbmp1cnktY29udGFpbmVyLFxuLm8tbWFkbmVzcy1jb250YWluZXIge1xuICAgIG1hcmdpbi1ib3R0b206IDNlbTtcbn1cblxuQG1lZGlhKG1pbi13aWR0aDo5OTJweCkge1xuICAgIC5wLW1pbSB7XG4gICAgICAgIC8vIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIC8vIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgLy8gYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgfVxuXG4gICAgLm8tbXV0YXRpb24tY29udGFpbmVyLFxuICAgIC5vLWluanVyeS1jb250YWluZXIsXG4gICAgLm8tbWFkbmVzcy1jb250YWluZXIge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICAvLyBwYWRkaW5nOiAwIDFlbTtcbiAgICB9XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuaDMsXG5oNCxcbmg1IHtcbiAgbWFyZ2luOiAwO1xufVxuLmNhcmQgLmRlc2Mge1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGNvbG9yOiAjNTU1O1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuLmNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KTtcbiAgbWFyZ2luOiAwLjVlbSAwO1xuICBwYWRkaW5nOiAwLjVlbTtcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xufVxuLm8tbXV0YXRpb24tY29udGFpbmVyLFxuLm8taW5qdXJ5LWNvbnRhaW5lcixcbi5vLW1hZG5lc3MtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogM2VtO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5vLW11dGF0aW9uLWNvbnRhaW5lcixcbiAgLm8taW5qdXJ5LWNvbnRhaW5lcixcbiAgLm8tbWFkbmVzcy1jb250YWluZXIge1xuICAgIGZsZXg6IDE7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/mim/mim.component.ts":
/*!**************************************!*\
  !*** ./src/app/mim/mim.component.ts ***!
  \**************************************/
/*! exports provided: MimComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MimComponent", function() { return MimComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");



const MIM = {
    MUTATIONS: "mutations",
    INJURIES: "injuries",
    MADNESS: "madness"
};
let MimComponent = class MimComponent {
    constructor(afs) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.showAvailable = {
            mutations: false,
            injuries: false,
            madness: false
        };
        this.available = {
            mutations: [],
            injuries: [],
            madness: []
        };
        this.options = {};
        this.newMutation = null;
        this.newInjury = null;
        this.newMadness = null;
    }
    ngOnInit() {
        this.mutations = this.current.filter(m => !m.group || m.group.toLowerCase() == MIM.MUTATIONS);
        this.injuries = this.current.filter(m => m.group && m.group.toLowerCase() == MIM.INJURIES);
        this.madness = this.current.filter(m => m.group && m.group.toLowerCase() == MIM.MADNESS);
        this.afs.getMutations().then(mutations => {
            this.options[MIM.MUTATIONS] = mutations;
            this.updateAvailable(MIM.MUTATIONS);
        });
        this.afs.getInjuries().then(injuries => {
            this.options[MIM.INJURIES] = injuries;
            this.updateAvailable(MIM.INJURIES);
        });
        this.afs.getMadness().then(madness => {
            this.options[MIM.MADNESS] = madness;
            this.updateAvailable(MIM.MADNESS);
        });
    }
    ngOnDestroy() {
        this.mutations = null;
        this.injuries = null;
        this.madness = null;
        this.options = null;
        this.available = null;
        this.newMutation = null;
        this.newInjury = null;
        this.newMadness = null;
    }
    add(type, value) {
        if (!this[type])
            this[type] = [];
        if (value.group)
            value.group = type;
        this.showAvailable[type] = false;
        this[type].push(value);
        this.current.push(value);
        this.updateAvailable(type);
        this.onSave.emit({ type: "mutation.added", value: value });
    }
    remove(type, index) {
        let rem = this[type].splice(index, 1);
        this.current.forEach((mim, idx) => {
            if (mim.group === type && mim.name === rem.name)
                index = idx;
        });
        if (index >= 0)
            this.current.splice(index, 1);
        this.updateAvailable(type);
        this.onSave.emit({ type: "mutation.removed", value: rem });
    }
    updateAvailable(type) {
        let takenNames = this[type].map(a => a.name);
        this.available[type] = this.options[type].filter(a => {
            //return only those that can be chosen multiple times
            // or haven't already been chosen
            return takenNames.indexOf(a.name) < 0;
        });
    }
};
MimComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], MimComponent.prototype, "current", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], MimComponent.prototype, "onSave", void 0);
MimComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'mim',
        template: __webpack_require__(/*! raw-loader!./mim.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/mim/mim.component.html"),
        styles: [__webpack_require__(/*! ./mim.component.less */ "./src/app/mim/mim.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"]])
], MimComponent);



/***/ }),

/***/ "./src/app/modal.service.ts":
/*!**********************************!*\
  !*** ./src/app/modal.service.ts ***!
  \**********************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ModalService = class ModalService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    createComponentRef(component) {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        return componentRef;
    }
    getDomElementFromComponentRef(componentRef) {
        return componentRef.hostView
            .rootNodes[0];
    }
    addChild(child, parent = document.body) {
        parent.appendChild(child);
    }
    destroyRef(componentRef, delay) {
        setTimeout(() => {
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        }, delay);
    }
};
ModalService.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"] }
];
ModalService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
], ModalService);



/***/ }),

/***/ "./src/app/models/character.model.ts":
/*!*******************************************!*\
  !*** ./src/app/models/character.model.ts ***!
  \*******************************************/
/*! exports provided: Events, ModifierTargets, SPECIAL_CLASSES, ClassFlag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierTargets", function() { return ModifierTargets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPECIAL_CLASSES", function() { return SPECIAL_CLASSES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassFlag", function() { return ClassFlag; });
const Events = {
    ITEM_EDIT: 'item.edit',
    ITEM_ADD: 'item.added',
    ITEM_UPDATE: 'item.updated',
    ITEM_REMOVE: 'item.removed',
    ITEM_EQUIP: 'item.equipped'
};
const ModifierTargets = [
    'Agility', 'Cunning', 'Spirit', 'Strength', 'Lore', 'Luck',
    'armor', 'combat', 'corruption', 'cover', 'defense', 'endurance',
    'faith', 'fury', 'grit', 'health', 'init', 'ki',
    'spiritArmor', 'magik', 'mana', 'melee', 'ranged', 'move', 'sanity'
];
/*
These classes have some abilities like spells or custom trackable resources like faith
*/
var SPECIAL_CLASSES;
(function (SPECIAL_CLASSES) {
    SPECIAL_CLASSES[SPECIAL_CLASSES["PREACHER"] = 0] = "PREACHER";
    SPECIAL_CLASSES[SPECIAL_CLASSES["SHAMAN"] = 1] = "SHAMAN";
    SPECIAL_CLASSES[SPECIAL_CLASSES["SAMURAI"] = 2] = "SAMURAI";
    SPECIAL_CLASSES[SPECIAL_CLASSES["GAMBLER"] = 3] = "GAMBLER";
    SPECIAL_CLASSES[SPECIAL_CLASSES["ORPHAN"] = 4] = "ORPHAN";
    SPECIAL_CLASSES[SPECIAL_CLASSES["MONK"] = 5] = "MONK";
    SPECIAL_CLASSES[SPECIAL_CLASSES["SORCERER"] = 6] = "SORCERER";
    SPECIAL_CLASSES[SPECIAL_CLASSES["ASSASSIN"] = 7] = "ASSASSIN";
    SPECIAL_CLASSES[SPECIAL_CLASSES["TREDERRAN_VETERAN"] = 8] = "TREDERRAN_VETERAN";
})(SPECIAL_CLASSES || (SPECIAL_CLASSES = {}));
;
const CLASS_FLAGS = {};
CLASS_FLAGS[SPECIAL_CLASSES.PREACHER] = {
    value: 1,
    fn: (char) => { return 'Preacher' === char.class; },
    init: (char) => { char.sermons = char.sermons || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.SHAMAN] = {
    value: 2,
    fn: (char) => { return 'Dark Stone Shaman' === char.class; },
    init: (char) => { char.spells = char.spells || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.SAMURAI] = {
    value: 4,
    fn: (char) => { return ['Wandering Samurai', 'Daimyo', 'Samurai Warrior'].indexOf(char.class) >= 0; },
    init: (char) => { char.tactics = char.tactics || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.GAMBLER] = {
    value: 8,
    fn: (char) => { return 'Gambler' === char.class; },
    init: (char) => { char.tricks = char.tricks || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.ORPHAN] = {
    value: 16,
    fn: (char) => { return 'Orphan' === char.class; },
    init: (char) => { char.missions = char.missions || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.MONK] = { value: 32, fn: (char) => { return 'Traveling Monk' === char.class; } };
CLASS_FLAGS[SPECIAL_CLASSES.SORCERER] = {
    value: 64,
    fn: (char) => { return 'Sorcerer' === char.class; },
    init: (char) => { char.elementalMagik = char.elementalMagik || []; }
};
CLASS_FLAGS[SPECIAL_CLASSES.ASSASSIN] = {
    value: 128,
    fn: (char) => { return 'Assassin' === char.class; }
};
CLASS_FLAGS[SPECIAL_CLASSES.TREDERRAN_VETERAN] = {
    value: 256,
    fn: (char) => { return 'Trederran Veteran' === char.class; }
};
/**
 *
 */
class ClassFlag {
    constructor(char) {
        this.flag = 0;
        Object.keys(CLASS_FLAGS).forEach(key => {
            let flag = CLASS_FLAGS[key];
            if (flag.fn(char)) {
                this.applyFlag(flag.value);
                if (typeof (flag.init) !== 'undefined') {
                    flag.init(char);
                }
            }
        });
    }
    applyFlag(flag) { this.flag |= flag; }
    removeFlag(flag) { this.flag &= ~flag; }
    hasFlag(flag) { return (this.flag & flag) > 0; }
    hasSpecialClass(cls) {
        if (cls !== null && typeof (cls) !== 'undefined' && CLASS_FLAGS[cls]) {
            return this.hasFlag(CLASS_FLAGS[cls].value);
        }
        return false;
    }
}
ClassFlag.ctorParameters = () => [
    { type: undefined }
];


/***/ }),

/***/ "./src/app/models/error.ts":
/*!*********************************!*\
  !*** ./src/app/models/error.ts ***!
  \*********************************/
/*! exports provided: SOBError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOBError", function() { return SOBError; });
class SOBError {
    constructor(type, arg) {
        this.type = null;
        this.message = null;
        this.type = type;
        if (arg && arg instanceof Error)
            this.message = arg.message;
        else if (arg && typeof (arg) === 'string')
            this.message = arg;
        else
            this.message = "An error occurred";
    }
}
SOBError.ctorParameters = () => [
    { type: String },
    { type: undefined }
];


/***/ }),

/***/ "./src/app/shared/chooser/chooser.component.less":
/*!*******************************************************!*\
  !*** ./src/app/shared/chooser/chooser.component.less ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 60px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 60px;\n  }\n}\n.c-option--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-option--available.is-selected {\n  background-color: #3267dd;\n  color: #fff;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc2hhcmVkL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc2hhcmVkL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0VBQ0ksU0FBQTtBQ0dKO0FEQUE7RUFDRSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLG9DQUFBO0VBQ0EsWUFBQTtBQ0VGO0FEQ0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLHNIQUFBO0FDQ0Y7QURFQTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLDZCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQ0FKO0FER0E7RUFDRTtJQUNFLFNBQUE7RUNERjtBQUNGO0FES0E7RUFDSSxlQUFBO0VBQ0Esd0NBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUNISjtBREtJO0VBQ0kseUJBQUE7RUFDQSxXQUFBO0FDSFIiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4ub3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIHotaW5kZXg6IDk5OTtcbn1cblxuLmRpYWxvZyB7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIGxlZnQ6IDA7XG4gIHRvcDogNjBweDtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIHdpZHRoOiA5MCU7XG4gIG1heC13aWR0aDogNTIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNXB4IDI0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG59XG5cbi5kaWFsb2dfX2JvZHkge1xuICAgIG1heC1oZWlnaHQ6IDQwMHB4O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmRpYWxvZyB7XG4gICAgdG9wOiA2MHB4O1xuICB9XG59XG5cblxuLmMtb3B0aW9uLS1hdmFpbGFibGUge1xuICAgIG1hcmdpbjogICAgICAgICAwLjVlbSAwO1xuICAgIGJveC1zaGFkb3c6ICAgICAwIDFweCAzcHggcmdiYSgwLDAsMCwwLjIpO1xuICAgIHBhZGRpbmc6ICAgICAgICAwLjVlbTtcbiAgICBib3JkZXItcmFkaXVzOiAgNHB4O1xuXG4gICAgJi5pcy1zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjY3ZGQ7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbn1cbiIsImgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbjogMDtcbn1cbi5vdmVybGF5IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgei1pbmRleDogOTk5O1xufVxuLmRpYWxvZyB7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIGxlZnQ6IDA7XG4gIHRvcDogNjBweDtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIHdpZHRoOiA5MCU7XG4gIG1heC13aWR0aDogNTIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNXB4IDI0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG59XG4uZGlhbG9nX19ib2R5IHtcbiAgbWF4LWhlaWdodDogNDAwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICBwYWRkaW5nLWJvdHRvbTogMWVtO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5kaWFsb2cge1xuICAgIHRvcDogNjBweDtcbiAgfVxufVxuLmMtb3B0aW9uLS1hdmFpbGFibGUge1xuICBtYXJnaW46IDAuNWVtIDA7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIHBhZGRpbmc6IDAuNWVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG4uYy1vcHRpb24tLWF2YWlsYWJsZS5pcy1zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMjY3ZGQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/shared/chooser/chooser.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/chooser/chooser.component.ts ***!
  \*****************************************************/
/*! exports provided: ChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooserComponent", function() { return ChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");



let ChooserComponent = class ChooserComponent {
    constructor() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    }
    close() {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    }
    apply() {
        this.visible = false;
        let value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection['name'] === value['name'];
    }
    hasSelection() {
        return this.selection !== null;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], ChooserComponent.prototype, "options", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ChooserComponent.prototype, "closable", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
], ChooserComponent.prototype, "visible", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
], ChooserComponent.prototype, "onClose", void 0);
ChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'option-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/shared/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ChooserComponent);



/***/ }),

/***/ "./src/app/shared/dialog/dialog.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/dialog/dialog.component.ts ***!
  \***************************************************/
/*! exports provided: AbstractDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractDialogComponent", function() { return AbstractDialogComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");

class AbstractDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.data = null;
        this.dialogRef = null;
    }
    close() {
        this.dialogRef.close();
    }
}
AbstractDialogComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"] },
    { type: undefined }
];


/***/ }),

/***/ "./src/app/shared/keypad/keypad.component.less":
/*!*****************************************************!*\
  !*** ./src/app/shared/keypad/keypad.component.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "label {\n  font-weight: 700;\n}\ninput.form-control,\nselect.form-control,\ntextarea.form-control {\n  width: 100%;\n  font-size: 1em;\n  padding: 0.5em 0.75em;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ninput.form-control.u-sm,\nselect.form-control.u-sm,\ntextarea.form-control.u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"].keypad__button {\n  font-size: 1em;\n  height: 3em;\n  background-color: #ddd;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\nbutton[type=\"button\"].keypad__button.u-sm {\n  font-size: 0.875em;\n}\n.o-keypad {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-column-gap: 0.5em;\n  grid-row-gap: 0.5em;\n  padding-top: 0.5em;\n}\n.o-keypad button {\n  margin: 0 auto;\n}\n@media (min-width: 992px) {\n  .o-keypad {\n    grid-column-gap: 1em;\n    grid-row-gap: 1em;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc2hhcmVkL2tleXBhZC9rZXlwYWQuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3NoYXJlZC9rZXlwYWQva2V5cGFkLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDQTtFQUFRLGdCQUFBO0FDN0NSO0FEK0NBOzs7RUFHSSxXQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQzdDSjtBRCtDSTs7O0VBQ0ksa0JBQUE7QUMzQ1I7QUQrQ0E7RUFDSSxjQUFBO0VBRUEsV0FBQTtFQUVBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQy9DSjtBRGlESTtFQUNJLGtCQUFBO0FDL0NSO0FEb0RBO0VBQ0ksYUFBQTtFQUNBLGtDQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDbERKO0FENkNBO0VBTWEsY0FBQTtBQ2hEYjtBRGtEQTtFQUNJO0lBQ0ksb0JBQUE7SUFDQSxpQkFBQTtFQ2hETjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2tleXBhZC9rZXlwYWQuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAub3ZlcmxheSB7XG4vLyAgIHBvc2l0aW9uOiBmaXhlZDtcbi8vICAgdG9wOiAwO1xuLy8gICBib3R0b206IDA7XG4vLyAgIGxlZnQ6IDA7XG4vLyAgIHJpZ2h0OiAwO1xuLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4vLyAgIHotaW5kZXg6IDk5OTtcbi8vIH1cbi8vXG4vLyAuZGlhbG9nIHtcbi8vICAgei1pbmRleDogMTAwMDtcbi8vICAgcG9zaXRpb246IGZpeGVkO1xuLy8gICByaWdodDogMDtcbi8vICAgbGVmdDogMDtcbi8vICAgdG9wOiA2MHB4O1xuLy8gICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4vLyAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuLy8gICBtaW4taGVpZ2h0OiAyMDBweDtcbi8vICAgd2lkdGg6IDkwJTtcbi8vICAgbWF4LXdpZHRoOiA1MjBweDtcbi8vICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbi8vICAgcGFkZGluZzogMTJweDtcbi8vICAgYm94LXNoYWRvdzogMCA3cHggOHB4IC00cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDEzcHggMTlweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCA1cHggMjRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcbi8vIH1cbi8vXG4vLyBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbi8vICAgLmRpYWxvZyB7XG4vLyAgICAgdG9wOiA2MHB4O1xuLy8gICB9XG4vLyB9XG5cblxuLy8gaDEsIGgyLCBoMywgaDQsIGg1LCBoNiB7IG1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDAuMjVlbTsgfVxuLy9cbi8vIGg2IHsgZm9udC1zaXplOiAwLjg1cmVtOyB9XG4vLyBoNSB7IGZvbnQtc2l6ZTogMXJlbTsgfVxuLy8gaDQgeyBmb250LXNpemU6IDEuMjVyZW07IH1cbi8vIGgzIHsgZm9udC1zaXplOiAxLjVyZW07IH1cbi8vIGgyIHsgZm9udC1zaXplOiAxLjc1cmVtOyB9XG4vLyBoMSB7IGZvbnQtc2l6ZTogMnJlbTsgfVxuLy9cbi8vIHAge1xuLy8gICAgIG1hcmdpbjogMC41ZW0gMDtcbi8vICAgICBmb250LXN0eWxlOml0YWxpYztcbi8vIH1cblxubGFiZWwgeyBmb250LXdlaWdodDogNzAwOyB9XG5cbmlucHV0LmZvcm0tY29udHJvbCxcbnNlbGVjdC5mb3JtLWNvbnRyb2wsXG50ZXh0YXJlYS5mb3JtLWNvbnRyb2wge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgIHBhZGRpbmc6IDAuNWVtIC43NWVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuXG4gICAgJi51LXNtIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIH1cbn1cblxuYnV0dG9uW3R5cGU9XCJidXR0b25cIl0ua2V5cGFkX19idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgIC8vIHdpZHRoOiA0ZW07XG4gICAgaGVpZ2h0OiAzZW07XG4gICAgLy8gcGFkZGluZzogMC41ZW0gMC43NWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG5cbiAgICAmLnUtc20ge1xuICAgICAgICBmb250LXNpemU6IDAuODc1ZW07XG4gICAgfVxufVxuXG5cbi5vLWtleXBhZCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xuICAgIGdyaWQtY29sdW1uLWdhcDogMC41ZW07XG4gICAgZ3JpZC1yb3ctZ2FwOiAwLjVlbTtcbiAgICBwYWRkaW5nLXRvcDogMC41ZW07XG4gICAgYnV0dG9uIHsgbWFyZ2luOiAwIGF1dG87IH1cbn1cbkBtZWRpYShtaW4td2lkdGg6IDk5MnB4KSB7XG4gICAgLm8ta2V5cGFkIHtcbiAgICAgICAgZ3JpZC1jb2x1bW4tZ2FwOiAxZW07XG4gICAgICAgIGdyaWQtcm93LWdhcDogMWVtO1xuICAgIH1cbn1cblxuXG5cblxuXG5cbi8vIC5kLWZsZXggeyBkaXNwbGF5OiBmbGV4OyB9XG4vLyAuZmxleC1yb3cgeyBmbGV4LWRpcmVjdGlvbjogcm93OyB9XG4vLyAuZmxleC1jb2wgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XG4vLyAuZmxleC13cmFwIHsgZmxleC13cmFwOiB3cmFwOyB9XG4vLyAuZmxleC1qdXN0aWZ5LXN0YXJ0IHsganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9XG4vLyAuZmxleC1qdXN0aWZ5LWVuZCB7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cbi8vIC5mbGV4LWp1c3RpZnktYmV0d2VlbiB7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuLy8gLmZsZXgtanVzdGlmeS1hcm91bmQgeyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDsgfVxuLy8gLmZsZXgtanVzdGlmeS1jZW50ZXIgeyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuLy8gLmZsZXgtanVzdGlmeS1zdHJldGNoIHsganVzdGlmeS1jb250ZW50OiBzdHJldGNoOyB9XG4vLyAuZmxleC1hbGlnbi1zdGFydCB7IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XG4vLyAuZmxleC1hbGlnbi1lbmQgeyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IH1cbi8vIC5mbGV4LWFsaWduLWNlbnRlciB7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbi8vIC5mbGV4LWFsaWduLXN0cmV0Y2ggeyBhbGlnbi1pdGVtczogc3RyZXRjaDsgfVxuLy8gLmNvbCwgLmNvbC0xIHsgZmxleDogMTsgfVxuLy8gLmNvbC0yIHsgZmxleDogMjsgfVxuLy8gLmNvbC0zIHsgZmxleDogMzsgfVxuLy8gLmNvbC00IHsgZmxleDogNDsgfVxuLy8gLmNvbC01IHsgZmxleDogNTsgfVxuLy8gLmNvbC02IHsgZmxleDogNjsgfVxuLy8gLmNvbC1hdXRvIHsgZmxleDogMCAxIGF1dG87IH1cbiIsImxhYmVsIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbmlucHV0LmZvcm0tY29udHJvbCxcbnNlbGVjdC5mb3JtLWNvbnRyb2wsXG50ZXh0YXJlYS5mb3JtLWNvbnRyb2wge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiAxZW07XG4gIHBhZGRpbmc6IDAuNWVtIDAuNzVlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuaW5wdXQuZm9ybS1jb250cm9sLnUtc20sXG5zZWxlY3QuZm9ybS1jb250cm9sLnUtc20sXG50ZXh0YXJlYS5mb3JtLWNvbnRyb2wudS1zbSB7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbn1cbmJ1dHRvblt0eXBlPVwiYnV0dG9uXCJdLmtleXBhZF9fYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxZW07XG4gIGhlaWdodDogM2VtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5idXR0b25bdHlwZT1cImJ1dHRvblwiXS5rZXlwYWRfX2J1dHRvbi51LXNtIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xufVxuLm8ta2V5cGFkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgZ3JpZC1jb2x1bW4tZ2FwOiAwLjVlbTtcbiAgZ3JpZC1yb3ctZ2FwOiAwLjVlbTtcbiAgcGFkZGluZy10b3A6IDAuNWVtO1xufVxuLm8ta2V5cGFkIGJ1dHRvbiB7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XG4gIC5vLWtleXBhZCB7XG4gICAgZ3JpZC1jb2x1bW4tZ2FwOiAxZW07XG4gICAgZ3JpZC1yb3ctZ2FwOiAxZW07XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/shared/keypad/keypad.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/keypad/keypad.component.ts ***!
  \***************************************************/
/*! exports provided: KeypadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeypadComponent", function() { return KeypadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let KeypadComponent = class KeypadComponent extends _dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.changes = [];
        this.result = 0;
        this.minimum = 0;
        this.maximum = 9999;
    }
    ngOnInit() {
        super.ngOnInit();
        this.result = (!this.data || isNaN(this.data.value)) ? 0 : this.data.value;
        if (this.data && !isNaN(this.data.minimum))
            this.minimum = this.data.minimum * 1;
        if (this.data && !isNaN(this.data.maximum))
            this.maximum = this.data.maximum * 1;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.manualAdj = null;
        this.changes = null;
        this.result = 0;
    }
    change(v) {
        if (v > 0)
            this.result = Math.min(this.result + v, this.maximum);
        else
            this.result = Math.max(this.result + v, this.minimum);
        this.changes.push(v);
    }
    changeManual(direction) {
        if (isNaN(this.manualAdj))
            return; //if no value provided
        this.change(direction * this.manualAdj);
    }
    hasManual() {
        return !isNaN(this.manualAdj);
    }
};
KeypadComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
];
KeypadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'keypad',
        template: __webpack_require__(/*! raw-loader!./keypad.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/keypad/keypad.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./keypad.component.less */ "./src/app/shared/keypad/keypad.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
], KeypadComponent);



/***/ }),

/***/ "./src/app/shared/temp/temp.component.less":
/*!*************************************************!*\
  !*** ./src/app/shared/temp/temp.component.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 1em 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc2hhcmVkL3RlbXAvdGVtcC5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc2hhcmVkL3RlbXAvdGVtcC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBRUEsZ0JBQUE7RUFDQSxjQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvdGVtcC90ZW1wLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC8vIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDFlbSAwO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHBhZGRpbmc6IDFlbSAwO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/shared/temp/temp.component.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/temp/temp.component.ts ***!
  \***********************************************/
/*! exports provided: TempComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TempComponent", function() { return TempComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let TempComponent = class TempComponent {
    constructor() {
        this.mods = [];
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.newModifier = { affects: null, value: 0 };
        this.modifierTargets = [
            'Agility', 'Cunning', 'Spirit', 'Strength', 'Lore', 'Luck',
            'armor', 'combat', 'corruption', 'cover', 'defense', 'endurance',
            'faith', 'fury', 'grit', 'health', 'init', 'ki',
            'spiritArmor', 'magik', 'mana', 'melee', 'ranged', 'move', 'sanity'
        ];
    }
    ngOnInit() {
    }
    addModifier() {
        this.mods.push(Object.assign({}, this.newModifier));
        this.onSave.emit({ value: this.mods });
        //reset new modifier value
        this.newModifier.affects = null;
        this.newModifier.value = 0;
    }
    removeModifier(index) {
        this.mods.splice(index, 1);
        this.onSave.emit({ value: this.mods });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], TempComponent.prototype, "mods", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], TempComponent.prototype, "onSave", void 0);
TempComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'temporary-modifiers',
        template: __webpack_require__(/*! raw-loader!./temp.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/temp/temp.component.html"),
        styles: [__webpack_require__(/*! ./temp.component.less */ "./src/app/shared/temp/temp.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], TempComponent);



/***/ }),

/***/ "./src/app/shared/uses/uses.component.less":
/*!*************************************************!*\
  !*** ./src/app/shared/uses/uses.component.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 1em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc2hhcmVkL3VzZXMvdXNlcy5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc2hhcmVkL3VzZXMvdXNlcy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBRUEsZ0JBQUE7RUFDQSxZQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvdXNlcy91c2VzLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC8vIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDFlbTtcbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAxZW07XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/shared/uses/uses.component.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/uses/uses.component.ts ***!
  \***********************************************/
/*! exports provided: UsesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsesComponent", function() { return UsesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let UsesComponent = class UsesComponent {
    constructor() {
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.showDesc = {};
    }
    ngOnInit() {
    }
    use(it) {
        it.used = !it.used;
    }
    reset(type) {
        let items = this.character.items;
        items.forEach(it => { if (it.used && type == it.usage)
            it.used = false; });
        let abilities = this.character.abilities;
        abilities.forEach(a => { if (a.used && type == a.usage)
            a.used = false; });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], UsesComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], UsesComponent.prototype, "onSave", void 0);
UsesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'char-uses',
        template: __webpack_require__(/*! raw-loader!./uses.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/uses/uses.component.html"),
        styles: [__webpack_require__(/*! ./uses.component.less */ "./src/app/shared/uses/uses.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], UsesComponent);



/***/ }),

/***/ "./src/app/shared/value-display/value-display.component.less":
/*!*******************************************************************!*\
  !*** ./src/app/shared/value-display/value-display.component.less ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".value-display .value.modified > *:first-child:after {\n  color: darkblue;\n  content: \"*\";\n  font-size: 0.5em;\n  margin-top: -1em;\n}\n:host {\n  display: inline-block;\n  margin: 0.25em;\n}\n.vd {\n  height: 5.625em;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 4em 2em;\n  grid-template-rows: 2em;\n  grid-template-areas: \"value incr\" \"value decr\" \"label label\";\n}\n.vd .vd__value {\n  grid-area: value;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: stretch;\n          align-items: stretch;\n  background: #fff;\n  border-top-left-radius: 8px;\n  width: 100%;\n  height: 100%;\n  min-height: 4em;\n  max-height: 4em;\n}\n.vd .vd__value > *:first-child {\n  font-size: 2em;\n  text-align: center;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-flex: 1;\n          flex: 1 0 1em;\n  padding: 0 0.5em;\n}\n.vd .vd__value > *:first-child.u-sm {\n  font-size: 1.25em;\n}\n.vd .vd__value.u-sm > *:first-child {\n  font-size: 1.5em;\n}\n.vd .vd__value.modified > *:first-child {\n  background-color: #ffbc0052;\n  font-style: italic;\n}\n.vd.is-special .vd__label {\n  color: #fff;\n  background: #333;\n}\n.vd.is-special .vd__value {\n  color: #999;\n}\n.vd .vd__incr {\n  grid-area: incr;\n  border-bottom: 1px solid #000 !important;\n  border-top-right-radius: 8px !important;\n  color: #333 !important;\n  background-color: #b6e3b6 !important;\n}\n.vd .vd__decr {\n  grid-area: decr;\n  color: #333 !important;\n  background-color: #f1c9c9 !important;\n}\n.vd .vd__incr,\n.vd .vd__decr {\n  font-size: 1em;\n  width: 2em;\n  height: 2em;\n  border: none;\n  font-weight: 900;\n  border-radius: 0;\n  border-left: 1px solid #000 !important;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  cursor: pointer;\n}\n.vd .vd__incr:first-child,\n.vd .vd__decr:first-child {\n  border-radius: 0 8px 0 0;\n}\n.vd .vd__label {\n  grid-area: label;\n  width: 100%;\n  height: 1.75em;\n  font-weight: 700;\n  text-align: center;\n  padding: 0.25em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  border-top: 1px solid #000;\n  border-radius: 0 0 6px 6px;\n  background-color: #ececec;\n  font-size: 0.85em;\n}\n.needed {\n  border-top: 1px solid #777;\n  color: #777;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc2hhcmVkL3ZhbHVlLWRpc3BsYXkvdmFsdWUtZGlzcGxheS5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc2hhcmVkL3ZhbHVlLWRpc3BsYXkvdmFsdWUtZGlzcGxheS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0NKO0FES0E7RUFDSSxxQkFBQTtFQUNBLGNBQUE7QUNISjtBRFFBO0VBRUksZUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBRUEsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSw0REFBQTtBQ1JKO0FESEE7RUFtQlEsZ0JBQUE7RUFFQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsMEJBQUE7VUFBQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMkJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FDZFI7QURnQlE7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLG1CQUFBO1VBQUEsYUFBQTtFQUNBLGdCQUFBO0FDZFo7QURpQlk7RUFDSSxpQkFBQTtBQ2ZoQjtBRG1CUTtFQUNJLGdCQUFBO0FDakJaO0FEb0JRO0VBQ0ksMkJBQUE7RUFDQSxrQkFBQTtBQ2xCWjtBRHNCSTtFQUVRLFdBQUE7RUFDQSxnQkFBQTtBQ3JCWjtBRGtCSTtFQU1RLFdBQUE7QUNyQlo7QUQxQ0E7RUFvRVEsZUFBQTtFQUNBLHdDQUFBO0VBQ0EsdUNBQUE7RUFDQSxzQkFBQTtFQUNBLG9DQUFBO0FDdkJSO0FEakRBO0VBNEVRLGVBQUE7RUFDQSxzQkFBQTtFQUNBLG9DQUFBO0FDeEJSO0FEdERBOztFQWtGUSxjQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLHNDQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxlQUFBO0FDeEJSO0FEMEJROztFQUNJLHdCQUFBO0FDdkJaO0FEeEVBO0VBb0dRLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFDQSx5QkFBQTtFQUVBLGlCQUFBO0FDMUJSO0FEZ0NBO0VBRUksMEJBQUE7RUFDQSxXQUFBO0FDL0JKIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL3ZhbHVlLWRpc3BsYXkvdmFsdWUtZGlzcGxheS5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi52YWx1ZS1kaXNwbGF5IC52YWx1ZS5tb2RpZmllZCA+ICo6Zmlyc3QtY2hpbGQ6YWZ0ZXIge1xuICAgIGNvbG9yOiBkYXJrYmx1ZTtcbiAgICBjb250ZW50OiBcIipcIjtcbiAgICBmb250LXNpemU6IDAuNWVtO1xuICAgIG1hcmdpbi10b3A6IC0xZW07XG59XG5cblxuXG5cbjpob3N0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAwLjI1ZW07XG59XG5cblxuXG4udmQge1xuICAgIC8vIG1heC13aWR0aDogOTZweDtcbiAgICBoZWlnaHQ6IDUuNjI1ZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDRlbSAyZW07XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyZW07XG4gICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcbiAgICAgICAgXCJ2YWx1ZSBpbmNyXCJcbiAgICAgICAgXCJ2YWx1ZSBkZWNyXCJcbiAgICAgICAgXCJsYWJlbCBsYWJlbFwiO1xuXG5cblxuICAgIC52ZF9fdmFsdWUge1xuICAgICAgICBncmlkLWFyZWE6IHZhbHVlO1xuXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogOHB4O1xuICAgICAgICB3aWR0aDogIDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgbWluLWhlaWdodDogNGVtO1xuICAgICAgICBtYXgtaGVpZ2h0OiA0ZW07XG5cbiAgICAgICAgJiA+ICo6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyZW07XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdzsgLy9uZWVkZWQgZm9yIG1vZGlmaWVyIGFzdGVyaXNrXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBmbGV4OiAxIDAgMWVtO1xuICAgICAgICAgICAgcGFkZGluZzogMCAwLjVlbTtcbiAgICAgICAgICAgIC8vIG1heC13aWR0aDogNjRweDtcblxuICAgICAgICAgICAgJi51LXNtIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEuMjVlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYudS1zbSA+ICo6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxLjVlbTtcbiAgICAgICAgfVxuXG4gICAgICAgICYubW9kaWZpZWQgPiAqOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmJjMDA1MjtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuaXMtc3BlY2lhbCB7XG4gICAgICAgIC52ZF9fbGFiZWwge1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMzMzO1xuICAgICAgICB9XG4gICAgICAgIC52ZF9fdmFsdWUge1xuICAgICAgICAgICAgY29sb3I6ICM5OTk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAudmRfX2luY3Ige1xuICAgICAgICBncmlkLWFyZWE6IGluY3I7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAwICFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA4cHggIWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6ICMzMzMgIWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2I2ZTNiNiAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC52ZF9fZGVjciB7XG4gICAgICAgIGdyaWQtYXJlYTogZGVjcjtcbiAgICAgICAgY29sb3I6ICMzMzMgIWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YxYzljOSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC52ZF9faW5jciwgLnZkX19kZWNyIHtcbiAgICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICAgIHdpZHRoOiAgMmVtO1xuICAgICAgICBoZWlnaHQ6IDJlbTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBmb250LXdlaWdodDogOTAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMwMDAgIWltcG9ydGFudDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAgOHB4IDAgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC52ZF9fbGFiZWwge1xuICAgICAgICBncmlkLWFyZWE6IGxhYmVsO1xuICAgICAgICB3aWR0aDogIDEwMCU7XG4gICAgICAgIGhlaWdodDogMS43NWVtOyAgICAvLyAxLjUgKyAuMjUgZm9yIHNtYWxsZXIgZm9udFxuICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDAuMjVlbTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMDAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDAgNnB4IDZweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYztcblxuICAgICAgICBmb250LXNpemU6IDAuODVlbTtcblxuICAgIH1cbn1cblxuXG4ubmVlZGVkIHtcbiAgICAvLyBmb250LXNpemU6IDAuODc1ZW07XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM3Nzc7XG4gICAgY29sb3I6ICM3Nzc7XG59XG4iLCIudmFsdWUtZGlzcGxheSAudmFsdWUubW9kaWZpZWQgPiAqOmZpcnN0LWNoaWxkOmFmdGVyIHtcbiAgY29sb3I6IGRhcmtibHVlO1xuICBjb250ZW50OiBcIipcIjtcbiAgZm9udC1zaXplOiAwLjVlbTtcbiAgbWFyZ2luLXRvcDogLTFlbTtcbn1cbjpob3N0IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW46IDAuMjVlbTtcbn1cbi52ZCB7XG4gIGhlaWdodDogNS42MjVlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDRlbSAyZW07XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMmVtO1xuICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcInZhbHVlIGluY3JcIiBcInZhbHVlIGRlY3JcIiBcImxhYmVsIGxhYmVsXCI7XG59XG4udmQgLnZkX192YWx1ZSB7XG4gIGdyaWQtYXJlYTogdmFsdWU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogOHB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiA0ZW07XG4gIG1heC1oZWlnaHQ6IDRlbTtcbn1cbi52ZCAudmRfX3ZhbHVlID4gKjpmaXJzdC1jaGlsZCB7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4OiAxIDAgMWVtO1xuICBwYWRkaW5nOiAwIDAuNWVtO1xufVxuLnZkIC52ZF9fdmFsdWUgPiAqOmZpcnN0LWNoaWxkLnUtc20ge1xuICBmb250LXNpemU6IDEuMjVlbTtcbn1cbi52ZCAudmRfX3ZhbHVlLnUtc20gPiAqOmZpcnN0LWNoaWxkIHtcbiAgZm9udC1zaXplOiAxLjVlbTtcbn1cbi52ZCAudmRfX3ZhbHVlLm1vZGlmaWVkID4gKjpmaXJzdC1jaGlsZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmJjMDA1MjtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuLnZkLmlzLXNwZWNpYWwgLnZkX19sYWJlbCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiAjMzMzO1xufVxuLnZkLmlzLXNwZWNpYWwgLnZkX192YWx1ZSB7XG4gIGNvbG9yOiAjOTk5O1xufVxuLnZkIC52ZF9faW5jciB7XG4gIGdyaWQtYXJlYTogaW5jcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDAgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDhweCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzMzMyAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjZlM2I2ICFpbXBvcnRhbnQ7XG59XG4udmQgLnZkX19kZWNyIHtcbiAgZ3JpZC1hcmVhOiBkZWNyO1xuICBjb2xvcjogIzMzMyAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFjOWM5ICFpbXBvcnRhbnQ7XG59XG4udmQgLnZkX19pbmNyLFxuLnZkIC52ZF9fZGVjciB7XG4gIGZvbnQtc2l6ZTogMWVtO1xuICB3aWR0aDogMmVtO1xuICBoZWlnaHQ6IDJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXdlaWdodDogOTAwO1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMwMDAgIWltcG9ydGFudDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi52ZCAudmRfX2luY3I6Zmlyc3QtY2hpbGQsXG4udmQgLnZkX19kZWNyOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyLXJhZGl1czogMCA4cHggMCAwO1xufVxuLnZkIC52ZF9fbGFiZWwge1xuICBncmlkLWFyZWE6IGxhYmVsO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxLjc1ZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMC4yNWVtO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMwMDA7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCA2cHggNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjO1xuICBmb250LXNpemU6IDAuODVlbTtcbn1cbi5uZWVkZWQge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzc3NztcbiAgY29sb3I6ICM3Nzc7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/shared/value-display/value-display.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/value-display/value-display.component.ts ***!
  \*****************************************************************/
/*! exports provided: ValueDisplayComponent, XPValueDisplayComponent, SidebagValueDisplayComponent, ValueDisplayWithMaxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueDisplayComponent", function() { return ValueDisplayComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XPValueDisplayComponent", function() { return XPValueDisplayComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebagValueDisplayComponent", function() { return SidebagValueDisplayComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueDisplayWithMaxComponent", function() { return ValueDisplayWithMaxComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _keypad_keypad_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../keypad/keypad.component */ "./src/app/shared/keypad/keypad.component.ts");




let ValueDisplayComponent = class ValueDisplayComponent {
    constructor(dialog) {
        this.value = 0;
        this.canAdjust = true;
        this.min = 0;
        this.step = 1;
        this.special = false;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.computed = 0;
        this.options = { min: 0 };
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        if (typeof (this.canAdjust) === 'undefined')
            this.canAdjust = true;
        this.applyModifiers();
        // console.log(this.label + ": " + this.value + " + " + modifier + " = " + this.computed + " (" + this.isModified() + ")");
    }
    ngOnChanges(changes) {
        // console.log("VD.ngOnChanges (" + this.label + "): " + JSON.stringify(changes.value) + " / " + changes.modifiers);
        if (changes.value && !changes.value.firstChange) {
            this.onValueChange(changes.value.currentValue);
        }
        else if (changes.modifiers) {
            this.onValueChange(this.value);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
    onValueChange(newValue) {
        // console.log("VD.onValueChange() - new '" + newValue + "' vs current '" + this.value + "'");
        if (this.value !== newValue * 1)
            this.value = newValue * 1;
        this.options.valueSize = (this.value > 999) ? 'sm' : null;
        this.applyModifiers();
    }
    isModified() {
        return !!this.modifiers;
    }
    applyModifiers() {
        let modifier = this.modifiers ? this.modifiers.value * 1 : 0;
        if (modifier) {
            this.computed = this.value * 1 + modifier;
        }
        else {
            this.computed = this.value * 1;
        }
    }
    increment() {
        if (!this.canIncrement())
            return;
        this.onValueChange(this.value * 1 + this.step * 1);
        this.onSave.emit({ label: this.label, value: this.value });
    }
    decrement() {
        if (!this.canDecrement())
            return;
        this.onValueChange(this.value * 1 - this.step * 1);
        this.onSave.emit({ label: this.label, value: this.value });
    }
    canIncrement() {
        return !this.options ||
            typeof (this.options.max) === 'undefined' ||
            this.value * 1 < this.options.max * 1;
    }
    canDecrement() {
        return !this.options ||
            typeof (this.options.min) === 'undefined' ||
            this.value * 1 > this.options.min * 1;
    }
    getKeypadOpts() {
        return {
            data: {
                visible: true,
                value: this.computed,
                modifiers: this.modifiers
            }
        };
    }
    openKeypad() {
        let opts = this.getKeypadOpts();
        const dialogRef = this.dialog.open(_keypad_keypad_component__WEBPACK_IMPORTED_MODULE_3__["KeypadComponent"], opts);
        this.subscription = dialogRef.afterClosed().subscribe((result) => {
            this.onKeypadChange(result);
            this.subscription.unsubscribe();
            this.subscription = null;
        });
    }
    onKeypadChange(result) {
        if (!isNaN(result)) {
            let current = this.applyKeypadChange(result * 1);
            try {
                this.onValueChange(current);
            }
            catch (e) {
                console.log("VD keypad - Error changing value: " + e.message);
            }
            try {
                this.onSave.emit({ label: this.label, value: this.value });
            }
            catch (e) {
                console.log("VD keypad - Error emitting save event " + e.message);
            }
        }
    }
    applyKeypadChange(change) {
        let current = this.value * 1;
        current += change - this.computed;
        return current;
    }
};
ValueDisplayComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ValueDisplayComponent.prototype, "value", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ValueDisplayComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], ValueDisplayComponent.prototype, "label", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
], ValueDisplayComponent.prototype, "canAdjust", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ValueDisplayComponent.prototype, "min", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ValueDisplayComponent.prototype, "max", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ValueDisplayComponent.prototype, "step", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
], ValueDisplayComponent.prototype, "special", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ValueDisplayComponent.prototype, "onSave", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ValueDisplayComponent.prototype, "options", void 0);
ValueDisplayComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'value-display',
        template: __webpack_require__(/*! raw-loader!./value-display.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/value-display/value-display.component.html"),
        styles: [__webpack_require__(/*! ./value-display.component.less */ "./src/app/shared/value-display/value-display.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], ValueDisplayComponent);

let XPValueDisplayComponent = class XPValueDisplayComponent extends ValueDisplayComponent {
    constructor() {
        super(...arguments);
        this.needed = 9999;
        this.onLevel = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    hasLeveled() {
        return this.value >= this.needed;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], XPValueDisplayComponent.prototype, "needed", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], XPValueDisplayComponent.prototype, "onLevel", void 0);
XPValueDisplayComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'xp-value-display',
        template: __webpack_require__(/*! raw-loader!./xp-value-display.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/shared/value-display/xp-value-display.component.html"),
        styles: [__webpack_require__(/*! ./value-display.component.less */ "./src/app/shared/value-display/value-display.component.less")]
    })
], XPValueDisplayComponent);

let SidebagValueDisplayComponent = class SidebagValueDisplayComponent extends ValueDisplayComponent {
    constructor() {
        super(...arguments);
        this.weight = 0;
        this.onLevel = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], SidebagValueDisplayComponent.prototype, "weight", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], SidebagValueDisplayComponent.prototype, "onLevel", void 0);
SidebagValueDisplayComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'sidebag-value-display',
        template: `
    <div class="vd">
        <div class="vd__value" [ngClass]="{modified:isModified()}"
            (click)="openKeypad()">
            <div>
                <div class="m-grid flex-col flex-align-center no-pad">
                    {{weight}}
                    <div class="needed u-xs">{{value}}</div>
                </div>
            </div>
        </div>
        <button type="button" class="vd__incr" (click)="increment()"
            (ngDisabled)="!canAdjust || !canIncrement()">
            <mat-icon>add</mat-icon>
        </button>
        <button type="button" class="vd__decr" (click)="decrement()"
            (ngDisabled)="!canAdjust || !canDecrement()">
            <mat-icon>remove</mat-icon>
        </button>
        <div class="vd__label" [ngClass]="{'u-sm':'sm'===options.labelSize}">
            {{label}}
        </div>
    </div>
    `,
        styles: [__webpack_require__(/*! ./value-display.component.less */ "./src/app/shared/value-display/value-display.component.less")]
    })
], SidebagValueDisplayComponent);

let ValueDisplayWithMaxComponent = class ValueDisplayWithMaxComponent extends ValueDisplayComponent {
    constructor() {
        super(...arguments);
        this.max = 0;
    }
    /** @override */
    applyModifiers() {
        let modifier = this.modifiers ? this.modifiers.value * 1 : 0;
        if (modifier) {
            this.computed = this.max * 1 + modifier;
        }
        else {
            this.computed = this.max * 1;
        }
    }
    /** @override */
    getKeypadOpts() {
        return {
            data: {
                visible: true,
                value: this.value
            }
        };
    }
    /** @override */
    applyKeypadChange(change) {
        let current = this.value * 1;
        current += change - this.value;
        return current;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ValueDisplayWithMaxComponent.prototype, "max", void 0);
ValueDisplayWithMaxComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'value-display-with-max',
        template: `
    <div class="vd">
        <div class="vd__value" [ngClass]="{modified:isModified()}"
            (click)="openKeypad()">
            <div>
                <div class="m-grid flex-col flex-align-center no-pad">
                    {{value}}
                    <div class="needed u-xs">{{computed}}</div>
                </div>
            </div>
        </div>
        <button type="button" class="vd__incr" (click)="increment()"
            (ngDisabled)="!canAdjust || !canIncrement()">
            <mat-icon>add</mat-icon>
        </button>
        <button type="button" class="vd__decr" (click)="decrement()"
            (ngDisabled)="!canAdjust || !canDecrement()">
            <mat-icon>remove</mat-icon>
        </button>
        <div class="vd__label" [ngClass]="{'u-sm':'sm'===options.labelSize}">
            {{label}}
        </div>
    </div>
    `,
        styles: [__webpack_require__(/*! ./value-display.component.less */ "./src/app/shared/value-display/value-display.component.less")]
    })
], ValueDisplayWithMaxComponent);



/***/ }),

/***/ "./src/app/sidebag/sidebag.component.less":
/*!************************************************!*\
  !*** ./src/app/sidebag/sidebag.component.less ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 0.5em 0.5em;\n}\n/* Sidebag */\n.sidebag__option {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  flex-basis: 100%;\n  flex-wrap: wrap;\n  margin: 1em;\n}\n.sidebag__option .sprite {\n  margin-right: 1em;\n}\n.sidebag__option label {\n  -webkit-box-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.sidebag__option .sidebag__control {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\n.sidebag__option .help-block {\n  flex-basis: 100%;\n}\n.sidebag__option .input-group {\n  width: 128px;\n}\n.sidebag__option .input-group-btn .btn {\n  opacity: 0.75;\n}\n.option__display {\n  display: inline-block;\n  width: 32px;\n  text-align: center;\n  background: #fff;\n  border-top: 1px solid #ccc;\n  border-bottom: 1px solid #ccc;\n  padding: 0.3em 0;\n}\n.sidebag__option .btn:not(:last-child) {\n  border-radius: 4px 0 0 4px;\n  background-color: #eee;\n}\n.sidebag__option .btn:last-child {\n  border-radius: 0 4px 4px 0;\n  background-color: #ccc;\n}\n.sidebag__carrying {\n  font-size: 1.5em;\n  width: 2em;\n  height: 2em;\n  text-align: center;\n  border-radius: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  color: #666;\n  /* background: #eee; */\n  /* border: 1px solid #ccc; */\n}\n.sidebag__control {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.sidebag__control > * {\n  font-weight: 700;\n  text-align: center;\n  width: 2em;\n  min-width: 2em;\n  padding: 0.25em 0;\n  line-height: 1em;\n}\n.sidebag__control > :not(button) {\n  background-color: #fff;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc2lkZWJhZy9zaWRlYmFnLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9zaWRlYmFnL3NpZGViYWcuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FDQ0o7QUFDQSxZQUFZO0FERVo7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUNBSjtBRFBBO0VBU2MsaUJBQUE7QUNDZDtBRFlBO0VBQ0ksbUJBQUE7VUFBQSxPQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtBQ1ZKO0FEYUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7QUNYSjtBRGFBO0VBQStCLGdCQUFBO0FDVi9CO0FEWUE7RUFDSSxZQUFBO0FDVko7QURZQTtFQUNJLGFBQUE7QUNWSjtBRGFBO0VBQ0kscUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQkFBQTtBQ1hKO0FEYUE7RUFDSSwwQkFBQTtFQUNBLHNCQUFBO0FDWEo7QURhQTtFQUNJLDBCQUFBO0VBQ0Esc0JBQUE7QUNYSjtBRGNBO0VBQ0ksZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFdBQUE7RUNaRixzQkFBc0I7RUFDdEIsNEJBQTRCO0FBQzlCO0FEZUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDYko7QURlSTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUNiUjtBRGVJO0VBQW1CLHNCQUFBO0FDWnZCIiwiZmlsZSI6InNyYy9hcHAvc2lkZWJhZy9zaWRlYmFnLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIHBhZGRpbmc6IDAuNWVtIDAuNWVtO1xufVxuXG4vKiBTaWRlYmFnICovXG4uc2lkZWJhZ19fb3B0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZmxleC1iYXNpczogMTAwJTtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgbWFyZ2luOiAxZW07XG5cbiAgICAuc3ByaXRlIHsgbWFyZ2luLXJpZ2h0OiAxZW07IH1cbn1cbi8vIEBtZWRpYShtaW4td2lkdGg6IDc2OHB4KSB7XG4vLyAgICAgLnNpZGViYWdfX29wdGlvbiB7XG4vLyAgICAgICAgIGZsZXgtYmFzaXM6IDQ1JTtcbi8vICAgICB9XG4vLyB9XG4vLyBAbWVkaWEobWluLXdpZHRoOiA5OTJweCkge1xuLy8gICAgIC5zaWRlYmFnX19vcHRpb24ge1xuLy8gICAgICAgICBmbGV4LWJhc2lzOiAzMCU7XG4vLyAgICAgfVxuLy8gfVxuXG4uc2lkZWJhZ19fb3B0aW9uIGxhYmVsIHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNpZGViYWdfX29wdGlvbiAuc2lkZWJhZ19fY29udHJvbCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuLnNpZGViYWdfX29wdGlvbiAuaGVscC1ibG9jayB7IGZsZXgtYmFzaXM6IDEwMCU7IH1cblxuLnNpZGViYWdfX29wdGlvbiAuaW5wdXQtZ3JvdXAge1xuICAgIHdpZHRoOiAxMjhweDtcbn1cbi5zaWRlYmFnX19vcHRpb24gLmlucHV0LWdyb3VwLWJ0biAuYnRuIHtcbiAgICBvcGFjaXR5OiAwLjc1O1xufVxuXG4ub3B0aW9uX19kaXNwbGF5IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDMycHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gICAgcGFkZGluZzogMC4zZW0gMDtcbn1cbi5zaWRlYmFnX19vcHRpb24gLmJ0bjpub3QoOmxhc3QtY2hpbGQpIHtcbiAgICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xufVxuLnNpZGViYWdfX29wdGlvbiAuYnRuOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDAgNHB4IDRweCAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG59XG5cbi5zaWRlYmFnX19jYXJyeWluZyB7XG4gICAgZm9udC1zaXplOiAxLjVlbTtcbiAgICB3aWR0aDogMmVtO1xuICAgIGhlaWdodDogMmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjb2xvcjogIzY2NjtcbiAgICAvKiBiYWNrZ3JvdW5kOiAjZWVlOyAqL1xuICAgIC8qIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7ICovXG59XG5cbi5zaWRlYmFnX19jb250cm9sIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAmID4gKiB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xuICAgICAgICB3aWR0aDogMmVtO1xuICAgICAgICBtaW4td2lkdGg6IDJlbTtcbiAgICAgICAgcGFkZGluZzogMC4yNWVtIDA7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgfVxuICAgICYgPiA6bm90KGJ1dHRvbikgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XG4gICAgLy8gJiA+IGJ1dHRvbiB7XG4gICAgLy8gICAgIGhlaWdodDogMmVtO1xuICAgIC8vICAgICBib3JkZXItY29sb3I6ICM2NjY7XG4gICAgLy8gICAgIGNvbG9yOiAjMDAwO1xuICAgIC8vXG4gICAgLy8gICAgICYuYnRuLS1kZWwgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFjOWM5OyB9XG4gICAgLy8gICAgICYuYnRuLS11c2UgeyBiYWNrZ3JvdW5kLWNvbG9yOiAjYjZlM2I2OyB9XG4gICAgLy8gfVxuXG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiAwLjVlbSAwLjVlbTtcbn1cbi8qIFNpZGViYWcgKi9cbi5zaWRlYmFnX19vcHRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtYmFzaXM6IDEwMCU7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luOiAxZW07XG59XG4uc2lkZWJhZ19fb3B0aW9uIC5zcHJpdGUge1xuICBtYXJnaW4tcmlnaHQ6IDFlbTtcbn1cbi5zaWRlYmFnX19vcHRpb24gbGFiZWwge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnNpZGViYWdfX29wdGlvbiAuc2lkZWJhZ19fY29udHJvbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG4uc2lkZWJhZ19fb3B0aW9uIC5oZWxwLWJsb2NrIHtcbiAgZmxleC1iYXNpczogMTAwJTtcbn1cbi5zaWRlYmFnX19vcHRpb24gLmlucHV0LWdyb3VwIHtcbiAgd2lkdGg6IDEyOHB4O1xufVxuLnNpZGViYWdfX29wdGlvbiAuaW5wdXQtZ3JvdXAtYnRuIC5idG4ge1xuICBvcGFjaXR5OiAwLjc1O1xufVxuLm9wdGlvbl9fZGlzcGxheSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDMycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAwLjNlbSAwO1xufVxuLnNpZGViYWdfX29wdGlvbiAuYnRuOm5vdCg6bGFzdC1jaGlsZCkge1xuICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbn1cbi5zaWRlYmFnX19vcHRpb24gLmJ0bjpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG59XG4uc2lkZWJhZ19fY2Fycnlpbmcge1xuICBmb250LXNpemU6IDEuNWVtO1xuICB3aWR0aDogMmVtO1xuICBoZWlnaHQ6IDJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6ICM2NjY7XG4gIC8qIGJhY2tncm91bmQ6ICNlZWU7ICovXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7ICovXG59XG4uc2lkZWJhZ19fY29udHJvbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uc2lkZWJhZ19fY29udHJvbCA+ICoge1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAyZW07XG4gIG1pbi13aWR0aDogMmVtO1xuICBwYWRkaW5nOiAwLjI1ZW0gMDtcbiAgbGluZS1oZWlnaHQ6IDFlbTtcbn1cbi5zaWRlYmFnX19jb250cm9sID4gOm5vdChidXR0b24pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/sidebag/sidebag.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sidebag/sidebag.component.ts ***!
  \**********************************************/
/*! exports provided: SidebagComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebagComponent", function() { return SidebagComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SidebagComponent = class SidebagComponent {
    constructor() {
        this.hasDynamiteSatchel = false;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.carrying = 0;
        this.max = 0;
        this.showDesc = {};
        this.options = [
            { label: "bandages", description: "discard to heal D6 wounds from yourself or adjacent hero" },
            { label: "whiskey", description: "discard to heal D6 sanity from yourself or adjacent hero" },
            { label: "tonic", description: "discard to gain 1 grit" },
            { label: "herbs", description: "discard to heal 2D6 wounds from yourself or adjacent hero" },
            { label: "dynamite", description: "ranged attack; range: strength +3, does D6 wounds ignoring defense to each model in same and adjacent spaces" },
            { label: "flash", description: "discard to make all enemies -2 initiative until the end of the turn" },
            { label: "fungus", description: "discard to heal D6 wounds and D6 sanity from yourself or adjacent hero" },
            { label: "spices", description: "discard to add D3 damage to one hit and gain 1 wound ignoring defense" },
            { label: "potions", description: "discard to add +2 to one of your skills until end of the turn" },
            { label: "hatchets", description: "free ranged attack; range strength +3, shots 1, +2 damage. uses melee to hit" },
            { label: "lanternOil", description: "discard to re-roll one of the hold back the darkness dice" },
            { label: "exoticHerbs", description: "discard to remove D3 corruption points" },
            { label: "tequila", description: "discard to heal 2D6 sanity from yourself or adjacent hero" },
            { label: "cigars", description: "discard to gain armor 3+ until the end of the turn" },
            { label: "shatterGrenade", description: "discard to throw like Dynamite. Any model hit takes D3 Wounds ignoring Defense and gains a Stunned token (-1 Defense). At the start of activation, remove 1 Stunned marker on a roll of 4+." },
            { label: "antiRad", description: "discard to remove D6 Corruption Points" },
            { label: "junkBomb", description: "(free attack) discard to Throw and Bounce like Dynamite. All models in the same and adjacent spaces take 2D6-5 Wounds, ignoring Defense" },
            { label: "nectar", description: "discard to Recover D3 Grit" },
            { label: "stake", description: "(free attack) discard for Combat 1. Critical Hit on 5 or 6. +1 Damage vs Beast or Undead Enemy or +2 Damage vs Vampire Enemy" },
            { label: "sake", description: "Discard to Heal D6 Sanity Damage." },
            { label: "fireSake", description: "Discard to immediately gain D3 Fury Tokens (Samurai Only)" },
            { label: "strongSake", description: "Discard to Heal 2D6 Sanity Damage" },
            { label: "bomb", description: "Discard to throw as a Ranged Attack. Range: Strength+3, Does D6 Wounds, ignoring Defense, to each model in the same and adjacent spaces. Any Corpse Token in the affected area is also removed." }
        ];
    }
    ngOnInit() {
        this.max = this.getAvailableSidebagCapacity();
    }
    ngDoCheck() {
        if (!this.sidebag)
            return;
        //check to see if the load in the sidebag is the same as the previously
        // computed "carrying" value from the last time a change was detected.
        // If so, the "quick" sidebag on the overview page must have been fired
        // so the value display at the top of this view needs to be updated to
        // reflect new counts.
        let count = Object.keys(this.sidebag)
            .map(key => this.sidebag[key])
            .filter(v => 'capacity' !== v)
            .length;
        if (count !== this.carrying) {
            // console.log("Sidebag changed");
            this.max = this.getAvailableSidebagCapacity();
        }
    }
    ngOnChanges(changes) {
        if (changes && changes.hasDynamiteSatchel) {
            let prev = changes.hasDynamiteSatchel.previousValue;
            let curr = changes.hasDynamiteSatchel.currentValue;
            if (prev !== curr) {
                this.getAvailableSidebagCapacity();
            }
        }
        // else if(changes && changes.sidebag) {
        //     console.log("Sidebag changed");
        //     this.max = this.getAvailableSidebagCapacity();
        // }
    }
    save() {
        this.onSave.emit({ type: "sidebag" });
        this.max = this.getAvailableSidebagCapacity();
    }
    getAvailableSidebagCapacity() {
        if (!this.sidebag)
            return 0;
        let carrying = 0;
        for (var i = 0; i < this.options.length; ++i) {
            let option = this.options[i];
            let amount = this.sidebag[option.label] || 0;
            if ('dynamite' === option.label && this.hasDynamiteSatchel) {
                //if hero has dynamiteSatchel equipped,
                // ignore the first five dynamite tokens
                amount = Math.max(0, amount - 5);
            }
            carrying += amount;
        }
        this.carrying = carrying;
        let remaining = this.sidebag.capacity - carrying;
        if (this.modifiers) {
            //adjust for modified carrying capacity
            remaining += (this.modifiers.value || 0);
        }
    }
    updateCapacity($event) {
        this.save();
    }
    increase(option) {
        if (this.getAvailableSidebagCapacity() < 1)
            return;
        var value = this.sidebag[option] || 0;
        value += 1;
        this.sidebag[option] = value;
        this.save();
    }
    decrease(option) {
        var value = this.sidebag[option] || 0;
        if (value > 0) {
            value -= 1;
            this.sidebag[option] = value;
            this.save();
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SidebagComponent.prototype, "sidebag", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SidebagComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
], SidebagComponent.prototype, "hasDynamiteSatchel", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], SidebagComponent.prototype, "onSave", void 0);
SidebagComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'sidebag',
        template: __webpack_require__(/*! raw-loader!./sidebag.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/sidebag/sidebag.component.html"),
        styles: [__webpack_require__(/*! ./sidebag.component.less */ "./src/app/sidebag/sidebag.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SidebagComponent);



/***/ }),

/***/ "./src/app/special/gambler-tricks/chooser/chooser.component.less":
/*!***********************************************************************!*\
  !*** ./src/app/special/gambler-tricks/chooser/chooser.component.less ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9nYW1ibGVyLXRyaWNrcy9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3NwZWNpYWwvZ2FtYmxlci10cmlja3MvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9zcGVjaWFsL2dhbWJsZXItdHJpY2tzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/special/gambler-tricks/chooser/chooser.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/special/gambler-tricks/chooser/chooser.component.ts ***!
  \*********************************************************************/
/*! exports provided: GamblerTricksChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamblerTricksChooserComponent", function() { return GamblerTricksChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let GamblerTricksChooserComponent = class GamblerTricksChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.selection = null;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.selection = null;
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection.name === value.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
GamblerTricksChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
GamblerTricksChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'gambler-tricks-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/gambler-tricks/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/special/gambler-tricks/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], GamblerTricksChooserComponent);



/***/ }),

/***/ "./src/app/special/gambler-tricks/gambler-tricks.component.less":
/*!**********************************************************************!*\
  !*** ./src/app/special/gambler-tricks/gambler-tricks.component.less ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0em 0.5em 1em;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9nYW1ibGVyLXRyaWNrcy9nYW1ibGVyLXRyaWNrcy5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3BlY2lhbC9nYW1ibGVyLXRyaWNrcy9nYW1ibGVyLXRyaWNrcy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBRUEsZ0JBQUE7RUFDQSxzQkFBQTtBQ0FKO0FER0E7OztFQUNJLFNBQUE7QUNDSjtBREVBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL3NwZWNpYWwvZ2FtYmxlci10cmlja3MvZ2FtYmxlci10cmlja3MuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cblxuaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cbmgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbjogMDtcbn1cbi5jYXJkIC5kZXNjIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/special/gambler-tricks/gambler-tricks.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/special/gambler-tricks/gambler-tricks.component.ts ***!
  \********************************************************************/
/*! exports provided: GamblerTricksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamblerTricksComponent", function() { return GamblerTricksComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/special/gambler-tricks/chooser/chooser.component.ts");





let GamblerTricksComponent = class GamblerTricksComponent {
    constructor(afs, dialog) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.maxFortune = 0;
        this.confirming = {};
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        this.maxFortune = this.maxFortune || this.character.fortune.max;
    }
    ngOnChanges(changes) {
        if (changes.modifiers) {
            this.maxFortune = this.character.fortune.max;
            let mod = changes.modifiers.currentValue;
            if (mod && !isNaN(mod.value))
                this.maxFortune += (mod.value * 1);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.character = null;
        this.modifiers = null;
        this.maxFortune = null;
        this.afs = null;
    }
    add(trick) {
        this.character.tricks.push(trick);
        this.onSave.emit({ type: "gamblerTrick", value: trick });
    }
    remove(index) {
        if (index >= 0) {
            delete this.confirming[index];
            let rem = this.character.tricks.splice(index, 1);
            this.onSave.emit({ type: "gamblerTrick", value: rem });
        }
    }
    gainXP(amount) {
        if (amount) {
            this.character.xp += amount * 1;
            this.onSave.emit({});
        }
    }
    hasFortune() {
        return this.character.fortune.current > 0;
    }
    spendFortune() {
        if (this.character.fortune.current > 0) {
            this.character.fortune.current -= 1;
            this.onSave.emit({});
        }
    }
    resetFortune() {
        this.character.fortune.current = this.maxFortune;
        this.onSave.emit({});
    }
    getAvailableTricks() {
        let takenNames = (this.character.tricks || []).map(a => a.name);
        return this.afs.getGamblerTricks().then((tricks) => {
            return tricks.filter(a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    }
    openChooser() {
        this.getAvailableTricks().then(options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["GamblerTricksChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
    }
    confirmingDelete(index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    }
};
GamblerTricksComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], GamblerTricksComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], GamblerTricksComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], GamblerTricksComponent.prototype, "onSave", void 0);
GamblerTricksComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'gambler-tricks',
        template: __webpack_require__(/*! raw-loader!./gambler-tricks.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/gambler-tricks/gambler-tricks.component.html"),
        styles: [__webpack_require__(/*! ./gambler-tricks.component.less */ "./src/app/special/gambler-tricks/gambler-tricks.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], GamblerTricksComponent);



/***/ }),

/***/ "./src/app/special/notes/notes.component.less":
/*!****************************************************!*\
  !*** ./src/app/special/notes/notes.component.less ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 0.5em 1em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9ub3Rlcy9ub3Rlcy5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3BlY2lhbC9ub3Rlcy9ub3Rlcy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3NwZWNpYWwvbm90ZXMvbm90ZXMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMC41ZW0gMWVtO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMC41ZW0gMWVtO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/special/notes/notes.component.ts":
/*!**************************************************!*\
  !*** ./src/app/special/notes/notes.component.ts ***!
  \**************************************************/
/*! exports provided: NotesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotesComponent", function() { return NotesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let NotesComponent = class NotesComponent {
    constructor() {
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.needsSaving = false;
    }
    ngOnInit() { }
    saveChanges() {
        this.onSave.emit({ type: 'notes', value: this.notes });
        this.needsSaving = false;
    }
    onValueChange(change) {
        this.needsSaving = true;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], NotesComponent.prototype, "notes", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], NotesComponent.prototype, "onSave", void 0);
NotesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'char-notes',
        template: __webpack_require__(/*! raw-loader!./notes.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/notes/notes.component.html"),
        styles: [__webpack_require__(/*! ./notes.component.less */ "./src/app/special/notes/notes.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], NotesComponent);



/***/ }),

/***/ "./src/app/special/orphan-missions/chooser/chooser.component.less":
/*!************************************************************************!*\
  !*** ./src/app/special/orphan-missions/chooser/chooser.component.less ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9vcnBoYW4tbWlzc2lvbnMvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9zcGVjaWFsL29ycGhhbi1taXNzaW9ucy9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL3NwZWNpYWwvb3JwaGFuLW1pc3Npb25zL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/special/orphan-missions/chooser/chooser.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/special/orphan-missions/chooser/chooser.component.ts ***!
  \**********************************************************************/
/*! exports provided: OrphanMissionsChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrphanMissionsChooserComponent", function() { return OrphanMissionsChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let OrphanMissionsChooserComponent = class OrphanMissionsChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.selection = null;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.selection = null;
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection.name === value.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
OrphanMissionsChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
OrphanMissionsChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'samurai-tactics-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/orphan-missions/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/special/orphan-missions/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], OrphanMissionsChooserComponent);



/***/ }),

/***/ "./src/app/special/orphan-missions/orphan-missions.component.less":
/*!************************************************************************!*\
  !*** ./src/app/special/orphan-missions/orphan-missions.component.less ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0em 0.5em 1em;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9vcnBoYW4tbWlzc2lvbnMvb3JwaGFuLW1pc3Npb25zLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9zcGVjaWFsL29ycGhhbi1taXNzaW9ucy9vcnBoYW4tbWlzc2lvbnMuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUVBLGdCQUFBO0VBQ0Esc0JBQUE7QUNBSjtBREdBOzs7RUFDSSxTQUFBO0FDQ0o7QURFQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9zcGVjaWFsL29ycGhhbi1taXNzaW9ucy9vcnBoYW4tbWlzc2lvbnMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cblxuaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cbmgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbjogMDtcbn1cbi5jYXJkIC5kZXNjIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/special/orphan-missions/orphan-missions.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/special/orphan-missions/orphan-missions.component.ts ***!
  \**********************************************************************/
/*! exports provided: OrphanMissionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrphanMissionsComponent", function() { return OrphanMissionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/special/orphan-missions/chooser/chooser.component.ts");





let OrphanMissionsComponent = class OrphanMissionsComponent {
    constructor(afs, dialog) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.confirming = {};
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.afs = null;
    }
    add(mission) {
        this.character.missions.push(mission);
        this.onSave.emit({});
    }
    remove(index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.missions.splice(index, 1);
            this.onSave.emit({});
        }
    }
    getAvailable() {
        let takenNames = (this.character.missions || []).map(a => a.name);
        return this.afs.getOrphanMissions().then((missions) => {
            return missions.filter(a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    }
    openChooser() {
        this.getAvailable().then(options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["OrphanMissionsChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
        // const ref = this.modalService.createComponentRef(OrphanMissionsChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as OrphanMission);
        //     }
        // };
        //
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        //
        // this.getAvailable().then( options => {
        //     ref.instance.options = options;
        // });
    }
    confirmingDelete(index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    }
};
OrphanMissionsComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], OrphanMissionsComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], OrphanMissionsComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], OrphanMissionsComponent.prototype, "onSave", void 0);
OrphanMissionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'orphan-missions',
        template: __webpack_require__(/*! raw-loader!./orphan-missions.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/orphan-missions/orphan-missions.component.html"),
        styles: [__webpack_require__(/*! ./orphan-missions.component.less */ "./src/app/special/orphan-missions/orphan-missions.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], OrphanMissionsComponent);



/***/ }),

/***/ "./src/app/special/preacher-sermons/chooser/chooser.component.less":
/*!*************************************************************************!*\
  !*** ./src/app/special/preacher-sermons/chooser/chooser.component.less ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9wcmVhY2hlci1zZXJtb25zL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3BlY2lhbC9wcmVhY2hlci1zZXJtb25zL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvc3BlY2lhbC9wcmVhY2hlci1zZXJtb25zL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/special/preacher-sermons/chooser/chooser.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/special/preacher-sermons/chooser/chooser.component.ts ***!
  \***********************************************************************/
/*! exports provided: SermonsChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SermonsChooserComponent", function() { return SermonsChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let SermonsChooserComponent = class SermonsChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.options = [];
        this.selection = null;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.data && this.data.options) {
            this.options = this.data.options;
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.options = null;
        this.selection = null;
        this.data = null;
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection.name === value.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
SermonsChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
SermonsChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'preacher-spells-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/preacher-sermons/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/special/preacher-sermons/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], SermonsChooserComponent);



/***/ }),

/***/ "./src/app/special/preacher-sermons/sermon/sermon.component.less":
/*!***********************************************************************!*\
  !*** ./src/app/special/preacher-sermons/sermon/sermon.component.less ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3,\nh4,\nh5 {\n  margin-top: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9wcmVhY2hlci1zZXJtb25zL3Nlcm1vbi9zZXJtb24uY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3NwZWNpYWwvcHJlYWNoZXItc2VybW9ucy9zZXJtb24vc2VybW9uLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFDSSxhQUFBO0FDR0o7QURBQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9zcGVjaWFsL3ByZWFjaGVyLXNlcm1vbnMvc2VybW9uL3Nlcm1vbi5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbImgzLCBoNCwgaDUge1xuICAgIG1hcmdpbi10b3A6IDA7XG59XG5cbi5jYXJkIC5kZXNjIHtcbiAgICBmb250LXNpemU6IDAuODc1ZW07XG4gICAgY29sb3I6ICM1NTU7XG4gICAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbiIsImgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG4uY2FyZCAuZGVzYyB7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgY29sb3I6ICM1NTU7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/special/preacher-sermons/sermon/sermon.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/special/preacher-sermons/sermon/sermon.component.ts ***!
  \*********************************************************************/
/*! exports provided: PreacherSermonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreacherSermonComponent", function() { return PreacherSermonComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



;
function applyFlag(sermon, flag) {
    sermon.status |= flag;
    // console.log(sermon.name + ": " + sermon.status);
}
function removeFlag(sermon, flag) {
    sermon.status &= ~flag;
}
function hasFlag(sermon, flag) {
    return sermon.status & flag;
}
let PreacherSermonComponent = class PreacherSermonComponent {
    constructor() {
        this.availableFaith = 0;
        this.onEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isEditing = false;
        this.confirmingDelete = false;
    }
    ngOnInit() {
        this.eventSubject.subscribe(event => {
            this.handleEvent(event);
        });
    }
    ngOnChanges(changes) {
        if (changes.availableFaith) {
            let faith = changes.availableFaith.currentValue;
            let cost = isNaN(this.sermon.cost) ? -1 : this.sermon.cost;
            if (faith <= 0) {
                applyFlag(this.sermon, 1 /* empty */);
            }
            else {
                removeFlag(this.sermon, 1 /* empty */);
            }
            if (cost > 0 && faith < cost) {
                applyFlag(this.sermon, 2 /* insufficient */);
            }
            else {
                removeFlag(this.sermon, 2 /* insufficient */);
            }
        }
    }
    use() {
        applyFlag(this.sermon, 4 /* cast */);
        if (this.onEvent)
            this.onEvent.emit({ name: 'faith:spent', value: this.sermon.cost });
    }
    spendExtraFaith() {
        if (this.onEvent)
            this.onEvent.emit({ name: 'faith:spent', value: 1 });
    }
    applyXP() {
        applyFlag(this.sermon, 8 /* xp */);
        if (this.onEvent)
            this.onEvent.emit({ name: 'xp:gained', value: this.sermon.xp });
    }
    edit() {
        this.editable = JSON.parse(JSON.stringify(this.sermon));
        this.isEditing = true;
    }
    cancelEditing() {
        this.isEditing = false;
        this.editable = null;
    }
    save() {
        Object.assign(this.sermon, this.editable);
        this.isEditing = false;
        this.editable = null;
    }
    remove() {
        if (this.onEvent)
            this.onEvent.emit({ name: 'sermon:removed', value: this.sermon });
    }
    canCast() {
        return !hasFlag(this.sermon, 4 /* cast */) &&
            !hasFlag(this.sermon, 1 /* empty */) &&
            !hasFlag(this.sermon, 2 /* insufficient */);
    }
    hasCast() {
        return (this.sermon.status & 4 /* cast */);
    }
    canSpendExtraFaith() {
        return hasFlag(this.sermon, 4 /* cast */) && !hasFlag(this.sermon, 1 /* empty */);
    }
    canApplyXP() {
        return hasFlag(this.sermon, 4 /* cast */) && !hasFlag(this.sermon, 8 /* xp */);
    }
    xpApplied() {
        return (this.sermon.status & 8 /* xp */);
    }
    isInsufficient() {
        return hasFlag(this.sermon, 1 /* empty */) ||
            (hasFlag(this.sermon, 2 /* insufficient */) &&
                !hasFlag(this.sermon, 4 /* cast */));
    }
    clearFlags() {
        this.sermon.status = 0;
    }
    handleEvent(event) {
        let name = event.name;
        switch (name) {
            case 'sermons:reset':
                this.clearFlags();
                break;
            case 'faith:available':
                let faith = event.value;
                if (faith < this.sermon.cost)
                    applyFlag(this.sermon, 2 /* insufficient */);
                else
                    removeFlag(this.sermon, 2 /* insufficient */);
                break;
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], PreacherSermonComponent.prototype, "sermon", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], PreacherSermonComponent.prototype, "availableFaith", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"])
], PreacherSermonComponent.prototype, "eventSubject", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], PreacherSermonComponent.prototype, "onEvent", void 0);
PreacherSermonComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'sermon',
        template: __webpack_require__(/*! raw-loader!./sermon.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/preacher-sermons/sermon/sermon.component.html"),
        styles: [__webpack_require__(/*! ./sermon.component.less */ "./src/app/special/preacher-sermons/sermon/sermon.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PreacherSermonComponent);



/***/ }),

/***/ "./src/app/special/preacher-sermons/sermons.component.less":
/*!*****************************************************************!*\
  !*** ./src/app/special/preacher-sermons/sermons.component.less ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0em 0.5em 1em;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9wcmVhY2hlci1zZXJtb25zL3Nlcm1vbnMuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3NwZWNpYWwvcHJlYWNoZXItc2VybW9ucy9zZXJtb25zLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFFQSxnQkFBQTtFQUNBLHNCQUFBO0FDQUo7QURHQTs7O0VBQ0ksU0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvc3BlY2lhbC9wcmVhY2hlci1zZXJtb25zL3Nlcm1vbnMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cblxuaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHBhZGRpbmc6IDBlbSAwLjVlbSAxZW07XG59XG5oMyxcbmg0LFxuaDUge1xuICBtYXJnaW46IDA7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/special/preacher-sermons/sermons.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/special/preacher-sermons/sermons.component.ts ***!
  \***************************************************************/
/*! exports provided: PreacherSermonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreacherSermonsComponent", function() { return PreacherSermonsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/special/preacher-sermons/chooser/chooser.component.ts");






// import { ModalService } from'../../modal.service';
let PreacherSermonsComponent = class PreacherSermonsComponent {
    constructor(service, dialog) {
        this.service = service;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.maxFaith = 0;
        this.availableFaith = 0;
        this.eventSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        this.availableFaith = this.maxFaith = this.character.faith;
    }
    ngOnChanges(changes) {
        if (changes.modifiers) {
            // if(this.maxFaith === 0)
            //     this.maxFaith = this.character.faith;
            //
            // let mod = changes.modifiers.currentValue;
            // if(mod && !isNaN(mod.value)) {
            //     if(this.maxFaith == this.availableFaith) {
            //          this.availableFaith += (mod.value*1);
            //     }
            //     this.maxFaith += (mod.value*1);
            // }
        }
    }
    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxFaith = null;
        this.service = null;
    }
    getFaithModifier() {
        if (this.modifiers && this.modifiers.value && !isNaN(this.modifiers.value))
            return this.modifiers.value * 1;
        return 0;
    }
    getAvailableFaith() {
        return this.availableFaith + this.getFaithModifier();
    }
    add(sermon) {
        this.character.sermons.push(sermon);
        this.onSave.emit({ type: 'sermons', value: this.character.sermons });
    }
    remove(sermon) {
        let index = -1;
        this.character.sermons.forEach((t, i) => {
            if (t.name === sermon.name)
                index = i;
        });
        if (index >= 0) {
            let rem = this.character.sermons.splice(index, 1);
            this.onSave.emit({ type: 'sermons', value: this.character.sermons });
        }
    }
    getAvailable() {
        let takenNames = this.character.sermons.map(s => s.name);
        return this.service.getSermons().then((sermons) => {
            return sermons.filter(s => { return takenNames.indexOf(s.name) < 0; });
        });
    }
    resetSermons() {
        this.availableFaith = this.maxFaith;
        this.eventSubject.next({ name: 'sermons:reset', value: true });
        this.onSave.emit({});
    }
    onEvent(event) {
        switch (event.name) {
            case 'faith:spent':
                this.availableFaith -= event.value * 1;
                // this.eventSubject.next({ name: 'faith:available', value: this.availableFaith });
                break;
            case 'xp:gained':
                this.character.xp += event.value * 1;
                this.onSave.emit({ type: 'xp', value: this.character.xp });
                break;
            case 'sermon:removed':
                this.remove(event.value);
                break;
            default: console.log("Unsupported sermon event " + event.name);
        }
    }
    openChooser() {
        // const ref = this.modalService.createComponentRef(SermonsChooserComponent);
        // ref.instance.options = [];
        // ref.instance.onClose = (event) => {
        //     this.modalService.destroyRef(ref, 0);
        //     if(event.apply) {
        //         this.add(event.value as Sermon);
        //     }
        // };
        // const element = this.modalService.getDomElementFromComponentRef(ref);
        // this.modalService.addChild(element);
        //
        // this.getAvailable().then( available => {
        //     ref.instance.options = available;
        // });
        this.getAvailable().then(available => {
            let opts = {
                data: {
                    options: available
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_5__["SermonsChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
    }
};
PreacherSermonsComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_4__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], PreacherSermonsComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], PreacherSermonsComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], PreacherSermonsComponent.prototype, "onSave", void 0);
PreacherSermonsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'preacher-sermons',
        template: __webpack_require__(/*! raw-loader!./sermons.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/preacher-sermons/sermons.component.html"),
        styles: [__webpack_require__(/*! ./sermons.component.less */ "./src/app/special/preacher-sermons/sermons.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_4__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
], PreacherSermonsComponent);



/***/ }),

/***/ "./src/app/special/samurai-tactics/chooser/chooser.component.less":
/*!************************************************************************!*\
  !*** ./src/app/special/samurai-tactics/chooser/chooser.component.less ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zYW11cmFpLXRhY3RpY3MvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9zcGVjaWFsL3NhbXVyYWktdGFjdGljcy9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3NwZWNpYWwvc2FtdXJhaS10YWN0aWNzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWF4LXdpZHRoOiA0MDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/special/samurai-tactics/chooser/chooser.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/special/samurai-tactics/chooser/chooser.component.ts ***!
  \**********************************************************************/
/*! exports provided: SamuraiTacticsChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SamuraiTacticsChooserComponent", function() { return SamuraiTacticsChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let SamuraiTacticsChooserComponent = class SamuraiTacticsChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.selection = null;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.selection = null;
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection.name === value.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
SamuraiTacticsChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
SamuraiTacticsChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'samurai-tactics-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/samurai-tactics/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/special/samurai-tactics/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], SamuraiTacticsChooserComponent);



/***/ }),

/***/ "./src/app/special/samurai-tactics/samurai-tactics.component.less":
/*!************************************************************************!*\
  !*** ./src/app/special/samurai-tactics/samurai-tactics.component.less ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0em 0.5em 1em;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zYW11cmFpLXRhY3RpY3Mvc2FtdXJhaS10YWN0aWNzLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9zcGVjaWFsL3NhbXVyYWktdGFjdGljcy9zYW11cmFpLXRhY3RpY3MuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUVBLGdCQUFBO0VBQ0Esc0JBQUE7QUNBSjtBREdBOzs7RUFDSSxTQUFBO0FDQ0o7QURFQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9zcGVjaWFsL3NhbXVyYWktdGFjdGljcy9zYW11cmFpLXRhY3RpY3MuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cblxuaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cbmgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbjogMDtcbn1cbi5jYXJkIC5kZXNjIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/special/samurai-tactics/samurai-tactics.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/special/samurai-tactics/samurai-tactics.component.ts ***!
  \**********************************************************************/
/*! exports provided: SamuraiTacticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SamuraiTacticsComponent", function() { return SamuraiTacticsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/special/samurai-tactics/chooser/chooser.component.ts");





let SamuraiTacticsComponent = class SamuraiTacticsComponent {
    constructor(afs, dialog) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.maxFury = 0;
        this.confirming = {};
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        this.maxFury = this.maxFury || this.character.fury.max;
    }
    ngOnChanges(changes) {
        if (changes.modifiers) {
            this.maxFury = this.character.fury.max;
            let mod = changes.modifiers.currentValue;
            if (mod && !isNaN(mod.value))
                this.maxFury += (mod.value * 1);
        }
    }
    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxFury = null;
        this.afs = null;
    }
    add(tactic) {
        this.character.tactics.push(tactic);
        this.onSave.emit({});
    }
    remove(index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.tactics.splice(index, 1);
            this.onSave.emit({});
        }
    }
    spendFury(fury) {
        let amount = fury * 1;
        if (isNaN(amount) || amount > this.character.fury.current)
            return;
        this.character.fury.current -= fury;
        this.onSave.emit({ type: 'fury.current', value: this.character.fury.current });
    }
    getTactics() {
        if ('Wandering Samurai' === this.character.class)
            return this.afs.getWanderingSamuraiTactics();
        if ('Daimyo' === this.character.class ||
            'Samurai Warrior' === this.character.class)
            return this.afs.getSamuraiBattleTactics();
    }
    getAvailable() {
        let takenNames = (this.character.tactics || []).map(a => a.name);
        return this.getTactics().then((tactics) => {
            return tactics.filter(a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    }
    openChooser() {
        this.getAvailable().then(options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["SamuraiTacticsChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
    }
    confirmingDelete(index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    }
};
SamuraiTacticsComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SamuraiTacticsComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SamuraiTacticsComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], SamuraiTacticsComponent.prototype, "onSave", void 0);
SamuraiTacticsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'samurai-tactics',
        template: __webpack_require__(/*! raw-loader!./samurai-tactics.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/samurai-tactics/samurai-tactics.component.html"),
        styles: [__webpack_require__(/*! ./samurai-tactics.component.less */ "./src/app/special/samurai-tactics/samurai-tactics.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], SamuraiTacticsComponent);



/***/ }),

/***/ "./src/app/special/shaman-spells/chooser/chooser.component.less":
/*!**********************************************************************!*\
  !*** ./src/app/special/shaman-spells/chooser/chooser.component.less ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  max-width: 400px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zaGFtYW4tc3BlbGxzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3BlY2lhbC9zaGFtYW4tc3BlbGxzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvc3BlY2lhbC9zaGFtYW4tc3BlbGxzL2Nob29zZXIvY2hvb3Nlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/special/shaman-spells/chooser/chooser.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/special/shaman-spells/chooser/chooser.component.ts ***!
  \********************************************************************/
/*! exports provided: ShamanSpellsChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShamanSpellsChooserComponent", function() { return ShamanSpellsChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/dialog/dialog.component */ "./src/app/shared/dialog/dialog.component.ts");





let ShamanSpellsChooserComponent = class ShamanSpellsChooserComponent extends _shared_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AbstractDialogComponent"] {
    constructor(dialogRef, data) {
        super(dialogRef, data);
        this.selection = null;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.selection = null;
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection.name === value.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
ShamanSpellsChooserComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
ShamanSpellsChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'shaman-spells-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/shaman-spells/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/special/shaman-spells/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
], ShamanSpellsChooserComponent);



/***/ }),

/***/ "./src/app/special/shaman-spells/shaman-spells.component.less":
/*!********************************************************************!*\
  !*** ./src/app/special/shaman-spells/shaman-spells.component.less ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0em 0.5em 1em;\n}\nh3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zaGFtYW4tc3BlbGxzL3NoYW1hbi1zcGVsbHMuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3NwZWNpYWwvc2hhbWFuLXNwZWxscy9zaGFtYW4tc3BlbGxzLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFFQSxnQkFBQTtFQUNBLHNCQUFBO0FDQUo7QURHQTs7O0VBQ0ksU0FBQTtBQ0NKO0FERUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvc3BlY2lhbC9zaGFtYW4tc3BlbGxzL3NoYW1hbi1zcGVsbHMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gaGVpZ2h0OiAxMDAlO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cblxuaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMGVtIDAuNWVtIDFlbTtcbn1cbmgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbjogMDtcbn1cbi5jYXJkIC5kZXNjIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/special/shaman-spells/shaman-spells.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/special/shaman-spells/shaman-spells.component.ts ***!
  \******************************************************************/
/*! exports provided: ShamanSpellsComponent, ShamanSpellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShamanSpellsComponent", function() { return ShamanSpellsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShamanSpellComponent", function() { return ShamanSpellComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/special/shaman-spells/chooser/chooser.component.ts");





let ShamanSpellsComponent = class ShamanSpellsComponent {
    constructor(afs, dialog) {
        this.afs = afs;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.maxMagik = 0;
        this.confirmingDelete = false;
        if (dialog)
            this.dialog = dialog;
    }
    ngOnInit() {
        this.maxMagik = this.maxMagik || this.character.magik.max;
    }
    ngOnChanges(changes) {
        if (changes.modifiers) {
            this.maxMagik = this.character.magik.max;
            let mod = changes.modifiers.currentValue;
            if (mod && !isNaN(mod.value))
                this.maxMagik += (mod.value * 1);
        }
    }
    ngOnDestroy() {
        this.character = null;
        this.modifiers = null;
        this.maxMagik = null;
        this.afs = null;
    }
    add(spell) {
        this.character.spells.push(spell);
        this.onSave.emit({ type: "shamanSpell", value: spell });
    }
    remove(arg) {
        let index = -1;
        if (typeof (arg) === 'object') {
            this.character.spells.forEach((s, i) => {
                if (s.name === arg.name)
                    index = i;
            });
        }
        else if (typeof (arg) === 'number') {
            index = arg;
        }
        if (index >= 0 && index < this.character.spells.length) {
            let rem = this.character.spells.splice(index, 1);
            this.onSave.emit({ type: "shamanSpell", value: rem });
        }
    }
    hasMagik(amount) {
        return this.character.magik.current >= (amount || 0);
    }
    spendMagik(amount) {
        if (this.character.magik.current >= amount) {
            this.character.magik.current -= amount;
            this.onSave.emit({ type: 'magik.current', value: this.character.magik.current });
        }
    }
    resetMagik() {
        this.character.magik.current = this.maxMagik;
        this.onSave.emit({ type: 'magik.current', value: this.character.magik.current });
    }
    getAvailableSpells() {
        let takenNames = (this.character.spells || []).map(a => a.name);
        return this.afs.getShamanSpells().then((spells) => {
            return spells.filter(a => {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    }
    openChooser() {
        this.getAvailableSpells().then(options => {
            let opts = {
                data: {
                    options: options
                }
            };
            const dialogRef = this.dialog.open(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["ShamanSpellsChooserComponent"], opts);
            this.subscription = dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.add(result);
                }
                this.subscription.unsubscribe();
                this.subscription = null;
            });
        });
    }
    onSpellEvent($event) {
        switch ($event.type) {
            case 'deleted':
                this.remove($event.value);
                break;
            case 'magikSpent':
                this.spendMagik($event.value * 1);
                break;
            default: console.log("Unrecognized spell event: " + $event.type);
        }
    }
};
ShamanSpellsComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ShamanSpellsComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ShamanSpellsComponent.prototype, "modifiers", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ShamanSpellsComponent.prototype, "onSave", void 0);
ShamanSpellsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'shaman-spells',
        template: __webpack_require__(/*! raw-loader!./shaman-spells.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/shaman-spells/shaman-spells.component.html"),
        styles: [__webpack_require__(/*! ./shaman-spells.component.less */ "./src/app/special/shaman-spells/shaman-spells.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
], ShamanSpellsComponent);

let ShamanSpellComponent = class ShamanSpellComponent {
    constructor() {
        this.magik = 0;
        this.onEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.magikSpent = 0;
        this.confirmingDelete = false;
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.spell = null;
        this.magik = null;
    }
    remove() {
        this.onEvent.emit({ type: 'deleted', value: this.spell });
    }
    castSpell() {
        let power = this.spell.power;
        if (!power)
            return; //what do we do here?
        let roll = (Math.random() * 6) + (Math.random() * 6);
        if (roll >= power) {
            //show success message
            this.status = "Cast successfully!";
        }
        else {
            //show fail message
            this.status = "Cast failed!";
        }
        //show rolled value
        this.roll = roll;
    }
    hasMagik(amount) {
        return this.magik >= (amount || 0);
    }
    spendMagik() {
        //get value from associated select...
        let amount = this.magikSpent * 1;
        if (this.magik > amount) {
            this.onEvent.emit({ type: 'magikSpent', value: amount });
            this.magikSpent = 0;
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ShamanSpellComponent.prototype, "spell", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ShamanSpellComponent.prototype, "magik", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ShamanSpellComponent.prototype, "onEvent", void 0);
ShamanSpellComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'shaman-spell',
        template: __webpack_require__(/*! raw-loader!./spell.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/shaman-spells/spell.component.html"),
        styles: [__webpack_require__(/*! ./shaman-spells.component.less */ "./src/app/special/shaman-spells/shaman-spells.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ShamanSpellComponent);



/***/ }),

/***/ "./src/app/special/sorcerer-magik/chooser/chooser.component.less":
/*!***********************************************************************!*\
  !*** ./src/app/special/sorcerer-magik/chooser/chooser.component.less ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 60px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 60px;\n  }\n}\n.c-option--available {\n  padding: 1em 0.5em;\n  border-bottom: 1px solid #ddd;\n}\n.c-option--available.is-selected {\n  background-color: #3267dd;\n  color: #fff;\n}\n.c-option--available p {\n  font-size: 0.875em;\n  margin-bottom: 0.5em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zb3JjZXJlci1tYWdpay9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL3NwZWNpYWwvc29yY2VyZXItbWFnaWsvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFDSSxTQUFBO0FDR0o7QURBQTtFQUNFLGVBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0FDRUY7QURDQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0hBQUE7QUNDRjtBREVBO0VBQ0ksaUJBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FDQUo7QURHQTtFQUNFO0lBQ0UsU0FBQTtFQ0RGO0FBQ0Y7QURLQTtFQUNJLGtCQUFBO0VBQ0EsNkJBQUE7QUNISjtBREtJO0VBQ0kseUJBQUE7RUFDQSxXQUFBO0FDSFI7QURIQTtFQVVRLGtCQUFBO0VBQ0Esb0JBQUE7QUNKUiIsImZpbGUiOiJzcmMvYXBwL3NwZWNpYWwvc29yY2VyZXItbWFnaWsvY2hvb3Nlci9jaG9vc2VyLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4ub3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIHotaW5kZXg6IDk5OTtcbn1cblxuLmRpYWxvZyB7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIGxlZnQ6IDA7XG4gIHRvcDogNjBweDtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIHdpZHRoOiA5MCU7XG4gIG1heC13aWR0aDogNTIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgN3B4IDhweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNXB4IDI0cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XG59XG5cbi5kaWFsb2dfX2JvZHkge1xuICAgIG1heC1oZWlnaHQ6IDQwMHB4O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgICBwYWRkaW5nLWJvdHRvbTogMWVtO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmRpYWxvZyB7XG4gICAgdG9wOiA2MHB4O1xuICB9XG59XG5cblxuLmMtb3B0aW9uLS1hdmFpbGFibGUge1xuICAgIHBhZGRpbmc6IDFlbSAwLjVlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcblxuICAgICYuaXMtc2VsZWN0ZWQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI2N2RkO1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG5cbiAgICBwIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgICB9XG59XG4iLCJoMyxcbmg0LFxuaDUge1xuICBtYXJnaW46IDA7XG59XG4ub3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIHotaW5kZXg6IDk5OTtcbn1cbi5kaWFsb2cge1xuICB6LWluZGV4OiAxMDAwO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICBsZWZ0OiAwO1xuICB0b3A6IDYwcHg7XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1pbi1oZWlnaHQ6IDIwMHB4O1xuICB3aWR0aDogOTAlO1xuICBtYXgtd2lkdGg6IDUyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBwYWRkaW5nOiAxMnB4O1xuICBib3gtc2hhZG93OiAwIDdweCA4cHggLTRweCByZ2JhKDAsIDAsIDAsIDAuMiksIDAgMTNweCAxOXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDVweCAyNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xufVxuLmRpYWxvZ19fYm9keSB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgcGFkZGluZy1ib3R0b206IDFlbTtcbn1cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuZGlhbG9nIHtcbiAgICB0b3A6IDYwcHg7XG4gIH1cbn1cbi5jLW9wdGlvbi0tYXZhaWxhYmxlIHtcbiAgcGFkZGluZzogMWVtIDAuNWVtO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbn1cbi5jLW9wdGlvbi0tYXZhaWxhYmxlLmlzLXNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMyNjdkZDtcbiAgY29sb3I6ICNmZmY7XG59XG4uYy1vcHRpb24tLWF2YWlsYWJsZSBwIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/special/sorcerer-magik/chooser/chooser.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/special/sorcerer-magik/chooser/chooser.component.ts ***!
  \*********************************************************************/
/*! exports provided: ElementalMagikChooserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementalMagikChooserComponent", function() { return ElementalMagikChooserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");



let ElementalMagikChooserComponent = class ElementalMagikChooserComponent {
    constructor() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    }
    close() {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    }
    apply() {
        this.visible = false;
        let value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    }
    choose(value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    }
    isChosen(value) {
        return this.selection && this.selection.name === value.name;
    }
    hasSelection() {
        return this.selection !== null;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
], ElementalMagikChooserComponent.prototype, "options", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ElementalMagikChooserComponent.prototype, "closable", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
], ElementalMagikChooserComponent.prototype, "visible", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
], ElementalMagikChooserComponent.prototype, "onClose", void 0);
ElementalMagikChooserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'elemental-magik-chooser',
        template: __webpack_require__(/*! raw-loader!./chooser.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/sorcerer-magik/chooser/chooser.component.html"),
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('dialog', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.3, .3, .3)' }),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100)
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ],
        styles: [__webpack_require__(/*! ./chooser.component.less */ "./src/app/special/sorcerer-magik/chooser/chooser.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ElementalMagikChooserComponent);



/***/ }),

/***/ "./src/app/special/sorcerer-magik/magik.component.less":
/*!*************************************************************!*\
  !*** ./src/app/special/sorcerer-magik/magik.component.less ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  overflow-y: auto;\n  padding: 0em 1em 1em;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zb3JjZXJlci1tYWdpay9tYWdpay5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3BlY2lhbC9zb3JjZXJlci1tYWdpay9tYWdpay5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBRUEsZ0JBQUE7RUFDQSxvQkFBQTtBQ0FKO0FESUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0ZKIiwiZmlsZSI6InNyYy9hcHAvc3BlY2lhbC9zb3JjZXJlci1tYWdpay9tYWdpay5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICAvLyBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBwYWRkaW5nOiAwZW0gMWVtIDFlbTtcbn1cblxuXG4uY2FyZCAuZGVzYyB7XG4gICAgZm9udC1zaXplOiAwLjg3NWVtO1xuICAgIGNvbG9yOiAjNTU1O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMGVtIDFlbSAxZW07XG59XG4uY2FyZCAuZGVzYyB7XG4gIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgY29sb3I6ICM1NTU7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/special/sorcerer-magik/magik.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/special/sorcerer-magik/magik.component.ts ***!
  \***********************************************************/
/*! exports provided: ElementalMagikComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementalMagikComponent", function() { return ElementalMagikComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../firestore.service */ "./src/app/firestore.service.ts");
/* harmony import */ var _chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chooser/chooser.component */ "./src/app/special/sorcerer-magik/chooser/chooser.component.ts");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modal.service */ "./src/app/modal.service.ts");






let ElementalMagikComponent = class ElementalMagikComponent {
    constructor(service, modalService) {
        this.service = service;
        this.modalService = modalService;
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.maxMana = 0;
        this.availableMana = 0;
        this.arcanePowder = 0;
        this.arcanePowderMax = 0;
        this.focusType = null;
        this.eventSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    ngOnInit() {
        this.availableMana = this.maxMana = this.character.mana;
        let focus = this.character.abilities.find(a => 'Magik Focus' === a.name);
        if (focus && focus.userInput && focus.userInput.value) {
            this.focusType = focus.userInput.value.toLowerCase();
        }
    }
    ngOnChanges(changes) {
        if (changes.modifiersMana) {
            // if(this.maxMana === 0)
            //     this.maxMana = this.character.mana;
            //
            // let mod = changes.modifiersMana.currentValue;
            // if(mod && !isNaN(mod.value)) {
            //     if(this.maxMana == this.availableMana) {
            //          this.availableMana += (mod.value*1);
            //     }
            //     this.maxMana += (mod.value*1);
            // }
        }
        if (changes.modifiersArcanePowder) {
        }
    }
    ngOnDestroy() {
        this.character = null;
        this.modifiersMana = null;
        this.modifiersArcanePowder = null;
        this.maxMana = null;
        this.service = null;
    }
    getManaModifier() {
        if (this.modifiersMana && this.modifiersMana.value && !isNaN(this.modifiersMana.value))
            return this.modifiersMana.value * 1;
        return 0;
    }
    getAvailableMana() {
        return this.availableMana + this.getManaModifier();
    }
    add(spell) {
        this.character.elementalMagik.push(spell);
        this.onSave.emit({ type: 'elementalMagik', value: this.character.elementalMagik });
    }
    remove(spell) {
        let index = -1;
        this.character.elementalMagik.forEach((t, i) => {
            if (t.name === spell.name)
                index = i;
        });
        if (index >= 0) {
            let rem = this.character.elementalMagik.splice(index, 1);
            this.onSave.emit({ type: 'elementalMagik', value: this.character.elementalMagik });
        }
    }
    getAvailable() {
        let takenNames = this.character.elementalMagik.map(s => s.name);
        return this.service.getElementalMagik().then((elementalMagik) => {
            return elementalMagik.filter(s => { return takenNames.indexOf(s.name) < 0; })
                .sort((a, b) => {
                if (a.type !== b.type)
                    return a.type > b.type ? 1 : -1;
                return a.name > b.name ? 1 : -1;
            });
        });
    }
    reset() {
        this.availableMana = this.maxMana;
        this.eventSubject.next({ name: 'elementalMagik:reset', value: true });
        this.onSave.emit({});
    }
    useArcanePowder() {
        this.arcanePowder = Math.max(this.arcanePowder - 1, 0);
    }
    resetArcanePowder() {
        let rolled = Math.ceil(Math.random() * 6);
        if (this.modifiersArcanePowder && this.modifiersArcanePowder.value) {
            rolled += this.modifiersArcanePowder.value;
        }
        this.arcanePowder = this.arcanePowderMax = rolled;
    }
    onEvent(event) {
        switch (event.name) {
            case 'mana:spent':
                this.availableMana -= event.value * 1;
                // this.eventSubject.next({ name: 'mana:available', value: this.availableMana });
                break;
            case 'powder:spent':
                this.arcanePowder -= event.value * 1;
                break;
            case 'xp:gained':
                this.character.xp += event.value * 1;
                this.onSave.emit({ type: 'xp', value: this.character.xp });
                break;
            case 'spell:removed':
                this.remove(event.value);
                break;
            default: console.log("Unsupported mana event " + event.name);
        }
    }
    openChooser() {
        const ref = this.modalService.createComponentRef(_chooser_chooser_component__WEBPACK_IMPORTED_MODULE_4__["ElementalMagikChooserComponent"]);
        ref.instance.options = [];
        ref.instance.onClose = (event) => {
            this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                this.add(event.value);
            }
        };
        const element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailable().then(available => {
            ref.instance.options = available;
        });
    }
};
ElementalMagikComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"] },
    { type: _modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ElementalMagikComponent.prototype, "character", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ElementalMagikComponent.prototype, "modifiersMana", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ElementalMagikComponent.prototype, "modifiersArcanePowder", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], ElementalMagikComponent.prototype, "onSave", void 0);
ElementalMagikComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'sorcerer-elemental-magik',
        template: __webpack_require__(/*! raw-loader!./magik.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/sorcerer-magik/magik.component.html"),
        styles: [__webpack_require__(/*! ./magik.component.less */ "./src/app/special/sorcerer-magik/magik.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"],
        _modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"]])
], ElementalMagikComponent);



/***/ }),

/***/ "./src/app/special/sorcerer-magik/spell/spell.component.less":
/*!*******************************************************************!*\
  !*** ./src/app/special/sorcerer-magik/spell/spell.component.less ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3,\nh4,\nh5 {\n  margin-top: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n.is-hidden {\n  display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvc3BlY2lhbC9zb3JjZXJlci1tYWdpay9zcGVsbC9zcGVsbC5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3BlY2lhbC9zb3JjZXJlci1tYWdpay9zcGVsbC9zcGVsbC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0VBQ0ksYUFBQTtBQ0dKO0FEQUE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0VKO0FEQ0E7RUFBYSxhQUFBO0FDRWIiLCJmaWxlIjoic3JjL2FwcC9zcGVjaWFsL3NvcmNlcmVyLW1hZ2lrL3NwZWxsL3NwZWxsLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiaDMsIGg0LCBoNSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbn1cblxuLmNhcmQgLmRlc2Mge1xuICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICBjb2xvcjogIzU1NTtcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xufVxuXG4uaXMtaGlkZGVuIHsgZGlzcGxheTogbm9uZTsgfVxuIiwiaDMsXG5oNCxcbmg1IHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cbi5jYXJkIC5kZXNjIHtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbi5pcy1oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/special/sorcerer-magik/spell/spell.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/special/sorcerer-magik/spell/spell.component.ts ***!
  \*****************************************************************/
/*! exports provided: ElementalMagikSpellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementalMagikSpellComponent", function() { return ElementalMagikSpellComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



;
function applyFlag(spell, flag) {
    spell.status |= flag;
    // console.log(spell.name + ": " + spell.status);
}
function removeFlag(spell, flag) {
    spell.status &= ~flag;
}
function hasFlag(spell, flag) {
    return spell.status & flag;
}
let ElementalMagikSpellComponent = class ElementalMagikSpellComponent {
    constructor() {
        this.availableMana = 0;
        this.arcanePowder = 0;
        this.focus = null;
        this.onEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isCollapsed = true;
        this.isEditing = false;
        this.confirmingDelete = false;
    }
    ngOnInit() {
        this.eventSubject.subscribe(event => {
            this.handleEvent(event);
        });
    }
    ngOnChanges(changes) {
        if (changes.availableMana) {
            let mana = changes.availableMana.currentValue;
            let cost = isNaN(this.spell.cost) ? -1 : this.spell.cost;
            if (mana <= 0) {
                applyFlag(this.spell, 1 /* empty */);
            }
            else {
                removeFlag(this.spell, 1 /* empty */);
            }
            if (cost > 0 && mana < cost) {
                applyFlag(this.spell, 2 /* insufficient */);
            }
            else {
                removeFlag(this.spell, 2 /* insufficient */);
            }
        }
    }
    getCastCheck() {
        let v = this.spell.check;
        if (!v || isNaN(v))
            return "-";
        let check = v * 1;
        let type = this.spell.type;
        if (type && this.focus && type.toLowerCase() == this.focus.toLowerCase()) {
            check -= 1;
        }
        return check + "+";
    }
    use() {
        applyFlag(this.spell, 4 /* cast */);
        if (this.onEvent)
            this.onEvent.emit({ name: 'mana:spent', value: this.spell.cost });
    }
    spendArcanePowder() {
        if (this.onEvent)
            this.onEvent.emit({ name: 'powder:spent', value: 1 });
    }
    applyXP() {
        applyFlag(this.spell, 8 /* xp */);
        if (this.onEvent)
            this.onEvent.emit({ name: 'xp:gained', value: this.spell.xp });
    }
    edit() {
        this.editable = JSON.parse(JSON.stringify(this.spell));
        this.isEditing = true;
    }
    cancelEditing() {
        this.isEditing = false;
        this.editable = null;
    }
    save() {
        Object.assign(this.spell, this.editable);
        this.isEditing = false;
        this.editable = null;
    }
    remove() {
        if (this.onEvent)
            this.onEvent.emit({ name: 'spell:removed', value: this.spell });
    }
    canCast() {
        return !hasFlag(this.spell, 4 /* cast */) &&
            !hasFlag(this.spell, 1 /* empty */) &&
            !hasFlag(this.spell, 2 /* insufficient */);
    }
    hasCast() {
        return (this.spell.status & 4 /* cast */);
    }
    canSpendPowder() {
        return this.arcanePowder > 0 && hasFlag(this.spell, 4 /* cast */);
    }
    canApplyXP() {
        return hasFlag(this.spell, 4 /* cast */) && !hasFlag(this.spell, 8 /* xp */);
    }
    xpApplied() {
        return (this.spell.status & 8 /* xp */);
    }
    isInsufficient() {
        return hasFlag(this.spell, 1 /* empty */) ||
            (hasFlag(this.spell, 2 /* insufficient */) &&
                !hasFlag(this.spell, 4 /* cast */));
    }
    clearFlags() {
        this.spell.status = 0;
    }
    handleEvent(event) {
        let name = event.name;
        switch (name) {
            case 'elementalMagik:reset':
                this.clearFlags();
                break;
            case 'mana:available':
                let mana = event.value;
                if (mana < this.spell.cost)
                    applyFlag(this.spell, 2 /* insufficient */);
                else
                    removeFlag(this.spell, 2 /* insufficient */);
                break;
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ElementalMagikSpellComponent.prototype, "spell", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ElementalMagikSpellComponent.prototype, "availableMana", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], ElementalMagikSpellComponent.prototype, "arcanePowder", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], ElementalMagikSpellComponent.prototype, "focus", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"])
], ElementalMagikSpellComponent.prototype, "eventSubject", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], ElementalMagikSpellComponent.prototype, "onEvent", void 0);
ElementalMagikSpellComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'magik',
        template: __webpack_require__(/*! raw-loader!./spell.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/special/sorcerer-magik/spell/spell.component.html"),
        styles: [__webpack_require__(/*! ./spell.component.less */ "./src/app/special/sorcerer-magik/spell/spell.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ElementalMagikSpellComponent);



/***/ }),

/***/ "./src/app/upload/upload.component.less":
/*!**********************************************!*\
  !*** ./src/app/upload/upload.component.less ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.c-list {\n  padding: 3em 1em 5em;\n  overflow: auto;\n  height: 100%;\n}\n.c-list header {\n  display: block;\n  padding: 1em;\n  background: #efefef;\n  border: 1px solid #ddd;\n  border-radius: 4px 4px 0 0;\n}\n@media (min-width: 768px) {\n  .c-list {\n    padding-left: 10%;\n    padding-right: 10%;\n  }\n}\n@media (min-width: 992px) {\n  .c-list {\n    padding-left: 20%;\n    padding-right: 20%;\n  }\n}\n.c-list__item {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 1em;\n  background: #fff;\n  border: 1px solid #ddd;\n}\n.c-list__item:last-child {\n  border-radius: 0 0 4px 4px;\n}\n.c-list__item a,\n.c-list__item a:visited {\n  text-decoration: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXRyaWNrbi9Db2RlL3BlcnNvbmFsL2ZpcmViYXNlL3NvYjItc3JjL3NyYy9hcHAvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0VBQWEsU0FBQTtBQ0liO0FERkE7RUFDSSxvQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FDSUo7QURQQTtFQU1RLGNBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLDBCQUFBO0FDSVI7QUREQTtFQUNJO0lBQ0ksaUJBQUE7SUFDQSxrQkFBQTtFQ0dOO0FBQ0Y7QURBQTtFQUNJO0lBQ0ksaUJBQUE7SUFDQSxrQkFBQTtFQ0VOO0FBQ0Y7QURDQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBRUEsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QUNBSjtBREVJO0VBQ0ksMEJBQUE7QUNBUjtBRFZBOztFQWNRLHFCQUFBO0FDQVIiLCJmaWxlIjoic3JjL2FwcC91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiaDMsIGg0LCBoNSB7IG1hcmdpbjogMDsgfVxuXG4uYy1saXN0IHtcbiAgICBwYWRkaW5nOiAzZW0gMWVtIDVlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICBoZWFkZXIge1xuICAgICAgICBkaXNwbGF5OmJsb2NrO1xuICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICAgIGJhY2tncm91bmQ6ICNlZmVmZWY7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgIH1cbn1cbkBtZWRpYShtaW4td2lkdGg6NzY4cHgpIHtcbiAgICAuYy1saXN0IHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMCU7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwJTtcbiAgICB9XG59XG5cbkBtZWRpYShtaW4td2lkdGg6OTkycHgpIHtcbiAgICAuYy1saXN0IHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAyMCU7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDIwJTtcbiAgICB9XG59XG5cbi5jLWxpc3RfX2l0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBwYWRkaW5nOiAxZW07XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCAwIDRweCA0cHg7XG4gICAgfVxuXG4gICAgYSwgYTp2aXNpdGVkIHtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIH1cbn1cbiIsImgzLFxuaDQsXG5oNSB7XG4gIG1hcmdpbjogMDtcbn1cbi5jLWxpc3Qge1xuICBwYWRkaW5nOiAzZW0gMWVtIDVlbTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbn1cbi5jLWxpc3QgaGVhZGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDFlbTtcbiAgYmFja2dyb3VuZDogI2VmZWZlZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmMtbGlzdCB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMCU7XG4gICAgcGFkZGluZy1yaWdodDogMTAlO1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgLmMtbGlzdCB7XG4gICAgcGFkZGluZy1sZWZ0OiAyMCU7XG4gICAgcGFkZGluZy1yaWdodDogMjAlO1xuICB9XG59XG4uYy1saXN0X19pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxZW07XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG59XG4uYy1saXN0X19pdGVtOmxhc3QtY2hpbGQge1xuICBib3JkZXItcmFkaXVzOiAwIDAgNHB4IDRweDtcbn1cbi5jLWxpc3RfX2l0ZW0gYSxcbi5jLWxpc3RfX2l0ZW0gYTp2aXNpdGVkIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/*!********************************************!*\
  !*** ./src/app/upload/upload.component.ts ***!
  \********************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firestore.service */ "./src/app/firestore.service.ts");



let UploadComponent = class UploadComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.userSubscription = this.service.getUser().subscribe(user => {
            if (user) {
                this.chars = this.service.getUnmigratedChars(user.uid);
            }
            else {
                this.chars = null;
            }
        });
    }
    initClasses() {
        this.service.initDB();
    }
    /**
     *
     */
    importChar(charJSON, key) {
        let oldObj = JSON.parse(charJSON);
        this.migrateChar(oldObj)
            .then(newObj => {
            console.log("Creating: ");
            console.log(newObj);
            return this.service.createCharacter(newObj);
        })
            .then(newChar => {
            this.charJSON = null; //empty textarea
            this.status = {
                type: "success",
                message: 'Character uploaded!'
            };
        })
            .catch(error => {
            this.status = {
                type: 'error',
                message: error.message
            };
        });
    }
    /**
     *
     */
    uploadChar() {
        this.importChar(this.charJSON);
    }
    /**
     *
     */
    migrateChar(oldObj) {
        let newObj = {
            armor: oldObj.armor || 0,
            avatar: oldObj.avatar || null,
            class: '',
            classId: oldObj['class'],
            combat: oldObj.combat || 2,
            darkstone: oldObj.darkstone || 0,
            defense: oldObj.defense || 0,
            faith: oldObj.faith || 0,
            init: oldObj.init || 0,
            keywords: oldObj.keywords,
            level: oldObj.level || 1,
            melee: oldObj.melee || 0,
            movement: oldObj.movement || oldObj.move || 0,
            name: oldObj.name,
            notes: oldObj.notes || "",
            ranged: oldObj.ranged || 0,
            spiritArmor: oldObj.spiritArmor || 0,
            uid: oldObj.userId,
            version: '10',
            wealth: oldObj.wealth || 0,
            willpower: oldObj.willpower || 0,
            xp: oldObj.xp || 0,
            items: [],
            abilities: [],
            mutations: [],
            attacks: [],
            corruption: { current: 0, max: 0 },
            grit: { current: 0, max: 0 },
            health: { wounds: 0, max: 0 },
            sanity: { loss: 0, max: 0 },
            sidebag: {},
            stats: { Agility: 0, Cunning: 0, Lore: 0, Luck: 0, Spirit: 0, Strength: 0 }
        };
        newObj.items = this.toArray(oldObj.items, newObj.items);
        newObj.abilities = this.toArray(oldObj.abilities, newObj.abilities);
        newObj.mutations = this.toArray(oldObj.mutations, newObj.mutations);
        newObj.attacks = this.toArray(oldObj.attacks, newObj.attacks);
        if (oldObj.sermons)
            newObj.sermons = this.toArray(oldObj.sermons, []);
        this.copyObj(oldObj.corruption, newObj.corruption);
        this.copyObj(oldObj.grit, newObj.grit);
        this.copyObj(oldObj.health, newObj.health);
        this.copyObj(oldObj.sanity, newObj.sanity);
        this.copyObj(oldObj.sidebag, newObj.sidebag);
        this.copyObj(oldObj.stats, newObj.stats);
        return this.service.getClass(oldObj.class).then(classObj => {
            newObj.class = classObj.name;
            return newObj;
        });
    }
    toArray(srcObj, destArr) {
        for (var prop in srcObj) {
            if (srcObj.hasOwnProperty(prop)) {
                let value = srcObj[prop];
                if (typeof (value) === 'object') {
                    value = this.copyObj(value, {});
                }
                destArr[destArr.length] = value;
            }
        }
        return destArr;
    }
    copyObj(src, dest) {
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                let value = src[prop];
                if ('modifiers' === prop) {
                    dest.modifiers = [];
                    this.toArray(value, dest.modifiers);
                }
                else {
                    if (typeof (value) === 'object') {
                        dest[prop] = {};
                        this.copyObj(value, dest[prop]);
                    }
                    else if (typeof (value) === 'string' ||
                        typeof (value) === 'number') {
                        dest[prop] = value;
                    }
                }
            }
        }
        return dest;
    }
    exportDB() {
        this.service.exportDB();
    }
    exportClasses() {
        this.service.exportClasses();
    }
};
UploadComponent.ctorParameters = () => [
    { type: _firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"] }
];
UploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'upload',
        template: __webpack_require__(/*! raw-loader!./upload.component.html */ "./node_modules/@angular-devkit/build-angular/node_modules/raw-loader/index.js!./src/app/upload/upload.component.html"),
        styles: [__webpack_require__(/*! ./upload.component.less */ "./src/app/upload/upload.component.less")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"]])
], UploadComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDcsb0Ziu85j0BpIbicEmPTffR3H_RGb68",
        authDomain: "intense-fire-8692.firebaseapp.com",
        databaseURL: "https://intense-fire-8692.firebaseio.com",
        projectId: "intense-fire-8692",
        storageBucket: "intense-fire-8692.appspot.com",
        messagingSenderId: "335408827936"
    }
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/patrickn/Code/personal/firebase/sob2-src/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map