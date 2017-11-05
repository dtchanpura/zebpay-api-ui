(function() {
    'use strict';
    angular.module('zebapp', ['ngRoute','ngCookies'])
        .config(config);
    //.run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

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

})();
