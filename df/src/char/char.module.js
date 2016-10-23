(function(angular) {
    
    "use strict";


    angular.module("dresden.char", ["firebase"]).config(function myAppConfig ( $stateProvider ) {
        $stateProvider.state({
            name: 'char',
            url: '/chars/:id',
            template: '<character></character>'
        });
    })

    .constant('PowerLevels', {
        "Feet in the Water": {
            skillCap: 4,
            baseRefresh: 6
        },
        "Waist Deep": {
            skillCap: 4,
            baseRefresh: 8
        },
        "Other": {
            skillCap: 5,
            baseRefresh: 10
        }
    });

}) (angular);