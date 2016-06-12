(function(angular) {
    "use strict";

    angular.module('sob-common', [])

    .constant('DataStoreUrl', "https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone")

    .factory("DataStore", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(property, value) {
                var ref = new Firebase(DataStoreUrl + "/chars");
                if(property && value)
                    ref.orderByChild(property).equalTo(value);
                return $firebaseObject(ref);
            }
        }
    ])

    .factory("CharacterRef", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(name) {
                var ref = new Firebase(DataStoreUrl + "/chars/" + name);
                return $firebaseObject(ref);
            }
        }
    ])

    .factory("Auth", ["$firebaseAuth", 'DataStoreUrl',
        function($firebaseAuth, DataStoreUrl) {
            var ref = new Firebase(DataStoreUrl);
            return $firebaseAuth(ref);
        }
    ])






    .filter('encode', function() {
        return function(value) {
            return encodeURIComponent(value);
        };
    })

    .filter('decode', function() {
        return function(value) {
            return decodeURIComponent(value);
        };
    })

    .provider('responsiveHelper', ["$windowProvider", function ($windowProvider) {
        
        var $window  = $windowProvider.$get();

        function Helper($window) {
            this.window = $window;
        }
        Helper.prototype = {
            getWidth: function() { return $window.innerWidth || $window.outerWidth; },
            isXS: function () { var width = this.getWidth(); return width < 768; },
            isSM: function () { var width = this.getWidth(); return width >= 768 && width < 992; },
            isMD: function () { var width = this.getWidth(); return width >= 992 && width < 1200; },
            isLG: function () { var width = this.getWidth(); return width >= 1200; }
        };

        var helper = new Helper($window);

        this.$get = function() {
            return helper;
        };
    }])

    //directive which appends appropriate responsive breakpoint classNames to the element
    // on which it's set
    .directive('responsive', ['$window', 'responsiveHelper', function($window, responsiveHelper) {

        return {
            restrict: "A",
            link: function($scope, $element, $attrs) {

                function update(el, helper) {
                    if(helper.isXS())
                        el.addClass('responsive-xs');
                    else
                        el.removeClass('responsive-xs');

                    if(helper.isSM())
                        el.addClass('responsive-sm');
                    else 
                        el.removeClass('responsive-sm');

                    if(helper.isMD())
                        el.addClass('responsive-md');
                    else 
                        el.removeClass('responsive-md');

                    if(helper.isLG())
                        el.addClass('responsive-lg');
                    else 
                        el.removeClass('responsive-lg');
                }

                update($element, responsiveHelper);

                var resizeFn = function() {
                    update($element, responsiveHelper);
                };

                var w = angular.element($window);
                var listener = w.on('resize', resizeFn);

                $scope.$on('$destroy', function() {
                    w.off('resize', resizeFn);
                });

            }
        };

    }])


    .controller('ItemEditor', function($scope, $uibModalInstance, item) {

        $scope.item = item;

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })

    .controller('ClothingEditor', function($scope, $uibModalInstance, item, types) {

        $scope.item = item;
        $scope.types = types;
        $scope.newItem = !item;

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })


    .controller('KeyPad', function ($scope, $uibModalInstance, value, minimum, maximum) {

        $scope.value = value;
        $scope.minimum = minimum || 0;
        $scope.maximum = maximum || 9999;
        
        $scope.change = function(v) { 
            if(v>0)
                $scope.value = Math.min($scope.value + v, maximum); 
            else
                $scope.value = Math.max($scope.value + v, minimum); 
        }
        
        $scope.ok = function () {
            $uibModalInstance.close($scope.value);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })


    .directive('editableStatValue', ['$uibModal', function($uibModal) {
        return {
            scope: {
                onSave: '&',
                minimum: '@',
                maximum: '@'
            },
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            template: '<div class="value" ng-click="openKeypad()">{{display}}</div>',
            link: function($scope, $element, $attrs, ngModelController) {

                $scope.minimum = ($scope.minimum || 0)*1;
                $scope.maximum = ($scope.maximum || 9999)*1;

                ngModelController.$render = function() {
                    $scope.display = ngModelController.$viewValue;
                };

                $scope.openKeypad = function() {

                    var value = ngModelController.$modelValue || 0;

                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/keypad.html',
                        controller: 'KeyPad',
                        animation: false,
                        resolve: {
                            value: function() { return value; },
                            minimum: function() { return $scope.minimum; },
                            maximum: function() { return $scope.maximum; }
                        }
                    });

                    modalInstance.result.then(function(value) {
                        
                        ngModelController.$setViewValue(value);
                        ngModelController.$render();
                        if($scope.onSave)
                            $scope.onSave();

                    }, function () { });

                };
            }
        };
    }])



    .directive('editableInput', ['$timeout', function($timeout) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                label: "@",
                onSave: "&"
            },
            replace: true,
            template: [
                '<div class="editable-input">',
                '  <label class="editable-input-label">{{::label}}</label>',
                '  <span class="editable-input-display" ng-show="!editing" ng-click="edit()"></span>',

                '    <form class="form" ng-show="editing">',
                '      <div class="form-group">',
                '        <div class="grid">', 
                '          <div class="grid__col-auto grid__col--grow-2">',   
                '            <input type="text" class="form-control editable-input-field" ',
                '              ng-keyup="onKeyUp($event, $event.keyCode)"></input>',
                '          </div>',
                '          <div class="grid__col-auto">',
                '            <div class="editable-input-buttons">',
                '              <button type="button" class="btn btn-xs btn-link text-success" ng-disabled="error" ng-click="done()" tabindex="0">',
                '                <span class="glyphicon glyphicon-ok"></span>',
                '              </button>',
                '              <button type="button" class="btn btn-xs btn-link text-danger" ng-click="cancel()"  tabindex="0">',
                '                <span class="glyphicon glyphicon-remove"></span>',
                '              </button>',
                '            </div>',
                '          </div>',
                '        </div>',
                '      </div>',
                '    </form>',
                '</div>'
            ].join(' '),

            link: function($scope, $element, $attrs, ngModelController) {

                function update(newValue) {
                    // call $parsers pipeline then update $modelValue
                    ngModelController.$setViewValue(newValue);
                    // update the local view
                    ngModelController.$render();
                }

                // when model change, update our view (just update the div content)
                ngModelController.$render = function() {

                    var value = ngModelController.$viewValue;
                    var display = (!value || !value.length || !value.trim().length) ? "Please enter a value" : value;
                    $element.find('.editable-input-display').text(display);
                    $element.find('.editable-input-field').val(value);
                };


                /* ------------- private methods --------------- */

                $scope.edit = function() {
                    $scope.editing=true;
                    $timeout(function() {
                        $element.find('.editable-input-field').focus().select();
                    }, 200);
                };
                $scope.done = function() {
                    //update display with new value
                    var value = $element.find('.editable-input-field').val();
                    update(value);
                    $scope.editing=false;
                    $scope.onSave();
                };
                $scope.cancel = function() {
                    //reset input
                    $element.find('.editable-input-field').val(ngModelController.$viewValue);
                    $scope.editing=false;
                };
                
                $scope.onKeyUp = function($event, code) {
                    // console.log("Up " + code);
                    if((code === undefined || code === 0) && $event.which !== undefined)
                        code = $event.which;
                    if(code === 13 && !$scope.error) $scope.done();  //enter
                    else if(code === 27)             $scope.cancel();//esc
                    
                };

            }
        };

    }])



    .directive('imgSelector', function() {

        function base64(file, callback){
            var coolFile = {};
            function readerOnload(e){
                var base64 = btoa(e.target.result);
                coolFile.base64 = base64;
                callback(coolFile)
            };

            var reader = new FileReader();
            reader.onload = readerOnload;

            var file = file[0].files[0];
            if(file.size > 100000) {
                alert("Image is too large, should be less than 100 KB");
                callback(null);
                return;
            }

            coolFile.filetype = file.type;
            coolFile.size = file.size;
            coolFile.filename = file.name;
            reader.readAsBinaryString(file);
        }

        return {
            scope: {
                onSave: '&'
            },
            require: 'ngModel',
            template: [
                '<form class="img-selector">',
                '  <div class="image" title="click to change">',
                '    <img src="assets/avatar.png">',
                '  </div>',
                '  <button type="button" class="btn btn-sm btn-success" ',
                '    ng-if="imgData && isDirty()" ng-click="save()">save</button>',
                '  <input type="file" class="hidden">',
                '</form>'
            ].join(' '),

            link: function($scope, $element, $attrs, ngModelController) {

                $scope.isDirty = function() {
                    return ngModelController.$dirty;
                }

                function update() {
                    if(!$scope.imgData) {return;}
                    var image = '<img alt="avatar" src="' + $scope.imgData + '">';
                    $element.find('.image').html(image);
                    
                }

                $scope.save = function() {
                    ngModelController.$setViewValue($scope.imgData);
                    ngModelController.$setPristine();
                    $scope.onSave();
                }
                
                function onFileSelect() {

                    console.log("selecting file");
                    base64( $element.find('input'), function(data){

                        if(!data) {
                            $element.find('form')[0].reset();
                            return;
                        }

                        $scope.$apply(function() {
                            $scope.imgData = 'data:' + data.filetype + ';base64,' + data.base64;
                            update();
                            ngModelController.$setDirty();
                        });
                    });

                }

                var filePicker = $element.find('input');
                $element.find('.image').on('click', function() {
                    filePicker.trigger('click');
                });
                filePicker.on('change', onFileSelect);

                ngModelController.$render = function() {
                    if(!$scope.imgData) {
                        $scope.imgData = ngModelController.$viewValue;
                        update();
                    }
                };
            }
        };

    })







    .controller('LoginController', function($scope, $uibModalInstance, Auth) {

        $scope.login = function() {
            Auth.$authWithPassword({email: $scope.email, password: $scope.password})
            .then(function(authData) {
                console.log("Logged in");
                $uibModalInstance.close();
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("unable to login: " + errorMessage);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    // // any time auth status updates, add the user data to scope
    

    })


    .directive('login', ["$uibModal", "Auth", function($uibModal, Auth) {

        return {
        
            template: [
                '<a ng-if="!user" ng-click="doLogin()">Login</a>',
                '<a ng-if="user" class="dropdown-toggle" data-toggle="dropdown" ',
                '  role="button" aria-haspopup="true" aria-expanded="false">',
                '  {{user.password.email}} <span class="caret"></span>',
                '</a>',
                '<ul ng-if="user" class="dropdown-menu">',
                '  <li><a ng-click="doReset()">Reset Password</a></li>',
                '  <li><a ng-click="doLogout()">Log out</a></li>',
                '</ul>',
                '</div>'
            ].join(' '),

            controller: function($scope) {


                Auth.$onAuth(function(authData) {
                    $scope.user = authData;
                });

                $scope.doLogout = function() {
                    Auth.$unauth();
                    $scope.user = null;
                };

                $scope.doLogin = function() {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/login.html',
                        controller: 'LoginController',
                        resolve: {
                            Auth: function() { return Auth; }
                        }
                    });

                    modalInstance.result.then(function() {}, function () {});

                };

                $scope.doReset = function() {

                    Auth.$resetPassword({ email : $scope.user.password.email }, function(error) {
                        if (error === null) {
                            alert("Password reset email sent");
                        } else {
                            alert("Error sending password reset email:", error);
                        }
                    });
                }

            }
        };


    }])


    ;

}) (angular);
;
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
;
(function(angular) {
    
    "use strict";

    var app = angular.module("sob-home", ["firebase", "sob-common"]);

    
    
    app.controller("HomeController", [
        "$scope", "$timeout", "DataStore", "Auth",
        function($scope, $timeout, DataStore, Auth) {
        
        var self = this;
        
        this.displayOpts = {
            loading: true,
            message: null,
            error: null
        };


        Auth.$onAuth(function(authData) {
            $scope.user = authData;

            self.data = DataStore('userId', authData ? authData.uid : null);
            self.data.$loaded().then(function() {
                updateList();
                self.displayOpts.loading = false;
            }).catch(function(error) {
                self.displayOpts.error = "Failed to load saved data: " + error.data;
            });
          

        });

        

        function updateList() {
            var chars = [];
            angular.forEach(self.data, function(value, key) { 
                if($scope.user && value.userId && value.userId === $scope.user.uid)
                    chars.push(key); 
            });
            self.chars = chars;
        }

        this.createCharacter = function() {
            var name = prompt("Name the character", "Joe Bob");
            if(!name) {
                alert("Characters must have a name");
                return;
            } else if(self.data[name]) {
                alert("Name is already in use");
                return;
            }
            
            var json = getCharacterShell();
            
            //associate user id for restricting who can edit
            json.userId = $scope.user.uid;  

            self.data[name] = json;
            self.data.$save().then(function() {
                //navigate to the new char page
                window.location = '#/' + encodeURIComponent(name);

            }).catch(function(error) {
                alert("Unable to create character because of an error");
            });

        };

    }]);


    function getCharacterShell() {
        return {
            "abilities" : {},
            "class" : " ",
            "clothing" : {
                "Hat" : {},
                "Face" : {},
                "Shoulders" : {},
                "Coat" : {},
                "Torso": {},
                "Gloves": {},
                "Belt": {},
                "Pants": {},
                "Boots": {}
            },
            "combat" : 1,
            "corruption" : {
              "current" : 0,
              "max" : 5
            },
            "darkstone" : 0,
            "defense" : 5,
            "faith" : 0,
            "grit" : {
              "current" : 1,
              "max" : 2
            },
            "health" : {
              "max" : 10,
              "wounds" : 0
            },
            "init" : 2,
            "items" : { },
            "keywords" : " ",
            "level" : 1,
            "melee" : 5,
            "movement" : 0,
            "ranged" : 5,
            "sanity" : {
              "loss" : 0,
              "max" : 10
            },
            "sidebag" : {
              "capacity" : 5,
              "whiskey" : 0,
              "fungus": 0,
              "tonic": 0,
              "bandages": 0,
              "herbs": 0,
              "dynamite": 0,
              "flash": 0
            },
            "stats" : {
              "Agility" : 1,
              "Cunning" : 1,
              "Lore" : 1,
              "Luck" : 1,
              "Spirit" : 1,
              "Strength" : 1
            },
            "wealth" : 0,
            "willpower" : 5,
            "xp" : 0
        };
    }


}) (angular);
;
(function(angular) {

    "use strict";

    angular.module("app", ['ngRoute', 'sob-home', 'sob-character'])

    .config(function myAppConfig ($routeProvider, $locationProvider) {
        
        //default route if invalid one is supplied
        $routeProvider
        
        .when('/:charId', {
            templateUrl: 'src/character/character.html',
            controller: 'CharacterController as ctrl'
        })
        
        .when('/', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeController as ctrl'
        })

        // .when('/login', {
        //     templateUrl: 'src/login.html',
        //     controller: 'LoginController as ctrl'
        // })

        .otherwise({ redirectTo: "/" });
      
        //http://stackoverflow.com/questions/17895675/angularjs-html5mode-refresh-page-get-404
        // $locationProvider.html5Mode(true);

        if(!(window.history && history.pushState))
            console.log("Your browser does not support HTML5 mode");
    })


    // .service('Auth', function() {

    //     var _currentUser = null;
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         _currentUser = user;
    //     });

    //     return {
    //         getUser: function() {return _currentUser;}
    //     };
    // })

    // .run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

    //     $rootScope.$on('$routeChangeStart', function (event) {

    //         if (!Auth.getUser()) {
    //             console.log('Not logged in');
    //             event.preventDefault();
    //             $location.path('/login');
    //         }
            
    //     });

    // }])

    ;

    
})(angular);

;
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('character/abilities.html',
    "<div class=\"abilities\">\n" +
    "    <h4>Abilities</h4>\n" +
    "    <div ng-repeat=\"(name, desc) in character.abilities\" \n" +
    "        ability name=\"{{name}}\" desc=\"{{desc}}\" on-save=\"onEdited(name, newName, newDesc)\"></div>\n" +
    "\n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"grid grid--bleed\">\n" +
    "        <div class=\"grid__col-md-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"value.name\">\n" +
    "        </div>\n" +
    "        <div class=\"grid__col-md-7\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" ng-model=\"value.desc\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button type=\"button\" class=\"btn btn-success\" ng-disabled=\"!value.name\" \n" +
    "                        ng-click=\"add()\">+</button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/body.html',
    "<div class=\"body\">\n" +
    "    \n" +
    "    <div class=\"grid\">\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "            \n" +
    "            <div>\n" +
    "                \n" +
    "                <div class=\"level\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Level</label>\n" +
    "                        <div class=\"value\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.level\" minimum=\"1\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"xp\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <!-- <label>XP</label> -->\n" +
    "                        <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                        <!-- <img src=\"assets/xp.png\"> -->\n" +
    "                        <span class=\"sprite sprite-xp\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"wealth\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                        <!-- <img src=\"assets/wealth.png\"> -->\n" +
    "                        <span class=\"sprite sprite-wealth\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"darkstone\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                        <img src=\"assets/darkstone.png\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <ng-include src=\"'src/character/health.html'\"></ng-include>\n" +
    "\n" +
    "            <ng-include src=\"'src/character/sanity.html'\"></ng-include>\n" +
    "            \n" +
    "            <ng-include src=\"'src/character/faith-and-corruption.html'\"></ng-include>\n" +
    "            \n" +
    "            <ng-include src=\"'src/character/move-and-grit.html'\"></ng-include>\n" +
    "\n" +
    "            <ng-include src=\"'src/character/sidebag.html'\"></ng-include>    \n" +
    "                    \n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <div abilities character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "            \n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/char-bs.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-5 col-md-6 col-lg-8\">\n" +
    "\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "\n" +
    "                    <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                    <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                    <div>\n" +
    "                        <div><label>To Hit:</label></div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-7 col-md-6 col-lg-4\">\n" +
    "\n" +
    "                    <div class=\"stats\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Agility</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Cunning</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Strength</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Lore</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Initiative</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"body\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "                    <div class=\"items\">\n" +
    "                        <h4>Items</h4>\n" +
    "\n" +
    "                        <div ng-repeat=\"(name, item) in ctrl.character.items\" class=\"item row row--no-gutter\">\n" +
    "                            <div class=\"col-sm-9 col-sm-push-3 col-md-8 col-md-push-4\">\n" +
    "                                <strong>{{name}}: </strong> {{item.description}} [<em>{{item.source}}</em>]\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3 col-sm-pull-9 col-md-4 col-md-pull-8\">\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_weight.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.weight}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_darkstone.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.darkstone}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_hands.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.hands}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_slots.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.slots}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"ctrl.addNewItem()\">New</button>\n" +
    "                                        \n" +
    "                        <img src=\"assets/item_weight.png\" width=\"32\"> {{ctrl.itemWeight}}\n" +
    "                        <img src=\"assets/item_darkstone.png\" width=\"32\"> {{ctrl.itemDarkstone}}\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "                    <div class=\"abilities\">\n" +
    "                        <h4>Abilities</h4>\n" +
    "                        <div ng-repeat=\"(name, desc) in ctrl.character.abilities\">\n" +
    "                            <strong>{{name}}</strong> <small>{{desc}}</small>\n" +
    "                            <br><br>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "                                    ng-model=\"ctrl.newAbility.name\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" \n" +
    "                                    ng-model=\"ctrl.newAbility.desc\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-2\">\n" +
    "                                <button type=\"button\" class=\"btn btn-success\" \n" +
    "                                    ng-disabled=\"!ctrl.newAbility.name\" \n" +
    "                                    ng-click=\"ctrl.addNewAbility()\">+</button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"footer\">\n" +
    "\n" +
    "        <div class=\"container-fluid\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"level\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Level</label>\n" +
    "                                <div class=\"value\">{{ctrl.character.level}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>XP</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                            <img src=\"assets/xp.png\">\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>Gold</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                            <img src=\"assets/wealth.png\">\n" +
    "                        </div>\n" +
    "                        <div class=\"darkstone\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Dark Stone</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                                <img src=\"assets/darkstone.png\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <br>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"row row--no-gutter\">\n" +
    "\n" +
    "                            <div class=\"col-sm-8 col-sm-push-4\">\n" +
    "                                <div class=\"clearfix\">\n" +
    "                                    <div class=\"health\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Health</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.health.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <img src=\"assets/wealth.png\">\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "                                            <img src=\"assets/wound.png\">    \n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Defense</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"sanity\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Sanity</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <!-- <label>Loss</label> -->\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "                                            <img src=\"assets/sanity.png\">\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Willpower</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    \n" +
    "                                    <div class=\"clearfix\">\n" +
    "                                        <div class=\"faith\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Faith</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.faith\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"corruption\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Corruption</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <!-- <label>Current</label> -->\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                    ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "                                                <img src=\"assets/corruption.png\">\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div>\n" +
    "                                        <div class=\"movement\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Move</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.movement\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"grit\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Grit</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Current</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.current\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                \n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-sm-pull-8\">\n" +
    "                                <div class=\"sidebag\">\n" +
    "                                    <h4>Side Bag</h4>\n" +
    "\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Bandages</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.bandages\"></div>\n" +
    "                                        <img src=\"assets/bandages.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Whiskey</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.whiskey\"></div>\n" +
    "                                        <img src=\"assets/whiskey.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Tonic</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.tonic\"></div>\n" +
    "                                        <img src=\"assets/tonic.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Herbs</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.herbs\"></div>\n" +
    "                                        <img src=\"assets/herb.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Dynamite</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.dynamite\"></div>\n" +
    "                                        <img src=\"assets/dynamite.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Flash</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.flash\"></div>\n" +
    "                                        <img src=\"assets/flash.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Swamp Fungus</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.fungus\"></div>\n" +
    "                                        <img src=\"assets/fungus.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Capacity</label>\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sidebag.capacity\"></div>\n" +
    "                                    </div>    \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "\n" +
    "                    <div class=\"clothing\">\n" +
    "                        <h4>Clothing</h4>\n" +
    "                        <div ng-repeat=\"(slotName,slot) in ctrl.character.clothing\" class=\"media\">\n" +
    "                            <div class=\"media-left\">\n" +
    "                                <strong>{{slotName}}: </strong>\n" +
    "                            </div>\n" +
    "                            <div class=\"media-body\">\n" +
    "                                <div ng-repeat=\"(name,desc) in slot\">\n" +
    "                                    {{name}} <small>{{desc}}</small>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"mutations\">\n" +
    "                        <h4>Mutations</h4>\n" +
    "\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <input type=\"text\" class=\"form-control\">\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                                <button type=\"button\" class=\"btn btn-success\">+</button>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/character.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <ng-include src=\"'src/character/header.html'\"></ng-include>\n" +
    "\n" +
    "    <ng-include src=\"'src/character/body.html'\"></ng-include>\n" +
    "\n" +
    "    <ng-include src=\"'src/character/footer.html'\"></ng-include>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/clothing-item.html',
    "<div class=\"clothing__item\">\n" +
    "\n" +
    "    <div class=\"pull-right\">\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"!$ctrl.item.name\" \n" +
    "            ng-click=\"$ctrl.isEditing=!$ctrl.isEditing\">\n" +
    "            <span ng-if=\"!$ctrl.isEditing\" class=\"glyphicon glyphicon-plus\"></span>\n" +
    "            <span ng-if=\"$ctrl.isEditing\" class=\"glyphicon glyphicon-remove\"></span>\n" +
    "        </button>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"$ctrl.item.name\" \n" +
    "            ng-click=\"$ctrl.isEditing=!$ctrl.isEditing\">\n" +
    "            <span ng-if=\"!$ctrl.isEditing\" class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "            <span ng-if=\"$ctrl.isEditing\" class=\"glyphicon glyphicon-remove\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-danger\" ng-if=\"$ctrl.item.name\" ng-click=\"$ctrl.remove()\">\n" +
    "            <span class=\"glyphicon glyphicon-trash\" ng-if=\"!$ctrl.isRemoving\"></span>\n" +
    "            <span class=\"glyphicon glyphicon-ok\" ng-if=\"$ctrl.isRemoving\"></span>\n" +
    "        </button>\n" +
    "        \n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.item.name\">\n" +
    "        <h5>\n" +
    "            <span ng-if=\"!$ctrl.isEditing\">{{$ctrl.item.name}}</span>\n" +
    "            <small>{{$ctrl.type}}</small>\n" +
    "        </h5>  \n" +
    "        <small ng-if=\"!$ctrl.isEditing\">{{$ctrl.item.desc}}</small>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!$ctrl.item.name\">\n" +
    "        <h5>\n" +
    "            <em ng-if=\"!$ctrl.isEditing\">Empty</em>\n" +
    "            <small>{{$ctrl.type}}</small>\n" +
    "        </h5>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.isEditing\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"$ctrl.item.name\">\n" +
    "        <div class=\"input-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Description\"\n" +
    "                ng-model=\"$ctrl.item.desc\">\n" +
    "            <span class=\"input-group-btn\">\n" +
    "                <button type=\"button\" class=\"btn btn-success\" \n" +
    "                    ng-click=\"$ctrl.add()\"><span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "                </button>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/clothing.html',
    "<div class=\"clothing\">\n" +
    "    <h4>Clothing</h4>\n" +
    "\n" +
    "    <clothing type=\"hat\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"face\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"shoulders\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"coat\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"torso\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"belt\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"gloves\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    <clothing type=\"boots\" character=\"ctrl.character\" on-save=\"ctrl.save()\"></clothing>\n" +
    "    \n" +
    "</div>"
  );


  $templateCache.put('character/faith-and-corruption.html',
    "\n" +
    "<div class=\"clearfix\">\n" +
    "    \n" +
    "    <div class=\"faith\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Max Faith</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.faith\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"corruption\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Max Corruption</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"stat\">\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "            <!-- <img src=\"assets/corruption.png\"> -->\n" +
    "            <span class=\"sprite sprite-corruption\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>\n"
  );


  $templateCache.put('character/footer.html',
    "<div class=\"footer\">\n" +
    "\n" +
    "    <div class=\"grid\">\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <div items character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <!-- <ng-include src=\"'src/character/clothing.html'\"></ng-include> -->\n" +
    "            <div clothing-2 character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "            <div mutations character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-xs-12\">\n" +
    "            <div class=\"notes\">\n" +
    "                <h4>Notes</h4>\n" +
    "                <textarea name=\"notes\" rows=\"10\" placeholder=\"Enter any notes about this character\" class=\"form-control\"\n" +
    "                    ng-model=\"ctrl.character.notes\"></textarea>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.save()\">Save</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "</div>"
  );


  $templateCache.put('character/header.html',
    "<header>\n" +
    "        \n" +
    "    <div class=\"grid grid--bleed\">\n" +
    "        \n" +
    "        <div class=\"grid__col-sm-5 grid__col-md-6 grid__col-lg-6\">\n" +
    "\n" +
    "            <div class=\"grid\">\n" +
    "\n" +
    "                <!-- avatar -->\n" +
    "                <div class=\"grid__col-xs-5 grid__col-sm-4 grid__col-md-3 grid__col-lg-3 grid--align-self-end\">\n" +
    "                    <div img-selector ng-model=\"ctrl.character.avatar\" on-save=\"ctrl.save()\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- name, class, and keywords -->\n" +
    "                <div class=\"grid__col-xs-7 grid__col-sm-8 grid__col-md-9 grid__col-lg-9\">\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "                    <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div>\n" +
    "                    <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "                    <br>\n" +
    "                    <div>\n" +
    "                        <span class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </span>\n" +
    "\n" +
    "                        <span class=\"stat stat--with-plus\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </span>\n" +
    "                        <span class=\"stat stat--with-plus\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-7 grid__col-md-6 grid__col-lg-4\">\n" +
    "\n" +
    "            <ng-include src=\"'src/character/stats.html'\"></ng-include>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>"
  );


  $templateCache.put('character/health.html',
    "<div class=\"health\">\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Max Health</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.health.max\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat\">\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "        <!-- <img src=\"assets/wound.png\">    --> \n" +
    "        <span class=\"sprite sprite-wound\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Defense</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Armor</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.armor\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/items.html',
    "<div class=\"items\">\n" +
    "    <h4>Items</h4>\n" +
    "\n" +
    "    <div ng-repeat=\"(name, item) in character.items\" item=\"item\" name=\"{{name}}\" on-save=\"onEdited(name, item)\"></div>\n" +
    "\n" +
    "    <hr>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"add()\">New Item</button>\n" +
    "                    \n" +
    "    <span class=\"sprite sprite-item_weight\"></span> {{itemWeight}} &nbsp;\n" +
    "    <span class=\"sprite sprite-item_darkstone\"></span> {{itemDarkstone}}\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/move-and-grit.html',
    "\n" +
    "<div>\n" +
    "    <div class=\"movement\">\n" +
    "        <div class=\"stat stat--prepend-plus\">\n" +
    "            <label>Move</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.movement\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"grit\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Max Grit</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Current</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.current\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/mutations-and-injuries.html',
    "<div class=\"mutations\">\n" +
    "    <h4>Mutations &amp; Injuries</h4>\n" +
    "    <div ng-repeat=\"(name, desc) in character.mutations\" \n" +
    "        mutation name=\"{{name}}\" desc=\"{{desc}}\" on-save=\"onEdited(name, newName, newDesc)\"></div>\n" +
    "\n" +
    "\n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"grid grid--bleed\">\n" +
    "        <div class=\"grid__col-md-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "                ng-model=\"value.name\">\n" +
    "        </div>\n" +
    "        <div class=\"grid__col-md-7\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" \n" +
    "                    ng-model=\"value.desc\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button type=\"button\" class=\"btn btn-success\" \n" +
    "                        ng-disabled=\"!value.name\" \n" +
    "                        ng-click=\"add()\">+</button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/sanity.html',
    "\n" +
    "<div class=\"sanity\">\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Max Sanity</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Loss</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "        <!-- <img src=\"assets/sanity.png\"> -->\n" +
    "        <span class=\"sprite sprite-sanity\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Willpower</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Sp Armor</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.spiritArmor\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('character/sidebag.html',
    "<div class=\"sidebag\">\n" +
    "    <h4>Side Bag</h4>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Bandages</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.bandages\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/bandages.png\"> -->\n" +
    "        <span class=\"sprite sprite-bandages\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Whiskey</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.whiskey\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/whiskey.png\"> -->\n" +
    "        <span class=\"sprite sprite-whiskey\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Tonic</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.tonic\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/tonic.png\"> -->\n" +
    "        <span class=\"sprite sprite-tonic\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Herbs</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.herbs\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/herb.png\"> -->\n" +
    "        <span class=\"sprite sprite-herb\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Dynamite</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.dynamite\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/dynamite.png\"> -->\n" +
    "        <span class=\"sprite sprite-dynamite\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Flash</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.flash\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/flash.png\"> -->\n" +
    "        <span class=\"sprite sprite-flash\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Swamp Fungus</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.fungus\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/fungus.png\"> -->\n" +
    "        <span class=\"sprite sprite-fungus\"></span>\n" +
    "    </div>    \n" +
    "\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Spice</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.spices\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/spice.png\"> -->\n" +
    "        <span class=\"sprite sprite-spice\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Potion</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.potions\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/potion.png\"> -->\n" +
    "        <span class=\"sprite sprite-potion\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Hatchet</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.hatchets\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/hatchet.png\"> -->\n" +
    "        <span class=\"sprite sprite-hatchet\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Lantern Oil</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.lanternOil\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/oil.png\"> -->\n" +
    "        <span class=\"sprite sprite-oil\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Exotic Herbs</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.exoticHerbs\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/exoticHerbs.png\"> -->\n" +
    "        <span class=\"sprite sprite-exoticHerbs\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Tequila</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.tequila\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/tequila.png\"> -->\n" +
    "        <span class=\"sprite sprite-tequila\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Fine Cigar</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.cigars\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/cigar.png\"> -->\n" +
    "        <span class=\"sprite sprite-cigar\"></span>\n" +
    "    </div> \n" +
    "\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Capacity</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.capacity\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "    </div>    \n" +
    "</div>"
  );


  $templateCache.put('character/stats.html',
    "<div class=\"stats\">\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Agility</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Cunning</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Spirit</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "    <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Strength</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Lore</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Luck</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Luck\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Initiative</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('clothing.html',
    "<div class=\"modal-content\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"What is the clothing's name?\">\n" +
    "        </div><br>\n" +
    "        \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Desc</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Describe the clothing\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Source</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Cost</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Slot</span>\n" +
    "            <input disabled type=\"text\" class=\"form-control\" ng-if=\"!newItem\" value=\"{{item.type}}\">\n" +
    "            <select type=\"text\" class=\"form-control\" ng-if=\"newItem\" \n" +
    "                ng-model=\"item.type\" required ng-options=\"type for type in types\">\n" +
    "                <option value=\"\">Select Slot</option>\n" +
    "            </select>\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "            \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>        \n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name||!item.type\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('home/home.html',
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"alert alert-danger\" ng-if=\"ctrl.displayOpts.error\">{{ctrl.displayOpts.error}}</div>\n" +
    "    \n" +
    "    <div ng-if=\"ctrl.displayOpts.loading\">Fetching data...</div>\n" +
    "    \n" +
    "    <div class=\"list-group\">\n" +
    "        <div class=\"list-group-item disabled\">\n" +
    "            <h4 class=\"list-group-item-heading\">Characters</h4>\n" +
    "            <p class=\"list-group-item-text\">Select a character from the list</p>\n" +
    "        </div>\n" +
    "        <a ng-repeat=\"name in ctrl.chars\" class=\"list-group-item\" href=\"#/{{name|encode}}\">{{name}}</a>\n" +
    "        <a class=\"list-group-item list-group-item-success\" ng-if=\"user\" ng-click=\"ctrl.createCharacter()\">\n" +
    "            Create a New Character\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('item.html',
    "<div class=\"modal-content\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Give the item a name\">\n" +
    "        </div><br>\n" +
    "        \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Desc</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.description\" placeholder=\"Describe the item\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Source</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Cost</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "            \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>        \n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('keypad.html',
    "<div class=\"modal-content keypad\">\n" +
    "  \n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <h3>Current: {{value}} <br><small>(min: {{minimum}}, max: {{maximum}})</small></h3>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-10)\" ng-disable=\"value==minimum\">-10</button>\n" +
    "        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-5)\" ng-disable=\"value==minimum\">-5</button>\n" +
    "        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-2)\" ng-disable=\"value==minimum\">-2</button>\n" +
    "        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-1)\" ng-disable=\"value==minimum\">-1</button>\n" +
    "        <br>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(1)\">+1</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(2)\">+2</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(3)\">+3</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(4)\">+4</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(5)\">+5</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(10)\">+10</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(15)\">+15</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(20)\">+20</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(25)\">+25</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(30)\">+30</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(35)\">+35</button>\n" +
    "        <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(40)\">+40</button>\n" +
    "\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('login.html',
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <form class=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"email\">Email</label>\n" +
    "                <input type=\"email\" name=\"email\" placeholder=\"Email address\" class=\"form-control\" ng-model=\"email\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"password\">Password</label>\n" +
    "                <input type=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\" ng-model=\"password\">\n" +
    "            </div>\n" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"login()\">Login</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
