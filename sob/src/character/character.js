(function(angular) {
    
    "use strict";

    var app = angular.module("sob-character", ['ngSanitize', 'ui.bootstrap', "firebase", 'sob-common']);

    
    app.controller("CharacterController", [
        "$scope", "$routeParams", "CharacterRef",
        function($scope, $routeParams, CharacterRef) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };

        //load the campaign
        this.charName = decodeURIComponent($routeParams.charId);
        this.character = CharacterRef(this.charName);

        this.character.$loaded().then(function() {
            self.character.sidebag.spices = self.character.sidebag.spices || 0;
            self.character.sidebag.potions = self.character.sidebag.potions || 0;
            self.character.sidebag.hatchets = self.character.sidebag.hatchets || 0;
            self.character.sidebag.lanternOil = self.character.sidebag.lanternOil || 0;
            self.character.sidebag.exoticHerbs = self.character.sidebag.exoticHerbs || 0;
            self.character.sidebag.tequila = self.character.sidebag.tequila || 0;
            self.character.sidebag.cigars = self.character.sidebag.cigars || 0;
        });
        
        this.onInputKeyPress = function($event) {
            var key = $event.keyCode || $event.which;
            if(key === 13) {    //enter
                // this.save();
            }
        };


        this.save = function() {
            console.log("Saved");
            this.character.$save();
        };

        this.getAvailableSidebagCapacity = function() {
            if(!self.character.sidebag) return 0;
            return self.character.sidebag.capacity - (
                (self.character.sidebag.bandages||0) + 
                (self.character.sidebag.whiskey||0) + 
                (self.character.sidebag.tonic||0) + 
                (self.character.sidebag.herbs||0) + 
                (self.character.sidebag.dynamite||0) + 
                (self.character.sidebag.flash||0) + 
                (self.character.sidebag.fungus||0) + 
                (self.character.sidebag.spices||0) +  
                (self.character.sidebag.potions||0) +  
                (self.character.sidebag.hatchets||0) + 
                (self.character.sidebag.lanternOil||0) + 
                (self.character.sidebag.exoticHerbs||0) +  
                (self.character.sidebag.tequila||0) + 
                (self.character.sidebag.cigars||0)
            );

            
        };

    }])



    .component('clothing', {
        bindings: {
            character: "=",
            type: "@",
            onSave: "&"
        },
        controller: function() {

            var self = this;
            this.init = function() {
                this.item = this.item || {name: null, desc: null};
                this.isEditing = false;
            }
            this.init();

            this.update = function() {
                var current = this.character.clothing && this.character.clothing[this.type];
                if(current) {
                    this.item.name = current.name;
                    this.item.desc = current.desc;
                }
            }
            this.character.$loaded().then(function() {
                self.update();
            });

            this.add = function() {
                if(!this.item.name) return;

                this.character.clothing = this.character.clothing || {}
                this.character.clothing[this.type] = this.item;
                this.onSave();
                this.update();
                this.init();
            };

            this.remove = function() {
                if(this.isRemoving === true) {
                    this.isRemoving = false;
                    this.character.clothing[this.type] = null;
                    this.item = null;
                    this.onSave();
                    this.update();
                    this.init();
                } else {
                    this.isRemoving = true;
                }
            };

        },
        templateUrl: 'src/character/clothing-item.html' 
    })



    .directive('abilities', function() {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/abilities.html',
            
            controller: function($scope, $element) {

                function init() {
                    $scope.value = {name: null, desc: null};
                }
                init();
                
                $scope.add = function() {
                    if(!$scope.value.name) return;
                    $scope.character.abilities = $scope.character.abilities || {}
                    $scope.character.abilities[$scope.value.name] = $scope.value.desc;
                    $scope.onSave();
                    init();
                };

                $scope.onEdited = function(name, newName, newDesc) {

                    if(name !== newName) {
                        //delete old property
                        delete $scope.character.abilities[name];
                    }

                    if(newName && newDesc) 
                        $scope.character.abilities[newName] = newDesc;

                    $scope.onSave();
                };


            }
        };
    })


    .directive('ability', function() {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            //remember original name just in case it changes
            var originalName = $scope.name;
            this.name = $scope.name;
            this.desc = $scope.desc;
            
            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                $scope.onSave({
                    newName: this.name, 
                    newDesc: this.desc
                });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
            };

            this.remove = function() {
                $scope.onSave({newName: null, newDesc: null});
            };

        }

        return {
            scope: {
                // character: "=",
                name: "@",
                desc: "@",
                onSave: '&'
            },
            replace: true,
            template: [
                '<div class="ability">',
                '  <div ng-if="!ctrl.displayEditor">',
                '    <div class="pull-right">',
                '      <button type="button" class="btn btn-sm btn-danger" ng-click="ctrl.remove()">',
                '        <span class="glyphicon glyphicon-trash"></span>',
                '      </button>',
                '      <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '        <span class="glyphicon glyphicon-pencil"></span>',
                '      </button>',
                '    </div>',
                '    <h5>{{ctrl.name}}</h5> <small>{{ctrl.desc}}</small>',
                '  </div>',
                '  <form ng-if="ctrl.displayEditor">',
                '    <input type="text" ng-model="ctrl.name" placeholder="name">',
                '    <input type="text" ng-model="ctrl.desc" placeholder="value">',
                '    <button type="button" class="btn btn-sm btn-success" ng-click="ctrl.save()">',
                '      <span class="glyphicon glyphicon-ok"></span>',
                '    </button>',
                '    <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.cancel()">',
                '      <span class="glyphicon glyphicon-remove"></span>',
                '    </button>',
                '  </form>',
                '</div>'
            ].join(' '),
            
            controller: Controller
        };
    })




    .directive('mutations', function() {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/mutations-and-injuries.html',
            
            controller: function($scope, $element) {

                function init() {
                    $scope.value = {name: null, desc: null};
                }
                init();
                
                $scope.add = function() {
                    if(!$scope.value.name) return;
                    $scope.character.mutations = $scope.character.mutations || {}
                    $scope.character.mutations[$scope.value.name] = $scope.value.desc;
                    $scope.onSave();
                    init();
                };

                $scope.onEdited = function(name, newName, newDesc) {

                    if(name !== newName) {
                        //delete old property
                        delete $scope.character.mutations[name];
                    }

                    if(newName && newDesc) 
                        $scope.character.mutations[newName] = newDesc;

                    $scope.onSave();
                };


            }
        };
    })


    .directive('mutation', function() {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            //remember original name just in case it changes
            var originalName = $scope.name;
            this.name = $scope.name;
            this.desc = $scope.desc;
            
            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                $scope.onSave({
                    newName: this.name, 
                    newDesc: this.desc
                });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
            };

            this.remove = function() {
                $scope.onSave({newName: null, newDesc: null});
            };

        }

        return {
            scope: {
                name: "@",
                desc: "@",
                onSave: '&'
            },
            replace: true,
            template: [
                '<div class="mutation">',
                '  <div ng-if="!ctrl.displayEditor">',
                '    <div class="pull-right">',
                '      <button type="button" class="btn btn-sm btn-danger" ng-click="ctrl.remove()">',
                '        <span class="glyphicon glyphicon-trash"></span>',
                '      </button>',
                '      <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '        <span class="glyphicon glyphicon-pencil"></span>',
                '      </button>',
                '    </div>',
                '    <h5>{{ctrl.name}}</h5> <small>{{ctrl.desc}}</small>',
                '  </div>',
                '  <form ng-if="ctrl.displayEditor">',
                '    <input type="text" ng-model="ctrl.name" placeholder="name">',
                '    <input type="text" ng-model="ctrl.desc" placeholder="value">',
                '    <button type="button" class="btn btn-sm btn-success" ng-click="ctrl.save()">',
                '      <span class="glyphicon glyphicon-ok"></span>',
                '    </button>',
                '    <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.cancel()">',
                '      <span class="glyphicon glyphicon-remove"></span>',
                '    </button>',
                '  </form>',
                '  <br><br>',
                '</div>'
            ].join(' '),
            
            controller: Controller
        };
    })




    .directive('items', ['$timeout', '$uibModal', function($timeout, $uibModal) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/items.html',
            
            controller: function($scope, $element) {

                function update() {
                    var weight=0, darkstone=0;
                    angular.forEach($scope.character.items, function(item) {
                        weight += item.weight||0;
                        darkstone += item.darkstone||0;
                    });
                    $scope.itemWeight = weight;
                    $scope.itemDarkstone = darkstone;
                }
                
                $scope.character.$loaded().then(update);



                $scope.onEdited = function(name, item) {

                    //if deleting item or renaming it
                    if(!item || (item.name && item.name !== name)) {
                        delete $scope.character.items[name];

                        if(item && item.name)
                            name = item.name;
                    }

                    if(item)
                        $scope.character.items[name] = item;

                    $scope.onSave();
                    update();
                };

                $scope.add = function() {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/item.html',
                        controller: 'ItemEditor',
                        animation: false,
                        resolve: {
                            item: function() {return null;}
                        }
                    });

                    modalInstance.result.then(function(item) {
                        if(!item || !item.name) return;
                        
                        if(!$scope.character.items)
                            $scope.character.items = {};

                        var obj = {};
                        obj[item.name] = item;
                        angular.merge($scope.character.items, obj);

                        $scope.onSave();
                        update();   //recalc weights
                        
                    }, function () { });

                };

            }
        };
    }])


    .directive('item', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.name = $scope.name;
            this.item = $scope.item;
            
            this.edit = function() {
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/item.html',
                    controller: 'ItemEditor',
                    animation: false,
                    resolve: {
                        item: function() { 
                            var copy = angular.copy($scope.item);
                            copy.name = $scope.name;
                            return copy; 
                        }
                    }
                });

                modalInstance.result.then(function(item) {
                    if(!item || !item.name) return; //cancel
                    
                    angular.forEach(item, function(value, key) {
                        $scope.ctrl.item[key] = value;
                    });
                    console.log($scope.ctrl.item);
                    $scope.ctrl.save();
                                        
                }, function () { });

            };

            this.save = function() {
                $scope.onSave({ item: this.item });
            };

            this.remove = function() {
                $scope.onSave({ item: null });
            };

        }

        return {
            scope: {
                name: "@",
                item: "=",
                onSave: '&'
            },
            replace: true,
            template: [
                '<div class="item grid grid--bleed grid--wrap-reverse">',
                '   <div class="grid__col-sm-3 grid__col-md-4">',
                '       <div class="grid grid--justify-space-between">',
                '           <div class="grid__col">',
                '               <div><span class="sprite sprite-item_weight"></span> <br class="hidden-xs"> {{item.weight}}</div>',
                '           </div>',
                '           <div class="grid__col">',
                '               <div><span class="sprite sprite-item_darkstone"></span> <br class="hidden-xs"> {{item.darkstone}}</div>',
                '           </div>',
                '           <div class="grid__col">',
                '               <div><span class="sprite sprite-item_hands"></span> <br class="hidden-xs"> {{item.hands}}</div>',
                '           </div>',
                '           <div class="grid__col">',
                '               <div><span class="sprite sprite-item_slots"></span> <br class="hidden-xs"> {{item.slots}}</div>',
                '           </div>',
                '           <div class="grid__col"></div>',
                '       </div>',
                '   </div>',
                '   <div class="grid__col-sm-9 grid__col-md-8">',
                '       <div>',
                '           <div class="pull-right">',
                '               <button type="button" class="btn btn-sm btn-danger" ng-click="ctrl.remove()">',
                '                 <span class="glyphicon glyphicon-trash"></span>',
                '               </button>',
                '               <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '                 <span class="glyphicon glyphicon-pencil"></span>',
                '               </button>',
                '           </div>',
                '           <h5>{{name}}</h5>',
                '           <small>{{item.description}}  <em>({{item.source}})</em></small>',
                '       </div>',
                '   </div>',
                '</div>'
            ].join(' '),
            
            controller: Controller
        };
    }])





    .directive('clothing2', ['$timeout', '$uibModal', function($timeout, $uibModal) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            template: [
                '<div class="clothing">',
                '   <h4>Clothing</h4>',
                '   <div ng-repeat="(type,item) in character.clothing"> ',
                '     <clothing-item-2 clothing-item="character.clothing[type]" on-save="onEdited(item, type)"></clothing-item-2>',
                '   </div>',
                '   <hr>',
                '   <button type="button" class="btn btn-success pull-right" ng-click="add()">New Item</button>',
                '   <span class="sprite sprite-item_weight"></span> {{itemWeight}} &nbsp;',
                '   <span class="sprite sprite-item_darkstone"></span> {{itemDarkstone}}',
                '</div>'
            ].join(' '),
            
            controller: function($scope, $element) {

                function update() {
                    
                    var weight=0, darkstone=0;
                    angular.forEach($scope.character.clothing, function(item, type) {
                        
                        if(!item.type)
                            item.type = type;

                        weight += item.weight||0;
                        darkstone += item.darkstone||0;
                    
                    });

                    $scope.itemWeight = weight;
                    $scope.itemDarkstone = darkstone;
                }
                
                $scope.character.$loaded().then(update);



                $scope.onEdited = function(item, type) {

                    //if deleting item or renaming it
                    if(!item)
                        delete $scope.character.clothing[type];

                    if(item)
                        $scope.character.clothing[item.type] = item;

                    $scope.onSave();
                    update();
                };

                $scope.add = function() {
                    
                    var types = ['hat','face','shoulders','coat','torso','belt','gloves','boots'];
                    angular.forEach($scope.character.clothing, function(item, type) {
                        var index = types.indexOf(type);
                        if(index >= 0)
                            types.splice(index, 1);
                    });


                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/clothing.html',
                        controller: 'ClothingEditor',
                        animation: false,
                        resolve: {
                            item: function() {return null;},
                            types: function() {return types;}
                        }
                    });

                    modalInstance.result.then(function(item) {
                        if(!item || !item.name || !item.type) return;

                        $scope.character.clothing = $scope.character.clothing || {};
                        if($scope.character.clothing[item.type]) return;    //already has one
                        
                        var obj = {};
                        obj[item.type] = item;
                        angular.merge($scope.character.clothing, obj);

                        $scope.onSave();
                        update();   //recalc weights
                        
                    }, function () { });

                };

            }
        };
    }])


    .directive('clothingItem2', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.clothing = $scope.clothingItem;
            
            this.edit = function() {
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/clothing.html',
                    controller: 'ItemEditor',
                    animation: false,
                    resolve: {
                        item: function() { 
                            var copy = angular.copy($scope.clothingItem);
                            return copy; 
                        }, 
                        types: function() {return [$scope.clothingItem.type];}
                    }
                });

                modalInstance.result.then(function(item) {
                    if(!item || !item.name) return; //cancel
                    
                    angular.forEach(item, function(value, key) {
                        $scope.ctrl.clothing[key] = value;
                    });
                    // console.log($scope.ctrl.clothing);
                    $scope.ctrl.save();
                                        
                }, function () { });

            };

            this.save = function() {
                console.log("Saving...");
                $scope.onSave({ item: this.clothing, type: this.clothing.type });
            };

            this.remove = function() {
                $scope.onSave({ item: null, type: this.clothing.type });
            };

        }

        return {
            scope: {
                clothingItem: "=",
                onSave: '&'
            },
            replace: true,
            template: [
                '<div class="clothing-item">',
                '   <div class="pull-right">',
                '       <button type="button" class="btn btn-sm btn-danger" ng-click="ctrl.remove()">',
                '           <span class="glyphicon glyphicon-trash"></span>',
                '       </button>',
                '       <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '           <span class="glyphicon glyphicon-pencil"></span>',
                '       </button>',
                '   </div>',
                '   <h5>',
                '       {{clothingItem.name}} ',
                '       <small>{{clothingItem.type}}</small>',
                '   </h5>',
                '   <p><small>{{clothingItem.desc}}</small></p>',
                '   <p>',
                '       <small>',
                '           <em ng-if="clothingItem.source"> ({{clothingItem.source}})</em>',
                '           <span class="sprite sprite-item_weight"></span> {{clothingItem.weight}}',
                '           <span class="sprite sprite-item_darkstone"></span> {{clothingItem.darkstone}}',
                '           <span class="sprite sprite-item_hands"></span> {{clothingItem.hands}}',
                '           <span class="sprite sprite-item_slots"></span> {{clothingItem.slots}}',
                '       </small>',
                '   </p>',
                '</div>'
            ].join(' '),
            
            controller: Controller
        };
    }])



    

    ;


}) (angular);