(function ($, jQuery) {
	brCalc.controller('prePaymentScenarioCtrl', function ($scope, $rootScope, $attrs, scenarios, $filter, contentManager) {
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

		//capture the change event from calendar to update default value in scope
		$rootScope.$on('setMaturityDate', function (e, value) {
			me.data.maturityDate = value;
		});

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
		$scope.$watch("sce.data.interestRate", function (newValue, oldValue) {
			if(Math.sign(newValue) === -1 || newValue < 0){
				me.data.interestRate = 0;
			}else {
				me.data.interestRate = newValue;
			}
		});

		$scope.$watch("sce.data.originalDiscountRate", function (newValue) {
			if(Math.sign(newValue) === -1 || newValue < 0){
				me.data.originalDiscountRate = 0;
			}else {
				me.data.originalDiscountRate = newValue;
			}
		});

		$scope.$watchCollection("sce.data", updateCalculations, true);

		function updateCalculations(){
			$scope.getEstimatedPrepaymentPenalty(me.data.mortgageType);
			$scope.getPenaltyFreePayment();
		}

		$scope.getPrepaymentSubjectToPenalty = function(){
			var amount = 0;
			if(me.data.remainingAmount === me.data.prePaymentAmount){
				amount =  me.data.prePaymentAmount + me.data.lumpSumAmount;
			}else{	
				amount = me.data.prePaymentAmount - (me.data.borrowAmount * me.data.annualPaymentPercentage) + me.data.lumpSumAmount;
			}
			me.data.prepaymentSubjectToPenalty = amount;
			return amount;
		};

		$scope.getPenaltyFreePayment = function(){
			return (me.data.borrowAmount * me.data.annualPaymentPercentage);
		};

		$scope.getEstimatedPrepaymentPenalty = function(type){
			var amount,
				threeMonthPenalty = ($scope.getPrepaymentSubjectToPenalty() * me.data.interestRate ) / 4;
			switch(type){
				case 'Fixed':
					result = calulateInterestRateDeferential();
					amount = (result === -0 ? threeMonthPenalty : Math.max(result, threeMonthPenalty));
				break;
				case 'Variable':
					//=(B18*B7)/4
					amount = threeMonthPenalty;
				break;
			}
			return (amount >= 0 ? amount : -amount);
			//return amount;
		};

		$scope.getPrepaymentSubjectToPenaltyAmount = function(){
			var amount = $scope.getPrepaymentSubjectToPenalty();
			return (amount >= 0 ? amount : -amount);
		}

		function calulateInterestRateDeferential(){
			var amount;
			// =(((B7-(B9-B10))*B18)*B15)/12
			amount = (((me.data.interestRate - (me.data.interestRateSimilarTerm - me.data.originalDiscountRate)) *  $scope.getPrepaymentSubjectToPenalty()) * getMonthCount() ) / 12;
			return amount;
		}

		function getMonthCount(){
			var todayDate = new Date(),
			maturityDate = me.data.maturityDate;

			if(todayDate && maturityDate){
				//dates in js are counted from 0
				var diff = Math.floor(todayDate.getTime() - maturityDate.getTime()),
					day = 1000 * 60 * 60 * 24,
					days = Math.floor(diff/day),
					months = Math.floor(days/31) + 1;

				return (months >= 0 ? months : -months);
			}
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

		//minimum calender value
		function getCurrentDate(date){
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();

			if(dd < 10) {
				dd = '0'+dd;
			} 

			if(mm < 10) {
				mm = '0'+mm;
			} 

			return (yyyy+ '-' + mm+ '-' + dd);
		}
		//get current date in given foramt
		var currentDate = new Date();
		$scope.minDate = getCurrentDate(currentDate);

		//add 10 years to current date
		var a5FromNow = currentDate;
		a5FromNow.setFullYear(a5FromNow.getFullYear() + 10);
		$scope.maxDate = getCurrentDate(a5FromNow);
	});
})($cmsj, $cmsj);