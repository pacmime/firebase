(function(angular) {
    "use strict";

    angular.module('dresden.common', [])

    .constant('DataStoreUrl', "https://intense-fire-8692.firebaseio.com/DresdenFiles")

    .factory("DataStore", ["$firebaseObject", 'DataStoreUrl',
        function($firebaseObject, DataStoreUrl) {
            return {
                getCharsForUser: function(uid) {
                    var root = firebase.database().ref();
                    var ref = root.child('DresdenFiles').child('chars');
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
                var ref = root.child('DresdenFiles').child('chars').child(name);
                return $firebaseObject(ref);
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


    

    .controller('KeyPad', function ($scope, $uibModalInstance, value, minimum, maximum) {

        $scope.value = value;
        $scope.minimum = minimum*1 || 0;
        $scope.maximum = maximum*1 || 9999;
        
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
            
            Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(authData) {
                // console.log("Logged in");
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

    })



    .component('login', {

        template: [
                '<a ng-if="!$ctrl.user" ng-click="$ctrl.doLogin()">Login</a>',
                '<a ng-if="$ctrl.user" class="dropdown-toggle" data-toggle="dropdown" ',
                '  role="button" aria-haspopup="true" aria-expanded="false">',
                '  <span class="hidden-xs">{{$ctrl.user.email}}</span> ',
                '  <span class="visible-xs-inline-block glyphicon glyphicon-user"></span>',
                '  <span class="caret"></span>',
                '</a>',
                '<ul ng-if="$ctrl.user" class="dropdown-menu">',
                '  <li><a ng-click="$ctrl.doReset()">Reset Password</a></li>',
                '  <li><a ng-click="$ctrl.doLogout()">Log out</a></li>',
                '</ul>',
                '</div>'
            ].join(' '),

        controller: function($uibModal, $firebaseAuth) {

            this.$onInit = () => {
                this.auth = $firebaseAuth();
                this.auth.$onAuthStateChanged( (authData) => this.user = authData );
            };

            this.$onDestroy = () => {
                this.auth = null;
            };

            this.doLogout = () => {
                this.auth.$signOut();        //v2.x.x
                this.user = null;
            };

            this.doLogin = () => {

                var self = this;
                var modalInstance = $uibModal.open({
                    templateUrl: 'login.html',
                    controller: 'LoginController',
                    resolve: {
                        Auth: function() { return self.auth; }
                    }
                });

                modalInstance.result.then(function() {}, function () {});

            };

            this.doReset = () => {

                //v2.x.x
                auth.$sendPasswordResetEmail(this.user.email, function(error) {
                    if (error === null) {
                        alert("Password reset email sent");
                    } else {
                        alert("Error sending password reset email:", error);
                    }
                });

            };

        }

    })


    .component('loginMenu', {

        template: [
                '<div class="c-login-menu">',
                '  <a ng-if="!$ctrl.user" ng-click="$ctrl.doLogin()">Login</a>',
                '  <div ng-if="$ctrl.user" class="c-login__user">',
                '    <small>{{$ctrl.user.email}}</small>',
                '    <a class="btn btn-link" ng-click="$ctrl.doReset()" title="Reset Password">',
                '      <span class="glyphicon glyphicon-envelope"></span>',
                '    </a>',
                '    <a class="btn btn-link" ng-click="$ctrl.doLogout()" title="Log Out">',
                '      <span class="glyphicon glyphicon-log-out"></span>',
                '    </a>',
                '  </div>',
                '</div>'
            ].join(' '),

        controller: function($uibModal, $firebaseAuth) {

            this.$onInit = () => {
                this.auth = $firebaseAuth();
                this.auth.$onAuthStateChanged( (authData) => this.user = authData );
            };

            this.$onDestroy = () => {
                this.auth = null;
            };

            this.doLogout = () => {
                this.auth.$signOut();        //v2.x.x
                this.user = null;
            };

            this.doLogin = () => {

                var self = this;
                var modalInstance = $uibModal.open({
                    templateUrl: 'login.html',
                    controller: 'LoginController',
                    resolve: {
                        Auth: function() { return self.auth; }
                    }
                });

                modalInstance.result.then(function() {}, function () {});

            };

            this.doReset = () => {

                //v2.x.x
                auth.$sendPasswordResetEmail(this.user.email, function(error) {
                    if (error === null) {
                        alert("Password reset email sent");
                    } else {
                        alert("Error sending password reset email:", error);
                    }
                });

            };

        }

    })



    .constant('Templates', [
        'Pure Mortal',
        'Champion of God',
        'Changeling',
        'Emissary of Power',
        'Focused Practitioner',
        'Knights of a Faerie Court',
        'Lycanthrope',
        'Minor Talent',
        'Red Court Infected',
        'Sorcerer',
        'True Believer',
        'Were-Form',
        'White Court Vampire',
        'White Court Virgin',
        'Wizard'
    ])

    .constant("CharacterShell", {
        
        name: "",
        template: "",
        fatePoints: 0,
        
        powerLevel: "",
        skillCap: 0,
        baseRefresh: 0,
        
        adjustedRefresh: 0,
        aspects: {
            highConcept: "",
            trouble: "",
            other: ""
        },

        stress: {
            physical: { 
                0: false,
                1: false,
                2: false
            },
            mental: { 
                0: false,
                1: false,
                2: false
            },
            social: { 
                0: false,
                1: false,
                2: false
            },
            armor: {
                /*
                modifier: 2,
                description: ""
                */
            }
        },
        consequences: {
            /*
            "aspect": { 
                type: "mild | moderate | severe | extreme",
                modifier: 2 | 4 | 6 | 8,
                stress: "any | physical | mental | social"
            }
            */
        },
        skills: {
            total: 0,
            spent: 0,
            superb: {choices: ""},
            great: {choices:""},
            good: {choices:""},
            fair: {choices:""},
            average: {choices:""}
        },

        powers: {
            /*
            "ability": {
                cost: "number",
                misc: "string"
            }
            */
        },

        phases: {
            background: {
                events: "",
                aspect: ""
            },
            conflict: {
                events: "",
                aspect: ""
            },
            story: {
                events: "",
                aspect: "",
                title: "",
                guest: ""
            },
            guest1: {
                events: "",
                aspect: "",
                title: "",
                guest: ""
            },
            guest2: {
                events: "",
                aspect: "",
                title: "",
                guest: ""
            }
        },

        notes: ""

    })


    ;

}) (angular);

