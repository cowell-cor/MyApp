(function($,jQuery){
brCalc.controller('hisaScenarioCtrl', function($scope,$attrs,scenarios,$filter,contentManager) {
		var me = this,
			hisa = scenarios.getScenarios('hisaData'),
			scenario = hisa.getScenario($attrs.scenarioIndex),
			rscData = hisa.data,
			content = $scope.hisa.content,
			constants = $scope.hisa.data.constants,
			currentYear = new Date().getFullYear();

		$scope.collapse = {
			savings:false,
			debitTransfer:true,
			depositTransfer:true
		};	
		$scope.sliderSavingDuration = {
			defaultValue : 6,
			min : 1,
			max : 24,
			step: 1,
			label: 'savings'
		};
		$scope.sliderDepositTransfer = {
			defaultValue : 0,
			min : 0,
			max : 100,
			step: 1,
			label: 'depositTransfer'
		};
		// FIX for annual limit for years 2017 and over
		currentYear = currentYear>2016 ? 2016 : currentYear;

		//////////////////////////////
		// View accessible variable //
		//////////////////////////////
		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;

		this.results = scenario.results;

		this.results.isSpouse = Number($attrs.scenarioIndex)!==0;
		this.results.suffix = $attrs.suffix === 'true' ? content.spouseSuffix : $attrs.suffix!==undefined ? $attrs.suffix : '';

		this.validation = scenario.validation;

		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////
		initChart();
		//initValidation();

		/////////////
		// Watches //
		/////////////
		$scope.$watch("hisa.data.isScenarioViewSpouse",function() {
			if (rscData.isScenarioViewSpouse===me.results.isSpouse) {
				calculate();
			}
		});
		$scope.$watch("hisa.data.inflationRate",calculate); // shared value that any scenario can change, and must recalculate again
		$scope.$watch("hisa.data.estimatedROR",calculate); // shared value that any scenario can change, and must recalculate again
		$scope.$watchCollection("sce.data",calculate,true);
		
		////////////////////////
		// Internal functions //
		////////////////////////


		/**
		 * Function: resetDepositTransfer
		 * Usage: Reset value of Deposit Transfer fields
		 */
		$scope.resetDepositTransfer= function(){
			$scope.sce.data.monthlyCreditsPay=0;
		}


		/**
		 * Function: resetDebitTransfer
		 * Usage: Reset value of Deposit Transfer fields
		 */
		$scope.resetDebitTransfer= function(){
			$scope.sce.data.numberOfMonthlyDebitTransactions=0;
		}
		// Important fix : Jan 03 2017 by BR Claudine
		// !! important !!
		// Always look for selected year and return annual limit found
		// If not found, will look for the first previous available year in data.
		function getLimitPerYear (contributionType,year) {
			year = +year;
			if (year===NaN || year < 1990) return;
			if (contributionType==='TFSA' || contributionType==='RRSP' && year!==NaN) {
				if (contributionType==='TFSA') {
					if (constants.annualTFSAcontributionLimit[year]!==undefined) return constants.annualTFSAcontributionLimit[year];
					else return getLimitPerYear(contributionType,--year);
				}
				else if (contributionType==='RRSP') {
					if (constants.annualRRSPcontributionLimit[year]!==undefined) return constants.annualRRSPcontributionLimit[year];
					else return getLimitPerYear(contributionType,--year);
				}
			}
		}
		
		// All min-max generic validation is already taken care of by Validation class 
		// This function is to set special validation only.
		function initValidation () {

			/////////////////////////////////
			// Validation-changing watches //
			/////////////////////////////////
			$scope.$watch("sce.data.initialDepositAmount",function(value){
				me.validation.retirementStartAge.set('min',value+1);
			});

			$scope.$watch("sce.data.retirementStartAge",function(value){
				me.validation.yearsInRetirement.set('max',105-value);
				me.validation.currentAge.set('retirementStartAge',value);
			});

			$scope.$watch("sce.data.yearsInRetirement",function(value){
				me.validation.retirementStartAge.set('max',105-value);
			});

			//////////////////////
			// Validation rules //
			//////////////////////
			me.validation.currentAge.addRule({
				name:'readjust',
				message: content.errorMessages['currentAge'+me.results.suffix]
			});
			// Retirement start age Business rule 
			// 	Special message when a value bellow current age is entered
			me.validation.retirementStartAge.addRule({
				validate:function(value, validationParams){
					if (!(value>=validationParams.min)) this.correctedValue = validationParams.min;
					return value>=validationParams.min;
				},
				priority:1,
				message: content.errorMessages.retirementStartAgeTooLow
			});
			// Current age Business rule 
			// 	Special message when a value is above Retirement start age - reverse validation
			me.validation.currentAge.addRule({
				validate:function(value, validationParams){
					if (validationParams.retirementStartAge) {
						if (value>=validationParams.retirementStartAge) this.correctedValue = validationParams.retirementStartAge-1;
						return value<validationParams.retirementStartAge;
					}
					return true;
				},
				priority:1,
				message: content.errorMessages.currentAgeOverRetirementStartAge
			});

			////////////////////////////////
			// Other validation constants //
			////////////////////////////////
			// Important fix Jan 3 2017
			// me.validation.monthlyRRSPcontribution.set('max',constants.annualRRSPcontributionLimit[currentYear]/12)
			me.validation.monthlyRRSPcontribution.set('max',getLimitPerYear('RRSP',currentYear)/12)
				.set('currentYear',currentYear);
			// Important fix Jan 3 2017
			// me.validation.monthlyTFSAcontribution.set('max',constants.annualTFSAcontributionLimit[currentYear]/12)
			me.validation.monthlyTFSAcontribution.set('max',getLimitPerYear('TFSA',currentYear)/12)
				.set('currentYear',currentYear);
		}


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////
// DÉBUT FONCTIONS DE CALCULS //
////////////////////////////////

		function calculate () {
			var data = me.data,
				results = me.results;

			results.realInterestRate = (1+rscData.estimatedROR)/(1+rscData.inflationRate)-1;

			calculateAllStartAges();
			calculateAnnualInvestments();
			calculateRetirementDetails();

			results.sumS = 0;

			results.retirementDetails.filter(function(yearPeriod,i){
				results.sumS+=yearPeriod.actualS;
				if (yearPeriod.age === data.retirementStartAge) {
					results.retirementStartID = i;
					// B40
					results.savingsAtRetirement = yearPeriod.actualBeginningBalance;
				}
				return true;
			});

			// B41
			results.annualIncomeBasedOnActualSavings = Formula.PMT(results.realInterestRate, data.yearsInRetirement,-1*results.savingsAtRetirement,0,1);
			// B42
			results.estimatedRetirementIncome = results.annualIncomeBasedOnActualSavings + data.oas + data.cpp + data.companyPension + data.nonRegInvestments + data.otherIncome;
			// B43
			results.npvDesiredIncome = Formula.MAX(-1*results.sumS,0);
			// B44
			results.pvOfInvestmentRequired = Formula.MAX(Formula.PV(results.realInterestRate, data.retirementStartAge-data.currentAge,results.sumInvestmentContributions,-1*results.npvDesiredIncome,1),0);
			// B45
			results.pvOfRecommendedInvestement = results.npvDesiredIncome;
			// B46
			results.recommendedInvestmentPerYear = Formula.PMT(results.realInterestRate,data.yearsInRetirement,-1*results.pvOfRecommendedInvestement,0,1);
			// B47
			results.fvSavings = Formula.FV(results.realInterestRate, results.retirementStartID,-1*results.sumInvestmentContributions,-1*data.currentRRSPSavings-data.currentTFSASavings-data.currentNONREGSavings,1);
			// B48
			results.shortfallOrSurplus = results.savingsAtRetirement - results.npvDesiredIncome;
			// Shortfall / Surplus - graph view
			results.surplusGraph = (results.fvSavings - results.pvOfRecommendedInvestement)>0 ? results.fvSavings - results.pvOfRecommendedInvestement : 0;
			results.shortfallGraph = (results.pvOfRecommendedInvestement - results.fvSavings)>0 ? results.pvOfRecommendedInvestement - results.fvSavings : 0;
			// B49
			// Problematic scenario: if currentAge and retirementStartAge are the same, retirementStartID is 0, and Formula.PMT results in NaN
			results.monthlyContributionNeeded = Formula.PMT(results.realInterestRate,results.retirementStartID,0,results.shortfallOrSurplus,1)/12;
			results.totalMonthlyContributions = data.monthlyRRSPcontribution + data.monthlyTFSAcontribution + data.monthlyNONREGcontribution;
			// B50
			results.totalMonthlyContributionsNeeded = results.monthlyContributionNeeded + results.totalMonthlyContributions;
			results.totalMonthlySurplus = results.monthlyContributionNeeded<0 ? results.totalMonthlyContributions - results.totalMonthlyContributionsNeeded : 0;
			// B51
			results.totalAnnualContributionsNeeded = results.totalMonthlyContributionsNeeded * 12;			
			// F34
			results.scenarioType = results.fvSavings < results.npvDesiredIncome ? 1 : results.fvSavings === results.npvDesiredIncome ? 3 : 2;

			// Hypothetical Balance
			calculateHypotheticalBalance();

			// Update highchart
			//updateHighchart();

			return results;
		}

		function calculateAnnualInvestments(){
			var data = me.data,
				results = me.results;

			results.annualRRSPcontribution = data.monthlyRRSPcontribution * 12;
			results.annualTFSAcontribution = data.monthlyTFSAcontribution * 12;
			results.annualNONREGcontribution = data.monthlyNONREGcontribution * 12;
			results.sumInvestmentContributions = results.annualRRSPcontribution + results.annualTFSAcontribution + results.annualNONREGcontribution;
		}
		
		//IF(C2<Input!$B$5,0,IF(AND(C2>=Input!$B$5,C2<Input!$B$5+Input!$B$6),1,2))
		function getStage(ageVal,retirementAge,yearsInRetirement){
			return (ageVal < retirementAge) ? 0 : (retirementAge <= ageVal && ageVal < (retirementAge + yearsInRetirement)) ? 1 : 2;
		}
		
		function getCppStartAge(retirementStartAge){
			return Math.min(70,Math.max(60,retirementStartAge));
		}

		//B60
		function getOasStartAge (retirementStartAge) {
			return Math.min(67,retirementStartAge);
		}

		function calculateRetirementDetails() {
			var data = me.data,
				results = me.results,
				yearsInRetirement = data.yearsInRetirement,
				retirementStartAge = data.retirementStartAge,
				retirementDetails = results.retirementDetails = [],
				i = 0,
				retYears = 0,
				defaultDetails = {
					retYears:0,
					actualCpp:0,
					investmentContributions:0,
					actualOas:0,
					actualBeginningBalance:0,
					hypotheticalBeginningBalance:0,
					actualIncomeRequired:0,
					actualOtherIncome:0,
					incomeNeeded:0
				},
				maxYears = yearsInRetirement + retirementStartAge - data.currentAge,
				age,stage,details;

			for(;i < maxYears; ++i) {

				details = retirementDetails[i] = angular.extend({},defaultDetails);

				age = details.age = data.currentAge + i;
				stage = details.stage = getStage(age,retirementStartAge,yearsInRetirement);

				if (stage !== 0) {
					details.retYears = retYears = age-retirementStartAge;
				}

				// Stage Independant
				// Actual CPP
				if (age>=results.cppStartAge) {
					details.actualCpp = Formula.FV(results.realInterestRate,retYears,0,-1*data.cpp,0);
				}

				// Stage 0 - from now until retirement time
				if (stage === 0) {
					details.investmentContributions = results.sumInvestmentContributions;
				}
				// Stage 1 - from retirement until end term
				else if (stage === 1) {
					// Income needed for year
					if(data.targetIncomeIsPercent) {
						details.incomeNeeded = data.annualIncome * data.targetIncomePercent;
					}
					else {
						details.incomeNeeded = data.targetIncomeAmount;
					}
					//Other income
					details.actualOtherIncome = data.companyPension + data.otherIncome + data.nonRegInvestments;
					// OAS
					if (age>=results.oasStartAge) {
						details.actualOas =  Formula.FV(results.realInterestRate, retYears, 0, -1*data.oas, 0);
					}

					// J37 + K37 + L37
					details.actualTotalIncome = details.actualOas + details.actualCpp + details.actualOtherIncome;
					// I37 - N37
					details.actualIncomeRequired = details.incomeNeeded - details.actualTotalIncome;
				}

				// Beginning balance
				if (i === 0) {
					details.actualBeginningBalance = data.currentRRSPSavings + data.currentTFSASavings + data.currentNONREGSavings;
				}
				else if (!(retirementDetails[i-1].actualEndingBalance<0 || stage === 2)) {
					details.actualBeginningBalance = retirementDetails[i-1].actualEndingBalance * (1+results.realInterestRate);
				}
				else {
					details.actualBeginningBalance = 0;
				}
				// Ending balance
				if (stage === 2) {
					details.actualEndingBalance = retirementDetails[i-1].actualEndingBalance;
				}
				else {
					details.actualEndingBalance = details.actualBeginningBalance + details.investmentContributions - details.actualIncomeRequired;
				}

				// Primary Details - Actual, Column R
				details.actualS = Formula.PV(results.realInterestRate, retYears, 0, details.actualIncomeRequired, 1);
			}
		}

		function calculateHypotheticalBalance () {
			var data = me.data,
				results = me.results,
				retirementDetails = results.retirementDetails,
				i = 0,
				len = retirementDetails.length,
				stage,details;

			for(;i<len;++i) {

				details = retirementDetails[i];

				stage = details.stage;

				details.hypotheticalInvestmentContributions = 0;

				// Beginning balance
				if (i === 0) {
					details.hypotheticalBeginningBalance = results.pvOfInvestmentRequired;
				}
				else if (!(retirementDetails[i-1].hypotheticalEndingBalance<0 || stage === 2)) {
					details.hypotheticalBeginningBalance = retirementDetails[i-1].hypotheticalEndingBalance * (1+results.realInterestRate);
				}
				else {
					details.hypotheticalBeginningBalance = 0;
				}

				// Ending balance
				if (stage === 2) {
					details.hypotheticalEndingBalance = details.hypotheticalBeginningBalance;
				}
				else {
					if (stage === 0) {
						details.hypotheticalInvestmentContributions = Formula.MAX(Formula.MIN(details.investmentContributions,results.totalAnnualContributionsNeeded),0);
					}
					details.hypotheticalEndingBalance = details.hypotheticalBeginningBalance + details.hypotheticalInvestmentContributions - details.actualIncomeRequired;
				}

				details.neededSavings = details.hypotheticalBeginningBalance - details.actualBeginningBalance;
			}
		}

		function calculateAllStartAges () {
			var retirementStartAge = me.data.retirementStartAge;
			me.results.cppStartAge = getCppStartAge(retirementStartAge);
			me.results.oasStartAge = getOasStartAge(retirementStartAge);
		}

//////////////////////////////
// FIN FONCTIONS DE CALCULS //
//////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


		function initChart() {

			me.results.chartRSC = (function(){

				var config = contentManager.getHighchartConfig('chartRSC');

				// Tooltip formatting
				config.tooltip.formatter = function(){
					var str=content.chartTooltip.age,
						pts=this.points,
						allSeries=this.points[0].series.chart.series,
						lenSeries=allSeries.length,
						i=0,
						index=this.points[0].point.index,
						len=pts.length,
						value=0,
						summary;

					str = '<strong>'+str;
					str += this.x+'</strong><br/>';

					for (;i<lenSeries;i++) {
						if (allSeries[i].options.showInLegend && allSeries[i].options.surplusShortfall) {
							options = allSeries[i].options;
							str+='<strong>'+allSeries[i].name+'</strong>: '+$filter('currency')(allSeries[i].yData[index],2)+'<br/>';
							str+='<strong>'+options.actualSavings.name+'</strong>: '+$filter('currency')(options.actualSavings.data[index],2)+'<br/>';
							str+='<strong>'+options.surplusShortfall[index].name+'</strong>: '+$filter('currency')(options.surplusShortfall[index].value,2)+'<br/>';
							break;
						}
					}
					return str;
				};

				return config;
			})();
		}

		// function updateHighchart () {
		// 	var retirementDetails = me.results.retirementDetails,
		// 		i = 0,
		// 		len = retirementDetails.length,
		// 		details,
		// 		categories = [],
		// 		config = angular.extend({},me.results.chartRSC),
		// 		noSavings,
		// 		isSurplusScenario = false,

		// 		surplusText = content.highchart.surplus,
		// 		shortfallText = content.highchart.shortfall,

		// 		surplusData = {},
		// 		savingsGoalData = {
		// 			displayName: content.highchart.savingsGoal,
		// 			name: content.highchart.savingsGoal,
		// 			surplusShortfall: [],
		// 			actualSavings:{},
		// 			data: [],
		// 			visible: true,
		// 			showInLegend: true
		// 		},
		// 		actualSavingsData = {
		// 			name: content.highchart.actualSavings,
		// 			data: [],
		// 			showInLegend: false // Because it musn't be visible in a scenario where no actual savings are registered
		// 		};

		// 	config.series = [];

		// 	for (;i<len;i++) {
		// 		details = retirementDetails[i];

		// 		noSavings = details.actualBeginningBalance === 0;

		// 		if (!isSurplusScenario && details.neededSavings < 0) isSurplusScenario = true;

		// 		actualSavingsData.data.push(details.actualBeginningBalance);

		// 		// Savings Data will always be available on the graph
		// 		// It's this data set that's responsible to display the summary in the tooltip
		// 		savingsGoalData.data.push(details.hypotheticalBeginningBalance);
		// 		savingsGoalData.surplusShortfall.push(details.neededSavings<0?{name:surplusText,value:details.neededSavings*-1}:{name:shortfallText,value:details.neededSavings});

		// 		if (!isSurplusScenario && !noSavings && !actualSavingsData.showInLegend) actualSavingsData.showInLegend = true;

		// 		categories.push(details.age);
		// 	}

		// 	// actualSavingsData.data = surplusData.data;
		// 	$.extend(true,surplusData,actualSavingsData); // same data. This is a question of layering in the series
		// 	savingsGoalData.actualSavings = actualSavingsData;

		// 	// Determine layer visibility
		// 	surplusData.visible = isSurplusScenario;
		// 	surplusData.showInLegend = isSurplusScenario;

		// 	actualSavingsData.visible = !isSurplusScenario;
		// 	actualSavingsData.showInLegend = actualSavingsData.showInLegend || false;
			
		// 	config.xAxis.categories = categories;
		// 	// Series: (layering by color, first layer is bellow, last is above)
		// 	// 	    Blue              Orange            Blue
		// 	// 	Actual Savings     Savings Goal     Actual Savings
		// 	// config.series = [surplusData, shortfallData, savingsGoalData, actualSavingsData];
		// 	config.series = [surplusData, savingsGoalData, actualSavingsData];
		// 	me.results.chartRSC = config;
		// }
	});
})($cmsj,$cmsj);