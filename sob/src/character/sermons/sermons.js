(function(angular) {
    
    "use strict";


    var flags = {
        empty:       1,    //no faith available
        insufficient: 2,    //insufficient faith to cast
        cast:        4,    //cast
        xp:          8    //applied xp
    };

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
    function clearFlags(sermon) {
        sermon.status = 0;
    }




    angular.module("sob-character")



    .directive('sermons', ['$timeout', '$uibModal', "ClassHelper", 'DBHelper', 
        function($timeout, $uibModal, ClassHelper, DBHelper) {

        return {
            scope: {
                character: "=",
                onSave: '&'
            },
            replace: true,
            templateUrl: 'src/character/sermons/sermons.html',
            
            controller: function($scope, $element) {

                $scope.canCast = false;
                $scope.character.$loaded(function(chr) {
                    $scope.canCast = $scope.character['class'] && 
                        'Preacher' === ClassHelper.getClassName($scope.character['class']);

                    init();
                });

                $scope.canCastSermons = function() { return $scope.canCast; };

                function init() {

                    $scope.newSermon = null;
                    $scope.sermonOpts = [];

                    if($scope.canCast) {
                        DBHelper('sermons').$loaded(function(sermons) {
                            var sms = angularFireCopy(sermons);
                            for(var name in sms) {
                                if(!$scope.character.sermons[name])
                                    $scope.sermonOpts.push(sms[name]);
                            }
                        });

                        //initialize if not already present on char object
                        if(typeof($scope.character.availableFaith) === 'undefined')
                            $scope.character.availableFaith = $scope.character.faith;
                    }
                    
                }

                $scope.hasAbility = function(name) {
                    if($scope.character.abilities) {
                        for(var id in $scope.character.abilities) {
                            if($scope.character.abilities[id].name === name)
                                return true;
                        }
                    }
                    return false;
                };

                
                $scope.resetFaith = function() {
                    $scope.character.availableFaith = $scope.character.faith;
                    
                    // console.log("Resetting faith to " + $scope.character.availableFaith);
                    for(var name in $scope.character.sermons) {
                        clearFlags($scope.character.sermons[name]);
                    }

                    $scope.onSave();
                };


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
                    $scope.character.sermons[$scope.newSermon.name] = $scope.newSermon;
                    $scope.onSave();
                    init();
                };

                $scope.addCustom = function() {
                    
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

                /** */
                $scope.updateSermons = function() {
                    var available = $scope.character.availableFaith;

                    for(var k in $scope.character.sermons) {
                        var sermon = $scope.character.sermons[k];
                        
                        if(available === 0) {   //if no faith, doesn't matter
                            // $scope.sermon.status = $scope.ctrl.status.UNAVAILABLE;
                            applyFlag(sermon, flags.empty);

                        } else {    //some faith left, but enough to cast ?

                            removeFlag(sermon, flags.empty);

                            if(available < sermon.cost) { 
                                applyFlag(sermon, flags.insufficient);
                            } else {
                                removeFlag(sermon, flags.insufficient);
                            }
                        }
                    }
                };

                $scope.$on('sermon:cast', function(event, name, cost) {
                    // console.log("Casting " + name + " for " + cost);
                    applyFlag($scope.character.sermons[name], flags.cast);
                    $scope.character.availableFaith -= cost;
                    $scope.updateSermons();
                    $scope.onSave();
                });

                $scope.$on('sermon:xp', function(event, name, xp) {
                    if(isNaN(xp)) return;
                    // console.log("Applying " + xp + " XP for " + name);
                    applyFlag($scope.character.sermons[name], flags.xp);
                    $scope.character.xp += (xp*1);
                    $scope.onSave();
                });

            }
        };
    }])


    .directive('sermon', ['$uibModal', function($uibModal) {

        function Controller($scope, $element) {

            $scope.ctrl = this;

            this.sermon = $scope.sermon;

            // console.log(this.sermon.name + ": " + this.sermon.status);

            //mark sermon as used
            this.use = function() {
                $scope.$emit('sermon:cast', $scope.sermon.name, $scope.sermon.cost);
                // applyFlag($scope.sermon, flags.cast);
                // console.log($scope.sermon.name + ": " + $scope.sermon.status);
                // $scope.$emit('faith:spent', $scope.sermon.cost, $scope.sermon.name);
            };
            this.spendExtraFaith = function() {
                $scope.$emit('sermon:cast', $scope.sermon.name, 1);
                // $scope.$emit('faith:spent', 1);  
            };
            this.applyXP = function() {
                $scope.$emit('sermon:xp', $scope.sermon.name, $scope.sermon.xp);
                // applyFlag(this.sermon, flags.xp);
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
                        $scope.sermon[key] = value;
                    });
                    
                    $scope.ctrl.save();
                                        
                }, function () { });

            };

            this.save = function() {
                console.log("Saving...");
                $scope.onSave({ name: $scope.sermon.name, sermon: $scope.sermon });
            };

            this.remove = function() {
                $scope.onSave({ name: $scope.sermon.name, sermon: null });
            };

            this.canCast = function() {
                return !hasFlag($scope.sermon, flags.cast) && 
                       !hasFlag($scope.sermon, flags.empty) && 
                       !hasFlag($scope.sermon, flags.insufficient);
            };
            this.hasCast = function() {
                return ($scope.sermon.status & flags.cast);
            };
            this.canSpendExtraFaith = function() {
                return hasFlag($scope.sermon, flags.cast) && !hasFlag($scope.sermon, flags.empty);
            };
            this.canApplyXP = function() {
                return hasFlag($scope.sermon, flags.cast) && !hasFlag($scope.sermon, flags.xp);
            };
            this.xpApplied = function() {
                return ($scope.sermon.status & flags.xp);
            };
            this.isInsufficient = function() {
                return hasFlag($scope.sermon, flags.empty) || 
                    ( hasFlag($scope.sermon, flags.insufficient) && !hasFlag($scope.sermon, flags.cast) );
            };

        }


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
