(function($,jQuery){
brCalc.controller('retirementSavingsCalculatorCtrl', function($scope, scenarios, contentManager) {
	var me = this;
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(rscContent || {},'rscContent').getContent('rscContent');
	// Get the scenarios reference, including data, results and validation objects
	this.retirementSavingsData = scenarios.getScenarios('retirementSavingsData');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.retirementSavings');
	
	this.validation = this.retirementSavingsData.validation;

	this.data = this.retirementSavingsData.data;

	$scope.$watch('rsc.data.addSpouse',function(){
		me.data.isScenarioViewSpouse = false;
	});
});
})($cmsj,$cmsj);