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
		/**
		 * Reset the value of savings slider based on monthly or anually
		 * @param {monthly/annually} type 
		 */
		$scope.getDefaultVal = function (type) {
			$scope.value = null;
			switch (type) {
				case 'monthly':
					$scope.value = 6;
					//tigger the event to updated the slider color bar
					$rootScope.$broadcast('resetSavings', {
						sliderId: 'savings_slider',
						defaultVal: $scope.value,
						min:0,
						max:24,
						callback:function(val){
							console.log("lll"+val);
							$scope.value=val;
							$scope.$apply();
						}
					});
					break;
				case 'annually':
					$scope.value = 25;
					$rootScope.$broadcast('resetSavings', {
						sliderId: 'savings_slider',
						defaultVal: $scope.value,
						min: 0,
						max: 40,
						callback:function(val){
							console.log("jjj"+val);
							$scope.value=val;
							$scope.$apply();
						}
					});
					break;
			}

			return $scope.value;
		};
		//capture the change event from slider to update default value in scope
		$scope.$on('getDefaultVal', function(e,duration){
			switch (duration) {
				case 'monthly':
					$scope.value = 6;
					break;
				case 'annually':
					$scope.value = 25;
					break;
			}
			console.log("bbb"+$scope.value);
			$scope.$apply();
		} );

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
		}
		/**
		 * Function: hideDynamiclbl
		 * compares the current value with default values and return the flag
		 */

		$scope.hideDynamiclbl = function (txtVal, sliderVal, txtDef, sliderDef) {
			return txtVal === txtDef && sliderVal === sliderDef;
		}

		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////
		initChart();

		/////////////
		// Watches //
		/////////////
		// $scope.$watch("rsc.data.isScenarioViewSpouse",function() {
		// 	if (rscData.isScenarioViewSpouse===me.results.isSpouse) {
		// 		calculate();
		// 	}
		// });
		$scope.$watch("sce.data.savingDuration", function (newValue, oldvalue) {
			$scope.getDefaultVal(newValue);
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