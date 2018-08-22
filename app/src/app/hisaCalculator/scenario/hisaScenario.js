(function ($, jQuery) {
	brCalc.controller('hisaScenarioCtrl', function ($scope, $attrs, scenarios, $filter, contentManager, $rootScope) {
		var me = this,
			hisa = scenarios.getScenarios('hisaData'),
			scenario = hisa.getScenario($attrs.scenarioIndex),
			rscData = hisa.data,
			content = $scope.hisa.content,
			constants = $scope.hisa.data.constants;
		
		me.data = hisa.data;
		me.data.value = null;
		$scope.collapse = {
			savings: false,
			debitTransfer: true,
			depositTransfer: true
		};
		// default value for open account link
		$scope.openAcctLnk = "#link1";
		/**
		 * Reset the value of savings slider based on monthly or anually
		 * @param {monthly/annually} type 
		 */
		$scope.getDefaultVal = function (type, isError) {
			switch (type) {
				case 'monthly':
					me.data.value = 6;
					//trigger the event to updated the slider color bar
					$rootScope.$broadcast('resetSavings', {
						sliderId: 'savings_slider',
						defaultVal: me.data.value,
						min: 0,
						max: 24,
						callback: function (val) {
							console.log("lll" + val);
							me.data.value = val;
							$scope.$apply();
						}
					});
					break;
				case 'annually':
					me.data.value = 25;
					$rootScope.$broadcast('resetSavings', {
						sliderId: 'savings_slider',
						defaultVal: me.data.value,
						min: 0,
						max: 40,
						callback: function (val) {
							console.log("jjj" + val);
							me.data.value = val;
							$scope.$apply();
						}
					});
					break;
			}
		};
		//capture the change event from slider to update default value in scope
		$rootScope.$on('setDefaultVal', function (e, duration) {
			switch (duration) {
				case 'monthly':
					me.data.value = 6;
					break;
				case 'annually':
					me.data.value = 25;
					break;
			}
			$scope.$apply();
		});

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
			$rootScope.$broadcast('resetSlider', {
				sliderId: 'debitTransfer_slider',
				defaultVal: 2,
				min: 0,
				max: 5
			});
		}

		/**
		 * Function: resetDepositTransfer
		 */

		$scope.resetDepositTransfer = function () {
			$scope.sce.data.monthlyCreditsPay = 0;
			$scope.hisa.specs.sliderDepositTransfer.defaultValue = 0;
			$rootScope.$broadcast('resetSlider', {
				sliderId: 'depositTransfer_slider',
				defaultVal: 0,
				min: 0,
				max: 100
			});
		};
		/**
		 * Function: hideDynamiclbl
		 * compares the current value with default values and return the flag
		 */

		$scope.hideDynamiclbl = function (txtVal, sliderVal, txtDef, sliderDef) {
			return txtVal === txtDef && sliderVal === sliderDef;
		};

		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////
		initChart();

		/////////////
		// Watches //
		/////////////
		$scope.$watch("sce.data.savingDuration", function (newValue) {
			$scope.getDefaultVal(newValue);
		});


		// $scope.$watch("sce.data.value", function (newValue) {
		// 	if(me.data.savingDuration === 'monthly'){
		// 		if(newValue >= me.data.sliderSavingDurationMonthly.min && newValue <= me.data.sliderSavingDurationMonthly.max){
		// 			me.data.savingDurationError = false;
		// 			return true;
		// 		}else{
		// 			me.data.savingDurationError = true;
		// 			$scope.getDefaultVal(me.data.savingDuration,true);
		// 		}
		// 	}else if(me.data.savingDuration === 'annually') {
		// 		if(newValue >= me.data.sliderSavingDurationYearly.min && newValue <= me.data.sliderSavingDurationYearly.max){
		// 			me.data.savingDurationError = false;
		// 			return true;
		// 		}else{
		// 			me.data.savingDurationError = true;
		// 			$scope.getDefaultVal(me.data.savingDuration,true);
		// 		}
		// 	}
		// });

		// create dynamic value for open account link based on the savings
		$scope.$watch("sce.data.savingsAccountType", function (newValue) {
			switch (newValue) {
				case '1':
					$rootScope.$broadcast('openAccountLink', '#link1')
					break;
				case '2':
					$rootScope.$broadcast('openAccountLink', '#link2')
					break;
				case '3':
					$rootScope.$broadcast('openAccountLink', '#link3')
					break;
			}
		});
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