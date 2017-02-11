(function(angular) {
    "use strict";


    var CHAR_VERSION = 4;


    window.UUID = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    window.angularFireCopy = function(angularFireObj) {
        var result = {};
        for (var key in angularFireObj) {
           if (key.indexOf('$') < 0 && angularFireObj.hasOwnProperty(key)) {
              result[key] = angularFireObj[key];
           };
        }
        return result;
    }


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

                for(var name in character.abilities) {
                    var value = character.abilities[name];
                    delete character.abilities[name];
                    character.abilities[UUID()] = { name: name, desc: value };
                }

                character.version = 3;
                console.log("Fixed to version 3");
                return true;
                
            },

            getClassShell: function(classId) {

            }
        }
    }])

    .factory("DataStore", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return {
                getCharsForUser: function(uid) {
                    var root = firebase.database().ref();
                    var ref = root.child('ShadowsOfBrimstone').child('chars');
                    ref.orderByChild('uid').equalTo(uid);
                    return $firebaseObject(ref);
                }
            }
        }
    ])

    .factory("CharacterRef", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(name) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone').child('chars').child(name);
                return $firebaseObject(ref);
            }
        }
    ])

    .factory("CharacterOptions", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(type, classId) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone/db/' + type + '/' + classId).orderByKey();
                return $firebaseObject(ref);
            }
        }
    ])

    .factory("DBHelper", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return function(group) {
                var root = firebase.database().ref();
                var ref = root.child('ShadowsOfBrimstone/db/' + group);
                return $firebaseObject(ref);
            }
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
                       };
                    }
                    deferred.resolve(result);
                });
                return deferred.promise;
            }
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
        $scope.slots = ['hat','face','shoulders','coat','torso','belt','gloves','boots'];
        
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
        $scope.minimum = minimum*1 || 0;
        $scope.maximum = maximum*1 || 9999;
        $scope.changes = "";
        
        $scope.change = function(v) { 
            if(v>0)
                $scope.value = Math.min($scope.value + v, maximum); 
            else
                $scope.value = Math.max($scope.value + v, minimum); 
            $scope.changes += ($scope.changes.length ? ', ' : '') + (v>0?"+":"") + v;
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
            $uibModalInstance.dismiss('cancel');
        };

    })



    .directive('login', ["$uibModal", "$firebaseAuth", function($uibModal, $firebaseAuth) {

        return {
        
            template: [
                '<a ng-if="!user" ng-click="doLogin()">Login</a>',
                '<a ng-if="user" class="dropdown-toggle" data-toggle="dropdown" ',
                '  role="button" aria-haspopup="true" aria-expanded="false">',
                '  {{user.email}} <span class="caret"></span>',
                '</a>',
                '<ul ng-if="user" class="dropdown-menu">',
                '  <li><a ng-click="doReset()">Reset Password</a></li>',
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

                    //v2.x.x
                    auth.$sendPasswordResetEmail($scope.user.email, function(error) {
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