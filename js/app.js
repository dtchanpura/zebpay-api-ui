(function() {
    'use strict';

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/prices.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('zebapp', ['ngRoute','ngCookies'])
        .config(config);
})();
