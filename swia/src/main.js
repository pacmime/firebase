(function(angular) {

    "use strict";

    angular.module("app", ['ngRoute', 'home', 'campaign', 'character'])

    .config(function myAppConfig ($routeProvider, $locationProvider) {
        
        //default route if invalid one is supplied
        $routeProvider
        .when('/', {
            template: "<swia-home></swia-home>"
        })
        .when('/campaign/:campId/:charId', {
            template: '<swia-character></swia-character>'
        })
        .when('/campaign/:id', {
            template: '<swia-campaign></swia-campaign>'
        })
        
        .otherwise({ redirectTo: "/" });
      
        //http://stackoverflow.com/questions/17895675/angularjs-html5mode-refresh-page-get-404
        // $locationProvider.html5Mode(true);

        if(!(window.history && history.pushState))
            console.log("Your browser does not support HTML5 mode");
    })

    
})(angular);
