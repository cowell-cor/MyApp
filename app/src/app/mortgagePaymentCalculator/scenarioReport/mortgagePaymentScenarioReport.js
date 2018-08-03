(function($,jQuery){
brCalc.controller('mortgagePaymentScenarioReportCtrl', function($scope,scenarios,$attrs,$filter,contentManager) {
	var me = this,
		scenariosData = scenarios.getScenarios('mortgagePaymentData');
	this.scenarios = scenariosData.data.scenarios;
	this.results = scenariosData.results;

	initChart();
	updateHighchart();

	function initChart() {
		me.results.compareGraphConfig = (function(){
			var config = contentManager.getHighchartConfig('chartCompareMPC');
			
			// Tooltip formatting
			config.tooltip.formatter = function(){
				var str=$scope.content.units.year,
					i=0,
					pts=this.points,
					len=pts.length;

				str = '<strong>'+str[0].toUpperCase()+str.slice(1);
				str += ' '+this.x+'</strong><br/>' 
				for (;i<len;i++) {
					str+='<strong>'+pts[i].series.name+'</strong>: '+$filter('currency')(pts[i].y,2)+'<br/>';
				}
				return str;
			};

			return config;

		})();
	}

	function updateHighchart(){
		var scenarios = me.scenarios,
			len = scenarios.length,
			scResults = [],
			maxAmortization = 0,
			config = angular.extend({},me.results.compareGraphConfig),
			categories = [],
			series = [],
			i=0,
			j=0,
			val;

		for (;i<len;i++) {
			scResults.push(scenarios[i].results.current);
			maxAmortization = maxAmortization<scResults[i].paymentAmortization?scResults[i].paymentAmortization:maxAmortization;
		}

		for(i=0;i<maxAmortization;i++){

			for (j=0;j<scResults.length;j++) {

				if (!series[j]) {
					series[j] = {
						name:$scope.mpc.content.compareScenarios['scenario_'+j].name,
						color:$scope.mpc.content.compareScenarios['scenario_'+j].color,
						data:[],
						annualPaymentList:scResults[j].annualPaymentList
					};
				}
				val = series[j].annualPaymentList[i]&&series[j].annualPaymentList[i].balance||0;
				series[j].data.push(val);

				if ( !(i+1<maxAmortization) ) {
					delete series[j].annualPaymentList;
				}
			}
			categories[i] = i + 1;
		}
		
		config.xAxis.categories = categories;
		config.series = series;
		
		me.results.compareGraphConfig = config;
	}

});
})($cmsj,$cmsj);