(function($,jQuery){
brCalc.controller('mortgagePaymentCalculatorCtrl', function($scope,scenarios,contentManager) {
	// Get the scenarios reference, including data, results and validation objects
	this.mortgagePaymentData = scenarios.getScenarios('mortgagePaymentData');
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(threeInOneDataContent.mortgagePayment,'mortgagePayment').getContent('mortgagePayment');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.mortgagePayment');
});
})($cmsj,$cmsj);