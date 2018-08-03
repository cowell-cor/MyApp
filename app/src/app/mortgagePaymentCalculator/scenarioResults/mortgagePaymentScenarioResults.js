(function($,jQuery){
brCalc.controller('mortgagePaymentScenarioResultsCtrl', function($scope,scenarios,$attrs) {
	var scenario = scenarios.getScenario('mortgagePaymentData',$attrs.scenarioIndex);

	this.data = scenario.data;
	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
});
})($cmsj,$cmsj);