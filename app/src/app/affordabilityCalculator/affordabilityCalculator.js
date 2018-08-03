(function($,jQuery){
brCalc.controller('affordabilityCalculatorCtrl', function($scope,$filter,scenarios,contentManager) {

	var me = this,
		// Get the scenarios reference, including data, results and validation objects
		affordabilityData = scenarios.getScenarios('affordability'),
		sce = affordabilityData.getScenario(0),

		updatingTotalDebts = false;
	// Set the content for the tool (language-dependant content found in config)
	this.content = contentManager.setContent(threeInOneDataContent.affordability,'affordability').getContent('affordability');

	this.data = sce.data;

	// Get the fieldspecs from the config
	// (HAS to be fetched AFTER setting all the content; fieldspecs have content to be updated)
	this.specs = contentManager.getConfig('fieldspecs.affordability');

	this.validation = sce.validation;

	$scope.collapse = {
		debtsDetails:true
	};
	
	this.getContent = function(key){
		var lbl="",
			cObj = me.content&&me.content[key];
		if(cObj&&cObj.label){
			lbl = cObj.label;
		}
		return lbl;
	};

	this.results = sce.results;

	this.rates = { };

	this.clearScenario = function(id) {
		sce.resetScenario();
	};

	initChart();

	/* Master watch */
	$scope.$watch('aff.data.totalOtherDebt',function(){
		if (updatingTotalDebts===true) {
			updatingTotalDebts = false;
		}
		else {
			$scope.collapse.debtsDetails = true;
			updateTotalOtherDebtData();
		}
	});

	$scope.$watch('aff.data.otherDebt',function(){
		if (!$scope.collapse.debtsDetails) {
			updatingTotalDebts = true;
			updateDebtData();
		}
	},true);

	$scope.$watchCollection("aff.data", function(d) {
		calculate();
	});

	/* This method will return the rates from the feed */
	function getLoanToValueRates(){
		return [
			{ltv:0.85,mortgageInsurance:0.018},
			{ltv:0.9,mortgageInsurance:0.024},
			{ltv:1,mortgageInsurance:0.036}
		]
	}

	function updateDebtData () {
		var total = 0, x;
		for(x in me.data.otherDebt){
			me.data.otherDebt[x] = stringToNumber(me.data.otherDebt[x]);
			total+=me.data.otherDebt[x];
		}
		me.data.totalOtherDebt = total;
	}

	function updateTotalOtherDebtData () {
		var x;
		for(x in me.data.otherDebt){
			me.data.otherDebt[x] = 0;
		}
	}

	function getInsuranceAmount(percentage, amount){
		var insuranceAmount,
			ratesObj,
			x,
			loanToValueRates = getLoanToValueRates();
		if(percentage <= 0.8){
			insuranceAmount = 0;
		}else{
			for(x in loanToValueRates){
				ratesObj = loanToValueRates[x];
				percent = ratesObj.ltv;
				mortgageInsurance = ratesObj.mortgageInsurance;
				
				if(percentage < percent || percent === 1){
					insuranceAmount = mortgageInsurance * amount;
					break;
				}
			}
		}

		return insuranceAmount;
	}

	// Affordability highchart - Custom formatting
	function initChart () {

		me.results.pieChart = (function(){
			var config = contentManager.getHighchartConfig('affordability');
			// Tooltip formatting
			config.tooltip.formatter = function(){
				return this.key + ': <strong>' + $filter('percent')(this.point.percentage/100,1) + '</strong>';
			};
			return config;
		})();
	}

	function calculate(){
		//console.log("calculate");
		var results = me.results,
			data = me.data,
			ratesObj,
			percent,
			downPaymentPart;


		//=F6/12
		results.monthlyIncome = data.annualIncome/12;

		//=F6/12*0,32-F7-F8-(F9*0,5)
		results.piBasedOnGDSR = results.monthlyIncome * 0.32 - data.propertyTaxes - data.heatingCosts - (data.condoFees * 0.5);

		//=F6/12*0,4-F7-F8-(F9*0,5)-F10
		results.piBasedOnTDSR = results.monthlyIncome * 0.4 - data.propertyTaxes - data.heatingCosts - (data.condoFees * 0.5) - data.totalOtherDebt;
		//=MIN(F16:F17)
		results.piToBeUsed = Formula.MIN(results.piBasedOnGDSR,results.piBasedOnTDSR);

		/* Step 2 */
		
		results.monthlyEquivalentRateFactor = Formula.POWER(1+(data.interestRate/2),1/6)-1;

		/* Step 3 */

		results.amortizationPeriod = data.amortization*12;

		//=VA(F20;F12*12;-F18;0;0)
		results.mortgageAmountBasedOnPI = Formula.PV(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.piToBeUsed,0,0);
		
		//LTV -> =F24/(F24+F13)
		results.mortgageAmountBasedOnPIPercentage = results.mortgageAmountBasedOnPI / (results.mortgageAmountBasedOnPI + data.downPaymentAmount);

		if(me.data.downPaymentAmount < 25000){
			downPaymentPart = data.downPaymentAmount/0.05;
		}else{
			downPaymentPart = 500000 + (data.downPaymentAmount - 25000) / 0.1;
		}

		//=ARRONDI.INF(MAX(MIN(SI(F13<25000;F13/0,05;500000+(F13-25000)/0,1);999999,99);F13/0,2);0)
		results.mortgageAmountBasedDownPayment = Formula.ROUNDDOWN(Formula.MAX(Formula.MIN(downPaymentPart,999999.99),data.downPaymentAmount/0.2),0);

		results.mortgageAmountBasedDownPaymentPercentage = (results.mortgageAmountBasedDownPayment - data.downPaymentAmount) / results.mortgageAmountBasedDownPayment;

		results.mortgageAmountToBeUsed = Formula.MIN(results.mortgageAmountBasedOnPI,results.mortgageAmountBasedDownPayment);
		
		/* Step 4 */

		results.insuranceAmountBasedOnPI = getInsuranceAmount(results.mortgageAmountBasedOnPIPercentage,results.mortgageAmountBasedOnPI);
		
		results.insuranceAmountBasedOnDownPayment = getInsuranceAmount(results.mortgageAmountBasedDownPaymentPercentage ,results.mortgageAmountBasedDownPayment-data.downPaymentAmount);

		results.insuranceAmountToBeUsed =Formula.MIN(results.insuranceAmountBasedOnPI,results.insuranceAmountBasedOnDownPayment);

		//=F16+VPM(F21;F12*12;-F29)
		results.piBasedWithInsuranceOnGDSR = results.piBasedOnGDSR + Formula.PMT(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.insuranceAmountBasedOnPI,0,0);
		//=F17+VPM(F21;F12*12;-F30)
		results.piBasedWithInsuranceOnTDSR = results.piBasedOnTDSR + Formula.PMT(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.insuranceAmountBasedOnDownPayment,0,0);

		/* Step 4 */
		
		if(results.mortgageAmountToBeUsed === results.mortgageAmountBasedDownPayment){
			results.maximumPurchasePrice = results.mortgageAmountToBeUsed;
			results.totalPrincipalYouCanAfford = results.mortgageAmountToBeUsed - data.downPaymentAmount;
		}else{
			results.maximumPurchasePrice = results.mortgageAmountToBeUsed + data.downPaymentAmount;
			results.totalPrincipalYouCanAfford = results.mortgageAmountToBeUsed;
		}

		results.downPaymentPercentage =  data.downPaymentAmount/results.maximumPurchasePrice;
		
		results.totalDownPaymentAmount = data.downPaymentAmount;
		results.totalInsuranceAmount = results.insuranceAmountToBeUsed;

		results.totalMortgageYouCanAfford = results.totalPrincipalYouCanAfford + results.totalInsuranceAmount;
		
		//=SI(F18=F32;MIN(F16:F17);SI(F26=F25;VPM($F$21;F12*12;-F40);MIN(F32:F33)))
		if(results.piToBeUsed === results.piBasedWithInsuranceOnGDSR){
			results.totalMonthlyMortgageYouCanAfford = results.piToBeUsed
		}else if(results.mortgageAmountToBeUsed === results.mortgageAmountBasedDownPayment){
			results.totalMonthlyMortgageYouCanAfford = Formula.PMT(results.monthlyEquivalentRateFactor,results.amortizationPeriod,-results.totalMortgageYouCanAfford,0,0);
		}else{
			results.totalMonthlyMortgageYouCanAfford = Formula.MIN(results.piBasedWithInsuranceOnGDSR,results.piBasedWithInsuranceOnTDSR);
		}

		results.totalMonthlyExpenses = results.totalMonthlyMortgageYouCanAfford + me.data.heatingCosts + me.data.propertyTaxes + me.data.condoFees + me.data.totalOtherDebt;

		updateHighchart()
		
	}

	function updateHighchart(){
		var seriesData,
			x = 0,
			len,
			item,
			config = angular.extend({},me.results.pieChart);

		/* Add data into series */
		seriesData = config.series&&config.series[0]&&config.series[0].data;
		if(seriesData){
			len = seriesData.length;
			for(;x<len;x++){
				item = seriesData[x];
				if(item.dataKey){
					item.y = getDataAtScope(item.dataKey,me);
				}
				if(item.contentKey){
					item.name = me.getContent(item.contentKey);
				}
			}
			config.series = [{data:seriesData}];
			me.results.graphSeries = seriesData; // for html legend
			me.results.pieChart = config; // Update highchart data
		}
	}
});
})($cmsj,$cmsj);