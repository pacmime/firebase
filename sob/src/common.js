(function(angular) {
    "use strict";

    angular.module('sob-common', [])

    .constant('DataStoreUrl', "https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone")

    .factory("DataStore", ["$firebaseObject",
        function($firebaseObject) {
            var ref = new Firebase("https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone/chars");
            return $firebaseObject(ref);
        }
    ])

    .factory("CharacterRef", ["$firebaseObject",
        function($firebaseObject) {
            return function(name) {
                var ref = new Firebase("https://intense-fire-8692.firebaseio.com/ShadowsOfBrimstone/chars/" + name);
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

    .controller('ItemEditor', function($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })


    .controller('KeyPad', function ($scope, $uibModalInstance, value) {

        $scope.value = value;
        
        $scope.change = function(v) { $scope.value += v; }
        
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
                onSave: '&'
            },
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            template: '<div class="value" ng-click="openKeypad()">{{display}}</div>',
            link: function($scope, $element, $attrs, ngModelController) {

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
                            value: function() { return value; }
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
                    ngModelController.$setDirty();
                }

                function save() {
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

    ;

}) (angular);