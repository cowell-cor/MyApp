(function($,jQuery){
brCalc.controller('lineOfCreditScenarioReportCtrl', function($scope,scenarios,$attrs,$filter) {
	var me = this,
		scenariosData = scenarios.getScenarios('lineOfCreditData');
	this.scenarios = scenariosData.data.scenarios;
	this.results = scenariosData.results;
});
})($cmsj,$cmsj);