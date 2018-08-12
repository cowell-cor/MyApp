(function($,jQuery){
brCalc.controller('hisaScenarioCtrl', function($scope,$attrs,scenarios,$filter,contentManager) {
		var me = this,
			hisa = scenarios.getScenarios('hisaData'),
			scenario = hisa.getScenario($attrs.scenarioIndex),
			rscData = hisa.data,
			content = $scope.hisa.content,
			constants = $scope.hisa.data.constants,
			currentYear = new Date().getFullYear();

		$scope.collapse = {
			savings:false,
			debitTransfer:true,
			depositTransfer:true
		};	
		$scope.sliderSavingDuration = {
			defaultValue : 6,
			min : 1,
			max : 24,
			step: 1,
			label: 'savings'
		};
		$scope.sliderDepositTransfer = {
			defaultValue : 0,
			min : 0,
			max : 100,
			step: 1,
			label: 'depositTransfer'
		};

		//////////////////////////////
		// View accessible variable //
		//////////////////////////////
		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;

		this.results = scenario.results;

		this.validation = scenario.validation;

		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////
		initChart();
//////////////////////////////
// FIN FONCTIONS DE CALCULS //
//////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


		function initChart() {
			me.results.chartHISA = (function(){

				var config = contentManager.getHighchartConfig('chartHISA');

				return config;
			})();
		}
	});
})($cmsj,$cmsj);