(function($,jQuery){
brCalc.controller('retirementSavingsScenarioResultsCtrl', function($scope,$attrs,scenarios, $location) {
	var scenario = scenarios.getScenario('retirementSavingsData',$attrs.scenarioIndex),
		me = this;

	this.data = scenario.data;
	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
});
})($cmsj,$cmsj);