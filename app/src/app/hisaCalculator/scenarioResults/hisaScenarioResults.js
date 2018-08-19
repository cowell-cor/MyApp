(function ($, jQuery) {
	brCalc.controller('hisaScenarioResultsCtrl', ["$scope", "$attrs", "scenarios", "contentManager","$rootScope", function ($scope, $attrs, scenarios, contentManager,$rootScope) {
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
			me.results.chartHISA = (function () {

				var config = contentManager.getHighchartConfig('chartHISA');
				// Tooltip formatting
				config.tooltip.formatter = function () {
					var sum = 0,
						s;
					$.each(this.points, function () {
						sum += this.y;
					});
					s = '<span>After ' + this.x + ' you will have:</span><br/><b>Total Savings $' + sum;
					$.each(this.points, function () {
						me.results.seriesName = this.series.name;
						s += '<br/>' + this.series.name + ': $' +
							this.y;
						sum += this.y;

					});
					me.results.total = sum;

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