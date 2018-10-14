(function($,jQuery){
brCalc.controller('prePaymentCalculatorCtrl', function($scope, scenarios, contentManager) {
	var me = this;
	// Set the content for the tool (language-dependant content found in config)
	//this.content = contentManager.setContent(prePaymentContent || {},'prePaymentContent').getContent('prePaymentContent');
	// Get the scenarios reference, including data, results and validation objects
	//this.prePaymentData = scenarios.getScenarios('prePaymentData');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	//this.specs = contentManager.getConfig('fieldspecs.prePayment');
	
	//this.validation = this.prePaymentData.validation;

});
})($cmsj,$cmsj);