(function () {
    'use strict';

    angular
        .module('zebapp')
        .factory('ConnectionService', ConnectionService);

    ConnectionService.$inject = ['$http'];
    function ConnectionService($http) {
        var service = {};

        service.GetDetails = GetDetails;

        return service;

        function GetDetails(base_path) {
          return $http.get("https://www.zebapi.com/api/v1/market/ticker/btc/inr").then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
          return res.data;
        }

        function handleError(error) {
          return function(){
            // console.log('error');
            // console.log(error);
            return {ok: false, message: error };
          };
        }
    }

})();
