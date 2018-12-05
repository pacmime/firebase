webpackJsonp([1,4],{

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data__ = __webpack_require__(494);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirestoreService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CLASSES_PATH = '/games/sob/classes';
var INJURIES_PATH = '/games/sob/injuries';
var MUTATIONS_PATH = '/games/sob/mutations';
var SERMONS_PATH = '/games/sob/sermons';
var SHAMAN_SPELLS_PATH = '/games/sob/shamanSpells';
var GAMBLER_TRICKS_PATH = '/games/sob/gamblingTricks';
var SAMURAI_TACTICS_PATH = '/games/sob/samuraiTactics';
var ORPHAN_MISSIONS_PATH = '/games/sob/orphanMissions';
var MADNESS_PATH = '/games/sob/madness';
var CHAR_PATH = '/games/sob/chars';
var OLD_CHAR_PATH = '/games/sob/oldChars';
var FirestoreService = (function () {
    function FirestoreService(afAuth, afs, router) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.user = this.afAuth.authState;
        this.charSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        this.charObs = this.charSubject.asObservable();
    }
    FirestoreService.prototype.isAuthenticated = function () {
        return this.user !== null;
    };
    FirestoreService.prototype.getUser = function () {
        return this.user;
    };
    FirestoreService.prototype.initDB = function () {
        this.initClasses();
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].MUTATIONS, MUTATIONS_PATH);
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].INJURIES, INJURIES_PATH);
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].MADNESS, MADNESS_PATH);
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].SERMONS, SERMONS_PATH);
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].SAMURAI_TACTICS, SAMURAI_TACTICS_PATH);
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].SHAMAN_SPELLS, SHAMAN_SPELLS_PATH);
        this.populateItems(__WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].GAMBLER_TRICKS, GAMBLER_TRICKS_PATH);
        //this.populateItems(Data.ORPHAN_MISSIONS, ORPHAN_MISSIONS_PATH);
    };
    FirestoreService.prototype.initClasses = function () {
        var classes = __WEBPACK_IMPORTED_MODULE_5__data__["a" /* Data */].CLASSES;
        var _loop_1 = function (i) {
            var cls = classes[i];
            var docRef = this_1.afs.collection(CLASSES_PATH).doc(cls.classId);
            docRef.snapshotChanges().take(1).toPromise().then(function (doc) {
                return doc.payload.exists ? docRef.update(cls) : docRef.set(cls);
            })
                .catch(function (err) {
                console.log("Error initializing " + cls.name);
            });
        };
        var this_1 = this;
        for (var i = 0; i < classes.length; ++i) {
            _loop_1(i);
        }
    };
    FirestoreService.prototype.populateItems = function (items, path) {
        var _this = this;
        items.forEach(function (item) {
            var docRef = _this.afs.collection(path).doc(item.name);
            docRef.snapshotChanges().take(1).toPromise().then(function (doc) {
                return doc.payload.exists ? docRef.update(item) : docRef.set(item);
            })
                .catch(function (err) {
                console.log("Error initializing " + path + " : " + item.name);
                console.log("   `-> " + err.message);
            });
        });
    };
    //SOBCharacter methods
    FirestoreService.prototype.getCurrentCharacter = function () {
        return this.character;
    };
    FirestoreService.prototype.getCharacterModifiers = function (character) {
        var result = [];
        var char = character || this.getCurrentCharacter();
        if (char) {
            this.getModifiersFrom(result, char.items || [], true);
            this.getModifiersFrom(result, char.abilities || [], false);
            //covers madness/injuries too
            this.getModifiersFrom(result, char.mutations || [], false);
        }
        return result;
    };
    FirestoreService.prototype.getModifiersFrom = function (results, sources, mustBeEquipped) {
        if (mustBeEquipped === void 0) { mustBeEquipped = true; }
        sources.forEach(function (src) {
            //only bother if the src is marked as equipped
            // and has modifiers associated with it
            if (src.modifiers && (!mustBeEquipped || src.equipped)) {
                src.modifiers.forEach(function (modifier) {
                    var modVal = isNaN(modifier.value) ? 0 : modifier.value * 1;
                    var affected = modifier.affects;
                    if ('move' === affected)
                        affected = 'movement';
                    if (typeof (results[affected]) === 'undefined' || results[affected] === null) {
                        results[affected] = { value: 0, sources: [] };
                    }
                    if ('armor' === affected) {
                        //armor doesn't stack, so only use highest modifier value
                        results[affected].value = Math.max(results[affected].value, modVal * 1);
                    }
                    else {
                        results[affected].value += modVal;
                    }
                    results[affected].sources.push(src.name || src.label);
                });
            }
        });
    };
    // FireStore access methods
    FirestoreService.prototype.getCharacter = function (callback) {
        var subscription = this.charSubject.subscribe(function (result) {
            // console.log(result);
            callback(result);
        });
        if (this.character) {
            this.charSubject.next(this.character);
        }
        return subscription;
    };
    FirestoreService.prototype.getUserDocument = function (uid) {
        return this.afs.doc('/games/sob/users/' + uid).valueChanges();
    };
    FirestoreService.prototype.getUnmigratedChars = function (uid) {
        var doc = this.afs.doc('/games/sob/users/' + uid);
        return doc.collection('oldChars') //.valueChanges();
            .snapshotChanges()
            .map(function (docs) {
            return docs.map(function (a) {
                return { json: a.payload.doc.data().json, name: a.payload.doc.id };
            });
        });
        // return this.afs.collection<any>(OLD_CHAR_PATH,
        //     ref => ref.where('uid', '==', uid)).valueChanges();
    };
    FirestoreService.prototype.getUserChars = function (uid) {
        // console.log("Fetching user doc for " + uid);
        // let doc = this.afs.doc<SOBUser>('/games/sob/users/' + uid);
        // console.log("Fetching chars for " + uid);
        // return doc.collection<SOBCharacter>('chars').valueChanges();
        return this.afs.collection(CHAR_PATH, function (ref) { return ref.where('uid', '==', uid); }).valueChanges();
    };
    FirestoreService.prototype.loadCharacter = function (charId) {
        var _this = this;
        // console.log("Fetching character from " + CHAR_PATH + '/' + charId);
        var observable = this.afs.doc(CHAR_PATH + '/' + charId).valueChanges();
        //cache character so it can be referenced by components directly
        observable.take(1).toPromise().then(function (char) {
            _this.character = char;
            _this.charSubject.next(char);
            return char;
        });
        return observable;
    };
    FirestoreService.prototype.updateCharacter = function (charId, updates) {
        var docRef = this.afs.collection(CHAR_PATH).doc(charId);
        return docRef.snapshotChanges().take(1).toPromise().then(function (doc) {
            return doc.payload.exists ? docRef.update(updates) : docRef.set(updates);
        })
            .catch(function (err) {
            return Promise.reject(err);
        });
    };
    FirestoreService.prototype.removeCharacter = function (charId) {
        var docRef = this.afs.collection(CHAR_PATH).doc(charId);
        return docRef.snapshotChanges().take(1).toPromise().then(function (doc) {
            return docRef.delete();
        })
            .catch(function (err) {
            return Promise.reject(err);
        });
    };
    FirestoreService.prototype.createCharacter = function (json) {
        var id = this.afs.createId();
        json.id = id;
        return this.updateCharacter(id, json);
    };
    FirestoreService.prototype.getClasses = function () {
        return this.afs.collection(CLASSES_PATH).
            valueChanges().take(1).toPromise();
    };
    FirestoreService.prototype.getClass = function (classId) {
        var docRef = this.afs.collection(CLASSES_PATH).doc(classId);
        return docRef.valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<Sermon[]>} resolving list of sermons
     */
    FirestoreService.prototype.getSermons = function () {
        return this.afs.collection(SERMONS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<OrphanMission[]>} resolving list of tactics
     */
    FirestoreService.prototype.getOrphanMissions = function () {
        return this.afs.collection(ORPHAN_MISSIONS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<SamuraiTactic[]>} resolving list of tactics
     */
    FirestoreService.prototype.getSamuraiTactics = function () {
        return this.afs.collection(SAMURAI_TACTICS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<GamblerTrick[]>} resolving list of tricks
     */
    FirestoreService.prototype.getGamblerTricks = function () {
        return this.afs.collection(GAMBLER_TRICKS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<ShamanSpell[]>} resolving list of tactics
     */
    FirestoreService.prototype.getShamanSpells = function () {
        return this.afs.collection(SHAMAN_SPELLS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<any[]>} resolving list of mutations
     */
    FirestoreService.prototype.getMutations = function () {
        return this.afs.collection(MUTATIONS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<any[]>} resolving list of injuries
     */
    FirestoreService.prototype.getInjuries = function () {
        return this.afs.collection(INJURIES_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @return {Promise<any[]>} resolving list of madness
     */
    FirestoreService.prototype.getMadness = function () {
        return this.afs.collection(MADNESS_PATH).
            valueChanges().take(1).toPromise();
    };
    /**
     * @param {string} classId - identifier of class to retrieve ability options
     * @return {Promise<Ability[]>} resolving list of abilities for associated class
     */
    FirestoreService.prototype.getAbilities = function (classId) {
        var docRef = this.afs.collection(CLASSES_PATH).doc(classId);
        return docRef.valueChanges().take(1).toPromise().then(function (cls) {
            var c = cls;
            return c.upgrades;
        });
    };
    FirestoreService.prototype.getAuth = function () {
        return this.user;
    };
    FirestoreService.prototype.login = function (email, password) {
        var _this = this;
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(function (authState) {
            _this.user = authState;
            return authState;
        })
            .catch(function (error) {
            console.log("Error authenticating");
            console.log(error);
            return Promise.reject(error);
        });
    };
    FirestoreService.prototype.logout = function () {
        var _this = this;
        this.afAuth.auth.signOut().then(function () {
            _this.router.navigate(['/login']);
        });
    };
    FirestoreService.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    FirestoreService.prototype.toArray = function (srcObj, destArr) {
        for (var prop in srcObj) {
            if (srcObj.hasOwnProperty(prop)) {
                var value = srcObj[prop];
                if (typeof (value) === 'object') {
                    value = this.copyObj(value, {});
                }
                destArr[destArr.length] = value;
            }
        }
        return destArr;
    };
    FirestoreService.prototype.copyObj = function (src, dest) {
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                var value = src[prop];
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
    };
    FirestoreService.prototype.exportDB = function () {
        var result = {
            chars: {}, users: {}, orphanMissions: []
        };
        var SOB = this.afs.doc('/games/sob');
        SOB.collection('chars')
            .snapshotChanges()
            .map(function (docs) {
            return docs.map(function (a) {
                return { uid: a.payload.doc.id, data: a.payload.doc.data() };
            });
        }).take(1).toPromise()
            .then(function (chars) {
            chars.forEach(function (char) {
                result.chars[char.uid] = char.data;
            });
            return SOB.collection('users')
                .snapshotChanges()
                .map(function (docs) {
                return docs.map(function (a) {
                    return { uid: a.payload.doc.id, data: a.payload.doc.data() };
                });
            })
                .take(1).toPromise();
        })
            .then(function (users) {
            users.forEach(function (user) { result.users[user.uid] = user.data; });
            return true;
        })
            .then(function () {
            console.log(JSON.stringify(result));
        });
    };
    return FirestoreService;
}());
FirestoreService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["b" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["b" /* AngularFireAuth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["b" /* AngularFirestore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["b" /* AngularFirestore */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], FirestoreService);

var _a, _b, _c;
//# sourceMappingURL=firestore.service.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbilityChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AbilityChooserComponent = (function () {
    function AbilityChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    AbilityChooserComponent.prototype.ngOnInit = function () { };
    AbilityChooserComponent.prototype.ngOnDestroy = function () {
        this.abilities = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    AbilityChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    AbilityChooserComponent.prototype.apply = function () {
        this.visible = false;
        //move ".value" to ".desc" for chosen abilities
        var value = JSON.parse(JSON.stringify(this.selection));
        value.desc = this.selection.value;
        delete value.value;
        this.onClose({ apply: true, value: value });
    };
    AbilityChooserComponent.prototype.choose = function (ability) {
        if (this.isChosen(ability))
            this.selection = null;
        else
            this.selection = ability;
    };
    AbilityChooserComponent.prototype.isChosen = function (ability) {
        return this.selection && this.selection.name === ability.name;
    };
    AbilityChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return AbilityChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], AbilityChooserComponent.prototype, "abilities", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], AbilityChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], AbilityChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], AbilityChooserComponent.prototype, "onClose", void 0);
AbilityChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'ability-chooser',
        template: __webpack_require__(607),
        styles: [__webpack_require__(575)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], AbilityChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__models_character_model__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemEditorComponent = (function () {
    function ItemEditorComponent() {
        this.closable = true;
        this.visible = true;
        this.activeTab = null;
        this.tabs = [
            { label: 'Basic', id: 'first' },
            { label: 'Adv', id: 'second' },
            { label: 'Stats', id: 'third' },
            { label: 'Mods', id: 'fourth' }
        ];
    }
    ItemEditorComponent.prototype.ngOnInit = function () {
        this.uses = ['Turn', "Fight", "Adventure"];
        this.slots = ['hat', 'face', 'shoulders', 'coat',
            'torso', 'belt', 'pants', 'gloves', 'boots'];
        this.modifierTargets = [
            'Agility', 'Cunning', 'Spirit', 'Strength', 'Lore', 'Luck',
            'init', 'move', 'combat', 'health', 'sanity', 'corruption',
            'grit', 'faith', 'fury', 'magik', 'armor', 'spiritArmor', 'defense'
        ];
        this.activeTab = this.tabs[0];
    };
    ItemEditorComponent.prototype.ngOnDestroy = function () {
        this.item = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
        this.uses = null;
        this.slots = null;
        this.modifierTargets = null;
        this.activeTab = null;
        this.tabs = null;
    };
    ItemEditorComponent.prototype.canApply = function () {
        return !!this.item && !!this.item.name;
    };
    ItemEditorComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: this.item });
    };
    ItemEditorComponent.prototype.apply = function () {
        if (!this.canApply())
            return;
        this.visible = false;
        this.onClose({ apply: true, value: this.item });
    };
    ItemEditorComponent.prototype.addModifier = function () {
        var mod = {
            affects: null,
            value: 0
        };
        if (!this.item.modifiers)
            this.item.modifiers = [];
        this.item.modifiers.push(mod);
    };
    ItemEditorComponent.prototype.removeModifier = function (index) {
        this.item.modifiers.splice(index, 1);
    };
    ItemEditorComponent.prototype.activateTab = function (tab) {
        this.activeTab = tab;
    };
    return ItemEditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_character_model__["Item"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_character_model__["Item"]) === "function" && _a || Object)
], ItemEditorComponent.prototype, "item", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ItemEditorComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], ItemEditorComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], ItemEditorComponent.prototype, "onClose", void 0);
ItemEditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'item-editor',
        template: __webpack_require__(614),
        styles: [__webpack_require__(582)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], ItemEditorComponent);

var _a;
//# sourceMappingURL=editor.component.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOBError; });
var SOBError = (function () {
    function SOBError(type, arg) {
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
    return SOBError;
}());

//# sourceMappingURL=error.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeypadComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var KeypadComponent = (function () {
    function KeypadComponent() {
        this.closable = true;
        this.minimum = 0;
        this.maximum = 9999;
        this.changes = [];
        this.result = 0;
    }
    KeypadComponent.prototype.ngOnInit = function () {
        this.result = this.value;
    };
    KeypadComponent.prototype.ngOnDestroy = function () {
        this.closable = false;
        this.visible = false;
        this.value = 0;
        this.minimum = 0;
        this.maximum = 0;
        this.modifiers = null;
        this.onClose = null;
        this.manualAdj = null;
        this.changes = null;
        this.result = 0;
    };
    KeypadComponent.prototype.close = function () {
        this.visible = false;
        try {
            this.onClose({ apply: false, value: this.result });
        }
        catch (e) {
            console.log("Keypad: Error caught firing close event to callee");
            console.log(e);
        }
    };
    KeypadComponent.prototype.apply = function () {
        this.visible = false;
        try {
            this.onClose({ apply: true, value: this.result });
        }
        catch (e) {
            console.log("Keypad: Error caught firing apply event to callee");
            console.log(e);
        }
    };
    KeypadComponent.prototype.change = function (v) {
        if (v > 0)
            this.result = Math.min(this.result + v, this.maximum);
        else
            this.result = Math.max(this.result + v, this.minimum);
        this.changes.push(v);
    };
    KeypadComponent.prototype.changeManual = function (direction) {
        if (isNaN(this.manualAdj))
            return; //if no value provided
        this.change(direction * this.manualAdj);
    };
    KeypadComponent.prototype.hasManual = function () {
        return !isNaN(this.manualAdj);
    };
    return KeypadComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], KeypadComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], KeypadComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], KeypadComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], KeypadComponent.prototype, "minimum", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], KeypadComponent.prototype, "maximum", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], KeypadComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], KeypadComponent.prototype, "onClose", void 0);
KeypadComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'keypad',
        template: __webpack_require__(619),
        styles: [__webpack_require__(587)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], KeypadComponent);

//# sourceMappingURL=keypad.component.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamblerTricksChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GamblerTricksChooserComponent = (function () {
    function GamblerTricksChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    GamblerTricksChooserComponent.prototype.ngOnInit = function () { };
    GamblerTricksChooserComponent.prototype.ngOnDestroy = function () {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    GamblerTricksChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    GamblerTricksChooserComponent.prototype.apply = function () {
        this.visible = false;
        var value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    };
    GamblerTricksChooserComponent.prototype.choose = function (value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    };
    GamblerTricksChooserComponent.prototype.isChosen = function (value) {
        return this.selection && this.selection.name === value.name;
    };
    GamblerTricksChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return GamblerTricksChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], GamblerTricksChooserComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], GamblerTricksChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], GamblerTricksChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], GamblerTricksChooserComponent.prototype, "onClose", void 0);
GamblerTricksChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'gambler-tricks-chooser',
        template: __webpack_require__(623),
        styles: [__webpack_require__(591)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], GamblerTricksChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrphanMissionsChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrphanMissionsChooserComponent = (function () {
    function OrphanMissionsChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    OrphanMissionsChooserComponent.prototype.ngOnInit = function () { };
    OrphanMissionsChooserComponent.prototype.ngOnDestroy = function () {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    OrphanMissionsChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    OrphanMissionsChooserComponent.prototype.apply = function () {
        this.visible = false;
        var value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    };
    OrphanMissionsChooserComponent.prototype.choose = function (value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    };
    OrphanMissionsChooserComponent.prototype.isChosen = function (value) {
        return this.selection && this.selection.name === value.name;
    };
    OrphanMissionsChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return OrphanMissionsChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], OrphanMissionsChooserComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], OrphanMissionsChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], OrphanMissionsChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], OrphanMissionsChooserComponent.prototype, "onClose", void 0);
OrphanMissionsChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'samurai-tactics-chooser',
        template: __webpack_require__(626),
        styles: [__webpack_require__(594)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], OrphanMissionsChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SermonsChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SermonsChooserComponent = (function () {
    function SermonsChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    SermonsChooserComponent.prototype.ngOnInit = function () { };
    SermonsChooserComponent.prototype.ngOnDestroy = function () {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    SermonsChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    SermonsChooserComponent.prototype.apply = function () {
        this.visible = false;
        var value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    };
    SermonsChooserComponent.prototype.choose = function (value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    };
    SermonsChooserComponent.prototype.isChosen = function (value) {
        return this.selection && this.selection.name === value.name;
    };
    SermonsChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return SermonsChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], SermonsChooserComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], SermonsChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], SermonsChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], SermonsChooserComponent.prototype, "onClose", void 0);
SermonsChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'preacher-spells-chooser',
        template: __webpack_require__(628),
        styles: [__webpack_require__(596)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], SermonsChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SamuraiTacticsChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SamuraiTacticsChooserComponent = (function () {
    function SamuraiTacticsChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    SamuraiTacticsChooserComponent.prototype.ngOnInit = function () { };
    SamuraiTacticsChooserComponent.prototype.ngOnDestroy = function () {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    SamuraiTacticsChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    SamuraiTacticsChooserComponent.prototype.apply = function () {
        this.visible = false;
        var value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    };
    SamuraiTacticsChooserComponent.prototype.choose = function (value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    };
    SamuraiTacticsChooserComponent.prototype.isChosen = function (value) {
        return this.selection && this.selection.name === value.name;
    };
    SamuraiTacticsChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return SamuraiTacticsChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], SamuraiTacticsChooserComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], SamuraiTacticsChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], SamuraiTacticsChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], SamuraiTacticsChooserComponent.prototype, "onClose", void 0);
SamuraiTacticsChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'samurai-tactics-chooser',
        template: __webpack_require__(631),
        styles: [__webpack_require__(599)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], SamuraiTacticsChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShamanSpellsChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShamanSpellsChooserComponent = (function () {
    function ShamanSpellsChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    ShamanSpellsChooserComponent.prototype.ngOnInit = function () { };
    ShamanSpellsChooserComponent.prototype.ngOnDestroy = function () {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    ShamanSpellsChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    ShamanSpellsChooserComponent.prototype.apply = function () {
        this.visible = false;
        var value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    };
    ShamanSpellsChooserComponent.prototype.choose = function (value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    };
    ShamanSpellsChooserComponent.prototype.isChosen = function (value) {
        return this.selection && this.selection.name === value.name;
    };
    ShamanSpellsChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return ShamanSpellsChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], ShamanSpellsChooserComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ShamanSpellsChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], ShamanSpellsChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], ShamanSpellsChooserComponent.prototype, "onClose", void 0);
ShamanSpellsChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'shaman-spells-chooser',
        template: __webpack_require__(633),
        styles: [__webpack_require__(601)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], ShamanSpellsChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
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
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 386:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 386;


/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(243);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModalService = (function () {
    function ModalService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    ModalService.prototype.createComponentRef = function (component) {
        var componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        return componentRef;
    };
    ModalService.prototype.getDomElementFromComponentRef = function (componentRef) {
        return componentRef.hostView
            .rootNodes[0];
    };
    ModalService.prototype.addChild = function (child, parent) {
        if (parent === void 0) { parent = document.body; }
        parent.appendChild(child);
    };
    ModalService.prototype.destroyRef = function (componentRef, delay) {
        var _this = this;
        setTimeout(function () {
            _this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        }, delay);
    };
    return ModalService;
}());
ModalService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ComponentFactoryResolver */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* ApplicationRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* ApplicationRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injector */]) === "function" && _c || Object])
], ModalService);

var _a, _b, _c;
//# sourceMappingURL=modal.service.js.map

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

//# sourceMappingURL=character.model.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chooser_chooser_component__ = __webpack_require__(234);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbilitiesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AbilitiesComponent = (function () {
    function AbilitiesComponent(afs, modalService) {
        this.afs = afs;
        this.modalService = modalService;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.onError = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.confirming = {};
    }
    AbilitiesComponent.prototype.ngOnInit = function () {
    };
    AbilitiesComponent.prototype.ngOnDestroy = function () {
        this.character = null;
        this.afs = null;
        this.modalService = null;
    };
    AbilitiesComponent.prototype.add = function (ability) {
        this.character.abilities.push(ability);
        this.onSave.emit({});
    };
    AbilitiesComponent.prototype.remove = function (index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.abilities.splice(index, 1);
            this.onSave.emit({});
        }
    };
    AbilitiesComponent.prototype.getAvailable = function () {
        var takenNames = this.character.abilities.map(function (a) { return a.name; });
        return this.afs.getAbilities(this.character.classId).then(function (abilities) {
            return abilities.
                filter(function (a) {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return a.multi === true || takenNames.indexOf(a.name) < 0;
            }).
                map(function (a) {
                //mark those requiring unselected abilities as disabled
                if (a.requires && takenNames.indexOf(a.requires) < 0)
                    a.disabled = true;
                return a;
            });
        });
    };
    AbilitiesComponent.prototype.openChooser = function () {
        var _this = this;
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_4__chooser_chooser_component__["a" /* AbilityChooserComponent */]);
        ref.instance.abilities = [];
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.add(event.value);
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailable().then(function (options) {
            ref.instance.abilities = options;
        });
    };
    AbilitiesComponent.prototype.confirmingDelete = function (index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    };
    return AbilitiesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"]) === "function" && _a || Object)
], AbilitiesComponent.prototype, "character", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], AbilitiesComponent.prototype, "onSave", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _c || Object)
], AbilitiesComponent.prototype, "onError", void 0);
AbilitiesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'abilities',
        template: __webpack_require__(606),
        styles: [__webpack_require__(574)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__modal_service__["a" /* ModalService */]) === "function" && _e || Object])
], AbilitiesComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=abilities.component.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(service) {
        var _this = this;
        this.service = service;
        this.title = 'Brimstone Chars v2';
        this.userSubscription = service.user.subscribe(function (user) {
            _this.user = user;
        });
    }
    AppComponent.prototype.logout = function () {
        this.service.logout();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(608),
        styles: [__webpack_require__(576)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modal_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_firestore__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environments_environment__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__auth_guard__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__charlist_charlist_component__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__character_character_component__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__login_login_component__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__upload_upload_component__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__abilities_abilities_component__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__abilities_chooser_chooser_component__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__items_items_component__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__mim_mim_component__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__shared_value_display_value_display_component__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__shared_keypad_keypad_component__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__attacks_attacks_component__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__attacks_attack_attack_component__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__sidebag_sidebag_component__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__special_preacher_sermons_sermons_component__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__special_preacher_sermons_sermon_sermon_component__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__special_preacher_sermons_chooser_chooser_component__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__items_editor_editor_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__avatar_avatar_component__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__special_shaman_spells_shaman_spells_component__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__special_shaman_spells_chooser_chooser_component__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__special_gambler_tricks_gambler_tricks_component__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__special_gambler_tricks_chooser_chooser_component__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__special_samurai_tactics_samurai_tactics_component__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__special_samurai_tactics_chooser_chooser_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__special_orphan_missions_orphan_missions_component__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__special_orphan_missions_chooser_chooser_component__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__special_notes_notes_component__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__shared_chooser_chooser_component__ = __webpack_require__(498);
/* unused harmony export ModifierPipe */
/* unused harmony export MimGroupFilterPipe */
/* unused harmony export SumFilterPipe */
/* unused harmony export JoinPipe */
/* unused harmony export OrderByPipe */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











































var ModifierPipe = (function () {
    function ModifierPipe() {
    }
    ModifierPipe.prototype.transform = function (value) {
        if (value === null || value === undefined ||
            isNaN(value) || value === 0)
            return '';
        if (value * 1 > 0)
            return '+' + value;
        return value;
    };
    return ModifierPipe;
}());
ModifierPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Pipe */])({
        name: 'modifier'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])()
], ModifierPipe);

var MimGroupFilterPipe = (function () {
    function MimGroupFilterPipe() {
    }
    MimGroupFilterPipe.prototype.transform = function (items, group) {
        return items.filter(function (item) { return item.group.toLowerCase() == group.toLowerCase(); });
    };
    return MimGroupFilterPipe;
}());
MimGroupFilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Pipe */])({
        name: 'mimGroupFilter'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])()
], MimGroupFilterPipe);

var SumFilterPipe = (function () {
    function SumFilterPipe() {
    }
    SumFilterPipe.prototype.transform = function (values) {
        var result = 0;
        values.forEach(function (v) {
            if (!isNaN(v))
                result += v * 1;
        });
        return result;
    };
    return SumFilterPipe;
}());
SumFilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Pipe */])({
        name: 'sum'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* Injectable */])()
], SumFilterPipe);

/**
 *
 */
var JoinPipe = (function () {
    function JoinPipe() {
    }
    /**
     *
     * @param value
     * @returns {string}
     */
    JoinPipe.prototype.transform = function (value) {
        if (!value || !value.length)
            return '';
        return value.join(', ');
    };
    return JoinPipe;
}());
JoinPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Pipe */])({ name: 'join' })
], JoinPipe);

/**
 *
 */
var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    /**
     *
     * @param value
     * @returns {string}
     */
    OrderByPipe.prototype.transform = function (value, property, dir) {
        if (dir === void 0) { dir = 'desc'; }
        if (!value || !value.length)
            return [];
        return value.sort(function (a, b) {
            if ('desc' === dir)
                return a[property] > b[property] ? -1 : 1;
            else
                return a[property] < b[property] ? -1 : 1;
        });
    };
    return OrderByPipe;
}());
OrderByPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Pipe */])({ name: 'orderBy' })
], OrderByPipe);

//ROUTING CONFIG
var appRoutes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_17__login_login_component__["a" /* LoginComponent */] },
    { path: 'chars', component: __WEBPACK_IMPORTED_MODULE_15__charlist_charlist_component__["a" /* CharListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_14__auth_guard__["a" /* AuthGuard */]] },
    { path: 'chars/:id', component: __WEBPACK_IMPORTED_MODULE_16__character_character_component__["a" /* CharacterComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_14__auth_guard__["a" /* AuthGuard */]] },
    { path: 'import', component: __WEBPACK_IMPORTED_MODULE_18__upload_upload_component__["a" /* UploadComponent */] },
    { path: '', redirectTo: '/chars', pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_15__charlist_charlist_component__["a" /* CharListComponent */],
            __WEBPACK_IMPORTED_MODULE_16__character_character_component__["a" /* CharacterComponent */],
            __WEBPACK_IMPORTED_MODULE_17__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_18__upload_upload_component__["a" /* UploadComponent */],
            __WEBPACK_IMPORTED_MODULE_19__abilities_abilities_component__["a" /* AbilitiesComponent */],
            __WEBPACK_IMPORTED_MODULE_20__abilities_chooser_chooser_component__["a" /* AbilityChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_21__items_items_component__["a" /* ItemsComponent */],
            __WEBPACK_IMPORTED_MODULE_22__mim_mim_component__["a" /* MimComponent */],
            ModifierPipe,
            MimGroupFilterPipe,
            SumFilterPipe,
            JoinPipe,
            OrderByPipe,
            __WEBPACK_IMPORTED_MODULE_23__shared_value_display_value_display_component__["a" /* ValueDisplayComponent */],
            __WEBPACK_IMPORTED_MODULE_23__shared_value_display_value_display_component__["b" /* XPValueDisplayComponent */],
            __WEBPACK_IMPORTED_MODULE_25__attacks_attacks_component__["a" /* AttacksComponent */],
            __WEBPACK_IMPORTED_MODULE_26__attacks_attack_attack_component__["a" /* AttackComponent */],
            __WEBPACK_IMPORTED_MODULE_24__shared_keypad_keypad_component__["a" /* KeypadComponent */],
            __WEBPACK_IMPORTED_MODULE_27__sidebag_sidebag_component__["a" /* SidebagComponent */],
            __WEBPACK_IMPORTED_MODULE_28__special_preacher_sermons_sermons_component__["a" /* PreacherSermonsComponent */],
            __WEBPACK_IMPORTED_MODULE_29__special_preacher_sermons_sermon_sermon_component__["a" /* PreacherSermonComponent */],
            __WEBPACK_IMPORTED_MODULE_30__special_preacher_sermons_chooser_chooser_component__["a" /* SermonsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_31__items_editor_editor_component__["a" /* ItemEditorComponent */],
            __WEBPACK_IMPORTED_MODULE_32__avatar_avatar_component__["a" /* AvatarComponent */],
            __WEBPACK_IMPORTED_MODULE_33__special_shaman_spells_shaman_spells_component__["a" /* ShamanSpellsComponent */],
            __WEBPACK_IMPORTED_MODULE_33__special_shaman_spells_shaman_spells_component__["b" /* ShamanSpellComponent */],
            __WEBPACK_IMPORTED_MODULE_34__special_shaman_spells_chooser_chooser_component__["a" /* ShamanSpellsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_35__special_gambler_tricks_gambler_tricks_component__["a" /* GamblerTricksComponent */],
            __WEBPACK_IMPORTED_MODULE_36__special_gambler_tricks_chooser_chooser_component__["a" /* GamblerTricksChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_37__special_samurai_tactics_samurai_tactics_component__["a" /* SamuraiTacticsComponent */],
            __WEBPACK_IMPORTED_MODULE_38__special_samurai_tactics_chooser_chooser_component__["a" /* SamuraiTacticsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_39__special_orphan_missions_orphan_missions_component__["a" /* OrphanMissionsComponent */],
            __WEBPACK_IMPORTED_MODULE_40__special_orphan_missions_chooser_chooser_component__["a" /* OrphanMissionsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_41__special_notes_notes_component__["a" /* NotesComponent */],
            __WEBPACK_IMPORTED_MODULE_42__shared_chooser_chooser_component__["a" /* ChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_39__special_orphan_missions_orphan_missions_component__["a" /* OrphanMissionsComponent */]
        ],
        imports: [
            //                               for debugging purposes only
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { enableTracing: false }),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environments_environment__["a" /* environment */].firebase),
            __WEBPACK_IMPORTED_MODULE_9_angularfire2_firestore__["a" /* AngularFirestoreModule */],
            __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["a" /* AngularFireDatabaseModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__modal_service__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_13__firestore_service__["a" /* FirestoreService */],
            __WEBPACK_IMPORTED_MODULE_14__auth_guard__["a" /* AuthGuard */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_24__shared_keypad_keypad_component__["a" /* KeypadComponent */],
            __WEBPACK_IMPORTED_MODULE_31__items_editor_editor_component__["a" /* ItemEditorComponent */],
            __WEBPACK_IMPORTED_MODULE_42__shared_chooser_chooser_component__["a" /* ChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_20__abilities_chooser_chooser_component__["a" /* AbilityChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_30__special_preacher_sermons_chooser_chooser_component__["a" /* SermonsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_38__special_samurai_tactics_chooser_chooser_component__["a" /* SamuraiTacticsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_34__special_shaman_spells_chooser_chooser_component__["a" /* ShamanSpellsChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_36__special_gambler_tricks_chooser_chooser_component__["a" /* GamblerTricksChooserComponent */],
            __WEBPACK_IMPORTED_MODULE_40__special_orphan_missions_chooser_chooser_component__["a" /* OrphanMissionsChooserComponent */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestore_service__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttackComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AttackComponent = (function () {
    function AttackComponent(service) {
        this.service = service;
        this.onEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.confirmingDelete = false;
        this.isEditing = false;
        this.editable = null;
    }
    AttackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.charSub = this.service.getCharacter(function (character) {
            _this.character = character;
        });
    };
    AttackComponent.prototype.ngOnDestroy = function () {
        this.charSub.unsubscribe();
        this.charSub = null;
        this.character = null;
        this.service = null;
        this.details = null;
        this.roll = null;
        this.attack = null;
        this.onEvent = null;
        this.editable = null;
    };
    AttackComponent.prototype.edit = function () {
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
    };
    AttackComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.editable = null;
    };
    AttackComponent.prototype.saveEdits = function () {
        //overwrite with changes
        Object.assign(this.attack, this.editable);
        this.isEditing = false;
        this.onEvent.emit({ name: 'update', value: this.attack });
    };
    AttackComponent.prototype.remove = function () {
        this.onEvent.emit({ name: 'remove', value: this.attack });
    };
    /**
     * @param {string} id - id of the attack to roll
     */
    AttackComponent.prototype.execute = function () {
        var result = { attack: null, hits: [], dmg: [], bounces: [] };
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
        var i = 0, hits = 0;
        while (i < this.details.numAttDie) {
            //roll to-hit
            var roll = Math.ceil(Math.random() * this.details.attDie);
            if (this.details.attMod)
                roll += this.details.attMod;
            result.hits[i] = roll;
            //roll damage
            var dmg = Math.ceil(Math.random() * this.details.dmgDie);
            if (this.details.dmgMod)
                dmg += this.details.dmgMod;
            result.dmg[i] = dmg * 1;
            if (result.hits[i] < this.details.target) {
                result.dmg[i] = '(' + result.dmg[i] + ')';
            }
            if (roll >= this.details.target) {
                result.bounces = [];
            }
            //  else if('dynamite' !== id) {      //if miss non-dyn, blank damage
            //     result.dmg[i] = '-';
            // }
            i++;
        }
        this.roll = result;
    };
    /**
     * reroll a to-hit value
     * @param {string} id - id of the attack containing the to-hit value
     * @param {integer} index - position of the to-hit value in the attack's array
     */
    AttackComponent.prototype.rerollHit = function (id, index) {
        // var result = this.rollResults[id];
        // var roll = Math.ceil( Math.random() * result.attack.attDie );
        // if(result.attack.attMod)
        //     roll += result.attack.attMod;
        // result.hits[index] = roll;
        //
        // var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
        // if(result.attack.dmgMod)
        //     dmg += result.attack.dmgMod;
        // result.dmg[index] = dmg;
        //
        // result.bounces = this.rollBounces();
        //
        // if(roll >= result.attack.target) {  //if hit target, remove bounces
        //     result.bounces = [];
        // } else if('dynamite' !== id) {      //if miss non-dyn, blank damage
        //     result.dmg[i] = '-';
        // }
    };
    /**
     * reroll a damage value
     * @param {string} id - id of the attack containing the damage value
     * @param {integer} index - position of the damage value in the attack's array
     */
    AttackComponent.prototype.rerollDmg = function (id, index) {
        // var result = this.rollResults[id];
        // var dmg = Math.ceil( Math.random() * result.attack.dmgDie );
        // if(result.attack.dmgMod)
        //     dmg += result.attack.dmgMod;
        // result.dmg[index] = dmg;
    };
    /**
     * parse variables out of attack for calculation
     */
    AttackComponent.prototype.parseAttackStats = function (att, roll) {
        var result = {
            numAttDie: 1, attDie: 6, attMod: 0,
            dmgDie: 6, dmgMod: 0, target: 4, range: 0
        };
        var character = this.character;
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
                var g1 = parseInt(match[1]);
                var g2 = parseInt(match[2]);
                var g3 = parseInt(match[3]) || 0;
                result.numAttDie = g1;
                result.attDie = g2;
                result.attMod = g3;
                result.dmgDie = 6;
                var m2 = /d(\d){1}([\+\-]\d+)?/i.exec(att.damage);
                if (m2 && m2.length > 1) {
                    var mg1 = parseInt(m2[1]);
                    var mg2 = parseInt(m2[2]) || 0;
                    result.dmgDie = mg1;
                    result.dmgMod = mg2;
                }
            }
            // console.log(match);
            // console.log(result);
        }
        return result;
    };
    /**
     * determine how many bounces and which directions for dynamite
     */
    AttackComponent.prototype.rollBounces = function () {
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
    };
    return AttackComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_character_model__["Attack"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_character_model__["Attack"]) === "function" && _a || Object)
], AttackComponent.prototype, "attack", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], AttackComponent.prototype, "onEvent", void 0);
AttackComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'attack',
        template: __webpack_require__(609),
        styles: [__webpack_require__(577)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__firestore_service__["a" /* FirestoreService */]) === "function" && _b || Object])
], AttackComponent);

var _a, _b;
//# sourceMappingURL=attack.component.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttacksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AttacksComponent = (function () {
    // public bearFormAttack: Attack = {
    //     attack  : '0';
    //     damage  : '0';
    //     description : '+2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6',
    //     name : "Bear Form Attack",
    //     toHit : 0,
    //     type : 'melee' as AttackType
    //
    // }
    function AttacksComponent() {
        this.attacks = [];
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.onError = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.confirmingDelete = {};
        this.rollResults = [];
    }
    AttacksComponent.prototype.ngOnInit = function () {
        this.confirmingDelete = {};
    };
    AttacksComponent.prototype.ngOnDestroy = function () {
        this.attacks = null;
        this.confirmingDelete = null;
        this.rollResults = null;
    };
    AttacksComponent.prototype.add = function () {
        var att = {
            name: "New Attack",
            description: "Describe this attack",
            toHit: "3",
            attack: "1D6",
            damage: "1D6",
            type: "melee"
        };
        this.attacks.push(att);
        this.onSave.emit({ type: "attack", value: att });
    };
    AttacksComponent.prototype.remove = function (index) {
        if (index >= 0) {
            var rem = this.attacks.splice(index, 1);
            this.onSave.emit({ type: "attack", value: rem });
        }
    };
    AttacksComponent.prototype.onEvent = function (event) {
        switch (event.name) {
            case 'remove':
                var index = this.attacks.indexOf(event.value);
                this.remove(index);
                break;
            case 'update':
                this.onSave.emit({ type: "attack", value: event.value });
                break;
            default:
                console.log("Unsupported event: " + event.name);
        }
    };
    return AttacksComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], AttacksComponent.prototype, "attacks", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], AttacksComponent.prototype, "onSave", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], AttacksComponent.prototype, "onError", void 0);
AttacksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'attacks',
        template: __webpack_require__(610),
        styles: [__webpack_require__(578)]
    }),
    __metadata("design:paramtypes", [])
], AttacksComponent);

var _a, _b;
//# sourceMappingURL=attacks.component.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.auth.authState.map(function (auth) {
            if (auth === null || auth === undefined) {
                _this.router.navigate(['/login']);
                return false;
            }
            else {
                return true;
            }
        });
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvatarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AvatarComponent = (function () {
    function AvatarComponent(element, service) {
        this.element = element;
        this.service = service;
        this.showForm = false;
        this.dirty = false;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    AvatarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.charSubscription = this.service.getCharacter(function (character) {
            _this.character = character;
            _this.imgData = character.avatar;
        });
    };
    AvatarComponent.prototype.ngOnDestroy = function () {
        this.charSubscription.unsubscribe();
        this.charSubscription = null;
        this.showForm = false;
        this.dirty = false;
        this.imgData = null;
        this.character = null;
        this.element = null;
        this.service = null;
    };
    AvatarComponent.prototype.changeListener = function (event) {
        var _this = this;
        var reader = new FileReader();
        var image = this.element.nativeElement.querySelector('.image');
        reader.onload = function (e) {
            var src = e.target.result;
            image.src = _this.imgData = src;
            _this.dirty = true;
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    AvatarComponent.prototype.isDirty = function () {
        return this.dirty;
    };
    AvatarComponent.prototype.closeEdit = function () {
        this.showForm = false;
        this.dirty = false;
    };
    AvatarComponent.prototype.cancel = function () {
        this.imgData = this.character.avatar;
        this.closeEdit();
    };
    AvatarComponent.prototype.save = function () {
        // this.character.avatar = this.imgData;
        this.onSave.emit({ name: 'avatar', value: this.imgData });
        this.closeEdit();
    };
    return AvatarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], AvatarComponent.prototype, "onSave", void 0);
AvatarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'avatar',
        template: __webpack_require__(611),
        styles: [__webpack_require__(579)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _c || Object])
], AvatarComponent);

var _a, _b, _c;
//# sourceMappingURL=avatar.component.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_error__ = __webpack_require__(236);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharacterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CharacterComponent = (function () {
    function CharacterComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.isPreacher = false;
        this.isShaman = false;
        this.isSamurai = false;
        this.isGambler = false;
        this.isOrphan = false;
        this.xpLevels = [0, 500, 1000, 2000, 3000, 4500, 6000];
        this.isEditingBio = false;
        this.editableBio = null;
        this.modifiers = {};
        this.error = null; //new SOBError("test", "This is a test");
        this.messages = [];
    }
    CharacterComponent.prototype.ngOnInit = function () {
        var _this = this;
        var loadMsg = null;
        if (this.route.paramMap && this.route.paramMap.switchMap) {
            this.route.paramMap
                .switchMap(function (params) {
                loadMsg = _this.createMessage("Loading character", "This should only take a moment...", false);
                _this.messages.push(loadMsg);
                var id = params.get('id');
                _this.charId = id;
                return _this.service.loadCharacter(id);
            })
                .subscribe(function (character) {
                setTimeout(function () {
                    //clear loading message
                    _this.removeMessage(loadMsg);
                }, 1000);
                //charSubscription above will handle getting characters from the service
                // but this subscribe is necessary to get the actual event from the
                // Observable from the service
                // console.log("char event");
                _this.character = character;
                _this.init();
            });
        }
    };
    CharacterComponent.prototype.ngOnDestroy = function () {
        this.charId = null;
        this.character = null;
        this.isPreacher = false;
        this.isShaman = false;
        this.isSamurai = false;
        this.isGambler = false;
        this.xpLevels = null;
        this.isEditingBio = false;
        this.editableBio = null;
        this.modifiers = null;
    };
    CharacterComponent.prototype.init = function () {
        this.isPreacher = 'Preacher' === this.character.class;
        this.isGambler = 'Gambler' === this.character.class;
        this.isShaman = 'Dark Stone Shaman' === this.character.class;
        this.isSamurai = 'Wandering Samurai' === this.character.class;
        this.isOrphan = 'Orphan' === this.character.class;
        this.ensureProperties();
        this.refreshModifiers();
    };
    CharacterComponent.prototype.refreshModifiers = function () {
        this.modifiers = this.service.getCharacterModifiers(this.character);
        // console.log("Character Component: Modifiers being applied:");
        // console.log(this.modifiers);
        // console.log("-------------------------");
    };
    CharacterComponent.prototype.ensureProperties = function () {
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
        if (this.isPreacher && !this.character.sermons)
            this.character.sermons = [];
        if (this.isSamurai && !this.character.tactics)
            this.character.tactics = [];
        if (this.isGambler && !this.character.tricks)
            this.character.tricks = [];
        if (this.isShaman && !this.character.spells)
            this.character.spells = [];
    };
    CharacterComponent.prototype.editBio = function () {
        this.editableBio = {
            name: this.character.name,
            keywords: this.character.keywords || ""
        };
        this.isEditingBio = true;
    };
    CharacterComponent.prototype.cancelBioEdit = function () {
        this.editableBio = null;
        this.isEditingBio = false;
    };
    /**
     *
     */
    CharacterComponent.prototype.saveBio = function () {
        this.character.name = this.editableBio.name;
        this.character.keywords = this.editableBio.keywords;
        this.editableBio = null;
        this.isEditingBio = false;
        this.scheduleSave();
    };
    /**
     *
     */
    CharacterComponent.prototype.saveChar = function (key, arg) {
        this.refreshModifiers();
        // console.log("Character change event:" + (key?key + " => ":"") + JSON.stringify(arg));
        //
        //check to see if character leveled up
        if (key && 'xp' === key) {
            var neededXP = this.xpLevels[this.character.level];
            if (arg.value >= neededXP) {
                this.messages.push(this.createMessage("Level Up!", "Choose a class ability and roll for a new level-up ability"));
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
                this.error = new __WEBPACK_IMPORTED_MODULE_5__models_error__["a" /* SOBError */]("save", "Unable to apply change(s) to character, because " + e.message);
                return;
            }
        }
        this.scheduleSave();
    };
    /**
     *
     */
    CharacterComponent.prototype.applyChange = function (key, value) {
        var steps = key.split(".");
        if (steps.length === 1) {
            // if(typeof(this.character[key]) === 'undefined') {
            //     console.log("Nothing at path: " + key);
            //     return false;
            // }
            this.character[key] = value;
            return true;
        }
        //pathed variant (ie: 'prop.next.leaf')
        var i = 0, obj = this.character;
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
    };
    CharacterComponent.prototype.scheduleSave = function () {
        var _this = this;
        //do the actual save in a timeout so we don't block the UI waiting for
        // the service to complete
        if (this.savingTimer) {
            clearTimeout(this.savingTimer);
            this.savingTimer = null;
        }
        this.savingTimer = setTimeout(function () {
            _this.savingTimer = null;
            _this.doSave();
        }, 100);
    };
    CharacterComponent.prototype.doSave = function () {
        var _this = this;
        var savingMsg = this.createMessage('Saving changes', 'this should only take a moment...', false);
        this.messages.push(savingMsg);
        //set timer for saves that take too long...
        var timeoutMsg = null;
        var timer = setTimeout(function () {
            _this.removeMessage(savingMsg);
            timeoutMsg = _this.createMessage('Save Timed Out', 'Saving is taking a really long time...', true);
            _this.messages.push(timeoutMsg);
        }, 5000);
        // console.log(`Saving character ${this.charId}...`);
        // console.log(this.character);
        this.service.updateCharacter(this.charId, this.character)
            .then(function () {
            if (timer)
                clearTimeout(timer);
            else if (timeoutMsg)
                _this.removeMessage(timeoutMsg);
            _this.removeMessage(savingMsg);
            var savedMsg = _this.createMessage('Changes saved!', 'this will go away shortly', false);
            _this.messages.push(savedMsg);
            setTimeout(function () { _this.removeMessage(savedMsg); }, 3000);
        })
            .catch(function (e) {
            if (timer)
                clearTimeout(timer);
            else if (timeoutMsg)
                _this.removeMessage(timeoutMsg);
            _this.removeMessage(savingMsg);
            _this.error = new __WEBPACK_IMPORTED_MODULE_5__models_error__["a" /* SOBError */]("save", "Unable to save character changes, because " + e.message);
        });
    };
    CharacterComponent.prototype.getWeightLimit = function () {
        var value = this.character.stats.Strength + 5;
        (this.modifiers || []).forEach(function (mod) {
            if (mod.affects === 'Strength') {
                value += (mod.value * 1);
            }
        });
        return value;
    };
    CharacterComponent.prototype.hasDynamiteSatchel = function () {
        var satchel = this.character.items.find(function (it) { return it.name === "Dynamite Satchel"; });
        return satchel && satchel.equipped;
    };
    CharacterComponent.prototype.createMessage = function (title, message, canDismiss) {
        var msg = {
            title: title,
            value: message,
            id: Math.round(Math.random() * 9999),
            canDismiss: typeof (canDismiss) !== 'undefined' ? canDismiss : true
        };
        return msg;
    };
    CharacterComponent.prototype.removeMessage = function (arg) {
        var idx = -1;
        if (arg && arg.id) {
            this.messages.forEach(function (msg, i) {
                if (arg.id === msg.id)
                    idx = i;
            });
        }
        else if (arg && typeof (arg) === 'number') {
            this.messages.forEach(function (msg, i) {
                if (arg === msg.id)
                    idx = i;
            });
        }
        if (idx >= 0) {
            this.messages.splice(idx, 1);
        }
    };
    return CharacterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", String)
], CharacterComponent.prototype, "charId", void 0);
CharacterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-character',
        template: __webpack_require__(612),
        styles: [__webpack_require__(580)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__firestore_service__["a" /* FirestoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], CharacterComponent);

var _a, _b, _c;
//# sourceMappingURL=character.component.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_error__ = __webpack_require__(236);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CharListComponent = (function () {
    function CharListComponent(service, auth) {
        this.service = service;
        this.auth = auth;
        this.newCharClass = null;
        this._deleting = {};
        this.error = null;
    }
    CharListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.userSubscription = this.service.getUser().subscribe( user => {
        this.userSubscription = this.auth.authState.subscribe(function (user) {
            _this.user = user;
            if (user) {
                _this.chars = _this.service.getUserChars(user.uid);
            }
            else {
                _this.chars = null;
                _this.error = new __WEBPACK_IMPORTED_MODULE_3__models_error__["a" /* SOBError */]('auth', "You must sign in to see your characters");
            }
        });
        this.service.getClasses().then(function (classes) {
            _this.classes = classes.sort(function (a, b) { return a.name > b.name ? 1 : -1; });
        });
    };
    CharListComponent.prototype.create = function () {
        var _this = this;
        var char = JSON.parse(JSON.stringify(this.newCharClass));
        char.class = char.name;
        char.name = "My New " + char.class;
        char.uid = this.user.uid;
        char.mutations = [];
        char.attacks = [];
        delete char.upgrades;
        // console.log(char);
        this.service.createCharacter(char)
            .then(function () {
            //list should update
        })
            .catch(function (e) {
            _this.error = new __WEBPACK_IMPORTED_MODULE_3__models_error__["a" /* SOBError */]('create', "Unable to create a new character, because " + e.message);
        });
    };
    CharListComponent.prototype.markAsDeleting = function (id, bool) {
        if (bool)
            this._deleting[id] = true;
        else
            delete this._deleting[id];
    };
    CharListComponent.prototype.isDeleting = function (id) {
        return !!this._deleting[id];
    };
    CharListComponent.prototype.remove = function (id) {
        var _this = this;
        delete this._deleting[id];
        //TODO remove character;
        this.service.removeCharacter(id)
            .then(function () {
        })
            .catch(function (e) {
            _this.error = new __WEBPACK_IMPORTED_MODULE_3__models_error__["a" /* SOBError */]("delete", "Unable to delete character, because " + e.message);
        });
    };
    CharListComponent.prototype.getAvatar = function (char) {
        var src = 'assets/avatar.png';
        if (char.avatar) {
            src = char.avatar;
        }
        return {
            'background-image': 'url(' + src + ')',
            'background-size': 'auto 100%',
            'background-repeat': 'no-repeat',
            'background-position': '50% 0'
        };
    };
    return CharListComponent;
}());
CharListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'char-list',
        template: __webpack_require__(613),
        styles: [__webpack_require__(581)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__firestore_service__["a" /* FirestoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["b" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["b" /* AngularFireAuth */]) === "function" && _b || Object])
], CharListComponent);

var _a, _b;
//# sourceMappingURL=charlist.component.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Data; });
var Data = {
    CLASSES: [
        {
            "name": "Gambler",
            "classId": "47aE4QTcdX3bs6J4YoZr",
            "keywords": "Performer, Showman",
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
            "upgrades": [
                {
                    "name": "Fancy Footwork",
                    "value": "You may roll and extra die for Move each turn and choose which to use. If doubles are rolled on your Move dice, also recover 1 Fortune token"
                },
                {
                    "name": "Side Bet",
                    "modifiers": [
                        { "affects": "Luck", "value": 1 }
                    ],
                    "value": "+1 Luck. When making any Skill test, if you roll 3 of a kind, recover 1 Fortune token. However if you roll three 1s, lose D3 Fortune tokens instead"
                },
                {
                    "name": "High Roller",
                    "value": "Your To-Hit rolls of 6+ do +1 Damage. Whenever you recover a Grit, you may also recover 1 Fortune token."
                },
                {
                    "modifiers": [{ "affects": "Agility", "value": 1 }],
                    "name": "Nimble Fingers",
                    "value": "New Gambling Trick. +1 Agility"
                },
                {
                    "modifiers": [{ "affects": "movement", "value": 1 }],
                    "name": "On a Roll",
                    "value": "Whenever you kill an Enemy, you may recover 1 Fortune token. +1 Move"
                },
                {
                    "modifiers": [{ "affects": "Lore", "value": 1 }],
                    "name": "Well, I Say!",
                    "value": "1x per Adventure, you may recover Fortune tokens up to your max. +1 Lore"
                },
                {
                    "modifiers": [{ "affects": "fortune", "value": 1 }],
                    "name": "Play to Win",
                    "value": "Your Poker Face ability now gives a bonus D6+2 x $50 instead, but also gives you and extra Unwanted Attention marker. +1 Fortune"
                },
                {
                    "modifiers": [
                        { "affects": "Fortune", "value": 1 }
                    ],
                    "name": "Tell",
                    "value": "For each To Hit roll of 1 an Enemy rolls when attacking you, you may cancel one of its other successful To Hit rolls on you. +1 Fortune",
                    "requires": "Nimble Fingers"
                },
                {
                    "modifiers": [
                        { "affects": "init", "value": 1 }
                    ],
                    "name": "Box Cars",
                    "value": "Any time you roll a 6 for Willpower, Defense, or any skill test, you may change any other single die of that test into a 6 as well. +1 Initiative",
                    "requires": "On a Roll"
                },
                {
                    "name": "Affectation",
                    "value": "At the start of each Adventure, you may draw a random Personal Item to use until the end of that Adventure",
                    "requires": "Well, I Say!"
                },
                {
                    "modifiers": [
                        { "affects": "grit", "value": 1 }
                    ],
                    "name": "Cutthroat",
                    "value": "You add +1 Shot and +1 Damage to any Light Gun you use. +1 Max Grit",
                    "requires": "Play to Win"
                },
                {
                    "modifiers": [
                        { "affects": "Cunning", "value": 1 }
                    ],
                    "name": "Old Hand",
                    "value": "New Gambling Trick. +1 Cunning",
                    "requires": "Tell"
                },
                {
                    "modifiers": [{ "affects": "fortune", "value": 1 }],
                    "name": "Blow for Luck",
                    "value": "1x turn, you may spend 1 Grit to recover 1 Fortune or vice versa. +1 Fortune",
                    "requires": "Box Cars"
                },
                {
                    "name": "Fancy Pants",
                    "value": "You are +1 Sanity and +1 Health for each of the following Clothing items you have equipped: Hat, Belt, Coat, Pants, Torso, Gloves, Boots. You may not stay at the Camp Site in Town.",
                    "requires": "Affectation"
                },
                {
                    "modifiers": [
                        { "affects": "Cunning", "value": 1 },
                        { "affects": "defense", "value": -1 }
                    ],
                    "name": "Full House",
                    "value": "+1 Cunning and Defense 3+",
                    "requires": "Cutthroat"
                },
                {
                    "modifiers": [
                        { "affects": "Luck", "value": 1 }
                    ],
                    "name": "Make Your Own Luck",
                    "value": "You start every Adventure with a Revive token, usable only by you. Gain 25 XP any time you use it. +1 Luck",
                    "requires": "Old Hand"
                },
                {
                    "name": "Let It Ride",
                    "value": "Any time you roll 4 or more dice together, you may choose any number of those dice to re-roll once. These dice do not count as having been re-rolled.",
                    "requires": "Blow for Luck"
                },
                {
                    "modifiers": [
                        { "affects": "fortune", "value": 1 }
                    ],
                    "name": "Entourage",
                    "value": "You only need to pay 50% of the base 'Cost to Hire' for any Allies. All Items and tokens in Town cost you 20% less (rounding up to nearest $5). +1 Fortune",
                    "requires": "Fancy Pants"
                },
                {
                    "name": "Aces High",
                    "value": "If your Cunning is higher than an Enemy's Initiative, you are +1 on To-Hit rolls assigned to that Enemy (6+ is a Critical Hit)",
                    "requires": "Full House"
                },
                {
                    "name": "Of Many Talents",
                    "roll": 2,
                    "value": "At the start of each Adventure, choose one of the following keywords to have until the end of that Adventure: Traveler, Frontier, Outlaw, Soldier, Strange",
                    "multi": true
                },
                {
                    "name": "+1 Cunning",
                    "roll": 3,
                    "value": "+1 Cunning",
                    "multi": true,
                    "modifiers": [{ "affects": "Cunning", "value": 1 }]
                },
                {
                    "name": "+1 Initiative",
                    "roll": 4,
                    "value": "+1 Initiative",
                    "multi": true,
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "+1 Strength",
                    "roll": 5,
                    "value": "+1 Strength, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "+1 Move or +1 Spirit",
                    "roll": 6,
                    "value": "+1 Move or +1 Spirit, +D6 Health",
                    "multi": true,
                    "modifiers": [
                        { "affects": "movement", "value": 0 },
                        { "affects": "Spirit", "value": 0 }
                    ]
                },
                {
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value": "+D6 Health and +D6 Sanity",
                    "multi": true,
                    "modifiers": []
                },
                {
                    "name": "+1 Move or +1 Lore",
                    "roll": 8,
                    "value": "+1 Move or +1 Lore, +D6 Sanity",
                    "multi": true,
                    "modifiers": [
                        { "affects": "movement", "value": 0 },
                        { "affects": "Lore", "value": 0 }
                    ]
                },
                {
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value": "+1 Side Bag Capacity and +D6 Health",
                    "multi": true,
                    "modifiers": [{ "affects": "sidebag", "value": 2 }]
                },
                {
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value": "+1 Grit",
                    "multi": true,
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "+1 Luck",
                    "roll": 11,
                    "value": "+1 Luck",
                    "multi": true,
                    "modifiers": [{ "affects": "Luck", "value": 1 }]
                },
                {
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value": "You can now hold 2 more Corruption Points before mutating",
                    "multi": true,
                    "modifiers": [{ "affects": "corruption", "value": 2 }]
                }
            ],
            "combat": 2,
            "melee": 5,
            "ranged": 4,
            "defense": 4,
            "willpower": 4,
            "movement": 0,
            "init": 5,
            "corruption": { "current": 0, "max": 5 },
            "fortune": { "current": 3, "max": 3 },
            "grit": { "current": 1, "max": 2 },
            "health": { "max": 10, "wounds": 0 },
            "sanity": { "loss": 0, "max": 10 },
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
                { "name": "Gambling Trick" },
                { "name": "Fortune's Favor" }
            ],
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
            "sidebag": { "capacity": 5 },
            "level": 1,
            "wealth": 0,
            "darkstone": 0,
            "xp": 0
        },
        {
            "name": "Wandering Samurai",
            "classId": "M1qfgZTa78yjAmoEspsh",
            "keywords": "Traveler, Showman, Samurai",
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
            "combat": 2,
            "melee": 3,
            "ranged": 4,
            "darkstone": 0,
            "defense": 3,
            "willpower": 4,
            "faith": 0,
            "fury": { "current": 0, "max": 5 },
            "grit": { "current": 1, "max": 2 },
            "health": { "max": 10, "wounds": 0 },
            "sanity": { "loss": 0, "max": 10 },
            "corruption": { "current": 0, "max": 5 },
            "init": 5,
            "items": [
                {
                    "name": "Wanderer's Katana",
                    "source": "Starting Gear",
                    "desc": "+2 Max Fury. 1x Turn, you may spend 3 Fury to add +D3 Damage to one of your Combat Hits",
                    "cost": 400,
                    "hands": 2,
                    "keywords": "Gear, Blade, Hand Weapons",
                    "slots": 2,
                    "weight": 1,
                    "modifiers": [{ "affects": "fury", "value": 2 }]
                }
            ],
            "movement": 0,
            "sidebag": { "capacity": 5 },
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
                    "name": "Ronin",
                    "modifiers": [
                        { "affects": "fury", "value": 1 },
                        { "affects": "Strength", "value": 1 }
                    ],
                    "value": "+1 Max Fury and +1 Strength. When drawing Loot cards, you may draw one extra and choose one to discard. May not use Samurai Battle Tactics that have the keyword Healing. Extra Starting Gear: Samurai Armor, Ronin's Helmet"
                },
                {
                    "name": "Quiet Traveler",
                    "value": "Gain D3+1 Fury at the start of every Fight. Your 2-H Hand Weapons only take up 1-H for you to use"
                },
                {
                    "name": "Sword Master",
                    "value": "Rapid Strike (Blade) - Any time you kill an Enemy with a Combat Hit using a Blad Hand Weapon, you immediately gain +1 Combat for that Attack (limit +3)"
                },
                {
                    "modifiers": [{ "affects": "Agility", "value": 1 }],
                    "name": "Battle Ready",
                    "value": "New Wanderer Samurai Tactic; +1 Agility"
                },
                {
                    "modifiers": [{ "affects": "fury", "value": 1 }],
                    "name": "Battle Yell",
                    "value": "Any time you kill an Enemy with a Combat Hit, gain +1 Fury"
                },
                {
                    "modifiers": [{ "affects": "Cunning", "value": 1 }],
                    "name": "Control Discipline",
                    "value": "While using a 2-H blade, you may use the D8 for your Combat Damage. +1 Cunning"
                },
                {
                    "modifiers": [
                        { "affects": "Lore", "value": 1 },
                        { "affects": "Move", "value": 1 }
                    ],
                    "name": "On the Road",
                    "value": "You may start every Adventure with a free Fire Sake token. +1 Lore and +1 Move"
                },
                {
                    "modifiers": [
                        { "affects": "grit", "value": 1 }
                    ],
                    "name": "Fighter's Training",
                    "value": "New Wanderer Samurai Battle Tactic. +1 Max Grit.",
                    "requires": "Battle Ready"
                },
                {
                    "modifiers": [
                        { "affects": "fury", "value": 1 }
                    ],
                    "name": "Extra Effort",
                    "value": "1x turn you may spend 2 Fury each to add extra dice to any Skill test you are making. +1 Max Fury",
                    "requires": "Battle Yell"
                },
                {
                    "modifiers": [
                        { "affects": "Strength", "value": 1 }
                    ],
                    "name": "Power Discipline",
                    "value": "1x turn while using a Blade, you may spend 5 Fury to add D6 Damage to one of your Combat Hits. +1 Strength",
                    "requires": "Control Discipline"
                },
                {
                    "modifiers": [
                        { "affects": "grit", "value": 1 }
                    ],
                    "name": "Calm Exterior",
                    "value": "1x turn, you may spend 2 Grit to gain Peril Die Fury. +1 Max Grit",
                    "requires": "On the Road"
                },
                {
                    "modifiers": [
                        { "affects": "combat", "value": 1 }
                    ],
                    "name": "Warrior's Resolve",
                    "value": "New Wanderer Samurai Battle Tactic. +1 Combat",
                    "requires": "Fighter's Training"
                },
                {
                    "modifiers": [
                        { "affects": "grit", "value": 1 },
                        { "affects": "fury", "value": 1 }
                    ],
                    "name": "Unleashed",
                    "value": "1x Adventure, gain Fury up to your Max Fury for free. +1 Max Grit and +1 Max Fury",
                    "requires": "Extra Effort"
                },
                {
                    "modifiers": [
                        { "affects": "Spirit", "value": 1 }
                    ],
                    "name": "Mental Discipline",
                    "value": "1x Fight, at the start of a turn, you may reduce your Init by any amount (min 1). Gain Fury equal to this amount. +1 Spirit",
                    "requires": "Power Discipline"
                },
                {
                    "modifiers": [
                        { "affects": "combat", "value": 1 }
                    ],
                    "name": "Don't Make Him Angry",
                    "value": "1x Travel, you may spend 1 Grit to cancel a Travel Hazard (before any dice are rolled for it). +1 Combat",
                    "requires": "Calm Exterior"
                },
                {
                    "name": "Master of War",
                    "value": "At the start of each Adventure, draw a temporary Wanderer Samurai Battle Tactic. This is one use, only for this Adventure that may be played without spending Fury.",
                    "requires": "Warrior's Resolve"
                },
                {
                    "modifiers": [
                        { "affects": "init", "value": 1 }
                    ],
                    "name": "Master of Fury",
                    "value": "Any time you spend Fury, add 1 extra Fury to the total spent for free. +1 Initiative",
                    "requires": "Unleashed"
                },
                {
                    "name": "Flashing Steel",
                    "value": "While you have a Blade equipped, you are +1 Damage on your Combat Hits, and 1x turn you may re-roll all of your failed Defense rolls just rolled",
                    "requires": "Mental Discipline"
                },
                {
                    "modifiers": [
                        { "affects": "fury", "value": 2 },
                        { "affects": "willpower", "value": -1 }
                    ],
                    "name": "Death Before Dishonor",
                    "value": "+2 Max Fury and Willpower 3+",
                    "requires": "Don't Make Him Angry"
                },
                {
                    "name": "Honorable Vendetta",
                    "roll": 2,
                    "value": "Choose an Enemy keyword. Any time you collect XP from those Enemies, collect an extra +10 XP",
                    "multi": true
                },
                {
                    "name": "+1 Max Fury",
                    "roll": 3,
                    "value": "+1 Max Fury",
                    "multi": true,
                    "modifiers": [{ "affects": "fury", "value": 1 }]
                },
                {
                    "name": "+1 Move",
                    "roll": 4,
                    "value": "+1 Move",
                    "multi": true,
                    "modifiers": [{ "affects": "movement", "value": 1 }]
                },
                {
                    "name": "+1 Str and +1 Lore",
                    "roll": 5,
                    "value": "+1 Strength and +1 Lore, +D6 Sanity",
                    "multi": true,
                    "modifiers": [
                        { "affects": "Strength", "value": 1 },
                        { "affects": "Lore", "value": 1 }
                    ]
                },
                {
                    "name": "+1 Cunning or +1 Spirit",
                    "roll": 6,
                    "value": "+1 Cunning or +1 Spirit, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        { "affects": "Cunning", "value": 0 },
                        { "affects": "Spirit", "value": 0 }
                    ]
                },
                {
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value": "+D6 Health and +D6 Sanity",
                    "multi": true,
                    "modifiers": []
                },
                {
                    "name": "+1 Agility or +1 Luck",
                    "roll": 8,
                    "value": "+1 Agility or +1 Luck, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        { "affects": "Agility", "value": 0 },
                        { "affects": "Luck", "value": 0 }
                    ]
                },
                {
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value": "+1 Side Bag Capacity",
                    "multi": true,
                    "modifiers": [{ "affects": "sidebag", "value": 2 }]
                },
                {
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value": "+1 Grit",
                    "multi": true,
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "+1 Initiative",
                    "roll": 11,
                    "value": "+1 Initiative",
                    "multi": true,
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value": "You can now hold 2 more Corruption Points before mutating",
                    "multi": true,
                    "modifiers": [{ "affects": "corruption", "value": 2 }]
                }
            ],
            "level": 1,
            "wealth": 0,
            "xp": 0
        },
        {
            "name": "Dark Stone Shaman",
            "classId": "Rsyya36YjBhmfv4U1ICQ",
            "keywords": "Tribal, Magik",
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
            "upgrades": [
                {
                    "name": "Spirit Hunter",
                    "modifiers": [
                        { "affects": "init", "value": 1 }
                    ],
                    "value": "+1 Initiative. When casting Battle spells, you may re-roll one of the casting dice. Extra Starting Gear: Dark Stone Hatchet, Warrior's Speed"
                },
                {
                    "name": "Spirit Guardian",
                    "modifiers": [
                        { "affects": "Strength", "value": 1 }
                    ],
                    "value": "+1 Strength. When casting Spirit Magik Protection spells, you may re-roll one of the casting dice. Extra Starting Gear: Ancestral Shield"
                },
                {
                    "name": "Spirit Shaper",
                    "modifiers": [
                        { "affects": "grit", "value": 1 }
                    ],
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
                    "modifiers": [{ "affects": "grit", "value": 1 }],
                    "name": "Harmony",
                    "value": "You no longer need to roll for Corruption from Darkstone at the end of each Adventure. +1 Max Grit"
                },
                {
                    "modifiers": [
                        { "affects": "Lore", "value": 1 },
                        { "affects": "magik", "value": 1 }
                    ],
                    "name": "Storytelling",
                    "value": "+1 Magik and +1 Lore"
                },
                {
                    "modifiers": [
                        { "affects": "Agility", "value": 1 }
                    ],
                    "name": "Spirit Sacrifice",
                    "value": "1x turn when you kill an Enemy, you may use 2 Magik to recover a Grit. +1 Agility",
                    "requires": "War Shaman"
                },
                {
                    "modifiers": [
                        { "affects": "init", "value": 1 }
                    ],
                    "name": "Tribal Dance",
                    "value": "While in Animal Form, you may re-roll 1 Defense or 1 To Hit roll per turn. +1 Initiative",
                    "requires": "Call of the Wild"
                },
                {
                    "name": "Attuned",
                    "value": "Dark Stone used to enhance your spells now add 3 extra casting dice each instead",
                    "requires": "Harmony"
                },
                {
                    "modifiers": [
                        { "affects": "Cunning", "value": 1 }
                    ],
                    "name": "Wisdom of Ages",
                    "value": "New Spirit Magik Battle or Protection or Shapeshifting spell. +1 Cunning",
                    "requires": "Storytelling"
                },
                {
                    "modifiers": [
                        { "affects": "magik", "value": 1 }
                    ],
                    "name": "Battle Chant",
                    "value": "New Spirit Magik Battle or Protection spell. +1 Magik",
                    "requires": "Spirit Sacrifice"
                },
                {
                    "modifiers": [{ "affects": "magik", "value": 1 }],
                    "name": "Animal Nature",
                    "value": "New Spirit Magik Shapeshifting spell. +1 Magik",
                    "requires": "Tribal Dance"
                },
                {
                    "modifiers": [
                        { "affects": "Strength", "value": 1 }
                    ],
                    "name": "Void Strength",
                    "value": "You are +1 Health for each unique Item you carry that has a Dark Stone icon on it. +1 Strength",
                    "requires": "Attuned"
                },
                {
                    "name": "Ancestral Guide",
                    "value": "1x turn, you may use 2 Dark Stone to prevent the Darkness from moving on the Depth Track on a D6 roll of 3+",
                    "requires": "Wisdom of Ages"
                },
                {
                    "modifiers": [
                        { "affects": "grit", "value": 1 },
                        { "affects": "defense", "value": -1 }
                    ],
                    "name": "Spirit Champion",
                    "value": "+1 Max Grit and Defense 3+",
                    "requires": "Battle Chant"
                },
                {
                    "modifiers": [{ "affects": "combat", "value": 1 }],
                    "name": "One With The Spirits",
                    "value": "You may now cast other Spirit Magik, even while in Animal Form. +1 Combat",
                    "requires": "Animal Nature"
                },
                {
                    "modifiers": [
                        { "affects": "move", "value": 1 }
                    ],
                    "name": "Light As A Feather",
                    "value": "Items you carry that have a Dark Stone icon count as having 1 less weight. +1 Move",
                    "requires": "Void Strength"
                },
                {
                    "modifiers": [{ "affects": "magik", "value": 1 }],
                    "name": "Tribal Elder",
                    "value": "1x turn, you may add an extra Power Level to a single spell you are casting",
                    "requires": "Ancestral Guide"
                },
                {
                    "name": "Ancient Rivals",
                    "roll": 2,
                    "value": "You are +1 Damage on all Attacks against Void Enemies, and any time you collect XP from a Void Enemy, collect an extra +5 XP",
                    "multi": true
                },
                {
                    "name": "+1 Strength",
                    "roll": 3,
                    "value": "+1 Strength",
                    "multi": true,
                    "modifiers": [{ "affects": "Strength", "value": 1 }]
                },
                {
                    "name": "+1 Move",
                    "roll": 4,
                    "value": "+1 Move",
                    "multi": true,
                    "modifiers": [{ "affects": "movement", "value": 1 }]
                },
                {
                    "name": "+1 Agility",
                    "roll": 5,
                    "value": "+1 Agility, +D6 Sanity",
                    "multi": true,
                    "modifiers": [{ "affects": "Agility", "value": 1 }]
                },
                {
                    "name": "+1 Lore or +1 Spirit",
                    "roll": 6,
                    "value": "+1 Lore or +1 Spirit, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        { "affects": "Lore", "value": 0 },
                        { "affects": "Spirit", "value": 0 }
                    ]
                },
                {
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value": "+D6 Health and +D6 Sanity",
                    "multi": true,
                    "modifiers": []
                },
                {
                    "name": "+1 Cunning or +1 Luck",
                    "roll": 8,
                    "value": "+1 Cunning or +1 Luck, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        { "affects": "Cunning", "value": 0 },
                        { "affects": "Luck", "value": 0 }
                    ]
                },
                {
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value": "+1 Side Bag Capacity",
                    "multi": true,
                    "modifiers": [{ "affects": "sidebag", "value": 2 }]
                },
                {
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value": "+1 Grit",
                    "multi": true,
                    "modifiers": [{ "affects": "grit", "value": 1 }]
                },
                {
                    "name": "+1 Initiative",
                    "roll": 11,
                    "value": "+1 Initiative",
                    "multi": true,
                    "modifiers": [{ "affects": "init", "value": 1 }]
                },
                {
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value": "You can now hold 2 more Corruption Points before mutating",
                    "multi": true,
                    "modifiers": [{ "affects": "corruption", "value": 2 }]
                }
            ],
            "combat": 2,
            "melee": 4,
            "ranged": 5,
            "defense": 4,
            "willpower": 4,
            "movement": 0,
            "init": 5,
            "magik": 3,
            "corruption": { "current": 0, "max": 5 },
            "grit": { "current": 1, "max": 2 },
            "health": { "max": 10, "wounds": 0 },
            "sanity": { "loss": 0, "max": 12 },
            "items": [
                {
                    "cost": 450,
                    "description": "+1 Magik. 1x turn you may attempt to cancel a Darkness card. Roll D6, on 5 or 6 success; otherwise take Peril die Sanity damage ignoring Willpower",
                    "hands": 1,
                    "keywords": "Gear, Icon, Magik, Hand Weapon",
                    "name": "Shaman Staff",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1,
                    "modifiers": [{ "affects": "magik", "value": 1 }]
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
            "stats": {
                "Agility": 2,
                "Cunning": 1,
                "Lore": 4,
                "Luck": 1,
                "Spirit": 4,
                "Strength": 2
            },
            "spells": [],
            "level": 1,
            "wealth": 0,
            "darkstone": 0,
            "xp": 0
        },
        {
            "name": "Gunslinger",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "requires": "Master of Killin'",
                    "value": "Ranged To Hit 2+",
                    "name": "Best Shot in the West"
                },
                {
                    "requires": "Showmanship",
                    "value": "Before rolling To Hit, choose a number. Any die that rolls the chosen number does an extra 1 Damage ignoring Defense even if the shot would normally miss.",
                    "name": "Call Your Shot"
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
                    "requires": "Hushed Whispers",
                    "value": "+1 Cunning and +1 Luck. Any time you win at Gambling in Town, you gain an extra D6 x $10.",
                    "name": "Card Shark"
                },
                {
                    "value": "Once per Adventure, you may say your Catch Phrase to immediately Heal 2D6 Wounds or to add D6 Damage to one of your Hits.",
                    "name": "Catch Phrase"
                },
                {
                    "requires": "Ricochet Shots",
                    "value": "Start with up to 2 Cerberus Shots in your Six-Shooter. (Blue markers)",
                    "name": "Cerberus Shots"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Call Your Shot",
                    "value": "You start every Adventure with a Revive Token, usable only by you. Gain 25 XP any time you use it. +1 Lore.",
                    "name": "Charmed Life"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "At the start of any Fight Turn, you may reduce your Initiative by 3 to gain +1 Shot with a 1-Handed Gun. +1 Max Grit.",
                    "name": "Cool Hand"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Sanity.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "multi": true,
                    "value": "+D6 Health.",
                    "name": "Health"
                },
                {
                    "multi": true,
                    "value": "+2 Health and +2 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Cerberus Shots",
                    "value": "Start with up to 2 Hellfire Shots in your Six-Shooter. (Red markers)",
                    "name": "Hellfire Shots"
                },
                {
                    "value": "You now start every Adventure and Town Stay with an extra 1 Grit.",
                    "name": "Hushed Whispers"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative. Also gain +D6 Sanity.",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Card Shark",
                    "value": "You may now use up to 2 Shots from your Six-Shooter on each Hit. +1 Max Grit.",
                    "name": "Killer"
                },
                {
                    "requires": "Killer",
                    "value": "Once per Fight, use 2 Grit to add extra Damage to one of your Hits, equal to your current Hero Level.",
                    "name": "Legend of the West"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Through Shot",
                    "value": "You may now use your Six-Shooter Shots with any Gun, not just Pistols. +1 Max Grit.",
                    "name": "Master of Killin'"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "value": "Use 1 Grit to double the number of Shots you get with a 1-Handed Gun for one Attack (limit once per turn). To use this ability, you must have 1 Hand slot open.",
                    "name": "Pistol Fanning"
                },
                {
                    "value": "Uses the Six Shooter template. Starts each game fully loaded with 6 Dead Eye Shot bullets",
                    "name": "Quick and the Dead"
                },
                {
                    "value": "Anytime a new group of Enemies is placed on the board, you may immediately make a free Attack outside of the normal turn sequence.  To use the ability, you must have 1 Hand slot open.",
                    "name": "Quickdraw"
                },
                {
                    "value": "Use 2 Grit to re-fill D6 Shots back into your Six Shooter Template",
                    "name": "Reload"
                },
                {
                    "value": "Start with up to 2 Ricochet Shots in your Six Shooter. (Green markers)",
                    "name": "Ricochet Shots"
                },
                {
                    "requires": "Catch Phrase",
                    "value": "Draw an additional Personal Item.",
                    "name": "Showmanship"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Sanity",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Sanity.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Hellfire Shots",
                    "value": "You may start each Adventure with any mix of Shot Types in your Six-Shooter Template. +1 Max Grit.",
                    "name": "The Right Tool"
                },
                {
                    "requires": "Cool Hand",
                    "value": "Any time you kill and Enemy with a 1-Handed Gun, you may immediately do a free Hit with that Gun to another Enemy in one of the three spaces behind it.",
                    "name": "Through Shot"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                }
            ]
        },
        {
            "name": "Cowboy",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "name": "Agility"
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
                    "requires": "Take a Swing",
                    "value": "+1 Combat and +1 Strength and +1 Move.",
                    "name": "Bar Fight Vet"
                },
                {
                    "requires": "Living on the Edge",
                    "value": "Once per Fight, use 1 Grit to do D6 Wounds, ignoring Defense to both yourself and one adjacent Enemy. +3 Health.",
                    "name": "Brash Heroics"
                },
                {
                    "requires": "Frontier Rivals",
                    "value": "While you have a Trasnport Animal (it must be named), you are: Willpower 3+.",
                    "name": "Close Companion"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 2
                        }
                    ],
                    "value": "You are +2 Move.  All of your Attacks on adjacent Large size or bigger Enemies are +1 Damage",
                    "name": "Daredevil"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "value": "Any time you Rope an Enemy with the Lasso, gain 10 XP, and Recover a Grit on the D6 roll of 4+. +1 Initiative.",
                    "name": "Fancy Roping"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Fancy Roping",
                    "value": "You may now use the Lasso up to twice per Fight, but only one Enemy may be Roped at a time. +1 Agility.",
                    "name": "Fast Return"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Living Off the Land",
                    "value": "You are now +1 Damage on all Attacks vs Tribal, Outlaw, or Beast Enemies, and gain +25 XP for each you kill. +1 Max Grit.",
                    "name": "Frontier Rivals"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Frontier Vendetta"
                },
                {
                    "requires": "Shake It Off",
                    "value": "Once per Fight, use 1 Grit to Mount an adjacent, Large or bigger Enemy (sharing its full base). While Mounted, you may not be targeted by that Enemy and the Enemy is -1 Defense. At the end of each turn, pass a Strength 6+ test (gaining 25 XP) or dismount to an adjacent empty space.",
                    "name": "Giddy-Up!"
                },
                {
                    "value": "Once per Travel, may spend 1 Grit to cancel a Travel Hazard on the D6 roll of 3+ (before any tests are made for that Travel Hazard).",
                    "name": "Happy Trails"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "You gain double XP from Scavenge cards and may roll one extra die when Scavenging. Alos, for each Scavenge card drawn, Heal 1 Wound or Sanity.",
                    "name": "Living Off the Land"
                },
                {
                    "value": "While you are at half or less of either your Health or Sanity, your Rough Rider ability triggers on a 3+ instead (or 2+ if both).",
                    "name": "Living on the Edge"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "requires": "Sucker Punch",
                    "value": "You may now use your Rought Rider ability to Recover Grit as long as you only have 0 or 1 Grit at the start of the turn, and it may be used even while KO'd.",
                    "name": "Pale Rider"
                },
                {
                    "value": "At the start of each Turn (or Day in Town), if you have no Grit, Recover 1 Grit on the D6 roll of 4+.",
                    "name": "Rough Rider"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Fast Return",
                    "value": "At the end of any turn while KO'd, use 2 Grit to Recover without rolling for Injury/Madness. Heal 2D6 (any mix) as normal. +1 Strength.",
                    "name": "Shake It Off"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Bar Fight Vet",
                    "value": "Once per turn, use 1 Grit to use your Strength value (instead of rolling) as Damage for a Combat Hit. +1 Max Grit.",
                    "name": "Sucker Punch"
                },
                {
                    "value": "Once per turn, use 1 Grit to make a Melee Attack using your Basic Combat (no Items), in addition to your normal Ranged Attack.",
                    "name": "Take a Swing"
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
                    "requires": "Brash Heroics",
                    "value": "+1 Max Grit and +1 Strength.",
                    "name": "The Deadlier the Better"
                },
                {
                    "value": "Use 1 Grit when you cause a Hit with a Gun to immediately cause an additional D3 other Enemies in a continuous chain, starting adjacent to the target, to also take a single Hit from that Gun",
                    "name": "Trick Shooting"
                },
                {
                    "value": "You always Activate before Enemies at your Initiative level.  Also all Heroes in your Posse gain +2 Initiative during the first turn of an Ambush Attack. Extra Starting Gear: Rider's Rifle (replaces Pistol)",
                    "name": "Watchman"
                },
                {
                    "requires": "The Deadlier the Better",
                    "value": "You gain +2 Shots with a 1-Handed Gun or +2 Combat (you choose), during you rActivation for every Horror Hit you took form Fear, Terror, or Unspeakable Terror this turn (max +3).",
                    "name": "Who Wants to Live Forever?"
                },
                {
                    "requires": "Close Companion",
                    "value": "While you have 4 or more Clothing Items Equipped (including a Hat), you are: Defense 3+",
                    "name": "Wilderness Mastered"
                }
            ]
        },
        {
            "name": "Drifter",
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
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility.",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Squint",
                    "value": "Once per turn, use 2 Grit to make an extra Attack. +1 Initiative",
                    "name": "Bad Ass"
                },
                {
                    "value": "Choose one (Undead, Demon, Mutant, or Beast). Your Hits are now +2 Damage vs those Enemies and when gaining XP from them, gain an extra 10 XP.",
                    "name": "Bitter Enemies"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health.",
                    "name": "Cunning"
                },
                {
                    "value": "All Enemies gain 1 Elite ability for free. When traveling to town, always add an extra D3 Traveling Hazards",
                    "name": "Danger Magnet"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "value": "-1 Initiative for every Hero adjacent at the start of the turn (min 1)",
                    "name": "Distrustful"
                },
                {
                    "value": "Immortal - At the start of every Adventure, roll 2D6 for each Injury, Curse, Parasite, or Mutation the Hero has. On the roll of 7 or higher, it is healed.  Any time the Hero would be killed, they are considered dead for the rest of the Adventure/Town Stay. At the start of the next Adventure, the Hero is automatically returned to life, but must roll once on the Madness Chart and starts with no Grit.",
                    "name": "Drifter's Secret"
                },
                {
                    "requires": "Skilled Fighter",
                    "value": "At the start of each turn during a Fight, choose an Enemy on your Map Tile. It immediately takes D3 Wounds.",
                    "name": "Feared by Evil"
                },
                {
                    "multi": true,
                    "value": "At the end of every successful Mission, roll a D6. On the roll of 5+, you gain +1 Health.",
                    "name": "Grizzled by Time"
                },
                {
                    "value": "For ever 6+ you roll To Hit with a Pistol Ranged Attack, you gain +1 Shot with that Gun (max +3 Shots per turn)",
                    "name": "Gunslinger"
                },
                {
                    "multi": true,
                    "value": "+3 Health.",
                    "name": "Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Jaded",
                    "value": "All XP you gain while Traveling, in Town, or from Mission Rewards, is doubled. +1 Initiative.",
                    "name": "Infamous"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "You gain the Keyword Outlaw and may roll an extra die for movement each turn, and choose which to use. +2 Max Grit.",
                    "name": "Jaded"
                },
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "requires": "Unimpressed",
                    "value": "Range To Hit 2+",
                    "name": "Long Stare"
                },
                {
                    "value": "Not restricted to targeting adjacent Enemies first with Ranged Attacks. Starts with 2 Personal Items. At start of each Fight, every other non-Drifter Hero may Recover 1 Grit.",
                    "name": "Long Years Experience"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Infamous",
                    "value": "Once per turn, use 1 Grit to add Damage to one of your Hits equal to your current Sanity Damage (max +5). +1 Max Grit.",
                    "name": "Loose Cannon"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "The Hero has no name. Instead, the rest of the posse may decide on a nickname for the Hero. +1 Agility. Start every Adventure with Max Grit.",
                    "name": "No Name"
                },
                {
                    "value": "Any time you draw one or more Loot, Scavenge, Darkness, or Encounter cards, you may draw one extra card, then choose one of those to discard. If used for an Encounter draw, the Hero must be on the Map Tile that the Encounter is drawn for.",
                    "name": "Resourceful"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Sage Advice",
                    "value": "At the start of every Fight, you may Heal 3 Wounds / Sanity (any mix) from each other Hero. +1 Max Grit.",
                    "name": "Restraint"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "Each other Hero that Activates before you during the turn may Re-roll one of their dice just rolled, of your choice. +1 Agility.",
                    "name": "Sage Advice"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +2 Sanity.",
                    "name": "Side Bag Capacity"
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
                    "requires": "Sneer",
                    "value": "+1 Combat and +1 Agility.",
                    "name": "Skilled Fighter"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Bitter Enemies",
                    "value": "You are Immune to Horror Hits caused by Enemies. +1 Max Grit.",
                    "name": "Sneer"
                },
                {
                    "requires": "Loose Cannon",
                    "value": "Use 2 Grit to immediately do D6 Wounds to every adjacent Enemy, ignoring Defense.",
                    "name": "Spinning Guns"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health",
                    "name": "Spirit"
                },
                {
                    "value": "While there are no other Heroes adjacent to you, you are Defense 3+",
                    "name": "Squint"
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
                    "value": "+1 Strength. Also gain +2 Sanity.",
                    "name": "Strength"
                },
                {
                    "requires": "Weapon of Choice",
                    "value": "Once per Fight, use 3 Grit to immediately Recover a KO'd Hero on your Map Tile. +2 Max Grit.",
                    "name": "True Hero"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Bad Ass",
                    "value": "Any time a Growing Dread card is drawn, roll a D6. On the roll of 4+, cancel it. +1 Max Grit.",
                    "name": "Unimpressed"
                },
                {
                    "requires": "Restraint",
                    "value": "Choose one (Hand Weapon, Pistol, Shotgun, or Rifle). You now add +1 Combat/ +1 Shot to any Weapon you are using with that Keyword.",
                    "name": "Weapon of Choice"
                }
            ]
        },
        {
            "name": "Rancher",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "requires": "Refinement",
                    "value": "Use 2 Grit to drop a Dark Stone in an adjacent space during your Move. As an Attack, detonate it doing 2D6 Damage to all models in the same and adjacent spaces.",
                    "name": "Dark Stone Trap"
                },
                {
                    "requires": "Sharpshooter",
                    "value": "Your Critical Hits with a Gun are +3 Damage",
                    "name": "Deadly Shot"
                },
                {
                    "value": "You gain +2 Health for each Clothing Item you wear. Clothing Items do not count weight against your Carrying limit.",
                    "name": "Dressed for Adventure"
                },
                {
                    "value": "You may roll 2 dice for Escape tests and pick the highest roll.",
                    "name": "Evasion"
                },
                {
                    "value": "If there are no Enemies adjacent to you, you may Re-roll one missed To Hit roll per turn.",
                    "name": "Farmstead Defender"
                },
                {
                    "requires": "Is That All You've Got?",
                    "value": "Once per Fight, you may add +1 Damage to all your Combat Hits.",
                    "name": "Fisticuffs"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Void Enhancement",
                    "value": "While at the Blacksmith in Town, you may pay $500 less for any Upgrades purchased at the Dark Stone Forge. +1 Strength.",
                    "name": "Forge Works"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "value": "Use 1 Grit to Heal D6 Wounds from yourself or another adjacent Hero (gain 5 XP for every Wound healed from another Hero this way).",
                    "name": "Home Remedies"
                },
                {
                    "requires": "Life Goes On",
                    "value": "Use 2 Grit whie KO'd to Heal D6+2 Wounds/Sanity (any mix) and place your model back on the board.",
                    "name": "I've Seen Worse!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Once per turn, you may Re-roll a single damage roll for one of your Gun Hits.",
                    "name": "Iron Concentration"
                },
                {
                    "modifiers": [
                        {
                            "affects": "willpower",
                            "value": -1
                        }
                    ],
                    "requires": "Ready for Action",
                    "value": "Willpower 3+",
                    "name": "Is That All You've Got?"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Dressed for Adventure",
                    "value": "You are now +1 Initiative for each Mutation you have (max +3). +1 Max Grit.",
                    "name": "Life Goes On"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "Iron Concentration",
                    "value": "You get +1 Shot with any 2-Handed Gun.",
                    "name": "Rapid Reload"
                },
                {
                    "value": "2-Handed. Anytime you kill an Enemy with a 2-Handed Gun, you immediately gain +1 Shot with that Gun.",
                    "name": "Rapid Shot"
                },
                {
                    "value": "You may now carry twice as many Tokens in your Side Bag",
                    "name": "Ready for Action"
                },
                {
                    "requires": "Forge Works",
                    "value": "You may use 12 Dark Stone to fill an Upgrade Slot on a Gun or Hand Weapon. That Item is now +1 Damage and has 1 Dark Stone.",
                    "name": "Refinement"
                },
                {
                    "requires": "Rapid Reload",
                    "value": "Any time you kill an Enemy with a Gun, you may immediately do D6 Damage to anoter Enemy in one of the three spaces behind it.",
                    "name": "Sharpshooter"
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
                    "requires": "Fisticuffs",
                    "value": "Defense 3+. +1 Max Grit.",
                    "name": "Shrug It Off"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "value": "Use 1 Grit during your Activation to do 1 automatic Combat Hit to every adjacent Enemy. This does not count as your Attack. Use only while equipped with a 2-Handed Gun.",
                    "name": "Swinging Rifle"
                },
                {
                    "modifiers": [
                        {
                            "affects": "melee",
                            "value": -1
                        }
                    ],
                    "requires": "I've Seen Worse!",
                    "value": "Melee To Hit 3+",
                    "name": "Up Close and Personal"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Once per turn, you may use a Dark Stone to add +D6 Damage to one of your Hits. +1 Max Grit.",
                    "name": "Void Enhancement"
                }
            ]
        },
        {
            "name": "US Marshal",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "value": "You gain extra Movement each turn equal to your Lore. +1 Lore.",
                    "name": "A Story to Tell"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Look Out!",
                    "value": "Use 2 Grit to ready your Marshal Badge. Limit once per Adventure. +1 Max Grit.",
                    "name": "Above the Law"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "requires": "A Story to Tell",
                    "value": "You may now Recover a Grit on a Move roll of 6 as well as the normal 1.",
                    "name": "Back Up Plan"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Saddle Bags",
                    "value": "Any time you would take 1 or more Sanity Damage, take 1 fewer. +1 Lore.",
                    "name": "Been Around"
                },
                {
                    "value": "Any time you kill an Enemy, you may Heal 1 Wound and 1 Sanity and gain 10 XP.",
                    "name": "Cleaning up the West"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Hunter",
                    "value": "Use 2 Grit to cancel a Darkness or Growing Dread card. +1 Max Grit.",
                    "name": "Dead or Alive"
                },
                {
                    "value": "(Shotgun) Once per turn, when you kill an Enemy with a Shotgun, you gain +1 Shot with that Shotgun",
                    "name": "Double Shot"
                },
                {
                    "requires": "Dead or Alive",
                    "value": "Once per turn, use 3 Grit to do one automatic Hit to every Enemy on y our Map Tile. These Hits use the D8 for Damage.",
                    "name": "End of the Line"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "You no longer need to target adjacent Enemies first with Ranged Attacks. +1 Max Grit.",
                    "name": "Focus"
                },
                {
                    "value": "Use 1 Grit to Heal 3 Wounds or 3 Sanity from yourself or another Hero on you Map Tile (gain 5 XP for ever Wound/Sanity healed from another Hero this way). You are +2 Sanity.",
                    "name": "Hardened Resolve"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Focus",
                    "value": "At the start of each Adventure, choose a specific Enemy Type. You are +1 Damage against that Enemy and gain $10 for each you kill.",
                    "name": "Hunter"
                },
                {
                    "requires": "No Nonsense",
                    "value": "Once per turn, you may take 1 Corruption Hit to force an Enemy on your Map Tile to Re-roll a single die just rolled",
                    "name": "I Don't Think So!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Use 1 Grit to transfer all Hits just taken by an adjacent Hero to yourself (before Defense rolls). Gain 10 XP for each Hit transferred.",
                    "name": "Look Out!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain D6 Health/Sanity (any mix).",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "No Shame In It",
                    "value": "Add +1 Shot to any Shotgun you are using. Rolling the same Mutation twice on the chart has no effect on you.",
                    "name": "No Nonsense"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "Once per turn, you may take 1 Corruption Hit to use a Dark Stone in place of a Grit. +1 Strength.",
                    "name": "No Shame In It"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Whirling Strike",
                    "value": "While you are the only Hero on your Map Tile, you gain +1 Combat or +1 Shot with a Gun. +1 Max Grit.",
                    "name": "One Man Army"
                },
                {
                    "value": "Anytime you kill an Enemy, you may Recover a Grit on the D6 roll of 4, 5, or 6.",
                    "name": "Rolling Thunder"
                },
                {
                    "requires": "Back Up Plan",
                    "value": "You may now carry an extra 3 Tokens in your Side Bag.",
                    "name": "Saddle Bags"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix).",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "I Don't Think So!",
                    "value": "Your Hits are +1 Damage for each Mutation you have (max +3). +1 Strength.",
                    "name": "That Does It!"
                },
                {
                    "multi": true,
                    "value": "Choose a specific Enemy Type. From now on, any time you collect XP from that Enemy Type, collect an addition +10 XP.",
                    "name": "Vendetta"
                },
                {
                    "requires": "Above the Law",
                    "value": "Use 2 Grit as an Attack to roll your full Combat against every adjacent Enemy.",
                    "name": "Whirling Strike"
                }
            ]
        },
        {
            "name": "Jargono Native",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "requires": "Tribal Warrior",
                    "value": "Whenever you kill a Large or bigger Enemy, you may move the Darkness back one space on the Depth Track (does not trigger special spaces moved back through). +1 Spirit.",
                    "name": "Ancestor's Favor"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "Whenever one or more Enemy groups are placed in Ambush, Recover 1 Grit. +1 Strength.",
                    "name": "Battle Stance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Quick Shot",
                    "value": "You may double the Endurance value of any Enemy while Attacking it. +1 Strength.",
                    "name": "Deep Cuts"
                },
                {
                    "value": "Once per Adventure, use 1 Grit to switch Attack (or Ambush) on an Exploration Token into 2x Encounters instead. The rest of the Token remains the same.",
                    "name": "Enemy Tracks"
                },
                {
                    "multi": true,
                    "value": "Choose a specific Enemy Type. From now on you take 1 less Damage from any Attack made by an Enemy of that Type (minimum 1).",
                    "name": "Fighting Style"
                },
                {
                    "requires": "Stealth Strike",
                    "value": "You gain 1 Swamp Fungus Side Bag Token at the start of each Adventure.",
                    "name": "Fungus Grower"
                },
                {
                    "requires": "Mighty Swing",
                    "value": "Once per Fight, use 2 Grit to make an extra Attack this Activation. +2 Max Grit.",
                    "name": "Fury of Jargono"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "melee",
                            "value": -1
                        }
                    ],
                    "requires": "Shield Charge",
                    "value": "Melee To Hit 3+",
                    "name": "Honored Champion"
                },
                {
                    "value": "You are +1 Damage on all of your Attacks against Beast Enemies. Also, gain +2 Initiative in the first turn of an Ambush Attack",
                    "name": "Hunter's Reflexes"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Once per Fight, you may spend un-used movement points from your Move to add Damge to one of your Combat Hits. Ever 2 Move = +1 Damage.",
                    "name": "Jumping Attack"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain D6 Health/Sanity (any mix).",
                    "name": "Lore (Health or Sanity)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore (Health)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health.",
                    "name": "Luck"
                },
                {
                    "requires": "Deep Cuts",
                    "value": "You gain +2 Combat and +2 Shots with any Bow you are using, while there are one or more Extra Large (or bigger) Enemies on the board.",
                    "name": "Master of the Hunt"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
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
                    "requires": "Spinning Slash",
                    "value": "+1 Combat and +1 Strength.",
                    "name": "Mighty Swing"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "value": "Starts with a Swamps of Jargono Personal Item instead of a normal Personal Item. Also, +3 Lore while in Swamps of Jargono.",
                    "name": "Other World Native (Jargono)"
                },
                {
                    "value": "If you start your Activation adjacent to one or more Enemies, Recover a Grit on the D6 roll of 5+. Also, once per turn, while you have a Shield equipped, you may force one Enemy Hit just rolled against you to be Re-rolled.",
                    "name": "Pit Fighter"
                },
                {
                    "value": "You may not use Guns, Books, or Tech items",
                    "name": "Primitive"
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
                    "requires": "Enemy Tracks",
                    "value": "You may add +1 Shot to any Bow you are using. +1 Initiative and +1 Agility.",
                    "name": "Quick Shot"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "value": "You are +1 Move and may move through other models. You are also immune to Poison markers. Extra Starting Gear: Dark Stone Daggers (replaces Tribal Shield and Dark Stone Blade)",
                    "name": "Serpent Slayer"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Battle Stance",
                    "value": "While you have a Shield equipped, you are +1 Combat. +1 Max Grit.",
                    "name": "Shield Bash"
                },
                {
                    "requires": "Shield Bash",
                    "value": "Use 1 Grit, while you have  Shield equipped, to move through other models this turn. Each model moved through takes 2 Wounds, ignoring Defense (limit once per model).",
                    "name": "Shield Charge"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Jumping Attack",
                    "value": "While you have a 2-Handed Item Hand Weapon equipped, you are +1 Damage with Combat Hits. +1 Initiative.",
                    "name": "Spinning Slash"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "Your Critical Hits are +1 Damage and you are +1 to all Escape rolls. +1 Agility.",
                    "name": "Stealth Strike"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "value": "Ranged To Hit: 4+.  Double-shot (Bow) - Once per turn, when you kill an enemy with a Bow, you gain +1 Shot with that Bow. Extra Starting Gear: Jargono Bow (replaces Tribal Shield)",
                    "name": "Treetop Hunter"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Fungus Grower",
                    "value": "You are +2 Health for each Tribal Item you have (max +10). +1 Strength.",
                    "name": "Tribal Warrior"
                }
            ]
        },
        {
            "name": "Indian Scout",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
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
                    "value": "+1 Agility. Also gain 2 Health and +2 Sanity.",
                    "name": "Agility"
                },
                {
                    "value": "Once per Adventure, give all other Heroes +2 Initiative unti the end of the turn. You may Recover 1 Grit.",
                    "name": "Battle Scout"
                },
                {
                    "value": "You may roll 2 dice for Move each turn and choose which to use.",
                    "name": "Cavalry Scout"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Guardian Spirit",
                    "value": "Use 2 Grit to remove a Corruption Point from yourself or an adjacent Hero. +1 Max Grit.",
                    "name": "Cleansing Ritual"
                },
                {
                    "requires": "Warrior's Heart",
                    "value": "Once per Adventure, you may Heal Sanity Damage equal to the number of Enemies you have killed during this Mission. This may be Healed from any mix of Heroes.",
                    "name": "Counting Trophies"
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
                    "value": "+1 Cunning. Also gain +2 Health and +2 Sanity.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Moves in the Shadows",
                    "value": "Use 2 Grit to ignore all damage just done to you by a single source. +1 Max Grit.",
                    "name": "Duck and Roll"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Know Your Prey",
                    "value": "When you successfully Scavenge, you may draw one extra card, then choose one to discard. +1 Cunning.",
                    "name": "Eye for Detail"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Move",
                    "name": "Fast"
                },
                {
                    "requires": "Voices of the Ancestors",
                    "value": "Once per Adventure, you may cancel a Growing Dread or Darkness card on the D6 roll of 3+.",
                    "name": "Guardian Spirit"
                },
                {
                    "multi": true,
                    "value": "+3 Health and +3 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "value": "Once per turn you may Re-roll a single To Hit roll or Defense roll.",
                    "name": "Heightened Senses"
                },
                {
                    "requires": "Eye for Detail",
                    "value": "Once per turn, use 1 Grit to discard and re-draw a Threat card just drawn. Gain 25 XP.",
                    "name": "I Smell Death Here!"
                },
                {
                    "requires": "This Way",
                    "value": "Once per turn, you may Re-roll a Damage roll for one of your Hits.",
                    "name": "Know Your Prey"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +2 Health and +2 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +2 Health and +2 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "Pass Through",
                    "value": "You are now Defense 3+ during the first turn of the Fight.",
                    "name": "Moves in the Shadows"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "You may now roll 2 dice for Escape tests and choose which roll to use. +1 Agility.",
                    "name": "Pass Through"
                },
                {
                    "value": "Use 1 Grit to gain +2 Combat until the end of your turn (Limit once per turn).",
                    "name": "Savage Attack"
                },
                {
                    "requires": "Duck and Roll",
                    "value": "Once per Adventure, transfer 2D6 Wounds from yourself to an adjacent Enemy, ignoring Defense.",
                    "name": "Shadow Strike"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +2 Health and +2 Sanity",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain 2 Health and +2 Sanity.",
                    "name": "Strength"
                },
                {
                    "value": "Once per turn, use 1 Grit to discard and re-draw a Map card just drawn.",
                    "name": "This Way"
                },
                {
                    "value": "Once per Adventure, you may discard and Re-draw an Exploration Token or Encounter card just revealed.",
                    "name": "Tracker"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                },
                {
                    "requires": "Cleansing Ritual",
                    "value": "Once per Fight, use 2 Grit to do one automatic Hit to ever Enemy on your Map Tile. Heal 1 Sanity Damage for each Hit done.",
                    "name": "Vengeful Spirits"
                },
                {
                    "value": "You may take 4 Sanity Damage, ignoring Willpower to Recover a Grit",
                    "name": "Voices of the Ancestors"
                },
                {
                    "requires": "Warrior's Spirit",
                    "value": "Spirit Armor 5+",
                    "name": "Warrior's Heart"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "requires": "Battle Scout",
                    "value": "You may now Activate before Enemies at your Initiative level. +1 Spirit.",
                    "name": "Warrior's Spirit"
                }
            ]
        },
        {
            "name": "Frontier Doc",
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
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Careful Study",
                    "value": "You get Critical Hits on To Hit rolls of 5+ against Enemy Types you have encountered before. +1 Lore.",
                    "name": "Anatomy"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "value": "Use 1 Grit to let every Hero on your Map Tile choose: Discard all Poison Markers or Discard 1 Corruption Point on D6 roll of 4+. +1 Lore.",
                    "name": "Antidote"
                },
                {
                    "value": "You may move through other models during your movement and you automatically pass all Escape tests. At the start of every Fight, Recover 1 Grit",
                    "name": "Battlefield Experience"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Dissection",
                    "value": "You are +1 on Defense rolls against HIts from your Enemy Types you have encountered before. +1 Agility.",
                    "name": "Careful Study"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Ingenuity",
                    "value": "Use 1 Grit and discard any 2 different Side Bag Tokens to create a dynamite token. +1 Max Grit.",
                    "name": "Chemistry"
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
                    "requires": "Anatomy",
                    "value": "+1 Cunning and +1 Initiative and Defense 4+.",
                    "name": "Conclusions"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "requires": "Treatment",
                    "value": "You are immune to the Enemy abilities Fear and Terror. +1 Combat.",
                    "name": "Dispassionate"
                },
                {
                    "value": "Once per turn, when you kill an Enemy with a Combat Hit, Recover a Grit on the D6 roll of 4+. +3 Sanity.",
                    "name": "Dissection"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "requires": "Hold Them Down",
                    "value": "There is no longer a penalty for a 1 result when using Field Surgery. +1 Luck.",
                    "name": "Do No Harm"
                },
                {
                    "multi": true,
                    "value": "Choose another Hero class. From now on, any time you Heal Wounds from a Hero of that Class, Heal an extra +1 Wound and +1 Sanity Damage from them.",
                    "name": "Doc's Speciality"
                },
                {
                    "value": "When using your Field Surgery ability, the Injury/Mutation is Healed on the D6 roll of 4+ now. Extra Starting Gear: Surgeon's Saw.",
                    "name": "Expert Surgeon"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Do No Harm",
                    "value": "While in an Other World, you roll 1 extr die on all Skill tests and, at the start of your Acctivation each turn, you Recover a Grit on the D6 roll of 4+. +1 Max Grit.",
                    "name": "Explorer"
                },
                {
                    "multi": true,
                    "value": "Choose an Other World. From now on, any time you collect XP in that world, collect an extra +5 XP.",
                    "name": "Explorer's Notes"
                },
                {
                    "value": "The first time you encounter a new specific Enemy Type, gain 50 XP (variations count as a new type). Your Attacks are +1 Damage against all Enemy Types you have ever encountered in previous Fights. Extra Starting Gear: Collection Jar.",
                    "name": "Field Research"
                },
                {
                    "value": "Once per Adventure or Town Stay, use 1 Grit to choose an Injury or Mutation on another Hero and roll a D6. On 5+, that Injury/Mutation is Healed (gain 50 XP). On 1, the Hero loses 1 Health Permanently instead. May not be used during a Fight.",
                    "name": "Field Surgery"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Tinkerer",
                    "value": "Once per Fight, you may add a number of Damage to one of your Hits equal to the number of Tech Items you currently carry (max +10). +1 Cunning.",
                    "name": "Gadgeteer"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Dispassionate",
                    "value": "You automatically Heal 2 Wounds at the start of every turn. You may also use Field Surgery on yourself now. +1 Strength.",
                    "name": "Heal Thy Self"
                },
                {
                    "multi": true,
                    "value": "+2D6 Health/Sanity (any mix).",
                    "name": "Health and Sanity"
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
                    "requires": "Antidote",
                    "value": "+1 Combat and +1 Strength.",
                    "name": "Hold Them Down"
                },
                {
                    "value": "Once per turn, when you use the effect of a Side Bag Token, you may use 1 Grit to roll a D6. On the roll of 4+, do not discard the Side Bag Token.",
                    "name": "Ingenuity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "When using Bandages Tokens to Heal yourself or another Hero, add +3 to the roll (or +5 at Hero Level 5 or higher)",
                    "name": "Medical Training"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move. Also gain +D8 Sanity.",
                    "name": "Move"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D8 Health.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength.",
                    "name": "Strength"
                },
                {
                    "requires": "Chemistry",
                    "value": "Use 2 Grit to add the following UPgrade to an Item you are carrying: Gadget (1 Upgrade Slot). The Item gains the Keyword Tech and grants +1 Health (or +1 Damage if a Hand Weapon or Gun).",
                    "name": "Tinkerer"
                },
                {
                    "requires": "Triage",
                    "value": "You now gain 10 XP for each Wound Healed from another Hero. Also once per turn, you may remove 1 status effect marker from yourself or an adjacent Hero.",
                    "name": "Treatment"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Whenever you Heal Wounds from another Hero, Reocver a Grit on the D6 roll of 4+. +1 Max Grit.",
                    "name": "Triage"
                }
            ]
        },
        {
            "name": "Prospector",
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
            "wealth": 0,
            "willpower": 5,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility.  Also gain +D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "requires": "It's Mine!",
                    "value": "While carrying 4 or more weight worth of Items, you are Defense 3+.",
                    "name": "All Mine!"
                },
                {
                    "value": "Start every Adventure with 1 free Dynamite Token in your sidebag. You also gain: Free Attack (once per Fight) - Throw Dynamite",
                    "name": "Blast Miner"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Impressive Facial Hair",
                    "value": "While at half or less Sanity, your Attacks are +1 Damage. +1 Max Grit.",
                    "name": "Crazed"
                },
                {
                    "value": "May not use Guns or Tech items",
                    "name": "Crotchety"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Gold Fever",
                    "value": "Your Attacks are +1 Damage for every Mutation you have (max +3). +1 Max Grit.",
                    "name": "Dark Stone Life"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "value": "The Hero's To Hit rolls of 8+ double the Damage rolled for that Hit. Only usable with weapons that use D8 for To Hit rolls",
                    "name": "Death Blow"
                },
                {
                    "value": "You may Scavenge a Map Tile even if it already has a Scavenged marker on it (Limit one extra Scavenge per Map Tile). Roll one extra die when Scavenging.",
                    "name": "Eagle Eye"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "value": "You may now Scavenge End Caps as though they were full Map Tiles (not including Gates). +1 Move.",
                    "name": "Every Rock"
                },
                {
                    "value": "Whenever the Hero collects Gold or Dark Stone from Loot, Scavenge, or Encounter cards, double the amount collected.",
                    "name": "Expert Miner"
                },
                {
                    "requires": "Crazed",
                    "value": "During an Adventure, once per turn, when collecting Gold, you may Recover 1 Grit.",
                    "name": "Gold Fever"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "After any Hero in the Posse collects Gold from a Loot or Scavenge card, they may collect an extra $25. +1 Max Grit.",
                    "name": "Good Find!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Wheeler Dealer",
                    "value": "When drawing Loot cards, you may spend 1 Grit to discard and Re-draw any number of them. +1 Max Grit.",
                    "name": "Greedy"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity",
                    "name": "Health and Sanity"
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
                    "requires": "Staking Claims",
                    "value": "+1 Combat and +1 Agility",
                    "name": "Hearty Swing"
                },
                {
                    "value": "Once per adventure, you may tug at your facial hair to Recover Grit up to your Max Grit",
                    "name": "Impressive Facial Hair"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Greedy",
                    "value": "You gain the Keyword Outlaw and may now use Shotgun Ranged Weapons. +1 Initiative.",
                    "name": "It's Mine!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "requires": "Every Rock",
                    "value": "When using your Expert Miner ability, you may make a Luck 6+ test. If passed, Triple the amount collected. +1 Luck",
                    "name": "Lucky Bugger"
                },
                {
                    "requires": "Squint Eye",
                    "value": "After Scavenging, you may spend 1 Grit to set aside a Scavenge card drawn. That card is removed from the deck until the end of the Adventure (Limit 4 cards).",
                    "name": "Master Scavenger"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Miner's Vendetta"
                },
                {
                    "requires": "Hearty Swing",
                    "value": "Once per turn, while holding the Lantern, you may spend 1 Grit to Re-roll one of the dice for the Hold Back the Darkness roll.",
                    "name": "Mining Guide"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health",
                    "name": "Side Bag Capacity"
                },
                {
                    "value": "Once per turn, use 1 Grit to double your Initiative and Move, as well as allowing you to automatically pass all Escape tests. Also your Combat Hits are +1 Damage until the end of that turn.",
                    "name": "Speed of Greed"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Lucky Bugger",
                    "value": "Once per turn after drawing a Gear or Artifact card, you may discard it and Re-draw. +1 Max Grit.",
                    "name": "Squint Eye"
                },
                {
                    "requires": "Good Find!",
                    "value": "Once per Adventure, you may cancel and Re-draw an Exploration Token. When selling Gear or Artifact cards in Town, gain an extra D6 x $50",
                    "name": "Staking Claims"
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
                    "value": "+1 Strength and +1 Luck. Also gain D6 Sanity.",
                    "name": "Strength and Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "value": "You may buy Side Bag Tokens in town for half price (round up to nearest $5). +1 Initiative.",
                    "name": "Wheeler Dealer"
                }
            ]
        },
        {
            "name": "Law Man",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "requires": "Teamwork",
                    "value": "Any time you roll a 1 for Move, all Heroes on your Map Tile may Recover 1 Grit. Gain 15 XP for each Grit Recovered.",
                    "name": "Battle Plan"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "You may now Activate before Enemies at your Initiative Level. +1 Max Grit.",
                    "name": "Cold Stare"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "requires": "Relentless",
                    "value": "When using Laying Down the Law, you may re-roll any number of To Hit rolls.",
                    "name": "Cool Head"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "You do +2 Damage on any Hits to an Enemy with a higher Initiative. +1 Max Grit.",
                    "name": "Fair Warning"
                },
                {
                    "value": "Use 1 Grit to add +3 Damage to one of your Hits (limit once per Hit).",
                    "name": "Frontier Justice"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Use 1 Grit to cancel a Darkness card on the D6 roll of 4, 5, or 6 (limit once per turn).",
                    "name": "Iron Will"
                },
                {
                    "requires": "Learning to Live With It",
                    "value": "Use 1 Grit to make all of your Attacks get Critical Hits on rolls of 5 or 6 until the end of your turn.",
                    "name": "Judge, Jury, and Executioner"
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
                    "requires": "Cool Head",
                    "value": "+1 Initiative and +1 Max Grit",
                    "name": "Justice Never Sleeps"
                },
                {
                    "value": "Once per Attack, you may Re-roll one To Hit roll.",
                    "name": "Laying Down the Law"
                },
                {
                    "requires": "Long Arm of the Law",
                    "value": "Any time you kill an Enemy, Heal 2 Sanity Damage.",
                    "name": "Learning to Live With It"
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
                    "requires": "Fair Warning",
                    "value": "+1 Combat and +1 Strength and +1 Max Grit.",
                    "name": "Long Arm of the Law"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Luck"
                },
                {
                    "value": "You may roll 2 dice for Move each turn and choose which to use.",
                    "name": "Man of Action"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "Use 1 Grit to give all other Heroes +1 Initiative and +1 Move until the end of the turn. Gain 30 XP.",
                    "name": "Motivate"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "Temper",
                    "value": "While KO'd, at the start of each turn, roll a D6. On the roll of 5 or 6, Heal D6 Wounds/Sanity (any mix) and place your model back on the board.",
                    "name": "Never Gives Up"
                },
                {
                    "requires": "Motivate",
                    "value": "Once per turn, use 1 Grit to prevent D6 Wounds or Sanity Damage that another Hero would take. Gain 10 XP",
                    "name": "Reassure"
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
                    "requires": "Cold Stare",
                    "value": "+1 Cunning and +1 Initiative",
                    "name": "Relentless"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "requires": "Man of Action",
                    "value": "At the start of a turn, you may reduce your Initiative to 1. If you do, you are Defense 3+ this turn.",
                    "name": "Standing Your Ground"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "value": "Use 1 Grit to Heal 1 Health and 1 Sanity from yourself and every other Hero on your Map Tile - Gain 5 XP for every Wound/Sanity healed from another Hero this way.",
                    "name": "Strong Leadership"
                },
                {
                    "requires": "Reassure",
                    "value": "Use 2 Grit to add your Skill value to another Hero's Skill for a single test. If the test is successful, gain 25 XP.",
                    "name": "Teamwork"
                },
                {
                    "requires": "Standing Your Ground",
                    "value": "Once per turn, use 2 Grit to add +1P Damage to one of your Hits or +2P Damage if you are at less than half Health.",
                    "name": "Temper"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                }
            ]
        },
        {
            "name": "Orphan",
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
            "movement": 0,
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
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "name": "Agility"
                },
                {
                    "requires": "Something to Prove",
                    "value": "Choose one of the Starting Upgrades of your Secondary Hero Class to acquire. This includes any Gear that goes with it.",
                    "name": "All In"
                },
                {
                    "requires": "Lash Out",
                    "value": "Once per turn, when you kill an Enemy, you may Heal D6 Wounds. +5 Health.",
                    "name": "Bloodlust"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Sanity.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "requires": "Hide",
                    "value": "Once per turn, use 1 Grit to ignore a single Enemy Hit against you (before you roll for Defense).",
                    "name": "Dodge"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "When rolling for Discovery on your Orphan Mission, you may roll 1 extra die, then choose one die to discard. +1 Max Grit.",
                    "name": "Grown Up Fast"
                },
                {
                    "multi": true,
                    "value": "You are now +1 Damage on your To Hit rolls of 6+.",
                    "name": "Hardened by the World"
                },
                {
                    "multi": true,
                    "value": "+D6 Health.",
                    "name": "Health"
                },
                {
                    "multi": true,
                    "value": "+2 Health and +2 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Small Target",
                    "value": "Once per Fight, if there are no Enemies adjacent to you, you may Recover 1 Grit.",
                    "name": "Hide"
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
                    "value": "+1 Combat and +1 Strength and +2 Health.",
                    "name": "Hot Temper"
                },
                {
                    "requires": "Over Your Head",
                    "value": "Once per turn, use 1 Grit to force any single die to be Re-rolled, even if it has already been Re-rolled.",
                    "name": "I Can Handle It Myself!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Grown Up Fast",
                    "value": "Once per turn, you may take D3 Corruption Hits to Recover a Grit. May also be used once per Town Stay. +1 Max Grit.",
                    "name": "I'm Not a Kid"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Toe-to-Toe",
                    "value": "Use 2 Grit to add 1P Damage to one of your Hits. +1 Strength.",
                    "name": "Lash Out"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "Start each Adventure with a Revive Token only usable by your Hero",
                    "name": "Need for Vengeance"
                },
                {
                    "value": "Starts with an Orphan Mission",
                    "name": "On a Mission"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Sprint",
                    "value": "While there ar eno other Heroes on your Map Tile, you are Defense 3+. +1 Max Grit.",
                    "name": "Over Your Head"
                },
                {
                    "value": "Always Activates before Enemies at Initiative level and automatically passes all Escape tests",
                    "name": "Quick"
                },
                {
                    "value": "Once per Fight, use 1 Grit to gain: A) +1 Combat and all of your Combat Hits are +1 Damage for one Attack or B) +1 Shot with a Gun for one Attack.",
                    "name": "Rage"
                },
                {
                    "value": "Gain 5 XP x your Hero Level any time you Look Through a Doorway. +2 Move.",
                    "name": "Running Ahead"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "value": "Once per turn, you may Re-roll a single Defense roll.",
                    "name": "Small Target"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Dodge",
                    "value": "While there is only one Enemy adjacent to you, your attacks are +2 Damage against that Enemy. +1 Cunning.",
                    "name": "Sneak Attack"
                },
                {
                    "requires": "I'm Not a Kid",
                    "value": "Any time you kill and Enemy, gain +10 XP (or +50 XP if Large or bigger). +3 Health.",
                    "name": "Something to Prove"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Sanity",
                    "name": "Spirit"
                },
                {
                    "requires": "Running Ahead",
                    "value": "You may now roll the D8 for Move each turn and Recover a Grit on the roll of 1 or 8.",
                    "name": "Sprint"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain +D6 Sanity.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Hot Temper",
                    "value": "While adjacent to a Large or bigger Enemy, your attacks are +1 Damage to that Enemy (or +2 on a Critical Hit). +1 Max Grit.",
                    "name": "Toe-to-Toe"
                },
                {
                    "value": "Armor 6+. You may move through other models during your movement.",
                    "name": "Wiley"
                },
                {
                    "value": "May not Dual Wield Guns. Unless KO'd, may Heal 1 Wound or 1 Sanity Damage at the start of each turn",
                    "name": "Young"
                }
            ]
        },
        {
            "name": "Saloon Girl",
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
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "value": "You may move through other models during your movement. Once per turn you may Re-roll one failed Defense roll.",
                    "name": "Acrobatic Dodge"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "value": "At the end of Hero Turn, you may Heal 1 Wound or 1 Sanity from every other adjacent Hero (gain 5 XP for each Healed this way)",
                    "name": "Comforting Presence"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "value": "All of your Attacks are +1 Damage",
                    "name": "Dirty Fightin'"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Move",
                    "name": "Fast"
                },
                {
                    "requires": "Slip By",
                    "value": "Free Attack: Once per Fight, use during your Move. Do 1 Hit each to up to 3 Enemies adjacent to you.",
                    "name": "Fast as Lightning"
                },
                {
                    "value": "You now gain an extra +5 XP per Wound/Sanity that you Heal from another Hero. +3 Sanity.",
                    "name": "Gentle Manner"
                },
                {
                    "multi": true,
                    "value": "+3 Health and +3 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Witty Retort",
                    "value": "You may carry up to 3 extra Side Bag Tokens. +1 Cunning.",
                    "name": "Hidden Pouch"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Never a Dull Moment",
                    "value": "Use 1 Grit to ignore an Enemy's Defense for one of your Hits. No effect on Tough Enemies. +1 Max Grit.",
                    "name": "Hit 'Em Where It Hurts"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Parry",
                    "value": "Once per Adventure, prevent all Damage you would take from a single source. +1 Lore.",
                    "name": "I Can Take Care of Myself!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Use 1 Grit to double the amount just rolled on one of your Damage rolls (Limit once per Hit).",
                    "name": "Knockout Punch"
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
                    "requires": "Sleight of Hand",
                    "value": "+1 Initiative and +1 Agility and +1 Move.",
                    "name": "Light on Your Feet"
                },
                {
                    "value": "May only use Guns that have the keyword Light",
                    "name": "Lightweight"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore (Health)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore (Sanity)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck (Sanity)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Rough and Tumble",
                    "value": "Any time you roll a No Event result on a Town Location Chart, gain 25 XP and D6 x $10. +1 Lore.",
                    "name": "Never a Dull Moment"
                },
                {
                    "requires": "Spinning Kick",
                    "value": "Any time an adjacent Enemy rolls a 1 To Hit you, do 1 Wound to it, ignoring Defense.",
                    "name": "Parry"
                },
                {
                    "requires": "I Can Take Care of Myself!",
                    "value": "Any time you kill an Enemy with a Combat Hit, you gain +1 Combat for that Attack.",
                    "name": "Rapid Strike"
                },
                {
                    "requires": "Spunky",
                    "value": "You may now use any 1-Handed Gun. +3 Health.",
                    "name": "Rough and Tumble"
                },
                {
                    "value": "Use 1 Grit to Ready a Once Per Fight Item you are carrying. You may also roll an extra die for Scavenging.",
                    "name": "Sleight of Hand"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Light on Your Feet",
                    "value": "You automatically succeed at all Escape tests. +1 Agility.",
                    "name": "Slip By"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "Use 1 Grit to do 2 Wounds to an adjacent Enemy, ignoring Defense. You may move them up to 2 spaces (unless Large). +1 Strength.",
                    "name": "Spinning Kick"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit.",
                    "name": "Spunky"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "requires": "Hidden Pouch",
                    "value": "Melee To Hit 3+",
                    "name": "What You Least Expect"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Gentle Manner",
                    "value": "Once per turn when you kill an Enemy you may Heal 2 Wounds. +1 Max Grit.",
                    "name": "Witty Retort"
                }
            ]
        },
        {
            "name": "Bandido",
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
                }
            ],
            "keywords": "Outlaw",
            "level": 1,
            "melee": 4,
            "movement": 0,
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
            "wealth": 0,
            "willpower": 5,
            "xp": 0,
            "upgrades": [
                {
                    "requires": "Infamy",
                    "value": "Ranged To Hit 4+",
                    "name": "Accuracy"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health.",
                    "name": "Agility"
                },
                {
                    "value": "Once per turn, use 1 Grit to gain +1 Shot with each 1-Handed Gun you fire this turn.",
                    "name": "Barrage"
                },
                {
                    "requires": "Swingin' Fists",
                    "value": "At the start of your Activation, you may choose an Enemy that is not adjacent. You are +2 Damage on all Combat Hits to that Enemy this turn.",
                    "name": "Charge"
                },
                {
                    "requires": "Dark Stone Dynamite",
                    "value": "Once per Fight, when you get a Critical Hit on a Melee Attack, you may discard a Dynamite Token to add 2D6 Damage to the Hit.",
                    "name": "Chew on This!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health.",
                    "name": "Cunning"
                },
                {
                    "multi": true,
                    "value": "When holding up the Outpost Bank in Town, you now steal +$50 for every 5+ rolled.",
                    "name": "Cunning Plan"
                },
                {
                    "requires": "Destruction Artist",
                    "value": "Once per turn, Use 1 Dark Stone when Throwing a Dynamite Token to add +2 Damage to each model Hit.",
                    "name": "Dark Stone Dynamite"
                },
                {
                    "requires": "Rage",
                    "value": "Your Melee Attacks get Critical Hits on rolls of 5 or 6 now.",
                    "name": "Deadly"
                },
                {
                    "requires": "Strong Arm",
                    "value": "Any Explosives you Throw Bounce 1 fewer times than whatever is rolled",
                    "name": "Destruction Artist"
                },
                {
                    "value": "Use 2 Grit to gain a Dynamite Token. Extra Starting Gear: Dynamite Satchel and 2 Dynamite Tokens",
                    "name": "Explosives Expert"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +3 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Steel Nerves",
                    "value": "Once per Town Stay, you may intimidate a local shopkeeper to pay D6 x $25 less for a single Item/Service",
                    "name": "Infamy"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "requires": "Twitch",
                    "value": "You gain double the XP listed on all Loot and Scavenge cards. +1 Spirit.",
                    "name": "Lovable Scoundrel"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Charge",
                    "value": "Once per turn, use 3 Grit to gain +4 Combat for one Attack. +1 Max Grit.",
                    "name": "Rage"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit.",
                    "name": "Sinister Laugh"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Barrage",
                    "value": "Once per turn, you may Re-roll a single failed Willpower save. +1 Max Grit.",
                    "name": "Steel Nerves"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "You may double your Range for Throwing Explosives. +1 Strength.",
                    "name": "Strong Arm"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "value": "Anytime you draw a Loot card, you may discard it and draw a new one. You must keep the second card drawn. You are also +1 Combat.",
                    "name": "Swindler"
                },
                {
                    "value": "Instead of a normal Melee Attack, use 1 Grit to do a 3 Combat Melee Attack to every adjacent Model.",
                    "name": "Swingin' Fists"
                },
                {
                    "value": "You may fire two 1-Handed Guns per turn with no penalty for the off-hand Gun. Extra Starting Gear: Pistol",
                    "name": "Twin Guns"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Sinister Laugh",
                    "value": "Once per Adventure, gain +4 Initiative until the end of the turn. +1 Max Grit.",
                    "name": "Twitch"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                },
                {
                    "value": "You may Recover a Grit on a Move roll of 1 or 2",
                    "name": "Wild Card"
                },
                {
                    "requires": "Lovable Scoundrel",
                    "value": "At the start of each turn, Heal 1 Wound on the D6 roll of 4+. If KO'd, instead you may Recover on the D6 roll of 4+ (you must still roll for Injury/Madness)",
                    "name": "Won't Stay Dead"
                }
            ]
        },
        {
            "name": "Preacher",
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
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Holy",
            "level": 1,
            "melee": 4,
            "movement": 0,
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
                    "type": "Blessing",
                    "xp": 10,
                    "name": "Faith Healing"
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
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Faith while in an Other World. +1 Max Grit.",
                    "name": "Ancient Writing"
                },
                {
                    "value": "New Sermon Blessing",
                    "name": "Belief"
                },
                {
                    "requires": "Belief",
                    "value": "Once per turn, you may Re-roll a single Defense roll",
                    "name": "Chosen"
                },
                {
                    "requires": "Chosen",
                    "value": "New Sermon Blessing. +1 Faith",
                    "name": "Conviction"
                },
                {
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP.",
                    "name": "Crush the Forsaken (Demon)"
                },
                {
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP.",
                    "name": "Crush the Forsaken (Undead)"
                },
                {
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP.",
                    "name": "Crush the Forsaken (Void)"
                },
                {
                    "requires": "Conviction",
                    "value": "Defense +4",
                    "name": "Divine Protection"
                },
                {
                    "value": "Once per turn, when Performing a Judgement Sermon, you may Re-roll one of the Casting Dice.",
                    "name": "Firebrand"
                },
                {
                    "requires": "Stories of the Void",
                    "value": "New Sermon.  You may now hold 5 more Corruption Points before getting a Mutation.",
                    "name": "Forbidden Knowledge"
                },
                {
                    "requires": "Vengeance",
                    "value": "Whenever you kill an adjacent Enemy, before assigning any more Hits, you may Move up to 2 spaces in any direction ignoring Escape tests.",
                    "name": "Frothing Rage"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "value": "You may not use Guns. Starts with 1 Blessing and 1 Judgement.",
                    "name": "Holy Man"
                },
                {
                    "requires": "Salvation",
                    "value": "Anytime you kill a Demon, every Hero on your Map Tile may Heal 1 Wound or Sanity Damage",
                    "name": "Holy Revolution"
                },
                {
                    "requires": "Revelation",
                    "value": "Once per turn, you may Re-roll one of your To Hit rolls.",
                    "name": "Holy Strike"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "multi": true,
                    "value": "You may choose one Injury/Mutation/Madness to Heal.  If you have none, gain +1 Faith.",
                    "name": "Keep the Faith"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Zealot",
                    "value": "Once per turn, you may take 1 Corruption Point, ignoring Willpower, to Heal D6 Health/Sanity (any mix) from yourself or another Hero on your Map Tile. +1 Max Grit.",
                    "name": "Martyr"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "Once per turn, when Performing a Blessing Sermon, you may Re-roll one of the Casting Dice.",
                    "name": "Missionary"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "value": "You may now use 2-Handed Guns. Extra Starting Gear: Shotgun (replaces Holy Book)",
                    "name": "Redemptionist"
                },
                {
                    "value": "New Sermon Judgement",
                    "name": "Revelation"
                },
                {
                    "requires": "Martyr",
                    "value": "Use 2 Grit to remove a Corruption Point from yourself.",
                    "name": "Salvation"
                },
                {
                    "value": "You are +1 Damage on all Attacks against Undead Enemies",
                    "name": "Scourge of the Dead"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Sanity",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Tools of the Damned",
                    "value": "All of your Attacks are +1 Damage against Void Enemies. +1 Lore.",
                    "name": "Stories of the Void"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Ancient Writing",
                    "value": "All of your Attacks are +1 Damage against Demon Enemies. +1 Lore.",
                    "name": "Tools of the Damned"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "requires": "Holy Strike",
                    "value": "New Sermon Judgement. +1 Combat",
                    "name": "Vengeance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Once per turn, you may take 3 Wounds, ignoring Defense, to add +D6 Damage to one your Hits. +1 Max Grit.",
                    "name": "Zealot"
                }
            ]
        }
    ],
    INJURIES: [
        {
            "desc": "Your condition is serious! Any further Injury Chart rolls are only made on a single D6. This Injury is -1 to roll to Heal during Surgery at the Doc's Office in Town.",
            "name": "Internal Bleeding"
        },
        {
            "desc": "One of your hands is twisted and broken. You have one less Hand for equipping Items each turn. 2-Handed Weapons may still be used but they cannot get Critical Hits.",
            "name": "Mangled Hand"
        },
        {
            "desc": "Ouch! Your vision is blurred and cloudy as one of your eyes has been scratched.  You cannot get Critical Hits with your Ranged Attacks.",
            "name": "Gouged Eye"
        },
        {
            "desc": "A dep and painful cut runs across your leg. You are -1 Move (min 1).",
            "modifiers": [
                {
                    "affects": "move",
                    "value": -1
                }
            ],
            "name": "Slashed Leg"
        },
        {
            "desc": "Your ears are ringing a little and you have a headache that won't quit! Until the start of the next Adventure, you are -1 Initiative and roll one less dice on all Skill Test.",
            "name": "Concussion"
        },
        {
            "desc": "Your arm has been bent and crushed a bit. You are -1 Combat.",
            "modifiers": [
                {
                    "affects": "combat",
                    "value": -1
                }
            ],
            "name": "Crushed Arm"
        },
        {
            "desc": "Not particularly debilitating, but it sure hurts! You are -1 Max Grit.",
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
            "modifiers": [
                {
                    "affects": "init",
                    "value": -1
                }
            ],
            "name": "Chest Wound"
        },
        {
            "desc": "You pick yourself up and shake yourself off. There is no long lasting effect.",
            "name": "Wind Knocked Out"
        },
        {
            "desc": "You're a bit of a mess, but it's all superficial. In a lot of ways, you look tougher! You are +1 Max Grit.",
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
            "name": "Ripped Apart"
        }
    ],
    MADNESS: [
        {
            "desc": "It's...sooo...coooolldd! When Scavenging, ignore the first 6 you roll on the Scavenge test.",
            "name": "The Chills"
        },
        {
            "desc": "You shake it off! You're fine...right? There is no long lasting effect.",
            "name": "Get a Grip"
        },
        {
            "desc": "How does it know your name? You can hear it calling you in the dark! Whenever the Hold Back the Darkness roll is failed (including doubles that would fail), you take D3 Sanity Damage, ignoring Willpower saves",
            "name": "It's Coming for You"
        },
        {
            "desc": "Your skin burns and itches as you scratch at it feverishly. At the start of each turn, you take 1 Hit, as you claw at your skin.",
            "name": "The Itching"
        },
        {
            "desc": "You can no longer trust what you see as shadows and tendrils of darkness writhe in every corner of your eye. Any time you would draw a Loot card, roll a D6. On 1, you instead take 1 Sanity Damage, ignoring Willpower as you recoil from the hideous visions!",
            "name": "Hallucinations"
        },
        {
            "desc": "You have descended into the dark depths of purest Madness! Your Hero is, for all intents and purposes, considered to be Dead.",
            "name": "Lost to the Darkness"
        },
        {
            "desc": "You feel the ebb and flow of the Void energy all around you. You no longer get a Willpower save to prevent Corruption Hits.",
            "name": "Open to the Void"
        },
        {
            "desc": "They're out to get you...all of them! Anytime you want to Scavenge or Explore a Doorway, you must first roll a D6. On 1, 2, or 3, you cannot as you are distracted keeping an eye on the other Heroes with you.",
            "name": "Paranoia"
        },
        {
            "desc": "They're telling you to kill...again! Any time you end your Move adjacent to another Hero, roll a D6. On 1 or 2, that Hero takes 3 Hits as you lash out at them!",
            "name": "Hearing Voices"
        },
        {
            "desc": "Your fractured state of mind is in shambles, and you are ready to slip over the edge at any moment. Any further Madness Chart rolls are only made on a single D6. This Madness is -1 to the roll to Heal during an Exorcism at the Church in Town.",
            "name": "Delusions"
        },
        {
            "desc": "You've come back from the brink of madness...and are stronger for it! You are +1 Max Grit.",
            "modifiers": [
                {
                    "affects": "grit",
                    "value": 1
                }
            ],
            "name": "I've Seen Things"
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
    SAMURAI_TACTICS: [
        {
            "name": "Whirlwind Strike",
            "desc": "Every adjacent Enemy model immediately takes 1 Hit that does Peril die + Your Hero Level in damage",
            "cost": 5
        },
        {
            "name": "Lightning Slice",
            "desc": "Choose an adjacent space. Every model in that space or 2 spaces in a line direclty behind it take D3+1 Wounds ignoring Defense. L3: 5 spaces; L5: Peril die Damage; L7: Ignores Armor and Endurance",
            "cost": 6
        },
        {
            "name": "Thunder Smash",
            "desc": "Every Enemy model within D3 spaces of you immediately takes 1 Wound ignoring Defense. L3: D6 spaces; L6: 2 Wounds",
            "cost": 4
        },
        {
            "name": "Dancing Dragon",
            "desc": "Spend Fury up to your Level to use. Target Enemy model up to 2 spaces away and move to share their space, placing a Fury token on that space. Then make an Agility 5+ test. If passed, repeat this process, not targeting the same Enemy more than once. When no targets or Fury remain or if failed, move adjacent to final target. Each Enemy takes Wounds equal to Fury tokens placed, ignoring Defense, and remove Fury tokens.",
            "cost": 1
        },
        {
            "name": "Dragon Fire",
            "desc": "Until end of turn, place 1 Burning Marker on an Enemy you do one or more Combat Hits to. L3: +1 Combat this turn, L6: 2 Burning Markers",
            "cost": 5
        },
        {
            "name": "Weeping Blade",
            "desc": "Add +D6 Damage to one Critical Hit while using Blade. L3: Usable on To-Hit 6+ even if immune to Criticals; L6: +Peril die Damage",
            "cost": 3
        },
        {
            "name": "Sword Block",
            "desc": "Roll D3 + Hero Level and prevent that much Damage to you or adjacent model from single Hit. Only usable while Blade is equipped. L3: D6 + Hero Level, L5: Enemy takes 1 Combat Hit from you",
            "cost": 2
        },
        {
            "name": "Battle Cry",
            "desc": "During next activation, all Heroes gain +1 Shot or +1 Combat. 1x Fight. L5: +1 Damage to all Heroes' Attacks during next Activation",
            "cost": 6
        },
        {
            "name": "Flowing Water",
            "desc": "Move up to 2 spaces, auto pass escape test and passing through Enemy spaces. Usable at any time, including during an Attack. L3: Usable multiple times per turn. L5: 3 spaces",
            "cost": 3
        },
        {
            "name": "Blowing Reeds",
            "desc": "Immediately move to an empty space adjacent to another Hero on same Map Tile. Replaces your normal Move for the Turn. L2: Any model, not just Hero; L4: same or adjacent Map Tile; L6: May swap places with other model.",
            "cost": 5
        },
        {
            "name": "Meditation",
            "desc": "Spend Fury up to Hero Level to use. Use only at start of a turn. Init reduced to 1 for Turn. For each Fury spent, Heal 2 Health/Sanity (any mix). L2: Init 2; L4: If 3+ Fury spent, recover 1 Grit; L6: Init -2",
            "cost": 1
        },
        {
            "name": "Rejuvenate",
            "desc": "Spend 2 Fury to remove a status effect or 4 Fury to remove 1 Corruption Point. Usable any time, multiple times per turn",
            "cost": 2
        }
    ],
    SHAMAN_SPELLS: [
        {
            "name": "Warrior's Speed",
            "desc": "Select a Hero on same or adjacent Map Tile (including yourself). Until end of turn, that Hero has +1 Initiative, +3 Move, and +1 to Escape tests",
            "power": 5,
            "xp": 0
        },
        {
            "name": "Charged Hatchet",
            "desc": "For each casting roll of 5+ assigned to this Spell, add +1 Damage to one of your Combat Hits this turn",
            "power": 0,
            "xp": 0
        },
        {
            "name": "Call Down the Storm",
            "desc": "Use only during a Fight. At start of each turn, roll D8. Every Enemy with Init less than the roll has Move reduced to half and on the D6 roll of 5+ is struck by lightning, taking a Hit that does D6+2 Damage. At start of each turn, Storm ends unless caster spends 2 Magik or 1 Dark Stone. Cancels any other Weather or Storm in play",
            "power": 13,
            "xp": 20
        },
        {
            "name": "Tribal Wrath",
            "desc": "Use only during Fight. You and every adjacent Hero are +1 Damage on all Attacks until end of Turn",
            "power": 9,
            "xp": 5
        },
        {
            "name": "Lightning Field",
            "desc": "Use only during Fight. Roll a D6 for every adjacent Enemy. On 5+, it takes 1 Wound ignoring Defense",
            "power": 7,
            "xp": 0
        },
        {
            "name": "Spirit War",
            "desc": "Select Enemy within 3 spaces. For each casting roll of 5+ assigned to this spell, place Sanity marker on that Enemy (keyword Ancient or Magik require 6+). For each 1 or 2, you take 1 Sanity Damage ignoring Willpower. Enemies are -1 Defense for each Sanity marker (or 2 markers if Large+)",
            "power": 0,
            "xp": 5
        },
        {
            "name": "Ancestral Shield",
            "desc": "Select hero on same or adjacent map tile. Target absorbs Wounds equal to 2 + caster's level after which it is destroyed. At start of each turn, spend 1 Magik or shield ends. Limit 1 cast at a time",
            "power": 5,
            "xp": 5
        },
        {
            "name": "Runic Circle",
            "desc": "Place runic circle within 8 spaces of you. Any Hero in space may re-roll 1 Defense roll per turn and Heals 2 Wounds at end of turn. At start of each turn, requires 2 Magik or 1 Dark Stone be spent to maintain. Limit 1 cast at a time",
            "power": 11,
            "xp": 25
        },
        {
            "name": "Inner Fire",
            "desc": "Choose any Hero on same or adjacent Map Tile (including you). For each casting roll of 4+, Heal 1 Sanity Damage (+5XP for other Heros healed). If at least 1 6+ is assigned, you may remove 1 Corruption Point from the target",
            "power": 0,
            "xp": 10
        },
        {
            "name": "Spirit Binding",
            "desc": "Choose any Demon, Void, or Ghost enemy on same or adjacent map tile. -1 Defense until end of turn and if it tries to move, make a Strength 5+ test to prevent (6+ if Large+)",
            "power": 8,
            "xp": 10
        },
        {
            "name": "Shadow Vision",
            "desc": "Cast this spell when a Growing Dread would be added to stack. If successful, cancel that card",
            "power": 15,
            "xp": 20
        },
        {
            "name": "Astral Projection",
            "desc": "Replaces caster's next Activation. Choose one: Darkness deck, any Threat deck, any Encounter deck, or Growing Dread stack. Look at top 2 cards. May choose 1 and make Spirit 6+ test to discard that card.  Put cards back in any order.",
            "power": 13,
            "xp": 25
        },
        {
            "name": "Bear Form",
            "desc": "Cast to transform into Bear Form. +2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
            "power": 11,
            "xp": 30
        },
        {
            "name": "Mouse Form",
            "desc": "Cast to transform into Mouse Form. +3 Init, +2 Agility, Defense 3+, -1 Combat, Auto pass all Escape tests, may move through other models, can only be hit on To-Hit of 6+, Use 1 Grit when transforming back in same space as Enemy to make Growth attack (moved and D6 Wounds ignoring Defense).  You may automatically transform back at start of your Activation on any future turn or if KO'd",
            "power": 6,
            "xp": 20
        },
        {
            "name": "Wolf Form",
            "desc": "Cast to transform into Wolf Form. +2 Cunning, +2 Init, +2 Move, 1x Turn use 1 Grit to cause adjacent Enemies -1 Defense for turn, +1 Combat for each adjacent Hero or +1 Damage if none.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
            "power": 9,
            "xp": 20
        },
        {
            "name": "Buffalo Charge",
            "desc": "Use at start of Activation, replaces caster's Move. For each casting 5+, move 2 spaces ignoring Escape tests. Any model moved through takes 1 Hit for D6 + Hero Level Damage.",
            "power": 0,
            "xp": 10
        },
        {
            "name": "Cougar Strike",
            "desc": "Use only during your Activation. Do Hero Level basic Hits (no modifiers) to one adjacent model.",
            "power": 6,
            "xp": 10
        },
        {
            "name": "Eagle Flight",
            "desc": "Use only during your Activation, replaces caster's Move. Move 2D6 spaces ignoring Escape tests, models, and obstacles.",
            "power": 10,
            "xp": 5
        }
    ],
    GAMBLER_TRICKS: [
        {
            "name": "Fortune's Favor",
            "desc": "Use 1 Fortune token to re-roll any single die just rolled, even if it has already been re-rolled. Only usable on rolls that allow Grit."
        },
        {
            "name": "Tip the Scales",
            "desc": "Use 1 Fortune token to choose any single die just rolled and make a Luck 5+ test. For each 5+ rolled, you may add or subtract 1 from the chosen die roll. Cannot be adjusted higher than natural roll maximum and cannot target die that Grit cannot be used on.",
            "xp": 10
        },
        {
            "name": "Stack the Deck",
            "desc": "Use 1 Fortune token to choose any card deck then make a Cunning 6+ test. If passed, look at the top 3 cards. Choose one to discard and put the other two back in any order. May only be used on decks with discard piles.",
            "xp": 10
        },
        {
            "name": "Bluff",
            "desc": "Use 1 Fortune token when you are about to be Attacked by an Enemy to make a Luck 6+ test. If passed, that Attack is canceled. If failed, all Hits from that Attack are +1 Damage against you",
            "xp": 20
        },
        {
            "name": "Double Down",
            "desc": "1x Fight, use 1 Fortune token when you are about to make a Damage roll for one of your Hits. Double the amount rolled for Damage (before modifiers). If the target would not be killed by this Hit, the Hit does no Damage instead.",
            "xp": 0
        },
        {
            "name": "Counting Cards",
            "desc": "Use 1 Fortune token just after a card has been drawn from any deck and make a Cunning 6+ test. If passed, place that card here facedown and draw a new card to play instead. Any card already here is placed back in its proper deck, D3 cards down from the top",
            "xp": 15
        },
        {
            "name": "Ace in the Hole",
            "desc": "If there is no die here, use 1 Fortune token when you roll a 6 on any single die to place that die here. Roll a new die to replace the 6 just rolled. While there is a die here, use 1 Fortune token to make a Luck 5+ test. If passed, replace any single die just rolled with the 6 that was here (removing the die)",
            "xp": 10
        },
        {
            "name": "Cheat",
            "desc": "Use 2 Fortune tokens and take 1 Corruption Hit to select any number of dice just rolled and make a Cunning 6+ test. If passed, for each 6+ rolled, choose one of the selected dice and rotate it to be on any facing you like. Only usable on rolls that allow Grit.",
            "xp": 25
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
                    "affects": "health.max",
                    "value": 2
                }
            ],
            "name": "Find Yer Kin"
        },
        {
            "desc": "+1 Max Grit. Requires 4 Discoveries. Reward: Start each Adventure with 1 extra Grit.",
            "modifiers": {
                "affects": "grit.max",
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
    ]
};
//# sourceMappingURL=data.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editor_editor_component__ = __webpack_require__(235);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItemsComponent = (function () {
    function ItemsComponent(modalService) {
        this.modalService = modalService;
        this.weightLimit = 0;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.onError = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.confirming = {};
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.updateTotals();
    };
    ItemsComponent.prototype.ngOnDestroy = function () {
        this.items = null;
        this.totalWeight = null;
        this.totalDarkstone = null;
        this.modalService = null;
    };
    ItemsComponent.prototype.updateTotals = function () {
        var weight = 0;
        var stone = 0;
        this.items.forEach(function (item) {
            weight += item.weight ? item.weight : 0;
            stone += item.darkstone ? item.darkstone : 0;
        });
        this.totalWeight = weight;
        this.totalDarkstone = stone;
    };
    ItemsComponent.prototype.addItem = function () {
        var _this = this;
        var item = {
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
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_2__editor_editor_component__["a" /* ItemEditorComponent */]);
        ref.instance.item = item;
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.items.push(event.value);
                _this.updateTotals();
                _this.onSave.emit({ type: "item.added", value: event.value });
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
    };
    ItemsComponent.prototype.editItem = function (index) {
        var _this = this;
        var item = this.items[index];
        var editable = JSON.parse(JSON.stringify(item));
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_2__editor_editor_component__["a" /* ItemEditorComponent */]);
        ref.instance.item = editable;
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.items[index] = event.value;
                _this.updateTotals();
                _this.onSave.emit({ type: "item.updated", value: event.value });
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
    };
    ItemsComponent.prototype.removeItem = function (index) {
        delete this.confirming[index];
        var rem = this.items.splice(index, 1);
        this.onSave.emit({ type: "item.removed", value: rem });
    };
    ItemsComponent.prototype.equipItem = function (item) {
        //if equipping the item, unequip anything already in that slot
        if (!item.equipped)
            this.unEquipItemAtSlot(item.slot);
        item.equipped = !item.equipped;
        this.onSave.emit({ type: "item.equipped", value: item });
    };
    ItemsComponent.prototype.unEquipItemAtSlot = function (slot) {
        if (!slot)
            return;
        var item = this.items.find(function (it) { return it.slot === slot; });
        if (item && item.equipped)
            item.equipped = false;
    };
    ItemsComponent.prototype.confirmingDelete = function (index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    };
    return ItemsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], ItemsComponent.prototype, "items", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], ItemsComponent.prototype, "weightLimit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], ItemsComponent.prototype, "onSave", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], ItemsComponent.prototype, "onError", void 0);
ItemsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'items',
        template: __webpack_require__(615),
        styles: [__webpack_require__(583)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__modal_service__["a" /* ModalService */]) === "function" && _c || Object])
], ItemsComponent);

var _a, _b, _c;
//# sourceMappingURL=items.component.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestore_service__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, service) {
        this.router = router;
        this.service = service;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getAuth().subscribe(function (user) {
            if (user !== null) {
                _this.message = "Welcome " + user.email + "!";
                setTimeout(function () {
                    _this.router.navigate(['/chars']);
                }, 1000);
            }
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (!this.email || !this.password) {
            this.message = "Specify your email address and password";
            return;
        }
        this.service.login(this.email, this.password).then(function (user) {
            _this.router.navigate(['/chars']);
        });
    };
    LoginComponent.prototype.resetPassword = function () {
        var _this = this;
        if (!this.email) {
            this.message = "Specify your email address to reset your password";
            return;
        }
        this.service.resetPassword(this.email)
            .then(function () {
            _this.message = "Password reset email sent";
        })
            .catch(function (e) {
            _this.message = "There was an error resetting your password: " + e.message;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'login',
        template: __webpack_require__(616),
        styles: [__webpack_require__(584)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__firestore_service__["a" /* FirestoreService */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MimComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MIM = {
    MUTATIONS: "mutations",
    INJURIES: "injuries",
    MADNESS: "madness"
};
var MimComponent = (function () {
    function MimComponent(afs) {
        this.afs = afs;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
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
    MimComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mutations = this.current.filter(function (m) { return !m.group || m.group.toLowerCase() == MIM.MUTATIONS; });
        this.injuries = this.current.filter(function (m) { return m.group && m.group.toLowerCase() == MIM.INJURIES; });
        this.madness = this.current.filter(function (m) { return m.group && m.group.toLowerCase() == MIM.MADNESS; });
        this.afs.getMutations().then(function (mutations) {
            _this.options[MIM.MUTATIONS] = mutations;
            _this.updateAvailable(MIM.MUTATIONS);
        });
        this.afs.getInjuries().then(function (injuries) {
            _this.options[MIM.INJURIES] = injuries;
            _this.updateAvailable(MIM.INJURIES);
        });
        this.afs.getMadness().then(function (madness) {
            _this.options[MIM.MADNESS] = madness;
            _this.updateAvailable(MIM.MADNESS);
        });
    };
    MimComponent.prototype.ngOnDestroy = function () {
        this.mutations = null;
        this.injuries = null;
        this.madness = null;
        this.options = null;
        this.available = null;
        this.newMutation = null;
        this.newInjury = null;
        this.newMadness = null;
    };
    MimComponent.prototype.add = function (type, value) {
        if (!this[type])
            this[type] = [];
        if (value.group)
            value.group = type;
        this.showAvailable[type] = false;
        this[type].push(value);
        this.current.push(value);
        this.updateAvailable(type);
        this.onSave.emit({ type: "mutation.added", value: value });
    };
    MimComponent.prototype.remove = function (type, index) {
        var rem = this[type].splice(index, 1);
        this.current.forEach(function (mim, idx) {
            if (mim.group === type && mim.name === rem.name)
                index = idx;
        });
        if (index >= 0)
            this.current.splice(index, 1);
        this.updateAvailable(type);
        this.onSave.emit({ type: "mutation.removed", value: rem });
    };
    MimComponent.prototype.updateAvailable = function (type) {
        var takenNames = this[type].map(function (a) { return a.name; });
        this.available[type] = this.options[type].filter(function (a) {
            //return only those that can be chosen multiple times
            // or haven't already been chosen
            return takenNames.indexOf(a.name) < 0;
        });
    };
    return MimComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], MimComponent.prototype, "current", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], MimComponent.prototype, "onSave", void 0);
MimComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'mim',
        template: __webpack_require__(617),
        styles: [__webpack_require__(585)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _b || Object])
], MimComponent);

var _a, _b;
//# sourceMappingURL=mim.component.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChooserComponent = (function () {
    function ChooserComponent() {
        this.closable = true;
        this.visible = true;
        this.selection = null;
    }
    ChooserComponent.prototype.ngOnInit = function () { };
    ChooserComponent.prototype.ngOnDestroy = function () {
        this.options = null;
        this.selection = null;
        this.closable = false;
        this.visible = false;
        this.onClose = null;
    };
    ChooserComponent.prototype.close = function () {
        this.visible = false;
        this.onClose({ apply: false, value: null });
    };
    ChooserComponent.prototype.apply = function () {
        this.visible = false;
        var value = JSON.parse(JSON.stringify(this.selection));
        this.onClose({ apply: true, value: value });
    };
    ChooserComponent.prototype.choose = function (value) {
        if (this.isChosen(value))
            this.selection = null;
        else
            this.selection = value;
    };
    ChooserComponent.prototype.isChosen = function (value) {
        return this.selection && this.selection['name'] === value['name'];
    };
    ChooserComponent.prototype.hasSelection = function () {
        return this.selection !== null;
    };
    return ChooserComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Array)
], ChooserComponent.prototype, "options", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ChooserComponent.prototype, "closable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], ChooserComponent.prototype, "visible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], ChooserComponent.prototype, "onClose", void 0);
ChooserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'option-chooser',
        template: __webpack_require__(618),
        styles: [__webpack_require__(586)],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* trigger */])('dialog', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('void => *', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.3, .3, .3)' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100)
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* transition */])('* => void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* animate */])(100, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* style */])({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], ChooserComponent);

//# sourceMappingURL=chooser.component.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keypad_keypad_component__ = __webpack_require__(237);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValueDisplayComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return XPValueDisplayComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ValueDisplayComponent = (function () {
    function ValueDisplayComponent(modalService) {
        this.modalService = modalService;
        this.value = 0;
        this.canAdjust = true;
        this.min = 0;
        this.step = 1;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.computed = 0;
        this.options = { min: 0 };
    }
    ValueDisplayComponent.prototype.ngOnInit = function () {
        if (typeof (this.canAdjust) === 'undefined')
            this.canAdjust = true;
        var modifier = this.modifiers ? this.modifiers.value * 1 : 0;
        this.computed = this.value * 1 + modifier;
        // console.log(this.label + ": " + this.value + " + " + modifier + " = " + this.computed + " (" + this.isModified() + ")");
    };
    ValueDisplayComponent.prototype.ngOnChanges = function (changes) {
        // console.log("VD.ngOnChanges (" + this.label + "): " + JSON.stringify(changes.value) + " / " + changes.modifiers);
        if (changes.value && !changes.value.firstChange) {
            this.onValueChange(changes.value.currentValue);
        }
        else if (changes.modifiers) {
            this.onValueChange(this.value);
        }
    };
    ValueDisplayComponent.prototype.onValueChange = function (newValue) {
        // console.log("VD.onValueChange() - new '" + newValue + "' vs current '" + this.value + "'");
        if (this.value !== newValue * 1)
            this.value = newValue * 1;
        this.options.valueSize = (this.value > 999) ? 'sm' : null;
        var modifier = this.modifiers ? this.modifiers.value * 1 : 0;
        if (modifier) {
            // console.log("Value Display using modifier (" + modifier + ") for " + this.label);
            this.computed = this.value * 1 + modifier;
        }
        else {
            this.computed = this.value * 1;
        }
    };
    ValueDisplayComponent.prototype.isModified = function () {
        return !!this.modifiers;
    };
    ValueDisplayComponent.prototype.increment = function () {
        if (!this.canIncrement())
            return;
        this.onValueChange(this.value * 1 + this.step * 1);
        this.onSave.emit({ label: this.label, value: this.value });
    };
    ValueDisplayComponent.prototype.decrement = function () {
        if (!this.canDecrement())
            return;
        this.onValueChange(this.value * 1 - this.step * 1);
        this.onSave.emit({ label: this.label, value: this.value });
    };
    ValueDisplayComponent.prototype.canIncrement = function () {
        return !this.options ||
            typeof (this.options.max) === 'undefined' ||
            this.value * 1 < this.options.max * 1;
    };
    ValueDisplayComponent.prototype.canDecrement = function () {
        return !this.options ||
            typeof (this.options.min) === 'undefined' ||
            this.value * 1 > this.options.min * 1;
    };
    ValueDisplayComponent.prototype.openKeypad = function () {
        // let closeFn = this.modalService.open(ModalComponent);
        var _this = this;
        var kpRef = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_2__keypad_keypad_component__["a" /* KeypadComponent */]);
        var instance = kpRef.instance;
        instance.visible = true;
        instance.value = this.computed;
        instance.modifiers = this.modifiers;
        instance.onClose = function (event) {
            try {
                _this.modalService.destroyRef(kpRef, 0);
            }
            catch (e) {
                console.log("Error destroying modal service ref: " + e.message);
            }
            if (event.apply) {
                var change = event.value * 1;
                var current = _this.value * 1;
                current += change - _this.computed;
                try {
                    _this.onValueChange(current);
                }
                catch (e) {
                    console.log("VD keypad - Error changing value: " + e.message);
                }
                try {
                    _this.onSave.emit({ label: _this.label, value: _this.value });
                }
                catch (e) {
                    console.log("VD keypad - Error emitting save event " + e.message);
                }
            }
        };
        var kpElement = this.modalService.getDomElementFromComponentRef(kpRef);
        this.modalService.addChild(kpElement);
    };
    return ValueDisplayComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], ValueDisplayComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ValueDisplayComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", String)
], ValueDisplayComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], ValueDisplayComponent.prototype, "canAdjust", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], ValueDisplayComponent.prototype, "min", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], ValueDisplayComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], ValueDisplayComponent.prototype, "step", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], ValueDisplayComponent.prototype, "onSave", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ValueDisplayComponent.prototype, "options", void 0);
ValueDisplayComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'value-display',
        template: __webpack_require__(620),
        styles: [__webpack_require__(588)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__modal_service__["a" /* ModalService */]) === "function" && _b || Object])
], ValueDisplayComponent);

var XPValueDisplayComponent = (function (_super) {
    __extends(XPValueDisplayComponent, _super);
    function XPValueDisplayComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needed = 9999;
        _this.onLevel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        return _this;
    }
    XPValueDisplayComponent.prototype.hasLeveled = function () {
        return this.value >= this.needed;
    };
    return XPValueDisplayComponent;
}(ValueDisplayComponent));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], XPValueDisplayComponent.prototype, "needed", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _c || Object)
], XPValueDisplayComponent.prototype, "onLevel", void 0);
XPValueDisplayComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'xp-value-display',
        template: __webpack_require__(621),
        styles: [__webpack_require__(589)]
    })
], XPValueDisplayComponent);

var _a, _b, _c;
//# sourceMappingURL=value-display.component.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebagComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidebagComponent = (function () {
    function SidebagComponent() {
        this.hasDynamiteSatchel = false;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.carrying = 0;
        this.max = 0;
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
            { label: "fireSake", description: "discard to gain D3 Fury tokens" },
            { label: "nectar", description: "discard to Recover D3 Grit" },
            { label: "stake", description: "(free attack) discard for Combat 1. Critical Hit on 5 or 6. +1 Damage vs Beast or Undead Enemy or +2 Damage vs Vampire Enemy" }
        ];
    }
    SidebagComponent.prototype.ngOnInit = function () {
        this.max = this.getAvailableSidebagCapacity();
    };
    SidebagComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.hasDynamiteSatchel) {
            var prev = changes.hasDynamiteSatchel.previousValue;
            var curr = changes.hasDynamiteSatchel.currentValue;
            if (prev !== curr) {
                this.getAvailableSidebagCapacity();
            }
        }
    };
    SidebagComponent.prototype.save = function () {
        this.onSave.emit({ type: "sidebag" });
        this.max = this.getAvailableSidebagCapacity();
    };
    SidebagComponent.prototype.getAvailableSidebagCapacity = function () {
        if (!this.sidebag)
            return 0;
        var carrying = 0;
        for (var i = 0; i < this.options.length; ++i) {
            var option = this.options[i];
            var amount = this.sidebag[option.label] || 0;
            if ('dynamite' === option.label && this.hasDynamiteSatchel) {
                //if hero has dynamiteSatchel equipped,
                // ignore the first five dynamite tokens
                amount = Math.max(0, amount - 5);
            }
            carrying += amount;
        }
        this.carrying = carrying;
        var remaining = this.sidebag.capacity - carrying;
        if (this.modifiers) {
            //adjust for modified carrying capacity
            remaining += (this.modifiers.value || 0);
        }
    };
    SidebagComponent.prototype.updateCapacity = function ($event) {
        this.save();
    };
    SidebagComponent.prototype.increase = function (option) {
        if (this.getAvailableSidebagCapacity() < 1)
            return;
        var value = this.sidebag[option] || 0;
        value += 1;
        this.sidebag[option] = value;
        this.save();
    };
    SidebagComponent.prototype.decrease = function (option) {
        var value = this.sidebag[option] || 0;
        if (value > 0) {
            value -= 1;
            this.sidebag[option] = value;
            this.save();
        }
    };
    return SidebagComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], SidebagComponent.prototype, "sidebag", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], SidebagComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Boolean)
], SidebagComponent.prototype, "hasDynamiteSatchel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], SidebagComponent.prototype, "onSave", void 0);
SidebagComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'sidebag',
        template: __webpack_require__(622),
        styles: [__webpack_require__(590)]
    }),
    __metadata("design:paramtypes", [])
], SidebagComponent);

var _a;
//# sourceMappingURL=sidebag.component.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamblerTricksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GamblerTricksComponent = (function () {
    function GamblerTricksComponent(afs, modalService) {
        this.afs = afs;
        this.modalService = modalService;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.maxFortune = 0;
        this.confirming = {};
    }
    GamblerTricksComponent.prototype.ngOnInit = function () {
        this.maxFortune = this.maxFortune || this.character.fortune.max;
    };
    GamblerTricksComponent.prototype.ngOnChanges = function (changes) {
        if (changes.modifiers) {
            this.maxFortune = this.character.fortune.max;
            var mod = changes.modifiers.currentValue;
            if (mod && !isNaN(mod.value))
                this.maxFortune += (mod.value * 1);
        }
    };
    GamblerTricksComponent.prototype.ngOnDestroy = function () {
        this.character = null;
        this.modifiers = null;
        this.maxFortune = null;
        this.afs = null;
    };
    GamblerTricksComponent.prototype.add = function (trick) {
        this.character.tricks.push(trick);
        this.onSave.emit({ type: "gamblerTrick", value: trick });
    };
    GamblerTricksComponent.prototype.remove = function (index) {
        if (index >= 0) {
            delete this.confirming[index];
            var rem = this.character.tricks.splice(index, 1);
            this.onSave.emit({ type: "gamblerTrick", value: rem });
        }
    };
    GamblerTricksComponent.prototype.gainXP = function (amount) {
        if (amount) {
            this.character.xp += amount * 1;
            this.onSave.emit({});
        }
    };
    GamblerTricksComponent.prototype.hasFortune = function () {
        return this.character.fortune.current > 0;
    };
    GamblerTricksComponent.prototype.spendFortune = function () {
        if (this.character.fortune.current > 0) {
            this.character.fortune.current -= 1;
            this.onSave.emit({});
        }
    };
    GamblerTricksComponent.prototype.resetFortune = function () {
        this.character.fortune.current = this.maxFortune;
        this.onSave.emit({});
    };
    GamblerTricksComponent.prototype.getAvailableTricks = function () {
        var takenNames = (this.character.tricks || []).map(function (a) { return a.name; });
        return this.afs.getGamblerTricks().then(function (tricks) {
            return tricks.filter(function (a) {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    };
    GamblerTricksComponent.prototype.openChooser = function () {
        var _this = this;
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__["a" /* GamblerTricksChooserComponent */]);
        ref.instance.options = [];
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.add(event.value);
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailableTricks().then(function (options) {
            ref.instance.options = options;
        });
    };
    GamblerTricksComponent.prototype.confirmingDelete = function (index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    };
    return GamblerTricksComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"]) === "function" && _a || Object)
], GamblerTricksComponent.prototype, "character", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], GamblerTricksComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], GamblerTricksComponent.prototype, "onSave", void 0);
GamblerTricksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'gambler-tricks',
        template: __webpack_require__(624),
        styles: [__webpack_require__(592)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */]) === "function" && _d || Object])
], GamblerTricksComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=gambler-tricks.component.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotesComponent = (function () {
    function NotesComponent() {
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.needsSaving = false;
    }
    NotesComponent.prototype.ngOnInit = function () { };
    NotesComponent.prototype.saveChanges = function () {
        this.onSave.emit({ type: 'notes', value: this.notes });
        this.needsSaving = false;
    };
    NotesComponent.prototype.onValueChange = function (change) {
        this.needsSaving = true;
    };
    return NotesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", String)
], NotesComponent.prototype, "notes", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _a || Object)
], NotesComponent.prototype, "onSave", void 0);
NotesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'char-notes',
        template: __webpack_require__(625),
        styles: [__webpack_require__(593)]
    }),
    __metadata("design:paramtypes", [])
], NotesComponent);

var _a;
//# sourceMappingURL=notes.component.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrphanMissionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrphanMissionsComponent = (function () {
    function OrphanMissionsComponent(afs, modalService) {
        this.afs = afs;
        this.modalService = modalService;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.confirming = {};
    }
    OrphanMissionsComponent.prototype.ngOnInit = function () { };
    OrphanMissionsComponent.prototype.ngOnDestroy = function () {
        this.character = null;
        this.modifiers = null;
        this.afs = null;
    };
    OrphanMissionsComponent.prototype.add = function (mission) {
        this.character.missions.push(mission);
        this.onSave.emit({});
    };
    OrphanMissionsComponent.prototype.remove = function (index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.missions.splice(index, 1);
            this.onSave.emit({});
        }
    };
    OrphanMissionsComponent.prototype.getAvailable = function () {
        var takenNames = (this.character.missions || []).map(function (a) { return a.name; });
        return this.afs.getOrphanMissions().then(function (missions) {
            return missions.filter(function (a) {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    };
    OrphanMissionsComponent.prototype.openChooser = function () {
        var _this = this;
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__["a" /* OrphanMissionsChooserComponent */]);
        ref.instance.options = [];
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.add(event.value);
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailable().then(function (options) {
            ref.instance.options = options;
        });
    };
    OrphanMissionsComponent.prototype.confirmingDelete = function (index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    };
    return OrphanMissionsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"]) === "function" && _a || Object)
], OrphanMissionsComponent.prototype, "character", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], OrphanMissionsComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], OrphanMissionsComponent.prototype, "onSave", void 0);
OrphanMissionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'orphan-missions',
        template: __webpack_require__(627),
        styles: [__webpack_require__(595)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */]) === "function" && _d || Object])
], OrphanMissionsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=orphan-missions.component.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreacherSermonComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FLAGS;
(function (FLAGS) {
    FLAGS[FLAGS["empty"] = 1] = "empty";
    FLAGS[FLAGS["insufficient"] = 2] = "insufficient";
    FLAGS[FLAGS["cast"] = 4] = "cast";
    FLAGS[FLAGS["xp"] = 8] = "xp"; //applied xp
})(FLAGS || (FLAGS = {}));
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
var PreacherSermonComponent = (function () {
    function PreacherSermonComponent() {
        this.availableFaith = 0;
        this.onEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.isEditing = false;
        this.confirmingDelete = false;
    }
    PreacherSermonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventSubject.subscribe(function (event) {
            _this.handleEvent(event);
        });
    };
    PreacherSermonComponent.prototype.ngOnChanges = function (changes) {
        if (changes.availableFaith) {
            var faith = changes.availableFaith.currentValue;
            var cost = isNaN(this.sermon.cost) ? -1 : this.sermon.cost;
            if (faith <= 0) {
                applyFlag(this.sermon, FLAGS.empty);
            }
            else {
                removeFlag(this.sermon, FLAGS.empty);
            }
            if (cost > 0 && faith < cost) {
                applyFlag(this.sermon, FLAGS.insufficient);
            }
            else {
                removeFlag(this.sermon, FLAGS.insufficient);
            }
        }
    };
    PreacherSermonComponent.prototype.use = function () {
        applyFlag(this.sermon, FLAGS.cast);
        if (this.onEvent)
            this.onEvent.emit({ name: 'faith:spent', value: this.sermon.cost });
    };
    PreacherSermonComponent.prototype.spendExtraFaith = function () {
        if (this.onEvent)
            this.onEvent.emit({ name: 'faith:spent', value: 1 });
    };
    PreacherSermonComponent.prototype.applyXP = function () {
        applyFlag(this.sermon, FLAGS.xp);
        if (this.onEvent)
            this.onEvent.emit({ name: 'xp:gained', value: this.sermon.xp });
    };
    PreacherSermonComponent.prototype.edit = function () {
        this.editable = JSON.parse(JSON.stringify(this.sermon));
        this.isEditing = true;
    };
    PreacherSermonComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.editable = null;
    };
    PreacherSermonComponent.prototype.save = function () {
        Object.assign(this.sermon, this.editable);
        this.isEditing = false;
        this.editable = null;
    };
    PreacherSermonComponent.prototype.remove = function () {
        if (this.onEvent)
            this.onEvent.emit({ name: 'sermon:removed', value: this.sermon });
    };
    PreacherSermonComponent.prototype.canCast = function () {
        return !hasFlag(this.sermon, FLAGS.cast) &&
            !hasFlag(this.sermon, FLAGS.empty) &&
            !hasFlag(this.sermon, FLAGS.insufficient);
    };
    PreacherSermonComponent.prototype.hasCast = function () {
        return (this.sermon.status & FLAGS.cast);
    };
    PreacherSermonComponent.prototype.canSpendExtraFaith = function () {
        return hasFlag(this.sermon, FLAGS.cast) && !hasFlag(this.sermon, FLAGS.empty);
    };
    PreacherSermonComponent.prototype.canApplyXP = function () {
        return hasFlag(this.sermon, FLAGS.cast) && !hasFlag(this.sermon, FLAGS.xp);
    };
    PreacherSermonComponent.prototype.xpApplied = function () {
        return (this.sermon.status & FLAGS.xp);
    };
    PreacherSermonComponent.prototype.isInsufficient = function () {
        return hasFlag(this.sermon, FLAGS.empty) ||
            (hasFlag(this.sermon, FLAGS.insufficient) &&
                !hasFlag(this.sermon, FLAGS.cast));
    };
    PreacherSermonComponent.prototype.clearFlags = function () {
        this.sermon.status = 0;
    };
    PreacherSermonComponent.prototype.handleEvent = function (event) {
        var name = event.name;
        switch (name) {
            case 'sermons:reset':
                this.clearFlags();
                break;
            case 'faith:available':
                var faith = event.value;
                if (faith < this.sermon.cost)
                    applyFlag(this.sermon, FLAGS.insufficient);
                else
                    removeFlag(this.sermon, FLAGS.insufficient);
                break;
        }
    };
    return PreacherSermonComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["Sermon"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["Sermon"]) === "function" && _a || Object)
], PreacherSermonComponent.prototype, "sermon", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], PreacherSermonComponent.prototype, "availableFaith", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]) === "function" && _b || Object)
], PreacherSermonComponent.prototype, "eventSubject", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", Object)
], PreacherSermonComponent.prototype, "onEvent", void 0);
PreacherSermonComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'sermon',
        template: __webpack_require__(629),
        styles: [__webpack_require__(597)]
    }),
    __metadata("design:paramtypes", [])
], PreacherSermonComponent);

var _a, _b;
//# sourceMappingURL=sermon.component.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chooser_chooser_component__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreacherSermonsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PreacherSermonsComponent = (function () {
    function PreacherSermonsComponent(service, modalService) {
        this.service = service;
        this.modalService = modalService;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.maxFaith = 0;
        this.availableFaith = 0;
        this.eventSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
    }
    PreacherSermonsComponent.prototype.ngOnInit = function () {
        this.availableFaith = this.maxFaith = this.character.faith;
    };
    PreacherSermonsComponent.prototype.ngOnChanges = function (changes) {
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
    };
    PreacherSermonsComponent.prototype.ngOnDestroy = function () {
        this.character = null;
        this.modifiers = null;
        this.maxFaith = null;
        this.service = null;
    };
    PreacherSermonsComponent.prototype.getFaithModifier = function () {
        if (this.modifiers && this.modifiers.value && !isNaN(this.modifiers.value))
            return this.modifiers.value * 1;
        return 0;
    };
    PreacherSermonsComponent.prototype.getAvailableFaith = function () {
        return this.availableFaith + this.getFaithModifier();
    };
    PreacherSermonsComponent.prototype.add = function (sermon) {
        this.character.sermons.push(sermon);
        this.onSave.emit({ type: 'sermons', value: this.character.sermons });
    };
    PreacherSermonsComponent.prototype.remove = function (sermon) {
        var index = -1;
        this.character.sermons.forEach(function (t, i) {
            if (t.name === sermon.name)
                index = i;
        });
        if (index >= 0) {
            var rem = this.character.sermons.splice(index, 1);
            this.onSave.emit({ type: 'sermons', value: this.character.sermons });
        }
    };
    PreacherSermonsComponent.prototype.getAvailable = function () {
        var takenNames = this.character.sermons.map(function (s) { return s.name; });
        return this.service.getSermons().then(function (sermons) {
            return sermons.filter(function (s) { return takenNames.indexOf(s.name) < 0; });
        });
    };
    PreacherSermonsComponent.prototype.resetSermons = function () {
        this.availableFaith = this.maxFaith;
        this.eventSubject.next({ name: 'sermons:reset', value: true });
        this.onSave.emit({});
    };
    PreacherSermonsComponent.prototype.onEvent = function (event) {
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
    };
    PreacherSermonsComponent.prototype.openChooser = function () {
        var _this = this;
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_4__chooser_chooser_component__["a" /* SermonsChooserComponent */]);
        ref.instance.options = [];
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.add(event.value);
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailable().then(function (available) {
            ref.instance.options = available;
        });
    };
    return PreacherSermonsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"]) === "function" && _a || Object)
], PreacherSermonsComponent.prototype, "character", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], PreacherSermonsComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], PreacherSermonsComponent.prototype, "onSave", void 0);
PreacherSermonsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'preacher-sermons',
        template: __webpack_require__(630),
        styles: [__webpack_require__(598)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__firestore_service__["a" /* FirestoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__modal_service__["a" /* ModalService */]) === "function" && _d || Object])
], PreacherSermonsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=sermons.component.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SamuraiTacticsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SamuraiTacticsComponent = (function () {
    function SamuraiTacticsComponent(afs, modalService) {
        this.afs = afs;
        this.modalService = modalService;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.maxFury = 0;
        this.confirming = {};
    }
    SamuraiTacticsComponent.prototype.ngOnInit = function () {
        this.maxFury = this.maxFury || this.character.fury.max;
    };
    SamuraiTacticsComponent.prototype.ngOnChanges = function (changes) {
        if (changes.modifiers) {
            this.maxFury = this.character.fury.max;
            var mod = changes.modifiers.currentValue;
            if (mod && !isNaN(mod.value))
                this.maxFury += (mod.value * 1);
        }
    };
    SamuraiTacticsComponent.prototype.ngOnDestroy = function () {
        this.character = null;
        this.modifiers = null;
        this.maxFury = null;
        this.afs = null;
    };
    SamuraiTacticsComponent.prototype.add = function (tactic) {
        this.character.tactics.push(tactic);
        this.onSave.emit({});
    };
    SamuraiTacticsComponent.prototype.remove = function (index) {
        if (index >= 0) {
            delete this.confirming[index];
            this.character.tactics.splice(index, 1);
            this.onSave.emit({});
        }
    };
    SamuraiTacticsComponent.prototype.spendFury = function (fury) {
        var amount = fury * 1;
        if (isNaN(amount) || amount > this.character.fury.current)
            return;
        this.character.fury.current -= fury;
        this.onSave.emit({ type: 'fury.current', value: this.character.fury.current });
    };
    SamuraiTacticsComponent.prototype.getAvailable = function () {
        var takenNames = (this.character.tactics || []).map(function (a) { return a.name; });
        return this.afs.getSamuraiTactics().then(function (tactics) {
            return tactics.filter(function (a) {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    };
    SamuraiTacticsComponent.prototype.openChooser = function () {
        var _this = this;
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__["a" /* SamuraiTacticsChooserComponent */]);
        ref.instance.options = [];
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.add(event.value);
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailable().then(function (options) {
            ref.instance.options = options;
        });
    };
    SamuraiTacticsComponent.prototype.confirmingDelete = function (index, value) {
        if (typeof (value) !== 'undefined' && value !== null) {
            this.confirming[index] = value;
            return value;
        }
        else {
            return this.confirming[index];
        }
    };
    return SamuraiTacticsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"]) === "function" && _a || Object)
], SamuraiTacticsComponent.prototype, "character", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], SamuraiTacticsComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], SamuraiTacticsComponent.prototype, "onSave", void 0);
SamuraiTacticsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'samurai-tactics',
        template: __webpack_require__(632),
        styles: [__webpack_require__(600)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */]) === "function" && _d || Object])
], SamuraiTacticsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=samurai-tactics.component.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_character_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_character_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShamanSpellsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ShamanSpellComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShamanSpellsComponent = (function () {
    function ShamanSpellsComponent(afs, modalService) {
        this.afs = afs;
        this.modalService = modalService;
        this.onSave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.maxMagik = 0;
        this.confirmingDelete = false;
    }
    ShamanSpellsComponent.prototype.ngOnInit = function () {
        this.maxMagik = this.maxMagik || this.character.magik.max;
    };
    ShamanSpellsComponent.prototype.ngOnChanges = function (changes) {
        if (changes.modifiers) {
            this.maxMagik = this.character.magik.max;
            var mod = changes.modifiers.currentValue;
            if (mod && !isNaN(mod.value))
                this.maxMagik += (mod.value * 1);
        }
    };
    ShamanSpellsComponent.prototype.ngOnDestroy = function () {
        this.character = null;
        this.modifiers = null;
        this.maxMagik = null;
        this.afs = null;
    };
    ShamanSpellsComponent.prototype.add = function (spell) {
        this.character.spells.push(spell);
        this.onSave.emit({ type: "shamanSpell", value: spell });
    };
    ShamanSpellsComponent.prototype.remove = function (arg) {
        var index = -1;
        if (typeof (arg) === 'object') {
            this.character.spells.forEach(function (s, i) {
                if (s.name === arg.name)
                    index = i;
            });
        }
        else if (typeof (arg) === 'number') {
            index = arg;
        }
        if (index >= 0 && index < this.character.spells.length) {
            var rem = this.character.spells.splice(index, 1);
            this.onSave.emit({ type: "shamanSpell", value: rem });
        }
    };
    ShamanSpellsComponent.prototype.hasMagik = function (amount) {
        return this.character.magik.current >= (amount || 0);
    };
    ShamanSpellsComponent.prototype.spendMagik = function (amount) {
        if (this.character.magik.current >= amount) {
            this.character.magik.current -= amount;
            this.onSave.emit({ type: 'magik.current', value: this.character.magik.current });
        }
    };
    ShamanSpellsComponent.prototype.resetMagik = function () {
        this.character.magik.current = this.maxMagik;
        this.onSave.emit({ type: 'magik.current', value: this.character.magik.current });
    };
    ShamanSpellsComponent.prototype.getAvailableSpells = function () {
        var takenNames = (this.character.spells || []).map(function (a) { return a.name; });
        return this.afs.getShamanSpells().then(function (spells) {
            return spells.filter(function (a) {
                //return only those that can be chosen multiple times
                // or haven't already been chosen
                return takenNames.indexOf(a.name) < 0;
            });
        });
    };
    ShamanSpellsComponent.prototype.openChooser = function () {
        var _this = this;
        var ref = this.modalService.createComponentRef(__WEBPACK_IMPORTED_MODULE_3__chooser_chooser_component__["a" /* ShamanSpellsChooserComponent */]);
        ref.instance.options = [];
        ref.instance.onClose = function (event) {
            _this.modalService.destroyRef(ref, 0);
            if (event.apply) {
                _this.add(event.value);
            }
        };
        var element = this.modalService.getDomElementFromComponentRef(ref);
        this.modalService.addChild(element);
        this.getAvailableSpells().then(function (available) {
            ref.instance.options = available;
        });
    };
    ShamanSpellsComponent.prototype.onSpellEvent = function ($event) {
        switch ($event.type) {
            case 'deleted':
                this.remove($event.value);
                break;
            case 'magikSpent':
                this.spendMagik($event.value * 1);
                break;
            default: console.log("Unrecognized spell event: " + $event.type);
        }
    };
    return ShamanSpellsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["SOBCharacter"]) === "function" && _a || Object)
], ShamanSpellsComponent.prototype, "character", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ShamanSpellsComponent.prototype, "modifiers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], ShamanSpellsComponent.prototype, "onSave", void 0);
ShamanSpellsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'shaman-spells',
        template: __webpack_require__(634),
        styles: [__webpack_require__(267)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__modal_service__["a" /* ModalService */]) === "function" && _d || Object])
], ShamanSpellsComponent);

var ShamanSpellComponent = (function () {
    function ShamanSpellComponent() {
        this.magik = 0;
        this.onEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.magikSpent = 0;
        this.confirmingDelete = false;
    }
    ShamanSpellComponent.prototype.ngOnInit = function () { };
    ShamanSpellComponent.prototype.ngOnDestroy = function () {
        this.spell = null;
        this.magik = null;
    };
    ShamanSpellComponent.prototype.remove = function () {
        this.onEvent.emit({ type: 'deleted', value: this.spell });
    };
    ShamanSpellComponent.prototype.castSpell = function () {
        var power = this.spell.power;
        if (!power)
            return; //what do we do here?
        var roll = (Math.random() * 6) + (Math.random() * 6);
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
    };
    ShamanSpellComponent.prototype.hasMagik = function (amount) {
        return this.magik >= (amount || 0);
    };
    ShamanSpellComponent.prototype.spendMagik = function () {
        //get value from associated select...
        var amount = this.magikSpent * 1;
        if (this.magik > amount) {
            this.onEvent.emit({ type: 'magikSpent', value: amount });
            this.magikSpent = 0;
        }
    };
    return ShamanSpellComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__models_character_model__["ShamanSpell"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_character_model__["ShamanSpell"]) === "function" && _e || Object)
], ShamanSpellComponent.prototype, "spell", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", Number)
], ShamanSpellComponent.prototype, "magik", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _f || Object)
], ShamanSpellComponent.prototype, "onEvent", void 0);
ShamanSpellComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'shaman-spell',
        template: __webpack_require__(635),
        styles: [__webpack_require__(267)]
    }),
    __metadata("design:paramtypes", [])
], ShamanSpellComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=shaman-spells.component.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_service__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploadComponent = (function () {
    function UploadComponent(service) {
        this.service = service;
    }
    UploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubscription = this.service.getUser().subscribe(function (user) {
            if (user) {
                _this.chars = _this.service.getUnmigratedChars(user.uid);
            }
            else {
                _this.chars = null;
            }
        });
    };
    UploadComponent.prototype.initClasses = function () {
        // this.service.initDB();
    };
    /**
     *
     */
    UploadComponent.prototype.importChar = function (charJSON, key) {
        var _this = this;
        var oldObj = JSON.parse(charJSON);
        this.migrateChar(oldObj)
            .then(function (newObj) {
            console.log("Creating: ");
            console.log(newObj);
            return _this.service.createCharacter(newObj);
        })
            .then(function (newChar) {
            _this.charJSON = null; //empty textarea
            _this.status = {
                type: "success",
                message: 'Character uploaded!'
            };
        })
            .catch(function (error) {
            _this.status = {
                type: 'error',
                message: error.message
            };
        });
    };
    /**
     *
     */
    UploadComponent.prototype.uploadChar = function () {
        this.importChar(this.charJSON);
    };
    /**
     *
     */
    UploadComponent.prototype.migrateChar = function (oldObj) {
        var newObj = {
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
        return this.service.getClass(oldObj.class).then(function (classObj) {
            newObj.class = classObj.name;
            return newObj;
        });
    };
    UploadComponent.prototype.toArray = function (srcObj, destArr) {
        for (var prop in srcObj) {
            if (srcObj.hasOwnProperty(prop)) {
                var value = srcObj[prop];
                if (typeof (value) === 'object') {
                    value = this.copyObj(value, {});
                }
                destArr[destArr.length] = value;
            }
        }
        return destArr;
    };
    UploadComponent.prototype.copyObj = function (src, dest) {
        for (var prop in src) {
            if (src.hasOwnProperty(prop)) {
                var value = src[prop];
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
    };
    UploadComponent.prototype.exportDB = function () {
        this.service.exportDB();
    };
    return UploadComponent;
}());
UploadComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'upload',
        template: __webpack_require__(636),
        styles: [__webpack_require__(602)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_service__["a" /* FirestoreService */]) === "function" && _a || Object])
], UploadComponent);

var _a;
//# sourceMappingURL=upload.component.js.map

/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".c-ability--available {\n  margin: 0.5em 0;\n  background: #fff;\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-ability--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-ability--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "header {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  -ms-flex-align: center;\n      align-items: center;\n  border-bottom: 1px solid #000;\n  background: #fff;\n  padding: 0.25em 1em;\n  z-index: 9999;\n}\nheader > h5 {\n  margin: 0;\n}\n@media (min-width: 300px) {\n  header {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 36px;\n    transition: height 0.3s linear;\n  }\n  header > h5 {\n    padding: 0.25em;\n  }\n  header:hover {\n    height: 60px;\n  }\n  main {\n    height: 100%;\n    overflow-y: hidden;\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".attack {\n  margin-bottom: 1em;\n  background: #f5f5f5;\n  padding: 0.5em;\n  background: rgba(255, 255, 255, 0.85);\n  border-radius: 0.25em;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);\n}\n.attack .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\nh3,\nh4,\nh5 {\n  margin-top: 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".avatar {\n  padding: 1em 0;\n  margin: 0 auto;\n}\n.avatar .image-wrapper {\n  width: 175px;\n  height: 175px;\n  border-radius: 100%;\n  border: 1px solid #777;\n  overflow: hidden;\n  margin: 0 auto;\n}\n.avatar .image {\n  width: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".l-char {\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n  overflow-y: hidden;\n  overflow-x: auto;\n  height: 100%;\n  padding-top: 36px;\n  white-space: nowrap;\n  -webkit-overflow-scrolling: touch;\n}\n.l-page {\n  -ms-flex: 1 0 100%;\n      flex: 1 0 100%;\n  overflow-y: auto;\n  white-space: normal;\n}\n@media (min-width: 375px) {\n  .l-page {\n    -ms-flex: 1 0 375px;\n        flex: 1 0 375px;\n  }\n}\n.attributes {\n  margin-top: 0.5em;\n  -ms-flex: 1;\n      flex: 1;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.attributes .value-display .label {\n  background-color: #000;\n  color: #fff;\n}\n.attributes > div {\n  margin-bottom: 0.5em;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.c-list {\n  padding: 3em 1em 5em;\n  overflow: auto;\n  height: 100%;\n}\n.c-list header {\n  display: block;\n  padding: 1em;\n  background: #efefef;\n  border: 1px solid #ddd;\n  border-radius: 4px 4px 0 0;\n}\n@media (min-width: 768px) {\n  .c-list {\n    padding-left: 10%;\n    padding-right: 10%;\n  }\n}\n.c-list__item {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  -ms-flex-align: center;\n      align-items: center;\n  padding: 1em;\n  background: #fff;\n  border: 1px solid #ddd;\n}\n.c-list__item:last-child {\n  border-radius: 0 0 4px 4px;\n}\n.c-list__item a,\n.c-list__item a:visited {\n  text-decoration: none;\n}\n.c-list .d-grid {\n  grid: auto-flow / 1fr;\n  grid-gap: 1em 1em;\n  padding: 1em 0;\n}\n@media (min-width: 768px) {\n  .c-list .d-grid {\n    grid: auto-flow / 1fr 1fr;\n  }\n}\n@media (min-width: 992px) {\n  .c-list .d-grid {\n    grid: auto-flow / 1fr 1fr 1fr;\n  }\n}\n@media (min-width: 1200px) {\n  .c-list .d-grid {\n    grid: auto-flow / 1fr 1fr 1fr 1fr;\n  }\n}\n.card {\n  height: 100%;\n}\n.card .thumbnail {\n  width: 100%;\n  display: block;\n  text-align: center;\n}\n.card img {\n  margin: 0 auto;\n  width: 150px;\n  height: 150px;\n  display: block;\n  border-radius: 100%;\n  border: 1px solid #bbb;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin-top: 0;\n  margin-bottom: 0.25em;\n}\nh6 {\n  font-size: 0.85rem;\n}\nh5 {\n  font-size: 1rem;\n}\nh4 {\n  font-size: 1.25rem;\n}\nh3 {\n  font-size: 1.5rem;\n}\nh2 {\n  font-size: 1.75rem;\n}\nh1 {\n  font-size: 2rem;\n}\np {\n  margin: 0.5em 0;\n  font-style: italic;\n}\nlabel {\n  font-weight: 700;\n}\ninput.form-control,\nselect.form-control,\ntextarea.form-control {\n  width: 100%;\n  font-size: 1em;\n  padding: 0.5em .75em;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ninput.form-control.u-sm,\nselect.form-control.u-sm,\ntextarea.form-control.u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"] {\n  font-size: 1em;\n  padding: 0.5em 0.75em;\n  background-color: #ddd;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\nbutton[type=\"button\"].u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"].keypad__button {\n  width: 4em;\n  height: 3em;\n}\n.d-flex {\n  display: -ms-flexbox;\n  display: flex;\n}\n.flex-row {\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.flex-col {\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.flex-wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex-justify-start {\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n.flex-justify-end {\n  -ms-flex-pack: end;\n      justify-content: flex-end;\n}\n.flex-justify-between {\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n.flex-justify-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.flex-justify-center {\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.flex-justify-stretch {\n  -ms-flex-pack: stretch;\n      justify-content: stretch;\n}\n.flex-align-start {\n  -ms-flex-align: start;\n      align-items: flex-start;\n}\n.flex-align-end {\n  -ms-flex-align: end;\n      align-items: flex-end;\n}\n.flex-align-center {\n  -ms-flex-align: center;\n      align-items: center;\n}\n.flex-align-stretch {\n  -ms-flex-align: stretch;\n      align-items: stretch;\n}\n.col,\n.col-1 {\n  -ms-flex: 1;\n      flex: 1;\n}\n.col-2 {\n  -ms-flex: 2;\n      flex: 2;\n}\n.col-3 {\n  -ms-flex: 3;\n      flex: 3;\n}\n.col-4 {\n  -ms-flex: 4;\n      flex: 4;\n}\n.col-5 {\n  -ms-flex: 5;\n      flex: 5;\n}\n.col-6 {\n  -ms-flex: 6;\n      flex: 6;\n}\n.col-auto {\n  -ms-flex: 0 1 auto;\n      flex: 0 1 auto;\n}\n.tabbed {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.tabbed .tabs {\n  -ms-flex-preferred-size: 2.5em;\n      flex-basis: 2.5em;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex-align: stretch;\n      align-items: stretch;\n  border-bottom: 1px solid #ddd;\n}\n.tabbed .tabs .tab {\n  background: #f5f5f5;\n  border-width: 1px;\n  border-style: solid;\n  border-color: transparent;\n  border-radius: 4px 4px 0 0;\n  padding: 0.25em 1em;\n  margin: 0 0.125em;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.tabbed .tabs .tab.active {\n  background: #417ebc;\n  color: #fff;\n}\n.tabbed .panes .pane {\n  display: none;\n  width: 100%;\n  height: 100%;\n  padding: 1em 0.5em;\n}\n.tabbed .panes .pane.active {\n  display: block;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.item__stats {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  border: 1px solid #bbb;\n  border-radius: 4px;\n  padding: 0.25em 1em;\n  margin: 0.5em 0;\n}\nh5 > small {\n  float: right;\n  font-weight: 400;\n}\nh5:after {\n  clear: right;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".c-login {\n  padding: 3em 1em 5em;\n  overflow: auto;\n  height: 100%;\n}\n.c-login .card {\n  padding: 1em;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.c-login header {\n  display: block;\n  padding: 1em;\n  background: #efefef;\n  border: 1px solid #ddd;\n  border-radius: 4px 4px 0 0;\n}\n@media (min-width: 768px) {\n  .c-login {\n    padding-left: 25%;\n    padding-right: 25%;\n  }\n}\n@media (min-width: 1200px) {\n  .c-login {\n    padding-left: 33%;\n    padding-right: 33%;\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-option--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-option--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 40px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin-top: 0;\n  margin-bottom: 0.25em;\n}\nh6 {\n  font-size: 0.85rem;\n}\nh5 {\n  font-size: 1rem;\n}\nh4 {\n  font-size: 1.25rem;\n}\nh3 {\n  font-size: 1.5rem;\n}\nh2 {\n  font-size: 1.75rem;\n}\nh1 {\n  font-size: 2rem;\n}\np {\n  margin: 0.5em 0;\n  font-style: italic;\n}\nlabel {\n  font-weight: 700;\n}\ninput.form-control,\nselect.form-control,\ntextarea.form-control {\n  width: 100%;\n  font-size: 1em;\n  padding: 0.5em .75em;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ninput.form-control.u-sm,\nselect.form-control.u-sm,\ntextarea.form-control.u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"] {\n  font-size: 1em;\n  padding: 0.5em 0.75em;\n  background-color: #ddd;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\nbutton[type=\"button\"].u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"].keypad__button {\n  width: 4em;\n  height: 3em;\n}\n.d-flex {\n  display: -ms-flexbox;\n  display: flex;\n}\n.flex-row {\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.flex-col {\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n.flex-wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex-justify-start {\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n.flex-justify-end {\n  -ms-flex-pack: end;\n      justify-content: flex-end;\n}\n.flex-justify-between {\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n.flex-justify-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.flex-justify-center {\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n.flex-justify-stretch {\n  -ms-flex-pack: stretch;\n      justify-content: stretch;\n}\n.flex-align-start {\n  -ms-flex-align: start;\n      align-items: flex-start;\n}\n.flex-align-end {\n  -ms-flex-align: end;\n      align-items: flex-end;\n}\n.flex-align-center {\n  -ms-flex-align: center;\n      align-items: center;\n}\n.flex-align-stretch {\n  -ms-flex-align: stretch;\n      align-items: stretch;\n}\n.col,\n.col-1 {\n  -ms-flex: 1;\n      flex: 1;\n}\n.col-2 {\n  -ms-flex: 2;\n      flex: 2;\n}\n.col-3 {\n  -ms-flex: 3;\n      flex: 3;\n}\n.col-4 {\n  -ms-flex: 4;\n      flex: 4;\n}\n.col-5 {\n  -ms-flex: 5;\n      flex: 5;\n}\n.col-6 {\n  -ms-flex: 6;\n      flex: 6;\n}\n.col-auto {\n  -ms-flex: 0 1 auto;\n      flex: 0 1 auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".value-display .value.modified > *:after {\n  color: darkblue;\n  content: \"*\";\n  font-size: 0.5em;\n  margin-top: -1em;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".value-display .value.modified > *:after {\n  color: darkblue;\n  content: \"*\";\n  font-size: 0.875em;\n  margin-top: -1em;\n}\n.needed {\n  font-size: 0.875em;\n  border-top: 1px solid #777;\n  color: #777;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "/* Sidebag */\n.sidebag__option {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin: 1em;\n}\n.sidebag__option .sprite {\n  margin-right: 1em;\n}\n@media (min-width: 768px) {\n  .sidebag__option {\n    -ms-flex-preferred-size: 45%;\n        flex-basis: 45%;\n  }\n}\n@media (min-width: 992px) {\n  .sidebag__option {\n    -ms-flex-preferred-size: 30%;\n        flex-basis: 30%;\n  }\n}\n.sidebag__option label {\n  -ms-flex: 1;\n      flex: 1;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.sidebag__option .sidebag__control {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n.sidebag__option .help-block {\n  -ms-flex-preferred-size: 100%;\n      flex-basis: 100%;\n}\n.sidebag__option .input-group {\n  width: 128px;\n}\n.sidebag__option .input-group-btn .btn {\n  opacity: 0.75;\n}\n.option__display {\n  display: inline-block;\n  width: 32px;\n  text-align: center;\n  background: #fff;\n  border-top: 1px solid #ccc;\n  border-bottom: 1px solid #ccc;\n  padding: 0.3em 0;\n}\n.sidebag__option .btn:not(:last-child) {\n  border-radius: 4px 0 0 4px;\n  background-color: #eee;\n}\n.sidebag__option .btn:last-child {\n  border-radius: 0 4px 4px 0;\n  background-color: #ccc;\n}\n.sidebag__carrying {\n  font-size: 1.5em;\n  width: 2em;\n  height: 2em;\n  text-align: center;\n  border-radius: 100%;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n  color: #666;\n  /* background: #eee; */\n  /* border: 1px solid #ccc; */\n}\n.sidebag__control {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.sidebag__control > * {\n  font-weight: 700;\n  text-align: center;\n  width: 2em;\n}\n.sidebag__control > button {\n  height: 2em;\n  border-color: #666;\n  color: #000;\n}\n.sidebag__control > button.btn--del {\n  background-color: #f1c9c9;\n}\n.sidebag__control > button.btn--use {\n  background-color: #b6e3b6;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-option--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-option--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-option--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-option--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-option--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-option--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin-top: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-tactic--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-tactic--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.card .desc {\n  font-size: 0.875em;\n  color: #555;\n  text-align: justify;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dialog {\n  z-index: 1000;\n  position: fixed;\n  right: 0;\n  left: 0;\n  top: 20px;\n  margin-right: auto;\n  margin-left: auto;\n  min-height: 200px;\n  width: 90%;\n  max-width: 520px;\n  background-color: #fff;\n  padding: 12px;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n.dialog__body {\n  max-height: 400px;\n  overflow: auto;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 1em;\n  padding-bottom: 1em;\n}\n@media (min-width: 768px) {\n  .dialog {\n    top: 40px;\n  }\n}\n.c-option--available {\n  margin: 0.5em 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  padding: 0.5em;\n  border-radius: 4px;\n}\n.c-option--available.is-selected {\n  background-color: #f00;\n  color: #fff;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, "h3,\nh4,\nh5 {\n  margin: 0;\n}\n.c-list {\n  padding: 3em 1em 5em;\n  overflow: auto;\n  height: 100%;\n}\n.c-list header {\n  display: block;\n  padding: 1em;\n  background: #efefef;\n  border: 1px solid #ddd;\n  border-radius: 4px 4px 0 0;\n}\n@media (min-width: 768px) {\n  .c-list {\n    padding-left: 10%;\n    padding-right: 10%;\n  }\n}\n@media (min-width: 992px) {\n  .c-list {\n    padding-left: 20%;\n    padding-right: 20%;\n  }\n}\n.c-list__item {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  -ms-flex-align: center;\n      align-items: center;\n  padding: 1em;\n  background: #fff;\n  border: 1px solid #ddd;\n}\n.c-list__item:last-child {\n  border-radius: 0 0 4px 4px;\n}\n.c-list__item a,\n.c-list__item a:visited {\n  text-decoration: none;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 606:
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Abilities</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n\n<div *ngFor=\"let ability of character.abilities; let i = index\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-end\">\n        {{ability.name}}\n        <div class=\"d-flex flex-justify-end flex-align-end\">\n            <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete(i,true)\">X</button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"remove(i)\">Y</button>\n                <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete(i,false)\">N</button>\n            </div>\n        </div>\n    </h5>\n    <div class=\"desc\">{{ability.desc}}</div>\n    <div *ngIf=\"ability.modifiers\" class=\"u-sm\">\n        <hr>\n        <div *ngFor=\"let modifier of ability.modifiers\">\n            {{modifier.affects}} {{modifier.value|modifier}}\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 607:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngIf=\"!abilities||!abilities.length\">Loading available options...</div>\n        <div *ngFor=\"let ability of abilities\"\n            class=\"c-ability--available\"\n            [ngClass]=\"{'is-selected':isChosen(ability)}\">\n            <h5>\n                <span *ngIf=\"ability.roll\">({{ability.roll}} / 2D6) </span>\n                {{ability.name}}\n            </h5>\n            <div>{{ability.value}}</div>\n            <div class=\"col\" *ngIf=\"ability.requires\">\n                <strong>Requires</strong> <em>{{ability.requires}}</em>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!ability.disabled\"\n                (click)=\"choose(ability)\">\n                <span>{{isChosen(ability)?'Unselect':'Choose'}}</span>\n            </button>\n        </div>\n    </div>\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 608:
/***/ (function(module, exports) {

module.exports = "<header>\n    <h5>\n        <a routerLink=\"/chars\" routerLinkActive=\"active\">{{title}}</a>\n    </h5>\n    <div *ngIf=\"user\">\n        <span class=\"d-none-xs\">{{ user.email }} </span>\n        <button type=\"button\" class=\"btn btn-sm\" (click)=\"logout()\">Logout</button>\n    </div>\n    <div *ngIf=\"!user\">\n        <a routerLink=\"/login\" routerLinkActive=\"active\">Login</a>\n    </div>\n</header>\n<main>\n    <router-outlet></router-outlet>\n</main>\n"

/***/ }),

/***/ 609:
/***/ (function(module, exports) {

module.exports = "<div class=\"attack\">\n\n    <div *ngIf=\"isEditing===false\">\n\n        <h5 class=\"d-flex flex-justify-between flex-align-end\">\n            {{attack.name}}\n            <div class=\"d-flex flex-justify-end flex-align-end\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"edit()\">edit</button>\n                &nbsp;&nbsp;&nbsp;\n                <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete=true\">X</button>\n                <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                    <button type=\"button\" class=\"u-sm\" (click)=\"remove()\">Y</button>\n                    <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete=false\">N</button>\n                </div>\n            </div>\n        </h5>\n\n        <small class=\"d-flex flex-justify-between\">\n            <div class=\"col-half\"><strong>Type: </strong> {{attack.type}}</div>\n            <div class=\"col-half\" *ngIf=\"'ranged'===attack.type\">\n                <strong>Range: </strong> {{attack.range||0}}\n            </div>\n        </small>\n        <small class=\"d-flex flex-justify-between\">\n            <div class=\"col-half\"><strong>Att: </strong> {{attack.attack||'not specified'}}</div>\n            <div class=\"col-half\"><strong>Dmg: </strong> {{attack.damage||'not specified'}}</div>\n        </small>\n\n        <div class=\"desc\" *ngIf=\"attack.description\"><br>{{attack.description}}</div>\n\n        <hr>\n\n        <div class=\"d-flex flex-justify-between flex-align-center\">\n            <button type=\"button\" (click)=\"roll=null\">clear</button>\n\n            <button type=\"button\" class=\"btn--use\"\n                (ngDisabled)=\"!attack.type||!attack.attack||!attack.damage\"\n                (click)=\"execute()\">\n                Roll\n            </button>\n        </div>\n\n        <div *ngIf=\"roll\">\n            <br>\n            <div>\n                Hits:\n                <button *ngFor=\"let hit of roll.hits; let i = index;\"\n                    type=\"button\" class=\"die u-sm\" (click)=\"rerollHit(i)\">\n                    {{hit}}\n                </button>\n            </div>\n            <br>\n            <div>\n                Dmg:\n                <button *ngFor=\"let dmg of roll.dmg; let i = index\"\n                    type=\"button\" class=\"die u-sm\" (click)=\"rerollDmg(i)\"\n                    (ngDisabled)=\"roll.hits[i]<roll.attack.target\">\n                    {{dmg}}\n                </button>\n                &nbsp;\n                <small><strong>&nbsp;Total: {{roll.dmg|sum}}</strong></small>\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n\n    <div *ngIf=\"isEditing===true\">\n\n        <div>\n            <label>Name</label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.name\"\n                placeholder=\"Name this attack\">\n        </div>\n\n\n        <div>\n            <label>Type</label>\n            <select class=\"form-control\" [(ngModel)]=\"editable.type\">\n                <option value=\"melee\">Melee</option>\n                <option value=\"ranged\">Ranged</option>\n            </select>\n        </div>\n\n        <div *ngIf=\"'ranged' === editable.type\">\n            <label>Range</label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.range\"\n                placeholder=\"Specify attack range\">\n        </div>\n\n        <div>\n            <label>Att: </label>\n            <input type=\"text\" class=\"form-control\" required\n                [(ngModel)]=\"editable.attack\"\n                placeholder=\"e.g., 2D6\">\n        </div>\n\n        <div>\n            <label>Dmg: </label>\n            <input type=\"text\" class=\"form-control\" required\n                [(ngModel)]=\"editable.damage\"\n                placeholder=\"e.g., D6+2\">\n        </div>\n\n        <div>\n            <label>Misc: </label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.description\"\n                placeholder=\"bonuses, conditionals, etc\">\n        </div>\n\n        <hr>\n\n        <div class=\"d-flex flex-justify-between\">\n            <button type=\"button\" class=\"u-sm\" (click)=\"cancelEditing()\">cancel</button>\n            <button type=\"button\" class=\"u-sm\" (click)=\"saveEdits()\">save</button>\n        </div>\n\n    </div>\n\n</div>\n"

/***/ }),

/***/ 610:
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\" u-text--sc\">Attacks</div>\n    <button type=\"button\" class=\"btn--add u-sm\" (click)=\"add()\">New</button>\n</h4>\n<hr>\n\n<div *ngFor=\"let attack of attacks\">\n    <attack [attack]=\"attack\" (onEvent)=\"onEvent($event)\"></attack>\n</div>\n"

/***/ }),

/***/ 611:
/***/ (function(module, exports) {

module.exports = "<div class=\"avatar\">\n    <div class=\"image-wrapper\" (click)=\"showForm=true\">\n      <img class=\"image\" src=\"{{imgData||'assets/avatar.png'}}\">\n    </div>\n    <div *ngIf=\"!showForm\" class=\"u-sm u-text--center\">\n        <em>Click avatar to edit</em>\n    </div>\n    <div *ngIf=\"showForm\">\n        <button type=\"button\" (click)=\"cancel()\" class=\"u-sm\">cancel</button>\n        <button type=\"button\" *ngIf=\"isDirty()\" (click)=\"save()\" class=\"u-sm\">save</button>\n        <div>\n            <input type=\"file\" class=\"hidden\" (change)=\"changeListener($event)\">\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 612:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"l-page\" *ngIf=\"!character\">Loading character...</div>\n\n<div *ngIf=\"character\" class=\"l-char\">\n\n    <div *ngIf=\"error\" class=\"c-error\">\n        <h5>Error</h5>\n        <p>{{error.message}}</p>\n        <a *ngIf=\"'auth'===error.type\" routerLink=\"/login\" routerLinkActive=\"active\">\n            Sign in\n        </a>\n        <button type=\"button\" (click)=\"error=null\">DISMISS</button>\n    </div>\n\n    <div *ngIf=\"messages.length\" class=\"c-messages\">\n        <div class=\"c-message\" *ngFor=\"let msg of messages\">\n            <h5 class=\"d-flex flex-justify-between flex-align-start\">\n                <span class=\"col\">{{msg.title}}</span>\n                <button type=\"button\" *ngIf=\"msg.canDimiss\"\n                    (click)=\"removeMessage(msg)\">DISMISS</button>\n            </h5>\n            <p>{{msg.value}}</p>\n        </div>\n    </div>\n\n    <div class=\"l-page\">\n        <main>\n            <avatar (onSave)=\"saveChar('avatar', $event)\"></avatar>\n            <div class=\"bio\">\n                <div *ngIf=\"!isEditingBio\">\n                    <h4>{{character.name}}</h4>\n                    <div class=\"d-flex flex-justify-between\">\n                        <button type=\"button\" (click)=\"editBio()\">Edit</button>\n                        <div class=\"col u-mg-left--md\">\n                            <div><small>{{character.class}}</small></div>\n                            <div><small><em>{{character.keywords}}</em></small></div>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"isEditingBio\">\n                    <label>Name</label>\n                    <input type=\"test\" class=\"form-control\" [(ngModel)]=\"editableBio.name\">\n\n                    <label>Keywords</label>\n                    <input type=\"test\" class=\"form-control\" [(ngModel)]=\"editableBio.keywords\">\n\n                    <button type=\"button\" (click)=\"cancelBioEdit()\">Cancel</button>\n                    &nbsp;\n                    <button type=\"button\" (click)=\"saveBio()\">Save</button>\n                </div>\n            </div>\n            <hr>\n            <h4 class=\" u-text--sc\">Attributes</h4>\n            <div class=\"attributes\">\n                <div *ngFor=\"let st of ['Agility','Cunning','Lore','Luck','Spirit','Strength']\">\n                    <value-display label=\"{{st}}\"\n                        value=\"{{character.stats[st]}}\"\n                        [modifiers]=\"modifiers[st]\"\n                        (onSave)=\"saveChar('stats.'+st, $event)\">\n                    </value-display>\n                </div>\n            </div>\n\n            <hr>\n\n            <section>\n                <value-display label=\"Level\"\n                    value=\"{{character.level}}\"\n                    [canAdjust]=\"false\"\n                    (onSave)=\"saveChar('level', $event)\">\n                </value-display>\n\n                <xp-value-display label=\"XP\"\n                    value=\"{{character.xp}}\"\n                    [options]=\"{valueSize:'sm'}\"\n                    needed=\"{{xpLevels[character.level]}}\"\n                    (onSave)=\"saveChar('xp', $event)\">\n                </xp-value-display>\n\n                <value-display label=\"Wealth\"\n                    value=\"{{character.wealth}}\"\n                    [options]=\"{valueSize:'sm'}\"\n                    (onSave)=\"saveChar('wealth', $event)\">\n                </value-display>\n            </section>\n\n\n            <section>\n                <value-display label=\"Dark Stone\"\n                    value=\"{{character.darkstone}}\"\n                    [options]=\"{labelSize:'sm'}\"\n                    (onSave)=\"saveChar('darkstone', $event)\">\n                </value-display>\n\n                <value-display label=\"Init\"\n                    value=\"{{character.init}}\"\n                    [modifiers]=\"modifiers.init\"\n                    (onSave)=\"saveChar('init', $event)\">\n                </value-display>\n\n                <value-display label=\"Move\"\n                    value=\"{{character.movement}}\"\n                    [options]=\"{min:-10}\"\n                    [modifiers]=\"modifiers.movement\"\n                    (onSave)=\"saveChar('movement', $event)\">\n                </value-display>\n            </section>\n\n            <section>\n                <value-display label=\"Tech\"\n                    value=\"{{character.techCurrency}}\"\n                    (onSave)=\"saveChar('techCurrency', $event)\">\n                </value-display>\n\n                <value-display label=\"Scrap\"\n                    value=\"{{character.scrapCurrency}}\"\n                    (onSave)=\"saveChar('scrapCurrency', $event)\">\n                </value-display>\n\n                <!-- <value-display label=\"Move\"\n                    value=\"{{character.movement}}\"\n                    [options]=\"{min:-10}\"\n                    [modifiers]=\"modifiers.movement\"\n                    (onSave)=\"saveChar('movement', $event)\">\n                </value-display> -->\n            </section>\n        </main>\n    </div>\n\n    <div class=\"l-page\">\n        <main>\n\n            <section class=\"t-combat\">\n                <value-display label=\"Combat\"\n                    value=\"{{character.combat}}\"\n                    [modifiers]=\"modifiers.combat\"\n                    (onSave)=\"saveChar('combat', $event)\">\n                </value-display>\n                <value-display label=\"Melee\"\n                    value=\"{{character.melee}}\"\n                    (onSave)=\"saveChar('melee', $event)\">\n                </value-display>\n                <value-display label=\"Ranged\"\n                    value=\"{{character.ranged}}\"\n                    (onSave)=\"saveChar('ranged', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-health\">\n                <value-display  label=\"Wounds\"\n                    value=\"{{character.health.wounds}}\"\n                    (onSave)=\"saveChar('health.wounds', $event)\">\n                </value-display>\n                <value-display label=\"Health\"\n                    value=\"{{character.health.max}}\"\n                    [modifiers]=\"modifiers.health\"\n                    (onSave)=\"saveChar('health.max', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-health\">\n                <value-display label=\"Defense\"\n                    value=\"{{character.defense}}\"\n                    [modifiers]=\"modifiers.defense\"\n                    (onSave)=\"saveChar('defense', $event)\">\n                </value-display>\n                <value-display label=\"Armor\"\n                    value=\"{{character.armor}}\"\n                    [modifiers]=\"modifiers.armor\"\n                    (onSave)=\"saveChar('armor', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-sanity\">\n                <value-display label=\"Loss\"\n                    value=\"{{character.sanity.loss}}\"\n                    (onSave)=\"saveChar('sanity.loss', $event)\">\n                </value-display>\n                <value-display label=\"Sanity\"\n                    value=\"{{character.sanity.max}}\"\n                    [modifiers]=\"modifiers.sanity\"\n                    (onSave)=\"saveChar('sanity.max', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-sanity\">\n                <value-display label=\"Willpower\"\n                    value=\"{{character.willpower}}\"\n                    [modifiers]=\"modifiers.willpower\"\n                    (onSave)=\"saveChar('willpower', $event)\">\n                </value-display>\n                <value-display  label=\"Spirit Armor\"\n                    value=\"{{character.spiritArmor}}\"\n                    [modifiers]=\"modifiers.spiritArmor\"\n                    [options]=\"{labelSize:'sm'}\"\n                    (onSave)=\"saveChar('spiritArmor', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\" t-grit\">\n                <value-display label=\"Grit\"\n                    value=\"{{character.grit.current}}\"\n                    [options]=\"{max:character.grit.max+(modifiers.grit?modifiers.grit.value:0)}\"\n                    (onSave)=\"saveChar('grit.current', $event)\">\n                </value-display>\n                <value-display label=\"Max Grit\"\n                    value=\"{{character.grit.max}}\"\n                    [modifiers]=\"modifiers.grit\"\n                    (onSave)=\"saveChar('grit.max', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\" t-corruption\">\n                <value-display label=\"Corruption\"\n                    value=\"{{character.corruption.current}}\"\n                    (onSave)=\"saveChar('corruption.current', $event)\">\n                </value-display>\n                <value-display label=\"Max\"\n                    value=\"{{character.corruption.max}}\"\n                    [modifiers]=\"modifiers.corruption\"\n                    (onSave)=\"saveChar('corruption.max', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-faith\" *ngIf=\"isPreacher\">\n                <value-display label=\"Faith\"\n                    value=\"{{character.faith}}\"\n                    [modifiers]=\"modifiers.faith\"\n                    (onSave)=\"saveChar('faith', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-fortune\" *ngIf=\"isGambler\">\n                <value-display label=\"Fortune\"\n                    value=\"{{character.fortune.current}}\"\n                    [options]=\"{max:character.fortune.max+(modifiers.fortune?modifiers.fortune.value:0)}\"\n                    (onSave)=\"saveChar('fortune.current', $event)\">\n                </value-display>\n                <value-display label=\"Max\"\n                    value=\"{{character.fortune.max}}\"\n                    [modifiers]=\"modifiers.fortune\"\n                    (onSave)=\"saveChar('fortune.max', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-magik\" *ngIf=\"isShaman\">\n                <value-display label=\"Magik\"\n                    value=\"{{character.magik.current}}\"\n                    [options]=\"{max:character.magik.max+(modifiers.magik?modifiers.magik.value:0)}\"\n                    (onSave)=\"saveChar('magik.current', $event)\">\n                </value-display>\n                <value-display label=\"Max\"\n                    value=\"{{character.magik.max}}\"\n                    [modifiers]=\"modifiers.magik\"\n                    (onSave)=\"saveChar('magik.max', $event)\">\n                </value-display>\n            </section>\n\n            <section class=\"t-fury\" *ngIf=\"isSamurai\">\n                <value-display label=\"Fury\"\n                    value=\"{{character.fury.current}}\"\n                    [options]=\"{max:character.fury.max+(modifiers.fury?modifiers.fury.value:0)}\"\n                    (onSave)=\"saveChar('fury.current', $event)\">\n                </value-display>\n                <value-display label=\"Max\"\n                    value=\"{{character.fury.max}}\"\n                    [modifiers]=\"modifiers.fury\"\n                    (onSave)=\"saveChar('fury.max', $event)\">\n                </value-display>\n            </section>\n\n            <!-- <div>\n                <h5>Modifiers being applied</h5>\n                {{modifiers|json}}\n            </div> -->\n\n        </main>\n\n\n    </div>\n\n    <div class=\"l-page\">\n        <main>\n            <attacks\n                [attacks]=\"character.attacks\"\n                (onSave)=\"saveChar(null, $event)\">\n            </attacks>\n        </main>\n    </div>\n\n    <div class=\"l-page\" *ngIf=\"isPreacher\">\n        <main>\n            <preacher-sermons\n                [character]=\"character\"\n                [modifiers]=\"modifiers.faith\"\n                (onSave)=\"saveChar(null, $event)\">\n            </preacher-sermons>\n        </main>\n    </div>\n\n    <div class=\"l-page\" *ngIf=\"isShaman\">\n        <main>\n            <shaman-spells\n                [character]=\"character\"\n                [modifiers]=\"modifiers.magik\"\n                (onSave)=\"saveChar(null, $event)\">\n            </shaman-spells>\n        </main>\n    </div>\n\n    <div class=\"l-page\" *ngIf=\"isSamurai\">\n        <main>\n            <samurai-tactics\n                [character]=\"character\"\n                [modifiers]=\"modifiers.fury\"\n                (onSave)=\"saveChar(null, $event)\">\n            </samurai-tactics>\n        </main>\n    </div>\n\n    <div class=\"l-page\" *ngIf=\"isGambler\">\n        <main>\n            <gambler-tricks\n                [character]=\"character\"\n                [modifiers]=\"modifiers.fortune\"\n                (onSave)=\"saveChar(null, $event)\">\n            </gambler-tricks>\n        </main>\n    </div>\n\n    <div class=\"l-page\" *ngIf=\"isOrphan\">\n        <main>\n            <orphan-missions\n                [character]=\"character\"\n                (onSave)=\"saveChar(null, $event)\">\n            </orphan-missions>\n        </main>\n    </div>\n\n    <div class=\"l-page\">\n        <main>\n            <abilities\n                [character]=\"character\"\n                (onSave)=\"saveChar(null, $event)\">\n            </abilities>\n        </main>\n    </div>\n\n    <div class=\"l-page\">\n        <main>\n            <items [items]=\"character.items\"\n                   [weightLimit]=\"getWeightLimit()\"\n                    (onSave)=\"saveChar(null, $event)\">\n            </items>\n        </main>\n    </div>\n\n    <div class=\"l-page\">\n        <main>\n            <mim [current]=\"character.mutations\" (onSave)=\"saveChar(null, $event)\"></mim>\n         </main>\n     </div>\n\n     <div class=\"l-page\">\n         <main>\n             <sidebag\n                [sidebag]=\"character.sidebag\"\n                [modifiers]=\"modifiers.sidebag\"\n                [hasDynamiteSatchel]=\"hasDynamiteSatchel()\"\n                (onSave)=\"saveChar(null, $event)\">\n             </sidebag>\n         </main>\n     </div>\n\n     <div class=\"l-page\">\n         <main>\n             <char-notes [notes]=\"character.notes\" (onSave)=\"saveChar('notes', $event)\">\n             </char-notes>\n         </main>\n     </div>\n\n</div>\n"

/***/ }),

/***/ 613:
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"error\" class=\"c-error\">\n    <h5>Error</h5>\n    <p>{{error.message}}</p>\n    <a *ngIf=\"'auth'===error.type\" routerLink=\"/login\" routerLinkActive=\"active\">\n        Sign in\n    </a>\n</div>\n\n<div class=\"c-list\">\n\n    <header><h5>My Characters</h5></header>\n\n    <div class=\"c-list__item\">\n        <select class=\"form-control\" name=\"newCharClass\" [(ngModel)]=\"newCharClass\">\n            <option [ngValue]=\"null\" selected>Create a new character...</option>\n            <option *ngFor=\"let cls of classes\" [ngValue]=\"cls\">\n                {{cls.name}}\n            </option>\n        </select>\n        &nbsp;\n        <button type=\"button\" (click)=\"create()\">Create</button>\n    </div>\n\n    <div class=\"c-list__item\">\n        <a routerLink=\"/import\" routerLinkActive=\"active\">\n            Import an Old Character\n        </a>\n    </div>\n\n    <div class=\"d-grid\">\n\n        <div *ngFor=\"let char of chars | async | orderBy:'level'\">\n\n            <div class=\"card\">\n                <a class=\"thumbnail\" routerLink=\"/chars/{{char.id}}\" routerLinkActive=\"active\">\n                    <img class=\"image\" [ngStyle]=\"getAvatar(char)\">\n                </a>\n                <h4 class=\"u-text--center\">{{char.name}}</h4>\n                <div class=\"u-text--center u-sm\">{{char.class}} {{char.level}}</div>\n                <div class=\"d-flex flex-justify-end flex-align-start\">\n                    <button type=\"button\" class=\"u-sm btn--del\" (click)=\"markAsDeleting(char.id,true)\">Delete</button>\n                    <div class=\"btn-group\" *ngIf=\"isDeleting(char.id)\">\n                        <button type=\"button\" class=\"btn--del u-sm\" (click)=\"remove(char.id)\">Y</button>\n                        <button type=\"button\" class=\"u-sm\" (click)=\"markAsDeleting(char.id, false)\">N</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <!-- <div *ngFor=\"let char of chars | async\" class=\"c-list__item\">\n        <div>\n            <a  routerLink=\"/chars/{{char.id}}\" routerLinkActive=\"active\">\n                {{char.name}}\n            </a>&nbsp;\n             (level {{char.level}} <strong class=\"u-sm\">{{char.class}}</strong>)\n         </div>\n        &nbsp;\n        <div class=\"btn-group\" *ngIf=\"isDeleting(char.id)\">\n            <button type=\"button\" class=\"btn--del u-sm\" (click)=\"remove(char.id)\">\n                yes\n            </button>\n            <button type=\"button\" class=\"u-sm\" (click)=\"markAsDeleting(char.id, false)\">\n                no\n            </button>\n        </div>\n        <button *ngIf=\"!isDeleting(char.id)\" type=\"button\"\n            class=\"u-sm btn--del\" (click)=\"markAsDeleting(char.id,true)\">\n            X\n        </button>\n    </div> -->\n\n</div>\n"

/***/ }),

/***/ 614:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n\n    <div class=\"tabbed\">\n\n        <div class=\"tabs\" role=\"tablist\">\n            <a  *ngFor=\"let tab of tabs\"\n                [ngClass]=\"{active:activeTab.id===tab.id}\"\n                role=\"tab\"\n                class=\"tab\"\n                (click)=\"activateTab(tab)\">\n                {{tab.label}}\n            </a>\n        </div>\n\n        <!-- Tab panes -->\n        <div class=\"panes\">\n            <div role=\"tabpanel\" class=\"pane\" id=\"first\" [ngClass]=\"{active:activeTab.id==='first'}\">\n                <div class=\"form-group\">\n                    <label class=\"u-sm\">Name</label>\n                    <input type=\"text\" class=\"form-control input-sm\"\n                        [(ngModel)]=\"item.name\" placeholder=\"Name the item\">\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"u-sm\">Description</label>\n                    <textarea rows=\"3\" class=\"form-control input-sm\"\n                        [(ngModel)]=\"item.description\"\n                        placeholder=\"Provide a description\">\n                    </textarea>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"u-sm\">Keywords</label>\n                    <input type=\"text\" class=\"form-control input-sm\"\n                        [(ngModel)]=\"item.keywords\"\n                        placeholder=\"Specify item keywords\">\n                </div>\n            </div>\n            <div role=\"tabpanel\" class=\"pane\" id=\"second\" [ngClass]=\"{active:activeTab.id==='second'}\">\n                <div class=\"form-group\">\n                    <label class=\"u-sm\">Source</label>\n                    <input type=\"text\" class=\"form-control input-sm\" [(ngModel)]=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"u-sm\">Use</label>\n                    <select class=\"form-control\" [(ngModel)]=\"item.usage\">\n                        <option [ngValue]=\"null\">N/A</option>\n                        <option *ngFor=\"let use of uses\" [ngValue]=\"use\">{{use}}</option>\n                    </select>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"u-sm\">Clothing Slot</label>\n                    <select type=\"text\" class=\"form-control\" [(ngModel)]=\"item.slot\">\n                        <option [ngValue]=\"null\">Select Slot (optional)</option>\n                        <option *ngFor=\"let slot of slots\" [ngValue]=\"slot\">{{slot}}</option>\n                    </select>\n                </div>\n            </div>\n            <div role=\"tabpanel\" class=\"pane\" id=\"third\" [ngClass]=\"{active:activeTab.id==='third'}\">\n\n                <div class=\"form-group\">\n                    <label>Cost</label>\n                    <input type=\"text\" class=\"form-control u-sm\" [(ngModel)]=\"item.cost\"\n                        placeholder=\"Optionally, specify the cost\">\n                </div>\n                <br>\n                <div class=\"d-flex flex-justify-between flex-align-center\">\n                    <div class=\"col\">\n                        <img src=\"assets/item_weight.png\" height=\"16\">\n                        <input type=\"number\" min=\"0\" [(ngModel)]=\"item.weight\" class=\"form-control u-sm\">\n                    </div>\n                    <div class=\"col\">\n                        <img src=\"assets/item_darkstone.png\" height=\"16\">\n                        <input type=\"number\" min=\"0\" [(ngModel)]=\"item.darkstone\" class=\"form-control u-sm\">\n                    </div>\n                </div>\n                <br>\n                <div class=\"d-flex flex-justify-between flex-align-center\">\n                    <div class=\"col\">\n                        <img src=\"assets/item_hands.png\" height=\"16\">\n                        <input type=\"number\" min=\"0\" [(ngModel)]=\"item.hands\" class=\"form-control u-sm\">\n                    </div>\n                    <div class=\"col\">\n                        <img src=\"assets/item_slots.png\" height=\"16\">\n                        <input type=\"number\" min=\"0\" [(ngModel)]=\"item.slots\" class=\"form-control u-sm\">\n                    </div>\n                </div>\n                <br>\n            </div>\n            <div role=\"tabpanel\" class=\"pane\" id=\"fourth\" [ngClass]=\"{active:activeTab.id==='fourth'}\">\n                <h6 class=\"d-flex flex-justify-between flex-align-end\">\n                    Modifiers\n                    <button type=\"button\" class=\"u-sm\" (click)=\"addModifier()\">+</button>\n                </h6><br>\n\n                <div class=\"d-flex flex-align-center flex-justify-between\"\n                    *ngFor=\"let modifier of item.modifiers\">\n\n                    <div class=\"col-2\" id=\"modifier-{{id}}\">\n                        <select class=\"form-control u-sm\" [(ngModel)]=\"modifier.affects\">\n                            <option [ngValue]=\"null\">Select</option>\n                            <option *ngFor=\"let modtarget of modifierTargets\" [ngValue]=\"modtarget\">\n                                {{modtarget}}\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"col\">\n                        <input type=\"number\" min=\"-10\" [(ngModel)]=\"modifier.value\"\n                            class=\"form-control u-sm\" placeholder=\"0\">\n                    </div>\n                    <div class=\"col\">\n                        <button type=\"button\" class=\"btn u-sm\" (click)=\"removeModifier($index)\">\n                            X\n                        </button>\n                    </div>\n                </div>\n                <br>\n\n            </div>\n        </div>\n    </div>\n\n    <hr>\n\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" (click)=\"apply()\"\n            [disabled]=\"!canApply()\"\n            aria-label=\"Apply\">Apply</button>\n    </div>\n\n</div>\n"

/***/ }),

/***/ 615:
/***/ (function(module, exports) {

module.exports = "\n<h4 class=\"d-flex flex-justify-between flex-align-end\">\n    <div class=\" u-text--sc\">Items</div>\n    <div class=\"d-flex flex-align-center flex-justify-end u-sm\">\n        <span class=\"sprite sprite-item_weight\"></span> {{totalWeight}}\n        / {{weightLimit}}\n        &nbsp;\n        <span class=\"sprite sprite-item_darkstone\"></span> {{totalDarkstone}}\n        &nbsp;\n        <button type=\"button\" class=\"btn--add\" (click)=\"addItem()\">New</button>\n    </div>\n</h4>\n<hr>\n\n<div *ngFor=\"let item of items; let i = index\" class=\"card\">\n\n    <h5 class=\"d-flex flex-justify-between flex-align-end\">\n        {{item.name}}\n        <div class=\"d-flex flex-justify-end flex-align-end\">\n            <button type=\"button\" class=\"u-sm\" (click)=\"editItem(i)\">edit</button>\n            &nbsp;&nbsp;&nbsp;\n            <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete(i,true)\">X</button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"removeItem(i)\">Y</button>\n                <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete(i,false)\">N</button>\n            </div>\n        </div>\n    </h5>\n\n    <div class=\"d-flex flex-justify-between flex-align-start u-sm\">\n        <span>{{item.source}}</span>\n        <span *ngIf=\"item.keywords\"><em>{{item.keywords}}</em></span>\n    </div>\n\n    <div class=\"desc\" *ngIf=\"item.description\">{{item.description}}</div>\n\n    <div *ngIf=\"item.usage || item.cost\"\n        class=\"u-sm d-flex flex-justify-between flex-align-center\">\n        <div *ngIf=\"item.usage\">Use per: {{item.usage}}</div>\n        <div *ngIf=\"!item.usage\">&nbsp;</div>\n        <div *ngIf=\"item.cost\">Cost: ${{item.cost}}</div>\n    </div>\n\n    <div *ngIf=\"item.modifiers && item.modifiers.length\">\n        <hr>\n        <div *ngFor=\"let modifier of item.modifiers\"  class=\"u-sm\">\n            {{modifier.affects}} {{modifier.value|modifier}}\n        </div>\n    </div>\n\n    <div class=\"item__stats\">\n        <div [ngClass]=\"{faded:!item.weight}\">\n            <span class=\"sprite sprite-item_weight\"></span> {{item.weight}}\n        </div>\n        <div [ngClass]=\"{faded:!item.darkstone}\">\n            <span class=\"sprite sprite-item_darkstone\"></span> {{item.darkstone}}\n        </div>\n        <div [ngClass]=\"{faded:!item.hands}\">\n            <span class=\"sprite sprite-item_hands\"></span> {{item.hands}}\n        </div>\n        <div [ngClass]=\"{faded:!item.slots}\">\n            <span class=\"sprite sprite-item_slots\" ></span> {{item.slots}}\n        </div>\n    </div>\n\n\n    <div class=\"d-flex flex-justify-between flex-align-center\">\n        <div>\n            <button type=\"button\"\n                (click)=\"equipItem(item)\"\n                [ngClass]=\"{active:item.equipped}\">Equip</button>\n            <span *ngIf=\"item.slot\">[{{item.slot}}]</span>\n        </div>\n        <button *ngIf=\"item.usage\" type=\"button\" class=\"btn--use\"\n            (click)=\"item.used=!item.used\"\n            [ngClass]=\"{active:item.used}\">Use</button>\n    </div>\n\n</div>\n"

/***/ }),

/***/ 616:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"c-login\">\n\n    <div class=\"card\">\n\n        <div>\n            <label for=\"userEmail\">Email*</label>\n            <input class=\"form-control\" [(ngModel)]=\"email\" type=\"email\" required name=\"userEmail\">\n        </div>\n        <br>\n        <div>\n            <label for=\"userPassword\">Password</label>\n            <input class=\"form-control\" [(ngModel)]=\"password\" type=\"password\" required name=\"userPassword\">\n        </div>\n\n        <div *ngIf=\"message\" class=\"t-fg--danger\">\n            <br>\n            {{message}}\n            <br>\n        </div>\n\n        <br>\n        <hr>\n        <br>\n\n        <div class=\"d-flex flex-justify-between flex-align-center\">\n            <button type=\"button\" (click)=\"resetPassword()\">Reset Password</button>\n            <button type=\"button\" class=\"btn--use\" (click)=\"login()\">Login</button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 617:
/***/ (function(module, exports) {

module.exports = "\n\n\n<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Mutations</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"showAvailable.mutations=!showAvailable.mutations\">New</button>\n</h4>\n<hr>\n<div *ngIf=\"showAvailable.mutations\" class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col\">\n        <br>\n        <select class=\"form-control\" name=\"newMutation\"\n            [(ngModel)]=\"newMutation\"\n            (change)=\"add('mutations', newMutation)\">\n            <option [ngValue]=\"null\" selected>Select Mutation</option>\n            <option *ngFor=\"let mutation of available.mutations\" [ngValue]=\"mutation\">\n                {{mutation.name}}\n            </option>\n        </select>\n        <br>\n        <br>\n    </div>\n    <button type=\"button\" (click)=\"showAvailable.mutations=false\">&times;</button>\n</div>\n<div *ngIf=\"!mutations || !mutations.length\">\n    Add a new mutation using the 'New' button.\n</div>\n<div *ngFor=\"let mutation of mutations; let i = index\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-center\">\n        {{mutation.name}}\n        <button type=\"button\" class=\"btn--del\"\n            (click)=\"remove('mutations', i)\">X</button>\n    </h5>\n    <div class=\"desc\">{{mutation.desc}}</div>\n    <br>\n    <div *ngIf=\"mutation.modifiers\">\n        <div *ngFor=\"let modifier of mutation.modifiers\">\n            {{modifier.affects}} {{modifier.value|modifier}}\n        </div>\n    </div>\n</div>\n<br>\n<br>\n<br>\n<br>\n<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Injuries</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"showAvailable.injuries=!showAvailable.injuries\">New</button>\n</h4>\n<hr>\n<div *ngIf=\"showAvailable.injuries\" class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col\">\n        <br>\n        <select class=\"form-control\" name=\"newInjury\"\n            [(ngModel)]=\"newInjury\"\n            (change)=\"add('injuries', newInjury)\">\n            <option [ngValue]=\"null\" selected>Select Injury</option>\n            <option *ngFor=\"let injury of available.injuries\" [ngValue]=\"injury\">\n                {{injury.name}}\n            </option>\n        </select>\n        <br>\n        <br>\n    </div>\n    <button type=\"button\" (click)=\"showAvailable.injuries=false\">&times;</button>\n</div>\n<div *ngIf=\"!injuries || !injuries.length\">\n    Add a new injury using the 'New' button.\n</div>\n<div *ngFor=\"let injury of injuries; let i = index\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-center\">\n        {{injury.name}}\n        <button type=\"button\" class=\"btn--del\"\n            (click)=\"remove('injuries', i)\">X</button>\n    </h5>\n    <div class=\"desc\">{{injury.desc}}</div>\n    <div *ngIf=\"injury.modifiers\">\n        <div *ngFor=\"let modifier of injury.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n</div>\n<br>\n<br>\n<br>\n<br>\n<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Madness</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"showAvailable.madness=!showAvailable.madness\">New</button>\n</h4>\n<hr>\n<div *ngIf=\"showAvailable.madness\" class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col\">\n        <br>\n        <select class=\"form-control\" name=\"newMadness\"\n            [(ngModel)]=\"newMadness\"\n            (change)=\"add('madness', newMadness)\">\n            <option [ngValue]=\"null\" selected>Select Madness</option>\n            <option *ngFor=\"let mad of available.madness\" [ngValue]=\"mad\">\n                {{mad.name}}\n            </option>\n        </select>\n        <br>\n        <br>\n    </div>\n    <button type=\"button\" (click)=\"showAvailable.madness=false\">&times;</button>\n</div>\n<div *ngIf=\"!madness || !madness.length\">\n    Add a new madness using the 'New' button.\n</div>\n<div *ngFor=\"let mad of madness; let i = index\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-center\">\n        {{mad.name}}\n        <button type=\"button\" class=\"btn--del\" (click)=\"remove('madness', i)\">X</button>\n    </h5>\n    <div class=\"desc\">{{mad.desc}}</div>\n    <div *ngIf=\"mad.modifiers\">\n        <div *ngFor=\"let modifier of mad.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ 618:
/***/ (function(module, exports) {

module.exports = "<p>\n  chooser works!\n</p>\n"

/***/ }),

/***/ 619:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n\n    <h5>\n        Current: {{value}}\n\n        <small>\n            ( min: {{minimum}}, max: {{maximum}} )\n        </small>\n\n    </h5>\n    <small *ngIf=\"modifiers\">\n        Modifiers:\n        {{modifiers.value|modifier}}\n        ({{modifiers.sources|join:', '}})\n    </small>\n\n    <div class=\"d-flex flex-justify-between flex-wrap\">\n\n        <div class=\"col-3\">\n\n            <div class=\"d-flex flex-justify-around flex-align-stretch\">\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(-100)\" (ngDisable)=\"value==minimum\">-100</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(-50)\" (ngDisable)=\"value==minimum\">-50</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(-20)\" (ngDisable)=\"value==minimum\">-20</button>\n            </div>\n            <br>\n            <div class=\"d-flex flex-justify-around flex-align-stretch\">\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(-10)\" (ngDisable)=\"value==minimum\">-10</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(-5)\" (ngDisable)=\"value==minimum\">-5</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(-1)\" (ngDisable)=\"value==minimum\">-1</button>\n            </div>\n            <br>\n            <div class=\"d-flex flex-justify-around flex-align-stretch\">\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(1)\">+1</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(5)\">+5</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(10)\">+10</button>\n            </div>\n            <br>\n            <div class=\"d-flex flex-justify-around flex-align-stretch\">\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(20)\">+20</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(50)\">+50</button>\n                <button type=\"button\" class=\"keypad__button\" (click)=\"change(100)\">+100</button>\n            </div>\n\n\n            <br>\n\n            <div class=\"manual-entry\">\n                <div class=\"d-flex flex-justify-around flex-align-stretch\">\n                    <button type=\"button\" (click)=\"changeManual(-1)\" (ngClass)=\"{disabled:!hasManual()}\">-</button>\n                    <div class=\"col\">\n                        <input type=\"number\" class=\"form-control\" [(ngModel)]=\"manualAdj\" placeholder=\"Adjust by ...\">\n                    </div>\n                    <button type=\"button\" (click)=\"changeManual(1)\" (ngClass)=\"{disabled:!hasManual()}\">+</button>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"col-1 d-flex flex-col flex-justify-between flex-align-stretch\">\n            <div class=\"col\">\n                <strong>Changes to be applied:</strong><br>\n                <div *ngFor=\"let change of changes\">{{change}}</div>\n            </div>\n            <div>Final Value: {{result}}</div>\n        </div>\n\n    </div>\n\n    <hr>\n\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        &nbsp;&nbsp;&nbsp;\n        <button type=\"button\" (click)=\"apply()\" aria-label=\"Apply\">Apply</button>\n    </div>\n\n</div>\n"

/***/ }),

/***/ 620:
/***/ (function(module, exports) {

module.exports = "<div class=\"value-display\">\n    <div class=\"value\" [ngClass]=\"{modified:isModified()}\">\n        <div (click)=\"openKeypad()\"\n             [ngClass]=\"{'u-sm':'sm'===options.valueSize}\">\n            {{computed}}\n        </div>\n        <div *ngIf=\"canAdjust\">\n            <button type=\"button\" class=\"incrementer\"\n                (click)=\"increment()\"\n                (ngDisabled)=\"!canIncrement()\">\n                +\n            </button>\n            <button type=\"button\" class=\"decrementer\"\n                (click)=\"decrement()\"\n                (ngDisabled)=\"!canDecrement()\">\n                -\n            </button>\n        </div>\n    </div>\n    <div class=\"label\" [ngClass]=\"{'u-sm':'sm'===options.labelSize}\">\n        <span>{{label}}</span>\n    </div>\n</div>\n"

/***/ }),

/***/ 621:
/***/ (function(module, exports) {

module.exports = "<div class=\"value-display\" [ngClass]=\"{'has-leveled':hasLeveled()}\">\n    <div class=\"value\" [ngClass]=\"{modified:isModified()}\">\n        <div (click)=\"openKeypad()\"\n            [ngClass]=\"{'u-sm':'sm'===options.valueSize}\">\n            <div>\n                {{value}}\n                <div class=\"needed\">{{needed}}</div>\n            </div>\n        </div>\n        <div *ngIf=\"canAdjust\">\n            <button type=\"button\" class=\"incrementer\"\n                (click)=\"increment()\"\n                (ngDisabled)=\"!canIncrement()\">\n                +\n            </button>\n            <button type=\"button\" class=\"decrementer\"\n                (click)=\"decrement()\"\n                (ngDisabled)=\"!canDecrement()\">\n                -\n            </button>\n        </div>\n    </div>\n    <div class=\"label\" [ngClass]=\"{'u-sm':'sm'===options.labelSize}\">\n        <span>{{label}}</span>\n    </div>\n</div>\n"

/***/ }),

/***/ 622:
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebag\">\n\n    <div class=\"d-flex flex-align-center\">\n        <h4 class=\"col u-text--sc\">Sidebag</h4>\n        <div class=\"sidebag__carrying\">{{carrying}} / </div>\n        <div>\n            <value-display\n                label=\"Capacity\"\n                [value]=\"sidebag.capacity\"\n                [modifiers]=\"modifiers\"\n                (onSave)=\"updateCapacity($event)\">\n            </value-display>\n        </div>\n    </div>\n    <br>\n\n    <div *ngFor=\"let option of options\" class=\"sidebag__option\">\n        <label>\n            <span class=\"sprite sprite-{{option.label}}\"></span>\n            {{option.label}}\n        </label>\n        <div class=\"sidebag__control\">\n            <button type=\"button\" class=\"btn--del btn--round\"\n                (click)=\"decrease(option.label)\"\n                (ngDisabled)=\"!sidebag[option.label]\">\n                -\n            </button>\n            <span>{{sidebag[option.label]||0}}</span>\n            <button type=\"button\" class=\"btn--use btn--round\"\n                (click)=\"increase(option.label)\"\n                (ngDisabled)=\"!max\">\n                +\n            </button>\n        </div>\n        <small class=\"help-block\">{{option.description}}</small>\n    </div>\n\n</div>\n"

/***/ }),

/***/ 623:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngFor=\"let trick of options\"\n            class=\"c-option--available\"\n            [ngClass]=\"{'is-selected':isChosen(trick)}\">\n            <h5>{{trick.name}}</h5>\n            <div>{{trick.desc}}</div>\n            <div class=\"col\" *ngIf=\"trick.requires\">\n                <strong>Requires</strong> <em>{{trick.requires}}</em>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!trick.disabled\"\n                (click)=\"choose(trick)\">\n                <span>{{isChosen(trick)?'Unselect':'Choose'}}</span>\n            </button>\n        </div>\n    </div>\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 624:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Gambler Tricks</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n\n<hr>\n<div class=\"d-flex flex-justify-between flex-align-center\">\n    Current Fortune: {{character.fortune.current}} / {{maxFortune}}\n    <button type=\"button\" class=\"u-sm btn--use\" (click)=\"resetFortune()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let trick of character.tricks; let i = index;\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-end\">\n        {{trick.name}}\n        <div class=\"d-flex flex-justify-end flex-align-end\">\n            <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete(i,true)\">X</button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"remove(i)\">Y</button>\n                <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete(i,false)\">N</button>\n            </div>\n        </div>\n    </h5>\n    <div *ngIf=\"trick.cost\">\n        <strong>Cost: </strong> {{trick.cost}}\n    </div>\n    <div class=\"desc\">{{trick.desc}}</div>\n    <div *ngIf=\"trick.modifiers\">\n        <div *ngFor=\"let modifier of trick.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <hr>\n    <button type=\"button\" class=\"btn--use\"\n        [disabled]=\"!hasFortune()\" (click)=\"spendFortune()\">\n        Spend 1 Fortune\n    </button>\n    <button type=\"button\" class=\"btn\" *ngIf=\"trick.xp\" (click)=\"gainXP(trick.xp)\">XP</button>\n</div>\n"

/***/ }),

/***/ 625:
/***/ (function(module, exports) {

module.exports = "<h4 class=\" u-text--sc\">Notes</h4>\n<textarea rows=\"20\" class=\"form-control\"\n    [(ngModel)]=\"notes\"\n    (ngModelChange)=\"onValueChange($event)\"\n    placeholder=\"Enter custom notes here\">\n</textarea>\n<button type=\"button\" class=\"btn--use\"\n    *ngIf=\"needsSaving\"\n    (click)=\"saveChanges()\">Save</button>\n"

/***/ }),

/***/ 626:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngIf=\"!options.length\" class=\"c-option--available\">\n            <h5>None available</h5>\n        </div>\n        <div *ngFor=\"let mission of options\"\n            class=\"c-option--available\"\n            [ngClass]=\"{'is-selected':isChosen(mission)}\">\n            <h5>{{mission.name}}</h5>\n            <div>{{mission.desc}}</div>\n            <div class=\"col\" *ngIf=\"mission.requires\">\n                <strong>Requires</strong> <em>{{mission.requires}}</em>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!mission.disabled\"\n                (click)=\"choose(mission)\">\n                <span>{{isChosen(mission)?'Unselect':'Choose'}}</span>\n            </button>\n        </div>\n    </div>\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 627:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Orphan Missions</div>\n    <button type=\"button\" class=\"btn--add u-sm\" (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n\n<div *ngFor=\"let mission of character.missions;let i=index;\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-end\">\n        {{mission.name}}\n        <div class=\"d-flex flex-justify-end flex-align-end\">\n            <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete(i,true)\">X</button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"remove(i)\">Y</button>\n                <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete(i,false)\">N</button>\n            </div>\n        </div>\n    </h5>\n    <div class=\"desc\">{{mission.desc}}</div>\n    <div *ngIf=\"mission.modifiers\">\n        <hr>\n        <div *ngFor=\"let modifier of mission.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <!--\n    <hr>\n    <div class=\"d-flex flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn--use\" (click)=\"spendFury(mission.cost)\">Cast</button>\n    </div>\n    -->\n</div>\n"

/***/ }),

/***/ 628:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngFor=\"let sermon of options\"\n            class=\"c-option--available\"\n            [ngClass]=\"{'is-selected':isChosen(sermon)}\">\n\n            <h5>{{sermon.name}}</h5>\n            <div class=\"d-flex flex-justify-between flex-align-center\">\n                <div><strong>Check: </strong> [{{sermon.check}}+]</div>\n                <div><strong>Cost: </strong> {{sermon.cost}}</div>\n                <div><strong>XP: </strong> {{sermon.xp}}</div>\n            </div>\n            <div>{{sermon.desc}}</div>\n            <div class=\"col\" *ngIf=\"sermon.requires\">\n                <strong>Requires</strong> <em>{{sermon.requires}}</em>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!sermon.disabled\"\n                (click)=\"choose(sermon)\">\n                <span>{{isChosen(sermon)?'Unselect':'Choose'}}</span>\n            </button>\n            \n        </div>\n    </div>\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 629:
/***/ (function(module, exports) {

module.exports = "<div class=\"sermon card\">\n\n    <div *ngIf=\"!isEditing\">\n\n        <h5 class=\"d-flex flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <span *ngIf=\"sermon.deadly\" style=\"color:#f00\">!</span>\n                {{sermon.name}}\n                <small>({{sermon.type}})</small>\n            </div>\n            <div class=\"d-flex flex-justify-end flex-align-end\">\n                <button type=\"button\" class=\"btn u-sm\" (click)=\"edit()\">edit</button>\n                &nbsp;&nbsp;&nbsp;\n                <button type=\"button\" class=\"btn u-sm\" (click)=\"confirmingDelete=true\">X</button>\n                <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                    <button type=\"button\" class=\"btn u-sm\" (click)=\"remove()\">Y</button>\n                    <button type=\"button\" class=\"btn u-sm\" (click)=\"confirmingDelete=false\">N</button>\n                </div>\n            </div>\n        </h5>\n\n        <div class=\"desc\">{{sermon.desc}}</div>\n\n        <div><strong>Range: </strong> {{sermon.range||\"Not specified\"}}</div>\n\n        <div class=\"d-flex flex-justify-between flex-align-center\">\n            <div><strong>Check: </strong> [{{sermon.check}}+]</div>\n            <div><strong>Cost: </strong> {{sermon.cost}}</div>\n            <div><strong>XP: </strong> {{sermon.xp}}</div>\n        </div>\n\n        <hr>\n\n        <div>\n\n            <!-- if not cast already and not empty or insufficient -->\n            <button type=\"button\" class=\"u-sm\" *ngIf=\"canCast()\" (click)=\"use()\">cast</button>\n\n            <!-- if cast but not empty -->\n            <button type=\"button\" class=\"u-sm\" *ngIf=\"canSpendExtraFaith()\"\n                (click)=\"spendExtraFaith()\">+faith</button>\n\n            <!-- if cast but no applied xp -->\n            <button type=\"button\" class=\"u-sm\" *ngIf=\"canApplyXP()\" (click)=\"applyXP()\">+xp</button>\n\n            <!-- if empty or not cast and insufficient -->\n            <span *ngIf=\"isInsufficient()\">\n                <em>not enough faith</em>\n            </span>\n\n\n        </div>\n\n    </div>\n\n    <div *ngIf=\"isEditing\">\n        <div>\n            <label>Name</label>\n            <input type=\"text\" class=\"form-control\"\n                [(ngModel)]=\"editable.name\"\n                placeholder=\"Name this sermon\">\n        </div>\n\n        <div>\n            <label>Cost</label>\n            <textarea rows=\"3\" class=\"form-control\" [(ngModel)]=\"editable.desc\">\n            </textarea>\n        </div>\n\n        <div class=\"d-flex flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <label>Deadly?\n                    <input type=\"checkbox\" [(ngModel)]=\"editable.deadly\">\n                </label>\n            </div>\n            <div class=\"col-2\">\n                <label>Type</label>\n                <select class=\"form-control\" [(ngModel)]=\"editable.type\">\n                    <option value=\"Blessing\">Blessing</option>\n                    <option value=\"Judgement\">Judgement</option>\n                </select>\n            </div>\n        </div>\n\n        <div>\n            <label>Range</label>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"editable.range\">\n        </div>\n\n        <div class=\"d-flex flex-justify-between flex-align-center\">\n            <div class=\"col\">\n                <label>Check</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.check\">\n            </div>\n\n            <div class=\"col\">\n                <label>Cost</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.cost\">\n            </div>\n\n            <div class=\"col\">\n                <label>XP</label>\n                <input type=\"number\" class=\"form-control\" [(ngModel)]=\"editable.xp\">\n            </div>\n        </div>\n\n        <hr>\n\n        <div class=\"d-flex flex-justify-between\">\n            <button type=\"button\" class=\"u-sm\" (click)=\"cancelEditing()\">cancel</button>\n            <button type=\"button\" class=\"u-sm\" (click)=\"save()\">save</button>\n        </div>\n    </div>\n\n</div>\n"

/***/ }),

/***/ 630:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col\">Sermons</div>\n    <button type=\"button\" class=\"btn--add u-sm\" (click)=\"openChooser()\">New</button>\n</h4>\n\n<hr>\n<div class=\"d-flex flex-justify-between flex-align-center\">\n    Faith: {{getAvailableFaith()}} / {{maxFaith+getFaithModifier()}}\n    <button type=\"button\" (click)=\"resetSermons()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let sermon of character.sermons\">\n    <sermon [sermon]=\"sermon\"\n        [eventSubject]=\"eventSubject\"\n        (onEvent)=\"onEvent($event)\"\n        [availableFaith]=\"getAvailableFaith()\">\n    </sermon>\n</div>\n"

/***/ }),

/***/ 631:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngFor=\"let tactic of options\"\n            class=\"c-tactic--available\"\n            [ngClass]=\"{'is-selected':isChosen(tactic)}\">\n            <h5>{{tactic.name}} ({{tactic.cost}} Fury)</h5>\n            <div>{{tactic.desc}}</div>\n            <div class=\"col\" *ngIf=\"tactic.requires\">\n                <strong>Requires</strong> <em>{{tactic.requires}}</em>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!tactic.disabled\"\n                (click)=\"choose(tactic)\">\n                <span>{{isChosen(tactic)?'Unselect':'Choose'}}</span>\n            </button>\n        </div>\n    </div>\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 632:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Samurai Battle Tactics</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n<div class=\"d-flex flex-justify-between flex-align-center\">\n    Fury: {{character.fury.current}} / {{maxFury}}\n</div>\n<hr>\n\n<div *ngFor=\"let tactic of character.tactics;let i=index;\" class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-end\">\n        {{tactic.name}}\n        <div class=\"d-flex flex-justify-end flex-align-end\">\n            <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete(i,true)\">X</button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete(i)\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"remove(i)\">Y</button>\n                <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete(i,false)\">N</button>\n            </div>\n        </div>\n    </h5>\n    <div *ngIf=\"tactic.cost\">\n        <strong>Cost: </strong> {{tactic.cost}}\n    </div>\n    <div class=\"desc\">{{tactic.desc}}</div>\n    <div *ngIf=\"tactic.modifiers\">\n        <div *ngFor=\"let modifier of tactic.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <hr>\n    <div class=\"d-flex flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn--use\" (click)=\"spendFury(tactic.cost)\">Cast</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 633:
/***/ (function(module, exports) {

module.exports = "<div [@dialog] *ngIf=\"visible\" class=\"dialog\">\n    <div class=\"dialog__body\">\n        <div *ngFor=\"let spell of options\"\n            class=\"c-option--available\"\n            [ngClass]=\"{'is-selected':isChosen(spell)}\">\n            <h5>{{spell.name}}</h5>\n            <div>{{spell.desc}}</div>\n            <div class=\"col\" *ngIf=\"spell.requires\">\n                <strong>Requires</strong> <em>{{spell.requires}}</em>\n            </div>\n            <button type=\"button\" class=\"btn btn--use\"\n                *ngIf=\"!spell.disabled\"\n                (click)=\"choose(spell)\">\n                <span>{{isChosen(spell)?'Unselect':'Choose'}}</span>\n            </button>\n        </div>\n    </div>\n    <div class=\"d-flex flex-justify-end\">\n        <button type=\"button\" (click)=\"close()\" aria-label=\"Close\">Cancel</button>\n        <button type=\"button\" aria-label=\"Apply\"\n            [disabled]=\"!hasSelection()\"\n            (click)=\"apply()\">Apply</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 634:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"d-flex flex-justify-between flex-align-center\">\n    <div class=\"col u-text--sc\">Shaman Spells</div>\n    <button type=\"button\" class=\"btn--add u-sm\"\n        (click)=\"openChooser()\">New</button>\n</h4>\n<hr>\n<div class=\"d-flex flex-justify-between flex-align-center\">\n    Current Magik: {{character.magik.current}} / {{maxMagik}}\n    <button type=\"button\" class=\"u-sm btn--use\"(click)=\"resetMagik()\">Reset</button>\n</div>\n<hr>\n\n<div *ngFor=\"let spell of character.spells;let index=$index\">\n    <shaman-spell [spell]=\"spell\"\n        [magik]=\"character.magik.current\"\n        (onEvent)=\"onSpellEvent($event)\">\n    </shaman-spell>\n</div>\n"

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n    <h5 class=\"d-flex flex-justify-between flex-align-end\">\n        {{spell.name}}\n        <div class=\"d-flex flex-justify-end flex-align-end\">\n            <button type=\"button\" class=\"u-sm btn--del\" (click)=\"confirmingDelete=true\">X</button>\n            <div class=\"btn-group\" *ngIf=\"confirmingDelete\">\n                <button type=\"button\" class=\"u-sm\" (click)=\"remove()\">Y</button>\n                <button type=\"button\" class=\"u-sm\" (click)=\"confirmingDelete=false\">N</button>\n            </div>\n        </div>\n    </h5>\n\n    <div class=\"u-sm\">\n        <strong>Power Roll: </strong> {{spell.power||'*'}}+\n    </div>\n    <div *ngIf=\"status\">{{status}} (Rolled {{roll}})</div>\n\n    <div class=\"desc\">{{spell.desc}}</div>\n    <div *ngIf=\"spell.modifiers\">\n        <div *ngFor=\"let modifier of spell.modifiers\">\n            {{modifier.affects}} : +{{modifier.value}}\n        </div>\n    </div>\n    <hr>\n\n    <div class=\"col d-flex flex-justify-start flex-align-center\">\n        <select class=\"form-control\" [(ngModel)]=\"magikSpent\">\n            <option value=\"0\">Spend Add'l Magik</option>\n            <option value=\"1\" [disabled]=\"!hasMagik()\">1</option>\n            <option value=\"2\" [disabled]=\"!hasMagik(2)\">2</option>\n            <option value=\"3\" [disabled]=\"!hasMagik(3)\">3</option>\n            <option value=\"4\" [disabled]=\"!hasMagik(4)\">4</option>\n            <option value=\"5\" [disabled]=\"!hasMagik(5)\">5</option>\n        </select>\n        <button type=\"button\" class=\"btn\"\n            [disabled]=\"!hasMagik()\" (click)=\"spendMagik()\">\n            Ok\n        </button>\n    </div>\n    <hr>\n    <div class=\"d-flex flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn--use\" (click)=\"castSpell()\">Cast</button>\n        <button type=\"button\" class=\"btn\" *ngIf=\"spell.xp\" (click)=\"gainXP()\">{{spell.xp}} XP</button>\n    </div>\n</div>\n"

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports = "<div>\n    <br><br>\n\n    <div *ngIf=\"status\">\n        <h5 *ngIf=\"'error'===status.type\">An Error Occurred</h5>\n        <h5 *ngIf=\"'success'===status.type\">Success</h5>\n        {{status.message}}\n    </div>\n\n    <!-- <textarea class=\"form-control\" rows=\"10\"\n        placeholder=\"paste character JSON here\"\n        [(ngModel)]=\"charJSON\">\n    </textarea>\n    <button type=\"button\" (click)=\"uploadChar()\">Upload</button> -->\n\n    <div class=\"c-list\">\n        <header>\n            <h5>My Old Characters</h5>\n            <p>The following characters can be imported into the new database</p>\n        </header>\n        <div *ngFor=\"let char of chars | async\" class=\"c-list__item\">\n            <div>{{char.name}}</div>\n            <button type=\"button\" class=\"btn u-sm\" (click)=\"importChar(char.json, char.name)\">Import</button>\n        </div>\n    </div>\n\n\n    <!-- <hr>\n    <button type=\"button\" (click)=\"initClasses()\">Init</button>\n    <button type=\"button\" (click)=\"exportDB()\">Export</button>\n    -->\n\n</div>\n"

/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(387);


/***/ })

},[903]);
//# sourceMappingURL=main.bundle.js.map