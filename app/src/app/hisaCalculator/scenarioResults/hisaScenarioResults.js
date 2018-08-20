(function ($, jQuery) {
	brCalc.controller('hisaScenarioResultsCtrl', ["$scope", "$attrs", "scenarios", "contentManager" ,"$filter", "$rootScope",function ($scope, $attrs, scenarios, contentManager, $filter, $rootScope) {
		var scenario = scenarios.getScenario('hisaData', $attrs.scenarioIndex, contentManager),
			me = this;

		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;
		this.results = scenario.results;
		$rootScope.$on('openAccountLink', function(event, link) {
			$scope.openActLink = link;
		 });

		//me.results.chartHISA = contentManager.getHighchartConfig('chartHISA');
		initChart();

		function initChart() {
		me.results.chartHISA = (function(){

			var config = contentManager.getHighchartConfig('chartHISA');
			// Tooltip formatting
			config.tooltip.formatter = function(){
				var sum = 0,s;
				$.each(this.points, function () {
				sum+= this.y;
				});
				s = '<span style="font-size:16px;color:#39709A;">After ' + this.x + ' you will have:</span><br/><span style="font-weight: bold;font-size:18px;color:#3F3F3F;">Total Savings ' + $filter('currency')(sum,2)+'</span>';
				$.each(this.points, function () {
					
					s += '<br/><span style="float:left;font-size:14px;color:#3F3F3F;font-weight: bold;;">' + this.series.name + '</span><span  style="float:right;font-size:14px;color:#3F3F3F;font-weight: bold;"> ' + $filter('currency')(this.y,2) +'</span>';
					sum+= this.y;
				
				});
				return s;
			};
			return config;
		  })();
		}

		//hide boost Savings
		$scope.isBoostSavings = false;
		/**
		 * Function to show or hide disclaimer text
		 */
		$scope.showDisclaimer = function () {
			$scope.isBoostSavings = !$scope.isBoostSavings;
		}
		/**
		 * Show chart or table based onthe selection
		 * default, chart is always shown
		 */
		$scope.isChartOpen = true;
		$scope.isTableOpen = false;
		$scope.toggleChart = function (val) {
			switch (val) {
				case 'table':
					$scope.isTableOpen = true;
					$scope.isChartOpen = !$scope.isTableOpen;
					break;
				case 'graph':
					$scope.isTableOpen = false;
					$scope.isChartOpen = !$scope.isTableOpen;
					break;
			}
		}

		/**
		 * Dummy table result data
		 */
		$scope.results = [{
				deposit: '9999',
				interest: '99.99',
				total: '999999.99'
			},
			{
				deposit: '9999',
				interest: '99.99',
				total: '999999.99'
			},
			{
				deposit: '9999',
				interest: '99.99',
				total: '999999.99'
			},
			{
				deposit: '9999',
				interest: '99.99',
				total: '999999.99'
			},
			{
				deposit: '9999',
				interest: '99.99',
				total: '999999.99'
			},
			{
				deposit: '9999',
				interest: '99.99',
				total: '999999.99'
			}
		]
	}]);
})($cmsj, $cmsj);