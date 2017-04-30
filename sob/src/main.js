(function(angular) {

    "use strict";

    angular.module("app", ["firebase", 'ngRoute', 'ngAnimate', 'sob-home', 'sob-character'])

    .config(function myAppConfig ($routeProvider, $locationProvider) {

        //default route if invalid one is supplied

        if(window.SOB && window.SOB.version === 2) {
            $routeProvider.when('/:charId', { 
                template: '<character></character>'
            });

        } else {
            $routeProvider.when('/:charId', { 
                templateUrl: 'src/character/character.html',
                controller: 'CharacterController as ctrl'
            });

        }
        
        $routeProvider.when('/', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeController as ctrl'
        })
        .otherwise({ redirectTo: "/" });


        //http://stackoverflow.com/questions/17895675/angularjs-html5mode-refresh-page-get-404
        // $locationProvider.html5Mode(true);

        if(!(window.history && history.pushState))
            console.log("Your browser does not support HTML5 mode");
    })


    // .service('Auth', function() {

    //     var _currentUser = null;
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         _currentUser = user;
    //     });

    //     return {
    //         getUser: function() {return _currentUser;}
    //     };
    // })

    // .run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

    //     $rootScope.$on('$routeChangeStart', function (event) {

    //         if (!Auth.getUser()) {
    //             console.log('Not logged in');
    //             event.preventDefault();
    //             $location.path('/login');
    //         }
            
    //     });

    // }])

    ;

    
})(angular);
