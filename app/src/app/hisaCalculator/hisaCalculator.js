(function($,jQuery){
brCalc.controller('hisaCalculatorCtrl', function($scope, scenarios, contentManager) {
	var me = this;
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(hisaContent || {},'hisaContent').getContent('hisaContent');
	// Get the scenarios reference, including data, results and validation objects
	this.hisaData = scenarios.getScenarios('hisaData');
	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.hisa');
	
	this.validation = this.hisaData.validation;

	this.data = this.hisaData.data;

	// $scope.$watch('rsc.data.addSpouse',function(){
	// 	me.data.isScenarioViewSpouse = false;
	// });
});
})($cmsj,$cmsj);