window.threeInOneDataContent = {
	
	affordability:{
		en: {
			formHeader:'How much can<br/> you afford?',
			incomeHeader:'Annual Income',
			expensesHeader:'Monthly Expenses',
			mortgageInformationHeader:'Mortgage Information',

			scenarioInputs:{
				annualIncome:'Your Gross Annual Household Income',
				heatingCosts:'Heating Costs',
				propertyTaxes:'Property Taxes',
				condoFees:'Condo Fees (if applicable)',
				vehicleLoanLease:'Vehicle Loan/Lease',
				personalLoan:'Personal Loan',
				lineOfCredit:'Line of Credit',
				creditCards:'Credit Card(s)',
				otherDebt:'Other Debt',
				interestRate:'Interest Rate',
				amortization:'Amortization',
				downPaymentAmount:'Down Payment Amount',
				totalOtherDebt:'Total Other Debt'
			},

			scenarioResults: {
				header:'Based on your information, you qualify for a home with a Maximum Purchase Price* of',
				subtitle:'Based on your selections, here is your unique mortgage Affordability Assesment',
				maximumPurchasePrice:'Maximum Purchase Price',
				downPaymentPercent:'Down Payment Percentage',
				downPaymentAmount:'Down Payment Amount',
				principalMortgageAmount:'Principal Mortgage Amount',
				defaultInsurance:'Default Insurance',
				totalMortgageAmount:'Total Mortgage Amount',
				chartLegend:{

				}
			},

			disclaimer:'<p>The monthly affordability calculation is for illustration purposes only and should not be relied upon as financial advice without additional input from  a trusted and competent financial advisor.    Results are based on the information you provide and the calculator  assumes that the annual interest rate will never vary  over the Mortgage Amortization Period. The actual rate will likely vary over the course of the amortization period and such fluctuations will  affect the overall affordability calculation. The eligible mortgage amount and monthly mortgage payment amount factors in property taxes, default insurance, heating costs, common expenses. Applicants must meet Meridian\'s qualifying criteria.</p>',

			'affGraphMortgagePayment':{
				label:'Mortgage payment'
			},
			'affGraphHeat':{
				label:'Heat'
			},
			'affGraphPropertyTaxes':{
				label:'Property Taxes'
			},
			'affGraphCondoFees':{
				label:'Condo Fees'
			},
			'affGraphTotalOtherDebt':{
				label:'Total Other Debt'
			}
		}
	},


	mortgagePayment:{
		en:{
			formHeader:'How much will I pay?',

			errorMessages: {
				annualPrePaymentOver20Percent : 'The Prepayment Amount value cannot exceed 20% of the mortgage amount value per calendar year.',
				mortgageAmountTooLowForAnnualPrePayment : 'The Prepayment Amount value cannot exceed 20% of the mortgage amount value per calendar year.',
				prePaymentIncreaseOver20Percent : 'The increase to payments cannot exceed 20% of the original payment amount value per calendar year.',
				mortgagePaymentTooLowForPrePayment : 'The increase to payments cannot exceed 20% of the original payment amount value per calendar year.'
			},

			additionalPaymentButton_hide:'HIDE ADDITIONAL PAYMENTS',
			additionalPaymentButton_show:'BE MORTGAGE-FREE SOONER WITH ADDITIONAL PAYMENTS',

			scenarioInputs:{
				mortgageAmount:'Mortgage Amount',
				amortization:'Amortization',
				interestRate:'Interest Rate',
				extraPaymentAmount:'Payment Amount',
				productAndTerm:'Term',
				paymentFrequency:'Payment Frequency',
				extraPaymentFrequency:'Frequency of Extra Payment'

			},

			results:{

				header_monthly:'Your monthly mortgage payment <span class="unbreakable">will be</span>',
				header_semiMonthly:'Your semi-monthly mortgage payment <span class="unbreakable">will be</span>',
				header_biWeekly:'Your bi-weekly mortgage payment <span class="unbreakable">will be</span>',
				header_weekly:'Your weekly mortgage payment <span class="unbreakable">will be</span>',
				header_acceleratedBiWeekly:'Your accelerated bi-weekly mortgage payment <span class="unbreakable">will be</span>',
				header_acceleratedWeekly:'Your accelerated weekly mortgage payment <span class="unbreakable">will be</span>',

				tabs:{
					amortization:{
						content:{
							tabLabel:'Amortization',
							detailsTableColumns:['Year','Payment','Interest','Principal','Balance']
						}
					},
					termSummary:'Mortgage Term Summary'
				}
			},
			report:{
				mortgageOptions:'Mortgage Options',

				mortgageAmount:'Mortgage Amount',
				productAndType:'Term',
				amortization:'Amortization',
				interestRate:'Interest Rate',
				paymentFrequency:'Payment Frequency',
				extraPaymentFrequency:'Extra Payment Frequency',
				extraPaymentAmount:'Extra Payment Amount',

				termSummary:'Term Summary',

				mortgagePayment:'Mortgage Payment',
				termPrincipal:'Principal Paid for Term',
				termInterest:'Interest Paid for Term',
				termInterestAndPrincipal:'Interest and Principal for Term',
				balanceAtEndOfTerm:'Balance at End of Term',

				amortizationSchedule:'Amortization Schedule'
			},
			compareScenarios:{
				scenario_0:{
					name:'Base Scenario',
					color:'#e68922'
				},
				scenario_1:{
					name:'Scenario A',
					color:'#50324c'
				},
				scenario_2:{
					name:'Scenario B',
					color:'#a9b400'
				}
			},
			disclaimer:'<p>The loan payment calculation is for illustrative purposes only and should not be relied upon as financial advice without additional input from a trusted and competent financial advisor. The  Interest rate  is an annual rate charged daily and paid according to the payment frequency selected. The calculator assumes that the interest rate will remain constant over the entire amortization/repayment period, but the  actual interest rate may vary, and is likely to vary, over the amortization period. Applicants must meet Meridian\'s qualifying criteria.</p>'
		}
	},

	
	lineOfCredit:{
		en:{

			amortizationTable:'Amortization Table',

			scenarioInputs:{
				borrowAmount:'How much do you want to borrow?',
				interestRate:'Interest rate (as low as*):',
				amortization:'Over how many years do you want to pay it back? (Amortization)',
				paymentFrequency:'Payment frequency?',

				repaymentDetails:{
					label:'View repayment details for a',
					personalLoan:'Personal loan',
					lineOfCredit:'Line of credit'
				},
				borrowReason:{
					label:'What are you borrowing for?',
					car:'Buying a car',
					debtConsolidation:'Consolidating debt',
					homeRenovation:'Renovating my home',
					educationFees:'Paying for tuition',
					rrspContribution:'Contributing to my RRSP',
					other:'(Other reasons)'
				}
			},

			results:{
				header:'Based on your responses we\'ve determined the following',
				monthlyPayment:'*Minimum Monthly Payment Amount',
				interestCost:'Interest cost for item',
				compareScenarios:{
					monthlyPayment:'*Minimum Monthly Payment Amount',
					interestCost:'Interest cost for item:'
				}
			},

			report:{
				borrowOptions:'Borrowing options',
				paymentSummary:'Payment Summary',
				borrowReason:'Borrow Reason',
				borrowAmount:'Amount to Borrow',
				interestRate:'Interest Rate',
				amortization:'Term',
				paymentFrequency:'Payment Frequency'
			},

			scenarioTypes:{
				lineOfCredit:{
					formHeader:'Estimate your line of<br/> credit payments',
					name:'Line of Credit'
				},
				personalLoan:{
					formHeader:'Estimate your personal loan payments',
					name:'Personal Loan'
				}
			},

			disclaimer:'<p>The minimum monthly payment calculation is based on the information you provide and is for illustrative purposes only. It should not be relied upon as financial advice without additional input from a trusted and competent financial advisor. Actual results may vary. The calculator assumes a constant rate of interest, but the rate for line of credit products often varies over time.</p>'
		}
	}
};