(function(angular) {
    "use strict";


    var CHAR_VERSION = 4;


    window.UUID = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    window.angularFireCopy = function(angularFireObj) {
        var result = {};
        for (var key in angularFireObj) {
           if (key.indexOf('$') < 0 && angularFireObj.hasOwnProperty(key)) {
              result[key] = angularFireObj[key];
           }
        }
        return result;
    };


    angular.module('sob-common', [])

    .constant('DataStoreUrl', "https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone")

    .constant('ClassMap', {
        "1455a125-99a3-4aeb-bd6c-0d66bce4b87c": "Gunslinger",
        "2e2e4022-35c0-498c-ad78-8b87f5664026": "Cowboy",
        "30d35552-bd40-444d-9558-df917fbc4398": "Drifter",
        "3ec81ec0-56da-4e53-b9b6-cb71af815dbf": "Rancher",
        "45b3ac67-15f6-4654-bba1-3c73493aa821": "US Marshal",
        "48bdac8c-01a4-4284-ba73-775a79dda210": "Jargono Native",
        "651350a6-d930-4372-9bce-1d200149362a": "Indian Scout",
        "6bc4fc3a-4af5-4cf9-b6ad-8615501aca26": "Frontier Doc",
        "6d198a74-1b2a-4f60-bf51-2c1e2d0ec2e1": "Prospector",
        "7309fd50-b111-4d16-8a89-c500807b3472": "Law Man",
        "7c791b38-c539-4964-890c-db925782933a": "Orphan",
        "7fa50e95-f33d-43a8-b93b-501a7b3f3a3a": "Saloon Girl",
        "c2c8ed0b-4104-44a2-9bfc-b403a7b70615": "Bandido",
        "fa565014-f32b-46b4-9621-f2936d079b35": "Preacher"
    })

    .factory('UUIDFactory', function() {
        
        function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }

        return function() {  
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    })

    .factory('ClassHelper', ["ClassMap", function(ClassMap) {
        return {

            getClassName: function(id) {
                return ClassMap[id];
            },
            getClassId: function(className) {
                if(typeof(className)==='undefined' || !className.length) return null;
                var name = className.trim().replace(/\./g, '').replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
                
                for(var id in ClassMap) {
                    if(ClassMap[id] == name) return id;
                }
                console.log("Could not find '" + className + "' in map");
                return null;
            },
            getClasses: function() {
                var result = [];
                for(var id in ClassMap)
                    result.push({id: id, name: ClassMap[id]});
                return result;
            },

            fixV3: function(name, character) {
                
                if('3' == character.version || 
                    (typeof(character.version) === 'number' && character.version >= 3)) 
                    return false;

                //fix char ID if necessary
                var classId = this.getClassId(character['class']);
                if(classId) {
                    character['class'] = classId;
                }

                //apply name as property (in prep for a move from using name as key in list)
                character.name = character.name || name;

                for(var abilName in character.abilities) {
                    var value = character.abilities[abilName];
                    delete character.abilities[abilName];
                    character.abilities[UUID()] = { name: abilName, desc: value };
                }

                character.version = 3;
                console.log("Fixed to version 3");
                return true;
                
            },

            getClassShell: function(classId) {

            }
        };
    }])

    .factory("DataStore", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return {
                getCharsForUser: function(uid) {
                    var root = firebase.database().ref();
                    var ref = root.child('ShadowsOfBrimstone').child('chars');
                    ref.orderByChild('uid').equalTo(uid);
                    return $firebaseObject(ref);
                },
                //returns Thenable:  create(json).then(resolveFn, errorFn);
                create: function(character) {
                    var root = firebase.database().ref();
                    var ref = root.child('ShadowsOfBrimstone').child('chars');
                    return ref.push(character);
                },
                //returns Thenable:  remove(key).then(resolveFn, errorFn);
                remove: function(key) {
                    var root = firebase.database().ref();
                    var ref = root.child('ShadowsOfBrimstone').child('chars').child(key);
                    return ref.remove();
                }
            };
        }
    ])

    .factory("CharacterRef", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(name) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone').child('chars').child(name);
                return $firebaseObject(ref);
            };
        }
    ])

    .factory("CharacterOptions", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(type, classId) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone/db/' + type + '/' + classId).orderByKey();
                return $firebaseObject(ref);
            };
        }
    ])

    .factory("DBHelper", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(group) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone/db/' + group);
                return $firebaseObject(ref);
            };
        }
    ])

    /* 
     * Factory used to create a copy of the starting "shell" for each character class.
     * Usage: CharacterShell(classId).then(function(json) {...})
     */
    .factory("CharacterShell", ["$q", "$firebaseObject", 'DataStoreUrl',
        function($q, $firebaseObject, DataStoreUrl) {
            return function(classId) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone/db/starting').child(classId);
                var fbo = $firebaseObject(ref);

                var deferred = $q.defer();
                fbo.$loaded().then(function(snap) {
                    var result = {
                        version: CHAR_VERSION
                    };
                    for (var key in snap) {
                       if (key.indexOf('$') < 0 && snap.hasOwnProperty(key)) {
                          result[key] = snap[key];
                       }
                    }
                    deferred.resolve(result);
                });
                return deferred.promise;
            };
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

    .filter('sum', function() {
        return function(arr) {
            if(arr && typeof(arr.push) !== 'undefined') {
                var result = 0;
                for(var i=0; i<arr.length; ++i) 
                    result += isNaN(arr[i]) ? 0 : arr[i]*1;
                return result;
            }
            return 0;
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

        $scope.$ctrl = this;

        this.item = item;
        this.slots = ['hat','face','shoulders','coat','torso','belt', 'pants', 'gloves','boots'];

        //modifiers may have stringified number values, if so format them so input works
        if(this.item.modifiers) {
            angular.forEach(this.item.modifiers, (mod, key) => {
                if(typeof(mod.value) === 'string')
                    mod.value = mod.value*1;
            });
        }

        this.ok = function () {
            $uibModalInstance.close(this.item);
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        this.addModifier = function() {
            this.item.modifiers = this.item.modifiers || {};
            this.item.modifiers[UUID()] = {affects: null, value: 0};
        };
        this.removeModifier = function(id) {
            delete this.item.modifiers[id];
        };

    })



    .controller('KeyPad', function ($scope, $uibModalInstance, value, minimum, maximum, modifier) {

        $scope.value = value;
        $scope.minimum = minimum*1 || 0;
        $scope.maximum = maximum*1 || 9999;
        $scope.modifier = modifier;
        $scope.changes = "";
        $scope.manualAdj===null;
        
        $scope.change = function(v) { 
            if(v>0)
                $scope.value = Math.min($scope.value + v, maximum); 
            else
                $scope.value = Math.max($scope.value + v, minimum); 
            $scope.changes += ($scope.changes.length ? ', ' : '') + (v>0?"+":"") + v;
        };

        $scope.changeManual = function(direction) {
            if(isNaN($scope.manualAdj)) return; //if no value provided
            $scope.change(direction * $scope.manualAdj);
        };

        $scope.hasManual = function() {
            return $scope.manualAdj !== null && $scope.manualAdj !== 'undefined' && 
                !isNaN($scope.manualAdj);
        };
        
        $scope.ok = function () {
            $uibModalInstance.close($scope.value);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })


    .component('editableStatValue', {
        require: {
            ngModelCtrl: '^ngModel'
        },
        bindings: {
            name: '@',
            onSave: '&',
            minimum: '@',
            maximum: '@',
            modifier: '<'
        },
        template: `
            <div class="value" ng-click="$ctrl.openKeypad()" 
                ng-class="{'is-modified': $ctrl.isModified()}">
                {{$ctrl.display}}
            </div>
        `,
        controller: function($uibModal) {

            this.$onInit = () => {
            
                this.minimum = (this.minimum || 0)*1;
                this.maximum = (this.maximum || 9999)*1;
                
                this.ngModelCtrl.$render = () => {
  
                    let modVal = isNaN(this.modifier) ? 0 : this.modifier*1;

                    this.display = this.ngModelCtrl.$viewValue ? 
                        (this.ngModelCtrl.$viewValue*1 + modVal) : modVal;
                };

            };

            this.$onChanges = () => {
                this.ngModelCtrl.$render();
            };

            this.openKeypad = () => {

                var value = this.ngModelCtrl.$modelValue || 0;

                var min = this.minimum;
                var max = this.maximum;
                var mod = this.modifier;

                var modalInstance = $uibModal.open({
                    templateUrl: 'src/keypad.html',
                    controller: 'KeyPad',
                    animation: false,
                    resolve: {
                        value:      function() { return value; },
                        minimum:    function() { return min; },
                        maximum:    function() { return max; },
                        modifier:   function() { return mod; }
                    }
                });

                modalInstance.result.then( (value) => {
                    
                    this.ngModelCtrl.$setViewValue(value);
                    this.ngModelCtrl.$render();
                    if(this.onSave)
                        this.onSave();

                }, () => { 
                    //do anything?
                });
            };

            this.isModified = function () {
                return !isNaN(this.modifier) && this.modifier*1 !== 0;
            };

        }
    })

    
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
                '<div class="editable-input f-container f-justify-between f-align-center">',
                '   <label class="editable-input-label f-cell">{{::label}}</label>',
                '   <span class="editable-input-display f-cell-1x" ng-show="!editing" ng-click="edit()"></span>',

                '   <form class="form f-cell-1x" ng-show="editing">',
                '      <div class="form-group">',
                '        <div class="f-container">', 
                '          <div class="f-cell-1x">',   
                '            <input type="text" class="form-control editable-input-field" ',
                '              ng-keyup="onKeyUp($event, $event.keyCode)"></input>',
                '          </div>',
                '          <div class="f-cell">',
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
                callback(coolFile);
            }

            var reader = new FileReader();
            reader.onload = readerOnload;

            file = file[0].files[0];
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
                '    <img src="assets/img/avatar.png">',
                '  </div>',
                '  <button type="button" class="btn btn-sm btn-success" ',
                '    ng-if="imgData && isDirty()" ng-click="save()">save</button>',
                '  <input type="file" class="hidden">',
                '</form>'
            ].join(' '),

            link: function($scope, $element, $attrs, ngModelController) {

                $scope.isDirty = function() {
                    return ngModelController.$dirty;
                };

                function update() {
                    if(!$scope.imgData) {return;}
                    var image = '<img alt="avatar" src="' + $scope.imgData + '">';
                    $element.find('.image').html(image);
                    
                }

                $scope.save = function() {
                    ngModelController.$setViewValue($scope.imgData);
                    ngModelController.$setPristine();
                    $scope.onSave();
                };
                
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







    .controller('LoginController', function($scope, $uibModalInstance, $timeout, Auth) {

        $timeout(function() {
            $('#email').focus();
        }, 500);

        $scope.onKeyUp = function($event, code) {
            // console.log("Up " + code);
            if((code === undefined || code === 0) && $event.which !== undefined)
                code = $event.which;
            if(code === 13 &&       //enter
                $scope.email && 
                $scope.password) 
                $scope.login();  
            else if(code === 27)    //esc   
                $scope.cancel();
            
        };

        $scope.login = function() {
            
            Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(authData) {
                // console.log("Logged in");
                $scope.errorMessage = null;
                $uibModalInstance.close();
            })
            .catch(function(error) {
                var errorCode = error.code;
                $scope.errorMessage = error.message;
                console.log("unable to login: " + $scope.errorMessage);
            });
        };

        $scope.cancel = function () {
            $scope.errorMessage = null;
            $scope.resetMessage = false;
            $uibModalInstance.dismiss('cancel');
        };

        $scope.reset = function() {

            if(!$scope.email) return;

            Auth.$sendPasswordResetEmail($scope.email, function(error) {
                if (error === null) {
                    $scope.resetMessage = true;
                    $scope.errorMessage = null;
                } else {
                    $scope.resetMessage = false;
                    $scope.errorMessage = "Error sending password reset email: " + error.message;
                }
            });
        };

    })



    .directive('login', ["$uibModal", "$firebaseAuth", function($uibModal, $firebaseAuth) {

        return {
        
            template: [
                '<a ng-if="!user" ng-click="doLogin()">Login</a>',
                '<a ng-if="user" class="dropdown-toggle" data-toggle="dropdown" ',
                '  role="button" aria-haspopup="true" aria-expanded="false">',
                '  <span class="glyphicon glyphicon-menu-hamburger"></span>',
                '</a>',
                '<ul ng-if="user" class="dropdown-menu dropdown-menu-right">',
                '  <li class="disabled"><a>{{user.email}}</a></li>',
                '  <li><a href="/sob/index.html#/">My Characters</a></li>',
                '  <li role="separator" class="divider"></li>',
                '  <li role="separator" class="divider"></li>',
                '  <li><a ng-click="doReset()">Reset Password</a></li>',
                '  <li role="separator" class="divider"></li>',
                '  <li role="separator" class="divider"></li>',
                '  <li><a ng-click="doLogout()">Log out</a></li>',
                '</ul>',
                '</div>'
            ].join(' '),

            controller: function($scope) {

                var auth = $firebaseAuth();
                auth.$onAuthStateChanged(function(authData) {
                    $scope.user = authData;
                    // console.log("User logged in " + authData.uid + " > " + authData.email);
                });

                $scope.doLogout = function() {
                    auth.$signOut();        //v2.x.x
                    $scope.user = null;
                };

                $scope.doLogin = function() {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/login.html',
                        controller: 'LoginController',
                        resolve: {
                            Auth: function() { return auth; }
                        }
                    });

                    modalInstance.result.then(function() {}, function () {});

                };

                $scope.doReset = function() {
                    if(!$scope.user) return;
                    
                    //v2.x.x
                    auth.$sendPasswordResetEmail($scope.user.email, function(error) {
                        if (error === null) {
                            alert("Password reset email sent");
                        } else {
                            alert("Error sending password reset email:", error);
                        }
                    });
                };

            }
        };


    }])


    ;

}) (angular);