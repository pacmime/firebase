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
            templateUrl: 'src/v2/sermons/sermons.html',
            
            controller: function($scope, $element) {

                
                $scope.resetFaith = function() {
                    $scope.remainingFaith = $scope.character.faith;
                    // console.log("Resetting faith to " + $scope.remainingFaith);
                    $scope.$broadcast('faith:reset', $scope.remainingFaith);
                };

                $scope.character.$loaded().then(function() {
                    $scope.resetFaith();
                });


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


                $scope.$on('faith:spent', function(event, amount) {
                    // console.log("Spending " + amount + " faith");
                    $scope.remainingFaith -= amount;
                    // console.log("Remaining: " + $scope.remainingFaith);
                    $scope.$broadcast('faith:available', $scope.remainingFaith);
                });

            }
        };
    }])


    .directive('sermon', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.sermon = $scope.sermon;

            this.status = {
                available: true,
                used: false
            };

            //mark sermon as used
            this.use = function() {
                this.status.available = false;
                this.status.used = true;
                $scope.$emit('faith:spent', this.sermon.cost);
            };
            this.spendExtraFaith = function() {
                $scope.$emit('faith:spent', 1);  
            };
            
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

            this.isAvailable = function() {
                return this.status.available && !this.status.used;
            };


            //when total remaining faith changes
            $scope.$on('faith:available', function(event, amount) {
                
                if(amount < $scope.sermon.cost) {
                    //if remaining faith is insufficient
                    $scope.ctrl.status.available = false;

                } else if(!$scope.ctrl.status.used) {
                    //if enough faith and not already used
                    $scope.ctrl.status.available = true;
                }
            });

            //when faith is reset (end of round)
            $scope.$on('faith:reset', function(event, amount) {
                $scope.ctrl.status.available = true;
                $scope.ctrl.status.used = false;
            });
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