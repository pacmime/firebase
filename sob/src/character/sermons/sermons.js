(function(angular) {
    
    "use strict";

    angular.module("sob-character")

    .directive('sermons', ['$timeout', '$uibModal', function($timeout, $uibModal) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/sermons/sermons.html',
            
            controller: function($scope, $element) {

                $scope.onEdited = function(name, sermon) {
                    if(!name) return;

                    //if deleting item or renaming it
                    if(name && !sermon)
                        delete $scope.character.sermons[name];

                    if(sermon)
                        $scope.character.sermons[name] = sermon;

                    $scope.onSave();
                };

                $scope.add = function() {
                    
                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/character/sermons/editor.html',
                        controller: 'ItemEditor',
                        animation: false,
                        resolve: {
                            item: function() {return null;}
                        }
                    });

                    modalInstance.result.then(function(sermon) {
                        if(!sermon || !sermon.name) return;

                        $scope.character.sermons = $scope.character.sermons || {};
                        if($scope.character.sermons[sermon.name]) return;    //already has one
                        
                        var obj = {};
                        obj[sermon.name] = sermon;
                        angular.merge($scope.character.sermons, obj);

                        $scope.onSave();
                        
                    }, function () { });

                };

            }
        };
    }])


    .directive('sermon', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.sermon = $scope.sermon;
            
            this.edit = function() {
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/character/sermons/editor.html',
                    controller: 'ItemEditor',
                    animation: false,
                    resolve: {
                        item: function() { 
                            var copy = angular.copy($scope.sermon);
                            return copy; 
                        }
                    }
                });

                modalInstance.result.then(function(sermon) {
                    if(!sermon || !sermon.name) return; //cancel
                    
                    //apply changes to local version
                    angular.forEach(sermon, function(value, key) {
                        $scope.ctrl.sermon[key] = value;
                    });
                    
                    $scope.ctrl.save();
                                        
                }, function () { });

            };

            this.save = function() {
                console.log("Saving...");
                $scope.onSave({ sermon: this.sermon, name: $scope.name });
            };

            this.remove = function() {
                $scope.onSave({ sermon: null, name: $scope.name });
            };

        }

        // {
        //     type: "blessing|judgement",
        //     cost: 1,
        //     check: 5+,
        //     range: 'self',
        //     xp: 10
        //     deadly: false
        //     name: "",
        //     desc: ""
        // }


        return {
            scope: {
                name: "@",
                sermon: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/sermons/sermon.html',
            controller: Controller
        };
    }]);


}) (angular);