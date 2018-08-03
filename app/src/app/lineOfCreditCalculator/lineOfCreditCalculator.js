(function($,jQuery){
brCalc.controller('lineOfCreditCalculatorCtrl', function($scope, scenarios, contentManager) {
	// Get the scenarios reference, including data, results and validation objects
	this.lineOfCreditData = scenarios.getScenarios('lineOfCreditData');
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(threeInOneDataContent.lineOfCredit,'lineOfCredit').getContent('lineOfCredit');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.lineOfCredit');

	this.isOpenAmortizationTable = false;

});
})($cmsj,$cmsj);