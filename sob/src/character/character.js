(function(angular) {
    
    "use strict";

    var app = angular.module("sob-character", ['ngSanitize', 'ui.bootstrap', "firebase", 'sob-common']);

    
    app.controller("CharacterController", [
        "$scope", "$routeParams", "$uibModal", "CharacterRef",
        function($scope, $routeParams, $uibModal, CharacterRef) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };

        //load the campaign
        this.charName = decodeURIComponent($routeParams.charId);
        this.character = CharacterRef(this.charName);
        // this.character.$loaded().then(function() {
            
        //     var weight=0, darkstone=0;
        //     angular.forEach(self.character.items, function(item) {
        //         weight += item.weight||0;
        //         darkstone += item.darkstone||0;
        //     });
        //     self.itemWeight = weight;
        //     self.itemDarkstone = darkstone;

        // }).catch(function(error) {
        //     self.displayOpts.loading = false;
        //     self.displayOpts.error = error.data;
        // });



        this.onInputKeyPress = function($event) {
            var key = $event.keyCode || $event.which;
            if(key === 13) {    //enter
                // this.save();
            }
        };


        this.save = function() {
            console.log("Saved");
            // this.character.$save();
        };

        
        
        this.addNewMutation = function() {
            this.character.abilities[this.newMutation.name] = this.newMutation.desc;
            this.save();
            this.newMutation = null;
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
                (self.character.sidebag.fungus||0));
        };

        // this.toggleEditor = function(name) {
        //     this.displayOpts.editors = this.displayOpts.editors || {};
        //     var open = this.displayOpts.editors[name] = !this.displayOpts.editors[name];
        //     if(!open)
        //         this.save();
        // };


    }])




    .directive('clothing', function() {

        return {
            scope: {
                character: "=",
                type: "@",
                onSave: '&'
            },
            replace: true,
            template: [
                '<div>',
                '    <label>{{type}}</label>',
                '    <div class="grid">',
                '        <div class="grid__col-xs-3">',
                '            {{current.name}}',
                '            <input type="text" class="form-control" placeholder="Name"',
                '                ng-model="value.name" ng-if="!current.name">',
                '        </div>',
                '        <div class="grid__col-xs-9">',
                '            <div>',
                '                {{current.desc}}',
                '                <button type="button" class="btn btn-danger pull-right" ',
                '                    ng-if="current.name" ng-click="remove()">&times;</button>',

                '                <div class="input-group" ng-if="!current.name">',
                '                    <input type="text" class="form-control" placeholder="Description"',
                '                        ng-model="value.desc">',
                '                    <span class="input-group-btn">',
                '                        <button type="button" class="btn btn-success" ',
                '                            ng-click="add()">+</button>',
                '                    </span>',
                '                </div>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join(' '),

            controller: function($scope, $element) {

                function init() {
                    $scope.value = {name: null, desc: null};
                }
                init();

                function update() {
                    $scope.current = $scope.character.clothing && $scope.character.clothing[$scope.type];
                }
                update();

                $scope.add = function() {
                    if(!$scope.value.name) return;

                    $scope.character.clothing = $scope.character.clothing || {}
                    $scope.character.clothing[$scope.type] = $scope.value;
                    $scope.onSave();
                    update();
                    init();
                };

                $scope.remove = function() {
                    $scope.character.clothing[$scope.type] = null;
                    $scope.onSave();
                    update();
                };

            }
        };
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
                '      <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.remove()">',
                '        <span class="glyphicon glyphicon-trash"></span>',
                '      </button>',
                '      <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '        <span class="glyphicon glyphicon-pencil"></span>',
                '      </button>',
                '    </div>',
                '    <strong>{{ctrl.name}}</strong> <small>{{ctrl.desc}}</small>',
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
                '      <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.remove()">',
                '        <span class="glyphicon glyphicon-trash"></span>',
                '      </button>',
                '      <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '        <span class="glyphicon glyphicon-pencil"></span>',
                '      </button>',
                '    </div>',
                '    <strong>{{ctrl.name}}</strong> <small>{{ctrl.desc}}</small>',
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




    .directive('items', ['$uibModal', function($uibModal) {

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
                update();



                $scope.onEdited = function(name, item) {

                    if(!item)
                        delete $scope.character.items[name];
                    else
                        $scope.character.items[name] = item;

                    $scope.onSave();
                    update();
                };

                $scope.add = function() {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/item.html',
                        controller: 'ItemEditor',
                        animation: false
                    });

                    modalInstance.result.then(function(item) {
                        if(!item || !item.name) return;
                        
                        if(!$scope.character.items)
                            $scope.character.items = {};

                        var obj = {};
                        obj[name] = item;
                        angular.merge($scope.character.items, obj);

                        $scope.onSave();
                        update();   //recalc weights
                        
                    }, function () { });

                };

            }
        };
    }])


    .directive('item', function() {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.name = $scope.name;
            this.item = $scope.item;
            
            this.edit = function() {
                this.displayEditor = true;
            };

            this.save = function() {
                $scope.onSave({ item: this.item });
                this.displayEditor = false;
            };

            this.cancel = function() {
                this.displayEditor = false;
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
                '               <div><img src="assets/item_weight.png"> <br class="hidden-xs"> {{item.weight}}</div>',
                '           </div>',
                '           <div class="grid__col">',
                '               <div><img src="assets/item_darkstone.png"> <br class="hidden-xs"> {{item.darkstone}}</div>',
                '           </div>',
                '           <div class="grid__col">',
                '               <div><img src="assets/item_hands.png"> <br class="hidden-xs"> {{item.hands}}</div>',
                '           </div>',
                '           <div class="grid__col">',
                '               <div><img src="assets/item_slots.png"> <br class="hidden-xs"> {{item.slots}}</div>',
                '           </div>',
                '           <div class="grid__col"></div>',
                '       </div>',
                '   </div>',
                '   <div class="grid__col-sm-9 grid__col-md-8">',
                '       <div>',
                '           <strong>{{name}}</strong><br>',
                '           {{item.description}}<br>',
                '           <em>{{item.source}}</em>',
                '           <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.remove()">',
                '             <span class="glyphicon glyphicon-trash"></span>',
                '           </button>',
                '           <button type="button" class="btn btn-sm btn-default" ng-click="ctrl.edit()">',
                '             <span class="glyphicon glyphicon-pencil"></span>',
                '           </button>',
                '       </div>',
                '   </div>',
                '</div>'
            ].join(' '),
            
            controller: Controller
        };
    })


    ;


}) (angular);