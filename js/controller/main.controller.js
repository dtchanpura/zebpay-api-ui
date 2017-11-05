(function() {
    'use strict';

    angular
        .module('zebapp')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', '$cookies', 'ConnectionService'];

    function MainController($location, $cookies, ConnectionService) {
        var vm = this;
        vm.refresh = refresh;
        vm.calculate = calculate;
        // vm.title = "Hello!";
        vm.buyValue = 0;
        vm.sellValue = 0;
        (function init() {
            // console.log("init.");
            vm.unitName = "btc";
            var queryParams = $location.search();
            if (queryParams["holdings"] !== undefined || queryParams["unit"] !== undefined) {
                vm.holdingsInput = queryParams["holdings"];
                vm.unitName = queryParams["unit"];
            }
            refresh();
        })();

        function refresh() {
            vm.reloading = true;
            ConnectionService.GetDetails().then(function(response) {
                vm.currency = "";
                if (response !== undefined) {
                    if (response.currency == "INR") {
                        vm.currency = '₹ ';
                    }
                    vm.buyValue = response.buy;
                    vm.sellValue = response.sell;
                    vm.buyInput = vm.currency + vm.buyValue;
                    vm.sellInput = vm.currency + vm.sellValue;
                    vm.statusColor = "green"
                } else {
                    vm.statusColor = "red"
                }
                vm.reloading = false;
                calculate();
            }, function(error) {
                console.log(error);
                vm.reloading = false;
            });

        }

        function calculate() {
            if (vm.buyValue !== undefined && vm.sellValue !== undefined && vm.holdingsInput !== undefined) {
                vm.calculating = true;
                var holdingsBuyBTC = vm.buyValue * parseInt(vm.holdingsInput);
                var holdingsSellBTC = vm.sellValue * parseInt(vm.holdingsInput);
                switch (vm.unitName) {
                    case "btc":
                        vm.holdingsBuy = vm.currency + holdingsBuyBTC;
                        vm.holdingsSell = vm.currency + holdingsSellBTC;
                        break;
                    case "mbtc":
                        vm.holdingsBuy = vm.currency + (holdingsBuyBTC / 1000);
                        vm.holdingsSell = vm.currency + (holdingsSellBTC / 1000);
                        break;
                    case "ubtc":
                        vm.holdingsBuy = vm.currency + (holdingsBuyBTC / 1000000);
                        vm.holdingsSell = vm.currency + (holdingsSellBTC / 1000000);
                        break;
                    default:
                        vm.holdingsBuy = vm.currency + 0;
                        vm.holdingsSell = vm.currency + 0;
                }
                vm.calculating = false;
            } else {
                console.log('condition failed.')
            }
        }
    }
})();
