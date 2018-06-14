(function() {
    'use strict';

    function ConnectionService($http) {
        var service = {};

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function() {
                return {
                    ok: false,
                    message: error
                };
            };
        }

        function GetDetails(base_path) {
            return $http.get("https://www.zebapi.com/api/v1/market/ticker/btc/inr").then(handleSuccess, handleError);
        }

        service.GetDetails = GetDetails;
        return service;
    }

    ConnectionService.$inject = ['$http'];

    angular
        .module('zebapp')
        .factory('ConnectionService', ConnectionService);

})();
