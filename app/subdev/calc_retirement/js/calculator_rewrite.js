var app = angular.module('retirement', [])
	.controller('retirementCalc', function($scope) {

 		var me = this,
 			annualRRSPlimitPerYear = {
 				2005:16500,
 				2006:18000,
 				2007:19000,
 				2008:20000,
 				2009:21000,
 				2010:22000,
 				2011:22450,
 				2012:22970,
 				2013:23820,
 				2014:24270,
 				2015:24270,
 				2016:24270
 			};
 		
		 /////////////////////////
 		// User entered values //
		 /////////////////////////
		me.data = {
			//amount:9845,
			//rate:0.004,
			scenarios:[{
				data:{
					currentAge:30,
					retirementStartAge :65,
					yearInRetirement : 30,

					monthlyRRSPcontribution	:	100,
					monthlyTFSAcontribution	:	100,
					monthlyNONREGcontribution	:	0,

					annualIncome : 55000,
					targetIncomePercent:0.7,
					targetIncomeAmount:35000,

					oas:6846.24,
					cpp:6000,
					companyPension:100,
					otherIncome:100,
					nonRegInvestments:100,

					currentRRSPSavings:50000,
					currentTFSASavings:50000,
					currentNONREGSavings:40000,

					targetIncomeIsPercent:true,

					estimatedROR:0.03, // maybe general data value
				},
				results:{

				}
			}],
			addSpouse:true
		};

		//////////////////////
		//  Constant values //
		//////////////////////
		me.data.constants = {
			maxYears: 101,
			inflationRate: 0.02,
			annualRRSPlimit: annualRRSPlimitPerYear[2016]
		};

		///////////////////////
		// Calculated values //
		///////////////////////
		me.results = { // calculated values
			
		};

		////////////////////////
		// Calculate function //
		////////////////////////
		function calculateAnnualInvestments(scenario){
			var data = scenario.data,
				results = scenario.results;

			results.annualRRSPcontribution = data.monthlyRRSPcontribution * 12;
			results.annualTFSAcontribution = data.monthlyTFSAcontribution * 12;
			results.annualNONREGcontribution = data.monthlyNONREGcontribution * 12;
			results.sumInvestmentContributions = results.annualRRSPcontribution + results.annualTFSAcontribution + results.annualNONREGcontribution;
		}
		
		//IF(C2<Input!$B$5,0,IF(AND(C2>=Input!$B$5,C2<Input!$B$5+Input!$B$6),1,2))
		function getStage( ageVal, retirementAge, yearInRetirement ){
			return (ageVal < retirementAge) ? 0 : (retirementAge <= ageVal && ageVal < (retirementAge + yearInRetirement)) ? 1 : 2;
		}
		
		function getCppStartAge(retirementStartAge){
			return Math.min(70,Math.max(60,retirementStartAge));
		}

		//B60
		function getOasStartAge (retirementStartAge) {
			return Math.min(67,retirementStartAge);
		}

		function calculateRetirementDetails(scenario) {
			var data = scenario.data,
				results = scenario.results,
				yearInRetirement = data.yearInRetirement,
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
				maxYears = me.data.constants.maxYears, 
				age,stage,details;

			for(;i < maxYears; ++i) {

				details = retirementDetails[i] = angular.extend({},defaultDetails);

				age = details.age = data.currentAge + i;
				stage = details.stage = getStage(age,retirementStartAge,yearInRetirement);

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

				/////////////
				// BALANCE //
				/////////////
				// Beginning balance
				if (i === 0) {
					details.actualBeginningBalance = data.currentRRSPSavings + data.currentTFSASavings + data.currentNONREGSavings;
					details.hypotheticalBeginningBalance = 0;
				}
				else if (!(retirementDetails[i-1].actualEndingBalance<0 || stage === 2)) {
					details.actualBeginningBalance = retirementDetails[i-1].actualEndingBalance * (1+results.realInterestRate);
				}
				// Ending balance
				if (stage !== 2 || i === 0) {
					details.actualEndingBalance = details.actualBeginningBalance + details.investmentContributions - details.actualIncomeRequired;
				}
				else {
					details.actualEndingBalance = retirementDetails[i-1].actualEndingBalance;
				}

				// Primary Details - Actual, Column R
				details.actualS = Formula.PV(results.realInterestRate, retYears, 0, details.actualIncomeRequired, 1);
			}

			return retirementDetails;
		}

		function calculateHypotheticalBalance (scenario) {
			var data = scenario.data,
				results = scenario.results,
				retirementDetails = results.retirementDetails,
				i = 0,
				maxYears = me.data.constants.maxYears, 
				stage,details;

			for(;i < maxYears; ++i) {

				details = retirementDetails[i];

				stage = details.stage;

				// Beginning balance
				if (i === 0) {
					details.hypotheticalBeginningBalance = results.pvOfInvestmentRequired;
				}
				else if (!(retirementDetails[i-1].actualEndingBalance<0 || stage === 2)) {
					details.hypotheticalBeginningBalance = retirementDetails[i-1].hypotheticalBeginningBalance * (1+results.realInterestRate);
				}
				else {
					details.hypotheticalBeginningBalance = 0;
				}
				// Ending balance
				if (stage !== 2 || i === 0) {
					details.hypotheticalEndingBalance = details.hypotheticalBeginningBalance + details.investmentContributions - details.actualIncomeRequired;
				}
				else {
					details.hypotheticalEndingBalance = retirementDetails[i-1].hypotheticalEndingBalance;
				}
			}
		}

		function calculateAllStartAges (scenario) {
			var retirementStartAge = scenario.data.retirementStartAge;
			scenario.results.cppStartAge = getCppStartAge(retirementStartAge);
			scenario.results.oasStartAge = getOasStartAge(retirementStartAge);
		}
		
		
		function calculate () {
			var primaryScenario = me.data.scenarios[0],
				data = primaryScenario.data,
				results = primaryScenario.results;

			results.realInterestRate = (1+data.estimatedROR)/(1+me.data.constants.inflationRate)-1;

			calculateAllStartAges(primaryScenario);

			calculateAnnualInvestments(primaryScenario);

			calculateRetirementDetails(primaryScenario);

			// results.retirementDetails = getRetirementDetails(primaryScenario);

			results.sumS = 0;
			results.retirementDetails.filter(function(yearPeriod,i){
				results.sumS+=yearPeriod.actualS;
				if (yearPeriod.age === data.retirementStartAge) {
					results.retirementStartID = i;
					results.savingsAtRetirement = yearPeriod.actualBeginningBalance;
				}
				return true;
			});

			// B41
			results.annualIncomeBasedOnActualSavings = Formula.PMT(results.realInterestRate, data.yearInRetirement,-1*results.savingsAtRetirement,0,1);
			// B42
			results.estimatedRetirementIncome = results.annualIncomeBasedOnActualSavings + data.oas + data.cpp + data.companyPension + data.nonRegInvestments + data.otherIncome;
			// B43
			results.npvDesiredIncome = Formula.MAX(-1*results.sumS,0);
			// B44
			results.pvOfInvestmentRequired = Formula.MAX(Formula.PV(results.realInterestRate, data.retirementStartAge-data.currentAge,results.sumInvestmentContributions,-1*results.npvDesiredIncome,1),0);
			// B45
			results.pvOfRecommendedInvestement = results.npvDesiredIncome;
			// B46
			results.recommendedInvestmentPerYear = Formula.PMT(results.realInterestRate,data.yearInRetirement,-1*results.pvOfRecommendedInvestement,0,1);
			// B47
			results.fvSavings = Formula.FV(results.realInterestRate, results.retirementStartID,-1*results.sumInvestmentContributions,-1*data.currentRRSPSavings-data.currentTFSASavings-data.currentNONREGSavings,1);
			// B48
			results.shortfallOrSurplus = results.savingsAtRetirement - results.npvDesiredIncome;
			// B49
			results.monthlyContributionNeeded = Formula.PMT(results.realInterestRate,results.retirementStartID,0,results.shortfallOrSurplus,1)/12;
			// B50
			results.totalMonthlyContributionsNeeded = results.monthlyContributionNeeded + data.monthlyRRSPcontribution + data.monthlyTFSAcontribution + data.monthlyNONREGcontribution;
			// B51
			results.totalAnnualContributionsNeeded = results.totalMonthlyContributionsNeeded * 12;			
			// F34
			results.scenarioType = results.fvSavings < results.npvDesiredIncome ? 1 : results.fvSavings === results.npvDesiredIncome ? 3 : 2;

			// Hypothetical Balance
			calculateHypotheticalBalance(primaryScenario);
		}
		
	});