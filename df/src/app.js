(function(angular) {
    
    "use strict";


    angular.module('dresden', [
        "firebase", 'ui.router', 'ui.bootstrap', 'ngAnimate', 
        'dresden.common', 'dresden.home', 'dresden.char'
    ])

    /**
     *
     */
    .config(function myAppConfig ($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
    })

    ;


    window.show = function(selector, btn) {
        $('.c-card').removeClass('is-shown');
        $(selector).addClass('is-shown');
        var $btn = $(btn);
        $btn.addClass('active');
        $btn.siblings().removeClass('active');
    }

})(angular);

