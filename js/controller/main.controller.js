(function() {
    'use strict';

    angular
        .module('zebapp')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', '$cookies', 'ConnectionService'];

    function MainController($location, $cookies, ConnectionService) {
        var vm = this;
        vm.refresh = refresh;
        vm.calculate = refresh;
        // vm.title = "Hello!";

        (function init() {
            // console.log("init.");
            refresh();
        })();

        function refresh() {
            // vm.reloading = true;
            // ConnectionService.GetDetails().then(function(response) {
            //     var currency = "";
            //     if (response !== undefined) {
            //         if (response.currency == "INR") {
            //             currency = '₹ ';
            //         }
            //         vm.buyInput = currency + response.buy;
            //         vm.sellInput = currency + response.sell;
            //         vm.statusColor = "green"
            //     } else {
            //         vm.statusColor = "red"
            //     }
            //     vm.reloading = false;
            // }, function(error) {
            //     console.log(error);
            //     vm.reloading = false;
            // });
        }
    }
})();
