(function ($, jQuery) {
	brCalc.controller('prePaymentScenarioCtrl', function ($scope, $attrs, scenarios, $filter, contentManager) {
		var me = this,
			prePayment = scenarios.getScenarios('prePaymentData'),
			scenario = prePayment.getScenario($attrs.scenarioIndex);
		// Set the content for the tool (language-dependant content found in config)
		this.content = contentManager.setContent(prePaymentContent || {}, 'prePaymentContent').getContent('prePaymentContent');
		this.specs = contentManager.getConfig('fieldspecs.prePayment');

		//////////////////////////////
		// View accessible variable //
		//////////////////////////////
		me.data = scenario.data;

		this.data.scenarioIndex = $attrs.scenarioIndex;

		this.results = scenario.results;

		this.validation = scenario.validation;

		$scope.$watch("sce.data.remainingAmount", function (newValue) {
			if(newValue < 0){
				me.data.remainingAmount = 0;
			}else {
				me.data.remainingAmount = newValue;
			}
		});
		$scope.$watch("sce.data.prePaymentAmount", function (newValue) {
			if(newValue < 0){
				me.data.prePaymentAmount = 0;
			}else {
				me.data.prePaymentAmount = newValue;
			}
		});

		$scope.$watch("sce.data.lumpSumAmount", function (newValue) {
			if(newValue < 0){
				me.data.lumpSumAmount = 0;
			}else {
				me.data.lumpSumAmount = newValue;
			}
		});

		$scope.$watch("sce.data.borrowAmount", function (newValue) {
			if(newValue < 0){
				me.data.borrowAmount = 0;
			}else {
				me.data.borrowAmount = newValue;
			}
		});	
		$scope.$watch("sce.data.interestRate", function (newValue) {
			if(newValue < 0){
				me.data.interestRate = 0;
			}else {
				me.data.interestRate = newValue;
			}
		});

		$scope.$watch("sce.data.originalDiscountRate", function (newValue) {
			if(newValue < 0){
				me.data.originalDiscountRate = 0;
			}else {
				me.data.originalDiscountRate = newValue;
			}
		});

		

		$scope.$watchCollection("sce.data", updateCalculations, true);

		function updateCalculations(newData,oldData){
			var changedDataName = getChangedPropertyName(oldData,newData);
			console.log(changedDataName);
			$scope.getEstimatedPrepaymentPenalty(me.data.mortgageType);
		}

		$scope.getPrepaymentSubjectToPenalty = function(){
			if(me.data.remainingAmount === me.data.prePaymentAmount){
				return me.data.prePaymentAmount + me.data.lumpSumAmount;
			}else{	
				return me.data.prePaymentAmount - (me.data.borrowAmount * me.data.annualPaymentPercentage) + me.data.lumpSumAmount;
			}
		}

		$scope.getPenaltyFreePayment = function(){

		}

		$scope.getEstimatedPrepaymentPenalty = function(type){
			var amount;
			switch(type){
				case 'Fixed':
					var threeMonthPenalty = ($scope.getPrepaymentSubjectToPenalty() * me.data.interestRate ) / 4;
					amount = Math.max(calulateInterestRateDeferential(), threeMonthPenalty);
					//amount = ($scope.getPrepaymentSubjectToPenalty() * me.data.interestRate ) / 4;
				break;
				case 'Variable':
					//=(B18*B7)/4
					amount = ($scope.getPrepaymentSubjectToPenalty() * me.data.interestRateSimilarTerm ) / 4;
				break;
			}
			return amount;
		}

		function calulateInterestRateDeferential(){
			var amount;
			// =(((B7-(B9-B10))*B18)*B15)/12
			amount = (((me.data.interestRate - (parseFloat(me.data.interestRateSimilarTerm) - (me.data.originalDiscountRate / 100))) *  $scope.getPrepaymentSubjectToPenalty()) * getMonthCount() ) / 12;
			return amount;
		}

		function getMonthCount(todayDate, maturityDate){
			// TO DO - Fetch maturity Date from calendar
			todayDate = new Date()
			maturityDate = new Date(2025,03,30) // remember this is equivalent to 06 01 2010
			//dates in js are counted from 0, so 05 is june
			var diff = Math.floor(todayDate.getTime() - maturityDate.getTime());
			var day = 1000 * 60 * 60 * 24;

			var days = Math.floor(diff/day);
			var months = Math.floor(days/31) + 1;
			
			return -(months);
    	}

		// TOP: 3 months interest penalty
		// =(B18*B7)/4
		// (Prepayment Subjected to Penality * sce.data.interestRate)/4

		// 1. Penalty free payment
		//sce.data.borrowAmount * Annual priviledge payment percentage

		// 2. Prepayment Subjected to Penality
		//=IF(B3=B4,B4+B5,B4-B16+B5)
		// if(sce.data.remainingAmount === sce.data.prePaymentAmount) sce.data.prePaymentAmount + sce.data.lumpSumAmount 
		// else sce.data.prePaymentAmount - Penalty free payment + sce.data.lumpSumAmount 






	});
})($cmsj, $cmsj);