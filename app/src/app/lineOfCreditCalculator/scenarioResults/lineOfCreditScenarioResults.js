(function($,jQuery){
brCalc.controller('lineOfCreditScenarioResultsCtrl', function($scope,$attrs,scenarios) {
	var scenario = scenarios.getScenario('lineOfCreditData',$attrs.scenarioIndex);

	this.data = scenario.data;
	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
});
})($cmsj,$cmsj);