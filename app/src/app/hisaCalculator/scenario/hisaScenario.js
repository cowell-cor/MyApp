(function ($, jQuery) {
	brCalc.controller('hisaScenarioCtrl', function ($scope, $attrs, scenarios, $filter, contentManager, $rootScope) {
		var me = this,
			hisa = scenarios.getScenarios('hisaData'),
			scenario = hisa.getScenario($attrs.scenarioIndex),
			rscData = hisa.data,
			content = $scope.hisa.content,
			constants = $scope.hisa.data.constants;

		$scope.collapse = {
			savings: false,
			debitTransfer: true,
			depositTransfer: true
		};

		//////////////////////////////
		// View accessible variable //
		//////////////////////////////
		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;

		this.results = scenario.results;

		this.validation = scenario.validation;

		/**
		 * Function: resetDepositTransfer
		 */

		$scope.resetDebitTransfer = function () {
			$scope.sce.data.numberOfMonthlyDebitTransactions = 0
			$scope.hisa.specs.sliderDebitTransfer.defaultValue = 2
			$rootScope.$broadcast('resetEvent', {
				sliderId: 'debitTransfer_slider',
				defaultVal: 2,
				min:0,
				max:5
			});
		}

				/**
		 * Function: resetDepositTransfer
		 */

		$scope.resetDepositTransfer = function () {
			$scope.sce.data.monthlyCreditsPay = 0
			$scope.hisa.specs.sliderDepositTransfer.defaultValue = 0
			$rootScope.$broadcast('resetEvent', {
				sliderId: 'depositTransfer_slider',
				defaultVal: 0,
				min:0,
				max:100
			});
		}
		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////
		initChart();

		//////////////////////////////
		// FIN FONCTIONS DE CALCULS //
		//////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////


		function initChart() {
			me.results.chartHISA = (function () {

				var config = contentManager.getHighchartConfig('chartHISA');

				return config;
			})();
		}
	});
})($cmsj, $cmsj);