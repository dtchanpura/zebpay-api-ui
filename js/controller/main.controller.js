(function() {
    'use strict';

    function MainController($location, $cookies, ConnectionService) {
        var vm = this;
        // vm.title = "Hello!";
        vm.buyValue = 0;
        vm.sellValue = 0;

        var unitNameScale = {
            "btc": 1,
            "mbtc": 1/1000,
            "ubtc": 1/1000000,
            "default": 0
        };

        function calculate() {
            if (vm.buyValue === null || vm.sellValue === null || vm.holdingsInput === null) {
                // console.log("condition failed.");
                return;
            }
            vm.calculating = true;
            var holdingsBuyBTC = vm.buyValue * parseFloat(vm.holdingsInput);
            var holdingsSellBTC = vm.sellValue * parseFloat(vm.holdingsInput);
            vm.unitName = unitNameScale[vm.unitName] !== null ? vm.unitName : "default";
            vm.holdingsBuy = vm.currency + (holdingsBuyBTC * unitNameScale[vm.unitName]);
            vm.holdingsSell = vm.currency + (holdingsSellBTC * unitNameScale[vm.unitName]);

            vm.calculating = false;
        }

        function refresh() {
            vm.reloading = true;
            ConnectionService.GetDetails().then(function(response) {
                vm.currency = "";
                if (response !== null) {
                    if (response.currency === "INR") {
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
                // console.log(error);
                vm.reloading = false;
            });

        }


        (function init() {
            // console.log("init.");
            vm.unitName = "btc";
            var queryParams = $location.search();
            if (queryParams["holdings"] !== null || queryParams["unit"] !== null) {
                vm.holdingsInput = queryParams["holdings"];
                vm.unitName = queryParams["unit"];
            }
            refresh();
        })();

        vm.refresh = refresh;
        vm.calculate = calculate;

    }

    MainController.$inject = ["$location", "$cookies", "ConnectionService"];

    angular
        .module("zebapp")
        .controller("MainController", MainController);
})();
