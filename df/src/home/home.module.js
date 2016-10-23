(function(angular) {
    
    "use strict";


    angular.module("dresden.home", ["firebase", 'dresden.common']).config(function myAppConfig ( $stateProvider ) {
        $stateProvider.state({
            name: 'home',
            url: '/',
            template: '<home></home>'
        });
    });

}) (angular);