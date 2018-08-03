window.rscContent = {
	en: {
		formHeader:'Retirement planning',
		incomeSourceHeader:'Sources of Income – Annual',
		investmentsHeader:'Savings and Investments – Current',
		investmentsMonthlyHeader:'Savings and Investments – Monthly',

		errorMessages:{
			currentAge:'What is your current age?',
			currentAge_spouse:'What is your spouse\'s current age?',
			retirementStartAgeTooHigh:'The sum of the retirement start age and amount of years in retirement must not exceed 105 years.',
			retirementStartAgeTooLow:'Retirement age must be greater than current age.',
			currentAgeOverRetirementStartAge:'Current age must be lower than retirement age.',
			inflationRate:'Average Canadian Inflation over past five years is {{ [average] | percent:2 }}.',
			rrspContributionTooHigh:'Your annual RRSP contribution exceeds the maximum contribution allowed based on your income entered.',
			overAllowedTFSAContribution:'TFSA Contribution Limit for [currentYear] = {{ [max]*12 | currency:0 }} or {{ [max] | currency:0 }} per month.',
			overAllowedRRSPContribution:'Maximum RRSP Contributions for [currentYear] = {{ [max]*12 | currency:0 }} or {{ [max] | currency:0 }} per month.'
		},

		highchart: {
			surplus:'Surplus',
			shortfall:'Shortfall',
			savingsGoal:'Savings goal',
			actualSavings:'Actual Savings'
		},
		
		tooltip: {
			yearsInRetirement:'The average Canadian spends 25-30 years in retirement.',
			targetIncomePercent:'In general, you will need {{ 0.6 | percent:0 }}-{{ 0.8 | percent:0 }} of your pre-retirement income to maintain your current lifestyle in retirement.',
			oas:'As of July 1st 2016, the maximum annual Old Age Security (OAS) payment for retirement at 65 is {{ 6846.24 | currency:2 }}, with a reduction for annual income over {{ 73756 | currency:0 }}.',
			cpp:'The maximum 2016 Canada Pension Plan / Quebec Pension Plan (CPP/QPP) retirement pension is {{ 13110 | currency:2 }}.'
		},

		scenarioInputs:{
			addSpouse:'Would you like to add a spouse?',
			editScenarioFor:'Edit retirement information for:',
			isScenarioViewSpouse:'You',
			isScenarioViewSpouse_spouse:'Spouse',
			// Retirement Information
			currentAge_spouse:'What is your spouse\'s current age?',
			currentAge:'What is your current age?',

			retirementStartAge_spouse:'At what age does your spouse plan on retiring?',
			retirementStartAge:'At what age do you plan on retiring?',

			yearsInRetirement_spouse:'How many years of retirement is your spouse saving for?',
			yearsInRetirement:'How many years of retirement are you saving for?',

			annualIncome_spouse:'What is your spouse\'s current annual income before taxes?',
			annualIncome:'What is your current annual income before taxes?',

			targetIncomeIsPercent_spouse:'Does your spouse want to use a percentage of their current annual income for their target retirement income?',
			targetIncomeIsPercent:'Do you want to use a percentage of your current annual income for your target retirement income?',

			targetIncomeAmount:'Target retirement income amount',
			targetIncomePercent:'Target retirement income percent',
			// Sources of Income
			
			// oas:'<span class="unbreakable">Old Age Security<popover data-placement="top" data-content="{{rsc.content.tooltip.oas}}"></popover></span>',
			oas:'Old Age Security',
			// cpp:'<span class="unbreakable">CPP/QPP<popover data-placement="top" data-content="{{rsc.content.tooltip.cpp}}"></popover></span>',
			cpp:'CPP/QPP',
			companyPension:'Company pension',
			nonRegInvestments:'Non-registered investments',
			otherIncome:'Other sources of income',
			// RRSP Investments
			currentRRSPSavings:'RRSP savings',
			monthlyRRSPcontribution:'RRSP contribution',
			currentTFSASavings:'TFSA savings',
			monthlyTFSAcontribution:'TFSA contribution',
			currentNONREGSavings:'Non-registered savings',
			monthlyNONREGcontribution:'Non-registered contribution',
			// OTHER
			estimatedROR:'Estimated rate of return',
			inflationRate:'Inflation rate',
		},

		spouseSuffix:'_spouse',

		results:{
			// header:'Based on your responses we\'ve determined the following',
			headerPart1:'You will need to save ',
			headerPart1_spouse:'Your spouse will need to save ',
			headerPart2:' for your retirement.',
			headerPart2_spouse:' for their retirement.',

			scenarioShortfallPart1:'To make up for your shortfall, you can contribute: ',
			scenarioShortfallPart1_spouse:'Your spouse can make up for the shortfall, by contributing: ',
			scenarioShortfallPart2:' monthly.',

			scenarioSurplusPart1:'You are saving an additional ',
			scenarioSurplusPart1_spouse:'Your spouse is saving an additional ',
			scenarioSurplusPart2:' per month more than is required to meet your goal.',
			scenarioSurplusPart2_spouse:' per month more than is required to meet their goal.',

			scenarioOnTrack:'Congratulations. You are on track to reach your retirement savings goal.',
			scenarioOnTrack_spouse:'Congratulations. Your spouse is on track to reach their retirement savings goal.',

			resultsSummaryPart1:'',
			resultsSummaryPart2:' will yield an annual income of ',
			resultsSummaryOverXyear:' over ',
		},

		chartTooltip:{
			age:'Age: '
		},

		report:{ },

		disclaimer:'The Retirement Savings Calculator is designed to be an informational and educational tool only, and when used alone, the results do not constitute financial, retirement planning, or tax advice from Meridian Credit Union Limited, and should not be relied upon as such.  It is offered free of charge, “as is”, and without any guarantees, representations or warranties whatsoever, including, but not limited to, any warranty as to the quality, accuracy, currency or suitability of the information presented by this calculator for any particular purpose.  We strongly recommend that you seek the advice of a Meridian financial services professional before making any type of financial retirement plan.  We also encourage you to review your retirement strategy periodically as your financial circumstances change.  The results presented by this calculator are hypothetical and may not reflect the actual amount you will need to save for retirement or the degree to which you are actually on track to save enough to meet that identified need.  They are also based on the information you enter and a number of estimates and assumptions (further details are available upon request) that may or may not be relevant to your situation.   Meridian and its affiliates hereby also disclaim any responsibility for the consequences of any decisions or actions taken in reliance upon or as a result of the information provided by this calculator, as well as for any damages (whether ordinary, special, consequential  or exemplary) or losses of any kind due to human or mechanical errors or omissions in the design, operation, or use of the calculator, or due to its lack of availability at any given time.   Meridian is under no obligation to provide support, service, corrections, or upgrades to the calculator’s software.'
	}
};