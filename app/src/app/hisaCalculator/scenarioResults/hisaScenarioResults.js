(function ($, jQuery) {
	brCalc.controller('hisaScenarioResultsCtrl', ["$scope", "$attrs", "scenarios", "contentManager", function ($scope, $attrs, scenarios, contentManager) {
		var scenario = scenarios.getScenario('hisaData', $attrs.scenarioIndex, contentManager),
			me = this;

		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;
		this.results = scenario.results;


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
						console.log(this);
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


		/**
		 * Function to show or hide disclaimer text
		 */
		$scope.showDisclaimer = function () {
			$scope.hideFlag=!$scope.hideFlag;
		}
		$scope.hideFlag=false;

	}]);
})($cmsj, $cmsj);